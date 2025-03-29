'use client';

import { useState } from 'react';
import { Box, Card, TextField, IconButton, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface StrategyResponse {
    strategy: {
        name: string;
        description: string;
        conditions: {
            entry: string[];
            exit: string[];
        };
    };
    pineScript: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) {
                throw new Error('Failed to process strategy');
            }

            const data: StrategyResponse = await response.json();

            const aiResponse: Message = {
                role: 'assistant',
                content: `Strategy: ${data.strategy.name}\n\nDescription: ${data.strategy.description}\n\nEntry Conditions:\n${data.strategy.conditions.entry.join('\n')}\n\nExit Conditions:\n${data.strategy.conditions.exit.join('\n')}`,
            };

            setMessages((prev) => [...prev, aiResponse]);

            // Dispatch custom event to update strategy panel
            const event = new CustomEvent('strategyUpdate', { detail: data });
            window.dispatchEvent(event);
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error while processing your strategy. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Strategy Assistant</Typography>
            </Box>

            <Box sx={{
                flex: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                            p: 2,
                            borderRadius: 2,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        <Typography>{message.content}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Describe your trading strategy..."
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                </IconButton>
            </Box>
        </Card>
    );
} 