#!/bin/sh
# tnpm run build
version=$(awk -F: '/\"version\"\:/' ./package.json | awk -F \" '{print $4}')
branch="daily/$version"
tag="publish/$version"
git pull origin master
git add ./
git commit -m "publish cdn"
git branch -D tmp
git checkout -b tmp
git branch -D "$branch"
git checkout -b "$branch"
git push origin "$branch"
git tag "$tag" --delete
git tag "$tag"
git push origin "$tag"