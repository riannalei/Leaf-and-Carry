'use client'

import { cn } from '@/lib/utils'
import { usePathname } from "next/navigation"

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your tote',
    url: '/upload',
    imgSrc: '/cactusears.svg' 
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the tote yours',
    url: '/design',
    imgSrc: '/cactusnorm.svg'  
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
    imgSrc: '/cactuspointy.svg'  
  },
]

const Steps = () => {
  const pathname = usePathname()

  return (
    <ol className='rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-[#A7B59E]'>
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-[#A7B59E] lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-[#5B744B]': isCurrent,  // Current step color
                    'bg-[#A7B59E]': isCompleted,  // Completed step color
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className='flex-shrink-0'>
                  <img
                    src={step.imgSrc}
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-[#5B744B]': isCurrent,  // Border color for current step
                      }
                    )}
                    alt={step.name}
                  />
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-[#5B744B]', {
                      'text-[#A7B59E]': isCompleted,  // Text color for completed step
                      'text-[#5B744B]': isCurrent,  // Text color for current step
                    })}
                  >
                    {step.name}
                  </span>
                  <span className='text-sm text-[#799567]'>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-[#5B744B]'  
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps
