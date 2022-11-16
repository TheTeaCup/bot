const fs = require("fs");

function EventHandler(Tea) {
    fs.readdir("./src/events/", (err, files) => {
        if (err) {
            return console.log(
                `[ TeaCup ] (Bot) Found an error while loading Events.\n${err.stack}`
            );
        }

        files.forEach(file => {
            if (!file.endsWith(".js")) {
                return undefined;
            }

            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];

            Tea.on(eventName, event.bind(null, Tea));
            delete require.cache[require.resolve(`../events/${file}`)];
        });
    });
}

module.exports = EventHandler;