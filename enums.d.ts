/**
 * 爬虫设置中可以选择是否托管对应的类型
 */
declare enum FileType {
  IMAGE,
  TEXT,
  AUDIO,
  VIDEO,
  APPLICATION,
}

declare enum SelectorType {
  XPath,
  JsonPath,
  Regex,
}

declare enum SourceType {
  UrlContext,
  AttachedUrl,
}

declare enum JSEngine {
  PhantomJS,
  HtmlUnit,
}

declare enum UserAgent {
  Computer,
  Android,
  iOS,
  Mobile,
  Empty,
}
