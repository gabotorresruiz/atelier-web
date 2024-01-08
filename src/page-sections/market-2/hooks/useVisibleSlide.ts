import { useEffect, useState } from 'react';
import useWindowSize from '@hook/useWindowSize';

const INITIAL_VALUE = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  initialSlide: 5
};

type Props = Partial<typeof INITIAL_VALUE>;

const useVisibleSlide = ({ initialSlide, xs, sm, md, lg }: Props = INITIAL_VALUE) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(initialSlide);

  useEffect(() => {
    if (width < 426) setVisibleSlides(xs);
    else if (width < 650) setVisibleSlides(sm);
    else if (md && width < 1024) setVisibleSlides(md);
    else if (lg && width < 1200) setVisibleSlides(lg);
    else setVisibleSlides(initialSlide);
  }, [initialSlide, lg, md, sm, width, xs]);

  return { visibleSlides };
};

export default useVisibleSlide;
