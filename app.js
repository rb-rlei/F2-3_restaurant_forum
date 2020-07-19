// 載入 express
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
// 載入餐廳清單的 json
const restaurant_list = require('./restaurant.json')

// 載入 handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入靜態資料
app.use(express.static('public'))

// 呈現 index 的頁面
// 首頁資料
app.get('/', (req, res) => {
  res.render('index', { restaurant_data: restaurant_list.results })
})

// 搜尋資料
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantDetail = restaurant_list.results.filter(function (key_in) {
    let wordsGroup = key_in.name.toLowerCase() + key_in.category.toLowerCase()
    return wordsGroup.includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant_data: restaurantDetail, keyword: keyword })
})

// 呈現 show 頁面
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurant_list.results.find(
    (store) => store.id.toString() === req.params.id
  )
  res.render('show', { restaurant_data: restaurant })
})

app.listen(port, () => {
  console.log(`express 已經成功設定在 http://localhost:${port}`)
})
