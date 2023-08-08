import React from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = () => {
  return (
    <>
    <div className="flex items-center justify-end gap-5">
                            <div>
                                <AiOutlineDoubleLeft className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
                                <AiOutlineLeft className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <div>
                                Sayfa 1 - Toplam 1
                            </div>
                            <div>
                                <AiOutlineRight className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
                                <AiOutlineDoubleRight className="inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                        </div>
    </>
  )
}

export default Pagination