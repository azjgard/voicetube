type Command = "play" | "pause" | "full-screen" | "search" | "speed";

export function classifyCommand(text: string): Command | null {
  if (/search/i.test(text)) {
    return "search";
  }

  if (/speed/i.test(text)) {
    return "speed";
  }

  if (/play/i.test(text)) {
    return "play";
  }

  if (/pause/i.test(text)) {
    return "pause";
  }

  if (/screen/i.test(text)) {
    return "full-screen";
  }

  return null;
}
