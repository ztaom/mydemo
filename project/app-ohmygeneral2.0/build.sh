#!/bin/bash

set -e

daily="daily"

if [[ $BUILD_GIT_BRANCH =~ $daily ]]
then
    echo "daily_build"
    npm run cloud_daily_build
    # if [[ $? -ne 0 ]]
    # then
    #     echo "daily build failed"
    #     exit 1
    # fi
else
    echo "production_build"
    npm run cloud_publish_build
    # if [[ $? -ne 0 ]]
    # then
    #     echo "publish build failed"
    #     exit 1
    # fi
    # 按版本生成入口文件
    dirname=${BUILD_GIT_BRANCH##*/}
    mkdir -p ./build/$dirname/
    cp ./build/*.html ./build/$dirname/
fi
