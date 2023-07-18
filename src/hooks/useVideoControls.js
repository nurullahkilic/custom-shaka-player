import React, { useEffect, useState } from "react";

const useVideoControls = ({ ref }) => {
  const video = ref?.current;

  const [state, setVideoState] = useState({
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
  });

  useEffect(() => {
    const updateVideoState = () => {
      setVideoState({
        time: ref?.current?.currentTime,
        duration: ref?.current?.duration,
        paused: ref?.current?.paused,
        muted: ref?.current?.muted,
        volume: ref?.current?.volume,
      });
    };

    ref?.current?.addEventListener("timeupdate", updateVideoState);
    ref?.current?.addEventListener("seeked", updateVideoState);
    ref?.current?.addEventListener("seeking", updateVideoState);
    ref?.current?.addEventListener("play", updateVideoState);
    ref?.current?.addEventListener("pause", updateVideoState);
    ref?.current?.addEventListener("volumechange", updateVideoState);
    ref?.current?.addEventListener("loadedmetadata", updateVideoState);
    ref?.current?.addEventListener("progress", updateVideoState);

    return () => {
      ref?.current?.removeEventListener("timeupdate", updateVideoState);
      ref?.current?.removeEventListener("seeked", updateVideoState);
      ref?.current?.removeEventListener("seeking", updateVideoState);
      ref?.current?.removeEventListener("play", updateVideoState);
      ref?.current?.removeEventListener("pause", updateVideoState);
      ref?.current?.removeEventListener("volumechange", updateVideoState);
      ref?.current?.removeEventListener("loadedmetadata", updateVideoState);
      ref?.current?.removeEventListener("progress", updateVideoState);
    };
  }, [ref]);

  const controls = {
    play: () => {
      if (!ref?.current) return;
      ref.current.play();
    },
    pause: () => {
      if (!ref?.current) return;
      ref.current.pause();
    },
    setMuted: (bool) => {
      if (!ref?.current) return;
      ref.current.muted = bool;
    },
    setVolume: (volume) => {
      if (!ref?.current) return;
      ref.current.volume = volume;
    },
    seekTo: (time) => {
      if (!ref?.current) return;
      ref.current.currentTime = time;
    },
    seekForward: (seconds) => {
      if (!ref?.current) return;
      ref.current.currentTime += seconds;
    },
    seekBackward: (seconds) => {
      if (!ref?.current) return;
      ref.current.currentTime -= seconds;
    },
  };

  return [state, controls];
};

export default useVideoControls;
