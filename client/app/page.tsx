"use client"

import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";

import { Issue } from "@/types/models";
import useToggle from "@/hooks/useToggle";
import { useIssuesStore } from "@/store/issuesSore";

import Modal from "@/components/Modal";
import IssueCard from "@/components/IssueCard";
import EditIssue from "@/components/EditIssue";
import NewIssue from "@/components/AddIssue";

export default function Home() {
  const { issues, getIssues } = useIssuesStore();
  const [issue, setIssue] = useState<Issue>();
  const [isOpen, toggleOpen] = useToggle();

  useEffect(() => {
    getIssues()
  }, [getIssues])

  const selectIssue = (x: Issue) => {
    setIssue(x)
    toggleOpen()
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
      <div className="w-2/3">
        <div className="flex justify-between">
          <h2 className="text-2xl">Issue Tracker App</h2>
          <button
            onClick={ toggleOpen }
            className="flex items-center gap-2 px-4 py-2 font-sans bg-white text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-100"
            type="button">
            New Issue
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {
            issues.map(issue => <IssueCard key={issue.id} issue={issue} />)
          }
          <NewIssue
            isOpen={isOpen}
            onClose={toggleOpen} />
          {/* <EditIssue
            issue={issue}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            onSubmit={() => {
              toggleOpen()
              getIssues()
            }} /> */}
        </div>
      </div>
    </main>
  );
}
