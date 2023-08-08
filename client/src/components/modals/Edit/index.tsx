import React, {useEffect} from 'react';
import {Datas} from "../../../App.tsx";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../Input";
import Modal from "../Modal";

interface Props {
    open: boolean;
    setOpen: (edit: boolean) => void;
    datas: Datas[];
    setDatas: (datas: Datas[]) => void;
}

const Edit: React.FC<Props> = ({open, setOpen, datas, setDatas}) => {
    const [editData, setEditDatas] = React.useState<Datas[]>([])

    useEffect(() => {
        setEditDatas(datas.filter(data => data.selected))
    }, [datas])

    const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm<FieldValues>()

    useEffect(() => {
        if (editData.length > 0) {
            setValue("keyword", editData[0].keyword);
            setValue("description", editData[0].description);
        }
    }, [editData, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const updatedDatas = datas.map(item => {
            if (item.selected) {
                return {
                    ...item,
                    keyword: data.keyword,
                    description: data.description,
                }
            }
            return item
        })
        setDatas(updatedDatas)
        setOpen(false)
        reset()
        toast.success("Data Edited")
    }


    const body = (
        <div className="flex flex-col gap-5">
            <Input label="Keyword" register={register} errors={errors?.keyword} id="keyword"
                   required name="keyword" placeholder="Keyword"/>
            <Input label="Description" placeholder="Description" register={register} id="description"
                   errors={errors?.description} required name="description"/>
        </div>
    )

    return (
        <Modal body={body} open={open} setOpen={setOpen} onSubmit={handleSubmit(onSubmit)} title="Edit"/>
    );
};

export default Edit;
