import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import { theme } from '@utils/theme';
import Trend from '@models/trend.model';
import { getSlug } from '@utils/utils';
import { H1, H3 } from '@component/Typography';

// styled components
const ContentBox = styled(Box)<{ imgUrl: string }>(({ imgUrl }) => ({
  height: 230,
  display: 'flex',
  borderRadius: 0,
  boxShadow: 'none',
  alignItems: 'center',
  background: theme.colors.paste[50],
  backgroundImage: `url('${imgUrl}')`,
  backgroundOrigin: 'content-box',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain'
}));

const RightContentBox = styled(ContentBox)({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  backgroundPosition: 'bottom',
  backgroundSize: 'cover'
});

const StyledTitleBox = styled(Box)`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
`;

const StyledSectionTitle = styled(Box)`
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

type Section2Props = {
  dataList: Trend[];
  title: string;
};

const Section2: FC<Section2Props> = ({ dataList, title }) => (
  <>
    <StyledSectionTitle mb={4}>
      <H1 mb="4px">{title}</H1>
    </StyledSectionTitle>
    <Grid container spacing={6}>
      {dataList.map((item) => (
        <Grid key={item.id} item xs={12} md={6}>
          <Link href={`/trend/${item.id}-${getSlug(item.name)}`}>
            <RightContentBox imgUrl={item.imageUrl} mb={2}>
              <StyledTitleBox className="trends-card-title" textAlign="center" pt={3}>
                <H3 fontSize={23} color="primary.main">
                  {item.name}
                </H3>
              </StyledTitleBox>
            </RightContentBox>
          </Link>
        </Grid>
      ))}
    </Grid>
  </>
);

export default Section2;
