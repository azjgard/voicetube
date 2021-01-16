import Debug from "@utils/Debug";

import { commands, classifyCommand } from "./commands";
import InvalidCommandError from "./lib/errors/InvalidCommandError";
import createVoiceLinks from "./lib/createVoiceLinks";
import createVoiceListener from "./lib/createVoiceListener";

export default function content() {
    Debug.log("Initializing Voice Listener..");

    const listener = createVoiceListener({
        onResult: (text) => {
            Debug.log("Voice input detected: " + text);

            const command = classifyCommand(text);
            if (!command) {
                return;
            }

            Debug.log(`Command received: ${command}`);

            switch (command) {
                case "search":
                    commands.search(text);
                    break;
                case "speed":
                    commands.speed(text);
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
                    throw new InvalidCommandError(text);
            }
        },
    });

    listener.start();

    if (window.location.search.includes("voice-links")) {
        createVoiceLinks();
    }
}
