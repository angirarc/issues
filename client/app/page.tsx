"use client"

import { useEffect } from "react";
import { SnackbarProvider } from "notistack";

import useToggle from "@/hooks/useToggle";
import { useIssuesStore } from "@/store/issuesSore";

import NewIssue from "@/components/AddIssue";
import IssueCard from "@/components/IssueCard";

export default function Home() {
  const { issues, getIssues } = useIssuesStore();
  const [isOpen, toggleOpen] = useToggle();

  useEffect(() => {
    getIssues()
  }, [getIssues])

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
        </div>
      </div>
    </main>
  );
}
