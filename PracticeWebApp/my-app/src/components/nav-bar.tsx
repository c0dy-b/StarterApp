/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Button, Center, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../hooks/use-subscription";
import { FaBars, FaUser } from "react-icons/fa";
import { useUser } from "../Contexts/use-auth";
import { logoutUser } from "../Contexts/auth-service";

export const NavBar = () => {
  const navigate = useNavigate();
  const [openLogoutModal, { open, close }] = useDisclosure(false);

  const handleLogout = async () => {
    await axios.post("/api/auth/sign-out");
    close();
    logoutUser();
    navigate("/");
  };

  const showNav = useUser();

  return (
    <div css={styles}>
      <Flex justify={"end"}>
        <span className="desktop-view">
          {showNav && (
            <Button className="nav-button" color="red" onClick={open}>
              Logout
            </Button>
          )}

          {!showNav && (
            <Button
              className="nav-button"
              leftIcon={<FaUser />}
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </Button>
          )}
        </span>
        <span className="mobile-view">
          {showNav && (
            <Button className="nav-button" color="red" onClick={open}>
              Logout
            </Button>
          )}

          {!showNav && (
            <Button
              className="nav-button"
              leftIcon={<FaUser />}
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </Button>
          )}
        </span>
      </Flex>

      <Modal
        size={"xs"}
        xOffset={"50"}
        opened={openLogoutModal}
        onClose={close}
        centered
        title="Are you sure you want to logout?"
      >
        <Modal.Body>
          <Center>
            <Flex gap={"md"}>
              <Button
                onClick={() => {
                  close();
                }}
                className="delete-modal-button"
                color={"gray"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                className="delete-modal-button"
                color={"red"}
              >
                Confirm
              </Button>
            </Flex>
          </Center>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = css`
  @media screen and (min-width: 601px) {
    background-color: #2a363b;
    border-bottom: solid;
    border-color: #99b899;
    border-width: 3px;
    height: 75px;

    padding: 1rem;
    position: static;

    .mobile-view {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    .desktop-view .nav-button {
      display: none;
    }

    .mobile-view {
      padding: 1rem 1rem 1rem 0;

      width: 100%;
      background-color: #2a363b;
      display: flex;
      justify-content: flex-end;
    }
  }

  .mobile-view {
  }
`;
