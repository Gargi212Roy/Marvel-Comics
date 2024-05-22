import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCharacterDataAPI } from "../api/marvel-comic-apis";
import styles from "../styles/carousel.module.scss";
import { useDispatch } from "react-redux";
import { Loader } from "./commons/Loader";
import { toast } from "react-toastify";
import { addCharacterIds } from "../redux/slices/characterIdsSlice";

interface CarouselProps {
	handleViewComics: () => void;
	handleClearFilters: () => void;
	comics: any[];
}

const Carousel: React.FC<CarouselProps> = ({
	handleViewComics,
	handleClearFilters,
	comics,
}) => {
	const dispatch = useDispatch();
	const [selectedCharacterIds, setSelectedCharacterIds] = useState<number[]>(
		[]
	);

	const fetchCharacters = async () => {
		const response = await getCharacterDataAPI();
		return response;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ["Characters"],
		queryFn: fetchCharacters,
	});

	useEffect(() => {
		if (data?.code === 200) {
			toast.success("All data sent!!");
		} else if (error) {
			toast.error("Something went wrong!!");
			console.error("Error fetching character data:", error);
		}
	}, [data, error]);

	const getCarouselSettings = (): Settings => {
		const windowWidth = window.innerWidth;
		let slidesToShow = 6;
		let slidesToScroll = 4;
		if (windowWidth >= 500 && windowWidth <= 768) {
			slidesToShow = 4;
			slidesToScroll = 2;
		}
		if (windowWidth >= 320 && windowWidth <= 500) {
			slidesToShow = 2;
			slidesToScroll = 2;
		}

		return {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
		};
	};

	const settings = getCarouselSettings();

	const handleCheckboxChange = (characterId: number) => {
		const index = selectedCharacterIds.indexOf(characterId);
		if (index === -1) {
			const newSelectedIds = [...selectedCharacterIds, characterId];
			setSelectedCharacterIds(newSelectedIds);
			dispatch(addCharacterIds(newSelectedIds));
		} else {
			const newSelectedIds = selectedCharacterIds.filter(
				(id) => id !== characterId
			);
			setSelectedCharacterIds(newSelectedIds);
			dispatch(addCharacterIds(newSelectedIds));
		}
	};

	const handleClear = () => {
		setSelectedCharacterIds([]);
		handleClearFilters();
	};

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className={styles.carouselParentContainer}>
						<Slider {...settings}>
							{data?.data.results.map((character: any) => (
								<div className={styles.carouselItem} key={character.id}>
									<input
										className={styles.checkBox}
										type="checkbox"
										checked={selectedCharacterIds.includes(character.id)}
										onChange={() => handleCheckboxChange(character.id)}
									/>
									<img
										src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
										alt={character.name}
										style={{
											borderRadius: "50%",
											width: "6rem",
											height: "6rem",
										}}
									/>
								</div>
							))}
						</Slider>
					</div>
					{selectedCharacterIds.length > 0 && (
						<div className={styles.btnContainer}>
							<button
								className={styles.viewComicsBtn}
								onClick={handleViewComics}
							>
								View All Comics
							</button>
							{comics.length > 0 && (
								<button className={styles.clearBtn} onClick={handleClear}>
									Clear Filters
								</button>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Carousel;
