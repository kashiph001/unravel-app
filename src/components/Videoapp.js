import React, { useRef, useEffect } from "react";
import { videoArr } from "../utils/utils";
import "./style.css";

const Videoapp = () => {
  const videoRefs = useRef([]);

  const handleVideoClick = (video) => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleFirstInteraction = () => {
    const videos = videoRefs.current;

    videos.forEach((video) => {
      video.muted = true;
    });

    document.removeEventListener("click", handleFirstInteraction);
  };

  useEffect(() => {
    document.addEventListener("click", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRefs.current;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          const isPaused = video.paused;
          if (isPaused) {
            video.play();
          }
        } else {
          video.pause();
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {videoArr.map((arr, index) => {
        const recommendation = arr.data.recommendation;
        return recommendation.map((video, index) => (
          <div className="video_wrapper" key={video.video_url.med + index}>
            <video
              className="video_container"
              key={video.video_url.med}
              ref={(ref) => (videoRefs.current[index] = ref)}
              onClick={() => handleVideoClick(videoRefs.current[index])}
              controls
            >
              <source src={video.video_url.med} type="video/mp4" />
            </video>
          </div>
        ));
      })}
    </div>
  );
};

export default Videoapp;
