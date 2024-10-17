import { useContext } from 'react';
import { CardContent, Typography } from '@mui/material';

import { StockContext } from 'contexts/StockContext';
import Card from './Card';

function ApiLimitCard() {
  const {
    appState: { errorMessage },
  } = useContext(StockContext);

  return (
    <Card title="Stock Data Unavailable">
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {errorMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ApiLimitCard;
