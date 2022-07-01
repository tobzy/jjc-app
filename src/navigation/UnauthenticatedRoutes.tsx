import { useEffect } from 'react';
import { Switch, Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { Login } from '../screens/Login';
import { PageNotFound } from '../screens/common/PageNotFound';
import {Home} from "../screens/Home";
import {LandingPage} from "../screens/LandingPage";
import {SearchMap} from "../screens/Map";
import { GUEST_ROUTE } from '../lib/constants';

/**
 * Routes only a logged out user could visit.
 */
/**
 * @description
 * useEffect statement handles redirecting a user to login if they attempt to view an authenticated URL.
 *
 * @example
 * An unauthenticated user opens an email notification link to view a transaction they recieved, which sends them to a route which only an authenticated
 * user has access to, for example:
 * `View Transaction` ---> `/transactions?transactionId=5fbc1d5c61e3580009b0f648`
 *
 * In this case, we need to redirect the user to the signin page & pass the intended
 * destination url as a param like so:
 * /login?session_redirect=/transactions?transactionId=5fbc1d5c61e3580009b0f648
 *
 * Without this method, an unauthenticated user who visits an authenticated route
 * will hit a blank page, since unauthenticated users don't have access to authenticated routes.
 */
export const UnAuthenticatedRoutes = (): JSX.Element => {
  const location: any = useLocation();

  // scroll to up when push a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      {/*<Redirect from={GUEST_ROUTE.HOME} to={GUEST_ROUTE.LOGIN} exact />*/}

      {guestRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
      <Route
        path="*"
        render={(props) => (
          <Redirect
            to={{
              pathname: GUEST_ROUTE.HOME,
              state: {
                redirectTo: props.location.pathname,
                redirectState: {}, // add state to this object to pass it to page that we redirect to after login
              },
            }}
          />
        )}
      />
    </Switch>
  );
};

export const guestRoutes: RouteProps[] = [
  {
    path: GUEST_ROUTE.LOGIN,
    exact: true,
    component: Login,
  },
  {
    path: GUEST_ROUTE.PAGE_NOT_FOUND,
    exact: true,
    component: PageNotFound,
  },
  {
    path: GUEST_ROUTE.SEARCH,
    exact: true,
    component: SearchMap,
  },
  {
    path: GUEST_ROUTE.HOME,
    exact: true,
    component: LandingPage,
  },
];
