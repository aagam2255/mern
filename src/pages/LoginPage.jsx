import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, setToken } from '../data/store'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Plain-JS validation - returns an { field: message } object (empty = valid).
function validate({ email, password }) {
    const errors = {}
    if (!email.trim()) errors.email = 'Email is required'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address'
    if (!password) errors.password = 'Password is required'
    return errors
}

// /login
function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/users'

    const [email, setEmail] = useState('admin@example.com')
    const [password, setPassword] = useState('password123')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const found = validate({ email, password })
        setErrors(found)
        if (Object.keys(found).length > 0) return

        // No real auth - store.login just logs and returns a fake token.
        const { token } = login(email.trim(), password)
        setToken(token)
        navigate(from, { replace: true })
    }

    return (
        <div className="App">
            <div className="card auth-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrors((p) => ({ ...p, email: undefined }))
                            }}
                        />
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrors((p) => ({ ...p, password: undefined }))
                            }}
                        />
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit">Sign in</button>
                </form>
                <p className="hint">
                    Any email/password works - this project has no real backend.
                    Check the browser console for the submitted data.
                </p>
            </div>
        </div>
    )
}

export default LoginPage
