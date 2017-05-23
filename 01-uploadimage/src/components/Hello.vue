<template>
  <div class="hello">
    <div v-if="!image">
      <h2>Select an image</h2>
      <input type="file" v-on:change="onFileChange">
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage" >Remove Image</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      image: ''
    }
  },
  methods: {
    onFileChange: function (event) {
      var files = event.target.files || event.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
img{
  width:30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
