using System;
using System.Collections.Generic;
using System.Text;

namespace RektOS.Logging
{
    public static class Logger
    {

        public static void Log(string text, LogSeverity severity = LogSeverity.Info)
        {
            // TODO: make debugs not display when running in debug mode
            Console.WriteLine("[" + severity.ToString() + "] " + text);
        }
    }
}
