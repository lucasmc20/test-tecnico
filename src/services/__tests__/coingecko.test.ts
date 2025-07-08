import { obterTop20Moedas } from '../coingecko';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('obterTop20Moedas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar moedas quando API responde com sucesso', async () => {
    const mockMoedas = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 50000,
        market_cap_rank: 1
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMoedas,
    } as Response);

    const resultado = await obterTop20Moedas();
    
    expect(resultado).toEqual(mockMoedas);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/coins/markets'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'accept': 'application/json'
        })
      })
    );
  });

  it('deve lançar erro quando API falha', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(obterTop20Moedas()).rejects.toThrow('Erro ao buscar as moedas');
  });
});