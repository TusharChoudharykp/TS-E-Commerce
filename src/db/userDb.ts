import executeQuery from "../models/excuteQuery";

interface User {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  role?: "user" | "admin";
  landmark?: string;
  flatnumber?: string;
  pincode?: string;
  city?: string;
  state?: string;
}

// Get all users
const getAllUsersFromDb = async (): Promise<User[]> => {
  return await executeQuery(
    "SELECT id, name, email, phone, role, landmark, flatnumber, pincode, city, state FROM users"
  );
};

// Get user by ID
const getUserByIdFromDb = async (id: number): Promise<User[]> => {
  return await executeQuery(
    "SELECT id, name, email, phone, role, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?",
    [id]
  );
};

// Get user by email
const getUserByEmail = async (email: string): Promise<User[]> => {
  return await executeQuery("SELECT * FROM users WHERE email = ?", [email]);
};

// Insert new user
const insertUser = async (userData: User): Promise<any> => {
  const {
    name,
    email,
    passwordHash,
    phone,
    role,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = userData;

  return await executeQuery(
    "INSERT INTO users (name, email, passwordHash, phone, role, landmark, flatnumber, pincode, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      passwordHash,
      phone,
      role || "user",
      landmark || "",
      flatnumber || "",
      pincode || "",
      city || "",
      state || "",
    ]
  );
};

// Update user
const updateUserInDb = async (
  id: number,
  userData: Partial<User>
): Promise<any> => {
  const {
    name,
    email,
    passwordHash,
    phone,
    role,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = userData;

  return await executeQuery(
    "UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, role = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?",
    [
      name,
      email,
      passwordHash,
      phone,
      role,
      landmark,
      flatnumber,
      pincode,
      city,
      state,
      id,
    ]
  );
};

// Delete user
const deleteUserFromDb = async (id: number): Promise<any> => {
  return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
};

export {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmail,
  insertUser,
  updateUserInDb,
  deleteUserFromDb,
};
