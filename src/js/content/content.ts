import Debug from "@utils/Debug";
import PageSelector from "@utils/PageSelector";

import { commands, classifyCommand } from "./commands/commands";
import InvalidCommandError from "./lib/errors/InvalidCommandError";
import createVoiceLinks from "./lib/createVoiceLinks";
import createVoiceListener from "./lib/createVoiceListener";
import getCommandText from "./lib/getCommandText";

export default function content() {
  Debug.log("Initializing Voice Listener..");

  let scrollInterval: NodeJS.Timeout | null = null;

  const voiceLinkById: { [id: string]: string } = {};
  const voiceLinksActive = PageSelector.isVoiceLinksPage();

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
          return commands.search(commandText);
        case "speed":
          return commands.speed(commandText);
        case "scroll-up":
        case "scroll-down":
        case "scroll-stop":
          if (scrollInterval) clearInterval(scrollInterval);
          scrollInterval = commands.scroll(command);
          return;
        case "link":
          return commands.link({
            voiceLinkById,
            voiceLinksActive,
            text: commandText,
          });
        case "play":
          return commands.play();
        case "pause":
          return commands.pause();
        case "full-screen":
          return commands.fullScreen();
        default:
          throw new InvalidCommandError(commandText);
      }
    },
  });

  listener.start();
}
