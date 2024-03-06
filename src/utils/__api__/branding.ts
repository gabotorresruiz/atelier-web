import Branding from '@models/branding.model';
import axiosInterceptorInstance from 'config/axiosInterceptorInstance';

const getBranding = async (): Promise<Branding[]> => {
  const response = await axiosInterceptorInstance.get('/api/brandings');
  return (
    response.data[0] ?? {
      id: 0,
      name: '',
      title: '',
      subtitle: '',
      email: '',
      phone: '',
      address: '',
      homeImageUrl: '',
      logoImageUrl: ''
    }
  );
};

export default {
  getBranding
};
