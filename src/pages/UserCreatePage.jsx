import { useNavigate, Link } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { createUser } from '../data/store'

// /users/new
function UserCreatePage() {
    const navigate = useNavigate()

    const handleSubmit = (formData) => {
        createUser(formData) // logs the form data + adds to the in-memory list
        navigate('/users')
    }

    return (
        <div>
            <div className="row spread">
                <h2>Add user</h2>
                <Link className="btn-link" to="/users">
                    ← Back to list
                </Link>
            </div>
            <UserForm onSubmit={handleSubmit} />
        </div>
    )
}

export default UserCreatePage
