import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import styles from "../styles/searchBar.module.scss";
import { setCharacterName } from "../redux/slices/characterNameSlice";
import store from "../redux/store";

interface SearchBarProps {
	handleGetCharacterData: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleGetCharacterData }) => {
	const dispatch = useDispatch();
	const searchTerm = useSelector(
		(state: ReturnType<typeof store.getState>) => state.characterName
	);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			console.log(12);
			handleGetCharacterData();
		}
	};
	return (
		<div className={styles.searchBar}>
			<div className={styles.searchHeader}>Marvel</div>

			<div className={styles.inputContainer}>
				<CiSearch
					color="#661d9f"
					fontSize={30}
					// onClick={handleGetCharacterData}
				/>
				<input
					className={styles.inputBox}
					type="text"
					placeholder="Search for comics..."
					onChange={(event) => dispatch(setCharacterName(event.target.value))}
					onKeyDown={handleKeyDown}
					value={searchTerm.characterName}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
