// تعريف نوع الشهادة
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string | null;
  image_url: string | null;
  rating: number;
  created_at: string;
  user: {
    id: number;
    display_name: string;
  } | null;
}