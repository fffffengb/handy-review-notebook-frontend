import cookie from "js-cookie"
import {request} from './request'
import store from "@/store";


export function requestAllLabel() {
  return request({
    url: '/data/label',
    method: 'GET'
  })
}

export function postNewCard(question, answer, labels) {
  return request({
    url: '/data/card',
    method: 'POST',
    data: {
      "question": question,
      "answer": answer,
      "labels": labels
    }
  })
}

export function postLogin(username, password) {
  return request({
    url: '/sys/login',
    method: 'POST',
    requireLogin: false,
    data: {
      "username": username,
      "password": password
    }
  })
}

export function loginFromCookie() {
  const username = cookie.get("username");
  const password = cookie.get("password");
  return postLogin(username, password)
}

export function cacheLoginStatus(token) {
  store.commit("setLoginStatus", true);  // 缓存登陆状态
  //存储认证token和认证时间
  window.sessionStorage.setItem("token", token);
  window.sessionStorage.setItem("tokenCreateTime", new Date() + "")
}
