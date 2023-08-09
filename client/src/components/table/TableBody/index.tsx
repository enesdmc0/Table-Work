import {useAtomValue, useSetAtom} from "jotai";
import {datasAtom, filteredDatasAtom} from "../../../atoms/Atom";



const TableBody = () => {
    const filteredDatas = useAtomValue(filteredDatasAtom)
    const setDatas = useSetAtom(datasAtom)
    const handleClick = async (id: string, selected: boolean) => {
        try {
            const response = await fetch(`http://localhost:8800/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({selected})
            })
            if (!response.ok) {
                throw new Error("Fetch error");
            }

            const data = await response.json();
            setDatas((prevDatas) =>
                prevDatas.map((item) => (item.id === data.id ? data : item))
            );
        } catch (err: unknown) {
            console.log(err)
        }

    }


    return (
        <tbody className="divide-y divide-[#9B9B9B] text-[#9B9B9B] font-semibold ">
        {filteredDatas?.map((item) => (
            <tr key={item.id} className="hover:bg-[#22262F]/20 px-2 cursor-pointer">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <div onClick={() => handleClick(item.id, item.selected)} className={`${item.selected ? "bg-[#8BAB49]" : "bg-[#9B9B9B]"}  cursor-pointer  w-4 h-4 border `}/>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.no}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.keyword}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdAt}</td>
            </tr>
        ))}
        </tbody>
    )
}

export default TableBody