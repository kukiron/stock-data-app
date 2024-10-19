import find from 'lodash/find';
import {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Autocomplete, TextField, Popper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { searchStockData } from 'data/api';
import { ActionTypes, DEFAULT_QUERY } from 'lib/constants';
import useDebounce from 'hooks/useDebounce';
import type { SearchedItem } from 'data/types';

import { StockContext } from 'contexts/StockContext';
import { gray50 } from 'lib/colors';

const listStyles = {
  maxHeight: '250px',
  fontSize: '0.85rem',
  padding: 0,
  lineHeight: '1.2rem',
};

const AutocompleteWrapper = styled.div<{ $disabled?: boolean }>`
  background-color: white;
  margin-bottom: 2rem;
  input {
    ${({ $disabled }) =>
      $disabled &&
      `
        cursor: not-allowed !important;
      `}
  }
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
    demo,
    appState: { activeData },
    updateAppState,
  } = useContext(StockContext);
  const initialQuery = activeData
    ? `${activeData.symbol} - ${activeData.name}`
    : DEFAULT_QUERY;

  const [searchedResults, setSearchedResults] = useState<SearchedItem[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  const handleFetchStockData = useDebounce(
    async (text: string, isDemo?: boolean) => {
      if (!demo && !text.length) {
        setSearchedResults([]);
        return;
      }

      setLoading(true);
      const queryText = !isDemo ? text.split('-')[0].trim() : undefined;
      const { success, message, result } = await searchStockData(queryText);
      setLoading(false);

      // update app state with error message if failed
      if (!success || !result) {
        updateAppState({
          type: ActionTypes.UPDATE_APP_STATE,
          payload: { errorMessage: message, activeData: null },
        });
        return;
      }

      const { bestMatches } = result;
      // set activeData, if NOT avaialbe, instead of dropdown options
      if (!activeData) {
        updateAppState({
          type: ActionTypes.UPDATE_ACTIVE_DATA,
          payload: find(bestMatches, ['symbol', queryText]) || bestMatches[0],
        });
        return;
      }

      // otherwise set the dropdown options
      setSearchedResults(bestMatches);
    },
    1000
  );

  const handleSelect = (
    _: SyntheticEvent,
    value: SearchedItem | string | null
  ) => {
    const selectedItem = value && typeof value !== 'string' ? value : null;
    if (selectedItem) {
      updateAppState({
        type: ActionTypes.UPDATE_ACTIVE_DATA,
        payload: selectedItem,
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setQuery((event.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    handleFetchStockData(query, demo);
  }, [demo, query]); // eslint-disable-line

  const renderOptionText = (option: SearchedItem | string) => {
    if (typeof option === 'string') {
      return option;
    }

    const { symbol, name } = option as SearchedItem;
    return `${symbol} - ${name}`;
  };

  return (
    <AutocompleteWrapper $disabled={demo}>
      <Autocomplete
        freeSolo
        // size="small"
        disabled={demo}
        options={searchedResults}
        value={activeData || null} // fallback to `null` for no option
        inputValue={query}
        onChange={handleSelect}
        onInputChange={(_, value: string) => setQuery(value)}
        onKeyDown={handleKeyDown}
        getOptionLabel={renderOptionText}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type company symbol, e.g - TSLA"
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
