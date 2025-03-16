"use client"

import React from 'react';
import Image from 'next/image';

import PenIcon from "@/assets/PenIcon.svg";
import TrashIcon from "@/assets/TrashIcon.svg";
import ThreeDotsIcon from "@/assets/ThreeDotsIcon.svg";

interface DropdownActionProps {
	deleteCar: () => void;
	editCar: () => void;
}

const DropdownAction: React.FC<DropdownActionProps> = ({ deleteCar, editCar: clickedEdit }) => {
	const [dropDownOpen, setDropDownOpen] = React.useState(false);

	return (<>
		{/* Dropdown Button */}
		<div className="absolute right-4 -top-[38px]">
			<button
				type="button"
				title="Actions"
				className='relative group p-2 bg-white rounded-full border-2 border-gray-300 hover:border-blue-400 z-10 transition-colors cursor-pointer'
				onClick={() => setDropDownOpen(!dropDownOpen)}
			>
				<Image src={ThreeDotsIcon} alt="Three dots" />
			</button>
		</div>

		{/* Dropdown Content */}
		<div data-open={dropDownOpen} className='
			absolute right-6 top-4 z-10 w-[200px] overflow-hidden 
			data-[open=true]:max-h-[125px] data-[open=false]:max-h-0 
			transition-all duration-200
		'>
			<div className="
				py-2 bg-white rounded-lg shadow-md
				border border-gray-300 flex items-start flex-col gap-1
				*:px-4 *:gap-2 text-sm 
			">
				<button title="Edit Car" type="button" className='w-full py-2 hover:bg-gray-100 flex items-center justify-start cursor-pointer'
					onClick={() => clickedEdit()}>
					<Image src={PenIcon} alt="Edit" className="w-6 h-6 inline-block mr-2" />
					Edit
				</button>
				<button title="Remove Car" type="button" className='w-full py-2 hover:bg-gray-100 flex items-center justify-start cursor-pointer'
					onClick={() => deleteCar()}>
					<Image src={TrashIcon} alt="Edit" className="w-6 h-6 inline-block mr-2" />
					Delete
				</button>
			</div>
		</div>
	</>);
};

export default DropdownAction;