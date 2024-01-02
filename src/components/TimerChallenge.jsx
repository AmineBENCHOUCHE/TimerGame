import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime, remainingTime }) => {
	const timerRef = useRef();
	const dialogRef = useRef();

	// const [timerExpired, setTimerExpired] = useState(false);
	// const [timerStarted, setTimerStarted] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

	if (timeRemaining <= 0) {
		console.log("test");
		clearInterval(timerRef.current);
		dialogRef.current.open();
	}

	const handleReset = () => {
		setTimeRemaining(targetTime * 1000);
	};

	const handleStartTimer = () => {
		timerRef.current = setInterval(() => {
			setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
		}, 10);
	};
	// const handleStartTimer = () => {
	// 	timerRef.current = setTimerStarted(true);
	// 	setTimeout(() => {
	// 		setTimerExpired(true);
	// 		dialogRef.current.showModal();
	// 	}, targetTime * 1000);
	// };

	const handleStopTimer = () => {
		dialogRef.current.open();
		clearInterval(timerRef.current);
	};
	// const handleStopTimer = () => {
	// 	clearTimeout(timerRef.current);
	// };

	return (
		<>
			<ResultModal
				ref={dialogRef}
				result={timerIsActive ? "lost" : "won"}
				targetTime={targetTime}
				remainingTime={timeRemaining}
				onReset={handleReset}
			/>

			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime}scond{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStopTimer : handleStartTimer}>
						{timerIsActive ? "Stop" : "Start"} Challenge
					</button>
				</p>
				<p className={timerIsActive ? "active" : undefined}>
					{timerIsActive ? "Timer is running ..." : "Timer inactive"}
				</p>
			</section>
		</>
	);
};
export default TimerChallenge;
