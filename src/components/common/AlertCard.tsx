import { useContext } from 'react';
import {
  Button,
  CardContent,
  Divider as MuiDivider,
  Typography,
} from '@mui/material';
import UnavailableIcon from '@mui/icons-material/DoNotDisturbOn';

import { StockContext } from 'contexts/StockContext';
import Card from './Card';

// CArd containing info about API limit
function AlertCard() {
  const {
    appState: { errorMessage },
    setDemo,
  } = useContext(StockContext);

  const failed = errorMessage.includes('Failed to fetch');
  const textColor = failed ? 'error' : 'text.primary';

  const renderDemoOptions = () => {
    if (!failed) {
      return (
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
      );
    }
  };

  return (
    <Card title="Stock Data Unavailable" Icon={UnavailableIcon}>
      <CardContent>
        <Typography variant="body1" color={textColor}>
          {errorMessage}
        </Typography>
      </CardContent>

      {renderDemoOptions()}
    </Card>
  );
}

export default AlertCard;
