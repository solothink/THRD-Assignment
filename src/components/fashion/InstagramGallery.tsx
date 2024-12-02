import React from 'react';
import { Instagram } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    username: '@fashionista'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    username: '@styleicon'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=800',
    username: '@trendystylist'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    username: '@fashionweek'
  }
];

export const InstagramGallery: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
            <Instagram className="h-8 w-8 mr-3" />
            Style Gallery
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get inspired by our community's amazing styles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.imageUrl}
                alt="Instagram post"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  {image.username}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};