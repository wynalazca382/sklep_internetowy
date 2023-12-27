import CartItem from '@/components/minicart/CartItem';
import { Product } from "../../types.d"

import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
 if (req.method === 'POST') {

    const items: Product[] = req.body.cart

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
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
       metadata:{
        images: JSON.stringify(items.map((item:Product) => item.thumbnail))
      }
      });
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