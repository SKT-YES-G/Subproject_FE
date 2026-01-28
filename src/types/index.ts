export type EmotionType = 
  | 'happy' 
  | 'excited' 
  | 'love' 
  | 'calm' 
  | 'tired' 
  | 'sad' 
  | 'angry' 
  | 'confused' 
  | 'depressed';

export interface Emotion {
  id: EmotionType;
  label: string;
  color: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  emotion: EmotionType;
  title: string;
  content: string;
  imageUrl?: string;
  places?: Place[];
}

export interface Place {
  id: string;
  name: string;
  description: string;
  rating?: number;
  distance?: string;
}
