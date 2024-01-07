import {NextApiRequest, NextApiResponse} from "next";
import * as admin from 'firebase-admin'
import { db } from '../../utils/firebase';
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }
  const rawBody = await buffer(req)
  const sig = req.headers['stripe-signature']!;

  let event;
  try {
    
    event = stripe.webhooks.constructEvent(rawBody.toString(), sig, webhookSecret);

    switch (event.type) {
                    
                        case 'checkout.session.completed':
                          const data= event.data.object;
                          const session = await stripe.checkout.sessions.retrieve(data.id, {
                            expand:['line_items']
                          });
                          console.log(session);
                          const lineItems = await stripe.checkout.sessions.listLineItems(data.id, {expand: ['data.price.product']});
                          console.log(lineItems);
                          try{
                            await db.collection("orders").doc(data.metadata.userId).collection("zamowienia").doc(data.id).set({
                                id :data.id,
                                amount: data.amount_total/100,
                                paymentStatus: data.payment_status,
                                orderStatus: 'paid',
                                name:data.shipping_details.name,
                                address:data.shipping_details.address,
                                amount_shipping: data.shipping_cost.amount_total/100,
                                items: lineItems,
                                images: JSON.parse(data.metadata.images),
                                timestamp: moment().toDate(),
                              });
                            console.log("Zapisano zamówienie: data");
                            } catch (error) {
                              console.error("Błąd podczas zapisywania zamówienia:", error);
                            }        
                        break;
                        default:
                        console.log(`Unhandled event type ${event.type}`);
                    }
    res.status(200).send("OK")
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).send(`Webhook Error: ${err.message}`);
    return res.status(400).send('Signature Webhook Error')
  }

}

