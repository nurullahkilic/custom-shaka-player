import React, { useEffect, useState } from "react";
import FullScreenPlayer from "../FullScreenPlayer";

const EdgePlayer = () => {
  const [video, setVideo] = useState();

  useEffect(() => {
    fetch(import.meta.env.VITE_EDGE_CONFIG_ID)
      .then((res) => res.json())
      .then((data) => {
        const live = data?.items?.live;
        setVideo({
          id: 1267333,
          description:
            "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
          sources: [live?.link_url],
          thumb:
            "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
      
          subtitle: "By Google",
          title: live?.title,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);


  if (!video) return;
  return <FullScreenPlayer video={video} />;
};

export default EdgePlayer;
