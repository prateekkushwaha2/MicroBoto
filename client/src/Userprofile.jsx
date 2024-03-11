
import MicroBotoLogo from './assets/logo.png'
import React from 'react';
import './index.css'
import {useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, setState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
        const response = await fetch('https://micro-boto-lt5j.vercel.app/loginValueCheck', {
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

    //paymnet intregation

    const openRazorpay = async () => {
      const response = await fetch('https://micro-boto-lt5j.vercel.app/create-order', { method: 'POST' });
      const order = await response.json();
  
      const options = {
        key: 'rzp_test_OtMj92aUxskfFU', // Replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: 'MicroBoto',
        description: 'Product/Service Description',
        order_id: order.id,
        handler: function (response) {
          console.log(response);
  
          // Check if the payment was successful
          if (response.razorpay_payment_id) {
            handlePaymentSuccess(response);
          } else {
            handlePaymentFailure(response);
          }
        },
        prefill: {
          name: "prateek raj",
          email: "87979080909",   
        },
        theme: {
          color: '#F37254',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  
    const handlePaymentSuccess = async (response,) => {
      // Perform actions when payment is successful
      console.log('Payment successful!');
    
      try {
    
        // Make an API request to update isjava value
        
        const userEmail = "rajprateek874@gmail.com";
        const updateResponse = await fetch('https://micro-boto-lt5j.vercel.app/update-isjava', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
            body: JSON.stringify({ email: userEmail }),
        });
    
        if (updateResponse.ok) {
           toast.success('Course purchased successfully. Happy learning!', {
           position: toast.POSITION.TOP_CENTER,
           });
        } else {
          console.error('Failed to update isjava:', updateResponse.statusText);
          alert('Failed to update isjava. Please try again later.');
        }
      } catch (error) {
        console.error('Error updating isjava:', error);
        alert('Error updating isjava. Please try again later.');
      }
    };
  
    const handlePaymentFailure = (response) => {
      // Perform actions when payment fails
      console.error('Payment failed:', response.error.description);
      alert(`Payment failed: ${response.error.description}`); // You can replace this with your desired action
    };
  
    //paymnet intregation


    
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
           <ToastContainer />
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
                      
                      <button className="btn btn-info" onClick={openRazorpay}>Enroll Now</button>
                      
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
             
                      
                      <button className="btn btn-info" onClick={openRazorpay}>Enroll Now</button>
                     </div>
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
                    
                     
                      <button className="btn btn-info" onClick={openRazorpay}>Enroll Now</button>
                     
                      
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
