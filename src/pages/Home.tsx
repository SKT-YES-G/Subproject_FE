import React from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../components/PrimaryButton';
import { DiaryCard } from '../components/DiaryCard';
import { DiaryEntry } from '../types';

// Mock 최근 일기 데이터
const recentDiaries: DiaryEntry[] = [
  {
    id: '1',
    date: '2026.01.27',
    emotion: 'happy',
    title: '오랜만의 친구 만남',
    content: '오늘 대학 친구들을 만나서 맛있는 브런치를 먹었다. 오랜만에 편하게 이야기하니 정말 좋았어.',
  },
  {
    id: '2',
    date: '2026.01.26',
    emotion: 'calm',
    title: '조용한 카페에서',
    content: '혼자 카페에 앉아 책을 읽었다. 창밖으로 보이는 풍경이 평화로웠어.',
  },
];

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

      {/* 최근 일기 - 하단 고정 */}
      <div className="pb-8">
        <h2 className="text-gray-900 mb-4">최근 일기</h2>
        <div className="space-y-3">
          {recentDiaries.map((entry) => (
            <DiaryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}