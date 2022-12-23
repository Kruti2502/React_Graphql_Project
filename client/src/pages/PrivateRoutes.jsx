import { Navigate, Outlet } from 'react-router-dom'
export default function PrivateRoutes ({isAuthenticated}){
  
return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}