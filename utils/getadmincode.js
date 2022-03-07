var config = require('./config.js'),
    common=require('./common.js');
//通过户籍地址来获取行政区划码
module.exports.addresscode = function( e , token , onlyarray , codearray , addressCode){
            if(e == ''){
                let   get_Addressurl = config.hurl + 'areacode/area?code=&level=1&pcode=&name=&offset=0&limit=999';
                return new Promise(function (resolve, reject) {
                      wx.request({
                        url: encodeURI(get_Addressurl),
                        data: '',
                        method: 'GET',
                        header: { 'Authorization': token },
                        success: function (res) {
                            var relist=''
                            if(res.data.data != null && res.data.data != '' && res.data.code =='0'){
                                let  List = res.data.data;
                                for (var i = List.length - 1; i >= 0; i--) {
                                    codearray[0].push(List[i].code)
                                    onlyarray[0].push(List[i].name)
                                }
                                    onlyarray[0].unshift("请选择");
                                    onlyarray[1].push("请选择");
                                    onlyarray[2].push("请选择");
                                    onlyarray[3].push("请选择");
                                    relist ={ onlyArray : onlyarray, codeArray : codearray};
                            }   
                            resolve (relist)
                        }
                      })
                    })
            }else{
                if (e.detail.column == 0) {
                    if (e.detail.value == 0) {
                        return new Promise(function (resolve, reject) {
                            onlyarray[2] = [];
                            onlyarray[2].push("请选择");
                            onlyarray[3] = [];
                            onlyarray[3].push("请选择");
                            onlyarray[1] = [];
                            onlyarray[1].push("请选择")
                            codearray[1]=[]
                            codearray[2]=[]
                            codearray[3]=[]
                            resolve ({onlyArray : onlyarray , codeArray : codearray})
                        })
                    
                    } else {
                        var index = e.detail.value - 1,
                            obj={},
                            get_url = config.hurl + 'areacode/area?code=&level=2&pcode=' + codearray[0][index] + '&name=&offset=0&limit=999';
                            return new Promise(function (resolve, reject) {
                                wx.request({
                                    url : encodeURI(get_url),
                                    data : '',
                                    method : 'GET',
                                    header : { 'Authorization': token },
                                    success : function(res){
                                             onlyarray[1] = [];
                                             onlyarray[1].push("请选择")
                                             onlyarray[2] = [];
                                             onlyarray[2].push("请选择");
                                             onlyarray[3] = [];
                                             onlyarray[3].push("请选择");
                                             codearray[1]=[]
                                             codearray[2]=[]
                                             codearray[3]=[]
                                        if(res.data.data != null && res.data.data != '' && res.data.code =='0'){
                                            var list = res.data.data;
                                                onlyarray[1] = ['请选择'];
                                                    for (var i = list.length - 1; i >= 0; i--) {
                                                        codearray[1].push( list[i].code )
                                                        onlyarray[1].push( list[i].name )
                                                    }
                                                    obj={ onlyArray : onlyarray, codeArray : codearray }
                                            }
                                            resolve(obj)
                                        }
                                    })
                                })
                            }  
                } else if (e.detail.column == 1) {
                    if (e.detail.value == 0) {
                        return new Promise(function (resolve, reject) {
                            onlyarray[2] = [];
                            onlyarray[2].push("请选择");
                            onlyarray[3] = [];
                            onlyarray[3].push("请选择")
                            onlyarray[2]=[]
                            codearray[3]=[]
                            resolve ({onlyArray : onlyarray , codeArray : codearray})
                        })
                    } else {
                        var index = e.detail.value - 1,
                            obj={},
                            get_url = config.hurl + 'areacode/area?code=&level=3&pcode=' + codearray[1][index] + '&name=&offset=0&limit=999';
                            return new Promise(function (resolve, reject) {
                                wx.request({
                                    url : encodeURI(get_url),
                                    data : '',
                                    method : 'GET',
                                    header : { 'Authorization': token },
                                    success : function(res){
                                        onlyarray[2] = [];
                                        onlyarray[2].push("请选择");
                                        onlyarray[3] = [];
                                        onlyarray[3].push("请选择");
                                        codearray[2]=[]
                                        codearray[3]=[]
                                        if(res.data.data != null && res.data.data != '' && res.data.code =='0'){
                                            var list = res.data.data;
                                                onlyarray[2] = ['请选择'];
                                                    for (var i = list.length - 2; i >= 0; i--) {
                                                        codearray[2].push( list[i].code )
                                                        onlyarray[2].push( list[i].name )
                                                    }
                                                    obj={ onlyArray : onlyarray, codeArray : codearray }
                                            }
                                            resolve(obj)
                                        }
                                    })
                            })
                        }  
                    } else if (e.detail.column == 2) {
                        if (e.detail.value == 0) {
                                return new Promise(function (resolve, reject) {
                                    onlyarray[3] = [];
                                    onlyarray[3].push("请选择");
                                    codearray[3]=[]
                                    resolve ({onlyArray : onlyarray , codeArray : codearray})
                                })
                        } else {
                            var index = e.detail.value - 1,
                                obj={},
                                get_url = config.hurl + 'areacode/area?code=&level=4&pcode=' + codearray[2][index] + '&name=&offset=0&limit=999';
                                return new Promise(function (resolve, reject) {
                                    wx.request({
                                        url : encodeURI(get_url),
                                        data : '',
                                        method : 'GET',
                                        header : { 'Authorization': token },
                                        success : function(res){
                                            onlyarray[3] = [];
                                            onlyarray[3].push("请选择");
                                            codearray[3]=[]
                                            if(res.data.data != null && res.data.data != '' && res.data.code =='0'){
                                                var list = res.data.data;
                                                    onlyarray[3] = ['请选择'];
                                                        for (var i = list.length - 1; i >= 0; i--) {
                                                            codearray[3].push( list[i].code )
                                                            onlyarray[3].push( list[i].name )
                                                        }
                                                        obj={ onlyArray : onlyarray, codeArray : codearray }
                                                }else{
                                                    onlyarray[3] = ['暂无数据'];
                                                    var list = res.data.data;
                                                        obj={ onlyArray : onlyarray, codeArray : codearray }
                                                }
                                                resolve(obj)
                                            }
                                        })
                                })
                        }
                    } else if (e.detail.column == 3) {
                        return new Promise(function (resolve, reject) {
                                var  index = e.detail.value - 1,
                                     obj=codearray[3][index];
                                     resolve (obj.toString())
                        })
                    }
                    else{
                        return new Promise(function (resolve, reject) {
                            var  index = e.detail.value,
                                 obj=onlyarray[0][index[0]]+onlyarray[1][index[1]]+onlyarray[2][index[2]]+onlyarray[3][index[3]];
                                 resolve (obj)
                    })   
                    }
                }
            }