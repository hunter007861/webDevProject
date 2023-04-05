import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap';
import ClientHome from './pages/ClientHome';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import { useSelector } from 'react-redux';

function App() {
  const access = useSelector((state) => state.login.user)
  return (
    <div className="App">
      {access?.firstName == undefined ?
        <Routes>
          <Route
            exact
            path="/"
            name="Home Page"
            element={<ClientHome />}
          />
          <Route
            exact
            path="/login"
            name="Login Page"
            element={<Login />}
          />
          <Route
            exact
            path="/signup"
            name="Signup Page"
            element={<Signup />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        :
        <Routes>
          <Route
            exact
            path="/"
            name="Home Page"
            element={<ClientHome />}
          />
          {
            access.isAdmin === true ?
              <Route
                exact
                path="/admin"
                name="Admin Page"
                element={<AdminPage />}
              /> :
              null
          }
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      }

    </div>
  );
}

export default App;
