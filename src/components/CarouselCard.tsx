import React from "react";

interface CarouselCardProps {
	character: any;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ character }) => {
	console.log("character: ", character);
	return (
		<div>
			<img
				src={character.thumbnail.path + "." + character.thumbnail.extension}
				alt=""
				style={{ borderRadius: "50%", width: "10rem", height: "10rem" }}
			/>
		</div>
	);
};

export default CarouselCard;
