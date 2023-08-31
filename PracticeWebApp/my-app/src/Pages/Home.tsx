import React, { useEffect, useState } from "react";
import axios from "axios";
import { BasicListingPage } from "../components/basic-listing-page";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  roles: string[];
};

export const Home = () => {
  const BASEURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
  const [data, setData] = useState([]);
  const [, setIsLoading] = useState<boolean>(true);

  const currentUser: User = JSON.parse(
    sessionStorage.getItem("currentUser") as string
  );

  useEffect(() => {
    axios
      .get(`${BASEURL}/get-all/${currentUser.id}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        console.log("RESPONSE:", response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("ERROR:", error);
      });
  }, [BASEURL]);

  return <BasicListingPage header="Home" data={data} />;
};
