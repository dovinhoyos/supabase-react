import { type JSX } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

interface Props {
  element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
  const { authStatus } = useAuth();

  if (authStatus === 'checking') {
    return null;
  }

  if (authStatus === 'authenticated') {
    return element;
  }

  return <Navigate to="/" replace />;
};