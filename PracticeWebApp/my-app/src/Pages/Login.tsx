/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Button, Card, Flex, Input } from "@mantine/core";
import { BasicPage } from "../components/basic-page";
import { FaCheck, FaLock, FaTimes, FaUnlock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { loginUser } from "../Contexts/auth-service";

type LoginFormProps = {
  userName: string;
  password: string;
};

type LoginResponse = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
};

export const LoginPage = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_AUTH_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginResponse>();

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormProps) => {
    await axios
      .post<LoginResponse>(`${BASEURL}/sign-in`, {
        username: values.userName,
        password: values.password,
      })
      .then((user) => {
        console.log(user);
        setUser(user.data);

        if (user.data !== null) {
          notifications.show({
            title: "Successfully logged in!",
            message: "",
            color: "green",
            icon: <FaCheck />,
          });
          navigate("/home");
        }
      })
      .catch((error) => {
        notifications.show({
          title: "There was a problem logging in.",
          message: "",
          color: "red",
          icon: <FaTimes />,
        });
      });

    loginUser();
  };

  return (
    <BasicPage>
      <div css={styles}>
        <Card className="login-container" w={500} h={330}>
          <Flex
            direction={"column"}
            align={"center"}
            className="user-lock-icon"
          >
            {user ? <FaUnlock /> : <FaLock />}
            Sign in
          </Flex>
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <div className="login-fields">
              <Input
                placeholder="Username"
                icon={<FaUser />}
                {...form.getInputProps("userName")}
              ></Input>
            </div>

            <div className="login-fields">
              <Input
                type={"password"}
                placeholder="Password"
                icon={<FaLock />}
                {...form.getInputProps("password")}
              ></Input>
            </div>

            <Flex className="login-button" justify={"flex-end"}>
              <Button type={"submit"}>Login</Button>
            </Flex>
          </form>
        </Card>
      </div>
    </BasicPage>
  );
};

const styles = css`
  .login-container {
    background: #2a363b;

    .login-fields {
      padding-top: 3rem;
    }

    .login-button {
      padding-top: 4rem;
    }

    .user-lock-icon {
      color: white;
    }
  }
`;
