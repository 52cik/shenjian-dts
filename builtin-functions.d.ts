/**
 * 内置函数声明
 * http://docs.shenjian.io/develop/crawler/doc/functions.html
 *
 * 文档日期: 2018-02-06
 * 声明文件: 2018-06-04
 */

/**
 * 从html中提取符合xpath的所有元素
 * @param html 网页文本，可以是整个网页，也可以是一个html片段
 * @param xpath xpath表达式
 * @param keepTag 是否保留最外层的tag，默认值false，即不保留
 * @returns 返回html中符合xpath的第一个dom元素的字符串形式。当keepTag为false时，默认去除外层的标签，为true时保留。
 */
declare function extract(html: string, xpath: string, keepTag: boolean): string;

/**
 * 从html中提取符合xpath的所有元素为数组
 * @param html 网页文本，可以是整个网页，也可以是一个html片段
 * @param xpath xpath表达式
 * @param keepTag  是否保留最外层的tag，默认值false，即不保留
 * @returns 返回html中符合xpath的所有dom元素的字符串形式组成的数组。当keepTag为false时，默认去除外层的标签，为true时保留。
 */
declare function extractList(
  html: string,
  xpath: string,
  keepTag: boolean,
): string[];

/**
 * 从html中去除符合xpath的所有元素。
 * @param html 网页文本，可以是整个网页，也可以是一个html片段
 * @param xpath xpath表达式
 * @returns 返回html中去除符合xpath的所有dom元素后剩余的内容。
 */
declare function exclude(html: string, xpath: string): string;

/**
 * 托管文件
 * @param url 待托管的文件链接地址
 * @param type 枚举 type 托管文件的类型
 * @param options JS对象 options 其他选项，可选择设置下载文件时使用的headers，以及在下载之前提供文件大小fileSize
 * @returns 托管后的标识字符串，此串需要出现在爬取结果里面，否则不会进行托管。
 */
declare function hostFile(
  url: string,
  type: FileType,
  options: Shenjian.DownOptions,
): string;

/**
 * 识别图片验证码
 * @param url 验证码图片的地址
 * @param type 验证码类型 [收费标准](http://docs.shenjian.io/use/captcha/captcha.html#%E5%9B%BE%E7%89%87%E9%AA%8C%E8%AF%81)
 * @returns 返回识别后的结果
 */
declare function solveCaptcha(
  url: string,
  type: number,
): {
  ret: number;
  desc?: string;
  result?: string;
};

/**
 * 识别base64图片验证码
 * @param base64 验证码图片的base64编码数据
 * @param type 验证码类型
 * @returns 返回识别后的结果
 */
declare function solveCaptchaFromBase64(
  base64: string,
  type: number,
): {
  ret: number;
  desc?: string;
  result?: string;
};

/**
 * 识别极验验证码
 * @param gt 极验验证码的gt参数
 * @param challenge 极验验证码的challenge参数
 * @param referer 当前极验验证码所在的网站
 * @returns 返回极验验证码识别后的结果
 */
declare function solveGeetest(
  gt: string,
  challenge: string,
  referer: string,
): {
  ret: number;
  desc?: string;
  challenge?: string;
  validate?: string;
};

/**
 * 登录指定网站
 * @param url 网站登录页面的地址
 * @param username 登录该网站用的用户名
 * @param password 登录该网站用的密码
 * @param enableProxy 登录时是否需要使用代理IP，默认false，即不使用
 */
declare function login(
  url: string,
  username: string,
  password: string,
  enableProxy: boolean,
): void;

/**
 * 使当前节点/线程sleep指定时间
 *
 * 一般在使用site.requestUrl发请求的时候，为了避免两次请求太快导致反爬，需要在两次请求之间sleep一定时间。
 *
 * @param millisecond sleep的毫秒数
 */
declare function msleep(millisecond: number): void;

/**
 * 将时间字符串转换成毫秒时间戳
 * @param str 时间字符串，例如”5分钟前”、”刚刚”、”2017-11-11”等
 * @returns 返回毫秒时间戳
 */
declare function parseDateTime(str: string): number;

/**
 * url编码
 * @param str 需要进行url编码的字符串
 * @param charset 编码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 返回编码后的字符串
 */
declare function encodeURI(str: string, charset: string): string;

/**
 * url编码
 * @param str 需要进行url编码的字符串
 * @param charset 编码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 返回编码后的字符串
 */
declare function encodeURIComponent(str: string, charset: string): string;

/**
 * url解码
 * @param str 需要进行url解码的字符串
 * @param charset 解码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 返回url解码后的字符串
 */
declare function decodeURI(str: string, charset: string): string;

/**
 * url解码
 * @param str 需要进行url解码的字符串
 * @param charset 解码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 返回url解码后的字符串
 */
declare function decodeURIComponent(str: string, charset: string): string;

/**
 * HTML实体解码
 * @param str 需要进行html解码的字符串
 * @returns 返回html解码后的字符串
 */
declare function htmlEntityDecode(str: string): string;

/**
 * MD5加密
 * @param str 需要进行md5加密的字符串
 * @returns 加密后的md5的hex字符串形式，32位小写
 */
declare function md5(str: string): string;

/**
 * base64编码
 * @param str 需要进行base64编码的字符串
 * @returns 编码后的base64字符串
 */
declare function base64Encode(str: string): string;

/**
 * base64编码
 * @param str 需要进行base64编码的字符串
 * @returns 编码后的base64字符串
 */
declare function btoa(str: string): string;

/**
 * base64解码
 * @param str 待解码的base64字符串
 * @param charset 解码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 解码后的内容
 */
declare function base64Decode(str: string, charset: string): string;

/**
 * base64解码
 * @param str 待解码的base64字符串
 * @param charset 解码时使用的字符编码，常用的有UTF-8 GBK
 * @returns 解码后的内容
 */
declare function atob(str: string, charset: string): string;

/**
 * RSA加密
 * @param str 待加密的字符串
 * @param publicKey 公钥
 * @param charset 字符串编码，常用的有UTF-8 GBK
 * @returns 返回加密后的字符串
 */
declare function RSAEncode(
  str: string,
  publicKey: string,
  charset: string,
): string;

/**
 * RSA解密
 * @param str 待解密的字符串
 * @param privateKey 私钥
 * @param charset 字符串编码，常用的有UTF-8 GBK
 * @returns 返回解密后的字符串
 */
declare function RSADecode(
  str: string,
  privateKey: string,
  charset: string,
): string;

/**
 * deflate数据解压
 * @param content 待解压的内容
 * @param type 返回数据的类型
 * @returns 解压后的内容，当type为”string”时，直接返回字符串形式，当type为”base64”时，返回base64编码后的结果
 */
declare function deflate(content: string, type: 'string' | 'base64'): string;

/**
 * inflate数据压缩
 * @param content 待压缩的内容
 * @param type 待压缩内容的格式，值为"string"时，直接进行压缩，值为"base64"时，会先进行base64解码，再进行压缩
 * @returns 返回压缩后的内容
 */
declare function inflate(content: string, type: 'string' | 'base64'): string;
