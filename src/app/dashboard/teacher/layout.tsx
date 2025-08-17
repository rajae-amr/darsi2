'use client';

import DashboardLayout from '../DashboardLayout';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout userType="teacher">
      {children}
    </DashboardLayout>
  );
}
