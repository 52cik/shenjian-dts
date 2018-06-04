/**
 * 内置对象 - shenjian
 * http://docs.shenjian.io/develop/crawler/doc/objects/shenjian.html
 *
 * 文档日期: 2018-01-18
 * 声明文件: 2018-06-04
 */
namespace Shenjian {
  interface Source {
    /**
     * 读取到的下一条数据
     *
     * @returns 没有下一条数据时，返回undefined作为结束的判断；异常（如超时）时，返回null，一般需要重试。
     */
    next(): object | undefined | null;

    /**
     * 读取到的下一批数据
     *
     * @param size 批量获取数据的条数
     * @returns 没有下一条数据时，返回undefined作为结束的判断；异常（如超时）时，返回null，一般需要重试。
     */
    nextBatch(size: number): object[] | undefined | null;
  }
}

/**
 * 读取神箭手平台数据源
 *
 * @param sourceId 数据源ID
 * @param query GraphQL的query查询语句
 * @returns 返回一个数据迭代器对象source，该对象提供next和nextBatch方法来遍历数据。
 */
declare function readSource(sourceId: number, query: string): Shenjian.Source;
