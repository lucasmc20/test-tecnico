import useSWR from 'swr';
import { Moeda } from '@/types/moeda';

const buscarMoedas = async (url: string): Promise<Moeda[]> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar moedas: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export function useMoedas() {
  const { data: moedas, error: erro, isLoading: carregando } = useSWR(
    '/api/moedas',
    buscarMoedas,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false
    }
  );

  return {
    moedas: moedas || [],
    carregando,
    erro: erro?.message || null
  };
}