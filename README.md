# MotdAPI - 为开发者和 PAPI 提供 Motd 支持

## PAPI 变量的使用

> 请注意！因代码原因，您<font color="red">第二次获取</font>才能正常显示！

<!-- > 以下变量请用<font color="	#00FFFF">%%</font>包裹 -->

### 如何调用？

`%motd_<IP>_<端口>_<属性>%`  
比如我要获取<font color="#FFFFE0">地址为 127.0.0.1 端口为 19132</font>的服务器的<font color="#FF4500">在线人数</font>就写  
`%motd_127.0.0.1_19132_MaxPlayers%`  
获取存档名称就写  
`%motd_127.0.0.1_19132_WorldName%`

好了，就<strong>这么简单</strong>٩(๑>◡<๑)۶

### 以下是可填的属性

| 属性       | 含义                            |
| ---------- | ------------------------------- |
| Name       | 服务器名称                      |
| Protocol   | 协议版本                        |
| Version    | 服务器版本                      |
| Online     | 在线人数                        |
| MaxPlayers | 最大在线人数                    |
| Hash       | 哈希值(别问我,我也不知道干嘛的) |
| WorldName  | 存档名称                        |
| GameMode   | 默认游戏模式                    |
| IPv4       | IPv4 端口                       |
| IPv6       | IPv6 端口                       |

## LSE 如何调用？(这里以 JS 为例)

#### MotdAPI 提供三个接口,分别为<font color="##FFFF00">开始获取信息</font>,<font color="##FFFF00">获取信息</font>和<font color="##FFFF00">停止获取信息</font>

#### 你可能会问,为什么搞这么麻烦，直接<font color="#87CEFA"><strong>一个接口</strong></font>不行吗？

#### <font color="#FF0000">不行</font>,因为代码层面的限制,获取信息无法直接返回，我尽力了(T ^ T)

## 接下来是如何使用

> 请注意:你获取之前必须调用 开始获取信息 接口，也就是开启定时器,不然获取始终为`{}`

### 开始获取信息

`ll.import('MotdAPI','StartGetServerMotd')(IP,Port)`

-   IP : `String`  
     IP 地址
-   Port : `Number`  
     端口
-   返回值类型:`NULL`

### 获取信息

`ll.import('MotdAPI','GetServerMotd')(IP,Port)`

-   IP : `String`  
     IP 地址
-   Port : `Number`  
     端口
-   返回值类型:`Object`
-   返回值:  
     就 PAPI 上面有的属性 OvO

```json
{
    "Online": 0,
    "timer": -1,// 这个就不用管呐~什么你好奇？不告诉你，嘿嘿٩(๑>◡<๑)۶
    "Name": "Dedicated Server",
    "Protocol": 671,
    "MaxPlayers": 999,
    "Version": "1.20.81",
    "Hash": "11535137873719721344",
    "WorldName": "Bedrock level",
    "GameMode": "Survival",
    "port_v4": "19132",
    "port_v6": "19133"
}
```

### 停止获取信息

`ll.import('MotdAPI','StopGetServerMotd')(IP,Port)`

-   IP : `String`  
     IP 地址
-   Port : `Number`  
     端口
-   返回值类型:`NULL`

## 以下是一个 JavaScript 调用示例

```javascript
const IP = '127.0.0.1',Port = 19132;
mc.li
ll.import('MotdAPI','StartGetServerMotd')(IP,Port);// 先开启获取定时器
mc.listen('onJoin',() => {
    log(ll.import('MotdAPI','GetServerMotd')(IP,Port));// 玩家进服就可以打印啦~
});
ll.import('MotdAPI','StopGetServerMotd')(IP,Port);// 最后停止
```

#### 你可能会问，为什么要套 onJoin？

#### 我能怎么办(>\_<)，获取需要时间，这是代码层面的限制 QvQ

#### <font color="#F08080">你要是敢怪我，哼，我就不更新了(｡・`ω´･)</font>

#### 温馨提示：onServerStarted 触发时，依然没获取到，所以我只能用 onJoino(╥﹏╥)o 不过你也可以使用 jsdebug 来调试使用哦~

## 什么？你不想写 js 文件测试？这边支持控制台测试哦~

> 依次输入以下命令就行啦~

`jsdebug` - 进入 jsdebug 调试模式  
`let IP = 'IP地址',Port = 端口;` - 定义 IP 和端口，下面就不用麻烦的改啦٩(๑>◡<๑)۶  
`ll.import('MotdAPI','StartGetServerMotd')(IP,Port);` - 开始获取信息  
`ll.import('MotdAPI','GetServerMotd')(IP,Port)` - 获取信息  
`jsdebug` - 退出 jsdebug 调试模式咯~
