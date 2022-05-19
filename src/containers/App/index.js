import "./App.css";
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from '../../constants/theme';
import Login from "../Login/index";
import Register from "../register";
import BookDetail from "../bookdetail";
import Books from "../books";
import Home from "../Home";
import HeaderMenu from "../../components/HeaderMenu"
import PageFooter from "../../components/PageFooter"
import Checkout from "../Checkout";
import Cart from "../Cart";
import Admin from "../admin";
import Contact from "../contact";
import Profile from "../profile";
import { useEffect } from "react";
import { getUserFB } from "../../network/api/user";

function App() {
  async function loginFB(userId, token) {
    const response = await getUserFB(token, userId)
    console.log(response);
    if (response?.data?.user) {
      // localStorage.setItem('access_token', token);
      // localStorage.setItem('logined', "true");
      // localStorage.setItem('userId', userId);
      // localStorage.setItem('username', response?.data?.user?.fullname);

      localStorage.setItem('access_token', JSON.stringify(token));
      localStorage.setItem('logined', "true");
      localStorage.setItem('username', JSON.stringify(response?.data?.user?.fullname));
      localStorage.setItem('userId', JSON.stringify(userId));
      window.location.href = "/";
    }

  }
  useEffect(() => {
    let url = window.location.pathname;
    if (url.includes('access_token')) {
      let [token, useId] = url.split(',')
      token = token.split('access_token=')[1];
      useId = useId.split('user_id=')[1];
      // console.log(token, useId)
      loginFB(useId, token);
    }
  }, [])
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Router>
          <HeaderMenu />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/books" element={<Books />} />
            <Route path="/profile" element={<Profile />} />
          </Routes >
        </Router >
        <PageFooter />
      </ThemeProvider >
    </div >
  );
}

export default App;
