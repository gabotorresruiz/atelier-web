import { FC } from 'react';
import Box from '@component/Box';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import { Carousel } from '@component/carousel';
import { CarouselCard1 } from '@component/carousel-cards';
import MainCarouselItem from '@models/market-1.model';

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData }) => (
  <>
    <Navbar navListOpen />

    <Box bg="gray.white" mb="3.75rem">
      <Container pb="2rem">
        <Carousel
          spacing="0px"
          infinite
          autoPlay
          showDots
          visibleSlides={1}
          showArrow={false}
          totalSlides={carouselData.length}
        >
          {carouselData.map((item, index) => (
            <CarouselCard1
              key={index}
              title={item.title}
              image={item.imgUrl}
              buttonText={item.buttonText}
              description={item.description}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  </>
);

export default Section1;
