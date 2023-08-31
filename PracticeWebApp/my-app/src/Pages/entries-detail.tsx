/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
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
  Card,
  Center,
  Flex,
  Group,
  Loader,
  Modal,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import moment from "moment";
import { useAsyncRetry } from "react-use";

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

  const fetchEntry = useAsyncRetry(async () => {
    await axios
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
  });

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

    navigate("/home");
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
      axios.put(`${BASEURL}/update/${id}`, {
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
    fetchEntry.retry();
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
                onClick={() => navigate("/home")}
              >
                {" "}
                Home
              </Button>
            </Group>
          </div>

          <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
            {!isLoading ? (
              <>
                {!canEdit && (
                  <>
                    <h1 className="entry-title">{data?.title}</h1>
                    <Card
                      w={500}
                      shadow={"xl"}
                      radius={"md"}
                      style={{ backgroundColor: "#2a363b" }}
                    >
                      <Group position="apart" mt="md" mb="xs">
                        <Text color={"white"} weight={500}>
                          {data?.description}
                        </Text>
                      </Group>

                      <Flex direction={"column"} align={"end"}>
                        <Text size="sm" color="dimmed">
                          {moment(data?.date).format("MMMM Do, YYYY")}
                        </Text>

                        <Group position="left" mt={"md"}>
                          <Button
                            variant="light"
                            color="blue"
                            onClick={() => setCanEdit(true)}
                            leftIcon={<FaPencilAlt />}
                          >
                            Edit
                          </Button>
                        </Group>
                      </Flex>
                    </Card>
                  </>
                )}

                {canEdit && (
                  <Card
                    w={500}
                    shadow={"xl"}
                    radius={"md"}
                    style={{ backgroundColor: "#2a363b" }}
                  >
                    <div className="title-input">
                      <div className="input-label">Title</div>
                      <TextInput
                        w={465}
                        placeholder={data?.title}
                        {...form.getInputProps("title")}
                      />
                    </div>

                    <div className="input-label">Description</div>
                    <Textarea
                      placeholder={data?.description}
                      {...form.getInputProps("description")}
                    />
                    <>
                      <Group
                        className="edit-button-group"
                        position="right"
                        mt="md"
                      >
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
                  </Card>
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
          <div style={{ paddingBottom: "1rem" }}>
            Are you sure you want to delete this post?
          </div>
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
    padding-top: 3rem;
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

    .input-label {
      color: white;
    }

    .entry-title {
      color: white;
      border-bottom: solid;
    }

    .mantine-1ix1d88 {
      height: 200px;
    }

    .edit-button-group {
      padding-top: 2rem;
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
