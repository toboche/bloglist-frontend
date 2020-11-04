import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content in default state', () => {
    const blog = {
        title: 'boring blog',
        author: 'nobody',
        url: 'www.www.ww',
        likes: 1,
        user: { name:'poster' }
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container)
        .toHaveTextContent('boring blog')
    expect(component.container)
        .toHaveTextContent('nobody')
    expect(component.container)
        .not
        .toHaveTextContent('www.www.ww')
    expect(component.container)
        .not
        .toHaveTextContent('1')
    expect(component.container)
        .not
        .toHaveTextContent('poster')
})