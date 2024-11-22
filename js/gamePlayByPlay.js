let players = {};

async function updatePlayByPlay(gameData, currentPlay) {
	let plays = gameData.plays.slice(0, currentPlay + 1);
	let playByPlay = $('.game-play-by-play-view');

	playByPlay.empty();
	for (let i = 0; i < plays.length; i++) {
		let play = plays[i];

		let playDiv = $('<div></div>');
		playDiv.addClass('game-play-by-play-item');

		let playObject = await getPlayObject(play, i, plays);

		if (playObject === null) continue;

		applyReplacements(playObject);

		let playText = $('<div></div>');
		playText.addClass('game-play-by-play-item-main-text');
		playText.text(playObject.text);
		playDiv.append(playText);

		if (playObject.subtext) {
			let playSubText = $('<div></div>');
			playSubText.addClass('game-play-by-play-item-sub-text');
			playSubText.text(playObject.subtext);
			playDiv.append(playSubText);
		}

		playByPlay.prepend(playDiv);
	}

	if ($('.game-play-by-play-view').hasClass('active')) {
		let height = $(`.game-play-by-play-view`).height();
		$('.game-views').css('height', height + 'px');
	}
}

async function getPlayObject(play, playNum, plays) {
	let playObject = null;

	switch (parseInt(play.type.id)) {
		case 9:
			playObject = {
				permanent: false,
				text: ':player1: defensive goaltending',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 11:
			playObject = {
				permanent: false,
				text: 'Jump Ball: :player1: vs :player2:',
				subtext: ':player3: gains possession',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
					':player3:': await _getPlayerName(play.participants[2]?.athlete.id),
				},
			};
			break;
		case 16:
			playObject = {
				permanent: false,
				text: ':team: timeout',
				replacements: {
					':team:': teamNamesShort[play.team.id],
				},
			};
			break;
		case 17:
			playObject = {
				permanent: false,
				text: ':team: timeout',
				replacements: {
					':team:': teamNamesShort[play.team.id],
				},
			};
			break;
		case 21:
			playObject = {
				permanent: false,
				text: 'Blocking foul on :player1:',
				subtext: ':player2: draws the foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 22:
			playObject = {
				permanent: false,
				text: 'Personal take foul on :player1:',
				subtext: ':player2: draws the foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 23:
			playObject = {
				permanent: false,
				text: 'Personal block foul on :player1:',
				subtext: ':player2: draws the foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 24:
			playObject = {
				permanent: false,
				text: 'Personal charge foul on :player1:',
				subtext: ':player2: draws the foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 25:
			playObject = {
				permanent: false,
				text: ':team1: excess timeout technical',
				replacements: {
					':team1:': teamNamesShort[play.team.id],
				},
			};
			break;
		case 27:
			playObject = {
				permanent: false,
				text: 'Taunting technical foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 29:
			playObject = {
				permanent: false,
				text: 'Defensive 3-seconds technical foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 30:
			playObject = {
				permanent: false,
				text: 'Double technical foul on :player1: and :player2:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 31:
			playObject = {
				permanent: false,
				text: 'Flagrant type 2 foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 32:
			playObject = {
				permanent: false,
				text: 'Flagrant type 1 foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 33:
			playObject = {
				permanent: false,
				text: 'Hanging technical foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 34:
			playObject = {
				permanent: false,
				text: 'Non-unsportsmanlike technical foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 35:
			playObject = {
				permanent: false,
				text: 'Technical foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 36:
			playObject = {
				permanent: false,
				text: 'Double personal foul on :player1: and :player2:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 37:
			playObject = {
				permanent: false,
				text: 'Clear path foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 40:
			playObject = {
				permanent: false,
				text: 'Away from play foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 41:
			playObject = {
				permanent: false,
				text: 'Inbound foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 42:
			playObject = {
				permanent: false,
				text: 'Offensive foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 43:
			playObject = {
				permanent: false,
				text: 'Loose ball foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 44:
			playObject = {
				permanent: false,
				text: 'Shooting foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 45:
			playObject = {
				permanent: false,
				text: 'Personal foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 46:
			playObject = {
				permanent: false,
				text: 'Defensive foul on :player1:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 62:
			playObject = {
				permanent: true,
				text: ':player1: bad pass',
				subtext: 'Stolen by :player2:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 63:
			playObject = {
				permanent: true,
				text: ':player1: lost ball',
				subtext: 'Stolen by :player2:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 64:
			playObject = {
				permanent: true,
				text: ':player1: traveling',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 65:
			playObject = {
				permanent: true,
				text: ':player1: double dribble',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 66:
			playObject = {
				permanent: true,
				text: ':player1: discontinued dribble',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 67:
			playObject = {
				permanent: true,
				text: ':player1: 3 second violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 68:
			playObject = {
				permanent: true,
				text: '5 second violation',
			};
			break;
		case 69:
			playObject = {
				permanent: true,
				text: '8 second violation',
			};
			break;
		case 70:
			playObject = {
				permanent: true,
				text: 'Shot clock violation',
			};
			break;
		case 71:
			playObject = {
				permanent: true,
				text: 'Inbound turnover',
			};
			break;
		case 72:
			playObject = {
				permanent: true,
				text: ':player1: backcourt violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 73:
			playObject = {
				permanent: true,
				text: ':player1: offensive goaltending',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 74:
			playObject = {
				permanent: true,
				text: ':player1: lane violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 75:
			playObject = {
				permanent: true,
				text: ':player1: jumpball violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 76:
			playObject = {
				permanent: true,
				text: ':player1: kicked ball violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 77:
			playObject = {
				permanent: true,
				text: ':player1: illegal assist',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 78:
			playObject = {
				permanent: true,
				text: ':player1: palming violation',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 83:
			playObject = {
				permanent: true,
				text: ':player1: illegal screen',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 84:
			playObject = {
				permanent: true,
				text: ':player1: offensive foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 86:
			playObject = {
				permanent: true,
				text: ':player1: out-of-bounds',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 87:
			playObject = {
				permanent: true,
				text: ':player1: out-of-bounds (lost ball)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 88:
			playObject = {
				permanent: true,
				text: ':team1: excess timeout',
				replacements: {
					':team1:': teamNamesShort[play.team.id],
				},
			};
			break;
		case 90:
			playObject = {
				permanent: true,
				text: ':player1: out-of-bounds (bad pass)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 91:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 92:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 93:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:hook shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 94:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:tip shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 95:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 96:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 97:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/1 free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 98:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/1 free throws (of 2)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 99:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/2 free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 100:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/1 free throws (of 3)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 101:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/2 free throws (of 3)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 102:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/3 free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 103:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/1 technical free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 104:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/1 flagrant free throws (of 2)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 105:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/2 flagrant free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 106:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/1 flagrant free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 107:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/1 free throws (of 2)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 108:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/2 free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 109:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 110:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:driving layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 111:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:alley-oop layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 112:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:reverse layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 113:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:running jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 114:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 115:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:driving dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 116:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 117:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:reverse dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 118:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:alley-oop dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 119:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:driving hook shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 120:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround hook shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 121:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:fadeaway jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 122:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 123:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 124:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:finger roll layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 125:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:putback layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 126:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:driving reverse layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 127:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running reverse layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 128:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:driving finger roll layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 129:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running finger roll layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 130:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:floater',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 131:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:pullup jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 132:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:step back jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 133:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:pullup bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 134:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:driving bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 135:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:fadeaway bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 136:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 137:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround fadeaway jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 138:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:putback dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 139:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:driving bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 140:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 141:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:cutting layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 142:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:cutting finger roll layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 143:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running alley-oop layup',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 144:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:driving floater',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 145:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:driving floater',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 146:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:running pullup jump shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 147:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:step back bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 148:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:turnaround fadeaway bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 149:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running alley-oop dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 150:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:tip dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 151:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:cutting dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 152:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:driving reverse dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 153:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:running reverse dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 157:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/1 flagrant free throws (of 3)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 165:
			playObject = {
				permanent: false,
				text: ':player1: :freeThrowsMade:/2 flagrant free throws (of 3)',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 166:
			playObject = {
				permanent: true,
				text: ':player1: :freeThrowsMade:/3 flagrant free throws',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':freeThrowsMade:': getCurrentFreeThrows(play.participants[0]?.athlete.id, playNum, plays),
				},
			};
			break;
		case 209:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 210:
			playObject = {
				permanent: true,
				text: ':player1: :isMade::dist::3pt:running bank shot',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
					':dist:': getShotDistance(play.text),
					':3pt:': play.scoreValue === 3 ? '3-pt ' : '',
				},
			};
			break;
		case 211:
			playObject = {
				permanent: true,
				text: ':player1: :isMade:putback dunk',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':isMade:': play.scoringPlay ? 'made ' : 'missed ',
				},
			};
			break;
		case 213:
			playObject = {
				permanent: false,
				text: 'Official Review',
			};
			break;
		case 214:
			playObject = {
				permanent: false,
				text: 'Official Review',
			};
		case 215:
			playObject = {
				permanent: false,
				text: 'Official Review - Call Overturned',
			};
			break;
		case 216:
			playObject = {
				permanent: false,
				text: 'Official Review - Call Stands',
			};
			break;
		case 257:
			playObject = {
				permanent: false,
				text: ':player1: transition take foul',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 277:
			playObject = {
				permanent: false,
				text: 'Official Review',
			};
			break;
		case 278:
			playObject = {
				permanent: false,
				text: 'Official Review',
			};
			break;
		case 279:
			playObject = {
				permanent: false,
				text: 'Official Review - Call Overturned',
			};
			break;
		case 280:
			playObject = {
				permanent: false,
				text: 'Official Review - Call Stands',
			};
			break;
		case 411:
			playObject = {
				permanent: true,
				text: 'Start of :period:',
				replacements: {
					':period:': getPeriodName(play.period.number),
				},
			};
			break;
		case 412:
			playObject = {
				permanent: true,
				text: 'End of :period: (:score1:-:score2:)',
				replacements: {
					':period:': getPeriodName(play.period.number),
					':score1:': play.awayScore,
					':score2:': play.homeScore,
				},
			};
			break;
		case 517:
			playObject = {
				permanent: true,
				text: ':player1: ejected',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
				},
			};
			break;
		case 580:
			playObject = {
				permanent: false,
				text: 'TV Timeout',
			};
			break;
		case 581:
			playObject = {
				permanent: false,
				text: 'Official Timeout',
			};
			break;
		case 584:
			playObject = {
				permanent: false,
				text: ':player1: enters the game for :player2:',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
				},
			};
			break;
		case 592:
			playObject = {
				permanent: true,
				text: 'Illegal pick turnover',
			};
			break;
		case 615:
			playObject = {
				permanent: false,
				text: 'Jump Ball: :player1: vs :player2:',
				subtext: ':player3: gains possession',
				replacements: {
					':player1:': await _getPlayerName(play.participants[0]?.athlete.id),
					':player2:': await _getPlayerName(play.participants[1]?.athlete.id),
					':player3:': await _getPlayerName(play.participants[2]?.athlete.id),
				},
			};
			break;
	}

	return playObject;
}

// search for word that has -ft or -foot and return the number before it
function getShotDistance(str) {
	let re = /(\d+)-ft|(\d+)-foot/g;
	let distance = str.match(re);
	if (distance) {
		return distance[0].split('-')[0] + "' ";
	} else {
		return '';
	}
}

function getCurrentFreeThrows(playerId, playNum, plays) {
	let freeThrowPlays = plays.slice(0, playNum + 1).filter((play) => [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 157, 165, 166].includes(parseInt(play.type.id)) && play.participants[0]?.athlete.id == playerId);

	let lastSequenceIndex = freeThrowPlays.findLastIndex((play) => [97, 98, 100, 103, 104, 106, 107, 157].includes(parseInt(play.type.id)));
	if (lastSequenceIndex == -1) {
		return null;
	}

	let lastSequence = freeThrowPlays.slice(lastSequenceIndex);

	let made = lastSequence.filter((play) => play.scoringPlay).length;
	return made;
}

function getPeriodName(period) {
	if (period == 1) period = '1st';
	else if (period == 2) period = '2nd';
	else if (period == 3) period = '3rd';
	else if (period == 4) period = '4th';
	else if (period == 5) period = 'OT';
	else period = `OT${period - 4}`;

	return period;
}

function applyReplacements(obj) {
	let replacements = obj.replacements;

	let text = obj.text;
	for (let key in replacements) {
		text = text.replace(key, replacements[key]);
	}
	obj.text = text;

	let subtext = obj.subtext;
	if (subtext) {
		for (let key in replacements) {
			subtext = subtext.replace(key, replacements[key]);
		}
		obj.subtext = subtext;
	}
}

async function _getPlayerName(playerId) {
	let name = players[playerId];
	if (!name) {
		name = await getPlayerName(playerId);
		players[playerId] = name;
	}

	return name;
}

export { updatePlayByPlay };
