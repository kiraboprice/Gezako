# Testing tool for aggregating test reports

## Setting up your local development environment

Follow guidelines on how to set up Firebase here: https://firebase.google.com/docs/cli/
After installing the Firebase CLI, Clone the code and list all environments with 
`firebase projects:list`.

To use the staging test environment, run 
`firebase use gezako-staging`.

If you can't see the test environment in your firebase project list, contact the admin to add your account.

To run the project, run 
`npm install` to install the dependencies listed in the package.json file (you may need to occasionaly run this command 
if this file is updated)

`npm serve`. 
(you may need sudo if you're on linux)

Since this is a shared testing and staging environment, do not make deletions from the Firebase database unless you have permission to do so.

## Deploying to prod

When new changes are added to master, they need to be deployed to prod. This is currently a manual process. To deploy
to prod, checkout master branch, 
- update the firebase config in App.js (this is being moved to the api project)

- update the functions api url in package.json proxy entry
"proxy": "http://localhost:5000/gezako-staging/us-central1/api/v1" //local
"proxy": "https://us-central1-gezako-staging.cloudfunctions.net/api/v1" //staging
"proxy": "https://us-central1-gezako-staging.cloudfunctions.net/api/v1" //prod

- build the project 
`npm run build`
- deploy with 
`firebase deploy -P gezako-8a7aa`

Note: only the admin user has access to
prod instance and can deploy.
