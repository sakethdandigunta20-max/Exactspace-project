import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import React from 'react';
import ChatContainer from '../features/chat/ChatContainer';
import { OFFICIAL_USER_LIST } from '../features/chat/chatConstants';

describe('Assignment 1: React Team Chat Application', () => {
  it('renders chat interface with channels, message thread, and input box', () => {
    render(<ChatContainer />);

    // Verify channel and header are rendered
    const introElements = screen.getAllByText(/Introductions/i);
    expect(introElements.length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Type Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('contains the official user list: ["Alan", "Bob", "Carol", "Dean", "Elin"]', () => {
    expect(OFFICIAL_USER_LIST).toEqual(["Alan", "Bob", "Carol", "Dean", "Elin"]);
  });

  it('sends a new message and displays it in the message thread with an assigned random username', async () => {
    render(<ChatContainer />);

    const input = screen.getByPlaceholderText(/Type Message/i);
    const sendBtn = screen.getByRole('button', { name: /Send/i });

    // Type a unique test message
    fireEvent.change(input, { target: { value: 'Hello ExactSpace team from unit test!' } });
    expect(input.value).toBe('Hello ExactSpace team from unit test!');

    // Click Send
    fireEvent.click(sendBtn);

    // Verify message appears in thread
    await waitFor(() => {
      expect(screen.getByText('Hello ExactSpace team from unit test!')).toBeInTheDocument();
    });

    // Input should be cleared
    expect(input.value).toBe('');
  });

  it('increments like count when clicking the like button on a message', async () => {
    render(<ChatContainer />);

    // Post a message first
    const input = screen.getByPlaceholderText(/Type Message/i);
    const sendBtn = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: 'Testing like functionality' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText('Testing like functionality')).toBeInTheDocument();
    });

    // Find the like button for this message
    const likeButtons = screen.getAllByRole('button', { name: /Like message/i });
    const lastLikeBtn = likeButtons[likeButtons.length - 1];

    // Initial count is 0
    expect(lastLikeBtn).toHaveTextContent('0');

    // Click once
    fireEvent.click(lastLikeBtn);
    expect(lastLikeBtn).toHaveTextContent('1');

    // Click again
    fireEvent.click(lastLikeBtn);
    expect(lastLikeBtn).toHaveTextContent('2');
  });

  it('opens emoji picker and allows inserting an emoji into the input box (Stretch Goal 1)', async () => {
    render(<ChatContainer />);

    const emojiBtn = screen.getByTitle(/Add Emoji/i);
    fireEvent.click(emojiBtn);

    // Emoji picker dialog should appear
    expect(screen.getByRole('dialog', { name: /Emoji Picker/i })).toBeInTheDocument();

    // Select thumbs up emoji
    const thumbsEmoji = screen.getByTitle('Thumbs Up');
    fireEvent.click(thumbsEmoji);

    // Textbox should now contain 👍
    const input = screen.getByPlaceholderText(/Type Message/i);
    expect(input.value).toContain('👍');
  });

  it('opens mentions dropdown when typing @ and shows official user list (Stretch Goal 2)', async () => {
    render(<ChatContainer />);

    const input = screen.getByPlaceholderText(/Type Message/i);
    fireEvent.change(input, { target: { value: '@' } });

    // Mention listbox should appear
    let listbox;
    await waitFor(() => {
      listbox = screen.getByRole('listbox', { name: /Mention a user/i });
      expect(listbox).toBeInTheDocument();
    });

    // Should contain users from user_list inside the listbox
    expect(within(listbox).getByText('Alan')).toBeInTheDocument();
    expect(within(listbox).getByText('Bob')).toBeInTheDocument();

    // Select Alan
    fireEvent.click(within(listbox).getByText('Alan'));

    // Input should now have @Alan
    expect(input.value).toContain('@Alan');
  });
});
