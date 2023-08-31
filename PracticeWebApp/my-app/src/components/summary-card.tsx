/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { responseData } from "./basic-listing-page";

type props = {
  response: responseData;
};

export const SummaryCard: React.FC<props> = ({ response }) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/entries/details/${id}`);
  };

  return (
    <div css={styles} style={{ padding: "4rem" }} key={response.id}>
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
        <Text className="description-summary" color="white" size={"md"}>
          {response.description.length > 50
            ? `${response.description.substring(0, 49)}...`
            : response.description}
        </Text>

        <Flex justify={"flex-end"}>
          <Text size="sm" color="dimmed">
            {moment(response.date).format("MMMM Do, YYYY")}
          </Text>
        </Flex>

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
};

const styles = css`
  .description-summary {
    padding-bottom: 3rem;
  }
`;
