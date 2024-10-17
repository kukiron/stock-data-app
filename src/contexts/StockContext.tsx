import { createContext, Dispatch, useReducer } from 'react';

import NewsFeed from 'components/News';
import CompanyOverview from 'components/Overview';
import Searchbar from 'components/Searchbar';
import { ApiLimitCard } from 'components/common';

import { appStateReducer } from 'data/reducers';
import type { Action, AppState } from 'data/types';

type ContextState = {
  appState: AppState;
  updateAppState: Dispatch<Action>;
};

const initialAppState = {
  errorMessage: '',
  activeData: null,
};

export const StockContext = createContext({} as ContextState);

// Company overview & news data are fetched based on searched result
// if no searhced result, the following endpoint calls are skipped
export default function CompanyStock() {
  const [appState, updateAppState] = useReducer(
    appStateReducer,
    initialAppState
  );
  const { errorMessage, activeData } = appState;

  const renderAppContent = () => {
    if (errorMessage && !activeData) {
      return <ApiLimitCard />;
    }
    return (
      <>
        <CompanyOverview />
        <NewsFeed />
      </>
    );
  };

  return (
    <StockContext.Provider value={{ appState, updateAppState }}>
      <Searchbar />
      {renderAppContent()}
    </StockContext.Provider>
  );
}
