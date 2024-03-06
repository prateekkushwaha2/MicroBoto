// YouTubeVideo.jsx
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import styles from './bot.module.css';

const YouTubeVideo = ({ videoId, apiKey }) => {
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    setPlayer(event.target);
  };

  const onPlayVideo = () => {
    player.playVideo();
  };


  return (
    <div className={styles.videoContainer}>
     <div className={styles.videoWrapper}>
        <YouTube
            videoId={videoId}
            opts={{
            playerVars: {
                // You can add more player parameters as needed
                autoplay: 0, // 0 means no autoplay, change to 1 for autoplay
            },
            }}
            onReady={onReady}
        />
        <br></br> <br></br><br></br> <br></br><br></br>
            <div className={styles.buttonContainer}>
                <button onClick={onPlayVideo}>Play Video</button>
            </div>
        
        <br></br><br></br> <br></br><br></br>
     </div>
   </div> 
  );
};

export default YouTubeVideo;
