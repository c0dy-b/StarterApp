/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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
import { EntriesResponseData, ResponseData } from "../constants/DataTypes";

export const EntriesDetail = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<EntriesResponseData>();
  const [isLoading, setIsLoading] = useState(true);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const fetchEntry = useAsyncRetry(async () => {
    await axios
      .get<ResponseData>(`${BASEURL}/get-by-id/${id}`)
      .then((response) => {
        setData(response.data.data as EntriesResponseData);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("REQUEST FAILED: ", error);
      });
  });

  const [deleteOpened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    await axios
      .delete(`${BASEURL}/delete/${data?.id}`)
      .then((response) => {})
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

  const handleUpdate = async (values: {
    title: string | undefined;
    description: string | undefined;
  }) => {
    const updatedTitle = values.title ? values.title : data?.title;
    const updatedDescription = values.description
      ? values.description
      : data?.description;

    if (values.title || values.description) {
      await axios
        .put(`${BASEURL}/update/${id}`, {
          title: updatedTitle,
          description: updatedDescription,
          lastUpdatedDate: new Date(),
        })
        .then((response) => {
          notifications.show({
            title: "Entry Successfully Updated!",
            message: "",
            icon: <FaCheck />,
            color: "green",
          });
          setCanEdit(false);
          fetchEntry.retry();
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: "There was a problem updating the entry",
            message: "",
            icon: <FaTimes />,
            color: "red",
          });
        });
    }
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
                      mih={250}
                      shadow={"xl"}
                      radius={"md"}
                      style={{ backgroundColor: "#2a363b" }}
                    >
                      <Text
                        style={{ paddingTop: "1rem" }}
                        color={"white"}
                        weight={500}
                      >
                        {data?.description}
                      </Text>

                      <div style={{ paddingTop: "25%" }}>
                        <Flex justify="space-between">
                          <Flex direction={"column"}>
                            {data?.lastUpdatedDate && (
                              <Flex justify={"flex-start"} align={"flex-end"}>
                                <Text size="sm" color="dimmed">
                                  {`Last Updated | ${moment(
                                    data?.lastUpdatedDate
                                  ).format("MMMM Do, YYYY")}`}
                                </Text>
                              </Flex>
                            )}

                            <Flex justify={"flex-start"} align={"flex-end"}>
                              <Text size="sm" color="dimmed">
                                {`Created Date | ${moment(data?.date).format(
                                  "MMMM Do, YYYY"
                                )}`}
                              </Text>
                            </Flex>
                          </Flex>
                          <Button
                            variant="light"
                            color="blue"
                            onClick={() => setCanEdit(true)}
                            leftIcon={<FaPencilAlt />}
                          >
                            Edit
                          </Button>
                        </Flex>
                      </div>
                    </Card>

                    {data?.references.map((x) => (
                      <Card key={x.id}>{x.referencedId}</Card>
                    ))}
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
    justify-content: flex-end;
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
