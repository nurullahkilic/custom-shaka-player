import React from "react";
import EmbedPlayer from "./views/EmbedPlayer";
import FullScreenPlayer from "./views/FullScreenPlayer";

import { useQuery } from "./utils";

import { videos } from "./views/FullScreenPlayer/videos";
import EdgePlayer from "./views/EdgePlayer";

const App = () => {
  let query = useQuery().get("type");
  let videoId = useQuery().get("v") || 4135028;




  const video = videos.find((video) => video.id === Number(videoId));

  if (query === "embed") return <EmbedPlayer video={video} />;
  if (query === "live") return <EdgePlayer  />;
  return <FullScreenPlayer video={video} />;
};

export default App;
