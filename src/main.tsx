import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "@/themes/theme";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst={true}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <Toaster />
    </ThemeProvider>
  </StyledEngineProvider>,
);
