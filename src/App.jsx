import React from "react";
import EmbedPlayer from "./views/EmbedPlayer";
import FullScreenPlayer from "./views/FullScreenPlayer";

import { useQuery } from "./utils";

const App = () => {
  let query = useQuery().get("type");

  if (query === "embed") return <EmbedPlayer />;
  if (query === "embed") return <EmbedPlayer />;
  return <FullScreenPlayer />;
};

export default App;
