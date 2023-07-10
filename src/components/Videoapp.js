import React, { useRef, useEffect, useState } from "react";
import { videoArr } from "../utils/utils";
import "./style.css";
import { VscUnmute, VscMute } from "react-icons/vsc";

const Videoapp = () => {
  const videoRefs = useRef([]);
  const [isMuted, setIsMuted] = useState(true);

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
    if (clickedVideo.paused) {
      clickedVideo.play();
    } else {
      clickedVideo.pause();
    }
  };

  console.log(isMuted, "hellor not mute");
  return (
    <div className="container">
      {videoArr.map((arr, index) => {
        const recommendation = arr.data.recommendation;
        return recommendation.map((video, index) => (
          <div
            className="video_wrapper  y mandatory-scroll-snapping"
            key={video.video_url.med + index}
            dir="ltr"
          >
            <div onClick={() => setIsMuted(!isMuted)} className="sound-icon">
              {isMuted ? (
                <VscMute className="custom-icon" />
              ) : (
                <VscUnmute className="custom-icon" />
              )}
            </div>
            <video
              className="video_container"
              key={video.video_url.med}
              ref={(ref) => (videoRefs.current[index] = ref)}
              autoPlay={index === 0 ? true : false}
              loop
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
