"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Types ---

export type Role = "admin" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    subscription: "free" | "premium";
    status: "active" | "blocked";
}

export interface Video {
    id: string;
    title: string;
    description: string;
    url: string; // Dummy URL or local asset
    thumbnail: string;
    isFree: boolean;
    duration: string;
}

export interface Note {
    id: string;
    title: string;
    url: string;
}

export interface Exam {
    id: string;
    title: string;
    duration: number; // in minutes
    totalMarks: number;
    questions: Question[];
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // index
    marks: number;
}

export interface AppState {
    currentUser: User | null;
    users: User[];
    videos: Video[];
    notes: Note[];
    exams: Exam[];
}

interface AppContextType extends AppState {
    login: (email: string, role: Role) => void;
    logout: () => void;
    registerStudent: (student: Omit<User, "id" | "role" | "status" | "subscription">) => void;
    updateUserStatus: (id: string, status: "active" | "blocked" | "deleted") => void;
    addVideo: (video: Omit<Video, "id">) => void;
    addNote: (note: Omit<Note, "id">) => void;
    addExam: (exam: Omit<Exam, "id">) => void;
}

// --- Mock Data ---

const INITIAL_USERS: User[] = [
    { id: "1", name: "Admin User", email: "admin@lms.com", role: "admin", subscription: "premium", status: "active" },
    { id: "2", name: "John Doe", email: "john@student.com", role: "student", subscription: "free", status: "active" },
    { id: "3", name: "Jane Smith", email: "jane@student.com", role: "student", subscription: "premium", status: "active" },
    { id: "4", name: "Bob Johnson", email: "bob@student.com", role: "student", subscription: "free", status: "blocked" },
];

const INITIAL_VIDEOS: Video[] = [
    { id: "1", title: "Introduction to React", description: "Learn the basics of React", url: "https://www.youtube.com/embed/LX4JUscM9Sk", thumbnail: "/placeholder.svg", isFree: true, duration: "10:00" },
    { id: "2", title: "Advanced Hooks", description: "Deep dive into useEffect and useMemo", url: "https://www.youtube.com/embed/LlvBzyy-558", thumbnail: "/placeholder.svg", isFree: true, duration: "15:30" },
    { id: "3", title: "Next.js App Router", description: "Building modern apps with Next.js 14", url: "#", thumbnail: "/placeholder.svg", isFree: false, duration: "20:00" },
];

const INITIAL_NOTES: Note[] = [
    { id: "1", title: "React Cheat Sheet 2024", url: "/pdfs/react-cheatsheet.pdf" },
    { id: "2", title: "CSS Grid Complete Guide", url: "/pdfs/css-grid.pdf" },
    { id: "3", title: "Next.js 14 Handbook", url: "/pdfs/nextjs-handbook.pdf" },
    { id: "4", title: "TypeScript Interface vs Type", url: "/pdfs/ts-guide.pdf" },
    { id: "5", title: "Tailwind CSS Utility List", url: "/pdfs/tailwind-ref.pdf" },
    { id: "6", title: "Web Accessibility (a11y) Checklist", url: "/pdfs/a11y-check.pdf" },
];

const INITIAL_EXAMS: Exam[] = [
    {
        id: "1",
        title: "React Fundamentals",
        duration: 30,
        totalMarks: 50,
        questions: [
            { id: "q1", text: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Xylophone", "None"], correctAnswer: 0, marks: 5 },
            { id: "q2", text: "Which hook is used for side effects?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: 1, marks: 5 }
        ]
    },
    {
        id: "2",
        title: "CSS Mastery",
        duration: 45,
        totalMarks: 100,
        questions: [
            { id: "q1", text: "What does CSS stand for?", options: ["Counter Strike Source", "Cascading Style Sheets", "Computer Style System", "None"], correctAnswer: 1, marks: 5 }
        ]
    }
];

// --- Context ---

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
    const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);

    const login = (email: string, role: Role) => {
        // Simple mock login
        const user = users.find(u => u.email === email && u.role === role);
        if (user) {
            if (user.status === 'blocked') {
                alert("Account is blocked!");
                return;
            }
            setCurrentUser(user);
        } else {
            // Auto-create admin if strictly "admin@lms.com" for demo, else fail
            if (email === 'admin@lms.com' && role === 'admin') {
                // fallback if deleted
                const newAdmin = { id: Date.now().toString(), name: "Admin", email, role, subscription: "premium", status: "active" } as User;
                setUsers([...users, newAdmin]);
                setCurrentUser(newAdmin);
            } else {
                alert("User not found!");
            }
        }
    };

    const logout = () => setCurrentUser(null);

    const registerStudent = (studentData: Omit<User, "id" | "role" | "status" | "subscription">) => {
        const newUser: User = {
            ...studentData,
            id: Date.now().toString(),
            role: "student",
            status: "active",
            subscription: "free",
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
    };

    const updateUserStatus = (id: string, status: "active" | "blocked" | "deleted") => {
        if (status === "deleted") {
            setUsers(users.filter(u => u.id !== id));
        } else {
            setUsers(users.map(u => u.id === id ? { ...u, status } : u));
        }
    };

    const addVideo = (video: Omit<Video, "id">) => {
        setVideos([...videos, { ...video, id: Date.now().toString() }]);
    };

    const addNote = (note: Omit<Note, "id">) => {
        setNotes([...notes, { ...note, id: Date.now().toString() }]);
    };

    const addExam = (exam: Omit<Exam, "id">) => {
        setExams([...exams, { ...exam, id: Date.now().toString() }]);
    };

    return (
        <AppContext.Provider value={{
            currentUser, users, videos, notes, exams,
            login, logout, registerStudent, updateUserStatus, addVideo, addNote, addExam
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
};
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Types ---

export type Role = "admin" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    subscription: "free" | "premium";
    status: "active" | "blocked";
}

export interface Video {
    id: string;
    title: string;
    description: string;
    url: string; // Dummy URL or local asset
    thumbnail: string;
    isFree: boolean;
    duration: string;
}

export interface Note {
    id: string;
    title: string;
    url: string;
}

export interface Exam {
    id: string;
    title: string;
    duration: number; // in minutes
    totalMarks: number;
    questions: Question[];
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // index
    marks: number;
}

export interface AppState {
    currentUser: User | null;
    users: User[];
    videos: Video[];
    notes: Note[];
    exams: Exam[];
}

interface AppContextType extends AppState {
    login: (email: string, role: Role) => void;
    logout: () => void;
    registerStudent: (student: Omit<User, "id" | "role" | "status" | "subscription">) => void;
    updateUserStatus: (id: string, status: "active" | "blocked" | "deleted") => void;
    addVideo: (video: Omit<Video, "id">) => void;
    addNote: (note: Omit<Note, "id">) => void;
    addExam: (exam: Omit<Exam, "id">) => void;
}

// --- Mock Data ---

const INITIAL_USERS: User[] = [
    { id: "1", name: "Admin User", email: "admin@lms.com", role: "admin", subscription: "premium", status: "active" },
    { id: "2", name: "John Doe", email: "john@student.com", role: "student", subscription: "free", status: "active" },
    { id: "3", name: "Jane Smith", email: "jane@student.com", role: "student", subscription: "premium", status: "active" },
    { id: "4", name: "Bob Johnson", email: "bob@student.com", role: "student", subscription: "free", status: "blocked" },
];

const INITIAL_VIDEOS: Video[] = [
    { id: "1", title: "Introduction to React", description: "Learn the basics of React", url: "https://www.youtube.com/embed/LX4JUscM9Sk", thumbnail: "/placeholder.svg", isFree: true, duration: "10:00" },
    { id: "2", title: "Advanced Hooks", description: "Deep dive into useEffect and useMemo", url: "https://www.youtube.com/embed/LlvBzyy-558", thumbnail: "/placeholder.svg", isFree: true, duration: "15:30" },
    { id: "3", title: "Next.js App Router", description: "Building modern apps with Next.js 14", url: "#", thumbnail: "/placeholder.svg", isFree: false, duration: "20:00" },
];

const INITIAL_NOTES: Note[] = [
    { id: "1", title: "React Cheat Sheet 2024", url: "/pdfs/react-cheatsheet.pdf" },
    { id: "2", title: "CSS Grid Complete Guide", url: "/pdfs/css-grid.pdf" },
    { id: "3", title: "Next.js 14 Handbook", url: "/pdfs/nextjs-handbook.pdf" },
    { id: "4", title: "TypeScript Interface vs Type", url: "/pdfs/ts-guide.pdf" },
    { id: "5", title: "Tailwind CSS Utility List", url: "/pdfs/tailwind-ref.pdf" },
    { id: "6", title: "Web Accessibility (a11y) Checklist", url: "/pdfs/a11y-check.pdf" },
];

const INITIAL_EXAMS: Exam[] = [
    {
        id: "1",
        title: "React Fundamentals",
        duration: 30,
        totalMarks: 50,
        questions: [
            { id: "q1", text: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Xylophone", "None"], correctAnswer: 0, marks: 5 },
            { id: "q2", text: "Which hook is used for side effects?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: 1, marks: 5 }
        ]
    },
    {
        id: "2",
        title: "CSS Mastery",
        duration: 45,
        totalMarks: 100,
        questions: [
            { id: "q1", text: "What does CSS stand for?", options: ["Counter Strike Source", "Cascading Style Sheets", "Computer Style System", "None"], correctAnswer: 1, marks: 5 }
        ]
    }
];

// --- Context ---

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
    const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);

    const login = (email: string, role: Role) => {
        // Simple mock login
        const user = users.find(u => u.email === email && u.role === role);
        if (user) {
            if (user.status === 'blocked') {
                alert("Account is blocked!");
                return;
            }
            setCurrentUser(user);
        } else {
            // Auto-create admin if strictly "admin@lms.com" for demo, else fail
            if (email === 'admin@lms.com' && role === 'admin') {
                // fallback if deleted
                const newAdmin = { id: Date.now().toString(), name: "Admin", email, role, subscription: "premium", status: "active" } as User;
                setUsers([...users, newAdmin]);
                setCurrentUser(newAdmin);
            } else {
                alert("User not found!");
            }
        }
    };

    const logout = () => setCurrentUser(null);

    const registerStudent = (studentData: Omit<User, "id" | "role" | "status" | "subscription">) => {
        const newUser: User = {
            ...studentData,
            id: Date.now().toString(),
            role: "student",
            status: "active",
            subscription: "free",
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
    };

    const updateUserStatus = (id: string, status: "active" | "blocked" | "deleted") => {
        if (status === "deleted") {
            setUsers(users.filter(u => u.id !== id));
        } else {
            setUsers(users.map(u => u.id === id ? { ...u, status } : u));
        }
    };

    const addVideo = (video: Omit<Video, "id">) => {
        setVideos([...videos, { ...video, id: Date.now().toString() }]);
    };

    const addNote = (note: Omit<Note, "id">) => {
        setNotes([...notes, { ...note, id: Date.now().toString() }]);
    };

    const addExam = (exam: Omit<Exam, "id">) => {
        setExams([...exams, { ...exam, id: Date.now().toString() }]);
    };

    return (
        <AppContext.Provider value={{
            currentUser, users, videos, notes, exams,
            login, logout, registerStudent, updateUserStatus, addVideo, addNote, addExam
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
};
