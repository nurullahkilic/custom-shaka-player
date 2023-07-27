import React, { useEffect } from "react";
import {
  FullScreen as FullScreeenWrapper,
  useFullScreenHandle,
} from "react-full-screen";

import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { languageName, useQuery } from "../../utils";
import useVideoControls from "../../hooks/useVideoControls";
import useShakaPlayer from "../../hooks/useShakaPlayer";
import useHlsPlayer from "../../hooks/useHlsPlayer";

import { videos } from "./videos";
import format from "format-duration";

import { usePlayerState } from "../../context/usePlayerState";

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
import { document } from "postcss";

const FullScreenPlayer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const internalPlayer = usePlayerState((state) => state.internalPlayer);

  const handle = useFullScreenHandle();

  let videoId = useQuery().get("v") || 4135028;
  const video = videos.find((video) => video.id === Number(videoId));

  let urlParam = useQuery().get("url");
  let videoURL;

  let videoRef;
  if (urlParam === null) {
    videoURL = video?.sources?.[0];
  } else {
    videoURL = urlParam;
  }

  if (urlParam?.includes(".m3u8") || video?.sources?.[0].includes(".m3u8")) {
    [videoRef] = useHlsPlayer({
      manifestUri: videoURL,
      poster: video?.thumb,
    });
  } else {
    [videoRef] = useShakaPlayer({
      src: videoURL,
      poster: video?.thumb,
    });
  }
  // if (video?.sources?.[0].includes(".m3u8")) {
  //   [videoRef] = useHlsPlayer({
  //     manifestUri: videoURL,
  //     poster: video?.thumb,
  //   });
  // } else {
  //   [videoRef] = useShakaPlayer({
  //     src: videoURL,
  //     poster: video?.thumb,
  //   });
  // }

  const [state, controls] = useVideoControls({ ref: videoRef });

  const handleLoadedMetadata = () => {
    const video = videoRef?.current;
    if (!video) return;
  };

  useEffect(() => {
    console.log("handle", handle);
  }, [handle]);

  return (
    <FullScreeenWrapper
      handle={handle}
      className="relative w-full h-full flex flex-col items-center justify-center gap-6 bg-black"
    >
      <div className="absolute inset-0 aspect-video h-full w-full flex items-center justify-center z-0">
        <video
          className="aspect-video min-h-full min-w-full"
          onLoadedMetadata={handleLoadedMetadata}
          autoPlay={false}
          controls={false}
          ref={videoRef}
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
                  <Menu
                    container={handle?.node?.current}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    contextMenu="true"
                  >
                    <div className="w-[440px] h-full flex flex-row items-start justify-start bg-zinc-700 rounded-md overflow-hidden max-md:w-full">
                      <div className="w-full h-full flex flex-col items-center justify-start">
                        <h4 className="w-full py-3 px-4 text-2xl font-bold border-b-[1px] border-zinc-600">
                          Seslendirme
                        </h4>
                        <div className="w-full flex flex-col items-center justify-center mb-2">
                          {internalPlayer
                            ?.getAudioLanguagesAndRoles()
                            ?.map((track, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  console.log("dil değiştirildi");
                                  internalPlayer?.selectAudioLanguage(
                                    track?.language
                                  );
                                  handleClose();
                                }}
                                className="w-full py-2 px-4 text-lg font-normal text-left transition-colors hover:bg-zinc-600"
                              >
                                {languageName(track?.language)}
                              </button>
                            ))}
                        </div>
                      </div>
                      <div className="w-full h-full flex flex-col items-center justify-start ">
                        <h4 className="w-full py-3 px-4 text-2xl font-bold border-b-[1px] border-zinc-600">
                          Altyazı
                        </h4>
                        <div className="w-full flex flex-col items-center justify-center mb-2">
                          {internalPlayer
                            ?.getTextTracks()
                            ?.map((track, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  console.log("dil değiştirildi");
                                  internalPlayer?.selectTextTrack(track);
                                }}
                                className="w-full py-2 px-4 text-lg font-normal text-left transition-colors hover:bg-zinc-600"
                              >
                                {languageName(track?.language)}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Menu>

                  <ControlsIcon icon={<Chapters />} />
                  <ControlsIcon icon={<Settings />} onClick={handleClick} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Side */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[18%] bg-gradient-to-t from-[rgba(0,0,0,.65)] flex flex-col items-center justify-end ">
          <div className="w-full h-full flex flex-col items-center justify-end px-3 text-white">
            <div id="subtitle-container"></div>
            <div className="w-full px-4">
              <Slider
                type="range"
                min={0}
                max={1000}
                value={Number((state?.time / state?.duration) * 1000) || 0}
                step={0.05}
                onChange={(e) =>
                  controls.seekTo((e.target.value / 1000) * state?.duration)
                }
                valueLabelDisplay={"off"}
                disableSwap={true}
              />
              {/* <input
                type="range"
                min={0}
                max={1000}
                value={Number((state?.time / state?.duration) * 1000) || 0}
                step="0.05"
                onChange={(e) =>
                  controls.seekTo((e.target.value / 1000) * state?.duration)
                }
                className="w-full h-1 bg-white/20 rounded-full"
              /> */}
            </div>
            <div className="w-full flex flex-row items-center justify-between pb-4">
              <div className="h-full flex-1  flex flex-row items-center justify-start gap-4">
                <div className="h-full flex flex-row items-center justify-start gap-2">
                  <ControlsIcon
                    title={"Seek Backward"}
                    icon={<SeekBack />}
                    onClick={() => controls.seekBackward(10)}
                  />
                  <ControlsIcon
                    title={state.paused ? "Play" : "Pause"}
                    icon={state.paused ? <Play /> : <Pause />}
                    onClick={state.paused ? controls.play : controls.pause}
                  />
                  <ControlsIcon
                    title={"Seek Forward"}
                    icon={<SeekForward />}
                    onClick={() => controls.seekForward(10)}
                  />
                  <ControlsIcon
                    title={state?.muted ? "Unmute" : "Mute"}
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
                  <span className="max-lg:hidden">The Explode</span>
                </div>
              </div>
              <div className="h-full flex-1  flex flex-row items-center justify-end gap-2">
                <div className="h-full flex flex-row items-center justify-end gap-2">
                  <ControlsIcon
                    title={"Closed Captions"}
                    icon={<ClosedCaptions />}
                  />
                  <ControlsIcon
                    icon={<PictureInPicture />}
                    title={"Picture In Picture"}
                    onClick={() => {
                      if (document.pictureInPictureElement)
                        document.exitPictureInPicture();
                      else if (document.pictureInPictureEnabled)
                        videoRef?.current?.requestPictureInPicture();
                    }}
                  />
                  <ControlsIcon
                    handle={handle}
                    title={handle.active ? "Exit Full Screen" : "Full Screen"}
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

const ControlsIcon = ({ title, icon, onClick, handle, ...props }) => {
  return (
    <Tooltip title={title} placement="top">
      <button
        onClick={onClick}
        className="aspect-square w-[42px] flex items-center justify-center rounded cursor-pointer hover:bg-white/20 "
        {...props}
      >
        {icon}
      </button>
    </Tooltip>
  );
};
