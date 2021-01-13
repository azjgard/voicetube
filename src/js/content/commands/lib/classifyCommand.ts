type Command = "play" | "pause" | "full-screen" | "search";

export function classifyCommand(text: string): Command | null {
  if (/search/.test(text)) {
    return "search";
  }

  if (/play/.test(text)) {
    return "play";
  }

  if (/pause/.test(text)) {
    return "pause";
  }

  if (/screen/.test(text)) {
    return "full-screen";
  }

  return null;
}
