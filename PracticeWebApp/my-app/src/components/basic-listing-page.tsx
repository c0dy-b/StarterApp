/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react/macro";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import moment from "moment";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useUser } from "../Contexts/use-auth";
import { SummaryCard } from "./summary-card";
import { EntriesResponseData } from "../constants/DataTypes";
import { BasicPage } from "./basic-page";

type PropTypes = {
  header: string;
  data?: EntriesResponseData[];
};

export const BasicListingPage: React.FC<PropTypes> = ({ header, data }) => {
  const navigate = useNavigate();

  const canView = useUser();
  return canView ? (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Flex justify={"space-between"}>
              <h1 className="header">{header}</h1>

              <Group className="button-group">
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
            {data?.map((response: EntriesResponseData) => {
              return <SummaryCard response={response} key={response.id} />;
            })}
          </>
        </div>
      </div>
    </div>
  ) : (
    <BasicPage>You are not authorized to be here!</BasicPage>
  );
};

const styles = css`
  .data-card {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 581px) {
    .background {
      width: 100%;
      height: 100%;
      padding-top: 3rem;
      background-color: #2a363b;

      display: flex;
      justify-content: center;
    }
  }
  .content::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 580px) {
    .content {
      background-color: #99b899;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (min-width: 581px) and (max-width: 989px) {
    .content {
      width: 100%;
      background-color: #99b899;

      display: flex;
      flex-direction: column;
      align-items: center;

      overflow-x: hidden;
    }

    .content::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (min-width: 990px) {
    .content {
      width: 55%;

      height: fit-content;
      background-color: #99b899;

      display: flex;
      align-items: center;
      flex-direction: column;

      /* overflow-y: auto; */
    }
    .content::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (max-width: 579px) {
    .header-container {
      width: 100%;
      height: 100px;
    }

    .header {
      color: white;
      padding-left: 1rem;
    }
    .button-group {
      padding-right: 1rem;
    }

    .header-un-authoried {
      display: flex;
      justify-content: center;
      color: white;

      padding-left: 4rem;
    }
  }

  @media screen and (min-width: 580px) {
    .header-container {
      width: 100%;
      height: 100px;

      .header {
        color: white;
        padding-left: 4rem;
      }

      .button-group {
        padding-right: 4rem;
      }

      .header-un-authoried {
        display: flex;
        justify-content: center;
        color: white;
        padding-left: 4rem;
      }
    }
  }
`;
