export default {
  isHomePage: () => window.location.pathname === "/",
  isVideoPage: () => window.location.pathname.includes("watch"),
  isVoiceLinksPage: () => window.location.search.includes("voice-link"),
};
