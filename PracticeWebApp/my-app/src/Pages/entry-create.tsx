/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasicPage } from "../components/basic-page";
import { useUser } from "../Contexts/use-auth";

export const EntryCreate = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const user = useUser();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    await axios
      .post(`${BASEURL}/create`, {
        title: values.title,
        description: values.description,
        createdByUserId: user?.id,
      })
      .then((response) => {
        notifications.show({
          title: "Entry created!",
          message: "",
          color: "green",
          icon: <FaCheck />,
        });

        navigate("/home");
      })
      .catch((error) => {
        console.log("REQUEST FAILED", error);
        notifications.show({
          title: "There was a problem creating entry",
          message: "",
          color: "red",
          icon: <FaTimes />,
        });
      });
  };

  return (
    <BasicPage
      header="Create Entry"
      breadcrumbsPath="/home"
      breadcrumbsText="Home"
    >
      <div css={styles}>
        <Card
          w={500}
          shadow={"xl"}
          radius={"md"}
          style={{ backgroundColor: "#2a363b" }}
        >
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="title-input">
              <div className="input-label">Title</div>
              <TextInput
                w={465}
                placeholder="Enter a title!"
                {...form.getInputProps("title")}
              />
            </div>

            <div className="input-label">Description</div>
            <Textarea
              placeholder="Enter a description!"
              {...form.getInputProps("description")}
            />
            <>
              <Group className="submit-button" position="right" mt="md">
                <Button type="submit" leftIcon={<FaPlus />}>
                  Create!
                </Button>
              </Group>
            </>
          </form>
        </Card>
      </div>
    </BasicPage>
  );
};

const styles = css`
  padding-top: 0rem;

  .input-label {
    color: white;
  }

  .title-input {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .submit-button {
    padding-top: 2rem;
  }

  .mantine-1ix1d88 {
    height: 200px;
  }
`;
