import Debug from "@utils/Debug";
import PageSelector from "@utils/PageSelector";
import InvalidCommandError from "../lib/errors/InvalidCommandError";

const NUMBER_PARSING_PATTERN = /(\d|\.)+/g;

const MAX_SPEED = 16;
const MIN_SPEED = 0.0625;

const TEXT_REPLACEMENTS = [
  ["zero", "0"],
  ["won", "1"],
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["v", "5"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
  ["ten", "10"],
  ["dot", "."],
];

export function speed(text: string) {
  if (!PageSelector.isVideoPage()) return;

  const video = document.querySelector("video");
  if (!video) {
    return;
  }

  const speedString =
    TEXT_REPLACEMENTS.reduce(
      (str, [existingValue, replacementValue]) =>
        str.replace(existingValue, replacementValue),
      text
    ).match(NUMBER_PARSING_PATTERN) || [];

  let speedFloat = parseFloat(speedString[0] || "");
  if (typeof speedFloat !== "number") {
    throw new InvalidCommandError(text);
  }

  speedFloat = Math.max(MIN_SPEED, speedFloat);
  speedFloat = Math.min(MAX_SPEED, speedFloat);

  Debug.log(`Speed float: ${speedFloat}`);

  video.playbackRate = speedFloat;
}
