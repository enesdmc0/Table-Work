import ReactPaginate from "react-paginate";
import {useAtomValue, useSetAtom} from "jotai";
import {currentPageAtom, totalPageAtom} from "../../atoms/Atom";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

const Pagination = () => {
    const setCurrentPage = useSetAtom(currentPageAtom)
    const totalPage = useAtomValue(totalPageAtom)

    const handlePageChange = ({selected}: { selected: number }) => {
        setCurrentPage(selected);
    };
    return (
        <div className="bg-[#2B303B] text-[#9B9B9B] font-semibold rounded-md">
            <ReactPaginate className={"flex items-center justify-center py-2 gap-5 mt-5"}
                           previousLabel={<AiOutlineLeft
                               className="inline-block rounded-full h-6 w-6 border border-[#9B9B9B] hover:bg-[#9B9B9B] transition-all duration-200"
                               aria-hidden="true"/>}
                           nextLabel={<AiOutlineRight
                               className="inline-block rounded-full h-6 w-6 border border-[#9B9B9B] hover:bg-[#9B9B9B] transition-all duration-200"
                               aria-hidden="true"/>}
                           breakLabel="..."
                           pageCount={totalPage}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={handlePageChange}
                           containerClassName="pagination"
                           activeClassName="rounded-full bg-[#8BAB49] text-white px-3 py-1 transition-all duration-200"
            />
        </div>
    )
}

export default Pagination