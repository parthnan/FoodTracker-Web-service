<template>
  <div>
    <h2>{{ title }}</h2>
    <add-item-component @add="addItem"></add-item-component>
	<div class="input-group">
    <input type="text" @keyup.enter="filteredList" v-model="search" placeholder="Search Title" class="form-control">
    </div>
    <items-component :items="items"></items-component>
    <div class="footer">
      <hr />
      <change-title-component v-model="title"></change-title-component>
    </div>
  </div>
</template>

<script>
  import AddItemComponent from './AddItemComponent'
  import ItemsComponent from './ItemsComponent'
  import ChangeTitleComponent from './ChangeTitleComponent'

  export default {
    components: {
      AddItemComponent,
      ItemsComponent,
      ChangeTitleComponent
    },
    computed: {
      filteredList () {
        this.items = this.items.filter(items => {
          return items.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    props: ['title', 'items'],
    methods: {
      addItem (text) {
        this.items.push({
          text: text,
          checked: false
        })
      }
    }
  }
</script>

<style scoped>
  .footer {
    font-size: 0.7em;
    margin-top: 20vh;
  }
  h2 {
    font-size: 30px;
    list-style-type: none;
  }
</style>