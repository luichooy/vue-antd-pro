#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 项目打包
yarn build --report

# 删除服务器上的代码
ssh root@192.0.0.0 "rm -rf /opt/app/vue-antd-pro/*"

# 上传到服务器
scp -r ./dist/* root@192.0.0.0:/opt/app/vue-antd-pro