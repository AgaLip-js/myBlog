import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Rightbar from "./components/Rightbar/Rightbar";
import { logoutUser, setCurrentUser } from "./redux/actions/authAction";
import store from "./redux/store/store";
import { PrivateRoute } from "./templates/PrivateRoute";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/MainTheme";
import setAuthToken from "./utils/setAuthToken";
import AboutMe from "./views/AboutMe";
import Articles from "./views/Articles";
import DashboardCMS from "./views/DashboardCMS";
import MainView from "./views/MainView";
import PostView from "./views/PostView";
import PrivateLogin from "./views/PrivateLogin";
import Science from "./views/Science";

function App() {
    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwtDecode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logoutUser());
            // Redirect to login
            window.location.href = "/";
        }
    }

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <Rightbar />
                    <Switch>
                        <Route exact path="/" component={MainView} />
                        <Route exact path="/nauka" component={Science} />
                        <Route exact path="/artykuly" component={Articles} />
                        <Route exact path="/o-mnie" component={AboutMe} />
                        <Route exact path="/admin-cms/login" component={PrivateLogin} />
                        <Route exact path="/post/:id" component={PostView} />
                        <PrivateRoute exact path="/admin-cms/dashboardCMS" component={DashboardCMS} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

const AppWrapper = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
export default AppWrapper;
