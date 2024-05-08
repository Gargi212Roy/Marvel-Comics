import React, { useState } from "react";
import exploreBgImg from "../assets/jpeg/exploreBgImg.jpg";

import SearchBar from "../components/SearchBar";
import styles from "../styles/explore.module.scss";
import Carousel from "../components/Carousel";
import FilteredComics from "../components/FilteredComics";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
	getAllComicsForCharacterAPI,
	getCharacterDataAPI,
} from "../api/marvel-comic-apis";
import PaginationComponent from "../components/Pagination";
import CharacterContent from "../components/CharacterContent";
const Explore = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [characterData, setCharacterData] = useState([]);
	const [comics, setComics] = useState([]);
	const [characterTotalPages, setCharacterTotalPages] = useState(1);
	const [comicTotalPages, setComicTotalPages] = useState(1);
	const [characterCurrPage, setCharacterCurrPage] = useState(0);
	const [comicCurrPage, setComicCurrPage] = useState(0);
	const [comicOffset, setComicOffset] = useState(0);
	const [characterOffset, setCharacterOffset] = useState(0);

	const characterIds = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterIds
	);
	const characterName = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);

	const handleGetCharacterData = async () => {
		if (characterName.characterName.length > 0) {
			setComics([]);
			const response = await getCharacterDataAPI(
				characterName.characterName,
				characterOffset
			);
			console.log("char response: ", response.data);
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
			setComicOffset(newCharacterOffset);
		}
	};

	const handleViewComics = async () => {
		if (characterIds.characterIds.length > 0) {
			setCharacterData([]);
			const response = await getAllComicsForCharacterAPI(
				characterIds.characterIds,
				comicOffset
			);
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
		}
	};

	return (
		<div>
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				handleGetCharacterData={handleGetCharacterData}
			/>
			<div className={styles.exploreContainer}>
				<div className={styles.overlay}>
					<Carousel handleGetCharacterData={handleGetCharacterData} />
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
				</div>
			</div>
		</div>
	);
};

export default Explore;
