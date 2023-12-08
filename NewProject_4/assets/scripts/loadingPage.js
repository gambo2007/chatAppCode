const io = require('socket.io-client');
cc.Class({
    extends: cc.Component,

    properties: {
        editboxName:cc.EditBox,
        button:cc.Button,
        loadingPage: cc.Layout,
        chatingPage: cc.Layout,
        warningLabel:cc.Label,
        Atlas :cc.SpriteAtlas,
        avatar :cc.Sprite,
        avatarDialog:cc.Layout,

    },
    onLoad () {
        this.id = 0;
        this.img = this.Atlas.getSpriteFrames();
        this.avatar.spriteFrame = this.img[this.id];
        this.User = {
            id:"",
            name:"",
        }
        this.jsonString ='';
    },

    start () {

    },
    onSubmit(){
        if (this.editboxName.string.trim() === '') {
            this.warningLabel.string = 'Please enter a name.';
            return;
        } else {
            this.warningLabel.string = '';
        }
        this.socket = io('https://tai-q7th.onrender.com');
        this.User ={
            id:this.avatar.spriteFrame.name,
            name: this.editboxName.string,
        }
        cc.log(this.User);
        
        var jsonString = JSON.stringify(this.User);
        cc.sys.localStorage.setItem("gameData", jsonString);

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.emit('gameData',{message:jsonString});

        this.loadingPage.node.active = false;
        this.chatingPage.node.active = true;

    },
    onClickShowDiaLog(){
        if(!this.avatarDialog.node.active)
            this.avatarDialog.node.active =true;
        else
            this.avatarDialog.node.active =false;
    }

});
