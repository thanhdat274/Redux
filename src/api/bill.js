import instance from "./intance";

export const creat = (bill) => {
  const url = "/bills";
  return instance.post(url, bill);
};

export const creatbilldt = (billdetail) => {
  const url = "/billdetails";
  return instance.post(url, billdetail);
};

export const list = () => {
  const url = "/bills";
  return instance.get(url);
};

export const remove = (id) => {
  const url = `/bills/${id}`;
  return instance.delete(url);
};

export const listDetail = (id) => {
  const url = `/billdetails/${id}`;
  return instance.get(url);
};

export const billdt = (id) => {
  const url = `/bills/${id}`;
  return instance.get(url);
};

export const editBill = (bill) => {
  console.log(bill);
  const url = `bills/${bill._id}`;
  return instance.put(url, bill);
};
