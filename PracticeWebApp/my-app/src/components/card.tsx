/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react/macro";
import moment from "moment";
import { EntriesResponseData } from "../constants/DataTypes";

type DataCardTypes = {
  data?: EntriesResponseData;
};

export const DataCard: React.FC<DataCardTypes> = ({ data }) => {
  return (
    <div css={styles}>
      <div className="container">
        <div className="data-card">
          <div className="icon-container"></div>
          <div className="data-info">{`Title: ${data?.title}`}</div>
          <div className="data-info">
            {`Date: ${moment(data?.date).format("MM/DD/YYYY")}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = css`
  .container {
    padding-bottom: 2rem;
    padding-top: 2rem;

    .data-card {
      width: 500px;
      height: 200px;
      background-color: #2a363b;
      border-radius: 05px;
      color: white;
      font-size: 1.2rem;

      display: flex;
      flex-direction: column;

      .data-info {
        padding-top: 1rem;
      }

      :hover {
        box-shadow: -10px 10px #1b1c1c;
      }
    }
    :hover {
      cursor: pointer;
      padding-bottom: 3rem;
      padding-left: 3rem;
    }
  }
`;
