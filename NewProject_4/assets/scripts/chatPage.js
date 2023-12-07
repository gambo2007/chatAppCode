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
        scrollView : cc.ScrollView
    },
    onLoad () {
        this.editboxChat.node.on('editing-return', this.onEditingReturn, this);
        this.editboxChat.node.on('editing-did-ended', this.onEditingDidEnded, this);


        this.socket = io('http://localhost:8080');
        var jsonString = cc.sys.localStorage.getItem("gameData");
        var loadData = JSON.parse(jsonString);
        this.username.string = loadData.name;

        this.userChatData ={
            nameUser:"",
            message: "",
            socketID:"",
        }

        this.socket.on('messageData',(data)=>{
            cc.log(this.socket.id)
            cc.log(data.socketID)
            this.chatData = JSON.parse(data.message);

            this.onLeftMessage(this.chatData.nameUser,this.chatData.message,this.chatData.socketID);
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
        rightPrefab.getChildByName('avatarR').getChildByName('nameR').getComponent(cc.Label).string = this.username.string;
        rightPrefab.getChildByName('avatarR').getChildByName('nameR').getChildByName('messageR').getComponent(cc.Label).string = this.editboxChat.string;
        rightPrefab.setParent(this.scrollView.content);

        this.userChatData ={
            nameUser:this.username.string,
            message:this.editboxChat.string,
            socketID:this.socket.id,
        }

        var jsonString = JSON.stringify(this.userChatData);
        this.socket.emit('messageData',{message:jsonString});

    },

    onLeftMessage(nameUser,message,socketID){
        cc.log(socketID)
        if(socketID !== this.socket.id){
            cc.log(socketID);
            cc.log(this.socket.id);
            const leftPrefab = cc.instantiate(this.sendMessageFrame);
            leftPrefab.getChildByName('avatarS').getChildByName('nameS').getComponent(cc.Label).string = nameUser;
            leftPrefab.getChildByName('avatarS').getChildByName('nameS').getChildByName('messageS').getComponent(cc.Label).string = message;


            leftPrefab.setParent(this.scrollView.content);
        }
    }


});
