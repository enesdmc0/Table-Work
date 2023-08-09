import {useEffect} from "react";
import Create from "./components/modals/Create";
import Edit from "./components/modals/Edit";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Table from "./components/table/Table";
import _isEqual from 'lodash/isEqual';
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {currentPageAtom, datasAtom, totalDatasAtom, totalPageAtom} from "./atoms/Atom";

export interface Datas {
    id: string;
    keyword: string;
    no: string;
    description: string;
    createdAt: string;
    selected: boolean;
}

function App() {
    const currentPage = useAtomValue(currentPageAtom)
    const [datas, setDatas] = useAtom(datasAtom)
    const setTotalPages = useSetAtom(totalPageAtom)
    const setTotalDatas = useSetAtom(totalDatasAtom)


    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8800/api/todos/?page=${currentPage + 1}&limit=5`);
            if (!response.ok) {
                throw new Error("Fetch error");
            }
            const {todos, totalPages, totalDatas} = await response.json();
            if (!_isEqual(todos, datas)) {
                setDatas(todos);
                setTotalPages(totalPages);
                setTotalDatas(totalDatas);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, [currentPage, datas])


    return (
        <div className="h-full w-full">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10">
                <div className="px-4 sm:px-6 lg:px-8 pt-10">
                    <Header/>
                    <Table/>
                    <Pagination/>
                </div>
            </div>
            <Create/>
            <Edit/>

        </div>
    )
}

export default App
