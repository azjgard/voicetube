import { play } from "./play";
import { pause } from "./pause";
import { search } from "./search";
import { fullScreen } from "./fullScreen";
import { speed } from "./speed";

export const commands = {
    play,
    pause,
    search,
    fullScreen,
    speed,
};

export { classifyCommand } from "./lib/classifyCommand";
