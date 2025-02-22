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

export default function TableCrud() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()


    async function getNote() {
        const note = await getNotes();
        setNotes(note);
    }

    useEffect(() => {
        getNote();
    }, []);

    async function deletenote(noteId){
        const deleted = await deleteNote(noteId)
        getNote()
    }

    async function handleLogout(){
        try {
            await signOut(auth);
            localStorage.removeItem("token")
            navigate('/')
        } catch (error) {
            console.error("Error logging out", error);
        }
    }


    return (
        <>
            <div className="flex flex-row w-full justify-end mb-2">
                <Button className={"bg-main border border-b-4 border-r-4 border-stone-950"} onClick={handleLogout}>
                    Logout
                </Button>
                <ModalButton onUpdate={getNote} buttonName="Create Note" />
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
                        {notes && notes.map((item, key) => (
                            <TableRow key={key}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    {item.content && item.content.length > 50
                                        ? item.content.substring(0, 50) + "..."
                                        : item.content}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {/* View Note Modal */}
                                        <GeneralModal
                                            title={item.title}
                                            description={item.title + "'s Note"}
                                            buttonName="View"
                                            isNoteView={true}
                                            content={ item.content}
                                            noteId={item.id}
                                            onUpdate={getNote}
                                        />
                                        {/* Edit Note Modal - Pass getNote as callback */}
                                        <ModalButton
                                            buttonName="Edit"
                                            edit={true}
                                            buttonColor={"bg-bg"}
                                            title="Edit Note"
                                            description="Edit the Note"
                                            initialData={item}
                                            onUpdate={getNote} // Refresh notes on updatse
                                        />
                                        <Button className={"bg-bg border border-b-4 border-r-4 border-stone-950"} onClick={() => deletenote(item.id   )}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
