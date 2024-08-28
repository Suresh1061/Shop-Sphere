import  Navbar  from '@/components/navbar'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className='container w-full  px-4 md:px-6 py-12'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout
