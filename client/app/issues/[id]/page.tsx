"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";

import { useIssuesStore } from "@/store/issuesSore";

import Back from "@/components/icons/Back";

export default function SingleIssue({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { issue, error, loading, getIssue, updateIssue } = useIssuesStore();

    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');

    let interval: any;

    useEffect(() => {
        getIssue(params.id)
    }, [getIssue, loading])

    if (loading)
        return <p>Loading...</p>

    const save = () => {
        let conf = confirm("Are you sure you want to edit this issue?")
        if (conf) {
            updateIssue({ title, description, id: Number(params.id) })
            interval = setInterval(() => {
                if (!loading && !error) {
                    router.back()
                    clearInterval(interval)
                }
            }, 400)
        }
    }

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            />
            <div className="w-1/3">
                <div className="flex items-center">
                    <Link href="/"><Back fontSize={20} /></Link>
                    <h2 className="ml-3 text-2xl">{issue?.title}</h2>
                </div>
                {
                    issue ?
                    <form className="w-full mt-3">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="issue_title">Issue Title</label>
                                <input defaultValue={issue?.title} onChange={(e) => setTitle(e.target.value)} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="issue_title" placeholder="Issue Title" required />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="issue_description">Issue Description</label>
                                <textarea defaultValue={issue?.description} onChange={(e) => setDesc(e.target.value)} rows={4} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" name="issue_description" required />
                            </div>
                        </div>
                    </form>
                    : <p>Loading...</p>
                }
                <div className="flex justify-end pt-2">
                    <Link href="/">
                        <button className="focus:outline-none modal-close px-4 bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-400">Back</button>
                    </Link>
                    <button onClick={ save } className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-400">Update Issue</button>
                </div>
            </div>
        </main>
    );
}