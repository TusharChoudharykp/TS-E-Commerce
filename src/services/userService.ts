import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmail,
  insertUser,
  updateUserInDb,
  deleteUserFromDb,
} from "../db/userDb";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "user" | "admin";
  landmark?: string;
  flatnumber?: string;
  pincode?: string;
  city?: string;
  state?: string;
}

const getAllUsers = async () => await getAllUsersFromDb();

const getUserById = async (id: number) => await getUserByIdFromDb(id);

const registerUser = async (userData: User) => {
  const {
    name,
    email,
    password,
    phone,
    role = "user",
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = userData;

  const existingUser = await getUserByEmail(email);

  if (existingUser.length > 0) {
    throw new Error("Email already in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  return await insertUser({
    name,
    email,
    passwordHash: hashedPassword,
    phone,
    role,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user.length || !bcrypt.compareSync(password, user[0].passwordHash)) {
    throw new Error("Invalid credentials");
  }

  if (!process.env.secret) {
    throw new Error("JWT Secret is missing in environment variables.");
  }

  // Get role from the database
  const { role } = user[0];

  // Generate JWT token with role
  const token = jwt.sign({ userId: user[0].id, role }, process.env.secret, {
    expiresIn: "3d",
  });

  return { email: user[0].email, role, token };
};

const updateUser = async (id: number, userData: Partial<User>) => {
  const {
    name,
    email,
    password,
    phone,
    role,
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
    role,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const deleteUser = async (id: number) => await deleteUserFromDb(id);

export {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
