import type { Meta, StoryObj } from '@storybook/vue3'
import DiagnosisContainer from '../components/diagnosis/DiagnosisContainer.vue'

const meta = {
  title: 'Diagnosis/DiagnosisContainer',
  component: DiagnosisContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DiagnosisContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const Error: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'light',
    },
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    backgrounds: {
      default: 'light',
    },
  },
}