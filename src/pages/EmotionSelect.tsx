import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { EmotionChip } from '../components/EmotionChip';
import { PrimaryButton } from '../components/PrimaryButton';
import { emotions } from '../utils/emotions';
import { EmotionType } from '../types';

export function EmotionSelect() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);

  const applyEmotionBackground = (emotionId: EmotionType) => {
    const root = document.documentElement;

    const emotionColor = getComputedStyle(root)
      .getPropertyValue(`--emotion-${emotionId}`)
      .trim();

    if (emotionColor) {
      root.style.setProperty('--background', emotionColor);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('selectedEmotion') as EmotionType | null;
    if (saved) {
      setSelectedEmotion(saved);
      applyEmotionBackground(saved);
    }
  }, []);

  const handleEmotionClick = (emotionId: EmotionType) => {
    setSelectedEmotion(emotionId);
    localStorage.setItem('selectedEmotion', emotionId);
    applyEmotionBackground(emotionId);
  };

  const handleNext = () => {
    if (selectedEmotion) {
      navigate('/write', {
        state: { emotion: selectedEmotion },
        replace: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">오늘의 감정을 골라줘</h1>
        <p className="text-gray-500">천천히 생각해도 괜찮아.</p>
      </div>

      {/* 감정 선택 그리드 */}
      <div className="flex-1 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {emotions.map((emotion) => (
            <EmotionChip
              key={emotion.id}
              emotion={emotion}
              selected={selectedEmotion === emotion.id}
              onClick={() => handleEmotionClick(emotion.id)}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="pb-8">
        <PrimaryButton onClick={handleNext} disabled={!selectedEmotion}>
          다음
        </PrimaryButton>
      </div>
    </div>
  );
}
