import React, { useRef } from "react";
import shaka from "shaka-player";

const useShakaPlayer = ({
  manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  poster = "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
}) => {
  const videoRef = React.useRef(null);
  const textTrackRef = React.useRef(null);
  React.useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Shaka Cue Displayer
    const textCuesContainer = new shaka.text.UITextDisplayer(
      videoRef,
      textTrackRef.current
    );

    const cuesObject = new shaka.text.Cue(0,10, "Hello World!")
    const cues = []
    cues.push(cuesObject)
    console.log("cuesObject ", cues);

    textCuesContainer.setTextVisibility(true);
    textCuesContainer.append(cues);

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer();
      console.log(
        "textCuesContainer.isTextVisible ",
        textCuesContainer.isTextVisible(),
        textCuesContainer
      );
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  };

  const initPlayer = async () => {
    // Create a Player instance.
    const video = videoRef?.current;
    video.poster = poster;

    const player = new shaka.Player(video);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(manifestUri);

      // Enable text track
      player.setTextTrackVisibility(true);

      // Get available text tracks
      const textTracks = player.getTextTracks();

      console.log("Available text tracks:", textTracks);

      // Select a text track (you can choose the appropriate one)
      player.selectTextTrack(textTracks[2]);

      // Listen for text track changes
      player.addEventListener("texttrackvisibility", (event) => {
        console.log("Text track visibility changed:", event.visible);
      });
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

  return [videoRef, textTrackRef];
};

export default useShakaPlayer;
