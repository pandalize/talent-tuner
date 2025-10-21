import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '../components/BaseButton.vue'

const meta = {
  title: 'Design System/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gold', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
  },
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args: any) => ({  
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">プライマリボタン</BaseButton>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">セカンダリボタン</BaseButton>',
  }),
}

export const Gold: Story = {
  args: {
    variant: 'gold',
    size: 'md',
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">結果を見る</BaseButton>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="md">Medium</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <BaseButton>Normal</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
        <BaseButton loading>Loading</BaseButton>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <BaseButton>
          <template #icon-left>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </template>
          前へ
        </BaseButton>
        <BaseButton variant="gold">
          次へ
          <template #icon-right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </template>
        </BaseButton>
      </div>
    `,
  }),
}