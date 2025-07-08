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
      `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,
      {
        headers: {
          'accept': 'application/json',
          'x-cg-demo-api-key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar gráfico');
    }

    const data = await response.json();
    const precos = data.prices;
    
    // Pegar apenas 7 pontos (um por dia)
    const pontosPorDia = Math.floor(precos.length / 7);
    const precosDiarios = [];
    
    for (let i = 0; i < 7; i++) {
      const index = i * pontosPorDia;
      if (precos[index]) {
        precosDiarios.push(precos[index][1]);
      }
    }

    return NextResponse.json(precosDiarios);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'Erro ao buscar gráfico', details: message },
      { status: 500 }
    );
  }
}