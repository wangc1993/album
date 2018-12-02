/*modules是用来执行具任务的*/
/*引入文件系统*/
let fs = require("fs");

exports.getAllAlbums = (callback)=>{
    fs.readdir('./uploads/',function(err,files){
        if(err){
            callback("没有找到uploads文件",null);
            return;
        }
        /*定义一个数组来存储相册*/
        let allAlbums = [];
        /*遍历uploads文件夹:使用迭代器避免异步带来的问题*/
        (function iterator(i){
            if(i == files.length){
                /*遍历结束*/
                callback(null,allAlbums);
                return;
            }
            /*获取文件信息*/
            fs.stat('./uploads/' + files[i],function(err,stats){
                /* stats 是 fs.Stats 对象。fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性*/
                if(err){
                    callback("找不到文件" + files[i] , null);
                    return;
                }
                /*如果是目录返回 true，否则返回 false。*/
                if(stats.isDirectory()){
                    /*向数组中增加文件名*/
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}

/*通过文件名，得到所有图片*/
exports.getAllImageByAlbumName = (albumName,callback)=>{
    fs.readdir('./uploads/' + albumName,function(err,files){
        if(err){
            callback("没有找到uploads文件",null);
            return;
        }
        /*定义一个数组来存储相册*/
        let allImages = [];
        /*遍历uploads文件夹:使用迭代器避免异步带来的问题*/
        (function iterator(i){
            if(i == files.length){
                /*遍历结束*/
                callback(null,allImages);
                return;
            }
            /*获取文件信息*/
            fs.stat('./uploads/' + albumName + '/' + files[i],function(err,stats){
                /* stats 是 fs.Stats 对象。fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性*/
                if(err){
                    callback("找不到文件" + files[i] , null);
                }
                /*如果是图片返回 true，否则返回 false。*/
                if(stats.isFile()){
                    /*向数组中增加文件名*/
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}