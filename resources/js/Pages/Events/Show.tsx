import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Gallery } from 'react-grid-gallery';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Show({ auth, event_images, events }) {
  console.log(events)
  const images = event_images.map(event => ({
      src: `/storage/${event.img}`,
      original:`/storage/${event.img}`,
      thumbnail: `/storage/${event.img}`,
      width: 420,
      height: 212,
      caption: event.name,
      tags: [
        { value: event.name, title: "nome" },
     ],
  }));
  const slides = images.map(({ original, width, height }) => ({
    src: original,
    width: 1024,
    height: 1024,
  }));
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number, item: images) => setIndex(index);
  return (
      <AuthenticatedLayout user={auth.user}>
          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">Evento {events[0].name}</h2>
              </div>
          </header>

          <div className="py-12">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                      <Gallery
                          images={images}
                          onClick={handleClick}
                          enableImageSelection={false}
                      />
                       <Lightbox
                        slides={slides}
                        open={index >= 0}
                        index={index}
                        close={() => setIndex(-1)}
                  />
                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}

