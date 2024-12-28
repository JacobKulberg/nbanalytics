function updateTeamStats(gameData, currentPlay) {
	updateTeamSummary(gameData, currentPlay);
}

function updateTeamSummary(gameData, currentPlay) {
	let awayLogo = teamLogos[gameData.header.competitions[0].competitors[1].team.id];
	let homeLogo = teamLogos[gameData.header.competitions[0].competitors[0].team.id];

	$('.game-team-view.away .team-summary .team-logo').attr('src', awayLogo);
	$('.game-team-view.home .team-summary .team-logo').attr('src', homeLogo);
}

export { updateTeamStats };
