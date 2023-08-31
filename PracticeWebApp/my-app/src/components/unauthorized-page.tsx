/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Group } from "@mantine/core";
import React from "react";

export const UnAuthorizedPage = () => {
  return (
    <div css={styles}>
      <div className="background">
        <div className="content">
          <div className="header-container">
            <Group className="header" position="left" mt="md">
              <h1>You are not authorized to be here!</h1>
            </Group>
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
