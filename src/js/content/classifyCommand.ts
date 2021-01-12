type Command = "play" | "pause" | "full-screen";

export default function classifyCommand(text: string): Command | null {
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
