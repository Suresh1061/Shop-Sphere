const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='min-h-screen flex justify-center items-start px-4 py-12'>
            {children}
        </main>
    )
}

export default AuthLayout
