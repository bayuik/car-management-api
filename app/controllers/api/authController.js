const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersService = require("../../services/usersService");
const saltRounds = 10;
const secretKey = "This is a secret key";

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, encryptedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
};

const checkPassword = (encryptedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isValid) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(isValid);
    });
  });
};

const createToken = (payload) => jwt.sign(payload, secretKey, { expiresIn: "1h" });

const register = async (req, res) => {
  const role = "member";
  const { email, password } = req.body;
  const encryptedPassword = await encryptPassword(password);
  const newUser = {
    role,
    email,
    password: encryptedPassword,
  };
  usersService
    .create(newUser)
    .then((user) => {
      res.status(201).json({
        status: "success",
        data: user,
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

const registerAdmin = async (req, res) => {
  if(req.user.role != 'superadmin'){
    res.status(401).json({
      status: "Unauthorized",
      message: "You are not authorized to register an admin",
    })
    return;
  }
  
  const role = "admin";
  const { email, password } = req.body;
  const encryptedPassword = await encryptPassword(password);
  const newUser = {
    role,
    email,
    password: encryptedPassword,
  };

  usersService
    .create(newUser)
    .then((user) => {
      res.status(201).json({
        status: "success",
        data: user,
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

const login = async (req, res) => {
  const user = await usersService.getByEmail(req.body.email);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const isValid = await checkPassword(user.password, req.body.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid Password" });
    return;
  }

  const { id, role, email, password } = user;
  const token = createToken({
    id,
    role,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: {
      id,
      role,
      email,
      token,
    },
  });
};

const authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, secretKey);
    req.user = await usersService.get(tokenPayload.id);
    next();
  } catch (err) {
    res.status(401).json({
      status: "Unauthorized",
      message: err.message,
    });
  }
};

module.exports = { register, registerAdmin, login, authorize };
