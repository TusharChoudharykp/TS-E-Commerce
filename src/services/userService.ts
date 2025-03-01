const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmail,
  insertUser,
  updateUserInDb,
  deleteUserFromDb,
} = require("../db/userDb");
require("dotenv").config();

const getAllUsers = async () => {
  return await getAllUsersFromDb();
};

const getUserById = async (id: any) => {
  return await getUserByIdFromDb(id);
};

const registerUser = async (userData: any) => {
  const {
    name,
    email,
    password,
    phone,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = userData;

  const existingUser = await getUserByEmail(email);
  if (existingUser.length) {
    throw new Error("Email already in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  return await insertUser({
    name,
    email,
    passwordHash: hashedPassword,
    phone,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const loginUser = async (email: any, password: any) => {
  const user = await getUserByEmail(email);
  if (!user.length || !bcrypt.compareSync(password, user[0].passwordHash)) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user[0].id }, process.env.secret, {
    expiresIn: "3d",
  });

  return { email: user[0].email, token };
};

const updateUser = async (id: any, userData: any) => {
  const {
    name,
    email,
    password,
    phone,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = userData;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

  return await updateUserInDb(id, {
    name,
    email,
    passwordHash: hashedPassword,
    phone,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const deleteUser = async (id: any) => {
  return await deleteUserFromDb(id);
};

export {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
