import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { getUser, updateUser } from '../data/store'

// /users/:id/edit
function UserEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const found = getUser(id)
        if (found) setUser(found)
        else setNotFound(true)
    }, [id])

    const handleSubmit = (formData) => {
        updateUser(id, formData) // logs the form data + updates the in-memory list
        navigate('/users')
    }

    return (
        <div>
            <div className="row spread">
                <h2>Edit user</h2>
                <Link className="btn-link" to="/users">
                    ← Back to list
                </Link>
            </div>

            {notFound ? (
                <p className="error">User not found.</p>
            ) : !user ? (
                <p className="muted">Loading...</p>
            ) : (
                <UserForm initial={user} isEdit onSubmit={handleSubmit} />
            )}
        </div>
    )
}

export default UserEditPage
