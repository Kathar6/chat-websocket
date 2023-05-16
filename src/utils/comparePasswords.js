import bcrypt from "bcrypt";

export const comparePasswords = async (plainPassword, password) => {
  const result = await bcrypt.compare(plainPassword, password);
  return result;
};
