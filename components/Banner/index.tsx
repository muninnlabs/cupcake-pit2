
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import styles from './styles.module.css';

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay:2000,
                    disableOnInteraction:false
                }}
                modules={[Autoplay]}
                className={styles.swiper}
                >
                    <SwiperSlide className={styles.slide}><img src="/tmp/banner1.png" alt=''/></SwiperSlide>
                    <SwiperSlide className={styles.slide}><img src="/tmp/banner2.png" alt=''/></SwiperSlide>
                    <SwiperSlide className={styles.slide}><img src="/tmp/banner3.png" alt=''/></SwiperSlide>
                    <SwiperSlide className={styles.slide}><img src="/tmp/banner4.png" alt=''/></SwiperSlide>
            </Swiper>
        </div>
    );
}