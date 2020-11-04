import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('renders all content in the expanded state', () => {
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

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container)
        .toHaveTextContent('boring blog')
    expect(component.container)
        .toHaveTextContent('www.www.ww')
    expect(component.container)
        .toHaveTextContent('1')
    expect(component.container)
        .toHaveTextContent('poster')
})

test('clicking like triggers handler', () => {
    const blog = {
        title: 'boring blog',
        author: 'nobody',
        url: 'www.www.ww',
        likes: 1,
        user: { name:'poster' }
    }

    const mockHandleLikeClicked = jest.fn()

    const component = render(
        <Blog blog={blog} handleLikeClicked={mockHandleLikeClicked}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleLikeClicked.mock.calls)
        .toHaveLength(2)
})