using IniParser.Model;
using System;
using System.Threading.Tasks;

namespace RektOS
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting up RektOS " + RektOSInfo.Version);

            IniData defaultRektosIni = new IniData();
            defaultRektosIni["General"]["Token"] = "PUT THE TOKEN HERE";
            defaultRektosIni["General"]["Debug"] = "true";
            ConfigManager.LoadConfig("RektOS.ini", defaultRektosIni);

            MainAsync().GetAwaiter().GetResult();
        }

        public static async Task MainAsync()
        {

        }
    }
}
