'use client';

import ListaMoedas from '@/components/ListaMoedas';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container, Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <ListaMoedas />
      </Container>
      <Footer />
    </Box>
  );
}