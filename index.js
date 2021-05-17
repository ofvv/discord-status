const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

/*
some of the code is provided by discord.gg/devs
old code with intervals instead of presenceUpdate event at: https://sourceb.in/duAxm5KeDr
*/

client.on("ready", async () => {
  const startlogs = [
    `${client.user.tag} Is Starting To Check For Statuses!`,
    `Type Of Status: Custom Status`,
    `Status Content: ${config.statustext}`,
    `Role ID: ${config.roletogiveid}`
  ]
  for (const startlog of startlogs) {
    console.log(startlog)
  }
})

client.on('presenceUpdate', async (oldm, newm) => {
  let date = new Date()
  let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (oldm.member.user.bot || newm.member.user.bot) return;

    let olds = oldm.activities[0].state;
    let news = newm.activities[0].state;
    if (olds === news) return;
    if (news.includes(config.statustext) && !newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.add(config.roletogiveid).then(async d => {
          if (config.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE ADDED) => ${newm.user.tag} {${time}}`)
        }).catch(() => {})

    } else if (!news.includes(config.statustext) && newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.remove(config.roletogiveid).catch(() => {})
        if (config.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
    } else if (!newm.activities[0].state && newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.remove(config.roletogiveid).catch(() => {})
        if (config.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
    }
})


client.login(config.token)
