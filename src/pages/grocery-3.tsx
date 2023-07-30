import { GetStaticProps } from 'next';
import Container from '@component/Container';
import AppLayout from '@component/layout/AppLayout';
import Section1 from '@sections/grocery-3/Section1';
import Section2 from '@sections/grocery-3/Section2';
import Section3 from '@sections/grocery-3/Section3';
import Section4 from '@sections/grocery-3/Section4';
import api from '@utils/__api__/grocery-3';
// data models
import Product from '@models/product.model';
import { MainCarouselItem, OfferCard } from '@models/grocery-3.model';

// ======================================================
type Grocery3Props = {
  allProducts: Product[];
  offerCards: OfferCard[];
  topSailedProducts: Product[];
  mainCarouselData: MainCarouselItem[];
};
// ======================================================

const GroceryThree = ({
  allProducts,
  mainCarouselData,
  offerCards,
  topSailedProducts
}: Grocery3Props) => (
  <>
    {/* HERO CAROUSEL AREA */}
    <Section1 carouselData={mainCarouselData} />

    <Container>
      {/* OFFER PRODUCTS AREA */}
      <Section2 offerProducts={offerCards} />

      {/* TOP SAILED PRODUCTS AREA */}
      <Section3 products={topSailedProducts} />

      {/* ALL PRODUCTST AREA */}
      <Section4 products={allProducts} />
    </Container>
  </>
);

GroceryThree.layout = AppLayout;

export const getStaticProps: GetStaticProps = async () => {
  const offerCards = await api.getOfferCards();
  const allProducts = await api.getAllProducts();
  const mainCarouselData = await api.getMainCarousel();
  const topSailedProducts = await api.getTopSailedProducts();

  return {
    props: { allProducts, offerCards, topSailedProducts, mainCarouselData }
  };
};

export default GroceryThree;
