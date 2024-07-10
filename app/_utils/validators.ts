// validators.js

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  return password && password.length >= 8;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
) {
  return password == confirmPassword;
}
