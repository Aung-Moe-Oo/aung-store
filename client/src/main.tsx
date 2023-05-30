import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import Routes from "./routes/index.tsx";
import "./global.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
      <Notifications position="top-right" zIndex={2077} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </MantineProvider>
);
