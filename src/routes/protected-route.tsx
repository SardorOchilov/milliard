import React from 'react';
import { Navigate, NavigateProps, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps extends NavigateProps {
  allow: boolean;
  layout?: React.FC<{ children: React.ReactNode }>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allow, layout: Layout = React.Fragment, ...args }) => {
  if (!allow) return <Navigate {...args} />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
