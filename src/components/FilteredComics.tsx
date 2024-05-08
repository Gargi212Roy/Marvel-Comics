import React, { useState } from "react";
import styles from "../styles/carousel.module.scss";

interface FilterComicsProps {
	comics: any;
}

const FilteredComics: React.FC<FilterComicsProps> = ({ comics }) => {
	return (
		<div>
			<h2 className={styles.title}>Comics:</h2>
			<div className={styles.filterComicsParent}>
				<div className={styles.filterComicsContainer}>
					{comics.length > 0 &&
						comics.map((comic: any, index: number) => (
							<div className={styles.characterCard}>
								<div key={index} className={styles.characterItem}>
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
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default FilteredComics;
