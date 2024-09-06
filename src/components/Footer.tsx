import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    <footer className='bg-[#D5E8DC] h-24 relative border-t border-[#A3C7AC]'>
      <MaxWidthWrapper>
        {/* Footer Content */}
        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center py-4'>
          {/* Copyright Text */}
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-[#35522B]'>
              &copy; {new Date().getFullYear()} Leaf & Carry. All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className='flex items-center justify-center'>
            <div className='flex space-x-6'>
              <Link
                href='#'
                aria-label='Terms and Conditions'
                className='text-sm text-[#35522B] hover:text-[#5B744B] transition-colors'
              >
                Terms
              </Link>
              <Link
                href='#'
                aria-label='Privacy Policy'
                className='text-sm text-[#35522B] hover:text-[#5B744B] transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                aria-label='Cookie Policy'
                className='text-sm text-[#35522B] hover:text-[#5B744B] transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
