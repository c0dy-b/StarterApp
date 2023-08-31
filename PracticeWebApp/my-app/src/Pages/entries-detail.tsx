/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { css } from "@emotion/react";
import {
  FaArrowLeft,
  FaCheck,
  FaPencilAlt,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import {
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";

type responseData = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export const EntriesDetail = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<responseData>();
  const [isLoading, setIsLoading] = useState(true);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<responseData>(`${BASEURL}/get-by-id/${id}`)
      .then((response) => {
        setData(response.data);

        setIsLoading(false);
        console.log("Entry: ", response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("REQUEST FAILED: ", error);
      });
  }, [BASEURL, id]);

  const [deleteOpened, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    axios
      .delete(`${BASEURL}/delete/${data?.id}`)
      .then((response) => {
        console.log("Entry: ", response);
      })
      .catch((error) => {
        console.log("REQUEST FAILED: ", error);
      });

    notifications.show({
      title: "Entry Deleted",
      message: "",
      color: "red",
      icon: <FaCheck />,
    });

    setCanEdit(false);

    navigate("/");
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const handleUpdate = (values: {
    title: string | undefined;
    description: string | undefined;
  }) => {
    const updatedTitle = values.title ? values.title : data?.title;
    const updatedDescription = values.description
      ? values.description
      : data?.description;

    if (values.title || values.description) {
      axios.put(`${BASEURL}update/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });
    }

    notifications.show({
      title: "Entry Successfully Updated!",
      message: "",
      icon: <FaCheck />,
      color: "green",
    });

    setCanEdit(false);
  };

  return (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Group className="header" position="left" mt="md">
              <Button
                size={"xs"}
                className="breadcrumbs-button"
                leftIcon={<FaArrowLeft />}
                onClick={() => navigate("/")}
              >
                {" "}
                Home
              </Button>
              <h1>{"Details"}</h1>
            </Group>
          </div>

          <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
            {!isLoading ? (
              <>
                <TextInput
                  w={500}
                  label="Title"
                  placeholder={data?.title}
                  className="title-input"
                  {...form.getInputProps("title")}
                />

                <Textarea
                  label="Description"
                  placeholder={data?.description}
                  {...form.getInputProps("description")}
                />

                {!canEdit && (
                  <Group position="left" mt={"md"}>
                    <Button
                      onClick={() => setCanEdit(true)}
                      leftIcon={<FaPencilAlt />}
                    >
                      Edit
                    </Button>
                  </Group>
                )}

                {canEdit && (
                  <>
                    <Group position="right" mt="md">
                      <Button
                        color={"red"}
                        onClick={open}
                        leftIcon={<FaTrash />}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => setCanEdit(false)}
                        color={"gray"}
                        leftIcon={<FaTimes />}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" leftIcon={<FaCheck />}>
                        Save Changes
                      </Button>
                    </Group>
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </form>
        </div>
        <Modal
          size={"xs"}
          xOffset={"50"}
          opened={deleteOpened}
          onClose={close}
          centered
        >
          <Modal.Body>
            <Center>
              <Flex gap={"md"}>
                <Button
                  onClick={() => {
                    close();
                    setCanEdit(false);
                  }}
                  className="delete-modal-button"
                  color={"gray"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="delete-modal-button"
                  color={"red"}
                >
                  Confirm
                </Button>
              </Flex>
            </Center>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

const styles = css`
  .data-card {
    display: flex;
    align-items: center;
  }
  .background {
    width: 100%;
    height: 100vh;
    background-color: #2a363b;

    display: flex;
    justify-content: center;
  }

  .content {
    width: 55%;
    height: 100%;
    background-color: #99b899;

    display: flex;
    align-items: center;
    flex-direction: column;

    overflow-y: auto;

    .title-input {
      padding-top: 2rem;
      padding-bottom: 2.5rem;
    }

    .mantine-1ix1d88 {
      height: 200px;
    }
  }
  .content::-webkit-scrollbar {
    display: none;
  }

  .header-container {
    width: 100%;
    height: 100px;

    .header {
      color: white;
      padding-left: 4rem;

      .breadcrumbs-button {
        background-color: #2a363b;
      }
    }
  }
`;
