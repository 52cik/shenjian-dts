/**
 * 内置对象 - system
 * http://docs.shenjian.io/develop/crawler/doc/objects/system.html
 *
 * 文档日期: 2018-01-18
 * 声明文件: 2018-06-04
 */

/**
 * 立即停止爬虫
 * @param reason 系统停止的原因
 */
declare function exit(reason: string): void;

/**
 * 发送一个自定义的Webhook消息
 * @param message 自定义的消息，JS对象会被自动序列化成JSON字符串发送。
 */
declare function sendWebhook(message: string | { [key: string]: string }): void;
