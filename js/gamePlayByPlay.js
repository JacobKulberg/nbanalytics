function updatePlayByPlay(gameData, currentPlay) {
	let plays = gameData.plays.slice(0, currentPlay + 1);
	let playByPlay = $('.game-play-by-play-view');
	playByPlay.empty();
	plays.forEach((play, index) => {
		let playDiv = $('<div></div>');
		playDiv.addClass('game-play-by-play-item');
		playDiv.text(play.text);

		if (play.scoringPlay) {
			playDiv.addClass('game-play-by-play-item-scoring');
		}
		playByPlay.append(playDiv);
	});
}

export { updatePlayByPlay };
