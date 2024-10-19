import { useContext } from 'react';
import {
  Button,
  CardContent,
  Divider as MuiDivider,
  Typography,
} from '@mui/material';
import UnavailableIcon from '@mui/icons-material/DoNotDisturbOn';
import styled from 'styled-components';

import { blue, gray20 } from 'lib/colors';
import { StockContext } from 'contexts/StockContext';
import Card from './Card';

const BlockQuote = styled.blockquote<{ $failed?: boolean }>`
  padding-left: 1rem;
  margin: 0.75em 0 0;
  border-left: 4px solid ${blue};
  border-radius: 0 4px 4px 0;
  background: ${gray20};
  padding: 1rem;
  font-style: italic;
  color: ${({ $failed }) => ($failed ? 'red' : 'inherit')};
`;

// Card containing info about API limit
function AlertCard() {
  const {
    appState: { errorMessage },
    setDemo,
  } = useContext(StockContext);

  const isApiLimit = errorMessage.includes('API');

  const renderErrorMessage = () => {
    if (isApiLimit) {
      return <BlockQuote $failed={!isApiLimit}>{errorMessage}</BlockQuote>;
    }

    return (
      <Typography color="error" variant="body2">
        {errorMessage}
      </Typography>
    );
  };

  return (
    <Card title="Stock Data Unavailable" Icon={UnavailableIcon}>
      <CardContent>{renderErrorMessage()}</CardContent>
      {isApiLimit && (
        <>
          <MuiDivider variant="middle" />

          <CardContent>
            View the app with demo endpoints instead, provided by Alpha Vantage.
            Note that these demo endpoints are for different companies.
          </CardContent>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDemo(true)}
            sx={{ mt: 1, ml: 2, mb: 3 }}
          >
            Use Demo Endpoints
          </Button>
        </>
      )}
    </Card>
  );
}

export default AlertCard;
