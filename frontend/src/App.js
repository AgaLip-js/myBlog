import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, Router } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import GlobalStyle from './theme/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from "./theme/MainTheme";
import store from "./redux/store/store";
import Navbar from './components/Navbar/Navbar';
import MainView from './views/MainView';
import AboutMe from './views/AboutMe';
import Science from './views/Science';
import Articles from './views/Articles';
import Rightbar from './components/Rightbar/Rightbar';
import { PrivateRoute } from './templates/PrivateRoute';
import PrivateLogin from './views/PrivateLogin';
import DashboardCMS from './views/DashboardCMS';
import history from './templates/history';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from './redux/actions/authAction';
import PostView from './views/PostView';

function App() {
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/';
  }
}

  return (
    <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar/>
      <Rightbar/>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route exact path="/nauka" component={Science} />
          <Route exact path="/artykuly" component={Articles} />
          <Route exact path="/o-mnie" component={AboutMe} />
          <Route exact path="/admin-cms/login" component={PrivateLogin}/>
          <Route exact path="/post/:id" component={PostView}/>
           <PrivateRoute
                  exact
                  path="/admin-cms/dashboardCMS"
                  component={DashboardCMS}
                />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
</>
  );
}

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
  </Provider>
  );
};
export default AppWrapper;
