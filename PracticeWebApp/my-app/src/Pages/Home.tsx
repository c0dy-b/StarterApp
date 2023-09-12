import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BasicListingPage } from "../components/basic-listing-page";
import { useUser } from "../Contexts/use-auth";
import { Center, Flex, Loader } from "@mantine/core";
import { EntriesResponseData, ResponseData } from "../constants/DataTypes";

export const Home = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const [data, setData] = useState<EntriesResponseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUser = useUser();

  useEffect(() => {
    axios
      .get<ResponseData>(`${BASEURL}/get-all/${currentUser?.id}`)
      .then((response) => {
        setData(response.data.data as []);
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
