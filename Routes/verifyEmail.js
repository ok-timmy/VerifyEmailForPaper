const axios = require("axios");
const express = require("express");

const verifyEmail = (req, res) => {
    const {_email} = req.body;
    try {
        const domain =_email.split('@')[1];
        console.log(domain);
    
        if (domain.endsWith('edu.com')) {
          console.log('Email domain is a valid .edu domain. Sending request...');
    
          const options = {
          method: 'POST',
          url: 'https://withpaper.com/api/2022-08-12/checkout-link-intent',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer f38fd6a4-8ff0-47c2-a40c-e94e39fb80c7'
          },
          data: {
            contractId: '4299ccb3-7918-4b21-9913-09a1992ddbff',
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
            mintMethod: {
              name: 'claimTo',
              args: {_to: '$WALLET', _quantity: '$QUANTITY', _tokenId: 0},
              payment: {currency: 'MATIC', value: '0.001 * $QUANTITY'}
            },
            eligibilityMethod: {args: {METHOD_ARG_NAME: 'Unknown Type: mixed type'}, name: 'string'},
            feeBearer: 'BUYER',
            hideNativeMint: false,
            hidePaperWallet: false,
            hideExternalWallet: false,
            hidePayWithCard: false,
            hidePayWithCrypto: false,
            hidePayWithIdeal: true,
            sendEmailOnTransferSucceeded: true,
            twitterHandleOverride: 'string',
            successCallbackUrl: 'string',
            cancelCallbackUrl: 'string',
            walletAddress: 'string',
            email: _email,
            contractArgs: 'string'
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
        } else {
          console.log('Email domain is not a valid .edu domain. Request not sent.');
          res.status(500).json({
            message: "Email is Not valid"
          })
          // Handle the case when the email is not a valid student email
        }
      } catch (error) {
        console.error('Error occurred during email verification:', error);
        res.status(500).json({
            message: "An Error occurred during email verification",
            error
        })
        // Handle any errors that occur during the verification process
      }

}


const router = express.Router();
router.post("/api/verifyEmail", verifyEmail);

module.exports = router;