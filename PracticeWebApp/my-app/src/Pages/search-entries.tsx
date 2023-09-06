/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Alert, Button, Card, Flex, Group, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import { BasicPage } from "../components/basic-page";
import { SummaryCard } from "../components/summary-card";
import { EntriesResponseData, ResponseData } from "../constants/DataTypes";
import { useUser } from "../Contexts/use-auth";

type PropTypes = {
  header: string;
};

export const SearchEntries: React.FC<PropTypes> = ({ header }) => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<EntriesResponseData[]>([]);
  const form = useForm({
    initialValues: {
      query: "",
    },
  });

  const handleSearch = (values: { query: string }) => {
    if (values.query) {
      axios
        .get<ResponseData>(`${BASEURL}/search-entries/${user?.id}`, {
          params: {
            query: values.query,
          },
        })
        .then((response) => {
          setData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          notifications.show({
            title: "Request Failed",
            message: `${error}`,
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
    <BasicPage
      header={header}
      breadcrumbsText={"Home"}
      breadcrumbsPath={"/home"}
    >
      <form
        css={styles}
        onSubmit={form.onSubmit((values) => handleSearch(values))}
      >
        <Group position="right" className="input-style">
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
        <Flex direction="column">
          {data.map((entry) => {
            return <SummaryCard response={entry} key={entry.id} />;
          })}
        </Flex>
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

const styles = css`
  .input-style {
    padding-bottom: 4rem;
  }
`;
