/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react/macro";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import moment from "moment";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useUser } from "../Contexts/use-auth";
import { SummaryCard } from "./summary-card";

export type responseData = {
  id: number;
  title: string;
  description: string;
  date: Date;
  lastUpdatedDate: Date;
};

type PropTypes = {
  header: string;
  data?: responseData[];
};

export const BasicListingPage: React.FC<PropTypes> = ({ header, data }) => {
  const navigate = useNavigate();

  const canView = localStorage.getItem("logged-in");
  return canView ? (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Flex justify={"space-between"}>
              <h1 className="header">{header}</h1>

              <Group style={{ paddingRight: "4rem" }}>
                <Button
                  onClick={() => {
                    navigate("/entries/create");
                  }}
                  leftIcon={<FaPlus />}
                  style={{ backgroundColor: "#2a363b" }}
                >
                  Create Entry
                </Button>

                <Button
                  onClick={() => navigate("/search-entries")}
                  leftIcon={<FaSearch />}
                  style={{ backgroundColor: "#2a363b" }}
                >
                  Search
                </Button>
              </Group>
            </Flex>
          </div>

          <>
            {data?.map((response: responseData) => {
              return <SummaryCard response={response} />;
            })}
          </>
        </div>
      </div>
    </div>
  ) : (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Flex justify={"space-between"}>
              <h1 className="header-un-authoried">
                You are not authorized to be here!
              </h1>
            </Flex>
          </div>
        </div>
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
    }

    .header-un-authoried {
      display: flex;
      justify-content: center;
      color: white;
      padding-left: 4rem;
    }
  }
`;
