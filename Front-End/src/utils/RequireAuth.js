import React  from 'react'
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
function RequireAuth({ children }) {
   
    let login=localStorage.getItem('token')
    let location = useLocation();
    if (login) {
        
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
  
  }
  export default RequireAuth