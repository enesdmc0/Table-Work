import {useAtom} from "jotai";
import {searchAtom} from "../../atoms/Atom";

const Search = () => {
    const [search, setSearch] = useAtom(searchAtom)
    return (
        <div className="min-w-0 flex-1">
            <div className="">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    name="search"
                    className="block bg-transparent text-white border-b outline-none py-1.5 px-2  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Search Todo"
                />
            </div>
        </div>
    );
};

export default Search;
