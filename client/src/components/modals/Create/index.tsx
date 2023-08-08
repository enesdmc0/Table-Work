import Input from "../../Input";
import Modal from "../Modal";
import React from "react";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form"
import toast from "react-hot-toast";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Create: React.FC<Props> = ({setOpen, open}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            keyword: "",
            description: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
       try{
        const response = await fetch("http://localhost:8800/api/todos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Fetch error");
        }
        setOpen(false)
        reset()
        toast.success("Data Created")
       }catch(err) {
        console.log(err)
       }
       
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
