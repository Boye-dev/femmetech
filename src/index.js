import React from "react";
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
root.render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
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
