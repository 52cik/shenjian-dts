/**
 * 内置对象 - site
 * http://docs.shenjian.io/develop/crawler/doc/objects/site.html
 *
 * 文档日期: 2018-03-23
 * 声明文件: 2018-06-04
 */
declare namespace Shenjian {
  interface Site {
    /**
     * 主动将url添加到待爬队列
     *
     * 平台会自动根据contentUrlRegexes正则来判断该url是否应该添加到contentUrl队列。
     *
     * @param url 要添加到待爬队列的链接
     * @param options 可选参数对象
     */
    addUrl(url: string, options?: RequestOptions): void;

    /**
     * 将url添加到scanUrl队列
     * @param url 要添加到scanUrl待爬队列的链接
     * @param options 可选参数对象
     */
    addScanUrl(url: string, options?: RequestOptions): void;

    /**
     * 请求方法
     * @param url 要请求的链接地址
     * @param options 可选参数对象
     * @returns 默认直接返回网页内容。当options.base64为true时，返回网页内容的base64编码字符串；当options.result为"response"时，返回response对象。
     */
    requestUrl(url: string): string;

    /**
     * 请求方法
     * @param url 要请求的链接地址
     * @param options 可选参数对象
     * @returns 默认直接返回网页内容。当options.base64为true时，返回网页内容的base64编码字符串；当options.result为"response"时，返回response对象。
     */
    requestUrl(
      url: string,
      options: RequestOptions,
    ): {
      raw: string;
      statusCode: number;
      statusReason: string;
      isRedirect: boolean;
      redirectLocations: string[];
      headers: { [key: string]: string };
      request: {
        headers: { [key: string]: string };
      } & { [key: string]: string };
    };

    /**
     * 获取请求重定向后的地址
     * @param url 要请求的链接地址
     * @param options 可选参数对象
     * @returns 返回重定向后的链接地址
     */
    requestUrlForLocation(url: string, options?: RequestOptions): string | null;

    /**
     * 获取请求重定向后的地址数组
     * @param url 要请求的链接地址
     * @param options 可选参数对象
     * @returns 返回重定向后的所有链接地址
     */
    requestUrlForLocations(
      url: string,
      options?: RequestOptions,
    ): string[] | null;

    /**
     * 异步方式执行一段JS代码，多用于添加大量url的场景。
     * @param func 需要异步执行的函数
     * @param params 此参数会完整地传递给func
     */
    async<T>(func: (params: T) => void, params: T): void;

    /**
     * 设置下载网页内容使用的编码
     * @param charset 编码格式，一般有UTF-8、GBK等
     */
    setCharset(charset: string): void;

    /**
     * 设置全局默认UserAgent
     * @param userAgent User-Agent
     */
    setUserAgent(userAgent: string): void;

    /**
     * 添加全局默认header
     * @param key header键名
     * @param value header键值
     */
    addHeader(key: string, value: string): void;

    /**
     * 添加全局默认cookie
     * @param key cookie键名
     * @param value cookie键值
     * @param domain cookie域
     */
    addCookie(key: string, value: string, domain: string): void;

    /**
     * 添加全局默认cookie
     * @param cookies cookie键值对 key1=value1; key2=value2
     * @param domain cookie域
     */
    addCookies(cookies: string, domain: string): void;

    /**
     * 获取指定domain下的cookie
     * @param key cookie键名
     * @param domain cookie域
     * @returns 返回对应的cookie的值
     */
    getCookie(key: string, domain: string): string;

    /**
     * 获取指定domain下的所有cookie
     * @param domain 要获取哪个domain下的cookie
     * @returns 相应domain下所有cookie的键值对
     */
    getCookies(domain: string): { [key: string]: string };

    /**
     * 清空当前的所有cookie
     */
    clearCookies(): void;

    /**
     * 主动触发切换代理
     */
    changeProxy(): void;

    /**
     * 此函数用来将一个网页（或片段）渲染成一张图片
     * @param html 要渲染成图片的html代码
     * @param width 网页的宽度，也是图片的宽度
     * @param height 网页的高度，也是图片的高度
     * @param format 图片所用格式，默认PNG
     * @returns 返回渲染图片的base64编码的字符串
     */
    renderImage(
      html: string,
      width: number,
      height: number,
      format: string,
    ): string;
  }
}
