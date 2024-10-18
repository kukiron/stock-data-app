import { useContext } from 'react';
import { CardContent, Typography } from '@mui/material';
import UnavailableIcon from '@mui/icons-material/DoNotDisturbOn';

import { StockContext } from 'contexts/StockContext';
import Card from './Card';

function ApiLimitCard() {
  const {
    appState: { errorMessage },
  } = useContext(StockContext);
  const textColor = errorMessage.includes('Failed to fetch')
    ? 'error'
    : 'text.secondary';

  return (
    <Card title="Stock Data Unavailable" Icon={UnavailableIcon}>
      <CardContent>
        <Typography variant="body1" color={textColor}>
          {errorMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ApiLimitCard;
