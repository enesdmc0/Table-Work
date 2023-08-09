
const TableHeader = () => {
    const header = ["", "Row Number", "Keyword", "Description", "Created/Updated Date"]
    return (
        <thead>
            <tr>
                {header.map((item, index) => (
                    <th key={index} scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white bg-[#8BAB49]/70 sm:pl-0  ">
                    {item}
                </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader