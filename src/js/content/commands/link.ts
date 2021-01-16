import InvalidCommandError from "../lib/errors/InvalidCommandError";
import numberWordsToNumbers, {
  NUMBER_PARSING_PATTERN,
} from "./lib/parseNumberWords";

interface IArgs {
  voiceLinkById: { [id: string]: string };
  voiceLinksActive: boolean;
  text: string;
}

export function link({ voiceLinkById, voiceLinksActive, text }: IArgs) {
  if (!voiceLinksActive) {
    return;
  }

  const [id] = numberWordsToNumbers(text).match(NUMBER_PARSING_PATTERN) || [];
  if (!(id && voiceLinkById[+id])) {
    throw new InvalidCommandError(`Could not find voice link: ${text}`);
  }

  window.location.href = voiceLinkById[+id];
}
