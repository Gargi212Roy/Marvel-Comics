import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getALlComicCharactersAPI } from "../api/marvel-comic-apis";
import CarouselCard from "./CarouselCard";
import styles from "../styles/carousel.module.scss";

const Carousel = () => {
	const [characters, setCharacters] = useState([]);

	const handleData = async () => {
		const response = await getALlComicCharactersAPI();
		console.log(response);
		setCharacters(response.data.results);
	};

	useEffect(() => {
		handleData();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 8,
		slidesToScroll: 4,
	};

	// const characterQuery = useQuery({
	// 	queryKey: ["Characters"],
	// 	queryFn: getALlComicCharactersAPI,
	// });

	// if (characterQuery.isLoading) return <h1>Loading...</h1>;
	// if (!characterQuery.isError) setCharacters(characterQuery.data.results);
	// else return <pre>{JSON.stringify(characterQuery.error)}</pre>;

	return (
		<div>
			<Slider {...settings}>
				{characters.map((character: any) => (
					<div key={character.id}>
						<CarouselCard character={character} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Carousel;
