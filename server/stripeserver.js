const express = require("express");
const app = express();

const cors = require("cors");

// const secret_Key = import.meta.env.VITE_STRIPE_SECRECT_KEY;
// console.log(import.meta.env.VITE_STRIPE_SECRECT_KEY);
const stripe = require("stripe")(
  "sk_test_51O6x3vExvpXnhG9PbUOxvb3L7zbQVLCzjGGfxBuSHzxxJo9q5KXdaRWzhwawNIsw77L3oxve0fYlKcGTthGHOSZD00xGsjA6o6"
);

app.use(express.json());
app.use(cors());


//  checkout pai
app.post("/api/create-checkout-session", async (req, res) => {
  const Product = req.body;
  console.log(Product.currencySymbol);

  const session = await stripe.checkout.sessions.create({
    // ui_mode: "embedded",

    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: `${Product.currencySymbol}`,
          unit_amount: Product.Product_Price,
          product_data: {
            name: Product.Product_Name,
            images: [`${Product.Product_Img}`],
          },
        },
        quantity: Product.Product_Quanty,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/error`,
  });
  res.json({ id: session.id });
  console.log(session.payment_status);

  //   if (session.payment_status === 'paid') {
  //     // Perform actions for successful payment
  //     // For example, update database, send confirmation email, etc.
  //     console.log('Payment successful. Take action here.');
  //     res.json({ success: true });
  //   } else {
  //     res.json({ success: false });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

  //   console.log(session.status);

  // console.log(session);
  // (async () => {
  //   const { paymentIntent } = await stripe.retrievePaymentIntent(
  //     "sk_test_51O6x3vExvpXnhG9PbUOxvb3L7zbQVLCzjGGfxBuSHzxxJo9q5KXdaRWzhwawNIsw77L3oxve0fYlKcGTthGHOSZD00xGsjA6o6"
  //   );
  //   if (paymentIntent && paymentIntent.status === "succeeded") {
  //     // Handle successful payment here
  //     alert('Success')
  //   } else {
  //     alert('eror')
  //     // Handle unsuccessful, processing, or canceled payments and API errors here
  //   }
  // })();

  // const paymentIntent = await stripe.paymentIntents.create({
  //   // currency: "usd",
  //   // payment_method_types: ["card"],

  //   // line_items: [
  //   //   {
  //   //     price_data: {
  //   //       currency: "usd",
  //   //       unit_amount: Product.Product_Price,
  //   //       product_data: {
  //   //         name: Product.Product_Name,
  //   //         images: [`${Product.Product_Img}`],
  //   //       },
  //   //     },
  //   //     quantity: Product.Product_Quanty,
  //   //   },
  //   // ],
  //   // mode: "payment",
  //   // success_url: `http://localhost:5173/favorites`,
  //   // cancel_url: `http://localhost:5173/favorites`,

  //   amount: 1099,
  //   currency: "usd",
  //   payment_method_types: ["card"],
  // });

  // res.json({ id: paymentIntent.id });
});

// app.post("/create-payment-intent", async (req, res) => {
//   const Product = req.body;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: Product.Product_Price * Product.Product_Quanty,
//     currency: "usd",
//     payment_method_types: ["card"],
//   });

//   res.json({ clientSecret: paymentIntent.client_secret });
// });

// app.post("/webhook", (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       sig,
//       "YOUR_STRIPE_WEBHOOK_SECRET"
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       // Logic for handling successful payment
//       console.log("Payment succeeded:", event.data.object.id);
//       break;
//     case "payment_intent.payment_failed":
//       // Logic for handling failed payment
//       console.log("Payment failed:", event.data.object.id);
//       break;
//     // Add more cases for different event types if needed
//     default:
//       // Handle other event types or unknown events
//       console.log("Unhandled event type:", event.type);
//   }

//   res.json({ received: true });
// });
// app.get("/success", async (req, res) => {
//   const session_id = req.query.session_id; // Retrieve session ID from the query parameter

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status === "paid") {
//       // Payment was successful
//       // Perform actions for successful payment (e.g., update database, send confirmation email)
//       // You can also display a success message or redirect to a success page
//       res.render("successPage");
//     } else {
//       // Payment failed or is still pending
//       // Handle accordingly, e.g., redirect to an error page
//       res.render("errorPage");
//     }
//   } catch (error) {
//     // Error retrieving the session or other issues
//     console.error(error);
//     res.render("errorPage");
//   }
// });

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
