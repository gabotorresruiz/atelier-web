import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { filter, sample } from 'lodash';
import NavbarLayout from '@component/layout/NavbarLayout';
import ProductIntro from '@component/products/ProductIntro';
import RelatedProducts from '@component/products/RelatedProducts';
import Product from '@models/product.model';
import Color from '@models/color.model';
import {
  branding,
  categories,
  colors,
  macrocategories,
  products,
  subcategories
} from '@utils/page_resources/product';
// import Box from '@component/Box';
// import FlexBox from '@component/FlexBox';
// import { H5 } from '@component/Typography';
// import ProductReview from '@component/products/ProductReview';
// import ProductDescription from '@component/products/ProductDescription';

// ===============================================================
type Props = {
  product: Product;
  relatedProducts: Product[];
  tintometricSystem: Color[];
};
// ===============================================================

const ProductDetails = ({ product, relatedProducts, tintometricSystem }: Props) => {
  const router = useRouter();

  // Show a loading state when the fallback is rendered
  if (router.isFallback) return <h1>Loading...</h1>;

  return (
    <>
      <ProductIntro product={product} tintometricSystem={tintometricSystem} />

      {/* RELATED PRODUCTS */}
      {relatedProducts.length ? <RelatedProducts products={relatedProducts} /> : null}
    </>
  );
};

ProductDetails.layout = NavbarLayout;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = (params.slug as string).split('-')[0];

  let tintometricSystem = [];
  const brandingResource = await branding.getBranding();
  const categoryList = await categories.getCategories();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const product = await products.getProduct(productId);
  const relatedProducts = filter(
    (await subcategories.getSubcategory(sample(product.subcategories).id.toString())).products,
    (prod) => prod.id.toString() !== productId
  );

  if (product.withTintometric) tintometricSystem = await colors.getColors();

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList,
      product,
      relatedProducts,
      tintometricSystem
    }
  };
};

export default ProductDetails;
