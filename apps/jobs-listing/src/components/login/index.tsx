import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { useEffect } from "react";
import { LoginForm } from "./LoginForm";

export const LoginComponent = observer(() => {

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

  return (
    <Flex fullWidth center>
      <Flex className="login_page" fullWidth maxWidth={PAGE_MAX_WIDTH} column>
        <LoginForm />
      </Flex>
    </Flex>
  )
})