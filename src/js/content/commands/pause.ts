import PageSelector from "@utils/PageSelector";

export function pause() {
  if (!PageSelector.isVideoPage()) return;

  const video = document.querySelector("video");
  if (!video) {
    return;
  }

  if (!video.paused) {
    video.pause();
  }
}
