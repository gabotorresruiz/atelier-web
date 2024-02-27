import { FC } from 'react';
import Box from '@component/Box';
import Image from '@component/Image';
import Grid from '@component/grid/Grid';
import FlexBox from '@component/FlexBox';
import { H1, Paragraph } from '@component/Typography';
import Trend from '@models/trend.model';

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
            <FlexBox style={{ height: '350px' }} justifyContent="center" mb="50px">
              <Image width="100%" height="100%" src={imageUrl} style={{ objectFit: 'contain' }} />
            </FlexBox>
          </Box>
        </Grid>
        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{name}</H1>
          <Paragraph mb="2rem">{description}</Paragraph>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrendIntro;
