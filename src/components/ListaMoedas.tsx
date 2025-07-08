'use client';

import { useState } from 'react';
import { useMoedas } from '@/hooks/useMoedas';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress,
  Alert,
  Avatar,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
  Skeleton
} from '@mui/material';

type OrdemPor = 'market_cap_rank' | 'name' | 'current_price' | 'price_change_percentage_24h' | 'market_cap';
type DirecaoOrdem = 'asc' | 'desc';

export default function ListaMoedas() {
  const { moedas, carregando, erro } = useMoedas();
  const [ordemPor, setOrdemPor] = useState<OrdemPor>('market_cap_rank');
  const [direcaoOrdem, setDirecaoOrdem] = useState<DirecaoOrdem>('asc');
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [busca, setBusca] = useState('');

  if (carregando) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Top 20 Criptomoedas
        </Typography>
        <Paper sx={{ p: 2 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Carregando moedas...</Typography>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={60} sx={{ mt: 1 }} />
          ))}
        </Paper>
      </Box>
    );
  }

  if (erro) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Top 20 Criptomoedas
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar dados: {erro}
        </Alert>
      </Box>
    );
  }

  const criarOrdenador = (propriedade: OrdemPor) => (event: React.MouseEvent<unknown>) => {
    const isAsc = ordemPor === propriedade && direcaoOrdem === 'asc';
    setDirecaoOrdem(isAsc ? 'desc' : 'asc');
    setOrdemPor(propriedade);
  };

  const moedasFiltradas = moedas.filter(moeda =>
    moeda.name.toLowerCase().includes(busca.toLowerCase()) ||
    moeda.symbol.toLowerCase().includes(busca.toLowerCase())
  );

  const moedasOrdenadas = [...moedasFiltradas].sort((a, b) => {
    const valorA = a[ordemPor];
    const valorB = b[ordemPor];
    
    if (typeof valorA === 'string' && typeof valorB === 'string') {
      return direcaoOrdem === 'asc' 
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    }
    
    if (direcaoOrdem === 'asc') {
      return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
    } else {
      return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
    }
  });

  const moedasPaginadas = moedasOrdenadas.slice(
    pagina * linhasPorPagina,
    pagina * linhasPorPagina + linhasPorPagina
  );

  const alterarPagina = (event: unknown, novaPagina: number) => {
    setPagina(novaPagina);
  };

  const alterarLinhasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top 20 Criptomoedas
      </Typography>
      
      <TextField
        fullWidth
        label="Buscar moeda"
        variant="outlined"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={ordemPor === 'market_cap_rank'}
                  direction={ordemPor === 'market_cap_rank' ? direcaoOrdem : 'asc'}
                  onClick={criarOrdenador('market_cap_rank')}
                >
                  Rank
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={ordemPor === 'name'}
                  direction={ordemPor === 'name' ? direcaoOrdem : 'asc'}
                  onClick={criarOrdenador('name')}
                >
                  Moeda
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={ordemPor === 'current_price'}
                  direction={ordemPor === 'current_price' ? direcaoOrdem : 'asc'}
                  onClick={criarOrdenador('current_price')}
                >
                  Preço
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={ordemPor === 'price_change_percentage_24h'}
                  direction={ordemPor === 'price_change_percentage_24h' ? direcaoOrdem : 'asc'}
                  onClick={criarOrdenador('price_change_percentage_24h')}
                >
                  Variação 24h
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={ordemPor === 'market_cap'}
                  direction={ordemPor === 'market_cap' ? direcaoOrdem : 'asc'}
                  onClick={criarOrdenador('market_cap')}
                >
                  Market Cap
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moedasPaginadas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>Nenhuma moeda encontrada</Typography>
                </TableCell>
              </TableRow>
            ) : (
              moedasPaginadas.map((moeda) => (
                <TableRow key={moeda.id}>
                  <TableCell>#{moeda.market_cap_rank}</TableCell>
                  <TableCell>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => window.location.href = `/moeda/${moeda.id}`}
                    >
                      <Avatar src={moeda.image} sx={{ width: 24, height: 24 }} />
                      <div>
                        <Typography variant="body2" fontWeight="bold">
                          {moeda.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {moeda.symbol.toUpperCase()}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    ${moeda.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" style={{ 
                    color: moeda.price_change_percentage_24h >= 0 ? 'green' : 'red' 
                  }}>
                    {moeda.price_change_percentage_24h?.toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">
                    ${moeda.market_cap.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={moedasOrdenadas.length}
          rowsPerPage={linhasPorPagina}
          page={pagina}
          onPageChange={alterarPagina}
          onRowsPerPageChange={alterarLinhasPorPagina}
          labelRowsPerPage="Total por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </TableContainer>
    </div>
  );
}