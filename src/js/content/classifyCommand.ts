type Command = "play" | "pause";

export default function classifyCommand(text: string): Command | null {
  if (/play/.test(text)) {
    return "play";
  }

  if (/pause/.test(text)) {
    return "pause";
  }

  return null;
}
