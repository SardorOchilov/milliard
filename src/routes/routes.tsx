import { Navigate, Route, Routes as Switch } from "react-router-dom";

import ProtectedRoute from "./protected-route";
import MainLayout from "@/layouts/default";
import Login from "@/pages/auth/login";

import { observer } from "mobx-react";
import { useStore } from "@/store/store";
import Clients from "@/pages/clients/clients/clients";
import SalesOrder from "@/pages/sales/sales-order";

const Routes = observer(() => {
  const auth = useStore().authentication;
  const user = useStore().user;

  return (
    <Switch>
      <Route
        path="/auth"
        element={<ProtectedRoute allow={!auth.isAuthenticated} to="/app" />}
      >
        <Route path="login" element={<Login />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route
        path="app"
        element={
          <ProtectedRoute
            layout={MainLayout}
            allow={auth.isAuthenticated}
            to="/auth"
          />
        }
      >
        <Route path="clients">
          <Route path="list" element={<Clients />} />
          <Route path="*" element={<Navigate to="/clients/list" />} />
        </Route>

        <Route path="sales">
          <Route path="list" element={<SalesOrder />} />
          <Route path="*" element={<Navigate to="/sales/list" />} />
        </Route>

        <Route path="*" element={<Navigate to="/app/sales" />} />
      </Route>

      <Route
        path="*"
        element={
          auth.isAuthenticated ? (
            <Navigate to="/app/sales" />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
    </Switch>
  );
});

export default Routes;
