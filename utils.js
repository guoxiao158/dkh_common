//判断是不是IOS
export function isIOS() {
    let u = navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //IOS终端
    return isIOS
}

//格式化金钱
export function toMoney(val) { //val 数字number
    var str = (val / 100 * 100).toFixed(2) + ''
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',') //取到整数部分
    var dot = str.substring(str.length, str.indexOf(".")) //取到小数部分搜索
    var ret = intSum + dot
    return ret
}


//金钱变回数字number
export function moneyStrToNum(str) { //str 金钱字符串
    if (str) {
        let strTemp = str.replace(",", "")
        return Number(strTemp)
    } else {
        return str
    }

}

// 浏览器类型
export function getBrowserType() {
    let str = window.navigator.userAgent
    let name
    if (str.indexOf("Opera") > -1 || str.indexOf("OPR") > -1) {
        name = "Opera"
        return name
    }
    if (str.indexOf("Edge") > -1) {
        name = "Edge"
        return name
    }
    if (str.indexOf("Firefox") > -1) {
        name = "Firefox"
        return name
    }
    if (str.indexOf("Chrome") > -1 && str.indexOf("Safari") > -1) {
        name = "Chrome"
        return name
    }
    if (str.indexOf("Chrome") === -1 && str.indexOf("Safari") > -1) {
        name = "Safari"
        return name
    }
    if ((str.indexOf("Opera") === -1 && str.indexOf("MSIE") > -1) || str.indexOf("Trident") > -1) {
        name = "IE"
        return name
    }
}

//ajax post 获取流，下载file文件
export function downloadFilePostStream(apiStr, option) { //option为 传给后台的参数
    let body = document.body || document.getElementsByTagName("body")[0]
    let form = document.createElement("form")
    form.className = "myDownloadForm"
    form.setAttribute("action", `${globalHost}${apiStr}`) //配置
    form.setAttribute("method", "post")
    form.setAttribute("name", "downloadForm")
    form.setAttribute("target", "_blank")
    for (let key in option) {
        if (option[key] !== undefined && option[key] !== null) { //form表单的形式传undefined 会被转成字符串'undefined'，干脆直接不传了
            let input = document.createElement("input")
            input.setAttribute("name", key)
            input.value = option[key]
            form.appendChild(input)
        }
    }
    body.appendChild(form)
    form.submit()
    setTimeout(() => {
        body.removeChild(form)
    }, 50)
}

// 判断时间是不是今天
export function isTodayDate(time) {
    if (time.toDateString() === new Date().toDateString()) {
        return true;
    } else {
        return false;
    }
}
// 对象判空
export function isObjEmpty(obj) {
    if (obj && obj.constructor === Object) {
        return Object.keys(obj).length;
    }
    if (obj && obj.constructor === Array) {
        return obj.length;
    }
}
// 扁平化对象数组
export function flatObjArr(obj) {
    let result = [];
    Object.keys(obj).forEach(key => {
        const list = obj[key];
        result = result.concat(list);
    });
    return result;
}
// 首字母大写
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};