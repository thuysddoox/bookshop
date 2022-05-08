import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from '../../constants/theme';
import Login from "../Login/index";
import Register from "../register";
import BookDetail from "../bookdetail";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/book/:bookId/:slugUrl" component={BookDetail} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
