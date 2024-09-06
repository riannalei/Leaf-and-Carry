import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ToteBagProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string; // User-uploaded image
}

const Phone = ({ imgSrc, className, ...props }: ToteBagProps) => {
  return (
    <div
      className={cn('relative pointer-events-none flex justify-center', className)}
      {...props}
      style={{ width: '100%' }} // Ensure the div can expand fully
    >
      {/* Tote Bag Base */}
      <img
        src='/tote.png' // The tote bag base image
        className='pointer-events-none select-none w-full max-w-none h-auto' // Make width full and remove max-width
        style={{ width: '400px' }} // Set a large width directly
        alt='Tote Bag'
      />

      {/* Overlay Image */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <img
        // className='object-cover min-w-full min-h-ful'
          src={imgSrc}
          className='object-cover rounded-lg' // Maintaining rounded edges
          style={{
            position: 'absolute',
            top: '68%', // Adjust to fit the tote bag perfectly
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '58%', // Adjusted for a square size relative to the tote bag width
            height: '47%', // Keep it proportional
          }}
          alt='Custom Design Overlay'
        />
      </div>
    </div>
  );
};

export default Phone;
