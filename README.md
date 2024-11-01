# Company Stock Data App

This app presents company stock price real-time data.

The initial aim was to build a clone of [Google Finance](https://www.google.com/finance/). But ended up as a "discount version", mainly because of the API call limit.

## Getting Started

The project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using [Alpha Vantage API](https://www.alphavantage.co/documentation/#).

To run the project locally -

```bash
git clone git@github.com:kukiron/stock-data-app.git
cd stock-data-app
npm install && npm start
```

This should serve the app on `localhost:3000`.

### API Key

- If you have your API key from Alpha Vantage you can set it up in `.env.development`. Or get a new one from [here](https://www.alphavantage.co/support/#api-key). **Each API key has a limit of 25 calls a day.**

- If you're facing an API limit issue and receiving a message when the app loads or is updated, try running the app with demo endpoints from Alpha Vantage.

- Alternatively, you can run the app without providing any API key. This will also allow the user to run the app with demo endpoints.

_**Note that demo endpoints are NOT configurable. So, they are not all fetching data for the same company.**_

## Tools Used

Tools used for the project -

- TypeScript & React (CRA)
- Material UI React with Material UI Icons
- Recharts: Charting library for React
- Styled Components: Writing CSS in JS
- ESLint & Prettier: for linting & formatting

## App Overview

The following endpoints are used to build the app features.

- `/query?function=SYMBOL_SEARCH&keywords={symbol}&apikey={apiKey}`

  Used to search stock data. The search result sets the currently active stock used in other API calls. If this endpoint returns an error or API limit message the subsequent API calls are skipped.

- `query?function=OVERVIEW&symbol={symbol}&apikey={apiKey}`

  Used to show company information & stock-related details/financial data.

- `/query?function=NEWS_SENTIMENT&tickers={tickers}&apikey={apiKey}`

  Used to fetch the latest news of the company in the financial market. The top 6 news based on sentiment score are displayed,

- `/query?function={timeSeries}&symbol={symbol}&apikey={apiKey}`

  Used to display stock price trends in an area chart view with additional metadata.

  Here the `function` query param can be one of the following -
  - `TIME_SERIES_INTRADAY`: To display stock data for the past 1-5 days (every 5 min interval)
  - `TIME_SERIES_DAILY`: To display stock data for the past 1-12 months (daily data)
  - `TIME_SERIES_WEEKLY`: To display stock data for the past 5 years (weekly data)

  The chart view is updated based on the selected stock data category/time-range.

## Deployment

The app is currently deployed to Netlify - [company-stock-data-app.netlify.app](https://company-stock-data-app.netlify.app/)

The production deployment also uses a free API key. Follow the workaround mentioned above if the API limit is reached.
