import Debug from "@utils/Debug";
import { createViewElement } from "../views";

const LINK_CHECK_INTERVAL_MS = 500;
const LINK_CHECK_INTERVAL_TIMEOUT_MS = 10000;
const LINK_DATA_ID_PROPERTY = "voice_link_id";

export default async function createVoiceLinks(
  onNewLink: (voiceLinkId: string, href: string) => void
) {
  Debug.log("Creating voice links..");

  const linkCheckInterval = setInterval(
    checkForThumbnails,
    LINK_CHECK_INTERVAL_MS
  );

  setTimeout(
    () => clearInterval(linkCheckInterval),
    LINK_CHECK_INTERVAL_TIMEOUT_MS
  );

  let linkCount = 0;

  function checkForThumbnails() {
    Debug.log("Checking for thumbnails..");

    const thumbnails = document.querySelectorAll("a#thumbnail");

    if (thumbnails.length > linkCount) {
      linkCount = thumbnails.length;

      for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i] as HTMLAnchorElement;

        const hasVoiceLinkId = Boolean(
          thumbnail.dataset[LINK_DATA_ID_PROPERTY]
        );

        if (hasVoiceLinkId) {
          continue;
        }

        const voiceLinkId = String(i + 1);
        createLink(thumbnail, voiceLinkId);
      }
    }
  }

  function createLink(thumbnail: HTMLAnchorElement, voiceLinkId: string) {
    thumbnail.dataset[LINK_DATA_ID_PROPERTY] = voiceLinkId;
    thumbnail.appendChild(
      createViewElement("VoiceLink", {
        id: voiceLinkId,
      })
    );

    onNewLink(voiceLinkId, thumbnail.href);
  }
}
