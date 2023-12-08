const io = require('socket.io-client');

cc.Class({
    extends: cc.Component,

    properties: {
        chatPage : cc.Layout,
        avatar : cc.Sprite,
        username : cc.Label,
        editboxChat:cc.EditBox,
        content:cc.Node,
        sendMessageFrame:cc.Prefab,
        receiveMessageFrame:cc.Prefab,
        scrollView : cc.ScrollView,
        Atlas:cc.SpriteAtlas,
    },
    onLoad () {
        this.editboxChat.node.on('editing-return', this.onEditingReturn, this);
        this.editboxChat.node.on('editing-did-ended', this.onEditingDidEnded, this);


        this.socket = io('https://tai-q7th.onrender.com');
        this.img = this.Atlas.getSpriteFrames();
        var jsonString = cc.sys.localStorage.getItem("gameData");
        var loadData = JSON.parse(jsonString);

        for (let num in this.img) {
            if (this.img[num].name === loadData.id) {
                this.avatar.spriteFrame = this.Atlas.getSpriteFrames()[num];
            }
        }
        this.username.string = loadData.name;

        this.userChatData ={
            nameUser:"",
            avatar:"",
            message: "",
            socketID:"",
        }

        this.socket.on('messageData',(data)=>{
            this.chatData = JSON.parse(data.message);
            cc.log(this.chatData.avatar);
            this.onLeftMessage(this.chatData.nameUser,this.chatData.avatar,this.chatData.message,this.chatData.socketID);
        })
        
    },
    onEditingDidEnded() {
        this.editboxChat.focus();
    },


    onEditingReturn() {
        this.onRightMessage();
        this.editboxChat.string = "";
        this.editboxChat.focus();
    },

    onRightMessage(){
        const rightPrefab = cc.instantiate(this.receiveMessageFrame);
        rightPrefab.getChildByName('avatarR').getComponent(cc.Sprite).spriteFrame = this.avatar.spriteFrame;
        rightPrefab.getChildByName('avatarR').getChildByName('nameR').getComponent(cc.Label).string = this.username.string;
        rightPrefab.getChildByName('messageR').getComponent(cc.Label).string = this.editboxChat.string;
        rightPrefab.setParent(this.scrollView.content);
        this.scrollView.scrollToBottom();


        this.userChatData ={
            nameUser:this.username.string,
            avatar:this.avatar.spriteFrame.name,
            message:this.editboxChat.string,
            socketID:this.socket.id,
        }


        var jsonString = JSON.stringify(this.userChatData);
        this.socket.emit('messageData',{message:jsonString});

    },

    onLeftMessage(nameUser,avatar,message,socketID){
        if(socketID !== this.socket.id){
            const leftPrefab = cc.instantiate(this.sendMessageFrame);
            leftPrefab.getChildByName('avatarS').getComponent(cc.Sprite).spriteFrame = this.setAvatar(avatar);
            leftPrefab.getChildByName('avatarS').getChildByName('nameS').getComponent(cc.Label).string = nameUser;
            leftPrefab.getChildByName('messageS').getComponent(cc.Label).string = message;


            leftPrefab.setParent(this.scrollView.content);
            this.scrollView.scrollToBottom();
        }
    },
    setAvatar(imgAva){
        for (let num in this.img) {
            if (this.img[num].name === imgAva) {
                return this.Atlas.getSpriteFrames()[num];
            }
        }
    }


});
