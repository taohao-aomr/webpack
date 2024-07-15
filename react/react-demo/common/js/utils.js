/**
 * [转换图片URl]
 *
 * @author   chengbao.jiang@ttpai.cn
 * @param    {string}                 url [图片URl]
 * @returns  {string}                     [将http替换为空字符串，因为ios只支持https协议]
 */
export function transformImgUrl(url) {
    return (url && url.replace('http:', '')) || '';
}

/**
 * [图片加载错误，使用默认图片]
 *
 * @author   chengbao.jiang@ttpai.cn
 */
export function replaceImgByDef() {
    document.addEventListener(
        'error',
        function (e) {
            let elem = e.target;
            if (elem.tagName.toLowerCase() === 'img' && elem.getAttribute('loaderror') != 'true') {
                elem.src = '//cdn01.ttpaicdn.com/frontbossapp/common/images/def-pic.png';
                elem.setAttribute('loaderror', true);
            }
        },
        true /* 指定事件处理函数在捕获阶段执行*/
    );
}

/**
 * 判断是不是ios
 *
 * @returns {boolean} boolean
 */
export function isIOS() {
    const u = navigator.userAgent;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS
    return isIOS;
}

/**
 * 格式化渠道 数据
 * 将 "1_10,2_22,5_11,8_99"  ==》"人人车 10 / 瓜子二手车 22 / 车置宝 11 / 小黄人 99"
 *
 * @param {string} channelStr channelStr
 * @param {object} chonnelMap chonnelMap
 * @returns {string} 格式化后的渠道数据
 */
export function setChannelCarNumData(channelStr, chonnelMap) {
    if (!channelStr) {
        return '';
    }
    let mapData = {};
    channelStr = channelStr.split(',');
    chonnelMap.forEach((m) => (mapData[m.code] = m.text));
    return channelStr
        .map((m) => {
            let item = m.split('_');
            return `${mapData[item[0]]} ${item[1]}`;
        })
        .join(' / ');
}

/**
 * stopBubble 停止事件冒泡
 *
 * @author   bangyao.chen@ttpai.cn
 * @param    {object}                 e [原生事件对象]
 */
export function stopBubble(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * [校验规则]
 *
 * @author   chengbao.jiang@ttpai.cn
 * @returns  {Function|object}                [校验规则函数或者正则表达式]
 */
export function regexValid() {
    return {
        // 为空校验
        require: /^\s*$/,
        // 输入值校验
        valScope: function (min, max) {
            return min >= max;
        },
        // 输入值校验
        valLimit: function (val, min, max) {
            return !(val <= max && val >= min);
        },
        // 最小长度校验
        calculateLen: function (str, minLen) {
            return str.length < minLen;
        }
    };
}

/**
 * 是否PC端
 *
 * @returns {boolean} 是否是PC
 */
export const isPC = () => {
    const userAgentInfo = navigator.userAgent;
    return !/iPad|iPhone|midp|ucweb|Android|windows mobile/i.test(userAgentInfo);
};
