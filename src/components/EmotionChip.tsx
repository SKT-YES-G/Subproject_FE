import React from 'react';
import { Emotion } from '../types';

interface EmotionChipProps {
  emotion: Emotion;
  selected?: boolean;
  onClick?: () => void;
}

export function EmotionChip({ emotion, selected = false, onClick }: EmotionChipProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`
        px-6 py-3 rounded-full transition-all duration-200
        ${selected 
          ? 'ring-2 ring-offset-2 shadow-md scale-105' 
          : 'ring-1 ring-gray-200 hover:ring-2 hover:shadow-sm hover:scale-102'
        }
      `}
      style={{
        backgroundColor: selected ? emotion.color : '#FFFFFF',
        color: selected ? '#1F2937' : '#4B5563',
        ringColor: emotion.color,
      }}
      aria-pressed={selected}
    >
      <span className={selected ? 'font-semibold' : 'font-normal'}>
        {emotion.label}
      </span>
    </button>
  );
}