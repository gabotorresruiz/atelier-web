import { FC } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import HoverBox from '@component/HoverBox';
import { calculateDiscount, currency } from '@utils/utils';
import Card from '../Card';
import FlexBox from '../FlexBox';
import { H6, SemiSpan } from '../Typography';

// ==============================================================
type ProductCard8Props = {
  id: string;
  off: number;
  slug: string;
  price: number;
  title: string;
  imgUrl: string;
  [key: string]: unknown;
};
// ==============================================================

const ProductCard8: FC<ProductCard8Props> = ({ price, title, off, slug, imgUrl, ...props }) => (
  <Card p="1rem" {...props}>
    <Link href={`/product/${slug}`}>
      <HoverBox mb="0.75rem" borderRadius={8} overflow="hidden">
        <NextImage
          src={imgUrl || '/assets/images/products/Rectangle 116.png'}
          width={500}
          height={500}
          layout="responsive"
          objectFit="contain"
          objectPosition="center"
          alt="Descripción de la imagen"
        />
      </HoverBox>

      <SemiSpan title={title} mb="0.25rem" color="inherit" ellipsis display="block">
        {title}
      </SemiSpan>

      <FlexBox alignItems="center">
        <H6 color="primary.main" mr="0.25rem">
          {calculateDiscount(price, off)}
        </H6>

        <SemiSpan>
          <del>{currency(price)}</del>
        </SemiSpan>
      </FlexBox>
    </Link>
  </Card>
);

export default ProductCard8;
