import React from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface Props {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({ activePage, setActivePage }) => {

  const handleIncrement = () => {
    setActivePage((prev: number) => prev + 1)
  }

  const handleDecrement = () => {
    setActivePage((prev: number) => prev - 1)
  }

  return (
    <>
      <div className="flex items-center justify-end gap-5">
        <div>
          <AiOutlineDoubleLeft className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
          <AiOutlineLeft onClick={handleDecrement} className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <div>
          Sayfa 1 - Toplam 1
        </div>
        <div>
          <AiOutlineRight onClick={handleIncrement} className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
          <AiOutlineDoubleRight  className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}

export default Pagination