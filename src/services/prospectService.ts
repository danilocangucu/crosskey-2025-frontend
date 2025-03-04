import axios from 'axios';
import { Prospect } from '../types/Prospect';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getProspects = async (): Promise<Prospect[]> => {
  const response = await axios.get<Prospect[]>(`${BASE_URL}/prospects`);
  return response.data;
};

export const addProspect = async (newProspect: Prospect): Promise<void> => {
  await axios.post(`${BASE_URL}/prospects`, newProspect);
};
