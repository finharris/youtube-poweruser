// BEFORE

// // console.log(true);

// window.scrollTo({ top: 5000 });
// window.scrollTo({ top: 0 });

// window.videos = document.getElementsByClassName(
//   "ytd-thumbnail-overlay-resume-playback-renderer"
// );

// console.log(window.videos[0]);

// window.scrollTo({
//   top: window.videos[0].getBoundingClientRect().top + window.scrollY + -500,
//   behavior: "smooth",
// });

// delete window.videos;

// AFTER

// window.scrollToResumeVideo = async () => {
//   const scrollStep = 1000;
//   const maxScrolls = 5;
//   let scrolls = 0;

//   while (scrolls < maxScrolls) {
//     window.scrollBy(0, scrollStep);
//     await new Promise((r) => setTimeout(r, 500)); // Wait for content to load
//     scrolls++;
//   }

//   window.scrollTo({ top: 0 });

//   let videos = document.getElementsByClassName(
//     "ytd-thumbnail-overlay-resume-playback-renderer"
//   );
//   if (videos.length > 0) {
//     const target = videos[0];
//     window.scrollTo({
//       top: target.getBoundingClientRect().top + window.scrollY - 500,
//       behavior: "smooth",
//     });
//     console.log("Found and scrolled to video:", target);
//     return;
//   }

//   console.log("Resume video not found after scrolling.");
// };

// window.scrollToResumeVideo();

// delete window.scrollToResumeVideo;

// AFTER AFTER

window.scrollToResumeVideo = async () => {
  window.scrollTo({ top: 0 });

  const scrollStep = 1000;
  const maxScrolls = 20;
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
