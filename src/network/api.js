import cookie from "js-cookie"
import { request } from './request'
import store from "@/store";


export function changeNickname(newNickname) {
  return request({
    url: "/sys/user/nickname",
    method: "PATCH",
    data: {
      "nickname": newNickname
    }
  })
}

export function postLabel(labelName, color) {
  return request({
    url: "/data/label",
    method: "POST",
    data: {
      "labelName": labelName,
      "color": color
    }
  })
}
export function deleteLabelById(labelId) {
  let finalPath = "/data/label" + getPath([labelId])
  console.log(finalPath)
  return request({
    url: finalPath,
    method: "DELETE"
  })
}

export function deleteCardById(cardId) {
  let finalPath = "/data/card" + getPath([cardId])
  return request({
    url: finalPath,
    method: "DELETE"
  })
}

export function requestCardForReview() {
  return request({
    url: "data/card/review",
    method: "GET"
  })
}

export function requestAllCard(label, startTime, endTime) {
  let path = "/data/card"
  let params = []
  params.push(label)
  if (startTime !== undefined && endTime !==undefined)
    params.push(startTime.format("YYYY-MM-DD"), endTime.format("YYYY-MM-DD"))
  let finalUrl = path + getPath(params)
  console.log(finalUrl);
  return request( {
    url: finalUrl,
    method: "GET"
  })
}

export function requestAllLabel() {
  return request({
    url: "/data/label",
    method: "GET"
  })
}

export function postNewCard(question, answer, labels) {
  return request({
    url: "/data/card",
    method: "POST",
    data: {
      "question": question,
      "answer": answer,
      "labels": labels
    }
  })
}

export function updateCard(id, newQuestion, newAnswer) {
  return request({
    url: "/data/card",
    method: "PATCH",
    data: {
      "id": id,
      "newQuestion": newQuestion,
      "newAnswer": newAnswer
    }
  })
}

export function postLogin(username, password) {
  return request({
    url: "/sys/login",
    method: "POST",
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

export function cacheLoginStatus(userData) {
  store.commit("setLoginStatus", true);  // 缓存登陆状态
  //存储认证token和认证时间
  window.sessionStorage.setItem("token", userData.token);
  window.sessionStorage.setItem("tokenCreateTime", new Date() + "")
  window.sessionStorage.setItem("nickname", userData.nickname)
}

function getPath(params) {
  let res = ""
  for (let i = 0; i < params.length; i++) {
    if (params[i] != null && params[i].length !== 0)
      res += '/' + params[i]
  }
  return res
}
