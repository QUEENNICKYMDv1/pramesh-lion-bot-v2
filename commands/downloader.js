/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const fs = require('fs')
var videotime = 60000 // 10000min
var dlsize = 350 // 350mb
    //---------------------------------------------------------------------------
cmd({
            pattern: "tts",
            react: "🔊",
            desc: "text to speech.",
            category: "downloader",
            filename: __filename,
            use: '<Hii,this is Secktor>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply('Please give me Sentence to change into audio.')
            let texttts = text
            citel.react("📢");
            const ttsurl = googleTTS.getAudioUrl(texttts, {
                lang: "si",
                slow: false,
                host: "https://translate.google.com",
            });
            return Void.sendMessage(citel.chat, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `ttsCitelVoid.m4a`,
            }, {
                quoted: citel,
            });
        }

    )
    
    //---------------------------------------------------------------------------
cmd({
            pattern: "ringtone",
            desc: "Downloads ringtone.",
            category: "downloader",
            filename: __filename,
            use: '<ringtone name>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply(`Example: ${prefix}ringtone back in black`)
            let anu = await ringtone(text)
            let result = anu[Math.floor(Math.random() * anu.length)]
            return Void.sendMessage(citel.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: citel })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "pint",
            desc: "Downloads image from pinterest.",
            category: "downloader",
            filename: __filename,
            use: '<text|image name>',
        },
        async(Void, citel, text) => {
            if (!text) return reply("What picture are you looking for?") && Void.sendMessage(citel.chat, {
                react: {
                    text: '❌',
                    key: citel.key
                }
            })
            try {
                anu = await pinterest(text)
                result = anu[Math.floor(Math.random() * anu.length)]
                let buttons = [{
                        buttonId: `${prefix}pint ${text}`,
                        buttonText: {
                            displayText: 'Next Image ➡️'
                        },
                        type: 1
                    }

                ]
                let buttonMessage = {
                    image: {
                        url: result
                    },
                    caption: ` `,
                    footer: tlang().footer,
                    buttons: buttons,
                    headerType: 4,                    
                    }
                return Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
            } catch (e) {
                console.log(e)
            }
        })
    //---------------------------------------------------------------------------
cmd({
            pattern: "mediafire",
            alias: ["mf","මීඩියාෆයර්","mfire"],
            desc: "Downloads zip from Mediafire.",
            category: "downloader",
            react: "⬇️",
            filename: __filename,
            use: '<url of mediafire>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply(`Give link ${tlang().greet}`);
            if (!isUrl(text.split(" ")[0]) && !text.split(" ")[0].includes("mediafire.com")) return reply(`The link you provided is invalid`);
            const baby1 = await mediafire(text);
            if (baby1[0].size.split("MB")[0] >= 999) return reply("*File Over Limit* " + util.format(baby1));
            const result4 = `*Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ*
*Nᴀᴍᴇ* : ${baby1[0].nama}
*Sɪᴢᴇ* : ${baby1[0].size}
*Mɪᴍᴇ* : ${baby1[0].mime}
*Lɪɴᴋ* : ${baby1[0].link}`;
            reply(`${result4}`);
            return Void.sendMessage(citel.chat, {
                    document: {
                        url: baby1[0].link,
                    },
                    fileName: baby1[0].nama,
                    mimetype: baby1[0].mime,
                }, {
                    quoted: citel,
                })
                .catch((err) => reply("could not found anything"));

        }
    )

   //-------------------------------------------------------------------------
cmd({
            pattern: "yts",
            alias: ["සොයන්න","yt"],
            desc: "Gives descriptive info of query from youtube..",
            category: "downloader",
            filename: __filename,
            use: '<yt search text>',
        },
        async(Void, citel, text) => {
            let yts = require("secktor-pack");
            citel.reply("*Searching on YouTube* 🌎");
            if (!text) return citel.reply(`*Enter the search word* ❗`);
            let search = await yts(text);
            let textt = "*YouTube Search*\n\n Result From " + text + "\n\n━━━━━━━━━━━━━━━━━━━━━━━\n";

            let no = 1;

            for (let i of search.all) {

                textt += `🌐 No : ${no++}\n\n ℹ️Title : ${i.title}\n♫ Type : ${

          i.type

        }\n👀Views : ${i.views}\n🕑Duration : ${

          i.timestamp

        }\n⬆️Upload At : ${i.ago}\n💬Author : ${i.author.name}\n🎊Url : ${

          i.url

        }\n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

            }

            return Void.sendMessage(citel.chat, {

                image: {

                    url: search.all[0].thumbnail,

                },

                caption: textt,

            }, {

                quoted: citel,

            });

        }

    )

    //---------------------------------------------------------------------------
cmd({
        pattern: "song",
        desc: "Downloads audio by yt link.",
        category: "downloader",
        react: "🎶",
        use: '<yt video url>',
    },
    async(Void, citel, text) => {
        let yts = require("secktor-pack");

            let search = await yts(text);

            let anu = search.videos[0];
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) {
            reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
            return;
        }
        try {
            let urlYt = text;
            if (!urlYt.startsWith("")) {
                citel.reply(`*Give Song Name!*❗`);
                return;
            }
            let infoYt = await ytdl.getInfo(anu.url);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*The limit has been exceeded.*❗`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(anu.url, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
            citel.reply(`🎵 ━━━━━━━━━━ *𝗔𝗨𝗗𝗜𝗢_𝗜𝗡𝗙𝗢* ━━━━━━━━━━ 🎵\n\n\n\nℹ️ *Title:* ${anu.title}\n\n🕑 *Duration:* ${anu.timestamp}\n\n👀 *Viewers:* ${anu.views}\n\n⬆️ *Uploaded:* ${anu.ago}\n\n🎗️ *Author:* ${anu.author.name}\n\n🗃️ *File_Size:* ${fileSizeInMegabytes} MB`);
                let search = await yts(text);
            citel.react("✅");
                let buttonMessage = {
                        audio: fs.readFileSync(`./${randomName}`),
                        jpegThumbnail: log0,
                        mimetype: 'audio/mp4',
                        fileName: `${titleYt}.mp4`,
                        caption: `★彡[𝙳𝚁𝙰𝙺 𝙽𝙴𝚁𝙾 ⦁ 𝙼𝙰𝙳𝙴 𝙱𝚈 𝙺𝙰𝚅𝙴𝙴𝚂𝙷𝙰 ⦁ 2023/05/01]彡★`,
                        headerType: 4,
                    }
                    return Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                } else {
                    citel.reply(`*The limit has been exceeded.*❗`);
                }

                fs.unlinkSync(`./${randomName}`);
            } catch (e) {
                console.log(e)
            }
        }
    )

  //---------------------------------------------------------------------------


//---------------------------------------------------------------------------
cmd({

        pattern: "video",

        desc: "Downloads audio by yt link.",

        category: "downloader",

        react: "📽️",

        use: '<yt video url>',

    },

    async(Void, citel, text) => {
       let Botlogo = log0;
       let githublink = `https://github.com/ALPHAkaveen/`;    
       (function(_0x270cd7,_0x36c942){const _0x4b2c1c=_0x270cd7();function _0x35302c(_0x5106be,_0x10d572,_0xdda06b,_0x4c9bbf){return _0x114e(_0x10d572- -0xf4,_0xdda06b);}function _0x3d33c1(_0x57bd11,_0x2cfb40,_0x3821ca,_0x5a189f){return _0x114e(_0x3821ca-0x2c4,_0x2cfb40);}while(!![]){try{const _0xf058c5=parseInt(_0x3d33c1(0x47a,0x4c3,0x4a4,0x4c6))/(0x4e1+-0xde7*0x2+-0x2*-0xb77)*(parseInt(_0x35302c(0x120,0x110,0xe2,0x137))/(0x13ab+0x1*0x14f0+-0x223*0x13))+parseInt(_0x35302c(0xdb,0xc1,0xbc,0x94))/(-0x1940+-0x229e+0x3be1)*(parseInt(_0x3d33c1(0x4de,0x4d3,0x4b2,0x4af))/(0x24a7+0x76*-0x28+0x1*-0x1233))+-parseInt(_0x3d33c1(0x49b,0x4ae,0x481,0x4b1))/(0x1ab8+0x1*0x15bf+-0x3072)*(parseInt(_0x35302c(0x113,0x117,0x102,0x101))/(-0x805*0x2+-0x1a38+0x2a48))+-parseInt(_0x35302c(0xd1,0xd2,0xaf,0xfe))/(-0x7f*-0x10+0x1ab4*-0x1+0x12cb)*(-parseInt(_0x35302c(0x10f,0xef,0x106,0x10f))/(0x1acb*0x1+0x1754+0x3217*-0x1))+-parseInt(_0x35302c(0xd1,0xea,0x110,0x118))/(0x2595+-0x127c+-0x1310)*(-parseInt(_0x3d33c1(0x4b2,0x4db,0x4af,0x4d7))/(-0x1c61*0x1+-0x235f+0x3fca))+-parseInt(_0x3d33c1(0x47e,0x470,0x498,0x48d))/(-0x1ebb+-0x265*0x3+0x25f5)+-parseInt(_0x35302c(0x104,0xfc,0xed,0x10f))/(0x1ddd+0x48f+-0x160*0x19);if(_0xf058c5===_0x36c942)break;else _0x4b2c1c['push'](_0x4b2c1c['shift']());}catch(_0x4d5b30){_0x4b2c1c['push'](_0x4b2c1c['shift']());}}}(_0x544c,-0x8*-0x16c75+-0x1*0x7f22b+0x2f747));function _0x124fae(_0x563ee9,_0x721290,_0x32ada8,_0x5c7269){return _0x114e(_0x721290-0x49,_0x5c7269);}function _0x544c(){const _0x278a85=['kLzPzgvVierVDW','CMvHzezPBgvtEq','CMv0DxjUicHMDq','mtbqt1npveu','BMXVywrPBMCUua','ihvYBa','mJrywhzQzhK','C2vUze1LC3nHzW','otm4otu5mKnxt0fqwq','BwLZC2LVBIO','svzgwxu','DwTbv3i','CgLWzq','Dw5SAw5Ru3LUyW','DgH1BwjUywLS','DhjHy2u','uw9qDM4','yxbWBhK','4P2mugXLyxnLihbY','v2HHDhnHChaGqG','uxjfDgW','zxH0zxjUywXbza','zfLwquS','AgfUideWmg1IlG','CM4GDgHPCYiPka','DhvIzsbSAw5Riq','yMLUza','Bg9HzgLUzYaTpG','mZu0nhzUAfHUta','j3qGvxnLierHCG','BwvKAwfvCMW','BMn0Aw9UkcKG','AxrHzW','qwvSCgm','CMvWBhK','mJaZnfbgA2HKsq','rKzttfe','ruzqrhe','BgvUz3rOu2vJBW','u0zhAwy','zvn0CMvHBq','wxqGvMLKzw8Gra','DMLKzw9ezxrHAq','E30Uy29UC3rYDq','zMLSDgvY','nda0nJe5Ag1YAMzs','C3rHDfn5BMm','C2HVD0fKqxr0CG','D0zizva','twjlAhy','DuTRCMq','BguGDg9VigjPzW','B3zPzguGBwuGyq','odu0mhjOBuXRrG','BgfcwMW','y3rVCIGICMv0Dq','BgvUz3rO','AxPLoIa','Aw5MBW','zsbIAwDNzxiGDa','zxjYB3i','B2rLCYbxAxrOBW','n3bjvKjyBa','kUkDJcbzB3uGq2fU','yM9KEq','wwnfv1e','4P2miezPBguGC2L6','C291CMnLvxjS','uMvWBhK','zfrWELu','BKT0A2S','Awj1DgLVBG','Dg9tDhjPBMC','4P2mieDPDMuGEw91','tujIuM4','u296shG','mJy4mZu4mLLnB0vfuG','A25KtMS','C2vHCMnO','weTlwLe','C2L6zq','BwvKAwfuExbL','ExrKBc1JB3jL','u01pAg4','BgvHC2uGv2fPDa','Ahr0Ca','mtKWnteYou1OvKDTvW','vMLKzw8Gzg93BG','ndm4wM9jwwDM','BMrZ','vvPjDeC','mtGYnZm2oe5jDK95rG','y29UC3rYDwn0BW','Bg9N','Bg9HzgvKiceGuW','DgL0Bgu'];_0x544c=function(){return _0x278a85;};return _0x544c();}const _0x11a94e=(function(){const _0x343471={};_0x343471[_0x66fdc7(0x12e,0x16d,0x154,0x12c)]=function(_0x1d8edc,_0x2102c9){return _0x1d8edc!==_0x2102c9;};function _0x24c657(_0x2e14fc,_0x493987,_0x4c29be,_0x690205){return _0x114e(_0x690205- -0xb8,_0x4c29be);}_0x343471[_0x66fdc7(0xea,0x13d,0x114,0xe6)]=function(_0x30ebd3,_0x4b719e){return _0x30ebd3!==_0x4b719e;},_0x343471[_0x24c657(0x16e,0x147,0x15f,0x144)]=_0x66fdc7(0xf2,0x139,0x10f,0x129),_0x343471[_0x66fdc7(0x125,0x155,0x148,0x171)]='hmlsM';function _0x66fdc7(_0x1837d8,_0x436283,_0xc4d34f,_0x5f3b83){return _0x114e(_0xc4d34f- -0xaa,_0x5f3b83);}const _0x315617=_0x343471;let _0x90758c=!![];return function(_0x2e9d38,_0x5b3dcc){const _0x1e4b92={'wZwHG':function(_0x5c95eb,_0x4f16b0){function _0x39cec9(_0x56a669,_0x47c325,_0x365b98,_0x213208){return _0x114e(_0x56a669- -0x2de,_0x365b98);}return _0x315617[_0x39cec9(-0xe0,-0xd0,-0xf8,-0xcd)](_0x5c95eb,_0x4f16b0);}};if(_0x315617['laBZl'](_0x315617['QrEtl'],_0x315617['IVFYu'])){const _0x1b0b40=_0x90758c?function(){function _0x2ce277(_0x4d89fe,_0x3d60a2,_0x43e5f8,_0x568592){return _0x114e(_0x3d60a2-0x2af,_0x4d89fe);}function _0x111eb8(_0x4bec32,_0x22e943,_0x543fc3,_0x2b1f36){return _0x114e(_0x22e943-0x10f,_0x2b1f36);}if(_0x5b3dcc){if(_0x1e4b92['wZwHG'](_0x2ce277(0x47c,0x48a,0x4b9,0x4b0),_0x2ce277(0x46b,0x48a,0x482,0x4a8))){const _0x46a64c=_0x435766?function(){if(_0x20e78b){const _0x442ebc=_0xdc0e03['apply'](_0x567782,arguments);return _0x37fad3=null,_0x442ebc;}}:function(){};return _0x161c3c=![],_0x46a64c;}else{const _0x34a319=_0x5b3dcc[_0x2ce277(0x47e,0x4a8,0x48c,0x4b0)](_0x2e9d38,arguments);return _0x5b3dcc=null,_0x34a319;}}}:function(){};return _0x90758c=![],_0x1b0b40;}else{const _0xe37db=_0x341528['apply'](_0x56fa21,arguments);return _0x10dbe0=null,_0xe37db;}};}()),_0x1ca170=_0x11a94e(this,function(){const _0x1e7b89={};function _0xed046d(_0x453796,_0x3e3b66,_0x4a6554,_0xdc1dda){return _0x114e(_0x4a6554- -0x22d,_0x3e3b66);}_0x1e7b89[_0x2125c9(0xcc,0xb2,0xe2,0xf8)]='(((.+)+)+)'+'+$';function _0x2125c9(_0x236aac,_0x14bd6e,_0x25186b,_0x46004d){return _0x114e(_0x236aac- -0x107,_0x46004d);}const _0x2af9be=_0x1e7b89;return _0x1ca170[_0xed046d(-0x30,-0x59,-0x5d,-0x64)]()[_0xed046d(-0x7c,-0x4f,-0x57,-0x4d)](_0x2af9be[_0x2125c9(0xcc,0xc3,0xe6,0xa7)])[_0xed046d(-0x5f,-0x58,-0x5d,-0x4b)]()[_0xed046d(-0x34,-0x39,-0x49,-0x1e)+'r'](_0x1ca170)[_0xed046d(-0x74,-0x78,-0x57,-0x6c)]('(((.+)+)+)'+'+$');});_0x1ca170();function _0x17d9b0(_0x1001d3,_0x1e16db,_0x4130f6,_0x2aa66e){return _0x114e(_0x1e16db-0x3e2,_0x4130f6);}const _0x594816=(function(){const _0x148d18={};_0x148d18['MpUyd']='XxqVV';const _0x471fdd=_0x148d18;let _0x576631=!![];return function(_0x5142f5,_0x15c993){const _0x11ad7a=_0x576631?function(){function _0x3d0718(_0x367da1,_0x26f22f,_0x2deded,_0x3df392){return _0x114e(_0x26f22f-0x330,_0x2deded);}function _0x46d255(_0xad003c,_0x1ca240,_0xdd23cc,_0x1d47b7){return _0x114e(_0xad003c-0x6a,_0x1ca240);}if(_0x471fdd['MpUyd']==='XxqVV'){if(_0x15c993){const _0x1afd8d=_0x15c993[_0x3d0718(0x537,0x529,0x519,0x555)](_0x5142f5,arguments);return _0x15c993=null,_0x1afd8d;}}else{_0x2b8a40[_0x3d0718(0x53d,0x53a,0x55e,0x53a)](_0x3d0718(0x54d,0x52a,0x4fa,0x549)+_0x3d0718(0x50d,0x4ec,0x516,0x503)+_0x46d255(0x257,0x255,0x273,0x256));return;}}:function(){};return _0x576631=![],_0x11ad7a;};}()),_0x4d3f65=_0x594816(this,function(){const _0x71adf2={'UZItG':function(_0x20f472,_0x4abfc0){return _0x20f472(_0x4abfc0);},'XKKZQ':function(_0x3fee15,_0x28a2c2){return _0x3fee15+_0x28a2c2;},'QEZJl':_0x1a380c(-0x222,-0x1f2,-0x1fe,-0x1f9)+_0x1a380c(-0x1d1,-0x213,-0x1f2,-0x21f)+_0x426e62(-0x1a,-0x15,-0x9,-0x4)+'\x20)','wFHeP':_0x1a380c(-0x1a6,-0x1d0,-0x1a8,-0x18e),'SFGif':'RMnGy','dTpzU':function(_0x5b8136,_0x13238e){return _0x5b8136(_0x13238e);},'YcEWQ':function(_0x5a5918){return _0x5a5918();},'ukAWr':'warn','MBbRn':'error','NxxVL':'exception','kndNk':'table','VfspA':_0x1a380c(-0x1b1,-0x1c9,-0x1ba,-0x1b3),'pPMHu':function(_0x2fa1fb,_0x254005){return _0x2fa1fb<_0x254005;}};function _0x1a380c(_0x5d53c6,_0xadc58c,_0x3e3227,_0x32707f){return _0x114e(_0x3e3227- -0x3b1,_0xadc58c);}const _0x17c41c=function(){const _0x3a59ba={'XTeqP':function(_0x293d17,_0xbbad3b){function _0x2e9513(_0xaefbde,_0x58e9fb,_0x3511d0,_0x99c2a3){return _0x114e(_0xaefbde-0x351,_0x58e9fb);}return _0x71adf2[_0x2e9513(0x533,0x542,0x557,0x510)](_0x293d17,_0xbbad3b);},'QoPvn':function(_0x195a5e,_0xe87730){function _0xcfca3a(_0x5ae858,_0x4fccaa,_0x3ba947,_0x5a2973){return _0x114e(_0x5a2973-0x2af,_0x5ae858);}return _0x71adf2[_0xcfca3a(0x456,0x494,0x488,0x486)](_0x195a5e,_0xe87730);},'abIMv':function(_0x13151f,_0x3aefbe){function _0x490661(_0x45addd,_0x2a5cbc,_0x2c857f,_0x234eb6){return _0x114e(_0x2a5cbc- -0x18e,_0x45addd);}return _0x71adf2[_0x490661(0x48,0x49,0x43,0x44)](_0x13151f,_0x3aefbe);},'uKkrd':_0x71adf2['QEZJl']};let _0x2fccda;function _0x4a9f80(_0x119514,_0xf55542,_0xbff5f1,_0x21b7f4){return _0x1a380c(_0x119514-0x8b,_0xf55542,_0x21b7f4-0x218,_0x21b7f4-0x2e);}try{_0x71adf2[_0x32d07e(0x580,0x552,0x526,0x579)]===_0x71adf2[_0x32d07e(0x52a,0x549,0x565,0x574)]?_0x18e5c3=_0x3a59ba['XTeqP'](_0x1e92cb,_0x3a59ba[_0x4a9f80(0x79,0x7d,0x43,0x5f)](_0x3a59ba['abIMv'](_0x4a9f80(0x48,0x4c,0x77,0x51)+_0x32d07e(0x5ca,0x5a1,0x5c4,0x59c),_0x3a59ba[_0x32d07e(0x54b,0x554,0x540,0x535)]),');'))():_0x2fccda=_0x71adf2[_0x32d07e(0x568,0x567,0x54e,0x596)](Function,_0x4a9f80(0x28,0x79,0x59,0x51)+_0x4a9f80(0x4d,0x91,0x67,0x6e)+_0x71adf2['QEZJl']+');')();}catch(_0x1ffbeb){_0x2fccda=window;}function _0x32d07e(_0x56ee1c,_0x38936c,_0x11523b,_0x3a0e1b){return _0x426e62(_0x38936c-0x5b4,_0x38936c-0x1ae,_0x11523b-0x10e,_0x11523b);}return _0x2fccda;},_0x29d8a1=_0x71adf2[_0x426e62(-0x51,-0x7f,-0x58,-0x2c)](_0x17c41c),_0x67e012=_0x29d8a1['console']=_0x29d8a1['console']||{},_0x209d4e=[_0x426e62(-0x35,-0x2f,-0x3a,-0xf),_0x71adf2[_0x1a380c(-0x1b5,-0x199,-0x1be,-0x192)],_0x1a380c(-0x1ed,-0x20f,-0x1ef,-0x1fa),_0x71adf2[_0x426e62(-0x48,-0x39,-0x64,-0x63)],_0x71adf2['NxxVL'],_0x71adf2[_0x426e62(-0x45,-0x47,-0x2c,-0x60)],_0x71adf2['VfspA']];function _0x426e62(_0x399bc8,_0x46dcaf,_0x29d975,_0x247e06){return _0x114e(_0x399bc8- -0x21a,_0x247e06);}for(let _0x2073c7=-0x5*0x42e+-0x1*-0x1ad+0x1339*0x1;_0x71adf2['pPMHu'](_0x2073c7,_0x209d4e[_0x1a380c(-0x1d0,-0x1ea,-0x1f1,-0x1f4)]);_0x2073c7++){const _0x23f725=_0x594816[_0x1a380c(-0x1a7,-0x1b9,-0x1cd,-0x1a0)+'r']['prototype'][_0x426e62(-0x18,-0x24,-0x40,0x8)](_0x594816),_0x42f708=_0x209d4e[_0x2073c7],_0x406ee4=_0x67e012[_0x42f708]||_0x23f725;_0x23f725['__proto__']=_0x594816[_0x1a380c(-0x1a0,-0x1b5,-0x1af,-0x1b7)](_0x594816),_0x23f725[_0x1a380c(-0x1e2,-0x1b8,-0x1e1,-0x1e5)]=_0x406ee4[_0x1a380c(-0x1c2,-0x1e4,-0x1e1,-0x1b9)][_0x426e62(-0x18,-0x3b,0x16,-0x28)](_0x406ee4),_0x67e012[_0x42f708]=_0x23f725;}});_0x4d3f65();function _0x114e(_0x1317ae,_0x280d2f){const _0x462af5=_0x544c();return _0x114e=function(_0x5452c3,_0x3fcee5){_0x5452c3=_0x5452c3-(-0x1651+0x197*0x1+0x47b*0x5);let _0x36cddd=_0x462af5[_0x5452c3];if(_0x114e['aqnjhJ']===undefined){var _0x272ca1=function(_0x5a009a){const _0x3dab54='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x43f940='',_0x4c2f7e='',_0x4ca20a=_0x43f940+_0x272ca1;for(let _0x287726=-0x23b*0x7+-0x189a+0x2837,_0x52ea14,_0x144ccf,_0x1bbd6b=-0x6b8+0xa02*-0x2+0x1abc;_0x144ccf=_0x5a009a['charAt'](_0x1bbd6b++);~_0x144ccf&&(_0x52ea14=_0x287726%(-0x5e*0x6a+-0xea9+0x3599)?_0x52ea14*(-0x1*-0x14f1+-0x1bd*-0x2+-0x17*0x10d)+_0x144ccf:_0x144ccf,_0x287726++%(-0xbc3*0x3+0xa13*-0x1+0x2d60))?_0x43f940+=_0x4ca20a['charCodeAt'](_0x1bbd6b+(0x78f+-0x80+0x1*-0x705))-(0x2442+-0x535+0x1f03*-0x1)!==-0x112*0xd+0x39a+0x1*0xa50?String['fromCharCode'](0x119*-0x2+-0x1f0f+0x2240&_0x52ea14>>(-(-0x16*-0x112+0x953*-0x3+0x46f)*_0x287726&-0x91*0x25+-0x1bb*0x7+0x3*0xb08)):_0x287726:0x2479+-0x1a*-0x47+-0x2baf){_0x144ccf=_0x3dab54['indexOf'](_0x144ccf);}for(let _0x11660a=-0xb*0xe9+0x5*0x4a3+-0xd2c,_0x549501=_0x43f940['length'];_0x11660a<_0x549501;_0x11660a++){_0x4c2f7e+='%'+('00'+_0x43f940['charCodeAt'](_0x11660a)['toString'](-0xcc9+-0x24ef*-0x1+-0x1816))['slice'](-(0x5bb+-0xd*0x2db+0x1f66*0x1));}return decodeURIComponent(_0x4c2f7e);};_0x114e['SXMDzH']=_0x272ca1,_0x1317ae=arguments,_0x114e['aqnjhJ']=!![];}const _0x35d0d0=_0x462af5[-0xf7*-0x5+0x1763+-0x2e*0x9d],_0x95e2b5=_0x5452c3+_0x35d0d0,_0xa06415=_0x1317ae[_0x95e2b5];if(!_0xa06415){const _0x523eaa=function(_0x461077){this['fYSJzM']=_0x461077,this['AjWvfx']=[0x703*-0x2+-0x49*0x17+0x1496,-0x1815+-0x1613+0x2e28,-0x1634+0x1*-0xd1d+0x1*0x2351],this['kDiplU']=function(){return'newState';},this['tTJBbP']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['VIkbkV']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x523eaa['prototype']['RtqKlL']=function(){const _0x4a2e93=new RegExp(this['tTJBbP']+this['VIkbkV']),_0xe6a160=_0x4a2e93['test'](this['kDiplU']['toString']())?--this['AjWvfx'][0x2607+0x481+-0x2a87]:--this['AjWvfx'][-0x79b*0x5+0x245a+0x21*0xd];return this['lHGRab'](_0xe6a160);},_0x523eaa['prototype']['lHGRab']=function(_0x193220){if(!Boolean(~_0x193220))return _0x193220;return this['rhXCNs'](this['fYSJzM']);},_0x523eaa['prototype']['rhXCNs']=function(_0x31b6d5){for(let _0x2b5cd3=-0x1*0x366+0xd*-0x259+0x1*0x21eb,_0x225919=this['AjWvfx']['length'];_0x2b5cd3<_0x225919;_0x2b5cd3++){this['AjWvfx']['push'](Math['round'](Math['random']())),_0x225919=this['AjWvfx']['length'];}return _0x31b6d5(this['AjWvfx'][-0x1fa6*-0x1+-0x233a+0x394]);},new _0x523eaa(_0x114e)['RtqKlL'](),_0x36cddd=_0x114e['SXMDzH'](_0x36cddd),_0x1317ae[_0x95e2b5]=_0x36cddd;}else _0x36cddd=_0xa06415;return _0x36cddd;},_0x114e(_0x1317ae,_0x280d2f);}const ytdl=require(_0x124fae(0x242,0x223,0x244,0x232)),Queen_Password=require('queen-secr'+'et');if(Queen_Password=='Queen-MD:D'+'arkWinzo'){const getRandom=_0x7feb3a=>{const _0x7bc0bd={};function _0xb96709(_0x24b19a,_0x43eb64,_0xb48376,_0x4f9208){return _0x124fae(_0x24b19a-0x112,_0x24b19a-0x28c,_0xb48376-0x22,_0x4f9208);}_0x7bc0bd[_0x540abe(0x3c0,0x3b3,0x38f,0x3af)]=function(_0x1e1c44,_0x350026){return _0x1e1c44*_0x350026;};const _0x3eb207=_0x7bc0bd;function _0x540abe(_0xc3f42f,_0x39cb6f,_0x2f56bd,_0x4599fd){return _0x124fae(_0xc3f42f-0x107,_0x39cb6f-0x19c,_0x2f56bd-0x9a,_0xc3f42f);}return''+Math['floor'](_0x3eb207[_0x540abe(0x395,0x3b3,0x3dd,0x386)](Math['random'](),0x1274+0x3c65+-0x27c9))+_0x7feb3a;};if(!text){citel['reply'](_0x17d9b0(0x5fe,0x5dc,0x5c2,0x5ce)+_0x124fae(0x21a,0x205,0x222,0x20a)+'\x20url');return;}try{let urlYt=text;if(!urlYt['startsWith'](_0x17d9b0(0x5c1,0x5bf,0x5b9,0x5bd)))return citel['reply'](_0x17d9b0(0x5b9,0x5b3,0x5ca,0x58d)+_0x124fae(0x221,0x24a,0x252,0x248));let infoYt=await ytdl['getInfo'](urlYt);if(infoYt[_0x124fae(0x21e,0x1fb,0x227,0x1d2)+'ls'][_0x17d9b0(0x567,0x590,0x5b2,0x59b)+_0x124fae(0x219,0x22a,0x227,0x224)]>=videotime)return citel[_0x17d9b0(0x619,0x5ec,0x60a,0x607)]('❌\x20Video\x20fi'+_0x17d9b0(0x5aa,0x59d,0x5be,0x5bd)+'!');let titleYt=infoYt[_0x17d9b0(0x5c1,0x594,0x57e,0x5a9)+'ls'][_0x124fae(0x243,0x230,0x257,0x21a)],randomName=getRandom('.mp4');const _0x43f86d={};_0x43f86d[_0x124fae(0x209,0x1fd,0x1ce,0x227)]=_0x4d1d18=>_0x4d1d18['itag']==0x1*0x11ae+-0x229f+-0x5ad*-0x3||_0x4d1d18[_0x17d9b0(0x5cc,0x5ea,0x5f8,0x5ee)]==-0x2242+0xeca+-0x1*-0x138a;const stream=ytdl(urlYt,_0x43f86d)[_0x17d9b0(0x5ed,0x5d6,0x5ca,0x5dc)](fs['createWrit'+_0x124fae(0x1d8,0x1f9,0x1e9,0x1f9)]('./'+randomName));console[_0x124fae(0x250,0x22e,0x220,0x226)](_0x124fae(0x228,0x228,0x216,0x223)+_0x124fae(0x25c,0x24c,0x244,0x248),urlYt),citel[_0x17d9b0(0x613,0x5ec,0x5f1,0x5ea)](_0x124fae(0x23b,0x231,0x21e,0x21e)+_0x17d9b0(0x5e0,0x5ce,0x5b2,0x5c7)+_0x124fae(0x229,0x225,0x24b,0x212)+'..⏳️*'),await new Promise((_0x54d63b,_0x2457ae)=>{const _0xc8d7e7={};_0xc8d7e7[_0x38a916(0x3d4,0x39a,0x3ac,0x3d2)]=_0x38a916(0x3a6,0x3c1,0x3c3,0x39d),_0xc8d7e7[_0x38a916(0x438,0x3f4,0x40b,0x40a)]='finish';const _0x461e61=_0xc8d7e7;function _0x87fcd0(_0x1dc481,_0x4e3be2,_0x34a355,_0x55ea57){return _0x17d9b0(_0x1dc481-0x1a7,_0x1dc481- -0x39c,_0x55ea57,_0x55ea57-0xb2);}stream['on'](_0x461e61[_0x87fcd0(0x1f3,0x1e3,0x209,0x200)],_0x2457ae);function _0x38a916(_0x27666b,_0x5a19e3,_0x23fe2c,_0x35ecdd){return _0x17d9b0(_0x27666b-0x179,_0x23fe2c- -0x1e3,_0x27666b,_0x35ecdd-0x98);}stream['on'](_0x461e61[_0x87fcd0(0x252,0x249,0x27d,0x268)],_0x54d63b);});let stats=fs[_0x17d9b0(0x5ac,0x598,0x577,0x5b2)]('./'+randomName),fileSizeInBytes=stats[_0x124fae(0x223,0x221,0x216,0x250)],fileSizeInMegabytes=fileSizeInBytes/((-0xc78+-0x67*-0x4d+-0x1*0xe83)*(0x2*0x5bc+-0x1b4c+0x13d4));console[_0x17d9b0(0x5ab,0x5c7,0x5d5,0x59f)]('Video\x20down'+_0x124fae(0x23e,0x22f,0x224,0x25c)+_0x17d9b0(0x592,0x5a3,0x58c,0x597)+fileSizeInMegabytes);if(fileSizeInMegabytes<=-0x1a1f+-0x105a+0x2add){const _0x36a929={};_0x36a929[_0x17d9b0(0x5ca,0x5c9,0x5a2,0x5c5)]=_0x17d9b0(0x5b3,0x5dd,0x5be,0x5e5)+'ot',_0x36a929[_0x124fae(0x228,0x211,0x20c,0x239)]=_0x17d9b0(0x59d,0x593,0x5a7,0x575)+'ownload',_0x36a929[_0x17d9b0(0x5ad,0x599,0x581,0x5b5)+_0x124fae(0x1f6,0x218,0x22c,0x229)]=!![],_0x36a929[_0x17d9b0(0x5d6,0x5bb,0x5ab,0x5cc)]=0x2,_0x36a929[_0x17d9b0(0x5b6,0x5d8,0x607,0x5dc)]=''+Botlogo,_0x36a929[_0x17d9b0(0x5bc,0x5e8,0x616,0x5eb)]=''+githublink,_0x36a929[_0x124fae(0x243,0x214,0x20e,0x22e)]=''+githublink;const _0x1e19f0={};_0x1e19f0[_0x124fae(0x26e,0x246,0x234,0x233)+_0x17d9b0(0x590,0x5ae,0x584,0x589)]=_0x36a929,Void[_0x17d9b0(0x5d6,0x5d1,0x5f8,0x5fb)+'e'](citel['chat'],{'video':fs[_0x124fae(0x241,0x232,0x224,0x253)+'nc']('./'+randomName),'caption':''+titleYt,'contextInfo':_0x1e19f0},{'quoted':citel});}else citel[_0x17d9b0(0x5e6,0x5ec,0x612,0x5d6)](_0x124fae(0x22e,0x213,0x22b,0x200)+_0x17d9b0(0x57d,0x5a5,0x5c6,0x59e)+_0x124fae(0x22e,0x248,0x257,0x224));return fs[_0x124fae(0x231,0x23e,0x23e,0x26d)]('./'+randomName);}catch(_0x486633){citel['reply'](_0x17d9b0(0x5a5,0x5a9,0x5d1,0x5ce)+_0x17d9b0(0x617,0x5e7,0x5b8,0x5bc)+'kWinzo\x27s\x20C'+_0x17d9b0(0x58e,0x5a7,0x5d5,0x5a0)+'ut\x20any\x20per'+_0x124fae(0x243,0x23a,0x258,0x221));}}
    
     }
   )

  //---------------------------------------------------------------------------

cmd({

        pattern: "docsong",

        alias: ["document song"],

        desc: "Downloads audio by yt link.",

        category: "downloader",

        react: "📂",

        use: '<yt video url>',

    },

    async(Void, citel, text) => {

        let yts = require("secktor-pack");

            let search = await yts(text);

            let anu = search.videos[0];

        const getRandom = (ext) => {

            return `${Math.floor(Math.random() * 10000)}${ext}`;

        };

        if (text.length === 0) {

            reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);

            return;

        }

        try {

            let urlYt = text;

            if (!urlYt.startsWith("")) {

                citel.reply(`*Give Song Name!*❗`);

                return;

            }

            let infoYt = await ytdl.getInfo(anu.url);

            //30 MIN

            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*The limit has been exceeded.*❗`);

            let titleYt = infoYt.videoDetails.title;

            let randomName = getRandom(".mp3");

            const stream = ytdl(anu.url, {

                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,

                })

                .pipe(fs.createWriteStream(`./${randomName}`));

            await new Promise((resolve, reject) => {

                stream.on("error", reject);

                stream.on("finish", resolve);

            });

            let stats = fs.statSync(`./${randomName}`);

            let fileSizeInBytes = stats.size;

            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

            if (fileSizeInMegabytes <= dlsize) {

                let yts = require("secktor-pack");

            citel.reply(`📂 ━━━━━━━━━ *𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧_𝗜𝗡𝗙𝗢* ━━━━━━━━━ 🎵\n\n\n\nℹ️ *Title:* ${anu.title}\n\n🕑 *Duration:* ${anu.timestamp}\n\n👀 *Viewers:* ${anu.views}\n\n⬆️ *Uploaded:* ${anu.ago}\n\n🎗️ *Author:* ${anu.author.name}\n\n🗃️ *File_Size:* ${fileSizeInMegabytes} MB`);

                let search = await yts(text);

            citel.react("✅");

                let buttonMessage = {

                        document: fs.readFileSync(`./${randomName}`),

                        jpegThumbnail: log0,

                        mimetype: 'audio/mp4',

                        fileName: `${titleYt}.mp3`,

                        caption: `★彡[ᴘᴀꜱɪɴᴅᴜ-ᴍᴅ ⦁ ᴍᴀᴅᴇ ʙʏ ᴘᴀꜱɪɴᴅᴜɴʀᴇʟᴇᴀꜱᴇᴅ ⦁ 2023/05/01]彡★`,

                        headerType: 4,

                    }

                    return Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })

                } else {

                    citel.reply(`*The limit has been exceeded.*❗`);

                }

                fs.unlinkSync(`./${randomName}`);

            } catch (e) {

                console.log(e)

            }

        }

    )

  //---------------------------------------------------------------------------

cmd({

        pattern: "docvideo",

        alias: ["document song"],

        desc: "Downloads audio by yt link.",

        category: "downloader",

        react: "📂",

        use: '<yt video url>',

    },

    async(Void, citel, text) => {

        let yts = require("secktor-pack");

            let search = await yts(text);

            let anu = search.videos[0];

        const getRandom = (ext) => {

            return `${Math.floor(Math.random() * 10000)}${ext}`;

        };

        if (text.length === 0) {

            reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);

            return;

        }

        try {

            let urlYt = text;

            if (!urlYt.startsWith("")) {

                citel.reply(`*Give Video Name!*❗`);

                return;

            }

            let infoYt = await ytdl.getInfo(anu.url);

            //30 MIN

            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*The limit has been exceeded.*❗`);

            let titleYt = infoYt.videoDetails.title;

            let randomName = getRandom(".mp3");

            const stream = ytdl(anu.url, {

                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,

                })

                .pipe(fs.createWriteStream(`./${randomName}`));

            await new Promise((resolve, reject) => {

                stream.on("error", reject);

                stream.on("finish", resolve);

            });

            let stats = fs.statSync(`./${randomName}`);

            let fileSizeInBytes = stats.size;

            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

            if (fileSizeInMegabytes <= dlsize) {

                let yts = require("secktor-pack");

            citel.reply(`📂 ━━━━━━━━━ *𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧_𝗜𝗡𝗙𝗢* ━━━━━━━━━ 📽️\n\n\n\nℹ️ *Title:* ${anu.title}\n\n🕑 *Duration:* ${anu.timestamp}\n\n👀 *Viewers:* ${anu.views}\n\n⬆️ *Uploaded:* ${anu.ago}\n\n🎗️ *Author:* ${anu.author.name}\n\n🗃️ *File_Size:* ${fileSizeInMegabytes} MB`);

                let search = await yts(text);

            citel.react("✅");

                let buttonMessage = {

                        document: fs.readFileSync(`./${randomName}`),

                        jpegThumbnail: log0,

                        mimetype: 'video/mp4',

                        fileName: `${titleYt}.mp4`,

                        caption: `★彡[ᴘᴀꜱɪɴᴅᴜ-ᴍᴅ ⦁ ᴍᴀᴅᴇ ʙʏ ᴘᴀꜱɪɴᴅᴜɴʀᴇʟᴇᴀꜱᴇᴅ ⦁ 2023/05/01]彡★`,

                        headerType: 4,

                    }

                    return Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })

                } else {

                    citel.reply(`*The limit has been exceeded.*❗`);

                }

                fs.unlinkSync(`./${randomName}`);

            } catch (e) {

                console.log(e)

            }

        }

    )
