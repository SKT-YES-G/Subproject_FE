import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Share2, RotateCcw, Bookmark } from 'lucide-react';
import { EmotionBadge } from '../components/EmotionBadge';
import { PlaceCard } from '../components/PlaceCard';
import { LoadingScreen } from '../components/LoadingScreen';
import { getEmotionById } from '../utils/emotions';
import { EmotionType, Place } from '../types';

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const emotionId = location.state?.emotion as EmotionType;
  const title = location.state?.title as string;
  const content = location.state?.content as string;
  const date = location.state?.date as string;
  
  const emotion = getEmotionById(emotionId);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadResultData();
  }, []);

  const loadResultData = async () => {
    setIsLoading(true);
    setImageError(false);

    try {
      // 감정에 맞는 이미지 검색 키워드 생성
      const emotionKeywords: Record<EmotionType, string> = {
        happy: 'sunny cheerful landscape',
        excited: 'vibrant colorful nature',
        love: 'romantic sunset scenery',
        calm: 'peaceful zen garden',
        tired: 'cozy bedroom interior',
        sad: 'rainy window mood',
        angry: 'stormy dramatic sky',
        confused: 'abstract maze pattern',
        depressed: 'foggy melancholic landscape',
      };

      // Unsplash에서 이미지 가져오기 (실제로는 생성 API 사용 가정)
      const searchQuery = emotionKeywords[emotionId] || 'peaceful nature';
      
      // Mock 장소 데이터 생성 (실제로는 Google Maps API 사용)
      const mockPlaces: Place[] = [
        {
          id: '1',
          name: '조용한 숲길 카페',
          description: `${emotion?.label || ''}한 분위기의 아늑한 공간`,
          rating: 4.8,
          distance: '1.2km',
        },
        {
          id: '2',
          name: '한강 산책로',
          description: '마음을 정리하기 좋은 산책 코스',
          rating: 4.5,
          distance: '2.5km',
        },
        {
          id: '3',
          name: '북촌 갤러리',
          description: '감성적인 전시를 즐길 수 있는 갤러리',
          rating: 4.7,
          distance: '3.8km',
        },
      ];

      setPlaces(mockPlaces);
      
      // 이미지 로딩 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시로 placeholder 이미지 사용 (실제로는 unsplash_tool 사용)
      setImageUrl(`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop`);
      
    } catch (error) {
      setImageError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    // 공유 기능 (웹 공유 API 또는 클립보드 복사)
    if (navigator.share) {
      navigator.share({
        title: `하루의 색 - ${title}`,
        text: content,
      });
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // 감정 데이터가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!emotion) {
      navigate('/', { replace: true });
    }
  }, [emotion, navigate]);

  if (!emotion) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen message="어울리는 장소를 찾는 중..." />;
  }

  return (
    <div className="min-h-screen bg-[#FEFBF6] max-w-md mx-auto">
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="px-6 py-8 pb-24">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500">{date}</span>
          <EmotionBadge emotion={emotion} />
        </div>

        {/* 생성된 이미지 섹션 */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">오늘의 한 장면</h2>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            {imageError ? (
              <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-100">
                <p className="text-gray-500 mb-4 text-center px-6">
                  이미지 불러오기에 실패했어요
                </p>
                <button
                  onClick={loadResultData}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <img
                src={imageUrl || ''}
                alt="생성된 이미지"
                className="w-full aspect-[4/3] object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>

        {/* 장소 추천 섹션 */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">오늘의 기분에 어울리는 장소</h2>
          {places.length > 0 ? (
            <div className="space-y-3">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <p className="text-gray-500">
                관련 장소를 찾지 못했어요.<br />
                키워드를 바꿔볼까요?
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 액션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              isSaved
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? '저장됨' : '저장'}
          </button>
          
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            공유
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            다시 쓰기
          </button>
        </div>
      </div>
    </div>
  );
}