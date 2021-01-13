import PageSelector from "@utils/PageSelector";

export function fullScreen() {
  if (!PageSelector.isVideoPage()) return;

  const btn: HTMLButtonElement | null = document.querySelector(
    ".ytp-size-button.ytp-button"
  );
  if (!btn) {
    return;
  }

  btn.click();
}
