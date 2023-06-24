import {Router, Request,Response} from 'express'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeRouter = Router();

stripeRouter.post("/create-payment-intent", async (req:Request, res:Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: req.body.amount,
      automatic_payment_methods: { enabled: true },
    });
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400)
    console.log(error)
    throw new Error("Action failed");
  }
});
// //bring publishableKey to frontend
stripeRouter.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
});


export default stripeRouter;