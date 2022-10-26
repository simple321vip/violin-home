import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import tenant from './tenant';

export function setupMock() {
  createProdMockServer([...tenant]);
}