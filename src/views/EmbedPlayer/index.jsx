import React from "react";
import FullScreenPlayer from "../FullScreenPlayer";

const EmbedPlayer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-zinc-700 p-6">
      <div className="aspect-video max-w-[1080px] w-full bg-black">
        <FullScreenPlayer />
        
      </div>
    </div>
  );
};

export default EmbedPlayer;
