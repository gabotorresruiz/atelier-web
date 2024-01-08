import { useEffect, useState } from 'react';
import useWindowSize from '@hook/useWindowSize';

const INITIAL_VALUE = {
  xs: 1,
  sm: 2,
  initialSlide: 3
};

const useVisibleSlide = ({ initialSlide, xs, sm } = INITIAL_VALUE) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(initialSlide);

  useEffect(() => {
    if (width < 500) setVisibleSlides(xs);
    else if (width < 950) setVisibleSlides(sm);
    else setVisibleSlides(initialSlide);
  }, [initialSlide, sm, width, xs]);

  return { visibleSlides };
};

export default useVisibleSlide;
