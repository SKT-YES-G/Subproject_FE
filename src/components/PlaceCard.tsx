import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{place.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{place.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {place.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{place.rating}</span>
            </div>
          )}
          {place.distance && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{place.distance}</span>
            </div>
          )}
        </div>
        
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          지도에서 보기
        </button>
      </div>
    </div>
  );
}
