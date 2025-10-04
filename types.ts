
export interface Lesson {
  id: string;
  title: string;
  type: 'lecture' | 'quiz' | 'assignment';
  isCompleted: boolean;
  isPreviewable: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  lecturesCount: number;
  level: string;
  category: string;
  curriculum: Module[];
}
