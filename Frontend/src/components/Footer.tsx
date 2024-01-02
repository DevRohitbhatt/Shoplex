import { AiFillFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
	return (
		<div className='mt-16 lg:mt-24 border-t-2 '>
			<div className='flex items-center justify-between h-16 max-w-6xl px-4 mx-auto'>
				<h1 className='text-[#637381] text-sm'>© 2023. All rights reserved</h1>
				<div className='flex space-x-2 text-[#00a76f] text-2xl'>
					<AiFillFacebook className='cursor-pointer' />
					<AiOutlineInstagram className='cursor-pointer' />
					<AiOutlineLinkedin className='cursor-pointer' />
					<AiOutlineTwitter className='cursor-pointer' />
				</div>
			</div>
		</div>
	);
};
export default Footer;
