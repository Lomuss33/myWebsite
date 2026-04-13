import "./Swipeable.scss"
import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Autoplay} from "swiper/modules"

function Swipeable({ children, breakpoints, className = "", slidesPerView = 3, spaceBetween = 20, loop = false, autoPlayDelay = 10000 }) {
    const slides = React.Children.toArray(children)

    const maxSlidesPerView = Math.max(
        slidesPerView,
        ...Object.values(breakpoints || {})
            .map((bp) => bp?.slidesPerView)
            .filter((value) => Number.isFinite(value))
    )

    // Avoid Swiper loop warnings/glitches when there aren't enough slides for the widest breakpoint.
    const effectiveLoop = loop && slides.length > maxSlidesPerView

    return (
        <Swiper className={`swipeable ${className}`}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                grabCursor={true}
                preventClicksPropagation={true}
                loop={effectiveLoop}
                loopAdditionalSlides={effectiveLoop ? maxSlidesPerView : 0}
                breakpoints={breakpoints}
                autoplay={{
                    delay: autoPlayDelay,
                    disableOnInteraction: false
                }}>
            {slides.map((child, key) => (
                <SwiperSlide className={`swipeable-swiper-slide`} key={key}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Swipeable
