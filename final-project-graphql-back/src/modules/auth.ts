import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
 

// returns a token: string from a object with userid and username
export const createJWT = (user:AuthenticatedUser) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export type AuthenticatedUser = Pick<User, 'id' | 'username'>
 
// returns an object with userid and username if the token is correct
export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser
    return payload;
  } catch {
    return null
  }
}

// compares the password from user and the hashed password from database
export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
 
// return a hashed password
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};