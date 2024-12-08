import { useEffect, useRef } from "react";

const VideoPlayer = ({ videoLink, moduleId, onVideoWatched }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      const videoId = getYouTubeVideoId(videoLink);

      playerRef.current = new window.YT.Player(`youtube-player-${moduleId}`, {
        videoId,
        playerVars: {
          autoplay: 0, // Ensure manual start
          controls: 1, // Show playback controls
          modestbranding: 1, // Reduce branding
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    const handlePlayerReady = (event) => {
      // Restore playback position if available
      const savedTime = localStorage.getItem(`video_progress_${moduleId}`);
      if (savedTime) {
        event.target.seekTo(parseFloat(savedTime), true);
      }
    };

    const handlePlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        const duration = playerRef.current.getDuration();

        // Save the video progress periodically
        const interval = setInterval(() => {
          const currentTime = playerRef.current.getCurrentTime();
          const percentage = (currentTime / duration) * 100;

          // Save progress
          localStorage.setItem(`video_progress_${moduleId}`, currentTime);

          //Change to 90% after testing
          if (percentage >= 1) {
            clearInterval(interval);
            onVideoWatched(moduleId);
          }
        }, 1000);

        // Stop saving progress when paused or stopped
        const stopInterval = () => clearInterval(interval);
        playerRef.current.addEventListener("onStateChange", stopInterval);
      }

      if (event.data === window.YT.PlayerState.ENDED) {
        onVideoWatched(moduleId);
      }
    };

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      script.onload = () => {
        window.onYouTubeIframeAPIReady = initializePlayer;
      };
    } else {
      initializePlayer();
    }

    // Cleanup function to remove the player when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoLink, moduleId, onVideoWatched]);

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return <div id={`youtube-player-${moduleId}`} className="w-full h-[500px]"></div>;
};

export default VideoPlayer;
