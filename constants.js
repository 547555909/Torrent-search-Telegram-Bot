const token = process.env.BOT_TOKEN;
const torrent_api_url = process.env.API_URL;
const BOT_NAME = process.env.BOT_NAME;
const SEARCH_URL = torrent_api_url+"/search";
const MAGNET_URL = torrent_api_url+"/magnet";
const use_logger=false;
const LOGGING_CHANNEL = parseInt(process.env.LOGGING_CHANNEL); // logs channel
const ROOT_USER = parseInt(process.env.ROOT_USER);
const CATHAL_USER = parseInt(process.env.CATHAL_USER);

// used to deal with new channel member so custom welcome message
const YOUTUBE_CHANNEL = parseInt(process.env.YOUTUBE_CHANNEL);
// used to forward pinned message
const YOUTUBE_CHANNEL_PINNED_MSG_ID = parseInt(process.env.YOUTUBE_CHANNEL_PINNED_MSG_ID);

const TESTING_CHANNEL_1 = parseInt(process.env.TESTING_CHANNEL_1);
const TESTING_CHANNEL_2 = parseInt(process.env.TESTING_CHANNEL_2);

const APPROVED_CHANNELS = [ LOGGING_CHANNEL, YOUTUBE_CHANNEL, TESTING_CHANNEL_1, TESTING_CHANNEL_2 ];


const help_page = "    <b>t80search_bot V0.0.5 Torrents help</b>" +
    "    <pre>\n" +
    "        currently only 1337x.to is used.....\n" +
    "\n" +
    "        options:\n" +
    "        -l n:  limits results to n results\n" +
    "               default is 6\n" +
    "        -s n: sort results by parameters (must be number)\n" +
    "            *   1 - by size decending (default)\n" +
    "            *   2 - by size ascending\n" +
    "            *   3 - by time descending\n" +
    "            *   4 - by time ascending\n" +
    "            *   5 - by seeders descending\n" +
    "            *   6 - by seeders ascending\n" +
    "            *   7 - by leechers descending\n" +
    "            *   8 - by leechers ascending\n" +
    "        -d n: shows url and magnet link for torrent this is only possible after searching. n will be displayed in the first column of search results (0 - n..)\n" +
    "        -h : displays this page\n" +
    "\n" +
    "        basic usage: @t80search_bot ubuntu 16.04\n" +
    "        advanced usage - find ubuntu with most seeders and show only top 3 results\n" +
    "        @t80search_bot -s 5 -l 3 ubuntu 16.04\n" +
    "\n" +
    "        get magnet link - use 0 for first result, 1 for second...\n" +
    "        @t80search_bot -d 1\n" +
    "    </pre>";

const help_page_main = "    <b>t80search_bot V0.0.5</b>" +
    "    <pre>\n" +
    "        -t gets you into the torrent functions\n" +
    "        -t -h to see help page for torrent\n" +
    "\n" +
    "        -a gets you into the admin functions\n" +
    "        -a -h to see help page for admin\n" +
    "\n" +
    "        -p gets you into permissions manager\n" +
    "        -p -h shows help for permissions manager\n\n" +
    "        -p_ask allows you to request permissions\n" +
    "        -p_ask -t for example allows you to request\n" +
    "                  permissions to use torrent search\n\n" +
    "        Current requestable permissions are:\n" +
    "        ____________________________________\n" +
    "        -t for torrent searching\n" +
    "        -a for admin functions\n" +
    "        -p allows you to grant or remove\n" + 
    "           permissions from users\n\n" +
    "        whois id lets you see info about users\n"+ 
    "              replying to a user with whois will\n"+ 
    "              do the same\n\n" +
    "        pinned forwards the saved message" +
    "    </pre>";

const help_page_permissions = "    <b>t80search_bot V0.0.5 Permissions</b>" +
    "    <pre>\n" +
    "        -l lists all permission requests\n" +
    "        -lg lists all granted permissions\n" +
    "        -g allows you to grant permissions so like\n" +
    "        -g -t 123456789 grants the user whose id is 123456789 torrent access\n" +
    "        -r removes permission from user in the same way as granting\n" +
    "        -h displays this help\n" +
    "    </pre>";

const HELP_PAGE_ADMIN = "    <b>t80search_bot V0.0.5 Admin</b>" +
    "    <pre>\n" +
    "        These can either be replies to a message\n"+
    "        or just send the id directly\n\n" +
    "        ban (id) bans a user from the group\n" +
    "        unban (id) unbans a user from the group\n" +
    "        promote (id) makes a user admin\n" +
    "        gen_link generates invite link\n" +
    "        restrict (id) user cant do anything\n" +
    "        unrestrict (id) user is back to normal\n" +
    "        -h displays this help\n" +
    "    </pre>";


const NOTES_ROG_PHONE_2_GUIDES = "<b>Rog Phone 2 Guides</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=pgqboLXMSuk\">How to root stock android 9 and 10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uONJrZrHWxI\">How to unbrick ( stuck in edl mode )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Ro62pAF1RBU\">Custom Kernel for stock ROM</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=k4ESk9VCgI0\">How to update to android 10 stock from android 9 and keep root</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=eteK_mhAcyw\">How to downgrade from android 10 to android 9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uGdSWUK9vNw\">How to use payload dumper, setup platform tools and patch boot image using magisk ( kinda all in one vid lol )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=t5AJCwmGbXM\">How to backup using TWRP and TitaniumBackup</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=_94R7ZY5zaY\">How to fix safetynet while the magisk bois work on a proper fix</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=dKehBkHtbEI\">dirty flashing havoc os update</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=4N05Ny8jAtA\">Up to date kernel flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Xo3ZtxFkPbI\">omni rom flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=IEnnVAPLSeg\">havoc flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=8vhocq5UWJQ\">MSM flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=7_PtEwdZvGo\">flashing stock rom in twrp</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=gh7b9AH51k4\">Improve battery life</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_APPS = "<b>APPs And Other Misc</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/2540\">Viperfx</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/2769\">viperfx irs and ddc collection</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/3001\">Gcam</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/apps/magisk/collection-magisk-modules-v2-t3575758/post72542167#post72542167\">Uninstall magisk modules using twrp</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_PSVITA = "<b>PSVITA</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/23593\">custom theme: red cyber</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=WBBfPrQsiA8\">Matrix Custom boot animation video</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/35\">Matrix Custom boot image download</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_RAW = "<b>FLASH Raw Firmware</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">find raw a10 or a9 on this channel</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/6723\">raw a10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/rog-phone-2/how-to/guide-convert-cn-to-ww-rom-26-08-t3961042\">raw a9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://drive.google.com/drive/folders/0B16KcYGeJ8Q9fml4MzdQUFA3Z29aS3Jkd01iY3oyT09zaWwzaldFZl9tV0JXNG9jUEdkSFE\">raw a9 and 10 thank to Vietnam bois</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/uONJrZrHWxI?t=664\">If you want to see how flashing raw firmware looks like in a video click on this and skip to 11:03</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>FLASH RAW</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "1. Download raw firmware from above" +
    "<pre>\n</pre>" +
    "2. Extract the zip two times. You should see a file called flashall.bat or flashall_AFT.cmd." +
    "<pre>\n</pre>" +
    "3. Put phone into fastboot mode ( this is where you will see large green start text )" +
    "<pre>\n</pre>" +
    "4. Double Click on flashall.bat or flashall_AFT.cmd this should open up a cmd window. If it doesnt just run the file in cmd by typing flashall.bat or flashall_AFT.cmd" +
    "<pre>\n</pre>" +
    "5. Leave the phone for 20 minutes. It will restart when fully Flashed" +
    "<pre>\n</pre>" +
    "6. Turn of your phone when it reboots and reboot into recovery and select factory reset ( Your phone will not work properly if you dont  )" +
    "<pre>\n" +
    "___________________________________________</pre>";


const NOTES_RELOCK = "<b>Relock Bootloader</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">find raw a10 or a9 on this channel</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/6723\">raw a10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/rog-phone-2/how-to/guide-convert-cn-to-ww-rom-26-08-t3961042\">raw a9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://drive.google.com/drive/folders/0B16KcYGeJ8Q9fml4MzdQUFA3Z29aS3Jkd01iY3oyT09zaWwzaldFZl9tV0JXNG9jUEdkSFE\">raw a9 and 10 thank to Vietnam bois</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/uONJrZrHWxI?t=664\">If you want to see how flashing raw firmware looks like in a video click on this and skip to 11:03</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>Lock Bootloader</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "1. Download raw firmware from above" +
    "<pre>\n</pre>" +
    "2. Extract the zip two times. You should see a file called flashall.bat or flashall_AFT.cmd." +
    "<pre>\n</pre>" +
    "3. Put phone into fastboot mode ( this is where you will see large green start text )" +
    "<pre>\n</pre>" +
    "4. Double Click on flashall.bat or flashall_AFT.cmd this should open up a cmd window. If it doesnt just run the file in cmd by typing flashall.bat or flashall_AFT.cmd" +
    "<pre>\n</pre>" +
    "5. Leave the phone for 20 minutes. It will restart when fully Flashed" +
    "<pre>\n</pre>" +
    "6. Force reboot into fastboot mode and run this command to lock <pre>fastboot oem asus-csc_lk</pre>" +
    "<pre>\n</pre>" +
    "7. You can do a factory reset" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_QMK = "<b>QMK</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=x6pWqjC39_I\">Custom RGB Animations</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/qmk_firmware\">Github link to my fork</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_Edxposed = "<b>Edxposed</b>" +
    "<pre>\n\n</pre>" +
    "<b>Magisk Modules ( Install using magisk )</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4028\">riru core (install first)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4026\">xposed magisk module ( installs edxposed )</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>Edxposed Manager</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4025\">install this like normal apk</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>Edxposed Modules</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4029\">HiddenCore ( needed to pass safetynet )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4027\">xprivacy ( blocks apps from using parts of android )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/4024\">GravityBox ( havock OS like customasations )</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>SafetyNet Fake Source from XDA</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/apps/magisk/safetynet-fix-google-update-march-2020-t4063679\">link</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_LINEAGE = "<b>Lineage Guides</b>" +
    "<pre>\n\n</pre>" +
    "<b>version 17.1-20200319</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/1222\">stock</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/1224\">magisk patched</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>version 17.1-20200320</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/1513\">stock</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/1516\">magisk patched</a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>Guides</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=f7gZO9qn0gM\">How to install lineage os:</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=2byAysSYRIg\">How to root lineage os: </a>" +
    "<pre>\n" +
    "___________________________________________\n\n</pre>"+

    "<b>Flash using twrp</b>" +
    "<pre>\n"+
    "___________________________________________\n</pre>" +
    "1. Extract rom.zip" +
    "<pre>\n</pre>" +
    "2. Edit the metadata file in the META-INF ROM and overwriting pre-device=I001D with pre-device=WW_I001D" +
    "<pre>\n</pre>" +
    "3. Wipe data/internal after flash success." +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_FLASHING_SCRIPT = "<b>RogPhone2Flasher</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=-M_MJUzCuvM\">youtube video</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/pvhuMtJstaU\">How to run on windows</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/Hz2166j1zhE\">Dual boot</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/RogPhone2Flasher\">Github</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_ROGPHONE2RGB = "<b>Asus ROG Phone 2 RGB</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB/releases\">Download From Github</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb\">Download From PlayStore</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=8rNJtEDuV1I\">Latest Guide</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_ROOT = "<b>Rooting Guides</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uGdSWUK9vNw\">Magisk Patched boot method ( payload dumper )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=pgqboLXMSuk\">Using TWRP to root</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Jq3aCh5d8ng\">Rooting WearOS ( Ticwatch E )</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_CTS = "<b>Magisk cts profile kaput</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "In magisk manager settings enable magisk hide and reboot"+
    "<pre>\n\n</pre>"+
    "If the above doesn't work you can try using some safetynet fix magisk modules." +
    "<pre>\n" +
    "___________________________________________</pre>";

const DONATE = "<b>Donate</b>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://paypal.me/artiomSudo\">Paypal</a>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.patreon.com/user?u=28429069\">Patreon</a>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.donateterminalheatsink\">Google Pay Billing App</a>"+
    "<pre>\n\n" +
    "        Crypto Currencies\n\n" +
    "BTC : 3McWRwH6sf3bBgtSXsGvta5nR1ZKLvoP6M \n\n" +
    "XMR : 8AgA9hRFbE69gaP5mBjB4y93J1MarAuyRRopN4SD5FLbGbrHB6GPc4ojZ2vAhD1zThFGboFqvumYKQ7xhRmJUMgdK3MdRE5 \n\n" +
    "LTC : Lh2EqWsGgNrHV5Wo28CoW1PbsseXZqpYeN \n\n" +
    "ETH : 0xcbdc5105efb30823e0b20492970b059e28242034 \n\n" +
    "DASH: XyGj3RP2MRqtFqyAg3p1RVFnet34juyd5H \n\n" +
    "        Thank you\n" +
    "</pre>";

const NOTES_CHANNELS = "<b>Other Telegram Groups and Channels</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/ROGPhoneSeriesDiscussion\">Global Discussion group for ASUS ROG Phone series</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/omnirog2\">Omni ROM for Rog 2</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/msmrog2support\">MSM, Ancient, Bliss, Havoc Roms for Rog 2</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/rogseriesgcam\">Google Cam for rog</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/shady_mods_releases\">Shady Mods channel (best recents mod)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">Vietnam Channel for rog phones (raw firmware and stuff)</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_PROGRAMS = "<b>Programs</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/16\">Assassins Creed Valhala Auto Save Backup</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES_CUSTOM_BOOT_ANIMATION = "<b>Custom Boot Animations</b>" +
    "<pre>\n\n"+
    "___________________________________________\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/15\">Matrix Boot Animation</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/14\">Make Your Own Custom Boot Animation Template</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/12\">One Plus 8t CyberPunk Boot Animations Preview</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/9\">One Plus 8t CyberPunk Boot Animations Download</a>" +
    "<pre>\n" +
    "___________________________________________</pre>";

const NOTES = "<b>Notes</b>" +
    "<pre>\n</pre>"+
    "To see the notes just type one of the following into the chat"+
    "<pre>\n___________________________________________\n</pre>" +
    "<pre>/notes\n\n</pre>" +

    "( sick shortcut for notes so you dont have to type them out (uses custom keyboard) )" +
    "<pre>\n</pre>"+
    "<pre>/n\n\n</pre>" +

    "<pre>/donate\n\n</pre>" +

    "( report bois by replying this to their message )" +
    "<pre>\n</pre>"+
    "<pre>/report\n\n</pre>" +

    "( essentially all rog phone 2 guides )" +
    "<pre>\n</pre>"+
    "<pre>/rogphone2\n\n</pre>" +

    "<pre>/rogphone2rgb\n\n</pre>" +

    "( dual boot script for rog 2 )" +
    "<pre>\n</pre>"+
    "<pre>/flasher\n\n</pre>" +

    "( flashing raw )" +
    "<pre>\n</pre>"+
    "<pre>/raw\n\n</pre>" +

    "( relock the bootloader )" +
    "<pre>\n</pre>"+
    "<pre>/relock\n\n</pre>" +

    "<pre>/apps\n\n</pre>" +
    "<pre>/root\n\n</pre>" +
    "<pre>/cts-profile\n\n</pre>" +
    "<pre>/psvita\n\n</pre>" +

    "( keyboard custom firmware )" +
    "<pre>\n</pre>"+
    "<pre>/qmk\n\n</pre>" +

    "<pre>/edxposed\n\n</pre>" +
    "<pre>/lineage\n\n</pre>" +

    "( Telegram Channels and groups that you will find interesting )" +
    "<pre>\n</pre>"+
    "<pre>/channels\n\n</pre>" +
    "<pre>/programs\n\n</pre>" +
    "<pre>/boot_animations\n\n</pre>" +

    "( old pinned message (handy if you are following a youtube vid and I posted something here) )" +
    "<pre>\n</pre>"+
    "<pre>/all\n</pre>" +
    "<pre>" +
    "___________________________________________</pre>";

const NOTES_DICTIONARY = {
    '/donate':DONATE,
    '/notes':NOTES,
    '/rogphone2rgb':NOTES_ROGPHONE2RGB,
    '/rogphone2':NOTES_ROG_PHONE_2_GUIDES,
    '/raw':NOTES_RAW,
    '/apps':NOTES_APPS,
    '/psvita':NOTES_PSVITA,
    '/qmk':NOTES_QMK,
    '/edxposed':NOTES_Edxposed,
    '/lineage':NOTES_LINEAGE,
    '/flasher':NOTES_FLASHING_SCRIPT,
    '/root':NOTES_ROOT,
    '/relock':NOTES_RELOCK,
    '/cts-profile':NOTES_CTS,
    '/channels': NOTES_CHANNELS,
    '/programs': NOTES_PROGRAMS,
    '/boot_animations': NOTES_CUSTOM_BOOT_ANIMATION
}

module.exports = {
    TOKEN: token,
    BOT_NAME: BOT_NAME,
    SEARCH_URL: SEARCH_URL,
    MAGNET_URL: MAGNET_URL,
    USE_LOGGER: use_logger,
    LOGGING_CHANNEL: LOGGING_CHANNEL,
    HELP_PAGE_TORRENT: help_page,
    HELP_PAGE_MAIN: help_page_main,
    ROOT_USER: ROOT_USER,
    CATHAL_USER: CATHAL_USER,
    HELP_PAGE_PERMISSIONS: help_page_permissions,
    HELP_PAGE_ADMIN: HELP_PAGE_ADMIN,
    YOUTUBE_CHANNEL: YOUTUBE_CHANNEL,
    YOUTUBE_CHANNEL_PINNED_MSG_ID: YOUTUBE_CHANNEL_PINNED_MSG_ID,
    DONATE: DONATE,
    NOTES: NOTES,
    NOTES_ROG_PHONE_2_GUIDES: NOTES_ROG_PHONE_2_GUIDES,
    NOTES_APPS: NOTES_APPS,
    NOTES_PSVITA: NOTES_PSVITA,
    NOTES_RAW: NOTES_RAW,
    NOTES_QMK: NOTES_QMK,
    NOTES_Edxposed: NOTES_Edxposed,
    NOTES_LINEAGE: NOTES_LINEAGE,
    NOTES_FLASHING_SCRIPT: NOTES_FLASHING_SCRIPT,
    NOTES_ROGPHONE2RGB: NOTES_ROGPHONE2RGB,
    NOTES_RELOCK: NOTES_RELOCK,
    NOTES_ROOT: NOTES_ROOT,
    NOTES_CTS: NOTES_CTS,
    NOTES_DICTIONARY,
    APPROVED_CHANNELS,
    NOTES_CHANNELS: NOTES_CHANNELS,
    NOTES_PROGRAMS: NOTES_PROGRAMS,
    NOTES_CUSTOM_BOOT_ANIMATION: NOTES_CUSTOM_BOOT_ANIMATION
};