import VoiceListener from "./content/VoiceListener";

const listener = new VoiceListener({
  onResult: (text) => {
    console.log("you said: " + text);
  },
});

console.log("starting listener in 1 second..");
setTimeout(() => {
  listener.start();
}, 1000);

export default {};
