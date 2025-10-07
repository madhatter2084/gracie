import { useState, useEffect, useRef } from 'react';

interface SpotifyPlayerProps {
  trackId: string;
  className?: string;
}

export function SpotifyPlayer({ trackId, className = '' }: SpotifyPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock preview URL - In real implementation, you'd get this from Spotify API
  const previewUrl = "https://p.scdn.co/mp3-preview/9a7b4c85cc7b12c41b9ad8b5e36f3e6b4d5f6c7e?cid=preview-url";

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setAudioError(true);
      setIsPlaying(false);
      setAudioLoading(false);
    };

    const handleCanPlay = () => {
      setAudioLoading(false);
      setAudioError(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioError) {
      // If there's an error, try to reload the audio
      setAudioError(false);
      setAudioLoading(true);
      audio.load();
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setAudioLoading(true);
      try {
        await audio.play();
        setIsPlaying(true);
        setAudioLoading(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        setAudioError(true);
        setAudioLoading(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Extract track ID from Spotify URL if needed
  const cleanTrackId = trackId.includes('/') ? trackId.split('/').pop()?.split('?')[0] : trackId;

  return (
    <div className={`spotify-player-container ${className}`}>
      {/* Hidden Audio Element for Preview Playback */}
      <audio 
        ref={audioRef} 
        preload="none"
        onError={() => setAudioError(true)}
      >
        {/* Mock preview URL - Replace with real Spotify preview URL in production */}
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        {/* Fallback preview URL */}
        <source src="https://sample-videos.com/zip/10/mp3/mp3-15s/SampleAudio_0.4mb_mp3.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {isLoading && (
        <div className="spotify-loading-overlay">
          <div className="spotify-loading-content">
            <div className="spotify-loading-spinner">
              <div className="spotify-spinner-ring"></div>
            </div>
            <div className="spotify-loading-text">
              <h4 className="spotify-loading-title">Loading Music Player...</h4>
            </div>
          </div>
        </div>
      )}

      {/* Desktop/Tablet Spotify Player - With Audio Controls */}
      <div className={`spotify-desktop-player d-none d-md-block ${isLoading ? 'd-none' : 'd-block'}`}>
        <div className="spotify-player-card">
          {/* Album Art & Song Info */}
          <div className="spotify-player-header">
            <div className="spotify-album-art">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" 
                alt="Undercover - Gracie Kay"
                className="spotify-album-image"
                onError={(e) => {
                  // Fallback to a different music image
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center';
                }}
              />
            </div>
            <div className="spotify-song-info">
              <h3 className="spotify-song-title">Undercover</h3>
              <p className="spotify-artist-name">Gracie Kay</p>
              <div className="spotify-preview-badge">
                <span>{audioError ? 'Demo' : 'Preview'}</span>
              </div>
            </div>
            <div className="spotify-logo">
              <i className="bi bi-spotify"></i>
            </div>
          </div>

          {/* Progress Bar */}
          {!audioError && duration > 0 && (
            <div className="spotify-progress-container mb-3">
              <div className="spotify-progress-info d-flex justify-content-between align-items-center mb-2">
                <span className="spotify-time-current">{formatTime(currentTime)}</span>
                <span className="spotify-time-total">{formatTime(duration)}</span>
              </div>
              <div className="spotify-progress-bar-container">
                <div 
                  className="spotify-progress-bar"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Player Controls */}
          <div className="spotify-player-controls">
            <div className="spotify-control-buttons">
              <button 
                className="spotify-btn spotify-btn-secondary"
                onClick={() => window.open(`https://open.spotify.com/track/${cleanTrackId}`, '_blank')}
                title="Open in Spotify"
              >
                <i className="bi bi-spotify"></i>
              </button>
              <button 
                className="spotify-btn spotify-btn-secondary"
                onClick={() => window.open(`https://open.spotify.com/track/${cleanTrackId}`, '_blank')}
                title="More options"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <button 
                className="spotify-btn spotify-btn-primary"
                onClick={handlePlayPause}
                disabled={audioLoading}
                title={audioError ? 'Audio unavailable' : isPlaying ? 'Pause' : 'Play Preview'}
              >
                {audioLoading ? (
                  <div className="spotify-loading-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>
                ) : audioError ? (
                  <i className="bi bi-exclamation-circle"></i>
                ) : isPlaying ? (
                  <i className="bi bi-pause-circle"></i>
                ) : (
                  <i className="bi bi-play-circle"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Compact Player - With Audio Controls */}
      <div className={`spotify-mobile-player d-md-none ${isLoading ? 'd-none' : 'd-block'}`}>
        <div className="spotify-compact-card">
          <div className="spotify-compact-header">
            <div className="spotify-compact-album">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=center" 
                alt="Undercover"
                className="spotify-compact-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop&crop=center';
                }}
              />
            </div>
            <div className="spotify-compact-info">
              <h4 className="spotify-compact-title">Undercover</h4>
              <p className="spotify-compact-artist">Gracie Kay</p>
              {!audioError && duration > 0 && (
                <div className="spotify-compact-progress">
                  <div 
                    className="spotify-compact-progress-bar"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              )}
            </div>
            <button 
              className="spotify-compact-play"
              onClick={handlePlayPause}
              disabled={audioLoading}
              title={audioError ? 'Audio unavailable' : isPlaying ? 'Pause' : 'Play Preview'}
            >
              {audioLoading ? (
                <div className="spotify-compact-loading">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
              ) : audioError ? (
                <i className="bi bi-exclamation-circle-fill"></i>
              ) : isPlaying ? (
                <i className="bi bi-pause-circle-fill"></i>
              ) : (
                <i className="bi bi-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}