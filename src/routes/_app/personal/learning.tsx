import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { BookOpen, GraduationCap, Layers, StickyNote, Flame } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/learning')({
  component: PersonalLearning,
})

const coursesInProgress = [
  { title: 'Advanced TypeScript Patterns', platform: 'Frontend Masters', progress: 72, lastAccessed: 'Today' },
  { title: 'Machine Learning Foundations', platform: 'Coursera', progress: 45, lastAccessed: 'Yesterday' },
  { title: 'System Design Interview', platform: 'Educative', progress: 30, lastAccessed: '3 days ago' },
]

const readingList = [
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', progress: 68, status: 'reading' as const },
  { title: 'Staff Engineer', author: 'Will Larson', progress: 100, status: 'completed' as const },
  { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', progress: 15, status: 'reading' as const },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', progress: 0, status: 'queued' as const },
  { title: 'Building Microservices', author: "Sam Newman", progress: 0, status: 'queued' as const },
]

const flashcardDecks = [
  { name: 'System Design Concepts', cards: 120, mastered: 85, due: 12 },
  { name: 'TypeScript Generics', cards: 45, mastered: 38, due: 5 },
  { name: 'AWS Services', cards: 80, mastered: 50, due: 18 },
  { name: 'Spanish Vocabulary', cards: 200, mastered: 140, due: 25 },
]

const studyNotes = [
  { title: 'Distributed Consensus Algorithms', topic: 'System Design', date: 'Today', wordCount: 850 },
  { title: 'TypeScript Conditional Types Deep Dive', topic: 'TypeScript', date: 'Yesterday', wordCount: 1200 },
  { title: 'ML Model Evaluation Metrics', topic: 'Machine Learning', date: 'Jan 17', wordCount: 620 },
  { title: 'React Server Components Architecture', topic: 'React', date: 'Jan 15', wordCount: 940 },
]

const streaks = [
  { label: 'Current Streak', value: '14 days', icon: <Flame className="w-5 h-5 text-orange-400" /> },
  { label: 'Longest Streak', value: '42 days', icon: <Flame className="w-5 h-5 text-amber-400" /> },
  { label: 'Study Hours (Week)', value: '8.5 hrs', icon: <GraduationCap className="w-5 h-5 text-cyan-400" /> },
  { label: 'Cards Reviewed (Week)', value: '156', icon: <Layers className="w-5 h-5 text-emerald-400" /> },
]

const readingStatusColor = {
  reading: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  queued: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function PersonalLearning() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div>
        <h1 className="text-2xl font-bold text-white">Learning</h1>
        <p className="text-sm text-slate-400 mt-1">
          Courses, reading list, flashcards, and study progress
        </p>
      </div>

      {/* Learning Streaks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {streaks.map((streak) => (
          <Card key={streak.label}>
            <CardContent className="py-5 flex flex-col items-center gap-2 text-center">
              {streak.icon}
              <span className="text-lg font-bold text-white">{streak.value}</span>
              <span className="text-xs text-slate-500">{streak.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courses In Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Courses In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coursesInProgress.map((course) => (
                <div key={course.title} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white">{course.title}</p>
                    <span className="text-xs text-slate-400">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <p className="text-xs text-slate-500">{course.platform} · Last accessed {course.lastAccessed}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reading List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Reading List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {readingList.map((book) => (
                <div key={book.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{book.title}</p>
                    <p className="text-xs text-slate-500">{book.author} · {book.progress}%</p>
                  </div>
                  <Badge className={`text-xs ${readingStatusColor[book.status]}`}>{book.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Flashcard Decks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Flashcard Decks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {flashcardDecks.map((deck) => (
                <div key={deck.name} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white">{deck.name}</p>
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                      {deck.due} due
                    </Badge>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(deck.mastered / deck.cards) * 100}%` }} />
                  </div>
                  <p className="text-xs text-slate-500">{deck.mastered}/{deck.cards} mastered</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-cyan-400" />
              Study Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {studyNotes.map((note) => (
                <div key={note.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{note.title}</p>
                    <p className="text-xs text-slate-500">{note.topic} · {note.date} · {note.wordCount} words</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
