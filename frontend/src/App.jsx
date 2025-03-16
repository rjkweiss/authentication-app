import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // restore user
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="app-wrapper">
      <Navigation />
      {isLoaded && (
        <Routes>
          <Route path='/' element={ sessionUser ? <h2>Authenticated App Component</h2> : <Navigate to='/login'/>} />
          <Route path='/signup' element={<SignupFormPage />} />
        </Routes>
      )}

    </div>
  )
}

export default App
