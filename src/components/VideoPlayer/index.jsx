import React from "react";
import shaka from "shaka-player";

const VideoPlayer = ({
  manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
}) => {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  };

  const initPlayer = async () => {
    // Create a Player instance.
    const video = videoRef?.current;
    const player = new shaka.Player(video);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(manifestUri);
      // This runs if the asynchronous load is successful.
      console.log("The video has now been loaded!");
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
    }
  };

  const onErrorEvent = (event) => {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
  };

  const onError = (error) => {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  };

  return (
    <video
      ref={videoRef}
      width="640"
      poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
      controls
      autoPlay
    ></video>
  );
};

export default VideoPlayer;
