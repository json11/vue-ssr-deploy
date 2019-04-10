# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法
```
git clone https://github.com/Jokcy/vue-todo-tech.git
```
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目



# 发布部署项目步骤
[本地测试]
[1] pm2 start pm2.yml --env production ; 本地可以查看 localhost:8888(本地测试，没问题推到git上)
[以下操作都是在服务器中进行的]
[2] ssh root@118.25.135.132 (git bash 打开， 先连接远程服务器IP ， )
[3] cd projects/ (将项目部署在projects 下面)
[4] git clone url (将git 项目拉到服务器上)
[5] cd vue-ssr-tech/ (进去项目目录)
[6] npm i (安装依赖包)
[7] npm run build(生成文件)
[8] pm2 start pm2.yml (启动服务)
[9] 用nginx 做反向代理， 访问我们启动的服务
