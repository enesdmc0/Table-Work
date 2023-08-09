import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import {useAtomValue} from "jotai";
import {datasAtom} from "../../../atoms/Atom";


const Table = () => {
    const datas = useAtomValue(datasAtom)
    if (datas?.length === 0) return (
        <div className="flex  items-center justify-center h-full p-20 w-full bg-[#2B303B] mt-5 text-[#9B9B9B] font-semibold rounded-md">Data not found!</div>
    )

    return (
        <div className="mt-8 flow-root bg-[#2B303B] rounded-md py-3 px-5">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full border rounded-md overflow-hidden">
                        <TableHeader />
                        <TableBody />
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table