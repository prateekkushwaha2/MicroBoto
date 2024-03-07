
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3306;


app.use(cors());

// console.log('Database Connection Details:', {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   // ... other details
// });
// Database setup
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
//   queueLimit: 0
// });
const pool = mysql.createPool(process.env.DB_CONNECTION_URI);
// pool.getConnection()
//   .then(() => {
//     console.log('Connected to the database!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   })
//   .finally(() => {
//     // Release the connection if it was acquired
//     pool.end();
//   });
app.get("/", (req, res) => res.send("Express on Vercel"));
// Middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for creating an account
app.post('/createAccount', async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      // Email already exists
      return res.status(400).send('User with this email already exists');
    }

    const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [name, email, hashedPassword, phone]);

    // Fetch the inserted user data
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

    console.log('Registration successful');
    res.status(200).json(newUser); // Send the new user data as JSON response
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user from the database based on the provided email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      // User not found
      return res.status(401).send('Invalid email or password');
    }

    const user = users[0];

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const auth_token = crypto.randomBytes(20).toString('hex');
      await pool.query('UPDATE users SET auth_token = ? WHERE email = ?', [auth_token, email]);
      console.log('login successful');
      const [userData] = await pool.query('SELECT id, name, email FROM users WHERE email = ?', [email]);
      res.json(userData);
      
     
    } else {
      // Passwords do not match
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/loginValueCheck', async (req, res) => {
  const { id } = req.body;

  try {
    // Assuming 'id' is a valid user identifier
    const [userData] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [id]);

    if (!userData || userData.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error during login value check:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Route for initiating the password reset
// Route for initiating the password reset
const clientURL = 'https://micro-boto.vercel.app';

app.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || user.length === 0) {
      // If user does not exist, return an error response
      return res.status(404).send('User not found');
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);

    // Save the reset token and expiration time in the database
    await pool.query('UPDATE users SET reset_token = ?, expiration_time = ? WHERE email = ?', [resetToken, expirationTime, email]);


    const mailOptions = {
      from: 'microbotocorporation@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, click on the following link: ${clientURL}/PasswordChange/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
     res.json('PasswordReset email sent successfully')
    // res.send('Password reset email sent successfully');
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json('Internal Server Error');
  }
});

// Route for handling password reset
// Route for handling password reset
app.get('/validateToken/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Check if the token exists in the database and is not expired
    const [user] = await pool.query('SELECT * FROM users WHERE reset_token = ? AND expiration_time > NOW()', [token]);

    if (!user || user.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route for updating the password
app.post('/resetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Update the user's password and reset token
    await pool.query('UPDATE users SET password = ?, reset_token = NULL, expiration_time = NULL WHERE reset_token = ?', [hashedPassword, token]);

    res.status(200).json({ message: 'Password updated successfully' });
    console
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//ends reset password

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
