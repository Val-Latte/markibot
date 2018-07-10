const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
let coins = require("./markicoins.json");
const fs = require("fs");
const health = require("./health.json");
const superagent = require("superagent")
const exp = require("./Exp.json");
let xp = require("./level.json");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Wowzers!", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


//Important

{//regular bot help

if(cmd === `${prefix}help`){

    let help = new Discord.RichEmbed()

    .setDescription(`${message.author.tag}, the help you're looking for is right here!`)
    .setColor("#FF0000")
    .setThumbnail("https://i.pinimg.com/originals/59/57/77/59577754c164aaa3801d054ee8c3e219.gif")
    .addBlankField()
    .addField("Mark Commands", "- *botinfo, serverinfo, userinfo, mark, 8ball.*")
    .addBlankField()
    .addField("Fun Commands", "- *Kill, Poke, Punch, Flex, Wink.*")
    .addBlankField()
    .addField("Sound Commands", "Still a work in progress")
    .addBlankField()
    .addField("Currency Commands", "Still a work in progress.")
    .addBlankField()
    .setFooter("This is the first page. m!help2 for the second page.", `https://yt3.ggpht.com/-aSj-EnOjUkc/AAAAAAAAAAI/AAAAAAAAAAA/lQiWTDY9Sd0/s900-c-k-no/photo.jpg`)

    message.channel.send(help);

}

if(cmd === `${prefix}help2`){

    let helps = new Discord.RichEmbed()

    .setDescription(`${message.author.tag}, the second page of help you're looking for is right here!`)
    .setColor("#FF0000")
    .setThumbnail("https://i.pinimg.com/originals/59/57/77/59577754c164aaa3801d054ee8c3e219.gif")
    .addBlankField()
    .addField("there are more commands to come", "yeah, it's going to take awhile.")
    .addBlankField()
    .addField("Extra Help Commands", "mhelp, invite.")
    .setFooter("This is the second page.", `https://yt3.ggpht.com/-aSj-EnOjUkc/AAAAAAAAAAI/AAAAAAAAAAA/lQiWTDY9Sd0/s900-c-k-no/photo.jpg`)

    message.channel.send(helps);
}

if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor("#FF66CC")
    .setThumbnail(bicon)
    .addField("Bot Information", "This bot was made for Markiplier, the one youtuber that changed a lot for many people! :smile:")
    .addBlankField()
    .addField("Bot Name:", bot.user.username, true)
    .addField("Bot Creator(s):", "<@!397898189820395520>", true)
    .addField("Created With:", "Visual Studio Code", true)
    .addField("Created On:", "Fri Jun 29 2018 @ 05:34:11", true)
    .addBlankField()
    .addField("For more:", "Hey, lovely lady lumps for more do `m!help`! 😘")
    .addField("How many servers 'I'm' in.", bot.guild)

    return message.channel.send(botembed);
}

if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, true)
    .addField("Created On", message.guild.createdAt, true)
    .addField("You Joined", message.member.joinedAt, true)
    .addField("Total Members", message.guild.memberCount, true)

    return message.channel.send(serverembed);
}

if(cmd === `${prefix}userinfo`){
    let userembed = new Discord.RichEmbed()

    .setAuthor(message.author.tag)
    .setThumbnail(message.author.avatarURL)
    .addField("Still working on this, ayo!")
    .addField("Username", message.author.username, true)
    .addField("Nickname:", `${message.member.nickname !== null ? `${message.member.nickname}` : 'None'}`, true)
    .addField("Users Discrim", message.author.discriminator,true)
    .addField("Users ID", message.author.id,true)
    .addBlankField()
    .addField("Join date", message.member.joinedAt)
    .addField("Created his/hers account", message.author.createdAt)
    .addField("Roles", `${message.member.roles.map(roles => `${roles.name}`)}`)

    message.channel.send(userembed);
}

if(cmd === `${prefix}avatar`){
    let user;
    if(message.mentions.users.first()) {
        user = message.mentions.users.first();
  
    } else {
        user = message.author;
    }
  
    const member = message.guild.member(user);
  
    const embed = new Discord.RichEmbed()
    .setColor("#3ba1e3")
    .setTitle(`${message.author.tag} here's what you asked for!`)
    .setImage(user.avatarURL)
    .setFooter("I hope you enjoy with whatever you just got... lol.")
    message.channel.send({embed})

}

if(cmd === `${prefix}purge`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Ha...Ha...Ha... you thought I fixed it for you!");
    if(!args[0]) return message.channel.send("Well shit, I can't find anythint to 'POOF', trying to help me out a little?");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
}
}

{//Extra MarkiBot functions

{
    if(cmd === `${prefix}mhelp`){

    let mhelp = new Discord.RichEmbed()

    .setDescription("This is a menu to help you with the *MarkiBot*, as in, the extra features.")
    .addBlankField()
    .setColor("#FF0001")
    .setThumbnail("https://i.imgur.com/vJYRhri.gif")
    .addField("Fun, Awesome Commands", "Punch, Kill, Poke, and still working on it.")
    .setFooter("do m!mhelp2 for more!")

    message.channel.send(mhelp);
}
}

{
    if(cmd === `${prefix}mhelp2`){

    let mhelp = new Discord.RichEmbed()

    .setDescription("This is a menu to help you with the *MarkiBot*, as in, the extra features.")
    .addBlankField()
    .setColor("#FF0001")
    .setThumbnail("https://78.media.tumblr.com/916da84d97d06f1a4d524ca4c15d8af5/tumblr_o3nl198N8n1s39xfuo1_500.gif")
    .addField("Still working on this one command")

    message.channel.send(mhelp);
}
}
if(cmd === `${prefix}invite`){
    
    let invite = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .addField("https://discordapp.com/oauth2/authorize?client_id=462189028737941505&scope=bot", "You can now use this bot anywhere, and anytime, can you believe that!?")
    .setImage("https://media1.tenor.com/images/eb6808afa14236ffbfb5539854411be9/tenor.gif?itemid=12129908")

    message.channel.send(invite);
}

if(cmd === `${prefix}mhealth`){
    if(!health[message.author.id]){
        health[message.author.id] = {
          health : 100
        };
      }
    
      let uhealth = health[message.author.id].health;
    
    
      let hembed = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, `Your Health: ${uhealth}`)
    
      message.channel.send(hembed)
      
      fs.readFile("./health.json", JSON.stringify(health), (err) => {
        if(err) cosole.log(err)
      });

}

if(cmd === `${prefix}mxp`){
    if(!exp[message.author.id]){
        exp[message.author.id] = {
          exp : 0
        };
      }
    
      let uexp = exp[message.author.id].exp;
    
    
      let xembed = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, `Your current EXP status: ${uexp}`)
    
      message.channel.send(xembed)
      
      fs.readFile("./Exp.json", JSON.stringify(exp), (err) => {
        if(err) cosole.log(err)
      });

}

if(cmd === `${prefix}st`){
    message.channel.startTyping();
    message.delete().catch();
}

if(cmd === `${prefix}t`){
    message.channel.stopTyping();
    message.delete().catch();
}

}

{//sound commands

}

{//Status Updater

if(cmd === `${prefix}watch`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!args[0] || args[0 == "help"]) return message.reply("*`What are you trying to watch bro!*");
    const botstream = args.join(" ");
    message.delete().catch();
    bot.user.setActivity(botstream, {type: "WATCHING"});
    
    let watch = JSON.parse(fs.readFileSync("./watching.json", "utf8"));

  watch[message.guild.id] = {
    watch: args[0]
  };

  fs.writeFile("./watching.json", JSON.stringify(watch), (err) => {
    if (err) console.log(err)
  });

}

if(cmd === `${prefix}stream`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!args[0] || args[0 == "help"]) return message.reply("*`What are you trying to stream bro!*");
    const botstream = args.join(" ");
    message.delete().catch();
    bot.user.setActivity(botstream, {type: "STREAMING"});
    
    let stream = JSON.parse(fs.readFileSync("./streaming.json", "utf8"));

  stream[message.guild.id] = {
    stream: args[0]
  };

  fs.writeFile("./streaming.json", JSON.stringify(stream), (err) => {
    if (err) console.log(err)
  });

}

if(cmd === `${prefix}listen`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!args[0] || args[0 == "help"]) return message.reply("*`What are you trying to listen to bro!*");
    const botstream = args.join(" ");
    message.delete().catch();
    bot.user.setActivity(botstream, {type: "LISTENING"});
    
    let listen = JSON.parse(fs.readFileSync("./listening.json", "utf8"));

  listen [message.guild.id] = {
    listen: args[0]
  };

  fs.writeFile("./listening.json", JSON.stringify(listen), (err) => {
    if (err) console.log(err)
  });
}

if(cmd === `${prefix}ping`){
    message.channel.send('*Pinging...*').then(sent => {
        let yoembemd = new Discord.RichEmbed()
        .setDescription(`Hey you! Yes you, it looks like it took: ***${sent.createdTimestamp - message.createdTimestamp}ms***!`)
        .setColor("#065f6f")
        message.delete().catch();
        message.channel.send(yoembemd);})}
}

{//WIP "custom" commands

if(cmd === `${prefix}say`){
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);

}   

if(cmd === `${prefix}mark`){
    let replies = ["https://media.giphy.com/media/PA53wf0F23pG8/giphy.gif","https://www.tenor.co/Gyns.gif","https://i.pinimg.com/originals/02/42/b7/0242b78699ed4171d91c8eae2487afd4.gif","https://s-media-cache-ak0.pinimg.com/originals/2a/84/93/2a8493295c1d40ce9682af3bf6f8b96f.gif","https://media1.tenor.com/images/91ae68450c95f5278b27ac77d7f9907f/tenor.gif?itemid=7664400", "https://78.media.tumblr.com/1ce01cee984858584eb88c820d4ccdbd/tumblr_inline_nnxyacpPXE1t5wn97_250.gif", "https://i.gifer.com/5PWc.gif", "https://78.media.tumblr.com/4dba40be0abd3fd8bd6345ec9f4bec93/tumblr_inline_nup6an8LBY1qkxgbl_400.gif", "https://media.giphy.com/media/hEqAjJiJWSXYY/giphy.gif", "https://i.pinimg.com/originals/e1/8c/55/e18c55ab9732f1273a0ab4d6f7bf6439.gif", "https://media.giphy.com/media/MRuNUOAfF3PYk/giphy.gif", "https://media.giphy.com/media/105xmt4urguSNq/giphy.gif", "https://media.giphy.com/media/b8wWeI83ua0Za/giphy.gif", "https://media3.giphy.com/media/13MEWRdFRh9D20/giphy.gif", "http://66.media.tumblr.com/54bcccd97973311ca28185b551619d6b/tumblr_oc4hx3Tb4s1usj34fo1_250.gif", "https://78.media.tumblr.com/d38cd3b8a2f6f4e01ff38eab4959baec/tumblr_p74qt4sU4Z1vkvmymo1_250.gif", "https://78.media.tumblr.com/158e5dd1c6d3507b8fec75b6650c6526/tumblr_p0nlafqjLn1vkvmymo3_400.gif", "https://78.media.tumblr.com/6fa42ac80353a79436eae50d97e8c8f8/tumblr_otewr0kUNu1s7h2m9o7_400.gif", "https://78.media.tumblr.com/072f5096b1b8a6f49f31e3688bc26c3b/tumblr_p74qmhVrj41vkvmymo2_250.gif", "https://s-media-cache-ak0.pinimg.com/originals/c5/1b/52/c51b528422a0887d93c8177611d89e81.gif", "https://i.pinimg.com/originals/6c/9c/c7/6c9cc71c4411ef34d88ec2c81c100d85.gif", "https://i.pinimg.com/originals/6c/fd/a8/6cfda847a2f0c4d8ddacd0ec35009a48.gif"];
    let end = Math.floor((Math.random()  * replies.length))
    let boom = new Discord.RichEmbed()
    .setAuthor("MarkiBot™", "https://cdn.discordapp.com/avatars/462189028737941505/85bc012e99e350caa07967216855b7ff.jpg?size=2048")
    .setColor("#3ba1e3")
    .setFooter("The following image may subject to MarkiRighted©")
    .setImage(replies[end])

    return message.channel.send(boom);
}

if(cmd === `${prefix}trivia`){


}

if(cmd === `whoosh`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, you can't use this command.");
    let whoosh = new Discord.RichEmbed()
    .setDescription("I think a 'whoosh' was just pulled, what do you think?")
    .setImage("https://media.tenor.com/images/44c04588cbe22af66429be2b9f53d400/tenor.gif")

    message.channel.send(whoosh);
}

if(cmd === `${prefix}8ball`){
    let replies = ["Fuck yeah!", "What the hell, no!", "I don't fucking know. 🤷", "Is that you trying to ask me something? Here, try again.", "Oh boy, you fucked up, that's not very good.", "Don't even count on it buddo.", "Holy shit dude, definitely!", "Yeah, ask again later.", "Don't ask...","Hmmmm, how about no!"];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballEmbed = new Discord.RichEmbed()

    .setAuthor(message.author.username)
    .setColor("#FF9940")
    .setThumbnail("https://media.giphy.com/media/3oKIP81MBMcvUKfBhC/giphy.gif")
    .addField(`Your question:`, `${question}`)
    .addField(`My great almighty motherfucking answer:`, `${replies[result]}`);
    
    
    message.channel.send(ballEmbed);   
}

if(cmd === `${prefix}define`){

    message.channel.send("Working on this as well, please wait til it's ready")
}
}

{//"m!poke" type commands
if(cmd === `${prefix}kill`){
    let attUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!attUser) return message.channel.send("Try to mention someone to 'kill' <:SHQ_MarioWink:462204914366676992>");
    let death = [`${attUser} didn't want much, and died on the spot.`,`${attUser} fell in love with death, and continued to live... and died when they turned 94, they lived a good life.`,`${attUser} hit the dab too hard, sad life they lived.`,`${attUser} fell in lava.`,`${attUser} drowned`, `${attUser} got killed by a spider.`, `${attUser} was pushed off of a cliff.`, `${attUser} died doing hardcore lava parkour.`, `${attUser} jumped into the void.`, `${attUser} Suffocated in a wall.`, `${attUser} was killed by their friend.`, `${attUser} was shot by their friend.`, `${attUser} slipped in the shower, and died.`, `${attUser} died taking a selfie, sad life they lived.`, `${attUser} did not respond to the chain mail
    `];
    let thesult = Math.floor((Math.random() * death.length));
    let color = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9", "#9d66ae", "#5e074a", "#6cc362", "#dbb986", "#dc7c21", ""]
    let tesult = Math.floor((Math.random() * color.length));

    let killEmbed = new Discord.RichEmbed()
    .setColor(`${color[tesult]}`)
    .setDescription(`${death[thesult]}`);
    
    
    message.channel.send(killEmbed);   

}

if(cmd === `${prefix}punch`){
let punUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!punUser) return message.channel.send("Try to mention someone to 'punch', unless you're trying to punch yourself... lol.");
let punch = ["https://38.media.tumblr.com/451c7b3326449ccc9b1bb5009d370b1a/tumblr_inline_nknntqBEiy1ryv977.gif", "https://78.media.tumblr.com/1c8bfeef16e53847270071e89ca29ed6/tumblr_o0jt244DSM1s8ga2bo1_250.gif", "https://i.pinimg.com/originals/ad/68/eb/ad68eb132f9fa6059c8d61ca6767fb8c.gif", "https://thumbs.gfycat.com/CleanMealyHapuku-size_restricted.gif", "https://78.media.tumblr.com/054a74179286aaac4e8bc2541a2e6420/tumblr_inline_o9kmdwsfUL1s2ua4d_500.gif","https://i.imgur.com/1K6A5La.jpg"]
let pesult = Math.floor((Math.random() * punch.length));
let colour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
let cesult = Math.floor((Math.random() * colour.length));

let punchEmbed = new Discord.RichEmbed()
.setColor(`${colour[cesult]}`)
.setDescription(`You've punched, ${punUser}`)
.setImage(`${punch[pesult]}`)

message.channel.send(punchEmbed);  
}

if(cmd === `${prefix}poke`){
    let pokeUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!pokeUser) return message.channel.send("Try to mention someone to 'poke'.");
    let poke = ["https://media.giphy.com/media/3x5nIjlszTBQs/giphy.gif", "https://media.giphy.com/media/hRQ6OBek0erPG/giphy.gif", "https://media.giphy.com/media/SiKdZn4quIXyo/giphy.gif", "https://i.pinimg.com/originals/b1/01/d8/b101d86dcc62fab2822e55a668d6ef0f.gif", "https://orig00.deviantart.net/bd6f/f/2012/188/8/a/poke_poke__gif__by_ironsidemeeper-d56bvta.gif","http://gifimage.net/wp-content/uploads/2017/08/poke-gif-16.gif", "https://i.imgur.com/VSRTUoB.gif", "https://2.bp.blogspot.com/-5TNu3R-mduE/WP6sC5vsBFI/AAAAAAAHhHY/Tx-aQbuyJzcTmZ-aoPawAr-j5eu8OK3UQCLcB/s1600/AS002547_13.gif"]
    let pokeesult = Math.floor((Math.random() * poke.length));
    let culour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let cusult = Math.floor((Math.random() * culour.length));
    
    let pokeEmbed = new Discord.RichEmbed()
    .setColor(`${culour[cusult]}`)
    .setDescription(`You've poked, ${pokeUser}`)
    .setImage(`${poke[pokeesult]}`)
    
    message.channel.send(pokeEmbed);  
}

if(cmd === `${prefix}wink`){
    let winkUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!winkUser) return message.channel.send("Hey! give me someone to wink at, jeez!");
    let wink = ["https://media1.tenor.com/images/f227d320689bfbaa4b5f9d093cf22106/tenor.gif?itemid=5851941", "https://78.media.tumblr.com/2e5b50c6a8f197f6182a462af057bd6d/tumblr_inline_nn5p8h8FLp1qbzfz7_400.gif", "https://media1.tenor.com/images/2228a355f86a607615f8e9b4472e2c80/tenor.gif?itemid=10117098", "https://i.gifer.com/MBJw.gif", "https://media1.tenor.com/images/e9f556aa7c4ad27d1e52aed3f79235c1/tenor.gif?itemid=8661153", "https://media1.tenor.com/images/39cb5da2502d0650d8dab39fe795924f/tenor.gif?itemid=10540459"]
    let winkesult = Math.floor((Math.random() * wink.length));
    let winklour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let winksult = Math.floor((Math.random() * winklour.length));
    
    let winkEmbed = new Discord.RichEmbed()
    .setColor(`${winklour[winksult]}`)
    .setDescription(`Do you realize what you just did, you just winked at, ${winkUser}`)
    .setImage(`${wink[winkesult]}`)
    
    message.channel.send(winkEmbed);  
}

if(cmd === `${prefix}slap`){
    let slapUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!slapUser) return message.channel.send("It would be all honkey dory is ***SOMEONE*** gave me someone to slap.");
    let slap = ["http://cdn.smosh.com/wp-content/uploads/ftpuploads/bloguploads/1213/slow-motion-gif-markiplier.gif", "http://cdn.smosh.com/wp-content/uploads/ftpuploads/bloguploads/1213/slow-motion-gif-markiplier.gif","https://78.media.tumblr.com/5f76294a7e541c72b37c11f544338411/tumblr_o6u7t3JmuA1tbzr9to2_400.gif"]
    let slapesult = Math.floor((Math.random() * slap.length));
    let slaplour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let slapsult = Math.floor((Math.random() * slaplour.length));
    
    let slapEmbed = new Discord.RichEmbed()
    .setColor(`${slaplour[slapsult]}`)
    .setDescription(`${slapUser}, was slapped by ${message.author.tag}`)
    .setImage(`${slap[slapesult]}`)
    
    message.channel.send(slapEmbed);  
}

if(cmd === `${prefix}flex`){
    let flexUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!flexUser) return message.channel.send("Yo, you're not trying to flex on yourself, now are you?");
    let flex = ["https://media.giphy.com/media/13MEWRdFRh9D20/giphy.gif", "https://78.media.tumblr.com/ac9281442e03a6f98115c38f434721cc/tumblr_oo233zqaHy1vtgmzlo1_500.gif", "https://78.media.tumblr.com/b670f6fca75b72c89a8b8eaacd2e2161/tumblr_inline_odbhqe1uud1un59n7_500.gif", "https://fat.gfycat.com/IllegalFlimsyBinturong.gif", "https://em.wattpad.com/fe62c104325a260833f0cf0b4f0275f9d497cd72/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f773271573071636d496171564d773d3d2d3233363034343039322e313433656463303462393765613863642e676966"]
    let flexssult = Math.floor((Math.random() * flex.length));
    let flexlour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let flexsult = Math.floor((Math.random() * flexlour.length));
    
    let flexEmbed = new Discord.RichEmbed()
    .setColor(`${flexlour[flexsult]}`)
    .setDescription(`${flexUser}, was flexed on by ${message.author.tag}`)
    .setImage(`${flex[flexssult]}`)
    
    message.channel.send(flexEmbed);  
}
}

{//Currency

if(cmd === `${prefix}$`){
    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
      }
    
      let uCoins = coins[message.author.id].coins;
    
    
      let coinEmbed = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, `has ${uCoins} <:SHQ_Mark:462693023331909673> Points.`)
    
      message.channel.send(coinEmbed)
      
      fs.readFile("./markicoins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
      });

}

if(cmd === `${prefix}bal`){
    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
      }
    
      let uCoins = coins[message.author.id].coins;
    
    
      let coinEmbed = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, `has ${uCoins} <:SHQ_Mark:462693023331909673> Points.`)
    
      message.channel.send(coinEmbed)
      
      fs.readFile("./markicoins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)

    });





}

if(cmd === `${prefix}give`){
    let gUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!gUser) return message.channel.send("Hey Tiny Box Tim, bad, you can't touch ~~my~~ our MarkiPoints without tagging the user! :worried:");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry, you can't use this command.");
    if(!coins[message.author.id]){
      return message.reply("You don't have any coins!")
    }
  
    if(!coins[gUser.id]){
      coins[gUser.id] = {
        coins: 0
      };
    }
  
    let pCoins = coins[gUser.id].coins;
    let sCoins = coins[message.author.id].coins;
  
    if(sCoins < args[1]) return message.reply("Not enough coins there!");
  
    coins[message.author.id] = {
      coins: sCoins - parseInt(args[1])
    };
  
    coins[gUser.id] = {
      coins: pCoins + parseInt(args[0])
    };
  
    message.channel.send(`${message.author} has given ${gUser} ${args[0]} <:SHQ_Mark:462693023331909673> Points`);
  
    fs.writeFile("./markicoins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
      });
}

if(cmd === `${prefix}award`){
    let jUser= message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if(!jUser) return message.channel.send("Hey Mar-mar-marlinda, bad, you can't touch ~~my~~ our MarkiPoints without tagging the user! :angry:");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, you can't use this command.");

    if(!coins[jUser.id]){
        coins[jUser.id] = {
          coins: 0
        };
    }
  
    let pCoins = coins[jUser.id].coins;

    coins[jUser.id] = {
      coins: pCoins + parseInt(args[0])
    };


    message.channel.send(`${message.author} has given ${jUser} ${args[0]} <:SHQ_Mark:462693023331909673> Points`);  
    fs.writeFile("./markicoins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
      });
}
}

{//Others like "HI"

if(cmd === `Hiya`){
    message.channel.send("Hello everyone my name is, Markiplier! :wave:").then(msg => {msg.edit("Actually I'm just <@!462189028737941505>, lol.")})
}

if(cmd === `hiya`){
    message.channel.send("Hello everyone my name is, Markiplier! :wave:").then(msg => {msg.edit("Actually I'm just <@!462189028737941505>, lol.")})
}

if(cmd === `${prefix}markiplier`){
    message.channel.send(`Hello ${message.author}, is there a problem? *do m!options to see what's up*`);
}

if(cmd === `${prefix}option`){
    let culour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let cusult = Math.floor((Math.random() * culour.length));
    let page = new Discord.RichEmbed()
    .setDescription("You're here for the Options to this feature, right? Nice, I knew it!")
    .addBlankField()
    .setAuthor("MarkiBot™")
    .setColor(`${culour[cusult]}`)
    .addField("Yes", "`Yes` - __*Kinda obvious of when to use this command*__")
    .addField("No", "`No` - __*Kinda obvious of when to use this command*__")
    .addField("Idunno", "`Idunno` - __*Is the command to 'exit' the bot.*__")
    .addField("Idk", "`Idk` - __*Is the command to 'exit' the bot.*__")
    .addBlankField()
    .setFooter("There are more pages, page 1")

    message.channel.send(page);
}

if(cmd === `${prefix}option2`){
    let culour = ["#FF9940", "#e372de", "#855b5a", "#b905cd", "#3e5a5e", "#d9f6c2", "#bd1d43", "#e4bf6e", "#511ff9"]
    let cusult = Math.floor((Math.random() * culour.length));
    let page = new Discord.RichEmbed()
    .setDescription("You're here for the Options to this feature, right? Nice, I knew it!")
    .addBlankField()
    .setAuthor("MarkiBot™")
    .setColor(`${culour[cusult]}`)
    .addField("Nothing", "`Nothing` - __*Kinda obvious of when to use this command.*__")
    .addField("Thanks", "`Thanks` - __*Is the command to 'exit' the bot.*__")
    .addBlankField()
    .setFooter("There are more pages, page 2")

    message.channel.send(page);
}
//YES ROUTE!

if(cmd === `${prefix}yes`){
    message.channel.send(`Oh? ${message.author}, what seems to be the problem?`);
}

if(cmd === `${prefix}upload`){
    message.channel.send(`${message.author}, my next upload should be shown, OR you can hit that bell button, and never miss a thing! :smile:`);
}

if(cmd === `${prefix}mhep`){
    message.channel.send(`Ah, lol... Just use "m!help",${message.author}.`);
}

if(cmd === `${prefix}me`){
    message.channel.send(`Hey! You're not a problem, the people that are saying different about you are the problem! :thumbsup:`);
}

//NO ROUTE!

if(cmd === `${prefix}no`){
    message.channel.send(`Oh? ${message.author}, then why call me? Don't answer that, Imma just go. :wave:`);
}


//idunno

if(cmd === `${prefix}idk`){
    message.channel.send(`Well ${message.author}, Imma "idk" myself outta here. :wave:`);
}

if(cmd === `${prefix}idunoo`){
    message.channel.send(`Well ${message.author}, Imma "idk" myself outta here. :wave:`);
}

//Some route!

if(cmd === `${prefix}nothing`){
    message.channel.send(`Just wanted to say my name, huh? :smirk:`);
}

//Thanks !

if(cmd === `${prefix}thanks`){
    message.channel.send(`Don't mention it, now, I'm going to go back to my "dungeon". :wink:`);
}
}

{//xp "system"

let xpAdd = Math.floor(Math.random() * 7) + 9;
  console.log(xpAdd);

if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let xpuser = message.author.tag
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 400;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle(`${xpuser}, you leveled Up!`)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup);
  }
  fs.writeFile("./level.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  
}

{//ranking system
    if(cmd === `${prefix}level`){

        if(!xp[message.author.id]){
            xp[message.author.id] = {
              xp: 0,
              level: 1
           };
         }   
           let curxp = xp[message.author.id].xp;
           let curlvl = xp[message.author.id].level;
           let nxtLvlXp = curlvl * 400;
           let difference = nxtLvlXp - curxp;
         
           let lvlEmbed = new Discord.RichEmbed()
           .setAuthor(message.author.username)
           .addField(`Level`, curlvl, true)
           .addField(`XP`, curxp, true)
           .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);
         
           message.channel.send(lvlEmbed);
        
    }

    if(cmd === `${prefix}leaderboard`){
        
        message.channel.send("Working on this as well, please wait til it's ready")

    }

    if(cmd === `${prefix}lb`){
        
        message.channel.send("Working on this as well, please wait til it's ready")


    }
}
});

bot.login(tokenfile.token);