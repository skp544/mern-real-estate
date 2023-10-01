export const isValidEmail = (email) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return isValid.test(email);
};

export const validateUser = ({ password, name, email }) => {
  if (!name.trim()) {
    return { ok: false, error: "Name is missing" };
  }

  if (!email.trim()) {
    return { ok: false, error: "Email is missing" };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Invalid email!" };
  }

  if (!password.trim()) {
    return { ok: false, error: "Password is missing" };
  }

  if (password.length < 6) {
    return { ok: false, error: "Password must be atleast 6 characters long" };
  }

  return { ok: true, error: "" };
};
