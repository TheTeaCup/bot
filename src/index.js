const Tea = require("./handlers/client");
const database = require("./handlers/database");
const cron = require("node-cron");

database.on("connect", function () {
    console.log(
        "[ TeaCup ] ( Database ) Successfully connected to Redis database."
    );
    success(database);
});

database.on("error", function (err) {
    console.log(
        "[ TeaCup ] ( Database ) Connection Failed to Redis database."
    );
    console.log("[ TeaCup ] ( Database ) Error: ", err);
    error(err);
});

const success = (function (s) {
    let executed = false;
    return function (s) {
        if (!executed) {
            executed = true;
            console.log("[ TeaCup ] ( Bot ) is starting...");
            Tea.redis = database;
            Tea.login(process.env.TOKEN);
        }
    };
})();

const error = (function (e) {
    let executed = false;
    return function (e) {
        if (!executed) {
            executed = true;
            cron.schedule("*/2 * * * *", function () {
                console.log(
                    "[ TeaCup ] ( Database ) Error: Attempting to restart. ( every 2 minutes until connected to DB )"
                );
                process.exit();
            });
        }
    };
})();
