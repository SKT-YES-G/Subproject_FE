import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { EmotionBadge } from '../components/EmotionBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { LoadingScreen } from '../components/LoadingScreen';
import { getEmotionById } from '../utils/emotions';
import { EmotionType } from '../types';

export function DiaryWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const emotionId = location.state?.emotion as EmotionType;
  const emotion = getEmotionById(emotionId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const today = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).replace(/\./g, '').replace(/ /g, '.');


  // 감정이 선택되지 않은 경우 감정 선택 페이지로 리다이렉트
  useEffect(() => {
    if (!emotion) {
      navigate('/emotion', { replace: true });
    }
  }, [emotion, navigate]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    
    // 이미지 생성 및 장소 추천 시뮬레이션 (2초 대기)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    navigate('/result', {
      state: {
        emotion: emotionId,
        title,
        content,
        date: today,
      },
    });
  };

  // 감정이 없으면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!emotion) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-6 py-8">
      {isLoading && <LoadingScreen message="그림을 그리고 있어요..." />}

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/emotion')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="text-sm text-gray-500">{today}</span>
      </div>

      {/* 선택한 감정 표시 */}
      <div className="mb-6">
        <EmotionBadge emotion={emotion} />
      </div>

      {/* 입력 영역 */}
      <div className="flex-1 mb-6 space-y-6">
        {/* 제목 입력 */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="일기 제목"
            className="w-full px-0 py-3 text-xl font-semibold border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:outline-none bg-transparent transition-colors"
            maxLength={50}
          />
        </div>

        {/* 본문 입력 */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘 있었던 일과 감정을 편하게 적어봐"
            className="w-full h-64 px-0 py-3 border-0 focus:outline-none resize-none bg-transparent"
          />
        </div>

        {/* 안내 문구 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            완성하면 일기 내용에서 키워드를 뽑아 그림과 장소를 추천해요.
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="pb-8">
        <PrimaryButton 
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
          loading={isLoading}
        >
          일기 완성
        </PrimaryButton>
      </div>
    </div>
  );
}