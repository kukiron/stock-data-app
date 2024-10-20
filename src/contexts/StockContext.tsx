import {
  createContext,
  Dispatch,
  SetStateAction,
  useReducer,
  useState,
} from 'react';

import NewsFeed from 'components/News';
import CompanyOverview from 'components/Overview';
import Searchbar from 'components/Searchbar';
import StockPrice from 'components/StockPrice';
import { AlertCard, InfoBadge } from 'components/common';

import { appStateReducer } from 'data/reducers';
import type { Action, AppState } from 'data/types';

type ContextState = {
  demo: boolean; // indicates if the app is using demo endpoints
  appState: AppState;
  setDemo: Dispatch<SetStateAction<boolean>>;
  updateAppState: Dispatch<Action>;
};

const initialAppState = {
  errorMessage: '',
  activeData: null,
};

export const StockContext = createContext({} as ContextState);

export default function CompanyStock() {
  const [demo, setDemo] = useState(false);
  const [appState, updateAppState] = useReducer(
    appStateReducer,
    initialAppState
  );
  const { errorMessage, activeData } = appState;

  const renderAppContent = () => {
    if (errorMessage && !activeData) {
      return <AlertCard />;
    }

    return (
      <>
        <StockPrice />
        <CompanyOverview />
        <NewsFeed />
      </>
    );
  };

  return (
    <StockContext.Provider value={{ demo, appState, setDemo, updateAppState }}>
      {demo && activeData ? (
        <InfoBadge />
      ) : (
        <Searchbar disabled={errorMessage.includes('API')} />
      )}
      {renderAppContent()}
    </StockContext.Provider>
  );
}
