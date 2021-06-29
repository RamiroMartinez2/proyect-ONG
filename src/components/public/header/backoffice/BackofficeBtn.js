import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { MdComputer } from "react-icons/md";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const BackofficeBtn = ({ isAdmin }) => {
  const history = useHistory();
  return (
    <>
      {isAdmin && (
        <Flex margin="1em" alignItems="center">
          <Link to="/backoffice">
            <Button
              variant="somosMasOutline"
              rightIcon={<MdComputer />}
              size="sm"
              onClick={() => history.push("/backoffice")}
            >
              Ir a Backoffice
            </Button>
          </Link>
        </Flex>
      )}
    </>
  );
};
