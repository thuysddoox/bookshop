import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from '../../constants/theme';
import Login from "../login";
import Register from "../register";
import BookDetail from "../bookdetail";
import Home from "../Home";
import HeaderMenu from "../../components/HeaderMenu"
import PageFooter from "../../components/PageFooter"

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Router>
          <HeaderMenu />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/book/:bookId/:slugUrl" component={BookDetail} />
            <Route path="" component={Home} />
          </Switch >
          <PageFooter />
        </Router >
      </ThemeProvider >
    </div >
  );
}

export default App;
