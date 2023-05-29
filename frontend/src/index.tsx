import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
