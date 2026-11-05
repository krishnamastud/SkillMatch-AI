import { useSelector } from 'react-redux';
import { Navigate, Outlet,  } from 'react-router'

const PublicRoute = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // If the user is authenticated, redirect them to the home page
    return <Navigate to="/dashboard" />;
  }
  return (
    <Outlet />
  )
}

export default PublicRoute