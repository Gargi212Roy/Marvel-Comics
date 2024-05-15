import React from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

interface PaginationComponentProps {
	totalPages: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	handleGetData: () => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
	totalPages,
	currentPage,
	setCurrentPage,
	handleGetData,
}) => {
	if (totalPages <= 1) {
		return null;
	}
	const handlePageChange = (e: { selected: number }) => {
		handleGetData();
		console.log("pagination: ", e.selected + 1);
		setCurrentPage(e.selected + 1);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ReactPaginate
				previousLabel=" < "
				nextLabel=" > "
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={totalPages}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={handlePageChange}
				containerClassName={"comic-pagination"}
				activeClassName={"active"}
				forcePage={currentPage - 1}
			/>
		</div>
	);
};

export default PaginationComponent;
