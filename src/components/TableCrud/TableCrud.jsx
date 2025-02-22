import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import ModalButton from "../ModalButton/ModalButton.tsx";
import { useEffect, useState } from "react";
import getNotes from "@/Helpers/CRUD/getNotes.js";
import GeneralModal from "../GeneralModal/GeneralModal.tsx";
import deleteNote from "@/Helpers/CRUD/deleteNote.js";
import { auth } from "../../firebaseConfig.js";
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import getModel from "@/Helpers/getModel.js";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { ToastAction } from '@/components/ui/toast'
import {toast, useToast} from '@/hooks/use-toast'
export default function TableCrud() {
    const [notes, setNotes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [previousPages, setPreviousPages] = useState([]);
    const pageSize = 5;
    const navigate = useNavigate();
    const { toast } = useToast()


    async function getNote(lastDoc = null, isNext = true) {
        const { notes, lastVisible } = await getNotes(pageSize, lastDoc);
        setNotes(notes);
        setLastVisible(lastVisible);

        if (isNext && lastDoc) {
            setPreviousPages((prev) => [...prev, lastDoc]);
        }
    }

    useEffect(() => {
        getNote();
    }, []);

    async function deletenote(noteId) {
        try{
            await deleteNote(noteId);
            toast({
                title: "Success",
                description: 'Note Deleted Successfully!',
            });
            getNote();
        }
        catch(e) {
            toast({
                style:{backgroundColor:" #ff6b6b"},
                title: "Error",
                description: `Error Deleting Node: ${e}`,
            });
        }
    }

    async function handleLogout() {
        try {
            await signOut(auth);
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error("Error logging out", error);
        }
    }

    function handlePaginateNext() {
        if (lastVisible) {
            getNote(lastVisible, true);
        }
    }

    function handlePaginatePrevious() {
        if (previousPages.length > 0) {
            const prevPage = previousPages[previousPages.length - 2] || null;
            setPreviousPages((prev) => prev.slice(0, -1));
            getNote(prevPage, false);
        }
    }

    return (
        <>
            <div className="flex flex-row w-full justify-end mb-2">
                <Button className="bg-bg border border-b-4 border-r-4 border-stone-950" onClick={handleLogout}>
                    Logout
                </Button>
                <ModalButton onUpdate={getNote} buttonName="Create Note" buttonColor={"bg-bg"} />
            </div>
            <div className="flex flex-row w-full border border-b-4 border-r-4 border-stone-950">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Note Title</TableHead>
                            <TableHead>Note Content</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notes.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    {item.content.length > 50 ? item.content.substring(0, 50) + "..." : item.content}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <GeneralModal
                                            title={item.title}
                                            description={item.title + "'s Note"}
                                            buttonName="View"
                                            isNoteView
                                            content={item.content}
                                            noteId={item.id}
                                            onUpdate={getNote}
                                        />
                                        <ModalButton
                                            buttonName="Edit"
                                            edit
                                            buttonColor="bg-bg"
                                            title="Edit Note"
                                            description="Edit the Note"
                                            initialData={item}
                                            onUpdate={getNote}
                                        />
                                        <Button
                                            className="bg-bg border border-b-4 border-r-4 border-stone-950"
                                            onClick={() => deletenote(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex w-full ">
                <Pagination className="flex justify-end my-2">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="bg-bg border border-b-4 border-r-4 border-stone-950"
                                style={{ cursor: "pointer" }}
                                onClick={handlePaginatePrevious}
                                disabled={previousPages.length === 0}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className="bg-bg border border-b-4 border-r-4 border-stone-950"
                                style={{ cursor: "pointer" }}
                                onClick={handlePaginateNext}
                                disabled={!lastVisible}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </>
    );
}