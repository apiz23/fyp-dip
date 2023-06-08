import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase-config";
import "./style/Forms.scss";

export default function Forms() {
	const [minDate, setMinDate] = useState("");
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([]);
	const fileUploadRef = ref(storage, "files");

	useEffect(() => {
		const today = new Date().toISOString().split("T")[0];
		setMinDate(today);
	}, []);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
	};

	const uploadFile = () => {
		if (fileUpload == null) return;
		const fileRef = ref(storage, `files/${fileUpload.name}`);
		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url]);
			});
		});
	};

	useEffect(() => {
		listAll(fileUploadRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setFileList((prev) => [...prev, url]);
				});
			});
		});
	});

	return (
		<>
			<form>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingProgramName"
						name="programName"
						placeholder="text"
						onChange={(event) => handleChange(event)}
					/>
					<label for="floatingProgramName">Program/Meeting name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="purpose"
						name="purposeBook"
						placeholder="text"
						onChange={(event) => handleChange(event)}
					/>
					<label for="floatingPurpose">Purpose of Booking</label>
					{/* <div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div> */}
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingInaugurated"
						name="Inaugurated"
						placeholder="text"
						onChange={(event) => handleChange(event)}
					/>
					<label for="floatingInaugurated">Inaugurated by?</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="number"
						className="form-control"
						id="floatingNumPeople"
						placeholder="text"
						name="people"
						onChange={(event) => handleChange(event)}
						min={1}
					/>
					<label for="floatingNumPeople">Number of participants</label>
				</div>
				<div className="date">
					<p className="h3 my-3">Date Start</p>
					<div classNameName="dateStart mb-6 d-flex">
						<label for="exampleInputPassword1" className="form-label">
							Date
						</label>
						<input
							type="date"
							className="form-control"
							id="date"
							name="dateStart"
							min={minDate}
							onChange={(event) => handleChange(event)}
						/>
						<label for="exampleInputPassword1" className="form-label">
							Time
						</label>
						<input
							type="time"
							className="form-control"
							id="time"
							name="timeStart"
							onChange={(event) => handleChange(event)}
						/>
					</div>
					<p className="h3 my-3">Date End</p>
					<div classNameName="dateEnd mb-6 d-flex">
						<label for="exampleInputPassword1" className="form-label">
							Date
						</label>
						<input
							type="date"
							className="form-control"
							id="date"
							name="dateEnd"
							min={minDate}
							onChange={(event) => handleChange(event)}
						/>
						<label for="exampleInputPassword1" className="form-label">
							Time
						</label>
						<input
							type="time"
							className="form-control"
							id="time"
							name="timeEnd"
							onChange={(event) => handleChange(event)}
						/>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col col-md-6 ">
						<div class="input-group mb-3">
							<input
								type="file"
								class="form-control"
								id="inputFile"
								onChange={(event) => {
									setFileUpload(event.target.files[0]);
								}}
							/>
							<button
								type="button"
								for="inputFile"
								className="input-group-text bg-warning text-black"
								onClick={uploadFile}
							>
								Upload
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
