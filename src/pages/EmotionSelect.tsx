import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { EmotionChip } from '../components/EmotionChip';
import { PrimaryButton } from '../components/PrimaryButton';
import { emotions } from '../utils/emotions';
import { EmotionType } from '../types';

export function EmotionSelect() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);

  const handleNext = () => {
    // 감정이 선택되었을 때만 텍스트 입력 페이지로 이동
    if (selectedEmotion) {
      navigate('/write', { 
        state: { emotion: selectedEmotion },
        replace: false 
      });
    }
  };

  const handleEmotionClick = (emotionId: EmotionType) => {
    // 단일 선택만 가능하도록 설정
    setSelectedEmotion(emotionId);
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

      {/* 하단 버튼 - 감정 선택 시에만 활성화 */}
      <div className="pb-8">
        <PrimaryButton 
          onClick={handleNext}
          disabled={!selectedEmotion}
        >
          다음
        </PrimaryButton>
      </div>
    </div>
  );
}