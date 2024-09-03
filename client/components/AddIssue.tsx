import { useState } from "react"

import { useIssuesStore } from "@/store/issuesSore";

import Modal from "./Modal"

const NewIssue = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const { loading, error, addIssue } = useIssuesStore()
    let interval: any;

    return (
        <Modal
            title="New Issue"
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={ () => {
                let conf = confirm("Are you sure you want to add this issue?")
                if (conf) {
                    addIssue({title, description})
                    interval = setInterval(() => {
                        if (!loading && !error) {
                            onClose()
                            clearInterval(interval)
                        }
                    }, 400)
                }
            } }>
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="issue_title">Issue Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="issue_title" placeholder="Issue Title" required />
                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="issue_description">Issue Description</label>
                        <textarea onChange={(e) => setDesc(e.target.value)} value={description} rows={4} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" name="issue_description" required />
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default NewIssue;