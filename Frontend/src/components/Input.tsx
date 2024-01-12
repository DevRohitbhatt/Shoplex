const Input = ({ title, id, type, placeholder }: { title: string; id: string; type: string; placeholder: string }) => {
	return (
		<div className='relative'>
			<input
				className='w-full px-3 pb-2 text-sm bg-gray-100 rounded-lg outline-none appearance-none pt-7 peer placeholder:text-transparent '
				id={id}
				type={type}
				placeholder={placeholder}
			/>
			<label
				htmlFor={id}
				className='absolute px-3 font-medium text-gray-400 duration-150 ease-in-out transform translate-y-4 start-0 cursor-text peer-focus:translate-y-1 peer-focus:scale-95 peer-focus:text-black peer-focus:-translate-x-1 peer-[:not(:placeholder-shown)]:translate-y-1 peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:-translate-x-1 peer-[:not(:placeholder-shown)]:scale-95 label'
			>
				{title}
			</label>
		</div>
	);
};

export default Input;
