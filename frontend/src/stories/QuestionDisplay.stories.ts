import type { Meta, StoryObj } from '@storybook/vue3'
import QuestionDisplay from '../components/diagnosis/QuestionDisplay.vue'

// Mock question data
const mockQuestion = {
  id: 'q1',
  text: '手を動かして何かを作ることと、理論を学んで知識を深めることと。',
  categoryId: 'skill',
  options: [
    { label: 'A', text: '手を動かして何かを作ることが好き' },
    { label: 'B', text: '理論を学んで知識を深めることが好き' },
    { label: 'C', text: '両方とも同じくらい重要だと思う' },
    { label: 'D', text: 'どちらも特に興味がない' }
  ]
}

const meta = {
  title: 'Diagnosis/QuestionDisplay',
  component: QuestionDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    questionIndex: { control: 'number' },
    totalQuestions: { control: 'number' },
  },
} satisfies Meta<typeof QuestionDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    question: mockQuestion,
    questionIndex: 0,
    totalQuestions: 4,
    answers: {},
  },
}

export const WithAnswers: Story = {
  args: {
    question: mockQuestion,
    questionIndex: 0,
    totalQuestions: 4,
    answers: {
      q1: {
        A: 4,
        B: 2,
        C: 3,
        D: 1
      }
    },
  },
}

export const PartiallyAnswered: Story = {
  args: {
    question: mockQuestion,
    questionIndex: 0,
    totalQuestions: 4,
    answers: {
      q1: {
        A: 5,
        B: 3
      }
    },
  },
}

export const Mobile: Story = {
  args: {
    question: mockQuestion,
    questionIndex: 0,
    totalQuestions: 4,
    answers: {},
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const LongQuestion: Story = {
  args: {
    question: {
      ...mockQuestion,
      text: 'これは非常に長い質問文です。複数行にわたって表示される可能性があり、レスポンシブデザインでどのように見えるかをテストするためのものです。モバイルデバイスでも適切に表示されることを確認します。',
      options: [
        { label: 'A', text: 'とても長い選択肢のテキストです。この選択肢は複数行になる可能性があります。' },
        { label: 'B', text: 'もう一つの長い選択肢です。' },
        { label: 'C', text: '短い選択肢' },
        { label: 'D', text: '最後の選択肢もそれなりに長いテキストを含んでいます。' }
      ]
    },
    questionIndex: 2,
    totalQuestions: 4,
    answers: {},
  },
}