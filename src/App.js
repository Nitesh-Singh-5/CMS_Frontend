import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import UserListScreen from "./screen/UserListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import RoomListScreen from "./screen/RoomListScreen";
import RoomEditScreen from "./screen/RoomEditScreen";
import "./App.css";
import Header from "./components/Header";
import RoomScreen from "./screen/RoomScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/rooms/:id" element={<RoomScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin/users" element={<UserListScreen />} />
        <Route path="/admin/users/:id" element={<UserEditScreen />} />
        <Route path="/admin/roomlist" element={<RoomListScreen />} />
        <Route path="/admin/room/:id" element={<RoomEditScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
