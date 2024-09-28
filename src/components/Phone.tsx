import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ToteBagProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string; 
}

const Phone = ({ imgSrc, className, ...props }: ToteBagProps) => {
  return (
    <div
      className={cn('relative pointer-events-none flex justify-center', className)}
      {...props}
      style={{ width: '100%' }} 
    >
      <img
        src='/tote.png' 
        className='pointer-events-none select-none w-full max-w-none h-auto' 
        style={{ width: '400px' }} 
        alt='Tote Bag'
      />

<div className='absolute inset-0 flex items-center justify-center'>
  <img
    src={imgSrc}
    className='object-cover rounded-lg' 
    style={{
      position: 'absolute',
      top: '68%', 
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%', 
      height: 'auto', 
      maxHeight: '70%', 
    }}
    alt='Custom Design Overlay'
  />
</div>

    </div>
  );
};

export default Phone;
