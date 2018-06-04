/**
 * 内置对象 - page
 * http://docs.shenjian.io/develop/crawler/doc/objects/page.html
 *
 * 文档日期: 2018-02-07
 * 声明文件: 2018-06-04
 */
namespace Shenjian {
  interface Page {
    /**
     * 当前网页的链接地址。
     *
     * url的值只能在beforeDownloadPage和afterDownloadPage函数中修改，在其他回调函数中修改均不会影响后续的回调函数。
     */
    url: string;

    /**
     * 下载的网页原始内容。
     *
     * beforeDownloadPage中raw的值为null，因为此时还未开始下载。raw的值只能在afterDownloadPage回调函数中修改，在其他回调函数中修改均不会影响后续的回调函数。
     */
    raw: string;

    /**
     * 当前网页的附加数据，是site.addUrl的时候附加的contextData数据。
     */
    contextData: string;

    /**
     * 当前网页的HTTP请求对象
     */
    request: PageRequest;

    /**
     * 当前网页的HTTP响应对象
     */
    response: PageResponse;

    /**
     * 此函数可以用来过滤抽取结果
     *
     * 不传参数时，即page.skip()，表示丢弃当前整个网页的抽取结果。传fieldName时，表示过滤该field下的当前抽取结果
     *
     * @param {string} fieldName 抽取项名，可不传
     */
    skip(fieldName: string): void;
  }

  interface PageRequest {
    /**
     * 请求地址
     */
    url: string;
    /**
     * 请求方式，GET或POST
     */
    method: string;
    /**
     * POST参数
     */
    data: { [key: string]: any };
    /**
     * 请求的header头
     */
    headers: { [key: string]: string };
  }

  interface PageResponse {
    /**
     * HTTP状态码，发生重定向时，此状态码是重定向后的状态码
     */
    statusCode: number;

    /**
     * HTTP响应状态字符串，与状态码对应
     */
    statusReason: string;

    /**
     * 是否发生重定向
     */
    isRedirect: boolean;

    /**
     * 发生重定向时的重定向地址，发生多次重定向时，数组按重定向的顺序依次记录。
     */
    redirectLocations: string[];

    /**
     * 返回的header头
     */
    headers: { [key: string]: string };
  }
}
