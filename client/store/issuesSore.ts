'use client';

import { create } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { Issue } from '../types/models';

import httpClient, { getErrorMessage } from '../utils/httpClient';

type IssueFields = Omit<Issue, 'id'>

interface IssuesState {
    loading: boolean;
    error?: string;
    issues: Issue[];
    issue?: Issue;
    getIssues: () => void;
    getIssue: (id: string) => void;
    addIssue: (payload: IssueFields) => void;
    updateIssue: (payload: Issue) => void;
    deleteIssue: (id: number) => void;
}

export const useIssuesStore = create<IssuesState>((set, get) => ({
    loading: false,
    error: undefined,
    issues: [],
    issue: undefined,
    getIssues: async () => {
        // Debouncer
        if (get().loading) return;

        try {
            const { data } = await httpClient.get<Issue[]>('/issues');
            set({ issues: data, issue: undefined, loading: false });
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), { variant: 'error' });
        }
    },
    getIssue: async (id: string) => {
        // Debouncer
        if (get().loading) return;

        try {
            const { data } = await httpClient.get<Issue>(`/issues/${id}`);
            set({ issue: data, loading: false });
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), { variant: 'error' });
        }
    },
    addIssue: async (payload: IssueFields) => {
        // Debouncer
        if (get().loading) return;

        try {
            await httpClient.post<Issue>('/issues', payload);
            set({ loading: false });
            enqueueSnackbar("Issue created successfully", { variant: 'success' });
            get().getIssues();
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), { variant: 'error' });
        }
    },
    updateIssue: async (payload: Issue) => {
        // Debouncer
        if (get().loading) return;

        try {
            await httpClient.patch<Issue>(`/issues/${payload.id}`, payload);
            set({ loading: false });
            enqueueSnackbar("Issue updated successfully", { variant: 'success' });
            get().getIssues();
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), { variant: 'error' });
        }
    },
    deleteIssue: async (id: number) => {
        // Debouncer
        if (get().loading) return;

        try {
            await httpClient.delete<Issue>(`/issues/${id}`);
            set({ loading: false });
            enqueueSnackbar("Issue deleted successfully", { variant: 'success' });
            get().getIssues();
        } catch (e) {
            enqueueSnackbar(getErrorMessage(e), { variant: 'error' });
        }
    }
}));
