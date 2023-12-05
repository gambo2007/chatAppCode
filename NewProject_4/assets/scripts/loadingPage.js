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
    
    update (dt) {},
    onSubmit(){

        if (this.editboxName.string.trim() === '') {
            this.warningLabel.string = 'Please enter a name.';
            return;
        } else {
            this.warningLabel.string = '';
        }
        this.User ={
            name: this.editboxName.string,
        }

        cc.log(this.User);
        var jsonString = JSON.stringify(this.playerData);
        cc.sys.localStorage.setItem("gameData", jsonString);
        cc.log("Game data saved!");
        this.loadingPage.node.active = false;
        this.chatingPage.node.active = true;

    },

});
