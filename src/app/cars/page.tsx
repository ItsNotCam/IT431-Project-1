import CarDisplay from "./CarDisplay";
import { getCars } from "@/lib/db";

export default async function Home() {
	const cars: DBCar[] = await getCars();
	return (
		<main>
			<CarDisplay cars={cars} />
		</main>
	);
}
