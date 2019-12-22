<template>
  <div>
  <h1>FOOD TRACKER</h1>
  <svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" result="cm" />
      <feBlend/>
  	</filter>     
    <radialGradient id="radial-gradient" cx="20.5" cy="20.32" fx="5.9753758345333345" fy="4.511207610428622" r="23.94" gradientUnits="userSpaceOnUse">
      <stop offset="0.43" stop-color="#feb829"/>
      <stop offset="0.53" stop-color="#fdb125"/>
      <stop offset="0.68" stop-color="#f99d1a"/>
      <stop offset="0.85" stop-color="#f47c09"/>
      <stop offset="0.92" stop-color="#f16c00"/>
    </radialGradient>
    <symbol id="Yolk" data-name="Yolk" viewBox="0 0 41 41">
      <circle cx="20.5" cy="20.5" r="20.5" fill="url(#radial-gradient)"/>
      <path d="M5.59,18.78A15,15,0,0,1,23.65,5.83" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    </symbol>
   
 </defs>
 <g class="whiteContainer" fill="#f6f6f6" filter="url(#goo)">
  
      <circle cx="280" cy="40" r="41"/>
      <circle cx="360" cy="40" r="41"/>
      <circle cx="440" cy="40" r="41"/>
      <circle cx="520" cy="40" r="41"/>
    </g>
 <g class="yolkContainer">
 <use width="41" height="41" xlink:href="#Yolk" x="260" y="20"/>
 <use width="41" height="41" xlink:href="#Yolk" x="340" y="20"/>
 <use width="41" height="41" xlink:href="#Yolk" x="420" y="20"/>
 <use width="41" height="41" xlink:href="#Yolk" x="500" y="20"/>
 </g>
</svg>
<h4>Let us make an effort to stop wastage of food! </h4>
<h4>Click the button below to get recipies and discount items! </h4>
  <span class="input-group-btn">
      <button @click="refresh" class="btn btn-default" type="button" align="center">Track Foodstuffs!</button>
  </span>
  <div id="app" class="container">
    <ul class="nav nav-tabs" role="tablist">
      <li :class= "index===0 ? 'active' : ''" v-for="(list, index) in shoppinglists" role="presentation">
        <a :href="'#' + list.id" :aria-controls="list.id" role="tab" data-toggle="tab">{{ list.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div :class= "index===0 ? 'active' : ''" v-for="(list, index) in shoppinglists" class="tab-pane" role="tabpanel" :id="list.id">
        <shopping-list-component :title="list.title" :items="list.items"></shopping-list-component>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import ShoppingListComponent from './components/ShoppingListComponent'
  import axios from 'axios'
  document.states = 1
  export default {
    components: {
      ShoppingListComponent
    },
    methods: {
      refresh () {
        axios.get('http://192.168.128.105:3000/api/v1/recipies_realtime')
        .then((response) => {
          this.shoppinglists[0].items = response.data[0]
          this.shoppinglists[2].items = response.data[1]
          this.shoppinglists[1].items = response.data[2]
          this.recipes = response.data[0]
        })
        .catch(function (error) { console.log(error) })
      }
    },
    data () {
      return {
        temp: '',
        recipes: '',
        foods: '',
        discount: '',
        search: 'start',
        shoppinglists: [
          {
            id: 'recipes',
            title: 'Recipes!',
            items: this.recipes
          },
          {
            id: 'groceries',
            title: 'Leftover Groceries!',
            items: this.foods
          },
          {
            id: 'discount',
            title: 'Discount Foods!',
            items: this.discount
          }
        ],
        computed: {
          pics () {
            return this.recipes.map((item) => {
              return item.pic_url
            })
          },
          names () {
            return this.recipes.map((item) => {
              return item.title
            })
          },
          filteredList () {
            return this.shoppinglists.filter(post => {
              return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
          }
        }
      }
    }
  }
</script>

<style>
svg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}
example_f {
   border-radius: 4px;
   background: linear-gradient(to right, #67b26b, #4ca2cb) !important;
   border: none;
   color: #FFFFFF;
   text-align: center;
   text-transform: uppercase;
   font-size: 22px;
   padding: 20px;
   width: 200px;
   transition: all 0.4s;
   cursor: pointer;
   margin: 5px;
 }
 .example_f span {
   cursor: pointer;
   display: inline-block;
   position: relative;
   transition: 0.4s;
 }
 .example_f span:after {
   content: '\00bb';
   position: absolute;
   opacity: 0;
   top: 0;
   right: -20px;
   transition: 0.5s;
 }
 .example_f:hover span {
   padding-right: 25px;
 }
 .example_f:hover span:after {
   opacity: 1;
   right: 0;
 }
 
a { color: #ff6600; transition: .5s; -moz-transition: .5s; -webkit-transition: .5s; -o-transition: .5s; font-family: 'Muli', sans-serif; }


a:hover { text-decoration: underline }


h1 {
  font-size: 72px;
  background: -webkit-linear-gradient(#202, #b9b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h4 {
  font-size: 22px;
  background: -webkit-linear-gradient(#300, #fc0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h1 a { font-family: 'Open Sans Condensed', sans-serif; font-size: 80px; color: #333; }
button { font-family: 'Open Sans Condensed', sans-serif; font-size: 25px; color: #333; }
h1 a:hover { color: #ff6600; text-decoration: none; }


p { color: #333; font-family: 'Muli', sans-serif; margin-bottom: 15px; }


a.more-link { color: white; font-weight: bold; font-size: 14px; font-family: Arial, Helvetica, sans-serif; padding: 3px 10px; background-color: #ff6600; border-radius: 5px; float: right; }


a.more-link:hover { text-decoration: none; background-color: #666; border-radius: 0px; }
  .container {
    width: 100%;
    margin: 20px auto 0px auto;
  }
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