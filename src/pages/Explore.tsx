import React, { useState } from "react";

import SearchBar from "../components/SearchBar";
import styles from "../styles/explore.module.scss";
import Carousel from "../components/Carousel";
import FilteredComics from "../components/FilteredComics";
import { useSelector } from "react-redux";
import store from "../redux/store";
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

	const characterIds = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterIds
	);

	const characterName = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);

	const handleGetCharacterData = async () => {
		setLoading(true);

		if (characterName.characterName.length > 0) {
			setComics([]);
			try {
				const response = await getCharacterDataAPI(
					characterName.characterName,
					characterOffset
				);
				console.log("response: ", response);
				if (response.code === 200) {
					console.log(true);
					const pages =
						response.data.total < 20
							? 1
							: response.data.total % 20
							? Math.floor(response.data.total / 20) + 1
							: Math.floor(response.data.total / 20);
					console.log("pages: ", pages);
					setCharacterTotalPages(pages);
					setCharacterData(response.data.results);
					const newCharacterOffset = (characterCurrPage + 1) * 20;
					setCharacterOffset(newCharacterOffset);
					setLoading(false);
				} else {
					setLoading(false);
					setCharacterData([]);
				}
			} catch (error) {
				console.error("Error fetching character data:", error);
				setLoading(false);
			}
		}
	};

	const handleViewComics = async () => {
		setLoading(true);
		console.log(2);
		if (characterIds.characterIds.length > 0) {
			setCharacterData([]);
			try {
				const response = await getAllComicsForCharacterAPI(
					characterIds.characterIds,
					comicOffset
				);
				if (response.code === 200) {
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
					setLoading(false);
					setComics([]);
				}
			} catch (error) {
				console.error("Error fetching comics data:", error);
				setLoading(false);
			}
		}
	};

	return (
		<div>
			<SearchBar handleGetCharacterData={handleGetCharacterData} />

			<div className={styles.exploreContainer}>
				<div className={styles.overlay}>
					<Carousel handleGetCharacterData={handleGetCharacterData} />
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
