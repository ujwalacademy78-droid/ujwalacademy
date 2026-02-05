"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, CheckSquare, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ExamCreatorPage() {
    const { addExam } = useApp();
    const [step, setStep] = useState(1);
    const [examTitle, setExamTitle] = useState("");
    const [duration, setDuration] = useState(30);
    const [questions, setQuestions] = useState<any[]>([]);

    // Temp question state
    const [qText, setQText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correct, setCorrect] = useState(0);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now().toString(), text: qText, options: [...options], correctAnswer: correct, marks: 5 }
        ]);
        setQText("");
        setOptions(["", "", "", ""]);
        setCorrect(0);
    };

    const handleSaveExam = () => {
        addExam({
            title: examTitle,
            duration: Number(duration),
            totalMarks: questions.reduce((acc, q) => acc + q.marks, 0),
            questions
        });
        alert("Exam Created Successfully!");
        // Reset
        setStep(1);
        setExamTitle("");
        setQuestions([]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Exam Creator</h1>

            {step === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Step 1: Exam Details</CardTitle>
                        <CardDescription>Set the basic information for the test.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Exam Title</Label>
                            <Input placeholder="e.g. Final React Assessment" value={examTitle} onChange={e => setExamTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Duration (Minutes)</Label>
                            <Input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => setStep(2)} disabled={!examTitle}>Next: Add Questions</Button>
                    </CardFooter>
                </Card>
            )}

            {step === 2 && (
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Question</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Question Text</Label>
                                    <Input placeholder="What is..." value={qText} onChange={e => setQText(e.target.value)} />
                                </div>
                                <Label>Options (Check the correct answer)</Label>
                                <RadioGroup onValueChange={(v) => setCorrect(Number(v))} value={String(correct)}>
                                    {options.map((opt, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <RadioGroupItem value={String(idx)} id={`opt-${idx}`} />
                                            <Input
                                                placeholder={`Option ${idx + 1}`}
                                                value={opt}
                                                onChange={(e) => {
                                                    const newOpts = [...options];
                                                    newOpts[idx] = e.target.value;
                                                    setOptions(newOpts);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </RadioGroup>
                                <Button onClick={handleAddQuestion} className="w-full" variant="secondary">
                                    <Plus className="mr-2 h-4 w-4" /> Add Question
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview ({questions.length} Questions)</CardTitle>
                            </CardHeader>
                            <CardContent className="max-h-[500px] overflow-y-auto space-y-4">
                                {questions.map((q, i) => (
                                    <div key={q.id} className="p-3 border rounded-lg bg-gray-50/50 relative group">
                                        <p className="font-semibold text-sm mb-2">Q{i + 1}: {q.text}</p>
                                        <ul className="text-xs space-y-1 text-muted-foreground pl-4 list-disc">
                                            {q.options.map((opt: string, idx: number) => (
                                                <li key={idx} className={idx === q.correctAnswer ? "text-green-600 font-bold" : ""}>{opt}</li>
                                            ))}
                                        </ul>
                                        <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setQuestions(questions.filter(qi => qi.id !== q.id))}>
                                            <Trash className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                                {questions.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No questions added yet.</p>}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSaveExam} disabled={questions.length === 0}>
                                    <Save className="mr-2 h-4 w-4" /> Save & Publish Exam
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
