import { settings } from "./settings";

window.scrollToResumeVideo = async () => {
  window.scrollTo({ top: 0 });

  const scrollStep = 1000;
  const maxScrolls = settings.maxScrolls.getValue; // TODO - change to local storage
  let scrolls = 0;

  while (scrolls < maxScrolls) {
    let videos = document.getElementsByClassName(
      "ytd-thumbnail-overlay-resume-playback-renderer"
    );
    if (videos.length > 0) {
      const target = videos[0];
      const rect = target.getBoundingClientRect();
      // Check if the element is rendered and visible
      if (
        rect.height > 0 &&
        rect.top > 0 &&
        rect.top < window.innerHeight + 2000
      ) {
        window.scrollTo({
          top: rect.top + window.scrollY - 500,
          behavior: "smooth",
        });

        const thumbnail = target.parentNode.parentNode.parentNode;

        thumbnail.style.outline = "3px solid rgb(230, 0, 0)";
        setTimeout(() => (thumbnail.style.outline = ""), 2000);

        console.log("Found and scrolled to video:", target);
        return;
      }
    }
    window.scrollBy(0, scrollStep);
    await new Promise((r) => setTimeout(r, 500));
    scrolls++;
  }

  window.scrollTo({ top: 0 });
  alert("No recently watched videos found.");
};

window.scrollToResumeVideo();

delete window.scrollToResumeVideo;
