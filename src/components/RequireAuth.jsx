import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../data/store'

// Route guard: renders children only when a token is present,
// otherwise redirects to /login (remembering where we came from).
function RequireAuth({ children }) {
    const location = useLocation()

    if (!getToken()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default RequireAuth
