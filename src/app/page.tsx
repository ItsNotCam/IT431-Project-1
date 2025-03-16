import Link from 'next/link';

export default async function Home() {
	return (
		<main>
			<img src="/homebg.webp" className='absolute top-0 left-0 w-full h-full -z-10 object-cover'></img>
			<div className='absolute top-1/2 left-1/2 -translate-1/2 text-gray-800 flex items-center justify-center w-full flex-col gap-2'>
				<h1 className='text-5xl font-bold'>The way car</h1>
				<h1 className='text-5xl font-bold'>buying should be</h1>
				<p className='mt-2'>Upfront prices. CarMax Certified quality.</p>
				<Link href="cars" className='text-gray-800 font-semibold text-xl uppercase bg-[#FFC826] hover:bg-[#FFE32D] transition-colors px-16 py-4 rounded-md mt-6'>
					Search Cars
				</Link>
			</div>
		</main>
	);
}
