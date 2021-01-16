import PageSelector from "@utils/PageSelector";

export function skip() {
  if (!PageSelector.isVideoPage()) return;

  const skipButton = document.querySelector(
    ".ytp-ad-skip-button.ytp-button"
  ) as HTMLButtonElement | null;
  if (!skipButton) return;

  skipButton.click();
}
