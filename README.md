# Rocket Chat Google Action


### Enable Billing
**Required for running this action**
This action uses Firebase Cloud Functions to make an HTTP request to a non-Google service. The free Firebase Spark Plan only allows outbound network calls to Google services. If you plan to run the sample, you will need to temporarily upgrade to a Firebase plan that allows for outbound networking, such as the [Blaze Plan](https://firebase.google.com/pricing/), also called Pay as you go.

## Setup Instructions
### Prerequisites
1. Node.js (> v8.10)
1. Firebase CLI
1. Rocket Chat Server updated to Release 1.0.0-rc3 or later

### Configuration
#### Actions Console
1. From the [Actions on Google Console](https://console.actions.google.com/), add a new project > **Create Project** > under **More options** > **Conversational**
1. From the left navigation menu under **Build** > **Actions** > **Add Your First Action** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `agent.zip` in this sample's directory.

#### Firebase Deployment
1. [Download and install Node.js](https://nodejs.org/)

1. Set up and initialize the Firebase CLI. If the following command fails with an EACCES error, you may need to [change npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).
   + `npm install -g firebase-tools` 
1. Authenticate the firebase tool with your Google account:
   + `firebase login`
1. Clone repository to your local machine.
   + `git clone https://github.com/PrajvalRaval/google-action-rocketchat.git`
   + Then, change directory to *google-action-rocketchat*.
   + `cd google-action-rocketchat`
1. Initialize Firebase
   + `firebase init`
1. You'll be asked to select which Firebase CLI features you want to setup for your Actions project. Choose Functions then press Enter to confirm and continue.
1. Associate the firebase tool with your Actions project by selecting it using the arrow keys to navigate the projects list.
   + **Note:** You can skip this step by selecting **[don't setup a default project],** but then you will need to do this association later using the command **firebase use --project**.
1. After choosing the project, the firebase tool will start the Functions setup asking you what language you want to use. Select **JavaScript** using the arrow keys and press Enter to continue.
1. For **Do you want to use ESLint to catch probable bugs and enforce style?** type **N** and press enter.
1. For **File functions/package.json already exists. Overwrite?** type **N** and press enter.
1. For **File functions/index.js already exists. Overwrite?** type **N** and press enter.
1. Get the project dependencies by typing **Y** to the prompt: 
   + **Do you want to install dependencies with npm now?**.
   + Once the setup is completed, you'll see an output similar to the following:
   + `✔  Firebase initialization complete!`
1. Install the **actions-on-google** dependency
   + `cd functions`
   + `npm install actions-on-google`
1. Get the fulfillment dependencies and deploy the fulfillment function:
   + `npm install`
   + `firebase deploy --only functions`
1. The deployment takes a few minutes. Once completed, you'll see output similar to the following. You'll need the **Function URL** to enter in Dialogflow.
   ```
   ✔  Deploy complete!

   Project Console: https://console.firebase.google.com/project/myprojectname-ab123/overview
   Function URL (factsAboutGoogle): https://us-central1-myprojectname-ab123.cloudfunctions.net/dialogflowFirebaseFulfillment
   
   ```
1. In the Dialogflow console's navigation menu, click **Fulfillment**, toggle the Webhook button to **ENABLED** , and replace the url in the **URL** field with your **Function URL** that was returned after the deploy command > **SAVE**..

![dialogflow-deploy-fulfillment-00](https://user-images.githubusercontent.com/41849970/57801680-dd573300-7771-11e9-9b28-29b38c2e92a2.png)

#### Dialogflow Console
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
