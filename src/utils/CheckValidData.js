// Returns an error message string if invalid, or null if everything is valid
const checkValidData = (email, password, name) => {
  // name is only checked when provided (Sign Up form)
  if (name !== undefined) {
    const isNameValid = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(name.trim());
    if (!isNameValid) return "Please enter a valid full name.";
  }

  // something@domain.tld
  const isEmailValid = /^[\w.+-]+@[A-Za-z\d-]+(\.[A-Za-z\d-]+)*\.[A-Za-z]{2,}$/.test(
    email.trim()
  );

  // Min 8 chars, at least one uppercase, one lowercase, one digit and one special char
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);

  if (!isEmailValid) return "Please enter a valid email address.";
  if (!isPasswordValid)
    return "Password must be at least 8 characters and include uppercase, lowercase, a number and a special character.";

  return null;
};

export default checkValidData;
