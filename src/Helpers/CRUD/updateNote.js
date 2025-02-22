import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";

const updateNote = async (noteId, newTitle, newContent) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");

    try {
        const noteRef = doc(db, "users", user.uid, "notes", noteId);
        await updateDoc(noteRef, { title: newTitle, content: newContent });
        console.log("Note updated!");
    } catch (error) {
        console.error("Error updating note:", error);
    }
};

export default updateNote