const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

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

  const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('mmmm')) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

  client.login('NzcxOTg4MTY1MTM2NjEzMzk3.X50IAQ.6bDN5_Mp5UQyob-rqy9bZPoXR6E');
