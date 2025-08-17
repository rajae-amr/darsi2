import { Teacher } from "@/app/services/teachers/types";
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { formatDate } from "@/utils/dateUtils";

interface TeacherExperianceProps {
    teacher: Teacher;
}

export default function TeacherExperiance({ teacher }: TeacherExperianceProps) {
    // التحقق من وجود خبرات للمعلم
    if (!teacher.experiences || teacher.experiences.length === 0) {
        return (
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">خبرات المدرس</h2>
                <Typography variant="body1" color="text.secondary">
                    لا توجد خبرات مسجلة لهذا المدرس.
                </Typography>
            </section>
        );
    }

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">خبرات المدرس</h2>
            
            {teacher.experiences.map((experience, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <WorkIcon sx={{ mr: 1, color: "primary.main" }} />
                            <Typography variant="h6" component="div">
                                {experience.title}
                            </Typography>
                            {experience.is_current && (
                                <Chip 
                                    label="الوظيفة الحالية" 
                                    size="small" 
                                    color="primary" 
                                    sx={{ ml: "auto" }} 
                                />
                            )}
                        </Box>

                        {experience.institution && (
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <SchoolIcon sx={{ mr: 1, fontSize: "small", color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary">
                                    {experience.institution}
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <DateRangeIcon sx={{ mr: 1, fontSize: "small", color: "text.secondary" }} />
                            <Typography variant="body2" color="text.secondary">
                                {experience.start_date ? formatDate(experience.start_date) : 'غير محدد'}
                                {' - '}
                                {experience.is_current ? 'حتى الآن' : 
                                 (experience.end_date ? formatDate(experience.end_date) : 'غير محدد')}
                                {' • '}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Typography variant="body1">
                            {experience.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}