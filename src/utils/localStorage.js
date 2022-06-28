export const authenticate = (user, next) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    next();
  } catch (error) {
    console.log(error);
  }
};
export const isAuthenticate = () => {
  if (!localStorage.getItem("user")) return;
  return JSON.parse(localStorage.getItem("user"));
};
