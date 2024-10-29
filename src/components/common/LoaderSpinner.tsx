import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  row-gap: 1.5rem;
`;

function LoaderSpinner() {
  return (
    <LoaderWrapper>
      <CircularProgress />
      <Typography color="text.secondary">Updating stock data...</Typography>
    </LoaderWrapper>
  );
}

export default LoaderSpinner;
