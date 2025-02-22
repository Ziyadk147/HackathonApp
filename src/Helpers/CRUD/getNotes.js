import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const getNotes = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.error("No user logged in");
                reject("User not logged in");
                return;
            }

            try {
                const notesRef = collection(db, "users", user.uid, "notes");
                const snapshot = await getDocs(notesRef);
                const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log("User notes:", notes);
                resolve(notes);
            } catch (error) {
                console.error("Error fetching notes:", error);
                reject(error);
            }
        });
    });
};

export default getNotes;
