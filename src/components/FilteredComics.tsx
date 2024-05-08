import React, { useState } from "react";
import styles from "../styles/carousel.module.scss";
import store from "../redux/store";
import { getAllComicsForCharacterAPI } from "../api/marvel-comic-apis";

interface FilterComicsProps {
	comics: any;
}

const FilteredComics: React.FC<FilterComicsProps> = ({ comics }) => {
	console.log("cmoics: ", comics);
	return (
		<div>
			<h2 className={styles.title}>Comics:</h2>
			<div className={styles.filterComicsContainer}>
				{comics.length > 0 &&
					comics.map((comic: any, index: number) => (
						<div key={index}>
							<img
								src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
								alt={comic.title}
								style={{
									width: "15rem",
									height: "15rem",
								}}
							/>
							<p className={styles.characterName}>{comic.title}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default FilteredComics;
