import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import AuthLayout from "./components/containers/auth/AuthLayout";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import SignOutPage from "./components/auth/SignOutPage";
import AdminLayout from "./components/containers/admin/AdminLayout";
import HomePage from "./components/home/HomePage";
import CategoryIndexPage from "./components/admin/category/index/CategoryListPage";
import CategoryListPage from "./components/admin/category/index/CategoryListPage";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage";
import CategoryDeletePage from "./components/admin/category/delete/CategoryDeletePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="page/:page" element={<CategoryIndexPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="registration" element={<RegistrationPage />}></Route>
          <Route path="signout" element={<SignOutPage />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CategoryListPage />}></Route>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
