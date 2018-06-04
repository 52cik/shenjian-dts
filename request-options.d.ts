namespace Shenjian {
  interface RequestOptions {
    /**
     * HTTP请求方式，默认 GET
     */
    method?: 'GET' | 'POST';

    /**
     * HTTP的POST数据，平台默认会对值进行urlencode，不需要主动urlencode
     */
    data?: object;

    /**
     * JS对象或String 附加在此url上的数据
     *
     * 附加的数据可以在field定义中直接抽取，也可以在回调函数中通过page.contextData访问。如果添加的时候使用的是JS对象，会被自动序列化为JSON字符串，这种情况下，page.contextData也是JSON字符串。
     */
    contextData?: string | object;

    /**
     * HTTP的请求头
     */
    headers?: IHeaders;

    /**
     * 此url是否不判断链接去除直接插入待爬队列，此值为true时，添加时不进行链接去重的判断。
     */
    reserve?: boolean;

    /**
     * 此请求是否强制不使用代理
     *
     * 此值为true时，本次请求不会使用代理，为false时，根据爬虫设置决定是否使用代理。一般在爬虫中访问自己的HTTP链接时使用此选项。
     */
    noProxy?: boolean;

    /**
     * 此请求使用的编码
     *
     * 可以单独设置此次请求的编码方式。对返回的内容直接使用此编码进行解码。在对POST的data进行自动编码时，如果headers里面设置了Content-Type，并且指定了charset，则使用指定的charset，否则使用此charset。
     */
    charset?: string;

    /**
     * 此请求的超时时间
     *
     * 可以单独设置此次请求的超时时间，覆盖全局的超时时间。
     */
    timeout?: number;

    /**
     * 是否对返回内容进行base64编码
     *
     * 为true时，先对返回内容进行base64编码后再返回，多在直接获取图片内容时使用。
     */
    base64?: boolean;

    /**
     * 可指定获取更详细的内容
     *
     * 可设置为”response”，来使requestUrl返回一个response对象，而非只返回网页内容。
     */
    result?: 'response';

    /**
     * 替换默认的链接去重
     *
     * 在进行链接去重时，默认使用的是链接本身（POST请求会带上POST的data），如果设置了此值，则直接使用此值进行链接去重。
     */
    dupValue?: string;

    /**
     * 忽略此次请求返回的cookie
     *
     * 为true时，忽略本次请求返回的cookie，默认每次请求返回的cookie会被自动存储。
     */
    ignoreCookies?: boolean;

    /**
     * 是否对POST的data进行urlencode
     *
     * 默认会进行urlencode，如果请求编码比较特殊，有的键值进行了编码，有的键值不进行编码，需要设置此值为false，然后主动选择编码或不编码。
     */
    urlEncodeData?: boolean;

    /**
     * 此次请求是否开启JS渲染
     *
     * 可单独为此次请求设置是否进行JS渲染，默认由全局的enableJS决定。
     */
    enableJS?: boolean;

    /**
     * 开启渲染时可以额外执行的模拟操作
     *
     * 设置JS渲染网页后需要触发的事件。目前只支持点击事件，并且只支持一个，即模拟点击网页上的元素，可以使网页加载新的JS资源，并更新网页内容。事件格式是{"事件名":xpath}，xpath是要点击元素的xpath，所以events的值可能时这样的
     */
    events?: { [event: string]: string }[];

    /**
     * 请求失败的重试次数
     *
     * 默认为0，不进行重试，一般在requestUrl的时候使用。
     */
    retryNum?: number;

    /**
     * 此请求处理失败时是否进入失败队列
     *
     * 默认会进入失败队列，当此值为true时，不进入失败队列。在处理有失效性的链接时，多用此选项。
     */
    noFail?: boolean;

    /**
     * 是否不进行失败重试
     *
     * 在请求下载失败时，默认会按retryNum的次数进行重试。此值为true时，此次请求不进行重试操作，如果是代理导致的下载失败，在切换代理后还会进行重试。
     */
    noRetry?: boolean;

    /**
     * 是否强制不重试
     *
     * 此值为true时，会进一步禁止代理切换后的重试
     */
    disableRetry?: boolean;
  }
}
