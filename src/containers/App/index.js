import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from '../../constants/theme'; 
import Login from "../Login";
import Home from "../Home";


function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
