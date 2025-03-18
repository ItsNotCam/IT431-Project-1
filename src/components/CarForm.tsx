"use client"

import CloseButton from '@/components/CloseButton';
import React, { ChangeEvent, useEffect } from 'react';

const baseCar: Car = {
		make: '',
		model: '',
		year: 0,
		price: 0,
		mileage: 0,
		imagePath: '',
		location: ''
}

interface CarFormProps {
	action: (car: Car) => Promise<boolean>;
	isOpen: boolean;
	close: () => void;
	title: string;
	car?: Car;
}

const CarForm: React.FC<CarFormProps> = (props) => {
	const imageFileRef = React.useRef<HTMLInputElement>(null);
	const formRef = React.useRef<HTMLFormElement>(null);
	
	const [title, setTitle] = React.useState<string>(props.title);
	const [car, setCar] = React.useState<Car>({
		...baseCar,
		...props.car
	});

	useEffect(() => {
		setCar(props.car || baseCar);
		if(props.isOpen) {
			formRef.current?.reset();
		}
	},[props.isOpen, props.car])

	useEffect(() => setTitle(props.title), [props.title]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCar((prevCar) => ({
			...prevCar,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		if(
			car.model === '' || 
			car.make === '' || 
			car.year === 0 || 
			car.price === 0 || 
			car.mileage === 0 || 
			car.location === ''
		) {
			alert('Please fill out all fields');
			return;
		}

		const outCar: Car = {
			...car,
			imageFile: imageFileRef.current?.files?.[0],
		};

		await props.action(outCar);
	};

	return (<>
		<div
			className="fixed top-0 left-0 p-8 z-50 grid w-full h-full place-items-center transition-colors"
			style={{
				backgroundColor: props.isOpen ? "rgba(12,12,12,0.4)" : "rgba(12,12,12,0)",
				pointerEvents: props.isOpen ? "auto" : "none",
			}}
		>
			{/* Add Car Form */}
			<div className="
				w-[clamp(500px,70%,800px)] h-[500px] grid grid-cols-1 grid-rows-[auto,1fr,auto] gap-2
				bg-white rounded-lg p-4 
				transform-[translateX(100vw)] 
				data-[visible=true]:transform-[translateX(0)]
				transition-transform duration-[350ms]"
				data-visible={props.isOpen}
			>
				<h1 className='text-xl mt-2'>{title}</h1>

				<form onSubmit={handleSubmit} ref={formRef}>
					<div className='flex flex-col gap-4'>
						<div className='grid grid-cols-3 gap-2'>
							<div className='w-full flex flex-col'>
								<label htmlFor="year">Year</label>
								<input
									type="number"
									name="year"
									value={car.year}
									onChange={handleChange}
									placeholder="Year"
									className="p-2 border border-gray-300 rounded"
								/></div>
							<div className='w-full flex flex-col'>

								<label htmlFor="make">Make</label>
								<input
									type="text"
									name="make"
									value={car.make}
									onChange={handleChange}
									placeholder="Make"
									className="p-2 border border-gray-300 rounded flex-grow"
								/>
							</div>

							<div className='w-full flex flex-col'>
								<label htmlFor="model">Model</label>
								<input
									type="text"
									name="model"
									value={car.model}
									onChange={handleChange}
									placeholder="Model"
									className="p-2 border border-gray-300 rounded flex-grow"
								/>
							</div>

						</div>

						<div className='grid grid-cols-2 gap-2'>
							<div className='w-full flex flex-col'>
								<label htmlFor="mileage">Mileage</label>
								<input
									type="number"
									name="mileage"
									value={car.mileage}
									onChange={handleChange}
									placeholder="10,000"
									className="p-2 border border-gray-300 rounded"
								/>
							</div>

							<div className='w-full flex flex-col'>
								<label htmlFor="price">Price</label>
								<input
									type="number"
									name="price"
									value={car.price}
									onChange={handleChange}
									placeholder="10,000"
									className="p-2 border border-gray-300 rounded"
								/>
							</div>
						</div>

						<div className='flex flex-col'>
							<label htmlFor="location">Location</label>
							<input
								type="text"
								name="location"
								value={car.location}
								onChange={handleChange}
								placeholder="location"
								className="p-2 border border-gray-300 rounded"
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor="imageFile">Image</label>
							<input
								type="file"
								name="imageFile"
								className="p-2 border border-gray-300 rounded"
								ref={imageFileRef}
							/>
						</div>
					</div>

					{/* Submit */}
					<button type="submit" className="mt-8
						h-12 w-fit px-6 py-2 bg-white shadow-sm rounded-lg border border-gray-200 text-black
						text-lg cursor-pointer hover:border-blue-400 transition-colors hover:bg-blue-100
					">
						Submit
					</button>
				</form>
				<CloseButton action={props.close} />
			</div>
		</div>
	</>)
};

export default CarForm;