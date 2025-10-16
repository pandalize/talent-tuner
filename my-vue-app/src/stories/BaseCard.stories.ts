import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from '../components/BaseCard.vue'

const meta = {
  title: 'Design System/BaseCard',
  component: BaseCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args }
    },
    template: `
      <BaseCard v-bind="args" style="max-width: 400px;">
        <h3 style="margin: 0 0 16px 0; font-size: 1.25rem; font-weight: 600;">
          カードタイトル
        </h3>
        <p style="margin: 0; color: #6b7280; line-height: 1.6;">
          これはカードのコンテンツです。様々な情報を表示するために使用されます。
        </p>
      </BaseCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  render: () => ({
    components: { BaseCard },
    template: `
      <BaseCard style="max-width: 400px;">
        <template #header>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">
            カードヘッダー
          </h3>
        </template>
        
        <p style="margin: 0; color: #6b7280; line-height: 1.6;">
          メインコンテンツエリアです。ヘッダーとフッターの間に表示されます。
        </p>
        
        <template #footer>
          <div style="display: flex; gap: 8px;">
            <button style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              確認
            </button>
            <button style="padding: 6px 12px; background: #f3f4f6; color: #374151; border: none; border-radius: 6px; cursor: pointer;">
              キャンセル
            </button>
          </div>
        </template>
      </BaseCard>
    `,
  }),
}

export const Shadows: Story = {
  render: () => ({
    components: { BaseCard },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
        <BaseCard shadow="none" style="text-align: center; padding: 24px;">
          <h4 style="margin: 0 0 8px 0;">Shadow None</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">影なし</p>
        </BaseCard>
        <BaseCard shadow="sm" style="text-align: center; padding: 24px;">
          <h4 style="margin: 0 0 8px 0;">Shadow Small</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">小さい影</p>
        </BaseCard>
        <BaseCard shadow="md" style="text-align: center; padding: 24px;">
          <h4 style="margin: 0 0 8px 0;">Shadow Medium</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">中程度の影</p>
        </BaseCard>
        <BaseCard shadow="lg" style="text-align: center; padding: 24px;">
          <h4 style="margin: 0 0 8px 0;">Shadow Large</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">大きい影</p>
        </BaseCard>
        <BaseCard shadow="xl" style="text-align: center; padding: 24px;">
          <h4 style="margin: 0 0 8px 0;">Shadow XL</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">とても大きい影</p>
        </BaseCard>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { BaseCard },
    template: `
      <BaseCard hover style="max-width: 400px; cursor: pointer;">
        <h3 style="margin: 0 0 16px 0; font-size: 1.25rem; font-weight: 600;">
          インタラクティブなカード
        </h3>
        <p style="margin: 0; color: #6b7280; line-height: 1.6;">
          このカードにホバーすると、浮き上がるようなエフェクトが表示されます。
        </p>
      </BaseCard>
    `,
  }),
}