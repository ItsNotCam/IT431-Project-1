import { deleteCar, generateId, getCar, getCars, updateCar } from "@/lib/db";
import { NextApiRequest } from "next";
import {  NextResponse } from "next/server";

import fs from 'fs/promises';

export async function GET({ params }: CarApiParams) {
	const ps = await params;
	const car = await getCar(ps.id);
	
	if(!car) {
		return NextResponse.json({
			car: null
		}, {
			status: 404
		})
	}

	return NextResponse.json({
		car: car
	}, {
		status: 200
	})
}

export async function PUT(req: Request, { params }: CarApiParams) {
	const ps = await params;
	const car = await getCar(ps.id);
	if(!car) {
		return NextResponse.json({
			success: false,
			car: null
		}, {
			status: 404
		})
	}

	const formData: FormData = await req.formData();
	const carData: Car = JSON.parse(formData.get('car') as string);

	// save the file
	const imageFile = formData.get('imageFile') as Blob | null;
	if(imageFile) {
		const imagePath = `data/images/${generateId()}`;
		try {
			const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
			await fs.writeFile(`./public/${imagePath}`, imageBuffer);
			carData.imagePath = `/${imagePath}`
		} catch (e) {
			console.error('Failed to write image file');
				// return NextResponse.json({
				// 	success: false
				// },{
				// 	status: 500
				// });
		}
	}

	if(carData.mileage) {
		carData.mileage = parseInt(carData.mileage as unknown as string);
	}
	if(carData.price) {
		carData.price = parseInt(carData.price as unknown as string);
	}
	if(carData.year) {
		carData.year = parseInt(carData.year as unknown as string);
	}
 
	const updatedCar: DBCar = await updateCar(ps.id, carData);
	const updatedCars = await getCars();
	return NextResponse.json({
		success: true,
		updatedCar: updatedCar,
		cars: updatedCars
	}, {
		status: 200
	})
}

export async function DELETE(req: NextApiRequest, { params }: CarApiParams) {
	const ps = await params;
	const car = await getCar(ps.id);
	if(!car) {
		return NextResponse.json({
			success: false
		}, {
			status: 404
		})
	}

	let cars: DBCar[] = await getCars();
	try {
		cars = await deleteCar(ps.id);
	} catch (e) {
		console.error("Failed to delete car", e);

		return NextResponse.json({
			success: false
		}, {
			status: 500
		})
	}

	return NextResponse.json({
		success: true,
		cars: cars
	}, {
		status: 200
	})
}