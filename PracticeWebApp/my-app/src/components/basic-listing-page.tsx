/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react/macro";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import moment from "moment";
import { FaSearch } from "react-icons/fa";

type responseData = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

type PropTypes = {
  header: string;
  data?: responseData[];
};

export const BasicListingPage: React.FC<PropTypes> = ({ header, data }) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`Entries/Details/${id}`);
  };

  return (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Flex justify={"space-between"}>
              <h1 className="header">{header}</h1>
              <Group style={{ paddingRight: "4rem" }}>
                <Button
                  onClick={() => navigate("/Search-Entries")}
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
              return (
                <div style={{ padding: "4rem" }} key={response.id}>
                  <Card
                    w={500}
                    shadow={"xl"}
                    radius={"md"}
                    style={{ backgroundColor: "#2a363b" }}
                  >
                    <Group position="apart" mt="md" mb="xs">
                      <Text color={"white"} weight={500}>
                        {response.title}
                      </Text>
                    </Group>
                    <Text size="sm" color="dimmed">
                      {moment(response.date).format("MMMM Do, YYYY")}
                    </Text>

                    <Flex justify={"flex-end"}>
                      <Button
                        w={100}
                        variant="light"
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                        onClick={() => handleClick(response.id)}
                      >
                        View
                      </Button>
                    </Flex>
                  </Card>
                </div>
              );
            })}
          </>
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
  }
`;
