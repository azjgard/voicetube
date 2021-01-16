import Debug from "@utils/Debug";
import { createViewElement } from "../views/views";

const LINK_CHECK_INTERVAL_MS = 500;
const LINK_CHECK_INTERVAL_TIMEOUT_MS = 10000;
const LINK_DATA_ID_PROPERTY = "voice_link_id";

/**
 * Since YouTube thumbnails are added dynamically to the DOM, they won't
 * all be present when the page finishes loading. This function polls the DOM
 * every *linkCheckIntervalMs* for *linkCheckIntervalTimeoutMs*, checking the page
 * each time for newly loaded thumbnails that haven't had links added to them yet.
 * @param onNewLink callback function when a new link is found
 */
export default async function createVoiceLinks(
  onNewLink: (voiceLinkId: string, href: string) => void,
  linkCheckIntervalMs = LINK_CHECK_INTERVAL_MS,
  linkCheckIntervalTimeoutMs = LINK_CHECK_INTERVAL_TIMEOUT_MS
) {
  Debug.log("Creating voice links..");

  const linkCheckInterval = setInterval(
    checkForThumbnails,
    linkCheckIntervalMs
  );

  setTimeout(
    () => clearInterval(linkCheckInterval),
    linkCheckIntervalTimeoutMs
  );

  /**
   * heuristic to avoid iterating through the queried thumbnails when
   * the number of thumbnails found is the same as the last poll
   */
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
