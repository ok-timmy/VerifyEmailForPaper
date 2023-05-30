const express = require("express");
// const verifyEmailRoute = require("./Routes/verifyEmail");
const cors = require("cors");
const dotenv = require("dotenv")
const axios = require("axios");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.post("/api/verifyEmail/", (req, res) => {
  const {_email} = req.body;
  try {

        const options = {
        method: 'POST',
        url: 'https://withpaper.com/api/2022-08-12/checkout-link-intent',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        data: {
          contractId: `${process.env.CONTRACT_ID}`,
          title: 'Mumbai Example',
          description: 'Describe your project *with Markdown!*',
          imageUrl: 'https://unsplash.it/240/240',
          expiresInMinutes: 15,
          limitPerTransaction: 5,
          redirectAfterPayment: false,
          sendEmailOnCreation: false,
          requireVerifiedEmail: true,
          quantity: 1,
          metadata: {},
          // mintMethod: {
          //   name: 'claimTo',
          //   args: {_to: '$WALLET', _quantity: '$QUANTITY', _tokenId: 0},
          //   payment: {currency: 'MATIC', value: '0.001 * $QUANTITY'}
          // },
          // eligibilityMethod: {args: {METHOD_ARG_NAME: 'Unknown Type: mixed type'}, name: 'string'},
          feeBearer: 'BUYER',
          hideNativeMint: false,
          hidePaperWallet: false,
          hideExternalWallet: false,
          hidePayWithCard: false,
          hidePayWithCrypto: false,
          hidePayWithIdeal: true,
          sendEmailOnTransferSucceeded: true,
          // twitterHandleOverride: 'string',
          // successCallbackUrl: 'string',
          // cancelCallbackUrl: 'string',
          // walletAddress: 'string',
          email: _email,
          // contractArgs: 'string'
        }
      };
      axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
        res.status(400).json({
          message: "An error occured",
          error
        })
      }); 
    } catch (error) {
      console.error('Error occurred during email verification:', error);
      res.status(500).json({
          message: "An Error occurred during email verification",
          error
      })
      // Handle any errors that occur during the verification process
    }

});
app.get("/", (req, res)=>{
  res.json({message: " This works, thank God"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port 5000`);
});
