import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { filter, sample } from 'lodash';
import NavbarLayout from '@component/layout/NavbarLayout';
import ProductIntro from '@component/products/ProductIntro';
import RelatedProducts from '@component/products/RelatedProducts';
import Product from '@models/product.model';
import { branding, categories, macrocategories, products } from '@utils/page_resources/product';
// import Box from '@component/Box';
// import FlexBox from '@component/FlexBox';
// import { H5 } from '@component/Typography';
// import ProductReview from '@component/products/ProductReview';
// import ProductDescription from '@component/products/ProductDescription';

// ===============================================================
type Props = {
  product: Product;
  relatedProducts: Product[];
};
// ===============================================================

const ProductDetails = ({ product, relatedProducts }: Props) => {
  const router = useRouter();

  // Show a loading state when the fallback is rendered
  if (router.isFallback) return <h1>Loading...</h1>;

  return (
    <>
      <ProductIntro
        id={product.id}
        product={product}
        // price={product.price}
        // title={product.name}
        // image={product.imageUrl}
      />
      {/* <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="80px" mb="26px">
        <H5
          mr="25px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick('description')}
          borderBottom={selectedOption === 'description' && '2px solid'}
          color={selectedOption === 'description' ? 'primary.main' : 'text.muted'}
        >
          Description
        </H5>

        <H5
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick('review')}
          borderBottom={selectedOption === 'review' && '2px solid'}
          color={selectedOption === 'review' ? 'primary.main' : 'text.muted'}
        >
          Review (3)
        </H5>
      </FlexBox> */}
      {/* DESCRIPTION AND REVIEW TAB DETAILS */}
      {/* <Box mb="50px">
        {selectedOption === 'description' && <ProductDescription />}
        {selectedOption === 'review' && <ProductReview />}
      </Box> */}
      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS
      {frequentlyBought && <FrequentlyBought products={frequentlyBought} />}

      AVAILABLE SHOPS
      {shops && <AvailableShops shops={shops} />} */}

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

  const brandingResource = await branding.getBranding();
  const categoryList = await categories.getCategories();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const product = await products.getProduct(productId);
  const relatedProducts = filter(
    (await products.getRelatedProducts(sample(product.subcategories).id)).products,
    (prod) => prod.id.toString() !== productId
  );

  return { props: { brandingResource, categoryList, macrocategoryList, product, relatedProducts } };
};

export default ProductDetails;
