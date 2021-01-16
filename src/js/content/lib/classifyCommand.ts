import Debug from "@utils/Debug";
import { PREFIX } from "./constants";

type Command = "play" | "pause" | "full-screen" | "search" | "speed" | "link";

export function classifyCommand(text: string): Command | null {
  if (!new RegExp(PREFIX).test(text)) {
    Debug.log(`Prefix ${PREFIX} not detected.`);
    return null;
  }

  if (/search/i.test(text)) {
    return "search";
  }

  if (/speed/i.test(text)) {
    return "speed";
  }

  if (/link/i.test(text)) {
    return "link";
  }

  if (/play/i.test(text)) {
    return "play";
  }

  if (/pause/i.test(text)) {
    return "pause";
  }

  if (/(screen|theater)/i.test(text)) {
    return "full-screen";
  }

  return "___" as Command;
}
