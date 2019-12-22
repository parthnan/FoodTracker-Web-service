<template>
  <div>
  
  
  </div>
  </div>
</template>

<script>
  class Post {
    constructor (title, link, author, img) {
      this.title = title
      this.link = link
      this.author = author
      this.img = img
    }
  }
  export default {
    data () {
      return {
        search: '',
        postList: [
          new Post(
            'Feathers.js',
            'http://feathersjs.com/',
            'Chuck',
            'https://cdn.worldvectorlogo.com/logos/feathersjs.svg'
          ),
          new Post(
            'Vue.js',
            'https://vuejs.org/',
            'Chuck',
            'https://vuejs.org//images/logo.png'
          )
        ]
      }
    },
    computed: {
      filteredList () {
        return this.shoppinglists.filter(post => {
          return post.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    methods: {
      addItem () {
        var text

        text = this.newItem.trim()
        if (text) {
          this.$emit('add', this.newItem)
          this.newItem = ''
        }
      }
    }
  }
</script>

<style scoped>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .search-wrapper {
    position: relative;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
    input {
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
  }

  .wrapper {
    display: flex;
    max-width: 444px;
    flex-wrap: wrap;
    padding-top: 12px;
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    max-width: 124px;
    margin: 12px;
    transition: .15s all ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
    a {
      text-decoration: none;
      padding: 12px;
      color: #03A9F4;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 100px;
      }
      small {
        font-size: 10px;
        padding: 4px;
      }
    }
  }
  
  .hotpink {
    background: hotpink;
  }

  .green {
    background: green;
  }

  .box {
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0,0,0,.12);
  }
}
</style>
