# Getting Started

This app presents company stock price real-time data. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using [Alpha Vantage API](https://www.alphavantage.co/documentation/#).

## Run the Project

To run the project locally -

```bash
git clone git@github.com:kukiron/stock-data-app.git
cd stock-data-app
npm install && npm start
```

This should serve the app on `localhost:3000`.

### API Key

- If you have your own API key from Alpha Vantage you can set it up in `.env.development`. Or get a new one from [here](https://www.alphavantage.co/support/#api-key). _**Note that an API key has a limit of 25 calls a day.**_

- If you're facing API limit issue and receiving a message when the app loads or is updated, try running the app with demo endpoints provided by Alpha Vantage.

- Alternatively, you can run the app without providing any API key. This will allow the user to run the app with demo endpoints as well.

This can be achieved by

## Tools Used

Tools used for the project -

- TypeScript
- Material UI React with Material UI Icons
- Recharts: Charting library for React
- Styled Components: Writing CSS in JS
- ESLint & Prettier: for linting & formatting

## App Overview

The following endpoints are used to build the app features.

- `/query?function=SYMBOL_SEARCH&keywords={symbol}&apikey={apiKey}`

  Used to search stock data. The search result sets the currently active stock which is used in other API calls. If this endpoint returns an error or API limit message the subsequent API called are skipped.

- `query?function=OVERVIEW&symbol={symbol}&apikey={apiKey}`

  Used to show company information & stock related details/financial data.

- `/query?function=NEWS_SENTIMENT&tickers={tickers}&apikey={apiKey}`

  Used to fetch latest news on company in financial market. Top 6 news based on sentiment score is displayed,

- `/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={apiKey}`

   Used to display stock price trend in a line chart view with additional metadata.

## Deployment

The app is currently deployed to Netlify - [company-stock-data-app.netlify.app](https://company-stock-data-app.netlify.app/).

The production deployment also uses a free API key. So, the app might NOT work as expected if the API limit is already reached.
