import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../base/BaseButton.vue'

describe('BaseButton', () => {
  it('renders default button correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Test Button'
      }
    })
    
    expect(wrapper.text()).toBe('Test Button')
    expect(wrapper.classes()).toContain('tw-base-btn')
    expect(wrapper.classes()).toContain('tw-btn-primary')
    expect(wrapper.classes()).toContain('tw-btn-md')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary'
      },
      slots: {
        default: 'Secondary Button'
      }
    })
    
    expect(wrapper.classes()).toContain('tw-btn-secondary')
    expect(wrapper.classes()).not.toContain('tw-btn-primary')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(BaseButton, {
      props: {
        size: 'lg'
      },
      slots: {
        default: 'Large Button'
      }
    })
    
    expect(wrapper.classes()).toContain('tw-btn-lg')
    expect(wrapper.classes()).not.toContain('tw-btn-md')
  })

  it('handles disabled state', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event when not disabled', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Clickable Button'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')!.length).toBe(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders slots correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        'icon-left': '<span>←</span>',
        default: 'Button Text',
        'icon-right': '<span>→</span>'
      }
    })
    
    expect(wrapper.html()).toContain('<span>←</span>')
    expect(wrapper.html()).toContain('Button Text')
    expect(wrapper.html()).toContain('<span>→</span>')
  })
})