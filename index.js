const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

client.on("ready", async () => {
  const startlogs = [
    `${client.user.tag} Is Starting To Scan!`,
    `Server: ${client.guilds.cache.get(config.serverid).name}`,
    `Server Members: ${client.guilds.cache.get(config.serverid).memberCount}`,
    `Type Of Status: Custom Status`,
    `Status Content: ${config.statustext}`,
    `Checking Every: ${config.checkeveryseconds} Seconds`,
    `Role ID: ${config.serverid}`
  ]
  for (const startlog of startlogs) {
    console.log(startlog)
  }
  setInterval(function() {
    client.guilds.cache.get(config.serverid).members.fetch().then((members) => {
    members.forEach(async user => {
      user.presence.activities.forEach(async activity => {
        if (activity.type === 'CUSTOM_STATUS' && activity.state === config.statustext) {
          await user.roles.add(config.roletogiveid).catch(() => {})
          if (config.consolelogwhenrolegiven === true) {
            const logs = [
              `${user.user.tag} => ${activity}: ${activity.state}`,
            ]
            for (const log of logs) {
              console.log(log)
            }
          }
        }
      })
    })
    })
        }, config.checkeveryseconds * 1000)
})


client.login(config.token)
