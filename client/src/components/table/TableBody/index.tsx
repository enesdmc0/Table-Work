import React from 'react'
import { Datas } from '../../../App'

interface Props {
    datas: Datas[]
}

const TableBody: React.FC<Props> = ({datas}) => {

    const handleChange = async (id: string, selected: boolean) => {
        try {
            const response = await fetch(`http://localhost:8800/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ selected })
            })
            if (!response.ok) {
                throw new Error("Fetch error");
            }


        } catch (err: unknown) {
            console.log(err)
        }

    }

    return (
        <tbody className="divide-y divide-gray-200">
            {datas.map((person) => (
                <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <input checked={person.selected} onChange={() => handleChange(person.id, person.selected)}
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
    )
}

export default TableBody