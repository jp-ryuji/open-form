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
  selectedQuestion: string | undefined
  questions: Question[]
  addQuestion: (question: Question) => void
  updateQuestion: (index: number, question: Partial<Question>) => void
  deleteQuestion: (index: number) => void
  selectQuestion: (question: Question) => void
  reorderQuestion: (sourceIndex: number, destIndex: number) => void
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
    questionOptions: ['Option 1'],
    required: true,
  } as Question)

export const useQuestionStore = create<QuestionStore>((set) => ({
  selectedQuestion: undefined,
  questions: loadQuestions() || [createQuestion()],
  addQuestion: (question: Question) =>
    set((state) => {
      if (!state.selectedQuestion)
        return { questions: [...state.questions, question] }

      // Add after selected
      const selectedIndex = state.questions.findIndex(
        (q) => q.id === state.selectedQuestion
      )
      return {
        questions: [
          ...state.questions.slice(0, selectedIndex + 1),
          question,
          ...state.questions.slice(selectedIndex + 1),
        ],
      }
    }),
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
  selectQuestion: (question: Question) =>
    set(() => ({ selectedQuestion: question.id })),
  reorderQuestion: (sourceIndex: number, destIndex: number) =>
    set((state) => {
      const questions = Array.from(state.questions)
      const [removed] = questions.splice(sourceIndex, 1)
      questions.splice(destIndex, 0, removed)
      return { questions }
    }),
}))

useQuestionStore.subscribe(({ questions }) => {
  storeQuestions(questions)
})
