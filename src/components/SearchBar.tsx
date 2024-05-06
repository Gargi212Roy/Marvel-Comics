import { CiSearch } from "react-icons/ci";
import styles from "../styles/searchBar.module.scss";

const SearchBar = () => {
	return (
		<div className={styles.searchBar}>
			<div className={styles.searchHeader}>Marvel</div>

			<div className={styles.inputContainer}>
				<CiSearch color="#661d9f" fontSize={30} />
				<input
					className={styles.inputBox}
					type="text"
					placeholder="Search for comics..."
				/>
			</div>
		</div>
	);
};

export default SearchBar;
