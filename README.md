# facialrecognition

面部识别项目

环境 node  npm
*****************************************************
开发模式

cd 到项目文件夹目录下 `npm install`

`npm run dev`  启动项目，在localhost:8080端口可以进行调试
*****************************************************

页面结构

>adminPage:  /admin
>>>（ admin的登陆页  {{ 账号 admin / 密码 admin }} ）

>finish: /finish
>>> 结束作答后跳转的界面

>loginPage: /loginPage
>>> ( 登陆时需要 {{ username: 学号 / password: 密码 }} )

>questionPage: /question
>>>（ 测试时候需要从 userPage传递参数 {{ username: 学号 }}   )

>register: /register
>>> ( 注册时 需要 {{ username: 学号 / password: 密码 / name: 姓名 }}  )  '''注意位置'''

>studentDetail: /studentDetail/'student_id'
>>> ( 学生考试详情页 从adminPage点详情查看某个学生考试详情 'detail'按钮传递参数{{ username: 学号}}  )

>userPage: /userPage/'student_id'
>>> ( 'to'按钮会把参数为'16206455'的学号传递到questionPage 后续将以16206455为登录用户进行考试 )

*****************************************************

路由跳转

loginPage

           ---register

           ---admin

           ---userPage/'id'


register

           ---userPage/'id'


admin

           ---studentDetail/'id'


userPage

            ---questionPage


questionPage

            ---finish

*****************************************************
`npm run build` 前需要改动:<br>
main.js 32行 默认路径由localhost改为端口号<br>
userPage中的to按钮删掉
*****************************************************


5.1 需改动  <br>
admin中接口变更 显示准确度<br>


css还需要增加<br>
admin 1.页面布局  2.新增warning_score对比分数的表格 微信里dong发了文档  3.功能性问题 直接加载表格<br>
questionPage 五道题目的英文显示 冬哥英语实在太粪了  还得改正确答案<br>
studentDetail 表格布局<br>
questionPage 1.布局 2.点击'start exam'前 输入框隐藏 3.代码输入框缩进问题<br>


*****************************************************
最终发布地址<br>
118.178.254.65

浏览器打开镜头权限问题 [https://www.jianshu.com/p/751a9cb93a43][1]

[1]: https://www.jianshu.com/p/751a9cb93a43
