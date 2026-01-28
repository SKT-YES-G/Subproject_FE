import { Emotion } from '../types';

export const emotions: Emotion[] = [
  { id: 'happy', label: '행복', color: '#FFD93D' },
  { id: 'excited', label: '기대', color: '#B4E197' },
  { id: 'love', label: '사랑', color: '#FFB6D9' },
  { id: 'calm', label: '평온', color: '#A7D7F5' },
  { id: 'tired', label: '피곤', color: '#C4B5FD' },
  { id: 'sad', label: '슬픔', color: '#6B9FD8' },
  { id: 'angry', label: '화남', color: '#FF6B6B' },
  { id: 'confused', label: '혼란', color: '#FFB347' },
  { id: 'depressed', label: '우울', color: '#6366F1' },
];

export const getEmotionById = (id: string) => {
  return emotions.find(e => e.id === id);
};
