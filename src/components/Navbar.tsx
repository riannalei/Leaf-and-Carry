import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-[#A3C7AC] bg-[#D5E8DC]/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex z-40 font-semibold items-center' aria-label='Leaf and Carry Home'>
            <span>Leaf</span>
            <span className='text-[#D6AFA5] mx-1'>&</span>
            <span>Carry</span>
          </Link>
          
          {/* Navigation Links */}
          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                {/* Sign Out Link */}
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  aria-label='Sign out'
                >
                  Sign out
                </Link>

                {/* Admin Dashboard Link */}
                {isAdmin && (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                    aria-label='Dashboard'
                  >
                    Dashboard ✨
                  </Link>
                )}

                {/* Create Tote Link */}
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                  aria-label='Create tote'
                >
                  Create tote
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                {/* Sign Up and Login Links */}
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  aria-label='Sign up'
                >
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  aria-label='Login'
                >
                  Login
                </Link>

                {/* Divider */}
                <div className='h-8 w-px bg-[#A3C7AC] hidden sm:block' />

                {/* Create Tote Link */}
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                  aria-label='Create tote'
                >
                  Create tote
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
