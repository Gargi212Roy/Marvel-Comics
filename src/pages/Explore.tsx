import React, { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import styles from "../styles/explore.module.scss";
import Carousel from "../components/Carousel";
import FilteredComics from "../components/FilteredComics";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { toast } from "react-toastify";
import {
	getAllComicsForCharacterAPI,
	getCharacterDataAPI,
} from "../api/marvel-comic-apis";
import PaginationComponent from "../components/Pagination";
import CharacterContent from "../components/CharacterContent";
import { Loader } from "../components/commons/Loader";
const Explore = () => {
	const [characterData, setCharacterData] = useState([]);
	const [comics, setComics] = useState([]);
	const [characterTotalPages, setCharacterTotalPages] = useState(1);
	const [comicTotalPages, setComicTotalPages] = useState(1);
	const [characterCurrPage, setCharacterCurrPage] = useState(0);
	const [comicCurrPage, setComicCurrPage] = useState(0);
	const [comicOffset, setComicOffset] = useState(0);
	const [characterOffset, setCharacterOffset] = useState(0);
	const [loading, setLoading] = useState(false);

	const prevCharacterName = sessionStorage.getItem("characterName");
	const characterIds = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterIds
	);
	const characterName = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);

	useEffect(() => {
		if (characterName.characterName.length > 0) {
			handleGetCharacterData();
		}
	}, [characterName]);

	const handleGetCharacterData = async () => {
		setLoading(true);
		let newCharacterOffset;

		if (prevCharacterName === characterName.characterName) {
			newCharacterOffset = characterCurrPage * 20;
		} else {
			newCharacterOffset = 0;
		}

		setCharacterOffset(newCharacterOffset);
		if (characterName.characterName.length > 0) {
			setComics([]);
			try {
				const response = await getCharacterDataAPI(
					characterName.characterName,
					characterOffset
				);
				if (response.code === 200 && response.data.total !== 0) {
					const pages =
						response.data.total < 20
							? 1
							: response.data.total % 20
							? Math.floor(response.data.total / 20) + 1
							: Math.floor(response.data.total / 20);
					setCharacterTotalPages(pages);
					setCharacterData(response.data.results);
					setLoading(false);
				} else {
					toast.error(
						"No Matching Data Exist!! Check and enter in the correct format"
					);
					setLoading(false);
					setCharacterData([]);
				}
			} catch (error) {
				toast.error("Something went wrong!!");
				console.error("Error fetching character data:", error);
				setLoading(false);
			}
		}
	};

	const handleViewComics = async () => {
		setLoading(true);
		if (characterIds.characterIds.length > 0) {
			setCharacterData([]);
			try {
				const response = await getAllComicsForCharacterAPI(
					characterIds.characterIds,
					comicOffset
				);
				if (response.code === 200 && response.data.total !== 0) {
					toast.success("All data sent!!");
					setLoading(false);
					const pages =
						response.data.total < 20
							? 1
							: response.data.total % 20
							? Math.floor(response.data.total / 20) + 1
							: Math.floor(response.data.total / 20);
					setComicTotalPages(pages);
					setComics(response.data.results);
					const newComicOffset = (comicCurrPage + 1) * 20;
					setComicOffset(newComicOffset);
				} else {
					toast.error(
						"No Matching Data Exist!! Check and enter in the correct format"
					);
					setLoading(false);
					setComics([]);
				}
			} catch (error) {
				toast.error("Something went wrong!!");
				console.error("Error fetching comics data:", error);
				setLoading(false);
			}
		}
	};

	return (
		<div className={styles.explore}>
			<SearchBar handleGetCharacterData={handleGetCharacterData} />
			<div className={styles.exploreContainer}>
				<div className={styles.overlay}>
					<Carousel handleViewComics={handleViewComics} />
					{loading ? (
						<Loader />
					) : (
						<>
							<div>
								{characterData.length > 0 && (
									<div>
										<CharacterContent
											characterData={characterData}
											handleViewComics={handleViewComics}
										/>
										<PaginationComponent
											totalPages={characterTotalPages}
											handleGetData={handleGetCharacterData}
											currentPage={characterCurrPage}
											setCurrentPage={setCharacterCurrPage}
										/>
									</div>
								)}
							</div>
							<div>
								{characterData.length === 0 && comics.length > 0 && (
									<div>
										<FilteredComics comics={comics} />
										<PaginationComponent
											totalPages={comicTotalPages}
											handleGetData={handleViewComics}
											currentPage={comicCurrPage}
											setCurrentPage={setComicCurrPage}
										/>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Explore;
