import { get, patch } from "../api.js";
import { ApiUrl } from "../constants/ApiUrl.js";

const pwChangeBox = document.querySelector("#change-password-container");
const userPassword = document.querySelector("#user-password");
const changePasswordInput = document.querySelector(".changePassword");
const changePasswordCheck = document.querySelector(".changePasswordCheck");
const currentPassword = document.querySelector(".currentPassword");

export function openPasswordPage(e) {
  e.preventDefault();

  pwChangeBox.style.display = "flex";
}

export async function changePassword(e) {
  e.preventDefault();

  const userData = await get(ApiUrl.USER_INFORMATION);

  const newPassword = {
    password: currentPassword.value,
    newPassword: changePasswordInput.value,
  };

  if (
    currentPassword.value == "" ||
    changePasswordInput.value == "" ||
    changePasswordCheck.value == ""
  ) {
    alert("비밀번호 입력칸을 확인해주세요.");
    return;
  }
  if (changePasswordInput.value !== changePasswordCheck.value) {
    alert("새로운 비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    await patch("/api/auth", "user", newPassword);
    console.log("비밀번호가 변경되었습니다.");
    userPassword.innerHTML = changePasswordInput.value;
    pwChangeBox.style.display = "none";
  } catch (e) {
    alert("문제가 발생했습니다. 다시 시도해주세요.");
  }
}