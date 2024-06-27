import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/userRoutes.tsx";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/context/store.ts";
import { Toaster } from "sonner";
import { SocketProvider } from "./utils/context/SocketContext/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors closeButton  position="top-right" />
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
      </SocketProvider>
    </PersistGate>
  </Provider>
);
