let chart = null;

function updateAnalysis(gameData, currentPlay) {
	updateQuarterlyScore(gameData, currentPlay);
	// updateAllCharts(gameData, currentPlay);
}

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

function updateQuarterlyScore(gameData, currentPlay) {
	let awayAbbr = teamAbbrs[gameData.header.competitions[0].competitors[1].team.id];
	let homeAbbr = teamAbbrs[gameData.header.competitions[0].competitors[0].team.id];

	$('.quarterly-score .away-team-abbr').text(awayAbbr);
	$('.quarterly-score .home-team-abbr').text(homeAbbr);

	// add periods
	let period = parseInt(gameData.plays[currentPlay].period.number);
	$('.quarterly-score tr:first-child').html('<th></th>');
	$('.quarterly-score tr:nth-child(2)').html(`<th>${awayAbbr}</th>`);
	$('.quarterly-score tr:nth-child(3)').html(`<th>${homeAbbr}</th>`);
	for (let i = 1; i <= period; i++) {
		let periodStr = i;
		if (periodStr == 5) periodStr = 'OT';
		else if (periodStr >= 6) periodStr = `${periodStr - 4}OT`;
		else periodStr = `Q${periodStr}`;

		$('.quarterly-score tr:first-child').append(`<th>${periodStr}</th>`);

		$('.quarterly-score tr:nth-child(2)').append(`<td class="away-team-score"></td>`);
		$('.quarterly-score tr:nth-child(3)').append(`<td class="home-team-score"></td>`);
	}
	$('.quarterly-score tr:first-child').append('<th>T</th>');

	let homeScores = [];
	let awayScores = [];

	let playsUntilNow = gameData.plays.slice(0, currentPlay + 1);
	playsUntilNow = playsUntilNow.filter((play) => play.scoringPlay);

	for (let quarter = 0; quarter < period; quarter++) {
		awayScores.push(0);
		homeScores.push(0);

		let quarterPlays = playsUntilNow.filter((play) => play.period.number == quarter + 1);
		quarterPlays.forEach((play) => {
			let team = play.team.id == gameData.header.competitions[0].competitors[1].team.id ? 0 : 1;
			if (team == 0) {
				awayScores[quarter] += play.scoreValue;
			} else {
				homeScores[quarter] += play.scoreValue;
			}
		});
	}

	for (let i = 0; i < period; i++) {
		$(`.quarterly-score .away-team-score:nth-child(${i + 2})`).text(awayScores[i]);
		$(`.quarterly-score .home-team-score:nth-child(${i + 2})`).text(homeScores[i]);
	}

	let awayTotal = awayScores.reduce((a, b) => a + b, 0);
	let homeTotal = homeScores.reduce((a, b) => a + b, 0);
	$('.quarterly-score tr:nth-child(2)').append(`<td class="away-team-score"></td>`);
	$('.quarterly-score tr:nth-child(3)').append(`<td class="home-team-score"></td>`);
	$('.quarterly-score .away-team-score:last-child').text(awayTotal);
	$('.quarterly-score .home-team-score:last-child').text(homeTotal);

	$('.game-analysis-view').addClass('filled');
}

export { updateAnalysis };
