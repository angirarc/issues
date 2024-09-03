interface ModalProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const Modal = ({ title, children, isOpen, onClose, onSubmit }: ModalProps) => {
    return (
        <div className={ `main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden justify-center items-center animated ${ isOpen ? "fadeIn flex" : "fadeOut hidden" } faster` } style={{ background: "rgba(0,0,0,.7)" }}>
            <div
                className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl text-black font-bold">{ title }</p>
                        <div onClick={ onClose } className="modal-close cursor-pointer z-50">
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="my-5">
                        { children }
                    </div>
                    <div className="flex justify-end pt-2">
                        <button onClick={ onClose } className="focus:outline-none modal-close px-4 bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-400">Cancel</button>
                        <button onClick={ onSubmit } className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-400">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal