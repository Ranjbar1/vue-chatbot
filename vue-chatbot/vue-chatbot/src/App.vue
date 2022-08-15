<script>
export default {
  name: "App",
  data() {
    return {
      messages: [],
      connection: null,
    };
  },
  created() {
    this.connection = new WebSocket("ws://echo.websocket.org");

    this.connection.onopen = () => {
      console.log("Connection established!");
    };
    this.connection.onmessage = (event) => {
      console.log(event.data);
      this.messages.push(event.data);
    };

    this.connection.onerror = (error) => {
      console.log(error);
    };
  },
  methods: {
    sendMessage(message) {
      console.log(message);
      this.connection.send(message);
      this.messages.push(message);
      return message;
    },
    onReset() {
      this.messages = [];
      this.s
      this.connection.close();
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>WebSocket</h1>
    <input type="text" v-model="message" @keyup.enter="sendMessage(message)" />
    <div class="buttons">
      <button @click="sendMessage(message)">Send</button>
      <button @click="onReset">Reset</button>
    </div>
    <br />
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
  </div>
</template>
<style>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
input {
  min-width: 300px;
  height: 30px;
  all: inherit;
  background-color: rgb(178, 253, 253);
  border: 2px solid rgb(17, 67, 231);
  border-radius: 5px;
  padding: 5px;
  color: black;
}
button {
  all: unset;
  border: 2px solid rgb(17, 67, 231);
  border-radius: 20px;
  padding: 0.5em 1em;
  margin: 0.5em;

  margin-top: 10px;
}
ul {
  color: hsla(160, 100%, 37%, 1);
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
