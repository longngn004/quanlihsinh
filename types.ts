export type View = 'dashboard' | 'plan' | 'analytics' | 'ai-assistant' | 'pros-cons' | 'privacy';

export enum UserRole {
  PRINCIPAL = 'Hiệu trưởng',
  TEACHER = 'Giáo viên chủ nhiệm',
  COUNSELOR = 'Giáo viên tâm lý',
  STUDENT = 'Học sinh',
}

export interface User {
  id: string;
  name: string;
  full_name: string; // To align with Student type for display
  role: UserRole;
  password?: string;
}

export enum Emotion {
  Happy = 'Vui',
  Sad = 'Buồn',
  Tired = 'Mệt',
}

export interface Student {
  id: string;
  stt: number;
  student_code: string;
  full_name: string;
  class: string;
  password?: string;
  role: UserRole.STUDENT;
}

export interface Attendance {
  id: string;
  student_id: string;
  timestamp: Date;
  emotion: Emotion;
  status: 'Đúng giờ' | 'Muộn' | 'Vắng';
  minutes_late: number;
}

export interface Note {
  id: string;
  student_id: string;
  alias: string;
  content: string;
  created_at: Date;
}

export interface EmergencyRequest {
  id: string;
  student_id: string;
  alias: string;
  note: string;
  created_at: Date;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export interface Alert {
  id: string;
  student_id: string;
  alert_type: 'Negative_Emotion_Streak' | 'Absence_Pattern' | 'Late_Pattern';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  triggered_at: Date;
}
