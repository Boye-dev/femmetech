import { Box, Drawer } from "@mui/material";
import React from "react";

const Book = (props) => {
  return (
    <>
      <Drawer open={props.open} anchor="right" onClose={props.onClose}>
        <Box>
          <p>hello book</p>
        </Box>
      </Drawer>
    </>
  );
};

export default Book;
