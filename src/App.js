import React from "react";
import "./App.css";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import AdminLayout from "./pages/layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "./features/product/Product";
import ProductAdd from "./features/product/ProductAdd";
import Category from "./features/category/Category";
import CategoryAdd from "./features/category/CategoryAdd";
import CategoryEdit from "./features/category/CategoryEdit";
import ProductEdit from "./features/product/ProductEdit";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ProdductDetail from "./pages/ProductDetail";
import User from "./features/user/User";
import UserAdd from "./features/user/UserAdd";
import UserEdit from "./features/user/UserEdit";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import PrivateRouter from "./pages/PrivateRouter";
import Checkout from "./pages/Checkout";
import Bill from "./features/bill/Bill";
import BillDetail from "./features/bill/BillDetail";
import BillEdit from "./features/bill/BillEdit";
import Profile from "./pages/Profile";
import BillClient from "./pages/BillClient";
import ChangeProfile from "./pages/ChangeProfile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Homepage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProdductDetail />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ChangeProfile />} />
          <Route path="bills/:id" element={<BillClient />} />
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="products">
            <Route index element={<Product />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route>
          <Route path="categories">
            <Route index element={<Category />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path=":id/edit" element={<CategoryEdit />} />
          </Route>

          <Route path="users">
            <Route index element={<User />} />
            <Route path="add" element={<UserAdd />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>

          <Route path="bills">
            <Route index element={<Bill />} />
            <Route path=":id" element={<BillDetail />} />
            <Route path=":id/edit" element={<BillEdit />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
