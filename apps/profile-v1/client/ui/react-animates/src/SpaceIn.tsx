import { ReactNode } from "react";
import "./spaceIn.style.css"

export const SpaceIn = ({
  className,
  id,
  children,
  classes
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  classes?: {
    space?: string;
  }
}) => {

  return <div id={`spacein-${id}`} className={`${className}`}>
    <div className="relative ">
      <div className="absolute top-0 left-0 w-full h-[70%] bg-transparent z-[60] rounded-full">
        <div className="flex w-full h-full justify-center items-center pb-10 bg-transparent rounded-full">
          <div className="animate-slide_up">
            {children && children}
          </div>
        </div>
      </div>
      <div className="flex w-full h-full justify-center items-end">
        <div className={`space-rotate-x  bg-transparent flex items-center justify-center w-28 h-28 transition-[rotateZ(80deg)] duration-0 ${classes?.space}`}>
          <div className="duration-0 w-[90%] h-[90%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-danger-200 rounded-full shadow-inner">
            <div className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-danger-200 rounded-full shadow-inner">
              <div className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-danger-200 rounded-full shadow-inner">
                <div className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-danger-200 rounded-full shadow-inner">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}