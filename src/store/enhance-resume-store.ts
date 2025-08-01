// store/resume-store.ts
import { fileToBase64 } from '@/lib/utils/fileUtils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EnhanceResumeStore {
    resumeFileBase64: { name: string; type: string; base64: string } | null;
    resumeSuggestions: any;
    setResumeFile: (file: File | null) => void;
    setResumeSuggestions: (suggestions: any) => void;
    setResumeFileBase64: (fileBase64: { name: string; type: string; base64: string } | null) => void;
}
export const useEnhanceResumeStore = create<EnhanceResumeStore>()(
    persist(
        (set) => ({
            resumeFileBase64: null,
            resumeSuggestions: null,
            setResumeFile: async (file: File | null) => {
                if (file) {
                    const base64 = await fileToBase64(file);
                    set({
                        resumeFileBase64: {
                            name: file.name,
                            type: file.type,
                            base64: base64
                        }
                    });
                } else {
                    set({ resumeFileBase64: null });
                }
            },
            setResumeSuggestions: (suggestions: any) => set({ resumeSuggestions: suggestions }),
            setResumeFileBase64: (fileBase64: { name: string; type: string; base64: string } | null) => {
                set({ resumeFileBase64: fileBase64 });
            },
        }),
        {
            name: 'enhance-resume-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
