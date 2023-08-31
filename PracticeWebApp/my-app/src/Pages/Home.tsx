import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BasicListingPage } from "../components/basic-listing-page";
import { useUser } from "../Contexts/use-auth";
import { useAsyncRetry } from "react-use";
import { Center, Flex, Loader } from "@mantine/core";

export const Home = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUser = useUser();

  useEffect(() => {
    axios
      .get(`${BASEURL}/get-all/${currentUser?.id}`)
      .then((response) => {
        console.log("RESPONSE:", response);
        setData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("ERROR:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  return !isLoading ? (
    <BasicListingPage header="Home" data={data} />
  ) : (
    <Flex justify={Center} align={Center}>
      <Loader />
    </Flex>
  );
};
