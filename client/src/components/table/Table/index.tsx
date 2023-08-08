import React from 'react'
import { Datas } from '../../../App'
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';

interface Props {
    datas: Datas[];
}

const Table: React.FC<Props> = ({datas}) => {

    return (
        <div className="mt-8 flow-root ">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <TableHeader />
                        <TableBody datas={datas} />
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table