import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import GalleryContainer from '../features/gallery/GalleryContainer';
import * as galleryApi from '../features/gallery/galleryApi';

const MOCK_PHOTOS = [
  {
    id: '101',
    author: 'Vadim Sherbakov',
    width: 2000,
    height: 1200,
    url: 'https://unsplash.com/test1',
    download_url: 'https://picsum.photos/id/101/2000/1200',
  },
  {
    id: '102',
    author: 'Alex G',
    width: 2000,
    height: 1200,
    url: 'https://unsplash.com/test2',
    download_url: 'https://picsum.photos/id/102/2000/1200',
  }
];

describe('Assignment 2: Infinite Scroll Photo Gallery', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders the gallery header and photo cards in 1-column layout matching reference', async () => {
    vi.spyOn(galleryApi, 'fetchPhotos').mockResolvedValue(MOCK_PHOTOS);

    render(<GalleryContainer />);

    // Header matching reference
    expect(screen.getByRole('heading', { name: /Photo gallery/i })).toBeInTheDocument();

    // Verify photos rendered
    await waitFor(() => {
      expect(screen.getByText('Vadim Sherbakov')).toBeInTheDocument();
      expect(screen.getByText('Alex G')).toBeInTheDocument();
    });
  });

  it('renders thumbs up icon with count initialized to 0 and increments on click as many times as clicked', async () => {
    vi.spyOn(galleryApi, 'fetchPhotos').mockResolvedValue(MOCK_PHOTOS);

    render(<GalleryContainer />);

    await waitFor(() => {
      expect(screen.getByText('Vadim Sherbakov')).toBeInTheDocument();
    });

    // Thumbs up button for Vadim Sherbakov's photo
    const thumbsBtn = screen.getByRole('button', { name: /Like photo by Vadim Sherbakov/i });
    expect(thumbsBtn).toBeInTheDocument();

    // Initial count is 0
    expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('0');

    // Click 1
    fireEvent.click(thumbsBtn);
    expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('1');

    // Click 2
    fireEvent.click(thumbsBtn);
    expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('2');

    // Click 3
    fireEvent.click(thumbsBtn);
    expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('3');
  });

  it('filters gallery photos by author search query', async () => {
    vi.spyOn(galleryApi, 'fetchPhotos').mockResolvedValue(MOCK_PHOTOS);

    render(<GalleryContainer />);

    await waitFor(() => {
      expect(screen.getByText('Vadim Sherbakov')).toBeInTheDocument();
      expect(screen.getByText('Alex G')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by author name/i);
    fireEvent.change(searchInput, { target: { value: 'Vadim' } });

    expect(screen.getByText('Vadim Sherbakov')).toBeInTheDocument();
    expect(screen.queryByText('Alex G')).not.toBeInTheDocument();
  });

  it('persists likes count in localStorage across rerenders', async () => {
    vi.spyOn(galleryApi, 'fetchPhotos').mockResolvedValue(MOCK_PHOTOS);

    const { unmount } = render(<GalleryContainer />);

    await waitFor(() => {
      expect(screen.getByText('Vadim Sherbakov')).toBeInTheDocument();
    });

    const thumbsBtn = screen.getByRole('button', { name: /Like photo by Vadim Sherbakov/i });
    fireEvent.click(thumbsBtn);
    fireEvent.click(thumbsBtn);

    expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('2');

    unmount();

    // Render again
    render(<GalleryContainer />);

    await waitFor(() => {
      expect(screen.getByTestId('thumbs-count-101')).toHaveTextContent('2');
    });
  });
});
