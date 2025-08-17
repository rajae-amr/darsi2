'use client';

import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Alert,
  Divider
} from '@mui/material';

export default function ApplicationInstructions() {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          تعليمات هامة قبل التقديم
        </Typography>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        يرجى قراءة التعليمات التالية بعناية قبل تقديم طلب الانضمام كمعلم في منصتنا
      </Alert>
      
      <List>
        <ListItem sx={{ pb: 2 }}>
          <ListItemText 
            primary={<Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>تأكد من صحة البريد الإلكتروني</Typography>} 
            secondary="سيتم إرسال معلومات تسجيل الدخول (اسم المستخدم وكلمة المرور) إلى بريدك الإلكتروني عند الموافقة على طلبك، لذا تأكد من إدخال بريد إلكتروني صحيح وفعال تستطيع الوصول إليه."
          />
        </ListItem>
        <Divider />
        
        <ListItem sx={{ py: 2 }}>
          <ListItemText 
            primary={<Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>المعلومات الشخصية</Typography>} 
            secondary="تأكد من إدخال بياناتك الشخصية بشكل صحيح ودقيق، حيث سيتم استخدامها في ملفك الشخصي كمعلم وفي التواصل معك."
          />
        </ListItem>
        <Divider />
        
        <ListItem sx={{ py: 2 }}>
          <ListItemText 
            primary={<Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>المؤهلات والخبرات</Typography>} 
            secondary="قم بتوضيح مؤهلاتك العلمية وخبراتك التدريسية بشكل مفصل ودقيق، فهذه المعلومات تؤثر بشكل كبير على قرار قبول طلبك."
          />
        </ListItem>
        <Divider />
        
        <ListItem sx={{ pt: 2 }}>
          <ListItemText 
            primary={<Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>الملفات المرفقة</Typography>} 
            secondary="تأكد من إرفاق نسخ واضحة من سيرتك الذاتية والشهادات العلمية بصيغة PDF أو DOC أو DOCX. يمكن ضغط الشهادات المتعددة في ملف ZIP أو RAR."
          />
        </ListItem>
      </List>
      
      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>ملاحظة هامة:</strong> بعد الموافقة على طلبك، سيتم إنشاء حساب معلم خاص بك وإرسال بيانات الدخول إلى بريدك الإلكتروني. يرجى التحقق من البريد الوارد وكذلك مجلد البريد غير المرغوب فيه (Spam) بعد الموافقة على طلبك.
        </Typography>
      </Alert>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>تنويه:</strong> سيتم الرد على طلبك بعد مراجعة جميع الطلبات المقدمة، وقد يستغرق ذلك حتى <strong>7 أيام عمل</strong>.
        </Typography>
      </Alert>
    </Paper>
  );
}
