import Input from "../../Input";
import Modal from "../Modal";
import React from "react";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form"
import {Datas} from "../../../App.tsx";
import toast from "react-hot-toast";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    datas: Datas[]
    setDatas: (datas: Datas[]) => void;
}

const Create: React.FC<Props> = ({setOpen, open, datas, setDatas}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            keyword: "",
            description: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setDatas([...datas, {
            no: "10",
            createdAt: "10.10.2021",
            selected: false,
            keyword: data.keyword,
            description: data.description,
        }])
        setOpen(false)
        reset()
        toast.success("Data Created")
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
        <Modal body={body} open={open} setOpen={setOpen} onSubmit={handleSubmit(onSubmit)} title="Create"/>
    );
};

export default Create;
