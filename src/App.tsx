import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<>
			<Router>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<Explore />} />
					</Routes>{" "}
					<ToastContainer />
				</QueryClientProvider>
			</Router>
		</>
	);
}

export default App;
