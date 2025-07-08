import useSWR from 'swr';

const buscarDadosMoeda = async (id: string) => {
  const [moedaRes, graficoRes] = await Promise.all([
    fetch(`/api/moedas/${id}`),
    fetch(`/api/moedas/${id}/grafico`)
  ]);

  if (!moedaRes.ok || !graficoRes.ok) {
    throw new Error('Erro ao buscar dados da moeda');
  }

  const moeda = await moedaRes.json();
  const grafico = await graficoRes.json();

  return { moeda, grafico };
};

export function useDadosMoeda(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `moeda-${id}` : null,
    () => buscarDadosMoeda(id)
  );

  return {
    moeda: data?.moeda,
    grafico: data?.grafico || [],
    carregando: isLoading,
    erro: error?.message || null
  };
}