'use client';

import { useEffect, useRef } from 'react';
import { Card, Box, Typography } from '@mui/material';

declare global {
    interface Window {
        TradingView: any;
    }
}

export function TradingView() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (containerRef.current && window.TradingView) {
                new window.TradingView.widget({
                    container_id: containerRef.current.id,
                    symbol: 'BINANCE:SOLUSDT',
                    interval: '1D',
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    hide_side_toolbar: false,
                    allow_symbol_change: true,
                    studies: ['RSI@tv-basicstudies'],
                    height: '500',
                    width: '100%',
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <Card>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Market Chart</Typography>
            </Box>
            <Box
                ref={containerRef}
                id="tradingview_widget"
                sx={{
                    height: 500,
                    width: '100%',
                }}
            />
        </Card>
    );
} 