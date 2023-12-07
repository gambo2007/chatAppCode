const io = require('socket.io-client');
cc.Class({
    extends: cc.Component,

    properties: {
        editboxName:cc.EditBox,
        button:cc.Button,
        loadingPage: cc.Layout,
        chatingPage: cc.Layout,
        warningLabel:cc.Label,
    },
    onLoad () {
        this.User = {
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
        this.socket = io('http://localhost:8080');
        this.User ={
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

});
