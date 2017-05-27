## 个人博客开发项目

### 设计开发思路

从一开始就打算作为一个前后端分离的项目，只是选择了博客进行尝试。前后端分离能让前端页面和后端服务器完全的解耦，这让开发的时候十分顺手。当然，首次访问请求还是需要由服务器返回页面。

首次访问，服务器直接返回主页面的index.html和相关静态文件，让浏览器直接渲染。但是这样还要单独进行SEO，所以后续可能会考虑做成服务端渲染，方便进行SEO和首屏优化、减少浏览器负担。当然除了如此，本博客由于不区分主页和文章页，不能只是简单的把浏览器渲染换成服务端渲染，需要识别用户和爬虫来返回不同的服务端渲染页面。

前后端请求体及数据交互格式为JSON，前端向后端发送请求，后端对请求体进行处理，向本地数据库服务器获取数据，并响应请求和返回数据。开发前，先确定好交互API，并且统一请求体及返回数据的格式，以便前后端分别开发时做到接口统一。

前端作为SPA应用，数据采用AJAX来获取。Panel式分块设计，不区分主页和博客页，滚动到下端自动加载后续文章。响应式布局和设计采用Bootstrap垃圾框架，jQuery的引入只是为了给Bootstrap使用。MVVM框架为Vue，采用单组件文件进行开发，使用起来很方便，文档也很好理解。对于AJAX使用Vue官方推荐的axios。

### 技术栈介绍

前端主要技术栈：
- Vue
- Vuex
- VueRouter
- axios
- Bootstrap
- jQuery

后端采用Node.js进行开发，使用经典的Express框架，主要处理好数据库操作和统一对外API接口即可。

后端主要技术栈：
- Node.js
- Express
- Mongolass
