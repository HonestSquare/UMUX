		/***
			API LEVEL: 10(4.0 b11; Build 966)
			===<README>===
            UMUX Beta Program(이하 UMBP)은 보다 빠르게
            UMUX의 신버전을 체험해 볼 수 있는 프로그램입니다.

            - UMUX Beta Program임을 확인할 수 있게 방제에도 표기
            - 재배포 및 수정 금지
			- 그 외 기타 사항은 여기서 확인하십시오.
				github.com/HonestSquare/UMUX/wiki/UMUX-Beta-Program
            ===
		***/
		const iframeEle = $("iframe").contentWindow.document;
		const stopbot = () => alert("서버 가동이 중단되었습니다." + newLine + "재가동하려면 확인 버튼을 누르십시오.");
		/***
			서버 초기 설정
			-서버 이름
			-서버 설명
			-최대 접속 인원
			-방장 이름
			-서버 공개 여부
		***/		
		const	ROOMNAME 	= "[UMBP] hot huge";
		const	DESCRIPTION	= "테스트 용도의 봇방입니다.";
		const	MAXLIMIT	= 12;
		const	HOSTNAME 	= "서버 매니저";
		const	PUBLIC 		= true;
		/*** token; You can obtain it at https://www.haxball.com/rs/api/getheadlesstoken ***/
		const	TOKEN		= "thr1.AAAAAGM2uF8-mdimbGplFA.l5E33ne_LvY";
		const	NOPLAYER	= true;
		/*** 지역 코드, 위도, 경도 ***/
		const	REGION_CODE	= "kr";
		const	LAT			= 37.566667 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		const	LON			= 126.978406 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		let		PASSWORD	= " ";

		const MAXPLAYERS 	= (MAXLIMIT < 2 ? 2 : (MAXLIMIT > 30 ? 30 : MAXLIMIT));
		const INITSERVER	= str => {			/* 시스템 초기화 */
			let isWhiteSpace = s => s == undefined ? true : s.trim().length == 0;	/* 공백 문자 확인 */
			return { roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : HOSTNAME, public : PUBLIC, token : TOKEN, noPlayer : NOPLAYER, password: (isWhiteSpace(str) ? null : str), geo: { code: REGION_CODE, lat: LAT, lon: LON} };
		};
		/***
		 	변수 및 함수 위치는 이름의 접두사를 우선하되 로마자(A-Z) 순대로 정렬
			<접두사 목록>
			on
			init
			is(has), get(find)
			set
			add
			update, check
			clear, delete, reset
			show
		***/
		const ROOM			= HBInit(INITSERVER(PASSWORD));
		
		const c_TEAM			= Object.freeze({	/* 팀 유형 */
			SPECTATOR : 0, RED : 1, BLUE : 2
		});
		const c_GAME_STATS		= Object.freeze({	/* 게임 진행 상태 */
			STOP:	0,
			START:	1,
			TICK: 	2,
			PAUSE:	3
		});
		const c_PLAYERINFO_TYPE	= Object.freeze({	/* 플레이어 정보 유형 */
			LOCAL: 1,
			PUBLIC: 2,
			NAME: 3
		});
		const c_LIST_ICON		= Object.freeze({	/* 제목 아이콘 목록 */
			POSTIVE :	'○',	POSTIVE_BOLD :	'●', 
			NORMAL:		'□',	NORMAL_BOLD:	'■',
			NEGATIVE:	'△',	NEGATIVE_BOLD:	'▲',
		});
		const c_LIST_COLOR 		= Object.freeze({	/* 색상 목록 */
			DEFAULT:	"E1E1E1",
			RED:		"C61D24",	ORANGE:	"E45614",	WHEAT:	"FFE7CC",	YELLOW:	"C1AF0A",	GOLD:	"FFD700",
			GREEN:		"8ED2AB",
			SKY:		"00D8FF",	BLUE:	"0000FF",	PURPLE:	"5F00FF",	PINK:	"FF86CF",
			WHITE:		"FFFFFF",	GRAY:	"808080",	BLACK:	"000000",	SILVER:	"C0C0C0",
			TEAM_RED:	"E56E56",	TEAM_BLUE:		"5689E5",			
			UNIQUE_RED: "C13535",	UNIQUE_BLUE:	"244967",

			BG_TITLE:		"808080",
			BG_CONTAINER: 	"111619",
			BG_STATUS:		"244967",
			BG_CHATBOX: 	"1A2125",
			BG_ITEM:		"1B2328",
			BG_TEAM_RED:	"E56E56",
			BG_TEAM_BLUE:	"5689E5",

			TEXT_TITLE:		"FFFFFF",
			TEXT_CONTAINER: "FFFFFF",
			TEXT_STATUS:	"FFFFFF",
			TEXT_CHATBOX: 	"FFFFFF"
		});
		const c_LIST_STYLE 		= Object.freeze({	/* 자형 목록 */
			NORMAL:	"normal",	BOLD:	"bold",	ITALIC:	"italic",
			SMALL:	"small",	SMALL_BOLD:	"small-bold",	SMALL_ITALIC:	"small-italic"
		});
		const c_LIST_SOUND		= Object.freeze({	/* 소리 목록 */
			MUTED: 0, NORMAL: 1, LOUD: 2
		});
		const c_SCORE_TYPE 		= Object.freeze({	/* 점수 증차감 정도 */
			WIN: 3, LOST: -3, GOAL: 5, OWNGOAL: -5, ASSIST: 2
		});
		const c_LIST_EMOTION	= Object.freeze([	/* 이모티콘 */
			'🤔', 
			'😍', '🤣', '😎', '😐', '😰', 
			'🙄', '😴', '🥶', '😱'
		]);
		const c_TIME_TYPE	= Object.freeze({		/* 시간 출력 형식 */
			CORE: 0, NORMAL: 1, FULL: 2
		});
		const c_TAG_TEAM	= Object.freeze({		/* 관전, 레드, 블루 */
			[c_TEAM.SPECTATOR]:	'ⓢ',
			[c_TEAM.RED]:		'ⓡ',
			[c_TEAM.BLUE]:		'ⓑ'
		});
		const c_TAG_GRADE	= Object.freeze([		/* 최고 권한, 보조 권한, 일반, 블랙리스트 */
			"ⓧ", "●", "ⓞ", "◯", "㉤",
		]);
		const c_LOG_TYPE	= Object.freeze({		/* 로그 타입 */
			NORMAL: 0, NOTICE: 1, BELL: 2, SEND: 31, BINDING: 32, WARNING: 41, ERROR: 42 
		});
		const c_ERROR_TYPE 	= Object.freeze({		/* 오류 타입 */
			E_PLAYER_INFO: 100, E_PLAYER_AUTH: 101, E_PLAYER_CONN: 102, E_PLAYER_PID: 103, E_PLAYER_LID: 104, E_PLAYER_ADMIN: 105, E_PLAYER_NAME: 106,
			E_ETC: 900
		});

		const newLine		= Object.freeze("\n");	/* 개행 문자 */

		let forbiddenWords		= [					/* 금지어 */
			"ㄴㅇㅁ", "ㄴㄱㅁ", "ㄴ7ㅁ",
			"느금", "늑그앰", "니애미", "니미", "니앰", "니애비", "애미없",
			"니@ㅐ미", "니@ㅐ비", "보지벌려",
			"애미뒤짐", "애미디짐", "창녀", "창년", "업소녀",
			"애미 뒤짐", "애미 디짐", "애미 뒤졌냐", "애미뒤졌", "애미디졌", "보지년",
			"애미있", "애미없",

			"ㅅㅂ", "ㅆㅂ", "ㅆㅃ", "tq", "Tq",
			"ㅂㅅ", "ㅄ", "qt",
			"장애인아", "wkddodlsdk",
			"ㄲㅈ", "Rw", "꺼져",
			"ㅈㄹ", "ㄷㅊ", "ㅈㄴ", "ㅈㄲ", "🖕🏻", "🖕", "🖕🏽", "🖕🏾", "🖕🏿",
			"새끼", "새꺄", "새낀", "toRl", "시발", "^^ㅣ발", "시ㅡ발",
			"씨발", "씨바", "씨-발","씨ㅡ발","씨이발","씨이이발","씨이이이발", "Tlqkf", "Tlqk", "tlqkf",
			"ㅆ!발", "ㅆ!발련", 
			"병신", "qudtls","븅신", "qbdtls", "뷰웅신련", "뷍신",
			"지랄", "wlfkf", "wlfkd",
			"좆", "whw", "존나", "whssk", "젖밥쉑", "ㅈ밥", "wjwqkqtnpr", "wqkq",
			"개새끼", "개새꺄",
			"닥쳐", "닥치"
		];

		const SEC_TO_MS		= 1000;					/* 1000ms == 1s */

		let defaultStadiumList	= new Array();
		let customStadiumList	= new Array();

		/*** 맵 초기화 ***/
		let initStadiums = function(...links){
			defaultStadiumList = [
				"Classic", "Easy", "Small", "Big", "Rounded", "Hockey",
				"Big Hockey", "Big Easy", "Big Rounded",
				"Huge"
			];
			links.forEach(st => requestStadium(st));
		}
		let requestStadium = ln => fetch(ln).then((response) => response.text()).then(res => {
			customStadiumList.push(res);
		});
		initStadiums([
			"https://raw.githubusercontent.com/HonestSquare/UMUX/master/CROP-900M.hbs"
		]);
		/*** 게임 매니저 클래스 ***/
		class GameManager{
			constructor(afkLimitTime, rptLimitTime, timeLimit){
				this._afkLimitTime			= afkLimitTime;			/* 장기 무응답 플레이어 판정 최소 시간(초 단위) */
				this._repeatedLimitTime		= rptLimitTime;			/* 반복 채팅 판정 최대 시간(밀리초 단위) */
				this._countMatch			= 0;					/* 누적 경기 횟수 */
				this._gameLink				= null;					/* 서버 링크 */
				this._gameStats				= c_GAME_STATS.STOP;	/* 게임 상태 */
				this._isRecording			= false;				/* 녹화 여부 */
				this._firstTimeNotified		= 0;					/* 최초 도달 시간 */
				this._lastTimeNotified		= 0;					/* 최근 도달 시간 */
				this._timeLimit				= timeLimit;			/* 도달 기준 시간(초 단위) */
				this._timeLimitReached		= false;				/* 시간 도달 여부 */
			}
			onGamePause(player){ 				/* 게임 중단 이벤트 */
				this._gameStats = c_GAME_STATS.PAUSE;
				if(PM.isValid(player)){
					PM.updateTime(player.id);	//	마지막 활동 시간 저장
					SYS.log(true, "%d(이)가 경기를 중단함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
				}
				else SYS.log(true, "[경기 중단]", c_LOG_TYPE.NOTICE);
				SYS.updateWebGUI();
			}
			onGameStart(player){				/* 게임 시작 이벤트 */
				this.handleGameStart();		//	게임 제어 준비
				if(PM.isValid(player)) SYS.log(true, "%d(이)가 경기를 시작함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
				else SYS.log(true, "[경기 시작]", c_LOG_TYPE.NOTICE);
				console.log("누적 경기 횟수: " + this._countMatch);
			}
			onGameStop(player){					/* 게임 종료 이벤트 */
				this._gameStats = c_GAME_STATS.STOP;
				SC.clearTouchedList();			//	선두자 명단 모두 지우기
				TS.clearTimerByName("goal");	//	타이머 제거
				if(PM.isValid(player)){
					PM.updateTime(player.id);	//	마지막 활동 시간 저장
					SYS.log(true, "%d(이)가 경기를 종료함", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
				}
				else SYS.log(true, "[경기 종료]", c_LOG_TYPE.NOTICE);
				SYS.updateWebGUI();
			}
			onGameTick(){						/* 게임 진행 이벤트 */
				if(TS.time >= this._firstTimeNotified + SEC_TO_MS / 10){	//	100ms 마다 처리
					this._firstTimeNotified = TS.time;				//	최근 기록 시간을 현재 시간으로 변경
					this.handleGameTick(this._firstTimeNotified);	//	게임 제어 처리
				}
			}
			onGameUnpause(player){				/* 게임 재개 이벤트 */
				this._gameStats = c_GAME_STATS.TICK;
				if(PM.isValid(player)){
					PM.updateTime(player.id);		//	마지막 활동 시간 저장
					SYS.log(true, "%d(이)가 중단된 경기를 재개함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
				}
				SYS.log(true, "[경기 재개]", c_LOG_TYPE.NOTICE);
				SYS.updateWebGUI();
			}
			onKickRateLimitSet(					/* 킥 제한 이벤트 */
				min, rate, burst, player){

			}
			onPlayerBallKick(player){ 			/* 플레이어 킥 판정 이벤트 */
				SC.addTouchedList(player.id);
			}
			onPlayerJoin(player){				/* 플레이어 입장 이벤트 */
				PM.initPlayerList(player);					//	플레이어 데이터베이스 초기화
				SYS.addListIndex(player.id);				//	플레이어 인덱스 추가
				if(SYS._isDev) NC.caution("이 서버는 개발 중이므로, 게임 플레이가 원활하지 않을 수 있습니다.", player.id);
				let isUpdate = PM.updateAccount(player.id);	//	계정 데이터베이스 갱신
				console.log(`접속 인원: ${PM.cntPlayers()}`);
				let indexBlacklist = (AMN.isBlacklist(player.id, true) ? 2 : AMN.isBlacklist(player.id, false) ? 1 : 0);
				SYS.log(true, "%d: %d%d", c_LOG_TYPE.BELL, [
					(isUpdate == true ? "재입장": "입장"),
					SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC),
					(indexBlacklist > 0 ? "(블랙리스트)" : '')
				]);
				if(indexBlacklist > 1) return AMN.kickPlayer(player.id, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
				let hasSamePlayer = AMN.filterPlayer(player.id);
				if(indexBlacklist > 0 && hasSamePlayer == true)     //	(슈퍼)블랙리스트, 중복 접속, 사칭, 다중 접속 탐지
					NC.warning("%d님은 관심 대상입니다.", player.id);
				else{										        //	입장 문구 출력
					NC.uniMsg('#' + player.id,
					(isUpdate == true ? "다시 환영합니다" : "안녕하세요") + ", %d님!",
					player.id, "!help, !join");
				}
				if(PM.cntPlayers() < 2){					//	접속자가 2인 미만이면
					PM.moveTeam(player.id, c_TEAM.RED);		//	투입하고
					room.startGame();						//	게임 시작
				}
				AMN.updateAdmins();							//	권한 갱신
				if(this._isRecording)						//	녹화 중이면 별도 알림
					NC.extMsg(null, c_LIST_ICON.POSTIVE_BOLD + "녹화 중", player.id, null, c_LIST_COLOR.RED, null, 250);
				return isUpdate;
			}
			onPlayerLeave(player){				/* 플레이어 퇴장 이벤트 */
				if(!player._hasKicked)
					SYS.log(true, "퇴장: %d%d", c_LOG_TYPE.BELL, [
						player.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC),
						(AMN.isBlacklist(player._id) ? "(블랙리스트)" : '')
					]);
				player.clearPlayer();		//	플레이어 데이터베이스 지우기
				if(PM.cntPlayers() > 0)		//	접속자가 있으면 권한 갱신
					AMN.updateAdmins();
				else{						//	접속자가 없으면 비밀번호 초기화
					room.stopGame();
					AMN.updatePassword();
				}
				console.log(`접속 인원: ${PM.cntPlayers()}`);
			}
			onPositionsReset(){		 			/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */

			}
			onRoomLink(address){				/* 주소 갱신 이벤트 */
				let shortLink	= iframeEle.getElementById("roomlink");
				shortLink.innerHTML = NC.formatString("서버 주소: <a href=\"%d\" target=\"_blank\"> %d</a>", address);
				this._gameLink = address;
				if(!SYS._hasInitServer){	//	객체 초기화가 필요한 경우
					SYS.initServer();	//	서버 초기화
					SYS.initWebGUI();	//	그래픽 유저 인터페이스 초기화
					SYS.log(false, "서버 가동 시작", c_LOG_TYPE.BINDING);
					return;
				}
				NC.uniMsg(c_LIST_ICON.POSTIVE_BOLD + "서버방어 시스템 가동중", address);
				SYS.log(true, "서버 복구 완료", c_LOG_TYPE.WARNING);
				SYS.enableRecaptcha(true);		//	reCAPTCHA 활성화
				SYS.log(true, "서버 안정을 위해 reCAPTCHA가 활성화되었습니다."
				+ newLine + "콘솔 입력창에 아래와 같은 코드를 작성하여 수동으로 해제할 수 있습니다."
				+ newLine + "SYS.enableRecaptcha(false);",
				c_LOG_TYPE.WARNING);
			}
			onStadiumChange(newMap, byPlayer){	/* 맵 교체 이벤트 */
				let target = this.findStadiumNameList().indexOf(newMap);
				if(target != AMN._defaultStadium
				&& SYS.hasInRange(target, 0, customStadiumList.length - 1) == true){		//	맵 고정 설정
					if(!AMN.lockStadium || (AMN._defaultStadium == null))
						AMN._defaultStadium = target;
				}
				if(!PM.isValid(byPlayer)) return SYS.log(true, "맵 교체: %d", c_LOG_TYPE.NOTICE, newMap);
				PM.updateTime(byPlayer.id);		//	마지막 활동 시간 저장
				if(AMN.lockStadium){		//	맵 고정 확인
					room.setCustomStadium(customStadiumList[AMN._defaultStadium]);
					return NC.acess(byPlayer, "맵이 고정돼 있어 교체할 수 없습니다.");
				}
				SYS.log(true, "%d(이)가 맵을 %d(으)로 교체함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(byPlayer.id), newMap]);
				let blacklistMap = [			//	경기장 블랙리스트
					"rip host",
					"maymun cetesi tarafindan ziyaret edildin",
					"Arabadan Atladı Amı Patladı"
				];
				let isMatchName	= function(a, b){		//	이름 일치 확인
					if(a == undefined || b == undefined) return;
					let numStr = /[0123456789]/gi;
					let str = numStr.test(a) ? b : b.replace(numStr, '');
					if(a != str) return;
					GM.loadMap(0);
					AMN.kickPlayer(byPlayer.id, null, true);
					AMN.addBlacklistByPlayer(byPlayer.id, true);
				}
				blacklistMap.forEach(m => isMatchName(m, newMap.toLowerCase()));
			}
			onTeamGoal(team){ 					/* 골 판정 이벤트 */
				let lastTouchedPlayer = SC.lastTouchedPlayer;		//	선두자
				let getAssistant = function(player){
					if(player == undefined) return 0;
					if(player._team == team) return SC.findAssist(lastTouchedPlayer);
					for(let tp of SC._touchedList){
						if(team == tp._team){		//	팀이 같아야 어시스트 인정
							lastTouchedPlayer = tp;
							return SC.findAssist(tp);
						}
					}
					return 0;
				}
				let assist = getAssistant(lastTouchedPlayer);						//	어시스트
				let attacker = !lastTouchedPlayer ? 0 : lastTouchedPlayer._id;		//	공격자
				let attackTeam = PM.isValid(attacker) == true && PM.findLocalId(attacker) > 0 ? lastTouchedPlayer._team : team;	//	공격 팀
				let defendTeam = team == c_TEAM.RED ? c_TEAM.BLUE : c_TEAM.RED;													//	방어 팀
				let showGoalRecord = function(attack, defend, player, assist){
					let getGoalType = (a, d) => (a == d ? "실점" : "득점");	        //	득실점 구하기
					let getTime = function(time){							        //	골 판정 시간 구하기
						let setLine = (t) => SYS.fillLine(Math.floor(t), 2);
						return setLine(time / 60) + ':' + setLine(time % 60);
					}
					//	공격 선수 또는 팀 구하기
					let getAttacker	= (t, p) => ((!PM.isValid(p) || !PM.findLocalId(p)) ? GM.findTeamName(t) : SYS.showPlayerInfo(p, c_PLAYERINFO_TYPE.NAME) + "님");
					//	출력
					room.setPlayerAvatar(player, '⚽');
					room.setPlayerAvatar(assist, '👍');
					let goalTimer = TS.addTimer("goal", () => {
						let showAvatar = function(s, t, c){
							if(PM.findPlayerList().find(p => p._id == t) == undefined		//	도중 퇴장이나
							|| PM.findPlayerById(t)._team != attack){						//	팀을 옮긴 경우
								room.setPlayerAvatar(t);
								return;
							}
							if(s % 2 == 0)
								room.setPlayerAvatar(t, c);
							else
								room.setPlayerAvatar(t);
						}
						let tmList = TS.findTimerByName(goalTimer._name, player);
						let target = tmList.at(-1);
						let currentOrder = goalTimer.calcCurrentSequence(target._sequence, 2);
						let totalSequence = goalTimer.calcTotalSequence(target._sequence);
						showAvatar(currentOrder, goalTimer._player, '⚽');
						if(PM.isValid(assist)) showAvatar(currentOrder, assist, '👍');
						if(totalSequence > 5)
							return TS.clearTimerByName(goalTimer._name, goalTimer._player);
					}, player, SEC_TO_MS, true);

					let sendMsg = function(...rd){
						if(rd.length < 2) return SYS.sendError(c_ERROR_TYPE.E_ETC);
						let title = PM.findTagTeam(rd[0]) + '➡' + PM.findTagTeam(rd[1]) + ': ' + GM.findTeamName(rd[0]) + ' ' + getGoalType(rd[0], rd[1]) + '(' + getTime(SC.gameTime) + ')';
						let color = rd[1] == c_TEAM.BLUE ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE;
						switch(rd.length){
							case 2:		//	공격 팀→방어 팀
								NC.extMsg(title, "%d이 %d했습니다", null, null, color, null, 0, [getAttacker(rd[0]), getGoalType(rd[0], rd[1])]);
								return SYS.log(true, "%d➡%d", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1])]);
							case 3:		//	공격 팀→방어 팀: 득점자
								NC.extMsg(title, "%d이 %d했습니다", null, null, color, null, 0, [getAttacker(rd[0], rd[2]), getGoalType(rd[0], rd[1])]);
								return SYS.log(true, "%d➡%d 공격: %d", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2])]);
							case 4:		//	공격 팀→방어 팀: 득점자(어시스트 포함)
								NC.extMsg(title, "%d이 %d했습니다" + newLine + "(도움: %d)", null, null, color, null, 0,
								[getAttacker(rd[0], rd[2]), getGoalType(rd[0], rd[1]), SYS.showPlayerInfo(rd[3]._id, c_PLAYERINFO_TYPE.NAME)]);
								return SYS.log(true, "%d➡%d 공격: %d(도움: %d)", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2]), SYS.showPlayerInfo(rd[3]._id)]);
						}
					}

					//	공격 팀→방어 팀
					if(!PM.isValid(player)) sendMsg(attack, defend);
					//	공격 팀→방어 팀: 득점자
					else if(!PM.isValid(assist)) sendMsg(attack, defend, player);
					//	공격 팀→방어 팀: 득점자(어시스트 포함)
					else sendMsg(attack, defend, player, assist);
				}
				//	전적 갱신
				if(PM.isValid(attacker)){
					let getStats = function(p){
						let target = SC.findRankListByPlayer(p);
						if(PM.isValid(target)) return target;
						return SC.findRankListByPlayer(SC.initRankList(p));
					}
					if(attackTeam == defendTeam) getStats(attacker).addOwnGoal();
					else getStats(attacker).addGoal();
					if(PM.isValid(assist)){
						SC.findRankListByPlayer(assist._id).addAssist();
					}
				}
				if(attackTeam != defendTeam) SC.updateGoals(team);	        //	득점 데이터 갱신
				SYS.updateWebGUI();									        //	그래픽 유저 인터페이스 갱신
				showGoalRecord(attackTeam, defendTeam, attacker, assist);	//	결과 출력
			}
			onTeamVictory(scores){ 				/* 팀 승리 이벤트 */
				let winner = SC.findWinner(scores);
				switch(winner){
					case c_TEAM.RED:	//	레드팀 승
						break;
					case c_TEAM.BLUE:	//	블루팀 승
						break;
					case 3:			    //	무승부
						return;
				}
				for(let p of PM.findPlayerList()){
					let rp = SC.findRankListByPlayer(p._id);	//	랭킹 갱신
					if(rp != undefined){
						if(p._team == winner) rp.addWin();
						else rp.addLost();
					}
				}
				NC.extMsg(c_LIST_ICON.NORMAL_BOLD + "경기 종료", "%d이 승리하였습니다.",		//	경기 종료 및 승패 결과 출력
				null, "!ranking", (winner == c_TEAM.RED ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE), null, 0, this.findTeamName(winner));
				SYS.log(true, "%d 승리", c_LOG_TYPE.NOTICE, this.findTeamName(winner));
			}

			handleGameStart(){				/* 게임 제어 준비 */
				this._gameStats = c_GAME_STATS.START;									//	게임 상태 갱신
				this._countMatch++;									//	누적 경기 횟수 반영
				this._firstTimeNotified = TS.time;				//	최초 기록 시간 초기화
				this._lastTimeNotified = TS.time;				//	최근 기록 시간 초기화
				this._timeLimitReached = false;						//	기준 시간에 미도달한 상태로 초기화
				SC.clearTouchedList();							//	선두자 명단 모두 지우기
				//	마지막 활동 시간 저장
				PM.findPlayerList().filter(p => p._team != c_TEAM.SPECTATOR).forEach(p => PM.updateTime(p._id));
			}
			handleGameTick(currentTime){	/* 게임 제어 처리 */
				if(this._gameStats != c_GAME_STATS.TICK){ 
					this._gameStats = c_GAME_STATS.TICK;
					SYS.updateWebGUI();
				}
				//	선두자 명단 갱신
				PM.findPlayerList().filter(p => p._team != c_TEAM.SPECTATOR).forEach(p => SC.updateTouchedList(p._id));
				if(this._timeLimit < 1) return false;								        //	범위 내 도달 기준 시간이면 처리 종료
				if(currentTime - this._lastTimeNotified > this._timeLimit * SEC_TO_MS){		//	최근 기록 시간에서 도달 기준 시간 이후로 경과된 경우(정기 실행)
					this._lastTimeNotified = currentTime;							        //	최근 기록 시간을 현재 시간으로 변경
					return true;
				}
				if(!this._timeLimitReached              // 0초에서 도달 기준 시간 이후로 경과된 경우(한 번만 실행)
					&& (currentTime - this._lastTimeNotified >= this._timeLimit * SEC_TO_MS)){
					this._timeLimitReached = true;      // 시간 도달하였으므로 값을 참으로 변경
					return true;
				}
				return false;
			}
			
			get cntMatch(){			/* 누적 경기 횟수 */
				return this._countMatch;
			}
			get afkTime(){			/* 장기 무응답 판정 최소 시간 구하기(10 미만은 0, 10800 초과는 10800으로 계산) */
				let lt = this._afkLimitTime;
				return (SYS.hasInRange(lt, 10, 60 * 60 * 3) ? lt : 0);
			}
			get rptTime(){			/* 반복 채팅 판정 최대 시간(밀리초 단위) */
				return this._repeatedLimitTime;
			}

			set afkTime(value){ 	/* 장기 무응답 판정 최소 시간 지정 */
				if(typeof value != "number"){
					this._afkLimitTime = 0;
					NC.uniMsg(null, "비활동 상한 시간이 비활성화되었습니다.");
					return SYS.log(true, "비활동 상한 시간이 비활성화됨.", c_LOG_TYPE.NOTICE);
				}
				if(!SYS.hasInRange(value, 10, 60 * 60 * 3)) return SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
				if(this.afkTime == value) return SYS.log(false, "중복된 값으로 접근됨", c_LOG_TYPE.WARNING);
				this._afkLimitTime = value;
				//	마지막 활동 시간 저장
				PM.findPlayerList().forEach(p => PM.updateTime(p._id));
				NC.uniMsg(null, "비활동 상한 시간이 %d초로 변경되었습니다.", null, null, 0, this.afkTime);
				SYS.log(true, "비활동 상한 시간이 %d초로 변경됨.", c_LOG_TYPE.NOTICE, this.afkTime);
			}

			findStadiumNameList(target){	/* 맵 정보 갱신 */
				let size = customStadiumList.length;
				if(size < 1) return defaultStadiumList;
				let getStadium = m => Function('"use strict";return (' + m + ')')();
				let getName = function(m){
					if(!m.hasOwnProperty("name")) return "비어 있음";
					if(CS.isWhiteSpace(m.name)) return "제목 없음";
					return m.name;
				}
				if(SYS.hasInRange(target, 0, size - 1)) return getName(getStadium(customStadiumList[target]));
				return customStadiumList.map(m => {
					return getName(getStadium(m));
				});
			}
			findTeamName(value){			/* 팀 상태(숫자>문자열) */
				let nameList = {
					[c_TEAM.SPECTATOR]	: "관전석",
					[c_TEAM.RED]		: "레드팀",
					[c_TEAM.BLUE]		: "블루팀"
				}
				return nameList.hasOwnProperty(value) ? nameList[value] : SYS.sendError(c_ERROR_TYPE.E_ETC);
			}

			checkPublicId(msg, player, hasAllRange){	/* #ID 판별 */
				if(!msg) return NC.caution("%d를 포함하십시오.", player, null, "\#");
				if(!msg.includes('\#')) return NC.caution("%d를 포함하십시오.", player, null, "\#");
				let num = parseInt(msg.toString().split('\#').at(1));		//	번호 저장
				if(!PM.isValid(num)) return num == 0 ? num : NC.caution("범위를 벗어난 ID입니다.", player);
				if(PM.findLocalId(num) == false && hasAllRange == false) return NC.caution("해당 ID를 가진 플레이어는 미접속자입니다.", player);
				return num;
			}
			loadMap(target, player){					/* 맵 불러오기 */
				let isValidByPlayer = PM.isValid(player);
				let hasCustomStadiums = () => (customStadiumList.length > 0);
				let size = (hasCustomStadiums() ? customStadiumList : defaultStadiumList).length;
				if(!SYS.hasInRange(target + 1, 1, size)){
					if(isValidByPlayer) return NC.caution("맵 ID가 올바르지 않습니다.", player, "?load");
					return SYS.log(true, "맵 데이터를 불러올 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
				}
				if(AMN.lockStadium == true && AMN._defaultStadium != target)	//	맵이 고정된 경우
					return (isValidByPlayer ? NC.acess(player, "맵이 고정되어 있어 불러올 수 없습니다.") : SYS.log(false, "맵 고정을 해제해야 합니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING));				
				if(hasCustomStadiums() == true && customStadiumList[target] == undefined)											//	맵 파일을 찾을 수 없는 경우
					return (isValidByPlayer ? NC.caution("맵 데이터를 불러올 수 없습니다.", player) : SYS.sendError(c_ERROR_TYPE.E_ETC));
				room.stopGame();
				AMN._defaultStadium = target;										//	맵 데이터 등록
				if(hasCustomStadiums()) room.setCustomStadium(customStadiumList[target]);
				else room.setDefaultStadium(defaultStadiumList[target]);
				if(isValidByPlayer) SYS.log(true, "%d(이)가 %d번 맵으로 교체함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), target]);
			}
			reorderPlayers(moveToTop, indexList){		/* 플레이어 데이터베이스 순번 재정렬 */
				let mvtp = typeof moveToTop === "boolean" ? moveToTop : true;
				let pl = (indexList == undefined ? PM.findPlayerList().map(p => p._id) : indexList).sort((a, b) => (mvtp ? a - b : b - a));
				room.reorderPlayers(pl, mvtp);
				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				PM.findPlayerList().forEach(p => SYS.updateListIndex(p._id));
			}
			runCommand(array, type, player){			/* 명령어 실행 처리 */
				//	범위 외 및 미접속자인 경우
				if(PM.isValid(player.id) == false || PM.findLocalId(player.id) == false) return false;
				let fn = Function('"use strict";return (' + array + ')')();	//	실행 구문
				let header = type[0];										//	명령어 유형
				let getArgument = function(a){
					let i = 0;
					while(i < a.length){
						if(!CS.isWhiteSpace(a[i])) i++;
						else a.splice(i, 1);		//	공백 인자값 삭제
					}
					return a;
				}
				let arg = getArgument(type[2]);								//	입력된 추가 문자열
				//	플레이어 공용 ID, 입력된 추가 문자열, 명령어 유형
				fn(player.id, (arg.length < 1 ? -1 : arg), header);
				return true;
			}
			startRecording(hideAnchor){ 				/* 녹화 시작 */
				if(this._isRecording) stopRecording();
				this._isRecording = true;
				NC.extMsg(c_LIST_ICON.POSTIVE_BOLD + "녹화 시작", TS.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED, null, (hideAnchor == true ? 0 : 1));
				SYS.log(true, "녹화 시작", c_LOG_TYPE.NOTICE);
				room.startRecording();
			}
			stopRecording(){ 							/* 녹화 종료 */
				let file = room.stopRecording();
				this._isRecording = false;
				if(!file) return SYS.log(true, "예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.", c_LOG_TYPE.ERROR);
				NC.extMsg(c_LIST_ICON.POSTIVE + "녹화 종료", TS.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED);
				SYS.log(true, "녹화 종료", c_LOG_TYPE.NOTICE);
				return file;
			}
		}
		/*** 관리 클래스 ***/
		class Administration{
			constructor(dynamicAdmin, isAllowJoin, isLockStadium, defaultStadium, maxAdmin, pinHost){
				this._blacklist				= new Array();		/* 블랙리스트 명단 */
				this._enableDynamicAdmin	= dynamicAdmin;	 	/* 권한 할당 방식 */
				this._isAllowTeamSwitch		= isAllowJoin;		/* 플레이어 팀 자율 이동 제한 여부 */
				this._isLockStadium			= isLockStadium;	/* 맵 고정 여부 */
				this._defaultStadium		= defaultStadium;	/* 고정 맵 데이터 */
				this._maxAdminLimit			= maxAdmin;			/* 최고 관리자 상한 인원 */
				this._pinHost				= pinHost;			/* 방장 팀 이동 허용 여부 */
			}
			onPlayerAdminChange(player, byPlayer){					/* 권한 변경 이벤트 */
				let isValidByPlayer = PM.isValid(byPlayer);
				let newAdmin = SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.NAME);
				let byAdmin = (isValidByPlayer ? SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.NAME) : false);
				PM.updateTime(player.id);			//	마지막 활동 시간 저장
				if(byAdmin != false) PM.updateTime(byPlayer.id);
				if(player.admin == true){			//	권한 획득(최고 권한 부여)
					switch(this.findAdmin(player.id)){
						case 0:		//	무권한 → 최고 권한
							break;
						case 1:		//	보조 권한 → 무권한
							return room.setPlayerAdmin(player.id, false);
						default:
							//return SYS.sendError(c_ERROR_TYPE.E_PLAYER_ADMIN);
					}
					if(this.isBlacklist(player.id)) return this.deleteAdmin(player.id);				//	블랙리스트이면 보조 권한으로 부여
					if(this.cntAdmins(2) >= this.maxAdmin) return this.deleteAdmin(player.id);	//	최고 관리자 최대 인원을 초과하면 보조 권한으로 부여
				}
				else{								//	권한 해제(보조 권한 부여)
					switch(this.findAdmin(player.id)){
						case 2:		//	최고 권한 → 보조 권한
							return this.giveSubAdmin(player.id);
						case 1:		//	보조 권한 → 무권한
							return this.deleteSubAdmin(player.id);
						default:
							//return SYS.sendError(c_ERROR_TYPE.E_PLAYER_ADMIN);
					}
				}
				let procType = (player.admin == true ? "부여" : "박탈");
				PM.modifyPlayerById(player.id, "admin", 2);
				if(byAdmin == false) NC.notice("%d님의 최고 권한이 %d 되었습니다.", null, null, [newAdmin, procType]);
				else NC.notice("%d님이 %d님의 최고 권한을 %d 했습니다.", null, null, [byAdmin, newAdmin, procType]);
				SYS.log(true,
					(isValidByPlayer ? "%d(이)가 %d(이)의 최고 권한을 부여함." : "%d(이)의 최고 권한이 부여됨."),
					c_LOG_TYPE.BELL, (isValidByPlayer ? [SYS.showPlayerInfo(byPlayer.id), SYS.showPlayerInfo(player.id)] : [SYS.showPlayerInfo(player.id)]));
				SYS.updateListIndex(player.id);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
			}
			onPlayerKicked(kickedPlayer, reason, ban, byPlayer){	/* 플레이어 강제 퇴장 이벤트 */
				let banType = ban == true ? "영구" : "강제";
				PM.modifyPlayerById(kickedPlayer.id, "hasKicked", true);
				if(reason == "Bad actor"){ 
					SYS.sendError(c_ERROR_TYPE.E_ETC);
					NC.notice("%d님이 오류 감지 시스템으로 인해 퇴장되었습니다.", null, null, SYS.showPlayerInfo(kickedPlayer, c_PLAYERINFO_TYPE.NAME));
					return SYS.log(true, "%d(이)가 오류로 인해 %d 퇴장됨.", c_LOG_TYPE.ERROR, [SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC), banType]);
				}
				if(!PM.isValid(byPlayer)) return SYS.log(true, "%d(을)를 %d 퇴장함." + (reason ? ('(' + reason + ')') : ''), c_LOG_TYPE.WARNING, [SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC), banType]);
				PM.updateTime(byPlayer.id);							//	마지막 활동 시간 저장
				SYS.log(true, "%d(이)가 %d(을)를 %d 퇴장함." + (reason ? ('(' + reason + ')') : ''), c_LOG_TYPE.WARNING, [SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.PUBLIC), SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC), banType]);
			}

			get dynamicAdmin(){				/* 플레이어 권한 동적 부여 */
				return this._enableDynamicAdmin;
			}
			get lockStadium(){				/* 맵 고정 여부 */
				return this._isLockStadium;
			}
			get maxAdmin(){					/* 관리자 제한 인원 */
				return SYS.hasInRange(this._maxAdminLimit, 1, MAXPLAYERS) ? this._maxAdminLimit : MAXPLAYERS;
			}
			get password(){					/* 비밀번호 */
				return PASSWORD;
			}
			get restrictedStadium(){		/* 고정 맵 데이터 */
				return this._defaultStadium;
			}

			set dynamicAdmin(bool){		/* 권한 동적 할당 */
				if(this.dynamicAdmin == bool) return;
				this._enableDynamicAdmin = bool;
				NC.locked(bool, "권한 할당 작동 방식이 %d(으)로 변경되었습니다.", null, null, (bool ? "동적" : "정적"));
				SYS.log(true, "권한 할당 작동 방식이 %d(으)로 변경됨.", c_LOG_TYPE.BELL, (bool ? "동적" : "정적"));
			}
			set lockStadium(bool){		/* 맵 고정 */
				if(customStadiumList.length < 1) return SYS.log(false, "저장된 맵 데이터가 존재하지 않음.", c_LOG_TYPE.WARNING);
				if(this._defaultStadium == null) return SYS.log(false, "고정 맵 데이터가 존재하지 않음.", c_LOG_TYPE.WARNING);
				if(this.lockStadium == bool) return SYS.log(false, "중복된 값으로 접근됨.", c_LOG_TYPE.WARNING);
				this._isLockStadium = bool;
				NC.locked(bool, "맵 변경이 %d되었습니다.", null, null, (bool ? "제한" : "허용"));
				SYS.log(true, "맵 변경이 %d됨.", c_LOG_TYPE.NOTICE, (bool ? "제한" : "허용"));
				if(this.lockStadium == true) room.setCustomStadium(customStadiumList[this._defaultStadium]);
			}
			set password(value){		/* 비밀번호 지정 */
				if(SYS._lockPass) return SYS.log(false, "비밀번호롤 변경하려면 시스템의 비밀번호 고정 장치를 해제하여야 합니다.", c_LOG_TYPE.WARNING);
				this.updatePassword(value);
			}

			isBlacklist(player, isSuper){		/* 블랙리스트 감지 */
				let pName = PM.findPlayerById(player)._name;
				let pAddress = PM.findPlayerById(player)._address;
				if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				let checkName		= function(s){			//	닉네임 일치 확인
					let a = s._name;
					let b = pName;														//	검사할 데이터
					//	공백 닉네임 처리
					if(a == undefined || b == undefined) return false;			//	데이터가 없는 경우
					if(CS.isWhiteSpace(a) == true || CS.isWhiteSpace(b) == true) return false;
					//	우회 문자 처리
					let regc = /[`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
					let regn = /[0-9]/gi;
					a = a.replace(regc, '');
					b = b.replace(regc, '');
					if(!regn.test(a)) b = b.replace(regn, '');
					//	문자열 및 길이가 완전히 일치하여야 함
					return (a.search(b) != -1 && a.length == b.length);			//	모두 일치한 경우
				}
				let checkAddress		= function(s){			//	주소 데이터 일치 확인
					let a = s._address;
					let b = pAddress;													//	검사할 데이터
					if(a == undefined || a == null) return false;						//	블랙리스트 DB 값이 없는 경우
					return (a == b);											//	모두 일치한 경우
				}
				let checkDatabase		= function(b){		//	데이터베이스 확인
					let isMatchName = checkName(b);									//	닉네임 일치 확인
					let isMatchAddress = checkAddress(b);							//	주소 데이터 일치 확인
					if(isMatchName == false && isMatchAddress == false) return false;	//	완전 불일치
					if(b._super != isSuper) return false;				//	(슈퍼)블랙리스트 기준으로 따로 처리
					return true;												//	모두 일치한 경우
				}
				for(let b of this._blacklist.filter(bl => checkDatabase(bl))){
					//	이름 데이터가 비어 있으면 갱신
					if(b._name == undefined) b._name = pName;
					//	주소 데이터가 비어 있으면 갱신
					else if(b._address == undefined) b._address = pAddress;
					//	데이터베이스 추가
					else this.addBlacklist(isSuper, pName, pAddress);
					return true;
				}
				return false;
			}
			isMute(target){						/* 채금 여부 */
				return PM.findPlayerById(target)._isMute;
			}
			isSuperBlacklist(index){			/* 슈퍼 블랙리스트 감지 */
				let i = 0;
				let detected = false;
				let isMatchName		= function(a, b){		//	닉네임 일치 확인
					if(a == undefined || b == undefined) return false;
					let numStr = /[0123456789]/gi;
					let str = numStr.test(a) ? b : b.replace(numStr, '');
					return (a == str);
				}
				let bl = this._blacklist;
				while(i < bl.length){
					//	포함되면 필터 반환 | 포함되지 않으면 i 증가
					if(bl[i].super == true){
						if(bl[i].name != undefined && isMatchName(bl[i].name, PM.findPlayerById(index)._name)){ 	//	닉네임이 동일하면
							if(bl[i].ip == undefined) bl[i].ip = this.findAddress(index);			//	주소 원소의 값이 없을 경우 등록
							else if(bl[i].ip != this.findAddress(index)) this.addBlacklist(true, PM.findPlayerById(index)._name, this.findAddress(index));
							detected = true; break;
						}
						else if(bl[i].ip == this.findAddress(index)){										//	주소가 동일하면
							if(bl[i].name == undefined) bl[i].name = PM.findPlayerById(index)._name;	//	이름 원소의 값이 없을 경우 등록
							else if(bl[i].name != PM.findPlayerById(index)._name) this.addBlacklist(true, PM.findPlayerById(index)._name, this.findAddress(index));
							detected = true; break;
						}
					}
					i++;
				}
				for(let i = 0; i < bl.length; i++){			//	중복 데이터 삭제
					for(let j = 0; j < bl.length; j++){
						if(bl[i].super == true && i != j)
							if(bl[i].name == bl[j].name && bl[i].ip == bl[j].ip) bl.splice(j, 1);
					}
				}
				if(detected == false) return false;
				SYS.log(true, "[슈퍼 블랙리스트]%d: " + newLine + "%d", c_LOG_TYPE.WARNING, [SYS.showPlayerInfo(index, c_PLAYERINFO_TYPE.PUBLIC), this.findAddress(index)]);
				this.kickPlayer(index, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
				return true;
			}

			findAddress(target){						/* 플레이어 주소 구하기 */
				return PM.findPlayerById(target)._address;
			}
			findAdmin(player){							/* 권한 확인 */
				if(NOPLAYER == false && player == 0) return room.getPlayer(0).admin ? 2 : 0;
				if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				let stats = PM.findPlayerById(player)._admin;
				switch(stats){
					case 2: case 1:
						return stats;
					default:
						return 0;
				}
			}
			findBlacklistByAddress(conn){				/* IP로 블랙리스트 찾기 */
				return this._blacklist.filter(bl => bl._address == conn);
			}
			findBlacklistByName(str){					/* 닉네임으로 블랙리스트 찾기 */
				return this._blacklist.filter(bl => bl._name == str);
			}
			findMutedList(isPublic){					/* 채금 명단 구하기 */
				return PM.findPlayerList(isPublic).filter(p => p._isMute == true);
			}
			findNetwork(target){						/* 플레이어 네트워크 구하기 */
				return PM.findPlayerById(target)._network;
			}
			
			addBlacklist(isSuper, name, conn){			/* 블랙리스트 명단 추가 */
				return this._blacklist.push(new blacklistManager(isSuper, name, conn));
			}
			addBlacklistByPlayer(target, isSuper){		/* 플레이어를 블랙리스트 명단으로 추가 */
				let p = PM.findPlayerById(target);
				if(!PM.isValid(p)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				return this.addBlacklist((isSuper ? true : false), p._name, p._address);
			}

			updateAdmins(){			/* 권한 갱신 */
				if(AMN.dynamicAdmin == false) return;		//	권한 할당 방식이 정적인 경우 처리 중단
				let players = room.getPlayerList().filter(p => p.id > 0 && p.admin == false);
				if(players.length == 0) return;
				let admins = room.getPlayerList().filter(p => {
					if(p.id < 1) return false;
					if(PM.findPlayerById(p.id)._isSleep == true) return false;
					return p.admin;
				});
				if(admins.length > 0) return;					//	최고 권한을 가진 플레이어가 이미 있으면 처리 중단
				players.sort((a, b) => a.id - b.id);			//	공용 ID를 오름차순으로 정렬
				let target = players.filter(p => PM.findPlayerById(p.id)._isSleep == false)[0];
				if(!PM.isValid(target)) return;
				if(AMN.isBlacklist(target.id, false))				//	블랙리스트나 장기 대기열이면 보조 권한 부여
					return AMN.giveSubAdmin(target.id);
				AMN.giveAdmin(target.id);
			}
			updatePassword(pass){	/* 비번 갱신 */
				if(!SYS._lockPass)
					PASSWORD = (!pass || CS.isWhiteSpace(pass) ? null : pass);
				room.setPassword(PASSWORD);
				return PASSWORD;
			}

			clearBans(player){			/* 영구 퇴장 명단 초기화 */
				room.clearBans();
				if(PM.isValid(player)){
					NC.locked(false, "%d님이 영구 퇴장 명단을 모두 지웠습니다.", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
					SYS.log(true, "%d(이)가 영구 퇴장 명단을 모두 지움", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				}
				else{
					NC.locked(false, "영구 퇴장 명단이 초기화되었습니다.");
					SYS.log(true, "영구 퇴장 명단을 초기화 함", c_LOG_TYPE.NOTICE);
				}
			}
			clearMutedList(player){		/* 채팅 금지 명단 초기화 */
				let isValidByPlayer = PM.isValid(player);
				let ml = this.findMutedList(true);
				if(ml.length < 1)
					return isValidByPlayer ? NC.caution("채팅 금지 명단에 새겨진 기록이 아직 없습니다.", player) : SYS.log(false, "이미 데이터가 초기화 되었으므로 접근할 수 없음.", c_LOG_TYPE.WARNING);
				for(let p of ml){
					p._isMute = false;
					SYS.updateListIndex(p._id);
				}
				if(isValidByPlayer){
					NC.locked(false, "%d님이 채팅 금지 명단을 모두 지웠습니다.", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
					SYS.log(true, "%d(이)가 채팅 금지 명단을 모두 지움", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				}
				else{
					NC.locked(false, "채팅 금지 명단이 초기화되었습니다.");
					SYS.log(true, "채팅 금지 명단을 초기화 함", c_LOG_TYPE.NOTICE);
				}
			}
			clearPassword(byPlayer){	/* 비번 해제 */
				let isValidByPlayer = PM.isValid(byPlayer);
				if(SYS._lockPass){
					if(isValidByPlayer) return NC.acess(byPlayer, "시스템에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
					return SYS.log(false, "시스팀에서 비밀번호 고정 장치가 활성화 되어 있습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
				}
				if(PASSWORD == null){
					if(isValidByPlayer) return NC.caution("비밀번호가 이미 해제되어 있습니다.", byPlayer);
					return SYS.log(false, "비밀번호가 이미 해제된 상태입니다.", c_LOG_TYPE.WARNING);
				}
				this.updatePassword();
				if(isValidByPlayer){
					NC.locked(false, "%d님이 비밀번호를 해제하였습니다.", null, null, SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME));
					SYS.log(true, "%d(이)가 비밀번호를 해제함", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(byPlayer));
				}
				else{
					NC.locked(false, "비밀번호가 해제되었습니다.");
					SYS.log(true, "비밀번호가 해제됨", c_LOG_TYPE.NOTICE);
				}
			}

			deleteAdmin(player){				/* 최고 권한 해제 */
				room.setPlayerAdmin(player, false);
			}
			deleteSubAdmin(player, isForce){	/* 보조 권한 해제 */
				if(this.findAdmin(player) != 1) return;
				PM.modifyPlayerById(player, "admin", 0);
				NC.notice("%d님의 보조 권한이 해제되었습니다.", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
				SYS.log(true, "%d(이)의 보조 권한이 삭제됨.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				SYS.updateListIndex(player);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
			}

			resetGame(player){			/* 게임 재시작 */
				room.stopGame();
				room.startGame();
			}

			showAdminList(target){		/* 관리자 목록 출력 */
				let getAdmins = grade => PM.findPlayerList().filter(p => p._admin == grade);
				let getList = grade => getAdmins(grade).map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ");
				let getMsg = function(ca){
					if(ca.at(1).length > 0 && ca.at(0).length > 0)
						return NC.formatString("최고 권한%d: %d" + newLine + "보조 권한%d: %d",
						[c_TAG_GRADE[1], getList(2), c_TAG_GRADE[2], getList(1)]);
					if(ca.at(1).length < 1 && ca.at(0).length < 1) return "비어 있음";
					return getList(ca.at(1).length > 0 ? 2 : 1);	
				}
				NC.uniMsg(c_LIST_ICON.NORMAL + "관리자 명단", getMsg([getAdmins(1), getAdmins(2)]), target);
				return getMsg([getAdmins(1), getAdmins(2)]);
			}
			showPassword(byPlayer){		/* 비밀번호 조회 */
				if(PASSWORD == null) return NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", byPlayer);
				NC.uniMsg(c_LIST_ICON.NORMAL + "현재 비밀번호", PASSWORD);
			}
			
			allowJoin(bool, player){					/* 팀 이동 금지 및 허용 */
				NC.locked(!bool, "팀 자율 이동이 %d되었습니다.", null, null, (bool ? "허용" : "금지"));
				this._isAllowTeamSwitch = bool;
				room.setTeamsLock(this._isAllowTeamSwitch);
				if(PM.isValid(player)) SYS.log(true, "%d(이)가 팀 자율 이동을 %d함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (bool ? "금지" : "허용")]);
			}
			cntAdmins(level){							/* 접속자 인원(권한) */
				let getAdmins = l => PM.findPlayerList().filter(p => p._admin == l).length;
				switch(level){
					case 1:		//	보조 권한 관리자만
					case 2:		//	최고 권한 관리자만
						return getAdmins(level);
					default:
						return getAdmins(2) + getAdmins(1);
				}
			}
			enablePinHost(bool){						/* 방장 팀 이동 설정 */
				if(NOPLAYER == true) return SYS.log(false, "호스트가 비활성화 되었기 때문에 호출할 수 없습니다", c_LOG_TYPE.WARNING);
				if(bool == true || bool == false) this._pinHost = bool;
			}
			filterPlayer(player){						/* 사칭 및 중복 필터 */
				if(!PM.findLocalId(player)) return false;		//	접속 상태가 아니면 처리 중단
				if(PM.cntPlayers() < 2) return false;			//	접속자 수가 2인 미만이면 처리 중단
				for(let target of PM.findPlayerList()){
					if(!PM.isValid(target._id)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
					if(player != target._id){
						if(target._name == PM.findPlayerById(player)._name){ 	//	중복 접속 처리
							if(target._network == this.findNetwork(player)){ 				//	중복 접속
								if(!SYS._isDemo)	//	데모 모드 기능 제한
									this.kickPlayer(target._id, c_LIST_ICON.NORMAL + "중복 접속");
								SYS.log(true, "%d(이)가 %d(으)로 중복 접속함", c_LOG_TYPE.NOTICE, [target.showPlayerInfo(), SYS.showPlayerInfo(player)]);
							}
							else this.kickPlayer(player, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");		//	사칭
							return true;
						}
						if(target._address == this.findAddress(player)){					//	다중 접속
							if(!SYS._isDemo){		//	데모 모드 기능 제한
								this.addBlacklistByPlayer(player);
								this.kickPlayer(player, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
							}
							SYS.log(true, "%d(와)과 %d(이)의 다중 접속이 감지됨.", c_LOG_TYPE.WARNING, [target.showPlayerInfo(), SYS.showPlayerInfo(player)]);
							return true;
						}
					}
				}
				return false;
			}
			giveAdmin(player){							/* 권한 설정 부여 */
				//	이미 권한이 있는 경우
				if(this.findAdmin(player) > 1 && room.getPlayer(player).admin == true) return;
				//	최대 인원을 초과한 경우
				if(this.cntAdmins(2) >= this.maxAdmin) return;
				//	블랙리스트에 포함되는 경우, 보조 권한으로 부여
				if(this.isBlacklist(player, false)) return this.giveSubAdmin(player);
				PM.modifyPlayerById(player, "admin", 2);
				room.setPlayerAdmin(player, true);
			}
			giveSubAdmin(player){						/* 보조 권한 부여 */
				//	이미 권한이 있는 경우
				if(this.findAdmin(player) == 1 && room.getPlayer(player).admin == false) return;
				//	최대 인원을 초과한 경우
				if(this.cntAdmins(1) >= this.maxAdmin * 2) return;
				if(room.getPlayer(player).admin == true) room.setPlayerAdmin(player, false);
				PM.modifyPlayerById(player, "admin", 1);
				NC.notice("%d님의 보조 권한이 부여되었습니다.", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
				SYS.log(true, "%d(이)의 보조 권한이 부여됨.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				SYS.updateListIndex(player);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
			}
			kickPlayer(target, msg, ban, ...replace){	/* 강제 퇴장 처리 */
				if(!PM.isValid(target)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				if(!PM.findLocalId(target)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_LID);
				room.kickPlayer(target, (msg ? NC.formatString(msg, replace, target) : null), ban);
			}
			limitScore(value, byPlayer){				/* 점수 변경 */
				let isValidByPlayer = PM.isValid(byPlayer);
				if(!SYS.hasInRange(value, 0, 14)){
					if(isValidByPlayer) return NC.caution("올바르지 않은 값입니다." + newLine + "0~14 사이의 값을 입력하세요.", byPlayer, "?score");
					return SYS.log(false, "올바르지 않은 값입니다." + newLine + "0~14 사이의 값을 입력하십시오.", c_LOG_TYPE.WARNING);
				}
				if(GM._gameStats == c_GAME_STATS.TICK){
					if(isValidByPlayer) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", byPlayer);
					return SYS.log(false, "경기 도중에 값을 수정할 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
				}
				room.setScoreLimit(value);
				NC.notice(isValidByPlayer ? "%d님이 제한 점수를 %d점으로 변경했습니다." : "제한 점수가 %d점으로 변경되었습니다.",
				null, null, (isValidByPlayer ? [SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME), value] : value));
				SYS.log(true, isValidByPlayer ? "%d(이)가 제한 점수를 %d점으로 변경함." : "제한 점수가 %d점으로 변경됨",
				c_LOG_TYPE.NOTICE, ([SYS.showPlayerInfo(byPlayer), value], value));
			}
			limitTime(value, byPlayer){					/* 시간 변경 */
				let isValidByPlayer = PM.isValid(byPlayer);
				if(!SYS.hasInRange(value, 0, 14)){
					if(isValidByPlayer) return NC.caution("올바르지 않은 값입니다." + newLine + "0~14 사이의 값을 입력하세요.", byPlayer, "?score");
					return SYS.log(false, "올바르지 않은 값입니다." + newLine + "0~14 사이의 값을 입력하십시오.", c_LOG_TYPE.WARNING);
				}
				if(GM._gameStats == c_GAME_STATS.TICK){
					if(isValidByPlayer) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", byPlayer);
					return SYS.log(false, "경기 도중에 값을 수정할 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
				}
				room.setTimeLimit(value);
				NC.notice(isValidByPlayer ? "%d님이 제한 시간을 %d분으로 변경했습니다." : "제한 시간이 %d분으로 변경되었습니다.",
				null, null, (isValidByPlayer ? [SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME), value] : value));
				SYS.log(true, isValidByPlayer ? "%d(이)가 제한 시간을 %d분으로 변경함." : "제한 시간이 %d분으로 변경됨",
				c_LOG_TYPE.NOTICE, ([SYS.showPlayerInfo(byPlayer), value], value));
			}
			logonAdmin(player, msg, type){				/* 최고 권한 로그인 */
				if(type != 2) return AMN.missPassword(player, msg, type);		//	첫 두 글자가 '!!'로 시작하지 않으면 실패 처리
				if(AMN.findAdmin(player) == 2) return;							//	이미 권한이 있는 경우
				if(PM.findPlayerById(player)._isSleep) PM.enableSleepMode(player, false);	//	장기 대기열에 있었으면 제거
				SYS.log(true, "%d(이)가 최고 권한 로그인을 시도함", c_LOG_TYPE.BELL, SYS.showPlayerInfo(player));
				AMN.giveAdmin(player);
			}
			missPassword(player, msg, type){			/* 최고 권한 로그인 오입력 */
				if(AMN.findAdmin(player) == 2) return;		//	이미 권한이 있는 경우
				SYS.log(true, "%d(이)가 최고 권한 로그인을 시도함(실패)", c_LOG_TYPE.WARNING, SYS.showPlayerInfo(player));
			}
			mutePlayer(target, time, byPlayer){			/* 채팅 금지 */
				// 이미 채팅이 금지돼 있는 경우
				if(PM.isValid(target) == false || PM.findPlayerById(target)._isMute == true) return;
				let isValidByPlayer = PM.isValid(byPlayer);
				PM.modifyPlayerById(target, "isMute", true);
				if(isValidByPlayer){
					NC.locked(true, "%d님이 %d님의 채팅을 %d 금지합니다.", null, null, [
						SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME),
						SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME),
						SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안"
					]);
					SYS.log(true, "%d(이)가 %d(이)의 채팅을 금지함.", c_LOG_TYPE.NOTICE, [
						SYS.showPlayerInfo(byPlayer),
						SYS.showPlayerInfo(target),
						time > 0 ? `${time}초 간` : "무제한"
					]);
				}
				else{
					NC.locked(true, "%d님의 채팅이 %d 금지됩니다.", null, null, [
						SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME),
						SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안"
					]);
					SYS.log(true, "%d(이)의 채팅이 %d 금지됨.", c_LOG_TYPE.NOTICE, [
						SYS.showPlayerInfo(target),
						time > 0 ? `${time}초 간` : "무제한"
					]);
				}
				SYS.updateListIndex(target);				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				if(typeof time != "number" || time < 5) return;
				TS.clearTimerByName("mute", target);
				TS.addTimer("mute", () => {
					if(PM.findPlayerById(target)._isMute) AMN.unmutePlayer(target);
				}, target, time * SEC_TO_MS);
			}
			swapGame(player){							/* 게임 자동 시작 및 종료 */
				if(GM._gameStats == c_GAME_STATS.TICK) return room.stopGame();
				return room.startGame();
			}
			unmutePlayer(target, byPlayer){				/* 채팅 허용 */
				let isValidByPlayer = PM.isValid(byPlayer);
				PM.modifyPlayerById(target, "isMute", false);
				room.setPlayerAvatar(target);			//	등번호 초기화
				SYS.updateListIndex(target);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				if(!PM.findLocalId(target)) return;		//	미접속자는 별도로 출력하지 않음
				TS.clearTimerByName("mute", target);
				if(isValidByPlayer){
					NC.locked(false, "%d님이 %d님의 채팅을 허용하였습니다.", null, null, [SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME), SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME)]);
					SYS.log(true, "%d(이)가 %d(이)의 금지된 채팅을 허용함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(byPlayer), SYS.showPlayerInfo(target)]);
				}
				else{
					NC.locked(false, "%d님의 채팅이 허용되었습니다.", null, null, SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME));
					SYS.log(true, "%d(이)의 금지된 채팅이 허용됨", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(target));
				}
			}
		}
		/*** 블랙리스트 클래스 ***/
		class blacklistManager{
			constructor(isSuper, name, conn){
				this._super		= isSuper ? true : false;		/* 접속 불가 처리 */
				this._name		= !name ? undefined : name;		/* 공용 네트워크 */
				this._address	= !conn ? undefined : conn;		/* 공용 주소 */
			}
		}
		/*** 공지 및 알림 클래스 ***/
		class Notification{
			constructor() {

			}
			findColor(color, hasRaw){						/* 글자 색상 지정 */
				let isHex = function(str){		//	16진수 판별
					if(str == undefined) return false;
					if(str.length != 3 && str.length != 6) return false;
					let strHex = /^[a-fA-F0-9]+/;
					return strHex.test(str);
				}
				return isHex(color) ? `0x${color}` : (hasRaw ? null : `0x${c_LIST_COLOR.DEFAULT}`);
			}
			findSound(sound){								/* 소리 크기 지정 */
				switch(sound){
					case c_LIST_SOUND.MUTED: case c_LIST_SOUND.NORMAL: case c_LIST_SOUND.LOUD:
						return sound;
					default:
						return c_LIST_SOUND.NORMAL;
				}
			}
			findStyle(style){								/* 글자 굵기 지정 */
				switch(style){
					case 0: case c_LIST_STYLE.NORMAL:		return c_LIST_STYLE.NORMAL;
					case 1: case c_LIST_STYLE.BOLD:			return c_LIST_STYLE.BOLD;
					case 2: case c_LIST_STYLE.ITALIC:		return c_LIST_STYLE.ITALIC;
					case 3: case c_LIST_STYLE.SMALL:		return c_LIST_STYLE.SMALL;
					case 4: case c_LIST_STYLE.SMALL_BOLD:	return c_LIST_STYLE.SMALL_BOLD;
					case 5: case c_LIST_STYLE.SMALL_ITALIC:	return c_LIST_STYLE.SMALL_ITALIC;
					default:								return c_LIST_STYLE.NORMAL;
				}
			}
			
			announce(msg, target, color, style, sound, delay, ...replace){
				let sendMsgByPlayer = (ms, tr, cl, st, sn) => room.sendAnnouncement(NC.formatString(ms, replace[0], tr), tr, NC.findColor(cl), NC.findStyle(st), NC.findSound(sn));
				let sendMsg = function(){			//	ID가 음수이면 해당 ID를 제외한 모든 플레이어에게 전송
					if(PM.isValid(Math.abs(target)) == false || target > 0) sendMsgByPlayer(msg, target, color, style, sound);
					else PM.findPlayerList().filter(p => p._id != Math.abs(target)).forEach(p => sendMsgByPlayer(msg, p._id, color, style, sound));
				}
				return delay > 0 ? TS.addTimer("announcement", () => sendMsg(), target, delay) : sendMsg();
			}
			extMsg(title, content, target, advCom, titleColor, contentColor, delay, ...replace){	/* (확장) */
				let hasTitle = (title != null);
				let hasDelay = (delay > 0);
				let titleText = (hasTitle ? (CS.isWhiteSpace(title) ? c_LIST_ICON.POSTIVE + "알림" : title) : content);
				this.announce(titleText
					+ (advCom ? ('(' + "이것을 찾으셨나요" + ': ' + advCom + ')') : ''),
					target, titleColor, (hasTitle ? c_LIST_STYLE.SMALL : c_LIST_STYLE.SMALL_BOLD), null, (hasDelay ? delay : 0), replace[0]);
				if(hasTitle) this.announce(content, target, contentColor, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, (hasDelay ? (delay + 1) : 0), replace[0]);
			}
			uniMsg(title, content, target, advCom, delay, ...replace){								/* 유니버셜 메시지 */
				return this.extMsg(title, content, target, advCom, c_LIST_COLOR.GREEN, null, delay * SEC_TO_MS, replace[0]);
			}

			acess(target, reason, ...replace){							/* 권한 없음 */
				return this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + (reason ? "권한 없음" : "주의"), (reason ? reason : "권한 없음"), target, null, c_LIST_COLOR.GRAY, c_LIST_COLOR.GRAY, 0, replace);
			}
			alretMsg(player){											/* 금지어 감지 메시지 */
				if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				PM.modifyPlayerById(player, "detector", PM.findPlayerById(player)._detector + 1);
				if(CS.maxFwdCount > 0 && PM.findPlayerById(player)._detector >= CS.maxFwdCount){ 
					PM.modifyPlayerById(player, "detector", 0);
					return AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE_BOLD + "금지어 누적 감지");
				}
				switch(CS.detectorLev + (AMN.isBlacklist(player, false) ? 1 : 0)){
					case 0:		//	비활성화
					case 1:		//	1단계: 처리 없음
						return;
					case 6:
					case 5:		//	5단계: 강제 퇴장+채팅 금지
						AMN.mutePlayer(player, 60);
					case 3:		//	3단계: 강제 퇴장
						return AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE + "금지어 감지");
					case 4:		//	4단계: 경고 문구+채팅 금지
						AMN.mutePlayer(player, 30);
					case 2:		//	2단계: 경고 문구
						let msg = [
							"방금 한 말에 금지어가 포함돼 있어요.",
							"건전한 채팅 문화를 만들어 갑시다.",
							"한 번쯤은 거울에 비친 자신의 모습을 보세요.",
							"가는 말이 고와야 오는 말도 곱다.",
							"역지사지의 태도로 남을 생각합시다.",
							"채팅에서 금지어가 감지되었어요.",
							"키보드 두드리는 본인의 모습을 돌아보세요.",
							"적어도 가정교육은 독학하지 않은 걸로 알아두는 게 좋겠죠.",
							"우리 한 번 올바르고 건전한 채팅 사용 자세를 가집시다.",
							"도저히 쓸 멘트가 없네요. 굳이 말 안 해도 알겠죠?",
							"한 번 내뱉은 말은 도로 주워담을 수 없습니다.",
							"적어도 부모님은 홀수가 아닌 걸로 알아두는 게 좋겠죠.",
							"말은 그 사람의 행동과 인격을 나타냅니다."
						];
						return this.announce(msg[Math.floor(Math.random() * msg.length)], player, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL);
				}
			}
			caution(msg, target, advCom, ...replace){					/* 주의 */
				return this.extMsg(c_LIST_ICON.NEGATIVE + "주의", msg, target, advCom, c_LIST_COLOR.ORANGE, c_LIST_COLOR.GRAY, 0, replace[0]);
			}			
			formatString(str, rep, target){					/* 문자열 치환 */
				let subst = "%d";
				if(!str.includes(subst)) return str;
				if(rep == undefined || rep.length < 1) return PM.isValid(target) ? str.replace(subst, SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME)) : str;
				let vrb = rep;
				let txt = str.split(subst);
				let context = txt;
				for(let i = 0; i < txt.length - 1; i++){;
					context[i] += Array.isArray(vrb) ? vrb[vrb.length > i ? i : vrb.length - 1] : vrb;
				}
				return context.join('');
			}
			help(msg, exCom, target, advCom, ...replace){				/* 도움말 */
				return this.uniMsg(c_LIST_ICON.NORMAL + "도움말", msg
					+ newLine + exCom
					+ newLine + "위와 같은 형식으로 보내면 됩니다.",
					target, advCom, 0, replace[0]);
			}
			info(){														/* 상세정보 */
				let title, context, target, advCom;
				switch(arguments.length){
					case 4:		//	info(title, context, target, advCom);
						title = c_LIST_ICON.NORMAL + "상세정보" + ": " + arguments[0];
						context = arguments[1], target = arguments[2], advCom = arguments[3];
						break;
					case 3:		//	info(msg, target, advCom);
					default:
						title = c_LIST_ICON.NORMAL + "상세정보";
						context = arguments[0], target = arguments[1], advCom = arguments[2];
				}
				return this.extMsg(title, context, target, advCom, c_LIST_COLOR.GREEN);
			}
			locked(isLock, msg, target, advCom, ...replace){			/* 잠금 및 해제 */
				return this.extMsg((isLock ? c_LIST_ICON.NEGATIVE_BOLD + "잠금" : c_LIST_ICON.NEGATIVE + "해제"), msg, target, advCom, c_LIST_COLOR.YELLOW, c_LIST_COLOR.GRAY, 0, replace[0]);
			}
			msgCommand(title, content, target, advCom, ...replace){		/* 명령어 목록 */
				return this.uniMsg((c_LIST_ICON.NORMAL + title + " 명령어"), content, target, advCom, 0, replace[0]);
			}
			notice(msg, target, advCom, ...replace){					/* 알림 */
				return this.uniMsg(null, msg, target, advCom, 0, replace[0]);
			}
			warning(msg, target, advCom, ...replace){					/* 경고 */
				return this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + "경고", msg, target, advCom, c_LIST_COLOR.RED, c_LIST_COLOR.GRAY, 0, replace);
			}
		}
		/*** 채팅 매니저 클래스 ***/
		class ChatManager{
			constructor(
				isFreeze, isLockPrivateChat,
				detectorLevel,
				maxForbiddenWordCount, maxRepeatedCount
				){
				this._playerList			= new Array();				/* 플레이어 데이터베이스 */
				this._isFreezeChat			= isFreeze;					/* 채팅 얼림 여부 */
				this._isLockPrivateChat		= isLockPrivateChat;		/* 귓속말 차단 */
				this._detectorLevel			= detectorLevel;			/* 채팅 필터링 엄격도 */
				this._maxForbiddenWordCount	= maxForbiddenWordCount;	/* 금지어 최대 감지량 */
				this._maxRepeatedCount		= maxRepeatedCount;			/* 도배 최대 감지량 */
			}
			onPlayerChat(player, msg){	/* 채팅 입력 이벤트 */
				let strList = msg.split(' ');
				let getComType = function(str){
					let typeList = ['!', '?', "!!"];
					let comText = strList.slice(1);
					for(let i = 0; i < typeList.length; i++){
						let strType = str.split(typeList[i]);
						if(strType.length == 2) return [i, strType[1], comText];
					}
					return null;
				}
				let comType = getComType(strList[0]);
				PM.updateTime(player.id);						//	마지막 활동 시간 저장
				if(comType != null){
					let commandsList = [						//	명령어 목록
						internalCommands, standardCommands, customCommands
					];
					let hasComProp = function(cl){			//	명령어 판독
						for(const [fn, prop] of Object.entries(cl).filter(([f, p]) => p.includes(comType[1]))){
							GM.runCommand(fn, comType, player);		//	명령어 처리
							return true;
						}
						return false;
					}
					for(let cm of commandsList){				//	명령어 입력 확인
						if(hasComProp(cm)) return;
					}
				}
				if(this.hasMutedChat(player.id)) return this.sendEmojiChat(player.id, msg);		//	채팅 금지
				this.updateChatLog(player.id, msg, TS.time);	//	채팅 로그 갱신
				if(this.hasRepeatedChat(player.id)) return;			//	반복 채팅 확인
				switch(PM.findPlayerById(player.id)._chatmode){			//	채팅 모드 처리
					case 0:		//	전체 채팅
						return this.sendAllChat(player.id, msg);
					case 1:		//	팀별 채팅
						return this.sendTeamChat(player.team, player.id, msg);
				}
			}
			
			get isFreezeChat(){			/* 채팅 얼림 여부 */
				return this._isFreezeChat;
			}
			get isLockPrvChat(){		/* 귓속말 차단 여부 */
				return this._isLockPrivateChat;
			}
			get detectorLev(){			/* 채팅 필터링 엄격도 */
				return this._detectorLevel;
			}
			get maxFwdCount(){			/* 금지어 최대 감지량 */
				let count = this._maxForbiddenWordCount;
				return count >= 3 ? count : null;
			}
			get maxRptCount(){			/* 도배 최대 감지량 */
				let count = this._maxRepeatedCount;
				return count >= 3 ? count : null;
			}

			set isFreezeChat(bool){			/* 채팅 얼리기 */
				this._isFreezeChat = bool;
			}
			set isLockPrvChat(bool){		/* 귓속말 차단 */
				this._isLockPrivateChat = bool;
			}
			set maxFwdCount(limit){			/* 금지어 최대 감지량 지정 */
				let count = this._maxForbiddenWordCount;
				if(limit >= 3 && count != limit){ 
					count = limit;
					SYS.log(true, "금지어 최대 감지량 변경: %d회", c_LOG_TYPE.NOTICE, limit);
				}
				else SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
			}
			set maxRptCount(limit){			/* 도배 최대 감지량 지정 */
				let count = this._maxRepeatedCount;
				if(limit == false){
					count = false;
					SYS.log(true, "도배 최대 감지량 변경: %d", c_LOG_TYPE.NOTICE, "비활성화");
				}
				else if(limit >= 3 && this.maxRptCount != limit){ 
					count = limit;
					SYS.log(true, "도배 최대 감지량 변경: %d회", c_LOG_TYPE.NOTICE, limit);
				}
				else SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
			}
			set detectorLev(targetLev){		/* 채팅 필터링 엄격도 지정 */
				if(this.detectorLev == targetLev) return;		//	동일한 단계일 경우
				if(!SYS.hasInRange(targetLev, 0, 5)) return;	//	범위를 벗어난 경우
				NC.notice("채팅 필터링 엄격도가 %d단계로 변경되었습니다.", null, null, targetLev);
				SYS.log(true, "채팅 필터링 엄격도 변경: %d→%d", c_LOG_TYPE.NOTICE, [this.detectorLev, targetLev]);
				this._detectorLevel = targetLev;
			}
			
			initPlayerList(player){			/* 플레이어 데이터베이스 초기화 */
				return this._playerList.push(new ChatSystem(player));
			}
			
			isWhiteSpace(str){			/* 공백 확인 */
				if(str == undefined) return true;
				return str.trim().length == 0;
			}
			hasForbiddenWord(msg){		/* 금지어 필터링 */
				if(this.detectorLev == 0) return false;
				for(let fw of forbiddenWords){
					let isEquals = function(s, t){			//	단어 일치 확인
						//	공백 처리
						if(s == undefined || t == undefined) return false;			//	데이터가 없는 경우
						if(CS.isWhiteSpace(s) == true || CS.isWhiteSpace(t) == true) return false;
						//	우회 문자 처리
						let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
						if(!reg.test(t)) s = s.replace(reg, '');					//	우회 문자 감지되면 제외
						return s.includes(t);										//	모두 일치한 경우
					}
					if(isEquals(msg, fw)) return true;
				}
				return false;
			}
			hasMutedChat(player){		/* 채팅 금지 확인 */
				return CS.findPlayerById(player).hasMutedChat();
			}
			hasRepeatedChat(player){	/* 반복 채팅 확인 */
				return this.findPlayerById(player).hasRepeatedChat();
			}

			findPlayerById(target){			/* 플레이어 데이터베이스 구하기 */
				return this._playerList.find(p => p._id == target);
			}

			updateChatLog(player, msg, time){			/* 플레이어 채팅 로그 갱신 */
				return this.findPlayerById(player).updateChatLog(msg, time);
			}
			
			showHelpCommandList(title, cml, player){	/* 명령어 목록 출력 */
				if(!SYS.hasInRange(cml.length, 1, 2)) return;
				let sendList = str => NC.msgCommand(title, str, player);
				let getList = index => cml[index].join(" | ");
				if(cml.length == 1) return sendList(getList(0));
				return sendList(getList(0) + (AMN.findAdmin(player) > 0 ? (newLine + getList(1)) : ''));
			}

			freezeChat(time, player){						/* 채팅 얼리기 */
				if(this.isFreezeChat == true) return;
				this.isFreezeChat = true;
				let isValidByPlayer = PM.isValid(player);
				if(isValidByPlayer){
					NC.locked(true, "%d님이 채팅창을 %d 얼렸습니다", null, null, [
						SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME),
						SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안"
					]);
					SYS.log(true, "%d(이)가 채팅창을 %d 녹임", c_LOG_TYPE.NOTICE, [
						SYS.showPlayerInfo(player),
						SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안"
					]);
				}
				else{
					NC.locked(true, "채팅창이 %d 얼었습니다", null, null, SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안");
					SYS.log(true, "채팅창이 %d 얼려짐", c_LOG_TYPE.NOTICE, (time > 0 ? `${time}초 간` : "무제한"));
				}
			}
			lockPrivateChat(bool, player){					/* 귓속말 채팅 금지 및 허용 */
				let isValidByPlayer = PM.isValid(player);
				this.isLockPrvChat = bool;
				if(isValidByPlayer){
					NC.locked(bool, "%d님이 귓속말 채팅을 %d했습니다.", null, null, [SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME), (bool ? "금지" : "허용")]);
					SYS.log(true, "%d(이)가 귓속말 채팅을 %d함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (bool ? "금지" : "허용")]);
				}
				else{
					NC.locked(bool, "귓속말 채팅이 %d되었습니다.", null, null, (bool ? "금지" : "허용"));
					SYS.log(true, "reCAPTCHA가 %d됨", c_LOG_TYPE.NOTICE, (bool ? "금지" : "허용"));
				}
			}
			sendAlert(msg, target, ...replace){				/* 관리자 채팅 전송 */
				if(NOPLAYER) return NC.announce(HOSTNAME + ": " + msg, target, null, null, null, 0, replace);
				return room.sendChat(NC.formatString(msg, replace, target), target);
			}
			sendAllChat(player, msg){						/* 전체 채팅 전송 */
				let filter = this.hasForbiddenWord(msg);				//	금지어 필터링
				let title = "전체" + (filter ? c_TAG_GRADE[0] : PM.findTagGrade(player));
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => ((PM.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
				this.sendMsg(title + getContext(this.detectorLev, msg));
				PM.findPlayerList().filter(p => p._chatmode != 0).forEach(p => NC.announce("(전체 채팅: !a 답할 내용)", p._id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1));
				SYS.log(true, title + SYS.showPlayerInfo(player) + ": " + msg);
				if(filter) NC.alretMsg(player);
			}
			sendEmojiChat(player, msg){						/* 감정 채팅 전송 */
				let num = parseInt(msg);
				if(SYS.hasInRange(num, 0, c_LIST_EMOTION.length)){
					room.setPlayerAvatar(player, c_LIST_EMOTION[num]);
					return;
				}
				let msgList = {
					"mute" : [
						"잠시 동안 채팅이 불가합니다.",
						"현재 채팅이 불가능합니다.",
						"당분간 채팅이 불가합니다.",
						"채팅을 이용할 수 없습니다.",
						"채팅이 금지되었습니다."
					],
					"freeze" : [
						"채팅창이 얼려있습니다.",
						"관리자가 채팅창을 녹여야 합니다.",
						"권한이 없는 모든 플레이어의 채팅이 금지되었습니다.",
						"채팅창이 녹아야 합니다."
					],
					"emoji" : new Array
				};
				for(let i = 0; i < c_LIST_EMOTION.length; i++){
					msgList.emoji.push(c_LIST_EMOTION[i] + i);
				}
				let context = msgList[AMN.findAdmin(player) > 0 ? "mute" : "freeze"];
				NC.locked(true, "아래에 나열된 숫자로 감정만 전달할 수 있습니다" 
				+ newLine + msgList.emoji.join(" | "), player);
				NC.acess(player, context[Math.floor(Math.random() * context.length)]);
			}
			sendMsg(msg, target, ...replace){				/* 일반 메시지 출력 */
				return NC.announce(msg, target, null, null, null, null, replace);
			}
			sendPrivateChat(toPlayer, fromPlayer, msg){		/* 귓속말 채팅 전송 */
				if(!PM.isValid(toPlayer)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_LID);
				if(fromPlayer == 0 && toPlayer > 0)				//	콘솔창에서 게임으로 전달
					return this.sendAlert(msg + " (귓속말 답장: !e #0 답할 내용)", toPlayer);
				if(this.isLockPrvChat) return NC.acess(fromPlayer, ("(#0)" + HOSTNAME) + " 외에 귓속말 채팅이 금지돼 있어 이용할 수 없습니다.");
				if(this.hasMutedChat(fromPlayer)) return this.sendEmojiChat(fromPlayer, msg);		//	채팅 금지
				let filter = this.hasForbiddenWord(msg);			//	금지어 필터링
				let title = "개인" + (filter ? c_TAG_GRADE[0] : PM.findTagGrade(fromPlayer));
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => (SYS.showPlayerInfo(fromPlayer, c_PLAYERINFO_TYPE.LOCAL) + '→' + PM.findTagGrade(toPlayer) + SYS.showPlayerInfo(toPlayer, c_PLAYERINFO_TYPE.LOCAL) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				let context = getContext(this.detectorLev, msg);
				this.sendMsg(title + context + " (답장: !e " + '#' + fromPlayer + " 답할 내용)", toPlayer);
				this.sendMsg(title + context, fromPlayer);																								//	입력자 출력
				SYS.log(true, "%d%d→ %d%d: %d", c_LOG_TYPE.NORMAL, [			//	로그 출력
					title, SYS.showPlayerInfo(fromPlayer), PM.findTagGrade(toPlayer), SYS.showPlayerInfo(toPlayer), msg
				]);
				if(filter) NC.alretMsg(fromPlayer);
			}
			sendTeamChat(teamId, player, msg){				/* 팀 채팅 전송 */
				let getTeamToString = function(t){
					switch(t){
						case c_TEAM.SPECTATOR:	return "관전";
						case c_TEAM.RED:	 	return "레드";
						case c_TEAM.BLUE:		return "블루";
						default:				return SYS.sendError(c_ERROR_TYPE.E_ETC);
					}
				}
				let filter = (PM.isValid(player) ? this.hasForbiddenWord(msg) : false);
				let title = getTeamToString(teamId) + (PM.isValid(player) ? filter ? c_TAG_GRADE[0] : PM.findTagGrade(player) : PM.findTagTeam(teamId));
				let showMsg = function(player, context){
					for(let p of PM.findPlayerList().filter(p => p._team == teamId)){
						if(!PM.isValid(player)) CS.sendAlert(context, p._id);
						else CS.sendMsg(context, p._id);
					}
				}
				if(!PM.isValid(player)) return showMsg(0, msg);
				if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => ((PM.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				showMsg(player, title + getContext(this.detectorLev, msg));
				PM.findPlayerList().filter(p => p._team == teamId && p._chatmode != 0).forEach(p => NC.announce("(팀 채팅: !t 답할 내용)", p._id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1));
				//	로그 출력
				SYS.log(true, "%d%d: %d", c_LOG_TYPE.NORMAL, [title, SYS.showPlayerInfo(player), msg]);
				if(filter) NC.alretMsg(player);
			}
			unfreezeChat(player){							/* 채팅 녹이기 */
				if(this.isFreezeChat == false) return;
				this.isFreezeChat = false;
				let isValidByPlayer = PM.isValid(player);
				if(isValidByPlayer){
					NC.locked(false, "%d님이 채팅창을 녹였습니다", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
					SYS.log(true, "%d(이)가 채팅창을 녹임", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				}
				else{
					NC.locked(false, "채팅창이 녹았습니다");
					SYS.log(true, "채팅창이 녹아짐", c_LOG_TYPE.NOTICE);
				}
			}
		}
		/*** 채팅 시스템 클래스 ***/
		class ChatSystem{
			constructor(id){
				Object.freeze(this._id		= id);
				this._str					= new Array();		/* 채팅 문자열 */
				this._timeList				= new Array();		/* 시간 목록 */
				this._time					= TS.time;			/* 감지 시간 */
				this._repeatedCount			= 0;				/* 반복 채팅 누적 감지 횟수 */
				this._forbiddenWordCount	= 0;				/* 금지어 누적 감지 횟수 */
			}
			get cntFwd(){		/* 금지어 누적 감지 횟수 */
				return this._forbiddenWordCount;
			}
			get cntRpt(){		/* 반복 채팅 누적 감지 횟수 */
				return this._repeatedCount;
			}
			set cntFwd(v){
				this._forbiddenWordCount += v;
			}
			set cntRpt(v){
				this._repeatedCount += v;
			}

			hasMutedChat(){		/* 채팅 금지 확인 */
				return AMN.isMute(this._id) ? true : CS.isFreezeChat ? (AMN.findAdmin(this._id) < 1) : false;
			}
			hasRepeatedChat(){	/* 반복 채팅 확인 */
				if(CS.maxRptCount == false) return false;				//	반복 채팅 감지 비활성
				if(CS.detectorLev < 1) return false;					//	채팅 필터링이 비활성화 돼 있는 경우
				if(this._str == undefined) return false;
				if(CS.hasForbiddenWord(this._str[0]) == false			//	금지어 분산 입력 감지
				&& CS.hasForbiddenWord([...this._str].reverse().join('')) == true) NC.alretMsg(this._id);
				if(this._str.length < CS.maxRptCount) return false;				//	채팅 로그 데이터가 적거나 없는 경우
				let isEquals = (a, b) => Object.entries(a).toString() === Object.entries(b).toString();
				let replaceStr = function(s){						//	우회 문자 처리
					let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
					s = s.replace(reg, '');		//	우회 문자 감지되면 제외
					return s.replace(' ', '');	//	공백 처리
				}

				for(let i = 1; i < this._str.length; i++){			//	우회 문자 확인
					if(!isEquals(replaceStr(this._str[0]), replaceStr(this._str[i]))){
						//	내용과 무관하게 짧은 시간내 채팅 입력이 감지되면 반복 채팅으로 간주
						if(this._timeList[0] - this._timeList[i] > GM.rptTime * i) return false;
					}
				}
				if(++this.cntRpt <= CS.maxRptCount) return false;
				let showAlretMsg = function(c, l, p){				//	경고 메시지 출력
					switch(l){
						case 0:		//	비활성화
						case 1:		//	1단계: 처리 없음
							break;
						case 6:
						case 5:		//	5단계: 강제 퇴장+채팅 금지
							AMN.mutePlayer(p, 60);
						case 3:		//	3단계: 강제 퇴장
							return AMN.kickPlayer(p, c_LIST_ICON.NEGATIVE + "도배 감지");
						case 4:		//	4단계: 경고 문구+채팅 금지
							AMN.mutePlayer(p, 30);
						case 2:		//	2단계: 경고 문구
							break;
					}
					let blockMsg = [
						"동일하거나 무의미한 내용의 연속된 채팅이 감지되었습니다.",
						"같은 내용이나 의미 없는 내용의 채팅이 여러 번 전송되었습니다.",
						"과도한 채팅창 독점은 게임의 집중을 반감시킵니다.",
						"짧은 시간에 여러 메시지가 수차례 입력되었습니다."
					];
					NC.caution(blockMsg[Math.floor(Math.random() * blockMsg.length)], p);
				}
				showAlretMsg(this.cntRpt, (CS.detectorLev + (AMN.isBlacklist(this._id, false) ? 1 : 0)), this._id);
				return true;
			}

			updateChatLog(msg, time){	/* 플레이어 채팅 로그 갱신 */
				let logStr = this._str, logTime = this._timeList;

				if(logStr.length != logTime.length){
					if(logStr.length > 0) logStr.splice(0);
					if(logTime.length > 0) logTime.splice(0);
				}
				let deleteFirstLog = function(){
					logStr.pop();
					logTime.pop();
				}
				if(logStr.length >= CS.maxRptCount)		//	maxRptCount 값 이상의 로그가 기록되면 가장 오래된 기록 삭제
					deleteFirstLog();
				for(let lt of logTime.filter(e => time - e >= 5 * SEC_TO_MS)){		//	오래된 로그 기록은 삭제
					if(time - lt >= 5 * SEC_TO_MS) deleteFirstLog();
				}
				logStr.unshift(msg);
				logTime.unshift(time);
			}
			updateTime(){				/* 시간 갱신 */
				this._timeList.push(TS.time);
			}
		}
		/*** 명령어 클래스 ***/
		class Commands{
			constructor(){
				
			}
			btg(player, msg, type){						/* 이스터에그 */
				let lnList = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
				let name = lnList.at(Math.floor(Math.random() * lnList.length));
				let identify = (c, str) => NC.extMsg(getFaceEmoji(c), str, player, null, c_LIST_COLOR.YELLOW);
				let getFaceEmoji = function(c){
					let e = c_LIST_EMOTION.at(Math.floor(Math.random() * c_LIST_EMOTION.length));
					return e + c + "타고" + e;
				}
				switch(type){
					case 0:		//	!배타고
					case 1:		//	?배타고
						return identify(name, `안녕하세요, 저는 ${name}타고라고 합니다.`);
					case 2:		//	!!배타고
						return identify("배", "여기 이스터 에그 없어요");
				}
			}

			updateUniform(player, msg, type){			/* 팀 유니폼 */
				switch(type){
					case 0:			//	!uniform
						let len = msg.length;
						if(!SYS.hasInRange(len, 4, 6)){		//	인자값 길이에 따라 도움말 출력
							let getMsg = function(l){
								switch(l){
									case 0:		return "유니폼을 적용할 팀을 입력하세요."
									case 1:		return "각도를 지정하지 않았습니다.";
									case 2:		return "등번호 색상을 지정하지 않았습니다.";
									case 3:		return "배경 색상을 지정하지 않았습니다.";
									default:	return "배경은 최대 3가지 색상을 조합할 수 있습니다.";
								}
							}
							return NC.caution(getMsg(len), player, "?uniform");
						}

						//	팀 ID 확인
						let getTeam = function(type){
							switch(type){
								case "red":		case 'r':	case "레드":	case "레":
									return c_TEAM.RED;
								case "blue":	case 'b':	case "블루":	case "블":
									return c_TEAM.BLUE;
								default:
									return null;
							}
						}
						let team = getTeam(msg[0]);
						if(team == null) return NC.caution("유니폼을 적용할 팀을 지정하지 않았습니다.", player, "?uniform");

						//	각도 범위 확인
						let angle = parseInt(msg[1]);
						if(!SYS.hasInRange(angle, 0, 180)) return NC.caution("각도는 0°~180° 사이의 값으로 입력해야 합니다.", player, "?uniform");

						//	색상 코드 확인
						let getBgColorList = str => str.map(e => NC.findColor(e, true));
						let bgList = getBgColorList(msg.slice(2));
						if(bgList.find(b => b == null) != undefined)  return NC.caution("색상 코드가 올바르지 않습니다.", player, "?uniform");
						PM.updateUniform(team, angle, bgList[0], bgList.slice(1));
						NC.uniMsg(c_LIST_ICON.NORMAL_BOLD + "유니폼 변경",
						"%d님이 %d의 유니폼을 변경했습니다." + newLine + "%d",
						null, "!uniform", 0, [SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME), GM.findTeamName(team), msg.join(' ')]);
						SYS.log(true, "%d(이)가 %d의 유니폼을 변경함 <%d>", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), GM.findTeamName(team), msg.join(' ')]);
						break;
					case 1:			//	?uniform
						return NC.help("텍스트 색이 FFFFFF이고 배경이 FFCC00 및 AABBCC이며, 각도가 30°인 레드팀 유니폼으로 변경하려면",
						"!uniform red 30 FFFFFF FFCC00 AABBCC", player);
				}
			}

			alertSpam(player, msg, type){				/* 도배방지문자 */
				switch(type){
					case 0:		//	!도배방지
						if(!AMN.findAdmin(player)) return CM.helpCom(player, msg, 0);		//	도움말
						let context = ["도배 방지", "분란 방지", "정숙 유지", "질서 유지", "도배 방지"];
						NC.announce("%d" + newLine + context.join(newLine) + newLine + "%d",
						null, c_LIST_COLOR.ORANGE, c_LIST_STYLE.BOLD, c_LIST_SOUND.LOUD, 0, "〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰");
						SYS.log(true, "%d(이)가 도배 방지 문자를 출력함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
						break;
					case 1:		//	?도배방지
						return AMN.findAdmin(player) > 0 ? NC.help("도배 방지 문자를 출력하려면", "!도배방지", player) : CM.helpCom(player);
				}
			}

			comAdminList(player, msg, type){			/* 관리자 조회 명령어 */
				switch(type){
					case 0:		//	!admin
						return AMN.showAdminList(player);
					case 1:		//	?admin
						break;
				}
			}

			comAllChat(player, msg, type){				/* 전체 채팅 명령어 */
				switch(type){
					case 0:			//	!a
						return CS.sendAllChat(player, msg.join(' '));
					case 1:			//	?a
						return NC.help("모든 플레이어에게 \'%d\'라는 말을 공공연히 밝히고 싶으면",
						"!a %d", player, "!chathelp", "나는 경기도 안양에 살고 있다");
				}
			}
			comPrivateChat(player, msg, type){			/* 귓속말 명령어 */
				switch(type){
					case 0:			//	!e
						if(!PM.findPlayerById(player)._isDisturb) return NC.caution("귓속말을 사용할 수 없습니다.", player, "?disturb");
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : -1;
						let chatMsg = msg.length > 1 ? msg.slice(1).join(' ') : '';
						if(target == 0){
							let mark = (CS.hasForbiddenWord(chatMsg) ? c_TAG_GRADE[0] : PM.findTagGrade(player));
							CS.sendMsg("외부" + mark + SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) + '→' + HOSTNAME + ": " + chatMsg, player);
							SYS.log(false, mark + SYS.showPlayerInfo(player) + ": " +  chatMsg, c_LOG_TYPE.BINDING);
							return;
						}
						if(target == -1) return NC.caution("귓속말을 보낼 대상을 지정하세요", player, "?e");
						if(!PM.isValid(target)) return false;
						if(target == player) return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player);
						if(!PM.findPlayerById(target)._isDisturb) return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님은 채팅 수신을 거부한 상태입니다.", player);
						CS.sendPrivateChat(target, player, chatMsg);
						if(CS.hasForbiddenWord(chatMsg)) NC.alretMsg(player);
						break;
					case 1:			//	?e
						return NC.help("공용 ID가 3인 플레이어에게 \'%d\'이라는 말을 조용히 전달하려면",
						"!e #3 %d", player, "!chathelp", "안녕?");
				}
			}
			comTeamChat(player, msg, type){				/* 팀 채팅 명령어 */
				switch(type){
					case 0:			//	!t
						return CS.sendTeamChat(PM.findPlayerById(player)._team, player, msg.length > 0 ? msg.join(' ') : '');
					case 1:			//	?t
						return NC.help("상대팀이 못 엿듣게 살포시 팀원에게 \'%d\'라고 전하려면",
						"!t %d", player, "!chathelp", "민트초코 최고야");
				}
			}

			comAllowJoin(player, msg, type){			/* 팀 이동 금지 및 허용 */
				switch(type){
					case 0:			//	!lock_join
						if(!AMN.findAdmin(player)) return NC.acess(player);
						let getLockType = function(str){
							switch(str){
								case "on": case "온": case "금지": case "ㅐㅜ": case "dhs": case "rmawl":
									return false;
								case "off": case "오프": case "허용": case "ㅐㄹㄹ": case "dhvm": case "gjdyd":
									return true;
								default:
									return !AMN.isAllowJoin;
							}
						}
						let lockType = getLockType(msg.length > 0 ? msg[0] : null);
						if(lockType == AMN.isAllowJoin) return NC.caution("팀 자율 이동이 이미 %d되어 있습니다.", player, null, (lockType ? "허용" : "금지"));
						return AMN.allowJoin(lockType, player);
					case 1:			//	?lock_join
						return NC.help("팀 자율 이동을 막으려면",
						"!lock_join on", player);
				}
			}
			comAvatar(player, msg, type){				/* 등번호 명령어 */
				switch(type){
					case 0:		//	!avatar
						PM.giveAvatar(player, (msg.length > 0? msg[0] : ''));
						NC.notice("등번호가 변경되었습니다.", player, "!clear_avatar");
						break;
					case 1:		//	?avatar
						return NC.help("등번호를 12로 변경하려면", "!avatar 12", player, "!clear_avatar");
				}
			}
			comChatMode(player, msg, type){				/* 채팅 모드 설정 */
				switch(type){
					case 0:			//	!chatmode
						switch(msg.length > 0 ? msg[0] : null){
							case 0: case 'a': case "전체": case "all":
								PM.modifyPlayerById(player, "chatmode", 0);
								break;
							case 1: case 't': case "팀": case"team":
								PM.modifyPlayerById(player, "chatmode", 1);
								break;
							default:
								NC.caution("부적절한 값입니다.", player, "?chatmode");
						}
						break;
					case 1:			//	?chatmode
						return NC.help("상대팀이 못 듣게 같은 팀원에게 '민트초코는 진리야'라고 계속해서 설교하려면",
						"!chatmode team", player);
				}
			}
			comClearBans(player, msg, type){			/* 영구 퇴장 명단 초기화 명령어 */
				switch(type){
					case 0:		//	!clearbans
						return AMN.findAdmin(player) ? AMN.clearBans(player) : NC.acess(player);
					case 1:		//	?clearbans
						return NC.help("영구 퇴장 명단을 지우려면", "!clearbans", player, "!unmute #ID");
				}
			}
			comClearPassword(player, msg, type){		/* 비밀번호 해제 */
				switch(type){
					case 0:			//	!clear_pw
						return AMN.findAdmin(player) > 0 ? AMN.clearPassword(player) : NC.acess(player);
					case 1:			//	?clear_pw
						return NC.help("비밀번호를 해제하려면", "!clear_pw", player);
				}
			}
			comClearUniform(player, msg, type){			/* 유니폼 초기화 명령어 */
				switch(type){
					case 0:			//	!clear_uniform
						let getTeam = function(str){
							switch(str){
								case "red":		case 'r':	case "레드":	case "레":
											return c_TEAM.RED;
								case "blue":	case 'b':	case "블루":	case "블":
											return c_TEAM.BLUE;
								default:	return false;
							}
						}
						let team = getTeam(msg.length > 0 ? msg[0] : null);
						if(!team) return NC.caution("유니폼을 되돌릴 팀을 입력하세요.", player);
						PM.clearUniform(team);
						NC.notice("%d님이 %d의 유니폼을 초기화 했습니다.", null, null, [SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME), GM.findTeamName(team)]);
						SYS.log(true, "%d(이)가 %d의 유니폼을 초기화함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), GM.findTeamName(team)]);
						break;
					case 1:			//	?clear_uniform
						return NC.help("레드팀의 유니폼을 초기화하려면",
						"!clear_uniform red", player);
				}
			}
			comDisturbMode(player, msg, type){			/* 수신 모드 설정 */
				switch(type){
					case 0:		//	!disturb
						switch(msg.length > 0 ? msg[0] : null){
							case 0: case "금지": case "off": case "오프":
								return PM.modifyPlayerById(player, "isDisturb", 0)
							case 1: case "허용": case "on": case "온":
								return PM.modifyPlayerById(player, "isDisturb", 1);
							default:
								return NC.caution("부적절한 값입니다.", player, "?disturb");
						}
					case 1:		//	?disturb
						return NC.help("상대방의 채팅 수신을 거부하려면",
						"!disturb on", player);	
				}
			}
			comFreezeChat(player, msg, type){			/* 채팅 얼리기 */
				switch(type){
					case 0:		//	!freeze
						if(!AMN.findAdmin(player)) return NC.acess(player);
						if(CS.isFreezeChat) return NC.caution("채팅창이 이미 얼려있습니다.", player, "!unfreeze");
						if(PM.cntPlayers() < 3) return NC.caution("부적절한 조치입니다.", player, "!mute #ID");
						return CS.freezeChat(0, player);
					case 1:		//	?freeze
						return NC.help("채팅창을 얼리려면", "!freeze", player, "!unfreeze");
				}
			}
			comJoin(player, msg, type){					/* 팀 자율 이동 */
				switch(type){
					case 0:
						return CM.joinPlayer(player, msg);
					case 1:
						return NC.help("레드팀으로 참가하려면", "!join red", player);
					default:
				}
			}
			comKick(player, msg, type){					/* 강제 퇴장 */
				switch(type){
					case 0:		//	!kick
						if(!AMN.findAdmin(player)) return NC.acess(player);			//	권한이 없는 경우
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(!PM.isValid(target)) return CM.comKick(player, msg, 1);	//	대상을 잘못 지목한 경우
						let reason = msg.length > 1 ? msg.slice(1).join(' ') : null;
						if(AMN.findAdmin(target) > AMN.findAdmin(player)) return NC.acess(player, "권한이 낮아 처리할 수 없습니다.");	//	보조 권한 → 최고 권한 퇴장 불가
						let byPlayer = SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC);
						let detail = (reason == null || CS.isWhiteSpace(reason) ? ("처리자" + ': ' + byPlayer) : (byPlayer + ': ' + reason));
						return AMN.kickPlayer(target, detail);
					case 1:		//	?kick
						return NC.help("공용 ID가 42인 플레이어를 \'%d\'이라는 사유로 퇴장 시키려면", 
						"!kick #42 %d", player, null, "민트초코를 지지함");
				}
			}
			comLockPrivateChat(player, msg, type){		/* 귓속말 채팅 금지 및 허용 */
				switch(type){
					case 0:			//	!lock_private
						if(!AMN.findAdmin(player)) return NC.acess(player);
						let getLockType = function(str){
							switch(str){
								case "on": case "온": case "금지": case "ㅐㅜ": case "dhs": case "rmawl":
									return true;
								case "off": case "오프": case "허용": case "ㅐㄹㄹ": case "dhvm": case "gjdyd":
									return false;
								default:
									return !CS.isLockPrvChat;
							}
						}
						let lockType = getLockType(msg.length > 0 ? msg[0] : null);
						if(lockType == CS.isLockPrvChat) return NC.caution("귓속말 채팅이 이미 " + (lockType ? "금지" : "허용") + "되어 있습니다.", player);
						return CS.lockPrivateChat(lockType, player);
					case 1:			//	?lock_private
						return NC.help("귓속말 채팅을 막으려면",
						"!lock_private on", player);
				}
			}
			comMute(player, msg, type){					/* 채팅 금지 */
				switch(type){
					case 0:			//	!mute
						if(!AMN.findAdmin(player)) return NC.acess(player);			//	권한이 없는 경우
						if(PM.cntPlayers() < 2) return NC.caution("채팅을 금지할 수 있는 플레이어가 없습니다.", player);
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(!PM.isValid(target)) return CM.comMute(player, msg, 1);	//	대상을 잘못 지목한 경우
						if(target == player) return NC.caution("자기 자신의 채팅을 금지할 수 없습니다.", player);
						if(PM.findPlayerById(target)._isMute) return NC.caution("%d님의 채팅은 이미 금지돼 있습니다.", player, ("!unmute " + '\#' + target), SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME));
						return AMN.mutePlayer(target, 0, player);
					case 1:			//	?mute
						return NC.help("공용 ID가 42인 플레이어의 채팅을 금지하려면", "!mute #42", player);
				}
			}
			comMutedList(player, msg, type){			/* 채팅 금지 명단 조회 명령어 */
				switch(type){
					case 0:		//	!muted_list
						return PM.showMutedList(player);
					case 1:		//	?muted_list
						break;
				}
			}
			comPinHost(player, msg, type){				/* 방장 이동 설정 */
				if(NOPLAYER == true) return;
				switch(type){
					case 0:			//	!lock_host
						if(!AMN.findAdmin(player)) return NC.acess(player);
						let lockType = AMN._pinHost;
						AMN.enablePinHost(!lockType);
						if(lockType == false) PM.moveTeam(0, c_TEAM.SPECTATOR);
						NC.locked(!lockType, "호스트 이동이 %d되었습니다.", player, null, (lockType ? "허용" : "금지"));
						SYS.log(true, "%d(이)가 방장 팀 이동을 %d함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (lockType ? "허용" : "금지")]);
						break;
					case 1:			//	?lock_host
						return NC.help("호스트 이동을 금지하려면", "!lock_host", player);
				}
			}
			comRecaptcha(player, msg, type){			/* reCAPTCHA 설정 */
				switch(type){
					case 0:		//	!recaptcha
						if(!AMN.findAdmin(player)) return NC.acess(player);
						switch(msg[0]){
							case "on":	case "온":	case "활성화":	case "ㅐㅜ":	case "dhs":	case "ghkftjdghk":
								return SYS.enableRecaptcha(true, player);
							case "off":	case "오프":	case "비활성화":	case "ㅐㄹㄹ":	case "dhvm":	case "qlghkftjdghk":
								return SYS.enableRecaptcha(false, player);
							default:
								break;
						}
					case 1:		//	?recaptcha
						return NC.help("reCAPTCHA를 활성화 하려면", "!recaptcha on", player);
				}
			}
			comRecording(player, msg, type){			/* 녹화 시작 및 종료 */
				switch(type){
					case 0:			//	!rec
						if(AMN.findAdmin(player) != 2) return NC.acess(player);
						return GM.isRecording() ? GM.stopRecording() : GM.startRecording();
					case 1:			//	?rec
						return NC.help("게임을 녹화하려면", "!rec", player);
				}
			}
			comResetAvatar(player, msg, type){			/* 등번호 초기화 명령어 */
				switch(type){
					case 0:		// !clear_avatar
						PM.resetAvatar(player);
						NC.notice("등번호가 초기화되었습니다.", player);
						break;
					case 1:		//	?clear_avatar
						return NC.help("기본 등번호로 되돌리려면", "!clear_avatar", player);
				}
			}
			comResetGame(player, msg, type){			/* 게임 재시작 명령어 */
				switch(type){
					case 0:			//	!rr
						if(!AMN.findAdmin(player)) return NC.acess(player);
						return AMN.resetGame(player);
					case 1:			//	?rr
						return NC.help("게임을 재시작 하려면", "!rr", player);
				}
			}
			comSetPassword(player, msg, type){			/* 비밀번호 지정 */
				switch(type){
					case 0:		//	!set_pw
						if(!AMN.findAdmin(player)) return NC.acess(player);
						let pw = msg.length > 0 ? msg.join(' ') : null;
						if(SYS._lockPass) return NC.acess(player, "서버에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
						if(pw == null) return CM.comSetPassword(player, pw, 1);
						if(pw.length < 4) return NC.caution("비밀번호가 너무 짧습니다.", player, "!clear_pw");
						if(pw.length > 30) return NC.caution("비밀번호가 너무 길어서 설정할 수 없습니다.", player);
						AMN.password = pw;
						NC.locked(true, "%d님이 비밀번호를 설정하였습니다.", null, null, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME));
						SYS.log(false, "%d(이)가 비밀번호를 설정함. (%d)", c_LOG_TYPE.BELL, [SYS.showPlayerInfo(player), PASSWORD]);
						break;
					case 1:		//	?set_pw
						return NC.help("펩시콜라에 찬양일색인 내용으로 비밀번호를 짓고자 하면", "!set_pw 펩시콜라마시쩡", player, "!clear_pw");
				}
			}
			comSetScore(player, msg, type){				/* 점수 변경 */
				switch(type){
					case 0:			//	!score
						if(!AMN.findAdmin(player)) return NC.acess(player);
						return AMN.limitScore(msg.length > 0 ? parseInt(msg[0]) : null, player);
					case 1:			//	?score
						return NC.help("경기를 5점 내기로 진행하려면", "!score 5", player); 
				}
			}
			comSetSleep(player, msg, type){				/* 장기 무응답 플레이어 설정 */
				switch(type){
					case 0:		//	!afk
						return PM.enableSleepMode(player, !PM.findPlayerById(player)._isSleep);
					case 1:		//	?afk
						if(PM.findPlayerById(player)._isSleep) return NC.help("자리에 돌아와서 게임에 다시 참여하려면", "!afk", player, "!join");
						return NC.help("게임 도중 자리를 비우려면", "!afk", player, "!join spec");
				}
			}
			comSetTime(player, msg, type){				/* 시간 변경 */
				switch(type){
					case 0:			//	!time
						if(!AMN.findAdmin(player)) return NC.acess(player);
						return AMN.limitTime(msg.length > 0 ? parseInt(msg[0]) : null, player);
					case 1:			//	?time
						return NC.help("경기를 5분 내기로 진행하려면", "!time 5", player);
				}
			}
			comShowPassword(player, msg, type){			/* 비밀번호 조회 */
				switch(type){
					case 0:			//	!show_pw
						return AMN.findAdmin(player) > 0 ? AMN.showPassword(player) : NC.acess(player);
					case 1:			//	?show_pw
						return NC.help("현재 설정된 비밀번호를 조회하려면", "!show_pw", player, "?clear_pw");
				}
			}
			comSleepList(player, msg, type){			/* 장기 대기열 명단 조회 명령어 */
				switch(type){
					case 0:		//	!afk_list
						return PM.showSleepList(player);
					case 1:		//	?afk_list
						break;
				}
			}
			comSwapGame(player, msg, type){				/* 게임 자동 시작 및 종료 명령어 */
				switch(type){
					case 0:			//	!r
						if(!AMN.findAdmin(player)) return NC.acess(player);
						return AMN.swapGame(player);
					case 1:			//	?r
						return NC.help("게임을 시작하거나 종료하려면 ", "!r", player, "!rr");
				}
			}
			comUnfreezeChat(player, msg, type){			/* 채팅 녹이기 */
				switch(type){
					case 0:			//	!unfreeze
						if(!AMN.findAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						if(!CS.isFreezeChat) return NC.caution("채팅창이 이미 녹아있습니다.", player, "!unmute #ID");
						return CS.unfreezeChat(player);
					case 1:			//	?unfreeze
						return NC.help("채팅창을 녹이려면", "!unfreeze", player);
				}
			}
			comUnmute(player, msg, type){				/* 채팅 허용 */
				switch(type){
					case 0:			//	!unmute
						if(!AMN.findAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						if(msg == "all") return AMN.clearMutedList(player);		//	영구 퇴장 목록 초기화
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(PM.isValid(target)){
							if(!PM.findPlayerById(target)._isMute)				//	채금자가 아닐 경우
								return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅은 이미 허용돼 있습니다.", player);
							return AMN.unmutePlayer(target, player);
						}
					case 1:			//	?unmute
						return NC.help("공용 ID가 12인 채금자의 채팅을 허용하려면", "!unmute #12", player);
				}
			}

			helpBot(player, msg, type){					/* 서버 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("시스템", [
					["!about(정보)", "!admin_list(관리자 명단)"],
					["!kick #ID(강제 퇴장)", "!r(시작/종료)", "!rr(재시작)", "!show_pw(비번 표시)", "!set_pw(비번 설정)", "!clear_pw(비번 해제)", "!clear_bans(영구 퇴장 초기화)", "!recaptcha(reCAPTCHA 설정)"]
				], player);
			}
			helpChat(player, msg, type){				/* 채팅 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("채팅", [
					["!e #ID(개인)", "!t(팀별)", "!a(전체)", "!chatmode(기본 채팅 모드)", "!disturb on/off(수신)", "!mute_list(채팅 금지 명단)"],
					["!freeze/unfreeze(채팅 녹이기/얼리기)", "!mute/unmute #ID(채팅 금지/허용)", "!unmute #ID(채팅 허용)", "!lock_private(귓속말 채팅 금지/허용)", "!도(도배 방지 문자)"]
				], player);
			}
			helpCom(player, msg, type){					/* 명령어 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("일반", [
					["!bothelp(시스템)", "!chathelp(채팅)", "!joinhelp(참가)", "!maphelp(맵)", "!rankhelp(랭킹)", "!scorehelp(점수)"]
				], player);
			}
			helpJoin(player, msg, type){ 				/* 참가 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("투입", [
					["!join(자동 참가)", "!afk(잠수)", "!afk_list(대기열 명단)"],
					["!lock_join(투입 제한)"]
				], player);
			}
			helpMap(player, msg, type){					/* 맵 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("맵", [
					["/checksum(정보) | /store(저장)", "!map_list(맵 목록)"],
					["!load ID(불러오기)"]
				], player);
			}
			helpMisc(player, msg, type){				/* 기타 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("기타", [
					["!avatar(등번호 변경)", "!uniform(유니폼 변경)", "!clear_avatar(등번호 초기화)", "!clear_uniform(유니폼 초기화)"]
				], player);
			}
			helpRank(player, msg, type){	 			/* 랭크 도움말 */
				if(type != 0) return;
				return CS.showHelpCommandList("랭크", [
					["!stats #ID(전적)", "!ranking n(순위/n등 랭킹)"],
					["!score(점수 변경)", "!time(시간 변경)"]
				], player);
			}
			helpScore(player, msg, type){				/* 점수 도움말 */
				if(type != 0) return;
				return NC.uniMsg(c_LIST_ICON.NORMAL + "점수 부여 항목",
				["득: %d", "실: %d", "승: %d", "패: %d", "도움 %d"].join(" | "),
				player, "!ranking", 0, [c_SCORE_TYPE.GOAL, c_SCORE_TYPE.OWNGOAL, c_SCORE_TYPE.WIN,  c_SCORE_TYPE.LOST, c_SCORE_TYPE.ASSIST]);
			}

			infoLink(player, msg, type){				/* 방 주소 조회 명령어 */
				switch(type){
					case 0:		//	!link
						return NC.uniMsg(c_LIST_ICON.NORMAL + "방 주소", GM._gameLink, player, "!about");
					case 1:		//	?link
						return CM.infoRoom(player, msg, 0);
				}
			}
			infoMaps(player, msg, type){				/* 맵 정보 */
				switch(type){
					case 0:			//	!maplist
						let size = (customStadiumList.length > 0 ? customStadiumList : defaultStadiumList).length;
						let target = parseInt(msg[0]);
						if(!SYS.hasInRange(target, 1, size)) return CM.infoMaps(player, msg, 1);
						let searchTarget = target > 2 ? size - target > 2 ? target - 3 : size - 5 : 0;
						let nameList = GM.findStadiumNameList().slice(searchTarget, searchTarget + 5);
						let list = new Array();
						for(let i = 0; i < nameList.length; i++){
							let name = nameList[i];
							let index = searchTarget + i + 1;
							//	타깃 인덱스이면 표시
							list.push((index == target ? '▶' : '▷') + '[' + SYS.fillLine(index, Math.floor(Math.log10(size) + 1)) + ']' + ' | ' + name);
						}
						let page = (size < 2 ? '' : ": " + target + '/' + size);
						NC.uniMsg(c_LIST_ICON.NORMAL + "맵 목록" + page, list.join(newLine), player, (AMN.findAdmin(player) > 0 && customStadiumList.length > 0 ? ("!load " + target) : "?maplist"));
						break;
					case 1:			//	?maplist
						return NC.help("42번 내장 맵이 포함된 맵 목록을 보려면", "!cm 42", player, "!load ID");
				}
			}
			infoRanking(player, msg, type){				/* 랭킹 정보 */
				switch(type){
					case 0:		//	!ranking
						let getTarget = function(s, p){
							if(s == -1) return p;
							let n = msg.length > 0 ? msg[0] : '';
							if(n.includes('\#')) return GM.checkPublicId(n);			//	#ID로 검색
							if(SYS.hasInRange(n, 1, SC._rankList.length)) return SC.findRankListByGrade(n - 1)._id;					//	등수로 검색
							NC.caution("검색할 등수는 범위를 벗어났습니다. 현재 총 %d명의 데이터베이스가 등록돼 있으며, 여기서 중복 계정은 제외되었습니다.", p._id, null, SC._rankList.length);
							return p;	//	기본값(플레이어)
						}
						let target = getTarget(msg, player);
						return SC.sendRanking(target, player);				//	플레이어 랭킹 확인
					case 1:		//	?ranking
						return NC.uniMsg(c_LIST_ICON.NORMAL + "랭킹 측정 방식", 
						"모든 전적의 총점수를 계산하여 순위를 매깁니다."
						+ newLine + "여기서 동점자가 나올 경우, 공용 ID의 오름차순으로 순위를 결정합니다.",
						player, "!scorehelp");
				}
			}
			infoRoom(player, msg, type){				/* 서버 정보 */
				switch(type){
					case 0:				//	!about
						return NC.info("시스템", DESCRIPTION
						+ newLine + "릴리스 날짜: " + SYS._releaseDate		//	릴리스 및 업데이트 날짜
						+ ' | ' + SYS.showInfo(),							//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
						null, "!link");
					case 1:				//	?about
						return CM.infoLink(player, msg, 0);
				}
			}
			infoStats(player, msg, type){				/* 점수 정보 */
				switch(type){
					case 0:		//	!stats
						let getTarget = function(s, p){
							if(s == -1) return p;
							let n = msg.length > 0 ? msg[0] : '';
							let t = GM.checkPublicId(n, p, true);
							return t == false || SC.findRankListByPlayer(t) == undefined ? p : t;
						}
						let target = getTarget(msg, player);
						//	닉네임, ID, 전적 출력
						NC.info("플레이어 전적", SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC)
						+ newLine + SC.findRankListByPlayer(player).record, player, "!ranking");
						break;
					case 1:		//	?stats == !helpscore
						return CM.helpScore(player);
				}
			}

			joinPlayer(player, msg){					/* 플레이어 투입 */
				if(AMN.isAllowJoin == true && AMN.findAdmin(player) == false) return NC.acess(player, "팀 자율 이동이 금지돼 있어 사용할 수 없습니다.");
				let team = msg.length > 0 ? msg[0] : (PM.findPlayerById(player)._team == c_TEAM.SPECTATOR || PM.findPlayerById(player)._team == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
				let target = msg.length > 1 ? msg[1] : null;
				let index = target != null && AMN.findAdmin(player) ? GM.checkPublicId(target, player) : player;
				if(AMN.findAdmin(player)){
					if(team == "lock" || team == "락")
						return this.comAllowJoin(player, msg, 0);
				}
				let getTargetTeam = function(target, byPlayer){
					switch(target){
						case c_TEAM.SPECTATOR:	case "spectator": case "spect": case "spec": case "spct": case 's': case "스펙": case "관전": case "관": case "스":
							return c_TEAM.SPECTATOR;
						case c_TEAM.RED:			case "red": case 'r': case "레드": case "레":
							return c_TEAM.RED;
						case c_TEAM.BLUE:			case "blue": case 'b': case "블루": case "블":
							return c_TEAM.BLUE;
						default: 
							if(byPlayer == c_TEAM.SPECTATOR) return (PM.cntPlayers(c_TEAM.RED) <= PM.cntPlayers(c_TEAM.BLUE) ? c_TEAM.RED : c_TEAM.BLUE);
							return (byPlayer == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
					}
				}
				if(!PM.isValid(index)) return NC.help("공용 ID가 42인 플레이어를 블루팀으로 옮기려면", "!join blue #42", player);
				if(AMN.isAllowJoin == true && PM.isValid(player) == false) return NC.acess(index, "팀 자율 이동이 금지되었습니다.");		//	팀 이동 금지 처리
				let targetTeam = getTargetTeam(team, PM.findPlayerById(player)._team);
				if(PM.findPlayerById(index)._team == targetTeam) return NC.caution("중복된 명령어입니다.", (player ? player : index));
				if(PM.findPlayerById(index)._isSleep) return NC.caution("게임 참여 의사가 없어 플레이할 수 없습니다. ", (player ? player : index), "!afk");
				PM.moveTeam(index, targetTeam);
			}
			loadMap(player, msg, type){					/* 맵 불러오기 */
				let size = (customStadiumList.length > 0 ? customStadiumList : defaultStadiumList).length;
				let target = parseInt(msg[0]);
				switch(type){
					case 0:			//	!load
						if(!AMN.findAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						return GM.loadMap((SYS.hasInRange(target, 1, size) ? target - 1: 0), player);
					case 1:			//	?load
						if(size < 2)
							return NC.help("내장 맵을 불러오려면", "!load 1", player);
						if(SYS.hasInRange(target - 1, 0, size))
							return NC.uniMsg(null, "[%d] | %d", player, null, 0, [SYS.fillLine(target, Math.floor(Math.log10(size) + 1)), GM.findStadiumNameList(target - 1)]);
						let index = Math.floor(Math.random() * size) + 1;
						return NC.help("예를 들어 %d번째 내장 맵을 불러오려면", "!load " + index, player, "!maplist n", index);
				}
			}
		}
		/*** 플레이어 매니저 클래스 ***/
		class PlayerManager{
			constructor(){
				this._playerList		= new Array();			/* 플레이어 데이터베이스 */
			}
			onPlayerActivity(player){				/* 플레이어 응답 이벤트 */
				this.updateTime(player.id);		//	마지막 활동 시간 저장
			}
			onPlayerInactivity(player){				/* 플레이어 무응답 이벤트 */
				if(SYS._isDemo) return;		//	데모 모드 기능 제한
				AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE + "비활동 플레이어");
			}
			onPlayerTeamChange(player, byPlayer){	/* 팀 교체 이벤트 */
				if(player.id == 0){
					if(AMN._pinHost == true && player.team != 0) PM.moveTeam(0, c_TEAM.SPECTATOR);
					return;
				}
				if(this.findPlayerById(player.id)._isSleep == true && player.team != 0){
					PM.moveTeam(player.id, 0);					//	장기 대기열 플레이어일 경우 관전석으로 이동
					if(PM.isValid(byPlayer)){ 
						PM.updateTime(byPlayer.id);
						if(byPlayer.id == player.id) return NC.notice("게임에 참가하려면 대기 상태를 해제하세요.", byPlayer.id, "!afk");
						return NC.notice(SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC) + "님은 자리를 비운 상태입니다.", byPlayer.id);
					}
				}
				SYS.clearListIndex(player.id);
				PM.updateTime(player.id);						//	투입 시간 저장
				PM.modifyPlayerById(player.id, "team", player.team);
				SYS.addListIndex(player.id);
			}

			initPlayerList(player){					/* 플레이어 데이터베이스 초기화 */
				SC.initRankList(player.id);			//	전적 데이터베이스 초기화
				CS.initPlayerList(player.id);			//	채팅 데이터베이스 초기화
				return this._playerList.push(new PlayerSystem(
					player.id,
					player.name,
					player.team,
					player.admin,
					player.conn,
					player.auth
				));
			}

			isAfkPlayer(player){			/* 장기 무응답 플레이어 확인 */
				return this.findPlayerById(player).isAfk();
			}
			isValid(target){ 				/* 유효 플레이어 확인 */
				if(this.cntPlayers("public") < 1) return false;
				if(typeof target == "number") return SYS.hasInRange(target, 1, this.cntPlayers("public"));
				if(target == undefined || target == null) return false;
				return SYS.hasInRange(target[(target.hasOwnProperty("_id") ? '_' : '') + "id"], 1, this.cntPlayers("public"));
			}
			findTagGrade(player){			/* 플레이어 권한 마크 구하기 */
				if(!this.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				switch(AMN.findAdmin(player)){
					case 1:	return c_TAG_GRADE[2];							//	보조 권한
					case 2:	return c_TAG_GRADE[1];							//	최고 권한
				}
				return c_TAG_GRADE[(AMN.isBlacklist(player, false) ? 4 : 3)];		//	블랙리스트에 해당되면 4, 아닐 경우 3을 반환
			}
			findLocalId(publicId){			/* 플레이어 개인 ID 구하기 */
				if(!PM.isValid(publicId)) return false;
				return this.findPlayerById(publicId).localId;
			}
			findPlayerList(isPublic){		/* 플레이어 데이터베이스 명단 구하기 */
				if(isPublic == true) return this._playerList;
				return this._playerList.filter(p => p.localId > 0);
			}
			findPlayerById(target){			/* 플레이어 데이터베이스 구하기 */
				return this._playerList.find(p => p._id == target);
			}
			findTagTeam(team){				/* 팀 마크 구하기 */
				return c_TAG_TEAM[team];
			}

			addSleepPlayer(player){		/* 장기 대기열 플레이어 추가 */
				this.findPlayerById(player).addSleepList();
			}

			updateAccount(player){								/* 중복 계정 갱신 */
				let getTarget = t => this._playerList.find(p => p._id != t && p._network == this.findPlayerById(t)._network);
				if(PM.isValid(getTarget(player))){			//	공용 네트워크가 일치한 경우 갱신
					let op = this.findPlayerById(player);
					let np = getTarget(player);
					let restoreProp = function(...pr){
						let target = getTarget(player);
						switch(pr.length){
							case 2:
								PM.modifyPlayerById(target._id, pr[0], pr[1]);
								break;
							case 1:
								let temp = pr;
								target = temp;
								break;
							default:
								return;
						}
					}	
					restoreProp(op);
					SC.updateAccount(op._id, np._id);
					restoreProp("id",		np._id);
					restoreProp("name",		np._name);
					restoreProp("team",		np._team);
					restoreProp("time",		TS.time);
					restoreProp("detector", np._detector);
					restoreProp("isSleep",	np._isSleep);
					switch(AMN.findAdmin(op._id)){
						case 2:
							if(AMN.cntAdmins(2) < 1){	//	최고 권한을 가진 접속자가 이미 있는 경우, 보조 권한 부여
								AMN.giveAdmin(np._id);
								break;
							}
						case 1:
							//AMN.giveSubAdmin(np._id);
							break;
					}
					return true;
				}
				return false;
			}
			updateTime(player){									/* 응답 시간 갱신 */
				if(this.isValid(player) == false || this.findLocalId(player) == false) return;
				this.modifyPlayerById(player, "time", TS.time);
				//	이전 타이머 지우고 새로 갱신
				TS.clearTimerByName("afkAvatar", player);
				TS.clearTimerByName("afkTimer", player);
				TS.clearTimerByName("afkCheck", player);
				if(GM.afkTime == false) return;
				//	장기 무응답 플레이어 판정
				let afkChckTimer = TS.addTimer("afkCheck", () => {
					if(PM.isAfkPlayer(afkChckTimer._player)) return;
					let avatarTimer = TS.addTimer("afkAvatar", () => {		//	등번호 알림
						let tmList = avatarTimer.findTimerByName();
						if(!tmList.length) return;
						let target = tmList.at(-1);
						switch(avatarTimer.calcCurrentSequence(target._sequence, 2)){
							case 0:
								room.setPlayerAvatar(avatarTimer._player, "잠수");
								break;
							case 1:
								room.setPlayerAvatar(avatarTimer._player);
								break;
						}
					}, afkChckTimer._player, SEC_TO_MS, true);
				}, player, GM.afkTime * SEC_TO_MS);
			}
			updateUniform(team, angle, textColor, bgColor){		/* 팀 유니폼 지정 */
				room.setTeamColors(team, angle, textColor, bgColor);
			}

			clearPlayerById(player){			/* 플레이어 데이터베이스 지우기 */
				return this.findPlayerById(player).clearPlayer();
			}
			clearUniform(team){					/* 팀 유니폼 초기화 */
				this.updateUniform(team, 0, 0xFFFFFF, [(team == c_TEAM.RED ? 0xE46E4C : 0x5688E4)]);
			}
			deleteSleepPlayer(player){			/* 장기 대기열 플레이어 제거 */
				this.findPlayerById(player).deleteSleepPlayer();
			}
			resetAvatar(player){				/* 등번호 초기화 */
				this.findPlayerById(player).resetAvatar();
			}
			
			showMutedList(player, isPublic){	/* 채팅 금지 명단 출력 */
				let getMsg = function(pub){
					if(CS.isFreezeChat) return "현재 채팅창이 얼려져 있습니다";
					let mutes = AMN.findMutedList(pub);
					return mutes.length > 0 ? mutes.map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ") : "비어 있음";
				}
				NC.uniMsg(c_LIST_ICON.NORMAL + "채팅 금지 명단", getMsg(isPublic), player);
			}
			showSleepList(player, isPublic){	/* 장기 대기열 명단 출력 */
				let getAfks = function(pub){
					return PM._playerList.filter(p => {
						if(!p._isSleep) return false;
						if(pub == true) return true;
						return (p.localId > 0);
					});
				}
				let afkList = getAfks(isPublic);
				let msg = afkList.length > 0 ? afkList.map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ") : "비어 있음";
				NC.uniMsg(c_LIST_ICON.NORMAL + "장기 대기열 명단", msg, player);
			}

			cntPlayers(team){						/* 접속자 인원 구하기 */
				let pl = room.getPlayerList().filter(p => p.id != 0);
				switch(team){
					case "public":
						return this._playerList.length;							//	전체 데이터베이스
					case c_TEAM.RED:	case c_TEAM.BLUE:	case c_TEAM.SPECTATOR:	//	팀별 접속자
						return pl.filter(p => p.team == team).length;
					default:												//	모든 접속자
						return pl.length;
				}
			}
			enableSleepMode(player, bool){			/* 장기 대기열 플레이어 설정 */
				bool ? this.addSleepPlayer(player) : this.deleteSleepPlayer(player);
				SYS.updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				if(AMN.findAdmin(player) != 2 && AMN.cntAdmins(2) > 1) return;
				this.findPlayerList().forEach(p => {
					if(p._isSleep == false) AMN.updateAdmins();
				});
			}
			giveAvatar(player, msg){				/* 등번호 설정 */
				this.findPlayerById(player).giveAvatar(msg);
			}
			modifyPlayerById(player, prop, value){	/* 플레이어 데이터베이스 수정 */
				let target = this.findPlayerById(player);
				if(target == undefined) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				if(target.hasOwnProperty('_' + prop) == false) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
				target['_' + prop] = value;
			}
			moveTeam(player, team){					/* 팀 지정 */
				switch(team){
					case c_TEAM.SPECTATOR: case c_TEAM.RED: case c_TEAM.BLUE:
								return room.setPlayerTeam(player, team);
					default:	return SYS.sendError(c_ERROR_TYPE.E_ETC);		//	팀으로 판정된 값이 아닌 경우 오류 출력
				}
			}
		}
		/*** 플레이어 시스템 클래스 ***/
		class PlayerSystem{
			constructor(id, name, team, admin, conn, auth){
				Object.freeze(this._id		= id);
				Object.freeze(this._name	= name);
				Object.freeze(this._address	= conn);
				Object.freeze(this._network	= auth);
				this._team			= team;
				this._admin			= admin;
				this._time			= TS.time;
				this._chatmode		= 0;
				this._detector		= 0;
				this._isDisturb		= true;
				this._isMute		= false;
				this._isSleep		= false;
				this._hasKicked		= false;
			}
			get chatmode(){			/* 기본 채팅 모드 */
				return this._chatmode;
			}
			get discProp(){			/* 플레이어 객체 속성 */
				return room.getPlayerDiscProperties(this._id);
			}
			get dpPosition(){		/* 좌표 */
				return ({
					'x' : this.discProp.x,
					'y' : this.discProp.y
				});
			}
			get dpGravityVector(){	/* 중력 벡터 */
				return ({
					'x' : this.discProp.xgravity,
					'y' : this.discProp.ygravity
				});
			}
			get dpSpeedVector(){	/* 속도 벡터 */
				return ({
					'x' : this.discProp.xspeed,
					'y' : this.discProp.yspeed
				});
			}
			get isDisturb(){		/* 채팅 수신 모드 */
				return this._isDisturb;
			}
			get localId(){			/* 개인 ID */
				let pl = room.getPlayerList().filter(p => p.id != 0);
				return pl.indexOf(pl.find(p => p.id == this._id)) + 1;
			}

			set chatmode(value){	/* 채팅 모드 설정 */
				let titleList = ["전체", "팀"];
				this._chatmode = value;
				NC.notice("채팅 기본 모드가 " + titleList[value] + " 채팅으로 변경되었습니다.", this._id);
			}
			set isDisturb(value){	/* 채팅 수신 설정 */
				switch(value){
					case 0:
						NC.notice("채팅 수신이 금지되었습니다. 따라서 귓속말 기능을 사용할 수 없습니다.", this._id);
						break;
					case 1:
						NC.notice("채팅 수신이 허용되었습니다.", this._id);
						break;
					default: return;	
				}
				this._isDisturb = value;
			}
			set discProp(value){	/* 플레이어 객체 속성 구하기 */
				room.setPlayerDiscProperties(this._id, value);
			}

			isAfk(){				/* 비활동 플레이어 감지 */
				let maxTime = GM.afkTime;
				let hasValidTime = function(limit){
					if(!SYS.hasInRange(maxTime, 5, 60 * 60 * 3)) return false;		/* 범위 내 값이면 판정 생략 */
					if(!target.localId) return false;								/* 미접속자인 경우 */
					/* 경기 도중 관전이면 처리 중단 */
					if(GM._gameStats == c_GAME_STATS.TICK && target._team == c_TEAM.SPECTATOR) return true;
					/* 경기 미진행 상태에서 관리자가 아닌 경우 처리 중단 */
					if(GM._gameStats != c_GAME_STATS.TICK && target._admin < 1) return true;
					/* 장기 대기열 명단에 포함되면 처리 중단 */
					if(target._isSleep == true) return true;
					return (TS.time - target._time < limit * SEC_TO_MS);
				}
				let target = this;
				if(hasValidTime(maxTime)) return false;
				PM.findPlayerList().forEach(p => {		/* 경고 메시지 출력 */
					if(p._id == target._id)
						return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 알림",
						"반응이 없으면 퇴장될 수 있습니다",
						p._id, (p._team == c_TEAM.SPECTATOR ? "!afk" : "!join spec"), c_LIST_COLOR.GRAY);
					if(p._admin < target._admin) return;
					if(p._team == c_TEAM.SPECTATOR || p._team == target._team)
						return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 안내",
						"%d님의 반응이 없는 경우, 자동으로 퇴장됩니다",
						p._id, `!join spec #${p._id}`, c_LIST_COLOR.GRAY, null, 0, target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
				});
				let afkTimer = TS.addTimer("afkTimer", () => {	/* 퇴장 처리 */
					if(hasValidTime(maxTime)) return;			/* 이미 응답한 경우 */
					if(PM.findPlayerList().find(p => p._id == afkTimer._player) == undefined) return;	//	퇴장한 경우
					PM.onPlayerInactivity(afkTimer._player);
				}, target._id, maxTime / 2 * SEC_TO_MS);
				return true;
			}

			addSleepList(){			/* 장기 대기열 명단 추가 */
				this._isSleep = true;
				if(this._team != c_TEAM.SPECTATOR) PM.moveTeam(this._id, c_TEAM.SPECTATOR);
				AMN.deleteAdmin(this._id);	/* 최고 권한 → 보조 권한으로 격하 */
				AMN.updateAdmins();
				NC.notice(this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME) + "님이 자리를 비웠습니다.", this._id * -1);
				NC.uniMsg(c_LIST_ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", this._id, "!afk");
				SYS.log(true, "대기열 추가: " + this.showPlayerInfo(), c_LOG_TYPE.NOTICE);
			}

			clearPlayer(){			/* 플레이어 데이터베이스 지우기 */
				SYS.clearListIndex(this._id);				/* 리스트 지우기 */
				SC.clearTouchedPlayer(this._id);			/* 선두자 데이터베이스 지우기 */
				TS.clearTimerByPlayer(this._id);			/* 타이머 지우기 */
				this._team			= c_TEAM.SPECTATOR;
				this._time			= TS.time;
				this._chatmode		= 0;
				this._isDisturb		= true;
				this._isSleep		= false;
				if(this._hasKicked){
					this._admin		= 0;
					this._hasKicked	= false;
				}
				PM.findPlayerList().forEach(p => SYS.updateListIndex(p._id));
			}
			deleteSleepPlayer(){	/* 장기 대기열 명단 제거 */
				this._isSleep = false;
				SYS.log(true, "대기열 제거: " + this.showPlayerInfo(), c_LOG_TYPE.NOTICE);
				AMN.updateAdmins();
				NC.notice("게임에 바로 참여할 준비가 되었습니다! ", this._id, "!join");
			}
			resetAvatar(){			/* 등번호 초기화 */
				this.giveAvatar();
			}

			showPlayerInfo(type){	/* 플레이어 정보 출력 */
				let name = (CS.isWhiteSpace(this._name) ? "공백" : this._name);
				switch(type){
					case c_PLAYERINFO_TYPE.LOCAL:
						return ('(' + ((PM.cntPlayers() >= 10) ? SYS.fillLine(this.localId, 2) : this.localId) + ')' + name);
					case c_PLAYERINFO_TYPE.PUBLIC:
						return ('(' + '#' + this._id + ')' + name);
					case c_PLAYERINFO_TYPE.NAME:
						return name;
					default:
						return (this._id + '(' + ((PM.cntPlayers() >= 10) ? SYS.fillLine(this.localId, 2) : this.localId) + ')' + name);
				}
			}
			
			adjustGravityVector(x, y){	/* 플레이어 중력 벡터 변경 */
				this.discProp = {"xgravity" : x, "ygravity" : y };
			}
			adjustSpeedVector(x, y){	/* 플레이어 속도 벡터 변경 */
				this.discProp = {"xspeed" : x, "yspeed" : y };
			}
			giveAvatar(str){			/* 등번호 지정 */
				room.setPlayerAvatar(this._id, str);
			}
			movePosition(dx, dy){		/* 플레이어 좌표 이동(상대 좌표) */
				this.discProp = {'x' : this.dpPosition.x + dx, 'y' : this.dpPosition.y + dy};
			}
			teleportPosition(x, y){		/* 플레이어 좌표 변경(절대 좌표) */
				this.discProp = {'x' : x, 'y' : y};
			}
		}
		/*** 점수 클래스 ***/
		class ScoreManager{
			constructor(){
				this._collisionRange	= 1.25;				//	충돌 범위 민감도(민감도 값이 1 미만이면 1로 계산)
				this._totalGoals		= {
					[c_TEAM.RED] : 0,
					[c_TEAM.BLUE] : 0
				};
				this._touchedList		= new Array();		//	선두자 데이터베이스
				this._rankList			= new Array();		//	전적 데이터베이스
			}
			onPlayerTeamChange(player, byPlayer){	/* 팀 교체 이벤트 */
				if(!PM.findLocalId(player.id)) return;	//	미접속이면
				let target = this._touchedList.filter(t => t._id == player.id);
				if(target.length > 0) this.clearTouchedPlayer(player.id);
			}
			onPositionsReset(){						/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */
				this.clearTouchedList();		//	선두자 명단 모두 지우기
			}

			initRankList(player){			/* 전적 명단 초기화 */
				return this._rankList.push(new StatusManager(player));
			}
			initTouchedList(player){		/* 선두자 전적 데이터베이스 초기화 */
				return this._touchedList.unshift(new TouchedPlayer(player));
			}

			get cFlags(){				/* 충돌 플래그 */
				return room.collisionFlags;
			}
			get gameTime(){				/* 경기 시간 */
				return this.scores.time;
			}
			get lastTouchedPlayer(){	/* 최근 선두자 */
				return this._touchedList.length == 0 ? null : this._touchedList[0];
			}
			get limitScore(){			/* 경기 제한 점수 */
				return !this.scores ? 0 : this.scores.scoreLimit;
			}
			get limitTime(){			/* 경기 제한 시간*/
				return !this.scores ? 0 : this.scores.timeLimit;
			}
			get scores(){				/* 점수 데이터베이스 */
				return room.getScores();
			}
			get totalRedGoals(){		/* 레드팀 누적 골 */
				return this._totalGoals[c_TEAM.RED];
			}
			get totalBlueGoals(){		/* 블루팀 누적 골 */
				return this._totalGoals[c_TEAM.BLUE];
			}

			set totalRedGoals(v){		/* 레드팀 누적 골 */
				this._totalGoals[c_TEAM.RED] = v;
			}
			set totalBlueGoals(v){		/* 블루팀 누적 골 */
				this._totalGoals[c_TEAM.BLUE] = v;
			}

			hasCommonRange(ball, player, range){		/* 충돌 여부 판정 */
				let d = this.findDiscProp(ball);							//	디스크 속성
				let t = PM.findPlayerById(player).discProp;			//	플레이어 속성
				if(d == null || t == null) return -1;			//	객체를 구할 수 없는 경우
				let r = range >= 1 ? range : this._collisionRange;	//	판정 범위
				//	공(D)과 플레이어(T) 사이의 충돌 판정 == (Dx-Tx)^2+(Dy-Ty)^2 <= (Dr+Tr)^2
				return (this.calcDistance(d, t) <= Math.pow(Math.round((d.radius + t.radius) * r), 2));
			}
			findAssist(target){						/* 득점자 인식률 조정 및 어시스트 구하기 */
				//let tl = this._touchedList.length > 5 ? this._touchedList.slice(0, 5) : this._touchedList;
				let tl = SC._touchedList.slice(0, this._touchedList.length > 5 ? 5 : this._touchedList.length);
				if(tl.length < 2) return false;			//		선두자 명단이 한 명이면 어시스트를 계산하지 않음
				if(!PM.isValid(target._id)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				if(PM.cntPlayers(target._team) < 2) return false;		//	팀원이 2명 이상이면 처리
				return tl.find(tp => target._team == tp._team && tp._id != target._id);
			}

			findRankListByPlayer(target){			/* 전적 명단 플레이어로 찾기 */
				return this._rankList.find(r => r._id == target);
			}
			findRankListByGrade(grade){				/* 전적 명단 순위로 찾기 */
				return this._rankList.sort((a, b) => b.scores - a.scores).at(grade);
			}
			findTouchedListByPlayer(target){		/* 선두자 명단 플레이어로 찾기  */
				return this._touchedList.find(p => p._id == target);
			}
			findWinner(scores){						/* 승리 팀 판정 */
				if(scores.red > scores.blue) return c_TEAM.RED; 	//	레드팀 승
				if(scores.red < scores.blue) return c_TEAM.BLUE; 	//	블루팀 승
				return 3;										//	무승부
			}

			addTouchedList(player){					/* 선두자 명단 추가 */
				let hasNull = (this._touchedList.length == 0);
				let oldLtPlayer = this.lastTouchedPlayer;
				if(oldLtPlayer != null)
					this.clearTouchedPlayer(oldLtPlayer._id);
				this.initTouchedList(player);	//	0번째 요소로 초기화
				SYS.updateListIndex(player);
				if(hasNull){
					let ltTimer = TS.addTimer("lastTouchedPlayer", () => {
						let nowLtPlayer = this.lastTouchedPlayer;
						if(nowLtPlayer == null) return;
						switch(nowLtPlayer._id){
							case player:
								if(this.hasCommonRange(0, player)){	//	계속 선두하고 있으면
									TS.clearTimer(ltTimer._id);	//	타이머 종료
									break;
								}
							default:
								this.clearTouchedPlayer(player);
						}
					}, player, 5 * SEC_TO_MS);
					if(this._touchedList.length > 1)	//	데이터베이스 갱신
						SYS.updateListIndex(this._touchedList[1]._id);
				}
				return !hasNull;
			}

			updateAccount(op, np){			/* 전적 동기화 */
				let oldPlayer = this.findRankListByPlayer(op);
				if(!PM.isValid(oldPlayer)) return false;
				let target = this._rankList.map(r => r._id).indexOf(np);
				if(SYS.hasInRange(target + 1, 1, this._rankList.length)) this._rankList.splice(target, 1);
				return true;
			}
			updateGoals(team){				/* 득점 골 갱신 */
				if(GM._gameStats == c_GAME_STATS.STOP) return false;
				switch(team){
					case c_TEAM.RED:	this.totalRedGoals++;	break;
					case c_TEAM.BLUE:	this.totalBlueGoals++;	break;
				}
				return true;
			}
			updateTouchedList(target){		/* 선두자 갱신 */
				if(this.hasCommonRange(0, target)){
					if(this._touchedList[0] != null && this._touchedList[0]._id == target) return;
					this.addTouchedList(target);
				}
			}
			
			clearRankList(player){			/* 전적 명단 지우기 */
				return initRankList(player);
			}
			clearTouchedList(){				/* 선두자 명단 지우기 */
				this._touchedList.forEach(t => this.clearTouchedPlayer(t._id));
			}
			clearTouchedPlayer(player){		/* 특정 플레이어의 선두자 명단 지우기 */
				let tl = this._touchedList;
				let target = tl.find(t => t._id == player);
				if(target == undefined) return;
				tl.splice(tl.indexOf(target), 1);
				SYS.updateListIndex(target._id);
			}

			sendRanking(target, player){	/* 전적 메시지 보내기 */
				if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				let findTarget = function(p){
					let rp = SC.findRankListByPlayer(p._id);
					if(PM.isValid(rp)) return rp;
					return PM.findPlayerList(true).filter(r => r._network == p._network).map(r => SC.findRankListByPlayer(r._id)).at(-1);
				}
				let tp = findTarget(PM.findPlayerById(PM.isValid(target) ? target : player));
				NC.info("플레이어 순위", tp.records.join(newLine), player, `!stats #${tp._id}`);
			}

			calcDistance(a, b){						/* 두 객체 간 거리 구하기 */
				return (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2));
			}
			calcGoalsByTeam(team){					/* 경기 득점 골 구하기 */
				if(!this.scores) return null;
				return team == c_TEAM.RED ? this.scores.red : this.scores.blue;
			}
			calcGravityVector(target){				/* 중력 벡터 구하기 */
				return ({
					'x' : this.findDiscProp(target).xgravity,
					'y' : this.findDiscProp(target).ygravity
				});
			}
			calcPosition(target){					/* 좌표 구하기 */
				return ({
					'x' : this.findDiscProp(target).x,
					'y' : this.findDiscProp(target).y
				});
			}
			calcSpeedVector(target){				/* 속도 벡터 구하기 */
				return ({
					'x' : this.findDiscProp(target).xspeed,
					'y' : this.findDiscProp(target).yspeed
				});
			}
			calcTotalGoalsByTeam(team){				/* 득점 누적 골 구하기 */
				return this._totalGoals[team];
			}
			findDiscProp(target){					/* 디스크 객체 구하기 */
				return room.getDiscProperties(target);
			}
		}
		/*** 전적 매니저 클래스 ***/
		class StatusManager{
			constructor(id){
				Object.freeze(this._id	= id);
				this._win		= 0;	/* 승리한 경기 수 */
				this._lost		= 0;	/* 패배한 경기 수 */
				this._goal		= 0;	/* 득점 골 수 */
				this._ownGoal	= 0;	/* 실점 골 수 */
				this._assist	= 0;	/* 도움 횟수 */
			}
			get grade(){				/* 플레이어 순위 */
				return SC._rankList.indexOf(SC._rankList.find(rl => rl._id == this._id));
			}
			get scores(){				/* 플레이어 점수 계산 */
				return (this._win	* c_SCORE_TYPE.WIN		//	승리(득3점)
				+ this._goal		* c_SCORE_TYPE.GOAL		//	득점(득5점)
				+ this._assist		* c_SCORE_TYPE.ASSIST	//	도움(득2점)
				+ this._lost		* c_SCORE_TYPE.LOST		//	패배(실3점)
				+ this._ownGoal 	* c_SCORE_TYPE.OWNGOAL	//	실점(실5점)
				);
			}
			get status(){				/* 기록 정보 */
				return `${(this.grade + 1)}등(${this.scores}점): ${SYS.showPlayerInfo(this._id, c_PLAYERINFO_TYPE.PUBLIC)}`;
			}
			get record(){				/* 상세 기록 정보 */
				let result = [
					[`점수: ${this.scores}점(${this.grade + 1}등)`],
					[`경기: ${(this._win + this._lost)}판 ${this._win}승 ${this._lost}패(${this.winningPercent}%)`],
					[`기록: ${this._assist}도움 ${(this._goal + this._ownGoal)}골`]
				];
				if(this._ownGoal > 0) result.push([`(자책: ${this._ownGoal}골)`]);
				return result.join(newLine);
			}
			get records(){				/* 순위 정보 */
				SC._rankList.sort((a, b) => b.scores - a.scores);		//	점수 내림차순으로 정렬
				let len = SC._rankList.length;
				let searchIndex = this.grade;
				let startIndex = SYS.hasInRange(searchIndex, 2, len - 1) ? (len - searchIndex > 2 ? (searchIndex - 2) : (len - 4)) : 0;
				let endIndex = SYS.hasInRange(searchIndex, 0, len - 3) ? startIndex + 4 : len - 1;
				return SC._rankList.slice(startIndex, endIndex + 1).map(r => (r._id == this._id ? '▶' : '▷') + r.status);
			}
			get winningPercent(){		/* 승률 */
				let cntWin = this._win;			//	승전
				let cntLost = this._lost;		//	패전
				let sum = cntWin + cntLost;		//	누적 경기
				return (sum > 0 ? cntWin / sum * 100 : 0).toFixed(2);	//	소수점 둘째 자리까지 반올림
			}

			addWin(v){			/* 승전 */
				this._win += !v ? 1 : v;
			}
			addLost(v){			/* 패전 */
				this._lost += !v ? 1 : v;
			}
			addGoal(v){			/* 득점 골 */
				this._goal += !v ? 1 : v;
			}
			addOwnGoal(v){		/* 실점 골 */
				this._ownGoal += !v ? 1 : v;
			}
			addAssist(v){		/* 도움 */
				this._assist += !v ? 1 : v;
			}
		}
		/*** 선두자 매니저 클래스 ***/
		class TouchedPlayer{
			constructor(id){
				Object.freeze(this._id	= id);
				this._team		= PM.findPlayerById(id)._team;			/* 플레이어 팀 */
				this._time		= SC.gameTime;							/* 감지 시간 */
				this._pos		= PM.findPlayerById(id).dpPosition;		/* 플레이어 좌표 */
				this._disc		= SC.findDiscProp(0);					/* 0번째 디스크 속성 */
			}
		}
		/*** 시간 시스템 클래스 ***/
		class TimeSystem{
			constructor(timeType){
				this._c_coMark		= Object.freeze('-');
				this._c_tiMark		= Object.freeze(':');
				this._timeType		= timeType;				/* 시간 출력 유형 */
				this._timerList		= new Array();			/* 타이머 목록 */
			}
			get fullDate(){		/* 날짜 */
				return new Date();
			}
			get time(){			/* 시간 */
				return this.fullDate.getTime();
			}
			get year(){			/* 연도 */
				return this.fullDate.getFullYear();
			}
			get month(){		/* 월 */
				return this.fullDate.getMonth() + 1;
			}
			get day(){			/* 일*/
				return this.fullDate.getDate();
			}
			get hours(){		/* 시 */
				return this.fullDate.getHours();
			}
			get minutes(){		/* 분 */
				return this.fullDate.getMinutes();
			}
			get secs(){			/* 초 */
				return this.fullDate.getSeconds();
			}

			get meridiem(){		/* 오후 및 오전 */
				return this.hours >= 12 ? 2 : 1;	//	1: 오전, 2: 오후
			}
			get timeType(){		/* 시간 출력 형식 */
				return this._timeType;
			}

			set timeType(index){		/* 시간 출력 형식 */
				switch(index){
					case c_TIME_TYPE.CORE: case c_TIME_TYPE.NORMAL: case c_TIME_TYPE.FULL:
						this._timeType = index;
						break;
					default: return SYS.sendError(c_ERROR_TYPE.E_ETC);
				}
				return true;
			}

			findTimerById(findId){				/* 타이머 ID로 찾기 */
				if(this._timerList == undefined) return undefined;
				if(!findId) return undefined;
				return this._timerList.find(tm => tm._id == findId);
			}
			findTimerByName(name, player){		/* 타이머 이름으로 찾기 */
				let tmList = PM.isValid(player) ? this.findTimerByPlayer(player) : this._timerList;
				if(tmList == undefined) return undefined;
				return tmList.filter(tm => tm._name == name);
			}
			findTimerByPlayer(target){			/* 타이머 플레이어로 찾기 */
				if(this._timerList == undefined) return undefined;
				return this._timerList.filter(tm => tm._player == target);
			}
			findTimers(target, hasTarget){		/* 타이머 목록 구하기 */
				let tl = TS._timerList;
				if(tl == undefined) return undefined;
				let isEquals = (a, b) => a.toString() === b.toString();
				let getEqualTimers = function(tt){
					return tl.filter(tm => {
						if(tm.length > 0 && isEquals(tt._func, tm._func) == false)
							return false;
						return hasTarget == true ? true : tm._id != tt._id;
					});
				}				
				let timers = getEqualTimers(target);
				if(target._isRepeat){			//	반복 타이머 포함
					let rpTm = this.findTimerById(target._id + 'r');
					if(rpTm) timers.concat(getEqualTimers(rpTm));
				}
				return timers;
			}

			addTimer(name, func, player, delay, isRepeat, seq){		/* 타이머 추가 */
				if(name == undefined || name == null) return SYS.log("타이머는 고유의 이름을 가져야 합니다.", c_LOG_TYPE.ERROR);
				let getStartOrder = function(str){
					if(seq > 0) return seq;
					let targets = TS.findTimerByName(str, player);
					switch(targets.length){
						case 0:
						case 1:
						case 2:
							return 0;
						default:
							return targets.at(-1)._sequence + 1;
					}
				}
				let startId = this.time + '-' + this._timerList.filter(t => t._id.split('-')[0] == this.time).length;
				let repeatId = startId + 'r';
				let initTimer = (name, id, func, delay, preId, target, seq) => this._timerList.push(new TimeManager(name, id, func, delay, preId, target, seq));
				initTimer(name, startId, func, delay, (isRepeat ? startId : null), player, getStartOrder(name));
				if(isRepeat == true){
					if(!delay || delay < 100)
						return SYS.log(false, "너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다", c_LOG_TYPE.WARNING);
					if(SYS.hasInRange(delay, SEC_TO_MS / 10, SEC_TO_MS - 1))
						SYS.log(false, "너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다"
						+ newLine + "타이머 ID: %d | 타이머 이름: %d", c_LOG_TYPE.WARNING, [startId, name]);
					initTimer(name, repeatId, (() => {
						this.addTimer(name, func, player, delay, true, getStartOrder(name) + 2);
						if(this.findTimerById(startId) == undefined) return;
						if(this.findTimerById(repeatId) == undefined) return;
					}), delay, startId, player, getStartOrder(name) + 1);
				}
				this._timerList.filter(t => {			//	이미 처리한 타이머 지우기
					if(SYS.hasInRange(this.time - t._time, 0, (t._isRepeat ? 2 : 1) * t._delay)) return false;
					if(t._id == startId && t._isRepeat == true) return false;
					return true;
				}).forEach(t => {
					if(!delay) this._timerList.splice(this._timerList.indexOf(t), 1);
					else this.clearTimer(t._id);
				});
				//	타이머 ID로 반환
				if(delay >= 100) return this.findTimerById(startId);
				return false;
			}

			clearTimer(findId){					/* 타이머 지우기(ID) */
				let timer = this.findTimerById(findId);
				if(timer == undefined || timer._id == undefined) return;			//	없으면 처리 종료
				clearTimeout(timer._proc);
				this._timerList.splice(this._timerList.indexOf(timer), 1);	//	목록에서 제거
			}
			clearTimerByName(name, player){		/* 타이머 지우기(이름) */
				let timers = this.findTimerByName(name, player);
				if(timers == undefined) return;
				timers.forEach(tm => this.clearTimer(tm._id));
			}
			clearTimerByPlayer(player){			/* 타이머 지우기(플레이어) */
				let timers = this.findTimerByPlayer(player);
				if(timers == undefined) return;
				if(timers.length > 0) timers.forEach(tm => this.clearTimer(tm._id));
			}
			resetTimers(){						/* 타이머 초기화 */
				this._timerList.forEach(tm => this.clearTimer(tm._id));
			}
			
			showCurrentTime(type){		/* 시간 출력 */
				let timeList = {
					[c_TIME_TYPE.CORE]		: this.showNormalTime(),
					[c_TIME_TYPE.NORMAL]	: `${this.showDate().split(this._c_coMark).slice(1).join(this._c_coMark)}| ${this.showTime()}`,
					[c_TIME_TYPE.FULL]		: `${this.showDate()}| ${this.showTime()}`
				};
				return timeList.hasOwnProperty(type) ? timeList[type] : this.showCurrentTime(this._timeType);
			}
			showDate(){ 				/* 날짜 및 시간 출력 */
				return [this.year, SYS.fillLine(this.month, 2), SYS.fillLine(this.day, 2)].join(this._c_coMark);
			}
			showNormalTime(){			/* Windows 작업 표시줄 형식으로 출력 */
				let hourStr = this.hours - (this.meridiem == 2 ? 12 : 0);	//	0시 → 12시로 교정
				return ((hourStr == 0 ? 12 : hourStr) + this._c_tiMark + SYS.fillLine(this.minutes, 2) + ' ' + (this.meridiem == 2 ? "PM" : this.meridiem == 1 ? "AM" : ''));
			}
			showTime(){ 				/* 시간 출력 */
				return [SYS.fillLine(this.hours, 2), SYS.fillLine(this.minutes, 2), SYS.fillLine(this.secs, 2)].join(this._c_tiMark);
			}
		}
		/*** 시간 매니저 클래스 ***/
		class TimeManager{
			constructor(name, id, func, delay, preId, target, seq){		/* 타이머 지정 */
				let isRepeat = (preId ? true : false);
				let dt = isNaN(Number(delay)) ? 0 : Number(delay);
				let proc = setTimeout(func, dt);
				let isEquals = (a, b) => a.toString() === b.toString();
				let checkFunc = function(timer){	//	중복 타이머가 있으면 지우기
					if(timer._player != target || timer._proc == proc) return false;
					if(timer._isRepeat) return false;
					return isEquals(func, timer._func);
				}

				this._id		= Object.freeze(id);					//	타이머 ID
				this._name		= Object.freeze(name);					//	타이머 이름
				this._player	= Object.freeze(target);				//	플레이어 ID
				this._time		= Object.freeze(TS.time);				//	등록 시간
				this._delay		= Object.freeze(dt);					//	지연 시간
				this._func		= Object.freeze(func);					//	기능 함수
				this._proc		= Object.freeze(proc);					//	타이머 함수
				this._sequence	= Object.freeze(seq);
				this._isRepeat	= Object.freeze(isRepeat);	//	반복 여부

				let overloaded = TS.findTimerByName(name, target).filter(t => t._isRepeat == false);
				if(overloaded.length > 0) overloaded.forEach(t => !t._id.includes('r'));
			}
			findTimerByName(){		/* 타이머 이름으로 찾기 */
				return TS.findTimerByName(this._name, this._player);
			}
			findTimerByPlayer(){	/* 타이머 플레이어로 찾기 */
				return TS.findTimerByPlayer(this._player);
			}

			clearTimer(){			/* 타이머 ID로 지우기 */
				TS.clearTimer(this._id);
			}
			clearTimerByName(){		/* 타이머 이름으로 지우기 */
				TS.clearTimerByName(this._name, this._player);
			}
			clearTimerByPlayer(){	/* 타이머 플레이어로 지우기 */
				TS.clearTimerByPlayer(this._player);
			}

			calcCurrentSequence(mx, mn){	/* 반복 타이머의 현재 진행 순서 구하기 */
				let min = mn > 2 ? mn : 2
				let max = (mx - 1) / 2;
				return max - Math.floor(max / min) * min;
			}
			calcTotalSequence(seq){			/* 반복 타이머의 누적 진행 순서 구하기 */
				return (seq - 1) / 2;
			}
		}
		/*** 시스템 클래스 ***/
		class GameSystem{
			constructor(versionRoom, releaseDate, isDev, isDemo, lockPass){																		//	기본 글꼴
				this._defaultFontFamily		= Object.freeze("Noto Sans Mono CJK KR, D2Coding, Consolas, \"맑은 고딕\", \"나눔고딕\";");
				this._isDev					= Object.freeze(isDev == true);		/* 개발자 버전 유무 */
				this._isDemo				= Object.freeze(isDemo == true);	/* 데모 모드 유무 */
				this._securityPatchLevel	= Object.freeze("2022.09.01");		/* UMUX 보안 패치 수준(건드리지 마시오) */
				this._versionUMUX  			= Object.freeze("D");				/* UMUX 버전(건드리지 마시오) */
				this._versionRoom 			= Object.freeze(versionRoom);		/* 서버 버전 */
				this._releaseDate			= Object.freeze(releaseDate);		/* 릴리스 일자 */
				this._cssStyleList			= Object.freeze({					/* CSS 스타일 목록 */
					"infoBody"				: [
						"width: 40vw",
						"min-width: 360px",
						"margin: 0 4px",
						"overflow: auto",
						"font-size: 0.8rem",
						"margin: auto auto 8px",
						"width: 40vw",
						"border: 4px",
						"border-radius: 8px",
						"border-color: transparent",
						"background: #555",
						"color: #FFF"
					],
					"infoNodes"				: [
						"padding: 0 16px",
						"color: #FFF",
						"background: #1A2125",
						"margin: 2px",
						"border-radius: 4px;"
					],
					"dbTd"					: [
						"overflow:auto",
						"font-size: 0.75rem",
						"background: #555",
						"color: #FFF",
						"margin: 2px",
						"border: 4px",
						"border-radius: 8px",
						"border-color: transparent"
					],
					"dataScoreTable"		: [
						"overflow:auto",
						"display: table",
						"margin: auto",
						"background: #1A2125",
						"color: #FFF",
						"font-size: 0.8rem",
						"border: 4px",
						"border-radius: 8px",
						"border-color: transparent",
						"padding: 0"
					],
					"dataTeamTable"			: [
						"overflow:auto",
						"display: table",
						"margin: auto auto 8px",
						"background: #1B2328",
						"color: #FFF",
						"font-size: 0.8rem",
						"border: 4px",
						"border-radius: 8px",
						"border-color: transparent",
						"padding: 2px"
					],
					"dbTeamTd"				: [
						"display: table-cell",
						"background: #1A2125",
						"color: #FFF",
						"border-radius: 8px",
						"width: 16vw",
						"min-width: 192px",
						"height: 18px",
						"margin: 2px",
						"padding: 1px",
						"flex: 1",
						"text-align: center",
						"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
					],
					"titleNodes"			: [
						"text-align: center",
						"color: #FFF",
						"padding: 0 8px",
						"margin: 1px 0",
						"height: 18px",
						"border-radius: 8px",
						"font-size: 0.75rem",
						"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
					],
					"nodeComId"				: [
						"display: table-cell",
						"width: 16px",
						"height: 100%",
						"color: #FFF",
						"border-right: 1px solid #485662",
						"margin: 0 1px",
						"font-size: 1.02em",
						"text-align: center",
						"text-shadow: none",
						"float: left",
						"padding: 0 8px"
					],
					"nodeComName"			: [
						"display: table-cell",
						"width: 50%",
						"position: absolute",
						"color: #FFF",
						"white-space: nowrap",
						"overflow: hidden",
						"text-overflow: ellipsis",
						"text-shadow: none",
						"border-radius: 4px",
						"font-size: 1.02em",
						"text-align: left",
						"vertical-align: middle",
						"padding: 0 8px",
						"margin: 0 36px",
						"z-index: 0"
					],
					"nodeComStatus"			: [
						"display: table-cell",
						"max-width: 96px",
						"position: absolute",
						"color: #FFF",
						"background: transparent",
						"border-radius: 6px",
						"font-size: 1.02em",
						"text-align: right",
						"float: right",
						"right: 0",
						"padding: 0 8px",
						"margin: 0 1px",
						"z-index: 1"
					],
					"logDiv"				: [
						"display: table",
						"margin: auto",
						"border-radius: 4px",
						"padding: 0 2px"
					],
					"logDetailsOutput"		: [
						"margin: 2px 4px",
						"padding: 1px 2px",
						"font-size: 0.8rem",
						"border: 4px",
						"border-radius: 8px",
						"background: #555",
						"color: #FFF"
					],
					"logSummaryOutput"		: [
						"color: #FFF",
						"padding: 0 4px"
					],
					"logDivOutput"			: [
						"overflow:auto",
						"text-align: center",
						"font-size: 0.8rem",
						"border: 1px solid #1A2125",
						"border-radius: 8px",
						"margin: 2px 0"
					],
					"logDivInput"			: [
						"display: table",
						"height: 32px",
						"border-radius: 8px",
						"margin: auto"
					],
					"logInputPre"			: [
						"height: 24px",
						"width: 382px",
						"float: left",
						"border: none",
						"border-radius: 4px",
						"margin: 4px 2px 4px 4px",
						"padding: 0 8px",
						"text-overflow: ellipsis",
						"white-space: nowrap",
						"font-size: 0.9rem"
					],
					"logInputBtn"			: [
						"float: right",
						"text-align: center",
						"height: 24px",
						"font-weight: bold",
						"margin-radius: 8px",
						"border: none",
						"border-radius: 4px",
						"margin: 4px 4px 4px 2px",
						"padding: 0 16px"
					],
					"logDivOutputMsg"		: [
						"display: flex",
						"padding: 0 8px",
						"border-radius: 8px",
						"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
					],
					"logDivOutputClock"		: [
						"text-align: center",
						"float: left",
						"margin: 4px"
					],
					"logDivOutputContent"	: [
						"text-align: left",
						"float: right",
						"margin: 4px",
						"width: 40vw",
						"min-width: 256px",
						"white-space: break-spaces"
					]
				});
				this._hasInitServer			= false;							/* 서버 초기화 여부 */
				this._hasInitWebGUI			= false;							/* 그래픽 유저 인터페이스 초기화 여부 */
				this._lockPass				= lockPass;							/* 비밀번호 고정 여부 */
				this._framebody;												/* iframe 객체 */
					
			}
			onClickBtnSend(){		/* 버튼 클릭 이벤트 */
				let getObj = () => iframeEle.getElementById("logInputPreview");
				let msg = getObj().value;
				if(!msg) return;
				this.printMsg(msg);
				getObj().value = null;
			}
			onKeyDownSend(e){		/* 키 입력 이벤트 */
				if(e.keyCode == 13)	//	enter
					return SYS.onClickBtnSend();
				return;
			}
			/* 속성 색상 초기화 */
			initAttributeColors(obj, colBg, colText, str, isGradient, brd){
				let getColor = (c) => '#' + NC.findColor(c).substring(2).replace('#', '');
				let txc = getColor(c_LIST_COLOR.BG_CHATBOX), bgc = getColor(colBg);
				obj.style.background = isGradient ? (`linear-gradient(180deg, ${txc} 25%, ${bgc} 100%)`) : bgc;
				if(isGradient || brd) obj.style.border = brd ? brd : `1px solid ${bgc}`;
				obj.style.color = getColor(colText);
				if(str) obj.innerText = str;
			}
			initAttributeId(obj, str){	/* 객체 ID 초기화 */
				return obj.setAttribute("id", str);
			}
			initCssClass(ele, name){	/* CSS 클래스 초기화 */
				if(!this._cssStyleList.hasOwnProperty(name)) return this.log(false, "유효하지 않는 대상입니다. 클래스 이름: %d", c_LOG_TYPE.ERROR, name);
				ele.setAttribute("class", name);
				ele.setAttribute("style", this._cssStyleList[name].concat([
					`font-family: ${this._defaultFontFamily}`
				]).join(';'));
			}
			initServer(){				/* 서버 초기화 */
				if(this._hasInitServer == true) return this.log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", c_LOG_TYPE.ERROR);
				ROOM.setScoreLimit(0);
				ROOM.setTimeLimit(0);
				ROOM.setCustomStadium(customStadiumList[0]);
				console.clear();
				alert("UMUX Beta Program(이하 UMBP)은 UMUX를 보다 빠르게 UMUX의 신버전을 체험해 볼 수 있는 프로그램입니다."
                    + newLine + "* UMUX Beta Program임을 확인할 수 있게 방제에도 표기"
                    + newLine + "* 재배포 및 수정 금지"
					+ newLine + "* 그 외 기타 사항은 여기서 확인하십시오. "
					+ newLine + "	github.com/HonestSquare/UMUX/wiki/UMUX-Beta-Program"
				);
				while(1){
					let unlockCode = (Math.floor(Math.random() * 9000) + 1000);
					let permission = prompt(
						"*UMUX 버전 표기*"
						+ newLine + "인게임에서 누구나, 제약 없이, 명령어 등의 보편적인 수단으로 접근하여 UMUX 이름표기를 직접 확인할 수 있어야 합니다."
						+ newLine + "기본적으로는 Commands 클래스의 infoRoom() 메서드에서 접근할 수 있으며, 확인할 수 있습니다."
						
						+ newLine + newLine + "*재배포 및 코드 수정 금지*"
						
						+ newLine + newLine + "*UMUX Beta Program임을 확인할 수 있게 방제에도 표기*"
						+ newLine + "예시: "
						+ newLine + "const ROOMNAME: \"[UMBP] 핫휴 3ㄷ3\""
						+ newLine + "const ROOMNAME: \"[UMUX BETA] 핫휴 3ㄷ3\""
						+ newLine + newLine + "*_isDev의 값은 항상 true로 설정해두기*"
						+ newLine + "설정: "
						+ newLine + `new GameSystem("${this._versionRoom}", "${this._releaseDate}", >>>true<<<, false, false);`
						+ newLine + newLine + "*외국어 번역*"
						+ newLine + "소스 코드를 한국어 이외의 다른 언어로 번역해서 방을 열거나 배포하는 행위는 일절 금지합니다."
						+ newLine + newLine + "*UMUX 버전*"
						+ newLine + "UMUX의 시스템 영역이므로 절대 임의로 버전명을 변경하거나 변형하여서는 안 됩니다."
						+ newLine + newLine + newLine + "계속하려면 '동의" + unlockCode + "'를 입력하십시오."
					);
					if(permission == ("동의" + unlockCode)){
                        customCommands["AMN.logonAdmin"] = [unlockCode.toString()];
						SYS.log(false, "최고 관리자 로그인 비밀번호: " + unlockCode, c_LOG_TYPE.BINDING);
						break;
					}
				}
				if(this._isDev){
					let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
					if(!CS.isWhiteSpace(tempPass)){ 
						alert("비밀번호가 설정되었습니다."
						+ newLine + newLine + "현재 비밀번호: " + tempPass
						+ newLine + newLine + "확인을 눌러 계속하세요.");
						AMN.updatePassword(tempPass);
						this._lockPass = true;
						SYS.log(false, "서버 비밀번호: %d", c_LOG_TYPE.BINDING, tempPass);
					}
					else alert("작업이 취소되었습니다." + newLine + "확인을 눌러 계속하세요.");
				}
				console.group("[서버 정보]");
				console.info("서버 이름: "			+ ROOMNAME
					+ newLine + "최대 인원: "		+ MAXPLAYERS
					+ newLine + "서버 버전: "		+ this._versionRoom
					+ newLine + "서버 공개 여부: "	+ (PUBLIC ? "허용" : "차단")
					+ newLine + "UMUX 버전: "		+ this._versionUMUX
					+ newLine + "보안 패치 수준: "	+ this._securityPatchLevel
					+ newLine + "지역 코드: "		+ REGION_CODE.toUpperCase() 
					+ newLine  + "상세 위치(바로가기): "
					+ LAT + ', ' + LON + '(' + "https://www.google.com/customStadiumList/place/" + ((LAT + "%20" + LON).toString()) + ')'
					);
				console.groupEnd();
				AMN.updatePassword(PASSWORD);
				let bl = [
				    /***
                        슈퍼 블랙리스트 초기화
						-아래와 같은 형식으로 명단을 작성할 수 있습니다.
						-<예시> [true, "알파고"], 또는 [true, undefined, "12345678901234567890"],
                    ***/
						[true, "에드", "34392E3137342E3133332E3131"], [true, "에드", "3131382E33342E3235312E3334"], [true, "에드", "37342E38322E36302E3832"],[true, "에드", "36352E34392E3132362E3839"], [true, "에드", "3132352E3138372E3133352E3239"], [true, "에드", "37322E35322E38372E3737"], [true, "에드", "31342E34372E3131322E313232"], [true, "에드", "3232312E3136352E3136332E313530"], [true, "에드", "3138322E3232342E33312E313136"], [true, "에드", "3138332E3130302E3135362E32353"], [true, "에드", "3138332E3130302E3135362E323532"], [true, "에드", "3139382E31362E37342E323035"], [true, "에드", "37342E38322E36302E313739"], [true, "Walker", "34392E3137342E3133332E3131"], [true, "페르난지뉴", "34392E3137342E3133332E3131"], [true, "앙헬리노", "34392E3137342E3133332E3131"], [true, "Man from Wuhan", "34392E3137342E3133332E3131"], [true, undefined, "34392E3137342E3133332E3131"], [true, "Knife", "34392E3137342E3133332E3131"], [true, "웨인 루니", "34392E3137342E3133332E3131"], [true, undefined, "34392E3137342E3133332E3131"], [true, "가즈으앗", "34392E3137342E3133332E3131"], 
						[true, "어둠의 악마", "3231392E3234382E3230332E313430"],
						[true, "랄랄랄", "3132342E35392E37332E313931"], 
						[true, undefined, "3138322E3232342E33312E3330"], [true, undefined, "3130342E3133312E3137362E323334"], 
						[true, undefined, "3137382E36322E352E313537"], [true, undefined, "3137382E3132382E38392E313530"],
						[true, "제몸무게가 220kg인데 정상인가요", "3130342E3233362E3231332E323330"], [true, undefined, "36312E3235352E382E313532"],
						[true, "서든", "31342E34372E3131322E313330"], [true, "프레버", "31342E34372E3131322E313330"], [true, "Preber", "31342E34372E3131322E313330"], [true, "Preber", "37322E35322E38372E3937"], [true, "Preber", "36352E34392E3132362E3931"], [true, "Preber", "37322E35322E38372E3937"],
						[true, undefined, "3132352E3137362E342E313335"], [true, undefined, "3137352E3231342E392E3834"],
						[true, "어드안주면인터넷찢는개", "312E3234362E3139332E313536"], 
						[true, "쥐알티", "312E3234362E3139312E323134"],
						[true, undefined, "3131362E3132342E3137382E3433"], [true, undefined, "3137352E3139372E3231392E313031"], [true, undefined, "3137352E3139372E3231392E313031"], [true, undefined, "35392E31362E35342E313631"],
						[true, undefined, "3132342E35332E3137362E3831"],
						[true, "농협신", "3132352E3137392E3231312E3330"], [true, "농협신", "3132352E3137392E3231312E3331"], [true, "농협신", "3131382E3137362E34372E313233"], [true, "농협신", "3132352E3137392E3231312E3232"], [true, "농협신", "3132352E3137392E3231312E3533"],
					
						[true, "노래하는메시", "3131382E3137362E34372E313332"], [true, "노래하는메시", "3132352E3139312E37302E313031"], [true, "노래하는메시", "3232312E3135312E3132312E313731"], [true, "노래하는메시", "3232302E37362E3230302E35"], [true, "노래하는메시", "3231312E3232342E3232392E313637"], [true, "노래하는메시", "3232302E37352E3230392E3637"], [true, "노래하는메시", "3136332E3138302E3131382E313734"], [true, "노래하는메시", "3231312E3230342E3132352E323430"], [true, "노래하는메시", "35382E3233332E38302E3532"], [true, "노래하는메시", "3138332E3130322E34332E313735"], [true, "노래하는메시", "3132312E3139302E3233332E313635"], [true, "노래하는메시", "3131392E3139322E3235342E323438"], [true, "노래하는메시", "3132312E3134332E3133342E3637"], [true, "노래하는메시", "3232322E3131322E34392E313630"],
						[true, "노래하는메시", "3132352E3133322E39392E3338"], [true, "노래하는메시", "3231302E3132312E3136352E3337"], [true, "노래하는메시", "3232312E3136352E37392E323338"], [true, "노래하는메시", "3232302E37392E3137382E323230"], [true, "노래하는메시", "3232322E3131372E3132322E3433"],
						[true, "노래하는메시", "312E3233312E36322E313335"], [true, "노래하는메시", "3232302E37322E39362E3637"], [true, "노래하는메시", "3132312E3136322E3231332E323130"], [true, "노래하는메시", "3232312E3135352E3234342E313532"], [true, "노래하는메시", "3132312E3133302E31332E3938"], [true, "노래하는메시", "3231312E3235302E3138382E3437"],
						[true, "노래하는메시", "3231312E3230392E37362E323038"], [true, "노래하는메시", "3138332E3130382E3138312E313538"],
						[true, "노래하는메시", "3131322E3136362E3133362E3331"], [true, "노래하는메시", "3131332E35322E3139362E313733"],
						[true, "노래하는메시", "35382E3134302E3231312E323237"], [true, "노래하는메시", "3132312E3134392E322E313539"],
						[true, "노래하는메시", "35382E3134302E3231302E3730"], [true, "노래하는메시", "3231312E3235302E3138382E313035"],
						[true, "노래하는메시", "3132342E352E31332E323237"], [true, "노래하는메시", "33392E3131382E3132302E3534"],
						[true, "노래하는메시", "3138302E38332E39312E323139"], [true, "노래하는메시", "35382E3134332E3138312E313035"],
						[true, "노래하는메시", "3132342E352E392E313331"], [true, "노래하는메시", "3131382E3234312E3131382E3236"],
						[true, "노래하는메시", "3231312E3230332E3235352E3634"], [true, "노래하는메시", "3136382E3132362E38392E313335"],
                        [true, "노래하는메시", "3132342E35342E3137352E38"],
                        [true, "노래하는메시대작전", "3131382E3137362E34372E313332"],
						[true, undefined, "3138322E3232342E33312E313031"],
						[true, undefined, "3131362E3132312E3233352E3830"],
						[true, undefined, "3231312E3234332E3232322E3733"],
						[true, undefined, "33392E3131372E37392E313337"],
						[true, "drogba", "3131382E33322E37372E323531"], [true, "드록바", "3131382E33322E37372E323531"], [true, "드록바", "35382E3134332E37362E3635"],
						[true, "경상도에서태어난아기를영국에서길렀더니내가나왔다", "3131382E362E32352E313034"],
						[true, "soy el mas pro", "3139302E34392E3137302E313038"],
						[true, "Ricardo", "3138362E3132332E3231352E3234"],
						[true, "HYNN", "3231392E3130302E33372E323433"], [true, "HYNN", "3232322E3130352E302E313733"], [true, "HYNN", "3231382E35312E31392E3338"],
						[true, "Roseanne", "3231392E3130302E33372E323433"], [true, "Roseanne","33392E3131342E36312E313230"],
						[true, "루니", "31342E33362E3231352E3936"],
						[true, undefined, "36342E36322E3231392E3232"],
						/***
							 블랙리스트 초기화
							-아래와 같은 형식으로 명단을 작성할 수 있습니다.
							-<예시> [false, "알파고"], 또는 [false, undefined, "12345678901234567890"],
						***/
				];
				//------------------------------------------------------------
				for(let e of bl.filter(e => this.hasInRange(e.length, 2, 3) == true)){
					let isSuper = (e[0] == true);
					let name = CS.isWhiteSpace(e[1]) ? undefined : e[1];
					let conn = e.length > 2 ? e[2] : null;
					if(name != undefined || conn != null) AMN.addBlacklist(isSuper, name, conn);
				}
				if(PASSWORD)	//	reCAPTCHA 활성화
					if(this._isDev == true|| PUBLIC == false) this.enableRecaptcha(true);
				if(this._isDemo == true){
					this.log(false, "데모 모드에서는 일부 기능이 제한됩니다"
					+ newLine + ["중복/다중 접속 퇴장", "비활동 플레이어 퇴장"].join(newLine) + newLine
					+ newLine + "해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요."
					+ newLine + "SYS.activateDemo(false);",
					c_LOG_TYPE.WARNING);
				}
				this._hasInitServer = true;
				return true;
			}
			initWebGUI(){				/* 그래픽 유저 인터페이스 초기화 */
				if(!this._hasInitServer || this._hasInitWebGUI) return false;	//	서버 초기화가 필요한 경우 처리 중단
				this._framebody = iframeEle.body;					//	부모 객체
				//	---제목 및 설명---
				let titleDoc	= this._framebody.getElementsByTagName("p")[0];	//	destination here.
				document.title += '(' + TS.showCurrentTime(c_TIME_TYPE.CORE) + ')';				//	최초 가동 시간 표기
				titleDoc.innerHTML = "설명서는 " + "<a href=\"https://github.com/haxball/haxball-issues/wiki/Headless-Host\" target=\"_blank\">" + "여기</a>"+ "에 있습니다." + " | " + "<a href=\"https://github.com/HonestSquare/UMUX/wiki/UMUX-Reference\" target=\"_blank\">" + "UMUX 레퍼런스" + "</a>";
				titleDoc.setAttribute("style", "font-size: 1em");
				this.addWebElement(this._framebody, titleDoc);
				//	---서버 정보---
				let infoBody = document.createElement("details");	let infoTitle = document.createElement("summary");		let infoNodes = document.createElement("pre");
				this.initAttributeId(infoTitle, "infoTitle");
				infoTitle.setAttribute("style", "padding: 0 4px;");
				this.initCssClass(infoBody, "infoBody");
				this.initCssClass(infoNodes, "infoNodes");
				infoTitle.innerHTML = "서버 정보"; 
				infoNodes.innerHTML = ("서버 이름: "+ ROOMNAME + newLine + "최대 인원: " + MAXPLAYERS + newLine + "서버 버전: " + this._versionRoom + newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
				+ newLine + "UMUX 버전: " + this._versionUMUX + newLine + "보안 패치 수준: " + this._securityPatchLevel
				+ newLine + "지역 코드: " + REGION_CODE.toUpperCase() + newLine + "상세 위치: " + LAT + ', ' + LON);
				this.addWebElement(infoBody, infoTitle);	this.addWebElement(infoBody, infoNodes);	this.addWebElement(this._framebody, infoBody);
				//	---플레이어 정보---
				let dbTd = document.createElement("td");	let dataScoreTable = document.createElement("div");	let dataTeamTable = document.createElement("div");
				let dataRowGroup = document.createElement("div");
				this.initCssClass(dbTd, "dbTd");
				this.initCssClass(dataScoreTable, "dataScoreTable");
				this.initCssClass(dataTeamTable, "dataTeamTable");
				dataRowGroup.setAttribute("style", "display: table-row;");
				//	---팀별 객체 생성---
				let dbRedTd		= document.createElement("div");	this.initAttributeId(dbRedTd, "redTd");
				this.initCssClass(dbRedTd, "dbTeamTd");
				this.initAttributeColors(dbRedTd, c_LIST_COLOR.BG_CHATBOX);
				let dbSpecTd	= document.createElement("div");	this.initAttributeId(dbSpecTd, "specTd");
				this.initCssClass(dbSpecTd, "dbTeamTd");
				let dbBlueTd	= document.createElement("div");	this.initAttributeId(dbBlueTd, "blueTd");
				this.initCssClass(dbBlueTd, "dbTeamTd");
				this.addWebElement(dataRowGroup, dbRedTd); this.addWebElement(dataRowGroup, dbSpecTd);	this.addWebElement(dataRowGroup, dbBlueTd);
				this.addWebElement(dataTeamTable, dataRowGroup);
				let titleNodes = Array.from(Array(3), () => new Array(3));
				titleNodes.forEach(tn => {				//	객체 생성 및 공통 스타일 속성 지정
					for(let i = 0; i < tn.length; i++){
						tn[i] = document.createElement("pre");
						SYS.initCssClass(tn[i], "titleNodes");
					}
				});
				//	ID
				this.initAttributeId(titleNodes[0][0], "titleDbPlayer");	this.initAttributeId(titleNodes[1][0], "seatFull");	this.initAttributeId(titleNodes[2][0], "seatEmpty");
				this.initAttributeId(titleNodes[0][1], "scoreRed");		this.initAttributeId(titleNodes[1][1], "scoreCore");	this.initAttributeId(titleNodes[2][1], "scoreBlue");
				this.initAttributeId(titleNodes[0][2], "titleRed");		this.initAttributeId(titleNodes[1][2], "titleSpec");	this.initAttributeId(titleNodes[2][2], "titleBlue");
				//	스타일 속성
				this.initAttributeColors(titleNodes[0][0], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS);
				this.initAttributeColors(titleNodes[1][1], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS, null, true);	this.initAttributeColors(titleNodes[0][2], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS);	this.initAttributeColors(titleNodes[1][2], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS);	this.initAttributeColors(titleNodes[2][2], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS);
				this.initAttributeColors(titleNodes[1][0], c_LIST_COLOR.BG_CONTAINER, c_LIST_COLOR.TEXT_STATUS);			this.initAttributeColors(titleNodes[2][0], c_LIST_COLOR.BG_CONTAINER, c_LIST_COLOR.TEXT_STATUS);
				this.initAttributeColors(titleNodes[0][1], c_LIST_COLOR.BG_TEAM_RED, c_LIST_COLOR.TEXT_STATUS, null, false, `1px solid #${c_LIST_COLOR.UNIQUE_RED}`);
				this.initAttributeColors(titleNodes[2][1], c_LIST_COLOR.BG_TEAM_BLUE, c_LIST_COLOR.TEXT_STATUS, null, false, `1px solid #${c_LIST_COLOR.UNIQUE_BLUE}`);
				titleNodes[0][2].style.marginBottom = "-1vw;";	titleNodes[2][2].style.marginBottom = "-1vw;";
				titleNodes[0][0].style.marginTop = "0;";		titleNodes[0][0].style.marginBottom = "0;";
				//	텍스트
				titleNodes[0][0].innerText = "현재 인원:";
				titleNodes[0].forEach(tn => this.addWebElement(dbRedTd, tn));
				titleNodes[1].forEach(tn => this.addWebElement(dbSpecTd, tn));
				titleNodes[2].forEach(tn => this.addWebElement(dbBlueTd, tn));
				//	---팀 개별 노드 생성---
				for(let i = 0; i < MAXPLAYERS; i++){
					let tl = [c_TEAM.RED, c_TEAM.BLUE, c_TEAM.SPECTATOR];
					let teamTdList = {
						[c_TEAM.RED]		: dbRedTd,
						[c_TEAM.BLUE]		: dbBlueTd,
						[c_TEAM.SPECTATOR]	: dbSpecTd
					}
					tl.forEach(t => {
						let teamIdList = {
							[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
						}
						let itemList = [
							["span", "id"],
							["p", "name"],
							["span", "status"]
						]
						let initNode = function(e){
							let nodeEle = document.createElement(e[0]);
							SYS.initAttributeId(nodeEle, (teamIdList[t] + i + '_' + e[1]));
							SYS.initCssClass(nodeEle, ("nodeCom" + e[1].charAt(0).toUpperCase() + e[1].slice(1)));
							SYS.addWebElement(teamDiv, nodeEle);
						}
						let teamDiv = document.createElement("div");
						SYS.initAttributeId(teamDiv, "list" + '-' + teamIdList[t] + i);
						teamDiv.setAttribute("class", "teamDivList" + '-' + teamIdList[t]);
						teamDiv.setAttribute("style", "display: none; position: relative; width: 100%; margin: 1px 0; padding: 1px 0; border: 1px solid #485662; border-radius: 8px;");
						SYS.addWebElement(teamTdList[t], teamDiv);
						itemList.forEach(e => initNode(e));
					});
				}
				titleNodes[1][0].innerText = ' ';
				titleNodes[1][0].style.height = "18px";
				titleNodes[2][0].innerText = Array(MAXPLAYERS - PM.cntPlayers() + 1).join('□');
				titleNodes[2][0].style.height = "18px";
				this.addWebElement(this._framebody, dataScoreTable);	this.addWebElement(this._framebody, dataTeamTable);		//	적용
				let logDiv = document.createElement("div");
				this.initAttributeId(logDiv, "logDiv");
				this.initCssClass(logDiv, "logDiv");
				//	---로그 출력---
				let logDetailsOutput = document.createElement("details");
				let logSummaryOutput = document.createElement("summary");
				let logDivOutput = document.createElement("div");
				this.initAttributeId(logDiv, "logDiv");
				this.initAttributeId(logDetailsOutput, "logDetailsOutput");
				this.initAttributeId(logSummaryOutput, "logSummaryOutput");
				this.initAttributeId(logDivOutput, "logDivOutput");
				logSummaryOutput.innerText = "로그 출력";
				this.initCssClass(logDetailsOutput, "logDetailsOutput");
				this.initCssClass(logSummaryOutput, "logSummaryOutput");
				this.initCssClass(logDivOutput, "logDivOutput");
				this.initAttributeColors(logDivOutput, c_LIST_COLOR.BG_CHATBOX, c_LIST_COLOR.TEXT_CHATBOX);
				logDetailsOutput.setAttribute("open", "true");
				//	---로그 입력---
				let logDivInput = document.createElement("div");
				this.initAttributeId(logDivInput, "logDivInput");
				this.initCssClass(logDivInput, "logDivInput");
				this.initAttributeColors(logDivInput, c_LIST_COLOR.BG_CHATBOX, c_LIST_COLOR.TEXT_CHATBOX);
				let logInputPre	= document.createElement("input");			//	입력 공간
				this.initAttributeId(logInputPre, "logInputPreview"); logInputPre.setAttribute("type", "text"); logInputPre.setAttribute("placeholder", "Enter 또는 보내기 버튼을 클릭하면 입력한 내용이 전달됩니다.");
				this.initCssClass(logInputPre, "logInputPre");
				logInputPre.setAttribute("autocomplete", "off");			//	자동 완성 비활성화
				logInputPre.addEventListener("keydown", this.onKeyDownSend);		//	키 입력 처리
				this.initAttributeColors(logInputPre, c_LIST_COLOR.BLACK, null);
				let logInputBtn	= document.createElement("button");			//	전송 버튼
				this.initAttributeId(logInputBtn, "logInputSendBtn"); logInputBtn.setAttribute("type", "button");
				this.initCssClass(logInputBtn, "logInputBtn");
				this.addEventInput(logInputBtn, this.onClickBtnSend);
				this.initAttributeColors(logInputBtn, c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS, "보내기");
				this.addWebElement(logDivInput, logInputPre);	this.addWebElement(logDivInput, logInputBtn);
				this.addWebElement(logDetailsOutput, logSummaryOutput);
				this.addWebElement(logDetailsOutput, logDivOutput);
				this.addWebElement(logDiv, logDetailsOutput);
				this.addWebElement(logDiv, logDivInput);
				this.addWebElement(this._framebody, logDiv);
				//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
				let visObj = document.createElement("div");
				visObj.innerHTML = "Powered by UMUX"; this.initAttributeId(visObj, "bootDiv"); visObj.setAttribute("style", "font-weight: bold");
				this.addWebElement(this._framebody, visObj);
				
				this._hasInitWebGUI = true;
				return true;
			}

			hasInRange(num, min, max){		/* 범위 포함 여부 구하기 */
				return (num == null ? false : (num - min) * (num - max) <= 0);
			}
			
			addEventInput(obj, ev){				/* 입력 이벤트 지정 */
				obj.onclick = ev;
			}
			addListIndex(player){				/* 플레이어 리스트 추가 */
				if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				if(!PM.findLocalId(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_LID);
				let teamIdList = {
					[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
				}
				let itemList = iframeEle.getElementsByClassName("teamDivList" + '-' + teamIdList[PM.findPlayerById(player)._team]);
				let addNode = function(e, p){
					if(e == false) return;
					let target = e[0];
					let chld = target.childNodes;
					chld[0].name = p._id;
					chld[0].title = `플레이어 정보: ${p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)}`;
					chld[0].innerText = p.localId;
					chld[1].innerText = p.showPlayerInfo(c_PLAYERINFO_TYPE.NAME);
					chld[1].title = `플레이어 정보: ${p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)}`;
					chld[2].innerText = PM.findTagGrade(p._id);
					target.style.display = "table";
				}
				addNode(Object.values(itemList).filter(n => n.style.display == "none"), PM.findPlayerById(player));
				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				PM.findPlayerList().forEach(p => this.updateListIndex(p._id));
			}
			addWebElement(prtsEle, chldEle){	/* 그래픽 유저 인터페이스에 자식 객체 추가 */
				return prtsEle.appendChild(chldEle);
			}

			updateListIndex(player){	/* 플레이어 리스트 갱신 */
				if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				if(!PM.findLocalId(player)) return this.clearListIndex(player);
				let teamIdList = {
					[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
				}
				let itemList = iframeEle.getElementsByClassName("teamDivList" + '-' + teamIdList[PM.findPlayerById(player)._team]);
				let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
				if(target == undefined) return;
				TS.clearTimerByName("updateNotification", player);
				let pn = target.childNodes[2];
				let getMsgList = function(p){
					let sl = [
						['😴', p._isSleep, "자리를 비운 상태입니다."],
						['🤬', p._isMute, "채팅이 금지된 상태입니다."],
						['⚽', SC._touchedList.length > 0 && SC.lastTouchedPlayer._id == p._id ? SC.hasCommonRange(0, p._id) : false, "선두를 잡았습니다."],
						[PM.findTagGrade(p._id), true]
					];
					return sl.filter(s => s[1] == true);
				}
				let maxIcons = 5;
				let ml = getMsgList(PM.findPlayerById(player));
				let iconList = ml.map(v => v[0]);
				if(iconList.length > maxIcons){
					iconList.splice(0, iconList.length - maxIcons);
					iconList.unshift('…');
				}
				pn.style.background = iconList.join('').length > pn.innerText.length ? `#${c_LIST_COLOR.GREEN}` : "transparent";
				pn.innerText = iconList.join('');
				let titleList = ml.filter(v => v[2] != undefined).map(v => v[2]);
				titleList.unshift(`${this.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC)}님은 현재...`);
				let pi = target.childNodes[0];
				if(pi.innerText != PM.findLocalId(player)) pi.innerText = PM.findLocalId(player);
				pn.title = titleList.length > 1 ? titleList.join(newLine) : '';
				TS.addTimer("updateNotification", () => {
					let itemList = iframeEle.getElementsByClassName("teamDivList" + '-' + teamIdList[PM.findPlayerById(player)._team]);
					let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
					if(target == undefined) return;
					let cn = target.childNodes[2];
					if(cn.innerText != pn.innerText) return;
					cn.style.background = "transparent";
				}, player, 3 * SEC_TO_MS);
			}
			updateWebGUI(){				/* 그래픽 유저 인터페이스 갱신 */
				let LIST_STATUS = {
					GOAL_EMPTY: '○',	GOAL_FULL: '●',
					SEAT_EMPTY: '□',	SEAT_FULL: '■'
				};
				let findElementById = function(...str){
					let el = str.map(e => iframeEle.getElementById(e));
					return el.length > 1 ? el : el.at(0);
				}
				//	접속자 정보 갱신
				let updateSeatList = function(s, f, e, c){
					s[0].innerText = f > 10 ? (c.SEAT_FULL + '×' + f) : (f > 0 ? Array(f + 1).join(c.SEAT_FULL) : ' ');		//	접속 칸
					s[1].innerText = e > 10 ? (c.SEAT_EMPTY + '×' + e) : (e > 0 ? Array(e + 1).join(c.SEAT_EMPTY) : "MAX");	//	미접속 칸
				}
				updateSeatList(findElementById("seatFull", "seatEmpty"), PM.cntPlayers(), MAXPLAYERS - PM.cntPlayers(), LIST_STATUS);
				//	점수 정보 - 현재 경기 판정 골(누적 경기 판정 골)
				let scoreList = findElementById("scoreCore", "scoreRed", "scoreBlue");
				let titleList = findElementById("titleSpec", "titleRed", "titleBlue");
				let getGoalText = function(team){
					switch(team){
						case c_TEAM.RED: case c_TEAM.BLUE:
							let joinStr = (n, ch) => Array(n + 1).join(ch);
							let cg = SC.calcGoalsByTeam(team) == null ? 0 : SC.calcGoalsByTeam(team);
							let tg = SC.calcTotalGoalsByTeam(team) == null ? 0 : SC.calcTotalGoalsByTeam(team);
							if(SC.limitScore > 0) return (joinStr(cg, LIST_STATUS.GOAL_FULL) + joinStr(SC.limitScore - cg, LIST_STATUS.GOAL_EMPTY));
							return ('⚽' + '×' + cg + '(' + tg + ')');
						default: return "경기가 시작되면 표시됩니다.";
					}
				}
				switch(GM._gameStats){
					case c_GAME_STATS.STOP:			//	경기 종료
						this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS, "경기 예정", true);
						scoreList[c_TEAM.RED].innerText		= '⚽' + '×' + SC.calcTotalGoalsByTeam(c_TEAM.RED);
						scoreList[c_TEAM.BLUE].innerText	= '⚽' + '×' + SC.calcTotalGoalsByTeam(c_TEAM.BLUE);
						break;
					case c_GAME_STATS.PAUSE:		//	경기 중단
						this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.RED, c_LIST_COLOR.TEXT_STATUS, "경기 중단", true);
						break;
					case c_GAME_STATS.TICK:			//	경기 진행
						this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.GREEN, c_LIST_COLOR.TEXT_STATUS, (GM.cntMatch + "번째 경기"), true);
						scoreList[c_TEAM.RED].innerText		= getGoalText(c_TEAM.RED);
						scoreList[c_TEAM.BLUE].innerText	= getGoalText(c_TEAM.BLUE);
						break;
				}
				let logDiv = findElementById("logDivOutput");		//	로그 객체
				logDiv.style.maxHeight = (window.outerHeight - this._framebody.offsetHeight + logDiv.offsetHeight) + "px";
				titleList[c_TEAM.RED].innerText = "RED" + '(' + PM.cntPlayers(c_TEAM.RED) + ')';
				titleList[c_TEAM.BLUE].innerText = "BLUE" + '(' + PM.cntPlayers(c_TEAM.BLUE) + ')';
				titleList[c_TEAM.SPECTATOR].innerText = "SPECTATORS" + '(' + PM.cntPlayers(c_TEAM.SPECTATOR) + ')';
				return false;
			}

			clearListIndex(player){		/* 플레이어 리스트 제거 */
				if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				let teamIdList = {
					[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
				}
				let itemList = iframeEle.getElementsByClassName("teamDivList" + '-' + teamIdList[PM.findPlayerById(player)._team]);
				let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
				if(target == undefined) return;
				let chld = target.childNodes;
				for(let n of chld){
					n.innerText = null;
					n.name = null;
					n.title = '';
				}
				target.style.display = "none";
				this.updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
			}

			showInfo(){						/* 저작물 및 버전 출력 */
				return ("서버 버전: " + this._versionRoom 
					+ ' | ' + "UMUX 버전: " + this._versionUMUX
					+ ' | '	+ "UMUX 보안 패치 수준: " + this._securityPatchLevel
					+ newLine + "Powered by UMUX");			//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
			}
			showPlayerInfo(player, type){	/* 플레이어 정보 */ 
				let target = PM.findPlayerById(player);
				if(target == undefined) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
				return target.showPlayerInfo(type);
			}

			activateDemo(bool){								/* 데모 모드 활성화 */
				if(this._isDemo === bool) return this.log(false, "이미 해당 값이 적용돼 있습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
				PM.findPlayerList().forEach(p => NC.locked((bool == true), "데모 모드가 %d 되었습니다.", p._id, null, [bool == true ? "활성화" : "비활성화"]));
				this.log(false, "데모 모드가 %d 되었습니다.", c_LOG_TYPE.BINDING, [bool == true ? "활성화" : "비활성화"]);
				if(bool == true){
					this.log(false, "일부 기능이 제한됩니다"
					+ newLine + ["중복/다중 접속 퇴장", "비활동 플레이어 퇴장"].join(newLine) + newLine
					+ newLine + "해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요."
					+ newLine + "SYS.activateDemo(false);",
					c_LOG_TYPE.WARNING);
				}
				this._isDemo = (bool == true);
			}
			enableRecaptcha(isActive, player){				/* reCAPTCHA 지정 */
				room.setRequireRecaptcha(isActive);
				let isValidByPlayer = PM.isValid(player);
				NC.locked(isActive, isValidByPlayer ? (SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 reCAPTCHA를 " + (isActive == true ? "활성화" : "비활성화") + "했습니다.") : ("reCAPTCHA가 " + (isActive == true ? "설정" : "해제") + "되었습니다."));
				this.log(true, isValidByPlayer ? (SYS.showPlayerInfo(player) + "(이)가 reCAPTCHA를 " + (isActive == true ? "활성화" : "비활성화") + "함") : ("reCAPTCHA가 " + (isActive == true ? "활성화" : "비활성화") + "됨"), c_LOG_TYPE.NOTICE);
			}
			fillLine(amount, line){							/* 자릿수 교정 */
				let list = Math.pow(10, line - 1);
				return (amount < list ? String('0' + amount) : amount);
			}
			lockPassword(bool){								/* 비밀번호 고정 */
				if(PASSWORD == " ") return false;
				if(bool == true || bool == false){ 
					this._lockPass = bool;
					this.log(false, "비밀번호 고정 장치가 " + (this._lockPass == true ? "활성화" : "비활성화") + "됨.", c_LOG_TYPE.NOTICE);
					return true;
				}
				return this.sendError(c_ERROR_TYPE.E_ETC);
			}
			log(io, msg, type, ...replace){					/* 로그 전달 */
				if(!msg) return false;											//	빈 메시지 확인
				let timeStatus = TS.showCurrentTime() + (io ? ' ▶ ' : ' ◀ '); 	//	시간 및 입출력 확인
				let text = NC.formatString(msg, replace[0]);
				switch(type){													//	로그 유형 지정
					case c_LOG_TYPE.NOTICE:			//	고지
						return this.outputLogMsg(text, timeStatus, "8ED2AB");
					case c_LOG_TYPE.BELL:			//	공지
						return this.outputLogMsg(text, timeStatus, "FFE400");
					case c_LOG_TYPE.SEND:			//	송신
						return this.outputLogMsg(text, timeStatus, "8B8B8B");
					case c_LOG_TYPE.BINDING:		//	수신
						return this.outputLogMsg(text, timeStatus, "587489");
					case c_LOG_TYPE.WARNING:		//	경고
						return this.outputLogMsg(text, timeStatus, "E6C78B", "332B00");
					case c_LOG_TYPE.ERROR:			//	오류
						return this.outputLogMsg(text, timeStatus, "FF0000", "6D3522");
					case c_LOG_TYPE.NORMAL:			//	기본
					default:
						return this.outputLogMsg(text, timeStatus);
				}
			}
			outputLogMsg(msg, time, textColor, bgColor){	/* 로그 출력 */
				let logDiv = iframeEle.getElementById("logDivOutput");		//	로그 객체
				let layoutEle = document.createElement("div");			//	로그 속성
				let clockEle = document.createElement("span");
				let contentEle = document.createElement("pre");
				let getColor = (c) => '#' + NC.findColor(c).substring(2);
				//	세부 속성
				this.initCssClass(clockEle, "logDivOutputClock");
				this.initCssClass(contentEle, "logDivOutputContent");
				this.initCssClass(layoutEle, "logDivOutputMsg");
				clockEle.innerHTML = time;
				contentEle.innerHTML = msg;
				clockEle.title = TS.showCurrentTime(c_TIME_TYPE.FULL);
				this.initAttributeColors(layoutEle, (!bgColor ? c_LIST_COLOR.BG_CHATBOX : bgColor), (!textColor ? c_LIST_COLOR.TEXT_CHATBOX : textColor), null, (bgColor ? true : false));
				switch(textColor){
					case "FF0000":
						console.error("%s%c%s", time, "color: " + getColor(textColor) + "background: " + getColor(bgColor), msg + newLine + "(클릭하여 원인 경로 파악" + newLine + "[제보/문의]hxb.nmh@gmail.com" + ")");
						break;
					case "E6C78B":
						console.warn("%s%c%s", time, "color: " + getColor(textColor) + "background: " + getColor(bgColor), msg);
						break;
					default: 
						console.log("%s%c%s", time, "color: " + getColor(textColor) + "background: " + getColor(bgColor), msg);
				}
				if(!this._hasInitWebGUI) return false;
				this.addWebElement(layoutEle, clockEle), this.addWebElement(layoutEle, contentEle);
				this.addWebElement(logDiv, layoutEle);
				this.updateWebGUI();
				if(logDiv.scrollHeight > 0){				//	자동 스크롤
					logDiv.scrollTop = logDiv.scrollHeight;
				}
			}
			printMsg(msg, target){							/* 서버 메시지 출력 */
				let getDestType = function(target){
					if(PM.isValid(target)) return 3;	//	개인
					switch(target){
						case "레드": case "red": case 'r':
							return c_TEAM.RED;
						case "블루": case "blue": case 'b':
							return c_TEAM.BLUE;
						case "관전": case "spct": case 's':
							return c_TEAM.SPECTATOR;
						default:						//	전체
							return 4;
					}
				}
				let getDestTypeToString = function(type){
					switch(type){
						case c_TEAM.RED:			return "레드";
						case c_TEAM.BLUE:			return "블루";
						case c_TEAM.SPECTATOR:	return "관전";
						case 3:					return "개인";
						default:				return "전체";
					}
				}
				let destType = getDestType(target);
				let destStr = getDestTypeToString(destType);
				let context = " →" + '[' + destStr + (destType == 3 ? ": " + SYS.showPlayerInfo(target) : '') + ']' + msg;
				this.log(true, "전달: " + '[' + destStr +  ']' + msg, c_LOG_TYPE.SEND);
				switch(destType){
					case c_TEAM.RED: case c_TEAM.BLUE: case c_TEAM.SPECTATOR:	
						return CS.sendTeamChat(destType, 0, context);
					case 3:
						return CS.sendPrivateChat(target, 0, " →" + '[' + destStr + ": " + SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC) + ']' + msg);
					default:
						return CS.sendAlert(context);
				}
			}
			sendError(type){								/* 오류 출력 */
				let el = {
					[c_ERROR_TYPE.E_PLAYER_INFO]	: "플레이어의 데이터를 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_AUTH]	: "플레이어의 네트워크를 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_CONN]	: "플레이어의 주소를 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_PID]		: "플레이어의 공용 ID를 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_LID]		: "플레이어의 개인 ID를 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_ADMIN]	: "플레이어의 권한을 읽을 수 없는",
					[c_ERROR_TYPE.E_PLAYER_NAME]	: "플레이어의 이름을 읽을 수 없는",
					[c_ERROR_TYPE.E_ETC]			: "알 수 없는"
				};
				let title = el[!el.hasOwnProperty(type) ? c_ERROR_TYPE.E_ETC : type];
				NC.warning("%d 문제가 발생하였습니다.", null, null, title);
				return this.log(false, "%d 오류가 발생함", c_LOG_TYPE.ERROR, title);
			}
		}
		const TS	= new TimeSystem(c_TIME_TYPE.CORE);		/* 시간 관리 클래스 */
		const SYS	= new GameSystem(						/* 시스템 클래스 */
			/* 버전, 릴리스 일자, 개발자 버전 유무, 데모 모드 유무, 비밀번호 고정 유무 */
			"v10.0", "2022.09.30", true, false, false
		);
		const GM 	= new GameManager(						/* 게임 매니저 클래스 */
			/* 장기 무응답 플레이어 판정 시간, 반복 채팅 판정 시간(밀리초 단위), 도달 기준 시간 */
			200, 500, 0
		);
		const AMN	= new Administration(					/* 관리 클래스 */
			/* 동적 권한 할당 여부, 팀 자율 이동 제한 여부, 맵 고정 여부, 고정 맵 데이터, 최고 관리자 상한 인원, 방장 팀 이동 여부 */
			true, false, false, null, 3, true
		);
		const NC 	= new Notification();					/* 알림 클래스 */
		const CS 	= new ChatManager(						/* 채팅 매니저 클래스 */
			/* 채팅 얼림 여부, 귓속말 차단 여부, 채팅 필터링 단계, 금지어 최대 감지량, 도배 최대 감지량 */
			false, false, 2, 50, 3
		);
		const CM 	= new Commands();						/* 명령어 클래스 */
		const PM 	= new PlayerManager();					/* 플레이어 매니저 클래스 */
		const SC	= new ScoreManager();					/* 점수 관리 클래스 */
		const room	= ROOM;
		/*** 내부 명령어 ***/
		const internalCommands = {
			/***
				-UMUX 내부 시스템을 접근하는 명령어입니다.
				-기존 명령어 삭제 및 신규 명령어 추가는 금지합니다.
				-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
			***/
			["CM.comAdminList"] :		["admin", "show_admin", "adminlist", "adminList", "admin_list", "admins", "show_admins", "어드민", "어드", "어드명단", "어드목록", "관리자", "관리명단", "관리목록", "권한명단", "권한목록"],
			["CM.comMutedList"]	:		["mutes", "mutedlist", "muted_list", "mutedList", "mutelist", "mute_list", "muteList", "채팅금지명단", "채금명단", "채금자", "채금목록"],
			["CM.comSleepList"] :		["afks", "afklist", "afk_list", "show_afks", "잠수명단", "잠수자", "잠수목록"],

			["CM.comRecaptcha"] :		["recaptcha", "리캡챠", "리캡차", "ㄱㄷㅊㅁㅐㅅㅊㅗㅁ", "flzoqci", "flzoqck", "로봇"],

			["CM.comKick"] :			["kick", "킥", "강제퇴장", "퇴장", "강퇴", "ㅏㅑ차", "zlr", "rkdwpxhlwkd", "xhlwkd", "rkdxhl"],
			["CM.comResetGame"] :		["rr", "ㄱㄱ", "리", "re"],	/* 다시 시작 */
			["CM.comSwapGame"] :		["r", "ㄱ", "고"], 			/* 자동 재시작 */
			["CM.comClearBans"] :		[							/* 영구 퇴장 명단 초기화 */
				"clear_bans", "clearbans", "밴_클리어", "밴클리어", "밴클", "칟ㅁㄱ_ㅠ무", "칟ㅁㄱ규무"
			],
			["CM.comFreezeChat"] :		[							/* 채팅창 얼리기 */
				"freeze", "ㄺㄷㄷㅋㄷ", "얼리기", "얼기", "채팅얼기", "채팅얼리기", "djfflrl", "djfrl", "coxlddjfrl", "coxlddjfflrl"
			],
			["CM.comUnfreezeChat"] :	[							/* 채팅창 녹이기 */
				"unfreeze", "ㅕㅜㄺㄷㄷㅋㄷ", "녹기", "녹이기", "채팅녹기", "채팅녹이기", "shrrl", "shrdlrl", "coxldshrrl", "coxldshrdlrl"
			],

			/* 팀 유니폼 */
			["CM.updateUniform"] :		["colors", "color", "uniform", "컬러", "유니폼", "ㅋㄹ", "ㅇㄴㅍ", "채ㅣㅐㄱㄴ", "채ㅣㅐㄱ", "ㅕㅜㅑ래그", "zjffj", "dbslvha"],
			["CM.comClearUniform"] :	["clear_color", "clear_uniform", "클리어_유니폼", "초기화_유니폼", "유니폼_초기화", "클리어_유니폼", "유니폼_클리어", "clearcolor", "clearuniform", "클리어유니폼", "초기화유니폼", "유니폼초기화", "클리어유니폼", "유니폼클리어"],

			/* 팀 이동 제한(전체) */
			["CM.comAllowJoin"] :		["lock_join", "isLockJoin", "join_lock", "joinlock", "조인_락", "조인락", "락_조인", "락조인", "ㅣㅐ차_ㅓㅐㅑㅜ", "ㅓㅐㅑㅜ_ㅣㅐ차", "whdls_flr", "fkr_whdls"],
			["CM.comPinHost"] :			["lock_host", "lockhost","host_lock", "hostlock", "락_호스트", "락호스트", "호스트_락", "호스트락", "ㅣㅐ차_ㅙㄴㅅ", "ㅙㄴㅅ_ㅣㅐ차", "fkr_ghtmxm", "ghtmxm_fkr"],

			/* 비밀번호 */
			["CM.comSetPassword"] :		["set_pw", "set_password"],
			["CM.comClearPassword"] : 	["clear_pw", "clear_password"],
			["CM.comShowPassword"] :	["show_pw", "show_password", "?pw", "?password"],

			["CM.comSetScore"] :		["score", "ㄴ책ㄷ", "스코어", "점수", "smzhdj", "wjatn"],	/* 점수 지정 */
			["CM.comSetTime"] :			["time", "타임", "시간", "샤ㅡㄷ", "xkdla", "tlrks"],		/* 시간 지정 */
			["CM.loadMap"] :			["load", "map", "로드", "맵", "ㅣㅐㅁㅇ", "fhem", "ㅡ메"],
			["CM.alertSpam"] :			["도배방지", "도배", "도", "ehqo"],							/* 도배 방지 문자 출력 */
			["CM.comMute"] :			["mute", "ㅡㅕㅅㄷ", "채팅금지", "채금", "뮤트", "abxm"],
			["CM.comUnmute"] :			["unmute", "ㅕㅜㅡㅕㅅㄷ", "채팅허용", "채금풀기"],
			["CM.comRecording"] :		["rec", "녹화", "shrghk"],								/* 녹화 시작&종료 */

			["CM.infoLink"] :			["link", "url", "링크", "주소", "ㅣㅑㅜㅏ", "ㅕ기", "fldzm", "wnth"],
			["CM.infoRoom"] :			[									/* 서버 정보 */
				"about", "aboutinfo", "info", "aboutver", "verinfo", "version", "버전", "ver", "정보", "wjdqh"
			],

			["CM.btg"] : ["알파고", "파고", "배타고", "베타고", "타고", "alphaGo", "AlphaGo", "alphago", "betaGo", "BetaGo", "betago"]			//	이스터 에그
		}
		/*** 표준 명령어 ***/
		const standardCommands = {
			/***
				-UMUX 표준 명령어입니다.
				-기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
				-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
			***/
			/* 종합 도움말 */
			["CM.helpCom"] :	["help", "헬프", "도움", "명령", "명령어", "ㅗ디ㅔ", "gpfvm"],
			["CM.helpBot"] :	["bothelp", "봇헬프", "봇방", "봇방도움말", "ㅠㅐ소디ㅔ", "봇", "qht"],
			["CM.helpChat"] :	["chathelp", "채팅", "챗", "챗헬프", "채팅명령어", "챗도움", "챗도움말", "촘소디ㅔ"],
			["CM.helpJoin"] :	["joinhelp", "enterhelp", "helpenter", "투입", "투입?", "투입!", "투입해", "투입하셈", "투입요", "투입좀시켜라", "넣어", "넣어줘","넣어라","넣어봐라","넣어주세요", "투입해주세요", "껴줘", "투입해드려", "투입명령어", "투입도움말"],
			["CM.helpMap"] :	["maphelp", "맵도움", "맵도움말", "맵헬프", "유즈맵", "유즈맵도움말", "ㅡ메ㅗ디ㅔ"],
			["CM.helpRank"] :	["rankhelp", "helprank", "랭크헬프", "헬프랭크", "랭크도움말"],
			["CM.helpScore"] :	["scorehelp", "helpscore", "점수도움", "스코어헬프", "ㄴ책도디ㅔ", "wjatnehdna"],
			["CM.helpMisc"] :	["mischelp", "etchelp", "기타헬프", "기타도움", "기타도움말", "기타", "ㄷㅅ초디ㅔ", "ㅡㅑㄴ초디ㅔ"],

			/* 채팅(전체, 팀별, 개인) */
			["CM.comAllChat"] :			["a", "올", "전체", "ㅁ", "all", "wjscp", "wjs"],
			["CM.comTeamChat"] :		["t", "팀", "ㅅ", "ㅌ", "xla", "x"],
			["CM.comPrivateChat"] :		["e", "귓속말", "귓말", "귓", "개인", "ㄷ",	"!rnltthrakf", "rnltakf", "rnlt"],

			/* 등번호 설정 및 초기화 */
			["CM.comAvatar"] :			["avatar", "아바타", "ㅇㅂㅌ", "ㅁㅍㅁㅅㅁㄱ", "등번호", "emdqjsgh"],
			["CM.comResetAvatar"] :		["clear_avatar", "reset_avatar", "avatar_clear", "클리어_아바타", "ㅋㄹㅇ_ㅇㅂㅌ", "칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ", "리셋_아바타", "clearavatar", "resetavatar", "클리어아바타", "아바타클리어", "ㅋㄹㅇㅇㅂㅌ", "칟ㅁㄱㅁㅍㅁㅅㅁㄱ", "리셋아바타", "초기화아바타", "아바타초기화", "초기화_아바타", "아바타_초기화"],

			/* 채팅 모드 설정 */
			["CM.comChatMode"] :		["chatmode", "촘스ㅐㅇㄷ", "챗모드", "채팅모드", "챗", "채팅", "cotahem", "coxldahem", "cot", "coxld"],

			/* 수신 설정 */
			["CM.comLockPrivateChat"] :	["lock_private", "lock_private_chat", "락_귓속말", "락_귓말", "ㅣㅐ차_ㅔ걒ㅁㅅㄷ"],
			["CM.comDisturbMode"] :		["disturb", "disturb", "방해금지모드", "방해금지", "수신", "얀겨ㅔㅅ", "qkdgormawlahem", "wtntls"],

			/* 게임 참가 및 설정 */
			["CM.comJoin"] :			["join", "enter", "참가", "참여", "입장", "투입", "조인", "참여", "ㅓㅐㅑㅜ", "둣ㄷㄱ", "ckark", "ckadu", "xndlq"],
			["CM.comSetSleep"] :			["afk", "ㅁ라", "잠수", "wkatn"],

			/* 전적 및 랭킹 */
			["CM.infoStats"] :			["stats", "stat", "record", "기록", "스탯", "전적", "wjswjr", "tmxot"],
			["CM.infoRanking"] :		["ranking", "rank", "랭킹", "랭", "순", "순위", "fodzld", "tnsdnl"],

			/* 맵 정보 */
			["CM.infoMaps"] :			["maplist", "map_list", "maps", "cm", "맵리스트", "맵목록", "map", "맵", "유즈맵", "page", "페이지", "ㅔㅁㅎㄷ", "vpdlwl", "츠"],
		}
		/*** 추가 명령어 ***/
		let customCommands = {
			/***
				-UMUX 커스텀 명령어입니다.
				-신규 명령어 추가에 적합하며, 권장합니다.
			***/
		}
		/*** room 객체 이벤트 ***/
		room.onPlayerJoin			= function(player){							/* 플레이어 입장 이벤트 */
			GM.onPlayerJoin(player);
		}
		room.onPlayerLeave			= function(player){ 						/* 플레이어 퇴장 이벤트 */
			let target = PM.findPlayerById(player.id);
			TS.addTimer("gm_onPlayerLeave", () => GM.onPlayerLeave(target));
		}
		room.onPlayerActivity		= (player) => PM.onPlayerActivity(player);	/* 플레이어 동작 응답 이벤트 */
																				/* 플레이어 강제 퇴장 이벤트 */
		room.onPlayerKicked			= (kickedPlayer, reason, ban, byPlayer) => AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);

		room.onPlayerAdminChange	= (player, byPlayer)	=> AMN.onPlayerAdminChange(player, byPlayer);	/* 권한 변경 이벤트 */
		room.onStadiumChange		= (newMap, byPlayer)	=> GM.onStadiumChange(newMap, byPlayer);		/* 맵 교체 이벤트 */
		room.onPlayerChat			= function(player, msg){ 					/* 채팅 입력 이벤트 */
			CS.onPlayerChat(player, msg);
			return false;					//	채팅 창에서 명령어 입력 기록 지우기
		}
		room.onRoomLink				= (url)		=> GM.onRoomLink(url);			/* 링크 업로드(서버 불러오기) */
		room.onPositionsReset		= function(){								/* 득실점 판정 직후 참가자 좌표 초기화 */
			GM.onPositionsReset();
			SC.onPositionsReset();
		}
		room.onPlayerBallKick		= (player)	=> GM.onPlayerBallKick(player);	/* 킥 판정 이벤트 */
		room.onTeamGoal				= (team)	=> GM.onTeamGoal(team);			/* 골 판정 이벤트 */
																				/* 킥 제한 이벤트 */
		room.onKickRateLimitSet		= (min, rate, burst, player) => GM.onKickRateLimitSet(min, rate, burst, player);
		room.onPlayerTeamChange		= function(player, byPlayer){ 				/* 팀 교체 이벤트 */
			PM.onPlayerTeamChange(player, byPlayer);
			SC.onPlayerTeamChange(player, byPlayer);
		}
		room.onTeamVictory			= (scores)		=> GM.onTeamVictory(scores);		/* 팀 승리 이벤트 */
		room.onGameStart			= (byPlayer)	=> GM.onGameStart(byPlayer);		/* 게임 시작 이벤트 */
		room.onGameTick				= ()			=> GM.onGameTick();					/* 게임 진행 이벤트 */
		room.onGameStop				= (byPlayer)	=> GM.onGameStop(byPlayer);			/* 게임 종료 이벤트 */
		room.onGamePause			= (byPlayer)	=> GM.onGamePause(byPlayer);		/* 게임 중단 이벤트 */
		room.onGameUnpause			= (byPlayer)	=> GM.onGameUnpause(byPlayer);		/* 게임 재개 이벤트 */
