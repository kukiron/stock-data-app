import find from 'lodash/find';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField, Popper } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { searchStockData } from 'data';
import { SearchedItem } from 'data/types';
import useDebounce from 'hooks/useDebounce';
import { DEFAULT_SYMBOL } from 'lib/constants';

import { StockContext } from 'contexts/StockContext';

const listStyles = {
  maxHeight: '250px',
  fontSize: '0.85rem',
  padding: 0,
  lineHeight: '1.2rem',
};

const AutocompleteWrapper = styled.div`
  margin-bottom: 1rem;
  background-color: white;
`;

const StyledPopper = muiStyled(Popper)(() => ({
  '& .MuiAutocomplete-loading': {
    fontSize: '0.9rem',
  },
}));

function Searchbar() {
  const { activeData, setActiveData } = useContext(StockContext);

  const [searchedResults, setSearchedResults] = useState<SearchedItem[]>([]);
  const [query, setQuery] = useState(activeData?.symbol || DEFAULT_SYMBOL);
  const [loading, setLoading] = useState(false);

  const handleFetchStockData = useDebounce(async (text: string) => {
    if (!query.length) {
      setSearchedResults([]);
      return;
    }

    setLoading(true);
    const { success, result } = await searchStockData(text);

    if (success && result) {
      const { bestMatches } = result;
      // set activeData, if NOT avaialbe, instead of dropdown options
      if (!activeData) {
        setActiveData(
          find(bestMatches, ['item.symbol', text]) || bestMatches[0]
        );
        return;
      }

      // otherwise set the dropdown options
      setSearchedResults(bestMatches);
    }
    setLoading(false);
  }, 500);

  const handleSelect = (
    _: SyntheticEvent,
    value: SearchedItem | string | null
  ) => {
    const selectedItem = value && typeof value !== 'string' ? value : null;
    setActiveData(selectedItem);
  };

  useEffect(() => {
    handleFetchStockData(query);
  }, [query]); // eslint-disable-line

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
        getOptionLabel={(option) => (option as SearchedItem).symbol}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type company symbol, e.g - NVDA"
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
