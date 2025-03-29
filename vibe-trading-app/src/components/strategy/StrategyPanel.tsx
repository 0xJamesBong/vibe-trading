'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    Box,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Strategy {
    name: string;
    description: string;
    conditions: {
        entry: string[];
        exit: string[];
    };
    pineScript: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`strategy-tabpanel-${index}`}
            aria-labelledby={`strategy-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function StrategyPanel() {
    const [tabValue, setTabValue] = useState(0);
    const { connected } = useWallet();
    const [strategy, setStrategy] = useState<Strategy>({
        name: '',
        description: '',
        conditions: {
            entry: [],
            exit: [],
        },
        pineScript: '// Generated Pine Script will appear here',
    });
    const [isExecuting, setIsExecuting] = useState(false);

    useEffect(() => {
        const handleStrategyUpdate = (event: CustomEvent<Strategy>) => {
            setStrategy(event.detail);
            setTabValue(0); // Switch to strategy details tab
        };

        window.addEventListener('strategyUpdate', handleStrategyUpdate as EventListener);

        return () => {
            window.removeEventListener('strategyUpdate', handleStrategyUpdate as EventListener);
        };
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleExecuteStrategy = async () => {
        setIsExecuting(true);
        try {
            // TODO: Implement strategy execution with Jupiter and Kamino
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
            console.log('Executing strategy:', strategy);
        } catch (error) {
            console.error('Strategy execution error:', error);
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <Card>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Strategy Management</Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Strategy Details" />
                    <Tab label="Pine Script" />
                    <Tab label="Execution" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Strategy Name"
                        value={strategy.name}
                        InputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={strategy.description}
                        multiline
                        rows={4}
                        InputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>Entry Conditions</Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        {strategy.conditions.entry.map((condition, index) => (
                            <Typography component="li" key={index}>{condition}</Typography>
                        ))}
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2 }}>Exit Conditions</Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        {strategy.conditions.exit.map((condition, index) => (
                            <Typography component="li" key={index}>{condition}</Typography>
                        ))}
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <TextField
                    value={strategy.pineScript}
                    multiline
                    rows={10}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                        style: { fontFamily: 'monospace' },
                    }}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                {!connected ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Connect your wallet to execute trading strategies
                        </Alert>
                        <WalletMultiButton />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Alert severity="success">Wallet connected</Alert>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExecuteStrategy}
                            disabled={isExecuting || !strategy.name}
                            startIcon={isExecuting && <CircularProgress size={20} />}
                        >
                            {isExecuting ? 'Executing Strategy...' : 'Execute Strategy'}
                        </Button>
                    </Box>
                )}
            </TabPanel>
        </Card>
    );
} 