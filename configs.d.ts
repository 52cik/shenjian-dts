declare namespace Shenjian {
  interface Configs {
    /**
     * 定义爬虫爬取哪些域名下的网页，链接发现的时候会检查链接的域名，如果不是这些域名下的链接，则会被忽略。
     *
     * 不可为空
     */
    domains: string[];

    /**
     * 爬虫入口页链接，这是给爬虫添加入口链接的最简单方式。这种方式添加的链接都是GET请求。
     */
    scanUrls: string[];

    /**
     * 定义内容页的链接正则，爬虫会根据这些正则来判断一个链接是否是内容页链接。
     */
    contentUrlRegexes: string[] | RegExp[];

    /**
     * 定义帮助页的链接正则，爬虫会根据这些正则来判断一个链接是否是帮助页链接。
     */
    helperUrlRegexes: string[] | RegExp[];

    /**
     * 定义爬取结果的数据字段，一个field定义出一个字段。
     */
    fields: Fields[];

    /**
     * 两个链接之间的处理间隔。单位是毫秒，默认值1000，即1秒。可设置的最小值是1000。
     */
    interval?: number;

    /**
     * 每个请求的默认超时时间。单位是毫秒，默认值5000，即5秒。
     */
    timeout?: number;

    /**
     * 是否默认开启自动JS渲染。默认值false。
     */
    enableJS?: boolean;

    /**
     * 使用哪种JS引擎来渲染页面。默认值为JSEngine.PhantomJS
     */
    jsEngine?: JSEngine;

    /**
     * 是否优先处理待爬队列中的scanUrl队列。默认值false。
     */
    entriesFirst?: boolean;

    /**
     * 爬虫在发请求时使用的UserAgent类型。默认值为UserAgent.Computer。
     */
    userAgent?: UserAgent;

    /**
     * 添加下载网页时可以接受的HTTP返回码。
     */
    acceptHttpStatus?: number[];

    /**
     * 是否自动发现链接。默认值true。
     */
    autoFindUrls?: boolean;

    /**
     * 爬虫初始化
     * @param site 内置对象 - site
     */
    initCrawl(site: Site): void;

    /**
     * initCrawl方法之后被调用
     *
     * 全局的User-Agent设置、Cookie设置建议放到此回调函数中。
     *
     * @param site 内置对象 - site
     */
    beforeCrawl(site: Site): void;

    /**
     * Pipeline中的爬虫通过此回调来获取前一个应用的数据，在beforeCrawl之后被回调。
     * @param data 数据对象，Pipeline中前一个应用的数据
     * @param site 内置对象 - site
     */
    onDataRecieved(data: any, site: Site): void;

    /**
     * 爬虫结束时调用，每个节点都会回调，在beforeExit之前被回调。
     * @param site 内置对象 - site
     */
    afterCrawl(site: Site): void;

    /**
     * 爬虫结束时回调，只有最后一个结束的节点会回调此方法，在afterCrawl之后被回调。
     * @param site 内置对象 - site
     */
    beforeExit(site: Site): void;

    /**
     * 当链接调度器从待爬队列中调度出来一个链接的时候，回调此函数
     *
     * 在此回调函数中可以修改链接地址page.url，修改完之后需要return page。常见的场景是链接中有时间戳，而添加链接和处理链接的时间通常是不确定的，这时可以在此回调函数中更新链接中的时间戳。
     *
     * @param page 内置对象 - page
     * @param site 内置对象 - site
     */
    beforeDownloadPage(page: Page, site: Site): void;

    /**
     * 当获取到一个新的代理的时候，回调此函数
     *
     * 切换代理之后，之前的cookie会被清空，一般在此回调中做一些cookie的加载。
     *
     * @param site 内置对象 - site
     * @param page 内置对象 - page
     */
    onChangeProxy(site: Site, page: Page): void;

    /**
     * 每个被调度的链接下载完成之后，会先判断返回的状态码是否403，如果403，则直接认为反爬，会触发切换代理；如果不是403，则回调此函数，开发者一般需要在此函数中判断返回码或者网页内容，给出是否反爬的判断，如果判断为反爬，需要返回true，否则返回false。
     *
     * @param url 当前正在处理的链接地址
     * @param content 当前下载的网页内容
     * @param page 内置对象 - page
     * @returns 是否反爬，true表示反爬，false表示没有反爬。不重写此函数时，默认返回false。
     */
    isAntiSpider(url: string, content: string, page: Page): boolean;

    /**
     * 每个被调度的链接下载完成之后回调该函数。
     *
     * 在该函数中可以修改page.url和page.raw，修改之后，修改之后的内容会一直持续到该链接的生命周期结束。修改page.raw后会影响后续的数据抽取，所以一般可以在这个回调函数中发一些请求，把获取的数据拼接到page.raw中，以便后续抽取。
     *
     * @param page 内置对象 - page
     * @param site 内置对象 - site
     */
    afterDownloadPage(page: Page, site: Site): Page;

    /**
     * 网页在下载完之后，如果当前链接是入口页，则回调此函数。一般在此函数中实现手动链接发现，一般是发现帮助页，也可以直接发现内容页。
     *
     * @param page 内置对象 - page
     * @param content 网页内容，content与page.raw的区别在于，content中的链接都是绝对地址（以http开头）
     * @param site 内置对象 - site
     * @returns 是否还需要自动发现链接，true表示还需要自动发现，false表示不需要自动发现。不重写此函数时，默认返回configs.autoFindUrls的值。
     */
    onProcessScanPage(page: Page, content: string, site: Site): boolean;

    /**
     * 入口页判断以及onProcessScanPage回调之后，会继续判断当前链接是否是帮助页，如果是，则回调此函数。一般在此函数中实现手动链接发现，多数情况是发现内容页链接以及下一页帮助页的链接。
     *
     * @param page 内置对象 - page
     * @param content 网页内容，content与page.raw的区别在于，content中的链接都是绝对地址（以http开头）
     * @param site 内置对象 - site
     * @returns 是否还需要自动发现链接，true表示还需要自动发现，false表示不需要自动发现。不重写此函数时，默认返回configs.autoFindUrls的值。
     */
    onProcessHelperPage(page: Page, content: string, site: Site): boolean;

    /**
     * 帮助页判断以及onProcessHelperPage回调之后，会继续判断当前链接是否是内容页，如果是，则回调此函数。一般内容页不需要再做链接发现，所以此函数多数情况下直接返回false。
     *
     * @param page 内置对象 - page
     * @param content 网页内容，content与page.raw的区别在于，content中的链接都是绝对地址（以http开头）
     * @param site 内置对象 - site
     * @returns 是否还需要自动发现链接，true表示还需要自动发现，false表示不需要自动发现。不重写此函数时，默认返回configs.autoFindUrls的值。
     */
    onProcessContentPage(page: Page, content: string, site: Site): boolean;

    /**
     * attachedUrl下载完成之后会回调此函数。
     *
     * 可以在此函数中修改page.raw的值，从而影响attachedUrl的后续抽取。多数场景是，attachedUrl返回的数据是jsonp格式，这时需要在此回调中把数据处理成json数据，以便后续用JsonPath来抽取。
     *
     * @param site 内置对象 - site
     * @param page 内置对象 - page
     * @returns 不重写此函数时，默认返回原page对象。
     */
    afterDownloadAttachedPage(page: Page, site: Site): Page;

    /**
     * 在每个抽取项抽取到内容时回调此函数，一个网页的抽取过程中，会多次回调此函数。在此函数中，可以对抽取到的数据做进一步的处理，然后返回处理后的数据。
     *
     * @param fieldName 抽取项名
     * @param data 当前抽取项抽取出的数据
     * @param page 内置对象 - page
     * @param site 内置对象 - site
     * @param index 当前项是在父抽取项的第几个结果中进行抽取，从0开始。
     * @returns 数据对象 返回此项对应的数据。当不重写此函数时，默认返回原data对象。
     */
    afterExtractField(
      fieldName: string,
      data: string,
      page: Page,
      site: Site,
      index: number,
    ): string | number;

    /**
     * 在抽取的内容中发现标签时，回调此函数。一般在此函数中修改src，使src指向真实的图片地址。
     * @param fieldName 抽取项名，同afterExtractField
     * @param img 一个完整的img标签
     * @returns 处理后的img
     */
    beforeHandleImg(fieldName: string, img: string): string;

    /**
     * 在托管文件之前回调此函数，在此函数中可以对文件地址做修改。常用的场景是，在图片托管中，修改链接地址来获取分辨率更高的图片。
     * @param fieldName 抽取项名，同afterExtractField
     * @param url 待托管的文件链接
     * @returns 处理后的托管链接
     */
    beforeHostFile(fieldName: string, url: string): string;

    /**
     * 在托管后的文件链接计算结束之后回调此函数，在此函数中可以对托管后的链接进行收集。
     * @param {string} fieldName 抽取项名，同afterExtractField
     * @param {string} hostedUrl 托管后的链接地址
     */
    afterHostFile(fieldName: string, hostedUrl: string): void;

    /**
     * 当整个网页完成抽取时回调此函数。一般在此回调中做一些数据整理的操作，也可以继续发送网络请求，把返回的数据整理后放到data中返回。
     * @param page 内置对象 - page
     * @param data 整个页面抽取出的数据
     * @param site 内置对象 - site
     * @returns 数据对象 返回处理后的抽取数据。当不重写此函数时，默认返回原data对象。
     */
    afterExtractPage(page: Page, data: object, site: Site): string;
  }

  interface Fields {
    /**
     * 抽取项的名字
     */
    name: string;

    /**
     * 抽取项的别名
     *
     * 一般起中文名，方便入库。
     */
    alias?: string;

    /**
     * 抽取规则的类型
     *
     * 默认值是SelectorType.XPath
     */
    selectorType?: SelectorType;

    /**
     * 抽取规则
     *
     * 如果selector为空或者未设置，则抽取的值为null，在进行required的判定之前，仍会进行afterExtractField回调
     */
    selector: string;

    /**
     * 标识当前抽取项的值是否必须（不能为空）。默认是false，可以为空。
     */
    required?: boolean;

    /**
     * 标识当前抽取项的值是否是数组结构。默认是false。
     */
    repeated?: boolean;

    /**
     * 抽取项的子抽取项
     */
    children?: Fields[];

    /**
     * 当前抽取项是否作为整条数据的主键组成部分。默认是false。
     */
    primaryKey?: boolean;

    /**
     * 数据抽取源。无默认值，不设置时，抽取源默认时当前网页或父项内容。
     */
    sourceType?: SourceType;

    /**
     * attachedUrl请求地址
     */
    attachedUrl?: string;

    /**
     * HTTP请求是”GET”还是”POST”。默认是”GET”。
     */
    attachedMethod: 'GET' | 'POST';

    /**
     * HTTP请求的POST参数。如果请求是”GET”，参数将会被忽略。
     */
    attachedParams: string;

    /**
     * HTTP请求的headers
     */
    attachedHeaders: IHeaders;

    /**
     * 抽取项是否是临时的。默认是false。临时的抽取项，数据存储的时候，不会存储其值。
     */
    transient: boolean;

    /**
     * 标识抽取项的值类型。默认是string。
     */
    type:
      | 'int'
      | 'float'
      | 'image'
      | 'timestamp'
      | 'url'
      | 'string'
      | 'html'
      | 'json'
      | 'bool';
  }
}
