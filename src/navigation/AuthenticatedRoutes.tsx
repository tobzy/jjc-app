import { useEffect } from 'react';
import { Redirect, Route, RouteProps, Switch, useLocation } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { MEMBER_ROUTE, USER_ROLES } from '../lib/constants';
import { Layout } from '../screens/Layout';
import {useAuth} from "../context/auth-context";

const mapRoute = (route: RouteProps, index: number) => <Route key={index} {...route} />;


/**
 * Routes only a logged in  user could visit.
 */
export const AuthenticatedRoutes = (): JSX.Element => {
  const location = useLocation<Record<string, unknown>>();
  const { userRole } = useAuth();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  // if (userRole === USER_ROLES.ADMIN) {
  if (userRole) {
    return (
      <Switch>
        {adminRoutes.map(mapRoute)}
        {commonRoutes.map(mapRoute)}
      </Switch>
    );
  }
  // if (userRole === USER_ROLES.MODERATOR) {
  //   return (
  //     <Switch>
  //       {moderatorRoutes.map(mapRoute)}
  //       {commonRoutes.map(mapRoute)}
  //     </Switch>
  //   );
  // }

  // no user role yet
  return <Loading />;
};

const adminRoutes: RouteProps[] = [
  {
    path: MEMBER_ROUTE.HOME,
    render: () => <Layout />,
  },
];

// const moderatorRoutes: RouteProps[] = [
//   {
//     path: MEMBER_ROUTE.HOME,
//     render: () => <Layout />,
//   },
// ];

const commonRoutes: RouteProps[] = [
  {
    path: '*',
    exact: false,
    render: () => <Redirect to={{ pathname: MEMBER_ROUTE.PAGE_NOT_FOUND }} />,
  },
];
