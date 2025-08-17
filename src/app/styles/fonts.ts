import { Cairo, Tajawal, Almarai } from 'next/font/google';

export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
});

export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-tajawal',
});

export const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-almarai',
});

export const fontVariables = `${cairo.variable} ${tajawal.variable} ${almarai.variable}`;
