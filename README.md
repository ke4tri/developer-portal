### Developer++
React and Firebase based app used to keep track of resourse for a developer. Tutorials, podcast, blog post and other resources can be added to each respective tab.  Once a topic is completed user may mark as done via checkbox. User may also delete any thing they have added.  If another user was to log in, they would not have CRUD authrity (other than to read).  New users may add their own resourses as well. 

## Tech Requirements
* Use create-react-app to start a new react project
* Use GITHUB authentication
* Use CRUD for all aspects of Create Read Update Delete
* Radio buttons
* Use a checkbox to mark resources as completed

## Screenshots
![Main Screenshot](https://github.com/ke4tri/developer-portal/blob/master/screenshot.JPG?raw=true)

## How to run this project:

* Setup Firebase  
  -Create a firebase project  
  -Enable 'Github Authentication'  
  -Create a Firebase Realtime Database (Not Firestore)  
  -Create an apiKeys.js file (an example file exists in the 'helpers' folder)  

* Clone or download the repo

* Browse to the repo directory in your terminal

* ```npm install``` installs necessary dependencies

* ```npm start``` will run the project at http://localhost:3000

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
