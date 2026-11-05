import AppRoute from './router/AppRoute'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAaction } from '../feature/auth/state/authAction';
import AppLoader from '../shared/ui/component/AppLoader';

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);

useEffect(() => {
  dispatch(initializeAaction());
}, [dispatch]);

if (!initialized) {
  return <AppLoader />;
}

  return (
    <AppRoute/>
  )
}

export default App