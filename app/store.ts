import { nanoid } from 'nanoid'
import { create } from 'zustand'

type QuestionType = 'short' | 'long' | 'radio' | 'checkbox' | 'pulldown'

export interface Question {
  id: string
  question: string
  questionType: QuestionType
  questionOptions: string[]
  required: boolean
}

interface QuestionStore {
  questions: Question[]
  addQuestion: (question: Question) => void
  updateQuestion: (index: number, question: Partial<Question>) => void
  deleteQuestion: (index: number) => void
}

const STORAGE_KEY = 'QUESTIONS'
const loadQuestions = () => {
  try {
    const questionsString = localStorage.getItem(STORAGE_KEY)
    return questionsString ? JSON.parse(questionsString) : null
  } catch (error) {
    return null
  }
}

const storeQuestions = (questions: Question[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
}

export const createQuestion = () =>
  ({
    id: nanoid(),
    question: '',
    questionType: 'short',
    questionOptions: [],
    required: true,
  } as Question)

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: loadQuestions() || [createQuestion()],
  addQuestion: (question: Question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (index: number, question: Partial<Question>) =>
    set((state) => {
      const updatedQuestion = { ...state.questions[index], ...question }
      const updatedQuestions = [...state.questions]
      updatedQuestions[index] = updatedQuestion
      return { questions: updatedQuestions }
    }),
  deleteQuestion: (index: number) =>
    set((state) => {
      return {
        questions: state.questions.filter((_, _index) => index !== _index),
      }
    }),
}))

useQuestionStore.subscribe(({ questions }) => {
  storeQuestions(questions)
})
