const fs = require('fs')
const colors = require('../utils/colors.js')

function addMapping(router, mapping) {
    let methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    method_index = -1

    for (let url in mapping) {
        let path
        
        methods.map((item, index) => {
            if (url.startsWith(item)) {
                method_index = index
            }
        })

        path = url.substring(methods[method_index].length + 1)

        switch (method_index) {
            case 0:
                router.get(path, mapping[url])
                break
            case 1:
                router.post(path, mapping[url])
                break
            case 2:
                router.put(path, mapping[url])
                break
            case 3:
                router.delete(path, mapping[url])
                break
            default:
                method_index = -1
                break
        }

        if (method_index != -1) {
            console.log(`register URL mapping: ${methods[method_index]} ${path}`.debug)
        } else {
            console.info(`Invalid url`.silly)
        }
    }
}
//  在原例基础上改进的 addMapping 函数

function addControllers (router, dir) {
    let files = fs.readdirSync(__dirname + '/../' + dir)
    let js_files = files.filter((f) => {
        return f.endsWith('.js')
    }, files)

    for (let f of js_files) {
        console.log(`process controller: ${f}...`.verbose)
        let mapping = require(__dirname + '/../' + dir + '/' + f)
        addMapping(router, mapping)
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}
//  通过扫描 controllers 中间件的方式添加路由