import { useContext, createContext, useState, useEffect } from 'react';
import { useMutation, useQuery, UseMutationResult, QueryCache } from 'react-query';
import { useLocalStorage } from 'react-use';
import { cacheKey } from '../hooks/cacheStateKey';
import { AuthenticationService, IUserSigninData } from '../services/authentication-service';
import { LOCAL_STORAGE_KEYS, USER_ROLES } from '../lib/constants';
import { toast } from 'react-toastify';

export interface AppUser {
  accessToken: string;
  user: {
    country: string
    disable: boolean
    dob: Date
    email: string
    fileUrl: string
    firstName: string
    id: string
    lastName: string
    phone: string
    phoneActivated: boolean
    region: string
  }
}

type AuthContextProps = {
  appUser: Partial<AppUser> | null;
  userRole: USER_ROLES | null;
  setAppUser: React.Dispatch<React.SetStateAction<Partial<AppUser> | null>>;
  setUserRole: React.Dispatch<React.SetStateAction<USER_ROLES | null>>;
  useSignin: () => UseMutationResult<any, unknown, IUserSigninData, unknown>;
  useSignout: () => UseMutationResult<void, unknown, void, unknown>;
  useGetUserRole: () => UseMutationResult<USER_ROLES, unknown, void, unknown>;
  setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthContext = createContext<Partial<AuthContextProps>>({});
AuthContext.displayName = 'AuthContext';

const queryCache = new QueryCache();

const AuthProvider = (props: any) => {
  const [appUser, setAppUser] = useState<Partial<AppUser> | null>(null);
  const [userRole, setUserRole] = useState<USER_ROLES | null>(null);
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [userSignedUp, setUserSignedUp] = useState<boolean>(false);
  const [userData] = useLocalStorage<AppUser>(LOCAL_STORAGE_KEYS.USER_DATA, undefined);
  // const { data: userProfile, refetch: userProfileRefetch } = useGetUser();

  useEffect(() => {
    if (userData) {
      setAppUser(userData);
    }
  }, [userData]);

  const { data } = useQuery({
    queryKey: [cacheKey.currentUserRole],
    queryFn: AuthenticationService.getUserRole,
    onSuccess: async (role) => {
      if (role) {
        setUserRole(role);
      }
    }
  });

  const values: AuthContextProps = {
    appUser,
    userRole,
    setAppUser,
    setUserRole,
    useSignin,
    useSignout,
    useGetUserRole,
    setUserSignedIn,
    setUserSignedUp,
  };
  return <AuthContext.Provider value={values} {...props} />;
};

function useSignin() {
  const { setUserSignedIn } = useAuth();
  const result = useMutation(AuthenticationService.signin, {
    onSuccess: () => {
      setUserSignedIn(true);
    },
    onError: (error: any) => {
      console.log(error)
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  return result;
}

function useSignout() {
  const { setAppUser, setUserRole } = useAuth();

  const result = useMutation(
    async () => {
      const response: void = await AuthenticationService.signout();
      return response;
    },
    {
      onSuccess: () => {
        setAppUser(null); // this action automatically redirects to login page
        setUserRole(null);
        localStorage.clear();
        queryCache.clear();
      },
    },
  );
  return result;
}

function useGetUserRole() {
  const result = useMutation(AuthenticationService.getUserRole);
  return result;
}

/**
 * @description
 * A hook responsible for interacting with and retrieving data from AuthContext.
 */
function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context as AuthContextProps;
}

export { AuthProvider, useAuth };
