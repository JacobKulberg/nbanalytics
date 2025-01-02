function updateTeamStats(gameData, currentPlay) {
	updateTeamSummary(gameData, currentPlay);
}

function updateTeamSummary(gameData, currentPlay) {
	let awayLogo = teamLogos[gameData.header.competitions[0].competitors[1].team.id];
	let homeLogo = teamLogos[gameData.header.competitions[0].competitors[0].team.id];

	$('.game-team-view.away .team-summary .team-logo').attr('src', awayLogo);
	$('.game-team-view.away .team-summary .team-logo').attr('title', teamNames[gameData.header.competitions[0].competitors[1].team.id]);
	$('.game-team-view.home .team-summary .team-logo').attr('src', homeLogo);
	$('.game-team-view.home .team-summary .team-logo').attr('title', teamNames[gameData.header.competitions[0].competitors[0].team.id]);

	let labels = ['FGM', '3PM', 'FTM', 'REB', 'DREB', 'OREB', 'AST', 'STL', 'BLK', 'TO', 'POT', 'FBP', 'PIP', 'PF', 'TF'];

	let homeStats = Object.values(gameData.boxscore.teams[1].statistics);
	let awayStats = Object.values(gameData.boxscore.teams[0].statistics);

	$('.game-team-view .team-summary .team-stats').children().remove();
	for (let i = 0; i < homeStats.length; i++) {
		let homeValue = 0;
		let awayValue = 0;

		let homeValueExtra = '&#8205;';
		let awayValueExtra = '&#8205;';

		switch (labels[i]) {
			case 'FGM':
				homeValue = homeStats[0].displayValue.replace('-', '/');
				awayValue = awayStats[0].displayValue.replace('-', '/');

				homeValueExtra = parseInt(homeStats[0].displayValue.substring(0, homeStats[0].displayValue.indexOf('-'))) / parseInt(homeStats[0].displayValue.substring(homeStats[0].displayValue.indexOf('-') + 1));
				homeValueExtra *= 100;
				homeValueExtra = homeValueExtra.toFixed(1) + '%';

				awayValueExtra = parseInt(awayStats[0].displayValue.substring(0, awayStats[0].displayValue.indexOf('-'))) / parseInt(awayStats[0].displayValue.substring(awayStats[0].displayValue.indexOf('-') + 1));
				awayValueExtra *= 100;
				awayValueExtra = awayValueExtra.toFixed(1) + '%';

				break;
			case '3PM':
				homeValue = homeStats[2].displayValue.replace('-', '/');
				awayValue = awayStats[2].displayValue.replace('-', '/');

				homeValueExtra = parseInt(homeStats[2].displayValue.substring(0, homeStats[2].displayValue.indexOf('-'))) / parseInt(homeStats[2].displayValue.substring(homeStats[2].displayValue.indexOf('-') + 1));
				homeValueExtra *= 100;
				homeValueExtra = homeValueExtra.toFixed(1) + '%';

				awayValueExtra = parseInt(awayStats[2].displayValue.substring(0, awayStats[2].displayValue.indexOf('-'))) / parseInt(awayStats[2].displayValue.substring(awayStats[2].displayValue.indexOf('-') + 1));
				awayValueExtra *= 100;
				awayValueExtra = awayValueExtra.toFixed(1) + '%';
				break;
			case 'FTM':
				homeValue = homeStats[4].displayValue.replace('-', '/');
				awayValue = awayStats[4].displayValue.replace('-', '/');

				homeValueExtra = parseInt(homeStats[4].displayValue.substring(0, homeStats[4].displayValue.indexOf('-'))) / parseInt(homeStats[4].displayValue.substring(homeStats[4].displayValue.indexOf('-') + 1));
				homeValueExtra *= 100;
				homeValueExtra = homeValueExtra.toFixed(1) + '%';

				awayValueExtra = parseInt(awayStats[4].displayValue.substring(0, awayStats[4].displayValue.indexOf('-'))) / parseInt(awayStats[4].displayValue.substring(awayStats[4].displayValue.indexOf('-') + 1));
				awayValueExtra *= 100;
				awayValueExtra = awayValueExtra.toFixed(1) + '%';
				break;
			case 'REB':
				homeValue = parseInt(homeStats[6].displayValue);
				awayValue = parseInt(awayStats[6].displayValue);
				break;
			case 'OREB':
				homeValue = parseInt(homeStats[7].displayValue);
				awayValue = parseInt(awayStats[7].displayValue);
				break;
			case 'DREB':
				homeValue = parseInt(homeStats[8].displayValue);
				awayValue = parseInt(awayStats[8].displayValue);
				break;
			case 'AST':
				homeValue = parseInt(homeStats[9].displayValue);
				awayValue = parseInt(awayStats[9].displayValue);
				break;
			case 'STL':
				homeValue = parseInt(homeStats[10].displayValue);
				awayValue = parseInt(awayStats[10].displayValue);
				break;
			case 'BLK':
				homeValue = parseInt(homeStats[11].displayValue);
				awayValue = parseInt(awayStats[11].displayValue);
				break;
			case 'TO':
				homeValue = parseInt(homeStats[12].displayValue);
				awayValue = parseInt(awayStats[12].displayValue);
				break;
			case 'TF':
				homeValue = parseInt(homeStats[15].displayValue);
				awayValue = parseInt(awayStats[15].displayValue);
				break;
			case 'POT':
				homeValue = parseInt(homeStats[18].displayValue);
				awayValue = parseInt(awayStats[18].displayValue);
				break;
			case 'FBP':
				homeValue = parseInt(homeStats[19].displayValue);
				awayValue = parseInt(awayStats[19].displayValue);
				break;
			case 'PIP':
				homeValue = parseInt(homeStats[20].displayValue);
				awayValue = parseInt(awayStats[20].displayValue);
				break;
			case 'PF':
				homeValue = parseInt(homeStats[21].displayValue);
				awayValue = parseInt(awayStats[21].displayValue);
				break;
			default:
				continue;
		}

		let teamSummaryItem = $('<div class="team-summary-item"></div>');
		let teamSummaryItemStat = $('<div class="team-summary-item-stat"></div>');
		let teamSummaryItemLabel = $('<div class="team-summary-item-label"></div>');
		let teamSummaryItemExtra = $('<div class="team-summary-item-extra"></div>');

		teamSummaryItem.append(teamSummaryItemStat);
		teamSummaryItem.append(teamSummaryItemLabel);
		teamSummaryItem.append(teamSummaryItemExtra);

		$('.game-team-view .team-summary .team-stats').append(teamSummaryItem.clone());

		$(`.game-team-view.home .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-stat`).text(homeValue);
		$(`.game-team-view.away .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-stat`).text(awayValue);

		$(`.game-team-view.home .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-label`).text(labels[i]);
		$(`.game-team-view.away .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-label`).text(labels[i]);

		$(`.game-team-view.home .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-extra`).html(homeValueExtra);
		$(`.game-team-view.away .team-summary .team-stats .team-summary-item:nth-child(${i + 1}) .team-summary-item-extra`).html(awayValueExtra);
	}
}

export { updateTeamStats };
