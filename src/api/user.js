import instance from "./intance";
import { isAuthenticate } from "../utils/localStorage";

const userInfo = isAuthenticate();

export const list = () => {
  const url = "/users";
  return instance.get(url);
};

export const remove = (id) => {
  const url = `/users/${id}`;
  return instance.delete(url);
};

export const signup = (user) => {
  const url = `/signup`;
  return instance.post(url, user);
};

export const signin = (user) => {
  const url = `/signin`;
  return instance.post(url, user);
};

export const add = (user) => {
  const url = `/users/${userInfo?.user?.id}`;
  return instance.post(url, user, {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  });
};

export const read = (id) => {
  const url = `/users/${id}`;
  return instance.get(url);
};

export const edit = (user) => {
  console.log(user);
  const url = `/users/${user._id}`;
  return instance.put(url, user);
};
