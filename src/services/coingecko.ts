import { Moeda } from '@/types/moeda';

const API_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY || 'CG-LTBcC1zamACb69xwTKVA32Rj';

export async function obterTop20Moedas(): Promise<Moeda[]> {
  const headers: HeadersInit = {
    'accept': 'application/json',
    'x-cg-demo-api-key': API_KEY
  };

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
    { 
      method: 'GET',
      headers 
    }
  );
  
  if (!response.ok) {
    throw new Error('Erro ao buscar as moedas');
  }
  
  return response.json();
}