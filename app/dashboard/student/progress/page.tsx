"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StudentProgressPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Learning Progress</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Course Completion</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>React Fundamentals</span>
                                <span className="text-muted-foreground">75%</span>
                            </div>
                            <Progress value={75} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Advanced Hooks</span>
                                <span className="text-muted-foreground">30%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Next.js App Router</span>
                                <span className="text-muted-foreground">10%</span>
                            </div>
                            <Progress value={10} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Recent Test Scores</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="font-medium">React Basics Quiz</p>
                                    <p className="text-xs text-muted-foreground">Jan 12, 2024</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-green-600 font-bold block">80%</span>
                                    <span className="text-xs text-muted-foreground">PASS</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="font-medium">CSS Flexbox Master</p>
                                    <p className="text-xs text-muted-foreground">Jan 05, 2024</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-green-600 font-bold block">95%</span>
                                    <span className="text-xs text-muted-foreground">PASS</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
