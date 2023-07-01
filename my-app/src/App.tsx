import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import AuthLayout from "./components/containers/auth/AuthLayout";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import SignOutPage from "./components/auth/SignOutPage";
import AdminLayout from "./components/containers/admin/AdminLayout";
import HomePage from "./components/home/HomePage";
import CategoryListPage from "./components/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage";
import CategoryDeletePage from "./components/admin/category/delete/CategoryDeletePage";
import AdminHomePage from "./components/admin/home/AdminHomePage";
import ProductListPage from "./components/admin/product/list/ProductListPage";
import ProductCreatePage from "./components/admin/product/create/ProductCreatePage";
import ProductEditPage from "./components/admin/product/edit/ProductEditPage";
import ProductDeletePage from "./components/admin/product/delete/ProductDeletePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="page/:page" element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="registration" element={<RegistrationPage />}></Route>
          <Route path="signout" element={<SignOutPage />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />}></Route>

          <Route path="category">
            <Route index element={<CategoryListPage />} />
            <Route path="page/:page" element={<CategoryListPage />} />
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit">
              <Route path=":id" element={<CategoryEditPage />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<CategoryDeletePage />} />
            </Route>
          </Route>

          <Route path="product">
            <Route index element={<ProductListPage />} />
            <Route path="page/:page" element={<ProductListPage />} />
            <Route path="create" element={<ProductCreatePage />} />
            <Route path="edit">
              <Route path=":id" element={<ProductEditPage />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<ProductDeletePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
