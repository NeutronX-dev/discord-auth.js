/*
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢹⣿⣿⣿
⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿
⣿⣿⣿⡇⠄⠄⠄⢠⣴⣾⣵⣶⣶⣾⣿⣦⡄⠄⠄⠄⢸⣿⣿⣿       ___       _              _     _       ____  
⣿⣿⣿⡇⠄⠄⢀⣾⣿⣿⢿⣿⣿⣿⣿⣿⣿⡄⠄⠄⢸⣿⣿⣿      / _ \     / \     _   _  | |_  | |__   |___ \ 
⣿⣿⣿⡇⠄⠄⢸⣿⣿⣧⣀⣼⣿⣄⣠⣿⣿⣿⠄⠄⢸⣿⣿⣿     | | | |   / _ \   | | | | | __| | '_ \    __) |
⣿⣿⣿⡇⠄⠄⠘⠻⢷⡯⠛⠛⠛⠛⢫⣿⠟⠛⠄⠄⢸⣿⣿⣿     | |_| |  / ___ \  | |_| | | |_  | | | |  / __/ 
⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿      \___/  /_/   \_\  \__,_|  \__| |_| |_| |_____|
⣿⣿⣿⣧⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢡⣀⠄⠄⢸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣆⣸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

  -  discord-auth.js
  -  Discord OAuth2 Made Simple.
  -
  -  Dependencies:
  -  \ node-fetch@2.6.1
  -
  -  Made by:
  - \ NeutronX
*/

const fetch = require('node-fetch');
module.exports = class {
    constructor(client_id, client_secret, callback_url) {
        this.config = {
            client_id: client_id,
            client_secret: client_secret,
            callback_url: callback_url
        };
    }
    getUser(code) {
        return new Promise(async (resolve, reject) => {
            console.clear();
            const options = {
                method: 'POST'
            };
            let params = new URLSearchParams();
            params.append('client_id', this.config.client_id);
            params.append('client_secret', this.config.client_secret);
            params.append('code', code);
            params.append('grant_type', 'authorization_code');
            params.append('scope', 'identify');
            params.append('redirect_uri', this.config.callback_url);
            options.body = params;
            await fetch('https://discordapp.com/api/oauth2/token', options)
                .then(async response => {
                    let x = await response.json();
                    await fetch('https://discordapp.com/api/v7/users/@me', {
                        headers: {
                            'Authorization': `Bearer ${x.access_token}`
                        }
                    }).then(async res => {
                        let user = await res.json();
                        resolve(user);
                    }).catch(err => {
                        reject(err);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    getGuilds(code) {
        return new Promise(async (resolve, reject) => {
            console.clear();
            const options = {
                method: 'POST'
            };
            let params = new URLSearchParams();
            params.append('client_id', this.config.client_id);
            params.append('client_secret', this.config.client_secret);
            params.append('code', code);
            params.append('grant_type', 'authorization_code');
            params.append('scope', 'identify');
            params.append('redirect_uri', this.config.callback_url);
            options.body = params;
            await fetch('https://discordapp.com/api/oauth2/token', options)
                .then(async response => {
                    let x = await response.json();
                    await fetch('https://discordapp.com/api/v7/users/@me/guilds', {
                        headers: {
                            'Authorization': `Bearer ${x.access_token}`
                        }
                    }).then(async res => {
                        let user = await res.json();
                        resolve(user);
                    }).catch(err => {
                        reject(err);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};