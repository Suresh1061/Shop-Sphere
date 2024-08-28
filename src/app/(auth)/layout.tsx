import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='min-h-screen flex justify-center items-center px-4 py-8'>
            {children}
        </main>
    )
}

export default AuthLayout
