import React, { useEffect, useState } from "react";
import axios from "axios";
import { BasicListingPage } from "../components/basic-listing-page";
import { Loader } from "@mantine/core";
import { useUser } from "../Contexts/use-auth";

export const Home = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${BASEURL}/get-all`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        console.log("RESPONSE:", response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("ERROR:", error);
      });
  }, []);

  return <BasicListingPage header="Home" data={data} />;
};
