import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const getComponentByState = (Component, authState, props) => {
    if (authState.isAuthenticated === true) {
        return (
            <Component {...props} />
        );
    }
    return (
        <Redirect to={{
            pathname: "/admin-cms/login",
            state: {
                from: props.location,
            },
        }}
        />
    );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => ({
        auth: store.auth,
    }));

    useEffect(() => {
        const timeout = setTimeout(() => {
            //   dispatch(loadingAccounts(auth.user.id));
            //   dispatch(loadingExpenses(auth.user.id));
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [auth.user.id, dispatch]);

    return (
        <Route
            {...rest}
            render={props => getComponentByState(Component, auth, props)}
        />
    );
};
