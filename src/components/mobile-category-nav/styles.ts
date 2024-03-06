import styled from 'styled-components';
import { getTheme } from '@utils/utils';
import { layoutConstant } from '@utils/constants';

const MobileCategoryNavStyle = styled.div`
  position: relative;

  .header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
  }

  .main-category-holder {
    background: ${getTheme('colors.gray.300')};
    display: flex;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 130px;
    width: 100%;

    @media screen and (min-width: 768px) {
      bottom: ${layoutConstant.mobileNavHeight};
      flex-direction: column;
      top: 75px;
      width: auto;
    }

    .main-category-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      height: 80px;
      min-width: 90px;
      border-left-color: ${getTheme('colors.primary.main')};
      cursor: pointer;
    }
  }

  .container {
    position: fixed;
    top: 210px;
    bottom: ${layoutConstant.mobileNavHeight};
    left: 0;
    padding: 0.5rem 1rem;
    flex: 1 1 0;
    overflow-y: auto;
    width: 100%;

    @media screen and (min-width: 768px) {
      left: 90px;
      top: 75px;
      width: calc(100% - 90px);
    }
  }

  .ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default MobileCategoryNavStyle;
