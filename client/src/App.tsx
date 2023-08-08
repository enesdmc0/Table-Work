
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
    const [activePage, setActivePage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)

     const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8800/api/todos/?page=${activePage}`,)
            if (!response.ok) {
                throw new Error("Fetch error");
            }
            const { todos, totalPages, currentPage } = await response.json()
            setDatas(todos)
            setTotalPage(totalPages)
            setCurrentPage(currentPage)
        } catch (err: unknown) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [activePage])


    return (
        <div className="h-full w-full">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border mt-10">
                <div className="px-4 sm:px-6 lg:px-8 pt-10">
                    <Header fetchData={fetchData} totalPage={totalPage} currentPage={currentPage} datas={datas} setEditId={setEditId} setEditModal={setEditModal} setCreateModal={setCreateModal} />
                    <Table fetchData={fetchData} datas={datas} />
                    <Pagination activePage={activePage} setActivePage={setActivePage} />
                </div>
            </div>
            <Create fetchData={fetchData} open={createModal} setOpen={setCreateModal} />
            <Edit fetchData={fetchData} open={editModal} setOpen={setEditModal} editId={editId} setEditId={setEditId} />
        </div>
    )
}

export default App
