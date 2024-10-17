import { Skeleton } from '@mui/material';
import styled from 'styled-components';

import Divider from './Divider';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 0.75rem;
`;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const ItemWrapper = styled.div`
  &:last-child {
    ${Divider} {
      display: none;
    }
  }
`;

const GridWrapper = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1.5fr;
  grid-gap: 2.5rem;
  padding: 0.75rem;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

function NewsLoaderSkeleton() {
  return (
    <Container>
      {Array.from({ length: 3 }).map((_, index) => (
        <ItemWrapper key={index}>
          <FlexWrapper key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={50}
              height={50}
            />
            <RowWrapper>
              <Skeleton animation="wave" height={15} width="30%" />
              <Skeleton animation="wave" height={15} width="90%" />
            </RowWrapper>
          </FlexWrapper>
          <Divider />
        </ItemWrapper>
      ))}
    </Container>
  );
}

function OverviewLoaderSkeleton() {
  return (
    <Container>
      {Array.from({ length: 5 }).map((_, index) => (
        <ItemWrapper key={index}>
          <GridWrapper key={index}>
            <Skeleton animation="wave" height={15} width="50%" />
            <Skeleton animation="wave" height={15} width="70%" />
          </GridWrapper>
          <Divider />
        </ItemWrapper>
      ))}
    </Container>
  );
}

export { NewsLoaderSkeleton, OverviewLoaderSkeleton };
