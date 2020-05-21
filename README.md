# facialrecognition

Essential environment if you want to run our project at localhost: <br>
node , npm
*****************************************************
After download this project, users can use `npm install` command to install essential dependence.

If you want to preview the UI, you can use `npm run dev` command to run the project in localhost and see the effect at localhost:8080 port
*****************************************************

Page structures

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

VUE router<br>

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
`npm run build` command is to package the project for deployment.

Before package the whole project, pay attention to the code in main.js 32th line. Please change the ip address to what you need<br>

*****************************************************

*****************************************************
You can enjoy our final work at: <br>
http://118.178.254.65

We recommend to use google chrome web browser to look through our project.<br>
 The following link will show you how to give permission to the web browser so that it can use the camera in your devices.<br>
 [https://www.jianshu.com/p/751a9cb93a43][1]

[1]: https://www.jianshu.com/p/751a9cb93a43
