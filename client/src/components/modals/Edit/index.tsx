import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../Input";
import Modal from "../Modal";
import {useAtom, useSetAtom} from "jotai";
import {datasAtom, editDataAtom, editModal} from "../../../atoms/Atom";
import {useEffect} from "react";


const Edit = () => {
    const [open, setOpen] = useAtom(editModal)
    const [editData, setEditData] = useAtom(editDataAtom)
    const setDatas = useSetAtom(datasAtom)

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            keyword: editData?.keyword,
            description: editData?.description
        }
    })

    useEffect(() => {
        reset({
            keyword: editData?.keyword,
            description: editData?.description
        });
    }, [editData, reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await fetch(`http://localhost:8800/api/todos/${editData?.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error("Fetch error");
            }

            setOpen(false)
            reset()
            setDatas((old) => {
                const index = old.findIndex((item) => item.id === editData?.id)
                const newData = [...old]
                newData[index] = {...old[index], ...data}
                return newData
            })
            setEditData(null)
            toast.success("Data Edited")
        } catch (err: unknown) {
            console.log(err)
        }


    }


    const body = (
        <div className="flex flex-col gap-5">
            <Input label="Keyword" register={register} errors={errors?.keyword} id="keyword"
                   required name="keyword" placeholder="Keyword"/>
            <Input label="Description" placeholder="Description" register={register} id="description"
                   errors={errors?.description} required name="description" />
        </div>
    )

    return (
        <Modal body={body} open={open} setOpen={setOpen} onSubmit={handleSubmit(onSubmit)} title="Edit"/>
    );
};

export default Edit;
