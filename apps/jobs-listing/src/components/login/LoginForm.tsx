import "./login.styles.css"
import { observer } from "@core-ui/react-mobx-state";
import { useEffect } from "react";
import { LazyImage } from "@core-ui/react-mui-core";
import { useLanguage } from "@/hooks/useLanguage";
import loginBg from "@/assets/images/bg/login_bg.png"
import loginBg2 from "@/assets/images/bg/login_bg_2.png"
import { useJobsListingStore, useLogin } from "@core-ui/react-job-listing";

export const LoginForm = observer(({
  isAdmin
}: {
  isAdmin?: boolean
}) => {
  const { getText } = useLanguage(loginTextsObj);
  const { userStore } = useJobsListingStore();
  const { onLogin } = useLogin(isAdmin);

  useEffect(() => {
    const body: any = document.querySelector("body");
    const modal: any = document.querySelector(".modal");
    const modalButton: any = document.querySelector(".modal-button");
    const closeButton: any = document.querySelector(".close-button");
    const scrollDown: any = document.querySelector(".scroll-down");
    let isOpened = false;

    const openModal = () => {
      if (modal && body) {
        modal.classList.add("is-open");
        body.style.overflow = "hidden";
      }
    };

    const closeModal = () => {
      if (modal && body) {
        modal.classList.remove("is-open");
        body.style.overflow = "initial";
      }
    };

    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        isOpened = true;
        if (scrollDown && scrollDown.style) scrollDown.style.display = "none";
        openModal();
      }
    });

    if (modalButton && closeButton) {
      modalButton.addEventListener("click", openModal);
      closeButton.addEventListener("click", closeModal);
    }

    document.onkeydown = evt => {
      evt = evt || window.event;
      evt.keyCode === 27 ? closeModal() : false;
    };
  }, [])

  return (<>
    <div className="scroll-down">
      {getText("SCROLL DOWN")}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
      </svg>
    </div>
    <div className="container"
      style={{
        backgroundImage: `url(${loginBg2})`,
      }}
    ></div>
    <div className="modal">
      <div className="modal-container">
        <div className="modal-left">
          <h1 className="modal-title">{getText("Welcome!")}</h1>
          <p className="modal-desc">
            {getText("Welcome back! Please log in to access your account and explore exclusive offers tailored just for you.")}
          </p>
          <div className="input-block">
            <label htmlFor="email" className="input-label">{getText("Email")}</label>
            <input onChange={(e) => userStore.loginData.email = e.target.value} type="email" name="email" id="email" placeholder={getText("Email")} />
          </div>
          <div className="input-block">
            <label htmlFor="password" className="input-label">{getText("Password")}</label>
            <input onChange={(e) => userStore.loginData.passward = e.target.value} type="password" name="password" id="password" placeholder={getText("Password")} />
          </div>
          <div className="modal-buttons">
            <a href="#" className="">{getText("Forgot your password?")}</a>
            <button className="input-button" onClick={
              () => {
                onLogin?.()
              }
            }>{getText("Login")}</button>
          </div>
          <p className="sign-up">{getText("Don't have an account?")} <a href="#">{getText("Sign up now")}</a></p>
        </div>
        <div className="modal-right">
          <LazyImage src={loginBg} alt="login-bg" />
        </div>
        <button className="icon-button close-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
          </svg>
        </button>
      </div>
      <button className="modal-button">{getText("Click here to login")}</button>
    </div>
  </>
  )
})

const loginTextsObj = {
  "VI": {
    "SCROLL DOWN": "CUỘN XUỐNG",
    "Welcome!": "Xin chào",
    "Email": "Hòm thư",
    "Welcome back! Please log in to access your account and explore exclusive offers tailored just for you."
      : "Chào mừng bạn trở lại! Vui lòng đăng nhập để truy cập vào tài khoản của bạn và khám phá các ưu đãi đặc biệt dành riêng cho bạn.",
    "Forgot your password?": "Bạn đã quên mật khẩu?",
    "Login": "Đăng nhập",
    "Don't have an account?": "Bạn chưa có tài khoản?",
    "Sign up now": "Đăng ký ngay",
    "Click here to login": "Nhấn vào đây để đăng nhập",
    "Password": "Mật khẩu"
  }
}