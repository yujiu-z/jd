// pages/informationSheet/informationSheet.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
var nowTime = common.getTime().slice(0, 10);
var admincode = require('../../utils/getadmincode.js');
Page({
    data: {
        newr: '0',
        idnum: '',
        recordId: '',
        groupShow: false,
        inputDis: true,
        fatherHave: false,
        motherHave: false,
        brotherHave: false,
        childHave: false,
        Upload: true,
        isUploaded: false,
        u_token: '',
        u_id: '',
        u_name: '',
        nowTime: '',
        sex:['男', '女', '不详'],
        stay: ['与子女同住', '与亲友同住','孤寡','独居','与配偶同住'],
        nation: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族',
            '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族',
            '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族',
            '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族',
            '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族',
            '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族', '不详'
        ],
        Documentstatuslist: ['简档', '正常','---'],
        Documentstatus: 2,//0-简档 1--正常 2--为---
        bloodtype: ['A型', 'B型', 'O型', 'AB型', 'RH阴性', '不详'],
        education: ['--', '研究生', '大学本科', '大学专科和专科学校', '中等专业学校', '技工学校', '高中', '初中', '小学', '文盲或半文盲', '不详'],
        occupation: ['国家机关、党群组织、企业、事业单位负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔、水利业生产人员', '生产、运输设备操作人员及有关人员', '军人', '不便分类的其他从业人员'],
        marry: ['未婚', '已婚', '丧偶', '离婚', '未说明的婚姻状况'],
        pay: ['城镇职工基本医疗保险', '城镇居民医疗保险', '贫困救助', '商业医疗保险', '全公费', '全自费', '其他'],
        irritabilityindex: ['0'],
        irritability: [{ 'name': '无', 'checked': true, 'value': '0' }, { 'name': '青霉素', 'checked': false, 'value': '1' }, { 'name': '磺胺', 'checked': false, 'value': '2' }, { 'name': '链霉素', 'checked': false, 'value': '3' }, { 'name': '其他', 'checked': false, 'value': '4', 'content': "" }],
        exposeindex: ['0'],
        expose: [{ "value": "0", 'name': '无', 'checked': true }, { 'value': '1', 'name': '化学品', 'checked': false }, { 'value': '2', 'name': '毒物', 'checked': false }, { 'value': '3', 'name': '射线', 'checked': false }],
        jwIllness: ['无', '高血压', '糖尿病', '冠心病', '慢性阻塞性肺疾病', '恶性肿瘤', '脑卒中', '严重精神障碍', '结核病', '肝炎', '其他法定传染病', '其他'],
        illness: ['高血压', '糖尿病', '冠心病', '慢性阻塞性肺疾病', '恶性肿瘤', '脑卒中', '严重精神障碍', '结核病', '肝炎', '其他法定传染病', '其他'],
        fatherIll: [{
                value: '2',
                checked: false
            },
            {
                value: '3',
                checked: false
            },
            {
                value: '4',
                checked: false
            },
            {
                value: '5',
                checked: false
            },
            {
                value: '6',
                checked: false
            },
            {
                value: '7',
                checked: false
            },
            {
                value: '8',
                checked: false
            },
            {
                value: '9',
                checked: false
            },
            {
                value: '10',
                checked: false
            },
            {
                value: '11',
                checked: false
            },
            {
                value: '12',
                checked: false,
                ill: ''
            }
        ],
        motherIll: [{
                value: '2',
                checked: false
            },
            {
                value: '3',
                checked: false
            },
            {
                value: '4',
                checked: false
            },
            {
                value: '5',
                checked: false
            },
            {
                value: '6',
                checked: false
            },
            {
                value: '7',
                checked: false
            },
            {
                value: '8',
                checked: false
            },
            {
                value: '9',
                checked: false
            },
            {
                value: '10',
                checked: false
            },
            {
                value: '11',
                checked: false
            },
            {
                value: '12',
                checked: false,
                ill: ''
            }
        ],
        brotherIll: [{
                value: '2',
                checked: false
            },
            {
                value: '3',
                checked: false
            },
            {
                value: '4',
                checked: false
            },
            {
                value: '5',
                checked: false
            },
            {
                value: '6',
                checked: false
            },
            {
                value: '7',
                checked: false
            },
            {
                value: '8',
                checked: false
            },
            {
                value: '9',
                checked: false
            },
            {
                value: '10',
                checked: false
            },
            {
                value: '11',
                checked: false
            },
            {
                value: '12',
                checked: false,
                ill: ''
            }
        ],
        childIll: [{
                value: '2',
                checked: false
            },
            {
                value: '3',
                checked: false
            },
            {
                value: '4',
                checked: false
            },
            {
                value: '5',
                checked: false
            },
            {
                value: '6',
                checked: false
            },
            {
                value: '7',
                checked: false
            },
            {
                value: '8',
                checked: false
            },
            {
                value: '9',
                checked: false
            },
            {
                value: '10',
                checked: false
            },
            {
                value: '11',
                checked: false
            },
            {
                value: '12',
                checked: false,
                ill: ''
            }
        ],
        disabilityindex: ['0'],
        disability: [{ 'value': '0', 'name': '无残疾', 'checked': true }, { 'value': '1', 'name': '视力残疾', 'checked': false }, { 'value': '2', 'name': '听力残疾', 'checked': false }, { 'value': '3', 'name': '言语残疾', 'checked': false }, { 'value': '4', 'name': '肢体残疾', 'checked': false }, { 'value': '5', 'name': '智力残疾', 'checked': false }, { 'value': '6', 'name': '精神残疾', 'checked': false }, { 'value': '7', 'name': '其他残疾', 'checked': false, 'content': '' }],
        kitchen: ['油烟机', '换气扇', '烟囱', '无'],
        fuel: ['液化气', '煤', '天然气', '沼气', '柴火', '其他'],
        water: ['自来水', '经净化过滤的水', '井水', '河湖水', '塘水', '其他'],
        toilet: ['卫生厕所', '一格或二格粪池式', '马桶', '露天粪坑', '简易棚厕'],
        livestock: ['无', '单设', '室内', '室外'],
        groupList: [{
                name: '高血压管理',
                value: '001',
                checked: false
            },
            {
                name: '糖尿病管理',
                value: '002',
                checked: false
            },
            {
                name: '肺结核管理',
                value: '003',
                checked: false
            },
            {
                name: '恶性肿瘤管理',
                value: '004',
                checked: false
            },
            {
                name: '精神障碍管理',
                value: '007',
                checked: false
            },
            {
                name: '孕产妇管理',
                value: '005',
                checked: false
            },
        ],
        groupChoose: [],
        register: '',
        cover: {
            name: '',
            code: '',
            address: '',
            phone: '',
            streetName: '',
            village: '',
            unit: '',
            person: '',
            doctor: '',
            createDate: ''
        },
        base: {
            name: '',
            code: '',
            birthday: '',
            idnum: '',
            registeredplace:'',
            age:'',
            unit: '',
            phone: '',
            agentname:'',
            relation:'',
            agentadress:'',
            agentphone:'',
            sex:'0',
            stay: '0',
            marry:'0',
            nation: '0',
           
        },
        JYToken:'',
        nameDis: true,
        Nativeplace: '选择省市区街道',
        nowaddress: '选择省市区街道',
        onlyArray: [
            [],
            [],
            [],
            []
        ],
        nowonlyArray: [
            [],
            [],
            [],
            []
        ],
        codeArray: [
            [],
            [],
            [],
            []
        ],
        nowcodeArray: [
            [],
            [],
            [],
            []
        ],
        addressCode: '',
        nowaddressCode: '',
        teamId:''
    },

    onLoad(options) {
       
        var base = this.data.base,
            cover = this.data.cover;
        base.birthday = options.id == '' ? nowTime : options.id.slice(6, 10) + '-' + options.id.slice(10, 12) + '-' + options.id.slice(12, 14);
        base.illnessDate = nowTime;
        base.operationDate = nowTime;
        base.injuryDate = nowTime;
        base.bloodDate = nowTime;
        base.idnum = options.id;
        base.code = options.id;
        cover.createDate = nowTime;
        cover.code = options.id;
        this.setData({ idnum: options.id, nowTime: nowTime, newr: options.newr })
        var that = this;
        that.getToken();
        wx.getStorage({
            key: 'JYToken',
            success: function(res) {
                var JYToken = res.data;
                that.setData({JYToken:JYToken})
                wx.getStorage({
                    key: 'teamId',
                    success: function(res) {
                        var   teamId=res.data
                        that.setData({teamId:teamId})
                        
                    }
                })
                if (options.newr == '0') {
                    base.name = options.username;
                    cover.name = options.username;
                    that.setData({ base: base, cover: cover })
                    that.getInfo(u_token, options.id)
                    admincode.addresscode('', u_token, that.data.onlyArray, that.data.codeArray).then(obj => {
                            that.setData({ onlyArray: obj.onlyArray, codeArray: obj.codeArray })
                        }) //获取户籍住址
                    admincode.addresscode('', u_token, that.data.nowonlyArray, that.data.nowcodeArray).then(obj => {
                            that.setData({ nowonlyArray: obj.onlyArray, nowcodeArray: obj.codeArray })
                        }) //获取现在地址
                } else {
                    var birth = options.id.slice(6, 10) + '-' + options.id.slice(10, 12) + '-' + options.id.slice(12, 14);
                    base.birthday = birth;
                    if (options.sex != '') { base.sex = options.sex; } else if (options.id != '') { base.sex = options.id[16] % 2 == 0 ? '2' : '1' }
                    cover.name = options.name;
                    base.name = options.name;
                    if (options.name == '') { that.setData({ nameDis: false }) }
                    that.setData({ base: base, cover: cover, inputDis: false })
                    // admincode.addresscode('', u_token, that.data.onlyArray, that.data.codeArray).then(obj => {
                    //         that.setData({ onlyArray: obj.onlyArray, codeArray: obj.codeArray })
                    //     }) //获取户籍住址
                    // admincode.addresscode('', u_token, that.data.nowonlyArray, that.data.nowcodeArray).then(obj => {
                    //         that.setData({ nowonlyArray: obj.onlyArray, nowcodeArray: obj.codeArray })
                    //     }) //获取现地址
                }
                wx.getStorage({
                    key: 'myId',
                    success: function(res) {
                        var u_id = res.data;
                        wx.getStorage({
                            key: 'docName',
                            success: function(res) {
                                cover.person = res.data;
                                cover.doctor = res.data;
                                that.setData({ u_token: u_token, u_id: u_id, u_name: res.data, cover: cover })
                            }
                        })
                    }
                })
                wx.getStorage({
                    key: 'docUnit',
                    success: function(res) {
                        cover = that.data.cover;
                        cover.unit = res.data;
                        that.setData({ cover })
                    }
                })
            }
        })
    },
    getToken: function() {
        var token = '',
            data = {
                username: "system@akso.com",
                password: "123123",
                refreshtoken: '0'
            };
        common.getData(config.url2 + '/v1/sysuser/token', 'POST', data, token).then(function(res) {
            if (res.data.code == "0") {
                var token = "JWT " + res.data.token;
                wx.setStorage({ key: 'accesstoken', data: token })
    
            } else {
                common.getPopUp('token获取失败，请重试', 'none')
            }
        }).catch(function(err){
            console.log(err)
        })
    },
    getInfo: function(token, idnum) {
        wx.showLoading({ title: '请稍候...', mask: true })
        var that = this,
            base = that.data.base,
            cover = that.data.cover,
            get_url = config.hurl + 'personalbasicinformation/' + idnum,
            expose = that.data.expose,
            disability = that.data.disability,
            irritability = that.data.irritability,
            data = {};
        common.getData(get_url, 'GET', data, token).then(function(res) {
            console.log(res)
            if (res.data.code == '0') {
                var info = res.data.data;
                if (info.Birthday != '') { base.birthday = info.Birthday; }
                cover.name = info.Name;
                base.name = info.Name;
                base.blood = info.BloodType || '0';
                base.sex = info.Sex || '0';
                if (info.Blooddate != '') { base.bloodDate = info.Blooddate; }
                base.occ = info.Career || '0';
                base.toilet = info.Cesuo || '0';
                base.kitchen = info.ChuFang || '0';
                base.code = info.Code;
                cover.code = info.Code;
                base.unit = info.Employer;
                base.linkName = info.ContactName;
                base.linkPhone = info.ContactPhone;
                base.edu = info.Culturallevel || '0';
                base.stay = info.HomeType || '0';
                if (info.Disease[0] === '[') { base.illness = JSON.parse(info.Disease); }
                base.email = info.Email;
                base.heredity = info.Geneticdiseases;
                base.marry = info.Marry || '0';
                base.nation = info.Nation || '0';
                base.pay = info.Paytype || '0';
                base.livestock = info.QinChuLan || '0';
                base.fuel = info.RanLiao || '0';
                base.bloodReason = info.Reason;
                base.religion = info.Religion;
                base.source = info.Source;
                if (info.Surgerydate != '') { base.operationDate = info.Surgerydate; }
                base.operation = info.Surgeryname;
                base.tag = info.Tag;
                if (info.Traumadate != '') { base.injuryDate = info.Traumadate; }
                base.injury = info.Traumaname;
                base.water = info.YinShui || '0';
                var father = info.Father == '' ? that.data.fatherIll : JSON.parse(info.Father),
                    mother = info.Mother == '' ? that.data.motherIll : JSON.parse(info.Mother),
                    brother = info.Brothersister == '' ? that.data.brotherIll : JSON.parse(info.Brothersister),
                    child = info.Children == '' ? that.data.childIll : JSON.parse(info.Children),
                    firstFather = info.Father[0] == '[' ? father.shift() : { value: '1', checked: false },
                    firstMother = info.Mother[0] == '[' ? mother.shift() : { value: '1', checked: false },
                    firstBrother = info.Brothersister[0] == '[' ? brother.shift() : { value: '1', checked: false },
                    firstChild = info.Children[0] == '[' ? child.shift() : { value: '1', checked: false };
                that.setData({ fatherHave: !firstFather.checked, motherHave: !firstMother.checked, brotherHave: !firstBrother.checked, childHave: !firstChild.checked })
                var fatherIll = info.Father[0] == '[' ? father : that.data.fatherIll,
                    motherIll = info.Mother[0] == '[' ? mother : that.data.motherIll,
                    brotherIll = info.Brothersister[0] == '[' ? brother : that.data.brotherIll,
                    childIll = info.Children[0] == '[' ? child : that.data.childIll;
                expose = info.BaoLou != '0' && info.BaoLou != '' ? JSON.parse(info.BaoLou) : that.data.expose;
                irritability = info.Medicineallergy == '' ? irritability : JSON.parse(info.Medicineallergy);
                disability = info.Disability == '' ? info.Disability : JSON.parse(info.Disability);
                that.setData({ base: base, expose , irritability , disability  , cover: cover, fatherIll: fatherIll, motherIll: motherIll, brotherIll: brotherIll, childIll: childIll, recordId: info.Recordid, Upload: info.Upload == -1 ? false : true, isUploaded: info.Upload == 1 ? true : false })
                // that.setData({ base: base, expose, irritability, disability, cover: cover, fatherIll: fatherIll, motherIll: motherIll, brotherIll: brotherIll, childIll: childIll, recordId: info.Recordid, isUploaded: info.Upload == 1 ? true : false })
                that.getCoverInfo(token, info.Recordid)
            } else {
                wx.hideLoading();
                common.getPopUp('获取信息失败', 'none');
                common.navigateBack();
            }
        })
    },

    getAddress(e) {
        var that = this;
        if (e.detail.column == 3) {
            admincode.addresscode(e, that.data.u_token, that.data.onlyArray, that.data.codeArray).then(obj => {
                that.setData({ addressCode: obj })
            })
        } else if (e.detail.column == 0 || e.detail.column == 1 || e.detail.column == 2) {
            admincode.addresscode(e, that.data.u_token, that.data.onlyArray, that.data.codeArray).then(obj => {
                that.setData({ onlyArray: obj.onlyArray, codeArray: obj.codeArray })
            })
        } else {
            admincode.addresscode(e, that.data.u_token, that.data.onlyArray, that.data.codeArray).then(obj => {
                that.setData({ Nativeplace: obj })
            })
        }
    }, //获取户籍

    getnowAddress(e) {
        var that = this;
        if (e.detail.column == 3) {
            admincode.addresscode(e, that.data.u_token, that.data.nowonlyArray, that.data.nowcodeArray).then(obj => {
                that.setData({ nowaddressCode: obj })
            })
        } else if (e.detail.column == 0 || e.detail.column == 1 || e.detail.column == 2) {
            admincode.addresscode(e, that.data.u_token, that.data.nowonlyArray, that.data.nowcodeArray).then(obj => {
                that.setData({ nowonlyArray: obj.onlyArray, nowcodeArray: obj.codeArray })
            })
        } else {
            admincode.addresscode(e, that.data.u_token, that.data.nowonlyArray, that.data.nowcodeArray).then(obj => {
                that.setData({ nowaddress: obj })
            })
        }
    }, //获取现地址
    //建档状态
    getStatuslist(e) {
        var index = e.detail.value,
            Documentstatus = index;
        this.setData({ Documentstatus })
    },

    getCoverInfo: function(token, rid) {
        var that = this,
            cover = that.data.cover,
            base = that.data.base,
            get_url = config.hurl + 'coverpage/detail/' + rid,
            Documentstatus = that.data.Documentstatus,
            data = {};
        common.getData(get_url, 'GET', data, token).then(function(res) {
            console.log(res)
            if (res.data.code == '0') {
                var info = res.data.data;
                cover.person = info.BuildPerson;
                cover.unit = info.BuildUnit;
                cover.code = info.Code;
                cover.streetName = info.JieDao;
                cover.village = info.JuWeiHui;
                var Nativeplace = info.Nativeplace;
                if(Nativeplace.indexOf('/') !=  '-1'){
                    Nativeplace = Nativeplace.split('/')
                    Nativeplace = Nativeplace[1];
                }
                var nowaddressCode = info.NowAddressCode;
                var addressCode = info.AddressCode;
                var nowaddress = info.NowAddress;
                Documentstatus = info.FileStatus != '' ? info.FileStatus : "1";
                cover.phone = info.Phone;
                base.phone = info.Phone;
                cover.doctor = info.Doctor;
                that.setData({ addressCode, nowaddressCode, Nativeplace, nowaddress, Documentstatus, cover: cover, base: base })
                wx.hideLoading();
            } else {
                wx.hideLoading();
                common.getPopUp('获取信息失败', 'none');
                common.navigateBack();
            }
        })
    },

    getName: function(e) {
        var cover = this.data.cover,
            base = this.data.base;
        cover.name = e.detail.value;
        base.name = e.detail.value;
        this.setData({ cover: cover, base: base })
    },
    getAgentname:function(e){
        var base=this.data.base;
        base.agentname=e.detail.value
       this.setData({base:base})
    },
    getRelation:function(e){
        var base=this.data.base;
        base.relation=e.detail.value
        this.setData({base:base})
    },
    getAgentadress:function(e){
        var base=this.data.base;
        base.agentadress=e.detail.value
        this.setData({base:base})
    },
    getAgentphone:function(e){
        var base=this.data.base;
        base.agentphone=e.detail.value
        this.setData({
            base:base
        })
    },
    giveLinkName: function(e) {
        var base = this.data.base;
        if (base.linkName != '') { return; }
        base.linkName = e.detail.value;
        this.setData({ base: base })
    },
    getName:function(e){
        var base=this.data.base;
        base.name=e.detail.value;
        this.setData({base:base})
    },

    getRegister: function(e) {
        var key = e.detail.value,
            get_url = config.hurl + 'areacode/one?code=' + key,
            token = this.data.u_token,
            that = this;
        common.getData(get_url, 'GET', {}, token).then(function(res) {
            if (res.data.code == '0' && res.data.data != null) {
                var list = res.data.data,
                    newList = [],
                    newList1 = [];
                newList = list.map(ele => {
                    return {
                        address: ele.province + ele.city + ele.county + ele.town + ele.villagetr,
                        code: ele.code
                    }
                })
                newList1 = list.map(ele => {
                    return ele.province + ele.city + ele.county + ele.town + ele.villagetr;
                })
                that.setData({ addressList: newList1, addressOption: newList })
            }
        })
    },

    getPhone: function(e) {
        var cover = this.data.cover,
            base = this.data.base;
        cover.phone = e.detail.value;
        base.phone = e.detail.value;
        this.setData({ cover: cover, base: base })
    },
    getAge:function(e){
        var  base = this.data.base;
        base.age=e.detail.value;
        this.setData({base:base})
    },
    getRegisteredplace:function(e){
        var base=this.data.base;
        base.registeredplace= e.detail.value;
        this.setData({base:base})
    },
    giveLinkPhone: function(e) {
        var base = this.data.base;
        if (base.linkPhone != '') { return; }
        base.linkPhone = e.detail.value;
        this.setData({ base: base })
    },

    getStreetName: function(e) {
        var cover = this.data.cover;
        cover.streetName = e.detail.value;
        this.setData({ cover: cover })
    },

    getVillage: function(e) {
        var cover = this.data.cover;
        cover.village = e.detail.value;
        this.setData({ cover: cover })
    },
   
    getUnit: function(e) {
        var cover = this.data.cover;
        cover.unit = e.detail.value;
        this.setData({ cover: cover })
    },

    getPerson: function(e) {
        var cover = this.data.cover;
        cover.person = e.detail.value;
        this.setData({ cover: cover })
    },

    getDoctor: function(e) {
        var cover = this.data.cover;
        cover.doctor = e.detail.value;
        this.setData({ cover: cover })
    },

    getBaseCode: function(e) {
        var base = this.data.base;
        base.code = e.detail.value;
        this.setData({ base: base })
    },

    getSex: function(e) {
        var base = this.data.base;
        base.sex = e.detail.value;
        this.setData({ base: base })
    },

    getBirthday: function(e) {
        var base = this.data.base;
        base.birthday = e.detail.value;
        this.setData({ base: base })
    },

    getWorkingUnit: function(e) {
        var base = this.data.base;
        base.unit = e.detail.value;
        this.setData({ base: base })
    },
   
    getLinkName: function(e) {
        var base = this.data.base;
        base.linkName = e.detail.value;
        this.setData({ base: base })
    },

    getLinkPhone: function(e) {
        var base = this.data.base;
        base.linkPhone = e.detail.value;
        this.setData({ base: base })
    },

    getStay: function(e) {
        var base = this.data.base;
        base.stay = e.detail.value;
        this.setData({ base: base })
    },

    getNation: function(e) {
        var base = this.data.base;
        base.nation = e.detail.value;
        this.setData({ base: base })
    },

    getBlood: function(e) {
        var base = this.data.base;
        base.blood = e.detail.value;
        this.setData({ base: base })
    },

    getEdu: function(e) {
        var base = this.data.base;
        base.edu = e.detail.value;
        this.setData({ base: base })
    },

    getOcc: function(e) {
        var base = this.data.base;
        base.occ = e.detail.value;
        this.setData({ base: base })
    },

    getMarry: function(e) {
        var base = this.data.base;
        base.marry = e.detail.value;
        this.setData({ base: base })
    },

    getPay: function(e) {
        var base = this.data.base;
        base.pay = e.detail.value;
        this.setData({ base: base })
    },

    getIrritability: function(e) {
        var Irritability = this.data.irritability,
            irritabilityindex = this.data.irritabilityindex,
            list = e.detail.value;
        if (irritabilityindex.length > list.length) {
            for (let i in Irritability) {
                if (list.some((v) => { return v == i; })) { Irritability[i].checked = true; } else { Irritability[i].checked = false; }
            }
            if (Irritability[4].checked == false) {
                Irritability[4].content = ''
            }
            this.setData({ irritabilityindex: list, irritability: Irritability })
        } else {
            var addItem = '0';
            for (let i in list) {
                if (irritabilityindex.some((v) => { return v == list[i] })) { continue; } else { addItem = list[i]; }
            }
            if (addItem == '0') {
                for (let i in Irritability) {
                    if (i == '0') { Irritability[i].checked = true; } else { Irritability[i].checked = false; }
                }
                this.setData({ irritability: Irritability, irritabilityindex: ['0'] })
            } else {
                var arr = [];
                for (let i in Irritability) {
                    if (i == '0') { Irritability[i].checked = false; } else if (list.some((v) => { return v == i; })) {
                        Irritability[i].checked = true;
                        arr.push(i);
                    } else { Irritability[i].checked = false; }
                }
                this.setData({ irritability: Irritability, irritabilityindex: list })
            }
        }
    },
    getIrrcontent: function(e) {
        var irritability = this.data.irritability,
            content = e.detail.value;
        irritability[4].content = content;
        this.setData(irritability)
    },

    getExpose: function(e) {
        var expose = this.data.expose,
            exposeindex = this.data.exposeindex,
            list = e.detail.value;
        if (exposeindex.length > list.length) {
            for (let i in expose) {
                if (list.some((v) => { return v == i; })) { expose[i].checked = true; } else { expose[i].checked = false; }
            }
            this.setData({ exposeindex: list, expose })
        } else {
            var addItem = '0';
            for (let i in list) {
                if (exposeindex.some((v) => { return v == list[i] })) { continue; } else { addItem = list[i]; }
            }
            if (addItem == '0') {
                for (let i in expose) {
                    if (i == '0') { expose[i].checked = true; } else { expose[i].checked = false; }
                }
                this.setData({ expose: expose, exposeindex: ['0'] })
            } else {
                var arr = [];
                for (let i in expose) {
                    if (i == '0') { expose[i].checked = false; } else if (list.some((v) => { return v == i; })) {
                        expose[i].checked = true;
                        arr.push(i);
                    } else { expose[i].checked = false; }
                }
                this.setData({ expose: expose, exposeindex: list })
            }
        }
    },

    getHeredity: function(e) {
        var base = this.data.base;
        base.heredity = e.detail.value;
        this.setData({ base: base })

    },

    getDisability: function(e) {
        var disability = this.data.disability,
            disabilityindex = this.data.disabilityindex,
            list = e.detail.value;
        if (disabilityindex.length > list.length) {
            for (let i in disability) {
                if (list.some((v) => { return v == i; })) { disability[i].checked = true; } else { disability[i].checked = false; }
            }
            if (disability[7].checked == false) {
                disability[7].content = ''
            }
            this.setData({ disabilityindex: list, disability: disability })
        } else {
            var addItem = '0';
            for (let i in list) {
                if (disabilityindex.some((v) => { return v == list[i] })) { continue; } else { addItem = list[i]; }
            }
            if (addItem == '0') {
                for (let i in disability) {
                    if (i == '0') { disability[i].checked = true; } else { disability[i].checked = false; }
                }
                this.setData({ disability: disability, disabilityindex: ['0'] })
            } else {
                var arr = [];
                for (let i in disability) {
                    if (i == '0') { disability[i].checked = false; } else if (list.some((v) => { return v == i; })) {
                        disability[i].checked = true;
                        arr.push(i);
                    } else { disability[i].checked = false; }
                }
                this.setData({ disability: disability, disabilityindex: list })
            }
        }
    },
    getDisabilitycontent: function(e) {
        var disability = this.data.disability,
            content = e.detail.value;
        disability[7].content = content;
        this.setData({ disability })
    },

    getIllness: function(e) {
        var index = e.currentTarget.dataset.index,
            groupList = this.data.groupList,
            base = this.data.base,
            illness = this.data.illness;
        base.illness[index].name = e.detail.value;
        base.illness.some((v) => {
            groupList = this.data.groupList,
                groupList.some((i) => {
                    if (illness[v.name - 1] + '管理' == i.name) {
                        i.checked = true
                    }
                })
            this.setData({ groupList })
        })
        this.setData({ base: base, groupList })
    },

    getIllnessDate: function(e) {
        var index = e.currentTarget.dataset.index,
            base = this.data.base;
        base.illness[index].date = e.detail.value;
        this.setData({ base: base })
    },

    addOneBaseIllness: function() {
        var base = this.data.base;
        base.illness.push({ name: '0', date: nowTime });
        this.setData({ base: base })
    },

    subtractOneBaseIllness: function(e) {
        var index = e.currentTarget.dataset.index,
            base = this.data.base;
        base.illness.splice(index, 1);
        this.setData({ base: base })
    },

    getOperation: function(e) {
        var base = this.data.base;
        base.operation = e.detail.value;
        this.setData({ base: base })
    },

    getOperationDate: function(e) {
        var base = this.data.base;
        base.operationDate = e.detail.value;
        this.setData({ base: base })
    },

    getInjury: function(e) {
        var base = this.data.base;
        base.injury = e.detail.value;
        this.setData({ base: base })
    },

    getInjuryDate: function(e) {
        var base = this.data.base;
        base.injuryDate = e.detail.value;
        this.setData({ base: base })
    },

    getBloodReason: function(e) {
        var base = this.data.base;
        base.bloodReason = e.detail.value;
        this.setData({ base: base })
    },

    getBloodDate: function(e) {
        var base = this.data.base;
        base.bloodDate = e.detail.value;
        this.setData({ base: base })
    },

    getFatherIll: function(e) {
        var choose = e.detail.value,
            fatherIll = this.data.fatherIll;
        for (let k in fatherIll) {
            fatherIll[k].checked = false;
        }
        for (let i in choose) {
            for (let j in fatherIll) {
                if (choose[i] == fatherIll[j].value) {
                    fatherIll[j].checked = true;
                }
            }
        }
        if (fatherIll[10].checked == false) { fatherIll[10].ill = ''; }
        this.setData({ fatherIll: fatherIll })
    },

    getFatherOtherIll: function(e) {
        var fatherIll = this.data.fatherIll;
        fatherIll[10].ill = e.detail.value;
        this.setData({ fatherIll: fatherIll })
    },

    getMotherIll: function(e) {
        var choose = e.detail.value,
            motherIll = this.data.motherIll;
        for (let k in motherIll) {
            motherIll[k].checked = false;
        }
        for (let i in choose) {
            for (let j in motherIll) {
                if (choose[i] == motherIll[j].value) {
                    motherIll[j].checked = true;
                }
            }
        }
        if (motherIll[10].checked == false) { motherIll[10].ill = ''; }
        this.setData({ motherIll: motherIll })
    },

    getMotherOtherIll: function(e) {
        var motherIll = this.data.motherIll;
        motherIll[10].ill = e.detail.value;
        this.setData({ motherIll: motherIll })
    },

    getBrotherIll: function(e) {
        var choose = e.detail.value,
            brotherIll = this.data.brotherIll;
        for (let k in brotherIll) {
            brotherIll[k].checked = false;
        }
        for (let i in choose) {
            for (let j in brotherIll) {
                if (choose[i] == brotherIll[j].value) {
                    brotherIll[j].checked = true;
                }
            }
        }
        if (brotherIll[10].checked == false) { brotherIll[10].ill = ''; }
        this.setData({ brotherIll: brotherIll })
    },

    getBrotherOtherIll: function(e) {
        var brotherIll = this.data.brotherIll;
        brotherIll[10].ill = e.detail.value;
        this.setData({ brotherIll: brotherIll })
    },

    getChildIll: function(e) {
        var choose = e.detail.value,
            childIll = this.data.childIll;
        for (let k in childIll) {
            childIll[k].checked = false;
        }
        for (let i in choose) {
            for (let j in childIll) {
                if (choose[i] == childIll[j].value) {
                    childIll[j].checked = true;
                }
            }
        }
        if (childIll[10].checked == false) { childIll[10].ill = ''; }
        this.setData({ childIll: childIll })
    },

    getChildOtherIll: function(e) {
        var childIll = this.data.childIll;
        childIll[10].ill = e.detail.value;
        this.setData({ childIll: childIll })
    },

    getKitchen: function(e) {
        var base = this.data.base;
        base.kitchen = e.detail.value;
        this.setData({ base: base })
    },

    getFuel: function(e) {
        var base = this.data.base;
        base.fuel = e.detail.value;
        this.setData({ base: base })
    },

    getWater: function(e) {
        var base = this.data.base;
        base.water = e.detail.value;
        this.setData({ base: base })
    },

    getToilet: function(e) {
        var base = this.data.base;
        base.toilet = e.detail.value;
        this.setData({ base: base })
    },

    getLivestock: function(e) {
        var base = this.data.base;
        base.livestock = e.detail.value;
        this.setData({ base: base })
    },

    changeFatherHave: function(e) { this.setData({ fatherHave: e.detail.value }) },

    changeUpload: function(e) { this.setData({ Upload: e.detail.value }) },

    changeMotherHave: function(e) { this.setData({ motherHave: e.detail.value }) },

    changeBrotherHave: function(e) { this.setData({ brotherHave: e.detail.value }) },

    changeChildHave: function(e) { this.setData({ childHave: e.detail.value }) },

    edit: function() {
        // if (this.data.isUploaded) {
        //     return
        // }
        this.setData({ inputDis: false })
    },

    save: function() {
        if (this.data.base.name == '' ) { common.getPopUp('姓名不能为空', 'none'); return; } else if (this.data.base.idnum == '' || this.data.base.idnum.trim() == '') { common.getPopUp('身份证号不能为空', 'none'); return; }
       
        //  else if (this.data.addressCode == '') { common.getPopUp("户籍地址不能为空", 'none'); return; } else if (this.data.nowaddressCode == '') { common.getPopUp("现住址不能为空", 'none'); return; } else if (this.data.base.nation == '') { common.getPopUp("民族不能为空", 'none'); return; } 
        //  else if (this.data.base.stay == '') { common.getPopUp("常住类型不能为空", 'none'); return; } else if (this.data.base.edu == '') { common.getPopUp('文化程度不能为空', 'none'); return; } else if (this.data.base.occ == '') { common.getPopUp("职业不能为空", 'none'); return; } else if (this.data.base.marry == '') { common.getPopUp("婚姻状况不能为空", 'none'); return; } else if (this.data.base.pay == '') { common.getPopUp("支付方式不能为空", 'none'); return; } else if (this.data.base.Documentstatus == '') { common.getPopUp("建档状态不能为空", 'none'); return; } else if (this.data.base.Documentstatus == '') { common.getPopUp("负责医生不能为空", 'none'); return; }
        wx.showLoading({
            title: '保存中',
            mask: true
        })
        // if (this.data.fatherHave === false) {
        //     var father = this.data.fatherIll;
        //     for (let i in father) {
        //         father[i].checked = false;
        //     }
        //     this.setData({ fatherIll: father })
        // }
        // if (this.data.motherHave === false) {
        //     var mother = this.data.motherIll;
        //     for (let i in mother) {
        //         mother[i].checked = false;
        //     }
        //     this.setData({ motherIll: mother })
        // }
        // if (this.data.brotherHave === false) {
        //     var brother = this.data.brotherIll;
        //     for (let i in brother) {
        //         brother[i].checked = false;
        //     }
        //     this.setData({ brotherIll: brother })
        // }
        // if (this.data.childHave === false) {
        //     var child = this.data.childIll;
        //     for (let i in child) {
        //         child[i].checked = false;
        //     }
        //     this.setData({ childIll: child })
        // }
        // this.data.fatherIll.unshift({ value: '1', checked: !this.data.fatherHave })
        // this.data.motherIll.unshift({ value: '1', checked: !this.data.motherHave })
        // this.data.brotherIll.unshift({ value: '1', checked: !this.data.brotherHave })
        // this.data.childIll.unshift({ value: '1', checked: !this.data.childHave })
        var that = this,
        JYToken = that.data.JYToken,
            post_url=config.cardurl + 'homedoctor/v1/homeresident',
            // post_url = that.data.newr == '0' ? config.hurl + 'personalbasicinformation/' + that.data.idnum : config.hurl + 'personalbasicinformation',
            // method = that.data.newr == '0' ? 'PUT' : 'POST',
            age = Math.ceil((new Date(nowTime).getTime() - new Date(that.data.base.birthday).getTime()) / 31536000000),
            data = {
                "Idnumber": that.data.idnum,//身份证号
                "Name": that.data.base.name,//姓名
                "Sex": that.data.base.sex=='0'?'男':(that.data.base.sex=='1'?'女':'未知'),//性别
                "Age": parseInt(that.data.base.age),//年龄
                "birthday": that.data.base.birthday,//出生日期
                "Phone":that.data.base.phone,
                "Registeredplace":that.data.base.registeredplace, //户籍所在地
                "Adress": that.data.base.unit,//工作单位
                "Maritalstatus":parseInt(that.data.base.marry),//婚姻情况
                "Livingsituation":parseInt(that.data.base.stay),   //居住情况
                "Agentname":that.data.base.agentname,   //代理人姓名
                "Relation":that.data.base.relation,  //与申请人关系
                "Agentadress":that.data.base.agentadress,  //代理人地址
                "Agentphone":that.data.base.agentphone,    //代理人电话
                "Teamid":that.data.teamId
            };

        common.getData(post_url,'POST' , data, JYToken).then(function(res) {
            if (res.data.code == '1') {
                
                    wx.hideLoading();
                        wx.showModal({
                            title: '温馨提示',
                            content: '该居民是否为需特殊关照人群？',
                            success: function(res) {
                                if (res.confirm) {
                                    common.getPopUp('建档成功！', 'success')
                                    common.navigateBack();
                                
                                } else {
                                    // var str = that.data.newr == '0' ? '编辑' : '新建';
                                    // common.getPopUp(str + '成功！', 'success')
                                    // common.navigateBack();
                                }
                            }
                        })
                    } else {
                        wx.hideLoading();
                        common.getPopUp(res.data.message, 'none');
                    }
           
        })
       
    },

    getGroup: function(e) { this.setData({ groupChoose: e.detail.value }) },

    cancel: function() { wx.navigateBack(); },

    confirm: function() {
        wx.showLoading({ title: '分组中' })
        var groupChoose = this.data.groupChoose,
            token = this.data.u_token,
            url = config.hurl + 'personalclass',
            data = {
                classid: groupChoose,
                userid: this.data.recordId
            };
        common.getData(url, 'POST', data, token).then(function(res) {
            if (res.data.code == '0') {
                wx.hideLoading();
                common.getPopUp('分组成功！', 'success');
                common.navigateBack();
            } else {
                wx.hideLoading();
                common.getPopUp('分组设置失败', 'none');
            }
        })
    }
})