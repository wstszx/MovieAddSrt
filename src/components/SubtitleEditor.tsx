import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import type { Subtitle } from '../types';

interface SubtitleEditorProps {
  subtitles: Subtitle[];
  onSubtitlesLoad: (subtitles: Subtitle[]) => void;
}

export function SubtitleEditor({ subtitles, onSubtitlesLoad }: SubtitleEditorProps) {
  const [error, setError] = useState<string>('');

  const parseTimestamp = (timestamp: string): number => {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const subtitles: Subtitle[] = [];
        const lines = content.split('\n');
        
        let currentSubtitle: Partial<Subtitle> = {};
        
        lines.forEach((line) => {
          if (line.includes('-->')) {
            const [start, end] = line.split('-->').map(t => parseTimestamp(t.trim()));
            currentSubtitle.startTime = start;
            currentSubtitle.endTime = end;
          } else if (line.trim() && !line.match(/^\d+$/)) {
            currentSubtitle.text = line.trim();
            if (currentSubtitle.startTime !== undefined && 
                currentSubtitle.endTime !== undefined && 
                currentSubtitle.text) {
              subtitles.push({
                id: Math.random().toString(36).substr(2, 9),
                startTime: currentSubtitle.startTime,
                endTime: currentSubtitle.endTime,
                text: currentSubtitle.text
              });
              currentSubtitle = {};
            }
          }
        });

        onSubtitlesLoad(subtitles);
        setError('');
      } catch (err) {
        setError('Error parsing subtitle file. Please ensure it\'s a valid SRT or VTT file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Subtitles</h3>
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Subtitles
          <input
            type="file"
            accept=".srt,.vtt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-4 space-y-2">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.id}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-sm text-gray-500 mb-1">
              {Math.floor(subtitle.startTime / 60)}:
              {Math.floor(subtitle.startTime % 60).toString().padStart(2, '0')} →{' '}
              {Math.floor(subtitle.endTime / 60)}:
              {Math.floor(subtitle.endTime % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-gray-700">{subtitle.text}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-4">
          {error}
        </div>
      )}
    </div>
  );
}