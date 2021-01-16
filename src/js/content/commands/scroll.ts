import PageSelector from "@utils/PageSelector";
import constrainNumber from "../lib/constrainNumber";

type ScrollAction = "scroll-up" | "scroll-down" | "scroll-stop";

const SCROLL_INTERVAL_MS = 2000;
const SCROLL_DISTANCE = 200;

let currentScroll = 0;

export function scroll(action: ScrollAction) {
  if (action === "scroll-stop") {
    return null;
  }

  const getScrollDistance = () => {
    switch (action) {
      case "scroll-up":
        return SCROLL_DISTANCE * -1;
      case "scroll-down":
        return SCROLL_DISTANCE;
    }
  };

  const scrollDistance = getScrollDistance();

  const incrementScroll = () => {
    currentScroll = constrainNumber({
      num: scrollDistance + currentScroll,
      min: 0,
      max: 5000,
    });
  };

  const getScrollAction = () => {
    if (PageSelector.isHomePage()) {
      return () => {
        incrementScroll();
        window.scrollTo({ top: currentScroll, behavior: "smooth" });
      };
    }

    if (PageSelector.isVideoPage()) {
      return () => {
        incrementScroll();
        // TODO: figure out the element that should scroll
        return;
      };
    }

    return null;
  };

  const scrollAction = getScrollAction();

  if (scrollAction) {
    scrollAction();
    return setInterval(scrollAction, SCROLL_INTERVAL_MS);
  }

  return null;
}
