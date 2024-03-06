import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import Image from '@component/Image';
import Grid from '@component/grid/Grid';
import FlexBox from '@component/FlexBox';
import { H1, Paragraph } from '@component/Typography';
import Trend from '@models/trend.model';

const StyledImageWrapper = styled(FlexBox)`
  height: auto;
  margin-bottom: 0;

  @media screen and (min-width: 768px) {
    height: 350px;
    margin-bottom: 50px;
  }
`;

const StyledInfoGrid = styled(Grid)`
  padding: 2rem 3rem;

  @media screen and (min-width: 500px) {
    padding: 2rem 6rem;
  }

  @media screen and (min-width: 800px) {
    padding: 2rem 3rem 2rem 0;
  }

  @media screen and (min-width: 900px) {
    padding: 2rem 4rem;
  }

  @media screen and (min-width: 1025px) {
    padding: 2rem;
  }
`;

// ========================================
type TrendIntroProps = {
  trend: Trend;
};
// ========================================

const TrendIntro: FC<TrendIntroProps> = ({ trend }) => {
  const { description, imageUrl, name } = trend;

  return (
    <Box overflow="hidden">
      <Grid style={{ marginTop: '10px' }} container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <StyledImageWrapper justifyContent="center">
              <Image width="100%" height="100%" src={imageUrl} style={{ objectFit: 'contain' }} />
            </StyledImageWrapper>
          </Box>
        </Grid>
        <StyledInfoGrid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{name}</H1>
          <Paragraph mb="2rem">{description}</Paragraph>
        </StyledInfoGrid>
      </Grid>
    </Box>
  );
};

export default TrendIntro;
