import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListaMoedas from '../ListaMoedas';
import { useMoedas } from '@/hooks/useMoedas';

jest.mock('@/hooks/useMoedas');
const mockUseMoedas = useMoedas as jest.MockedFunction<typeof useMoedas>;

describe('ListaMoedas', () => {
  it('deve exibir loading quando carregando', () => {
    mockUseMoedas.mockReturnValue({
      moedas: [],
      carregando: true,
      erro: null
    });

    render(<ListaMoedas />);
    
    expect(screen.getByText('Carregando moedas...')).toBeInTheDocument();
  });

  it('deve exibir erro quando há erro', () => {
    mockUseMoedas.mockReturnValue({
      moedas: [],
      carregando: false,
      erro: 'Erro de teste'
    });

    render(<ListaMoedas />);
    
    expect(screen.getByText('Erro ao carregar dados: Erro de teste')).toBeInTheDocument();
  });
});