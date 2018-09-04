using IniParser;
using IniParser.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace RektOS
{
    public static class ConfigManager
    {
        public static Dictionary<string, IniData> ConfigFiles;

        public static void LoadConfig(string path, IniData defaults = null)
        {
            if (!File.Exists(path))
            {
                if (defaults == null)
                {
                    throw new FileNotFoundException("Config file not found: " + path);
                }

                FileIniDataParser parser = new FileIniDataParser();
                parser.WriteFile(path, defaults, Encoding.UTF8);
            }
        }

        
    }
}
