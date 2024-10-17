import { Card as MuiCard, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import styled from 'styled-components';

import { gray40, gray50 } from 'lib/colors';
import Divider from './Divider';

const StyledCard = styled(MuiCard)`
  border: 1px solid ${gray40};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-bottom: 1rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 1rem;
`;

const IconWrapper = styled(FlexWrapper)`
  padding: 0;
  color: ${gray50};
`;

type HeaderProps = {
  title: string;
  Icon?: SvgIconComponent;
};

type Props = HeaderProps & {
  children: React.ReactNode;
};

function CardHeader({ title, Icon }: HeaderProps) {
  return (
    <FlexWrapper>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <Typography variant="h5">{title}</Typography>
    </FlexWrapper>
  );
}

function Card({ children, ...rest }: Props) {
  return (
    <StyledCard>
      <CardHeader {...rest} />
      <Divider />
      {children}
    </StyledCard>
  );
}

export default Card;
