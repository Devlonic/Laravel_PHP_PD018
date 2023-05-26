import "./App.css";
import CategoryListPage from "./components/category/list/CategoryListPage";
import { Route, Routes } from "react-router-dom";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import CategoryEditPage from "./components/category/edit/CategoryEditPage";
import CategoryDeletePage from "./components/category/delete/CategoryDeletePage";
import AuthLayout from "./components/containers/auth/AuthLayout";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import SignOutPage from "./components/auth/SignOutPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<CategoryListPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="registration" element={<RegistrationPage />}></Route>
          <Route path="signout" element={<SignOutPage />}></Route>
        </Route>
        <Route path="/control-panel" element={<DefaultLayout />}>
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
