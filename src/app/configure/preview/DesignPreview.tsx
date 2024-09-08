'use client'

import Phone from '@/components/Phone';
import { Button } from '@/components/ui/button';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';
import { cn, formatPrice } from '@/lib/utils';
import { COLORS, FINISHES, MODELS } from '@/validators/option-validator';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Leaf, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { createCheckoutSession } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import LoginModal from '@/components/LoginModal';

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true));

  const { color, model, finish, material } = configuration;

  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  type CheckoutSessionResponse = {
    url: string;
  };
  

  // Calculate total price dynamically
  // @ts-ignore
  let totalPrice = PRODUCT_PRICES.model[model]; // Start with the price based on the model size
  if (material === 'cotton') totalPrice += PRODUCT_PRICES.material.cotton; // Add price for cotton (if any)
  if (material === 'linen') totalPrice += PRODUCT_PRICES.material.linen; // Add price for linen (if any)
  if (finish === 'glossy') totalPrice += PRODUCT_PRICES.finish.glossy; // Add price for glossy finish (if any)

  const { mutate: createPaymentSession } = useMutation<
    CheckoutSessionResponse,  // Type for the mutation's response
    Error,                    // Type for errors
    { configId: string }      // Type for the mutation function's variables
  >({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: (data: CheckoutSessionResponse) => {  // Explicitly type 'data'
      const { url } = data;  // Now 'url' is typed as 'string'
      if (url) {
        router.push(url);
      } else {
        throw new Error('Unable to retrieve payment URL.');
      }
    },
    onError: () => {
      toast({
        title: 'Uh-oh, something went wrong',
        description: 'There was a problem processing your order. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id });
    } else {
      // need to log in
      localStorage.setItem('configurationId', id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti
          active={showConfetti}
          config={{ elementCount: 150, spread: 70, colors: ['#F5C9C6', '#FDE9EA', '#F3BABA'] }}  // Updated Confetti Colors
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className='mt-16 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
        <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.imageUrl!}
          />
        </div>

        <div className='mt-6 sm:col-span-9 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-[#5B744B]'>
            Your Custom {modelLabel} Bag
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <CheckCircle className='h-4 w-4 text-[#799567]' />
            In stock and ready to ship
          </div>
        </div>

        <div className='sm:col-span-12 md:col-span-9 text-base'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-[#A7B59E] py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
            <div>
              <p className='font-medium text-[#5B744B]'>Features</p>
              <ol className='mt-3 text-[#799567] list-disc list-inside'>
                <li>Eco-friendly materials</li>
                <li>Durable and long-lasting</li>
                <li>Recyclable packaging</li>
                <li>Lifetime warranty on prints</li>
              </ol>
            </div>
            <div>
              <p className='font-medium text-[#5B744B]'>Materials</p>
              <ol className='mt-3 text-[#799567] list-disc list-inside'>
                <li>Premium cotton blend</li>
                <li>Scratch-resistant and easy to clean</li>
              </ol>
            </div>
          </div>

          <div className='mt-8'>
            <div className='bg-[#E4E8D8] p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div className='flex items-center justify-between py-1 mt-2'>
                  <p className='text-[#799567]'>Base price</p>
                  <p className='font-medium text-[#5B744B]'>
                  {/* @ts-ignore */}
                    {formatPrice(PRODUCT_PRICES.model[model] / 100)}
                  </p>
                </div>

                {finish === 'glossy' && (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-[#799567]'>Glossy finish</p>
                    <p className='font-medium text-[#5B744B]'>
                      {formatPrice(PRODUCT_PRICES.finish.glossy / 100)}
                    </p>
                  </div>
                )}

                {material === 'linen' && (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-[#799567]'>Linen material</p>
                    <p className='font-medium text-[#5B744B]'>
                      {formatPrice(PRODUCT_PRICES.material.linen / 100)}
                    </p>
                  </div>
                )}

                <div className='my-2 h-px bg-[#A7B59E]' />

                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold text-[#5B744B]'>Order total</p>
                  <p className='font-semibold text-[#5B744B]'>
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 flex justify-end pb-12'>
              <Button
                onClick={() => handleCheckout()}
                className='bg-[#799567] text-white px-4 sm:px-6 lg:px-8 hover:bg-[#5B744B]'>
                Proceed to Checkout <Leaf className='h-4 w-4 ml-1.5 inline' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
