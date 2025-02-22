import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";

const deleteNote = async (noteId) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");

    try {
        const noteRef = doc(db, "users", user.uid, "notes", noteId);
        await deleteDoc(noteRef);
        console.log("Note deleted!");
        return true;
    } catch (error) {
        console.error("Error deleting note:", error);
        return false;
    }
};

export default deleteNote