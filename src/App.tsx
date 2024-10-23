import styled from 'styled-components';

import {
  BREAK_POINT_L,
  BREAK_POINT_XL,
  BREAK_POINT_XXL,
} from 'lib/breakpoints';
import CompanyStockData from 'contexts/StockContext';

const Container = styled.div`
  margin: 60px auto;
  width: 60%;

  @media screen and (max-width: ${BREAK_POINT_XXL}) {
    width: 80%;
  }

  @media screen and (max-width: ${BREAK_POINT_XL}) {
    width: 90%;
  }

  @media screen and (max-width: ${BREAK_POINT_L}) {
    width: 100%;
  }
`;

function App() {
  return (
    <Container>
      <CompanyStockData />
    </Container>
  );
}

export default App;
