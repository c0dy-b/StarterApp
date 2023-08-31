/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Group } from "@mantine/core";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  return (
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
              <h1>{header}</h1>
            </Group>
          </div>
          {children}
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

      .breadcrumbs-button {
        background-color: #2a363b;
      }
    }
  }
`;
