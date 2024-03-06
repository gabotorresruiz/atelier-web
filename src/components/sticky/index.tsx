import { cloneElement, FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import StyledSticky from './styles';

export interface StickyProps {
  fixedOn: number;
  children?: ReactElement;
  notifyPosition?: number;
  containerRef?: { current: any };
  onSticky?: (isFixed: boolean) => void;
  notifyOnScroll?: (hasReachedPosition: boolean) => void;
}

const Sticky: FC<StickyProps> = (props) => {
  const { fixedOn, containerRef, children, notifyPosition, notifyOnScroll, onSticky } = props;

  const elementRef = useRef(null);
  const positionRef = useRef(null);
  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);

  const scrollListener = useCallback(() => {
    if (!window) return;

    let distance = window.scrollY - 200 - positionRef.current;

    if (containerRef?.current && containerRef.current?.offsetHeight) {
      let containerDistance =
        containerRef.current.offsetTop + containerRef.current.offsetHeight - window.scrollY;

      if (notifyPosition && notifyOnScroll)
        notifyOnScroll(distance <= notifyPosition && containerDistance > notifyPosition);

      setFixed(distance <= fixedOn && containerDistance > fixedOn);
    }

    if (notifyPosition && notifyOnScroll) {
      notifyOnScroll(distance >= notifyPosition);
    }

    let isFixed = distance > fixedOn;

    setFixed(isFixed);
  }, [containerRef, fixedOn, notifyOnScroll, notifyPosition]);

  useEffect(() => {
    if (!window) return;

    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', scrollListener);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop;
    }
    setParentHeight(elementRef.current?.offsetHeight || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current, children]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  return (
    <StyledSticky
      fixed={fixed}
      ref={elementRef}
      fixedOn={fixedOn}
      componentHeight={parentHeight}
      componentPosition={positionRef.current}
    >
      {cloneElement(children, { isFixed: fixed })}
    </StyledSticky>
  );
};

export default Sticky;
