"use client"

import React from 'react';
import Image from 'next/image';

import CarMaxLogo from "@/assets/CarmaxLogo.svg"
import LocationIcon from "@/assets/LocationIcon.svg"
import PersonIcon from "@/assets/PersonIcon.svg"
import HeartIcon from "@/assets/HeartIcon.svg"
import Link from 'next/link';

const Nav: React.FC = () => (
	<nav className='w-full flex gap-8 h-12 my-4 px-4 items-center'>
		<Link href="/">
			<Image src={CarMaxLogo} alt="Carmax Logo" className='h-8 mt-2 w-fit' />
		</Link>
		<ul className='flex flex-grow gap-10 text-[#053361]'>
			<Link href="cars" className='cursor-pointer hover:text-blue-400'>Shop</Link>
			<li className=''>Sell/Trade</li>
			<li className=''>Finance</li>
			<li className=''>Research</li>
		</ul>
		<div className='ml-auto mr-4 flex gap-6 items-center'>
			<Image src={LocationIcon} alt="Location Icon" height={24} width={24} />
			<Image src={HeartIcon} alt="Heart Icon" height={24} width={24} className='ml-2' />
			<Image src={PersonIcon} alt="Person Icon" height={32} width={32} />
		</div>
	</nav>
)

export default Nav;