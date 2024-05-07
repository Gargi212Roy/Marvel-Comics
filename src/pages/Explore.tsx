import React from "react";
import exploreBgImg from "../assets/jpeg/exploreBgImg.jpg";

import SearchBar from "../components/SearchBar";
import styles from "../styles/explore.module.scss";
import Carousel from "../components/Carousel";
const Explore = () => {
	return (
		<div>
			<SearchBar />
			<div className={styles.exploreContainer}>
				<div className={styles.overlay}>
					<Carousel />
				</div>
			</div>
		</div>
	);
};

export default Explore;
