/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Button, Center, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../hooks/use-subscription";
import { FaUser } from "react-icons/fa";

export const NavBar = () => {
  const navigate = useNavigate();
  const [openLogoutModal, { open, close }] = useDisclosure(false);

  const handleLogout = async () => {
    await axios.post("/api/auth/sign-out");
    close();
    localStorage.clear();
    navigate("/");
  };

  const showNav = localStorage.getItem("logged-in");

  return (
    <div css={styles}>
      <Flex justify={"end"}>
        {showNav && (
          <Button color={"red"} onClick={open}>
            Logout
          </Button>
        )}

        {!showNav && (
          <Button
            leftIcon={<FaUser />}
            onClick={() => navigate("/create-account")}
          >
            Create Account
          </Button>
        )}
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
  background-color: #2a363b;
  border-bottom: solid;
  border-color: #99b899;
  border-width: 3px;
  height: 75px;

  padding: 1rem;
`;
