import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const getNotes = async (pageSize = 5, lastDoc = null) => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                reject("User not logged in");
                return;
            }

            try {
                const notesRef = collection(db, "users", user.uid, "notes");

                let q = query(notesRef, orderBy("createdAt", "desc"), limit(pageSize));

                if (lastDoc) {
                    q = query(notesRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(pageSize));
                }

                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    resolve({ notes: [], lastVisible: null });
                    return;
                }

                const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];

                resolve({ notes, lastVisible });
            } catch (error) {
                reject(error);
            }
        });
    });
};

export default getNotes;
