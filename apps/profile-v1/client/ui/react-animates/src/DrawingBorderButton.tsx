import { ReactNode } from "react"
import "./drawingBorderButton.style.css"

export const DrawingBorderButton = ({ children, className, onClick }: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {

  return (
    <button onClick={onClick} className={`drawingBtn draw-border ${className}`}>{
      children
    }</button>
  )
}