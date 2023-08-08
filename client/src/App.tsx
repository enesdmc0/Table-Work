
import { useEffect, useState } from "react";
import Create from "./components/modals/Create";
import Edit from "./components/modals/Edit";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Table from "./components/table/Table";

export interface Datas {
    id: string;
    keyword: string;
    no: string;
    description: string;
    createdAt: string;
    selected: boolean;
}

function App() {
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [datas, setDatas] = useState<Datas[]>([])
    const [editId, setEditId] = useState<string>("")

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await fetch("http://localhost:8800/api/todos")
                if (!response.ok) {
                    throw new Error("Fetch error");
                }
                const data = await response.json()
                setDatas(data)
            } catch (err: unknown) {
                console.log(err)
            }
        }
        fetchDatas()
    }, [datas])


        return (
            <div className="h-full w-full">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border mt-10">
                    <div className="px-4 sm:px-6 lg:px-8 pt-10">
                        <Header datas={datas} setEditId={setEditId} setEditModal={setEditModal} setCreateModal={setCreateModal} />
                        <Table datas={datas} />
                        <Pagination />
                    </div>
                </div>
                <Create open={createModal} setOpen={setCreateModal} />
                <Edit open={editModal} setOpen={setEditModal} editId={editId} setEditId={setEditId} />
            </div>
        )
    }

    export default App
