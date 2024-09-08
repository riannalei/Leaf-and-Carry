"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });
  // loading
  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B744B]" />
          <h3 className="font-semibold text-xl text-[#5B744B]">
            Loading your order...
          </h3>
          <p className="text-[#799567]">This won't take long.</p>
        </div>
      </div>
    );
  }
  // not yet paid
  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B744B]" />
          <h3 className="font-semibold text-xl text-[#5B744B]">
            Verifying your payment...
          </h3>
          <p className="text-[#799567]">This might take a moment.</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-[#F3F8F2]">
      {" "}
      {/* Lighter Green Background */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-white rounded-lg shadow-lg">
        <div className="max-w-xl">
          <p className="text-base font-medium text-[#5B744B]">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-[#5B744B]">
            Your tote is on the way!
          </h1>
          <p className="mt-2 text-base text-[#799567]">
            We've received your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-[#5B744B]">Order number</p>
            <p className="mt-2 text-[#799567]">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-[#A7B59E]">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-[#5B744B]">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-[#799567]">
              At Tote&Carry, we believe an eco-friendly tote bag should be built
              to last. That’s why we offer a 5-year print guarantee: if your
              tote isn't of the highest quality, we'll replace it for free.
            </p>
          </div>
        </div>

       {/* Updated Tote Preview Section */}
<div className="flex justify-center items-center mt-4 p-6 bg-[#F9DDD8] rounded-lg relative">
  {/* Base Tote Bag Image */}
  <img
    alt="tote"
    src="/tote.png"  
    className="max-w-xs h-auto rounded-md relative z-10" 
  />

  {/* Overlay Design Image */}
  <img
    alt="design"
    src={configuration.imageUrl}  
    className="absolute inset-0 w-[40%] h-[40%] object-contain top-[45%] left-[30%] z-20" />
</div>



        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-[#5B744B]">Shipping address</p>
              <div className="mt-2 text-[#799567]">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-[#5B744B]">Billing address</p>
              <div className="mt-2 text-[#799567]">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-[#A7B59E] py-10 text-sm">
            <div>
              <p className="font-medium text-[#5B744B]">Payment status</p>
              <p className="mt-2 text-[#799567]">Paid</p>
            </div>

            <div>
              <p className="font-medium text-[#5B744B]">Shipping Method</p>
              <p className="mt-2 text-[#799567]">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-[#A7B59E] pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-[#5B744B]">Subtotal</p>
            <p className="text-[#799567]">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-[#5B744B]">Shipping</p>
            <p className="text-[#799567]">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-[#5B744B]">Total</p>
            <p className="text-[#799567]">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
