function getMaxScrolls() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("maxSearchScroll", (data) => {
      resolve(data.maxSearchScroll);
    });
  });
}

window.scrollToSecondWatchedVideo = async () => {
  window.scrollTo({ top: 0 });

  const scrollStep = 1000;
  const maxScrolls = await getMaxScrolls();
  let scrolls = 0;

  while (scrolls < maxScrolls) {
    // Get all video playback duration elements (includes 1 invisible element per each)
    let videos = document.getElementsByClassName(
      "ytd-thumbnail-overlay-resume-playback-renderer"
    );

    // filter out invisible elements
    videos = Array.from(videos).filter(
      (video) => video.getBoundingClientRect().height > 0
    );

    // Find the SECOND video that HAS the "resume playback" overlay (watched)
    if (videos.length > 2) {
      const target = videos[1];
      const rect = target.getBoundingClientRect();

      // check if video is on screen/loaded
      if (
        rect.height > 0 &&
        rect.top > 0 &&
        rect.top < window.innerHeight + 2000
      ) {
        // scroll to the video with offsets
        window.scrollTo({
          top: rect.top + window.scrollY - 500,
          behavior: "smooth",
        });

        // highlight with an outline
        const thumbnail = target.parentNode.parentNode.parentNode;
        thumbnail.style.outline = "3px solid rgb(230, 0, 0)";
        setTimeout(() => (thumbnail.style.outline = ""), 2000);

        console.log("Found and scrolled to second watched video:", target);
        return;
      }
    }

    // scroll down the page as no video found
    window.scrollBy(0, scrollStep);
    await new Promise((r) => setTimeout(r, 1000));
    scrolls++;
  }

  window.scrollTo({ top: 0 });
  alert("No second watched video found.");
};

window.scrollToSecondWatchedVideo();

delete window.scrollToSecondWatchedVideo;
