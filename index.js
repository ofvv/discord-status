const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

client.on("ready", async () => {
  const startlogs = [
    `${client.user.tag} Is Starting To Scan!`,
    `Type Of Status: Custom Status`,
    `Status Content: ${config.statustext}`,
    `Role ID: ${config.roletogiveid}`
  ]
  for (const startlog of startlogs) {
    console.log(startlog)
  }
})

client.on('presenceUpdate', async (oldm, newm) => {
    if(oldm.member.user.bot || newm.member.user.bot) return;

    let olds = oldm.activities[0].state
    let news = newm.activities[0].state
    if(olds === news) return;
    if(news.includes(config.statustext) && !newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.add(config.roletogiveid).catch(() => {})
    } else if (!news.includes(config.statustext) && newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.remove(config.roletogiveid).catch(() => {})
    } else if (!newm.activities[0].state && newm.member.roles.cache.has(config.roletogiveid)) {
        newm.member.roles.remove(config.roletogiveid).catch(() => {})
    } /*
    some code provided by discord.gg/devs
    old code at: https://sourceb.in/duAxm5KeDr
    */
})


client.login(config.token)
