import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import styled from 'styled-components';

import { gray20 } from 'lib/colors';

const StyledWrapper = styled.div`
  background-color: ${gray20};
  margin-bottom: 1rem;
`;

function InfoBadge() {
  return (
    <StyledWrapper>
      <Chip
        icon={<InfoIcon />}
        label="Showing data from demo endpoints. Refresh to search for new data."
        sx={{ width: '100%' }}
      />
    </StyledWrapper>
  );
}

export default InfoBadge;
