
# coursera_react
React Web course: https://www.coursera.org/learn/front-end-react/home/welcome
React Native course: https://www.coursera.org/learn/react-native/home/welcome

## Requirements
 1. npm

## Installation
for now you need to start the client and server separately

### React Web Front-End
 1. cd to "confusion" folder
 2. `npm install`
 3. `npm start`
 
### React Native
 1. cd to "confusion-native" folder
 2. `npm install`
 3. `npm start`
 4. This uses Expo, use an emulator or connect to the hosted address on your network using your phone.

### Server
1. cd to "test/server" folder
2. Copy "db.json" to "livedb.json" (latter file is ignored by git)
3. If not already installed: `npm install -g json-server`
4. `json-server -d [any delay you want in millis] -p 3001 livedb.json`

At this time this server works for both the Web and Native apps.
