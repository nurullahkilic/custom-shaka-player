import React from "react";
import FullScreenPlayer from "../FullScreenPlayer";
import useHlsPlayer from "../../hooks/useHlsPlayer";

const EmbedPlayer = () => {
  // const [videoRef] = useHlsPlayer({
  //   manifestUri: "https://tv-trtspor2.medya.trt.com.tr/master.m3u8",
  //   poster:
  //     "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
  // });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-zinc-700 p-6">
      <div className="aspect-video max-w-[1080px] w-full bg-black">
        <FullScreenPlayer />
        {/* <video autoPlay controls={true} ref={videoRef}></video> */}
      </div>
    </div>
  );
};

export default EmbedPlayer;
