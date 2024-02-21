import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import { Carousel } from 'components/carousel';
import { H1, H2 } from 'components/Typography';
import { deviceSize } from '@utils/constants';
import Branding from '@models/branding.model';

// styled components
const StyledBox = styled(Box)({
  marginBottom: 60,
  overflow: 'hidden',
  '& .carousel-dot': {
    left: 0,
    right: 0,
    bottom: '30px',
    margin: 'auto',
    position: 'absolute'
  }
});

const Container = styled(Box)({
  minHeight: 650,
  display: 'flex',
  alignItems: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  transition: 'all 0.3s',
  [`@media(max-width:${deviceSize.md}px)`]: { height: '60vh' },
  [`@media(max-width:${deviceSize.sm}px)`]: { height: '50vh' }
});

const StyledGrid = styled(Grid)({
  maxWidth: 1280,
  margin: '0 8rem',
  position: 'relative',
  alignItems: 'center',
  padding: '2rem 0px 5rem 0px'
});

const GridItemOne = styled(Grid)({
  backdropFilter: 'blur(50px)',
  borderRadius: '10px',
  padding: '30px 40px',
  width: '100%'
});

// ===============================================================
type Props = { mainCarouselData: Branding };
// ===============================================================

const Section1: FC<Props> = ({ mainCarouselData }) => {
  const homeImageUrl =
    mainCarouselData.homeImageUrl || '/assets/images/Furniture Shop/Furniture Shop Header.jpg';

  return (
    <StyledBox id="carouselBox">
      <Carousel spacing="0px" autoPlay={false} visibleSlides={1} showArrow={false} totalSlides={1}>
        <Container
          style={{
            backgroundImage: `url(${homeImageUrl})`
          }}
        >
          <StyledGrid container>
            <GridItemOne item lg={6} md={8} xs={12}>
              <H1 color="primary.main" fontSize={60}>
                {mainCarouselData.title}
              </H1>
              {mainCarouselData.subtitle && mainCarouselData.subtitle !== 'null' ? (
                <H2 color="secondary.main">{mainCarouselData.subtitle}</H2>
              ) : null}
            </GridItemOne>
          </StyledGrid>
        </Container>
      </Carousel>
    </StyledBox>
  );
};

export default Section1;
