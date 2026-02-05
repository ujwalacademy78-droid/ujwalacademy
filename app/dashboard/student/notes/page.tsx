"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, CheckCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function StudentNotesPage() {
    const { notes } = useApp();
    const [viewingNote, setViewingNote] = useState<any>(null);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Study Material & Notes</h1>
                <p className="text-muted-foreground">Access all course notes and reference materials for free.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notes.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No notes available at the moment.
                    </div>
                ) : (
                    notes.map((note) => (
                        <Card key={note.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                        Free Access
                                    </Badge>
                                </div>
                                <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                                <CardDescription>PDF Document</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Comprehensive study notes covering key concepts, examples, and important formulas for revision.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full h-10 text-md" onClick={() => setViewingNote(note)}>
                                    <Eye className="mr-2 h-4 w-4" /> View Note
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            <Dialog open={!!viewingNote} onOpenChange={(open) => !open && setViewingNote(null)}>
                <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
                        <DialogTitle>{viewingNote?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 bg-gray-100 w-full h-full relative">
                        {viewingNote && (
                            <iframe
                                src={viewingNote.url}
                                className="w-full h-full border-none"
                                title={viewingNote.title}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mt-8 bg-blue-50 p-6 rounded-xl flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <div>
                    <h3 className="font-semibold text-blue-900">Did you know?</h3>
                    <p className="text-sm text-blue-700">All notes are provided free of charge to help you excel in your studies. Check back regularly for new uploads.</p>
                </div>
            </div>
        </div>
    );
}
