import React from "react";
import exploreBgImg from "../assets/jpeg/exploreBgImg.jpg";

import SearchBar from "../components/SearchBar";
import styles from "../styles/explore.module.scss";
const Explore = () => {
	return (
		<div>
			<SearchBar />
			<div className={styles.exploreContainer}>
				<div className={styles.overlay}></div>
			</div>
		</div>
	);
};

export default Explore;
