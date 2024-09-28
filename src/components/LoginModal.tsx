import type { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import Image from 'next/image';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { buttonVariants } from './ui/button';

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='absolute z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <Image
              src='/cactuspointy.svg'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-[#35522B]'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-[#35522B]'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200 mt-4'>
          <LoginLink
            className={buttonVariants({
              variant: 'outline',
              className: 'hover:bg-[#F8D0C8] text-[#35522B]', 
            })}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: 'default',
              className: 'hover:bg-[#F8D0C8] bg-[#35522B] text-white', 
            })}
          >
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
