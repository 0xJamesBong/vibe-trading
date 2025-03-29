'use client';

import { Box, Container, Grid } from '@mui/material';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TradingView } from '@/components/trading/TradingView';
import { StrategyPanel } from '@/components/strategy/StrategyPanel';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatInterface />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TradingView />
            <StrategyPanel />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
