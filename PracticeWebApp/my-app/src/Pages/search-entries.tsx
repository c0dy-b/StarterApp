/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Alert, Button, Card, Group, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import { BasicPage } from "../components/basic-page";

type PropTypes = {
  header: string;
};

type responseData = {
  id: number;
  description: string;
  date: Date;
};

export const SearchEntries: React.FC<PropTypes> = ({ header }) => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<responseData[]>([]);
  const form = useForm({
    initialValues: {
      query: "",
    },
  });

  const handleSearch = (values: { query: string }) => {
    if (values.query) {
      axios
        .get<responseData[]>(`${BASEURL}/search-entries`, {
          params: {
            query: values.query,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          notifications.show({
            title: "Request Failed",
            message: "",
            color: "red",
          });

          console.log("REQUEST FAILED: ", error);
          setIsLoading(false);
        });
    } else {
      notifications.show({
        title: "Try typing something",
        message: "",
        color: "violet",
      });
    }
  };

  return (
    <BasicPage header={header} breadcrumbsText={"Home"} breadcrumbsPath={"/"}>
      <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
        <Group position="right">
          <Input
            placeholder="Search"
            icon={<FaSearch />}
            w={500}
            top={50}
            {...form.getInputProps("query")}
          />
          <Button type="submit" top={50}>
            Search
          </Button>
        </Group>
      </form>

      <Group>
        {data.map((values) => {
          return <Card top={100}>{values.description}</Card>;
        })}
      </Group>

      {data.length === 0 && !isLoading ? (
        <Alert icon={<FaInfoCircle />} color="red" top={100}>
          No data found
        </Alert>
      ) : (
        <></>
      )}
    </BasicPage>
  );
};

const styles = css``;
