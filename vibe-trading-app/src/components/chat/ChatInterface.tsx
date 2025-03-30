'use client';

import { useState } from 'react';
import { Box, Card, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { colors, styles } from '@/styles/theme';

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
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hey how can I assist you today?'
        }
    ]);
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
            console.log('Sending request to OpenAI...');
            const response = await fetch('/api/strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await response.json();
            console.log('Received response:', data);

            // Handle both structured and unstructured responses
            let aiResponse: Message;
            if (data.error) {
                // If it's a system error, show the error message
                aiResponse = {
                    role: 'assistant',
                    content: data.error
                };
            } else if (data.strategy) {
                // If it's a structured strategy response
                aiResponse = {
                    role: 'assistant',
                    content: `Strategy: ${data.strategy.name}\n\nDescription: ${data.strategy.description}\n\nEntry Conditions:\n${data.strategy.conditions.entry.join('\n')}\n\nExit Conditions:\n${data.strategy.conditions.exit.join('\n')}`
                };
            } else {
                // If it's a direct response from OpenAI
                aiResponse = {
                    role: 'assistant',
                    content: data.response || data.content || JSON.stringify(data)
                };
            }

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'I apologize, but I encountered a technical issue. Please try again.'
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card sx={styles.components.chat.container}>
            <Box sx={styles.components.chat.header}>
                <Typography variant="h6" sx={{ color: colors.semantic.text.primary }}>Chat</Typography>
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
                            maxWidth: '80%',
                            p: 2,
                            borderRadius: 2,
                            ...styles.components.chat.message[message.role],
                        }}
                    >
                        <Typography
                            variant="body1"
                            color={colors.semantic.text.primary}
                            sx={{
                                whiteSpace: 'pre-wrap',
                                fontWeight: message.role === 'user' ? 600 : 400,
                            }}
                        >
                            {message.content}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={styles.components.chat.input.container}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
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