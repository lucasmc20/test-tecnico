import { NextResponse } from 'next/server';
import { obterTop20Moedas } from '@/services/coingecko';

export async function GET() {
  try {
    const moedas = await obterTop20Moedas();
    return NextResponse.json(moedas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar as moedas: ', details: error.message },
      { status: 500 }
    );
  }
}