import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacterIds } from "../redux/slices/characterIdsSlice";
import styles from "../styles/carousel.module.scss";

interface CharacterContentProps {
	handleClearFilters: () => void;
	characterData: any[];
	handleViewComics: () => void;
	comics: any[];
}

const CharacterContent: React.FC<CharacterContentProps> = ({
	handleClearFilters,
	characterData,
	handleViewComics,
	comics,
}) => {
	const dispatch = useDispatch();

	const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

	const handleCheckboxChange = (id: number) => {
		if (selectedCharacters.includes(id)) {
			setSelectedCharacters(
				selectedCharacters.filter((charId) => charId !== id)
			);
			dispatch(
				addCharacterIds(selectedCharacters.filter((charId) => charId !== id))
			);
		} else {
			setSelectedCharacters([...selectedCharacters, id]);
			dispatch(addCharacterIds([...selectedCharacters, id]));
		}
	};

	return (
		<div>
			<h2 className={styles.title}>Matching Characters:</h2>
			<div className={styles.filterComicsParent}>
				<div
					className={`${styles.filterComicsContainer} ${styles.carouselParentContainer}`}
				>
					{characterData.map((character: any, index: number) => (
						<div className={styles.characterCard} key={index}>
							<div className={`${styles.carouselItem} ${styles.characterItem}`}>
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
									alt="characterImg"
									style={{ width: "12rem", height: "12rem" }}
								/>
								<div className={styles.characterName}>{character.name}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedCharacters.length > 0 && (
				<div className={styles.btnContainer}>
					<button className={styles.viewComicsBtn} onClick={handleViewComics}>
						View All Comics
					</button>
					{comics.length > 0 && (
						<button className={styles.clearBtn} onClick={handleClearFilters}>
							Clear Filters
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default CharacterContent;
