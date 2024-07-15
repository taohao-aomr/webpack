/**
 * @file webpack.server 编译专用文件，用于包装 url 用于mock数据
 */

/**
 * 开发环境环境设置接口用方法
 *
 * @function  setPort
 * @param     {string}     url 请求路径
 * @returns   {string}         请求路径
 */
export const setMockPort = (url) => {
    const mockHost = '/mockapi';
    const regExp = new RegExp('^(https?:)?//(.*).ttpai.cn');
    // 不改写接口地址，直接使用该域名下的真实地址
    const ignoreDomains = ['//jsapi.ttpai.cn'];
    // 如果已经时mock接口，原样返回
    if (url.indexOf(mockHost) > -1 || ignoreDomains.some((domainStr) => url.indexOf(domainStr) > -1)) {
        return url;
    }

    let urlWithMock = url;
    // 是否将数据代理到mock服务区上去，当 NODE_ENV_MOCK === off 的时候不替换域名
    if (process.env.NODE_ENV_MOCK === 'off') {
        urlWithMock = regExp.test(url) ? url : mockHost + url;
    } else {
        urlWithMock = regExp.test(url) ? url.replace(regExp, mockHost) : mockHost + url;
    }

    return urlWithMock;
};

/**
 * 正式环境设置接口用方法
 *
 * @author   bangyao.chen@ttpai.cn
 * @function  setPort
 * @param     {string}     url 请求路径
 * @returns   {string}         请求路径
 */
const setRealPort = (url) => url;

let SetPort = setRealPort;

if (process.env.NODE_ENV_SERVER === 'server') {
    SetPort = setMockPort;
}

export default SetPort;
