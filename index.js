const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", function (request, response) {
    response.sendStatus(200);
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity('AEN PKN STAN', { type: 'COMPETING' });

});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.toLowerCase() === 'ping'||message.content.toLowerCase() === '-ping') {  
      message.channel.send(`Ciee kepoin ping. Latencymu ${Date.now() - message.createdTimestamp}ms. Kalau latency APInya ${Math.round(client.ws.ping)}ms`);
    }
  });

client.on('guildMemberAdd', member => {
    member.guild.channels.get('756849378588622959').send("Selamat datang di Discord AEN! Play hard study hard!"); 
});


client.on('message', msg => {
    if (msg.content.toLowerCase().includes('anjing')||msg.content.toLowerCase().includes('bangsat')||msg.content.toLowerCase().includes('jancuk')||msg.content.toLowerCase().includes('bajingan')||msg.content.toLowerCase().includes('kontol')) {
      msg.reply('Ga suka aku kalo kamu ngomong gitu :(');
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'pubg') {
    msg.channel.send('Skutt Pabji @everyone. Ada yang mau satu squad sama Aeno gaa?:(');
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase().includes('kamu siapa?')) {
    msg.channel.send('Haii! Kenalin aku Aeno, asisten AEN yang selalu menemanimu :)');
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase().includes('mabar')) {
    msg.reply('Hayukk gasinn! Aeno tunggu di lobby yaa @everyone');
    }
  });

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'val'||msg.content.toLowerCase() === 'valorant') {
    msg.channel.send('Skrrttt! Ada yang ngajakin valorant nih @everyone');
    }
  });


  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'ml'||msg.content.toLowerCase() === 'mlbb') {
    msg.channel.send('Yukkk ngepush @everyone. Aeno udah mythic loohh');
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'pb'||msg.content.toLowerCase() === 'point blank') {
    msg.channel.send('Hehhh, ayok main pb! @everyone');
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'genshin'||msg.content.toLowerCase() === 'coop'||msg.content.toLowerCase() === 'coop?'||msg.content.toLowerCase() === 'genshin?') {
    msg.channel.send('Hayukk coop! @everyone. Aeno udah ditungguin sama Klee nih');
    }
  });

  client.login('NzcxOTg4MTY1MTM2NjEzMzk3.X50IAQ.6bDN5_Mp5UQyob-rqy9bZPoXR6E');
