var socket = io();

new Vue({
  el: '#app',
  data: {
    connectUsers: [],
    messages: [],
    message: {
      type: "",
      action: "",
      user: "",
      text: "",
      timestamp: "",
    },
    areTyping: []
  },
  created: function () {
      // if server emits 'user joined', update connectedUser array
      socket.on("user joined", function(socketId) {
        console.log(socketId);
        axios.get('/onlineusers')
          .then(function (res) {
            for(var key in res.data) {
              if(this.connectUsers.indexOf(key) <= -1) {
                this.connectUsers.push(key);
              }
            }
          }.bind(this))
          console.log(this.connectUsers);
      }.bind(this));
      // if server emits 'chat.message', update messages array
      socket.on('chat.message', function(message) {
        this.messages.push(message)
      }.bind(this));
      socket.on('user left', function (socketId) {
        var index = this.connectUsers.indexOf(socketId);
        if (index >=0) {
          this.connectUsers.splice(index,1);
        }
      }.bind(this))
  },
  methods: {
    send: function () {
      this.message.type = "chat";
      this.message.user = socket.id;
      socket.emit('chat.message', this.message);
      this.message.type = '';
      this.message.user = '';
      this.message.text = '';
    },
    userIsTyping: function (username) {

    },
    usersAreTyping: function () {

    },
    stoppedTyping: function () {

    }
  }
})
