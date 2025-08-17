'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';

interface EmailVerificationProps {
  onVerify: (email: string) => Promise<void>;
  loading: boolean;
}

export default function EmailVerification({ onVerify, loading }: EmailVerificationProps) {
  const [email, setEmail] = useState<string>('');

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        التحقق من إمكانية تقديم الطلب
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        يرجى إدخال البريد الإلكتروني للتحقق من إمكانية تقديم طلب انضمام كمعلم.
      </Typography>
      
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          id="email-check"
          label="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => onVerify(email)}
          disabled={loading || !email}
        >
          {loading ? <CircularProgress size={24} /> : 'تحقق'}
        </Button>
      </Box>
    </Box>
  );
}
