import { play } from "./play";
import { pause } from "./pause";
import { search } from "./search";
import { fullScreen } from "./fullScreen";
import { speed } from "./speed";
import { link } from "./link";
import { scroll } from "./scroll";
import { home } from "./home";
import { skip } from "./skip";

export const commands = {
  play,
  pause,
  search,
  fullScreen,
  speed,
  link,
  scroll,
  home,
  skip,
};

export { classifyCommand } from "./lib/classifyCommand";
