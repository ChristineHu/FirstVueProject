# FirstVueProject
该案例来源于慕课网Jokcy老师的Vue+Webpack打造todo应用   网址https://www.imooc.com/learn/935

经过学习，对vue以及webpack有了基本的认识，是非常好的一门课程
因为老师使用的webpack是3.x的版本，现在webpack更新为4，所以有些内容作了如下更新，记录如下。

# 1.需要安装webpack-cli
# 2.插件中需要使用VueLoaderPlugin(),不然会报错
# 3.使用extract-text-webpack-plugin插件时，需要安装使用 4.0 beta 版，npm install --save-dev extract-text-webpack-plugin@next
# 4.CommonsChunkPlugin要在4.0版本被移除了，要使用config.optimization来实现之前的工作
