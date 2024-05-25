// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/> 

const dgram = require('dgram');
const uuid = require('uuid');

let MotdData = {};

/**
 * 开始获取服务器信息
 * @param {String} ip IP地址
 * @param {Number} port 端口
 * @param {Number} time 刷新时间
 * @returns {Number}
 */
function StartGetServerMotd(ip, port, time = 1000) {
    if (MotdData[`${ip}_${port}`]) clearInterval(MotdData[`${ip}_${port}`].timer);
    const UpdateMotaData = () => {
        const client = dgram.createSocket('udp4');
        const dataToSend = Buffer.from(`01${Math.floor(Date.now()).toString(16).padStart(16, '0')}00FFFF00FEFEFEFEFDFDFDFD12345678${uuid.v4().toUpperCase().replace(/-/g, '').slice(0, 8)}`, 'hex');
        client.send(dataToSend, 0, dataToSend.length, port, ip);
        client.once('message', buffer => {
            const data = (buffer.length > 35 ? buffer.slice(35).toString('utf-8') : buffer.toString('utf-8')).split(';');
            MotdData[`${ip}_${port}`] = Object.assign(
                {},
                MotdData[`${ip}_${port}`],
                {
                    'Name': data[1],// 服务器名称
                    'Protocol': Number(data[2]),// 协议版本
                    'Version': data[3],// 服务器版本
                    'Online': Number(data[4]),// 在线人数
                    'MaxPlayers': Number(data[5]),// 最大在线人数
                    'Hash': data[6],// 哈希值
                    'WorldName': data[7],// 存档名称
                    'GameMode': data[8],// 默认游戏模式
                    'IPv4': data[10] ?? 0,// IPv4端口
                    'IPv6': data[11] ?? 0,// IPv6端口
                });
            client.close();
        });
    };
    UpdateMotaData();
    const timer = setInterval(UpdateMotaData, time);
    MotdData[`${ip}_${port}`] = Object.assign({}, MotdData[`${ip}_${port}`], { 'timer': timer });
}

/**
 * 停止获取服务器信息
 * @param {String} ip IP地址
 * @param {Number} port 端口
 */
function StopGetServerMotd(ip, port) {
    if (!MotdData[`${ip}_${port}`]) return;
    clearInterval(MotdData[`${ip}_${port}`].timer);
    delete MotdData[`${ip}_${port}`];
}

/**
 * 获取服务器信息
 * @param {String} ip IP地址
 * @param {Number} port 端口
 */
function GetServerMotd(ip, port) {
    return Object.assign({}, MotdData[`${ip}_${port}`], { 'timer': -1 });
}

ll.exports(StartGetServerMotd, 'MotdAPI', 'StartGetServerMotd');
ll.exports(StopGetServerMotd, 'MotdAPI', 'StopGetServerMotd');
ll.exports(GetServerMotd, 'MotdAPI', 'GetServerMotd');

if (ll.hasExported("BEPlaceholderAPI", "registerServerPlaceholder")) {
    ll.exports(object => {
        if (!MotdData[`${object['<ip>']}_${object['<port>']}`]) StartGetServerMotd(object['<ip>'], Number(object['<port>']));
        return MotdData[`${object['<ip>']}_${object['<port>']}`]?.[object['<stats>']]?.toString() ?? '';
    }, 'MotdAPI', 'RegistPAPI');
    ll.imports("BEPlaceholderAPI", "registerServerPlaceholder")('MotdAPI', 'RegistPAPI', `motd_<ip>_<port>_<stats>`);
}