import Product from '@models/product.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInterceptorInstance.get('/api/products');
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await axiosInterceptorInstance.get(`/api/products/${id}`);
  return response.data;
};

const getSearchProducts = async (slug: string): Promise<Product[]> => {
  const response = await axiosInterceptorInstance.get(
    `/api/products?search=${slug}&attribute=name`
  );

  return response.data;
};

export default {
  getProduct,
  getProducts,
  getSearchProducts
};
