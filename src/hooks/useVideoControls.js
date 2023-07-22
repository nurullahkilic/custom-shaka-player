import hotkeys from "hotkeys-js";
import { useEffect, useState } from "react";

const useVideoControls = ({ ref }) => {
  const [state, setVideoState] = useState({
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
  });

  useEffect(() => {
    const updateVideoState = () => {
      if (ref?.current?.volume === 0) controls.setMuted(true);

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

    hotkeys("f,m,space,up,down,left,right", (e, handler) => {
      e.preventDefault();

      switch (handler.key) {
        case "f":
          break;
        case "m":
          if (!ref?.current?.muted) {
            controls?.setMuted(true);
          }
          break;
        case "space":
          if (ref?.current?.paused) {
            controls.play();
          } else {
            controls.pause();
          }
          break;
        case "up":
          if (!state.muted) controls.setMuted(false);
          controls.setVolumeHigher();
          break;
        case "down":
          if (state.muted) controls.setMuted(false);
          controls.setVolumeLower();
          break;
        case "left":
          controls.seekBackward(10);
          break;
        case "right":
          controls.seekForward(10);
          e.preventDefault();
          break;
      }
    });

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
    setVolumeHigher: () => {
      if (!ref?.current) return;
      ref.current.volume = Math.min(1, ref.current.volume + 0.1);
    },
    setVolumeLower: () => {
      if (!ref?.current) return;
      ref.current.volume = Math.max(0, ref.current.volume - 0.1);
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
