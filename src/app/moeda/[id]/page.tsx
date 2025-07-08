'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Paper, Avatar, Container, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDadosMoeda } from '@/hooks/useDadosMoeda';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DetalhesMoeda() {
  const params = useParams();
  const router = useRouter();
  const { moeda, grafico, carregando, erro } = useDadosMoeda(params.id as string);

  if (carregando) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography sx={{ mt: 2 }}>Carregando detalhes da moeda...</Typography>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }
  if (erro) return <Typography color="error">Erro: {erro}</Typography>;
  if (!moeda) return <Typography>Moeda não encontrada</Typography>;

  const dadosGrafico = {
    labels: grafico.map((_, index) => `Dia ${index + 1}`),
    datasets: [
      {
        label: 'Variação de Preço (R$)',
        data: grafico,
        borderColor: moeda.price_change_percentage_24h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: moeda.price_change_percentage_24h >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar src={moeda.image} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography variant="h4">{moeda.name}</Typography>
              <Typography variant="h6" color="text.secondary">
                {moeda.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mb: 1 }}>
            ${moeda.current_price.toLocaleString()}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: moeda.price_change_percentage_24h >= 0 ? 'green' : 'red',
              mb: 2
            }}
          >
            {moeda.price_change_percentage_24h?.toFixed(2)}% (24h)
          </Typography>

          <Typography variant="body2">
            Market Cap: ${moeda.market_cap.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Rank: #{moeda.market_cap_rank}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Variação de Preço - Últimos 7 dias
          </Typography>
          <Line data={dadosGrafico} />
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}