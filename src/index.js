import React, { useState } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import theme from "./theme";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationProvider } from "./context/NotificationProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChatBubbleOutline, Close } from "@mui/icons-material";
const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      cacheTime: 600000,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});
const Iframe = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: "500000",
          display: open ? "block" : "none",
          right: "50px",
          bottom: "100px",
        }}
      >
        <div>
          <iframe
            title="FAQ"
            width="300"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/e6513aff-0422-4b97-b22a-9d0db6f70746"
          ></iframe>
        </div>
      </div>
      <div>
        <div
          onClick={() => setOpen(!open)}
          style={{
            position: "fixed",
            right: "50px",
            backgroundColor: "blue",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "500000",
            borderRadius: "100%",
            bottom: "50px",
            cursor: "pointer",
          }}
        >
          {open ? (
            <Close style={{ color: "white" }} />
          ) : (
            <ChatBubbleOutline style={{ color: "white" }} />
          )}
        </div>
      </div>
    </>
  );
};
root.render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <Iframe />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NotificationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
