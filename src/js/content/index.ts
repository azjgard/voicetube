import Debug from "@utils/Debug";

import { commands, classifyCommand } from "./commands";
import InvalidCommandError from "./lib/errors/InvalidCommandError";
import createVoiceLinks from "./lib/createVoiceLinks";
import createVoiceListener from "./lib/createVoiceListener";
import getCommandText from "./lib/getCommandText";

export default function content() {
  Debug.log("Initializing Voice Listener..");

  const voiceLinkById: { [id: string]: string } = {};
  const voiceLinksActive = window.location.search.includes("voice-links");

  if (voiceLinksActive) {
    createVoiceLinks((voiceLinkId, href) => {
      voiceLinkById[voiceLinkId] = href;
    });
  }

  const listener = createVoiceListener({
    onResult: (text) => {
      Debug.log("Voice input detected: " + text);

      const command = classifyCommand(text);
      if (!command) {
        return;
      }

      const commandText = getCommandText(text);

      Debug.log(`Command received: ${command}`);

      switch (command) {
        case "search":
          commands.search(commandText);
          break;
        case "speed":
          commands.speed(commandText);
          break;
        case "link":
          commands.link({
            voiceLinkById,
            voiceLinksActive,
            text: commandText,
          });
          break;
        case "play":
          commands.play();
          break;
        case "pause":
          commands.pause();
          break;
        case "full-screen":
          commands.fullScreen();
          break;
        default:
          throw new InvalidCommandError(commandText);
      }
    },
  });

  listener.start();
}
