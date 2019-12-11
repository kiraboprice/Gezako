# Testing tool for aggregating test reports

## Setting up your local development environment

Follow guidelines on how to set up Firebase here: https://firebase.google.com/docs/cli/
After installing the Firebase CLI, Clone the code and list all environments with 
`firebase projects:list`.

To use the staging test environment, run 
`firebase use gezako-staging`.

If you can't see the test environment in your firebase project list, contact the admin to add your account.

To run the project, run 
`npm serve`. 
(you may need sudo if you're on linux)

Since this is a shared testing and staging environment, do not make deletions from the Firebase database unless you have permission to do so.

## Deploying to prod

When new changes are added to master, they need to be deployed to prod. This is currently a manual process. To deploy
to prod, checkout master branch, 
- then build the project 
`npm run build`
- deploy with 
`firebase deploy -P gezako-8a7aa`

Note: only the admin user has access to
prod instance and can deploy.
