const IRC     = require("irc")
const Discord = require("discord.js")

class IrcManager
{
    constructor(rektos)
    {
        this.RektOS = rektos;
    }

    Start()
    {
        var itself = this;

        this.RektOS.Log("INFO", "Starting up IRC client...");

        // If it's disabled in config, don't do anything else
        if (!this.RektOS.Config.Irc.Enabled)
        {
            this.RektOS.Log("INFO", "Aborting IRC client - disabled in config.");
            return;
        }

        // Setup the client
        this.Client = new IRC.Client(this.RektOS.Config.Irc.Host, this.RektOS.Config.Irc.Username,
        {
            debug: true,
            port: 6697,
            secure: true,
            selfSigned: true,
            stripColors: true,
            autoConnect: false,
            autoRejoin: false
        });

        this.Client.addListener("error", message =>
        {
            this.RektOS.Log("ERROR", "IRC error: " + message.command + ": " + message.args.join(" "))
        });

        // Setup webhooks object
        this.Webhooks = {};
        
        // Iterate through all of the channels from config and create webhooks for them
        var channels = this.RektOS.Config.Irc.Channels;
        for (var i = 0; i < channels.length; i++)
        {
            if (!channels[i].Enabled)
            {
                this.RektOS.Log("INFO", "Skipping " + channels[i].Name + " - it's disabled in config.");
                continue;
            }

            var channelName = channels[i].Name;
            
            // Create webhook and send message
            this.Webhooks[channelName] = new Discord.WebhookClient(channels[i].WebhookId, channels[i].WebhookToken);
            this.Webhooks[channelName].send("Initialized webhook for `" + channels[i].Name + "`");

            // When a message in actually iterated channel was sent, send it to DEBUG logs and to webhook.
            this.Client.addListener("message" + channelName, function(from, message)
            {
                itself.RektOS.Log("DEBUG", "IRC message | " + from + ": " + message);
                itself.Webhooks[channelName].send("**" + from + "**: " + message, {username: "IRC - " + from});
            });

            this.Client.opt.channels.push(channelName);
        }

        // Connect to the server
        this.Client.connect();

        this.RektOS.Log("INFO", "IRC manager initialized.");
    }
}

module.exports = IrcManager;