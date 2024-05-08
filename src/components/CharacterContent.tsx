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

	const handleSelectCharacter = (id: number) => {
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
			<div className={styles.filterComicsContainer}>
				{characterData.map((character: any, index: number) => (
					<div key={index} className={styles.characterItem}>
						<img
							src={
								character.thumbnail.path + "." + character.thumbnail.extension
							}
							alt="characterImg"
							style={{ width: "12rem", height: "12rem" }}
							onClick={() => handleSelectCharacter(character.id)}
						/>
						{selectedCharacters.includes(character.id) && (
							<div className={styles.overlay}>✓</div>
						)}
						<div className={styles.characterName}>{character.name}</div>
					</div>
				))}
			</div>
			{selectedCharacters.length > 0 && (
				<button onClick={handleViewComics}>View All Comics</button>
			)}
		</div>
	);
};

export default CharacterContent;
