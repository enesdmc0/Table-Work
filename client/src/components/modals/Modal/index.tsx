import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Button from "../../Button";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    body: React.ReactElement;
    title: string;
    onSubmit: () => void;
}

const Modal: React.FC<Props> = ({setOpen, open, onSubmit, body, title}) => {

    const handleSubmit = () => {
        onSubmit();
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative  transform overflow-hidden rounded-lg bg-[#22262F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-5 ">
                                        <h1 className="font-semibold text-[#8BAB49]">{title}</h1>
                                        {body}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button label="Create" type="button" onClick={handleSubmit} color="#8BAB49"/>
                                        <Button label="Cancel" type="button" onClick={handleCancel} color="#9B9B9B"/>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
