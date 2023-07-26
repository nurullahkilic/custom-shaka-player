import { useRef, useEffect } from "react";
import Hls from "hls.js";

const useHlsPlayer = ({
  manifestUri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  poster = "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    if (Hls.isSupported()) {
      initPlayer();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = manifestUri;
    }
  };

  const initPlayer = async () => {
    const video = videoRef?.current;

    var hls = new Hls();

    hls.on(Hls.Events.MANIFEST_LOADED, function (event, data) {
      hls.autoLevelEnabled;
      console.log("hls ", hls.levels);
      console.log("data levels ", data.levels);

      console.log(
        "manifest loaded, found " +
          data.levels.length +
          " quality level" +
          hls.levels
      );
    });

    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log(
        "manifest loaded, found " + data.levels.length + " quality level"
      );
    });
    hls.loadSource(manifestUri);
    hls.attachMedia(video);
  };

  return [videoRef];
};

export default useHlsPlayer;
