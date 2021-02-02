const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({
  origin: true,
});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendMessage = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.end();
  } else {
    cors(req, res, () => {
      if (req.method !== "POST") {
        return;
      }
      const mailOptions = {
        from: req.body.emailAddress,
        replyTo: req.body.emailAddress,
        to: gmailEmail,
        subject: `${req.body.FirstName} just requested a quote`,
        html: `
        <div>
  <h2>A new quote request!</h2>
  <h4>Car Details</h4>
  <ul>
    <li>Year: ${req.body.carYear}</li>
    <li>Make: ${req.body.carMake}</li>
    <li>Model: ${req.body.carModel} </li>
  </ul>
  <h4>Customer Details</h4>
  <ul>
    <li>${req.body.FirstName} ${req.body.LastName}</li>
    <li>Email: ${req.body.emailAddress}</li>
  </ul>

  <h4>Photos</h4>
  <ul>
          ${req.body.photos.map((photo) =>
    `<li><a href='${photo}'>Photo</a></li>`
  ).join("")}
  </ul>
</div>` // eslint-disable-line
      };

      return mailTransport.sendMail(mailOptions).then(() => {
        res.status(200).send({
          isEmailSend: true,
        });
        return;
      });
    });
  }
});
