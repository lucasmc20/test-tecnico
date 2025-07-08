import { NextResponse } from 'next/server';

const API_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY || 'CG-LTBcC1zamACb69xwTKVA32Rj';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await fetch(
      `${API_URL}/coins/${id}`,
      {
        headers: {
          'accept': 'application/json',
          'x-cg-demo-api-key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar as moeda');
    }

    const data = await response.json();
    
    const moeda = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h
    };

    return NextResponse.json(moeda);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'Erro ao buscar as moeda', details: message },
      { status: 500 }
    );
  }
}