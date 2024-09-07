import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { Resend } from 'resend';
// import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail';

// const resend = new Resend(process.env.RESEND_API_KEY!); // Ensure API key exists

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const stripeHeaders = headers();
    const signature = stripeHeaders.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return new Response('Invalid signature', { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error('Error verifying Stripe webhook signature:', error);
      return new Response('Webhook signature verification failed', { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_details?.email) {
        console.error('Missing user email in session data');
        throw new Error('Missing user email');
      }

      const { userId, orderId } = session.metadata || { userId: null, orderId: null };

      if (!userId || !orderId) {
        console.error('Invalid metadata in session:', session.metadata);
        throw new Error('Invalid request metadata');
      }

      const billingAddress = session.customer_details.address;
      const shippingAddress = session.shipping_details?.address;

      if (!shippingAddress || !billingAddress) {
        console.error('Invalid address details in session data');
        throw new Error('Invalid address details');
      }

      // Update the order in the database
      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details.name!,
              city: shippingAddress.city!,
              country: shippingAddress.country!,
              postalCode: shippingAddress.postal_code!,
              street: shippingAddress.line1!,
              state: shippingAddress.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details.name!,
              city: billingAddress.city!,
              country: billingAddress.country!,
              postalCode: billingAddress.postal_code!,
              street: billingAddress.line1!,
              state: billingAddress.state,
            },
          },
        },
      });

      // Uncomment and configure this section properly if you want to send an email
      // await resend.emails.send({
      //   from: 'Leaf and Carry <support@leafandcarry.com>',
      //   to: [session.customer_details.email],
      //   subject: 'Thanks for your order!',
      //   react: OrderReceivedEmail({
      //     orderId,
      //     orderDate: updatedOrder.createdAt.toLocaleDateString(),
      //     shippingAddress: {
      //       name: session.customer_details.name!,
      //       city: shippingAddress.city!,
      //       country: shippingAddress.country!,
      //       postalCode: shippingAddress.postal_code!,
      //       street: shippingAddress.line1!,
      //       state: shippingAddress.state,
      //     },
      //   }),
      // });

      return NextResponse.json({ result: event, ok: true });
    }

    console.warn('Unhandled event type:', event.type);
    return NextResponse.json({ message: 'Unhandled event type', ok: false }, { status: 400 });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    );
  }
}
