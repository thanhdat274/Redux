import instance from "./intance";

export const list = () => {
  const url = "/categories";
  return instance.get(url);
};

export const remove = (id) => {
  const url = `/categories/${id}`;
  return instance.delete(url);
};

export const add = (category) => {
  const url = `/categories`;
  return instance.post(url, category);
};

export const read = (id) => {
  const url = `/categories/${id}`;
  return instance.get(url);
};

export const edit = (category) => {
  console.log(category);
  const url = `/categories/${category._id}`;
  return instance.put(url, category);
};
