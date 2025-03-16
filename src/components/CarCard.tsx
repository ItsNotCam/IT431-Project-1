"use client"

import React from 'react';
import DropdownAction from '@/components/DropdownActions';

export interface CarCardProps {
	car: DBCar;
	editCar: () => void;
	deleteCar: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, editCar, deleteCar }) => {
	return (
		<div className='
			flex flex-col
			gap-2 border border-gray-300 rounded-lg shadow-sm group relative overflow-hidden
			h-full w-full
	'	>
			<div className='relative group h-2/3 flex-grow w-full rounded-t-lg'>
				{/* Car Image */}
				<img src={car.car.imagePath} alt={`${car.car.make} ${car.car.model}`} className='object-cover h-full w-full' />

				{/* Gradient Overlay Thingiemabob */}
				<div className="
					absolute h-full w-full top-0 left-0
					opacity-0 group-hover:opacity-100 transition-opacity 
					bg-[linear-gradient(to_right,rgba(12,12,12,0.3)_0%,transparent_15%,transparent_85%,rgba(12,12,12,0.2)_100%)]
				"/>
			</div>

			{/* Car Info */}
			<div className="flex flex-col flex-grow pl-4 relative mt-2">
				{/* Dropdown */}
				<DropdownAction deleteCar={deleteCar} editCar={editCar} />

				{/* Car Title */}
				<div>
					<h2 className="">{car.car.year} {car.car.make}</h2>
					<h2 className="">{car.car.model}</h2>
				</div>

				{/* Price and Mileage */}
				<div className='flex flex-row items-end h-full'>
					<span className='font-bold text-2xl'>${car.car.price.toLocaleString()}*</span>
					<div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
					<span className="text">{car.car.mileage / 1000 + "k"} mi</span>
				</div>
			</div>

			{/* Test Drive */}
			<div className='text-sm flex-grow text-gray-500 mb-4 pt-2 mt-2 border-t mx-4 border-gray-300 flex flex-col justify-end py-auto'>
				<p>Test drive today</p>
				<p>{car.car.location}</p>
			</div>
		</div>
	);
}