import React from 'react'
import Button from "../Button";
import { BsPlus } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Datas } from '../../App';
import toast from "react-hot-toast";
interface Props {
    datas: Datas[];
    setEditId: (id: string) => void;
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ datas, setEditId, setEditModal, setCreateModal }) => {

    const handleDelete = async () => {
        const filteredData = datas?.filter(data => data.selected)
        if (filteredData?.length === 0) {
            toast.error("Please select data")
            return
        }
        try {
            datas?.filter(data => data.selected).forEach(async data => {
                const response = await fetch(`http://localhost:8800/api/todos/${data.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error("Fetch error");
                }
            });
            toast.success("Data Deleted")
        } catch (error: unknown) {
            console.log(error);
        }
    }

    const handleEdit = () => {
        const findData = datas.filter(data => data.selected)

        if (findData.length === 0) {
            toast.error("Please select data")
            return
        }
        else if (findData.length > 1) {
            toast.error("Please select one data")
            return
        }
        setEditId(findData[0].id)
        setEditModal((prev: boolean) => !prev)
    }

    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block  border-b outline-none py-1.5 px-2 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
                    <div>{datas.length}</div>
                    <Button label="New Add" icon={BsPlus} type="button" onClick={() => setCreateModal(prev => !prev)} color="#93c5fd" />
                    <Button label="Edit" icon={AiOutlineEdit} type="button" onClick={handleEdit} color="#86efac" />
                    <Button label="Delete" icon={AiOutlineDelete} type="button" onClick={handleDelete} color="#fca5a5" />
                </div>
            </div>
        </>
    )
}

export default Header