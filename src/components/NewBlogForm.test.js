import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('calls handler when form submitted', () => {
    const mockHandler = jest.fn()

    const component = render(
        <NewBlogForm createBlog={mockHandler} />
    )

    setText('new author', 'author', component)
    setText('new bloog name', 'blogname', component)
    setText('www.wp.pl', 'url', component)

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockHandler.mock.calls)
        .toHaveLength(1)
})

const setText = (text, id, component) => {
    const input = component.container.querySelector(`#${id}`)
    fireEvent.change(input, {
        target: { value: text }
      })
}