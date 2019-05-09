# Rocket Chat Google Action


### Enable Billing
**Required for running this action**
This action uses Firebase Cloud Functions to make an HTTP request to a non-Google service. The free Firebase Spark Plan only allows outbound network calls to Google services. If you plan to run the sample, you will need to temporarily upgrade to a Firebase plan that allows for outbound networking, such as the [Blaze Plan](https://firebase.google.com/pricing/), also called Pay as you go.

## Setup Instructions
### Prerequisites
1. Node.js and NPM
   + We recommend installing using [NVM](https://github.com/creationix/nvm)
1. Install the [Firebase CLI](https://developers.google.com/actions/dialogflow/deploy-fulfillment)
   + We recommend using version 6.5.0, `npm install -g firebase-tools@6.5.0`
   + Run `firebase login` with your Google account

### Configuration
#### Actions Console
1. From the [Actions on Google Console](https://console.actions.google.com/), add a new project > **Create Project** > under **More options** > **Conversational**
1. From the left navigation menu under **Build** > **Actions** > **Add Your First Action** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `agent.zip` in this sample's directory.

#### Firebase Deployment
1. On your local machine, in the `functions` directory, run `npm install`
1. Run `firebase functions:config:set envariables.serverurl="https://your.servername.chat" envariables.username="your.username" envariables.password="yourpassword" envariables.authtoken="yourauthtoken" envariables.userid="youruserid"`
1. Run `firebase deploy --only functions` to deploy the function

#### Dialogflow Console
1. Return to the [Dialogflow Console](https://console.dialogflow.com) > select **Fulfillment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.
   ```
   Function URL (dialogflowFirebaseFulfillment): https://${REGION}-${PROJECT_ID}.cloudfunctions.net/dialogflowFirebaseFulfillment
   ```
1. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** >  **Test** to open the Actions on Google simulator then say or type `Talk to my test app`.

### Running this Action
+ You can test your Action on any Google Assistant-enabled device on which the Assistant is signed into the same account used to create this project. Just say or type, “OK Google, talk to my test app”.
+ You can also use the Actions on Google Console simulator to test most features and preview on-device behavior.

## References & Issues
+ Rocket Chat API Documentation [REST API DOCUMENTATION](https://rocket.chat/docs/developer-guides/rest-api/)
+ Axios Documentation [Github Page](https://github.com/axios/axios)
+ Questions? Go to [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google), [Assistant Developer Community on Reddit](https://www.reddit.com/r/GoogleAssistantDev/) or [Support](https://developers.google.com/actions/support/).
+ For bugs, please report an issue on Github.
+ Actions on Google [Documentation](https://developers.google.com/actions/extending-the-assistant)
+ Actions on Google [Codelabs](https://codelabs.developers.google.com/?cat=Assistant)
+ [Webhook Boilerplate Template](https://github.com/actions-on-google/dialogflow-webhook-boilerplate-nodejs) for Actions on Google

## Make Contributions
Keep an eye on our issues. We are just beginning and will surely appreciate all the help we can get. All ideas are welcome. 
