import { NextResponse } from 'next/server';
import { obterTop20Moedas } from '@/services/coingecko';

export async function GET() {
  try {
    const moedas = await obterTop20Moedas();
    return NextResponse.json(moedas);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'Erro ao buscar moedas', details: message },
      { status: 500 }
    );
  }
}