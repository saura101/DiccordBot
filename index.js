import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import qr from "qr-image";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("hello")) {
    message.reply({
      content: `Hi ${message.author} it's BabyBot`,
    });
  }
});

client.on("MessageDelete", (message) => {
  console.log(message.content);
  message.reply({
    content: "Already read that!",
  });
});

client.on("interactionCreate", async(interaction) => {
  console.log(interaction.commandName);
  if (interaction.commandName === "Ping") {
    interaction.reply("Pong!!");
  } else if (interaction.commandName === "shorten") {
    const url = interaction.options.get("url").value;
    console.log(url);
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("QR_image.png"));
    interaction.channel.send({content : "QR:", files : ["./QR_image.png"]});
  }
});

client.on("ready", () => {
  console.log("BabyBot is online!");
});

client.login(process.env.TOKEN);
