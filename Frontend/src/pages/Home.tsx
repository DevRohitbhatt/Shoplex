import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TopProduct from '../components/TopProduct';
import url1 from '../assets/Web capture_31-12-2023_13526_zone-ui.vercel.app.jpeg';
import url2 from '../assets/Web capture_31-12-2023_13611_zone-ui.vercel.app.jpeg';
import url3 from '../assets/Web capture_31-12-2023_13649_zone-ui.vercel.app.jpeg';
import url4 from '../assets/Web capture_31-12-2023_13754_zone-ui.vercel.app.jpeg';

const Home = () => {
	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots) => (
			<div
				style={{
					borderRadius: '10px',
					paddingBottom: '30px',
				}}
			>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
	};

	return (
		<div>
			<section className='p-[4px]  mt-10 rounded-3xl bg-[#f9fafd]'>
				<Slider {...settings}>
					<div>
						<img src={url1} alt='' />
					</div>
					<div>
						<img src={url2} alt='' />
					</div>
					<div>
						<img src={url3} alt='' />
					</div>
					<div>
						<img src={url4} alt='' />
					</div>
				</Slider>
			</section>

			<section className='mt-16 lg:mt-24'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>Latest Products</h1>

					<Link to='/search'>More</Link>
				</div>

				<main className='grid grid-cols-2 gap-8 mt-16 lg:gap-6 lg:grid-cols-4 '>
        <TopProduct/>
          <TopProduct/>
          <TopProduct/>
          <TopProduct/>
        </main>
			</section>
		</div>
	);
};
export default Home;
