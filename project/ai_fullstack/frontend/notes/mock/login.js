import jwt from "jsonwebtoken";  //签发token,验证token

const secret="dhjlsjoiweuue" //安全  密钥

export default [
  {
    //restful  一切皆资源
    url: '/api/auth/login',
    method: 'post',
    timeout: 2000, //模拟2秒响应
    response: (req, res) => {
      let {name,password}=req.body;
      name = name.trim();
      password=password.trim();
      console.log(name, password, '/////');
      //400 错误请求
      if (name === '' || password === "") {
        return {
          code: 400,   //bad request
          message:"用户名或密码不能为空"
        }
      }
      //401 未授权
      if (name !== 'admin' || password !== "123456") {
        return {
          code: 401,   //unauthorized
          message: "用户名或密码错误"
        }
      }
        //签发token
        const token = jwt.sign({
          user: { //json 对象
            id: 1,
            name: "admin",
            avatar:"https://p6-passport.byteacctimg.com/img/user-avatar/f86e9e751cf2ec87ff852dab35be84f4~130x130.awebp"  //用户头像
          }
          //加盐  加密
        }, secret, {
          expiresIn:86400*7  //有效时间
        })
        console.log(token, '/////');
        return {
          token,
          user:{
            id: 1,
            name: "admin",
            avatar:"https://p6-passport.byteacctimg.com/img/user-avatar/f86e9e751cf2ec87ff852dab35be84f4~130x130.awebp"
          }
          }
        }
  },
  {
    url: 'api/auth/check',
    method: 'get',
    response: (req, res) => {
      const token=req.headers['authorization'].split(' ')[1];
      // console.log(token);
      try {
        const decode = jwt.decode(token, secret);
        console.log(decode)
        return {
          code: 200,
          user: decode.user
        }
      }catch(err){
        return {
          code: 400,
          message: "invalid token"
        }
      }
    }
  }
]

