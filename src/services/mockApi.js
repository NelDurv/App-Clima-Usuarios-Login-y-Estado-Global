const users = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@email.com',
        password: '123456',
        preferences: { unit: 'C', theme: 'light' },
        favorites: ['Santiago', 'Valparaíso', 'Concepción']
    },
    {
        id: 2,
        name: 'María González',
        email: 'maria@email.com',
        password: '123456',
        preferences: { unit: 'F', theme: 'dark' },
        favorites: ['La Serena', 'Puerto Montt', 'Temuco']
    },
    {
        id: 3,
        name: 'Carlos Rojas',
        email: 'carlos@email.com',
        password: '123456',
        preferences: { unit: 'C', theme: 'light' },
        favorites: ['Antofagasta', 'Iquique']
    }
]

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export default {
    async login({ email, password }) {
        await delay()
        const user = users.find(u => u.email === email && u.password === password)

        if (user) {
            const { password, ...userWithoutPassword } = user
            return {
                success: true,
                user: userWithoutPassword,
                token: `fake-jwt-token-${user.id}`
            }
        }
        return { success: false, message: 'Usuario o contraseña incorrectos' }
    },

    async register({ name, email, password }) {
        await delay()
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'El email ya está registrado' }
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            preferences: { unit: 'C', theme: 'light' },
            favorites: []
        }
        users.push(newUser)
        const { password: _, ...userWithoutPassword } = newUser
        return {
            success: true,
            user: userWithoutPassword,
            token: `fake-jwt-token-${newUser.id}`
        }
    },

    async logout() {
        await delay()
        return { success: true }
    }
}