const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const userSchema = require("../Model/userSchema");

const instance = new Razorpay({
  key_id: process.env.PAYMENT_KEY_ID,
  key_secret: process.env.PAYMENT_SECRET,
});

// router.post("/create/orderId", (req, res) => {
//   try {
//     const receiptId = `rcp_${Math.random().toString(36).substr(2, 9)}`;
//     const options = {
//       amount: req.body.amount * 100, // Razorpay expects amount in paisa, so multiply by 100
//       currency: "INR",
//       receipt: receiptId,
//     };

//     instance.orders.create(options, function (err, order) {
//       if (err) {
//         console.error("Error creating order:", err);
//         return res.status(500).send({ error: "Internal Server Error" });
//       }
//       console.log("Order created:", order);
//       res.send({ orderId: order.id });
//     });
//   } catch (error) {
//     res
//       .status(200)
//       .json({ status: "failed", code: 500, message: "Internal server error" });
//   }
// });

// router.post("/api/payment/verify", async (req, res) => {
//   const {
//     razorpay_payment_id,
//     razorpay_order_id,
//     razorpay_signature,
//     amount,
//     userId,
//   } = req.body;

//   const generated_signature = generateSignature(
//     razorpay_order_id,
//     razorpay_payment_id,
//     "FvCdGKUvW9Jwvw6a0K7h2M0c"
//   );

//   if (generated_signature === razorpay_signature) {
//     try {
//       // Update user document
//       const updatedUser = await userSchema.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             subscriptions: {
//               payment_id: razorpay_payment_id,
//               order_id: razorpay_order_id,
//               amount: amount,
//               // Add more fields as needed
//             },
//           },
//           $set: { isPaid: true },
//         },
//         { new: true }
//       );

//       console.log("Payment is successful", updatedUser);
//       res.status(200).send("Payment successful");
//     } catch (error) {
//       console.error("Error updating user document:", error);
//       res.status(500).send("Internal server error");
//     }
//   } else {
//     console.error("Payment verification failed");
//     res.status(400).send("Payment verification failed");
//   }
// });
const nodemailer = require("nodemailer");
const crypto = require('crypto');
// app password gmail : cjww vocd yqvj jqbf
// to generate go to node mailer site and generate app specific password.


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'vancher571@gmail.com',
    pass: 'cjww vocd yqvj jqbf',
  },
});
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

router.post("/complete-vendor-payment", async (req, res) => {
  try {
    const { amount, paymentId, orderId, userId } = req.body;

    // Construct payment data object
    const paymentData = {
      paymentId: paymentId,
      orderId: orderId,
      amount: amount,
      date : Date.now()
    };

    // Update user document
    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        $push: { subscriptions: paymentData },
        $set: { isPaid: true },
      },
      { new: true }
    );
    const mailOptions = {
      to: updatedUser.email,
      from: "vancher571@gmail.com", // Consider using a more professional "from" email
      subject: "OTM - Vendor Subscription Confirmation",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Payment Successful & Subscription Started</title>
          <style>
              /* Basic styling for all devices */
              body { font-family: sans-serif; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
              h1 { color: #333; }
              p { line-height: 1.6; }
      
              /* Mobile-specific styles */
              @media (max-width: 480px) {
                  .container { padding: 10px; }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Payment Successful!</h1>
              <p>Thank you for your payment. Your subscription has officially started.</p>
      
              <h2>Subscription Details:</h2>
              <p>
                  <b>Plan:</b> {{planName}}<br>
                  <b>Next Billing Date:</b> {{nextBillingDate}} 
              </p>
      
              <p>We hope you enjoy our service!</p>
              <p>If you have any query, please don't hesitate to contact us.</p>
      
              <p>Sincerely,</p>
              <p>One Touch Moments, Team</p>
          </div>
      </body>
      </html>
      `.replace('{{planName}}', 'Premium') // Example replacement
      .replace('{{nextBillingDate}}', Date.now()) ,
  };
  

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        return res.status(200).json({ message: "Error sending email",status : 'fail',code : 200 });
      }else{
        return res.status(200).json({
          status: "Success",
          code: 200,
          message: "Payment successful",
          user: updatedUser,
        });
      }
      
    });

    
  } catch (error) {
    console.error("Error completing vendor payment:", error);
    res.status(500).json({
      status: "Failed",
      code: 500,
      message: "Payment Failed",
    });
  }
});


// function generateSignature(order_id, razorpay_payment_id, secret) {
//   const hmac = crypto.createHmac("sha256", secret);
//   hmac.update(`${order_id}|${razorpay_payment_id}`);
//   return hmac.digest("hex");
// }

module.exports = router;
