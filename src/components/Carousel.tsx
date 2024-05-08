import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCharacterDataAPI } from "../api/marvel-comic-apis";
import styles from "../styles/carousel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { Loader } from "./commons/Loader";
import { toast } from "react-toastify";
import { addCharacterIds } from "../redux/slices/characterIdsSlice";

interface CarouselProps {
	handleViewComics: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ handleViewComics }) => {
	const dispatch = useDispatch();
	const [characters, setCharacters] = useState([]);
	const [selectedCharacterIds, setSelectedCharacterIds] = useState<number[]>(
		[]
	);

	const characterName = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);
	const [loading, setLoading] = useState(false);

	const handleData = async () => {
		setLoading(true);
		try {
			const response = await getCharacterDataAPI();
			if (response.code === 200) {
				toast.success("All data sent!!");
				setLoading(false);
				setCharacters(response.data.results);
			} else {
				console.error("Unexpected response code:", response.code);
			}
		} catch (error) {
			toast.error("Something went wrong!!");
			console.error("Error fetching character data:", error);
		}
	};

	useEffect(() => {
		handleData();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 4,
	};

	const handleCheckboxChange = (characterId: number) => {
		const index = selectedCharacterIds.indexOf(characterId);
		if (index === -1) {
			setSelectedCharacterIds([...selectedCharacterIds, characterId]);
			dispatch(addCharacterIds([...selectedCharacterIds, characterId]));
		} else {
			setSelectedCharacterIds(
				selectedCharacterIds.filter((id) => id !== characterId)
			);
			dispatch(
				addCharacterIds(
					selectedCharacterIds.filter((charId) => charId !== characterId)
				)
			);
		}
	};

	// const { data, error, isLoading } = useQuery({
	// 	queryKey: ["Characters"],
	// 	queryFn: async () => {
	// 		const response = await getCharacterDataAPI();
	// 		return response;
	// 	},
	// });

	// if (isLoading) setLoading(true);
	// else setLoading(false);

	// if (data.code === 200) {
	// 	toast.success("All data sent!!");
	// 	setLoading(false);
	// 	setCharacters(data.data.results);
	// } else {
	// 	console.error("Unexpected response code:", data.code);
	// }

	// if (error) {
	// 	toast.error("Something went wrong!!");
	// 	console.error("Error fetching character data:", error);
	// }

	return (
		<div>
			{loading && characterName.characterName.length <= 0 ? (
				<Loader />
			) : (
				<>
					<div className={styles.carouselParentContainer}>
						<Slider {...settings}>
							{characters.map((character: any) => (
								<div className={styles.carouselItem} key={character.id}>
									<input
										className={styles.checkBox}
										type="checkbox"
										name=""
										id=""
										onChange={() => handleCheckboxChange(character.id)}
									/>
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
									/>
								</div>
							))}
						</Slider>
					</div>
					{selectedCharacterIds.length > 0 && (
						<button className={styles.viewComicsBtn} onClick={handleViewComics}>
							<span>View All Comics</span>
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Carousel;
