interface CarActionProps {
	cars: Car[];
	success: boolean;
}

type Car = {
	year: number
	make: string
	model: string
	price: number
	mileage: number
	imagePath: string
	location: string
	imageFile?: File
}

type DBCar = {
	id: string
	car: Car
}

interface CarApiParams {
	params: {
		id: string;
	}
}

type FormState = "add" | "edit" | "close";