'use client';

import { 
  Grid, 
  TextField 
} from '@mui/material';
import { TeacherApplicationSubmit } from '../../services/teachers/teacherApplicationTypes';

interface PersonalInfoFormProps {
  formData: TeacherApplicationSubmit;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PersonalInfoForm({ formData, onChange }: PersonalInfoFormProps) {
  return (
    <Grid container sx={{ display: 'flex', flexWrap: 'wrap', margin: '-12px' }}>
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="first_name"
          name="first_name"
          label="الاسم الأول"
          value={formData.first_name}
          onChange={onChange}
        />
      </Grid>
      
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="last_name"
          name="last_name"
          label="الاسم الأخير"
          value={formData.last_name}
          onChange={onChange}
        />
      </Grid>
      
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="البريد الإلكتروني"
          value={formData.email}
          onChange={onChange}
          disabled={true} // لا يمكن تغيير البريد الإلكتروني بعد التحقق
        />
      </Grid>
      
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="phone_number"
          name="phone_number"
          label="رقم الهاتف"
          value={formData.phone_number}
          onChange={onChange}
        />
      </Grid>
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="whatsapp_number"
          name="whatsapp_number"
          label="واتساب"
          value={formData.whatsapp_number}
          onChange={onChange}
        />
      </Grid>
      <Grid sx={{ width: { xs: '100%', sm: '50%' }, padding: '12px' }}>
        <TextField
          required
          fullWidth
          id="telegram_username"
          name="telegram_username"
          label="تلجرام"
          value={formData.telegram_username}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}
