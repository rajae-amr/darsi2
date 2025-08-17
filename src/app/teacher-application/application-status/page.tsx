'use client';

import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  CircularProgress
} from '@mui/material';
import { TeacherApplicationService } from '../../services/teachers/teacherApplicationService';
import ApplicationStatusComponent from '../components/ApplicationStatus';
import { ApplicationStatus } from '../../services/teachers/teacherApplicationTypes';

// واجهة لاستجابة التحقق من الطلب باستخدام الرقم المميز
interface ApplicationTrackingResponse {
  found: boolean;
  message?: string;
  status?: ApplicationStatus;
  created_at?: string;
  application_id?: number;
  tracking_id?: string;
  admin_notes?: string;
}

export default function TrackApplicationPage() {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationTrackingResponse | null>(null);

  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      setError('الرجاء إدخال الرقم المميز للطلب');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // استدعاء API للتحقق من حالة الطلب باستخدام الرقم المميز
      const response = await TeacherApplicationService.trackApplication(trackingId);
      setApplicationData(response);
      
      if (!response.found) {
        setError(response.message || 'لم يتم العثور على طلب بهذا الرقم المميز');
      }
    } catch (err) {
      setError('حدث خطأ أثناء التحقق من حالة الطلب. الرجاء المحاولة مرة أخرى.');
      console.error('Error tracking application:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          التحقق من حالة طلب الانضمام
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          أدخل الرقم المميز للطلب الذي استلمته عند تقديم طلب الانضمام للتحقق من حالة طلبك.
        </Typography>
        
        <Box component="form" onSubmit={handleTrackingSubmit} sx={{ mt: 4 }}>
          <TextField
            label="الرقم المميز للطلب"
            variant="outlined"
            fullWidth
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="أدخل الرقم المميز للطلب هنا"
            required
            sx={{ mb: 2 }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'التحقق من حالة الطلب'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        
        {applicationData && applicationData.found && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              تم العثور على طلبك! يمكنك الاطلاع على تفاصيل الحالة أدناه.
            </Alert>
            
            <ApplicationStatusComponent 
              status={applicationData.status}
              applicationId={applicationData.application_id}
              adminNotes={applicationData.admin_notes}
            />
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                الرقم المميز للطلب: <strong>{applicationData.tracking_id}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                تاريخ التقديم: {applicationData.created_at ? new Date(applicationData.created_at).toLocaleDateString('ar-SA') : 'غير متوفر'}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
