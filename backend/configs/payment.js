let razorpay = require("razorpay");

const razorpayConfig = {
  key_id: "rzp_test_yyPJDNR7iPgM94",
  key_secret: "Cbjzg0sJdH6NFCL5H3JmzkPf",
};

var instance = new razorpay(razorpayConfig);

// router.post("/orders", async (req, res) => {
//   const amount = req.body.price;
//   var instance = new Razorpay({
//     key_id: "rzp_test_SyMuhwrC3KC8jP",
//     key_secret: "b71MsDc7lz9ZpoXLgzQ9zpO1",
//   });
//   let order = await instance.orders.create({
//     amount: amount * 100,
//     currency: "INR",
//     receipt: "receipt#1",
//   });
//   console.log(order);

//   res.send(order);
// });

// router.post("/verigyPayment", async (req, res) => {
//   const order_id = req.body.order_id;
//   const payment_id = req.body.payment_id;
//   const razorpay_signature = req.body.signature;
//   console.log(
//     "im inside verifie " +
//       order_id +
//       " " +
//       payment_id +
//       " " +
//       razorpay_signature
//   );

//   const key_secret = "b71MsDc7lz9ZpoXLgzQ9zpO1";

//   let hmac = crypto.createHmac("sha256", key_secret);

//   hmac.update(order_id + "|" + payment_id);

//   const generated_signature = hmac.digest("hex");

//   if (razorpay_signature === generated_signature) {
//     console.log("verified");
//     return res.send("PV");
//   } else return res.send("PVF");
// });

exports.createOrder = function (req, res) {
  let options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit for INR(paise) // Converting Rupees to paise
    currency: "INR",
    receipt: "razor-" + Math.random().toString(36).substr(2, 8).toUpperCase(), //Generating receiptID
    payment_capture: 1,
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(order);
      console.log(order);
      console.log("id " + order.id);
      console.log("status " + order.status);
      /* SAMPLE RESPONSE 
                {
                    "id": "order_ExHdrPtOVbc8WM",
                    "entity": "order",
                    "amount": 100,
                    "amount_paid": 0,
                    "amount_due": 100,
                    "currency": "INR",
                    "receipt": "order_rcptid_11",
                    "offer_id": null,
                    "status": "created",
                    "attempts": 0,
                    "notes": [],
                    "created_at": 1590997809
                }
            */
    }
  });
};

exports.verifySignature = function (req, res) {
  let razorpay_order_id = req.body.razorpay_order_id;
  let razorpay_payment_id = req.body.razorpay_payment_id;
  let hmac = crypto.createHmac("sha256", razorPayConfig.key_secret);
  let data = hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  let generated_signature = data.digest("hex");
  if (generated_signature == req.body.razorpay_signature) {
    res.status(200).send("Signature Verified");
    console.log("Signature Verified");
  } else {
    res.status(403).json({ data: "Signature Invalid" });
  }
};
