import React from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../components/PrimaryButton';
import { DiaryEntry } from '../types';


export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-6 py-8">
      {/* 상단 여백 */}
      <div className="flex-1 flex flex-col justify-center pb-12">
        {/* 헤더 - 중앙 정렬, 더 큰 타이틀 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl mb-4 text-gray-900">하루의 색</h1>
          <p className="text-lg text-gray-500">오늘의 마음을 기록해요</p>
        </div>

        {/* 메인 CTA - 더 강조 */}
        <div className="mb-16">
          <PrimaryButton onClick={() => navigate('/emotion')}>
            오늘의 일기 쓰기
          </PrimaryButton>
        </div>
      </div>

    </div>
  );
}