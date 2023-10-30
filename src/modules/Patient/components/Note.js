import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createJournal,
  fetchJournalById,
  updateJournal,
} from "../services/patientService";
import { useAlert } from "../../../context/NotificationProvider";
import { LoadingButton } from "@mui/lab";
import { getDecodedJwt } from "../../../utils/auth";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Note = () => {
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setIsEdit(true);
    }
  }, [id]);
  const textareaRef = useRef(null);
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  const handleInputChange = (event) => {
    const { value } = event.target;
    setContent(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  const { data, isLoading: isJournalLoading } = useQuery(
    ["journal", { id }],
    fetchJournalById,
    {
      enabled: isEdit,
      onError: (error) => {
        showNotification?.(
          error.response?.data?.message ||
            error.response?.data?.name ||
            error.message,
          {
            type: "error",
          }
        );
      },
      onSuccess: (data) => {
        setContent(data.content);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";

            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
        }, 0);
      },
    }
  );
  const { mutate, isLoading } = useMutation(createJournal, {
    onError: (error) => {
      // handleErrors(error);
    },
    onSuccess: (data) => {
      showNotification?.("Journal saved Successfully", {
        type: "success",
      });
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation(updateJournal, {
    onError: (error) => {
      // handleErrors(error);
    },
    onSuccess: (data) => {
      showNotification?.("Journal saved Successfully", {
        type: "success",
      });
    },
  });
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          p: 5,
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 5,
          }}
        >
          <LoadingButton
            loading={isLoading || isUpdating}
            variant="contained"
            disabled={!content.length > 0}
            sx={{ color: "white" }}
            onClick={() => {
              let payload = {
                user: decodedUser._id,
                content,
              };
              if (isEdit) {
                payload = {
                  id,
                  content,
                };
                update(payload);
              } else {
                mutate(payload);
              }
            }}
          >
            Save
          </LoadingButton>
        </Box>
        <Box
          sx={{
            minHeight: "80vh",
            width: { xs: "100%", md: "80%" },
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px lightgray",
          }}
        >
          <Box sx={{ padding: "20px" }}>
            <textarea
              ref={textareaRef}
              style={{
                width: "100%",

                resize: "none",
                outline: "none",
                border: "none",
                fontFamily: "Poppins",
              }}
              value={content}
              placeholder="Type something..."
              onChange={handleInputChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Note;
