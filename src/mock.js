// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// 参考：https://github.com/nuysoft/Mock/wiki/Mock.Random
const Random = Mock.Random
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}
/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 *
 * 用于生成响应数据的函数
 */
// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32), // 获取一个32位的随机字符串,
        captchaImg: Random.dataImage( "120x40", "11111" ) //生成验证码为11111的base64图片编码
    }
    return Result
})
// 因为mock不认识/login?username=xxx，所以用了正则表达式
// Mock.mock(RegExp('/login*'), 'post', (config) => {
//     // 这里无法在header添加authorization，直接跳过
//     console.log("mock----------------login")
//     // Result.data = {
//     //     id: 1
//     // }
//     return Result
// })
Mock.mock(RegExp('/lingdao*'), 'post', (config) => {
    // 这里无法在header添加authorization，直接跳过
    console.log("mock----------------login")

    return Result
})
Mock.mock('/common/userInfo', 'get', () => {

    Result.data = {
        id: "1",
        username: "test",
        // avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg"
    }
    return Result
})
Mock.mock('/logout', 'post', () => {

    return Result
})
// Mock.mock('/login', 'post', () => {
//
//     // 无法在header中传入数jwt
//     Result.code = 400
//     Result.msg = "验证码错误"
//
//     return Result
// })
// 获取用户菜单以及权限接口
// Mock.mock('/sys/menu/nav', 'get', () => {
//
//     let nav = [
//         {
//             name: 'List',
//             title: '查看销售渠道列表',
//             icon: 'el-icon-s-operation',
//             component: 'module/List',
//             path: '/module/list',
//             children: []
//         },
//         {
//             name: 'AddRecord',
//             title: '添加拜访信息',
//             icon: 'el-icon-s-custom',
//             component: 'module/AddRecord',
//             path: '/module/addRecord',
//             children: []
//         },
//         {
//             name: 'FindPath',
//             title: '规划最优拜访路线',
//             icon: 'el-icon-s-operation',
//             component: 'module/FindPath',
//             path: '/module/findPath',
//             children: []
//         },
//     ]
//     let authoritys = ['sys:user:list', "sys:user:save", "sys:user:delete"]
//
//     Result.data = {
//         nav: nav,
//         authoritys: authoritys
//     }
//
//     return Result
// })
Mock.mock(RegExp('/sys/menu/*'), 'post', () => {
    return Result
})
Mock.mock(RegExp('/sys/role/list*'), 'get', () => {

    Result.data = {
        "records": [
            {
                "id": 3,
                "created": "2021-01-04T10:09:14",
                "updated": "2021-01-30T08:19:52",
                "statu": 1,
                "name": "普通用户",
                "code": "normal",
                "remark": "只有基本查看功能",
                "menuIds": []
            },
            {
                "id": 6,
                "created": "2021-01-16T13:29:03",
                "updated": "2021-01-17T15:50:45",
                "statu": 1,
                "name": "超级管理员",
                "code": "admin",
                "remark": "系统默认最高权限，不可以编辑和任意修改",
                "menuIds": []
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result

})