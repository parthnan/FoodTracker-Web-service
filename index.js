const express = require('express'); // expressモジュールを読み込む
const multer = require('multer'); // multerモジュールを読み込む
const uuidv4 = require('uuid/v4'); // uuidモジュールを読み込む
const cors = require('cors')
const axios = require('axios');

const app = express(); // expressアプリを生成する
app.use(multer().none()); // multerでブラウザから送信されたデータを解釈する
app.use(express.static('web')); // webフォルダの中身を公開する

app.use(cors())//全アクセス許可

// TODOリストデータ
const todoList = [];
//ランダム関数
function random(array, num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = Math.random() * l | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
  }
  

let i = 0;
// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/recipies', (req, res) => {
    
    // JSONを送信する
    console.log(String.raw`Listening on port ${getLocalAddress().ipv4[0].address}:3000`);

    //mongodb接続
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("testdb");
    const obj = {};
    // ----------------------------------------------------------------------
    // SELECT
    // ----------------------------------------------------------------------
    dbo.collection("test_menu").find(obj).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        
        res.json(result);
        db.close();
    });
    });
    

});




app.get('/api/v1/recipies_realtime', (req, res) => {
    
    // JSONを送信する
    console.log(String.raw`Listening on port ${getLocalAddress().ipv4[0].address}:3000`);

    //mongodb接続
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("testdb");
    const obj = {};
    // ----------------------------------------------------------------------
    // SELECT
    // ----------------------------------------------------------------------
    dbo.collection("test_ing").find(obj).toArray(function(err, result) {
        if (err) throw err;
        console.log(result.length);
        result_ing=random(result, 10);
        result_home=random(result, 10);
        result_ing.sort(function(a,b) {
            return (a.expiry_name > b.expiry_name ? 1 : -1);
        });
        result_home.sort(function(a,b) {
            return (a.expiry_name > b.expiry_name ? 1 : -1);
        });
        var foo = result_ing[0].ing_name;
        var bar = result_ing[1].ing_name;
        var hoge = result_home[0].ing_name;
        var hoge2 = result_home[1].ing_name;
        axios
        .get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${foo},+${bar},+${hoge},+${hoge2}&apiKey=338b2ebe61ad42fba375efbcdc2b22a3`)
        .then(response => (res.json([random(response.data, 5),result_ing,result_home])))
        .catch(error => (this.info = error));
        
        db.close();
    });
    });
    

});



app.get('/api/v1/ing', (req, res) => {
    
    // JSONを送信する
    console.log(String.raw`Listening on port ${getLocalAddress().ipv4[0].address}:3000`);

    //mongodb接続
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("testdb");
    const obj = {};
    // ----------------------------------------------------------------------
    // SELECT
    // ----------------------------------------------------------------------
    dbo.collection("test_ing").find(obj).toArray(function(err, result) {
        if (err) throw err;
        console.log(result.length);
        result_ing=random(result, 10);
        result_ing.sort(function(a,b) {
            return (a.expiry_name > b.expiry_name ? 1 : -1);
        });
        res.json(result_ing);
        db.close();
    });
    });
    

});

app.post('/api/v1/map', (req, res) => {
    // JSONを送信する
    console.log(String.raw`Listening on port ${getLocalAddress().ipv4[0].address}:3000`);
    const mapData = req.body;
    console.log(mapData.body);
    const marketmapData = mapData.market;
    console.log(marketmapData);

    //mongodb接続
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("testdb");
    const obj = {market_name:marketmapData};
    // ----------------------------------------------------------------------
    // SELECT
    // ----------------------------------------------------------------------
    dbo.collection("test_map").find(obj).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
    });
    });
    

});




app.post('/api/v1/serch', (req, res) => {
    // クライアントからの送信データを取得する
    console.log(req.body);
    const todoData = req.body;
    const todoTitle = todoData.title;

    // ユニークIDを生成する
    const id = uuidv4();

    // TODO項目を作る
    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    // TODOリストに項目を追加する
    todoList.push(todoItem);

    // コンソールに出力する
    console.log('Add: ' + JSON.stringify(todoItem) + '　配列数: ' +todoList.length);
    
    // 追加した項目をクライアントに返す
    res.json(todoItem);
    
});




// http://localhost:3000/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
    // クライアントからの送信データを取得する
    console.log(req.body);
    const todoData = req.body;
    const todoTitle = todoData.title;

    // ユニークIDを生成する
    const id = uuidv4();

    // TODO項目を作る
    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    // TODOリストに項目を追加する
    todoList.push(todoItem);

    // コンソールに出力する
    console.log('Add: ' + JSON.stringify(todoItem) + '　配列数: ' +todoList.length);
    
    // 追加した項目をクライアントに返す
    res.json(todoItem);
    
});





// http://localhost:3000/api/v1/item/:id にDELETEで送信してきたときに
// 項目を削除する。:idの部分にはIDが入る
// 例えば
// http://localhost:3000/api/v1/item/cc7cf63c-ccaf-4401-a611-f19daec0f74e
// にDELETEメソッドでアクセスすると、idがcc7cf63c-ccaf-4401-a611-f19daec0f74eのものが削除される
app.delete('/api/v1/item/:id', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    const index = todoList.findIndex((item) => item.id === req.params.id);

    // 項目が見つかった場合
    if(index >= 0) {
        const deleted = todoList.splice(index, 1); // indexの位置にある項目を削除
        console.log('Delete: ' + JSON.stringify(deleted[0]));
    }

    // ステータスコード200:OKを送信
    res.sendStatus(200);
});

// DELETEとほぼ同じ
app.put('/api/v1/item/:id', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    const index = todoList.findIndex((item) => item.id === req.params.id);

    // 項目が見つかった場合
    if(index >= 0) {
        const item = todoList[index];
        if(req.body.done) {
            item.done = req.body.done === 'true';
        }
        console.log('Edit: ' + JSON.stringify(item));
    }

    // ステータスコード200:OKを送信
    res.sendStatus(200);
});


var os = require('os');


function getLocalAddress() {
    var ifacesObj = {}
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        ifacesObj.ipv4.push({name:dev, address:details.address});
                    break;
                    case "IPv6":
                        ifacesObj.ipv6.push({name:dev, address:details.address})
                    break;
                }
            }
        });
    }
    return ifacesObj;
};


// ポート3000でサーバを立てる
app.listen(3000, () => console.log(String.raw`Listening on port ${getLocalAddress().ipv4[0].address}:3000`));