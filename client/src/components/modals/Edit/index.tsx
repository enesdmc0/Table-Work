import React, {useEffect, useState} from 'react';
import {Datas} from "../../../App.tsx";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../Input";
import Modal from "../Modal";

interface Props {
    open: boolean;
    setOpen: (edit: boolean) => void;
    editId: string;
    setEditId: (id: string) => void;
}

const Edit: React.FC<Props> = ({open, setOpen, editId, setEditId}) => {
   const [editData, setEditData] = useState<Datas[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:8800/api/todos/${editId}`)
                if (!response.ok) {
                    throw new Error("Fetch error");
                }
                const data = await response.json()
                setEditData(data)
                fetchData()
            }catch(err: unknown) {
                console.log(err)
            }
        }
        fetchData()
    },[editId])
    

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>()

   

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
       try{
        const response = await fetch(`http://localhost:8800/api/todos/${editId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Fetch error");
        }
        setOpen(false)
        reset()
        setEditId("")
        toast.success("Data Edited")
       }catch(err: unknown) {
        console.log(err)
       }

    
       
    }


    const body = (
        <div className="flex flex-col gap-5">
            <Input label="Keyword" register={register} errors={errors?.keyword} id="keyword"
                   required name="keyword" placeholder="Keyword" defaultValue={editData[0]?.keyword}/>
            <Input label="Description" placeholder="Description" register={register} id="description"
                   errors={errors?.description} required name="description" defaultValue={editData[0]?.description}/>
        </div>
    )

    return (
        <Modal body={body} open={open} setOpen={setOpen} onSubmit={handleSubmit(onSubmit)} title="Edit"/>
    );
};

export default Edit;
