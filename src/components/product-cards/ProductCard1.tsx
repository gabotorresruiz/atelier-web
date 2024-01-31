import Link from 'next/link';
import Image from '@component/Image';
import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Card, { CardProps } from '@component/Card';
import { H3 } from '@component/Typography';
import { getTheme } from '@utils/utils';
import { deviceSize } from '@utils/constants';

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme('colors.text.hint')};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1Props extends CardProps {
  slug: string;
  title: string;
  imgUrl: string;
  id?: string | number;
}
// =======================================================================

const ProductCard1: FC<ProductCard1Props> = ({ id, slug, title, imgUrl, ...props }) => (
  <Wrapper {...props}>
    <div className="image-holder">
      <Link href={`/product/${id}-${slug}`}>
        <a>
          <Image
            alt={title}
            width="100%"
            src={imgUrl}
            height="100%"
            style={{ objectFit: 'scale-down' }}
          />
        </a>
      </Link>
    </div>
    <div className="details">
      <FlexBox>
        <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
          <Link href={`/product/${id}-${slug}`}>
            <a>
              <H3
                mb="0"
                title={title}
                fontSize="16px"
                textAlign="center"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </a>
          </Link>
        </Box>
      </FlexBox>
    </div>
  </Wrapper>
);

export default ProductCard1;
