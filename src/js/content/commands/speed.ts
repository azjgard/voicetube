import Debug from "@utils/Debug";
import PageSelector from "@utils/PageSelector";

import InvalidCommandError from "../lib/errors/InvalidCommandError";

import numberWordsToNumbers, {
  NUMBER_PARSING_PATTERN,
} from "./lib/parseNumberWords";

const MAX_SPEED = 16;
const MIN_SPEED = 0.0625;

export function speed(text: string) {
  if (!PageSelector.isVideoPage()) return;

  const video = document.querySelector("video");
  if (!video) {
    return;
  }

  const speedString =
    numberWordsToNumbers(text).match(NUMBER_PARSING_PATTERN) || [];

  let speedFloat = parseFloat(speedString[0] || "");
  if (typeof speedFloat !== "number") {
    throw new InvalidCommandError(text);
  }

  speedFloat = Math.max(MIN_SPEED, speedFloat);
  speedFloat = Math.min(MAX_SPEED, speedFloat);

  Debug.log(`Speed float: ${speedFloat}`);

  video.playbackRate = speedFloat;
}
