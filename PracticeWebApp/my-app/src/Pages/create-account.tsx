/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Flex, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import react from "react";
import { FaLock, FaTimes, FaUnlock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasicPage } from "../components/basic-page";
import { Roles } from "../constants/Roles";
import { useUser } from "../Contexts/use-auth";

export const CreateAccountPage = () => {
  const user = useUser();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
    },
  });

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  }) => {
    await axios
      .post("/api/auth/create-user", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.userName,
        password: values.password,
        role: "User",
      })
      .then((response) => {
        notifications.show({
          title: "Account Created!",
          message: "",
          color: "green",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        notifications.show({
          title: "An error has occured creating account",
          message: "",
          color: "red",
          icon: <FaTimes />,
        });
      });
  };

  return (
    <BasicPage
      header="Create Account"
      breadcrumbsText="login"
      breadcrumbsPath="/"
    >
      <div css={styles}>
        <Card className="login-container" w={500} h={450}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="login-fields">
              <Input
                placeholder="First name"
                icon={<FaUser />}
                {...form.getInputProps("firstName")}
              ></Input>
            </div>

            <div className="login-fields">
              <Input
                placeholder="Last name"
                icon={<FaUser />}
                {...form.getInputProps("lastName")}
              ></Input>
            </div>

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

            <Flex className="login-button" justify={"space-between"}>
              <div
                onClick={() => navigate("/")}
                className="create-account-link"
              >
                Already have an account?
              </div>
              <Button type={"submit"}>Create Account</Button>
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
      padding-top: 3rem;
    }

    .user-lock-icon {
      color: white;
    }

    .create-account-link {
      display: flex;
      align-items: flex-end;
      color: white;

      :hover {
        border-bottom: solid 1px;
        cursor: pointer;
      }
    }
  }
`;
