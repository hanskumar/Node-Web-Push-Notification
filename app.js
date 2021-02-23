require("dotenv").config();
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const webpush       = require('web-push');
const path          = require('path');
const ejs           = require('ejs');

// view engine setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Web Push Notificatoin',
    });
});



// Send notification routes
app.post("/send", (req, res) => {
    // Get pushSubscription object
    const data = req.body;

    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test Notification" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(data, payload)
      .catch(err => console.error(err));

       // Send 201 - resource created
    //res.status(201).json({status:"success",messege:"Send Successfully.."});
  });



app.listen(process.env.PORT, () => console.log(`Server is stated on http://localhost:${process.env.PORT}`));


module.exports = app;