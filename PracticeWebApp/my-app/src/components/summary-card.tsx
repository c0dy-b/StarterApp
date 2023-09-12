/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EntriesResponseData } from "../constants/DataTypes";

type props = {
  response: EntriesResponseData;
};

export const SummaryCard: React.FC<props> = ({ response }) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/entries/details/${id}`);
  };

  return (
    <div css={styles} style={{ padding: "4rem" }} key={response.id}>
      <Card w={500} shadow={"xl"} radius={"md"} className="card">
        <Group position="apart" mt="md" mb="xs">
          <Text color={"white"} weight={500}>
            {response.title}
          </Text>
        </Group>
        <Text className="description-summary" color="white" size={"md"}>
          {response.description.length > 50
            ? `${response.description.substring(0, 49)}...`
            : response.description}
        </Text>

        <Flex justify={"space-between"}>
          <Flex direction={"column"}>
            {response.lastUpdatedDate && (
              <Flex justify={"flex-start"} align="flex-end">
                <Text size="sm" color="dimmed">
                  {`Last Updated | ${moment(response.lastUpdatedDate).format(
                    "MMMM Do, YYYY"
                  )}`}
                </Text>
              </Flex>
            )}

            <Flex justify={"flex-start"} align="flex-end">
              <Text size="sm" color="dimmed">
                {`Created Date | ${moment(response.date).format(
                  "MMMM Do, YYYY"
                )}`}
              </Text>
            </Flex>
          </Flex>

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
};

const styles = css`
  .description-summary {
    padding-bottom: 3rem;
  }

  @media screen and (max-width: 580px) {
    .card {
      width: 375px;
      background-color: #2a363b;
    }
  }

  @media screen and (min-width: 581px) {
    .card {
      background-color: #2a363b;
    }
  }
`;
