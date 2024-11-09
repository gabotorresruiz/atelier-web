import Category from '@models/category.model';
import axiosInterceptorInstance from '../../config/axiosInterceptorInstance';

const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInterceptorInstance.get('api/categories');
  return response.data;
};

const getCategory = async (id: number): Promise<Category> => {
  const response = await axiosInterceptorInstance.get(`api/categories/${id}`);
  return response.data;
};

export default {
  getCategories,
  getCategory
};
