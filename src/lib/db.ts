import { JSONFilePreset } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

export const generateId = () => uuidv4().substring(0,10);

const loadDB = async () => {
	const db = await JSONFilePreset<DBCar[]>('data/db.json',  
		[{
			"id": "1",
			"car":{ 
			"year": 2025,
			"make": "Toyota", 
			"model": "GR Corolla", 
			"price": 20000, 
			"mileage": 15000, 
			"imagePath": "/data/images/corolla.avif", 
			"location": "Fairfax, VA" }
		}]
	 );
	 db.write();
	 return db;
}

export const getCar = async (id: string): Promise<Car> => {
	const cars = await getCars();
	const car: Car = cars.filter((c) => c.id === id).map((c) => c.car)[0];
	return car;
}

export const getCars = async (): Promise<DBCar[]> => {
	const db = await loadDB();
	return db.data;
}

export const addCar = async(car: Car): Promise<DBCar> => {
	const db = await loadDB();

	const dbCar = {
		id: generateId(),
		car: car
	}

	db.data.push(dbCar);
	await db.write().catch(e => console.log(e));

	return dbCar;
}

export const deleteCar = async (id: string): Promise<DBCar[]> => {
	const db = await loadDB();
	db.data = db.data.filter((c: DBCar) => c.id !== id);
	await db.write().catch(e => console.log(e));

	return db.data;
}

export const updateCar = async (id: string, car: Car): Promise<DBCar> => {
	const db = await loadDB();

	const index = db.data.findIndex((c) => c.id === id);
	const updatedCar = {
		id: db.data[index].id,
		...car
	}

	db.update((data) => data[index].car = updatedCar);
	await db.write().catch(e => console.log(e));

	return db.data[index];
}