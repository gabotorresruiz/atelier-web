import { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '@context/AppContext';
import Box from './Box';
import Chip from './Chip';
import FlexBox from './FlexBox';

const StyledChip = styled(Chip)`
  padding: 0.4rem 0.8rem;

  @media screen and (min-width: 768px) {
    padding: 0.5rem 1.5rem;
  }
`;

const StyledLineSeparator = styled(Box)`
  width: 15px;

  @media screen and (min-width: 768px) {
    width: 50px;
  }
`;

type Step = { title: string; disabled: boolean };

type StepperProps = {
  stepperList: Step[];
  selectedStep?: number;
  onChange?: (step: Step, index: number) => void;
};

const Stepper: FC<StepperProps> = ({ selectedStep, stepperList, onChange }) => {
  const { state } = useAppContext();

  const [selected, setSelected] = useState(selectedStep - 1);

  const getTotalPrice = () =>
    state.cart.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;

  const getBuyerUser = () => {
    const buyerUser = localStorage.getItem('buyingUser') || null;
    if (buyerUser) return true;

    return false;
  };

  const handleStepClick = (step: Step, ind: number) => () => {
    if (!step.disabled && getTotalPrice() !== 0 && getBuyerUser()) {
      setSelected(ind);
      if (onChange) onChange(step, ind);
    }
  };

  useEffect(() => setSelected(selectedStep - 1), [selectedStep]);

  return (
    <FlexBox alignItems="center" flexWrap="wrap" justifyContent="center" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <StyledChip
            my="4px"
            fontSize="14px"
            fontWeight="600"
            color={ind <= selected ? 'white' : 'primary.main'}
            cursor={
              step.disabled || getTotalPrice() === 0 || !getBuyerUser() ? 'not-allowed' : 'pointer'
            }
            bg={ind <= selected ? 'primary.main' : 'primary.light'}
            onClick={handleStepClick(step, ind)}
          >
            {ind + 1}. {step.title}
          </StyledChip>

          {ind < stepperList.length - 1 && (
            <StyledLineSeparator
              height="4px"
              bg={ind < selected ? 'primary.main' : 'primary.light'}
            />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

Stepper.defaultProps = { selectedStep: 1 };

export default Stepper;
