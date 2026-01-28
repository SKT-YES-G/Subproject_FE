import React from 'react';
import { Emotion } from '../types';

interface EmotionBadgeProps {
  emotion: Emotion;
}

export function EmotionBadge({ emotion }: EmotionBadgeProps) {
  return (
    <div
      className="inline-flex items-center px-4 py-2 rounded-full font-medium"
      style={{
        backgroundColor: emotion.color + '30',
        color: '#1F2937',
      }}
    >
      {emotion.label}
    </div>
  );
}
