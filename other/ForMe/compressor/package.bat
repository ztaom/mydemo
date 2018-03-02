for /f %%i in (css_list.txt) do type %%i >> temp.css
java -jar yuicompressor-2.4.2.jar --type css --charset utf-8 temp.css -o ..\resource\libs\css\gIfeng.css
del temp.css

for /f %%j in (js_list.txt) do type %%j >> temp.js
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 temp.js -o ..\resource\libs\js\gIfeng.js
del temp.js