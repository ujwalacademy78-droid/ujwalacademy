"use client";

import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, FileText, Upload, Plus } from "lucide-react";
import { useState } from "react";

export default function ContentPage() {
    const { videos, notes, addVideo, addNote } = useApp();
    const [videoTitle, setVideoTitle] = useState("");
    const [videoDesc, setVideoDesc] = useState("");

    const handleUploadVideo = () => {
        addVideo({
            title: videoTitle || "New Video",
            description: videoDesc || "No description",
            url: "#",
            thumbnail: "/placeholder.svg",
            isFree: false,
            duration: "10:00"
        });
        setVideoTitle("");
        setVideoDesc("");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Content CMS</h1>
            </div>

            <Tabs defaultValue="videos" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="videos">Video Library</TabsTrigger>
                    <TabsTrigger value="notes">Notes & PDFs</TabsTrigger>
                    <TabsTrigger value="upload">Upload New</TabsTrigger>
                </TabsList>

                <TabsContent value="videos" className="space-y-4">
                    {videos.map(video => (
                        <Card key={video.id}>
                            <CardContent className="flex items-center p-4">
                                <div className="h-16 w-24 bg-gray-200 rounded flex items-center justify-center mr-4">
                                    <PlayCircle className="h-8 w-8 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{video.title}</h3>
                                    <p className="text-sm text-gray-500">{video.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {video.isFree ? <Badge variant="secondary">Free</Badge> : <Badge>Premium</Badge>}
                                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="notes">
                    {notes.map(note => (
                        <Card key={note.id}>
                            <CardContent className="flex items-center p-4">
                                <div className="h-12 w-12 bg-red-100 rounded flex items-center justify-center mr-4 text-red-500">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{note.title}</h3>
                                </div>
                                <Button variant="outline" size="sm">Download</Button>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="upload">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Content</CardTitle>
                            <CardDescription>Add new learning materials to the platform</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input placeholder="e.g. React Vectors" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Input placeholder="Short description..." value={videoDesc} onChange={e => setVideoDesc(e.target.value)} />
                            </div>
                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-50 cursor-pointer">
                                <Upload className="h-8 w-8 mb-2" />
                                <p>Drag and drop video file here, or click to browse</p>
                            </div>
                            <Button onClick={handleUploadVideo}>
                                <Plus className="mr-2 h-4 w-4" />
                                Publish Content
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
