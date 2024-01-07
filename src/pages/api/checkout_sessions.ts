import CartItem from '@/components/minicart/CartItem';
import { Product } from "../../types.d"
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {

 if (req.method === 'POST') {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const items: Product[] = req.body.cart
    const { userId } = getAuth(req);
    let userEmail = null;

    if (userId) {
      const user = await clerkClient.users.getUser(userId);
      const primaryEmailAddressId = user?.primaryEmailAddressId;

      if (primaryEmailAddressId) {
        try {
          const emailData = await clerkClient.emailAddresses.getEmailAddress(primaryEmailAddressId);
          userEmail = emailData?.emailAddress || null;
        } catch (error) {
          console.error("Błąd podczas pobierania adresu e-mail:", error);
        }
      }
    }
    const transformedItems = items.map((item: Product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.thumbnail],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

   try {
      const session = await stripe.checkout.sessions.create({
        
        line_items: transformedItems,
        mode: 'payment',
        shipping_options:  [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
        shipping_address_collection:{
          allowed_countries:["US"]
        },
        customer_email: userEmail,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
       metadata:{
        userId: userId,
        email: userEmail,
        itemsid: JSON.stringify(items.map(item=>item.id)),
        itemsq: JSON.stringify(items.map(item =>item.quantity)),
        images: JSON.stringify(items.map(item => item.thumbnail))
      }   
      }  
      );
      res.json({ "sessionURL": session.url });
    } catch (err:any) {
       console.log(err);
       res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
 }
}