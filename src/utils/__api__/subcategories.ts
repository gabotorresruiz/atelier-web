import Subcategory from '@models/subcategory.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getSubcategories = async (): Promise<Subcategory[]> => {
  const response = await axiosInterceptorInstance.get('api/sub-categories');
  return response.data;
};

const getSubcategory = async (id: number): Promise<Subcategory> => {
  const response = await axiosInterceptorInstance.get(`api/sub-categories/${id}`);
  return response.data;
};

export default {
  getSubcategories,
  getSubcategory
};
