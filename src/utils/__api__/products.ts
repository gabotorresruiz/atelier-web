import Product from '@models/product.model';
import Subcategory from '@models/subcategory.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInterceptorInstance.get('/api/products');
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await axiosInterceptorInstance.get(`/api/products/${id}`);
  return response.data;
};

const getRelatedProducts = async (subcategoryId: number): Promise<Subcategory> => {
  const response = await axiosInterceptorInstance.get(`/api/sub-categories/${subcategoryId}`);
  return response.data;
};

export default {
  getProduct,
  getProducts,
  getRelatedProducts
};
