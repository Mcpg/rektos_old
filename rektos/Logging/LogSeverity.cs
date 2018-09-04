using System;
using System.Collections.Generic;
using System.Text;

namespace RektOS.Logging
{
    public enum LogSeverity
    {
        /// <summary>
        /// Used to display standard information
        /// </summary>
        Info,

        /// <summary>
        /// Used to display non-critical errors and warnings
        /// </summary>
        Warn,

        /// <summary>
        /// Used to display logs that aren't present when not running
        /// in debug.
        /// </summary>
        Debug,

        /// <summary>
        /// Used when critical error has occurred
        /// </summary>
        Error
    }
}
