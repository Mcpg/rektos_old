
const CommandManager = require("./command_manager/command_manager.js");
const IrcManager     = require("./irc_manager.js");
const Discord        = require("discord.js");
const fs             = require("fs");

class RektOS
{
    constructor()
    {
        this.Config = require("./config.json");
        this.Client = new Discord.Client();
    }

    Start()
    {
        console.log("================================================");
        console.log(" >>> RektOS                                     ");
        console.log("     > Version:  " + this.Config.Bot.Version     );
        console.log("     > Codename: " + this.Config.Bot.Codename    );
        console.log("================================================");

        if (this.Config.Token === undefined)
        {
            this.Log("ERROR", "Token is absent!");
            return false;
        }

        var self = this;
        this.Client.on("ready", () =>
        {
            console.log("Logged in!");

            self.Client.user.setActivity("RektOS " + self.Config.Bot.Version,
                                    {type: "PLAYING"});
        });

        this.CommandManager = new CommandManager(this);
        this.IrcManager = new IrcManager(this);

        this.CommandManager.Start();
        this.IrcManager.Start();

        this.Client.login(this.Config.Token);
    }

    Log(severity, text)
    {
        console.log("[" + severity.toUpperCase() + "] " + text);
    }

    GetChangelog(version)
    {
        return "TODO: implementation";
    }

    ///////////////////////////////////////////////////////////////////////////

    ReadDataFileSync(path)
    {
        return fs.ReadFileSync("./data/" + path, "UTF-8");
    }

    ReadDataFile(path, callback)
    {
        return fs.ReadFile("./data/" + path, callback);
    }

    DataFileExists(path, callback)
    {
        return fs.stat("./data/" + path, function(err, stat)
        {
            if (err == null)
            {
                callback();
            }
        });
    }

    DataFileExistsSync(path)
    {
        return fs.existsSync("./data/" + path);
    }
}

module.exports = RektOS;
