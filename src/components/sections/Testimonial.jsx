import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    date: 'Jan 15, 2024',
    rating: 5,
    text: 'This product changed my life! The setup was quick, the UI is clean, and it feels incredibly intuitive. I was able to complete my tasks in half the time compared to before.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    date: 'Feb 20, 2024',
    rating: 4,
    text: 'Exceeded expectations. I was skeptical at first, but after using it for a few weeks I noticed a huge improvement in my workflow.'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    date: 'Mar 5, 2024',
    rating: 5,
    text: 'Top-notch and user-friendly. I love how fast it runs and how clean everything looks. The functionality is exactly what I needed, and the updates keep getting better.'
  },
  {
    id: 4,
    name: 'Emily Davis',
    date: 'Apr 10, 2024',
    rating: 4,
    text: 'Beautiful craftsmanship. The design is modern and elegant, and the product feels very premium. It has improved my daily routine and made tasks much easier.'
  },
  {
    id: 5,
    name: 'Michael Brown',
    date: 'May 15, 2024',
    rating: 5,
    text: 'Fast and reliable support. I had an issue with syncing, but the support team resolved it within hours. The product works flawlessly now and I’m really impressed with'
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    date: 'Jun 20, 2024',
    rating: 5,
    text: 'Innovative and clean UI. The interface is smooth and easy to navigate. I love the modern feel and how everything is organized. It has saved me a lot of time.'
  },
  {
    id: 7,
    name: 'Olivia Taylor',
    date: 'Jul 5, 2024',
    rating: 5,
    text: 'The new updates are amazing! I noticed the improvements immediately. The product feels faster, more stable, and the new features are very helpful.'
  },
  {
    id: 8,
    name: 'David Lee',
    date: 'Aug 12, 2024',
    rating: 4,
    text: 'Great overall experience. It is reliable, fast, and easy to use. There are a few small features I wish were available, but it still performs better than most tools'
  },
];


const Stars = ({ rating }) => (
  <div className="flex gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* 🔹 Component-scoped CSS */}
      <style>{`
  .testimonial-swiper {
    padding-bottom: 60px;
  }

  /* 🔹 Center arrows vertically */
  .testimonial-swiper .swiper-button-next,
  .testimonial-swiper .swiper-button-prev {
    top: 50%;
    transform: translateY(-50%);
    color: white;
    width: 44px;
    height: 44px;
  }

  /* Optional: move arrows slightly outward */
  .testimonial-swiper .swiper-button-prev {
    left: -10px;
  }

  .testimonial-swiper .swiper-button-next {
    right: -10px;
  }

  /* 🔹 Make arrows cleaner */
  .testimonial-swiper .swiper-button-next::after,
  .testimonial-swiper .swiper-button-prev::after {
    font-size: 20px;
    font-weight: bold;
  }

  /* 🔹 Pagination positioning */
  .testimonial-swiper .swiper-pagination {
    bottom: 0 !important;
  }

  /* 🔹 Smaller dots */
  .testimonial-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #9ca3af;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .testimonial-swiper .swiper-pagination-bullet-active {
    background: linear-gradient(135deg, #6366f1, #ec4899);
    transform: scale(1.3);
  }
`}</style>


      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          loop={false}
          centeredSlides={false}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonial-swiper"
        >


          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg transition-all duration-500">

                <Stars rating={review.rating} />

                <p className="mt-4 text-gray-200 italic">
                  “{review.text}”
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
