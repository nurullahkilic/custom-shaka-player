import { useRef, useEffect, useState } from "react";
import shaka from "shaka-player";

const useShakaPlayer = ({
  manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  poster = "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    initApp();
  }, []);

  const initSubtitle = (player) => {
    const textTracks = player.getTextTracks();

    console.log("Available text tracks:", textTracks);

    const textDisplayer = () => {
      return new shaka.text.UITextDisplayer(
        videoRef.current,
        document.getElementById("subtitle-container")
      );
    };

    player.configure("textDisplayFactory", textDisplayer);
    player.setTextTrackVisibility(true);

    player.selectTextTrack(textTracks?.[0]);

    console.log("textCuesContainer.isTextVisible ", textDisplayer);
  };

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
    video.poster = poster;

    const player = new shaka.Player(video);
    player.configure("manifest.defaultPresentationDelay", 0);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(manifestUri);

      initSubtitle(player);

      // Enable text track
      // player.setTextTrackVisibility(true);

      // Get available text tracks
      // const textTracks = player.getTextTracks();

      // console.log("Available text tracks:", textTracks);

      // Select a text track (you can choose the appropriate one)

      // Listen for text track changes
      // player.addEventListener("texttrackvisibility", (event) => {
      //   console.log("Text track visibility changed:", event.visible);
      // });

      // const textDisplayer = () => {
      //   return new shaka.text.UITextDisplayer(
      //     videoRef.current,
      //     textTrackRef.current
      //   );
      // };

      // player.configure("textDisplayFactory", textDisplayer);
      // player.setTextTrackVisibility(true);

      // console.log("textCuesContainer.isTextVisible ", textDisplayer);

      console.log(
        ".getAudioLanguagesAndRoles() ",
        player?.getAudioLanguagesAndRoles()
      );

      const languages = player?.getAudioLanguagesAndRoles();

      player?.selectAudioLanguage(languages[4].language);
      // player?.selectTextLanguage(languages[1].language);
      // player.selectTextTrack(textTracks?.[1]);

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

  return [videoRef];
};

export default useShakaPlayer;
