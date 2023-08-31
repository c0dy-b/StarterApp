import { Loader } from "@mantine/core";
import axios, { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import { useAsyncRetry } from "react-use";
import { StatusCodes } from "../constants/status-codes";
import { useProduce } from "../hooks/use-produce";
import { useSubscription } from "../hooks/use-subscription";
import React from "react";

const currentUser = "currentUser";

type UserSummaryDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  roles: [];
};

const setUserItem = (user: UserSummaryDto) => {
  sessionStorage.setItem(currentUser, JSON.stringify(mapUser(user)));
};

const removeUserItem = () => {
  sessionStorage.removeItem(currentUser);
};

type AuthState = {
  user: UserSummaryDto | null;
  redirectUrl?: string | null;
};

const INITIAL_STATE: AuthState = {
  user: null,
  redirectUrl: null,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

export const AuthProvider = (props: any) => {
  const [state, setState] = useProduce<AuthState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const BASEURL = process.env.REACT_APP_BASE_API_AUTH_URL;

  const fetchCurrentUser = useAsyncRetry(async () => {
    setLoading(true);

    await axios
      .get(`${BASEURL}/get-current-user`)
      .then((response) => {
        if (response.data === null) {
        }
        setState((draft) => {
          draft.user = response.data;
        });
        setUserItem(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setState]);

  const logoutUser = () => {
    setState((draft) => {});

    axios
      .post(`${BASEURL}/sign-out`)
      .then((res) => {
        if (res.status !== StatusCodes.OK) {
          console.log(`Error on logout: ${res.statusText}`);
        } else {
          removeUserItem();
          setState((draft) => {
            draft.user = null;
          });
          console.log("Successfully Logged Out!");
        }
      })
      .catch(({ response, ...rest }: AxiosError<any>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err: any) => {
            console.log(err.message);
          });
        } else {
          console.error(rest.toJSON());
        }
      });
  };

  //This listens for any "notify("user-login") and performs the action specified."
  useSubscription("user-login", () => {
    setLoading(true);
    fetchCurrentUser.retry();
  });

  //This listens for any "notify("user-logout") and performs the action specified."
  useSubscription("user-logout", () => {
    logoutUser();
  });

  return (
    <>
      {loading ? <Loader /> : <AuthContext.Provider value={state} {...props} />}
    </>
  );
};

export function useUser() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return undefined;
  }
  return user;
}

export const mapUser = (user: UserSummaryDto | null) => ({
  id: user?.id,
  roles: user?.roles,
  firstName: user?.firstName,
  lastName: user?.lastName,
});
