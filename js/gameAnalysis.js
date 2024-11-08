let chart = null;

function updateAllCharts(gameData, currentPlay) {
	let playsUntilNow = gameData.plays.slice(0, currentPlay + 1);
	playsUntilNow = playsUntilNow.filter((play) => play.scoringPlay);

	let labels = playsUntilNow.map((play) => '');

	let teamScores = [];
	let scoreColors = [];
	for (let i = 0; i < playsUntilNow.length; i++) {
		if (playsUntilNow[i].awayScore == 0) {
			teamScores.push(playsUntilNow[i].homeScore);
		} else if (playsUntilNow[i].homeScore == 0) {
			teamScores.push(playsUntilNow[i].awayScore);
		} else {
			if (playsUntilNow[i].awayScore == playsUntilNow[i - 1].awayScore) {
				teamScores.push(playsUntilNow[i].homeScore);
			} else {
				teamScores.push(playsUntilNow[i].awayScore);
			}
		}

		scoreColors.push(`#${teamColors[playsUntilNow[i].team.id]}`);
	}

	const ctx = $('#myChart');
	ctx.height(500);

	if (chart) {
		chart.data.labels = labels;
		chart.data.datasets[0].data = teamScores;
		chart.data.datasets[0].backgroundColor = scoreColors;
		chart.data.datasets[0].hoverBackgroundColor = scoreColors;
		chart.update();
	} else {
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						data: teamScores,
						backgroundColor: scoreColors,
						hoverBackgroundColor: scoreColors,
					},
				],
			},
			options: {
				scales: {
					x: {
						grid: {
							display: false,
						},
					},
					y: {
						beginAtZero: true,
						border: {
							display: false,
						},
						grid: {
							color: 'gray',
						},
						ticks: {
							precision: 0,
							color: 'white',
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false,
					},
					events: null,
				},
				devicePixelRatio: window.devicePixelRatio * 3 || 1,
			},
		});
	}
}

export { updateAllCharts };
