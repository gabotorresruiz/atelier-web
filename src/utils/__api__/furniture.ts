import axiosInterceptorInstance from '../../config/axiosInterceptorInstance';
// import Product from 'models/product.model';
// import CategoryNavList from 'models/categoryNavList.model';
// import { FurnitureCarouselItem } from 'models/carousel.model';

// const getTopNewProducts = async (): Promise<Product[]> => {
//   const response = await axios.get('/api/furniture-shop/products?tag=new');
//   return response.data;
// };

// const getTopSellingProducts = async (): Promise<Product[]> => {
//   const response = await axios.get('/api/furniture-shop/products?tag=top-selling');
//   return response.data;
// };

// const getFurnitureProducts = async (): Promise<Product[]> => {
//   const response = await axios.get('/api/furniture-shop/all-products');
//   return response.data;
// };

const getFurnitureShopNavList = async (): Promise<any[]> => {
  const response = await axiosInterceptorInstance.get('api/categories');
  console.log('response: ', response.data);
  return [];
};

// const getMainCarouselData = async (): Promise<FurnitureCarouselItem[]> => {
//   const response = await axios.get('/api/furniture-shop/main-carousel');
//   return response.data;
// };

export default {
  getFurnitureShopNavList
};
