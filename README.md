# discord-auth.js
Discord OAuth2 Made Simple

By NeutronX

# Contents
Area | Quick Description
-----|----------
[Get Started](#get-started) | Set-up **discord-auth.js**.
[Integrating with Express](#integrating-with-express) | Set-up with **Express**.


# Get Started
First, construct the class, by writing:
```js
const discord_auth_js = require('discord-auth.js');
const discord_auth = new discord_auth_js(lient_id, client_secret, callback_url);
```
# Integrating with Express
First make sure you have [the application](#getting-the-application-ready) set-up, and with it's redirect towards your app. then you can include the following in your code:
```js
const discord_auth_js = require('discord-auth.js');
const discord_auth = new discord_auth_js(client_id, client_secret, callback_url);
app.get('/discord', (req, res) => {
    if(req.query.code){
        discord_auth.getUser(req.query.code).then((user) => {
            res.send(JSON.stringify(user));
        }).catch(error => {
            res.send(error.message);
        });
    } else {
        res.send("Did not recieve Code");
    }
});
```