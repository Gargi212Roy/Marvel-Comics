import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacterIds } from "../redux/slices/characterIdsSlice";
import styles from "../styles/carousel.module.scss";

interface CharacterContentProps {
	characterData: any[];
	handleViewComics: () => void;
}

const CharacterContent: React.FC<CharacterContentProps> = ({
	characterData,
	handleViewComics,
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
						<div className={styles.characterCard}>
							<div
								key={index}
								className={`${styles.carouselItem} ${styles.characterItem}`}
							>
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
				<button className={styles.viewComicsBtn} onClick={handleViewComics}>
					<span>View All Comics</span>
				</button>
			)}
		</div>
	);
};

export default CharacterContent;
