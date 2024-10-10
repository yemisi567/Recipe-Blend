const User = require("../../models/user/user");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already in use",
        data: null,
      });
    }

    const user = await User.create({ first_name, last_name, email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      status: "success",
      message: "Signup successful",
      data: { user: { id: user.id, email: user.email }, token },
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(400).json({
      status: "error",
      message: "Error signing up",
      data: { error: error.message },
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { user: { id: user.id, email: user.email }, token },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error logging in",
      data: { error: error.message },
    });
  }
};

const validateToken = async (req, res) => {
  const { token } = req.body;
  const response = {
    date: new Date(),
    message: "",
    status: "",
  };

  if (!token) {
    response.message = "No token provided";
    response.status = "unauthorized";
    return res.status(401).json(response);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      response.message = "Token is invalid";
      response.status = "forbidden";
      return res.status(403).json(response);
    }

    response.message = "Token is valid";
    response.status = "success";
    return res.status(200).json(response);
  });
};

module.exports = { signup, login, validateToken };
