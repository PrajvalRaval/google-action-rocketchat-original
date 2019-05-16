# Rocket Chat Google Action

## Index
* [Prerequisites](#prerequisites)
* [Setting Up Console](#actions-console)
* [Firebase Deployment](#firebase-deployment)
* [Enabling Billing](#enabling-billing)
* [Configuring Account Linking](#configuring-account-linking)
* [Running this Action](#running-this-action)
* [References & Issues](#references--issues)


## Billing Enabled Compulsory
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

2. Set up and initialize the Firebase CLI. If the following command fails with an EACCES error, you may need to [change npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

  `npm install -g firebase-tools` 

3. Authenticate the firebase tool with your Google account:

  `firebase login`

4. Clone repository to your local machine.

  `git clone https://github.com/PrajvalRaval/google-action-rocketchat.git`

+ Then, change directory to *google-action-rocketchat*.

  `cd google-action-rocketchat`

5. Initialize Firebase

  `firebase init`

6. You'll be asked to select which Firebase CLI features you want to setup for your Actions project. Choose Functions then press Enter to confirm and continue.

7. Associate the firebase tool with your Actions project by selecting it using the arrow keys to navigate the projects list.

+ **Note:** You can skip this step by selecting **[don't setup a default project],** but then you will need to do this association later using the command **firebase use --project**.

8. After choosing the project, the firebase tool will start the Functions setup asking you what language you want to use. Select **JavaScript** using the arrow keys and press Enter to continue.

9. For **Do you want to use ESLint to catch probable bugs and enforce style?** type **N** and press enter.

10. For **File functions/package.json already exists. Overwrite?** type **N** and press enter.

11. For **File functions/index.js already exists. Overwrite?** type **N** and press enter.

12. Get the project dependencies by typing **Y** to the prompt: 

+ **Do you want to install dependencies with npm now?**.

+ Once the setup is completed, you'll see an output similar to the following:

  `✔  Firebase initialization complete!`

13. Install the **actions-on-google** dependency by using following commands,

  `cd functions`

  `npm install actions-on-google`

14. Get the fulfillment dependencies and deploy the fulfillment function:

  `npm install`

  `firebase deploy --only functions`

15. The deployment takes a few minutes. Once completed, you'll see output similar to the following. You'll need the **Function URL** to enter in Dialogflow.

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/myprojectname-ab123/overview
Function URL (factsAboutGoogle): https://us-central1-myprojectname-ab123.cloudfunctions.net/dialogflowFirebaseFulfillment

```

16. In the Dialogflow console's navigation menu, click **Fulfillment**, toggle the Webhook button to **ENABLED** , and replace the url in the **URL** field with your **Function URL** that was returned after the deploy command > **SAVE**..

![dialogflow-deploy-fulfillment-00](https://user-images.githubusercontent.com/41849970/57801680-dd573300-7771-11e9-9b28-29b38c2e92a2.png)

17. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes**. (If not already enabled)

#### Enabling Billing
1. Go to your [Firebase Console](https://console.firebase.google.com) and select your project from list.

1. In the bottom side of left menu you will see an **Upgrade** button and select **Blaze Plan** from the list.
<img width="251" alt="Screenshot 2019-05-16 at 7 42 52 PM" src="https://user-images.githubusercontent.com/41849970/57860793-1d222700-7813-11e9-9723-db638e2bdc42.png">

#### Configuring Account Linking
1. Login to your [Action Developer Console](https://console.actions.google.com/) and select Rocket Chat project on the list.

2. Go to Settings ⚙ -> Project Setting and Copy **Project ID** and paste it somewere safe as we will need it later.

3. Now click on **Advance Options** on Bottom left of the screen and select **Account Linking** from the list.

4. In Account creation,

  + Select **No, I only want to allow account creation on my website** 
  
  + Click **Next**.
  
5. In Linking type, Select **OAuth** from the list and Set **Authorisation code** as grant type. Click **Next**.

6. Now we need to fill up the Authorization URI, Access Token URI, Client ID, Client Secret which we will generate on our rocket chat server.

  + **Note** You need to be admin of the server to proceed with the further steps.
  
7. In a new tab go to your **Server** -> **Three Dot Menu** -> **Administration**.

8. Click on **OAuth Apps**.

9. Click on **New Application** on top right. Now we need to give it an **Application Name** and a **Redirect URI**.

10. For Application Name use "rcgoogleaction". This can be anything else as well.

  + For the Redirect URI, copy `https://oauth-redirect.googleusercontent.com/r/YOUR_PROJECT_ID` and paste it in the Redirect URI field. **(Paste the Project Id we copied earlier here)**
  
11. You'll see it automatically generating Client ID, Client Secret, Authorization URL, and Access Token URL. Now copy these from the oauth app page and paste it in the **Client ID, Client Secret, Authorization URL** and **Access Token URL** fields in the Client information on Google Action Console Page. Click **Next**.

12. Copy **Client ID** and paste it somewhere safe as we will be using it for setting up Firebase Environent Variables.

13. In Configure your client (optional) section, 

  + Tick mark(✔) **Google to transmit clientID and secret via HTTP basic auth header**
  
  + Click **Next**.
  
14. In Testing instructions,

  + Provide an Email Id and Password as per instructions 
  
  + Click on **Save**.
  
15. We are done on setting our OAuth App which will give us the access token to use for logging in. But for that we need to also enable custom oauth login for our server which we will do in the next steps.

16. Go to your **Server -> Three Dot Menu -> Administration**. Scroll down on your left and select **OAuth** and on top right click on **Add custom OAuth**.

17. Give a unique name in lower case for the custom oauth. For example enter "googleaction". Click on **Send**. Copy and paste this name somewhere safe as we will be using it for setting up Firebase Environent Variables.

18. You will now be provided a few fields some of which will be prefilled. We only need to change a few.

  + Change the **Enable** to **true**.
  
  + In the URL field enter `https://yourserverurl/api/v1`
  
19. Finally at the bottom switch **Merge users** to **true**. We don't need to make any other changes here.

20. Click on **Save Changes** on top.

21. Go to your console and run,

   `firebase functions:config:set envariables.server_url="https://YOUR.SERVER.chat" envariables.oauth_service_name="YOUR_CUSTOM_OAUTH_NAME" envariables.clientid="YOUR_CLIENT_ID"`
  
  Then run,
  
  `firebase deploy --only functions`.
  
22. WE ARE DONE FINALLY !

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
