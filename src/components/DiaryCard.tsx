import React from 'react';
import { DiaryEntry } from '../types';
import { getEmotionById } from '../utils/emotions';

interface DiaryCardProps {
  entry: DiaryEntry;
  onClick?: () => void;
}

export function DiaryCard({ entry, onClick }: DiaryCardProps) {
  const emotion = getEmotionById(entry.emotion);

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 text-left text-[16px]"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">{entry.date}</span>
        {emotion && (
          <span
            className="px-3 py-1 rounded-full text-sm"
            style={{ 
              backgroundColor: emotion.color + '30',
              color: '#1F2937'
            }}
          >
            {emotion.label}
          </span>
        )}
      </div>
      <h3 className="text-gray-900 mb-1">{entry.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
    </button>
  );
}
