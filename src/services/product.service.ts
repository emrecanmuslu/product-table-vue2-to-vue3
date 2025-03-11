import apiClient from './api';
import { AxiosResponse } from 'axios';
import { ProductResponse } from '@/types/api';

class ProductService {
  getProducts(page: number, limit: number, order: string): Promise<AxiosResponse<ProductResponse>> {
    const skip = (page - 1) * limit;
    return apiClient.get('/products', {
      params: {
        limit,
        skip,
        sortBy: 'price',
        order,
        delay: 250,
      }
    });
  }
}

export default new ProductService();
