'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// استيراد مكونات MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Chip from '@mui/material/Chip';

// استيراد الخدمات والأنواع
import { TeacherApplicationService } from '../services/teachers/teacherApplicationService';
import { 
  TeacherApplicationSubmit, 
  ApplicationCheckResponse,
  TeacherExperienceDetail
} from '../services/teachers/teacherApplicationTypes';

// تعريف واجهة موسعة لاستجابة التحقق من الطلب لتشمل الحقول الإضافية
interface ExtendedApplicationCheckResponse extends ApplicationCheckResponse {
  application_id?: number;
  admin_notes?: string;
  has_application?: boolean;
}

// استيراد المكونات
import EmailVerification from './components/EmailVerification';
import PersonalInfoForm from './components/PersonalInfoForm';
import ApplicationInfoForm from './components/ApplicationInfoForm';
import ApplicationStatusComponent from './components/ApplicationStatus';
import ApplicationInstructions from './components/ApplicationInstructions';

// استيراد البيانات المشتركة
import { specializations, teachingLevels } from './components/ApplicationData';

export default function TeacherApplicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [eligibilityCheck, setEligibilityCheck] = useState<ExtendedApplicationCheckResponse | null>(null);
  
  // حالة التحقق من البريد الإلكتروني
  const [emailToCheck, setEmailToCheck] = useState<string>('');
  
  // بيانات النموذج
  const [formData, setFormData] = useState<TeacherApplicationSubmit>({
    // معلومات الحساب
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    whatsapp_number: '',
    telegram_username: '',
    
    // معلومات طلب الانضمام
    qualifications: '',
    experience: '',
    experiences: [], // مصفوفة الخبرات المفصلة
    specialization: '',
    teaching_levels: '',
    years_of_experience: 0, // إجمالي سنوات الخبرة
    cv_file: null,
    certificates_file: null,
    motivation: ''
  });

  // التحقق من إمكانية تقديم طلب
  const checkEligibility = async (email: string) => {
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني للتحقق');
      return;
    }
    
    try {
      setLoading(true);
      const applicationService = new TeacherApplicationService();
      const response = await applicationService.checkApplicationEligibility(email) as ExtendedApplicationCheckResponse;
      setEligibilityCheck(response);
      
      // إذا كان المستخدم معلمًا بالفعل أو قدم طلبًا سابقًا
      if (!response.can_apply) {
        setError(response.reason || 'لا يمكنك تقديم طلب انضمام كمعلم.');
      } else {
        // إذا كان يمكن تقديم الطلب، قم بتحديث البريد الإلكتروني في النموذج
        setFormData(prev => ({ ...prev, email: email }));
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء التحقق من إمكانية تقديم الطلب');
    } finally {
      setLoading(false);
    }
  };

  // معالجة تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

  };


  // معالجة تغيير القوائم المنسدلة
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement> | any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // معالجة تحميل الملفات
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };
  
  // معالجة تغيير الخبرات المفصلة
  const handleExperiencesChange = (experiences: TeacherExperienceDetail[]) => {
    setFormData(prev => ({ ...prev, experiences }));
    
    // حساب إجمالي سنوات الخبرة تلقائياً من الخبرات المفصلة
    const totalYears = experiences.reduce((sum, exp) => sum + (exp.years || 0), 0);
    setFormData(prev => ({ ...prev, years_of_experience: totalYears }));
  };
  
  // معالجة تغيير إجمالي سنوات الخبرة
  const handleYearsOfExperienceChange = (years: number) => {
    setFormData(prev => ({ ...prev, years_of_experience: years }));
  };

  // إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات الشخصية
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_number || !formData.whatsapp_number || !formData.telegram_username) {
      setError('يرجى ملء جميع البيانات الشخصية');
      return;
    }
    
    // التحقق من صحة بيانات الطلب
    if (!formData.qualifications || !formData.experience || !formData.specialization || 
        !formData.teaching_levels || !formData.motivation) {
      setError('يرجى ملء جميع حقول طلب الانضمام');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const applicationService = new TeacherApplicationService();
      await applicationService.submitApplication(formData);
      
      setSuccess('تم إرسال طلب الانضمام بنجاح! سيتم مراجعته من قبل الإدارة.');
      
      // إعادة التحقق من حالة الطلب بعد الإرسال
      const updatedCheck = await applicationService.checkApplicationEligibility(formData.email);
      setEligibilityCheck(updatedCheck);
      
      // مسح بيانات النموذج
      setFormData({
        // معلومات الحساب
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        whatsapp_number: '',
        telegram_username: '',
        
        // معلومات طلب الانضمام
        qualifications: '',
        experience: '',
        experiences: [],
        specialization: '',
        teaching_levels: '',
        years_of_experience: 0,
        cv_file: null,
        certificates_file: null,
        motivation: ''
      });
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إرسال الطلب');
    } finally {
      setSubmitting(false);
    }
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  // عرض حالة الطلب إذا كان المستخدم قد قدم طلبًا بالفعل
  if (eligibilityCheck && !eligibilityCheck.can_apply && eligibilityCheck.application_id) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            طلب انضمام معلم
          </Typography>
          

          {/* عرض حالة الطلب إذا كان موجودًا */}
          {eligibilityCheck && eligibilityCheck.has_application && (
            <Box sx={{ mb: 4 }}>
              <ApplicationStatusComponent 
                status={eligibilityCheck.status || ''} 
                applicationId={eligibilityCheck.application_id} 
                adminNotes={eligibilityCheck.admin_notes}
              />
            </Box>
          )}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEligibilityCheck(null);
                setEmailToCheck('');
              }}
            >
              العودة
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // عرض نموذج تقديم الطلب
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          طلب الانضمام كمعلم
        </Typography>
        
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          يرجى ملء النموذج التالي لتقديم طلب انضمام كمعلم في منصتنا. سيتم مراجعة طلبك من قبل الإدارة.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            component={Link}
            href="/teacher-application/application-status"
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            التحقق من حالة طلب سابق
          </Button>
        </Box>
        
        <Divider sx={{ mb: 4 }}>
          <Chip label="تقديم طلب جديد" />
        </Divider>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        
        {/* نموذج التحقق من البريد الإلكتروني */}
        {!eligibilityCheck && (
          <EmailVerification 
            onVerify={checkEligibility} 
            loading={loading} 
          />
        )}
        
        {/* نموذج تقديم الطلب */}
        {eligibilityCheck && eligibilityCheck.can_apply && (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              البيانات الشخصية
            </Typography>
            
            <PersonalInfoForm 
              formData={formData} 
              onChange={handleChange} 
            />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
              معلومات طلب الانضمام
            </Typography>
            
            <ApplicationInfoForm 
              formData={formData}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onFileChange={handleFileChange}
              onExperiencesChange={handleExperiencesChange}
              onYearsOfExperienceChange={handleYearsOfExperienceChange}
              specializations={specializations}
              teachingLevels={teachingLevels}
            />
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting}
                sx={{ minWidth: 200 }}
              >
                {submitting ? <CircularProgress size={24} /> : 'إرسال الطلب'}
              </Button>
            </Box>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                هل قمت بتقديم طلب سابقًا؟
              </Typography>
              <Button
                component={Link}
                href="/teacher-application/application-status"
                variant="text"
                color="primary"
                size="small"
              >
                التحقق من حالة طلبك
              </Button>
            </Box>
          </Box>
        )}
      <ApplicationInstructions />

      </Paper>
    </Container>
  );
}
