import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import UserCreatePage from './pages/UserCreatePage';
import UserEditPage from './pages/UserEditPage';

// repo-react: same UI/flow as ojt-app, but NOT wired to axios/a backend.
// Every form submit is logged to the browser console (see src/data/store.js).
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/new" element={<UserCreatePage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
