import { Link } from 'react-router-dom';
import url from '../assets/Wavy_Bus-17_Single-09.jpg';

const Login = () => {
	return (
		<div className='flex md:space-x-5 lg:space-x-16'>
			<img className='hidden md:w-1/2 lg:w-3/5 md:block' src={url} alt='shopping' />
			<div className='w-full p-10 mt-20 shadow-2xl md:w-1/2 lg:w-2/5 h-fit rounded-2xl'>
				<h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>Login</h1>
				<h4 className='mt-6 text-gray-600 '>
					Don`t have an account?{' '}
					<Link to='/register' className='text-[#00a76f] font-medium cursor-pointer hover:underline'>
						Get started
					</Link>
				</h4>

				<form className='flex flex-col mt-8 space-y-6'>
					<div className='relative'>
						<input
							className='w-full px-3 pb-2 text-sm bg-gray-100 rounded-lg outline-none appearance-none pt-7 peer placeholder:text-transparent '
							id='email'
							type='text'
							placeholder='you@email.com'
						/>
						<label
							htmlFor='email'
							className='absolute px-3 font-medium text-gray-400 duration-150 ease-in-out transform translate-y-4 start-0 cursor-text peer-focus:translate-y-1 peer-focus:scale-95 peer-focus:text-black peer-focus:-translate-x-1 peer-[:not(:placeholder-shown)]:translate-y-1 peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:-translate-x-1 peer-[:not(:placeholder-shown)]:scale-95 label'
						>
							Email address
						</label>
					</div>

					<div className='relative'>
						<input
							className='w-full px-3 pb-2 bg-gray-100 rounded-lg outline-none appearance-none pt-7 peer placeholder:text-transparent'
							id='password'
							type='text'
							placeholder='************'
						/>
						<label
							htmlFor='password'
							className='absolute px-3 font-medium text-gray-400 duration-150 ease-in-out transform translate-y-4 start-0 cursor-text peer-focus:translate-y-1 peer-focus:scale-95 peer-focus:text-black peer-focus:-translate-x-1 peer-[:not(:placeholder-shown)]:translate-y-1 peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:-translate-x-1 peer-[:not(:placeholder-shown)]:scale-95 label'
						>
							Password
						</label>
					</div>
				</form>
				<span className='block my-6 text-gray-500 underline text-end'>Forget password?</span>
				<button className='w-full py-3 font-medium text-white bg-[#212b36] hover:bg-[#454f5b] rounded-lg'>
					Login
				</button>
			</div>
		</div>
	);
};
export default Login;
