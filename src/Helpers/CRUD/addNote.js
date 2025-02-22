import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";

const addNote = async (title, content) => {
    const user = auth.currentUser; // Get logged-in user

    if (!user) {
        window.location.href = "/login"
        return;
    }

    try {
        // Reference to user's notes collection
        const notesRef = collection(db, "users", user.uid, "notes");

        // Add a new note
        await addDoc(notesRef, {
            title,
            content,
            createdAt: new Date()
        });

        console.log("Note added successfully!");
    } catch (error) {
        console.error("Error adding note:", error);
    }
};
export default addNote;