import React, { useRef, useEffect, useState } from "react";
import { videoArr } from "../utils/utils";
import "./style.css";

const Videoapp = () => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (currentVideo) {
      currentVideo.muted = true;
    }
  }, [currentVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRefs.current;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;

        if (isVisible) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const container = document.querySelector(".container");

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleVideoClick = (index) => {
    const clickedVideo = videoRefs.current[index];
    setCurrentVideo(clickedVideo);
    if (clickedVideo.paused) {
      clickedVideo.play();
    } else {
      clickedVideo.pause();
    }
  };

  return (
    <div className="container">
      {videoArr.map((arr, index) => {
        const recommendation = arr.data.recommendation;
        return recommendation.map((video, innerIndex) => (
          <div
            className="video_wrapper y mandatory-scroll-snapping"
            key={video.video_url.med + innerIndex}
            dir="ltr"
          >
            <div
              className="sound-icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? "🔇" : "🔊"}
            </div>
            <video
              className="video_container"
              key={video.video_url.med}
              ref={(ref) => (videoRefs.current[index] = ref)}
              autoPlay={innerIndex === 0}
              muted={isMuted}
              onClick={() => handleVideoClick(index)}
            >
              <source
                src={video.video_url.med}
                type="video/mp4"
                className="video"
              />
            </video>
          </div>
        ));
      })}
    </div>
  );
};

export default Videoapp;
