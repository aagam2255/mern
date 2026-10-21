// In-memory "backend" for repo-react.
//
// This project is NOT wired to axios or any real API. Every operation just
// logs what it received to the browser console and mutates an in-memory array.
// Data resets on page refresh.

let users = [
    {
        _id: 'u1',
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        phone: '9876500001',
        address: '12 MG Road, Ahmedabad',
        image: ''
    },
    {
        _id: 'u2',
        name: 'Diya Shah',
        email: 'diya.shah@example.com',
        phone: '9876500002',
        address: '44 Ring Road, Surat',
        image: ''
    }
]

let nextId = 3

// Turn a FormData into a plain object and log both forms.
const dump = (label, formData) => {
    const obj = {}
    for (const [key, value] of formData.entries()) {
        obj[key] = value instanceof File
            ? `File(${value.name}, ${value.size} bytes, ${value.type})`
            : value
    }
    console.groupCollapsed(`%c${label}`, 'color:#2563eb;font-weight:bold')
    console.log('FormData entries:')
    for (const [key, value] of formData.entries()) console.log('  ', key, '=', value)
    console.log('As object:', obj)
    console.groupEnd()
    return obj
}

// --- fake auth ----------------------------------------------------------

export const login = (email, password) => {
    console.log('%c[LOGIN] submitted', 'color:#2563eb;font-weight:bold', { email, password })
    // Accept anything - no real check.
    return { token: `fake-token-${Date.now()}` }
}

// --- CRUD on the in-memory array -------------------------------------

export const listUsers = () => {
    console.log('[LIST] returning', users.length, 'users')
    return users.map((u) => ({ ...u }))
}

export const getUser = (id) => {
    console.log('[GET] id =', id)
    return users.find((u) => u._id === id) || null
}

export const createUser = (formData) => {
    const data = dump('[CREATE] form data', formData)
    const file = formData.get('image')
    const record = {
        _id: `u${nextId++}`,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        password: data.password || '',
        image: file instanceof File && file.size ? URL.createObjectURL(file) : ''
    }
    users = [...users, record]
    console.log('[CREATE] added:', record)
    return record
}

export const updateUser = (id, formData) => {
    const data = dump(`[UPDATE] form data (id ${id})`, formData)
    const file = formData.get('image')
    users = users.map((u) => {
        if (u._id !== id) return u
        return {
            ...u,
            name: data.name ?? u.name,
            email: data.email ?? u.email,
            phone: data.phone ?? u.phone,
            address: data.address ?? u.address,
            image: file instanceof File && file.size ? URL.createObjectURL(file) : u.image
        }
    })
    const updated = users.find((u) => u._id === id)
    console.log('[UPDATE] result:', updated)
    return updated
}

export const deleteUser = (id) => {
    console.log('[DELETE] id =', id)
    users = users.filter((u) => u._id !== id)
    return { message: 'deleted' }
}

// --- token helpers (localStorage, same as ojt-app) --------------------

export const getToken = () => localStorage.getItem('token') || ''
export const setToken = (token) => localStorage.setItem('token', token)
export const clearToken = () => localStorage.removeItem('token')
