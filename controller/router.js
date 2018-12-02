let file = require("../models/file.js");
/*一个Node.js模块，用于解析表单数据，尤其是文件上传。*/
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
let sd = require("silly-datetime");

/*显示首页*/
exports.showIndex = (req,res,next)=>{
    /*
    **node编程：异步操作；
    **内层函数：不是return回来的，而是高层函数中的回调函数通过参数调用来传递的。
     */
     file.getAllAlbums(function(err,allAlbums){
        /*err是字符串*/
        if(err){
            next(); /*交给下面适合他的中间件*/
            return;
        }
        res.render('index',{
            "albums" : allAlbums
        });
     });
}

/*显示相册*/
exports.showAlbum = (req,res,next)=>{
    /*遍历相册中的所有图片*/
    let albumName = req.params.albumName;
    /*具体业务交给models*/
    file.getAllImageByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next(); /*交给下面适合他的中间件*/
            return;
        }
        res.render('album',{
            'albumname': albumName,
            'images': imagesArray
        });
    });
}

/*显示上传*/
exports.showUp = (req,res,next)=>{
    file.getAllAlbums(function(err,albums){
        if(err){
            next();
            return;
        }
        res.render('up',{
         'albums': albums
        });
    });
}

/*上传表单*/
exports.doPost = (req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup/");
    form.parse(req, function(err, fields, files,next){
        console.log(files);
        /*改名*/
        if(err){
            next();
            return;
        }

        /*判断图片大小 */
        let imageSize = parseInt(files.tupian.size);
        if(imageSize > 1024*10){
            res.send('图片超过5m，请重新上传');
            /*删除临时文件*/
            fs.unlink(files.tupian.name);
            return;
        }

        /*生成随机名*/
        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        let weijianjia = fields.wenjianjia;
        let oldPath = files.tupian.path;
        let newPath = path.normalize(__dirname + "/../uploads/" + weijianjia + "/" + ttt + ran + extname);
        fs.rename(oldPath,newPath,function(err){
            if(err){
                res.send('改名失败');
                return;
            }
            res.send('成功');
        })
    });
}