import PageSelector from "@utils/PageSelector";

export function play() {
  if (!PageSelector.isVideoPage()) return;

  const video = document.querySelector("video");
  if (!video) {
    return;
  }

  if (video.paused) {
    video.play();
  }
}
