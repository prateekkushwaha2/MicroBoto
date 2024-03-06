import MicroBotoLogo from './assets/logo.png'
import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';



function App() {
   //reset pa

  // login logic starts here

  const navigate = useNavigate();
  const [userData, setUserData] = useState([null]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        console.log('Login successful');
        const data = await response.json();
        setUserData(data[0]);
        navigate('/Userprofile', { state: { userData: data[0] } });
        // Optionally, you can redirect the user to another page after successful login
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

 // login logic ends here


 //create account logic starts here

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        const data = await response.json();
        setUserData(data[0]);
        navigate('/Userprofile',{ state: { userData: data[0] }} );
        
        // Optionally, you can redirect the user to another page after successful registration
      } else {
        console.error('Registration failed:', response.status);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  //craeteAccount logic ends here



  const [resetData, setResetData] = useState({ email: '' });
  const [message, setMessage] = useState('');

  const ResethandleInputChange = (e) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      // Check if the response is not OK
      if (!response.ok) {
        const data = await response.text(); // Read the response as text
        console.error('Server error response:', data);
        throw new Error(`Error: ${data}`);
      }

      const data = await response.json();
      setMessage(data);
      const resetResponseOk = "PasswordReset email sent successfull";
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Internal Server Error');
    }
  };


   //reset password logic ends here


  useEffect(() => {
    console.log('Updated userData:', userData);
  }, [userData]);

  const projects = [
    {
      name: 'MicroBoto - Website',
      description: 'A brief description of Project 1.',
      githubUrl: 'https://github.com/prateekmaurya2/microboto',
      // imageUrl: '/opensource.png', // Replace with actual image URL
    },
    {
      name: 'MicroBoto - Education',
      description: 'A brief description of Project 2.',
      githubUrl: 'https://github.com/prateekmaurya2/microboto-education',
      // imageUrl: '.src/assets/opensource.png', // Replace with actual image URL
    },
    // Add more projects as needed
  ];
  

  useEffect(() => {
    const navbar = document.querySelector('.border');

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); 

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
                    <strong className='text'>MicroBoto</strong>
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
                        <a className="nav-link navfont" href="/" style={{color:'#2c3e50'}}>
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
                      <div className="navfontbutton">
                        <button
                          type="button"
                          className="btn btn-outline-info my-2 my-sm-0 mr-2"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          data-whatever="@mdo"
                        >
                          Login
                        </button>
                      
                        <button
                          type="button"
                          className="btn btn-outline-info my-2 my-sm-0"
                          data-toggle="modal"
                          data-target="#exampleModal2"
                          data-whatever="@mdo"
                        >
                          Signin
                        </button>

                      {/* //form for create aacount,login,restpass starts here */}

                        <div
                          className="modal"
                          id="exampleModal"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                  style={{ textAlign: "center" }}
                                >
                                  Login{" "}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>


                              {/* //form for login starts here */}


                              <form onSubmit={handleLogin}>
                                <div className="modal-body">
                                  <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">
                                      Email
                                    </label>
                                    <input
                                      className="form-control"
                                      id="email"
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">
                                      Password
                                    </label>
                                    <input
                                      className="form-control"
                                      id="password"
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <a
                                      href="#"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      data-target="#exampleModalForgetPass"
                                      data-toggle="modal"
                                      data-whatever="@mdo"
                                    >
                                      forgot your password?
                                    </a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                      type="submit"
                                      style={{ width: "5cm" }}
                                      className="btn btn-primary btn-info"
                                      id="login"
                                    >
                                      Login
                                    </button>
                                  </div>
                                </div>
                                {message && <p>{message}</p>}
                              </form>

                              {/* //login form ends here */}


                              <div
                                className="modal-footer"
                                style={{ alignSelf: "self-start" }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-outline-info my-2 my-sm-0"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  data-toggle="modal"
                                  data-target="#exampleModal2"
                                  data-whatever="@mdo"
                                >
                                  Create account
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* forgot password */}

                        <div
                          className="modal"
                          id="exampleModalForgetPass"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                  style={{ textAlign: "center" }}
                                >
                                  Reset Your Password{" "}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>

                              {/* //form for reset password starts here */}

                              <form onSubmit={handleResetPassword}>
                                <div className="modal-body">
                                  <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">
                                      Email
                                    </label>
                                    <input
                                      className="form-control"
                                      id='email'
                                      type="email"
                                      name="email"
                                      value={resetData.email}
                                      onChange={ResethandleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="submit"
                                      style={{ width: "5cm" }}
                                      className="btn btn-primary btn-info"
                                      id='reset'
                                    >
                                      Reset
                                    </button>
                                  </div>
                                </div>
                                
                              </form>
                              {/* //form for reset password ends here  */}

                            </div>
                          </div>
                        </div>
                        {/* forgot passwordend ends here */}
                        {/* ////dddd */}
                        <div
                          className="modal"
                          id="exampleModal2"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                  Signin
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>

                              {/* //form for registrstion starts here */}
                              
                              <form onSubmit={handleRegistration}>
                                <div className="modal-body">
                                  <div className="form-group">
                                    <label htmlFor="name" className="col-form-label">
                                      Name:
                                    </label>
                                    <input
                                      type="name"
                                      className="form-control"
                                      id="name"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">
                                      Email
                                    </label>
                                    <input
                                      className="form-control"
                                      id="email"
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">
                                      Password
                                    </label>
                                    <input
                                      className="form-control"
                                      id="password"
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="phone" className="col-form-label">
                                      Phone No.
                                    </label>
                                    <input
                                      className="form-control"
                                      id="phone"
                                      type="tel"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-outline-info my-2 my-sm-0"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    data-whatever="@mdo"
                                  >
                                    Login
                                  </button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-info"
                                  >
                                    Create Account
                                  </button>
                                </div>
                              </form>

                              {/* registration form ends here */}

                            </div>
                          </div>
                        </div>
                        {/* //create account */}
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
                    {/* <img src="img/Ai/robo.jpg" alt=""> */}
                  </div>
                </div>
              </div>
            </main>

            {/* //1st most uppper section ends here

            //course section is starting from here */}

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
                 
                      <button className="btn btn-info" data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="@mdo">Explore Course</button>
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
             
                      <button className="btn btn-info"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="@mdo">Explore Course</button>
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
                    
                      <button className="btn btn-info"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="@mdo">Explore Course</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* course section ends here */}

            {/* reserch paper section starts here */}

            <div className="container mt-5">
              <h2><bold><center>OUR RESEARCHES AND BOOKS</center></bold></h2>
              <br>
              </br>
              <br></br>
              <div className="row">
                {/* Research Papers Section */}
                <div className="col-md-6 mb-4">
                  <h2>Research Papers</h2>
                  <div className="d-flex flex-wrap">
                    {/* Research Paper 1 */}
                    <div className="card mx-2 mb-2" style={{ width: '150px' }}>
                      <img
                        src="/researchpaper.jpg"  
                        className="card-img-top"
                        alt="Research Paper 1"
                      />
                      <div className="card-body">
                        <p className="card-text">Paper 1</p>
                        <p>To be released soon....</p>
                      </div>
                    </div>

                    {/* Research Paper 2 */}
                    <div className="card mx-2 mb-2" style={{ width: '150px' }}>
                      <img
                        src="/researchpaper.jpg"  
                        className="card-img-top"
                        alt="Research Paper 2"
                      />
                      <div className="card-body">
                        <p className="card-text">Paper 2</p>
                        <p>To be released soon....</p>
                      </div>
                    </div>

                    {/* Add more research papers as needed */}
                  </div>
                </div>

                {/* GitHub Account Section */}
                <div className="col-md-6 mb-4">
                  <h2>GitHub Account</h2>
                  <div className="card">
                    <div className="card-body">
                      <img
                        src="./public/prateek.jpg" 
                        className="img-fluid rounded-circle mb-3"
                        alt="GitHub Profile"
                      />
                      <h5 className="card-title">@prateekmaurya2</h5>
                      <p className="card-text">
                        <bold>Contribution in NodeJs Open - Source :  Improving error handling</bold><br></br>
                        Detail : I've added a handleNpmError function to handle errors that may occur during npm install and npm rebuild. If an error occurs, it prints an error message and sets the process exit code to 1. Additionally, the main function (runNPMPackageTests) is wrapped in a try-catch block to handle unexpected errors and print an error message.
                      </p>
                      <a
                        href="https://github.com/prateekmaurya2" 
                        className="btn btn-info"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* research section ends here */}
                        {/*  */}
            <section id="about" className="py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 className="mb-4">About Us</h2>
                    <p>
                      Welcome to [Your Company Name], where we are dedicated to revolutionizing the Indian tech industry.
                      Established with a vision to transform education, create cutting-edge software solutions, and contribute
                      to technological advancements, we are committed to making a positive impact.
                    </p>
                    <p>
                      Our team consists of passionate individuals with diverse expertise, working together to explore and
                      innovate in areas such as software development, artificial intelligence, robotics, blockchain, and cyber
                      security.
                    </p>
                    <p>
                      At [Your Company Name], we believe in the power of technology to shape the future. Through continuous
                      learning, research, and collaboration, we aim to create a vibrant ecosystem that fosters creativity and
                      excellence.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    {/* Add images or illustrations representing your team or workspace */}
                    <img
                      src="./src/assets/logo.png"
                      alt="Team at Work"
                      className="img-fluid rounded shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/*  */}
                        {/*  */}


                        <section id="solutions" className="bg-light py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 className="mb-4">Website Solutions</h2>
                    <p>
                      We specialize in building websites tailored to your startup's needs. Our team of experienced developers
                      ensures that your online presence is not just a website but a powerful tool for your business.
                    </p>
                    <p>
                      Whether you're launching a new product, promoting services, or establishing your brand, we've got the
                      expertise to create a visually appealing and functional website for your startup.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <h2 className="mb-4">Exploring Blockchain</h2>
                    <p>
                      At Your Company, we are at the forefront of exploring and understanding how blockchain technology is
                      revolutionizing industries. Blockchain has the potential to transform business processes, enhance
                      security, and create new opportunities for innovation.
                    </p>
                    <p>
                      Our team is dedicated to staying informed about the latest advancements in blockchain and integrating this
                      transformative technology into solutions that drive your business forward.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* About the technology */}
            
            {/* Our free software thing starts here */}
            <div className="container mt-5">
              <h2>Open Source Projects</h2>
              <div className="row">
                {projects.map((project, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src="./src/assets/opensource.png"
                        className="card-img-top"
                        alt={`Project ${index + 1}`}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{project.name}</h5>
                        <p className="card-text">{project.description}</p>
                        <a
                          href={project.githubUrl}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Follow on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* our free software thing ends here */}
            {/* our service section starts here */}
            <div className="container mt-5">
              <h2 className="text-center mb-4">Discover Our Expertise</h2>
              <div className="row">
                {/* Robotics Solutions */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src="/robotics.jpg" // Replace with actual image URL
                      className="card-img-top"
                      alt="Robotics Solutions"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Robotics Solutions</h5>
                      <p className="card-text">Explore our innovative robotics solutions for various industries.</p>
                    </div>
                  </div>
                </div>

                {/* Artificial Intelligence */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src="/ai.jpg" // Replace with actual image URL
                      className="card-img-top"
                      alt="Artificial Intelligence"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Artificial Intelligence</h5>
                      <p className="card-text">Unlock the potential of AI with our cutting-edge solutions.</p>
                    </div>
                  </div>
                </div>

                {/* Cyber Security */}
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src="cyber.jpg" // Replace with actual image URL
                      className="card-img-top"
                      alt="Cyber Security"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Cyber Security</h5>
                      <p className="card-text">Secure your digital assets with our comprehensive cyber security solutions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call-to-Action */}
              <div className="text-center mt-5">
                <h3>Join Us and Shape the Future Together!</h3>
                <p>Support our vision of integrating technology into daily life and making a positive impact.</p>
                <button className="btn btn-info">Join Now</button>
              </div>
            </div>
            
            <br></br>
            <br></br>
            {/* our service section ends here */}
       
            {/* social media section */}
            {/* <div className="container mt-5">
              <h2 className="text-center mb-4">Follow Us on Social Media</h2>
              <div className="text-center">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faYoutube} size="6x" />
                </a>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedin} size="6x" />
                </a>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faInstagram} size="6x" />
                </a>
                {/* Add more social media icons as needed *
              </div>
            </div>  */}

            {/* social media section ends here */}


            {/* our footer section starts here */}

            <footer className="bg-dark text-light py-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h3>Our Company</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisi sed ex scelerisque sodales.
                    </p>
                  </div>

                  <div className="col-md-4">
                    <h3>Quick Links</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a href="#courses">Courses</a>
                      </li>
                      <li>
                        <a href="#support">Support</a>
                      </li>
                      <li>
                        <a href="#contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4">
                    <h3>Contact Us</h3>
                    <p>
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      <a href="mailto:info@example.com">info@example.com</a>
                    </p>
                    <div className="social-icons">
                      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} size="2x" className="mr-2" />
                      </a>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="mr-2" />
                      </a>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="mr-2" />
                      </a>
                      {/* Add more social media icons as needed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="text-center mt-3">
                <img src="company-logo.png" alt="Company Logo" className="img-fluid" />
              </div> */}

              <div className="text-center mt-3">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
              </div>
            </footer>
            {/* our footer section ends here */}


      </div>      
   
    </>
  
    )
  }
  
  export default App