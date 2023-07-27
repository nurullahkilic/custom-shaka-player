import React from "react";
import FullScreenPlayer from "../FullScreenPlayer";
import useHlsPlayer from "../../hooks/useHlsPlayer";
// import Slider from "react-rangeslider";
import { Slider, Typography } from "@mui/material";
// import 'react-rangeslider/lib/index.css'

const EmbedPlayer = () => {
  const [value, setValue] = React.useState(0);
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
      {/* <Slider
        min={0}
        max={100}
        value={value}
        onChange={(value) => setValue(value)}
        className="w-full"
        // value={Number((state?.time / state?.duration) * 1000) || 0}
        // step={0.05}
        // onChange={(e) =>
        //   controls.seekTo((e.target.value / 1000) * state?.duration)
        // }
        // className="w-full h-1 bg-white/20 rounded-full"
      /> */}
     
    </div>
  );
};

export default EmbedPlayer;
