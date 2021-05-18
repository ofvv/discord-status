const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

/*
some of the code is provided by discord.gg/devs
old code with intervals instead of presenceUpdate event at: https://sourceb.in/duAxm5KeDr
*/

client.on("ready", async () => {
  let startdate = new Date(); let starttime = startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
  let enabled; if (config.options.consolelogs === true) enabled = `Yes`; else if (config.options.consolelogs === false) enabled = `No`; else enabled = `Can't Detect`;
  const startlogs = [
    `<---------------------------------------->`,
    `Bot: ${client.user.tag} (ID: ${client.user.id}) {Started: ${starttime}}`,
    `Bot Using: Discord.js v12.5.3`,
    `Github Repository: github.com/ZiroCore/discord-status`,
    `Type Of Status: Custom Status`,
    `Status Content: ${config.status.statustext}`,
    `Role ID: ${config.status.roletogiveid}`,
    `Console Logs: {Enabled: ${enabled}}`,
    `<---------------------------------------->`
  ]
  for (const startlog of startlogs) {
    console.log(startlog)
  }
})

client.on('presenceUpdate', async (oldm, newm) => {
  try {
  let date = new Date()
  let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (oldm.member.user.bot || newm.member.user.bot) return;

    let olds = oldm.activities[0].state;
    let news = newm.activities[0].state;
    if (olds === news) return;
    if (config.status.anystatus === false) {
    if (news.includes(config.status.statustext) && !newm.member.roles.cache.has(config.status.roletogiveid)) {
        newm.member.roles.add(config.status.roletogiveid).then(async d => {
          if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE ADDED) => ${newm.user.tag} {${time}}`)
        }).catch(() => {})

    } else if (!news.includes(config.status.statustext) && newm.member.roles.cache.has(config.status.roletogiveid)) {
        newm.member.roles.remove(config.status.roletogiveid).catch(() => {})
        if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
    } else if (!newm.activities[0].state && newm.member.roles.cache.has(config.status.roletogiveid)) {
        newm.member.roles.remove(config.status.roletogiveid).catch(() => {})
        if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
    }
  } else if (config.status.anystatus === true) {
    if (news && olds) {
      newm.member.roles.add(config.status.roletogiveid).then(async d => {
        if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] ANY STATUS (ROLE ADDED) => ${newm.user.tag} {${time}}`)
      }).catch(() => {})
    }
  }
  } catch (e) {}
})


client.login(config.bot.token)
