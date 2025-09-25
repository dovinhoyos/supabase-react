import { type JSX } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

interface Props {
  element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user) {
    return element;
  }

  return <Navigate to="/" replace />;
};