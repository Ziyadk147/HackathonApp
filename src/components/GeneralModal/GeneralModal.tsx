import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import getModel from "@/Helpers/getModel";
import updateNote from "@/Helpers/CRUD/updateNote";
import getNotes from "@/Helpers/CRUD/getNotes";

// @ts-ignore
export default function GeneralModal({ noteId, title, content, isNoteView, description, buttonName, onUpdate }) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [summary, setSummary] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const GeminiModel = getModel();

    async function handleSummarize() {
        setIsLoading(true);
        setError("");

        try {
            const prompt = `Summarize this: ${content} the best you can.`;
            const response = await GeminiModel.generateContent(prompt);

            if (!response) {
                throw new Error("No summary received.");
            }

            setSummary(response.response.text());
        } catch (err) {
            console.error("Summarization error:", err);
            setError(err.message || "Failed to summarize.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUpdate() {
        if (!summary) return;
        setIsUpdating(true);
        setError("");

        try {
            await updateNote(noteId, title, summary);
            setIsUpdating(false);
            setSummary(undefined)
            if (onUpdate) onUpdate(); // Refresh notes
            setIsOpen(false); // Closes modal on success
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message || "Failed to update.");
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-bg p-4 border border-b-4 border-r-4 border-stone-950" onClick={() => setIsOpen(true)}>
                    {buttonName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-10 bg-main border border-b-4 border-r-4 border-stone-950">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {isNoteView && (
                    <>
                        {summary ? (
                            <>
                                <Textarea value={summary} readOnly className="h-52" />
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="default"
                                        className="bg-green-500 border border-b-4 border-r-4 border-stone-950"
                                        onClick={handleUpdate}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Updating..." : "Update"}
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="bg-red-500 border border-b-4 border-r-4 border-stone-950"
                                        onClick={() => {
                                            setSummary(undefined)
                                            setIsOpen(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Textarea value={content} readOnly className="h-52" />
                                <Button
                                    variant="default"
                                    className="bg-bg border border-b-4 border-r-4 border-stone-950 mt-4"
                                    onClick={handleSummarize}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Summarizing..." : "Summarize"}
                                </Button>
                            </>
                        )}
                    </>
                )}

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </DialogContent>
        </Dialog>
    );
}
