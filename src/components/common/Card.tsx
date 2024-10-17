import { Card as MuiCard, CardHeader } from '@mui/material';
import styled from 'styled-components';

import { gray40 } from 'lib/colors';
import Divider from './Divider';

const StyledCard = styled(MuiCard)`
  border: 1px solid ${gray40};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

type Props = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: Props) {
  return (
    <StyledCard>
      <CardHeader title={title} />
      <Divider />
      {children}
    </StyledCard>
  );
}

export default Card;
