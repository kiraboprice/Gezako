# Testing tool for aggregating test reports

## Setting up your local development environment

Follow guidelines on how to set up Firebase here: https://firebase.google.com/docs/cli/
After installing the Firebase CLI, Clone the code and list all environments with 
`firebase projects:list`.

To use the staging test environment, run 
`firebase use staging1`.

If you can't see the test environment in your firebase project list, contact the admin to add your account.

To run the project, run 
`npm install` to install the dependencies listed in the package.json file (you may need to occasionaly run this command 
if this file is updated)

`npm serve`. 
(you may need sudo if you're on linux)

Since this is a shared testing and staging environment, do not make deletions from the Firebase database unless you have permission to do so.

## Deploying and testing functions
`firebase deploy --only functions`

## Deploying to prod

When new changes are added to master, they need to be deployed to prod. This is currently a manual process. To deploy
to prod, branch off master and create a new release branch with format release-1.2 

- check to see if there are any new db indices set up staging which need to be added to prod
- update the firebase config in fbConfig.js to point to prod config
- use firebase prod config inorder to push functions to correct project:
`firebase use prod` - probably not needed (taken care of by firebase deploy?)
- update functions
- `firebase deploy --only functions` - probably not needed (taken care of by firebase deploy?)
- build the project 
`sudo npm run build`
- deploy the project 
`firebase deploy -P gezako-8a7aa`

Note: only the admin user has access to
prod instance and can deploy.
