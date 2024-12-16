let playerNames = {};
let playerImages = {};

let cumulativeScoreGraph = null;
let winProbabilityGraph = null;

function updateAnalysis(gameData, currentPlay) {
	updateQuarterlyScore(gameData, currentPlay);
	updateTeamLeaders(gameData, currentPlay);
	updateCumulativeScoreGraph(gameData, currentPlay);
	updateWinProbabilityGraph(gameData, currentPlay);

	adjustGameViewsHeight();
}

function updateQuarterlyScore(gameData, currentPlay) {
	let awayAbbr = teamAbbrs[gameData.header.competitions[0].competitors[1].team.id];
	let homeAbbr = teamAbbrs[gameData.header.competitions[0].competitors[0].team.id];

	let awayColor = teamColors[gameData.header.competitions[0].competitors[1].team.id];
	let homeColor = teamColors[gameData.header.competitions[0].competitors[0].team.id];

	$('.quarterly-score .away-team-abbr').text(awayAbbr);
	$('.quarterly-score .home-team-abbr').text(homeAbbr);

	// add periods
	let period = parseInt(gameData.plays[currentPlay].period.number);
	$('.quarterly-score tr:first-child').html('<th></th>');
	$('.quarterly-score tr:nth-child(2)').html(`<th style="color: #${awayColor}; text-shadow: 0 0 3px #${awayColor};">${awayAbbr}</th>`);
	$('.quarterly-score tr:nth-child(3)').html(`<th style="color: #${homeColor}; text-shadow: 0 0 3px #${homeColor};">${homeAbbr}</th>`);
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
	$('.quarterly-score tr:nth-child(2)').append(`<td style="color: #${awayColor}; text-shadow: 0 0 3px #${awayColor};" class="away-team-score"></td>`);
	$('.quarterly-score tr:nth-child(3)').append(`<td style="color: #${homeColor}; text-shadow: 0 0 3px #${homeColor};" class="home-team-score"></td>`);
	$('.quarterly-score .away-team-score:last-child').text(awayTotal);
	$('.quarterly-score .home-team-score:last-child').text(homeTotal);

	$('.game-analysis-view').addClass('filled');
}

async function updateTeamLeaders(gameData, currentPlay) {
	let leaders = getAllLeadersUntilNow(gameData, currentPlay);

	$('.team-leaders .leader').empty();

	let awayColor = teamColors[gameData.header.competitions[0].competitors[1].team.id];
	let homeColor = teamColors[gameData.header.competitions[0].competitors[0].team.id];
	$('.team-leaders.away').css('background', `linear-gradient(90deg, #${awayColor}91 0%, #${awayColor}1A 97%, transparent 100%)`);
	$('.team-leaders.home').css('background', `linear-gradient(90deg, transparent 0%, #${homeColor}1A 3%, #${homeColor}91 100%)`);

	// away
	let awayPointLeader = leaders.points.find((leader) => leader.team == gameData.header.competitions[0].competitors[1].team.id);
	let imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(awayPointLeader.player)}" title="${await _getPlayerName(awayPointLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[1].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[1].team.id]}">`);
	$('.team-leaders.away .leader.points').append(imageDiv);
	$('.team-leaders.away .leader.points').append(`<div>${await _getPlayerName(awayPointLeader.player)}</div>`);
	$('.team-leaders.away .leader.points').append(`<div>${awayPointLeader.points} PTS</div>`);

	let awayReboundLeader = leaders.rebounds.find((leader) => leader.team == gameData.header.competitions[0].competitors[1].team.id);
	imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(awayReboundLeader.player)}" title="${await _getPlayerName(awayReboundLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[1].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[1].team.id]}">`);
	$('.team-leaders.away .leader.rebounds').append(imageDiv);
	$('.team-leaders.away .leader.rebounds').append(`<div>${await _getPlayerName(awayReboundLeader.player)}</div>`);
	$('.team-leaders.away .leader.rebounds').append(`<div>${awayReboundLeader.rebounds} REB</div>`);

	let awayAssistLeader = leaders.assists.find((leader) => leader.team == gameData.header.competitions[0].competitors[1].team.id);
	imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(awayAssistLeader.player)}" title="${await _getPlayerName(awayAssistLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[1].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[1].team.id]}">`);
	$('.team-leaders.away .leader.assists').append(imageDiv);
	$('.team-leaders.away .leader.assists').append(`<div>${await _getPlayerName(awayAssistLeader.player)}</div>`);
	$('.team-leaders.away .leader.assists').append(`<div>${awayAssistLeader.assists} AST</div>`);

	// home
	let homePointLeader = leaders.points.find((leader) => leader.team == gameData.header.competitions[0].competitors[0].team.id);
	imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(homePointLeader.player)}" title="${await _getPlayerName(homePointLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[0].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[0].team.id]}">`);
	$('.team-leaders.home .leader.points').append(imageDiv);
	$('.team-leaders.home .leader.points').append(`<div>${await _getPlayerName(homePointLeader.player)}</div>`);
	$('.team-leaders.home .leader.points').append(`<div>${homePointLeader.points} PTS</div>`);

	let homeReboundLeader = leaders.rebounds.find((leader) => leader.team == gameData.header.competitions[0].competitors[0].team.id);
	imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(homeReboundLeader.player)}" title="${await _getPlayerName(homeReboundLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[0].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[0].team.id]}">`);
	$('.team-leaders.home .leader.rebounds').append(imageDiv);
	$('.team-leaders.home .leader.rebounds').append(`<div>${await _getPlayerName(homeReboundLeader.player)}</div>`);
	$('.team-leaders.home .leader.rebounds').append(`<div>${homeReboundLeader.rebounds} REB</div>`);

	let homeAssistLeader = leaders.assists.find((leader) => leader.team == gameData.header.competitions[0].competitors[0].team.id);
	imageDiv = $('<div></div>');
	imageDiv.append(`<img src="${await _getPlayerHeadshot(homeAssistLeader.player)}" title="${await _getPlayerName(homeAssistLeader.player)}">`);
	imageDiv.append(`<img src="${teamLogos[gameData.header.competitions[0].competitors[0].team.id]}" title="${teamNames[gameData.header.competitions[0].competitors[0].team.id]}">`);
	$('.team-leaders.home .leader.assists').append(imageDiv);
	$('.team-leaders.home .leader.assists').append(`<div>${await _getPlayerName(homeAssistLeader.player)}</div>`);
	$('.team-leaders.home .leader.assists').append(`<div>${homeAssistLeader.assists} AST</div>`);
}

function updateCumulativeScoreGraph(gameData, currentPlay) {
	let playsUntilNow = gameData.plays.slice(0, currentPlay + 1);
	playsUntilNow = playsUntilNow.filter((play) => play.scoringPlay);

	let labels = playsUntilNow.map(() => '');

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

	if (cumulativeScoreGraph) {
		cumulativeScoreGraph.data.labels = labels;
		cumulativeScoreGraph.data.datasets[1].data = teamScores;
		cumulativeScoreGraph.data.datasets[1].backgroundColor = scoreColors;
		cumulativeScoreGraph.data.datasets[1].hoverBackgroundColor = scoreColors;
		cumulativeScoreGraph.update();
	} else {
		const ctx = $('.cumulative-score-graph');
		ctx.height(500);

		cumulativeScoreGraph = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						label: teamAbbrs[gameData.header.competitions[0].competitors[1].team.id],
						data: [],
						hidden: true,
					},
					{
						label: teamAbbrs[gameData.header.competitions[0].competitors[0].team.id],
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
						grid: {
							color: 'white',
							drawOnChartArea: false,
						},
						ticks: {
							precision: 0,
							color: 'white',
							font: {
								size: 15,
								family: "'Poppins', 'Calibri', sans-serif",
								weight: 'bold',
							},
						},
						position: 'right',
					},
				},
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							color: 'white',
							font: {
								size: 15,
								family: "'Poppins', 'Calibri', sans-serif",
								weight: 'bold',
							},
							generateLabels: (chart) => {
								let labelColors = [`#${teamColors[gameData.header.competitions[0].competitors[1].team.id]}`, `#${teamColors[gameData.header.competitions[0].competitors[0].team.id]}`];

								const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
								labels.forEach((label, index) => {
									label.hidden = false;
									label.fillStyle = labelColors[index];
								});
								return labels;
							},
						},
						onClick: () => {},
					},
					tooltip: {
						enabled: false,
					},
					events: null,
				},
			},
		});
	}
}

function updateWinProbabilityGraph(gameData, currentPlay) {
	if (!gameData.winprobability) return;

	let playsUntilNow = gameData.plays.slice(0, currentPlay + 1);
	playsUntilNow = playsUntilNow.filter((play) => play.scoringPlay);

	let winProbabilities = gameData.winprobability.slice(0, currentPlay + 1).map((wp) => 2 * 100 * (0.5 - wp.homeWinPercentage));
	let labels = winProbabilities.map(() => '');

	if (winProbabilityGraph) {
		winProbabilityGraph.data.labels = labels;
		winProbabilityGraph.data.datasets[0].data = winProbabilities;
		winProbabilityGraph.update();
	} else {
		const ctx = $('.win-probability-graph');
		ctx.height(500);

		winProbabilityGraph = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						data: winProbabilities,
						pointRadius: 0,
						pointHitRadius: 0,
						cubicInterpolationMode: 'monotone',
						fill: true,
						borderWidth: 4,
						borderColor: 'rgba(0, 0, 0, 0.25)',
						backgroundColor: (context) => {
							const { chart } = context;
							const { ctx, chartArea } = chart;
							if (!chartArea) return null;

							const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
							gradient.addColorStop(0, `#${teamColors[gameData.header.competitions[0].competitors[1].team.id]}`);
							gradient.addColorStop(0.5, `#${teamColors[gameData.header.competitions[0].competitors[1].team.id]}`);
							gradient.addColorStop(0.5, 'transparent');
							gradient.addColorStop(0.5, `#${teamColors[gameData.header.competitions[0].competitors[0].team.id]}`);
							gradient.addColorStop(1, `#${teamColors[gameData.header.competitions[0].competitors[0].team.id]}`);
							return gradient;
						},
					},
				],
			},
			axisY: {
				tickLength: 0,
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						min: -100,
						max: 100,
						ticks: {
							maxTicksLimit: 2,
							color: 'white',
							font: {
								size: 15,
								family: "'Poppins', 'Calibri', sans-serif",
								weight: 'bold',
							},
							callback: function (value) {
								// Define custom tick text
								if (value === 100) return `${teamAbbrs[gameData.header.competitions[0].competitors[1].team.id]} 100%`;
								if (value === -100) return `${teamAbbrs[gameData.header.competitions[0].competitors[0].team.id]} 100%`;
								return ''; // Hide other tick marks
							},
						},
						position: 'right',
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});
	}
}

function getAllLeadersUntilNow(gameData, currentPlay) {
	let pointLeaders = {};
	let reboundLeaders = {};
	let assistLeaders = {};

	let playsUntilNow = gameData.plays.slice(0, currentPlay + 1);
	playsUntilNow.forEach((play) => {
		if (play.scoringPlay) {
			// points
			let player = play.participants[0].athlete.id;
			let team = parseInt(play.team.id);
			let points = play.scoreValue;

			if (pointLeaders[player]) {
				pointLeaders[player].points += points;
			} else {
				pointLeaders[player] = {
					player: player,
					team: team,
					points: points,
				};
			}

			// assists
			player = play.participants[1]?.athlete.id;
			if (!player) return;
			team = parseInt(play.team.id);

			if (assistLeaders[player]) {
				assistLeaders[player].assists += 1;
			} else {
				assistLeaders[player] = {
					player: player,
					team: team,
					assists: 1,
				};
			}
		}
	});

	// rebounds
	let reboundPlays = gameData.plays.slice(0, currentPlay + 1).filter((play) => [155, 156].includes(parseInt(play.type.id)));
	reboundPlays.forEach((play) => {
		let player = play.participants?.[0].athlete.id;
		if (!player) return;
		let team = parseInt(play.team.id);

		if (reboundLeaders[player]) {
			reboundLeaders[player].rebounds += 1;
		} else {
			reboundLeaders[player] = {
				player: player,
				team: team,
				rebounds: 1,
			};
		}
	});

	// points
	pointLeaders = Object.values(pointLeaders);
	pointLeaders.sort((a, b) => b.points - a.points);
	let teamIds = [];
	let uniquePointLeaders = [];
	pointLeaders.forEach((leader) => {
		if (!teamIds.includes(leader.team)) {
			teamIds.push(leader.team);
			uniquePointLeaders.push(leader);
		}
	});

	// rebounds
	reboundLeaders = Object.values(reboundLeaders);
	reboundLeaders.sort((a, b) => b.rebounds - a.rebounds);
	teamIds = [];
	let uniqueReboundLeaders = [];
	reboundLeaders.forEach((leader) => {
		if (!teamIds.includes(leader.team)) {
			teamIds.push(leader.team);
			uniqueReboundLeaders.push(leader);
		}
	});

	// assists
	assistLeaders = Object.values(assistLeaders);
	assistLeaders.sort((a, b) => b.assists - a.assists);
	teamIds = [];
	let uniqueAssistLeaders = [];
	assistLeaders.forEach((leader) => {
		if (!teamIds.includes(leader.team)) {
			teamIds.push(leader.team);
			uniqueAssistLeaders.push(leader);
		}
	});

	return {
		points: uniquePointLeaders,
		rebounds: uniqueReboundLeaders,
		assists: uniqueAssistLeaders,
	};
}

async function _getPlayerName(playerId) {
	let name = playerNames[playerId];
	if (!name) {
		name = await getPlayerName(playerId);
		playerNames[playerId] = name;
	}

	return name;
}

async function _getPlayerHeadshot(playerId) {
	let image = playerImages[playerId];
	if (!image) {
		image = await getPlayerHeadshot(playerId);
		playerImages[playerId] = image;
	}

	return image;
}

function adjustGameViewsHeight() {
	let height = $('.game-analysis-view').outerHeight(true);
	$('.game-views').css('height', `${height}px`);
}

$(window).on('resize orientationchange', adjustGameViewsHeight);

export { updateAnalysis };
