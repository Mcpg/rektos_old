
const CommandManager = require("./command_manager.js");
const IrcManager     = require("./irc_manager.js");
const Discord        = require("discord.js");

class RektOS
{
    constructor()
    {
        this.Config = require("./config.json");
        this.Client = new Discord.Client();

        this.CommandManager = new CommandManager(this);
        this.IrcManager = new IrcManager(this);
    }

    Start()
    {
        print("================================================");
        print(" >>> RektOS                                     ");
        print("     > Version:  " + this.Config.Bot.Version     );
        print("     > Codename: " + this.Config.Bot.Codename    );
        print("================================================");

        if (this.Config.Token === undefined)
        {
            this.Log("ERROR", "Token is absent!");
            return false;
        }
    }

    Log(severity, text)
    {
        print("[" + severity + "] " + text);
    }
}

module.exports = RektOS;
