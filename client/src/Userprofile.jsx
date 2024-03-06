
import MicroBotoLogo from './assets/logo.png'
import us from './Userprofile.module.css'
import React from 'react';
import './index.css'
import {useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, setState} from 'react';




function Userprofile(){
  const navigate = useNavigate();

    const location = useLocation();
    const userData = location.state?.userData  || null;
    const [additionalData, setAdditionalData] = useState(null);
    useEffect(() => {
      document.body.classList.remove('modal-open');
      if (userData) {
        console.log(userData.id);
        fetchDataFromServer(userData.id);
      }
    }, [userData]);
    
    const fetchDataFromServer = async (id) => {
      try {
        const response = await fetch('http://localhost:3000/loginValueCheck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        });
    
        if (response.ok) {
          const serverData = await response.json();
    
          // Compare serverData with userData or perform any necessary logic
          console.log('Server Data:', serverData);
    
          // Set the additionalData state
          setAdditionalData(serverData[0]);

          const isAuthorized = compareUserData(userData, serverData[0]);
          if (isAuthorized){
             console.log('authorized')
          }else if(!isAuthorized){
            navigate('/');
          }


        } else {
          console.error('Failed to fetch additional data:', response.status);
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };
   


    
    const handleBot = () => {
      // You can use additionalData for comparison or other logic

  
      // Compare userData with additionalData
      const isAuthorized = compareUserData(userData, additionalData);
  
      if (isAuthorized) {
        // Navigate to /Bot with userData and additionalData
        console.log('User Data:', userData);
        console.log('Additional Data:', additionalData);
        navigate('/Bot', { state: { userData, additionalData } });
      } else {
        // Unauthorized login, redirect or show a message
        navigate('/Unauthorized');
      }
    };
     

    const compareUserData = (userData, serverData) => {
      // Implement your comparison logic here
      // For example, compare user IDs, names, or any other relevant data
      return userData.id === serverData.id && userData.name === serverData.name && userData.email === serverData.email;
    };
  


  if (!userData) {
    // Handle the case when userData is not available
    return (
      <div>
        <p>No user data available</p>
      </div>
    );
  }



  

  return (
    <>
      <div>
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
                          onClick={handleBot}
                          className="btn btn-outline-info my-2 my-sm-0"

                        >
                          My Batch 
                        </button>
                      </div>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            {/* header ends here */}
            <main className="main">
              <div>
                <div className="firstdiv">
                  <div className="uppercode">
                    <h1>MicroBoto</h1>
                    <h2>The Future Vision</h2>
                    <p>
                      At MicroBoto, we embark on a mission to revolutionize education in
                      India, propelling it into a future shaped by innovation and
                      technological advancement. Our commitment lies in reshaping the
                      learning landscape, with a primary focus on providing cutting-edge
                      online education in technology.
                    </p>
                    
                  </div>
                </div>
              </div>
            </main>
            <div>
            <div className="container mt-5">
              <h2><bold><center>Our Batches</center></bold></h2>
              <br></br>
              <br></br>
              <div className="row">
                {/* Course Box 1 */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Java Course</h5>
                      <ul>
                        <li>Learn Java programming language</li>
                        <li>Comprehensive course content</li>
                        <li>Hands-on coding exercises</li>
                      </ul>
                      <br></br>
                      <Link to="https://pages.razorpay.com/pl_Nd8Vux3cf3Pouo/view">
                      <button className="btn btn-info" >Enroll Now</button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Course Box 2 */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Web Development Course</h5>
                      <ul>
                        <li>HTML, CSS, JavaScript, and more</li>
                        <li>Build dynamic web applications</li>
                        <li>Practical projects and assignments</li>
                      </ul>
                      <br></br>
             
                      <Link to="https://pages.razorpay.com/pl_Nd8Vux3cf3Pouo/view">
                      <button className="btn btn-info" >Enroll Now</button>
                      </Link></div>
                  </div>
                </div>

                {/* Course Box 3 */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Blockchain Course</h5>
                      <ul>
                        <li>Understanding blockchain technology</li>
                        <li>Smart contracts and decentralized apps</li>
                        <li>Real-world blockchain applications</li>
                      </ul>
                      <br></br>
                    
                      <Link to="https://pages.razorpay.com/pl_Nd8Vux3cf3Pouo/view">
                      <button className="btn btn-info" >Enroll Now</button>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div> 
            

           
        </div>      
    </>
  
  )
}

export default Userprofile
