
# coursera_react
repo for course: https://www.coursera.org/learn/front-end-react/home/welcome

## Requirements
 1. npm

## Installation
for now you need to start the client and server separately

### Client
 1. cd to "confusion" folder
 2. `npm install`
 3. `npm start`

### Server
1. cd to "test/server" folder
2. Copy "db.json" to "livedb.json" (latter file is ignored by git)
3. If not already installed: `npm install -g json-server`
4. `json-server -d [any delay you want in millis] -p 3001 livedb.json`
