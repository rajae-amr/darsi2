'use client';

import React from 'react';
import { 
  Grid, 
  TextField, 
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';
// استيراد الأيقونات من مكتبة Material Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TeacherExperienceDetail } from '../../services/teachers/teacherApplicationTypes';

interface ExperienceDetailFormProps {
  experiences: TeacherExperienceDetail[];
  onChange: (experiences: TeacherExperienceDetail[]) => void;
}

export default function ExperienceDetailForm({ experiences, onChange }: ExperienceDetailFormProps) {
  // إضافة خبرة جديدة فارغة
  const addNewExperience = () => {
    const newExperience: TeacherExperienceDetail = {
      title: '',
      institution: '',
      description: '',
      years: 0,
      is_current: false
    };
    onChange([...experiences, newExperience]);
  };

  // حذف خبرة بناءً على الفهرس
  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    onChange(updatedExperiences);
  };

  // تحديث خبرة موجودة
  const updateExperience = (index: number, field: keyof TeacherExperienceDetail, value: any) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    onChange(updatedExperiences);
  };

  // معالجة تغيير حقل الخبرة الحالية
  const handleCurrentChange = (index: number, checked: boolean) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      is_current: checked,
      // إذا كانت الخبرة حالية، نحذف تاريخ النهاية
      end_date: checked ? undefined : updatedExperiences[index].end_date
    };
    onChange(updatedExperiences);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        الخبرات التدريسية
      </Typography>
      
      {experiences.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          لم يتم إضافة أي خبرات بعد. انقر على زر "إضافة خبرة" لإضافة خبرة جديدة.
        </Typography>
      )}
      
      {experiences.map((exp, index) => (
        <Paper 
          key={index} 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 2, 
            position: 'relative',
            border: '1px solid #e0e0e0',
            borderRadius: '8px'
          }}
        >
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => removeExperience(index)}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          >
            <DeleteIcon />
          </IconButton>
          
          <Grid container spacing={2}>
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                fullWidth
                required
                label="عنوان الخبرة"
                value={exp.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                placeholder="مثال: معلم رياضيات"
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                fullWidth
                label="المؤسسة / الشركة"
                value={exp.institution || ''}
                onChange={(e) => updateExperience(index, 'institution', e.target.value)}
                placeholder="مثال: مدرسة النور الثانوية"
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
              <TextField
                fullWidth
                required
                type="number"
                label="عدد سنوات الخبرة"
                value={exp.years || ''}
                onChange={(e) => updateExperience(index, 'years', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0 }}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                value={exp.start_date || ''}
                onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ النهاية"
                value={exp.end_date || ''}
                onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled={exp.is_current}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: 'span 12' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exp.is_current || false}
                    onChange={(e) => handleCurrentChange(index, e.target.checked)}
                  />
                }
                label="هذه هي وظيفتي الحالية"
              />
            </Grid>
            
            <Grid sx={{ gridColumn: 'span 12' }}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="وصف الخبرة"
                value={exp.description || ''}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder="اشرح مهامك ومسؤولياتك وإنجازاتك في هذه الوظيفة"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
      
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />} 
        onClick={addNewExperience}
        fullWidth
        sx={{ mt: 1 }}
      >
        إضافة خبرة جديدة
      </Button>
      
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            إجمالي سنوات الخبرة: {experiences.reduce((sum, exp) => sum + (exp.years || 0), 0)} سنة
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
