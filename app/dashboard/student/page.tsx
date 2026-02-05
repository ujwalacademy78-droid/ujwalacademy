"use client";

import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Clock, Play } from "lucide-react";

export default function StudentHome() {
    const { currentUser, videos } = useApp();

    if (!currentUser) return null;

    return (
        <div className="space-y-8">
            {/* Welcome & Stats */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
                    <p className="opacity-90 mb-6">You have completed 30% of your targeted courses. Keep it up!</p>
                    {currentUser.subscription === 'free' && (
                        <Button variant="secondary" className="font-semibold text-blue-600">
                            Upgrade to Premium
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <Card className="w-full md:w-40 flex flex-col items-center justify-center p-4">
                        <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                        <span className="text-2xl font-bold">4</span>
                        <span className="text-xs text-muted-foreground">Courses</span>
                    </Card>
                    <Card className="w-full md:w-40 flex flex-col items-center justify-center p-4">
                        <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                        <span className="text-2xl font-bold">85%</span>
                        <span className="text-xs text-muted-foreground">Avg Score</span>
                    </Card>
                    <Card className="w-full md:w-40 flex flex-col items-center justify-center p-4">
                        <Clock className="h-8 w-8 text-green-500 mb-2" />
                        <span className="text-2xl font-bold">12h</span>
                        <span className="text-xs text-muted-foreground">Learned</span>
                    </Card>
                </div>
            </div>

            {/* Continue Learning */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Continue Learning</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {videos.slice(0, 3).map((video) => (
                        <Card key={video.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                            <div className="aspect-video bg-gray-900 relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <Play className="h-12 w-12 text-white fill-current" />
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-1 line-clamp-1">{video.title}</h3>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{video.duration}</span>
                                    <Badge variant={video.isFree ? "secondary" : "default"}>
                                        {video.isFree ? "Free" : "Premium"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
