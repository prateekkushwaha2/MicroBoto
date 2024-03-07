import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordChange = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tokenIsValid, setTokenIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Validate the token when the component mounts
    const serverEndpoint = `https://micro-boto-lt5j.vercel.app/validateToken/${token}`;

    const validateToken = async () => {
      try {
        const response = await fetch(serverEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Token is valid
          setTokenIsValid(true);
        } else {
          // Invalid token
          setMessage('Invalid or expired token. Please request a new password reset.');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setMessage('Internal Server Error');
      }
    };

    validateToken();
  }, [token]);

  const handlePasswordChange = async () => {
    // Handle password change only if the token is valid
    if (!tokenIsValid) {
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match.');
      return;
    }

    const serverEndpoint = `https://micro-boto-lt5j.vercel.app/resetPassword/${token}`;

    try {
      const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data);
        console.log("Password reste successfully")
      } else {
        setMessage(`Error: ${data}`);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Password Change</h2>
      {tokenIsValid ? (
        <div>
          <div>
            <label>New Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
      ) : (
        <p>{message}</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordChange;
