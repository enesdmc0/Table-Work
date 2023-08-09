import {atom} from "jotai"
import {Datas} from "../../App.tsx";

export const editModal = atom<boolean>(false);
export const createModal = atom<boolean>(false);

export const datasAtom = atom<Datas[]>([]);

export const currentPageAtom = atom<number>(0);

export const totalPageAtom = atom<number>(0);

export const editIdAtom = atom<string | null>(null);

export const totalDatasAtom = atom<number>(0);

export const editDataAtom = atom<Datas | null>(null);

export const startIndexAtom = atom( (get) => {
    const currentPage = get(currentPageAtom);
    const perPage = 5;
    const startIndex = currentPage * perPage  + 1;
    return startIndex;
})
export const endIndexAtom = atom( (get) => {
    const startIndex = get(startIndexAtom);
    const perPage = 5;
    const endIndex = startIndex  + perPage - 1;
    if (endIndex > get(totalDatasAtom)) {
        return get(totalDatasAtom);
    }
    return endIndex;
})

export const searchAtom = atom<string>("");
export const filteredDatasAtom = atom( (get) => {
    const datas = get(datasAtom);
    const search = get(searchAtom);
    if (!search) return datas;
    return datas.filter(data => data.keyword.toLowerCase().includes(search.toLowerCase()))
})

export const filteredDatasLengthAtom = atom( (get) => {
    const filteredDatas = get(filteredDatasAtom);
    const search = get(searchAtom);
    const totalDatas = get(totalDatasAtom);
    if(!search) return totalDatas;
    return filteredDatas.length;
})