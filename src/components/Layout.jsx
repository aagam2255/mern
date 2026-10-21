import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearToken } from '../data/store'

// Shared chrome for the authenticated pages: top bar + nav + <Outlet/>.
function Layout() {
    const navigate = useNavigate()

    const handleLogout = () => {
        clearToken()
        navigate('/login', { replace: true })
    }

    return (
        <div className="App">
            <header className="topbar">
                <h1>repo-react User Manager</h1>
                <nav className="nav">
                    <NavLink to="/users" end>
                        Users
                    </NavLink>
                    <NavLink to="/users/new">Add user</NavLink>
                    <button className="ghost" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
