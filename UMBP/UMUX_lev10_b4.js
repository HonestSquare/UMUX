		/***
			API LEVEL: 10(4.0.0 b4)
            ===<README>===
            UMUX Beta Program(이하 UMBP)은 보다 빠르게
            UMUX의 신버전을 체험해 볼 수 있는 프로그램입니다.

            * UMUX Beta Program임을 확인할 수 있게 방제에도 표기
            * 재배포 및 수정 금지
			* 그 외 기타 사항은 여기서 확인하십시오.
				github.com/HonestSquare/UMUX/wiki/UMUX-Beta-Program
            ===
		***/
		const c = (msg, target) => SYS.print(msg, target);	//	메시지 입출력	| *전체: c("안녕하세요"); | *팀: c("안녕하세요", "red"); | *개인: c("안녕하세요", 37);
		const iframeEle = $("iframe").contentWindow.document;
		const stopbot = () => alert("서버 가동이 중단되었습니다." + SYS.newLine + "재가동하려면 확인 버튼을 누르십시오.");
		/***
			서버 초기 설정
			-서버 이름
			-서버 설명
			-최대 접속 인원
			-방장 이름
			-서버 공개 여부
		***/		
		const	ROOMNAME 	= "[UMBP] 새 방";
		const	DESCRIPTION	= "테스트 용도의 봇방입니다.";
		const	MAXLIMIT	= 12;
		const	HOSTNAME 	= "서버 매니저";
		const	PUBLIC 		= true;
							//	token; You can obtain it at https://www.haxball.com/rs/api/getheadlesstoken
		const	TOKEN		= "thr1.AAAAAGLSxHNLV5b83mP7AQ.1g3xBRZjxmo";
		const	NOPLAYER	= true;
							//	지역 코드, 위도, 경도(기본값 기준이며, 위도와 경도는 항상 동적으로 초기화 됨)
		const	REGION_CODE	= "kr";
		const	LAT			= 37.566667 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		const	LON			= 126.978406 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		let		PASSWORD	= " ";
		const MAXPLAYERS 	= (MAXLIMIT < 2 ? 2 : (MAXLIMIT > 30 ? 30 : MAXLIMIT));
							//	초기 비번 설정, 서버 초기화
		const INITSERVER	= str => {
			let isSpace = function(str){	//	공백 확인
				for(let i = 0; i < str.length; i++){
					if(str.slice(i, i + 1).search(" ") == -1) return false;		//	공백 외 다른 문자가 들어있는 경우
				}
				return true;
			}
			return { roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : HOSTNAME, public : PUBLIC, token : TOKEN, noPlayer : NOPLAYER, password: (isSpace(str) ? null : str), geo: { code: REGION_CODE, lat: LAT, lon: LON} };
		};
		const ROOM			= HBInit(INITSERVER(PASSWORD));
		
		const c_TEAM			= Object.freeze({	//			팀 유형
			SPECTATOR : 0,
			RED : 1,
			BLUE : 2
		});
		const c_GAME_STATS		= Object.freeze({	//			게임 진행 상태
			STOP:	0,
			START:	1,
			TICK: 	2,
			PAUSE:	3
		});
		const c_PLAYERINFO_TYPE	= Object.freeze({	//			플레이어 정보 유형
			LOCAL: 1,
			PUBLIC: 2,
			NAME: 3
		});
		const c_LIST_ICON		= Object.freeze({	//			제목 아이콘 목록
			POSTIVE :	'○',	POSTIVE_BOLD :	'●', 
			NORMAL:		'□',	NORMAL_BOLD:	'■',
			NEGATIVE:	'△',	NEGATIVE_BOLD:	'▲',
		});
		const c_LIST_COLOR 		= Object.freeze({	//			색상 목록
			DEFAULT:	"E1E1E1",
			RED:		"C61D24",	ORANGE:	"E45614",	WHEAT:	"FFE7CC",	YELLOW:	"C1AF0A",	GOLD:	"FFD700",
			GREEN:		"8ED2AB",
			SKY:		"00D8FF",	BLUE:	"0000FF",	PURPLE:	"5F00FF",	PINK:	"FF86CF",
			WHITE:		"FFFFFF",	GRAY:	"808080",	BLACK:	"000000",	SILVER:	"C0C0C0",
			TEAM_RED:	"E56E56",	TEAM_BLUE:		"5689E5",			
			UNIQUE_RED: "C13535",	UNIQUE_BLUE:	"244967"
		});
		const c_LIST_STYLE 		= Object.freeze({	//			자형 목록
			NORMAL:	"normal",	BOLD:	"bold",	ITALIC:	"italic",
			SMALL:	"small",	SMALL_BOLD:	"small-bold",	SMALL_ITALIC:	"small-italic"
		});
		const c_LIST_SOUND		= Object.freeze({	//			소리 목록
			MUTED: 0, NORMAL: 1, LOUD: 2
		});

		const c_LIST_EMOTION	= Object.freeze([	//			이모티콘
			'🤔', 
			'😍', '🤣', '😎', '😐', '😰', 
			'🙄', '😴', '🥶', '😱'
		]);
		
		const c_TIME_TYPE = Object.freeze({			//			시간 출력 형식
			CORE: 0, NORMAL: 1, FULL: 2
		});

		let forbiddenWords		= [					//			금지어
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
			"새끼", "새꺄", "새낀", "toRl","시발", "^^ㅣ발", "시ㅡ발",
			"씨발", "씨바", "씨-발","씨ㅡ발","씨이발","씨이이발","씨이이이발", "Tlqkf", "Tlqk", "tlqkf",
			"ㅆ!발", "ㅆ!발련", 
			"병신", "qudtls","븅신", "qbdtls", "뷰웅신련", "뷍신",
			"지랄", "wlfkf", "wlfkd",
			"좆", "whw", "존나", "whssk", "젖밥쉑", "ㅈ밥", "wjwqkqtnpr", "wqkq",
			"씹", "tlq",
			"개새끼", "개새꺄",
			"닥쳐", "닥치"
		];

		const MS		= 1000;						//			1000ms == 1s
		const coMark	= '-';
		const tiMark	= ':';
		
		let playerlist	= new Array();
		let timerList	= new Array();				//			타이머 목록

		let initPlayerlist = function(player){
			playerlist.push(new PlayerManager(
				player.id,
				player.name,
				player.team,
				player.admin,
				player.conn,
				player.auth
			));
		}
		let getPlayerlistById = target => playerlist.find(p => p._id == target);
		let setPlayerlistById = function(player, prop, value){
			let target = getPlayerlistById(player);
			if(target == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
			if(target.hasOwnProperty('_' + prop) == false) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
			target._prop = value;
		}
		let clearPlayerlist = function(player){
			let target = getPlayerlistById(player.id);
			if(target.length > 0) target.clearPlayer();
		}

		ROOM.setScoreLimit(0);
		ROOM.setTimeLimit(0);
		/*** 내장 맵 ***/
		let maps = new Array();
		{
			maps.push(`{
				//	BUILD_DATE:		2021/02/16
				//	MADE BY			정직한네모형™
				//	CODE_NAME:		CROP-900M
				//	MODEL_NAME:		Basic
				//	VERSION:		v9.0
				//	SUPPORT_LEVEL:	
				//					9(3.0.0), 10
				//	UMUX에 탑재된 기본 맵입니다.
				//	UMUX 이외에 어떠한 용도의 수정 및 재배포 또는 사용이 가능하며 이에 따른 책임은 모두 이용자 본인에게 있습니다.
				"name" : "Basic",
				"width" : 470,	"height" : 210,
				"bg" : { "type" : "grass", "width" : 420, "height" : 180, "kickOffRadius" : 76, "cornerRadius" : 10, "color" : "1A2125" },
				//	***vertexes***
				"vertexes" : [
					/* 0 */ { "x" : -420, "y" : -64, "trait" : "ballArea", "p0" : [-420,-64 ], "p1" : [-420,64 ], "curve" : -90 },	/* 1 */ { "x" : 420, "y" : 64, "trait" : "ballArea", "p0" : [420,64 ], "p1" : [420,-64 ], "curve" : 90 },	/* 2 */ { "x" : 420, "y" : -64, "trait" : "ballArea", "p0" : [420,64 ], "p1" : [420,-64 ], "curve" : 90 },
					/* 3 */ { "x" : 0, "y" : 210, "trait" : "kickOffBarrier" },		/* 4 */ { "x" : 0, "y" : 76, "trait" : "kickOffBarrier" },
					/* 5 */ { "x" : 0, "y" : -76, "trait" : "kickOffBarrier" },		/* 6 */ { "x" : 0, "y" : -210, "trait" : "kickOffBarrier" },
					/* 7 */ { "x" : -350, "y" : 1830, "cMask" : ["wall" ], "cGroup" : ["wall" ] },	/* 8 */ { "x" : 350, "y" : 1830, "cMask" : ["wall" ], "cGroup" : ["wall" ] },
					/* 9 */ { "x" : -420, "y" : -180, "vis" : false, "bias" : -1 },		/* 10 */ { "x" : -420, "y" : -64, "color" : "F6CECE", "curve" : 120, "vis" : false, "bias" : -1 },
					/* 11 */ { "x" : 420, "y" : -180, "vis" : false, "bias" : -1 },		/* 12 */ { "x" : 420, "y" : -64, "color" : "CECEF6", "curve" : 120, "vis" : false, "bias" : -1 },
					/* 13 */ { "x" : -420, "y" : 180, "vis" : false, "bias" : -1 },		/* 14 */ { "x" : -420, "y" : 64, "color" : "F6CECE", "curve" : 120, "vis" : false, "bias" : -1 },
					/* 15 */ { "x" : 420, "y" : 180, "vis" : false, "bias" : -1 },		/* 16 */ { "x" : 420, "y" : 64, "color" : "CECEF6", "curve" : 120, "vis" : false, "bias" : -1 }
				],
				//	***segments***
				"segments" : [
					{ "v0" : 3, "v1" : 4, "trait" : "kickOffBarrier" },
					{ "v0" : 4, "v1" : 5, "curve" : 180, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },	{ "v0" : 4, "v1" : 5, "curve" : -180, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
					{ "v0" : 5, "v1" : 6, "trait" : "kickOffBarrier" },
					{ "v0" : 14, "v1" : 10, "curve" : 0, "color" : "F6CECE", "cMask" : ["red", "blue" ], "cGroup" : ["wall" ], "bias" : -1 },
					{ "v0" : 13, "v1" : 14, "bias" : -1, "vis" : false },	{ "v0" : 10, "v1" : 9, "bias" : -1, "vis" : false },	{ "v0" : 11, "v1" : 12, "bias" : -1, "vis" : false },	{ "v0" : 16, "v1" : 15, "bias" : -1, "vis" : false },
					{ "v0" : 12, "v1" : 16, "curve" : 0, "color" : "CECEF6", "cMask" : ["red", "blue" ], "cGroup" : ["wall" ], "bias" : -1 },
					{ "v0" : 9, "v1" : 11, "bias" : -1, "vis" : false },
					{ "v0" : 15, "v1" : 13, "bias" : -1, "vis" : false }
				],
				//	***goals***
				"goals" : [
					{ "p0" : [-420,-64 ], "p1" : [-420,64 ], "team" : "red", "x" : -420},	//	레드
					{ "p0" : [420,64 ], "p1" : [420,-64 ], "team" : "blue", "x" : 420},		//	블루
				],
				//	***discs***
				"discs" : [
					{ "pos" : [-420,64 ], "color" : "F6CECE", "trait" : "goalPost"},	{ "pos" : [-420,-64 ], "color" : "F6CECE", "trait" : "goalPost"},	//	레드
					{ "pos" : [420,64 ], "color" : "CECEF6", "trait" : "goalPost"},		{ "pos" : [420,-64 ], "color" : "CECEF6", "trait" : "goalPost"},	//	블루
				],
				//	***planes***
				"planes" : [
					{ "normal" : [0,1 ], "dist" : -210, "bCoef" : 0.1 },		{ "normal" : [0,-1 ], "dist" : -210, "bCoef" : 0.1 },			//	상하
					{ "normal" : [1,0 ], "dist" : -470, "bCoef" : 0.1 },		{ "normal" : [-1,0 ], "dist" : -470, "bCoef" : 0.1 }			//	좌우
				],
				//	***traits***
				"traits" : {
					"ballArea" :		{ "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
					"goalPost" :		{ "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
					"goalNet" :			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ] },
					"kickOffBarrier" :	{ "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }
				}
			}`);
		}
		ROOM.setCustomStadium(maps[0]);
		//ROOM.setDefaultStadium("Classic");
		/*** 게임 매니저 클래스 ***/
		class GameManager{
			constructor(afkLimitTime, gameLink, timeLimit){
				this._afkLimitTime			= afkLimitTime;			//		장기 무응답 플레이어 판정 초단위 최소 시간
				this._countMatch			= 0;					//		누적 경기 횟수
				this._gameLink				= gameLink;				//		서버 링크
				this._gameStats				= c_GAME_STATS.STOP;	//		게임 상태
				this._isRecording			= false;				//		녹화 여부
				this._firstTimeNotified		= 0;					//		최초 도달 시간
				this._lastTimeNotified		= 0;					//		최근 도달 시간
				this._timeLimit				= timeLimit;			//		도달 기준 시간(초 단위)
				this._timeLimitReached		= false;				//		시간 도달 여부
			}
			onGamePause(player){ 			//			게임 중단 이벤트
				this._gameStats = c_GAME_STATS.PAUSE;
				SYS.log(true, (!PS.isValid(player) ? "[경기 중단]" : (SYS.showPlayerInfo(player.id) + "(이)가 게임을 일시 중단함.")), SYS.LOG_TYPE.NOTICE);
				//	마지막 활동 시간 저장
				if(PS.isValid()) PS.updateTime(player.id);
				SYS.updateWebGUI();
			}
			onGameStart(player){				//			게임 시작 이벤트
				this.handleGameStart();		//	게임 제어 준비
				SYS.log(true, (PS.isValid(player) ? (SYS.showPlayerInfo(player.id) + "(이)가 게임을 시작함.") : "[경기 시작]"), SYS.LOG_TYPE.NOTICE);
				console.log("누적 경기 횟수: " + this._countMatch);
			}
			onGameStop(player){				//			게임 종료 이벤트
				this._gameStats = c_GAME_STATS.STOP;
				SC.updateRanking();			//	랭킹 갱신
				SC.clearTouchedList();		//	선두자 명단 모두 지우기
				SYS.log(true, (PS.isValid(player) ? (SYS.showPlayerInfo(player.id) + "(이)가 게임을 종료함.") : "[경기 종료]"), SYS.LOG_TYPE.NOTICE);
				//	마지막 활동 시간 저장
				if(PS.isValid(player)) PS.updateTime(player.id);
				SYS.updateWebGUI();
			}
			onGameTick(){					//			게임 진행 이벤트
				if(TS.time >= this._firstTimeNotified + MS / 10){		//	100ms 마다 처리
					this._firstTimeNotified = TS.time;			//	최근 기록 시간을 현재 시간으로 변경
					this.handleGameTick(this._firstTimeNotified);	//	게임 제어 처리
				}
			}
			onGameUnpause(player){				//			게임 재개 이벤트
				this._gameStats = c_GAME_STATS.TICK;
				SYS.log(true, (PS.isValid(player) ? (SYS.showPlayerInfo(player.id) + "(이)가 중단된 게임을 재개함.") : "[경기 재개]"), SYS.LOG_TYPE.NOTICE);
				//	마지막 활동 시간 저장
				if(PS.isValid(player)) PS.updateTime(player.id);
				SYS.updateWebGUI();
			}
			onKickRateLimitSet(						//			킥 제한 이벤트
				min, rate, burst, player){

			}
			onPlayerBallKick(player){ 			//			플레이어 킥 판정 이벤트
				SC.addTouchedList(player);
			}
			onPlayerJoin(player){				//			플레이어 입장 이벤트
				PS.initPlayer(player);						//	플레이어 데이터베이스 초기화
				initPlayerlist(player);						//	플레이어 데이터베이스 초기화
				SC.updateRanking();							//	랭킹 갱신
				if(SYS.isDev()) NC.caution("이 서버는 개발 중이므로, 게임 플레이가 원활하지 않을 수 있습니다.", player.id);
				let isUpdate = PS.updateAccount(player.id);	//	계정 데이터베이스 갱신
				console.log("접속 인원: " + PS.cntPlayers());
				let indexBlacklist = (AMN.isBlacklist(player.id, true) ? 2 : AMN.isBlacklist(player.id, false) ? 1 : 0);
				SYS.log(true, (isUpdate == true ? "재입장": "입장") + ": " + SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC) + (indexBlacklist > 0 ? "(블랙리스트)" : ''), SYS.LOG_TYPE.BELL);
				if(indexBlacklist > 1) return AMN.setKick(player.id, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
				let hasSamePlayer = AMN.filterPlayer(player.id);
				if(indexBlacklist > 0 && hasSamePlayer == true)	//	(슈퍼)블랙리스트, 중복 접속, 사칭, 다중 접속 탐지
					NC.warning(SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.NAME) + "님은 관심 대상입니다.", player.id);
				else{										//	입장 문구 출력
					NC.uniMsg('#' + player.id, 
					(isUpdate == true ? "다시 환영합니다, ": "안녕하세요, ") + SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.NAME) + "님! ", 
					player.id, "!help, !join");
				}
				if(PS.cntPlayers() < 2){					//	접속자가 2인 미만이면
					PS.setTeam(player.id, c_TEAM.RED);		//	투입하고
					room.startGame();						//	게임 시작
				}
				AMN.updateAdmins();							//	권한 갱신
				if(this._isRecording)								//	녹화 중이면 별도 알림
					NC.extMsg(null, c_LIST_ICON.POSTIVE_BOLD + "녹화 중", player.id, null, c_LIST_COLOR.RED, null, 250);
				return isUpdate;
			}
			onPlayerLeave(player){				//			플레이어 퇴장 이벤트
				if(!PS.getPlayerById(player.id).hasKicked)
					SYS.log(true, "퇴장: " + SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC) + (AMN.isBlacklist(player.id) ? "(블랙리스트)" : ''), SYS.LOG_TYPE.BELL);
				clearPlayerlist(player);	//	플레이어 데이터베이스 지우기
				PS.clearPlayer(player);		//	플레이어 데이터베이스 지우기
				if(PS.cntPlayers() == 0){	//	사람이 없으면
					room.stopGame();		//	경기 종료 후
					AMN.updatePassword();	//	비밀번호 초기화
				}
				else						//	사람이 있으면
					AMN.updateAdmins();		//	권한 갱신
				console.log("접속 인원: " + PS.cntPlayers());
			}
			onPositionsReset(){		 			//			득실점 판정 직후 참가자 좌표 초기화

			}
			onRoomLink(address){			//			링크 획득(서버 가동)
				let shortLink	= iframeEle.getElementById("roomlink");
				shortLink.innerHTML = "서버 주소: " + "<a href=" + '\"' + address + '\"' + "target=\"_blank\">" + address + "</a>";
				this._gameLink = address;
				if(!SYS.getServer()){	//	객체 초기화가 필요한 경우
					SYS.initServer();	//	서버 초기화
					SYS.initWebGUI();	//	그래픽 유저 인터페이스 초기화
					return;
				}
				NC.uniMsg(c_LIST_ICON.POSTIVE_BOLD + "서버방어 시스템 가동중", address);
				SYS.log(true, "서버 복구 완료", SYS.LOG_TYPE.WARNING);
				SYS.setRequireRecaptcha(true);		//	reCAPTCHA 활성화
				SYS.log(true, "서버 안정을 위해 reCAPTCHA가 활성화되었습니다."
				+ SYS.newLine + "콘솔 입력창에 아래와 같은 코드를 작성하여 수동으로 해제할 수 있습니다."
				+ SYS.newLine + "SYS.setRequireRecaptcha(false);",
				SYS.LOG_TYPE.WARNING);
			}
			onStadiumChange(newMap, byPlayer){	//			맵 교체 이벤트
				let target = this.getStadiumData().indexOf(newMap);
				if(target != AMN.getRestrictedStadium()
				&& SYS.hasInRange(target, 0, maps.length - 1) == true){		//	맵 고정 설정
					if(!AMN.isLockStadium() || (AMN.getRestrictedStadium() == null))
						AMN.setRestrictedStadium(target);
				}
				if(!PS.isValid(byPlayer)) return SYS.log(true, "맵 교체: " + newMap, SYS.LOG_TYPE.NOTICE);
				PS.updateTime(byPlayer.id);		//	마지막 활동 시간 저장
				if(AMN.isLockStadium()){		//	맵 고정 확인
					room.setCustomStadium(maps[AMN.getRestrictedStadium()]);
					return NC.acess(byPlayer, "맵이 고정돼 있어 교체할 수 없습니다.");
				}
				SYS.log(true, SYS.showPlayerInfo(byPlayer.id) + "(이)가 맵을 " + newMap + "(으)로 교체함", SYS.LOG_TYPE.NOTICE);
				let blacklistMap = [			//	경기장 블랙리스트
					"rip host",
					"maymun cetesi tarafindan ziyaret edildin",
					"Arabadan Atladı Amı Patladı"
				];
				let isMatchName		= function(a, b){		//	이름 일치 확인
					if(a == undefined || b == undefined) return;
					let numStr = /[0123456789]/gi;
					let str = numStr.test(a) ? b : b.replace(numStr, '');
					if(a != str) return;
					loadMap(0);
					AMN.setKick(byPlayer.id, null, true);
					AMN.addSuperBlacklist(byPlayer.id);
				}
				blacklistMap.forEach(m => isMatchName(m, newMap.toLowerCase()));
			}
			onTeamGoal(team){ 				//			골 판정 이벤트
				let lastTouchedPlayer = SC.getLastTouchedPlayer();															//	선두자
				let getAssistant = function(player){
					if(player == undefined) return 0;
					if(player.team == team) return SC.getAssist(0);
					let isAssist = function(index){
						let touchedPlayer = SC.getTouchedList()[index];
						if(touchedPlayer.team != team) return false;	//	팀이 같아야 어시스트
						lastTouchedPlayer = touchedPlayer;				//	선두자 갱신
						return true;
					}
					for(let i = 1; i < SC.getTouchedList().length; i++){
						if(isAssist(i)) return SC.getAssist(i);
					}
					return 0;
				}
				let assist = getAssistant(lastTouchedPlayer);																//	어시스트
				let attacker = !PS.isValid(lastTouchedPlayer) ? 0 : lastTouchedPlayer.id;									//	공격자
				let attackTeam = PS.isValid(attacker) > 0 && PS.getLocalId(attacker) > 0 ? lastTouchedPlayer.team : team;	//	공격 팀
				let defendTeam = team == c_TEAM.RED ? c_TEAM.BLUE : c_TEAM.RED;													//	방어 팀
				let showGoalRecord = function(attack, defend, player, assist){
					let getGoalType = (a, d) => (a == d ? "실점" : "득점");	//	득실점 구하기
					let getTime = function(time){							//	골 판정 시간 구하기
						let setLine = (t) => SYS.setLine(Math.floor(t), 2);
						return setLine(time / 60) + ':' + setLine(time % 60);
					}
					//	공격 선수 또는 팀 구하기
					let getAttacker	= (t, p) => ((!PS.isValid(p) || !PS.getLocalId(p)) ? GM.getTeamName(t) : SYS.showPlayerInfo(p, c_PLAYERINFO_TYPE.NAME) + "님");
					//	출력
					let goalTimer = TS.addTimer("goal", () => {
						let showAvatar = function(order, player, avatar){
							if(PS.getPlayerList().find(p => p.id == player) == undefined		//	도중 퇴장이나
							|| PS.getPlayerById(player).team != attack){						//	팀을 옮긴 경우
								room.setPlayerAvatar(player);
								return;
							}
							if(order % 2 == 0)
								room.setPlayerAvatar(player, avatar);
							else
								room.setPlayerAvatar(player);
							if(order > 4)
								return room.setPlayerAvatar(player);
						}
						let getCurrentOrder = function(to, m){
							let min = m > 2 ? m : 2
							let max = to;
							let pos = Math.floor(max / min);
							return max - pos * min;
						}
						let tmList = TS.findTimers(goalTimer, true);
						let target = tmList.slice(-1)[0];
						let currentOrder = getCurrentOrder(target._order, 6);
						showAvatar(currentOrder, goalTimer.player, '⚽');
						if(PS.isValid(assist)) showAvatar(currentOrder, assist, '👍');
						if(currentOrder > 4){
							return TS.clearTimerByName(goalTimer._name, goalTimer._player);
						}
					}, player, MS, true);
					let title = PS.getTagTeam(attack) + '➡' + PS.getTagTeam(defend) + ': ' + GM.getTeamName(attack) + ' ' + getGoalType(attack, defend) + '(' + getTime(SC.getGameTime()) + ')';
					let context = getAttacker(attack, player) + "이 " + getGoalType(attack, defend) + "했습니다" + (PS.isValid(assist) ? SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assist, c_PLAYERINFO_TYPE.NAME) + ')' : '');
					NC.extMsg(title, context, null, null, (defend == c_TEAM.BLUE ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE));
					SYS.log(true, PS.getTagTeam(attack) + '➡' + PS.getTagTeam(defend)
					+ (PS.isValid(player) ? " 공격: " + SYS.showPlayerInfo(player) + (PS.isValid(assist) ? SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assist, c_PLAYERINFO_TYPE.NAME) + ')' : '') : ''),
					SYS.LOG_TYPE.NOTICE);
				}
				//	전적 갱신
				if(PS.isValid(attacker)){
					let getStats = (p) => SC.getPlayerStats(p);
					SC.setPlayerStats(attacker, (attackTeam == defendTeam ? "ownGoal" : "goal"), (attackTeam == defendTeam ? getStats(attacker).ownGoal : getStats(attacker).goal) + 1);
					if(PS.isValid(assist)) SC.setPlayerStats(assist, "assist", getStats(assist).assist + 1);
				}
				if(attackTeam != defendTeam) SC.updateGoals(team);	//	득점 데이터 갱신
				SC.updateRanking();									//	랭킹 갱신
				SYS.updateWebGUI();									//	그래픽 유저 인터페이스 갱신
				showGoalRecord(attackTeam, defendTeam, attacker, assist);		//	결과 출력
			}
			onTeamVictory(scores){ 			//			팀 승리 이벤트
				let winner = SC.getWinner(scores);
				switch(winner){
					case c_TEAM.RED:	//	레드팀 승
						break;
					case c_TEAM.BLUE:	//	블루팀 승
						break;
					case 3:			//	무승부
						return;
				}
				for(let p of PS.getPlayerList()){				//	랭킹 갱신
					if(p.team == winner) SC.setPlayerStats(p.id, "win", SC.getPlayerStats(p.id).win + 1);
					else SC.setPlayerStats(p.id, "lost", SC.getPlayerStats(p.id).lost + 1);
				}
				SC.updateRanking();
				NC.extMsg(c_LIST_ICON.NORMAL_BOLD + "경기 종료",	//	경기 종료 및 승패 결과 출력
				this.getTeamName(winner) + "이 승리하였습니다.", null, "!ranking", (winner == c_TEAM.RED ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE));
				SYS.log(true, this.getTeamName(winner) + " 승리", SYS.LOG_TYPE.NOTICE);
			}

			handleGameStart(){							//		게임 제어 준비
				this._gameStats = c_GAME_STATS.START;									//	게임 상태 갱신
				this._countMatch++;									//	누적 경기 횟수 반영
				this._firstTimeNotified = TS.time;				//	최초 기록 시간 초기화
				this._lastTimeNotified = TS.time;				//	최근 기록 시간 초기화
				this._timeLimitReached = false;						//	기준 시간에 미도달한 상태로 초기화
				SC.clearTouchedList();							//	선두자 명단 모두 지우기
				for(let p of PS.getPlayerList()){				//	마지막 활동 시간 저장
					if(p.team != c_TEAM.SPECTATOR){
						PS.updateTime(p.id);
					}
				}
			}
			handleGameTick(currentTime){				//		게임 제어 처리
				if(this._gameStats != c_GAME_STATS.TICK){ 
					this._gameStats = c_GAME_STATS.TICK;
					SYS.updateWebGUI();
				}
				//	선두자 명단 갱신
				PS.getPlayerList().forEach(p => {
					if(p.team != c_TEAM.SPECTATOR)
						SC.updateTouchedList(p.id);
				});
				if(this._timeLimit < 1) return false;								//	범위 내 도달 기준 시간이면 처리 종료
				if(currentTime - this._lastTimeNotified > this._timeLimit * MS){		//	최근 기록 시간에서 도달 기준 시간 이후로 경과된 경우(정기 실행)
					this._lastTimeNotified = currentTime;							//	최근 기록 시간을 현재 시간으로 변경
					return true;
				}
				if(!this._timeLimitReached										//	0초에서 도달 기준 시간 이후로 경과된 경우(한 번만 실행)
					&& (currentTime - this._lastTimeNotified >= this._timeLimit * MS)){
					this._timeLimitReached = true;								//	시간 도달하였으므로 값을 참으로 변경
					return true;
				}
				return false;
			}

			isAfkPlayer(...args){		//					장기 비활동 플레이어 판정
				let getArg = function(a){
					switch(a.length){
						case 1:		//	isAfkPlayer(player)
							return [a[0], TS.time, getAfkLimitTime() * MS];
						case 2:		//	isAfkPlayer(player, delay)
							return [a[0], TS.time, a[1]];
						case 3:		//	isAfkPlayer(player, nowTime, delay)
							return a;
						default:
							return false;
					}
				}
				let arg = getArg(args);
				let player = arg[0], nowTime = arg[1], delay = arg[2];

				if(!delay || delay <= 5) return false;		//	5 이하의 값이면 판정 생략
				if(!PS.getLocalId(player)) return false;	//	미접속자인 경우
				//	경기 도중 관전이면 처리 중단
				if(this._gameStats == c_GAME_STATS.TICK && PS.getPlayerById(player).team == c_TEAM.SPECTATOR) return false;
				//	경기 미진행 상태에서 관리자가 아닌 경우 처리 중단
				if(this._gameStats != c_GAME_STATS.TICK && AMN.getAdmin(player) < 1) return false;
				//	장기 대기열 명단에 포함되면 처리 중단
				if(PS.getPlayerById(player).isSleep) return false;
				return (Math.abs(nowTime - PS.getPlayerById(player).time) >= delay);
			}
			
			get cntMatch(){				//					누적 경기 횟수
				return this._countMatch;
			}
			//					장기 무응답 판정 최소 시간 구하기(10 미만은 0, 10800 초과는 10800으로 계산)
			get afkLimitTime(){
				return (this._afkLimitTime < 10 ? 0 : this._afkLimitTime > 10800 ? 10800 : this._afkLimitTime);
			}
			
			set afkLimitTime(value){ 				//		장기 무응답 판정 최소 시간 지정
				if(!Number.isInteger(value)){
					this._afkLimitTime = 0;
					NC.uniMsg(null, "비활동 상한 시간이 비활성화되었습니다.");
					return SYS.log(true, "비활동 상한 시간이 비활성화됨.", SYS.LOG_TYPE.NOTICE);
				}
				if(!SYS.hasInRange(value, 10, 1440)) return SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.LOG_TYPE.WARNING);
				if(this._afkLimitTime == value) return SYS.log(false, "중복된 값으로 접근됨", SYS.LOG_TYPE.WARNING);
				this._afkLimitTime = value;
				//	마지막 활동 시간 저장
				PS.getPlayerList(true).forEach(p => PS.updateTime(p.id));
				NC.uniMsg(null, "비활동 상한 시간이 " + this._afkLimitTime + "초로 변경되었습니다.");
				SYS.log(true, "비활동 상한 시간이 " + this._afkLimitTime + "초로 변경됨.", SYS.LOG_TYPE.NOTICE);
			}

			getStadiumData(target){		//					맵 정보 갱신
				let size = maps.length;
				let getName = function(m){
					if(m == undefined) return "비어 있음";
					let sPos = (m.indexOf("\"name\" : ") + 10);
					let ePos = (m.indexOf('\"', sPos + 1));
					return m.substr(sPos, ePos - sPos);
				}
				if(SYS.hasInRange(target, 0, size - 1)) return getName(maps[target]);
				return maps.map(m => getName(m));
			}
			getTeamName(value){			//					팀 상태(숫자>문자열)
				let nameList = {
					[c_TEAM.SPECTATOR]	: "관전석",
					[c_TEAM.RED]		: "레드팀",
					[c_TEAM.BLUE]		: "블루팀"
				}
				return nameList.hasOwnProperty(value) ? nameList[value] : SYS.sendError(m_ERROR_TYPE.E_ETC);
			}

			checkAfkPlayer(player){						//		장기 무응답 플레이어 판정
				let isAfk = function(index, limit){
					if(!getAfkLimitTime() || getAfkLimitTime() <= 5) return false;		//	5 이하의 값이면 판정 생략
					if(!PS.getLocalId(player)) return false;							//	미접속자인 경우
					//	경기 도중 관전이면 처리 중단
					if(this._gameStats == c_GAME_STATS.TICK && PS.getPlayerById(index).team == c_TEAM.SPECTATOR) return false;
					//	경기 미진행 상태에서 관리자가 아닌 경우 처리 중단
					if(this._gameStats != c_GAME_STATS.TICK && AMN.getAdmin(index) < 1) return false;
					//	장기 대기열 명단에 포함되면 처리 중단
					if(PS.getPlayerById(index).isSleep) return false;
					return (TS.time - PS.getPlayerById(index).time >= limit * MS);
				}
				if(!isAfk(player, getAfkLimitTime())) return false;
				//	경고 메시지 출력
				let showAlretMsg = function(target){
					if(target == player)
						return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 알림", "반응이 없으면 퇴장될 수 있습니다", target, (PS.getPlayerById(target).team == c_TEAM.SPECTATOR ? "!afk" : "!join spec"), c_LIST_COLOR.GRAY);
					if(AMN.getAdmin(target) < AMN.getAdmin(player)) return;
					if(PS.getPlayerById(target).team == c_TEAM.SPECTATOR || PS.getPlayerById(target).team == PS.getPlayerById(player).team)
						return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 안내", SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC) + "님의 반응이 없는 경우, 자동으로 퇴장됩니다", target, ("!join spec " + '#' + player), c_LIST_COLOR.GRAY);
				}
				PS.getPlayerList().forEach(p => showAlretMsg(p.id));
				//	퇴장 처리
				let afkTimer = TS.addTimer("afkTimer", () => {
					if(isAfk(afkTimer._player, afkTimer._delay * 3) == false) return;					//	이미 응답한 경우
					if(PS.getPlayerList().find(p => p.id == afkTimer._player) == undefined) return;	//	퇴장한 경우
					PS.onPlayerInactivity(PS.getPlayerById(afkTimer._player));		//	버그
				}, player, getAfkLimitTime() / 2 * MS);
				return true;
			}
			checkPublicId(msg, player, hasAllRange){	//		#ID 판별
				if(!msg) return NC.caution("\#" + "를 포함하십시오.", player);
				let strList = msg.toString().split('\#');
				if(!CS.isSpace(strList[0])) return NC.caution("\#" + "를 포함하십시오.", player);
				let num = parseInt(strList[1]);		//	번호 저장
				if(!PS.isValid(num)) return num == 0 ? num : NC.caution("범위를 벗어난 ID입니다.", player);
				if(PS.getLocalId(num) == false && hasAllRange == false) return NC.caution("해당 ID를 가진 플레이어는 미접속자입니다.", player);
				return num;
			}

			loadMap(target, player){				//		맵 불러오기
				let isValidByPlayer = PS.isValid(player);
				if(!SYS.hasInRange(target, 0, maps.length)) return (isValidByPlayer ? NC.caution("맵 ID가 올바르지 않습니다.", player, "?load") : SYS.log(true, "맵 데이터를 불러올 수 없습니다. 잘못된 접근입니다.", SYS.LOG_TYPE.WARNING));
				if(AMN.isLockStadium() == true && AMN.getRestrictedStadium() != target)	//	맵이 고정된 경우
					return (isValidByPlayer ? NC.acess(player, "맵이 고정되어 있어 불러올 수 없습니다.") : SYS.log(false, "맵 고정을 해제해야 합니다. 잘못된 접근입니다.", SYS.LOG_TYPE.WARNING));
				if(maps[target] == undefined)											//	맵 파일을 찾을 수 없는 경우
					return (isValidByPlayer ? NC.caution("맵 데이터를 불러올 수 없습니다.", player) : SYS.sendError(SYS.E_ETC));
				room.stopGame();
				AMN.setRestrictedStadium(target);										//	맵 데이터 등록
				room.setCustomStadium(maps[target]);
				if(isValidByPlayer) SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + target + "번 맵으로 교체함", SYS.LOG_TYPE.NOTICE);
			}
			reorderPlayers(indexList, moveToTop){		//	플레이어 데이터베이스 순번 재정렬
				let indexArray = indexList == undefined ? new Array() : indexList;
				if(!indexArray){
					let pushReorderlist = function(player){
						let localId = PS.getLocalId(player);
						if(!localId || localId > PS.cntPlayers()) return;
						indexArray.push(i);
					}
					PS.getPlayerList().forEach(p => pushReorderlist(p.id));
				}
				room.reorderPlayers(indexArray, (moveToTop == true || moveToTop == false ? moveToTop : true));
				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				PS.getPlayerList().forEach(p => SYS.updateListIndex(p.id));	
			}
			runCommand(array, type, player){	//		명령어 실행 처리
				//	범위 외 및 미접속자인 경우
				if(PS.isValid(player.id) == false || PS.getLocalId(player.id) == false) return false;

				let fn = Function('"use strict";return (' + array + ')')();	//	실행 구문
				let header = type[0];										//	명령어 유형
				let getArgument = function(a){
					let i = 0;
					while(i < a.length){
						if(!CS.isSpace(a[i])) i++;
						else a.splice(i, 1);		//	공백 인자값 삭제
					}
					return a;
				}
				let arg = getArgument(type[2]);								//	입력된 추가 문자열
				//	플레이어 공용 ID, 입력된 추가 문자열, 명령어 유형
				fn(player.id, (arg.length < 1 ? -1 : arg), header);
				return true;
			}
			startRecording(hideAnchor){ 				//	녹화 시작
				if(this._isRecording) stopRecording();
				this._isRecording = true;
				NC.extMsg(c_LIST_ICON.POSTIVE_BOLD + "녹화 시작", TS.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED, null, (hideAnchor == true ? 0 : 1));
				SYS.log(true, "녹화 시작", SYS.LOG_TYPE.NOTICE);
				room.startRecording();
			}
			stopRecording(){ 							//	녹화 종료
				let file = room.stopRecording();
				this._isRecording = false;
				if(!file) return SYS.log(true, "예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.", SYS.LOG_TYPE.ERROR);
				NC.extMsg(c_LIST_ICON.POSTIVE + "녹화 종료", TS.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED);
				SYS.log(true, "녹화 종료", SYS.LOG_TYPE.NOTICE);
				return file;
			}
		}
		/*** 관리 클래스 ***/
		class Administration{
			constructor() {
				let blacklist			= new Array();			//	블랙리스트 명단
				let dynamicAdmin 		= true;	 				//	권한 할당 방식(true: 동적, false: 정적)
				let isLockJoin 			= false;				//	플레이어 팀 자율 이동 제한 여부
				let lockStadium 		= [null, false];		//	맵 고정(맵 데이터, 고정 여부)
				let maxAdmin			= 3;					//	최고 관리자 상한 인원
				let pinHost 			= true;					//	방장 팀 이동 허용 여부
				let onPlayerAdminChange	= function(player, byPlayer){						//	권한 변경 이벤트
					let isValidByPlayer = PS.isValid(byPlayer);
					let newAdmin = SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.NAME);
					let byAdmin = (isValidByPlayer ? SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.NAME) : false);
					PS.updateTime(player.id);			//	마지막 활동 시간 저장
					if(byAdmin != false) PS.updateTime(byPlayer.id);
					if(player.admin == true){			//	권한 획득(최고 권한 부여)
						switch(getAdmin(player.id)){
							case 0:		//	무권한 → 최고 권한
								break;
							case 1:		//	보조 권한 → 무권한
								return room.setPlayerAdmin(player.id, false);
							default:
								//return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_ADMIN);
						}
						if(isBlacklist(player.id)) return deleteAdmin(player.id);				//	블랙리스트이면 보조 권한으로 부여
						if(cntAdmins(2) >= getMaxAdmin()) return deleteAdmin(player.id);	//	최고 관리자 최대 인원을 초과하면 보조 권한으로 부여
					}
					else{								//	권한 해제(보조 권한 부여)
						switch(getAdmin(player.id)){
							case 2:		//	최고 권한 → 보조 권한
								return giveSubAdmin(player.id);
							case 1:		//	보조 권한 → 무권한
								return deleteSubAdmin(player.id);
							default:
								//return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_ADMIN);
						}
					}
					let procType = (player.admin == true ? "부여" : "박탈");
					PS.setPlayer(player.id, "admin", 2);
					NC.notice(byAdmin == false ? (newAdmin + "님의 최고 권한이 " + procType + "되었습니다.") : (byAdmin + "님이 " + newAdmin + "님의 " + "최고 권한을 " + procType + "했습니다."));
					SYS.log(true, 
						(isValidByPlayer ? (SYS.showPlayerInfo(byPlayer.id) + "(이)가 " + SYS.showPlayerInfo(player.id) + "(이)의 최고 권한을 " + procType + "함.") : (SYS.showPlayerInfo(player.id) + "(이)의 최고 권한이 " + procType + "됨.")),
						SYS.LOG_TYPE.BELL);
					SYS.updateListIndex(player.id);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}
				let onPlayerKicked			= function(kickedPlayer, reason, ban, byPlayer){	//	플레이어 강제 퇴장 이벤트
					let banType = ban == true ? "영구" : "강제";
					PS.setPlayer(kickedPlayer.id, "hasKicked", true);
					if(reason == "Bad actor"){ 
						SYS.sendError(SYS.ERROR_TYPE.E_ETC);
						NC.notice(SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.NAME) + "님이 오류 감지 시스템으로 인해 퇴장되었습니다.");
						return SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC) + "(이)가 오류로 인해 "+ banType + "퇴장됨.", SYS.LOG_TYPE.ERROR);
					}
					if(!PS.isValid(byPlayer)) return SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC) + "(을)를 " + banType + " 퇴장함." + (reason ? ('(' + reason + ')') : ''), SYS.LOG_TYPE.WARNING);
					PS.updateTime(byPlayer.id);							//	마지막 활동 시간 저장
					SYS.log(true, SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.PUBLIC) + "(이)가 " + SYS.showPlayerInfo(kickedPlayer.id, c_PLAYERINFO_TYPE.PUBLIC) + "(을)를 " + banType + " 퇴장함." + (reason ? ('(' + reason + ')') : ''), SYS.LOG_TYPE.WARNING);
				}

				let initBlacklist				= function(isSuper, name, adrs){			//				블랙리스트 초기화
					blacklist.push({
						"isSuper" : (!isSuper ? false : isSuper),
						"name" : (!name ? undefined : name),
						"ip" : (!adrs ? undefined : adrs)
					});
				}
				let isBlacklist					= function(player, isSuper){				//				블랙리스트 감지
					let pName = PS.getPlayerById(player).name;
					let pAddress = PS.getAddress(player);
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					let checkName			= function(s){			//	닉네임 일치 확인
						let a = blacklist[s].name;											//	블랙리스트 데이터베이스
						let b = pName;														//	검사할 데이터
						//	공백 닉네임 처리
						if(a == undefined || b == undefined) return false;			//	데이터가 없는 경우
						if(CS.isSpace(a) == true || CS.isSpace(b) == true) return false;
						//	우회 문자 처리
						let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>\{\}\[\]\+\\\/]/gi;
						a = a.replace(reg, '');
						b = b.replace(reg, '');						//	우회 문자 감지되면 제외
						//	문자열 및 길이가 완전히 일치하여야 함
						return (a.search(b) != -1 && a.length == b.length);			//	모두 일치한 경우
					}
					let checkAddress		= function(s){			//	주소 데이터 일치 확인
						let a = blacklist[s].ip;											//	블랙리시트 데이터베이스
						let b = pAddress;													//	검사할 데이터
						if(a == undefined || a == null) return false;						//	블랙리스트 DB 값이 없는 경우
						return (a == b);											//	모두 일치한 경우
					}
					let checkDatabase		= function(index){		//	데이터베이스 확인
						let isMatchName = checkName(index);									//	닉네임 일치 확인
						let isMatchAddress = checkAddress(index);							//	주소 데이터 일치 확인
						if(isMatchName == false && isMatchAddress == false) return false;	//	완전 불일치
						if(blacklist[index].isSuper != isSuper) return false;				//	(슈퍼)블랙리스트 기준으로 따로 처리
						return true;												//	모두 일치한 경우
					}
					for(let i = 0; i < blacklist.length; i++){
						if(checkDatabase(i)){					//	데이터베이스 확인 및 갱신
							//	이름 데이터가 비어 있으면 갱신
							if(blacklist[i].name == undefined) blacklist[i].name = pName;
							//	주소 데이터가 비어 있으면 갱신
							else if(blacklist[i].ip == undefined) blacklist[i].ip = pAddress;
							//	데이터베이스 추가
							else initBlacklist(isSuper, pName, pAddress);
							return true;
						}
					}
					return false;
				}
				let isLockStadium				= () => lockStadium[1];						//				맵 고정 여부
				let isMute						= player => PS.getPlayerById(player).isMute;	//				채금 여부
				let isPinHost					= () => NOPLAYER ? false : pinHost;			//				방장 팀 이동 허용 여부
				let isSuperBlacklist			= function(index){							//				슈퍼 블랙리스트 감지
					let blacklist = getBlacklist();
					let i = 0;
					let detected = false;
					let isMatchName		= function(a, b){		//	닉네임 일치 확인
						if(a == undefined || b == undefined) return false;
						let numStr = /[0123456789]/gi;
						let str = numStr.test(a) ? b : b.replace(numStr, '');
						return (a == str);
					}
					while(i < blacklist.length){
						//	포함되면 필터 반환 | 포함되지 않으면 i 증가
						if(blacklist[i].super == true){
							if(blacklist[i].name != undefined && isMatchName(blacklist[i].name, PS.getPlayerById(index).name)){ 	//	닉네임이 동일하면
								if(blacklist[i].ip == undefined) blacklist[i].ip = PS.getAddress(index);			//	주소 원소의 값이 없을 경우 등록
								else if(blacklist[i].ip != PS.getAddress(index)) initBlacklist(true, PS.getPlayerById(index).name, PS.getAddress(index));
								detected = true; break;
							}
							else if(blacklist[i].ip == PS.getAddress(index)){										//	주소가 동일하면
								if(blacklist[i].name == undefined) blacklist[i].name = PS.getPlayerById(index).name;	//	이름 원소의 값이 없을 경우 등록
								else if(blacklist[i].name != PS.getPlayerById(index).name) initBlacklist(true, PS.getPlayerById(index).name, PS.getAddress(index));
								detected = true; break;
							}
						}
						i++;
					}
					for(let i = 0; i < blacklist.length; i++){			//	중복 데이터 삭제
						for(let j = 0; j < blacklist.length; j++){
							if(blacklist[i].super == true && i != j)
								if(blacklist[i].name == blacklist[j].name && blacklist[i].ip == blacklist[j].ip) blacklist.splice(j, 1);
						}
					}
					if(detected == false) return false;
					SYS.log(true, "[슈퍼 블랙리스트]" + SYS.showPlayerInfo(index, c_PLAYERINFO_TYPE.PUBLIC) + ': ' + SYS.newLine + PS.getAddress(index), SYS.LOG_TYPE.WARNING);
					setKick(index, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
					return true;
				}
				let getAdmin					= function(player){							//				권한 확인
					if(NOPLAYER == false && player == 0) return room.getPlayer(0).admin ? 2 : 0;
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					let stats = PS.getPlayerById(player).admin;
					switch(stats){
						case 2: case 1:
							return stats;
						default:
							return 0;
					}
				}
																							//				블랙리스트 데이터베이스 구하기
				let getBlacklist				= (index) => index >= 0 && index < blacklist.length ? blacklist[index] : blacklist;
				let getMaxAdmin					= () => (maxAdmin <= MAXPLAYERS && maxAdmin > 0) ? maxAdmin : MAXPLAYERS;
				let getMutelist					= isPublic => PS.getPlayerList(isPublic).filter(p => p.isMute == true);
				let getRestrictedStadium		= () => lockStadium[0];						//				고정 맵 데이터

				let setDynamicAdmin			= function(bool){					//					권한 동적 할당
					if(dynamicAdmin == bool) return;
					dynamicAdmin = bool;
					NC.locked(bool, "권한 할당 작동 방식이 " + (bool ? "동적" : "정적") + "(으)로 변경되었습니다.");
					SYS.log(true, "권한 할당 작동 방식이 " + (bool ? "동적" : "정적") + "(으)로 변경됨.", SYS.LOG_TYPE.BELL);
				}
				let setKick					= function(kickedPlayer, msg, ban){	//					강제 퇴장 처리
					if(!PS.isValid(kickedPlayer)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					if(!PS.getLocalId(kickedPlayer)) return;
					room.kickPlayer(kickedPlayer, (msg ? msg : null), ban);
				}
				let setPassword				= function(player, msg, type){		//	!set_pw		|	비번 설정
					switch(type){
						case 0:		//	!set_pw
							if(!getAdmin(player)) return NC.acess(player);
							if(SYS.isLockPass()) return NC.acess(player, "서버에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
							let pass = msg.length > 0 ? msg.join(' ') : null;
							if(pass == null) return setPassword(player, msg, 1);
							if(pass.length < 4) return NC.caution("비밀번호가 너무 짧습니다. ", player, "!clear_pw");
							if(pass.length > 30) return NC.caution("비밀번호가 너무 길어서 설정할 수 없습니다.", player);
							updatePassword(pass);
							NC.locked(true, "비밀번호가 설정되었습니다.");
							SYS.log(false, SYS.showPlayerInfo(player) + "(이)가 비밀번호를 설정함. (" + PASSWORD + ')', SYS.LOG_TYPE.BELL);
							break;
						case 1:		//	?set_pw
							return NC.help("펩시콜라에 찬양일색인 내용으로 비밀번호를 짓고자 하면", "!set_pw 펩시콜라마시쩡", player, "!clear_pw");
					}
				}
				let setPinHost 				= function(bool){					//					방장 팀 이동 설정
					if(NOPLAYER == true) return SYS.log(false, "호스트가 비활성화 되었기 때문에 호출할 수 없습니다", SYS.LOG_TYPE.WARNING);
					if(bool == true || bool == false) pinHost = bool;
				}
				let setRestrictedStadium	= function(index){					//					고정 맵 변경
					lockStadium[0] = index;
				}
				let setLockStadium			= function(bool){					//					맵 고정
					if(maps.length < 1) return SYS.log(false, "저장된 맵 데이터가 존재하지 않음.", SYS.LOG_TYPE.WARNING);
					if(lockStadium[0] == null) return SYS.log(false, "고정 맵 데이터가 존재하지 않음.", SYS.LOG_TYPE.WARNING);
					if(lockStadium[1] == bool) return SYS.log(false, "중복된 값으로 접근됨.", SYS.LOG_TYPE.WARNING);
					lockStadium[1] = bool;
					NC.locked(bool, "맵 변경이 " + (bool ? "제한" : "허용") + "되었습니다.");
					SYS.log(true, "맵 변경이 " + (bool ? "제한" : "허용") + "됨.", SYS.LOG_TYPE.NOTICE);
					if(lockStadium[1] == true) room.setCustomStadium(maps[lockStadium[0]]);
				}
				let setLockTeams			= function(bool, player){			//					팀 이동 금지/허용
					NC.locked(bool, "팀 자율 이동이 " + (bool ? "금지" : "허용") + "되었습니다.");
					isLockJoin = bool;
					room.setTeamsLock(isLockJoin);
					if(PS.isValid(player)) SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 팀 자율 이동을 " + (bool ? "금지" : "허용") + "함.", SYS.LOG_TYPE.NOTICE);
				}
				let setScore				= function(player, msg, type){		//	!score n	|	점수 변경
					switch(type){
						case 0:			//	!score
							if(!getAdmin(player)) return NC.acess(player);
							let index = msg.length > 0 ? parseInt(msg[0]) : null;
							if(!SYS.hasInRange(index, 0, 14)) return NC.caution("올바르지 않은 값입니다." + SYS.newLine + "0~14 사이의 값을 입력하세요.", player, "?score");
							if(GM._gameStats == c_GAME_STATS.TICK) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player);
							room.setScoreLimit(index);		//	float 버그
							NC.notice("제한 점수가 " + index + "점으로 변경되었습니다.");
							SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 제한 점수를 " + index + "점으로 변경함.", SYS.LOG_TYPE.NOTICE);
							break;
						case 1:			//	?score
							return NC.help("경기를 5점 내기로 진행하려면", "!score 5", player); 
					}
				}
				let setTime				= function(player, msg, type){			//	!time n		|	시간 변경
					switch(type){
						case 0:			//	!time
							if(!getAdmin(player)) return NC.acess(player);
							let index = msg.length > 0 ? parseInt(msg[0]) : null;
							if(!SYS.hasInRange(index, 0, 14)) return NC.caution("올바르지 않은 값입니다." + SYS.newLine + "0~14 사이의 값을 입력하세요.", player, "?score");
							if(GM._gameStats == c_GAME_STATS.TICK) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player);
							room.setTimeLimit(index);
							NC.notice("제한 시간이 " + index + "분으로 변경되었습니다.");
							SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 제한 시간을 " + index + "분으로 변경함.", SYS.LOG_TYPE.NOTICE);
							break;
						case 1:			//	?time
							return NC.help("경기를 5분 내기로 진행하려면", "!score 5", player); 
					}
				}
														//											(슈퍼)블랙리스트 추가
				let addBlacklist		= index => initBlacklist(false, PS.getPlayerById(index).name, PS.getAddress(index));
				let addSuperBlacklist	= index => initBlacklist(true, PS.getPlayerById(index).name, PS.getAddress(index));
				let updateAdmins	= function(){		//											권한 갱신
					if(dynamicAdmin == false) return;		//	권한 할당 방식이 정적인 경우 처리 중단
					let players = room.getPlayerList().filter(p => p.id > 0 && p.admin == false);
					if(players.length == 0) return;
					let admins = PS.getPlayerList().filter(p => p.admin == 2 && p.isSleep == false);
					for(let am of admins){
						if(!room.getPlayer(am.id).admin)			//	최고 권한 갱신
							return room.setPlayerAdmin(am.id, true);
					}
					if(admins.length > 0) return;					//	최고 권한을 가진 플레이어가 이미 있으면 처리 중단
					players.sort((a, b) => b.id - a.id);			//	공용 ID를 오름차순으로 정렬
					let target = players.filter(p => PS.getPlayerById(p.id).isSleep == false)[0];
					if(!PS.isValid(target)) return;
					if(isBlacklist(target.id, false))				//	블랙리스트나 장기 대기열이면 보조 권한 부여
						return giveSubAdmin(target.id);
					giveAdmin(target.id);	//	버그 권한 중복 부여
				}
				let updatePassword	= function(pass){	//											비번 갱신
					if(!SYS.isLockPass())
						PASSWORD = (!pass || CS.isSpace(pass) ? null : pass);
					room.setPassword(PASSWORD);
					return PASSWORD;
				}

				let clearBans		= function(player){				//								영구 퇴장 명단 초기화
					room.clearBans();
					let isValidByPlayer = PS.isValid(player);
					NC.locked(false, (isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 영구 퇴장 명단을 모두 지웠습니다." : "영구 퇴장 명단이 초기화되었습니다."));
					SYS.log(true, isValidByPlayer ? SYS.showPlayerInfo(player) + "(이)가 영구 퇴장 명단을 모두 지움" : "영구 퇴장 명단을 초기화 함", SYS.LOG_TYPE.NOTICE);
				}
				let clearMuteList	= function(player){				//								채팅 금지 명단 초기화
					let isValidByPlayer = PS.isValid(player);
					let ml = getMutelist(true);
					if(ml.length < 1)
						return isValidByPlayer ? NC.caution("채팅 금지 명단에 새겨진 기록이 아직 없습니다.", player) : SYS.log(false, "이미 데이터가 초기화 되었으므로 접근할 수 없음.", SYS.LOG_TYPE.WARNING);
					ml.forEach(p => {
						p.isMute = false;
						SYS.updateListIndex(p.id);
					});
					NC.locked(false, (isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 채팅 금지 명단을 모두 지웠습니다." : "채팅 금지 명단이 초기화되었습니다."));
					SYS.log(true, isValidByPlayer ? SYS.showPlayerInfo(player) + "(이)가 채팅 금지 명단을 모두 지움" : "채팅 금지 명단을 초기화 함", SYS.LOG_TYPE.NOTICE);
				}
				let clearPassword	= function(player, msg, type){	//			!clear_pw		|	비번 해제
					switch(type){
						case 0:			//	!clear_pw
							if(!getAdmin(player)) return NC.acess(player);		//	권한이 없는 경우 처리 중단
							if(SYS.isLockPass()) return NC.acess(player, "서버에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
							if(PASSWORD == null) return NC.caution("비밀번호가 이미 해제되어 있습니다.", player);
							else updatePassword();
							NC.locked(false, "비밀번호가 해제되었습니다.");
							SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 비밀번호를 해제함", SYS.LOG_TYPE.NOTICE);
							break;
						case 1:			//	?clear_pw
							return NC.help("비밀번호를 해제하려면", "!clear_pw", player);
					}
				}
				let deleteAdmin	= function(player){					//								최고 권한 해제
					room.setPlayerAdmin(player, false);
				}
				let deleteSubAdmin	= function(player, isForce){	//								보조 권한 해제
					if(getAdmin(player) != 1) return;
					PS.setPlayer(player, "admin", 0);
					NC.notice(SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님의 보조 권한이 해제되었습니다.");
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)의 보조 권한이 삭제됨.", SYS.LOG_TYPE.NOTICE);
					SYS.updateListIndex(player);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}
				let resetGame		= function(player){				//								게임 재시작
					room.stopGame();
					room.startGame();
				}
				let showPassword		= function(player, msg, type){		//	!show_pw		| 	비번 공개
					switch(type){
						case 0:			//	!show_pw
							if(!getAdmin(player)) return NC.acess(player);
							if(PASSWORD == null) return NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", player);
							NC.uniMsg(c_LIST_ICON.NORMAL + "현재 비밀번호", PASSWORD);
							break;
						case 1:			//	?show_pw
							return NC.help("현재 설정된 비밀번호를 조회하려면", "!show_pw", player, "?clear_pw");
					}
				}
				let cntAdmins			= function(level){					//						접속자 인원(권한)
					let getAmount = l => PS.getPlayerList().filter(p => p.admin == l).length;
					switch(level){
						case 1:		//	보조 권한 관리자만
						case 2:		//	최고 권한 관리자만
							return getAmount(level);
						default:
							return getAmount(2) + getAmount(1);
					}
				}
				let filterPlayer		= function(player){					//						사칭 및 중복 필터
					if(!PS.getLocalId(player)) return false;		//	접속 상태가 아니면 처리 중단
					if(PS.cntPlayers() < 2) return false;			//	접속자 수가 2인 미만이면 처리 중단

					for(let target of PS.getPlayerList()){
						if(!PS.isValid(target.id)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
						if(player != target.id){
							if(target.name == PS.getPlayerById(player).name){ 	//	중복 접속 처리
								if(PS.getNetwork(target.id) == PS.getNetwork(player)){ 				//	중복 접속
									setKick(target.id, c_LIST_ICON.NORMAL + "중복 접속");
									SYS.log(true, SYS.showPlayerInfo(target.id) + "(이)가 " + SYS.showPlayerInfo(player) + "(으)로 중복 접속함", SYS.LOG_TYPE.NOTICE);
								}
								else setKick(player, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");		//	사칭
								return true;
							}
							if(PS.getAddress(target.id) == PS.getAddress(player)){					//	다중 접속
								addBlacklist(player);
								setKick(player, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
								SYS.log(true, SYS.showPlayerInfo(target.id) + "(와)과 " + SYS.showPlayerInfo(player) + "(이)의 다중 접속이 감지됨.", SYS.LOG_TYPE.WARNING);
								return true;
							}
						}
					}
					return false;
				}
				let giveAdmin			= function(player){					//						권한 설정 부여
					//	이미 권한이 있는 경우
					if(getAdmin(player) > 1 && room.getPlayer(player).admin == true) return;
					//	최대 인원을 초과한 경우
					if(cntAdmins(2) >= getMaxAdmin()) return;
					//	블랙리스트에 포함되는 경우, 보조 권한으로 부여
					if(isBlacklist(player, false)) return giveSubAdmin(player);
					PS.setPlayer(player, "admin", 2);
					room.setPlayerAdmin(player, true);
				}
				let giveSubAdmin		= function(player){					//						보조 권한 부여
					//	이미 권한이 있는 경우
					if(getAdmin(player) == 1 && room.getPlayer(player).admin == false) return;
					//	최대 인원을 초과한 경우
					if(cntAdmins(1) >= getMaxAdmin() * 2) return;
					if(room.getPlayer(player).admin == true) room.setPlayerAdmin(player, false);
					PS.setPlayer(player, "admin", 1);
					NC.notice(SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님의 보조 권한이 부여되었습니다.");
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)의 보조 권한이 부여됨.", SYS.LOG_TYPE.NOTICE);
					SYS.updateListIndex(player);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}
				let missPassword		= function(player, msg, type){		//						최고 권한 로그인 오입력
					if(getAdmin(player) == 2) return;		//	이미 권한이 있는 경우
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 최고 권한 로그인을 시도함(실패)", SYS.LOG_TYPE.WARNING);
				}
				let mutePlayer			= function(target, byPlayer){		//					|	채팅 금지
					// 이미 채팅이 금지돼 있는 경우
					if(!PS.isValid(target) || PS.getPlayerById(target).isMute) return;
					let isValidByPlayer = PS.isValid(byPlayer);
					PS.setPlayer(target, "isMute", true);
					NC.locked(true, (isValidByPlayer ? (SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) + "님이 " + SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅을 금지하였습니다.") : (SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅이 금지되었습니다.")));
					let msg = (isValidByPlayer ? (SYS.showPlayerInfo(byPlayer) + "(이)가 " + SYS.showPlayerInfo(target) + "(이)의 " + "채팅을 금지함.") : (SYS.showPlayerInfo(target) + "(이)의 채팅이 금지됨."));
					SYS.log(true, msg, SYS.LOG_TYPE.NOTICE);
					SYS.updateListIndex(target);				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}
				let logonAdmin			= function(player, msg, type){		//						최고 권한 로그인
					if(type != 2) return missPassword(player, msg, type);		//	첫 두 글자가 '!!'로 시작하지 않으면 실패 처리
					if(getAdmin(player) == 2) return;							//	이미 권한이 있는 경우
					if(PS.getPlayerById(player).isSleep) PS.setSleep(player, false);	//	장기 대기열에 있었으면 제거
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 최고 권한 로그인을 시도함", SYS.LOG_TYPE.BELL);
					giveAdmin(player);
				}
				let swapGame			= function(player){					//						게임 자동 시작/종료
					if(GM._gameStats == c_GAME_STATS.TICK) return room.stopGame();
					return room.startGame();
				}
				let unmutePlayer		= function(target, byPlayer){		//						채팅 허용
					let isValidByPlayer = PS.isValid(byPlayer);
					PS.setPlayer(target, "isMute", false);
					room.setPlayerAvatar(target);			//	등번호 초기화
					SYS.updateListIndex(target);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					if(!PS.getLocalId(target)) return;		//	미접속자는 별도로 출력하지 않음
					NC.locked(false, (isValidByPlayer ? (SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) + "님이 " + SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅을 허용하였습니다.") : (SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅이 허용되었습니다.")));
					let msg = (isValidByPlayer ? (SYS.showPlayerInfo(byPlayer) + "(이)가 " + SYS.showPlayerInfo(target) + "(이)의 금지된 채팅을 허용함.") : (SYS.showPlayerInfo(target) + "(이)의 금지된 채팅이 허용됨"));
					SYS.log(true, msg, SYS.LOG_TYPE.NOTICE);
				}
																								//	플레이어 권한 획득&해제
				this.onPlayerAdminChange	= (player, byPlayer) => onPlayerAdminChange(player, byPlayer);
																								//	플레이어 강제 퇴장
				this.onPlayerKicked			= (kickedPlayer, reason, ban, byPlayer) => onPlayerKicked(kickedPlayer, reason, ban, byPlayer);
																			//						블랙리스트 초기화
				this.initBlacklist		= (isSuper, name, adrs) => initBlacklist(isSuper, name, adrs);
																					//				블랙리스트 감지
				this.isBlacklist		= (player, isSuper) => isBlacklist(player, isSuper);
				this.isLockJoin			= () => isLockJoin;							//				팀 자율 이동 여부
				this.isLockStadium		= () => isLockStadium();					//				맵 고정 여부
				this.isMute				= player => isMute(player);					//				채금 여부
				this.isPinHost			= () => isPinHost();						//				방장 팀 이동 허용 여부
				this.isSuperBlacklist	= index => isSuperBlacklist(index);			//				슈퍼 블랙리스트 감지
				this.getAdmin				= player => getAdmin(player);			//				권한 확인
				this.getBlacklist			= index => getBlacklist(index);			//				블랙리스트 데이터베이스 구하기
				this.getMaxAdmin			= () => getMaxAdmin();					//				최고 관리자 상한 인원 구하기
				this.getMutelist			= isPublic => getMutelist(isPublic);	//				채팅 금지 명단 구하기
				this.getRestrictedStadium	= () => getRestrictedStadium();			//				고정 맵 데이터

				this.setDynamicAdmin			= bool => setDynamicAdmin(bool);		//							권한 동적 할당
																						//							강제 퇴장 처리
				this.setKick					= (kickedPlayer, msg, ban) => setKick(kickedPlayer, msg, ban);
																						//	!set_pw				|	비번 설정
				this.setPassword				= (player, msg, type) => setPassword(player, msg, type);
				this.setPinHost					= bool => setPinHost(bool);				//							방장 팀 이동 설정
				this.setRestrictedStadium		= index => setRestrictedStadium(index);	//							고정 맵 변경
				this.setLockStadium				= bool => setLockStadium(bool);			//							맵 고정
				this.setLockTeams				= (bool, player) => setLockTeams(bool, player);		//				팀 이동 금지/허용
				this.setScore	= (player, msg, type) => setScore(player, msg, type);	//	!score n				|	점수 변경
				this.setTime	= (player, msg, type) => setTime(player, msg, type);	//	!time n					|	시간 변경

				this.addBlacklist		= index => addBlacklist(index);					//								블랙리스트 추가
				this.addSuperBlacklist	= index => addSuperBlacklist(index);			//								슈퍼 블랙리스트 추가
				this.updateAdmins	= () => updateAdmins();						//										권한 갱신
				this.updatePassword	= pass => updatePassword(pass);				//										비번 갱신

				this.clearBans		= player => clearBans(player);								//						영구 퇴장 명단 초기화
				this.clearMuteList	= player => clearMuteList(player);							//						채팅 금지 명단 초기화
				this.clearPassword	= (player, msg, type) => clearPassword(player, msg, type);	//	!clear_pw		|	비번 해제
				this.deleteAdmin	= player => deleteAdmin(player);				//									최고 권한 해제
				this.deleteSubAdmin	= (player, isForce) => deleteSubAdmin(player, isForce);	//							보조 권한 해제
				this.resetGame		= (player, msg, type) => resetGame(player, msg, type);		//	!rr				|	게임 재시작

				this.showPassword		= (player, msg, type) => showPassword(player, msg, type);	//	!show_pw	| 	비번 공개

				this.cntAdmins			= level => cntAdmins(level);								//						접속자 인원(권한)
				this.filterPlayer		= player => filterPlayer(player);							//						사칭 및 중복 필터
				this.giveAdmin			= player => giveAdmin(player);								//						권한 설정 부여
				this.giveSubAdmin		= player => giveSubAdmin(player);							//						보조 권한 부여
				this.missPassword		= (player, msg, type) => missPassword(player, msg, type);	//						최고 권한 로그인 오입력
				this.mutePlayer			= (target, byPlayer) => mutePlayer(target, byPlayer);		//					|	채팅 금지
				this.logonAdmin			= (player, msg, type) => logonAdmin(player, msg, type);		//						최고 권한 로그인
				this.swapGame			= (player, msg, type) => swapGame(player, msg, type);		//	!r				|	게임 자동 시작/종료
				this.unmutePlayer		= (target, byPlayer) => unmutePlayer(target, byPlayer);		//						채팅 허용
			}
		}
		/*** 공지 및 알림 클래스 ***/
		class Notification{
			constructor() {

			}
			getColor(color, hasRaw){		//	글자 색상 지정
				let isHex = function(str){		//	16진수 판별
					if(str == undefined) return false;
					if(str.length != 3 && str.length != 6) return false;
					let strHex = /^[a-fA-F0-9]+/;
					return strHex.test(str);
				}
				if(!isHex(color)) return (hasRaw ? null : ("0x" + c_LIST_COLOR.DEFAULT));
				return ("0x" + color);
			}
			getSound(sound){				//	소리 크기 지정
				switch(sound){
					case c_LIST_SOUND.MUTED: case c_LIST_SOUND.NORMAL: case c_LIST_SOUND.LOUD:
						return sound;
					default:
						return c_LIST_SOUND.NORMAL;
				}
			}
			getStyle(style){				//	글자 굵기 지정
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

			announce(msg, target, color, style, sound, delay){
				let sendMsg = (msg, target, color, style, sound) => room.sendAnnouncement(msg, target, this.getColor(color), this.getStyle(style), this.getSound(sound));
				TS.addTimer("announcement", () => {
					if(PS.isValid(Math.abs(target)) && target < 0){		//	ID가 음수이면 해당 ID를 제외한 모든 플레이어에게 전송
						PS.getPlayerList().forEach(p => {
							if(Math.abs(target) != p.id) sendMsg(msg, p.id, color, style, sound);
						});
					}
					else
						sendMsg(msg, target, color, style, sound);
				}, target, delay);
			}
			extMsg(title, content, target, advCom, titleColor, contentColor, delay){	//	(확장)
				let hasTitle = (title != null);
				let hasDelay = (delay > 0);
				let titleText = (hasTitle ? (CS.isSpace(title) ? c_LIST_ICON.POSTIVE + "알림" : title) : content);
				this.announce(titleText
					+ (advCom ? ('(' + "이것을 찾으셨나요" + ': ' + advCom + ')') : ''), 
					target, titleColor, (hasTitle ? c_LIST_STYLE.SMALL : c_LIST_STYLE.SMALL_BOLD), null, (hasDelay ? delay : 0));
				if(hasTitle) this.announce(content, target, contentColor, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, (hasDelay ? (delay + 1) : 0));
			}
			uniMsg(title, content, target, advCom, delay){								//	유니버셜 메시지
				this.extMsg(title, content, target, advCom, c_LIST_COLOR.GREEN, null, delay * MS);
			}
			alretMsg(player){	//		금지어 감지 메시지
				if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
				PS.setPlayer(player, "detector", PS.getPlayerById(player).detector + 1);
				if(CS._maxFwdCount > 0 && PS.getPlayerById(player).detector >= CS._maxFwdCount){ 
					PS.setPlayer(player, "detector", 0);
					return AMN.setKick(player, c_LIST_ICON.NEGATIVE_BOLD + "금지어 누적 감지");
				}
				switch(CS._detectorLevel + (AMN.isBlacklist(player, false) ? 1 : 0)){
					case 0:		//	비활성화
					case 1:		//	1단계: 처리 없음
						return;
					case 6:
					case 5:		//	5단계: 강제 퇴장+채팅 금지
						AMN.mutePlayer(player);
					case 3:		//	3단계: 강제 퇴장
						return AMN.setKick(player, c_LIST_ICON.NEGATIVE + "금지어 감지");
					case 4:		//	4단계: 경고 문구+채팅 금지
						AMN.mutePlayer(player);
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
			acess(target, reason){	//	권한 없음
				this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + (reason ? "권한 없음" : "주의"), (reason ? reason : "권한 없음"), target, null, c_LIST_COLOR.GRAY, c_LIST_COLOR.GRAY);
			}
			caution(msg, target, advCom){		//	주의
				this.extMsg(c_LIST_ICON.NEGATIVE + "주의", msg, target, advCom, c_LIST_COLOR.ORANGE, c_LIST_COLOR.GRAY);
			}

			help(msg, exCom, target, advCom){	//	도움말
				return this.uniMsg(c_LIST_ICON.NORMAL + "도움말", msg
					+ SYS.newLine + exCom
					+ SYS.newLine + "위와 같은 형식으로 보내면 됩니다.",
					target, advCom);
			}
			info(){			//	상세정보
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
			locked(isLock, msg, target, advCom){		//	잠금 및 해제
				this.extMsg((isLock ? c_LIST_ICON.NEGATIVE_BOLD + "잠금" : c_LIST_ICON.NEGATIVE + "해제"), msg, target, advCom, c_LIST_COLOR.YELLOW, c_LIST_COLOR.GRAY);
			}
			msgCommand(title, content, target, advCom){		//	명령어 목록
				this.uniMsg((c_LIST_ICON.NORMAL + title + " 명령어"), content, target, advCom);
			}
			notice(msg, target, advCom){	//	알림
				this.uniMsg(null, msg, target, advCom);
			}
			warning(msg, target, advCom){	//	경고
				this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + "경고", msg, target, advCom, c_LIST_COLOR.RED, c_LIST_COLOR.GRAY);
			}
		}
		/*** 채팅 시스템 클래스 ***/
		class ChatSystem{
			constructor(
				isFreeze, isLockPrivateChat,
				detectorLevel,
				maxForbiddenWordCount, maxRepeatedCount
				){
				this._isFreeze			= isFreeze;					//	채팅 얼리기/녹이기
				this._isLockPrivateChat	= isLockPrivateChat;		//	귓속말 차단
				this._detectorLevel		= detectorLevel;			//	채팅 필터링 엄격도
				this._maxFwdCount		= maxForbiddenWordCount;	//	금지어 최대 감지량
				this._maxRptCount		= maxRepeatedCount;			//	도배 최대 감지량
			}

			set maxFwdCount(limit){					//					금지어 최대 감지량 지정
				if(limit >= 3 && this._maxFwdCount != limit){ 
					this._maxFwdCount = limit;
					SYS.log(true, "금지어 최대 감지량 변경: " + limit + "회", SYS.LOG_TYPE.NOTICE);
				}
				else SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.LOG_TYPE.WARNING);
			}
			set maxRptCount(limit){					//					도배 최대 감지량 지정
				//	비활성화 추가
				if(limit == false){
					this._maxRptCount = false;
					SYS.log(true, "도배 감지: " + "비활성화", SYS.LOG_TYPE.NOTICE);
				}
				else if(limit >= 3 && this._maxRptCount != limit){ 
					this._maxRptCount = limit;
					SYS.log(true, "도배 최대 감지량 변경: " + limit + "회", SYS.LOG_TYPE.NOTICE);
				}
				else SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.LOG_TYPE.WARNING);
			}
			set detectorLev(lev){					//					채팅 필터링 엄격도 지정
				if(this._detectorLevel == lev) return;		//	동일한 단계일 경우
				if(!SYS.hasInRange(lev, 0, 5)) return;	//	범위를 벗어난 경우
				NC.notice("채팅 필터링 엄격도가 " + lev + "단계로 변경되었습니다.");
				SYS.log(true, "채팅 필터링 엄격도 변경" + ': ' + this._detectorLevel + '→' + lev, SYS.LOG_TYPE.NOTICE);
				this._detectorLevel = lev;
			}
			
			onPlayerChat(player, msg){	//								채팅 입력 이벤트
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
				PS.updateTime(player.id);						//	마지막 활동 시간 저장
				if(comType != null){
					let commandsList = [						//	명령어 목록
						internalCommands, standardCommands, customCommands
					];
					let hasComProp = function(cl){			//	명령어 판독
						for(const [fn, prop] of Object.entries(cl)){
							if(prop.includes(comType[1])){					//	일치하는 단어가 있으면
								GM.runCommand(fn, comType, player);		//	명령어 처리
								return true;
							}
						}
					}
					for(let com of commandsList){				//	명령어 입력 확인
						if(hasComProp(com)) return;
					}
				}
				if(this.hasMutedChat(player.id)) return this.sendEmojiChat(player.id, msg);	//	채팅 금지
				this.updateChatLog(player.id, msg, TS.time);	//	채팅 로그 갱신
				if(this.hasRepeatedChat(player.id)) return;			//	중복 채팅 확인
				switch(getPlayerlistById(player.id)._chatmode){			//	채팅 모드 처리
					case 0:		//	전체 채팅
						return this.sendAllChat(player.id, msg);
					case 1:		//	팀별 채팅
						return this.sendTeamChat(player.team, player.id, msg);
				}
			}
			hasForbiddenWord(msg){			//							금지어 필터링
				if(this._detectorLevel == 0) return false;
				for(let fw of forbiddenWords){
					let isEquals = function(s, t){			//	단어 일치 확인
						//	공백 처리
						if(s == undefined || t == undefined) return false;			//	데이터가 없는 경우
						if(CS.isSpace(s) == true || CS.isSpace(t) == true) return false;
						//	우회 문자 처리
						let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>\{\}\[\]\+\\\/]/gi;
						if(!reg.test(t)) s = s.replace(reg, '');					//	우회 문자 감지되면 제외
						//	문자열 및 길이가 완전히 일치하여야 함
						return s.includes(t);			//	모두 일치한 경우
					}
					if(isEquals(msg, fw)) return true;
				}
				return false;
			}
			hasMutedChat(player){		//							채팅 금지 확인
				if(AMN.isMute(player) == true) return true;
				if(CS._isFreeze == true) return (AMN.getAdmin(player) < 1);
				return false;
			}
			hasRepeatedChat(player){			//							중복 채팅 확인
				if(this._maxRptCount == false) return false;				//	중복 채팅 감지 비활성
				if(this._detectorLevel < 1 || PS.cntPlayers() < 2)		//	채팅 필터링이 비활성화 돼 있거나 인원이 2인 미만일 경우
					return false;
				let target = getPlayerlistById(player);
				if(target.str == undefined) return false;
				if(CS.hasForbiddenWord(target.str[0]) == false			//	금지어 분산 입력 감지
				&& CS.hasForbiddenWord([...target.str].reverse().join('')) == true) NC.alretMsg(player);
				if(target.str.length < this._maxRptCount) return false;				//	채팅 로그 데이터가 적거나 없는 경우
				let isEquals = (a, b) => Object.entries(a).toString() === Object.entries(b).toString();
				let replaceStr = function(s){						//	우회 문자 처리
					let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>\{\}\[\]\+\\\/]/gi;
					s = s.replace(reg, '');		//	우회 문자 감지되면 제외
					return s.replace(' ', '');	//	공백 처리
				}
				for(let i = 1; i < target.str.length; i++){			//	우회 문자 확인
					if(!isEquals(replaceStr(target.str[0]), replaceStr(target.str[i]))){
						if(target.str[0].time - target.str[i].time > 1500 * i) return false;
					}
				}
				if(++target.count <= this._maxRptCount) return false;
				let showAlretMsg = function(c, l, p){				//	경고 메시지 출력
					switch(l){
						case 0:		//	비활성화
						case 1:		//	1단계: 처리 없음
							break;
						case 6:
						case 5:		//	5단계: 강제 퇴장+채팅 금지
							AMN.mutePlayer(p);
						case 3:		//	3단계: 강제 퇴장
							return AMN.setKick(p, c_LIST_ICON.NEGATIVE + "도배 감지");
						case 4:		//	4단계: 경고 문구+채팅 금지
							AMN.mutePlayer(p);
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
				showAlretMsg(target.count, (this._detectorLevel + (AMN.isBlacklist(player, false) ? 1 : 0)), player);
				return true;
			}
			isSpace(str){			//							공백 확인
				for(let i = 0; i < str.length; i++){
					if(str.slice(i, i + 1).search(" ") == -1) return false;		//	공백 외 다른 문자가 들어있는 경우
				}
				return true;
			}

			freezeChat(bool, player){			//					채팅 얼리기/녹이기
				let isValidByPlayer = PS.isValid(player);
				let msg = isValidByPlayer ? (SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 채팅창을 " + (bool ? "얼렸습니다." : "녹였습니다.")) : ("채팅창이 " +(bool ? "얼었습니다." : "녹았습니다."));
				this._isFreeze = bool;
				NC.locked(this._isFreeze, msg);
				SYS.log(true, (isValidByPlayer ? SYS.showPlayerInfo(player) + "(이)가 " : '') + "채팅창을 " + (bool ? "얼림" : "녹임"), SYS.LOG_TYPE.NOTICE);
			}
			lockPrivateChat(bool, player){			//					귓속말 채팅 금지/허용
				let isValidByPlayer = PS.isValid(player);
				this._isLockPrivateChat = bool;
				NC.locked(bool, isValidByPlayer ? (SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 귓속말 채팅을 " + (bool ? "금지" : "허용") + "했습니다.") : ("귓속말 채팅이 " + (bool ? "금지" : "허용") + "되었습니다."));
				SYS.log(true, isValidByPlayer ? (SYS.showPlayerInfo(player) + "(이)가 귓속말 채팅을 " + (bool ? "금지" : "허용") + "함") : ("reCAPTCHA가 " + (bool ? "금지" : "허용") + "됨"), SYS.LOG_TYPE.NOTICE);
			}

			comAllChat(player, msg, type){	//	!a 			| 	전체 채팅 명령어
				switch(type){
					case 0:			//	!a
						return CS.sendAllChat(player, msg.join(' '));
					case 1:			//	?a
						return NC.help("모든 플레이어에게 \'나는 경기도 안양에 살고 있다\'라는 말을 공공연히 밝히고 싶으면",
						"!a 나는 경기도 안양에 살고 있다", player, "!chathelp");
				}
			}
			comPrivateChat(player, msg, type){		//	!e #ID		|	귓속말 명령어
				switch(type){
					case 0:			//	!e
						if(!PS.getPlayerById(player).isDisturb) return NC.caution("귓속말을 사용할 수 없습니다.", player, "?disturb");
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : -1;
						let chatMsg = msg.length > 1 ? msg.slice(1).join(' ') : '';
						if(target == 0){
							let mark = (CS.hasForbiddenWord(chatMsg) ? PS.getTagTeam(PS.getPlayerById(player).team, true) : PS.getTagGrade(player));
							CS.sendMsg("외부" + mark + SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) + '→' + HOSTNAME + ": " + chatMsg, player);
							SYS.log(false, mark + SYS.showPlayerInfo(player) + ": " +  chatMsg, SYS.LOG_TYPE.BINDING);
							return;
						}
						if(target == -1) return NC.caution("귓속말을 보낼 대상을 지정하세요", player, "?e");
						if(!PS.isValid(target)) return false;
						if(target == player) return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player);
						if(!PS.getPlayerById(target).isDisturb) return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님은 채팅 수신을 거부한 상태입니다.", player);
						CS.sendPrivateChat(target, player, chatMsg);
						if(CS.hasForbiddenWord(chatMsg)) NC.alretMsg(player);
						break;
					case 1:			//	?e
						return NC.help("공용 ID가 3인 플레이어에게 \'안녕?\'이라는 말을 조용히 전달하려면",
						"!e #3 안녕?", player, "!chathelp");
				}
			}
			comTeamChat(player, msg, type){		//	!t 			|	팀 채팅 명령어
				switch(type){
					case 0:			//	!t
						return CS.sendTeamChat(PS.getPlayerById(player).team, player, msg.length > 0 ? msg.join(' ') : '');		//	버그: TypeError: msg.join is not a function
					case 1:			//	?t
						return NC.help("상대팀이 못 엿듣게 살포시 팀원에게 \'민트초코 최고야\'라고 전하려면",
						"!t 민트초코 최고야", player, "!chathelp");
				}
			}

			updateChatLog(player, msg, time){			//					플레이어 채팅 로그 갱신
				let target = getPlayerlistById(player);
				if(target == undefined) return;
				let logStr = target._str, logTime = target._time;
				if(logStr.length != logTime.length){
					logStr.splice(0);
					logTime.splice(0);
				}
				let deleteFirstLog = function(){
					logStr.pop();
					logTime.pop();
				}
				if(logStr.length >= this._maxRptCount)		//	maxRptCount 값 이상의 로그가 기록되면 가장 오래된 기록 삭제
					deleteFirstLog();
				for(let lt of logTime){		//	오래된 로그 기록은 삭제
					if(time - lt >= 5000) deleteFirstLog();
				}
				logStr.unshift(msg);
				logTime.unshift(time);
			}

			showHelpCommandList(title, cml, player){	//				명령어 목록 출력
				if(!SYS.hasInRange(cml.length, 1, 2)) return;
				let sendList = str => NC.msgCommand(title, str, player);
				let getList = index => cml[index].join(" | ");
				if(cml.length == 1) return sendList(getList(0));
				return sendList(getList(0) + (AMN.getAdmin(player) > 0 ? (SYS.newLine + getList(1)) : ''));
			}

			sendAlert(msg, target){ 					//				관리자 채팅 전송
				return NOPLAYER ? NC.announce(HOSTNAME + ": " + msg, target) : room.sendChat(msg, target);
			}
			sendAllChat(player, msg){					//				전체 채팅 전송
				let filter = this.hasForbiddenWord(msg);				//	금지어 필터링
				let title = "전체" + (filter ? PS.getTagTeam(PS.getPlayerById(player).team, true) : PS.getTagGrade(player));
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => ((PS.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
				this.sendMsg(title + getContext(this._detectorLevel, msg));
				PS.getPlayerList().filter(p => {
					if(p.chatmode != 0)
						NC.announce("(전체 채팅: !a 답할 내용)", p.id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1);
				});
				SYS.log(true, title + SYS.showPlayerInfo(player) + ": " + msg);
				if(filter) NC.alretMsg(player);
			}
			sendEmojiChat(player, msg){					//				감정 채팅 전송
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
				let context = msgList[AMN.getAdmin(player) > 0 ? "mute" : "freeze"];
				NC.locked(true, "아래에 나열된 숫자로 감정만 전달할 수 있습니다" 
				+ SYS.newLine + msgList.emoji.join(" | "), player);
				NC.acess(player, context[Math.floor(Math.random() * context.length)]);
			}
			sendMsg(msg, target){						//				일반 메시지 출력
				return NC.announce(msg, target);
			}
			sendPrivateChat(toPlayer, fromPlayer, msg){		//				귓속말 채팅 전송
				if(!PS.isValid(toPlayer)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_LID);
				if(fromPlayer == 0 && toPlayer > 0)				//	콘솔창에서 게임으로 전달
					return sendAlert(msg + " (귓속말 답장: !e #0 답할 내용)", toPlayer);
				if(this._isLockPrivateChat) return NC.acess(fromPlayer, ("(#0)" + HOSTNAME) + " 외에 귓속말 채팅이 금지돼 있어 이용할 수 없습니다.");
				if(this.hasMutedChat(fromPlayer)) return this.sendEmojiChat(fromPlayer, msg);	//	채팅 금지
				let filter = this.hasForbiddenWord(msg);			//	금지어 필터링
				let title = "개인" + (filter ? PS.getTagTeam(fromPlayer, true) : PS.getTagGrade(fromPlayer));
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => (SYS.showPlayerInfo(fromPlayer, c_PLAYERINFO_TYPE.LOCAL) + '→' + PS.getTagGrade(toPlayer) + SYS.showPlayerInfo(toPlayer, c_PLAYERINFO_TYPE.LOCAL) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				let context = getContext(this._detectorLevel, msg);
				this.sendMsg(title + context + " (답장: !e " + '#' + fromPlayer + " 답할 내용)", toPlayer);
				this.sendMsg(title + context, fromPlayer);																								//	입력자 출력
				SYS.log(true, title + SYS.showPlayerInfo(fromPlayer) + '→ ' + PS.getTagGrade(toPlayer) + SYS.showPlayerInfo(toPlayer) + ": " + msg);	//	로그 출력
				if(filter) NC.alretMsg(fromPlayer);
			}
			sendTeamChat(teamId, player, msg){			//				팀 채팅 전송
				let getTeamToString = function(t){
					switch(t){
						case c_TEAM.SPECTATOR:	return "관전";
						case c_TEAM.RED:	 	return "레드";
						case c_TEAM.BLUE:		return "블루";
						default:				return SYS.sendError(SYS.ERROR_TYPE.E_ETC);
					}
				}
				let filter = (PS.isValid(player) ? this.hasForbiddenWord(msg) : false);
				let title = getTeamToString(teamId) + (PS.isValid(player) ? filter ? PS.getTagTeam(PS.getPlayerById(player).team, true) : PS.getTagGrade(player) : PS.getTagTeam(teamId));
				let showMsg = function(player, context){
					PS.getPlayerList().filter(p => p.team == teamId).forEach(p => {
						if(!PS.isValid(player)) sendAlert(context, p.id);
						else CS.sendMsg(context, p.id);
					});
				}
				if(!PS.isValid(player)) return showMsg(0, msg);
				if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
				let getContext = function(lev, str){
					let msgCore = str.substr(0, 70);	//	70자 내외 제한
					let sendContext = (arg) => ((PS.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
					switch(lev){
						case 4: case 5:
							if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
						default:				return sendContext(msgCore);
					}
				}
				showMsg(player, title + getContext(this._detectorLevel, msg));
				PS.getPlayerList().filter(p => {
					if(p.team == teamId && p.chatmode != 0)
						NC.announce("(팀 채팅: !t 답할 내용)", p.id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1);
				});
				//	로그 출력
				SYS.log(true, title + SYS.showPlayerInfo(player) + ": " + msg);
				if(filter) NC.alretMsg(player);
			}
		}
		/*** 명령어 클래스 ***/
		class Commands{
			constructor(){
				
			}
			dka(player, msg, type){						//	!대깨알			|	이스터에그
				if(type != 0) return;
				NC.announce("전체" + c_LIST_EMOTION[3] + "AlphaGo" + c_LIST_EMOTION[3] + ": 대가리 깨져도 알파고", player, null, (Math.floor(Math.random() * 6)), c_LIST_SOUND.LOUD, (Math.floor(Math.random() * 30) * 100));
			}
			setTeamColors(player, msg, type){						//						!uniform		|	팀 유니폼
				switch(type){
					case 0:			//	!uniform
						let comIndex = msg;

						//	인자값 길이 확인
						if(!SYS.hasInRange(comIndex.length, 4, 6)){
							let getMsg = function(len){
								if(!len) return "유니폼을 적용할 팀을 입력하세요.";
								switch(len){
									case 1:		return "각도를 지정하지 않았습니다.";
									case 2:		return "등번호 색상을 지정하지 않았습니다.";
									case 3:		return "배경 색상을 지정하지 않았습니다.";
									default:	return "배경 색상은 최대 3가지까지 지정할 수 있습니다.";
								}
							}
							return NC.caution(getMsg(comIndex.length), player, "?uniform");
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
						let team = getTeam(comIndex[0]);
						if(team == null) return NC.caution("유니폼을 적용할 팀을 지정하지 않았습니다.", player, "?uniform");

						//	각도 범위 확인
						let angle = parseInt(comIndex[1]);
						if(!SYS.hasInRange(angle, 0, 180)) return NC.caution("각도는 0°~180° 사이의 값으로 입력해야 합니다.", player, "?uniform");

						//	색상 코드 확인
						let getBgColorList = str => str.map(e => NC.getColor(e, true));
						let bgList = getBgColorList(comIndex.slice(2));
						for(let b of bgList){
							if(b == null) return NC.caution("색상 코드가 올바르지 않습니다.", player, "?uniform");
						}
						PS.setTeamColors(team, angle, bgList[0], bgList.slice(1));
						NC.uniMsg(c_LIST_ICON.NORMAL_BOLD + "유니폼 변경",
						SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 " + GM.getTeamName(team) + "의 유니폼을 변경했습니다." + SYS.newLine + msg.join(' '),
						null, "!uniform");
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + GM.getTeamName(team) + "의 유니폼을 변경함 " + '<' + msg.join(' ') + '>', SYS.LOG_TYPE.NOTICE);
						break;
					case 1:			//	?uniform
						return NC.help("텍스트 색을 FFFFFF, 배경색을 FFCC00 및 AABBCC이고, 각도가 30°인 레드팀 유니폼으로 변경하려면",
						"!uniform red 30 FFFFFF FFCC00 AABBCC", player);
				}
			}
			alertSpam(player, msg, type){						//	!도				|	도배방지문자
				switch(type){
					case 0:		//	!도배방지
						if(!AMN.getAdmin(player)) return this.helpCom(player, msg, 0);		//	도움말
						let context = ["도배 방지", "분란 방지", "정숙 유지", "질서 유지", "도배 방지"];
						NC.announce("〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰" + SYS.newLine + context.join(SYS.newLine) + SYS.newLine + "〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰",
						null, c_LIST_COLOR.ORANGE, c_LIST_STYLE.BOLD, c_LIST_SOUND.LOUD);
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 도배 방지 문자를 출력함.", SYS.LOG_TYPE.NOTICE);
						break;
					case 1:		//	?도배방지
						return AMN.getAdmin(player) > 0 ? NC.help("도배 방지 문자를 출력하려면", "!도배방지", player) : helpCom(player);
				}
			}

			comChatMode(player, msg, type){					//	!chatmode		|	채팅 모드 설정
				switch(type){
					case 0:			//	!chatmode
						switch(msg.length > 0 ? msg[0] : null){
							case 0: case 'a': case "전체": case "all":	
								getPlayerlistById(player).chatmode = 0;
								break;
							case 1: case 't': case "팀": case"team":
								getPlayerlistById(player).chatmode = 1;
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
			comClearBans(player, msg, type){					//	!clearbans		|	영구 퇴장 명단 초기화 명령어
				switch(type){
					case 0:		//	!clearbans
						return AMN.getAdmin(player) ? AMN.clearBans(player) : NC.acess(player);
					case 1:		//	?clearbans
						return NC.help("영구 퇴장 명단을 지우려면", "!clearbans", player, "!unmute #ID");
				}
			}
			comClearTeamColors(player, msg, type){					//	!clear_uniform	|	유니폼 초기화
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
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + GM.getTeamName(team) + "의 유니폼을 초기화함", SYS.LOG_TYPE.NOTICE);
						return PS.clearTeamColors(team);
					case 1:			//	?clear_uniform
						return NC.help("레드팀의 유니폼을 초기화하려면",
						"!clear_uniform red", player);
				}
			}
			comDisturbMode(player, msg, type){					//	!disturb		|	수신 모드 설정
				switch(type){
					case 0:		//	!disturb
						switch(msg.length > 0 ? msg[0] : null){
							case 0: case "금지": case "off": case "오프":
								return getPlayerlistById(player).isDisturb = 0;
							case 1: case "허용": case "on": case "온":
								return getPlayerlistById(player).isDisturb = 1;
							default:
								return NC.caution("부적절한 값입니다.", player, "?disturb");
						}
					case 1:		//	?disturb
						return NC.help("상대방의 채팅 수신을 거부하려면",
						"!disturb on", player);	
				}
			}
			comFreezeChat(player, msg, type){					//	!freeze			|	채팅 얼리기
				switch(type){
					case 0:		//	!freeze
						if(!AMN.getAdmin(player)) return NC.acess(player);
						if(CS._isFreeze == true) return NC.caution("채팅창이 이미 얼려있습니다.", player, "!unfreeze");
						if(PS.cntPlayers() < 3) return NC.caution("부적절한 조치입니다.", player, "!mute #ID");
						return CS.freezeChat(true, player);
					case 1:		//	?freeze
						return NC.help("채팅창을 얼리려면", "!freeze", player, "!unfreeze");
				}
			}
			comJoin(player, msg, type){					//	!join			|	팀 자율 이동
				switch(type){
					case 0:
						return CM.joinPlayer(player, msg);
					case 1:
						return NC.help("레드팀으로 참가하려면", "!join red", player);
					default:
				}
			}
			comKick(player, msg, type){					//	!kick #ID		|	강제 퇴장
				switch(type){
					case 0:		//	!kick
						if(!AMN.getAdmin(player)) return NC.acess(player);			//	권한이 없는 경우
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(!PS.isValid(target)) return CM.comKick(player, msg, 1);	//	대상을 잘못 지목한 경우
						let reason = msg.length > 1 ? msg.slice(1).join(' ') : null;
						if(AMN.getAdmin(target) > AMN.getAdmin(player)) return NC.acess(player, "권한이 낮아 처리할 수 없습니다.");	//	보조 권한 → 최고 권한 퇴장 불가
						let byPlayer = SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC);
						let detail = (reason == null || CS.isSpace(reason) ? ("처리자" + ': ' + byPlayer) : (byPlayer + ': ' + reason));
						return AMN.setKick(target, detail);
					case 1:		//	?kick
						return NC.help("공용 ID가 42인 플레이어를 '민트초코를 지지함`이라는 사유로 퇴장 시키려면", 
						"!kick #42 민트초코를 지지함", player);
				}
			}
			comLockPrivateChat(player, msg, type){					//	!lock_private	|	귓속말 채팅 금지/허용
				switch(type){
					case 0:			//	!lock_private
						if(!AMN.getAdmin(player)) return NC.acess(player);
						let getLockType = function(str){
							switch(str){
								case "on": case "온": case "금지": case "ㅐㅜ": case "dhs": case "rmawl":
									return true;
								case "off": case "오프": case "허용": case "ㅐㄹㄹ": case "dhvm": case "gjdyd":
									return false;
								default:
									return !CS._isLockPrivateChat;
							}
						}
						let lockType = getLockType(msg.length > 0 ? msg[0] : null);
						if(lockType == CS._isLockPrivateChat) return NC.caution("귓속말 채팅이 이미 " + (lockType ? "금지" : "허용") + "되어 있습니다.", player);
						return CS.lockPrivateChat(lockType, player);
					case 1:			//	?lock_private
						return NC.help("귓속말 채팅을 막으려면",
						"!lock_private on", player);
				}
			}
			comLockTeams(player, msg, type){					//	!lock_join		|	팀 이동 금지/허용
				switch(type){
					case 0:			//	!lock_join
						if(!AMN.getAdmin(player)) return NC.acess(player);
						let getLockType = function(str){
							switch(str){
								case "on": case "온": case "금지": case "ㅐㅜ": case "dhs": case "rmawl":
									return true;
								case "off": case "오프": case "허용": case "ㅐㄹㄹ": case "dhvm": case "gjdyd":
									return false;
								default:
									return !AMN.isLockJoin();
							}
						}
						let lockType = getLockType(msg.length > 0 ? msg[0] : null);
						if(lockType == AMN.isLockJoin()) return NC.caution("팀 자율 이동이 이미" + (lockType ? "금지" : "허용") + "되어 있습니다.", player);
						return AMN.setLockTeams(lockType, player);
					case 1:			//	?lock_join
						return NC.help("팀 자율 이동을 막으려면",
						"!lock_join on", player);
				}
			}
			comMute(player, msg, type){					//	!mute #ID		|	채팅 금지
				switch(type){
					case 0:			//	!mute
						if(!AMN.getAdmin(player)) return NC.acess(player);			//	권한이 없는 경우
						if(PS.cntPlayers() < 2) return NC.caution("채팅을 금지할 수 있는 플레이어가 없습니다.", player);
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(!PS.isValid(target)) return this.comMute(player, msg, 1);	//	대상을 잘못 지목한 경우
						if(target == player) return NC.caution("자기 자신의 채팅을 금지할 수 없습니다.", player);
						if(PS.getPlayerById(target).isMute) return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅은 이미 금지돼 있습니다.", player, ("!unmute " + '\#' + target));
						return AMN.mutePlayer(target, player);
					case 1:			//	?mute
						return NC.help("공용 ID가 42인 플레이어의 채팅을 금지하려면", "!mute #42", player);
				}
			}
			comPinHost(player, msg, type){					//	!lock_host		|	방장 이동 설정
				if(NOPLAYER == true) return;
				switch(type){
					case 0:			//	!lock_host
						if(!AMN.getAdmin(player)) return NC.acess(player);
						let lockType = AMN.isPinHost();
						AMN.setPinHost(!lockType);
						if(lockType == false) PS.setTeam(0, c_TEAM.SPECTATOR);
						NC.locked(!lockType, "호스트 이동이 " + (lockType ? "허용" : "금지") + "되었습니다.", player);
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 방장 팀 이동을 " + (lockType ? "허용" : "금지") + "함.", SYS.LOG_TYPE.NOTICE);
						break;
					case 1:			//	?lock_host
						return NC.help("호스트 이동을 금지하려면", "!lock_host", player);
				}
			}
			comRecording(player, msg, type){					//	!rec			|	녹화 시작/종료
				switch(type){
					case 0:			//	!rec
						if(AMN.getAdmin(player) != 2) return NC.acess(player);
						return GM.isRecording() ? GM.stopRecording() : GM.startRecording();
					case 1:			//	?rec
						return NC.help("게임을 녹화하려면", "!rec", player);
				}
			}
			comRecaptcha(player, msg, type){					//	!recaptcha		|	reCAPTCHA 설정
				switch(type){
					case 0:		//	!recaptcha
						if(!AMN.getAdmin(player)) return NC.acess(player);
						switch(msg[0]){
							case "on":	case "온":	case "활성화":	case "ㅐㅜ":	case "dhs":	case "ghkftjdghk":
								return SYS.setRequireRecaptcha(true, player);
							case "off":	case "오프":	case "비활성화":	case "ㅐㄹㄹ":	case "dhvm":	case "qlghkftjdghk":
								return SYS.setRequireRecaptcha(false, player);
							default:
								break;
						}
					case 1:		//	?recaptcha
						return NC.help("reCAPTCHA를 활성화 하려면", "!recaptcha on", player);
				}
			}
			comResetGame(player, msg, type){					//	!rr				|	게임 재시작 명령어
				switch(type){
					case 0:			//	!rr
						if(!AMN.getAdmin(player)) return NC.acess(player);
						return AMN.resetGame(player);
					case 1:			//	?rr
						return NC.help("게임을 재시작 하려면", "!rr", player);
				}
			}
			comSleep(player, msg, type){					//	!afk			|	장기 무응답 플레이어 설정
				switch(type){
					case 0:		//	!afk
						return PS.setSleep(player, !PS.getPlayerById(player).isSleep);
					case 1:		//	?afk
						if(PS.getPlayerById(player).isSleep) return NC.help("자리에 돌아와서 게임에 다시 참여하려면", "!afk", player, "!join");
						return NC.help("게임 도중 자리를 비우려면", "!afk", player, "!join spec");
				}
			}
			comSwapGame(player, msg, type){					//	!r				|	게임 자동 시작/종료 명령어
				switch(type){
					case 0:			//	!r
						if(!AMN.getAdmin(player)) return NC.acess(player);
						return AMN.swapGame(player);
					case 1:			//	?r
						return NC.help("게임을 시작하거나 종료하려면 ", "!r", player, "!rr");
				}
			}
			comUnfreezeChat(player, msg, type){					//	!unfreeze		|	채팅 녹이기
				switch(type){
					case 0:			//	!unfreeze
						if(!AMN.getAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						if(!CS._isFreeze) return NC.caution("채팅창이 이미 녹아있습니다.", player, "!unmute #ID");
						return CS.freezeChat(false, player);
					case 1:			//	?unfreeze
						return NC.help("채팅창을 녹이려면", "!unfreeze", player);
				}
			}
			comUnmute(player, msg, type){					//	!unmute #ID		|	채팅 허용
				switch(type){
					case 0:			//	!unmute
						if(!AMN.getAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						if(msg == "all") return AMN.clearMuteList(player);		//	영구 퇴장 목록 초기화
						let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
						if(PS.isValid(target)){
							if(!PS.getPlayerById(target).isMute)				//	채금자가 아닐 경우
								return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅은 이미 허용돼 있습니다.", player);
							return AMN.unmutePlayer(target, player);
						}
					case 1:			//	?unmute
						return NC.help("공용 ID가 12인 채금자의 채팅을 허용하려면", "!unmute #12", player);
				}
			}

			helpBot(player, msg, type){							//	!bothelp		|	서버 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("서버", [
					["!about(정보)"],
					["!kick #ID(강제 퇴장)", "!r(시작/종료)", "!rr(재시작)", "!show_pw(비번 표시)", "!set_pw(비번 설정)", "!clear_pw(비번 해제)", "!clear_bans(영구 퇴장 초기화)", "!recaptcha(reCAPTCHA 설정)"]
				], player);
			}
			helpChat(player, msg, type){							//	!chathelp		|	채팅 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("채팅", [
					["!e #ID(개인)", "!t(팀별)", "!a(전체)", "!chatmode(기본 채팅 모드)", "!disturb on/off(수신)"],
					["!freeze/unfreeze(채팅 녹이기/얼리기)", "!mute/unmute #ID(채팅 금지/허용)", "!unmute #ID(채팅 허용)", "!lock_private(귓속말 채팅 금지/허용)", "!도(도배 방지 문자)"]
				], player);
			}
			helpCom(player, msg, type){							//	!help			|	명령어 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("일반", [
					["!bothelp(서버)", "!chathelp(채팅)", "!joinhelp(참가)", "!maphelp(맵)", "!rankhelp(랭킹)", "!scorehelp(점수)"]
				], player);
			}
			helpJoin(player, msg, type){ 							//	!joinhelp		|  	참가 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("투입", [
					["!join(자동 참가)", "!afk(잠수)"],
					["!lock_join(투입 제한)"]
				], player);
			}
			helpMap(player, msg, type){							//	!maphelp		|	맵 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("맵", [
					["/checksum(정보) | /store(저장)", "!maplist(맵 목록)"],
					["!load ID(불러오기)"]
				], player);
			}
			helpMisc(player, msg, type){							//	!mischelp		|	기타 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("기타", [
					["!avatar(등번호 변경)", "!uniform(유니폼 변경)", "!clear_avatar(등번호 초기화)", "!clear_uniform(유니폼 초기화)"]
				], player);
			}
			helpRank(player, msg, type){	 						//	!rankhelp		| 	랭크 도움말
				if(type != 0) return;
				return CS.showHelpCommandList("랭크", [
					["!stats #ID(전적)", "!ranking n(순위/n등 랭킹)"],
					["!score(점수 변경)", "!time(시간 변경)"]
				], player);
			}
			helpScore(player, msg, type){							//	!scoreHelp		|	점수 도움말
				if(type != 0) return;
				return NC.msgCommand("점수", 
					"득: " + SC.SCORE_TYPE.GOAL	+ ' | ' + "실: " + SC.SCORE_TYPE.OWNGOAL	+ ' | '
					+ "승: " + SC.SCORE_TYPE.WIN	+ ' | ' + "패: " + SC.SCORE_TYPE.LOST	+ ' | '
					+ "도움 " + SC.SCORE_TYPE.ASSIST,
				player, "!ranking");
			}

			infoMaps(player, msg, type){							//	!maplist		|	맵 정보
				switch(type){
					case 0:			//	!maplist
						let getSize = function(n){
							if(n - parseInt(n) == 0) return parseInt(n);
							if(n - parseInt(n) > 0) return parseInt(n + 1);
							return 1;
						}
						let target = parseInt(msg[0]);
						if(!SYS.hasInRange(target, 1, maps.length)) return CM.infoMaps(player, msg, 1);
						let searchTarget = target > 2 ? maps.length - target > 2 ? target - 3 : maps.length - 5 : 0;
						let nameList = GM.getStadiumData().slice(searchTarget, searchTarget + 5);
						let list = new Array();
						if(maps.length > 0){
							for(let i = 0; i < nameList.length; i++){
								let name = nameList[i];
								let index = searchTarget + i + 1;
								//	타깃 인덱스이면 표시
								list.push((index == target ? '▶' : '▷') + '[' + SYS.setLine(index, Math.floor(Math.log10(maps.length) + 1)) + ']' + ' | ' + name);
							}
						}
						else list.push("비어 있음");
						let page = (maps.length < 2 ? '' : ": " + target + '/' + maps.length);
						NC.uniMsg(c_LIST_ICON.NORMAL + "맵 목록" + page, list.join(SYS.newLine), player, (AMN.getAdmin(player) > 0 && maps.length > 0 ? ("!load " + target) : "?maplist"));
						break;
					case 1:			//	?maplist
						return NC.help("42번 내장 맵이 포함된 맵 목록을 보려면", "!cm 42", player, "!load ID");
				}
			}
			infoRanking(player, msg, type){							//	!ranking		|	랭킹 정보
				switch(type){
					case 0:		//	!ranking
						let getTarget = function(n, p){
							let t = SC.getRankList().find(r => r.ranking == n);
							return t == undefined ? p : t.id;
						}
						let target = getTarget((msg.length > 0 ? msg[0] : null), player);
						return SC.sendRanking(target, player);				//	플레이어 랭킹 확인
					case 1:		//	?ranking
						return NC.uniMsg(c_LIST_ICON.NORMAL + "랭킹 측정 방식", 
						"모든 전적의 총점수를 계산하여 순위를 매깁니다."
						+ SYS.newLine + "여기서 동점자가 나올 경우, 공용 ID의 오름차순으로 순위를 결정합니다.",
						player, "!scorehelp");
				}
			}
			infoRoom(player, msg, type){							//	!about			| 	서버 정보
				if(type != 0) return;
				NC.info("봇방", DESCRIPTION
					+ SYS.newLine + "릴리스 날짜: 2021.03.23"		//	릴리스 및 업데이트 날짜
					+ ' | ' + SYS.showInfo(),						//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
					null, "!help");
			}
			infoStats(player, msg, type){							//	!stats 			|	점수 정보
				switch(type){
					case 0:		//	!stats
						let getTarget = function(str, p){
							let t = GM.checkPublicId(str, p, true);
							return t == false || SC.getPlayerStats(t) == undefined ? p : t;
						}
						let target = getTarget((msg.length > 0 ? msg[0] : player), player);		//	버그
						//	닉네임, ID, 전적 출력
						NC.info("플레이어 전적", SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC) 
						+ SYS.newLine + SC.showPlayerStats(target), player, "!ranking");
						break;
					case 1:		//	?stats == !helpscore
					return this.helpScore(player);
				}
			}

			joinPlayer(player, msg){								//						플레이어 투입
				if(AMN.isLockJoin() == true && AMN.getAdmin(player) == false) return NC.acess(player, "팀 자율 이동이 금지돼 있어 사용할 수 없습니다.");
				let team = msg.length > 0 ? msg[0] : (PS.getPlayerById(player).team == c_TEAM.SPECTATOR || PS.getPlayerById(player).team == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
				let target = msg.length > 1 ? msg[1] : null;
				let index = target != null && AMN.getAdmin(player) ? GM.checkPublicId(target, player) : player;
				if(AMN.getAdmin(player)){
					if(team == "lock" || team == "락")
						return this.comLockTeams(player, msg, 0);
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
							if(byPlayer == c_TEAM.SPECTATOR) return (PS.cntPlayers(c_TEAM.RED) <= PS.cntPlayers(c_TEAM.BLUE) ? c_TEAM.RED : c_TEAM.BLUE);
							return (byPlayer == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
					}
				}

				if(!PS.isValid(index)) return NC.help("공용 ID가 42인 플레이어를 블루팀으로 옮기려면", "!join blue #42", player);
				if(AMN.isLockJoin() == true && PS.isValid(player) == false) return NC.acess(index, "팀 자율 이동이 금지되었습니다.");		//	팀 이동 금지 처리
				let targetTeam = getTargetTeam(team, PS.getPlayerById(player).team);
				if(PS.getPlayerById(index).team == targetTeam) return NC.caution("중복된 명령어입니다.", (player ? player : index));
				if(PS.getPlayerById(index).isSleep) return NC.caution("게임 참여 의사가 없어 플레이할 수 없습니다. ", (player ? player : index), "!afk");
				PS.setTeam(index, targetTeam);
			}
			loadMap(player, msg, type){							//	!load n			|	맵 불러오기
				switch(type){
					case 0:			//	!load
						if(!AMN.getAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
						if(msg.length > 0) return GM.loadMap(parseInt(msg[0]) - 1, player);
						return this.loadMap(player, msg, 1);
					case 1:			//	?load
						let target = parseInt(msg[0]);
						if(maps.length < 2)
							return NC.help("내장 맵을 불러오려면", "!load 1", player);
						if(SYS.hasInRange(target, 1, maps.length))
							return NC.uniMsg(null, '[' + SYS.setLine(target, Math.floor(Math.log10(maps.length) + 1)) + ']' + ' | ' + GM.getStadiumData(target - 1), player);
						let index = Math.floor(Math.random() * maps.length) + 1;
						return NC.help("예를 들어 " + index + "번째 내장 맵을 불러오려면", "!load " + index, player, "!maplist n");
				}
			}
		}
		/*** 플레이어 클래스 ***/
		class Player{
			constructor(){
				const m_TAG_GRADE		= Object.freeze([		//	최고 권한, 보조 권한, 일반, 블랙리스트
					"ⓧ", "●", "ⓞ", "◯", "㉤",
				]);
				const m_TAG_TEAM		= Object.freeze([		//	관전, 레드, 블루
					"ⓢ", "ⓡ", "ⓑ"
				]);
				let addressList 		= new Array();			//	플레이어 공용 주소
				let networkList 		= new Array();			//	플레이어 공용 네트워크
				let playerList 			= new Array();			//	플레이어 데이터베이스

				let onPlayerActivity	= function(player){				//						플레이어 동작 응답 체크
					updateTime(player.id);		//	마지막 활동 시간 저장
				}
				let onPlayerTeamChange	= function(player, byPlayer){	//						팀 교체
					if(AMN.isPinHost() == true && room.getPlayer(0).team != 0) setTeam(0, c_TEAM.SPECTATOR);
					if(player.id == 0) return;
					if(getPlayerById(player.id).isSleep == true && player.team != 0){
						setTeam(player.id, 0);					//	장기 대기열 플레이어일 경우 관전석으로 이동
						if(PS.isValid(byPlayer)){ 
							updateTime(byPlayer.id);
							if(byPlayer.id == player.id) return NC.notice("게임에 참가하려면 대기 상태를 해제하세요.", byPlayer.id, "!afk");
							return NC.notice(SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC) + "님은 자리를 비운 상태입니다.", byPlayer.id);
						}
					}
					SYS.clearListIndex(player.id);
					updateTime(player.id);						//	투입 시간 저장
					setPlayer(player.id, "team", player.team);
					setPlayerlistById(player.id, "team", player.team);
					SYS.addListIndex(player.id);
				}
				let onPlayerInactivity	= function(player){				//						플레이어 동작 무응답 체크
					AMN.setKick(player.id, c_LIST_ICON.NEGATIVE + "비활동 플레이어");
				}
				let initPlayer			= function(data){			//						플레이어 데이터베이스 초기화
					playerList.push({ 
						"id": data.id,
						"name":	 data.name,
						"team": c_TEAM.SPECTATOR,
						"admin": false,
						"time": TS.time,
						"stats": new Array(),
						"chatmode":	0,
						"detector": 0,
						"isDisturb": true,
						"isMute": false,
						"isSleep": false,
						"hasKicked": false
					});
					SC.initRanking(data.id);			//	랭킹 초기화
					setAddress(data.id, data.conn);		//	공용 주소 부여
					setNetwork(data.id, data.auth);		//	공용 네트워크 부여
					SYS.addListIndex(data.id);			//	플레이어 인덱스 추가
				}
				let isValid				= function(target){ 							//		유효 플레이어 확인
					if(cntPlayers("public") < 1) return false;
					if(!Number.isInteger(target)) return target == undefined || target == null ? false : SYS.hasInRange(target.id, 1, cntPlayers("public"));
					return SYS.hasInRange(target, 1, cntPlayers("public"));
				}
																						//		플레이어 공용 주소 가져오기
				let getAddress			= index	=> addressList[index] ? addressList[index] : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_CONN);
				let getGravityX 		= index => getPlayerDiscProp(index).xgravity;	//		플레이어 X 중력 구하기
				let getGravityY			= index	=> getPlayerDiscProp(index).ygravity;	//		플레이어 Y 중력 구하기
				let getBcoeff			= index	=> getPlayerDiscProp(index).bCoeff;		//		플레이어 바운스 구하기
				let getDamping			= index	=> getPlayerDiscProp(index).damping;	//		플레이어 제동 구하기
				let getTagGrade			= function(player){								//		플레이어 권한 마크 구하기
					if(!isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					switch(AMN.getAdmin(player)){
						case 1:	return m_TAG_GRADE[2];							//	보조 권한
						case 2:	return m_TAG_GRADE[1];							//	최고 권한
					}
					return m_TAG_GRADE[(AMN.isBlacklist(player, false) ? 4 : 3)];		//	블랙리스트에 해당되면 4, 아닐 경우 3을 반환
				}
				let getInvMass			= index	=> getPlayerDiscProp(index).invMass;	//		플레이어 역질량 구하기
				let getRadius			= index	=> getPlayerDiscProp(index).radius;		//		플레이어 반지름 구하기
				let getLocalId			= function(publicId){							//		플레이어 개인 ID 구하기
					let pList = room.getPlayerList().filter(player => player.id != 0);
					for(let i = 0; i < pList.length; i++){
						if(pList[i].id == publicId) return i + 1;
					}
					return false;
				}
																						//		플레이어 공용 네트워크 가져오기
				let getNetwork			= index	=> networkList[index] ? networkList[index] : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_AUTH);
																						//		플레이어 데이터베이스 구하기
				let getPlayer			= index => isValid(index) ? JSON.parse(JSON.stringify(playerList[index])) : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
				let getPlayerById		= target => playerList.find(p => p.id == target);	//	플레이어 데이터베이스 구하기
				let getPlayerList		= isPublic => isPublic == true ? playerList : (playerList.filter(p => getLocalId(p.id) > 0)).slice(0);
				let getPlayerDiscProp	= index => room.getPlayerDiscProperties(index);	//		플레이어 객체 속성 구하기
																						//		플레이어 좌표 가져오기
				let getPosition		= index	=> ({"x" : getPlayerDiscProp(index).x, "y" : getPlayerDiscProp(index).y});
				let getPosX			= index	=> getPosition(index).x;					//		플레이어 X 좌표 가져오기
				let getPosY			= index	=> getPosition(index).y;					//		플레이어 Y 좌표 가져오기
																						//		플레이어 공용 ID 가져오기
				let getPublicId		= privateId => privateId <= cntPlayers() && privateId > 0 ? room.getPlayerList().filter(player => player.id != 0)[privateId - 1].id : false;
				let getSpeedX		= index	=> getPlayerDiscProp(index).xspeed;			//		플레이어 X 속도 구하기
				let getSpeedY		= index	=> getPlayerDiscProp(index).yspeed;			//		플레이어 Y 속도 구하기
				let getTagTeam			= function(team, type){							//		팀 마크 구하기
					if(type == true) return m_TAG_GRADE[0];	//	금지어 필터링
					switch(team){
						case c_TEAM.RED: case c_TEAM.BLUE: case c_TEAM.SPECTATOR:
									return m_TAG_TEAM[team];
						default:	return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					}
				}
				let setAddress			= function(player, addrs){			//					플레이어 공용 주소
					if(addressList[player] != undefined) return;	//	데이터가 이미 있는 경우 처리 종료
					addressList[player] = addrs;
				}
				let setAvatar			= function(player, msg, type){		//	!avatar		|	등번호 설정
					switch(type){
						case 0:			//	!avatar
							room.setPlayerAvatar(player, (msg.length > 0 ? msg[0] : ''));
							NC.notice("등번호가 변경되었습니다.", player, "!clear_avatar");
							break;
						case 1:			//	?avatar
							return NC.help("등번호를 12로 변경하려면", "!avatar 12", player, "!clear_avatar");
					}
				}
																			//					플레이어 바운스 지정
				let setBcoeff			= (player, scale)	=> room.setPlayerDiscProperties(player, {"bCoeff" : scale});
																			//					플레이어 중력 지정
				let setGravityX			= (player, scale)	=> room.setPlayerDiscProperties(player, {"xgravity" : scale});
				let setGravityY			= (player, scale)	=> room.setPlayerDiscProperties(player, {"ygravity" : scale});
																			//					플레이어 역질량 지정
				let setInvMass			= (player, amount)	=> room.setPlayerDiscProperties(player, {"invMass" : amount});
				let setNetwork			= function(player, net){			//					플레이어 공용 네트워크
					if(networkList[player] != undefined) return;		//	데이터가 이미 있는 경우 처리 종료
					networkList[player] = net;
				}
				let setPlayer			= function(player, prop, value){	//					플레이어 데이터베이스 수정
					let target = getPlayerById(player);
					if(target == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					if(target[prop] == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					target[prop] = value;
				}
																			//					플레이어 좌표 지정
				let setPosition			= (player, x, y)	=> room.setPlayerDiscProperties(player, {"x" : x, "y" : y});
				let setPosX				= (player, pos)		=> room.setPlayerDiscProperties(player, {"x" : pos});	//	X 좌표
				let setPosY				= (player, pos)		=> room.setPlayerDiscProperties(player, {"y" : pos});	//	Y 좌표
																			//					플레이어 반지름 지정
				let setRadius			= (player, len)		=> room.setPlayerDiscProperties(player, {"radius" : len});
				let setSleep			= function(player, bool){			//					장기 대기열 플레이어 설정
					bool ? addSleepPlayer(player) : deleteSleepPlayer(player);
					SYS.updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					if(AMN.getAdmin(player) != 2 && AMN.cntAdmins(2) > 1) return;
					getPlayerList().forEach(p => {
						if(p.isSleep == false) AMN.updateAdmins();
					});
				}
				let setTeam				= function(player, team){			//					팀 지정
					switch(team){
						case c_TEAM.SPECTATOR: case c_TEAM.RED: case c_TEAM.BLUE:
									return room.setPlayerTeam(player, team);
						default:	return SYS.sendError(SYS.ERROR_TYPE.E_ETC);		//	팀으로 판정된 값이 아닌 경우 오류 출력
					}
				}
																			//					팀 유니폼 지정
				let setTeamColors		= function(team, angle, textColor, bgColor){
					return room.setTeamColors(team, angle, textColor, bgColor);
				}
				let addSleepPlayer	= function(player){			//								장기 대기열 플레이어 추가
					setPlayer(player, "isSleep", true);
					if(getPlayerById(player).team != c_TEAM.SPECTATOR) setTeam(player, c_TEAM.SPECTATOR);
					AMN.deleteAdmin(player);	//	최고 권한 → 보조 권한으로 격하
					AMN.updateAdmins();
					NC.notice(SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 자리를 비웠습니다.", player * -1);
					NC.uniMsg(c_LIST_ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", player, "!afk");
					SYS.log(true, "대기열 추가: " + SYS.showPlayerInfo(player), SYS.LOG_TYPE.NOTICE);
				}
				let updateAccount	= function(player){			//								중복 계정 갱신
					let currentPlayer = JSON.parse(JSON.stringify(getPlayerById(player)));
					let getIndexByPlayer = function(p){
						for(let i = 0; i < cntPlayers("public"); i++){
							if(playerList[i].id == p) return i;
						}
						return -1;
					}
					for(let i = cntPlayers("public") - 1; i >= 0; i--){	//	공용 네트워크인 경우
						let oldPlayer = JSON.parse(JSON.stringify(playerList[i]));
						let target = getIndexByPlayer(player);
						if(oldPlayer.id != player && networkList[oldPlayer.id] == networkList[player]){
							let restoreProp = function(prop, value){				//	데이터 동기화
								if(prop != 1) return playerList[target][prop] = value;
								let temp = value;
								playerList[target] = temp;
							}
							restoreProp(1, oldPlayer);
							SC.updateAccount(oldPlayer.id, currentPlayer.id);		//	랭킹 동기화
							restoreProp("id", currentPlayer.id);
							restoreProp("name", currentPlayer.name);
							restoreProp("team", currentPlayer.team);
							restoreProp("time", TS.time);						//	시간 동기화
							restoreProp("detector", currentPlayer.detector);
							restoreProp("isSleep", currentPlayer.isSleep);
							switch(AMN.getAdmin(oldPlayer.id)){						//	권한 복원
								case 2:
									if(AMN.cntAdmins(2) < 1){	//	최고 권한 관리자가 이미 있는 경우, 보조 권한 부여
										AMN.giveAdmin(player);
										break;
									}
								case 1:
									//AMN.giveSubAdmin(player);
									break;
							}
							return true;
						}
					}
					return false;
				}
				let updateTime		= function(player){			//								응답 시간 갱신
					if(isValid(player) == false || getLocalId(player) == false) return;
					setPlayer(player, "time", TS.time);

					//	이전 타이머 지우고 새로 갱신
					TS.clearTimerByName("afkAvatar", player);
					TS.clearTimerByName("afkTimer", player);
					TS.clearTimerByName("afkCheck", player);
					room.setPlayerAvatar(player);

					if(GM.afkLimitTime == false) return;
					//	장기 무응답 플레이어 판정
					let afkChckTimer = TS.addTimer("afkCheck", () => { 
						if(!GM.isAfkPlayer(afkChckTimer._player, afkChckTimer._delay)){
							return;
						}
						let showAlretMsg = function(target){					//	경고 메시지 출력
							if(target == afkChckTimer._player)
								return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 알림", "반응이 없으면 퇴장될 수 있습니다", target, (PS.getPlayerById(target).team == c_TEAM.SPECTATOR ? "!afk" : "!join spec"), c_LIST_COLOR.GRAY);
							if(AMN.getAdmin(target) < AMN.getAdmin(afkChckTimer._player)) return;
							if(PS.getPlayerById(target).team == c_TEAM.SPECTATOR || PS.getPlayerById(target).team == PS.getPlayerById(afkChckTimer._player).team)
								return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 안내", SYS.showPlayerInfo(afkChckTimer._player, c_PLAYERINFO_TYPE.PUBLIC) + "님의 반응이 없는 경우, 자동으로 퇴장됩니다", target, ("!join spec " + '#' + afkChckTimer._player), c_LIST_COLOR.GRAY);
						}
						PS.getPlayerList().forEach(p => showAlretMsg(p.id));
						let afkTimer = TS.addTimer("afkTimer", () => {			//	퇴장 처리
							if(GM.isAfkPlayer(afkTimer._player, afkTimer._delay * 3) == false){ 
								return;					//	이미 응답한 경우
							}
							if(PS.getPlayerList().find(p => p.id == afkTimer._player) == undefined) return;	//	퇴장한 경우
							PS.onPlayerInactivity(PS.getPlayerById(afkTimer._player));
						}, afkChckTimer._player, GM.afkLimitTime / 2 * MS);
						let avatarTimer = TS.addTimer("afkAvatar", () => {		//	등번호 알림
							let tmList = avatarTimer.findTimerByName();
							if(!tmList.length) return;
							let getCurrentOrder = function(to, m){
								let min = m > 2 ? m : 2
								let max = to;
								let pos = Math.floor(max / min);
								return max - pos * min;
							}
							let target = tmList.slice(-1)[0];
							let currentOrder = getCurrentOrder(target._order, 2);
							switch(currentOrder){
								case 0:
									room.setPlayerAvatar(avatarTimer._player, "잠수");
									break;
								case 1:
									room.setPlayerAvatar(avatarTimer._player);
									break;
							}
						}, afkChckTimer._player, MS, true);

					}, player, GM.afkLimitTime * MS);
				}

				let clearPlayer		= function(data){					//						플레이어 데이터베이스 지우기
					let target = playerList.find(p => p.id == data.id);
					if(target == undefined) return;
					SYS.clearListIndex(data.id);					//	리스트 지우기
					SC.clearTouchedPlayer(data.id);					//	선두자 데이터베이스 지우기
					TS.clearTimerByPlayer(data.id);					//	타이머 지우기
					target.team			= c_TEAM.SPECTATOR;
					target.time			= TS.time;
					target.chatmode		= 0;
					target.isDisturb	= true;
					target.isSleep		= false;
					if(target.hasKicked){
						target.admin = 0;
						target.hasKicked = false;
					}
				}
				let clearTeamColors	= function(team){					//						팀 유니폼 초기화
					room.setTeamColors(team, 0, 0xFFFFFF, [(team == c_TEAM.RED ? 0xE46E4C : 0x5688E4)]);
					NC.notice(GM.getTeamName(team) + "의 유니폼이 초기화되었습니다.");
				}
				let deleteSleepPlayer	= function(player){					//					장기 대기열 플레이어 제거
					setPlayer(player, "isSleep", false);
					AMN.updateAdmins();
					NC.notice("게임에 바로 참여할 준비가 되었습니다! ", player, "!join");
					SYS.log(true, "대기열 제거: " + SYS.showPlayerInfo(player), SYS.LOG_TYPE.NOTICE);
				}
				let resetAvatar		= function(player, msg, type){		//	!clear_avatar	|	등번호 초기화
					switch(type){
						case 0:			//	!clear_avatar
							room.setPlayerAvatar(player);
							NC.notice("등번호가 초기화되었습니다.", player);
							break;
						case 1:			//	?clear_avatar
							return NC.help("기본 등번호로 되돌리려면", "!clear_avatar", player);
					}
				}
				let cntPlayers		= function(team){						//					접속자 인원 구하기
					let pList = room.getPlayerList().filter(player => player.id != 0);
					switch(team){
						case "public":
							return playerList.length;							//	전체 데이터베이스
						case c_TEAM.RED:	case c_TEAM.BLUE:	case c_TEAM.SPECTATOR:	//	팀별 접속자
							return pList.filter(player => player.team == team).length;
						default:												//	모든 접속자
							return pList.length;
					}
				}

				this.onPlayerActivity		= player => onPlayerActivity(player);		//						플레이어 동작 응답 체크
				this.onPlayerTeamChange		= (player, byPlayer) => onPlayerTeamChange(player, byPlayer);	//	팀 교체
				this.onPlayerInactivity 	= player => onPlayerInactivity(player);		//						플레이어 동작 무응답 체크

				this.initPlayer			= data => initPlayer(data);			//								플레이어 데이터베이스 초기화
				this.isValid			= index => isValid(index);			//								유효 플레이어 확인

				this.getAddress			= index	=> getAddress(index);		//								플레이어 공용 주소 가져오기
				this.getGravityX 		= index => getGravityX(index);		//								플레이어 X 중력 구하기
				this.getGravityY		= index	=> getGravityY(index);		//								플레이어 Y 중력 구하기
				this.getBcoeff			= index	=> getBcoeff(index);		//								플레이어 바운스 구하기
				this.getDamping			= index	=> getDamping(index);		//								플레이어 제동 구하기
				this.getTagGrade		= player => getTagGrade(player);	//								플레이어 권한 마크 구하기
				this.getInvMass			= index	=> getInvMass(index);		//								플레이어 역질량 구하기
				this.getRadius			= index	=> getRadius(index);		//								플레이어 반지름 구하기
				this.getLocalId			= publicId => getLocalId(publicId);	//								플레이어 개인 ID 구하기
				this.getNetwork 		= index => getNetwork(index);		//								플레이어 공용 네트워크 가져오기
				this.getPlayer 			= index => getPlayer(index);		//								플레이어 데이터베이스 구하기
				this.getPlayerById		= target => getPlayerById(target);	//								플레이어 데이터베이스 구하기
				this.getPlayerList		= isPublic => getPlayerList(isPublic);	//							플레이어 데이터베이스 구하기
				this.getPlayerDiscProp	= index => getPlayerDiscProp(index);	//							플레이어 객체 속성 구하기
				this.getPosition		= index => getPosition(index);			//							플레이어 좌표 가져오기
				this.getPosX			= index => getPosX(index);				//							플레이어 X 좌표 가져오기
				this.getPosY			= index => getPosY(index);				//							플레이어 Y 좌표 가져오기
				this.getPublicId		= privateId => getPublicId(privateId);	//							플레이어 공용 ID 가져오기
				this.getSpeedX			= index => getSpeedX(index);			//							플레이어 X 속도 구하기
				this.getSpeedY			= index => getSpeedY(index);			//							플레이어 Y 속도 구하기
				this.getTagTeam			= (team, type) => getTagTeam(team, type);	//						팀 마크 구하기

				this.setAddress		= (player, addrs) => setAddress(player, addrs);			//				플레이어 공용 주소
				this.setAvatar		= (player, msg, type) => setAvatar(player, msg, type);	//	!avatar	|	등번호 설정
				this.setBcoeff		= (player, scale)	=> setBcoeff(player, scale);		//				플레이어 바운스 지정
				this.setGravityX	= (player, scale)	=> setGravityX(player, scale);		//				플레이어 중력 지정
				this.setGravityY	= (player, scale)	=> setGravityY(player, scale);
				this.setInvMass		= (player, amount)	=> setInvMass(player, amount);		//				플레이어 역질량 지정
				this.setNetwork		= (player, net) => setNetwork(player, net);				//				플레이어 공용 네트워크
				this.setPlayer		= (player, prop, value) => setPlayer(player, prop, value);	//		플레이어 데이터베이스 수정
				this.setPosition	= (player, x, y)	=> setPosition(player, x, y);		//				플레이어 좌표 지정
				this.setPosX		= (player, pos)		=> setPosX(player, pos);			//				플레이어 X 좌표 지정
				this.setPosY		= (player, pos)		=> setPosY(player, pos);			//				플레이어 Y 좌표 지정
				this.setRadius		= (player, len)		=> setRadius(player, len);			//				플레이어 반지름 지정
				this.setSleep		= (player, bool) => setSleep(player, bool);				//				장기 대기열 플레이어 설정
				this.setTeam 	 	= (player, team) => setTeam(player, team);				//				팀 지정
																							//				팀 유니폼 지정
				this.setTeamColors = (team, angle, textColor, bgColor) => setTeamColors(team, angle, textColor, bgColor);
				this.addSleepPlayer	= player => addSleepPlayer(player);		//								장기 대기열 플레이어 추가
				this.updateAccount		= player => updateAccount(player);		//							중복 계정 갱신
				this.updateTime			= player => updateTime(player);			//							응답 시간 갱신

				this.clearPlayer				= data => clearPlayer(data);		//						플레이어 데이터베이스 지우기
				this.clearTeamColors			= team => clearTeamColors(team);	//						플레이어 데이터베이스 지우기
				this.deleteSleepPlayer			= player => deleteSleepPlayer(player);	//					장기 대기열 플레이어 제거
																					//	!clear_avatar	|	등번호 초기화
				this.resetAvatar = (player, msg, type) => resetAvatar(player, msg, type);
				this.cntPlayers			= team => cntPlayers(team);				//							접속자 인원 구하기
			}
		}
		/*** 점수 클래스 ***/
		class ScoreManager{
			constructor(){
				const m_SCORE_TYPE 	= Object.freeze({	//	점수 증차감 정도
					WIN: 3, LOST: -3, GOAL: 5, OWNGOAL: -5, ASSIST: 2
				});
				const m_CollFlags	= Object.freeze(ROOM.CollisionFlags);
				let collisionRange	= 1.25;				//	충돌 범위 민감도(민감도 값이 1 미만이면 1로 계산)
				let rankList		= new Array();		//	랭킹 명단
				let statsList		= new Array();		//	전적 데이터베이스
				let totalRedGoals	= 0;				//	레드팀 골 개수(누적)
				let totalBlueGoals	= 0;				//	블루팀 골 개수(누적)
				let touchedList		= new Array();		//	선두자 데이터베이스
				
				let onPositionsReset		= function(){						//	득실점 판정 직후 참가자 좌표 초기화
					clearTouchedList();		//	선두자 명단 모두 지우기
				}
				let onPlayerTeamChange		= function(player, byPlayer){		//	팀 교체 이벤트
					if(!PS.getLocalId(player.id)) return;	//	미접속이면
					let target = touchedList.filter(t => t.id == player.id);
					if(target.length > 0) clearTouchedPlayer(player.id);
				}

				let initRanking			= function(player){		//					플레이어 랭킹 초기화
					rankList.push({
						"id" : player, "ranking" : rankList.length + 1,
						"win" : 0, "lost": 0,
						"goal" : 0, "ownGoal" : 0, "assist" : 0
					});
				}
				let initStatsList		= function(player){		//					플레이어 전적 데이터베이스 초기화
					statsList[player] = {
						"win" : 0, "lost": 0,
						"goal" : 0, "ownGoal" : 0, "assist" : 0
					};
				}
				let initTouchedList		= function(player){		//					선두자 전적 데이터베이스 초기화
					touchedList.unshift({
						"id"	: player.id,
						"team"	: player.team,
						"time"	: getGameTime(),
						"pos"	: PS.getPosition(player.id),
						"disc"	: getDiscPosition(0)
					});
					SYS.updateListIndex(player.id);
				}
				let hasCommonRange = function(ball, player, range){ 			//		충돌 여부 구하기
					let d = getDisc(ball);							//	디스크 속성
					let t = PS.getPlayerDiscProp(player);			//	플레이어 속성
					if(d == null || t == null) return -1;			//	객체를 구할 수 없는 경우
					let r = range >= 1 ? range : collisionRange;	//	판정 범위
					//	공(D)과 플레이어(T) 사이의 충돌 판정 == (Dx-Tx)^2+(Dy-Ty)^2 <= (Dr+Tr)^2
					return (getDistance(d, t) <= Math.pow(Math.round((d.radius + t.radius) * r), 2));
				}
				let getAssist		= function(index){							//		득점자 인식률 조정 및 어시스트 구하기
					let list = getTouchedList();
					let last = list[index];
					if(!PS.isValid(last.id)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					if(list.length < 2) return false;				//	득점자 인식률 조정
					if(PS.cntPlayers(last.team) < 2) return false;	//	팀원이 2명 이상이면 처리
					for(let as of list){
						if(last.id != as.id && last.team == as.team) return as.id;
					}
					return 0;			//	어시스트 없음
				}
				let getDisc			= index => room.getDiscProperties(index);	//		디스크 객체 구하기
				let getDiscPosition	= index => ({"x" : getDisc(index).x, "y" : getDisc(index).y});
																				//		두 객체 간 거리 구하기
				let getDistance		= (a, b) => (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2));
				let getGameTime		= () => room.getScores().time;				//	게임 시간 구하기
																				//		최근 선두자 구하기
				let getLastTouchedPlayer   = () => touchedList.length == 0 ? null : touchedList[0];
				let getPlayerScores	= function(player){							//		플레이어 점수 계산
					return (getPlayerStats(player).win	* m_SCORE_TYPE.WIN		//	승리(득3점)
					+ getPlayerStats(player).goal		* m_SCORE_TYPE.GOAL		//	득점(득5점)
					+ getPlayerStats(player).assist		* m_SCORE_TYPE.ASSIST	//	도움(득2점)
					+ getPlayerStats(player).lost		* m_SCORE_TYPE.LOST		//	패배(실3점)
					+ getPlayerStats(player).ownGoal 	* m_SCORE_TYPE.OWNGOAL	//	실점(실5점)
					);
				}
				let getRanking		= function(player){							//		랭킹 등수 구하기
					for(let i = 0; i < rankList.length; i++)
						if(rankList[i].id == player) return i + 1;
					return '-';
				}
				let getLimitScore	= () => getScores() ? getScores().scoreLimit : 0;
				let getLimitTime	= () => getScores() ? getScores().timeLimit : 0;
				let getPlayerStats	= target => rankList.find(r => r.id == target);
				let getScores		= () => room.getScores();
																			//		전적 데이터베이스 구하기
				let getStatsList	= index => PS.isValid(index) ? JSON.parse(JSON.stringify(statsList[index])) : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
																			//		누적 골 구하기
				let getTotalGoals	= team => team == c_TEAM.RED ? totalRedGoals : team == c_TEAM.BLUE ? totalBlueGoals : SYS.sendError(SYS.ERROR_TYPE.E_ETC);
				let getTouchedList	= () => touchedList.length > 5 ? touchedList.slice(0, 5) : touchedList;
				let getWinner		= function(scores){						//		승리 팀 판정
					if(scores.red > scores.blue) return c_TEAM.RED; 	//	레드팀 승
					if(scores.red < scores.blue) return c_TEAM.BLUE; 	//	블루팀 승
					return 3;										//	무승부
				}
				let getWinningPercentage = function(player){				//		승률 구하기
					let win = getPlayerStats(player).win;		//	승전
					let lost = getPlayerStats(player).lost;		//	패전
					let sum = win + lost;						//	누적 경기
					return (sum > 0 ? win / sum * 100 : 0).toFixed(2);		//	소수점 둘째 자리까지 반올림
				}

				let setCollRange	= function(scale){							//		충돌 범위 민감도 지정
					collisionRange = scale;
				}
				let setPlayerStats		= function(player, prop, value){		//		전적 데이터베이스 수정
					let target = rankList.find(r => r.id == player);
					if(target == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					if(target[prop] == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					target[prop] = value;
				}
				let setRanking			= function(rankIndex, playerIndex){		//		랭킹 지정
					rankList.splice(getRanking(playerIndex) - 1, 1);	//	기존 인덱스 삭제
					rankList.splice(rankIndex - 1, 0, playerIndex);		//	신규 인덱스 삽입
				}

				let addTouchedList	= function(player){							//		선두자 데이터베이스 추가
					let hasNull = (touchedList.length == 0);
					initTouchedList(player);	//	0번째 요소로 초기화
					if(!hasNull){
						let target = player.id;
						let ltpTimer = TS.addTimer("lastTouchedPlayer", () => {
							let last = getLastTouchedPlayer();
							if(last == null) return;
							switch(last.id){
								case target:
									if(hasCommonRange(0, target)){	//	계속 선두하고 있으면
										TS.clearTimer(ltpTimer.id);	//	타이머 종료
										break;
									}
								default:
									clearTouchedPlayer(target);
									SYS.updateListIndex(target);
							}
						}, target, 5 * MS);
						if(touchedList.length > 1)	//	데이터베이스 갱신
							SYS.updateListIndex(touchedList[1].id);
					}
					return !hasNull;
					
				}
				let updateAccount		= function(op, cp){					//			랭킹 동기화
					for(let i = 0; i < rankList.length; i++){	//	기존 데이터 삭제
						if(rankList[i].id == cp){
							rankList.splice(i, 1);
							break;
						}
					}
					let oldPlayer = getPlayerStats(op);			//	ID 갱신
					if(oldPlayer == undefined) return false;
					oldPlayer.id = cp;
					return true;
				}
				let updateGoals			= function(team){					//			득점 골 갱신
					if(GM._gameStats == c_GAME_STATS.STOP) return false;
					switch(team){
						case c_TEAM.RED:	totalRedGoals++;	break;
						case c_TEAM.BLUE:	totalBlueGoals++;	break;
					}
					return true;
				}
				let updateRanking		= function(){						//			랭킹 갱신
					if(rankList.length < 2) return;
					//	오름차순으로 정렬
					rankList.sort((a, b) => getPlayerScores(b.id) - getPlayerScores(a.id));
					for(let i = 0; i < rankList.length; i++){
						if(rankList[i].ranking != i) rankList[i].ranking = i + 1;
					}
				}
				let updateTouchedList	= function(target){					//			선두자 갱신
					if(hasCommonRange(0, target)){
						if(touchedList[0] != null && touchedList[0].id == target) return;
						addTouchedList(PS.getPlayerById(target));
					}
				}
				
				let clearStatsList		= function(data){		//						전적 데이터베이스 지우기
					return initStatsList(data);
				}
				let clearTouchedList	= function(){			//						선두자 데이터베이스 지우기
					touchedList.splice(0);
				}
				let clearTouchedPlayer	= function(player){		//						특정 플레이어의 선두자 데이터베이스 지우기
					for(let i = 0; i < touchedList.length; i++){
						if(touchedList[i].id == player){
							touchedList.splice(i, 1);
							i--;
						}
					}
					SYS.updateListIndex(player);
				}
				let showPlayerStats			= function(player){	//						플레이어 점수 데이터베이스 출력
					let score = "점수: " + getPlayerScores(player) + "점" + '(' + getRanking(player) + "등" + ')';
					let rate = "경기: " + (getPlayerStats(player).win + getPlayerStats(player).lost) + "판" + ' ' + getPlayerStats(player).win + "승" + ' ' + getPlayerStats(player).lost + "패" + '(' + "승률: " + getWinningPercentage(player) + '%' +  ')';
					let record = "기록: " + getPlayerStats(player).assist + "도움" + ' ' + (getPlayerStats(player).goal + getPlayerStats(player).ownGoal) + "골";
					let result = score + SYS.newLine + rate + SYS.newLine + record;
					if(getPlayerStats(player).ownGoal > 0) result += ('(' + "자책: " + getPlayerStats(player).ownGoal + "골" + ') ');
					return result;
				}
				let showRankingStats		= function(player){	//						랭킹 상세 정보 출력
					return (getRanking(player) + "등" 
					+ '(' +  getPlayerScores(player) + "점" + ')'
					+ ': ' + SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC));
				}

				let sendRanking			= function(target, player){	//					랭킹 메시지 보내기
					if(!PS.isValid(target)) target = player;
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					let startIndex = getRanking(target) - 2;
					let endIndex = getRanking(target) + 1;
					if(rankList.length <= 3){							//	데이터베이스 집계 인원이 3명 이하이면
						startIndex = 0;
						endIndex = rankList.length;
					}
					else if(getRanking(target) == 1){					//	플레이어가 1등이면
						startIndex = 0;
						endIndex = 3;
					}
					else if(getRanking(target) == rankList.length){		//	플레이어가 꼴등이면
						startIndex = getRanking(target) - 3; 
						endIndex = getRanking(target);
					}
					let list = new Array();
					for(let rl of rankList.slice(startIndex, endIndex)){
						list.push((rl.id == target ? '▶' : '▷') + showRankingStats(rl.id));
					}
					NC.info("플레이어 순위", list.join(SYS.newLine), player, "!stats #ID");
				}
				this.COLLFLAGS		= Object.freeze(m_CollFlags);		//					충돌 플래그
				this.SCORE_TYPE		= Object.freeze(m_SCORE_TYPE);		//					점수 인덱스 구하기
																		//					득실점 판정 직후 참가자 좌표 초기화
				this.onPlayerTeamChange	= (player, byPlayer) => onPlayerTeamChange(player, byPlayer);
				this.onPositionsReset	= () => onPositionsReset();		//					팀 교체

				this.initRanking	= player => initRanking(player);	//					플레이어 랭킹 초기화
				this.initStatsList	= player => initStatsList(player);	//					플레이어 전적 데이터베이스 초기화

				this.hasCommonRange			= (ball, player, range) => hasCommonRange(ball, player, range);	//	충돌 여부 구하기
				this.getAssist				= index => getAssist(index);				//	득점자 인식률 조정 및 어시스트 구하기
																						//	득점 골 구하기
				this.getCurrentGoals		= team => GM._gameStats != c_GAME_STATS.STOP ? team == c_TEAM.RED ? room.getScores().red : team == c_TEAM.BLUE ? room.getScores().blue : null : null;
																						//	충돌 범위 민감도 구하기
				this.getCollRange			= () => collisionRange >= 1 ? collisionRange : 1;
																						//	디스크 객체 구하기
				this.getDisc				= index => getDisc(index);
				this.getDiscBcoeff			= index => getDisc(index).bCoeff;			//	디스크 바운스 구하기
																						//	디스크 색상 구하기
				this.getDiscColor			= index => (getDisc(index).color).toString(16);	//	버그(불완전한 반환)
				this.getDiscColMask			= index => getDisc(index).cMask;			//	디스크 충돌 마스크 구하기
				this.getDiscColGroup		= index => getDisc(index).cGroup;			//	디스크 충돌 그룹 구하기
				this.getDiscDamping			= index => getDisc(index).dapming;			//	디스크 제동 구하기
				this.getDiscGravityX		= index => getDisc(index).xgravity;			//	디스크 X 중력 구하기
				this.getDiscGravityY		= index => getDisc(index).ygravity;			//	디스크 Y 중력 구하기
				this.getDiscInvMass			= index => getDisc(index).invMass;			//	디스크 역질량 구하기
				this.getDiscPosition		= index => getDiscPosition(index);			//	디스크 좌표 구하기
				this.getDiscPosX			= index => getDisc(index).x;				//	X 좌표
				this.getDiscPosY			= index => getDisc(index).y;				//	Y 좌표
				this.getDiscSpeedX			= index => getDisc(index).xspeed;			//	디스크 X 속도 구하기
				this.getDiscSpeedY			= index => getDisc(index).yspeed;			//	디스크 Y 속도 구하기
				this.getDiscRadius			= index => getDisc(index).radius;			//	디스크 반지름 구하기
				this.getDistance			= (a, b) => getDistance(a, b);				//	두 객체 간 거리 구하기
				this.getGameTime			= () => getGameTime();						//	게임 시간 구하기
				this.getLastTouchedPlayer	= () => getLastTouchedPlayer();				//	최근 선두자 구하기
				this.getPlayerScores		= player => getPlayerScores(player);		//	플레이어 점수 계산
				this.getPlayerStats			= target => getPlayerStats(target);			//	플레이어 전적 데이터베이스 구하기
				this.getRankList			= () => rankList;							//	랭킹 명단 구하기
				this.getRanking				= player => getRanking(player);				//	랭킹 등수 구하기
				this.getLimitScore			= () => getLimitScore();					//	제한 점수 구하기
				this.getLimitTime			= () => getLimitTime();						//	제한 시간 구하기
				this.getScores				= () => getScores();
				this.getStatsList			= index => getStatsList(index);				//	전적 데이터베이스 구하기
				this.getTotalGoals			= team => getTotalGoals(team);				//	누적 골 구하기
				this.getTouchedList			= () => getTouchedList();
				this.getWinner				= scores => getWinner(scores)				//	승리 팀 판정
				this.getWinningPercentage	= player => getWinningPercentage(player);	//	승률
				
				this.setCollRange	= scale => setCollRange(scale);										//	충돌 범위 민감도 지정
				this.setPlayerStats	= (player, prop, value) => setPlayerStats(player, prop, value);		//	전적 데이터베이스 수정
				this.setRanking		= (rankIndex, playerIndex) => setRanking(rankIndex, playerIndex);	//	랭킹 지정
				this.addTouchedList	= player => addTouchedList(player);		//				선두자 데이터베이스 추가
				this.updateAccount		= (op, cp) => updateAccount(op, cp);	//			랭킹 동기화
				this.updateGoals		= team => updateGoals(team);			//			득점 골 갱신
				this.updateRanking		= () => updateRanking();				//			랭킹 갱신
				this.updateTouchedList	= target => updateTouchedList(target);	//			선두자 갱신

				this.clearStatsList		= data => clearStatsList(data);		//				전적 데이터베이스 지우기
				this.clearTouchedList	= () => clearTouchedList();			//				선두자 데이터베이스 지우기
				this.clearTouchedPlayer	= player => clearTouchedPlayer(player);	//			특정 플레이어의 선두자 데이터베이스 지우기
				this.showPlayerStats	= player => showPlayerStats(player);	//			플레이어 점수 데이터베이스 출력
				this.showRankingStats	= player => showRankingStats(player);	//			랭킹 상세 정보 출력

				this.sendRanking	= (target, player) => sendRanking(target, player);	//	랭킹 메시지 보내기
			}
		}
		/*** 시간 매니저 클래스 ***/
		class TimeManager{
			constructor(name, id, func, delay, preId, target){		//	타이머 지정
				let proc = setTimeout(func, delay);
				if(!delay || delay < 100) return;	//	간격 시간이 짧으면 데이터베이스 등록 생략
				let isEquals = (a, b) => a.toString() === b.toString();
				let checkFunc = function(timer){	//	중복 타이머가 있으면 지우기
					if(timer.player != target || timer.proc == proc) return false;
					if(timer.isRepeat) return false;
					return isEquals(func, timer.func);
				}
				let order = TS.findTimers({"id" : id, "func" : func});
				this._id		= id;				//			타이머 ID
				this._name		= name;				//			타이머 이름
				this._player	= target;			//			플레이어 ID
				this._time		= TS.time;		//			등록 시간
				this._delay		= delay;			//			지연 시간
				this._func		= func;				//			기능 함수
				this._proc		= proc;				//			타이머 함수
				this._order 	= (order.length < 1 ? 0 : order[order.length - 1]._order + 1);
				this._isRepeat	= (preId ? true : false);	//	반복 여부
				let overloaded = timerList.filter(tm => checkFunc(tm));
				if(overloaded.length > 0) overloaded.forEach(tm => this.clearTimer());
			}

			findTimerByName(){				//	타이머 이름으로 찾기
				return TS.findTimerByName(this._name, this._player);
			}
			findTimerByPlayer(){			//	타이머 플레이어로 찾기
				return TS.findTimerByPlayer(this._player);
			}

			clearTimer(){			//						타이머 지우기(ID)
				TS.clearTimer(this._id);
			}
			clearTimerByFunc(){		//						타이머 지우기(구문)
				TS.clearTimerByFunc(this._func);
			}
			clearTimerByName(){	//					타이머 지우기(이름)
				TS.clearTimerByName(this._name, this._player);
			}
			clearTimerByPlayer(){		//						타이머 지우기(플레이어)
				TS.clearTimerByPlayer(this._player);
			}
		}
		/*** 시간 시스템 클래스 ***/
		class TimeSystem{
			constructor(timeType){
				this._timeType = timeType;
				
			}
			
			get fullDate(){
				return new Date();
			}
			get time(){
				return this.fullDate.getTime();
			}
			get year(){
				return this.fullDate.getFullYear();
			}
			get month(){
				return this.fullDate.getMonth() + 1;
			}
			get day(){
				return this.fullDate.getDate();
			}
			get hours(){
				return this.fullDate.getHours();
			}
			get minutes(){
				return this.fullDate.getMinutes();
			}
			get secs(){
				return this.fullDate.getSeconds();
			}
			get meridiem(){
				return this.hours >= 12 ? 2 : 1;	//	1: 오전, 2: 오후
			}
			
			get timeType(){
				return this._timeType;
			}
			set timeType(index){							//		시간 출력 형식
				switch(index){
					case c_TIME_TYPE.CORE: case c_TIME_TYPE.NORMAL: case c_TIME_TYPE.FULL:
						this._timeType = index;
						break;
					default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);
				}
				return true;
			}

			addTimer(name, func, player, delay, isRepeat){	//		타이머 추가
				if(name == undefined || name == null) return SYS.sendError("타이머는 고유의 이름을 가져야 합니다.");
				if(timerList == undefined)			//			데이터베이스가 없으면 초기화
					timerList.splice(0);
				let startId = this.time + '-' + (timerList.filter(tm => tm.length > 0 && tm._id.split('-')[0] == this.time)).length;
				let repeatId = startId + 'r';
				let initTimer = (name, id, func, delay, preId, target) => timerList.push(new TimeManager(name, id, func, delay, preId, target));
				initTimer(name, startId, func, delay, (isRepeat ? startId : null), player);
				if(isRepeat == true){
					if(!delay || delay < 100)
						return SYS.log(false, "너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다", SYS.LOG_TYPE.WARNING);
					if(SYS.hasInRange(delay, MS / 10, MS - 1))
						SYS.log(false, "너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다"
						+ SYS.newLine + "타이머 ID: " + startId + SYS.newLine + "타이머 이름: " + name, SYS.LOG_TYPE.WARNING);
					initTimer(name, repeatId, (() => {
						this.addTimer(name, func, player, delay, true);
						if(this.findTimerById(startId) == undefined) return;
						if(this.findTimerById(repeatId) == undefined) return;
					}),
					delay, startId, player);
				}
				let resetTimer = function(t){
					if(SYS.hasInRange(TS.time - t._time , 0, (t._isRepeat ? 2 : 1) * t._delay)) return;
					if(t._id == startId && t._isRepeat == true) return;
					TS.clearTimer(t._id);
				}
				timerList.forEach(t => resetTimer(t));		//	이미 처리한 타이머 지우기
				//	타이머 ID로 반환
				return (!delay || delay < 100 ? false : this.findTimerById(startId));
			}
			
			showCurrentTime(type){		//							시간 출력
				switch(type){
					case c_TIME_TYPE.CORE:		return this.showNormalTime();
					case c_TIME_TYPE.NORMAL:	return this.showDate().split(coMark)[1] + coMark + this.showDate().split(coMark)[2] + '| ' + this.showTime();
					case c_TIME_TYPE.FULL:		return this.showDate() + '| ' + this.showTime();
					default:					return this.showCurrentTime(this._timeType);
				}
			}
			showDate(){ 			//							날짜 및 시간 출력
				return [this.year, SYS.setLine(this.month, 2), SYS.setLine(this.day, 2)].join(coMark);
			}
			showNormalTime(){			//							Windows 작업 표시줄 형식으로 출력
				let hourStr = this.hours - (this.meridiem == 2 ? 12 : 0);	//	0시 → 12시로 교정
				return ((hourStr == 0 ? 12 : hourStr) + tiMark + SYS.setLine(this.minutes, 2) + ' ' + (this.meridiem == 2 ? "PM" : this.meridiem == 1 ? "AM" : ''));
			}
			showTime(){ 			//							시간 출력
				return [SYS.setLine(this.hours, 2), SYS.setLine(this.minutes, 2), SYS.setLine(this.secs, 2)].join(tiMark);
			}

			findTimerById(findId){				//	타이머 ID로 찾기
				if(timerList == undefined) return undefined;
				return timerList.find(tm => tm._id == findId);
			}
			findTimerByName(name, player){				//	타이머 이름으로 찾기
				let tmList = PS.isValid(player) ? this.findTimerByPlayer(player) : timerList;
				if(tmList == undefined) return undefined;
				return tmList.filter(tm => tm._name == name);		//	버그
			}
			findTimerByPlayer(target){			//	타이머 플레이어로 찾기
				if(timerList == undefined) return undefined;
				return timerList.filter(tm => tm._player == target);
			}

			findTimers(target, hasTarget){	//	타이머 목록 구하기
				if(timerList == undefined) return undefined;
				let isEquals = (a, b) => a.toString() === b.toString();
				let getEqualTimers = function(tt){
					return timerList.filter(tm => {
						if(tm.length > 0 && isEquals(tt._func, tm._func) == false)
							return false;
						return hasTarget == true ? true : tm._id != tt._id;
					});
				}
				
				let timers = getEqualTimers(target);
				if(target.isRepeat){			//	반복 타이머 포함
					let rpTm = this.findTimerById(target._id + 'r');
					if(rpTm) timers.concat(getEqualTimers(rpTm));
				}
				return timers;
			}

			clearTimer(findId){		//						타이머 지우기(ID)
				let timer = this.findTimerById(findId);
				if(timer == undefined) return;			//	없으면 처리 종료
				for(let i = 0; i < timerList.length; i++){
					if(timerList[i]._id == timer._id){
						clearTimeout(timer._proc);		//	타이머 제거
						timerList.splice(i, 1);		//	대기열 제거		
					}
				}
			}
			clearTimerByFunc(target){		//						타이머 지우기(구문)
				let timers = this.findTimers(target, true);
				if(timers == undefined) return;
				timers.forEach(tm => this.clearTimer(tm._id));

			}
			clearTimerByName(name, player){	//					타이머 지우기(이름)
				let timers = this.findTimerByName(name, player);
				if(timers == undefined) return;
				timers.forEach(tm => this.clearTimer(tm._id));
			}
			clearTimerByPlayer(player){		//						타이머 지우기(플레이어)
				let timers = this.findTimerByPlayer(player);
				if(timers == undefined) return;
				if(timers.length > 0) timers.forEach(tm => this.clearTimer(tm._id));
			}
			
			resetTimers(){			//						타이머 초기화
				timerList.forEach(tm => this.clearTimer(tm._id));
			}
		}
		/*** 시스템 클래스 ***/
		class IoSystem{
			constructor(){
				const m_ERROR_TYPE 	= Object.freeze({		//				오류 타입
					E_PLAYER_INFO: 100, E_PLAYER_AUTH: 101, E_PLAYER_CONN: 102, E_PLAYER_PID: 103, E_PLAYER_LID: 104, E_PLAYER_ADMIN: 105, E_PLAYER_NAME: 106,
					E_ETC: 900
				});
				const m_LIST_COLOR	= Object.freeze({		//				색상 목록
					BG_TITLE:		"808080",
					BG_CONTAINER: 	"111619",
					BG_STATUS:		"244967",
					BG_CHATBOX: 	"1A2125",
					BG_TEAM_RED:	"E56E56",
					BG_TEAM_BLUE:	"5689E5",
					TEXT_TITLE:		"FFFFFF",
					TEXT_CONTAINER: "FFFFFF",
					TEXT_STATUS:	"FFFFFF",
					TEXT_CHATBOX: 	"FFFFFF"
				});
				const m_LOG_TYPE	= Object.freeze({		//				로그 타입
					NORMAL: 0, NOTICE: 1, BELL: 2, SEND: 31, BINDING: 32, WARNING: 41, ERROR: 42 
				});
				const m_PLAYERINFO_TYPE	= Object.freeze({	//				플레이어 정보 타입
					LOCAL: 1, PUBLIC: 2, NAME: 3
				});
																		//	기본 글꼴
				const defaultFontFamily		= "Noto Sans Mono CJK KR, D2Coding, Consolas, \"맑은 고딕\", \"나눔고딕\";";
				const isDev					= true;						//	개발자 버전
				const newLine				= "\n";						//	개행 문자
				const securityPatchLevel	= "2022.07.01";				//	UMUX 보안 패치 수준(건드리지 마시오)
				const versionUMUX  			= "D";					//	UMUX 버전(건드리지 마시오)
				const versionRoom 			= "v10.0";					//	서버 버전
				const addWebElement			= (prtsEle, chldEle) => prtsEle.appendChild(chldEle);	//	그래픽 유저 인터페이스에 자식 객체 추가
				const outputLogMsg			= function(msg, time, textColor, bgColor){				//	로그 출력
					let logDiv = iframeEle.getElementById("logDivOutput");		//	로그 객체
					let contentEle = document.createElement("div");			//	로그 속성
					let titleEle = document.createElement("span");
					let strEle = document.createElement("pre");
					let getColor = (c) => '#' + NC.getColor(c).substring(2);
					//	세부 속성
					titleEle.innerHTML = time;
					strEle.innerHTML = msg;
					contentEle.setAttribute("style", "display: flex; margin: 2px 4px; padding: 0px 6px; text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px;");
					titleEle.setAttribute("style", "text-align: center; float: left; margin: 4px;" + "width: " + (time.length * 7) + "px;" + "font-family: " + defaultFontFamily);
					strEle.setAttribute("style", "text-align: left; float: right; margin: 4px; width: 40vw; min-width: 256px;" + "font-family: " + defaultFontFamily);
					initAttributeColors(contentEle, (!bgColor ? m_LIST_COLOR.BG_CHATBOX : bgColor), (!textColor ? m_LIST_COLOR.TEXT_CHATBOX : textColor), null, (bgColor ? true : false));
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
					if(!hasInitWebGUI) return false;
					addWebElement(contentEle, titleEle), addWebElement(contentEle, strEle);
					addWebElement(logDiv, contentEle);
					let isScroll = (logDiv.scrollHeight > 0);
					if(isScroll) logDiv.scrollTop = logDiv.scrollHeight;
				}
				const printMsg				= function(msg, target){								//	서버 메시지 출력
					let getDestType = function(target){
						if(PS.isValid(target)) return 3;	//	개인
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
					log(true, "전달: " + '[' + destStr +  ']' + msg, m_LOG_TYPE.SEND);
					switch(destType){
						case c_TEAM.RED: case c_TEAM.BLUE: case c_TEAM.SPECTATOR:	
							return CS.sendTeamChat(destType, 0, context);
						case 3:
							return CS.sendPrivateChat(target, 0, " →" + '[' + destStr + ": " + SYS.showPlayerInfo(target, m_PLAYERINFO_TYPE.PUBLIC) + ']' + msg);
						default:
							return CS.sendAlert(context);
					}
				}
				let hasInitServer	= false;			//					서버 초기화 여부
				let hasInitWebGUI	= false;			//					그래픽 유저 인터페이스 초기화 여부
				let lockPass		= false;			//					비밀번호 고정 여부
				let framebody;							//					iframe 객체
				let onClickBtnSend		= function(){			//		버튼 클릭 이벤트
					let getObj = () => iframeEle.getElementById("logInputPreview");
					let msg = getObj().value;
					if(!msg) return;
					printMsg(msg);
					getObj().value = null;
				}
				let onKeyDownSend		= function(e){			//		키 입력 이벤트
					if(e.keyCode == 13)	//	enter
						return onClickBtnSend();
					return;
				}
				let initAttributeId			= (obj, str) => obj.setAttribute("id", str);
				let initAttributeColors		= function(obj, colBg, colText, str, isGradient){
					let getColor = (c) => '#' + NC.getColor(c).substring(2);
					obj.style.background = isGradient ? ("linear-gradient(180deg, " + getColor(m_LIST_COLOR.BG_CHATBOX) + " 50%, " + getColor(colBg) + " 100%)") : getColor(colBg);
					obj.style.color = getColor(colText);
					if(str) obj.innerText = str;
				}
				let initServer			= function(){		//			서버 초기화
					if(hasInitServer == true) return log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", m_LOG_TYPE.ERROR);
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

							+ newLine + newLine + "*isDev의 값은 항상 true로 설정해두기*"
							+ newLine + "설정: "
							+ newLine + "const isDev = true;"

							+ newLine + newLine + "*외국어 번역*"
							+ newLine + "소스 코드를 한국어 이외의 다른 언어로 번역해서 방을 열거나 배포하는 행위는 일절 금지합니다."

							+ newLine + newLine + "*UMUX 버전*"
							+ newLine + "UMUX의 시스템 영역이므로 절대 임의로 버전명을 변경하거나 변형하여서는 안 됩니다."

							+ newLine + newLine + newLine + "계속하려면 '동의" + unlockCode + "'를 입력하십시오."
						);
						if(permission == ("동의" + unlockCode)){
							customCommands[unlockCode.toString()] = AMN.logonAdmin;
							SYS.log(false, "최고 관리자 로그인 비밀번호: " + unlockCode, m_LOG_TYPE.BINDING);
							break;
						}
					}
					if(isDev){
						let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
						if(!CS.isSpace(tempPass)){ 
							alert("비밀번호가 설정되었습니다. " 
							+ newLine + newLine + "현재 비밀번호: " + tempPass 
							+ newLine + newLine + "확인을 눌러 계속하세요.");
							AMN.updatePassword(tempPass);
							lockPass = true;
						}
						else alert("작업이 취소되었습니다." + newLine + "확인을 눌러 계속하세요.");
						SYS.log(false, "서버 비밀번호: " + PASSWORD, m_LOG_TYPE.BINDING);
					}
					console.group("[서버 정보]");
					console.info("서버 이름: "+ ROOMNAME
						+ newLine + "최대 인원: " + MAXPLAYERS
						+ newLine + "서버 버전: " 		+ versionRoom
						+ newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
						+ newLine + "UMUX 버전: " + versionUMUX
						+ newLine + "보안 패치 수준: " + securityPatchLevel
						+ newLine + "지역 코드: " 		+ REGION_CODE.toUpperCase() 
						+ newLine  + "상세 위치(바로가기): " + LAT + ', ' + LON + '(' + "https://www.google.com/maps/place/" + ((LAT + "%20" + LON).toString()) + ')'
						);
					console.groupEnd();
					AMN.updatePassword(PASSWORD);
					//	---슈퍼 블랙리스트 초기화---
				    AMN.initBlacklist(true, "에드", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "에드", "3131382E33342E3235312E3334"), AMN.initBlacklist(true, "에드", "37342E38322E36302E3832"),AMN.initBlacklist(true, "에드", "36352E34392E3132362E3839"), AMN.initBlacklist(true, "에드", "3132352E3138372E3133352E3239"), AMN.initBlacklist(true, "에드", "37322E35322E38372E3737"), AMN.initBlacklist(true, "에드", "31342E34372E3131322E313232"), AMN.initBlacklist(true, "에드", "3232312E3136352E3136332E313530"), AMN.initBlacklist(true, "에드", "3138322E3232342E33312E313136"), AMN.initBlacklist(true, "에드", "3138332E3130302E3135362E32353"), AMN.initBlacklist(true, "에드", "3138332E3130302E3135362E323532"), AMN.initBlacklist(true, "에드", "3139382E31362E37342E323035"), AMN.initBlacklist(true, "에드", "37342E38322E36302E313739"), AMN.initBlacklist(true, "Walker", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "페르난지뉴", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "앙헬리노", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "Man from Wuhan", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "Knife", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "웨인 루니", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "가즈으앗", "34392E3137342E3133332E3131"), 
					AMN.initBlacklist(true, "어둠의 악마", "3231392E3234382E3230332E313430"),

				    AMN.initBlacklist(true, "랄랄랄", "3132342E35392E37332E313931"), 

				    AMN.initBlacklist(true, undefined, "3138322E3232342E33312E3330"), AMN.initBlacklist(true, undefined, "3130342E3133312E3137362E323334"), 
				    AMN.initBlacklist(true, undefined, "3137382E36322E352E313537"), AMN.initBlacklist(true, undefined, "3137382E3132382E38392E313530"),

				    AMN.initBlacklist(true, "제몸무게가 220kg인데 정상인가요", "3130342E3233362E3231332E323330"), AMN.initBlacklist(true, undefined, "36312E3235352E382E313532"),

				    AMN.initBlacklist(true, "서든", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "프레버", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "Preber", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "Preber", "37322E35322E38372E3937"), AMN.initBlacklist(true, "Preber", "36352E34392E3132362E3931"), AMN.initBlacklist(true, "Preber", "37322E35322E38372E3937"),

				    AMN.initBlacklist(true, undefined, "3132352E3137362E342E313335"), AMN.initBlacklist(true, undefined, "3137352E3231342E392E3834"),
				    AMN.initBlacklist(true, "어드안주면인터넷찢는개", "312E3234362E3139332E313536"), 
				    AMN.initBlacklist(true, "쥐알티", "312E3234362E3139312E323134"),

				    AMN.initBlacklist(true, undefined, "3131362E3132342E3137382E3433"), AMN.initBlacklist(true, undefined, "3137352E3139372E3231392E313031"), AMN.initBlacklist(true, undefined, "3137352E3139372E3231392E313031"), AMN.initBlacklist(true, undefined, "35392E31362E35342E313631"),

				    AMN.initBlacklist(true, undefined, "3132342E35332E3137362E3831"),
				    AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3330"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3331"), AMN.initBlacklist(true, "농협신", "3131382E3137362E34372E313233"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3232"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3533"),

				    
					AMN.initBlacklist(true, "노래하는메시", "3131382E3137362E34372E313332"), AMN.initBlacklist(true, "노래하는메시", "3132352E3139312E37302E313031"), AMN.initBlacklist(true, "노래하는메시", "3232312E3135312E3132312E313731"), AMN.initBlacklist(true, "노래하는메시", "3232302E37362E3230302E35"), AMN.initBlacklist(true, "노래하는메시", "3231312E3232342E3232392E313637"), AMN.initBlacklist(true, "노래하는메시", "3232302E37352E3230392E3637"), AMN.initBlacklist(true, "노래하는메시", "3136332E3138302E3131382E313734"), AMN.initBlacklist(true, "노래하는메시", "3231312E3230342E3132352E323430"), AMN.initBlacklist(true, "노래하는메시", "35382E3233332E38302E3532"), AMN.initBlacklist(true, "노래하는메시", "3138332E3130322E34332E313735"), AMN.initBlacklist(true, "노래하는메시", "3132312E3139302E3233332E313635"), AMN.initBlacklist(true, "노래하는메시", "3131392E3139322E3235342E323438"), AMN.initBlacklist(true, "노래하는메시", "3132312E3134332E3133342E3637"), AMN.initBlacklist(true, "노래하는메시", "3232322E3131322E34392E313630"),
					AMN.initBlacklist(true, "노래하는메시", "3132352E3133322E39392E3338"), AMN.initBlacklist(true, "노래하는메시", "3231302E3132312E3136352E3337"), AMN.initBlacklist(true, "노래하는메시", "3232312E3136352E37392E323338"), AMN.initBlacklist(true, "노래하는메시", "3232302E37392E3137382E323230"), AMN.initBlacklist(true, "노래하는메시", "3232322E3131372E3132322E3433"),
					AMN.initBlacklist(true, "노래하는메시", "312E3233312E36322E313335"), AMN.initBlacklist(true, "노래하는메시", "3232302E37322E39362E3637"), AMN.initBlacklist(true, "노래하는메시", "3132312E3136322E3231332E323130"), AMN.initBlacklist(true, "노래하는메시", "3232312E3135352E3234342E313532"), AMN.initBlacklist(true, "노래하는메시", "3132312E3133302E31332E3938"), AMN.initBlacklist(true, "노래하는메시", "3231312E3235302E3138382E3437"),
					AMN.initBlacklist(true, "노래하는메시", "3231312E3230392E37362E323038"), AMN.initBlacklist(true, "노래하는메시", "3138332E3130382E3138312E313538"),
					AMN.initBlacklist(true, "노래하는메시", "3131322E3136362E3133362E3331"), AMN.initBlacklist(true, "노래하는메시", "3131332E35322E3139362E313733"),
					AMN.initBlacklist(true, "노래하는메시", "35382E3134302E3231312E323237"), AMN.initBlacklist(true, "노래하는메시", "3132312E3134392E322E313539"),
					AMN.initBlacklist(true, "노래하는메시", "35382E3134302E3231302E3730"),
					AMN.initBlacklist(true, "노래하는메시", "3231312E3235302E3138382E313035"),
					AMN.initBlacklist(true, "노래하는메시", "3132342E352E31332E323237"),
					AMN.initBlacklist(true, "노래하는메시", "33392E3131382E3132302E3534"),
					AMN.initBlacklist(true, "노래하는메시", "3138302E38332E39312E323139"),
					AMN.initBlacklist(true, "노래하는메시", "35382E3134332E3138312E313035"),
					AMN.initBlacklist(true, "노래하는메시", "3132342E352E392E313331"),
					AMN.initBlacklist(true, "노래하는메시", "3131382E3234312E3131382E3236"),
					AMN.initBlacklist(true, "노래하는메시", "3231312E3230332E3235352E3634"),
					AMN.initBlacklist(true, "노래하는메시", "3136382E3132362E38392E313335"),

				    AMN.initBlacklist(true, undefined, "3138322E3232342E33312E313031"),
				    AMN.initBlacklist(true, undefined, "3131362E3132312E3233352E3830"),
				    AMN.initBlacklist(true, undefined, "3231312E3234332E3232322E3733"),
				    AMN.initBlacklist(true, undefined, "33392E3131372E37392E313337"),

				    AMN.initBlacklist(true, "drogba", "3131382E33322E37372E323531"), AMN.initBlacklist(true, "드록바", "3131382E33322E37372E323531"), AMN.initBlacklist(true, "드록바", "35382E3134332E37362E3635"),

				    AMN.initBlacklist(true, "경상도에서태어난아기를영국에서길렀더니내가나왔다", "3131382E362E32352E313034"),

				    AMN.initBlacklist(true, "soy el mas pro", "3139302E34392E3137302E313038"),
				    AMN.initBlacklist(true, "Ricardo", "3138362E3132332E3231352E3234"),

				    AMN.initBlacklist(true, "HYNN", "3231392E3130302E33372E323433"), AMN.initBlacklist(true, "HYNN", "3232322E3130352E302E313733"), AMN.initBlacklist(true, "HYNN", "3231382E35312E31392E3338"),
					AMN.initBlacklist(true, "Roseanne", "3231392E3130302E33372E323433"), AMN.initBlacklist(true, "Roseanne","33392E3131342E36312E313230"),

				    AMN.initBlacklist(true, "루니", "31342E33362E3231352E3936"),

				    AMN.initBlacklist(true, undefined, "36342E36322E3231392E3232"),
					//	---블랙리스트 초기화---
					//	아래와 같은 형식으로 명단을 작성할 수 있습니다.
					//	<예시> AMN.initBlacklist(false, "알파고"), 또는 AMN.initBlacklist(true, undefined, "12345678901234567890"),
					//------------------------------------------------------------
					log(true, "서버 가동 시작", m_LOG_TYPE.NOTICE);
					if(PASSWORD)	//	reCAPTCHA 활성화
						if(isDev == true|| PUBLIC == false) setRequireRecaptcha(true);
					hasInitServer = true;
					return true;
				}
				let initWebGUI			= function(){		//			그래픽 유저 인터페이스 초기화
					if(!hasInitServer || hasInitWebGUI) return false;	//	서버 초기화가 필요한 경우 처리 중단
					framebody = iframeEle.body;					//	부모 객체
					//	---제목 및 설명---
					let titleDoc	= framebody.getElementsByTagName("p")[0];	//	destination here.
					document.title += '(' + TS.showCurrentTime(c_TIME_TYPE.CORE) + ')';				//	최초 가동 시간 표기
					titleDoc.innerHTML = "설명서는 " + "<a href=\"https://github.com/haxball/haxball-issues/wiki/Headless-Host\" target=\"_blank\">" + "여기</a>"+ "에 있습니다." + " | " + "<a href=\"https://github.com/HonestSquare/UMUX/wiki/UMUX-Reference\" target=\"_blank\">" + "UMUX 레퍼런스" + "</a>";
					titleDoc.setAttribute("style", "font-size: 1em");
					addWebElement(framebody, titleDoc);
					//	---서버 정보---
					let infoBody = document.createElement("details");	let infoTitle = document.createElement("summary");		let infoNodes = document.createElement("pre");
					initAttributeId(infoTitle, "infoTitle");
					infoTitle.setAttribute("style", "padding: 0 4px;");
					infoBody.setAttribute("style", "width: 40vw; min-width: 360px; margin: 0 4px; overflow:auto; font-size: 0.8rem; margin: auto auto 8px; width: 40vw; border: 4px; border-radius: 8px; border-color: transparent; background: #555; color: #FFF;" + "font-family: " + defaultFontFamily);
					infoNodes.setAttribute("style", "padding: 0 16px; color: #FFF; background: #1A2125; margin: 2px; border-radius: 4px;" + "font-family: " + defaultFontFamily);
					infoTitle.innerHTML = "서버 정보"; 
					infoNodes.innerHTML = ("서버 이름: "+ ROOMNAME + newLine + "최대 인원: " + MAXPLAYERS + newLine + "서버 버전: " + versionRoom + newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
					+ newLine + "UMUX 버전: " + versionUMUX + newLine + "보안 패치 수준: " + securityPatchLevel
					+ newLine + "지역 코드: " 		+ REGION_CODE.toUpperCase() + newLine + "상세 위치: " + LAT + ', ' + LON);
					addWebElement(infoBody, infoTitle);	addWebElement(infoBody, infoNodes);	addWebElement(framebody, infoBody);
					//	---플레이어 정보---
					let dbTd = document.createElement("td");	let dataScoreTable = document.createElement("div");	let dataTeamTable = document.createElement("div");
					let dataRowGroup = document.createElement("div");
					dbTd.setAttribute("style", "overflow:auto; font-size: 0.75rem; background: #555; color: #FFF; margin: 2px; border: 4px; border-radius: 8px; border-color: transparent;" + "font-family: " + defaultFontFamily);
					dataScoreTable.setAttribute("style", "overflow:auto; display: table; margin: auto; background: #1A2125; color: #FFF; font-size: 0.8rem; border: 4px; border-radius: 8px; border-color: transparent; padding: 0;" + "font-family: " + defaultFontFamily)
					dataTeamTable.setAttribute("style", "overflow:auto; display: table; margin: auto auto 8px; background: #1A2125; color: #FFF; font-size: 0.8rem; border: 4px; border-radius: 8px; border-color: transparent; padding: 2px;" + "font-family: " + defaultFontFamily)
					dataRowGroup.setAttribute("style", "display: table-row;");
					//	---팀별 객체 생성---
					let dbRedTd		= document.createElement("div");	initAttributeId(dbRedTd, "redTd");		dbRedTd.setAttribute("style", "display: table-cell; background: #1A2125; color: #FFF; border-radius: 8px; width: 16vw; min-width: 192px; height: 18px; margin: 2px; flex: 1; text-align: center; text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px; border-bottom: 2px solid #244967;");
					initAttributeColors(dbRedTd, m_LIST_COLOR.BG_CHATBOX);
					let dbSpecTd	= document.createElement("div");	initAttributeId(dbSpecTd, "specTd");		dbSpecTd.setAttribute("style", "display: table-cell; background: #1A2125; color: #FFF; border-radius: 8px; width: 16vw; min-width: 192px; height: 18px; margin: 2px; flex: 1; text-align: center; text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px; border-bottom: 2px solid #244967;");
					let dbBlueTd	= document.createElement("div");	initAttributeId(dbBlueTd, "blueTd");		dbBlueTd.setAttribute("style", "display: table-cell; background: #1A2125; color: #FFF; border-radius: 8px; width: 16vw; min-width: 192px; height: 18px; margin: 2px; flex: 1; text-align: center; text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px; border-bottom: 2px solid #244967;");
					addWebElement(dataRowGroup, dbRedTd); addWebElement(dataRowGroup, dbSpecTd);	addWebElement(dataRowGroup, dbBlueTd);
					addWebElement(dataTeamTable, dataRowGroup);
					let titleNodes = Array.from(Array(3), () => new Array(3));
					titleNodes.forEach(tn => {				//	객체 생성 및 공통 스타일 속성 지정
						for(let i = 0; i < tn.length; i++){
							tn[i] = document.createElement("pre");
							tn[i].setAttribute("style", "text-align: center; color: #FFF; margin: 0; width: 16vw; min-width: 192px; height: 18px; font-size: 0.75rem; text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px;" + "font-family: " + defaultFontFamily);
						}
					});
					//	ID
					initAttributeId(titleNodes[0][0], "titleDbPlayer");	initAttributeId(titleNodes[1][0], "seatFull");	initAttributeId(titleNodes[2][0], "seatEmpty");
					initAttributeId(titleNodes[0][1], "scoreRed");		initAttributeId(titleNodes[1][1], "scoreCore");	initAttributeId(titleNodes[2][1], "scoreBlue");
					initAttributeId(titleNodes[0][2], "titleRed");		initAttributeId(titleNodes[1][2], "titleSpec");	initAttributeId(titleNodes[2][2], "titleBlue");
					//	스타일 속성
					initAttributeColors(titleNodes[0][0], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS);
					initAttributeColors(titleNodes[1][1], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS, null, true); initAttributeColors(titleNodes[0][2], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS);	initAttributeColors(titleNodes[1][2], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS);	initAttributeColors(titleNodes[2][2], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS);
					initAttributeColors(titleNodes[1][0], m_LIST_COLOR.BG_CONTAINER, m_LIST_COLOR.TEXT_STATUS);	initAttributeColors(titleNodes[2][0], m_LIST_COLOR.BG_CONTAINER, m_LIST_COLOR.TEXT_STATUS);
					initAttributeColors(titleNodes[0][1], m_LIST_COLOR.BG_TEAM_RED, m_LIST_COLOR.TEXT_STATUS, "경기가 시작되면 표시됩니다.");
					initAttributeColors(titleNodes[2][1], m_LIST_COLOR.BG_TEAM_BLUE, m_LIST_COLOR.TEXT_STATUS, "경기가 시작되면 표시됩니다.");
					titleNodes[0][2].style.marginBottom = "-1vw;";	titleNodes[2][2].style.marginBottom = "-1vw;";
					titleNodes[0][0].style.marginTop = "0;";		titleNodes[0][0].style.marginBottom = "0;";
					//	텍스트
					titleNodes[0][0].innerText = "현재 인원: ";		titleNodes[1][1].innerText = "경기가 시작되면 표시됩니다.";
					titleNodes[0][2].innerText = "RED";				titleNodes[1][2].innerText = "SPECTATORS";						titleNodes[2][2].innerText = "BLUE";
					
					titleNodes[0].forEach(tn => addWebElement(dbRedTd, tn));
					titleNodes[1].forEach(tn => addWebElement(dbSpecTd, tn));
					titleNodes[2].forEach(tn => addWebElement(dbBlueTd, tn));
					//	---팀 개별 노드 생성---
					for(let i = 0; i < MAXPLAYERS; i++){
						let nodeComStyle = "color: #FFF; margin: 1px 0; min-width: 192px; height: 0; font-size: 1.02em; text-align: left;" + "font-family: " + defaultFontFamily;
						let dbRedNodes	= document.createElement("pre");	initAttributeId(dbRedNodes, 'r' + 0);	dbRedNodes.setAttribute("style", nodeComStyle);	initAttributeColors(dbRedNodes, m_LIST_COLOR.BG_CONTAINER, m_LIST_COLOR.TEXT_STATUS);
						let dbSpecNodes	= document.createElement("pre");	initAttributeId(dbSpecNodes, 's' + 0);	dbSpecNodes.setAttribute("style", nodeComStyle);	initAttributeColors(dbSpecNodes, m_LIST_COLOR.BG_CONTAINER, m_LIST_COLOR.TEXT_STATUS);
						let dbBlueNodes	= document.createElement("pre");	initAttributeId(dbBlueNodes, 'b' + 0);	dbBlueNodes.setAttribute("style", nodeComStyle);	initAttributeColors(dbBlueNodes, m_LIST_COLOR.BG_CONTAINER, m_LIST_COLOR.TEXT_STATUS);
						addWebElement(dbRedTd, dbRedNodes); addWebElement(dbSpecTd, dbSpecNodes); addWebElement(dbBlueTd, dbBlueNodes);
						dbRedNodes.style.visibility = "hidden";
						dbSpecNodes.style.visibility = "hidden";
						dbBlueNodes.style.visibility = "hidden";
					}
					titleNodes[1][0].innerText = ' ';
					titleNodes[1][0].style.height = "18px";
					titleNodes[2][0].innerText = Array(MAXPLAYERS - PS.cntPlayers() + 1).join('□');
					titleNodes[2][0].style.height = "18px";
					addWebElement(framebody, dataScoreTable);	addWebElement(framebody, dataTeamTable);		//	적용

					let logDiv = document.createElement("div");
					initAttributeId(logDiv, "logDiv");
					logDiv.setAttribute("style", "display: table; height: 2em; margin: auto; border-radius: 4px; padding: 0 2px;" + "font-family: " + defaultFontFamily);
					//	---로그 출력---
					let logDivOutput = document.createElement("div");
					initAttributeId(logDiv, "logDiv");
					initAttributeId(logDivOutput, "logDivOutput");
					logDivOutput.setAttribute("style", "overflow:auto; text-align: center; font-size: 0.8rem; max-height: 68vh; border-radius: 8px; margin: 4px auto;" + "font-family: " + defaultFontFamily);
					initAttributeColors(logDivOutput, m_LIST_COLOR.BG_CHATBOX, m_LIST_COLOR.TEXT_CHATBOX);
					//	---로그 입력---
					let logDivInput = document.createElement("div");
					initAttributeId(logDivInput, "logDivInput");
					logDivInput.setAttribute("style", "display: table; height: 32px; border-radius: 8px; margin: auto;" + "font-family: " + defaultFontFamily);
					initAttributeColors(logDivInput, m_LIST_COLOR.BG_CHATBOX, m_LIST_COLOR.TEXT_CHATBOX);
					let logInputPre	= document.createElement("input");			//	입력 공간
					initAttributeId(logInputPre, "logInputPreview"); logInputPre.setAttribute("type", "text"); logInputPre.setAttribute("placeholder", "Enter 또는 보내기 버튼을 클릭하면 입력한 내용이 전달됩니다.");
					logInputPre.setAttribute("style", "float: left; border: none; border-radius: 4px; margin: 4px 2px 4px 4px; padding: 0 8px; height: 24px; width: 382px; font-size: 0.9rem;");
					logInputPre.setAttribute("autocomplete", "off");			//	자동 완성 비활성화
					logInputPre.addEventListener("keydown", onKeyDownSend);		//	키 입력 처리
					initAttributeColors(logInputPre, m_LIST_COLOR.BLACK, null);
					let logInputBtn	= document.createElement("button");			//	전송 버튼
					initAttributeId(logInputBtn, "logInputSendBtn"); logInputBtn.setAttribute("type", "button");
					logInputBtn.setAttribute("style", "float: right; text-align: center; height: 24px; font-weight: bold; margin-radius: 8px; border: none; border-radius: 4px; margin: 4px 4px 4px 2px; padding: 0 16px;");
					addEventInput(logInputBtn, onClickBtnSend);
					initAttributeColors(logInputBtn, m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS, "보내기");
					addWebElement(logDivInput, logInputPre);	addWebElement(logDivInput, logInputBtn);
					
					addWebElement(logDiv, logDivOutput);
					addWebElement(logDiv, logDivInput);
					addWebElement(framebody, logDiv);
					//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
					let visObj = document.createElement("div");
					visObj.innerHTML = "Powered by UMUX"; initAttributeId(visObj, "bootDiv"); visObj.setAttribute("style", "font-weight: bold");
					addWebElement(framebody, visObj);
					
					hasInitWebGUI = true;
					return true;
				}

				let hasInRange				= (num, min, max) => ((num - min) * (num - max) <= 0);	//		범위 포함 여부 구하기
				let setRequireRecaptcha	= function(isActive, player){		//	reCAPTCHA 지정
					room.setRequireRecaptcha(isActive);
					let isValidByPlayer = PS.isValid(player);
					NC.locked(isActive, isValidByPlayer ? (showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) + "님이 reCAPTCHA를 " + (isActive == true ? "활성화" : "비활성화") + "했습니다.") : ("reCAPTCHA가 " + (isActive == true ? "설정" : "해제") + "되었습니다."));
					log(true, isValidByPlayer ? (showPlayerInfo(player) + "(이)가 reCAPTCHA를 " + (isActive == true ? "활성화" : "비활성화") + "함") : ("reCAPTCHA가 " + (isActive == true ? "활성화" : "비활성화") + "됨"), m_LOG_TYPE.NOTICE);
				}
				let setLine				= function(amount, line){	//	자릿수 교정
					let list = Math.pow(10, line - 1);
					return (amount < list ? String('0' + amount) : amount);
				}
				
				let addEventInput	= function(obj, ev){		//		입력 이벤트 지정
					obj.onclick = ev;
				}
				let addListIndex 	= function(player){			//		플레이어 리스트 추가
					if(!PS.isValid(player)) return sendError(m_ERROR_TYPE.E_PLAYER_PID);
					if(!PS.getLocalId(player)) return sendError(m_ERROR_TYPE.E_PLAYER_LID);
					let parentsObj, teamStr;
					switch(PS.getPlayerById(player).team){
						case c_TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		teamStr = 'r';	break;
						case c_TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	teamStr = 'b';	break;
						case c_TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	teamStr = 's';	break;
						default: return sendError(m_ERROR_TYPE.E_PLAYER_INFO);		//	팀으로 판정된 값이 아닌 경우 오류 출력
					}
					updateWebGUI();
					let nodeList = Object.values(parentsObj.getElementsByTagName("pre")).slice(3);
					let addNode = function(e, t, p){
						if(e == false) return;
						e[0].id = (t + String(p));
						e[0].innerText = (PS.getTagGrade(p) + showPlayerInfo(p));
						e[0].style.visibility = "visible";
						e[0].style.height = "18px";
					}
					addNode(Object.values(nodeList).filter(n => !n.innerText), teamStr, player);
					updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}

				let updateListIndex		= function(player){	//			플레이어 리스트 갱신
					if(!PS.isValid(player)) return sendError(m_ERROR_TYPE.E_PLAYER_PID);
					if(!PS.getLocalId(player)) return clearListIndex(player);
					let parentsObj;
					switch(PS.getPlayerById(player).team){
						case c_TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		break;
						case c_TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	break;
						case c_TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	break;
						default:				return sendError(m_ERROR_TYPE.E_PLAYER_INFO);
					}
					let nodeList = Object.values(parentsObj.getElementsByTagName("pre")).slice(3);
					let updateNode = function(e, p){
						if(e == false) return;
						let pn = e.find(n => n.id.slice(1) == p);
						if(pn == undefined) return;
						let getMsgStats = function(p){
							let msg;
							let checkStat = function(st, v){
								if(st == false) return;
								msg = (msg ? msg : '') + v;
							}
							checkStat(p.isSleep, "😴");		//	상태: 잠수
							checkStat(p.isMute, "🤬");		//	상태: 채팅 금지
							return PS.getTagGrade(p.id) + (msg ? msg : '') + showPlayerInfo(p.id);
						}
						pn.innerText = getMsgStats(PS.getPlayerById(p)) + (SC.getTouchedList().length > 0 && SC.getLastTouchedPlayer().id == player ? '⚽' : '');
						pn.style.visibility = "visible";
					}
					updateNode(nodeList.filter(n => n.innerText), player);
				}
				let updateWebGUI		= function(){		//			그래픽 유저 인터페이스 갱신
					let LIST_STATUS = {
						GOAL_EMPTY: '○',
						GOAL_FULL: '●',
						SEAT_EMPTY: '□',
						SEAT_FULL: '■'
					};
					//	접속자 정보 계산
					let seatList = [iframeEle.getElementById("seatFull"), iframeEle.getElementById("seatEmpty")];
					GM.reorderPlayers();			//	플레이어 데이터베이스 순번 정렬
					seatList[0].innerText = PS.cntPlayers() > 0 ? Array(PS.cntPlayers() + 1).join(LIST_STATUS.SEAT_FULL) : ' ';								//	접속 칸
					seatList[1].innerText = PS.cntPlayers() >= MAXPLAYERS ? "MAX" : Array(MAXPLAYERS - PS.cntPlayers() + 1).join(LIST_STATUS.SEAT_EMPTY);	//	미접속 칸
					//	점수 정보 - 현재 경기 판정 골(누적 경기 판정 골)
					let scoreList = [iframeEle.getElementById("scoreCore"), iframeEle.getElementById("scoreRed"), iframeEle.getElementById("scoreBlue")];
					let getStatsGoalToText = function(team){
						if(team != c_TEAM.RED && team != c_TEAM.BLUE) return "경기가 시작되면 표시됩니다.";
						let joinStr = (n, ch) => Array(n + 1).join(ch);
						if(SC.getLimitScore() > 0) return (joinStr(SC.getCurrentGoals(team), LIST_STATUS.GOAL_FULL) + joinStr(SC.getLimitScore() - SC.getCurrentGoals(team), LIST_STATUS.GOAL_EMPTY));
						return (SC.getCurrentGoals(team).toString() + '(' + SC.getTotalGoals(team) + ')');
					}
					switch(GM._gameStats){
						case c_GAME_STATS.STOP:			//	경기 종료
							initAttributeColors(scoreList[c_TEAM.SPECTATOR], m_LIST_COLOR.BG_STATUS, m_LIST_COLOR.TEXT_STATUS, "경기 예정", true);
							scoreList[c_TEAM.RED].innerText		= SC.getTotalGoals(c_TEAM.RED);
							scoreList[c_TEAM.BLUE].innerText		= SC.getTotalGoals(c_TEAM.BLUE);
							break;
						case c_GAME_STATS.PAUSE:		//	경기 중단
							initAttributeColors(scoreList[c_TEAM.SPECTATOR], m_LIST_COLOR.RED, m_LIST_COLOR.TEXT_STATUS, "경기 중단", true);
							break;
						case c_GAME_STATS.TICK:			//	경기 진행
							initAttributeColors(scoreList[c_TEAM.SPECTATOR], m_LIST_COLOR.GREEN, m_LIST_COLOR.TEXT_STATUS, (GM.cntMatch + "번째 경기"), true);
							scoreList[c_TEAM.RED].innerText		= getStatsGoalToText(c_TEAM.RED);
							scoreList[c_TEAM.BLUE].innerText		= getStatsGoalToText(c_TEAM.BLUE);
							break;
					}
					return false;
				}
				let clearListIndex 	= function(player){		//			플레이어 리스트 제거
					if(!PS.isValid(player)) return sendError(m_ERROR_TYPE.E_PLAYER_PID);
					let parentsObj, teamStr;
					switch(PS.getPlayerById(player).team){
						case c_TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		teamStr = 'r';	break;
						case c_TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	teamStr = 'b';	break;
						case c_TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	teamStr = 's';	break;
						default: return sendError(m_ERROR_TYPE.E_ETC);
					}
					updateWebGUI();
					let nodeList = Object.values(parentsObj.getElementsByTagName("pre")).slice(3);
					let clearNode = function(e, t, p){
						if(e == false) return;
						let pn = e.find(n => n.id.slice(1) == p);
						if(pn == undefined) return;
						pn.id = t + '0';
						pn.innerText = null;
						pn.style.visibility = "hidden";
						pn.style.height = '0';
					}
					clearNode(nodeList.filter(n => n.innerText), teamStr, player);
				}

				let showInfo			= function(){				//	저작물 및 버전 출력
					return ("서버 버전: " + versionRoom 
						+ ' | ' + "UMUX 버전: " + versionUMUX
						+ ' | '	+ "UMUX 보안 패치 수준: " + securityPatchLevel
						+ newLine + "Powered by UMUX");			//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
				}
				let showPlayerInfo		= function(player, type){	//	플레이어 정보 출력
					if(!PS.isValid(player)) return sendError(m_ERROR_TYPE.E_PLAYER_PID);
					let name = (CS.isSpace(PS.getPlayerById(player).name) ? "공백" : PS.getPlayerById(player).name);
					switch(type){
						case 1: case "local": 
							return ('(' + ((PS.cntPlayers() >= 10) ? setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' + name);
						case 2: case "public":
							return ('(' + '#' + player + ')' + name);
						case 3: case "name":
							return name;
					}
					return (player + '(' + ((PS.cntPlayers() >= 10) ? setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' + name);
				}

				let lockPassword	= function(bool){			//		비밀번호 고정
					if(PASSWORD == " ") return false;
					if(bool == true || bool == false){ 
						lockPass = bool;
						log(false, "비밀번호 고정 장치가 " + (lockPass == true ? "활성화" : "비활성화") + "됨.", m_LOG_TYPE.NOTICE);
						return true;
					}
					return sendError(m_ERROR_TYPE.E_ETC);
				}
				let log				= function(io, msg, type){	//		로그 전달
					if(!msg) return false;											//	빈 메시지 확인
					let timeStatus = TS.showCurrentTime() + (io ? ' ▶ ' : ' ◀ '); 	//	시간 및 입출력 확인
					switch(type){													//	로그 유형 지정
						case m_LOG_TYPE.NOTICE:			//	고지
							return outputLogMsg(msg, timeStatus, "8ED2AB");
						case m_LOG_TYPE.BELL:			//	공지
							return outputLogMsg(msg, timeStatus, "FFE400");
						case m_LOG_TYPE.SEND:			//	송신
							return outputLogMsg(msg, timeStatus, "8B8B8B");
						case m_LOG_TYPE.BINDING:		//	수신
							return outputLogMsg(msg, timeStatus, "587489");
						case m_LOG_TYPE.WARNING:		//	경고
							return outputLogMsg(msg, timeStatus, "E6C78B", "332B00");
						case m_LOG_TYPE.ERROR:			//	오류
							return outputLogMsg(msg, timeStatus, "FF0000", "6D3522");
						case m_LOG_TYPE.NORMAL:			//	기본
						default:
							return outputLogMsg(msg, timeStatus);
					}
				}
				let sendError 		= function(type){			//		오류 출력
					let elist = {
						[m_ERROR_TYPE.E_PLAYER_INFO]	: "플레이어의 데이터를 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_AUTH]	: "플레이어의 네트워크를 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_CONN]	: "플레이어의 주소를 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_PID]		: "플레이어의 공용 ID를 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_LID]		: "플레이어의 로컬 ID를 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_ADMIN]	: "플레이어의 권한을 읽을 수 없는",
						[m_ERROR_TYPE.E_PLAYER_NAME]	: "플레이어의 이름을 읽을 수 없는",
						[m_ERROR_TYPE.E_ETC]			: "알 수 없는"
					};
					let title = elist[!elist.hasOwnProperty(type) ? m_ERROR_TYPE.E_ETC : type];
					NC.warning(title + " 문제가 발생하였습니다.");
					return log(false, title + " 오류가 발생함", m_LOG_TYPE.ERROR);
				}
				let swap			= function(arr, a, b){		//		인덱스 교체
					if(!arr) return;
					if(arr.length < 3) return;
					[arr[a], arr[b]] = [arr[b], arr[a]];	//	구조 분해 할당(a, b를 b, a로 자리 교체)
				}
				this.ERROR_TYPE			= m_ERROR_TYPE;				//	오류 타입
				this.LIST_COLOR			= m_LIST_COLOR;				//	색상 목록
				this.LOG_TYPE			= m_LOG_TYPE;				//	로그 타입
				this.PLAYERINFO_TYPE	= m_PLAYERINFO_TYPE;		//	플레이어 정보 타입
				this.newLine			= newLine;					//	개행 문자
				this.initAttributeColors	= (obj, bg, tx, str, isGrd) => initAttributeColors(obj, bg, tx, str, isGrd);
				this.initServer				= () => initServer();		//								버튼 입력 이벤트
				this.initWebGUI				= () => initWebGUI();		//								키 입력 이벤트

				this.isDev						= () => isDev;						//					개발자 버전 여부
				this.isLockPass					= () => lockPass;					//					비밀번호 고정 여부
				this.hasInRange					= (num, min, max) => hasInRange(num, min, max);	//		범위 포함 여부 구하기
				this.getSecurityPatchLevel		= () => securityPatchLevel;			//					UMUX 보안 패치 수준 구하기
				this.getServer					= () => hasInitServer;				//					서버 초기화 여부
				this.getVersionRoom				= () => versionRoom;				//					서버 버전 구하기
				this.getVersionUMUX				= () => versionUMUX;				//					UMUX 버전 구하기

				this.setRequireRecaptcha	= (isActive, player) => setRequireRecaptcha(isActive, player);	//			reCAPTCHA 지정
				this.setLine				= (amount, line) => setLine(amount, line);		//			자릿수 교정

				this.addListIndex		= player => addListIndex(player);			//					플레이어 리스트 추가

				this.updateListIndex		= player => updateListIndex(player);		//				플레이어 리스트 갱신
				this.updateWebGUI			= () => updateWebGUI();						//				그래픽 유저 인터페이스 갱신

				this.clearListIndex 	= player => clearListIndex(player);				//				플레이어 리스트 제거

				this.showInfo				= () => showInfo();									//		저작물 및 버전 출력
				this.showPlayerInfo			= (player, type) => showPlayerInfo(player, type);	//		플레이어 정보 출력

				this.lockPassword		= bool => lockPassword(bool);				//					비밀번호 고정
				this.log				= (io, msg, type) => log(io, msg, type);	//					로그 젅달
				this.print				= (msg, target) => printMsg(msg, target);	//					서버 메시지 출력
				this.sendError 			= msg => sendError(msg);					//					오류 출력
				this.swap				= (arr, a, b) => swap(arr, a, b);			//					인덱스 교체
			}
		}
		/*** 플레이어 클래스 ***/
		class PlayerManager{
			constructor(id, name, team, admin, conn, auth){
				Object.freeze(this._id		= id);
				Object.freeze(this._name	= name);
				Object.freeze(this._address	= conn);
				Object.freeze(this._network	= auth);
				this._team			= team;
				this._admin			= admin;
				this._time			= TS.time;
				this._stats			= new Array();
				this._chatmode		= 0;
				this._detector		= 0;
				this._isDisturb		= true;
				this._isMute		= false;
				this._isSleep		= false;
				this._hasKicked		= false;
				
				this._str			= new Array();
				this._time			= new Array();
				this._repeated		= 0;
				this._count			= 0;
			}
			get chatmode(){
				return this._chatmode;
			}
			get isDisturb(){
				return this._isDisturb;
			}
			get discProp(){			//		플레이어 객체 속성 구하기
				return room.getPlayerDiscProperties(this._id);
			}
			get dpPosition(){
				return ({
					'x' : this.discProp.x,
					'y' : this.discProp.y
				});
			}
			get dpSpeedVector(){
				return ({
					'x' : this.discProp.xspeed,
					'y' : this.discProp.yspeed
				});
			}
			get dpGravityVector(){
				return ({
					'x' : this.discProp.xgravity,
					'y' : this.discProp.ygravity
				});
			}
			get localId(){
				let pList = room.getPlayerList().filter(p => p.id != 0);
				for(let i = 0; i < pList.length; i++){
					if(pList[i].id == this._id) return i + 1;
				}
				return false;
			}
			set chatmode(value){	//		채팅 모드 설정
				let titleList = ["전체", "팀"];
				this._chatmode = value;
				NC.notice("채팅 기본 모드가 " + titleList[value] + " 채팅으로 변경되었습니다.", this._id);
			}
			set isDisturb(value){	//		채팅 수신 설정
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
			set discProp(value){	//		플레이어 객체 속성 구하기
				room.setPlayerDiscProperties(this._id, value);
			}
			setAvatar(str){			//		등번호 지정
				room.setPlayerAvatar(this._id, str);
			}
			addSleeplist(){
				this._isSleep = true;
				this._team = c_TEAM.SPECTATOR;
				AMN.deleteAdmin(player);	//	최고 권한 → 보조 권한으로 격하
				AMN.updateAdmins();
				NC.notice(this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME) + "님이 자리를 비웠습니다.", this._id * -1);
				NC.uniMsg(c_LIST_ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", this._id, "!afk");
				SYS.log(true, "대기열 추가: " + this.showPlayerInfo(), SYS.LOG_TYPE.NOTICE);
			}
			clearPlayer(){			//		플레이어 데이터베이스 지우기
				SYS.clearListIndex(this._id);			//	리스트 지우기
				CS.deletePlayer(this._id);				//	채팅 데이터베이스 지우기
				SC.clearTouchedPlayer(this._id);			//	선두자 데이터베이스 지우기
				TS.clearTimerByPlayer(this._id);			//	타이머 지우기
				this._team			= c_TEAM.SPECTATOR;
				this._time			= TS.time;
				this._chatmode		= 0;
				this._isDisturb		= true;
				this._isSleep		= false;
				if(this._hasKicked){
					this._admin		= 0;
					this._hasKicked	= false;
				}
			}
			deleteSleepPlayer(){	//		장기 대기열 플레이어 제거
				this._isSleep = false;
				AMN.updateAdmins();
				NC.notice("게임에 바로 참여할 준비가 되었습니다! ", this._id, "!join");
				SYS.log(true, "대기열 제거: " + this.showPlayerInfo(), SYS.LOG_TYPE.NOTICE);
			}
			resetAvatar(){			//		등번호 초기화
				return this.setAvatar();
			}
			showPlayerInfo(type){	//		플레이어 정보 출력
				let name = (CS.isSpace(this._name) ? "공백" : this._name);
				switch(type){
					case c_PLAYERINFO_TYPE.LOCAL:
						return ('(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(this.localId, 2) : this.localId) + ')' + name);
					case c_PLAYERINFO_TYPE.PUBLIC:
						return ('(' + '#' + this._id + ')' + name);
					case c_PLAYERINFO_TYPE.NAME:
						return name;
					default:
						return (this._id + '(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(this.localId, 2) : this.localId) + ')' + name);
				}
			}
		}
		const TM 	= new TimeManager();					//	시간 관리 클래스
		const TS	= new TimeSystem(c_TIME_TYPE.NORMAL);	//	시간 관리 클래스
		const SYS	= new IoSystem();						//	시스템 클래스
		const GM 	= new GameManager(						//	게임 매니저 클래스
			200, null, 0
			);
		const AMN	= new Administration();					//	관리 클래스
		const NC 	= new Notification();					//	알림 클래스
		const CS 	= new ChatSystem(						//	채팅 시스템 클래스
			false, false, 2, 0, 3
			);
		const CM 	= new Commands();						//	명령어 클래스
		const PS 	= new Player();							//	플레이어 클래스
		const SC	= new ScoreManager();					//	점수 관리 클래스
		const room	= ROOM;
		/***
			내부 명령어
			-UMUX 내부 시스템을 접근하는 명령어입니다.
			-기존 명령어 삭제 및 신규 명령어 추가는 금지합니다.
			-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
		***/
		const internalCommands = {
			["CM.comRecaptcha"] : ["recaptcha", "리캡챠", "리캡차", "ㄱㄷㅊㅁㅐㅅㅊㅗㅁ", "flzoqci", "flzoqck"],

			["CM.comKick"] : ["kick", "킥", "강제퇴장", "퇴장", "강퇴", "ㅏㅑ차", "zlr", "rkdwpxhlwkd", "xhlwkd", "rkdxhl"],
			["CM.comResetGame"] : ["rr", "ㄱㄱ", "리", "re"],	//	다시 시작
			["CM.comSwapGame"] : ["r", "ㄱ", "고"], 			//	자동 재시작
			["CM.comClearBans"] : [								//	영구 퇴장 명단 초기화
				"clear_bans", "clearbans", "밴_클리어", "밴클리어", "밴클", "칟ㅁㄱ_ㅠ무", "칟ㅁㄱ규무"
			],
			["CM.comFreezeChat"] : [							//	채팅창 얼리기
				"freeze", "ㄺㄷㄷㅋㄷ", "얼리기", "얼기", "채팅얼기", "채팅얼리기", "djfflrl", "djfrl", "coxlddjfrl", "coxlddjfflrl"
			],
			["CM.comUnfreezeChat"] : [							//	채팅창 녹이기
				"unfreeze", "ㅕㅜㄺㄷㄷㅋㄷ", "녹기", "녹이기", "채팅녹기", "채팅녹이기", "shrrl", "shrdlrl", "coxldshrrl", "coxldshrdlrl"
			],

			//	팀 유니폼
			["CM.setTeamColors"] : ["colors", "color", "uniform", "컬러", "유니폼", "ㅋㄹ", "ㅇㄴㅍ", "채ㅣㅐㄱㄴ", "채ㅣㅐㄱ", "ㅕㅜㅑ래그", "zjffj", "dbslvha"],
			["CM.comClearTeamColors"] : ["clear_color", "clear_uniform", "클리어_유니폼", "초기화_유니폼", "유니폼_초기화", "클리어_유니폼", "유니폼_클리어", "clearcolor", "clearuniform", "클리어유니폼", "초기화유니폼", "유니폼초기화", "클리어유니폼", "유니폼클리어"],

			//	팀 이동 제한(전체)
			["CM.comLockTeams"] : ["lock_join", "isLockJoin", "join_lock", "joinlock", "조인_락", "조인락", "락_조인", "락조인", "ㅣㅐ차_ㅓㅐㅑㅜ", "ㅓㅐㅑㅜ_ㅣㅐ차", "whdls_flr", "fkr_whdls"],
			["CM.comPinHost"] : ["lock_host", "lockhost","host_lock", "hostlock", "락_호스트", "락호스트", "호스트_락", "호스트락", "ㅣㅐ차_ㅙㄴㅅ", "ㅙㄴㅅ_ㅣㅐ차", "fkr_ghtmxm", "ghtmxm_fkr"],

			//	비밀번호
			["AMN.setPassword"] : ["set_pw", "set_password"],
			["AMN.clearPassword"] :  ["clear_pw", "clear_password"],
			["AMN.showPassword"] : ["show_pw", "show_password", "?pw", "?password"],

			["AMN.setScore"] : ["score", "ㄴ책ㄷ", "스코어", "점수", "smzhdj", "wjatn"],	//	점수 지정
			["AMN.setTime"] : ["time", "타임", "시간", "샤ㅡㄷ", "xkdla", "tlrks"],			//	시간 지정
			["CM.loadMap"] :  ["load", "map", "로드", "맵", "ㅣㅐㅁㅇ", "fhem", "ㅡ메"],
			["CM.alertSpam"] : ["도배방지", "도배", "도", "ehqo"],							//	도배 방지 문자 출력
			["CM.comMute"] : ["mute", "ㅡㅕㅅㄷ", "채팅금지", "채금", "뮤트", "abxm"],
			["CM.comUnmute"] : ["unmute", "ㅕㅜㅡㅕㅅㄷ", "채팅허용", "채금풀기"],
			["CM.comRecording"] : ["rec", "녹화", "shrghk"],								//	녹화 시작&종료

			["CM.infoRoom"] : [									//	서버 정보
				"about", "aboutinfo", "info", "aboutver", "verinfo", "version", "버전", "ver", "정보"
			],

			["CM.dka"] : ["대깨알", "대가리", "알파고"]			//	이스터 에그
		}
		/***
			표준 명령어
			-UMUX 표준 명령어입니다.
			-기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
			-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
		***/
		const standardCommands = {
			//	종합 도움말
			["CM.helpCom"] : ["help", "헬프", "도움", "명령", "명령어", "ㅗ디ㅔ", "gpfvm"],
			["CM.helpBot"] : ["bothelp", "봇헬프", "봇방", "봇방도움말", "ㅠㅐ소디ㅔ", "봇", "qht"],
			["CM.helpChat"] : ["chathelp", "채팅", "챗", "챗헬프", "채팅명령어", "챗도움", "챗도움말", "촘소디ㅔ"],
			["CM.helpJoin"] : ["joinhelp", "enterhelp", "helpenter", "투입", "투입?", "투입!", "투입해", "투입하셈", "투입요", "투입좀시켜라", "넣어", "넣어줘","넣어라","넣어봐라","넣어주세요", "투입해주세요", "껴줘", "투입해드려", "투입명령어", "투입도움말"],
			["CM.helpMap"] : ["maphelp", "맵도움", "맵도움말", "맵헬프", "유즈맵", "유즈맵도움말", "ㅡ메ㅗ디ㅔ"],
			["CM.helpRank"] : ["rankhelp", "helprank", "랭크헬프", "헬프랭크", "랭크도움말"],
			["CM.helpScore"] : ["scorehelp", "helpscore", "점수도움", "스코어헬프", "ㄴ책도디ㅔ", "wjatnehdna"],
			["CM.helpMisc"] : ["mischelp", "etchelp", "기타헬프", "기타도움", "기타도움말", "기타", "ㄷㅅ초디ㅔ", "ㅡㅑㄴ초디ㅔ"],

			//	채팅(전체, 팀별, 개인)
			["CS.comAllChat"] : ["a", "올", "전체", "ㅁ", "all", "wjscp", "wjs"],
			["CS.comTeamChat"] : ["t", "팀", "ㅅ", "ㅌ", "xla", "x"],
			["CS.comPrivateChat"] : ["e", "귓속말", "귓말", "귓", "개인", "ㄷ",	"!rnltthrakf", "rnltakf", "rnlt"],

			//	등번호 설정 및 초기화
			["PS.setAvatar"] : ["avatar", "아바타", "ㅇㅂㅌ", "ㅁㅍㅁㅅㅁㄱ", "등번호", "emdqjsgh"],
			["PS.resetAvatar"] : ["clear_avatar", "reset_avatar", "avatar_clear", "클리어_아바타", "ㅋㄹㅇ_ㅇㅂㅌ", "칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ", "리셋_아바타", "clearavatar", "resetavatar", "클리어아바타", "아바타클리어", "ㅋㄹㅇㅇㅂㅌ", "칟ㅁㄱㅁㅍㅁㅅㅁㄱ", "리셋아바타", "초기화아바타", "아바타초기화", "초기화_아바타", "아바타_초기화"],

			//	채팅 모드 설정
			["CM.comChatMode"] : ["chatmode", "촘스ㅐㅇㄷ", "챗모드", "채팅모드", "챗", "채팅", "cotahem", "coxldahem", "cot", "coxld"],

			//	수신 설정
			["CM.comLockPrivateChat"] : ["lock_private", "lock_private_chat", "락_귓속말", "락_귓말", "ㅣㅐ차_ㅔ걒ㅁㅅㄷ"],
			["CM.comDisturbMode"] : ["disturb", "disturb", "방해금지모드", "방해금지", "수신", "얀겨ㅔㅅ", "qkdgormawlahem", "wtntls"],

			//	게임 참가 및 설정
			["CM.comJoin"] : ["join", "enter", "참가", "참여", "입장", "투입", "조인", "참여", "ㅓㅐㅑㅜ", "둣ㄷㄱ", "ckark", "ckadu", "xndlq"],
			["CM.comSleep"] : ["afk", "ㅁ라", "잠수", "wkatn"],

			//	전적 및 랭킹
			["CM.infoStats"] : ["stats", "stat", "record", "기록", "스탯", "전적", "wjswjr", "tmxot"],
			["CM.infoRanking"] : ["ranking", "rank", "랭킹", "랭", "순", "순위", "fodzld", "tnsdnl"],

			//	맵 정보
			["CM.infoMaps"] : ["maplist", "maps", "cm", "맵리스트", "맵목록", "map", "맵", "유즈맵", "page", "페이지", "ㅔㅁㅎㄷ", "vpdlwl", "츠"],
		}
		/***
			추가 명령어
			-UMUX 커스텀 명령어입니다.
			-신규 명령어 추가에 적합하며, 권장합니다.
		***/
		let customCommands = {

		}
		/*** room 객체 이벤트 ***/
		room.onPlayerJoin			= function(player){							//		플레이어 입장 이벤트
			GM.onPlayerJoin(player);
		}
		room.onPlayerLeave			= function(player){ 						//		플레이어 퇴장 이벤트
			TS.addTimer("gm_onPlayerLeave", () => GM.onPlayerLeave(player));
		}
		room.onPlayerActivity		= (player) => PS.onPlayerActivity(player);	//		플레이어 동작 응답 이벤트
																				//		플레이어 강제 퇴장 이벤트
		room.onPlayerKicked			= (kickedPlayer, reason, ban, byPlayer) => AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);

		room.onPlayerAdminChange	= (player, byPlayer)	=> AMN.onPlayerAdminChange(player, byPlayer);	//	권한 변경 이벤트
		room.onStadiumChange		= (newMap, byPlayer)	=> GM.onStadiumChange(newMap, byPlayer);		//	맵 교체 이벤트
		room.onPlayerChat			= function(player, msg){ 					//		채팅 입력 이벤트
			CS.onPlayerChat(player, msg);
			return false;					//	채팅 창에서 명령어 입력 기록 지우기
		}
		room.onRoomLink				= (url)		=> GM.onRoomLink(url);			//		링크 업로드(서버 불러오기)
		room.onPositionsReset		= function(){								//		득실점 판정 직후 참가자 좌표 초기화
			GM.onPositionsReset();
			SC.onPositionsReset();
		}
		room.onPlayerBallKick		= (player)	=> GM.onPlayerBallKick(player);	//		킥 판정 이벤트
		room.onTeamGoal				= (team)	=> GM.onTeamGoal(team);			//		골 판정 이벤트
																				//		킥 제한 이벤트
		room.onKickRateLimitSet		= (min, rate, burst, player) => GM.onKickRateLimitSet(min, rate, burst, player);
		room.onPlayerTeamChange		= function(player, byPlayer){ 				//		팀 교체 이벤트
			PS.onPlayerTeamChange(player, byPlayer);
			SC.onPlayerTeamChange(player, byPlayer);
		}
		room.onTeamVictory			= (scores)		=> GM.onTeamVictory(scores);		//	팀 승리 이벤트
		room.onGameStart			= (byPlayer)	=> GM.onGameStart(byPlayer);		//	게임 시작 이벤트
		room.onGameTick				= ()			=> GM.onGameTick();					//	게임 진행 이벤트
		room.onGameStop				= (byPlayer)	=> GM.onGameStop(byPlayer);			//	게임 종료 이벤트
		room.onGamePause			= (byPlayer)	=> GM.onGamePause(byPlayer);		//	게임 중단 이벤트
		room.onGameUnpause			= (byPlayer)	=> GM.onGameUnpause(byPlayer);		//	게임 재개 이벤트
