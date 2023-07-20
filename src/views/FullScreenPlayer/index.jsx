import React from "react";
import {
  FullScreen as FullScreeenWrapper,
  useFullScreenHandle,
} from "react-full-screen";

import { useQuery } from "../../utils";
import useVideoControls from "../../hooks/useVideoControls";
import useShakaPlayer from "../../hooks/useShakaPlayer";

import { videos } from "./videos";
import format from "format-duration";

import {
  Chapters,
  ClosedCaptions,
  FullScreen,
  FullScreenExit,
  GoBack,
  Mute,
  Pause,
  PictureInPicture,
  Play,
  SeekBack,
  SeekForward,
  Settings,
  VolumeHigh,
  VolumeLow,
} from "../../icons";

const FullScreenPlayer = () => {
  const handle = useFullScreenHandle();

  let videoId = useQuery().get("v") || 4135028;
  const video = videos.find((video) => video.id === Number(videoId));

  const [videoRef, textTrackRef] = useShakaPlayer({
    manifestUri: video?.sources?.[0],
    poster: video?.thumb,
  });
  const [state, controls] = useVideoControls({ ref: videoRef });

  const handleLoadedMetadata = () => {
    const video = videoRef?.current;
    if (!video) return;
  };

  return (
    <FullScreeenWrapper
      handle={handle}
      className="relative w-full h-full flex flex-col items-center justify-center gap-6 bg-black"
    >
      <div className="absolute inset-0 aspect-video h-full w-full flex items-center justify-center z-0">
        <video
          className="aspect-video min-h-full min-w-full"
          ref={videoRef}
          onLoadedMetadata={handleLoadedMetadata}
        ></video>
      </div>
      <div className="absolute inset-0">
        {/* Top Side */}
        <div className="absolute top-0 left-0 right-0 w-full h-[15%] bg-gradient-to-b from-[rgba(0,0,0,.75)] flex flex-col items-center justify-end ">
          <div className="w-full h-full flex flex-col items-start justify-start px-2 text-white">
            <div className="w-full flex flex-row items-start justify-between pt-4 pl-4">
              <div className="h-full flex-1  flex flex-row items-start justify-start gap-4">
                <ControlsIcon icon={<GoBack />} />
                <div className="h-full flex flex-col items-start justify-start gap-[5px]">
                  <p className="text-2xl font-bold leading-none">
                    {video?.title}
                  </p>
                  <h6 className="text-base text-zinc-300 leading-none">
                    Season 1 Episode 12
                  </h6>
                </div>
              </div>
              <div className="h-full flex-1  flex flex-row items-start justify-end gap-2">
                <div className="h-full flex flex-row items-start justify-end gap-2">
                  <ControlsIcon icon={<Chapters />} />
                  <ControlsIcon icon={<Settings />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Side */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[18%] bg-gradient-to-t from-[rgba(0,0,0,.65)] flex flex-col items-center justify-end ">
          <div className="w-full h-full flex flex-col items-center justify-end px-2 text-white">
            <div ref={textTrackRef}></div>
            <div className="w-full px-2">
              <input
                type="range"
                min={0}
                max={1000}
                value={Number((state?.time / state?.duration) * 1000) || 0}
                step="0.05"
                onChange={(e) =>
                  controls.seekTo((e.target.value / 1000) * state?.duration)
                }
                className="w-full h-1 bg-white/20 rounded-full"
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between py-4">
              <div className="h-full flex-1  flex flex-row items-center justify-start gap-4">
                <div className="h-full flex flex-row items-center justify-start gap-2">
                  <ControlsIcon
                    icon={<SeekBack />}
                    onClick={() => controls.seekBackward(10)}
                  />
                  <ControlsIcon
                    icon={state.paused ? <Play /> : <Pause />}
                    onClick={state.paused ? controls.play : controls.pause}
                  />
                  <ControlsIcon
                    icon={<SeekForward />}
                    onClick={() => controls.seekForward(10)}
                  />
                  <ControlsIcon
                    icon={
                      state?.muted ? (
                        <Mute />
                      ) : state?.volume > 0.5 ? (
                        <VolumeHigh />
                      ) : (
                        <VolumeLow />
                      )
                    }
                    onClick={
                      state?.muted
                        ? () => controls?.setMuted(false)
                        : () => controls?.setMuted(true)
                    }
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-3 font-semibold">
                  <span>
                    {state?.time ? format(state?.time * 1000) : "0:00"} /{" "}
                    {state?.duration ? format(state?.duration * 1000) : "0:00"}
                  </span>
                  <span className="max-lg:hidden">•</span>
                  <span className="max-lg:hidden">The Explanation</span>
                </div>
              </div>
              <div className="h-full flex-1  flex flex-row items-center justify-end gap-2">
                <div className="h-full flex flex-row items-center justify-end gap-2">
                  <ControlsIcon icon={<ClosedCaptions />} />
                  <ControlsIcon
                    icon={<PictureInPicture />}
                    onClick={() => {
                      if (document.pictureInPictureElement)
                        document.exitPictureInPicture();
                      else if (document.pictureInPictureEnabled)
                        videoRef?.current?.requestPictureInPicture();
                    }}
                  />
                  <ControlsIcon
                    icon={handle.active ? <FullScreenExit /> : <FullScreen />}
                    onClick={handle.active ? handle.exit : handle.enter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreeenWrapper>
  );
};

export default FullScreenPlayer;

const ControlsIcon = ({ icon, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square w-[42px] flex items-center justify-center rounded cursor-pointer hover:bg-white/20 "
      {...props}
    >
      {icon}
    </button>
  );
};
