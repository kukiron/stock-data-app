import { createContext, useState } from 'react';

import { SearchedItem } from 'data/types';

import NewsFeed from 'components/News';
import CompanyOverview from 'components/Overview';
import Searchbar from 'components/Searchbar';

type ContextState = {
  activeData: SearchedItem | null;
  setActiveData: (stock: SearchedItem | null) => void;
};

export const StockContext = createContext({} as ContextState);

export default function CompanyStock() {
  const [activeData, setActiveData] = useState<SearchedItem | null>(null);

  return (
    <StockContext.Provider value={{ activeData, setActiveData }}>
      <Searchbar />
      <CompanyOverview />
      <NewsFeed />
    </StockContext.Provider>
  );
}
