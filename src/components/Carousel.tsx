import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCharacterDataAPI } from "../api/marvel-comic-apis";
import styles from "../styles/carousel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterName } from "../redux/slices/characterNameSlice";
import store from "../redux/store";
import { Loader } from "./commons/Loader";

interface CarouselProps {
	handleGetCharacterData: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ handleGetCharacterData }) => {
	const dispatch = useDispatch();
	const [characters, setCharacters] = useState([]);
	const characterName = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);
	const [loading, setLoading] = useState(false);

	const handleData = async () => {
		setLoading(true);
		const response = await getCharacterDataAPI();
		if (response.code === 200) {
			setLoading(false);
		}
		console.log(response);
		setCharacters(response.data.results);
	};

	// fetch all data at the beginning
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

	const handleImgClick = (character: { name: string }) => {
		dispatch(setCharacterName(character.name));
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
			{loading && characterName.characterName.length <= 0 ? (
				<Loader />
			) : (
				<div className={styles.carouselParentContainer}>
					<Slider {...settings}>
						{characters.map((character: any) => (
							<div key={character.id}>
								<img
									src={
										character.thumbnail.path +
										"." +
										character.thumbnail.extension
									}
									alt=""
									style={{
										borderRadius: "50%",
										width: "10rem",
										height: "10rem",
									}}
									onClick={() => handleImgClick(character)}
								/>
							</div>
						))}
					</Slider>
				</div>
			)}
		</div>
	);
};

export default Carousel;
