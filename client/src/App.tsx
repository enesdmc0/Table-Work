import Button from "./components/Button";
import {BsPlus} from "react-icons/bs";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {useState} from "react";
import Create from "./components/modals/Create";
import toast from "react-hot-toast";
import Edit from "./components/modals/Edit";

export interface Datas {
    keyword: string;
    no: string;
    description: string;
    createdAt: string;
    selected: boolean;
}

function App() {
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [datas, setDatas] = useState<Datas[]>([
        {keyword: 'Kelime 1', no: "1", description: 'Front-end Developer', createdAt: '7 Ağu, 11:43:21', selected: false},
        {keyword: 'Kelime 2', no: "2", description: 'Front-end Developer', createdAt: '7 Ağu, 11:43:21', selected: false},
        {keyword: 'Kelime 3', no: "3", description: 'Front-end Developer', createdAt: '7 Ağu, 11:43:21', selected: false},
        {keyword: 'Kelime 4', no: "4", description: 'Front-end Developer', createdAt: '7 Ağu, 11:43:21', selected: false},
    ])
    const handleChange = (no: string) => {
        setDatas( prev => prev.map(data => {
            if (data.no === no) {
                return {
                    ...data,
                    selected: !data.selected
                }
            }
            return data
        }))
    }

    const handleDelete = () => {
        const deletedDatas = datas.filter(data => data.selected)
        if (deletedDatas.length === 0) {
            toast.error("Please select data")
            return
        }
        setDatas(prev => prev.filter(data => !data.selected))
        toast.success("Data Deleted")
    }

    const handleEdit = () => {
        const findData = datas.filter(data => data.selected)
        console.log(findData ,"findData")
        if (findData.length === 0) {
            toast.error("Please select data")
            return
        }
        else if (findData.length > 1) {
            toast.error("Please select one data")
            return
        }

        setEditModal(prev => !prev)
    }

    return (
        <div className="h-full w-full">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border mt-10">
                <div className="px-4 sm:px-6 lg:px-8 pt-10">
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
                            <Button label="New Add" icon={BsPlus} type="button" onClick={() => setCreateModal(prev => !prev)} color="#93c5fd"/>
                            <Button label="Edit" icon={AiOutlineEdit} type="button" onClick={handleEdit} color="#86efac"/>
                            <Button label="Delete" icon={AiOutlineDelete} type="button" onClick={handleDelete} color="#fca5a5"/>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            q
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Sıra No
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Anahtar Kelime
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Açıklama
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Oluşturma/Güncelleme Tarihi
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {datas.map((person) => (
                                        <tr key={person.no}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                <input checked={person.selected} onChange={() => handleChange(person.no)}
                                                    name="comments"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.no}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.keyword}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.description}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.createdAt}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <div>
                            <AiOutlineDoubleLeft className="inline-block h-5 w-5 text-gray-400" aria-hidden="true"/>
                            <AiOutlineLeft className="inline-block h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                        <div>
                            Sayfa 1 - Toplam 1
                        </div>
                        <div>
                            <AiOutlineRight className="inline-block h-5 w-5 text-gray-400" aria-hidden="true"/>
                            <AiOutlineDoubleRight className="inline-block h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                    </div>
                </div>
            </div>
            <Create open={createModal} setOpen={setCreateModal} datas={datas} setDatas={setDatas}/>
            <Edit open={editModal} setOpen={setEditModal} datas={datas} setDatas={setDatas}/>
        </div>
    )
}

export default App
