import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/userRoutes.tsx";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/context/store.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors position="top-right" />

    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
