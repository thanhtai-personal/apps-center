import { AOS } from "@core-ui/react-animates"
import { useEffect } from "react"

const AOSTest = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return <div className="flex flex-col">
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-red-400 my-4 justify-center items-center"
    >1</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-green-400 my-4 justify-center items-center"
    >2</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-red-400 my-4 justify-center items-center"
    >3</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-green-400 my-4 justify-center items-center"
    >4</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-red-400 my-4 justify-center items-center"
    >5</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-green-400 my-4 justify-center items-center"
    >6</div>
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="w-full min-h-[350px] flex bg-red-400 my-4 justify-center items-center"
    >7</div>
  </div>
}


export default AOSTest