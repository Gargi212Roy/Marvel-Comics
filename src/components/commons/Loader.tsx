import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loaderImg from "../../assets/json/loader.json";
export const Loader = () => {
	return (
		<div style={{ alignItems: "center", left: "calc(50vw - 250px)" }}>
			<Player
				autoplay
				loop
				src={loaderImg}
				style={{ height: "300px", width: "300px" }}
			>
				<Controls
					visible={false}
					buttons={["play", "repeat", "frame", "debug"]}
				/>
			</Player>
		</div>
	);
};
