namespace Shenjian {
  interface DownOptions {
    /**
     * 文件大小
     *
     * 指定额外的文件大小信息可以加速下载时的处理。
     */
    fileSize: number;

    /**
     * http headers
     *
     * 下载该文件时使用的headers
     */
    headers: IHeaders;
  }
}
