import { createRoot } from "react-dom/client";
import "@/styles/main.scss";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import "@/hooks/i18n/i18n";
import { StoreProvider } from "@/store/store";
import { ConfigProvider, Result } from "antd";
import { I18nextProvider } from "react-i18next";
import i18n from "./hooks/i18n/i18n";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
export const queryClient = new QueryClient();

const run = async () => {
  try {
    root.render(
      <StoreProvider>
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <QueryClientProvider client={queryClient}>
              <I18nextProvider i18n={i18n}>
                <Routes />
              </I18nextProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </QueryParamProvider>
        </BrowserRouter>
      </StoreProvider>,
    );
  } catch (err: any) {
    root.render(
      <div className="h-full grid place-items-center">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </div>,
    );
  }
};
run();
