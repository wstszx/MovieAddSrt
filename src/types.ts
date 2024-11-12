export interface SubtitleStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: string;
  color: string;
  backgroundColor: string;
  position: 'bottom' | 'top';
  textShadow?: string;
}

export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface VideoState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}