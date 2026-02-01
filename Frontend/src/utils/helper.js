export const validateEmail = (email) => {
  const rgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return rgex.test(email);
};

export const getInitials =(name)=> {
  if(!name) return "";
  const words = name.split(" ");
  let initials = "";
  for(let i=0; i<Math.floor(words.length, 2); i++){
    initials += words[i][0];
  }
  return initials.toUpperCase();
};