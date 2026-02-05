"use client";

import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Play, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function LearningPage() {
    const { currentUser, videos } = useApp();
    const [activeVideo, setActiveVideo] = useState(videos[0]);

    if (!currentUser) return null;

    const canWatch = (video: any) => {
        if (currentUser.subscription === 'premium') return true;
        return video.isFree;
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
            {/* Main Player */}
            <div className="flex-1 flex flex-col">
                <div className="aspect-video bg-black rounded-lg relative flex items-center justify-center overflow-hidden shadow-2xl">
                    {canWatch(activeVideo) ? (
                        <div className="w-full h-full">
                            <iframe
                                src={activeVideo.url}
                                title={activeVideo.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="text-center text-white p-8 bg-gray-900/90 backdrop-blur absolute inset-0 flex flex-col items-center justify-center">
                            <Lock className="h-16 w-16 mb-4 text-gray-400" />
                            <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                            <p className="mb-6 max-w-md">Upgrade to premium to access this advanced lesson and all other restricted content.</p>
                            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0">
                                Unlock Premium Access
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold">{activeVideo.title}</h1>
                        <Button variant="outline" className="gap-2">
                            <CheckCircle className="h-4 w-4" /> Mark Complete
                        </Button>
                    </div>
                    <p className="text-muted-foreground">{activeVideo.description}</p>
                </div>
            </div>

            {/* Sidebar List */}
            <Card className="w-full lg:w-96 h-full flex flex-col">
                <div className="p-4 font-semibold border-b bg-gray-50/50">
                    Course Content
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-3">
                        {videos.map((video, idx) => {
                            const isLocked = !canWatch(video);
                            const isActive = activeVideo.id === video.id;

                            return (
                                <div
                                    key={video.id}
                                    onClick={() => setActiveVideo(video)}
                                    className={`
                                    flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
                                    ${isActive ? 'bg-primary/10 border-primary/20 border' : 'hover:bg-gray-100 border border-transparent'}
                                    ${isLocked ? 'opacity-70' : ''}
                                `}
                                >
                                    <div className="relative h-16 w-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                        {isLocked && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <Lock className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-primary' : ''}`}>
                                            {idx + 1}. {video.title}
                                        </p>
                                        <div className="flex mt-1">
                                            {video.isFree && <Badge variant="secondary" className="text-[10px] h-4 px-1">Free</Badge>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
}
