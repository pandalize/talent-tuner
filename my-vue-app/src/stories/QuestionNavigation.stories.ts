import type { Meta, StoryObj } from '@storybook/vue3'
import QuestionNavigation from '../components/diagnosis/QuestionNavigation.vue'

const meta = {
  title: 'Diagnosis/QuestionNavigation',
  component: QuestionNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    questionIndex: { control: 'number' },
    totalQuestions: { control: 'number' },
    canGoBack: { control: 'boolean' },
    canProceed: { control: 'boolean' },
    allQuestionsAnswered: { control: 'boolean' },
  },
} satisfies Meta<typeof QuestionNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    questionIndex: 0,
    totalQuestions: 4,
    canGoBack: false,
    canProceed: true,
    allQuestionsAnswered: false,
  },
}

export const MiddleQuestion: Story = {
  args: {
    questionIndex: 2,
    totalQuestions: 4,
    canGoBack: true,
    canProceed: true,
    allQuestionsAnswered: false,
  },
}

export const LastQuestion: Story = {
  args: {
    questionIndex: 3,
    totalQuestions: 4,
    canGoBack: true,
    canProceed: true,
    allQuestionsAnswered: true,
  },
}

export const Disabled: Story = {
  args: {
    questionIndex: 1,
    totalQuestions: 4,
    canGoBack: true,
    canProceed: false,
    allQuestionsAnswered: false,
  },
}

export const Mobile: Story = {
  args: {
    questionIndex: 2,
    totalQuestions: 4,
    canGoBack: true,
    canProceed: true,
    allQuestionsAnswered: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}