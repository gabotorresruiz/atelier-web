import { Children, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { CSSProperties } from 'styled-components';
import { ButtonBack, ButtonNext, DotGroup, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { colorOptions } from 'interfaces';
import Icon from '../icon/Icon';
import { IconButton } from '../buttons';
import { StyledCarousel } from './styles';

// ====================================================
export interface CarouselProps {
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
  totalSlides?: number;
  visibleSlides?: number;
  currentSlide?: number;
  isIntrinsicHeight?: boolean;
  hasMasterSpinner?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  step?: number;
  interval?: number;
  showDots?: boolean;
  showArrow?: boolean;
  showArrowOnHover?: boolean;
  dotClass?: string;
  dotColor?: string;
  dotGroupMarginTop?: string;
  spacing?: string;
  arrowButtonColor?: colorOptions;
  arrowButtonClass?: string;
  leftButtonClass?: string;
  rightButtonClass?: string;
  leftButtonStyle?: CSSProperties;
  rightButtonStyle?: CSSProperties;
  children: unknown;
}
// ====================================================

const renderDots = ({ step, currentSlide, visibleSlides, totalSlides, carouselStore }) => {
  const dots = [];
  const total = totalSlides - visibleSlides + 1;

  for (let i = 0; i < total; i += step) {
    dots.push(
      <div
        key={i}
        className={clsx({ dot: true, 'dot-active': currentSlide === i })}
        onClick={() => carouselStore.setStoreState({ currentSlide: i, autoPlay: false })}
        role="button"
        tabIndex={0}
        aria-label={`Go to slide ${i + 1}`}
      />
    );

    if (total - i - 1 < step && total - i - 1 !== 0) {
      dots.push(
        <div
          role="button"
          key={i + total}
          tabIndex={0}
          aria-label="Go to last slide"
          className={clsx({
            dot: true,
            'dot-active': currentSlide === totalSlides - visibleSlides
          })}
          onClick={() =>
            carouselStore.setStoreState({
              currentSlide: totalSlides - visibleSlides,
              autoPlay: false
            })
          }
        />
      );
    }
  }
  return dots;
};

const Carousel: FC<CarouselProps> = ({
  children,
  naturalSlideWidth,
  naturalSlideHeight,
  totalSlides,
  visibleSlides,
  currentSlide,
  isIntrinsicHeight,
  hasMasterSpinner,
  infinite,
  autoPlay,
  step,
  interval,
  showDots,
  showArrow,
  showArrowOnHover,
  dotClass,
  dotColor,
  dotGroupMarginTop,
  spacing,
  arrowButtonClass,
  arrowButtonColor,
  leftButtonClass,
  rightButtonClass,
  leftButtonStyle,
  rightButtonStyle
}) => (
  <StyledCarousel
    step={step}
    spacing={spacing}
    $showDots={showDots}
    infinite={infinite}
    interval={interval}
    $dotColor={dotColor}
    isPlaying={autoPlay}
    totalSlides={totalSlides}
    currentSlide={currentSlide}
    visibleSlides={visibleSlides}
    hasMasterSpinner={hasMasterSpinner}
    $showArrowOnHover={showArrowOnHover}
    naturalSlideWidth={naturalSlideWidth}
    isIntrinsicHeight={isIntrinsicHeight}
    $dotGroupMarginTop={dotGroupMarginTop}
    naturalSlideHeight={naturalSlideHeight}
  >
    <Slider className="custom-slider">
      {Children.map(children, (child: ReactNode, ind) => (
        <Slide index={ind}>{child}</Slide>
      ))}
    </Slider>

    {showDots && (
      <DotGroup
        className={`custom-dot ${dotClass}`}
        renderDots={(props: any) => renderDots({ ...props, step })}
      />
    )}

    {showArrow && (
      <>
        <IconButton
          as={ButtonBack}
          variant="contained"
          color={arrowButtonColor}
          style={leftButtonStyle || {}}
          className={`arrow-button left-arrow-class ${arrowButtonClass} ${leftButtonClass}`}
        >
          <Icon variant="small" defaultcolor="currentColor">
            arrow-left
          </Icon>
        </IconButton>

        <IconButton
          as={ButtonNext}
          variant="contained"
          color={arrowButtonColor}
          style={rightButtonStyle || {}}
          className={`arrow-button right-arrow-class ${arrowButtonClass} ${rightButtonClass}`}
        >
          <Icon variant="small" defaultcolor="currentColor">
            arrow-right
          </Icon>
        </IconButton>
      </>
    )}
  </StyledCarousel>
);

Carousel.defaultProps = {
  step: 1,
  totalSlides: 10,
  visibleSlides: 5,
  spacing: '1.5rem',
  infinite: false,
  autoPlay: false,
  interval: 2000,
  showDots: false,
  showArrow: true,
  naturalSlideWidth: 100,
  naturalSlideHeight: 125,
  isIntrinsicHeight: true,
  hasMasterSpinner: false,
  dotGroupMarginTop: '2rem',
  arrowButtonColor: 'secondary'
};

export default Carousel;
