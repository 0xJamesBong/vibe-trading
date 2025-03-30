'use client';

import { useState, useEffect } from 'react';
import { Box, Card, TextField, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Button, Stack, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors, styles } from '@/styles/theme';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    analysis?: any;
    pineScript?: string;
    contractCode?: string;
}

const PREMADE_STRATEGIES = [
    {
        title: "NY Trading Hours Strategy",
        description: "Build a bitcoin buying strategy that buys bitcoin whenever New York wakes up at 7am and then sell it when New Yorkers begin to get off work, at 5pm"
    },
    {
        title: "RSI + Volume Strategy",
        description: "Create a strategy that buys when RSI is below 30 and volume is above 200% of the 20-day average, and sells when RSI is above 70 or volume drops below 50% of the 20-day average"
    },
    {
        title: "Moving Average Crossover",
        description: "Implement a strategy that buys when the 20-day moving average crosses above the 50-day moving average, and sells when the 20-day crosses below the 50-day"
    }
];

const LoadingBubble = () => (
    <Box
        sx={{
            alignSelf: 'flex-start',
            maxWidth: '90%',
            p: 2,
            borderRadius: 2,
            backgroundColor: colors.semantic.overlay.light,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
        }}
    >
        <CircularProgress size={20} thickness={4} sx={{ color: colors.semantic.primary }} />
        <Typography variant="body2" sx={{ color: colors.semantic.text.secondary }}>
            Generating strategy...
        </Typography>
    </Box>
);

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! I\'m your trading strategy assistant. I can help you create and implement trading strategies. You can either describe your strategy in detail, or choose from some pre-made examples below.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if the last message is from the assistant and has all required fields
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage.analysis && lastMessage.pineScript && lastMessage.contractCode) {
            setIsLoading(false);
        }
    }, [messages]);

    const handleStrategySelect = (strategy: string) => {
        setInput(strategy);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate strategy');
            }

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'I\'ve analyzed your strategy and generated the necessary code. Here\'s what I\'ve created:',
                    analysis: data.analysis,
                    pineScript: data.pineScript,
                    contractCode: data.contractCode,
                },
            ]);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error while processing your request. Please try again.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessageContent = (message: Message) => {
        if (message.role === 'user') {
            return (
                <Typography
                    variant="body1"
                    color={colors.semantic.text.primary}
                    sx={{ whiteSpace: 'pre-wrap' }}
                >
                    {message.content}
                </Typography>
            );
        }

        return (
            <Box sx={{ width: '100%' }}>
                <Typography
                    variant="body1"
                    color={colors.semantic.text.primary}
                    sx={{ whiteSpace: 'pre-wrap', mb: 2 }}
                >
                    {message.content}
                </Typography>

                {message.analysis && (
                    <Accordion sx={{ mb: 2, backgroundColor: colors.semantic.overlay.light }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Strategy Analysis</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper sx={{ p: 2, backgroundColor: colors.semantic.surface }}>
                                <pre style={{
                                    color: colors.semantic.text.primary,
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'monospace',
                                }}>
                                    {JSON.stringify(message.analysis, null, 2)}
                                </pre>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                )}

                {message.pineScript && (
                    <Accordion sx={{ mb: 2, backgroundColor: colors.semantic.overlay.light }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Pine Script</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper sx={{ p: 2, backgroundColor: colors.semantic.surface }}>
                                <pre style={{
                                    color: colors.semantic.text.primary,
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'monospace',
                                }}>
                                    {message.pineScript}
                                </pre>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                )}

                {message.contractCode && (
                    <Accordion sx={{ backgroundColor: colors.semantic.overlay.light }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Contract Interactions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper sx={{ p: 2, backgroundColor: colors.semantic.surface }}>
                                <pre style={{
                                    color: colors.semantic.text.primary,
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'monospace',
                                }}>
                                    {message.contractCode}
                                </pre>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>
        );
    };

    return (
        <Card sx={{
            ...styles.components.chat.container,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                ...styles.components.chat.header,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: colors.semantic.border,
                backgroundColor: colors.semantic.surface,
            }}>
                <Typography variant="h6" sx={{
                    color: colors.semantic.text.primary,
                    fontWeight: 600,
                    fontSize: '18px',
                }}>
                    Strategy Generator
                </Typography>
            </Box>

            <Box sx={{
                flex: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: colors.semantic.surface,
            }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '90%',
                            p: 2,
                            borderRadius: 2,
                            ...styles.components.chat.message[message.role],
                        }}
                    >
                        {renderMessageContent(message)}
                    </Box>
                ))}

                {isLoading && <LoadingBubble />}

                {messages.length === 1 && !isLoading && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: colors.semantic.text.primary, mb: 2 }}>
                            Pre-made Strategies:
                        </Typography>
                        <Stack spacing={2}>
                            {PREMADE_STRATEGIES.map((strategy, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={() => handleStrategySelect(strategy.description)}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        backgroundColor: colors.semantic.overlay.light,
                                        borderColor: colors.semantic.border,
                                        color: colors.semantic.text.primary,
                                        '&:hover': {
                                            backgroundColor: colors.semantic.overlay.medium,
                                            borderColor: colors.semantic.primary,
                                        },
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {strategy.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            {strategy.description}
                                        </Typography>
                                    </Box>
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>

            <Box sx={styles.components.chat.input.container}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your trading strategy..."
                        disabled={isLoading}
                        sx={styles.components.textField.root}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        sx={{
                            ...styles.components.button.primary,
                            '&.Mui-disabled': {
                                backgroundColor: colors.semantic.overlay.light,
                            },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
} 