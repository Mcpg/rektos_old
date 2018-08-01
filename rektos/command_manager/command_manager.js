
class Command
{
    // Callback header: function(args, msg, rektos)
    constructor(name, aliases, description, usage, examples, callback)
    {
        this.Name = name;
        this.Aliases = aliases;
        this.description = description;
        this.Usage = usage;
        this.Examples = examples;
        this.Callback = callback;
    }
}

class CommandManager
{
    constructor(rektos)
    {
        this.RektOS = rektos;
        this.Commands = new Array();

        this.Prefix = this.RektOS.Config.CommandManager.Prefix;
    }

    Start()
    {
        
        this.RektOS.Client.on("message", this.ProcessMessageFunc());
    }

    ProcessMessageFunc(msg)
    {
        // That's kinda hacky - in order for the event
        // to be able to use methods of CommandManager,
        // create a variable pointing to "this".
        var self = this;

        return function(msg)
        {
            if (msg === undefined) return;

            // If the user just said `rekt`, or pinged bot without
            // anything else in the message, display help.
            if (msg.content.trim() === "<@" + self.RektOS.Client.user.id + ">" ||
                msg.content.trim() === self.Prefix) self.ExecuteCommand("help", [], msg);

            // If the message doesn't represent a command call, return
            if (!msg.content.trim().startsWith("<@" + self.RektOS.Client.user.id + "> ") &&
                !msg.content.trim().startsWith(self.Prefix + " ")) return;

            var split = msg.content.trim().split(" ");
            split.shift(); // Remove 0th index - the mention

            var cmdName = split[0].toLowerCase();
            split.shift(); // Remove 0th index - command name and leave the array with args only

            self.ExecuteCommand(cmdName, split, msg);
        };
    }

    CommandExists(name)
    {
        for (var i = 0; i < this.Commands.length; i++)
        {
            if (this.Commands[i].Name === name)
            {
                return true;
            }
        }
        return false;
    }

    GetCommand(name)
    {
        for (var i = 0; i < this.Commands.length; i++)
        {
            if (this.Commands[i].Name === name)
            {
                return this.Commands[i];
            }
        }
        return undefined;
    }

    RegisterCommand(name, aliases, description, usage, examples, callback)
    {
        this.RektOS.Log("DEBUG", "Attempt to register " + name);
        if (this.CommandExists(name)) return false;

        this.Commands.push(new Command(name, aliases, description, usage, examples, callback));
    }

    ExecuteCommand(name, args, msg)
    {
        var command = this.GetCommand(name);
        
        if (command !== undefined)
        {
            command.Callback(args, msg, this.RektOS);
        }
    }
}

module.exports = CommandManager;