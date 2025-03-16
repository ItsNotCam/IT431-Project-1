import React from 'react';
import Image from 'next/image';
import CloseSVG from '@/assets/Close.svg';

interface CloseButtonProps {
	action: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ action }) => (
	<button className="
			fixed top-0 right-0 m-4
			w-12 h-12 bg-white shadow-sm rounded-full p-2 border border-gray-200 text-black
			text-4xl cursor-pointer hover:border-red-400 transition-colors
		" onClick={action}>
		<Image src={CloseSVG} alt="close" className='w-full h-full text-black' />
	</button>
);

export default CloseButton;