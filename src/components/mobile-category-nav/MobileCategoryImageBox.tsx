import { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'theme/colors';
import FlexBox from '../FlexBox';
import { Paragraph } from '../Typography';

const StyledFlexBox = styled(FlexBox)`
  background-color: ${colors.primary.main};
  border-radius: 5px;
  color: ${colors.gray.white};
  padding: 8px 0;
`;

const StyledParagraph = styled(Paragraph)`
  max-width: 90px;

  @media screen and (min-width: 1200px) {
    max-width: 100%;
  }
`;

type MobileCategoryImageBoxProps = {
  title: string;
};

const MobileCategoryImageBox: FC<MobileCategoryImageBoxProps> = ({ title }) => (
  <StyledFlexBox flexDirection="column" alignItems="center" justifyContent="center">
    <StyledParagraph ellipsis textAlign="center" fontSize="14px" fontWeight={700}>
      {title}
    </StyledParagraph>
  </StyledFlexBox>
);

export default MobileCategoryImageBox;
