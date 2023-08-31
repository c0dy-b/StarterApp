/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Flex, Group } from "@mantine/core";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useRoutes } from "react-router-dom";
import { useUser } from "../Contexts/use-auth";
import { UnAuthorizedPage } from "./unauthorized-page";

type PropTypes = {
  header?: string;
  children?: string | JSX.Element | JSX.Element[];
  breadcrumbsElement?: string | JSX.Element;
  breadcrumbsText?: string;
  breadcrumbsPath?: string;
};

export const BasicPage: React.FC<PropTypes> = ({
  header,
  children,
  breadcrumbsText,
  breadcrumbsPath,
}) => {
  const navigate = useNavigate();

  return true ? (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Group className="header" position="left" mt="md">
              {breadcrumbsPath && (
                <Button
                  leftIcon={<FaArrowLeft />}
                  size={"xs"}
                  className="breadcrumbs-button"
                  onClick={() => navigate(`${breadcrumbsPath}`)}
                >
                  {" "}
                  {breadcrumbsText}
                </Button>
              )}
            </Group>
          </div>
          <Group>
            <Flex direction={"column"}>
              <h1 className="page-header">{header}</h1>
              {children}
            </Flex>
          </Group>
        </div>
      </div>
    </div>
  ) : (
    <UnAuthorizedPage />
  );
};

const styles = css`
  .page-header {
    color: white;
    border-bottom: solid;
  }

  .data-card {
    display: flex;
    align-items: center;
  }
  .background {
    width: 100%;
    height: 100vh;
    background-color: #2a363b;
    padding-top: 3rem;

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
      padding-left: 4rem;

      .breadcrumbs-button {
        background-color: #2a363b;
      }
    }
  }
`;
