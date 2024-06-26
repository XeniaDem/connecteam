# ConnecTeam Front-end Web App

## Installation

In terminal, run the following command to clone the repo:

```sh
git clone https://github.com/XeniaDem/connecteam.git
```

## Setup
1. Install Node.js to your machine. This can be done by clicking the [link](https://nodejs.org/en).
2. In terminal, cd into the cloned repository:
```sh
cd connecteam-main
```
3. Then install the dependencies:
```sh
npm install
```
4. Find .env file in the root directory. Edit the URLs for the server side services and the app itself. Example is given below:
```sh
REACT_APP_API_URL=http://localhost:8000/
REACT_APP_GAME_URL=ws://localhost:8080/
REACT_APP_NOTIFICATIONS_URL=ws://localhost:8081/
REACT_APP_URL=http://localhost:5173/
```
Save the file content and close the file.

5. Start the app in your browser:
```sh
npm run start
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production

## Server Side

While using the application make sure its Server side is running. To read the installation guides, please follow the links below:
1. [ConnecTeam HTTP service](https://github.com/alkmnd/ConnectTeam)
2. [ConnecTeam Game service](https://github.com/alkmnd/GameService)
3. [ConnecTeam Notification service](https://github.com/alkmnd/NotificationService)


