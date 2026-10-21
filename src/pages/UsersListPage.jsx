import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listUsers, deleteUser } from '../data/store'

// /users
function UsersListPage() {
    const [users, setUsers] = useState([])

    const load = () => setUsers(listUsers())

    useEffect(() => {
        load()
    }, [])

    const handleDelete = (id) => {
        if (!window.confirm('Delete this user?')) return
        deleteUser(id)
        load()
    }

    return (
        <div className="card">
            <div className="row spread">
                <h2>Users ({users.length})</h2>
                <Link className="btn-link" to="/users/new">
                    + Add user
                </Link>
            </div>

            {users.length === 0 ? (
                <p className="muted">No users yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    {user.image ? (
                                        <img className="thumb" src={user.image} alt={user.name} />
                                    ) : (
                                        <span className="muted">—</span>
                                    )}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || '—'}</td>
                                <td>{user.address || '—'}</td>
                                <td className="actions">
                                    <Link className="ghost btn-link" to={`/users/${user._id}/edit`}>
                                        Edit
                                    </Link>
                                    <button className="danger" onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default UsersListPage
