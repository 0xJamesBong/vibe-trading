import { Box, Typography } from '@mui/material';

interface UserSpeechBubbleProps {
    content: string;
}

export function UserSpeechBubble({ content }: UserSpeechBubbleProps) {
    return (
        <Box
            sx={{
                alignSelf: 'flex-end',
                maxWidth: '80%',
                bgcolor: 'primary.main',
                p: 2,
                borderRadius: 2,
                position: 'relative',
                boxShadow: 1,
            }}
        >
            <Typography
                variant="body1"
                color="white"
                sx={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {content}
            </Typography>
        </Box>
    );
} 