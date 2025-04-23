import validator from "validator";
export const validateUserData = ({email, password, res }) => {
  
    if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("Please enter a strong password");
  }
  return true;
};
