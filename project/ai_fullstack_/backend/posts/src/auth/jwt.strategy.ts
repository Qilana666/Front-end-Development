import { Injectable } from '@nestjs/common'
// 定义和集成 Passport 身份验证策略的基类 定规则
import { PassportStrategy } from '@nestjs/passport';
// 身份验证策略选择jwt
import {  Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // token 在哪里 Bearer 前缀  Authorization 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 不是直接调用 PassportStrategy(Strategy) 封装 
      // 自动化的去做 
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET || ""
      //去哪里找通行证？
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()：告诉安检员去 HTTP 请求头（Header）中查找，寻找格式为 Authorization: Bearer <token> 的字符串。
      // 是否检查有效期？
      // ignoreExpiration: false：不忽略过期时间。如果用户的 Token 过期了，安检员会直接拦截，不允许通行。
      // 如何验证真伪？
      // secretOrKey：使用环境变量中的密钥来验证 Token 的签名是否被篡改。这就像安检员手中的“防伪验证器”。
    });
  }
  // JWT  用户对象
  // 需要重写
  // validate方法 安检员核对护照真伪并登记信息
  async validate(payload) {
    // console.log(payload);
    return {
      id: payload.sub,
      name: payload.name
    }
  }
}