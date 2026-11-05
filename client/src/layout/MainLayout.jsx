import { useSelector } from 'react-redux';
import { Outlet } from 'react-router'
import AppLoader from '../shared/ui/component/AppLoader';

const MainLayout = () => {

  const isLoading = useSelector((state) => state.auth.loading);

  if (isLoading) { 
    return <AppLoader />;
   }
  return (
    <Outlet/>
  )
}

export default MainLayout