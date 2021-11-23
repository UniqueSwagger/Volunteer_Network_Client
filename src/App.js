import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Signup from "./Components/Signup/Signup";
import AuthProvider from "./context/AuthProvider";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Register from "./Components/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserEvents from "./Components/UserEvents/UserEvents";
import NotFound from "./Components/NotFound/NotFound";
import Admin from "./Components/Admin/Admin";
import AddEvent from "./Components/AddEvent/AddEvent";
import ManageAllEvents from "./Components/ManageAllEvents/ManageAllEvents";
import MakeAdmin from "./Components/MakeAdmin/MakeAdmin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/addEvent">
              <AddEvent />
            </Route>
            <Route path="/makeAdmin">
              <MakeAdmin />
            </Route>
            <Route path="/forget-password">
              <ForgotPassword />
            </Route>
            <Route path="/manageEvents">
              <ManageAllEvents />
            </Route>
            <PrivateRoute path="/register/:eventId">
              <Register />
            </PrivateRoute>
            <PrivateRoute path="/registeredEvents/myEvents">
              <UserEvents />
            </PrivateRoute>
            <PrivateRoute path="/registeredEvents/">
              <NotFound />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
