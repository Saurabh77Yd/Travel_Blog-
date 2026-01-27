export const validateEmail = (email) => {
  const rgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return rgex.test(email);
};
