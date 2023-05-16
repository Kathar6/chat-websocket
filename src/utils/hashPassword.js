import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  if (!password) throw new Error("Password not provided");

  const hash = await bcrypt.hash(password, 10);
  return hash;
};
