import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import NavbarLayout from '@component/layout/NavbarLayout';
import TrendIntro from '@component/trends/TrendIntro';
import RelatedProducts from '@component/products/RelatedProducts';
import Product from '@models/product.model';
import Trend from '@models/trend.model';
import { branding, categories, macrocategories, trends } from '@utils/page_resources/trend';

// ===============================================================
type Props = {
  trend: Trend;
  relatedProducts: Product[];
};
// ===============================================================

const ProductDetails = ({ trend, relatedProducts }: Props) => {
  const router = useRouter();

  // Show a loading state when the fallback is rendered
  if (router.isFallback) return <h1>Loading...</h1>;

  return (
    <>
      <TrendIntro trend={trend} />

      {/* RELATED PRODUCTS */}
      {relatedProducts.length ? (
        <RelatedProducts title="Productos en la Tendencia" products={relatedProducts} />
      ) : null}
    </>
  );
};

ProductDetails.layout = NavbarLayout;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const trendId = (params.slug as string).split('-')[0];

  const brandingResource = await branding.getBranding();
  const categoryList = await categories.getCategories();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const trend = await trends.getTrend(trendId);
  const relatedProducts = trend.products;

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList,
      trend,
      relatedProducts
    }
  };
};

export default ProductDetails;
