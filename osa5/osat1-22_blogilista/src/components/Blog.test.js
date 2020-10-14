import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title ' + 'author'
  )
  expect(component.container).not.toHaveTextContent(
    'url'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )
})

test('shows info after button is pressed', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url'
  }

  const user = {
    id: 1
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'title ' + 'author'
  )
  expect(component.container).toHaveTextContent(
    'url'
  )
  expect(component.container).toHaveTextContent(
    'likes'
  )
})

test('likeBlog is called twice when like button is pressed twice', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url'
  }

  const user = {
    id: 1
  }

  const likeBlog = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likeBlog={likeBlog} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
