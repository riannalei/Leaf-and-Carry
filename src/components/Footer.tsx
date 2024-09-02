import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='bg-[#D5E8DC] h-24 relative'>
      <MaxWidthWrapper>
        <div className='border-t border-[#A3C7AC] mt-4' />

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center py-4'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-[#6B8F76]'>
              &copy; {new Date().getFullYear()} Leaf & Carry. All rights reserved.
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex space-x-6'>
              <Link
                href='#'
                className='text-sm text-[#6B8F76] hover:text-[#4D6B58] transition-colors'>
                Terms
              </Link>
              <Link
                href='#'
                className='text-sm text-[#6B8F76] hover:text-[#4D6B58] transition-colors'>
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-sm text-[#6B8F76] hover:text-[#4D6B58] transition-colors'>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
