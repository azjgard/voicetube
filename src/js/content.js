import VoiceListener from "./content/VoiceListener";
import classifyCommand from "./content/classifyCommand";

import Debug from "../../utils/Debug";

function isVideoPage() {
  return window.location.pathname.includes("watch");
}

function playVideo() {
  Debug.log("playVideo");
  if (!isVideoPage()) return;

  const video = document.querySelector("video");
  if (video.paused) {
    video.play();
  }
}

function pauseVideo() {
  Debug.log("pauseVideo");
  if (!isVideoPage()) return;

  const video = document.querySelector("video");
  if (!video.paused) {
    video.pause();
  }
}

Debug.log("Initializing Voice Listener..");

const listener = new VoiceListener({
  onResult: (text) => {
    Debug.log("Voice input detected: " + text);

    const command = classifyCommand(text);
    if (!command) {
      return;
    }

    switch (command) {
      case "play":
        playVideo();
        break;
      case "pause":
        pauseVideo();
        break;
      default:
        throw new Error("Unsupported command!");
    }
  },
});

Debug.log("Starting Voice Listener speech tracking..");
listener.start();

export default {};
