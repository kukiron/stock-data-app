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

If you have your own API key from Alpha Vantage you can set it up in `.env.development`. Or get a new one from [here](https://www.alphavantage.co/support/#api-key).

_**Note that an API key has a limit of 25 calls a day.**_

If you're facing API limit issue, you can follow these steps -

- use `demo` as API key in `.env.development`
- use the commented out lines in `src/data/api.ts` file.

Then restart the server. This will use the demo data provided by Alpha Vantage.

## Tools Used

Tools used for the project -

- TypeScript
- Material UI React with Material UI Icons
- Recharts: Charting library for React
- Styled Components: Writing CSS in JS
- ESLint & Prettier: for linting & formatting

## Deployment

The app is currently deployed on Netlify - [company-stock-data-app.netlify.app](https://company-stock-data-app.netlify.app/).

The production deployment also uses a free API key. So, the app might NOT work as expected if the API limit is already reached.
