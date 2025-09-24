import "./App.css";
import { appRouter } from "./router/app.router";
import { RouterProvider } from "react-router";
import { AuthContextProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <RouterProvider router={appRouter} />
      </div>
    </AuthContextProvider>
  );
}

export default App;
