"use client"

import React from 'react';
import SearchIcon from '@/assets/SearchIcon.svg';

import Image from 'next/image';
import { CarCard } from '@/components/CarCard';
import CarForm from '@/components/CarForm';

interface CarDisplayProps {
	cars: DBCar[];
}

const baseSelectedCar: DBCar = {
	id: '',
	car: {
		make: '',
		model: '',
		year: 0,
		price: 0,
		mileage: 0,
		imagePath: '',
		location: ''
	}
}

const CarDisplay: React.FC<CarDisplayProps> = (props) => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [cars, setCars] = React.useState<DBCar[]>(props.cars);
	const [formState, setFormState] = React.useState<FormState>("close");
	const [selectedCar, setSelectedCar] = React.useState<DBCar>(baseSelectedCar);
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value) }

	const shouldDisplayCar = (car: DBCar): boolean => {
		return (
			searchTerm === "" ||
			car.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.car.model.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	const addCar = async (car: Car): Promise<boolean> => {
		const formData = new FormData();
		formData.append('car', JSON.stringify(car));
		formData.append('imageFile', car.imageFile as Blob);

		const response = await fetch(`/api/cars`, { 
			method: 'POST',
			body: formData
		});

		const data = await response.json();
		if (!data.success) {
			console.error('Failed to add car');
			return false;
		}
		
		setCars(data.cars);
		setFormState("close");
		return true;
	}

	const editCar = async(car: DBCar): Promise<boolean> => {
		setSelectedCar(car);
		setFormState("edit");
		return true;
	}

	const deleteCar = async (car: DBCar): Promise<boolean> => {
		const response = await fetch(`/api/cars/${car.id}`, { method: 'DELETE' });
		const data = await response.json();
		if (!data.success) {
			console.error('Failed to delete car');
			return false;
		}

		setCars(data.cars);
		return true;
	}

	const updateCar = async (id: string, car: Car): Promise<boolean> => {
		console.log("trying to update car");

		
		const formData = new FormData();
		formData.append('car', JSON.stringify(car));
		formData.append('imageFile', car.imageFile as Blob);

		const response = await fetch(`/api/cars/${id}`, { 
			method: 'PUT',
			body: formData
		});

		const data = await response.json();
		if (!data.success) {
			console.error('Failed to update car');
			return false;
		}
		
		setCars(data.cars);
		setFormState("close");
		return true;
	}

	return (
		<>
		<div>
			<div className='grid grid-cols-2 mx-auto my-4'>
				<input type="text" className='
					h-12 border border-gray-300 rounded-lg px-4 mx-8 bg-[#f5f6f7]
					col-start-1 col-end-3 row-start-1 row-end-2
				' value={searchTerm} onChange={handleSearch} />
				<Image src={SearchIcon} alt="Search Icon" className='
					h-6 col-start-2 col-end-3 row-start-1 row-end-2 my-auto 
					ml-auto mr-12 pointer-events-none
				'/>
			</div>
			<div className="m-6">
				<h1 className="text-xl font-bold ">Used Cars</h1>
				<div className="
					grid 
					grid-cols-6
					max-[1700px]:grid-cols-5
					max-[1400px]:grid-cols-4
					max-[1150px]:grid-cols-3
					max-[900px]:grid-cols-2
					max-[650px]:grid-cols-1
					auto-rows-fr
					gap-2 
					items-center 
					my-4
				">
				{/* <div className="flex flex-wrap gap-2 items-center my-4"> */}
					{cars.filter(c => shouldDisplayCar(c)).map((car) => 
						<CarCard 
							key={car.id}
							car={car} 
							editCar={() => editCar(car)}
							deleteCar={() => deleteCar(car)} />
					)}
				</div>
			</div>
		</div>

		<CarForm 
			action={addCar}
			isOpen={formState === "add"}
			title="Add a Car"
			close={() => {
				setFormState("close");
				setSelectedCar(baseSelectedCar)
			}}
		/>

		<CarForm 
			action={(car: Car) => updateCar(selectedCar.id, car)}
			isOpen={formState === "edit"}
			close={() => setFormState("close")}
			title={`Edit '${selectedCar.car.make} ${selectedCar.car.model}'`}
			car={selectedCar.car}
		/>

		<div className="fixed bottom-0 right-0 m-4">
			<button className="
				w-12 h-12 bg-white shadow-sm rounded-full border border-gray-200 
				text-4xl cursor-pointer hover:border-blue-400 transition-colors pb-2
				z-50
			" onClick={() => {
					setFormState("add")
					console.log("AFSDFDSFD")
				}}>+</button>
		</div>
		</>
	);
};

export default CarDisplay;