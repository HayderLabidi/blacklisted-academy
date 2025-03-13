import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  onClose,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={videoUrl}
            controls
            className="w-full h-full"
            autoPlay
            playsInline
          />
          
          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={onPrevious}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              disabled={!onPrevious}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              disabled={!onNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 