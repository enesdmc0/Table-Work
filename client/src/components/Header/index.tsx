import Button from "../Button";
import {BsPlus} from "react-icons/bs";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import toast from "react-hot-toast";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {
    createModal,
    datasAtom, editDataAtom,
    editModal,
    endIndexAtom, filteredDatasLengthAtom,
    startIndexAtom, totalDatasAtom,
} from "../../atoms/Atom";
import Search from "../Search";


const Header = () => {
    const [datas, setDatas] = useAtom(datasAtom)
    const setCreateModal = useSetAtom(createModal)
    const setEditModal = useSetAtom(editModal)
    const totalDatas = useAtomValue(filteredDatasLengthAtom)
    const startIndex = useAtomValue(startIndexAtom);
    const endIndex = useAtomValue(endIndexAtom)
    const setEditData = useSetAtom(editDataAtom)
    const setTotalDatas = useSetAtom(totalDatasAtom)

    const handleDelete = async () => {
        const selectedData = datas?.filter(data => data.selected);

        if (selectedData?.length === 0) {
            toast.error("Please select data");
            return;
        }

        try {
            const deletePromises = selectedData.map(async data => {
                const response = await fetch(`http://localhost:8800/api/todos/${data.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error("Fetch error");
                }

                return data.id;
            });

            const deletedIds = await Promise.all(deletePromises);
            setTotalDatas((prevTotal) => prevTotal - deletedIds.length);
            setDatas(prevDatas => prevDatas.filter(data => !deletedIds.includes(data.id)));
            toast.success("Data Deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async () => {
        const findData = datas.filter(data => data.selected)

        if (findData.length === 0) {
            toast.error("Please select data")
            return
        } else if (findData.length > 1) {
            toast.error("Please select one data")
            return
        }

        setEditData(findData[0])
        setEditModal((prev: boolean) => !prev)
    }

    return (
        <div className="md:flex md:items-center md:justify-between bg-[#2B303B] p-4 rounded-md">
            <Search/>
            <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
                <div className="flex items-center font-semibold text-white px-3 rounded-md bg-[#3C443A]">
                    Total: {totalDatas} - Todo {startIndex} ile {endIndex}
                </div>
                <Button label="New Add" icon={BsPlus} type="button" onClick={() => setCreateModal(prev => !prev)}
                        color="#343A47"/>
                <Button label="Edit" icon={AiOutlineEdit} type="button" onClick={handleEdit} color="#8BAB49"/>
                <Button label="Delete" icon={AiOutlineDelete} type="button" onClick={handleDelete} color="#9B9B9B"/>
            </div>
        </div>

    )
}

export default Header