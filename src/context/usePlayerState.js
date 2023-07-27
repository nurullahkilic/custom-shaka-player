import { create } from "zustand";

export const usePlayerState = create((set) => ({
  instance: null,
  internalPlayer: null,
  videoRef: null,
  setInstance: (instance) => set({ instance }),
  setInternalPlayer: (internalPlayer) => set({ internalPlayer }),
  setVideoRef: (videoRef) => set({ videoRef }),
}));
