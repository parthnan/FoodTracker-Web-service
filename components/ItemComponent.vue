<template>
  <div>
  <br>
  <li v-if="item.title">Recipe: {{ item.title }}  </li>
  <ul>
  <li v-if="item.title" v-for="(list, index) in item.usedIngredients" role="presentation">
        {{list.original}}
  </li>
  <li v-if="item.title" v-for="(list, index) in item.missedIngredients" role="presentation">
        {{list.original}}
  </li>
  </ul>
  <li v-if="item.ing_name">商品名：{{ item.ing_name }}  </li>
  <li v-if="item.expiry_name">消費期限：{{ item.expiry_name }}  </li>
  <li v-if="item.discount">割引：{{ item.discount }}%  </li>
  <li v-if="item.map_url">スーパの位置：  </li>
  <span v-html="item.map_url" v-if="item.map_url"></span>
  <a href="https://www.qries.com/">
  <img :src="item.image" alt="" width="200"　>
  </a>
  </div>
</template>

<script>
  export default {
    mapps: '',
    props: ['item']
  }
</script>

<style scoped>
#content ul li {
list-style-Type: none;
padding: 0 0 4px 23px;
background: url(https://www.computerhope.com/arrow.gif) no-repeat left top;
}
  .removed {
    color: gray;
  }
  .removed label {
    text-decoration: line-through;
  }
  li {
    font-size: 18px;
    list-style-type: none;
	  background: -webkit-linear-gradient(#202, #535);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }
  li span {
    margin-left: 5px;
  }
</style>
