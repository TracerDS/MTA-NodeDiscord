<h1 align="center">MTA <=> Node + Discord</h1>

### Installation
1. Download newest release from [Release](./releases) menu
2. Unpack folders to your `resources` directory
3. Install [sockets](https://wiki.mtasa.com/Modules/Sockets) module and place it in your `modules` directory
4. Go to `sock-node` directory
5. Run `npm i` to install all dependencies
6. Run `npm start` to start the Node server
7. Start your MTA Server
8. Run `sock` resource
9. Execute command `testit` to check connection

Congratulations! You have now connected your MTA server to the Node server


### What is what
## sock-node/src/config.json
- `serverport` - Port of the MTA server. Node server will automatically choose the right port based on that value
- `privatePassword` - Authentication key for connection between MTA and Node. It will be hashed and stored only on the Node server
- `defaultLanguage` - Default language of the bot and the server. At the moment only `English` language is supported

## sock-node/src/.env.example
Rename this file to `.env` and put your discord token to the `TOKEN` field (just like in every `.env` file)

## sock-node/src/.eslintrc.json
JSON file with some linter rules set up to help you code better


### Server owners manual
- If you want to change hostname of the Node server, go to the `sock-node/src/Server/index.ts` and change the `__host` field from `127.0.0.1` (current, local address) to the desired one.<br/>
**DO NOT CHANGE THE PORT**.<br/>
If you want to change the port, change it in `config.json` file instead.

- If you want to add more discord commands (slash commands), create new `.ts` files inside one of the categories I created for you. Copy content from other command and stick with [discord.js](https://discord.js.org) docs accordingly. When you are done, run `ts-node slash.ts` to update your bot with new commands.<br/>
Don't forget to add command entry to the translation file accordingly

- If you want to add more MTA interactions, create new `.ts` file inside `Server/payloads` directory and add logic behind it. Since it is not a direct `Node <=> MTA` connector, you can't execute MTA commands from Node directly.
You can however use a neat trick: send whatever data you want to the MTA and then parse it from the lua script to do whatever you want.