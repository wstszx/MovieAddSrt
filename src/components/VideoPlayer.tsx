import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Upload, Download } from 'lucide-react';
import type { VideoState, Subtitle, SubtitleStyle } from '../types';

interface VideoPlayerProps {
  subtitles: Subtitle[];
  currentStyle: SubtitleStyle;
  onTimeUpdate: (state: VideoState) => void;
}

export function VideoPlayer({ subtitles, currentStyle, onTimeUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    if (!videoRef.current || !videoUrl) return;

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video-with-subtitles.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate({
        currentTime: video.currentTime,
        duration: video.duration,
        isPlaying
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isPlaying, onTimeUpdate]);

  const getCurrentSubtitle = () => {
    if (!videoRef.current) return null;
    const currentTime = videoRef.current.currentTime;
    return subtitles.find(
      sub => currentTime >= sub.startTime && currentTime <= sub.endTime
    );
  };

  const currentSubtitle = getCurrentSubtitle();

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {!videoUrl ? (
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-gray-400">Upload video</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full rounded-lg"
            onClick={togglePlay}
          />
          <div className="absolute left-4 bottom-4 flex gap-2">
            <button
              onClick={togglePlay}
              className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              title="Download video with subtitles"
            >
              <Download className="w-6 h-6 text-white" />
            </button>
          </div>
          {currentSubtitle && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 text-center p-4 rounded whitespace-pre-line"
              style={{
                fontFamily: currentStyle.fontFamily,
                fontSize: currentStyle.fontSize,
                color: currentStyle.color,
                backgroundColor: currentStyle.backgroundColor,
                textShadow: currentStyle.textShadow,
                [currentStyle.position]: '8px',
                maxWidth: '80%'
              }}
            >
              {currentSubtitle.text}
            </div>
          )}
        </>
      )}
    </div>
  );
}