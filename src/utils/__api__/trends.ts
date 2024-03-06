import Trend from '@models/trend.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getTrends = async (): Promise<Trend[]> => {
  const response = await axiosInterceptorInstance.get('api/trends');
  return response.data;
};

const getTrend = async (id: string): Promise<Trend> => {
  const response = await axiosInterceptorInstance.get(`api/trends/${id}`);
  return response.data;
};

export default {
  getTrends,
  getTrend
};
