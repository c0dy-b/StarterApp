/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return <div css={styles}></div>;
};

const styles = css`
  .container {
    width: 100%;
    height: 100px;
    color: white;

    background-color: #2a363b;
    border-bottom: 3px solid #99b899;

    .button-container {
      padding: 1rem;
    }
  }
`;
