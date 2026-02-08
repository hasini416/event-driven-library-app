// import { useEffect, useState } from "react";
// import { api } from "./api";
//
// export default function App() {
//     const [books, setBooks] = useState([]);
//
//     const [title, setTitle] = useState("");
//     const [author, setAuthor] = useState("");
//
//     // available is used as a string for the input check,
//     // but we send a boolean to the server.
//     const [available, setAvailable] = useState("true");
//
//     const loadBooks = async () => {
//         const res = await api.get("/books");
//         setBooks(res.data);
//     };
//
//     useEffect(() => {
//         loadBooks();
//     }, []);
//
//     const addBook = async () => {
//         // Fix: Ensure we aren't returning early due to 'available' check
//         if (!title.trim() || !author.trim()) return;
//
//         try {
//             // We pass the actual boolean 'true' to match your Backend Entity
//             await api.post("/books", { title, author, available: true });
//
//             setTitle("");
//             setAuthor("");
//             setAvailable("true");
//             loadBooks();
//         } catch (error) {
//             console.error("Error adding book:", error);
//         }
//     };
//
//     const deleteBook = async (id) => {
//         await api.delete(`/books/${id}`);
//         loadBooks();
//     };
//
//     return (
//         <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
//             <h1>📚 Library Management</h1>
//
//
//             {/* Add Book Form */}
//             <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//                 <input
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     style={{ flex: 1, padding: 10 }}
//                 />
//                 <input
//                     placeholder="Author"
//                     value={author}
//                     onChange={(e) => setAuthor(e.target.value)}
//                     style={{ flex: 1, padding: 10 }}
//                 />
//                 <button onClick={addBook} style={{ padding: "10px 15px" }}>
//                     Add
//                 </button>
//             </div>
//
//             {/* Book List */}
//             {books.length === 0 ? (
//                 <p>No books yet...</p>
//             ) : (
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                     {books.map((b) => (
//                         <li
//                             key={b.id}
//                             style={{
//                                 border: "1px solid #ddd",
//                                 padding: 14,
//                                 marginBottom: 10,
//                                 borderRadius: 8,
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <div>
//                                 <div style={{ fontWeight: 700 }}>{b.title}</div>
//                                 <div style={{ fontSize: 13, color: "#555" }}>
//                                     Author: {b.author}
//                                 </div>
//                                 <div style={{ fontSize: 13 }}>
//                                     Status:{" "}
//                                     <span style={{ fontWeight: 700 }}>
//                                         {b.available ? "Available" : "Not Available"}
//                                     </span>
//                                 </div>
//                             </div>
//                             {/* Added the delete button back so you can use the function you wrote */}
//                             <button onClick={() => deleteBook(b.id)} style={{ padding: "5px 10px", cursor: "pointer" }}>
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
    const [books, setBooks] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [editId, setEditId] = useState(null); // Tracks which book is being edited

    const loadBooks = async () => {
        const res = await api.get("/books");
        setBooks(res.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const saveBook = async () => {
        if (!title.trim() || !author.trim()) return;

        try {
            if (editId) {
                // If we have an editId, call the PUT endpoint
                await api.put(`/books/${editId}`, {
                    title,
                    author,
                    available: true // Or keep the original status
                });
                setEditId(null);
            } else {
                // Otherwise, call the POST endpoint to add a new book
                await api.post("/books", { title, author, available: true });
            }

            setTitle("");
            setAuthor("");
            loadBooks();
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    // --- NEW FUNCTION: Prepare for Edit ---
    const prepareEdit = (book) => {
        setEditId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
    };

    const deleteBook = async (id) => {
        await api.delete(`/books/${id}`);
        loadBooks();
    };

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
            <h1>📚 Library Management</h1>

            {/* Add/Edit Book Form */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ flex: 1, padding: 10 }}
                />
                <input
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ flex: 1, padding: 10 }}
                />
                <button onClick={saveBook} style={{ padding: "10px 15px", backgroundColor: editId ? "#ffc107" : "#efefef" }}>
                    {editId ? "Update" : "Add"}
                </button>
                {editId && (
                    <button onClick={() => { setEditId(null); setTitle(""); setAuthor(""); }} style={{ padding: "10px 15px" }}>
                        Cancel
                    </button>
                )}
            </div>

            {/* Book List */}
            {books.length === 0 ? (
                <p>No books yet...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {books.map((b) => (
                        <li
                            key={b.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: 14,
                                marginBottom: 10,
                                borderRadius: 8,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: editId === b.id ? "#fff9e6" : "transparent"
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 700 }}>{b.title}</div>
                                <div style={{ fontSize: 13, color: "#555" }}>
                                    Author: {b.author}
                                </div>
                                <div style={{ fontSize: 13 }}>
                                    Status:{" "}
                                    <span style={{ fontWeight: 700 }}>
                                        {b.available ? "Available" : "Not Available"}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button onClick={() => prepareEdit(b)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                                    Edit
                                </button>
                                <button onClick={() => deleteBook(b.id)} style={{ padding: "5px 10px", cursor: "pointer", color: "red" }}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}