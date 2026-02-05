"use client";

import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function StudentExamsPage() {
    const { exams } = useApp();
    const [activeExam, setActiveExam] = useState<any>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const startExam = (exam: any) => {
        setActiveExam(exam);
        setAnswers({});
        setShowResult(false);
        setScore(0);
    };

    const submitExam = () => {
        // Calculate Score
        let total = 0;
        activeExam.questions.forEach((q: any) => {
            if (answers[q.id] === q.correctAnswer) {
                total += q.marks;
            }
        });
        setScore(total);
        setShowResult(true);
    };

    const closeExam = () => {
        setActiveExam(null);
        setShowResult(false);
    };

    if (activeExam) {
        return (
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10 py-4 border-b">
                    <div>
                        <h2 className="text-xl font-bold">{activeExam.title}</h2>
                        <p className="text-sm text-muted-foreground">{activeExam.questions.length} Questions • {activeExam.totalMarks} Marks</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-orange-600 font-mono font-bold bg-orange-50 px-3 py-1 rounded">
                            <Clock className="mr-2 h-4 w-4" />
                            29:59
                        </div>
                        <Button onClick={submitExam}>Submit Exam</Button>
                    </div>
                </div>

                <div className="space-y-6 pb-20">
                    {activeExam.questions.map((q: any, idx: number) => (
                        <Card key={q.id} id={`q-${idx}`}>
                            <CardHeader>
                                <CardTitle className="text-base flex gap-3">
                                    <span className="bg-gray-100 h-8 w-8 flex items-center justify-center rounded-full text-sm">{idx + 1}</span>
                                    {q.text}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3 pl-14">
                                {q.options.map((opt: string, optIdx: number) => (
                                    <div
                                        key={optIdx}
                                        onClick={() => setAnswers({ ...answers, [q.id]: optIdx })}
                                        className={`
                                            p-3 rounded-lg border cursor-pointer hover:bg-gray-50 flex items-center
                                            ${answers[q.id] === optIdx ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200'}
                                        `}
                                    >
                                        <div className={`
                                           h-4 w-4 rounded-full border mr-3 flex items-center justify-center
                                           ${answers[q.id] === optIdx ? 'border-primary' : 'border-gray-400'}
                                       `}>
                                            {answers[q.id] === optIdx && <div className="h-2 w-2 rounded-full bg-primary" />}
                                        </div>
                                        {opt}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Dialog open={showResult} onOpenChange={closeExam}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Exam Result</DialogTitle>
                            <DialogDescription>
                                You have completed the assessment.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 text-center">
                            <div className="text-5xl font-bold text-primary mb-2">{score} / {activeExam.totalMarks}</div>
                            <p className="text-muted-foreground">Your Score</p>
                            {score >= (activeExam.totalMarks / 2) ? (
                                <p className="text-green-600 font-bold mt-4">PASS</p>
                            ) : (
                                <p className="text-red-600 font-bold mt-4">FAIL</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={closeExam} className="w-full">Return to Dashboard</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Available Exams</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map(exam => (
                    <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{exam.title}</CardTitle>
                            <CardDescription>{exam.questions.length} Questions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center"><Clock className="mr-1 h-4 w-4" /> {exam.duration}m</div>
                                <div className="flex items-center"><HelpCircle className="mr-1 h-4 w-4" /> {exam.totalMarks} Marks</div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => startExam(exam)}>
                                Start Exam <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
