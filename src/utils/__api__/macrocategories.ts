import Macrocategory from '@models/macrocategory.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getMacrocategories = async (): Promise<Macrocategory[]> => {
  const response = await axiosInterceptorInstance.get('api/macro-categories');
  return response.data;
};

const getMacrocategory = async (id: number): Promise<Macrocategory> => {
  const response = await axiosInterceptorInstance.get(`api/macro-categories/${id}`);
  return response.data;
};

export default {
  getMacrocategories,
  getMacrocategory
};
