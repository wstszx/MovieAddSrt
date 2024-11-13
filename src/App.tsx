import { useState } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { StyleSelector } from './components/StyleSelector';
import { SubtitleEditor } from './components/SubtitleEditor';
import { sampleSubtitles } from './data/sampleSubtitles';
import type { SubtitleStyle, Subtitle, VideoState } from './types';

export default function App() {
  const [currentStyle, setCurrentStyle] = useState<SubtitleStyle>({
    id: 'netflix',
    name: 'Netflix Style',
    fontFamily: 'Arial',
    fontSize: '2rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'bottom',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'
  });
  const [subtitles, setSubtitles] = useState<Subtitle[]>(sampleSubtitles);
  const [, setVideoState] = useState<VideoState>({
    currentTime: 0,
    duration: 0,
    isPlaying: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Video Subtitle Editor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional subtitles with real-time preview and perfect style consistency
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <VideoPlayer
            subtitles={subtitles}
            currentStyle={currentStyle}
            onTimeUpdate={setVideoState}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <StyleSelector
            currentStyle={currentStyle}
            onStyleChange={setCurrentStyle}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <SubtitleEditor 
            subtitles={subtitles}
            onSubtitlesLoad={setSubtitles}
          />
        </div>
      </div>
    </div>
  );
}