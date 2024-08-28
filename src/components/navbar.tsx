import Link from 'next/link';
import { Button } from './ui/button';
import { UserButton } from './user-button';
import { getSession } from '@/app/lib';

export const Navbar = async () => {
    const session = await getSession();

    return (
        <nav className="h-20 w-full px-4 shadow-md">
            <div className="container w-full h-full flex justify-between items-center">
                <a href="/" className="font-semibold text-slate-800 text-xl">E-Shop</a>
                {session ? (
                    <UserButton  {...session.user} />
                ) : (
                    <div className="flex gap-x-3">
                        <Link href={'/login'}>
                            <Button>Log in</Button>
                        </Link>
                        <Link href={'/register'}>
                            <Button>Register</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
