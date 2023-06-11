const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || ("94774071805")
global.mongodb = process.env.MONGODB_URI || "mongodb://utjaop1dhaw2u436zwkm:ID7a74JFWha1ijLmN7iQ@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bbtkq1sm2exv2vh?replicaSet=rs0"
global.port= process.env.PORT || 5000
global.email = 'kaveeshapakaya@gmail.com'
global.github = 'https://github.com'
global.location = 'india'
global.gurl = 'https://instagram.com/' // add your username
global.sudo = process.env.SUDO || '94783037971'
global.devs = '94783037971';
global.website = 'https://www.darknero.ga' //wa.me/+94701138827
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://i.ibb.co/CMCNByx/Picsart-22-07-03-15-45-00-698.jpg'
module.exports = {
  botname: process.env.BOT_NAME || '༺❤️༒🦁PRAMESH LION BOT🦁༒❤️༻',
  ownername:process.env.OWNER_NAME || '𝙥𝙧⃢𝙖𝙢⃪𝙚⃨⃕𝙨𝙝 𝙣𝙞⃢𝙡𝙖𝙠𝙨⃨𝙝⃡⃗𝙖⃝𝙣',
  sessionName: process.env.SESSION_ID || 'Secktor;;;PollingGeorge',
  author: process.env.PACK_INFO || (";")[0] || 'author',
  auto_read_status : process.env.AUTO_READ_STATUS || 'false',
  packname: process.env.PACK_INFO || (";")[1] || 'author', 
  autoreaction: process.env.AUTO_REACTION || 'on',
  antibadword : process.env.ANTI_BAD_WORD || 'fuck',
  alwaysonline: process.env.ALWAYS_ONLINE || 'false',
  antifake : process.env.FAKE_COUNTRY_CODE || '',
  readmessage: process.env.READ_MESSAGE || false,
  HANDLERS: process.env.PREFIX || ['.'],
  warncount : process.env.WARN_COUNT || 3,
  disablepm: process.env.DISABLE_PM || "flase",
  levelupmessage: process.env.LEVEL_UP_MESSAGE || 'false',
  antilink: process.env.ANTILINK_VALUES || 'chat.whatsapp.com',
  antilinkaction: process.env.ANTILINK_ACTION || 'remove',
  BRANCH: 'main',
  ALIVE_MESSAGE: process.env.ALIVE_MESSAGE || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'OPENAI_KEY',
  VERSION: process.env.VERSION === undefined ? 'v.0.0.3' : process.env.VERSION,
  LANG: process.env.THEME|| 'NIMESH-MD',
  WORKTYPE: process.env.WORKTYPE === undefined ? 'public' : process.env.WORKTYPE
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
