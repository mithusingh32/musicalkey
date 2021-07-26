declare namespace SidebarStyleScssNamespace {
  export interface ISidebarStyleScss {
    'filter-label': string;
  }
}

declare const SidebarStyleScssModule: SidebarStyleScssNamespace.ISidebarStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SidebarStyleScssNamespace.ISidebarStyleScss;
};

export = SidebarStyleScssModule;
