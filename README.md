# Paint Gauge V2

This web application is currently in development. You should check out my [Trello board!](https://trello.com/b/FbFPRK2J/paintgauge "Paint Gauge Trello Board") You can also check out a live demo [here!](https://paint-gauge-v2.herokuapp.com/ "Paint Gauge Live Demo")

## Tech Stack

- HTML
- CSS in JS (Material UI withStyles)
- Javascript (ES6)
- Webpack w/ Hot Module Reloading
- React
- React Router
- Material UI
- Node
- Express
- MongoDB
- Redis

### Additional Tools

- Eslint
- Babel
- CircleCI

## Running it yourself

To run this application yourself, you need to get a key for the Harvard Art Museum API. You can get one [here](https://www.harvardartmuseums.org/collections/api "API | Harvard Art Museums"). Once you get a key, create a .env file in the root folder of the project that looks like this.

.env
```
HARVARD_KEY=MY_API_KEY
REDIS_SECRET=MakeSomethingUp
```

Once you get that all taken care of, go ahead and run `yarn install` and then `yarn dev` to start hacking along. 


Before you start using the app, open a new tab and go to localhost:3000. The one that webpack opens for you won't give you a csrf token which you need to send requests to the app. If you don't do this you may notice some `Missing CSRF token` logs in the terminal.

If the application won't load images and the console gives you some `500` errors, make sure that your Harvard Art Museum API Key is set correctly. 

## Host this app to Heroku

I'm gonna assume you know how to setup a node app on Heroku. If not, [here](https://devcenter.heroku.com/articles/deploying-nodejs "Deploying Node.js Apps on Heroku")'s a guide! Most of it is done for you already.

After creating the Heroku deployment (I have three environments set up, but you can just use the master branch if you want) you need to include some add-ons for the database and set some environment variables.

As for add ons go ahead and provision `mLab MongoDB` and `Redis Cloud`. They will automatically setup those environment variables for you. 

Lastly add your Harvard Art Museum API Key  to the environment variables, calling it `HARVARD_KEY`, make up a secret and set it as `REDIS_SECRET`, and set the `NODE_ENV` variable to `production`. 

You can also integrate the application to work with CircleCI if you would like, the config files for that are already set up. 
