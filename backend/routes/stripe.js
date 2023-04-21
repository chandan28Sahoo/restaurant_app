const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY,{
  appInfo: {
    name: 'MyAwesomePlugin',
    version: '1.14.0', // Optional
    // url: 'https://myawesomeplugin.info', // Optional
  }
});

// let currency = request?.body?.data?.object?.currency || 'USD';
//       let stripeAccount = request.headers['stripe-account'];

//       const event = await this.stripeService.constructEventFromPayload(
//         signature,
//         request.rawBody,
//         currency,
//         '',
//         stripeAccount,
//       );

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("reqreq",req.body);
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });
  console.log("customer",customer);
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: parseInt(item.price) * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  console.log("line_items",line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US","IN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });

  } catch (error) {
      console.log("error",error);
  }
});

// Create order function

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.cartQuantity,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret = "whsec_190c27d1ff9664883fa3c25db56c6dfbedfd69b2c8f4a6502f255a789cd515df";
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
      console.log("signature",signature);
      // const header = stripe.webhooks.generateTestHeaderString({
      //   payload: JSON.stringify(req.body),
      //   webhookSecret,
      // });
      // console.log("headerheader",header);
      try {
        event = stripe.webhooks.constructEvent(
          JSON.stringify(req.body),
          signature,
          webhookSecret
        );
        console.log("event",event);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

module.exports = router;
