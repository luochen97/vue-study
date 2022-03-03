import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import nForm from '@/components/nform/nform/form.vue'
import nInput from '@/components/nform/nInput/nInput.vue'

describe('nForm.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(nForm, {
      propsData: { model: { msg } },
      slots: {
        default: [msg]
      }
    })
    console.log(wrapper.text())
    expect(wrapper.text()).to.include(msg)
  })
})

describe('nInput.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(nInput, {
      propsData: { value: msg }
    })
    expect(wrapper.props().value).to.include(msg)
  })
})
