import React from 'react';
import type { SubtitleStyle } from '../types';

const PRESET_STYLES: SubtitleStyle[] = [
  {
    id: 'netflix',
    name: 'Netflix Style',
    fontFamily: 'Arial',
    fontSize: '2rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'bottom',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'
  },
  {
    id: 'youtube',
    name: 'YouTube Style',
    fontFamily: 'Roboto',
    fontSize: '1.8rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'bottom'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    fontFamily: 'Helvetica',
    fontSize: '1.6rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'bottom'
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    fontFamily: 'Impact',
    fontSize: '2.2rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    position: 'bottom',
    textShadow: '3px 3px 0 #000'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    fontFamily: 'Georgia',
    fontSize: '1.8rem',
    color: '#f8f8f8',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'bottom',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
  }
];

interface StyleSelectorProps {
  currentStyle: SubtitleStyle;
  onStyleChange: (style: SubtitleStyle) => void;
}

export function StyleSelector({ currentStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-4">Subtitle Style</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PRESET_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style)}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentStyle.id === style.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-sm font-medium mb-2">{style.name}</div>
            <div
              className="p-2 rounded text-center"
              style={{
                fontFamily: style.fontFamily,
                fontSize: '1rem',
                color: style.color,
                backgroundColor: style.backgroundColor,
                textShadow: style.textShadow
              }}
            >
              Sample Text
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}