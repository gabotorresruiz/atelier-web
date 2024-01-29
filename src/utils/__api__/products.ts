import Product from '@models/product.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInterceptorInstance.get('/api/products');
  return response.data;
};

const getProduct = async (id: number): Promise<Product> => {
  const response = await axiosInterceptorInstance.get(`/api/products/${id}`);
  return response.data;
};

export default {
  getProduct,
  getProducts
};
