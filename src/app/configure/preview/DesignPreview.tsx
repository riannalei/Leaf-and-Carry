'use client'

import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, FINISHES, MODELS } from '@/validators/option-validator'
import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Leaf, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import LoginModal from '@/components/LoginModal'

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = configuration
  const { user } = useKindeBrowserClient()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  useEffect(() => setShowConfetti(true))

  const { color, model, finish, material } = configuration

  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!

  let totalPrice = BASE_PRICE
  if (material === 'cotton') totalPrice += PRODUCT_PRICES.material.cotton
  if (finish === 'linen') totalPrice += PRODUCT_PRICES.finish.linen

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url)
      else throw new Error('Unable to retrieve payment URL.')
    },
    onError: () => {
      toast({
        title: 'Uh-oh, something went wrong',
        description: 'There was a problem processing your order. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id })
    } else {
      // need to log in
      localStorage.setItem('configurationId', id)
      setIsLoginModalOpen(true)
    }
  }

  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti
          active={showConfetti}
          config={{ elementCount: 150, spread: 70, colors: ['#A7B59E', '#799567', '#5B744B'] }}  // Updated Confetti Colors
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className='mt-16 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
        <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className='mt-6 sm:col-span-9 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-[#5B744B]'>  {/* Updated Header Color */}
            Your Custom {modelLabel} Bag
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <CheckCircle className='h-4 w-4 text-[#799567]' />  {/* Updated Icon Color */}
            In stock and ready to ship
          </div>
        </div>

        <div className='sm:col-span-12 md:col-span-9 text-base'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-[#A7B59E] py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>  {/* Updated Border Color */}
            <div>
              <p className='font-medium text-[#5B744B]'>Features</p>  {/* Updated Text Color */}
              <ol className='mt-3 text-[#799567] list-disc list-inside'>  {/* Updated List Color */}
                <li>Eco-friendly materials</li>
                <li>Durable and long-lasting</li>
                <li>Recyclable packaging</li>
                <li>Lifetime warranty on prints</li>
              </ol>
            </div>
            <div>
              <p className='font-medium text-[#5B744B]'>Materials</p>  {/* Updated Text Color */}
              <ol className='mt-3 text-[#799567] list-disc list-inside'>  {/* Updated List Color */}
                <li>Premium cotton blend</li>
                <li>Scratch-resistant and easy to clean</li>
              </ol>
            </div>
          </div>

          <div className='mt-8'>
            <div className='bg-[#E4E8D8] p-6 sm:rounded-lg sm:p-8'>  {/* Updated Background Color */}
              <div className='flow-root text-sm'>
                <div className='flex items-center justify-between py-1 mt-2'>
                  <p className='text-[#799567]'>Base price</p>  {/* Updated Text Color */}
                  <p className='font-medium text-[#5B744B]'>  {/* Updated Text Color */}
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === 'linen' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-[#799567]'>Linen finish</p>  {/* Updated Text Color */}
                    <p className='font-medium text-[#5B744B]'>  {/* Updated Text Color */}
                      {formatPrice(PRODUCT_PRICES.finish.linen / 100)}
                    </p>
                  </div>
                ) : null}

                {material === 'cotton' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-[#799567]'>Cotton material</p>  {/* Updated Text Color */}
                    <p className='font-medium text-[#5B744B]'>  {/* Updated Text Color */}
                      {formatPrice(PRODUCT_PRICES.material.cotton / 100)}
                    </p>
                  </div>
                ) : null}

                <div className='my-2 h-px bg-[#A7B59E]' />  {/* Updated Divider Color */}

                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold text-[#5B744B]'>Order total</p>  {/* Updated Text Color */}
                  <p className='font-semibold text-[#5B744B]'>  {/* Updated Text Color */}
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 flex justify-end pb-12'>
              <Button
                onClick={() => handleCheckout()}
                className='bg-[#799567] text-white px-4 sm:px-6 lg:px-8 hover:bg-[#5B744B]'>  {/* Updated Button Color */}
                Proceed to Checkout <Leaf className='h-4 w-4 ml-1.5 inline' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
