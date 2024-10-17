import find from 'lodash/find';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField, Popper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { searchStockData } from 'data/api';
import { SearchedItem } from 'data/types';
import { ActionTypes, DEFAULT_QUERY } from 'lib/constants';
import useDebounce from 'hooks/useDebounce';

import { StockContext } from 'contexts/StockContext';
import { gray50 } from 'lib/colors';

const listStyles = {
  maxHeight: '250px',
  fontSize: '0.85rem',
  padding: 0,
  lineHeight: '1.2rem',
};

const AutocompleteWrapper = styled.div`
  background-color: white;
  margin-bottom: 2rem;
`;

const StyledSearchIcon = styled(SearchIcon)`
  margin-left: 0.5rem;
  color: ${gray50};
`;

const StyledPopper = muiStyled(Popper)(() => ({
  '& .MuiAutocomplete-loading': {
    fontSize: '0.9rem',
  },
}));

function Searchbar() {
  const {
    appState: { activeData },
    updateAppState,
  } = useContext(StockContext);
  const initialQuery = activeData
    ? `${activeData.symbol} - ${activeData.name}`
    : DEFAULT_QUERY;

  const [searchedResults, setSearchedResults] = useState<SearchedItem[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  const handleFetchStockData = useDebounce(async (text: string) => {
    if (!text.length) {
      setSearchedResults([]);
      return;
    }

    setLoading(true);
    const queryText = text.split('-')[0].trim();
    const { success, message, result } = await searchStockData(queryText);

    if (!success || !result) {
      updateAppState({
        type: ActionTypes.UPDATE_APP_STATE,
        payload: { errorMessage: message, activeData: null },
      });
      setLoading(false);
      return;
    }

    const { bestMatches } = result;
    // set activeData, if NOT avaialbe, instead of dropdown options
    if (!activeData) {
      updateAppState({
        type: ActionTypes.UPDATE_ACTIVE_DATA,
        payload:
          find(bestMatches, ['item.symbol', queryText]) || bestMatches[0],
      });
      return;
    }

    // otherwise set the dropdown options
    setSearchedResults(bestMatches);
    setLoading(false);
  }, 500);

  const handleSelect = (
    _: SyntheticEvent,
    value: SearchedItem | string | null
  ) => {
    const selectedItem = value && typeof value !== 'string' ? value : null;
    updateAppState({
      type: ActionTypes.UPDATE_ACTIVE_DATA,
      payload: selectedItem,
    });
  };

  useEffect(() => {
    handleFetchStockData(query);
  }, [query]); // eslint-disable-line

  const renderOptionText = (option: SearchedItem | string) => {
    const { symbol, name } = option as SearchedItem;
    return `${symbol} - ${name}`;
  };

  return (
    <AutocompleteWrapper>
      <Autocomplete
        freeSolo
        size="small"
        options={searchedResults}
        value={activeData || null} // fallback to `null` for no option
        inputValue={query}
        onChange={handleSelect}
        onInputChange={(_, value: string) => setQuery(value)}
        getOptionLabel={renderOptionText}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type company symbol, e.g - NVDA"
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: <StyledSearchIcon />,
              },
            }}
          />
        )}
        ListboxProps={{
          id: 'port-dropdown',
          style: listStyles,
        }}
        PopperComponent={StyledPopper}
        sx={{ minWidth: 150 }}
      />
    </AutocompleteWrapper>
  );
}

export default Searchbar;
