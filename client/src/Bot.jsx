import MicroBotoLogo from './assets/logo.png'
import React from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, setState} from 'react';
import styles from './bot.module.css'
import YouTubeVideo from './YouTubeVideo';


function Bot(){
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData  || null;
    const isLiveSession = /* Logic to determine if the live session is going on */ true;
    const apiKey = 'YOUR_YOUTUBE_API_KEY';

    const [activeWeek, setActiveWeek] = useState(null);
    const handleWeekClick = (week) => {
      setActiveWeek(week);
    };
    const renderWeekButtons = () => {
      return ['Live Session', 1, 2, 3, 4].map((week) => (
        <div
          key={week}
          className={`${styles.weekButton} ${activeWeek === week ? styles.active : ''}`}
          onClick={() => handleWeekClick(week)}
        >
          {typeof week === 'number' ? `Week ${week}` : week}
        </div>
      ));
    };


    if (!userData) {
        // Handle the case when userData is not available
        return (
          <div>
            <p>No user data available</p>
          </div>
        );
      }


      const weeks = {
        'Live Session': [], // No videos for live session
        1: ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3', 'VIDEO_ID_4', 'VIDEO_ID_5', 'VIDEO_ID_6', 'VIDEO_ID_7'],
        2: ['VIDEO_ID_8', 'VIDEO_ID_9', 'VIDEO_ID_10', 'VIDEO_ID_11', 'VIDEO_ID_12', 'VIDEO_ID_13', 'VIDEO_ID_14'],
        3: ['VIDEO_ID_15', 'VIDEO_ID_16', 'VIDEO_ID_17', 'VIDEO_ID_18', 'VIDEO_ID_19', 'VIDEO_ID_20', 'VIDEO_ID_21'],
        4: ['VIDEO_ID_22', 'VIDEO_ID_23', 'VIDEO_ID_24', 'VIDEO_ID_25', 'VIDEO_ID_26', 'VIDEO_ID_27', 'VIDEO_ID_28'],
      };
    

    return(
     <>
       <div className="border">
              <div className="navcss">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <a className="navbar-brand" href="/" style={{ fontSize: 33 }}>
                    <img
                      src={MicroBotoLogo}
                      width={50}
                      height={35}
                      className="d-inline-block"
                      alt="MicroBoto Logo"
                    />
                    <strong>MicroBoto</strong>
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item active ">
                        <a className="nav-link navfont" href="/">
                          Home <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item dropdown navcenter">
                        <a
                          className="nav-link dropdown-toggle navfont"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Link
                        </a>
                        <div
                          className="dropdown-menu"
                          style={{ maxWidth: "8cm" }}
                          aria-labelledby="navbarDropdown"
                        >
                          <a
                            className="dropdown-item"
                            style={{ textAlign: "center" }}
                            href="#"
                          >
                            Action
                          </a>
                          <a
                            className="dropdown-item"
                            style={{ textAlign: "center" }}
                            href="#"
                          >
                            Another action
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            className="dropdown-item"
                            style={{ textAlign: "center" }}
                            href="#"
                          >
                            Something else here
                          </a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link navfont" href="#">
                          Link
                        </a>
                      </li>
                      <div className='navfontbutton'>
                        <button
                          className="btn btn-outline-info my-2 my-sm-0 mr-2"
 
                        >
                          {userData.name}
                        </button>
                      
                        <button
                       
                          className="btn btn-outline-info my-2 my-sm-0"

                        >
                          ID : {userData.id}
                        </button>
                      </div>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className={styles.container}>
              <h1 className={styles.header}>Java Course</h1>

              <div className={styles.weeksContainer}>{renderWeekButtons()}</div>

              {/* Live Session Section */}
              {isLiveSession && activeWeek === 'Live Session' && (
                <div className={styles.liveSessionContainer}>
                  <h2>Live Session</h2>
                  {/* Embed the live YouTube video here */}
                  <YouTubeVideo videoId="your-live-video-id" apiKey={apiKey} />
                </div>
              )}

              {/* Display content for the selected week */}
              <div className={styles.contentContainer}>
                {activeWeek !== null && activeWeek !== 'Live Session' && (
                  <div className={styles.weekContent}>
                    <h2>{typeof activeWeek === 'number' ? `Week ${activeWeek}` : activeWeek}</h2>
                    {/* Display videos for the selected week */}
                    {weeks[activeWeek].map((videoId, index) => (
                      <YouTubeVideo key={index} videoId={videoId} apiKey={apiKey} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            

        
     </>
    )
    
}

export default Bot
