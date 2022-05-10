import "./App.css";
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from '../../constants/theme';
import Login from "../Login/index";
import Register from "../register";
import BookDetail from "../bookdetail";
import Home from "../Home";
import HeaderMenu from "../../components/HeaderMenu"
import PageFooter from "../../components/PageFooter"
import Checkout from "../Checkout";
import Cart from "../Cart";
import Admin from "../admin";
import Contact from "../contact";

function App() {
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
          </Routes >
          <PageFooter />
        </Router >
      </ThemeProvider >
    </div >
  );
}

export default App;
