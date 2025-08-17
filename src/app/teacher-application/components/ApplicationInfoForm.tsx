'use client';

import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { TeacherApplicationSubmit, TeacherExperienceDetail } from '../../services/teachers/teacherApplicationTypes';
import ExperienceDetailForm from './ExperienceDetailForm';

interface ApplicationInfoFormProps {
  formData: TeacherApplicationSubmit;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExperiencesChange: (experiences: TeacherExperienceDetail[]) => void;
  onYearsOfExperienceChange: (years: number) => void;
  specializations: { value: string; label: string }[];
  teachingLevels: { value: string; label: string }[];
}

export default function ApplicationInfoForm({ 
  formData, 
  onChange, 
  onSelectChange, 
  onFileChange,
  onExperiencesChange,
  onYearsOfExperienceChange,
  specializations,
  teachingLevels
}: ApplicationInfoFormProps) {
  return (
    <Grid container spacing={3} sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
      <Grid sx={{ gridColumn: 'span 12' }}>
        <TextField
          required
          fullWidth
          id="qualifications"
          name="qualifications"
          label="المؤهلات العلمية"
          value={formData.qualifications}
          onChange={onChange}
          multiline
          rows={3}
          placeholder="اذكر مؤهلاتك العلمية والشهادات الحاصل عليها"
        />
      </Grid>
      
      <Grid sx={{ gridColumn: 'span 12' }}>
        <Box sx={{ mb: 3 }}>
          <ExperienceDetailForm 
            experiences={formData.experiences || []}
            onChange={onExperiencesChange}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              أو يمكنك إدخال الخبرات كنص (للتوافق مع النظام القديم)
            </Typography>
          </Divider>
        </Box>
        
        <TextField
          fullWidth
          id="experience"
          name="experience"
          label="الخبرات التدريسية (كنص)"
          value={formData.experience}
          onChange={onChange}
          multiline
          rows={3}
          placeholder="اذكر خبراتك في مجال التدريس"
        />
      </Grid>
      
      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
        <TextField
          required
          fullWidth
          id="years_of_experience"
          name="years_of_experience"
          label="إجمالي سنوات الخبرة"
          type="number"
          value={formData.years_of_experience || ''}
          onChange={(e) => onYearsOfExperienceChange(parseInt(e.target.value) || 0)}
          inputProps={{ min: 0 }}
        />
      </Grid>
      
      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
        <FormControl fullWidth required>
          <InputLabel id="specialization-label">التخصص</InputLabel>
          <Select
            labelId="specialization-label"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={onSelectChange as any}
            label="التخصص"
          >
            {specializations.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
        <FormControl fullWidth required>
          <InputLabel id="teaching-levels-label">المستويات التعليمية</InputLabel>
          <Select
            labelId="teaching-levels-label"
            id="teaching_levels"
            name="teaching_levels"
            value={formData.teaching_levels}
            onChange={onSelectChange as any}
            label="المستويات التعليمية"
          >
            {teachingLevels.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid sx={{ gridColumn: 'span 12' }}>
        <TextField
          required
          fullWidth
          id="motivation"
          name="motivation"
          label="الدافع للانضمام"
          value={formData.motivation}
          onChange={onChange}
          multiline
          rows={4}
          placeholder="اشرح دوافعك للانضمام كمعلم في منصتنا وما الذي يميزك عن غيرك"
        />
      </Grid>
      
      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ height: '56px' }}
        >
          {formData.cv_file ? 'تم اختيار السيرة الذاتية' : 'رفع السيرة الذاتية (اختياري)'}
          <input
            type="file"
            hidden
            name="cv_file"
            onChange={onFileChange}
            accept=".pdf,.doc,.docx"
          />
        </Button>
        {formData.cv_file && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {typeof formData.cv_file === 'object' ? formData.cv_file.name : ''}
          </Typography>
        )}
      </Grid>
      
      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ height: '56px' }}
        >
          {formData.certificates_file ? 'تم اختيار الشهادات' : 'رفع الشهادات (اختياري)'}
          <input
            type="file"
            hidden
            name="certificates_file"
            onChange={onFileChange}
            accept=".pdf,.doc,.docx,.zip,.rar"
          />
        </Button>
        {formData.certificates_file && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {typeof formData.certificates_file === 'object' ? formData.certificates_file.name : ''}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
