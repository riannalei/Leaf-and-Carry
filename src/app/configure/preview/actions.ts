'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Order } from '@prisma/client'

//logic to create payment checkout session
export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  })

  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { model, finish, material } = configuration; // Include `model` in destructuring

  // Calculate the total price dynamically as done on the frontend
  // @ts-ignore
  if (model && PRODUCT_PRICES.model[model] !== undefined) {
      // @ts-ignore
    let price = PRODUCT_PRICES.model[model]; // Start with the model price
  if (finish === 'glossy') price += PRODUCT_PRICES.finish.glossy; // Add price for glossy finish (if any)
  if (material === 'linen') price += PRODUCT_PRICES.material.linen; // Add price for linen (if any)

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  })

  console.log(user.id, configuration.id);

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100, // Ensure to store the amount correctly
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: 'Custom Tote Bag',
    images: [configuration.imageUrl], 
    default_price_data: {
      currency: 'USD',
      unit_amount: price, // Use the correctly calculated price
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }
}
}