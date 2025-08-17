'use client';

// استيراد المكونات من Material UI
// يجب التأكد من تثبيت حزمة @mui/material
// نعرف أنواع المكونات المستخدمة
interface CustomChipProps {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'outlined' | 'filled';
  [key: string]: any;
}

// تعريف المكونات يدويًا في حالة عدم توفر حزمة Material UI
const Box = ({ sx, children, ...props }: any) => (
  <div style={sx} {...props}>{children}</div>
);

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  children: React.ReactNode;
  gutterBottom?: boolean;
  paragraph?: boolean;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color?: string;
  fontWeight?: string | number;
  sx?: React.CSSProperties;
  [key: string]: any; // للخصائص الإضافية
}

const Typography = ({ 
  variant = 'body1', 
  children, 
  gutterBottom = false, 
  paragraph = false, 
  align = 'inherit', 
  color = 'inherit', 
  fontWeight = 'normal', 
  sx, 
  ...props 
}: TypographyProps) => {
  const getElement = () => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'subtitle1': return 'h6';
      case 'subtitle2': return 'h6';
      case 'body1': return 'p';
      case 'body2': return 'p';
      default: return 'p';
    }
  };
  
  const Element = getElement();
  
  return (
    <Element 
      style={{
        margin: gutterBottom ? '0 0 0.35em' : paragraph ? '0 0 1em' : '0',
        textAlign: align,
        color: color,
        fontWeight: fontWeight,
        ...(sx || {})
      }} 
      {...props}
    >
      {children}
    </Element>
  );
};

interface DividerProps {
  sx?: { my?: number; [key: string]: any };
}

const Divider = ({ sx }: DividerProps) => (
  <hr style={{ margin: (sx?.my || 0) * 8 + 'px 0', border: 'none', borderTop: '1px solid #eaeaea' }} />
);

interface CardProps {
  variant?: 'outlined' | 'elevation';
  sx?: React.CSSProperties;
  children: React.ReactNode;
  [key: string]: any;
}

const Card = ({ variant, sx, children, ...props }: CardProps) => (
  <div 
    style={{
      border: variant === 'outlined' ? '1px solid #eaeaea' : 'none',
      borderRadius: '4px',
      ...(sx || {})
    }} 
    {...props}
  >
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  [key: string]: any;
}

const CardContent = ({ children, ...props }: CardContentProps) => (
  <div style={{ padding: '16px' }} {...props}>{children}</div>
);

const Chip = ({ label, color = 'default', variant = 'filled', ...props }: CustomChipProps) => {
  const getColor = () => {
    switch (color) {
      case 'success': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#9e9e9e';
    }
  };
  
  return (
    <span 
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '16px',
        fontSize: '0.8125rem',
        backgroundColor: variant === 'outlined' ? 'transparent' : getColor(),
        color: variant === 'outlined' ? getColor() : 'white',
        border: variant === 'outlined' ? `1px solid ${getColor()}` : 'none'
      }} 
      {...props}
    >
      {label}
    </span>
  );
};
import { ApplicationStatus } from '../../services/teachers/teacherApplicationTypes';

// تعريف واجهة لاستجابة التحقق من الطلب
interface ApplicationCheckResponse {
  can_apply: boolean;
  reason?: string;
  status?: ApplicationStatus;
  created_at?: string;
  application_id?: number;
  admin_notes?: string;
  has_application?: boolean;
}

interface ApplicationStatusProps {
  statusData?: ApplicationCheckResponse;
  status?: string;
  applicationId?: number;
  adminNotes?: string;
}

export default function ApplicationStatusComponent({ statusData, status, applicationId, adminNotes }: ApplicationStatusProps) {
  // إذا تم تمرير statusData مباشرة، نستخدمها
  const currentStatus = statusData?.status || status;
  const currentAppId = statusData?.application_id || applicationId;
  const currentAdminNotes = statusData?.admin_notes || adminNotes;

  // تحديد لون الحالة
  const getStatusColor = (status: ApplicationStatus | string | undefined): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    if (!status) return 'default';
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // تحديد نص الحالة
  const getStatusLabel = (status: ApplicationStatus | string | undefined): string => {
    if (!status) return 'غير معروف';
    switch (status) {
      case 'pending':
        return 'قيد المراجعة';
      case 'approved':
        return 'تمت الموافقة';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير معروف';
    }
  };

  // التحقق من وجود حالة للطلب
  if (!currentStatus) {
    return null;
  }

  return (
    <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
      <Typography variant="h6" gutterBottom>
        حالة طلب الانضمام
      </Typography>
      
      <Card variant="outlined" sx={{ marginBottom: '24px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="body1" fontWeight="bold">
              رقم الطلب:
            </Typography>
            <Typography variant="body1" paragraph>
              رقم الطلب: {currentAppId}
            </Typography>
          </Box>
          
          <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="body1" fontWeight="bold">
              تاريخ التقديم:
            </Typography>
            <Typography variant="body1">
              {statusData?.created_at ? new Date(statusData.created_at).toLocaleDateString('ar-SA') : 'غير متوفر'}
            </Typography>
          </Box>
          
          <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="body1" sx={{ marginRight: '8px' }}>
              الحالة:
            </Typography>
            <Chip 
              label={getStatusLabel(currentStatus as ApplicationStatus)} 
              color={getStatusColor(currentStatus as ApplicationStatus)} 
            />
          </Box>
          
          {currentAdminNotes && (
            <Box sx={{ marginTop: '16px' }}>
              <Typography variant="body1" fontWeight="bold">
                ملاحظات المشرف:
              </Typography>
              <Typography variant="body2" paragraph sx={{ marginTop: '8px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                {currentAdminNotes}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      
      {currentStatus === 'pending' && (
        <Typography variant="body2" color="text.secondary">
          طلبك قيد المراجعة من قبل الإدارة. سيتم إشعارك عبر البريد الإلكتروني عند تغيير حالة الطلب.
        </Typography>
      )}
      
      {currentStatus === 'approved' && (
        <Typography variant="body2" color="success.main">
          تمت الموافقة على طلبك! يمكنك الآن تسجيل الدخول باستخدام بيانات الاعتماد المرسلة إلى بريدك الإلكتروني.
        </Typography>
      )}
      
      {currentStatus === 'rejected' && (
        <Typography variant="body2" color="error.main">
          تم رفض طلبك. يرجى مراجعة ملاحظات الإدارة للحصول على مزيد من المعلومات.
        </Typography>
      )}
    </Box>
  );
}
