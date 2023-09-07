import { useRef, useEffect, useState } from "react";
import shaka from "shaka-player";
import muxjs from "mux.js";

import { usePlayerState } from "../context/usePlayerState";

const useShakaPlayer = ({
  manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  poster = "https://cms-tabii-public-image.tabii.com/int/w640/q90//w200/23593_0-0-1919-1080.jpeg",
}) => {
  const videoRef = useRef(null);

  const internalPlayer = usePlayerState((state) => state.internalPlayer);
  const setInternalPlayer = usePlayerState((state) => state.setInternalPlayer);

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

  const initAd = (player) => {
    const container = document.getElementById("ad-container");
    const video = videoRef?.current;

    // Create the ad display container.
    // const adDisplayContainer = new google.ima.AdDisplayContainer(
    //   document.getElementById("ad-container"),
    //   videoRef.current
    // );

    // Initialize the container. Must be done via a user action on mobile devices.
    // adDisplayContainer.initialize();

    const adManager = player.getAdManager();
    adManager.initClientSide(container, video);

    // Create ads loader.
    // const adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    // Request video ads.
    const adsRequest = new google.ima.AdsRequest();
    // Your ad tag url should go here. We are using a sample ad tag from the
    // IMA HTML5 SDK implementation guide for this tutorial.
    adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?" +
      "sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&" +
      "impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&" +
      "cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=";
    adManager.requestClientSideAds(adsRequest);
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
    window.muxjs = muxjs;
    window.player = player;

    setInternalPlayer(player);

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(manifestUri);

      player.configure({
        abr: {
          enabled: false,
        },
      });

      // player.configure(
      //   "abr.defaultBandwidthEstimate",
      //   abr.defaultBandwidthEstimate
      // );

      initSubtitle(player);
      initAd(player);

      player.addEventListener("buffering", function (event) {
        console.log("buffering ", event.buffering);
      });

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

      // const languages = player?.getAudioLanguagesAndRoles();

      // player?.selectAudioLanguage(languages[4].language);
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
