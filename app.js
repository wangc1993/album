let express = require('express');
let app = express();
/*控制器：let router = require('./controller/router.js');或者用下面的方式，不多需要设置入入口文件package.json*/
let router = require('./controller');

/*设置模板引擎*/
app.set("view engine", "ejs");

/*设置路由中间件，静态页面。将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了,就像apache里的www下的文件*/
app.use(express.static("./public"));
app.use(express.static("./uploads"));

/*首页,router.showIndex不要带参数*/
app.get("/", router.showIndex);
/*查看相册*/
app.get("/:albumName", router.showAlbum);
/*显示上传图片*/
app.get("/up", router.showUp);
/*上传图片*/
app.post('/up', router.doPost);

/*最后的中间件：404*/
app.use(function (req, res) {
    res.render("err");
});

app.listen(3000);