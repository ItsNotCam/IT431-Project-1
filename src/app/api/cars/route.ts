import { addCar, generateId, getCars } from '@/lib/db';
import { NextResponse } from 'next/server';

import fs from 'fs/promises';

export async function GET() {
	const cars = await getCars();
	return NextResponse.json({
		cars: cars
	}, {
		status: 200
	})
}

export async function POST(req: Request) {
	const formData: FormData = await req.formData();

	const car: Car = JSON.parse(formData.get('car') as string);
	car.mileage = parseInt(car.mileage as unknown as string);
	car.price = parseInt(car.price as unknown as string);
	car.year = parseInt(car.year as unknown as string);

	// save the file
	const imageFile = formData.get('imageFile') as Blob | null;
	if (imageFile) {
		const imagePath = `data/images/${generateId()}`;
		const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
		try {
			await fs.writeFile(`./public/${imagePath}`, imageBuffer);
		} catch (e) {
			console.error('Failed to write image file', e);
			return NextResponse.json({
				success: false,
				car: null,
				cars: await getCars()
			});
		}

		car.imagePath = `/${imagePath}`
	}

	const addedCar: DBCar = await addCar(car);
	const updatedCars = await getCars();
	return NextResponse.json({
		success: true,
		car: addedCar,
		cars: updatedCars
	}, {
		status: 201
	})
}
