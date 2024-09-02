import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import { Reviews } from '@/components/Reviews'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check, Star } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-[#F0F4F1] grainy-light'> {/* Background with soft green */}
  <section>
    <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
      <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
        <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
          <div className='absolute w-40 h-40 left-0 top-[-80px] hidden lg:block'> {/* Adjusted size and top positioning */}
            <img src='/cactuspointy.svg' className='w-full h-full' /> {/* Ensured the SVG uses full width and height */}
          </div>
          <h1 className='relative w-fit tracking-tight text-balance mt-20 lg:mt-16 font-bold !leading-tight text-[#2D3E35] text-5xl md:text-6xl lg:text-7xl'> {/* Adjusted margin-top */}
            Your Design on a{' '}
            <span className='bg-[#83A598] px-2 text-white'>Custom</span>{' '}
            Tote Bag
          </h1>
          <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap text-[#4D6B58]'>
            Capture your favorite memories with your own,{' '}
            <span className='font-semibold'>one-of-one</span> tote bag.
            Leaf & Carry allows you to carry your memories, not just your
            essentials.
          </p>
              <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-[#83A598]' />
                    High-quality, durable material
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-[#83A598]' />5 year
                    print guarantee
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-[#83A598]' />
                    Modern, eco-friendly designs
                  </li>
                </div>
              </ul>

              <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                <div className='flex -space-x-4'>
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-[#E3E8E5]'
                    src='/users/user-1.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-[#E3E8E5]'
                    src='/users/user-2.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-[#E3E8E5]'
                    src='/users/user-3.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-[#E3E8E5]'
                    src='/users/user-4.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-[#E3E8E5]'
                    src='/users/user-5.png'
                    alt='user image'
                  />
                </div>

                <div className='flex flex-col justify-between items-center sm:items-start'>
                  <div className='flex gap-0.5'>
                    {/* Updated stars to have a pink color */}
                    <Star className='h-4 w-4 text-[#D6AFA5] fill-[#D6AFA5]' />
                    <Star className='h-4 w-4 text-[#D6AFA5] fill-[#D6AFA5]' />
                    <Star className='h-4 w-4 text-[#D6AFA5] fill-[#D6AFA5]' />
                    <Star className='h-4 w-4 text-[#D6AFA5] fill-[#D6AFA5]' />
                    <Star className='h-4 w-4 text-[#D6AFA5] fill-[#D6AFA5]' />
                  </div>

                  <p className='text-[#4D6B58]'>
                    <span className='font-semibold'>1,250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
              <img
                src='/your-image.png'
                className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
              />
              <img
                src='/line.png'
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />
              <Phone className='w-64' imgSrc='/testimonials/1.jpg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='bg-[#E9F1ED] grainy-dark py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-[#2D3E35]'>
              What our{' '}
              <span className='relative px-2'>
                customers{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-[#83A598]' />
              </span>{' '}
              say
            </h2>
            <img src='/cactusears.svg' className='w-40 order-0 lg:order-2' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                {/* Updated stars to have a pink color */}
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
              </div>
              <div className='text-lg leading-8 text-[#4D6B58]'>
                <p>
                  "The tote bag feels durable and I even got a compliment on the
                  design. Had the bag for two and a half months now and{' '}
                  <span className='p-0.5 bg-[#4D6B58] text-white'>
                    the print is super clear
                  </span>
                  , on the bag I had before, the design started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-3.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold text-[#2D3E35]'>Emma</p>
                  <div className='flex gap-1.5 items-center text-[#4D6B58]'>
                    <Check className='h-4 w-4 stroke-[3px] text-[#83A598]' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                {/* Updated stars to have a pink color */}
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
                <Star className='h-5 w-5 text-[#D6AFA5] fill-[#D6AFA5]' />
              </div>
              <div className='text-lg leading-8 text-[#4D6B58]'>
                <p>
                  "I usually carry my tote everywhere, and my last ones got 
                  worn out quickly. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className='p-0.5 bg-[#4D6B58] text-white'>
                    looks brand new after about half a year
                  </span>
                  . I love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-5.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold text-[#2D3E35]'>Jessica</p>
                  <div className='flex gap-1.5 items-center text-[#4D6B58]'>
                    <Check className='h-4 w-4 stroke-[3px] text-[#83A598]' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className='pt-16'>
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-[#2D3E35]'>
                Upload your design and get{' '}
                <span className='relative px-2 bg-[#83A598] text-white'>
                  your own tote
                </span>{' '}
                now
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col md:flex-row items-center md:justify-between gap-80'>

  {/* <div className='relative flex flex-col md:flex-row items-center md:justify-between gap-16'> */}
              <img
                src='/arrow.png'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
              />

        <div className='relative h-90 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-[#F0F4F1] ring-inset ring-[#E3E8E5] lg:rounded-2xl'>
        <img
          src='/3.png'
        className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-[#E3E8E5]'
            style={{ marginTop: '60px' }} // Adjust value as needed
            />
          </div>
          
              <Phone className='w-40' imgSrc='/3.png' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-[#83A598] inline mr-1.5' />
              High-quality cotton material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-[#83A598] inline mr-1.5' />
              Eco-friendly and durable prints
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-[#83A598] inline mr-1.5' />
              Machine washable
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-[#83A598] inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                Create your tote now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
