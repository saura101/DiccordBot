import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
import 'dotenv/config';

const commands = [
  {
    name: 'shorten',
    description: 'shortens a url',
    options : [
        {
            name : "url",
            description : "the url to shorten",
            type : ApplicationCommandOptionType.String,
            required : true
        }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}