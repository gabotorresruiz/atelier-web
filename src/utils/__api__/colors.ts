import Color from '@models/color.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getColors = async (): Promise<Color[]> => {
  const response = await axiosInterceptorInstance.get('api/tintometric-colors');
  return response.data;
};

export default {
  getColors
};
