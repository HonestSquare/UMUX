		//	API LEVEL: 9(3.0.0 r5)
		//==========================================================<README>==========================================================
		//	유즈맵 대표카페(이하 UM)에서 진행하고 있는 Haxball headless host API 기반의 한국어화 봇방 프로젝트로,
		//	겉만 반지르르한 조각에 불과한 사용자 인터페이스(UI)가 아닌,
		//	눈으로 보이지 않는 조각까지 모아 마침내 알맹이로 완성한 하나의 사용자 경험(UX)입니다.
		//
		//	아래 문서상의 조건을 위배하지 않는다면 누구나 자유롭게 수정이 가능합니다.
		//	* 사용자 가이드라인:	github.com/HonestSquare/UMUX/wiki/UMUX-User-Guidelines
		//	* 라이센스:				github.com/HonestSquare/UMUX/blob/master/LICENCE
		//============================================================================================================================
		const c = (msg, target) => SYS.print(msg, target);	//	메시지 입출력	| *전체: c("안녕하세요"); | *팀: c("안녕하세요", "red"); | *개인: c("안녕하세요", 37);
		const iframeEle = $('iframe').contentWindow.document;
		const stopbot = () => alert("서버 가동이 중단되었습니다." + SYS.newLine + "재가동하려면 확인 버튼을 누르십시오.");
		//----------------------------------------------------------------------------------------------------------------------------
		//	서버 초기 설정 
		//----------------------------------------------------------------------------------------------------------------------------
							//	서버 이름, 서버 설명, 최대 접속 인원, 방장 이름(그대로 두는 것을 권장), 서버 공개 여부
		const	ROOMNAME 	= "제목 없음";
		const	DESCRIPTION	= "봇방입니다.";
		const	MAXLIMIT	= 12;
		const	HOSTNAME 	= " ";
		const	PUBLIC 		= true;
							//	token; You can obtain it at https://www.haxball.com/rs/api/getheadlesstoken
		const	TOKEN		= "thr1.AAAAAGBez8eMMl7BI2G14A.7CCMwW35uf8";
		const	NOPLAYER	= true;
							//	지역 코드, 위도, 경도(기본값 기준이며, 위도와 경도는 항상 동적으로 초기화 됨)
		const	REGION_CODE	= "kr";	
		const	LAT			= 37.566667 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		const	LON			= 126.978406 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
		var		PASSWORD	= " ";
		const MAXPLAYERS = (MAXLIMIT < 2 ? 2 : (MAXLIMIT > 30 ? 30 : MAXLIMIT));
							//	초기 비번 설정, 서버 초기화
		const INITSERVER	= str => {for(let i = 0; i < str.length; i++) return ((str.substr(i, 1)).search(" ") == -1) ? {roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : HOSTNAME, password: str, public : PUBLIC, token : TOKEN, geo: { code: REGION_CODE, lat: LAT, lon: LON}, noPlayer : NOPLAYER} : {roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : HOSTNAME, public : PUBLIC, token : TOKEN, geo: { code: REGION_CODE, lat: LAT, lon: LON}, noPlayer : NOPLAYER}}
		const ROOM			= HBInit(INITSERVER(PASSWORD));
		ROOM.setScoreLimit(0);
		ROOM.setTimeLimit(0);
		//----------------------------------------------------------------------------------------------------------------------------
		//	내장 맵 
		//----------------------------------------------------------------------------------------------------------------------------
		var maps		= new Array();
		var nameOfMaps	= new Array();
		{
			maps[0] = `{
				//	BUILD_DATE:		2021/02/16
				//	MADE BY			정직한네모형™
				//	CODE_NAME:		CROP-900M
				//	MODEL_NAME:		Basic
				//	VERSION:		v9.0
				//	SUPPORT_LEVEL:	
				//					9(3.0.0)
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
			}`
		}
		ROOM.setCustomStadium(maps[0]);
		//ROOM.setDefaultStadium("Classic");
		//----------------------------------------------------------------------------------------------------------------------------
		//	게임 매니저 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class GameManager{													
			constructor(){
				const handleGameStart	= function(){							//	게임 제어 준비
					gameStats = 1;									//	게임 상태 갱신
					countMatch++;									//	누적 경기 횟수 반영
					firstTimeNotified = TM.getTime();				//	최초 기록 시간 초기화
					lastTimeNotified = TM.getTime();				//	최근 기록 시간 초기화
					timeLimitReached = false;						//	기준 시간에 미도달한 상태로 초기화
					SC.clearTouchedList();							//	선두자 명단 모두 지우기
					for(let i = 1; i <= PS.cntPlayers(); i++){		//	마지막 활동 시간 저장
						if(PS.getPlayer(PS.getPublicId(i)).team != TEAM.SPECTATOR) PS.updateTime(PS.getPublicId(i));
					}
				}
				const handleGameTick	= function(currentTime){				//	게임 제어 처리
					if(gameStats != 2){ 
						gameStats = 2;
						SYS.updateWebGUI();
					}
					for(let i = 1; i <= PS.cntPlayers(); i++){
						SC.updateTouchedList(PS.getPublicId(i));				//	선두자 명단 갱신
						GM.checkAfkPlayer(PS.getPublicId(i), currentTime);		//	장기 무응답 플레이어 판정
					}
					if(timeLimit < 1) return false;								//	범위 내 도달 기준 시간이면 처리 종료
					if(currentTime - lastTimeNotified > timeLimit * 1000){		//	최근 기록 시간에서 도달 기준 시간 이후로 경과된 경우(정기 실행)
						lastTimeNotified = currentTime;							//	최근 기록 시간을 현재 시간으로 변경
						return true;
					}
					if(!timeLimitReached										//	0초에서 도달 기준 시간 이후로 경과된 경우(한 번만 실행)
						&& (currentTime - lastTimeNotified >= timeLimit * 1000)){
						timeLimitReached = true;								//	시간 도달하였으므로 값을 참으로 변경
						return true;
					}
					return false;
				}
				let	afkLimitTime			= 300;			//						장기 무응답 플레이어 판정 초단위 최소 시간(5 이하이면 판정 생략)
				let countMatch				= 0;			//						누적 경기 횟수
				let gameStats				= 0;			//						0: 정지, 1: 시작, 2: 게임 중, 3: 경기 중단
				let isRecording				= false;		//						녹화 여부
				let link					= null;			//						서버 링크
				let firstTimeNotified		= 0;			//						최초 도달 시간
				let lastTimeNotified		= 0;			//						최근 도달 시간
				let timeLimit				= 60;			//						도달 기준 시간(초 단위)
				let timeLimitReached		= false;		//						시간 도달 여부
				this.onGamePause		= function(player){ 			//			게임 중단
					gameStats = 3;
					SYS.log(true, (player == undefined ? "[경기 중단]" : (SYS.showPlayerInfo(player.id) + "(이)가 게임을 일시 중단함.")), SYS.LOG_TYPE.NOTICE);
					SYS.updateWebGUI();
				}	
				this.onGameStart		= function(){					//			게임 시작
					handleGameStart();		//	게임 제어 준비
					SYS.log(true, "[경기 시작]", SYS.LOG_TYPE.NOTICE);
					console.log("누적 경기 횟수: " + countMatch);
				}
				this.onGameStop			= function(){					//			게임 종료
					gameStats = 0;
					SC.updateRanking();			//	랭킹 갱신
					SYS.log(true, "[경기 종료]", SYS.LOG_TYPE.NOTICE);
					SYS.updateWebGUI();
					//	게임 미진행 중, 장기 무응답 플레이어 판정
					setTimeout(() => {
						for(let i = 1; i <= PS.cntPlayers(); i++)
							GM.checkAfkPlayer(PS.getPublicId(i), TM.getTime());
					}, GM.getAfkLimitTime() * 1000);
				}
				this.onGameTick			= function(){					//			게임 도중
					if(TM.getTime() >= firstTimeNotified + 100){		//	100ms 마다 처리
						firstTimeNotified = TM.getTime();	//	최근 기록 시간을 현재 시간으로 변경
						handleGameTick(firstTimeNotified);	//	게임 제어 처리
					}
				}
				this.onGameUnpause		= function(player){				//			게임 재개
					gameStats = 2;
					SYS.log(true, (player == undefined ? "[경기 재개]" : (SYS.showPlayerInfo(player.id) + "(이)가 중단된 게임을 재개함.")), SYS.LOG_TYPE.NOTICE);
					SYS.updateWebGUI();
				}
				this.onKickRateLimitSet	= function(						//			킥 제한 설정
					min, rate, burst, player){

				}
				this.onPlayerBallKick	= function(player){ 			//			공 찼을 때
					SC.addTouchedList(player.id);
				}
				this.onPlayerJoin		= function(player){				//			플레이어 입장
					PS.initPlayerList(player);						//	플레이어 데이터베이스 초기화
					SC.initStatsList(player.id);					//	전적 데이터베이스 초기화
					SC.initRanking(player.id);						//	랭킹 초기화
					SC.updateRanking();								//	랭킹 갱신
					if(SYS.isDev()) NC.caution("이 서버는 개발 중이므로, 게임 플레이가 원활하지 않을 수 있습니다.", player.id);
					PS.setAddress(player.id, player.conn);			//	공용 주소 부여
					PS.setNetwork(player.id, player.auth);			//	공용 네트워크 부여
					let isUpdate = PS.updateAccount(player.id);		//	계정 데이터베이스 갱신
					console.log("접속 인원: " + PS.cntPlayers());
					if(AMN.isSuperBlacklist(player.id) || AMN.filterPlayer(player.id)){	//	(슈퍼)블랙리스트, 중복 접속, 사칭, 다중 접속 탐지
						NC.warning(SYS.showPlayerInfo(player.id, "name") + "님은 관심 대상입니다.", player.id);
						SYS.log(true, "입장: " + SYS.showPlayerInfo(player.id, "public") + "(블랙리스트)", SYS.LOG_TYPE.WARNING);
					}
					else{									//	입장 문구 출력
						NC.uniMsg('#' + player.id, 
						(isUpdate == true ? "다시 환영합니다, ": "안녕하세요, ") + SYS.showPlayerInfo(player.id, "name") + "님! ", 
						player.id, "!help, !join");
						SYS.log(true, (isUpdate == true ? "재입장: ": "입장: ") + SYS.showPlayerInfo(player.id, "public"), SYS.LOG_TYPE.BELL);
					}
					if(PS.cntPlayers() < 2){				//		2명 미만이면
						PS.setTeam(player.id, TEAM.RED);	//	투입하고
						room.startGame();					//	게임 시작
					}
					AMN.updateAdmins(player);				//	권한 갱신
				}
				this.onPlayerLeave		= function(player){				//			플레이어 퇴장
					if(!PS.getPlayer(player.id).hasKicked) SYS.log(true, "퇴장: " + SYS.showPlayerInfo(player.id, "public") + (AMN.isBlacklist(player.id) ? "(블랙리스트)" : ''), SYS.LOG_TYPE.BELL);
					PS.clearPlayerList(player);					//	플레이어 데이터베이스 지우기
					if(PS.cntPlayers() == 0){					//	사람이 없으면 자동 종료
						room.stopGame();
						AMN.updatePassword();
					}
					else AMN.updateAdmins(PS.getPlayer(PS.getPublicId(1)));
					console.log("접속 인원: " + PS.cntPlayers());
				}
				this.onPositionsReset	= function(){		 			//			득실점 판정 직후 참가자 좌표 초기화
					SC.clearTouchedList();		//	선두자 명단 모두 지우기
				}
				this.onRoomLink			= function(address){			//			링크 획득(서버 가동)
					GM.setLink(address);
					if(!SYS.getServer()){	//	객체 초기화가 필요한 경우
						SYS.initServer();	//	서버 초기화
						SYS.initWebGUI();	//	그래픽 유저 인터페이스 초기화
						return;
					}
					NC.uniMsg(NC.ICON.POSTIVE_BOLD + "서버자동방어 시스템 가동중", address);
					SYS.log(true, "서버 복구 완료", SYS.LOG_TYPE.WARNING);
					SYS.setRequireRecaptcha(true);
					SYS.log(true,
					SYS.newLine + "DDoS 공격 방지를 위해 reCAPTCHA가 자동으로 활성화되었습니다." 
					+ SYS.newLine + "콘솔 입력창에 아래와 같은 코드를 작성하여 수동으로 해제할 수 있습니다."
					+ SYS.newLine + "SYS.setRequireRecaptcha(false);",
					SYS.LOG_TYPE.WARNING);
				}
				this.onStadiumChange	= function(newMap, byPlayer){	//			맵 교체
					GM.updateStadiumsData();
					if(newMap != nameOfMaps[AMN.getRestrictedStadium()]){
						for(let i = 0; i < maps.length; i++){
							if(nameOfMaps[i] == newMap)
								if(!AMN.isLockStadium() || (AMN.getRestrictedStadium() == null)) AMN.setRestrictedStadium(i); 
						}
					}
					if(byPlayer == undefined) return SYS.log(true, "맵 교체: " + newMap, SYS.LOG_TYPE.NOTICE);
					PS.updateTime(byPlayer.id);		//	마지막 활동 시간 저장
					if(PS.cntPlayers()){
						if(AMN.isLockStadium()){
							room.setCustomStadium(maps[AMN.getRestrictedStadium()]);
							return NC.acess(byPlayer, "맵이 고정돼있어 교체할 수 없습니다.");
						}
						SYS.log(true, SYS.showPlayerInfo(byPlayer.id) + "(이)가 맵을 " 
							+ newMap + "(으)로 교체함", SYS.LOG_TYPE.NOTICE);
					}
				}
				this.onTeamGoal			= function(team){ 				//			골 먹힐 때
					let time = Math.floor(SC.getGameTime());
					let teamTag = GM.getTeamName(team);
					let opponent = (team == TEAM.RED ? TEAM.BLUE : TEAM.RED);
					let assist;									//	어시스트
					let goalType = "득점";						//	득실점 판정
					let procSymbol = PS.getTeamTag(team);		//	공격팀 > 방어팀
					//	선두자 인식률 조정 및 어시스트 구하기
					let lastTouchedPlayer = SC.getLastTouchedPlayer();
					if(lastTouchedPlayer != null){
						if(PS.getPlayer(lastTouchedPlayer.id).team == team) assist = SC.getAssist(0);	//	공격팀과 방어팀이 서로 다르면 어시스트 구하기
						else{																			//	공격팀과 방어팀이 동일하면 선두자 변경
							let limit = SC.getTouchedList().length;
							for(let i = 1; i < (limit < 3 ? limit : 3); i++){
								let touchedPlayer = SC.getTouchedList()[i];
								if(PS.getPlayer(touchedPlayer.id).team == team){	//	공격팀과 방어팀이 다르면
									lastTouchedPlayer = touchedPlayer;				//	선두자 갱신하고
									assist = SC.getAssist(i);						//	어시스트 구하기
									break;
								}
							}
						}
						//	---득실점 판정---
						goalType = (PS.getPlayer(lastTouchedPlayer.id).team != team ? "실점" : "득점");
						procSymbol = (PS.getPlayer(lastTouchedPlayer.id).team != team ? (PS.getTeamTag(opponent) + '➡' + PS.getTeamTag(opponent)) : (PS.getTeamTag(team) + '➡' + PS.getTeamTag(opponent)));
						if(PS.getPlayer(lastTouchedPlayer.id).team != team)		//	공격팀과 방어팀이 동일한 경우
							teamTag = GM.getTeamName(opponent);
						else													//	공격팀과 방어팀이 서로 다른 경우
							if(assist) SC.updateStatsList(assist, "assist", SC.getStatsList(assist).assist + 1);	//	어시스트 점수 갱신
					}
					SC.updateGoals(team);		//	득점 데이터 갱신
					SYS.updateWebGUI();			//	그래픽 유저 인터페이스 실시간 정보 갱신
					time = SYS.setLine(Math.floor(time / 60), 2) + ':' + SYS.setLine(time % 60, 2);
					//	---득점 알림(득점자 제외)---
					if(!lastTouchedPlayer || !PS.getLocalId(lastTouchedPlayer.id)){
						NC.announce(time + '|' + procSymbol + teamTag + "이 " + goalType + "했습니다.", 
						null, null, "small", "muted");
						return SYS.log(true,  time + '|' + procSymbol + teamTag + ' ' + goalType);
					}
												//	전적 갱신
					goalType == "득점" ? SC.updateStatsList(lastTouchedPlayer.id, "goal", SC.getStatsList(lastTouchedPlayer.id).goal + 1) : SC.updateStatsList(lastTouchedPlayer.id, "ownGoal", SC.getStatsList(lastTouchedPlayer.id).ownGoal + 1);
					SC.updateRanking();			//	랭킹 갱신
					//	---득실점 알림(득점자 포함)---
					NC.announce(time + '|' + procSymbol
					+ SYS.showPlayerInfo(lastTouchedPlayer.id, "name") + "님이 " + goalType + "했습니다." 
					+ ((assist &&(goalType == "득점")) ? (SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assist, "name") + ')') : ''), 
					null, null, "small", "muted");
					SYS.log(true, time + '|' + procSymbol
					+ teamTag + ' ' + goalType + ': ' + SYS.showPlayerInfo(lastTouchedPlayer.id)
					+ ((assist &&(goalType == "득점")) ? (SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assist) + ')') : ''));
				}
				this.onTeamVictory		= function(scores){ 			//			팀 승리
					let winner = SC.getWinner(scores);
					switch(winner){
						case TEAM.RED:	//	레드팀 승
							break;
						case TEAM.BLUE:	//	블루팀 승
							break;
						case 3:			//	무승부
							return;
					}
					for(let i = 1; i <= PS.cntPlayers(); i++){		//	랭킹 갱신
						let index = PS.getPublicId(i);
						PS.getPlayer(index).team == winner ? SC.updateStatsList(index, "win", SC.getStatsList(index).win + 1) : SC.updateStatsList(index, "lost", SC.getStatsList(index).lost + 1);
					}
					SC.updateRanking();
					NC.uniMsg(NC.ICON.NORMAL_BOLD + "경기 종료",	//	경기 종료 및 승패 결과 출력
					GM.getTeamName(winner) + "이 승리하였습니다.", null, "!ranking");
					SYS.log(true, GM.getTeamName(winner) + " 승리", SYS.LOG_TYPE.NOTICE);
				}
																//					장기 무응답 판정 최소 시간 구하기(10 미만은 0, 10800 초과는 10800으로 계산)
				this.getAfkLimitTime	= () => (afkLimitTime < 10 ? 0 : afkLimitTime > 10800 ? 10800 : afkLimitTime);
				this.getGameStats		= () => gameStats;		//					0: 정지, 1: 시작, 2: 게임 중, 3: 경기 중단
				this.getLink			= () => link;			//					링크 얻기
				this.getStateRecording	= () => isRecording;	//					녹화 상태 구하기
				this.getTeamName		= function(team){		//					팀 상태(숫자>문자열)
					switch(team){
						case TEAM.SPECTATOR:	return "관중석";
						case TEAM.RED:			return "레드팀";
						case TEAM.BLUE:			return "블루팀";
						default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);
					}
				}
				this.setAfkLimitTime	= function(time){ 						//	장기 무응답 판정 최소 시간 지정
					if(!Number.isInteger(time)){
						afkLimitTime = 0;
						NC.uniMsg(null, "비활동 상한 시간이 비활성화되었습니다.");
						return SYS.log(true, "비활동 상한 시간이 비활성화됨.", SYS.LOG_TYPE.NOTICE);
					}
					if(time < 10 || time > 1440) return SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.LOG_TYPE.WARNING);
					if(afkLimitTime == time) return SYS.log(false, "중복된 값으로 접근됨", SYS.LOG_TYPE.WARNING);
					if(afkLimitTime < 0) return SYS.log(false, "음수의 값으로 접근할 수 없음", SYS.LOG_TYPE.WARNING);
					afkLimitTime = time;
					for(let i = 1; i <= PS.cntPlayers(); i++){		//	마지막 활동 시간 저장
						PS.updateTime(PS.getPublicId(1));
					}
					NC.uniMsg(null, "비활동 상한 시간이 " + afkLimitTime + "초로 변경되었습니다.");
					SYS.log(true, "비활동 상한 시간이 " + afkLimitTime + "초로 변경됨.", SYS.LOG_TYPE.NOTICE);
					return time;
				}
				this.setLink			= function(address){ 					//	서버 링크 지정
					if(link == null) link = address; 
				}
				this.updateStadiumsData = function(){	//							맵 정보 갱신
					nameOfMaps.splice(0);
					for(let i = 0; i < maps.length; i++){
						if(maps[i] != undefined){
							let sPos = (maps[i].indexOf("\"name\" : ") + 10);
							let ePos = (maps[i].indexOf('\"', sPos + 1));
							nameOfMaps[i] = maps[i].substr(sPos, ePos - sPos);
						}
						else maps.splice(i, 1);
					}
				}
				this.checkAfkPlayer	= function(player, time){	//					장기 무응답 플레이어 판정
					if(!GM.getAfkLimitTime()) return false;					//	장기 무응답 플레이어 판정 시간 미설정된 경우 처리 중단
					if(gameStats == 2){										//	게임 진행 중
						if(PS.getPlayer(player).team == TEAM.SPECTATOR) return false;	//	관중이면 처리 중단
						if(PS.getPlayer(player).isSleep) return false;					//	장기 대기열 명단에 포함되면 처리 중단
					}
					else if(!AMN.getAdmin(player)) return false;			//	게임 대기 중(관리자만 판정)
					if(time - PS.getPlayer(player).time > GM.getAfkLimitTime() * 1000){
						PS.onPlayerInactivity(PS.getPlayer(player));
						return true;
					}
					return false;
				}
				this.checkPublicId	= function(msg, player){	//					#ID 판별
					if(!msg) return NC.caution("\#" + "를 포함하십시오.", player);
					let startPos = msg.indexOf('\#');
					let num = parseInt(msg.substr(startPos + 1));		//	번호 저장
					if(startPos == -1) return NC.caution("\#" + "를 포함하십시오.", player);
					if(num >= 0 && num < PS.cntPlayers("public")) return (num == 0 || PS.getLocalId(num)) ? num : NC.caution("해당 ID를 가진 플레이어는 미접속 또는 존재하지 않습니다.", player);
					return NC.caution("범위를 벗어난 ID입니다.", player);
				}
				this.cntMatch			= () => countMatch;		//					누적 경기 횟수
				this.reorderPlayers		= function(indexList, moveToTop){		//	플레이어 데이터베이스 순번 재정렬
					let indexArray = indexList ? indexList : new Array();
					if(!indexArray){
						for(let i = 1; i < PS.cntPlayers("public"); i++){
							if(PS.getLocalId(i) > 0 && PS.getLocalId(i) <= PS.cntPlayers()) indexArray.push(i);
						}
					}
						room.reorderPlayers(indexArray, (moveToTop == true || moveToTop == false ? moveToTop : true));
					for(let i = 1; i <= PS.cntPlayers(); i++){	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
						SYS.updateListIndex(PS.getPublicId(i));
					}
				}
				this.runCommand			= function(array, index, msg, player){	//	명령어 실행 처리
					if(!array.hasOwnProperty(index)) return SYS.sendError(SYS.ERROR_TYPE.E_ETC);	//	명령어로 감지되지 않을 경우 오류 처리
					let spacePos = msg.indexOf(' ');								//	공백 포함 확인
					let comText = spacePos == -1 ? '' : msg.substr(spacePos + 1);	//	명령어 문자열 추출
					let comType = msg.substr(0, 1);									//	첫글자(특수문자) 추출
					let comIndex;
					switch(comType){
						case '!':	comIndex = 0;	break;	//	기능 명령 실행
						case '?':	comIndex = 1;	break;	//	도움말 출력
					}
					return array[index](player.id, comText, comIndex);	//	플레이어 공용 ID, 입력된 문자열, 추가 인덱스
				}
				this.startRecording		= function(){ 							//	녹화 시작
					if(isRecording) this.stopRecording();
					isRecording = true;
					room.startRecording();
					NC.extMsg(NC.ICON.POSTIVE_BOLD + "녹화 시작", TM.showCurrentTime(TM.TIME_TYPE.CORE), null, "!rec", "red");
					SYS.log(true, "녹화 시작", SYS.LOG_TYPE.NOTICE);
				}
				this.stopRecording		= function(){ 							//	녹화 종료
					let file = room.stopRecording();
					isRecording = false;
					if(!file) return SYS.log(true, "예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.", SYS.LOG_TYPE.ERROR);
					NC.extMsg(NC.ICON.POSTIVE + "녹화 종료", TM.showCurrentTime(TM.TIME_TYPE.CORE), null, "!rec", "red");
					SYS.log(true, "녹화 종료", SYS.LOG_TYPE.NOTICE);
					return file;
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	관리 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class Administration{												
			constructor() {
				let blacklist			= new Array();			//	블랙리스트 명단
				let dynamicAdmin 		= true;	 				//	권한 할당 방식(true: 동적, false: 정적)
				let lockJoin 			= false;				//	플레이어 팀 자율 이동 제한 여부
				let lockStadium 		= [null, false];		//	맵 고정(맵 데이터, 고정 여부)
				let maxAdmin			= 2;					//	최고 관리자 상한 인원
				let pinHost 			= true;					//	방장 팀 이동 허용 여부
				this.onPlayerAdminChange	= function(player, byPlayer){						//	플레이어 권한 획득&해제
					let newAdmin = SYS.showPlayerInfo(player.id, "name");
					let byAdmin = (byPlayer == undefined ? false : SYS.showPlayerInfo(byPlayer.id, "name"));
					PS.updateTime(player.id);			//	마지막 활동 시간 저장
					if(byAdmin != false) PS.updateTime(byPlayer.id);
					if(player.admin == true){			//	권한 획득(최고 권한 부여)
						if(AMN.isBlacklist(player.id)) return AMN.deleteAdmin(player.id);				//	블랙리스트이면 보조 권한으로 부여
						if(AMN.cntAdmins(2) >= AMN.getMaxAdmin()) return AMN.deleteAdmin(player.id);	//	최고 관리자 최대 인원을 초과하면 보조 권한으로 부여
					}
					else								//	권한 해제(보조 권한 부여)
						return AMN.giveSubAdmin(player.id)
					let procType = (player.admin == true ? "부여" : "박탈");
					PS.setPlayer(player.id, "admin", true), PS.setPlayer(player.id, "sub_admin", false);
					NC.notice(byAdmin == false ? (newAdmin + "님의 최고 권한이 " + procType + "되었습니다.") : (byAdmin + "님이 " + newAdmin + "님의 " + "최고 권한을 " + procType + "했습니다."));
					SYS.log(true, 
						(byPlayer == undefined ? (SYS.showPlayerInfo(player.id) + "(이)의 최고 권한이 " + procType + "됨.") : (SYS.showPlayerInfo(byPlayer.id) + "(이)가 " + SYS.showPlayerInfo(player.id) + "(이)의 최고 권한을 " + procType + "함.")),
						SYS.LOG_TYPE.BELL);
					SYS.updateListIndex(player.id);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
				}
				this.onPlayerKicked			= function(kickedPlayer, reason, ban, byPlayer){	//	플레이어 강제 퇴장
					let banType = ban == true ? "영구" : "강제";
					PS.setPlayer(kickedPlayer.id, "hasKicked", true);
					if(reason == "Bad actor"){ 
						SYS.sendError(SYS.ERROR_TYPE.E_ETC);
						NC.notice(SYS.showPlayerInfo(kickedPlayer.id, "name") + "님이 오류 감지 시스템으로 인해 퇴장되었습니다.");
						return SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, "public") + "(이)가 오류로 인해 "+ banType + "퇴장됨.", SYS.LOG_TYPE.ERROR);
					}
					if(byPlayer == undefined) return SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, "public") + "(을)를 " + banType + " 퇴장함." + (reason ? ('(' + reason + ')') : ''), SYS.LOG_TYPE.WARNING);
					PS.updateTime(byPlayer.id);							//	마지막 활동 시간 저장
					SYS.log(true, SYS.showPlayerInfo(byPlayer.id, "public") + "(이)가 " + SYS.showPlayerInfo(kickedPlayer.id, "public") + "(을)를 " + banType + " 퇴장함." + (reason ? ('(' + reason + ')') : ''), SYS.LOG_TYPE.WARNING);
				}
				this.initBlacklist		= function(isSuper, name, adrs){	//						블랙리스트 초기화
					blacklist.push({
						"super" : (!isSuper ? false : isSuper), "name" : (!name ? undefined : name), "ip" : (!adrs ? undefined : adrs)
					});
				}
				this.isBlacklist		= function(index){			//								블랙리스트 감지
					let indexName = PS.getPlayer(index).name;
					if(CS.hasSpace(indexName)) return false;								//	공백 닉네임 처리
					let sChar = /[\{\}\[\]\/?.,;:⊙▣◈◎|\)*~`!^\-+<>@\#\$\%\&\\\=\(\'\"]/gi;	//	특수문자 처리
					let i = 0;
					if(sChar.test(indexName)) indexName = indexName.replace(sChar, "특문");
					while(i < blacklist.length){
						let searchName = blacklist[i].name;
						if((searchName != undefined) && (blacklist[i].super == false)){	//	이름이 없거나 슈퍼 블랙리스트이면 다음 데이터로 넘김
							if((searchName.search(indexName) != -1)&&(searchName.length == indexName.length)){ 
								//	주소 데이터가 없으면 등록 처리
								if(blacklist[i].ip == undefined) blacklist[i].ip = PS.getAddress(index);
								return true;
							}
						}
						i++;
					}
					return false;
				}
				this.isLockJoin			= () => lockJoin;			//								팀 자율 이동 여부
				this.isLockStadium		= () => lockStadium[1];		//								맵 고정 여부
				this.isMute				= function(player, msg){	//								채금자 감지 및 메시지 전달
					if((player == 0)||(PS.getPlayer(player).isMute == false)) return false;
					let blockMsg = [
						"잠시동안 채팅이 불가합니다.",
						"현재 채팅이 불가능합니다.",
						"당분간 채팅이 불가합니다.",
						"채팅을 이용할 수 없습니다.",
						"채팅이 금지되었습니다."
					];
					if(!CS.sendEmojiChat(player, msg)) NC.acess(player, blockMsg[Math.floor(Math.random() * blockMsg.length)]);
					return true;
				}
				this.isPinHost			= () => NOPLAYER ? false : pinHost;		//					방장 팀 이동 허용 여부
				this.isSuperBlacklist	= function(index){						//					슈퍼 블랙리스트 감지
					let i = 0;
					let detected = false;
					while(i < blacklist.length){
						//	포함되면 필터 반환 | 포함되지 않으면 i 증가
						if(blacklist[i].super == true){
							if((blacklist[i].name != undefined)&&(blacklist[i].name == PS.getPlayer(index).name)){ 	//	닉네임이 동일하면
								if(blacklist[i].ip == undefined) blacklist[i].ip = PS.getAddress(index);			//	주소 원소의 값이 없을 경우 등록
								else if(blacklist[i].ip != PS.getAddress(index)) AMN.initBlacklist(true, PS.getPlayer(index).name, PS.getAddress(index));
								detected = true; break;
							}
							else if(blacklist[i].ip == PS.getAddress(index)){										//	주소가 동일하면
								if(blacklist[i].name == undefined) blacklist[i].name = PS.getPlayer(index).name;	//	이름 원소의 값이 없을 경우 등록
								else if(blacklist[i].name != PS.getPlayer(index).name) AMN.initBlacklist(true, PS.getPlayer(index).name, PS.getAddress(index));
								detected = true; break;
							}
						}
						i++;
					}
					for(let i = 0; i < blacklist.length; i++){			//	중복 데이터 삭제
						for(let j = 0; j < blacklist.length; j++){
							if((blacklist[i].super == true)&&(i != j))
								if((blacklist[i].name == blacklist[j].name)&&(blacklist[i].ip == blacklist[j].ip)) blacklist.splice(j, 1);
						}
					}
					if(detected == false) return false;
					SYS.log(true, "[슈퍼 블랙리스트]" + SYS.showPlayerInfo(index, "public") + ': ' + SYS.newLine + PS.getAddress(index), SYS.LOG_TYPE.WARNING);
					AMN.setKick(index, NC.ICON.NEGATIVE_BOLD + "차단된 계정", false);
					return true;
				}
				this.getAdmin				= function(player){					//					권한 확인
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					if(PS.getPlayer(player).admin) return 2;
					if(PS.getPlayer(player).sub_admin) return 1;
					return 0;
				}
																				//					블랙리스트 데이터베이스 구하기
				this.getBlacklist			= (index) => index >= 0 && index < blacklist.length ? blacklist[index] : blacklist;
				this.getMaxAdmin			= () => ((maxAdmin > MAXPLAYERS) || (maxAdmin < 1)) ? false : maxAdmin;
				this.getRestrictedStadium	= () => lockStadium[0];	//								고정 맵 데이터
				this.setDynamicAdmin		= function(bool){					//					권한 동적 할당
					if(dynamicAdmin == bool) return;
					dynamicAdmin = bool;
					NC.locked(bool, "권한 할당 작동 방식이 " + (bool ? "동적" : "정적") + "(으)로 변경되었습니다.");
					SYS.log(true, "권한 할당 작동 방식이 " + (bool ? "동적" : "정적") + "(으)로 변경됨.", SYS.LOG_TYPE.BELL);
				}
				this.setKick				= function(kickedPlayer, msg, ban){	//					강제 퇴장 처리
					if(!PS.isValid(kickedPlayer)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					room.kickPlayer(kickedPlayer, (msg ? msg : null), ban);
					return false;
				}
				this.setPassword			= function(player, pass){			//	!set_pw		|	비번 설정
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(SYS.isLockPass()) return NC.acess(player, "서버에서 비밀번호 고정 장치가 활성화 되어있습니다.");
					if(pass.length < 4) return NC.caution("비밀번호가 너무 짧습니다. ", player, "!clear_pw");
					if(pass.length > 30) return NC.caution("비밀번호가 너무 길어서 설정할 수 없습니다.", player);
					AMN.updatePassword(pass);
					NC.locked(true, "비밀번호가 설정되었습니다.");
					SYS.log(false, SYS.showPlayerInfo(player) + "(이)가 비밀번호를 설정함. (" + PASSWORD + ')', SYS.LOG_TYPE.BELL);
					return false;			//	채팅 창에서 명령어 입력 기록 지우기
				}
				this.setPinHost 			= function(bool){					//					방장 팀 이동 설정
					if(NOPLAYER == true) return SYS.log(false, "호스트가 비활성화 되었기 때문에 호출할 수 없습니다", SYS.LOG_TYPE.WARNING);
					if(bool == true || bool == false) pinHost = bool;
				}
				this.setRestrictedStadium	= function(index){					//					고정 맵 변경
					lockStadium[0] = index;
				}
				this.setScore				= function(player, num, type){		//	!score n	|	점수 변경
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){
						return NC.help("5점 내기로 게임을 진행하고 싶다면",
						"!score 5", player);
					}
					if(GM.getGameStats() == 2) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player);
					if((parseInt(num) >= 0)&&(parseInt(num) < 15)){ 	//	범위 내에서 벗어나면 처리 중단
						room.setScoreLimit(parseInt(num));
						NC.notice("제한 점수가 " + parseInt(num) + "점으로 변경되었습니다.");
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 제한 점수를 " + parseInt(num) + "점으로 변경함.", SYS.LOG_TYPE.NOTICE);
						return false;			//	채팅 창에서 명령어 입력 기록 지우기
					}
					return NC.caution("올바르지 않은 값입니다." 
					+ SYS.newLine + "0~14 사이의 값을 입력하세요.", player, "?score");
				}
				this.setTeamsLock			= function(bool, player){			//					팀 이동 금지/허용
					NC.locked(true, "팀 자율 이동이 " + (bool ? "금지" : "허용") + "되었습니다.");
					lockJoin = !lockJoin;
					room.setTeamsLock(lockJoin);
					if(player != undefined) SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 팀 자율 이동을 " + (bool ? "금지" : "허용") + "함.", SYS.LOG_TYPE.NOTICE);
					return false;			//	채팅 창에서 명령어 입력 기록 지우기
				}
				this.setTime				= function(player, time, type){		//	!time n		|	시간 변경
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){
						return NC.help("5분 내기로 게임을 진행하고 싶다면",
						"!time 5", player);
					}
					if(GM.getGameStats() == 2) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player);
					if((parseInt(time) >= 0)&&(parseInt(time) < 15)){ 	//	범위 내에서 벗어나면 처리 중단
						room.setTimeLimit(parseInt(time));
						NC.notice("제한 시간이 " + parseInt(time) + "분으로 변경되었습니다.");
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 제한 시간을 " + parseInt(time) + "분으로 변경함.", SYS.LOG_TYPE.NOTICE);
						return false;		//	채팅 창에서 명령어 입력 기록 지우기
					}
					return NC.caution("올바르지 않은 값입니다." 
						+ SYS.newLine + "0~14 사이의 값을 입력하세요.", player, "?time");
				}
														//											(슈퍼)블랙리스트 추가
				this.addBlacklist		= index => AMN.initBlacklist(false, PS.getPlayer(index).name, PS.getAddress(index));
				this.addSuperBlacklist	= index => AMN.initBlacklist(true, PS.getPlayer(index).name, PS.getAddress(index));
				this.updateAdmins	= function(player){	//											권한 갱신
					let players = room.getPlayerList().filter((player) => player.id != 0 );
					if(players.length == 0) return;										//	접속자가 없으면 처리 중단
					if(players.find((player) => player.admin) != null) return;			//	권한을 가진 플레이어가 이미 있으면 처리 중단
					if(!dynamicAdmin) return;											//	권한 할당 방식이 정적인 경우 처리 중단
					(AMN.isBlacklist(player.id)||PS.getPlayer(player.id).isSleep) ? AMN.giveSubAdmin(player.id) : AMN.giveAdmin(player.id);
				}
				this.updatePassword	= function(pass){	//											비번 갱신
					if(!SYS.isLockPass()) PASSWORD = (pass == " " ? null : pass);
					room.setPassword(PASSWORD);
					return PASSWORD;
				}
				this.clearBans		= function(player){			//									영구 퇴장 명단 초기화
					room.clearBans();
					NC.notice("영구 퇴장 명단이 초기화되었습니다.");
					SYS.log(true, 
						(player ? (SYS.showPlayerInfo(player) + "(이)가 영구 퇴장 명단을 모두 지움.") : "영구 퇴장 명단 초기화"), 
						SYS.LOG_TYPE.NOTICE);
					return false;  //	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.clearPassword	= function(player){			//				!clear_pw		|	비번 해제
					if(!AMN.getAdmin(player)) return NC.acess(player);		//	권한이 없는 경우 처리 중단
					if(SYS.isLockPass()) return NC.acess(player, "서버에서 비밀번호 고정 장치가 활성화 되어있습니다.");
					PASSWORD ? NC.locked(false, "비밀번호가 해제되었습니다.") : NC.caution("비밀번호가 이미 해제되어 있습니다.", player);
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 비밀번호를 해제" + (PASSWORD ? "함" : " 시도함"), SYS.LOG_TYPE.NOTICE);
					if(PASSWORD) AMN.updatePassword();
					return false;  //	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.deleteAdmin	= function(player){	//											최고 권한 해제
					room.setPlayerAdmin(player, false);
				}
				this.deleteSubAdmin	= function(player){	//											보조 권한 해제
					if(AMN.getAdmin(player) == 1) return;
					PS.setPlayer(player, "sub_admin", false);
					NC.notice(SYS.showPlayerInfo(player, "name") + "님의 보조 권한이 해제되었습니다.");
					SYS.log(SYS.showPlayerInfo(player) + "(이)의 보조 권한이 삭제됨.");
				}	
				this.resetGame		= function(player){	//						!rr				|	게임 재시작
					if(!AMN.getAdmin(player)) return NC.acess(player);  
					room.stopGame();
					room.startGame();
					return false;			//	채팅 창에서 명령어 입력 기록 숨기기
				}
																			//	!show_pw		| 	비번 공개
				this.showPassword		= (player) => AMN.getAdmin(player) ? PASSWORD ? NC.notice("현재 비밀번호는 " + PASSWORD + "입니다.") : NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", player) : NC.acess(player);
				this.cntAdmins			= function(type){					//						접속자 인원(권한)
					let amount = 0;
					for(let i = 0; i < PS.cntPlayers(); i++){
						switch(type){
							case 0:		//	최고 권한+보조 권한 관리자
							case 1:		//	최고 권한 관리자만
							case 2:		//	보조 권한 관리자만
								if(AMN.getAdmin(PS.getPublicId(i+1)) == type) amount++;
								break;
						}
					}
					return amount;
				}
				this.filterPlayer		= function(player){					//						사칭 및 중복 필터
					if(!PS.getLocalId(player)) return false;	//	접속 상태가 아니면 처리 중단
					if(AMN.isBlacklist(player)) return true;	//	블랙리스트 감지
					if(PS.cntPlayers() <= 1) return false;		//	접속자 수가 1명 이하면 처리 중단
					let firstIdex;
					for(let i = 1; i <= PS.cntPlayers(); i++){
						firstIdex = PS.getPublicId(i);
						if(!firstIdex || !PS.isValid(firstIdex)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
						if(firstIdex != player){
							//	사칭
							if(PS.getPlayer(firstIdex).name == PS.getPlayer(player).name){ 		//	중복 접속 처리
								if(PS.getNetwork(firstIdex) == PS.getNetwork(player)){ 
									AMN.setKick(firstIdex);
									return SYS.log(true, SYS.showPlayerInfo(firstIdex) + "(이)가 " + SYS.showPlayerInfo(player) + "(으)로 중복 접속함", SYS.LOG_TYPE.NOTICE);
								}
								AMN.setKick(player, NC.ICON.NEGATIVE + "사칭 및 다중 접속");
								return true;
							}
							//	다중 접속
							if(PS.getAddress(firstIdex) == PS.getAddress(player)){
								AMN.addBlacklist(player);
								AMN.setKick(player, NC.ICON.NEGATIVE + "사칭 및 다중 접속");
								SYS.log(true, 
									SYS.showPlayerInfo(firstIdex) + "(와)과 " + SYS.showPlayerInfo(player) + "(이)의 다중 접속이 감지됨.", SYS.LOG_TYPE.WARNING);
								return true;
							}
						}
					}
					return false;
				}
				this.giveAdmin			= function(player){					//						권한 설정 부여
					if(this.cntAdmins(2) >= maxAdmin) return false;
					room.setPlayerAdmin(player, true);
					return false;
				}
				this.giveSubAdmin		= function(player){					//						보조 권한 부여
					if(this.getAdmin(player) == 1) return false;
					if(this.cntAdmins(2) >= maxAdmin * 2) return false;
					PS.setPlayer(player, "sub_admin", true);
					if(this.getAdmin(player) == 2) PS.setPlayer(player, "admin", false);
					NC.notice(SYS.showPlayerInfo(player, "name") + "님의 보조 권한이 부여되었습니다.");
					SYS.updateListIndex(player);					//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)의 보조 권한이 부여됨.", SYS.LOG_TYPE.NOTICE);
					return true;
				}
				this.missPassword		= function(player){					//						최고 권한 로그인 오입력
					AMN.getAdmin(player) != 2 ? SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 최고 권한 로그인을 시도함(실패)", SYS.LOG_TYPE.WARNING) : false;
					return false;		//	채팅 창에서 입력 기록 지우기
				}
				this.mutePlayer			= function(mutedPlayer, byPlayer){	//					|	채팅 금지
					if(!PS.isValid(mutedPlayer) || PS.getPlayer(mutedPlayer).isMute) return false;
					else PS.setPlayer(mutedPlayer, "isMute", true);
					for(let i = 1; i <= PS.cntPlayers(); i++){
						NC.locked(true, (PS.getPublicId(i) == mutedPlayer ? "채팅 금지되었습니다." : "특정 플레이어의 채팅이 금지되었습니다."), PS.getPublicId(i));
					}
					SYS.log(true, 
						((byPlayer == undefined) ? (SYS.showPlayerInfo(mutedPlayer) + "(이)의 채팅이 금지됨.") : (SYS.showPlayerInfo(byPlayer) + "(이)가 " + SYS.showPlayerInfo(mutedPlayer) + "(이)의 " + "채팅을 금지함.")), 
						SYS.LOG_TYPE.NOTICE);
					SYS.updateListIndex(mutedPlayer);				//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					return false;
				}
				this.lockStadium		= function(bool){					//						맵 고정
					if(maps.length < 1) return SYS.log(false, "저장된 맵 데이터가 존재하지 않음.", SYS.LOG_TYPE.WARNING);
					if(lockStadium[1] == bool) return SYS.log(false, "중복된 값으로 접근됨.", SYS.LOG_TYPE.WARNING);
					lockStadium[1] = bool;
					NC.locked(bool, "맵 변경이 " + (bool ? "제한" : "허용") + "되었습니다.");
					SYS.log(true, "맵 변경이 " + (bool ? "제한" : "허용") + "됨.", SYS.LOG_TYPE.NOTICE);
					if(lockStadium[1] == true) room.setCustomStadium(maps[lockStadium[0]]);
					return true;
				}
				this.logonAdmin			= function(player){ 				//						최고 권한 로그인
					if(AMN.getAdmin(player) == 2) return false;
					if(PS.getPlayer(player).isSleep) PS.setSleep(player, false);
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 최고 권한 로그인을 시도함", SYS.LOG_TYPE.BELL);
					AMN.giveAdmin(player);
					return false;		//	채팅 창에서 명령어 입력 기록 지우기
				}
				this.swapGame			= function(player){					//	!r				|	게임 자동 시작/종료
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(!GM.getGameStats()) room.startGame();
					else if(GM.getGameStats() == 2) room.stopGame();
					return false;  //	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.unmutePlayer		= function(target, byPlayer){		//						채팅 허용
					if(!PS.getPlayer(target).isMute)		//	채금자가 아닐 경우 처리 중단
						return (byPlayer == undefined ? false : NC.caution(SYS.showPlayerInfo(target, "name") + "님의 채팅은 이미 허용돼 있습니다.", byPlayer));
					PS.setPlayer(target, "isMute", false);
					room.setPlayerAvatar(target);			//	등번호 초기화
					SYS.updateListIndex(target);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					NC.locked(false, "채팅이 허용되었습니다.", target);
					return SYS.log(true, 
						(byPlayer == undefined ? (SYS.showPlayerInfo(target) + "(이)의 금지된 채팅이 허용됨") : (SYS.showPlayerInfo(byPlayer) + "(이)가 " + SYS.showPlayerInfo(target) + "(이)의 금지된 채팅을 허용함.")), 
						SYS.LOG_TYPE.NOTICE);
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	공지 및 알림 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class Notification {														
			constructor() {
				this.ICON = Object.freeze({		//				제목 아이콘
					POSTIVE :	'○',	POSTIVE_BOLD :	'●', 
					NORMAL:		'□',	NORMAL_BOLD:	'■',
					NEGATIVE:	'△',	NEGATIVE_BOLD:	'▲',
				});
				this.getColor		= function(color){		//	글자 색상 지정
					switch(color){
						case 0:										color = "E81224"; break;
						case 1:										color = "0078D7"; break;
						case "um":									color = "6CB858"; break;	//	UM
						case "빨강": case "레드": case "red":		color = "FF0000"; break;	//	빨강
						case "주황": case "orange":					color = "FF5E00"; break;	//	주황
						case "살구": case "wheat":					color = "FFE7CC"; break;	//	살구
						case "노랑": case "옐로": case "yellow":	color = "FFE400"; break;	//	노랑
						case "초록": case "그린": case "green":		color = "8ED2AB"; break;	//	초록
						case "하늘": case "sky": 					color = "00D8FF"; break;	//	하늘
						case "파랑": case "블루": case "blue":		color = "0000FF"; break;	//	파랑
						case "보라": case "퍼플": case "purple":	color = "5F00FF"; break;	//	보라
						case "핑크": case "핑크": case "pink":		color = "FF86CF"; break;	//	핑크
						case "회색": case "그레이": case "gray":	color = "BDBDBD"; break;	//	회색
						case "검정": case "블랙": case "black":		color = "000000"; break;	//	검정
					}
					if(color) color = ("0x" + color);
					else color = "0xFFFFFF";
					return color;
				}
				this.getSound		= function(sound){		//	소리 크기 지정
					switch(sound){
						case 0: case "muted":	return 0;
						case 1: case "normal":	return 1;
						case 2: case "loud":	return 2;
						default:				return 1;
					}
				}
				this.getStyle		= function(style){		//	글자 굵기 지정
					switch(style){
						case 1: case "normal":								return "normal";		//	기본
						case 2: case "bold":								return "bold";			//	볼드체
						case 3: case "italic":								return "italic"; 		//	이탈릭
						case 4: case "small":								return "small";			//	작게
						case 5: case "small-bold":		case "smallBold":	return "small-bold"; 	//	작은 볼드체
						case 6: case "small-italic":	case "smallItalic":	return "small-italic";	//	작은 이탈릭
						default:											return "normal";
					}
				}
				this.alretMsg		= function(player){	//		금지어 감지 메시지
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					PS.setPlayer(player, "detector", PS.getPlayer(player).detector + 1);
					if(PS.getPlayer(player).detector >= CS.getMaxDetection()){ 
						PS.setPlayer(player, "detector", 0);
						return AMN.setKick(player, NC.ICON.NEGATIVE_BOLD + "금지어 누적 감지");
					}
					switch(CS.getDetectorLev()){
						case 0: case 1: return false;											//	처리 없음
						case 5:	AMN.mutePlayer(player);											//	5단계: 강제 퇴장+채팅 금지
						case 3: return AMN.setKick(player, NC.ICON.NEGATIVE + "금지어 감지");	//	3단계: 강제 퇴장
						case 4:	AMN.mutePlayer(player);											//	4단계: 경고 문구+채팅 금지
						case 2:																	//	2단계: 경고 문구
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
							return this.caution(msg[Math.floor(Math.random() * msg.length)], player);
					}
					return false;
				}
														//		알림 메시지
				this.announce	= (msg, target, color, style, sound, delay)	=> (setTimeout(() => room.sendAnnouncement(msg, target, this.getColor(color), this.getStyle(style), this.getSound(sound)), delay));
														//		유니버셜 메시지
				this.extMsg		= function(title, content, target, advCom, titleColor, contentColor, delay){												//	(확장)
						let titleText = (title == null ? content : (CS.hasSpace(title) ? this.ICON.POSTIVE + "알림" : title));
						this.announce(titleText
							+ (advCom ? ('(' + "이것을 찾으셨나요" + ': ' + advCom + ')') : ''), 
							target, titleColor, "small-bold", null, (delay > 0 ? delay : 0));
						if(title == null) return false;
						this.announce(content, target, contentColor, "small", "muted", (delay > 0 ? delay + 1 : 0));
						return false;
				}
				this.uniMsg		= (title, content, target, advCom, delay)	=> this.extMsg(title, content, target, advCom, "green", null, delay * 1000);	//		(기본)
																																			//			권한 없음
				this.acess		= (target, reason) => reason ? this.extMsg(this.ICON.NEGATIVE_BOLD + "권한 없음", reason, target, null, "gray", "gray") : this.extMsg(null, "권한 없음", target, null, "gray", "gray");
				this.caution	= (msg, target, advCom) => this.extMsg(this.ICON.NEGATIVE + "주의", msg, target, advCom, "orange", "gray");	//			주의
				this.help		= function(msg, exCom, target, advCom){																		//			도움말
					return this.uniMsg(this.ICON.NORMAL + "도움말", msg 
						+ SYS.newLine + exCom 
						+ SYS.newLine + "위와 같은 형식으로 보내면 됩니다.", 
						target, advCom);
				}
				this.info		= (msg, target, advCom)	=> this.extMsg(this.ICON.NORMAL + "상세정보", msg, target, advCom, "green");				//	상세 정보
				this.locked		= (isLock, msg, target, advCom) => this.extMsg((isLock ? this.ICON.NEGATIVE_BOLD + "잠금" : this.ICON.NEGATIVE + "해제"), msg, target, advCom, "yellow", "gray");	//	잠금 및 해제
				this.msgCommand	= (title, content, target, advCom) => this.uniMsg((this.ICON.NORMAL + title + " 명령어"), content, target, advCom);	//	명령어 목록
				this.notice		= (msg, target, advCom) => this.uniMsg(null, msg, target, advCom);													//	알림
				this.warning	= (msg, target, advCom) => this.extMsg(this.ICON.NEGATIVE_BOLD + "경고", msg, target, advCom, "red", "gray");		//	경고
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	채팅 시스템 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class ChatSystem{													
			constructor(){
				let detectorLevel	= 2;					//	금지어 필터링 엄격도
				let emotions		= [						//	이모티콘
					'🤔', 
					'😍', '🤣', '😎', '😐', '😰', 
					'🙄', '😴', '🥶', '😱'
				];
				let forbiddenWords	= [						//		금지어
					"ㄴㅇㅁ","ㄴㄱㅁ", "ㄴ.ㄱㅁ","ㄴ.ㅇㅁ","ㄴㄱ.ㅁ","ㄴㅇ.ㅁ",
					"니엄마","느금", "늑그앰","니애미","니애1미","니애2미", "니미", "니앰", "니애비", "애미없는", "애미없지", "애미없냐", "sldjaak", "smrma", "sldlao",
					"니@ㅐ미", "니@ㅐ비", "보지벌려",
					"애1미","애2미","애미뒤짐","애미디짐","애1미뒤짐","애1미디짐","애2미뒤짐","애2미디짐", "창녀", "창년", "업소녀", "doalenlwla", "ckdsu",
					"애미 뒤짐", "애미 디짐", "애미 뒤졌냐", "애미뒤졌네","애1미뒤졌네","애2미뒤졌네","애미뒤졌다","애1미뒤졌다","애2미뒤졌다",
					"애미 뒤졌네","애1미 뒤졌네","애2미 뒤졌네","애미 뒤졌다","애1미 뒤졌다","애2미 뒤졌다", "보지년",
					"애미있냐", "애미없냐", "애미있냐없냐",

					"ㅅㅂ", "ㅆㅂ", "ㅆㅃ", "tq", "Tq",
					"ㅂㅅ", "ㅄ", "qt", "ㅂ ㅅ", "ㅂ.ㅅ",
					"장애인아", "wkddodlsdk",
					"ㄲㅈ", "Rw", "꺼져",
					"ㅈㄹ", "ㄷㅊ", "ㅈㄴ", "ㅈㄲ", "🖕🏻", "🖕", "🖕🏽", "🖕🏾", "🖕🏿",
					"새끼", "새꺄", "새낀", "toRl","시발", "^^ㅣ발", "시1발", "시2발", "시ㅡ발", "tlqkf",
					"씨발", "씨바", "씨-발","씨ㅡ발","씨이발","씨이이발","씨이이이발","씨1발","씨2발", "Tlqkf", "Tlqk",
					"ㅆ!발", "ㅆ!발련", 
					"병신","병1신","병2신", "qudtls","븅신","븅1신","븅2신", "qbdtls", "뷰웅신련", "뷍신",
					"지랄","지1랄","지2랄", "wlfkf", "wf", "wlfkd",
					"좆", "whw","존나","존1나","존2나", "whssk", "젖밥쉑", "ㅈ밥", "wjwqkqtnpr", "wqkq",
					"씹", "tlq",
					"개새1끼", "개새2끼", "개새1꺄", "개새2꺄","개새1끼야", "개새2끼야", "개새1끼가", "개새2끼가",
					"닥쳐", "닥치"
				];
				let isFreeze		= false;				//	채팅 얼리기/녹이기
				let maxDetection	= 0;					//	금지어 최대 감지량
				this.onPlayerChat	= function(player, msg){		//						채팅 시스템
					let spacePos = msg.search(" ");
					let command = (msg.substr(0, spacePos !== -1 ? spacePos : msg.length)).toLowerCase();		//	대문자이면 소문자로 치환
					PS.updateTime(player.id);						//	마지막 활동 시간 저장
					setTimeout(() => {								//	게임 미진행 중, 장기 무응답 플레이어 판정
						for(let i = 1; i <= PS.cntPlayers(); i++)
							GM.checkAfkPlayer(PS.getPublicId(i), TM.getTime());
					}, GM.getAfkLimitTime() * 1000);
																	//	명령어 처리
					if(internalCommands.hasOwnProperty(command)) return GM.runCommand(internalCommands, command, msg, player);
					if(standardCommands.hasOwnProperty(command)) return GM.runCommand(standardCommands, command, msg, player);
					if(customCommands.hasOwnProperty(command)) return GM.runCommand(customCommands, command, msg, player);
																	//	전체 채팅 금지 || 채금자
					if((CS.isFreeze(player.id, msg))||(AMN.isMute(player.id, msg))) return false;
					switch(CS.getChatMode(player.id)){
						//	일반 채팅(70자 내외 제한)
						case 0: return CS.sendAllChat(player.id, msg.substr(0, 70));
						//	팀별 채팅(70자 내외 제한)
						case 1: return CS.sendTeamChat(player.team, player.id, msg.substr(0, 70));
					}
				}
				this.isFreeze 			= function(player, msg){	//						채팅 얼림 여부
					if(!PS.isValid(player) || player == 0) return isFreeze;			//	서버에서 보낸 요청일 경우
					if(AMN.getAdmin(player)||(isFreeze == false)) return false;		//	권한이 있거나 얼리지 않았을 경우
					let blockMsg = [
						"관리자가 채팅창을 얼렸습니다.",
						"채팅창이 얼려있습니다.",
						"관리자가 채팅창을 녹여야 합니다.",
						"관리자 이외의 모든 플레이어의 채팅이 금지되었습니다.",
						"채팅창이 녹아야 합니다."
					];
					if(!CS.sendEmojiChat(player, msg)) NC.acess(player, blockMsg[Math.floor(Math.random() * blockMsg.length)]);
					return true;
				}
				this.hasSpace			= function(str){			//						공백 확인
					for(let i = 0; i < str.length; i++)
						if((str.substr(i, 1)).search(" ") == -1) return false;	//	공백 외 다른 문자가 들어있으면 거짓으로 반환
					return true;
				}
				this.getChatMode		= (player)	=> PS.getPlayer(player).chatmode;												//	채팅 모드 구하기
				this.getDetectorLev		= ()		=> detectorLevel;																//	금지어 필터링 엄격도
				this.getEmotion			= (index)	=> emotions[((index < emotions.length)&&(index >= 0) ? index : 0)];				//	감정 구하기
				this.getForbiddenWord	= (index)	=> forbiddenWords[((index < forbiddenWords.length)&&(index >= 0) ? index : 0)];	//	금지어 구하기
				this.getMaxDetection	= ()		=> maxDetection >= 3 ? maxDetection : undefined;								//	금지어 최대 감지량
				this.setAllChat		= function(player, msg, type){		//	!a 			| 	전체 채팅 명령어
					if(type == 1){
						return NC.help("모든 플레이어에게 '나는 경기도 안양에 살고 있다'라는 말을 공공연히 밝히고 싶으면",
						"!a 나는 경기도 안양에 살고 있다", player, "!chathelp");
					}
					return CS.sendAllChat(player, msg.substr(0, 50));
				}
				this.setChatMode	= function(player, msg){			//					채팅 모드 설정
					switch(msg){
						case 0: case 'a': case "전체": case "all":	
							PS.setPlayer(player, "chatmode", 0);
							return NC.notice("채팅 기본 모드가 전체 채팅으로 변경되었습니다.", player);
						case 1: case 't': case "팀": case"team":
							PS.setPlayer(player, "chatmode", 1);
							return NC.notice("채팅 기본 모드가 팀 채팅으로 변경되었습니다.", player);
						default: return NC.caution("부적절한 값입니다.", player, "?chatmode");
					}
				}
				this.setDetectorLev	= function(lev){					//					금지어 필터링 엄격도 지정
					if(detectorLevel == lev) return false;
					if((lev < 0) || (lev > 5)) return false;
					NC.notice("금지어 필터링 엄격도가 " + lev + "단계로 변경되었습니다.");
					SYS.log(true, "금지어 필터링 엄격도 변경" + ': ' + detectorLevel + '→' + lev, SYS.LOG_TYPE.NOTICE);
					detectorLevel = lev;
					return true;
				}
				this.setDisruptMode	= function(player, msg){			//					채팅 수신 설정
					switch(msg){
						case 0: case "금지": case "off": case "오프":
							PS.setPlayer(player, "isDisrupt", false);
							return NC.notice("채팅 수신이 금지되었습니다. 따라서 귓속말 기능을 사용할 수 없습니다.", player);
						case 1: case "허용": case "on": case "온":
							PS.setPlayer(player, "isDisrupt", true);
							return NC.notice("채팅 수신이 허용되었습니다.", player);
						default: return NC.caution("부적절한 값입니다.", player, "?disrupt");
					}
				}
				this.setMaxDetection	= function(limit){					//					금지어 최대 감지량 지정
					if((limit >= 3) && (maxDetection != limit)){ 
						maxDetection = limit;
						SYS.log(true, "금지어 최대 감지량 변경: " + limit + "회", SYS.LOG_TYPE.NOTICE);
					}
					else SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.LOG_TYPE.WARNING);
				}
				this.setTeamChat	= function(player, msg, type){		//	!t 			|	팀 채팅 명령어
					if(type == 1){
						return NC.help("상대팀이 못 엿듣게 살포시 같은 팀원에게 '민트초코 최고야'라고 전하려면",
						"!t 민트초코 최고야", player, "!chathelp");
					}
					return CS.sendTeamChat(PS.getPlayer(player).team, player, msg.substr(0, 50));
				}
				this.setWhisperChat	= function(player, msg, type){		//	!e #ID		|	귓속말 명령어
					if(type == 1){
						return NC.help("공용 ID가 3인 플레이어에게 '안녕?'이라는 말을 조용히 전달하고 싶으면",
						"!e #3 안녕?", player, "!chathelp");
					}
					if(!PS.getPlayer(player).isDisrupt) return NC.caution("귓속말을 사용할 수 없습니다.", player, "?disrupt");
					let target = parseInt(GM.checkPublicId(msg.split(" ")[0], player));
					if(isNaN(target)) return false;
					if(target == player) return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player);
					let sPos = msg.indexOf(' ');
					let chatMsg = msg.substr(sPos + 1, 50)
					if(target == 0){
						let mark = (CS.filterWords(msg) ? PS.getTeamTag(PS.getPlayer(player).team, true) : PS.getGradeTag(player));
						CS.sendMsg("외부" + mark + SYS.showPlayerInfo(player, "local") + '→' + '🌐' + "(0)" + "서버 매니저" + ": " + chatMsg, player);
						SYS.log(false, mark + SYS.showPlayerInfo(player) + ": " +  chatMsg, SYS.LOG_TYPE.BINDING);
						return false;	//	채팅 창에서 명령어 입력 기록 숨기기
					}
					if(!PS.getPlayer(target).isDisrupt) return NC.caution(SYS.showPlayerInfo(target, "name") + "님은 채팅 수신을 거부한 상태입니다.", player);
					CS.sendWhisperChat(target, player, chatMsg);
					return CS.filterWords(msg) ? NC.alretMsg(player) : false;
				}
				this.filterWords		= function(msg){						//			금지어 필터링
					if(detectorLevel == 0) return false;
					for(let i = 0; i < forbiddenWords.length; i++){
						if(msg.includes(CS.getForbiddenWord(i))) return true;
					}
				}
				this.freezeChat			= function(bool){						//			채팅 얼리기/녹이기
					NC.locked(bool, "채팅창이 " + (bool ? "얼었습니다." : "녹았습니다."));
					isFreeze = !isFreeze;
					return isFreeze;
				}
				this.sendAllChat		= function(player, msg){				//			전체 채팅 전송
					let filter = CS.filterWords(msg);	//	금지어 필터링
					let title = "전체" + (filter ? PS.getTeamTag(PS.getPlayer(player).team, true) : PS.getGradeTag(player));
					let context = (SYS.showPlayerInfo(player, "local") + ": ");
					if(filter){							//	금지어 필터링
						switch(detectorLevel){
							case 4: case 5:	context += "관리자에 의해 삭제된 메시지입니다.";	break;
							default:		context += msg;
						}
					}
					else context += msg;
					if((CS.isFreeze(player, msg))||(AMN.isMute(player, msg))) return false;		//	전체 채팅 금지 || 채금자
					for(let i = 1; i <= PS.cntPlayers(); i++){									//	플레이어를 제외한 나머지 인원 찾기
						if(PS.getLocalId(player) != i){			//	채팅 모드에 따라 도움말 추가
							if(CS.getChatMode(PS.getPublicId(i)) == 0) CS.sendMsg(title + context, PS.getPublicId(i));
							else CS.sendMsg(title + context + " (전체 채팅: !a 답할 내용)", PS.getPublicId(i));
						}
					}
					CS.sendMsg(title + context, player);		//	입력자 출력
					SYS.log(true, title + SYS.showPlayerInfo(player) + ": " + msg);
					if(filter) NC.alretMsg(player);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.sendEmojiChat		= function(player, msg){				//			감정 채팅 전송
					let num = parseInt(msg);
					if(num >= 0 && num < 10){ 
						room.setPlayerAvatar(player, CS.getEmotion(num));
						return true;
					}
					let listMsg = '';
					for(let i = 0; i < 10; i++){
						listMsg += (CS.getEmotion(i) + i);
						if(i < 9) listMsg += " | ";
					}
					return NC.locked(true, "아래에 나열된 숫자로 감정만 전달할 수 있습니다" 
					+ SYS.newLine + listMsg, player);
				}
																				//			일반 메시지 출력
				this.sendMsg			= (msg, target)	=> NOPLAYER ? NC.announce(msg, target, null, "normal") : room.sendChat(msg, target);
				this.sendTeamChat		= function(teamId, player, msg){		//				팀 채팅 전송
					let teamTag;
					switch(teamId){
						case TEAM.SPECTATOR:	teamTag = "관중"; break;
						case TEAM.RED:	 		teamTag = "레드"; break;
						case TEAM.BLUE:			teamTag = "블루"; break;
						default: return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);	//	팀 정보가 유효하지 않으면 오류 처리
					}
					let filter = (player == 0 ? false : CS.filterWords(msg));
					let title = teamTag + (player == 0 ? '🌐' : PS.getTeamTag(PS.getPlayer(player).team, filter));
					let context = ((player == 0 ? ("(0)" + "서버 매니저") : SYS.showPlayerInfo(player, "local")) + ": ");
					if(filter){						//	금지어 필터링
						switch(detectorLevel){
							case 4: case 5:	context += "관리자에 의해 삭제된 메시지입니다.";	break;
							default:			context += msg;
						}
					}
					else context += msg;
					if((CS.isFreeze(player, msg))||(AMN.isMute(player, msg))) return false;	//	전체 채팅 금지 || 채금자
					for(let i = 1; i <= PS.cntPlayers(); i++){								//	플레이어를 제외한 나머지 팀원 찾기
						if((PS.getLocalId(player) != i)&&(PS.getPlayer(PS.getPublicId(i)).team == teamId)){	//	채팅 모드에 따라 도움말 추가
							if(player == 0) CS.sendMsg(title + context + " (귓속말 답장: !e 0 답할 내용)", PS.getPublicId(i));
							else if(CS.getChatMode(PS.getPublicId(i)) == 1) CS.sendMsg(title + context, PS.getPublicId(i));
							else CS.sendMsg(title + context + " (팀 채팅: !t 답할 내용)", PS.getPublicId(i));
						}
					}
					//	로그 출력
					if(player == 0) return false;	//	서버에서 보낸 응답인 경우 여기서 종료 처리
					else{ 
						CS.sendMsg(title + context, player);	//	입력자 출력
						SYS.log(true, title + SYS.showPlayerInfo(player) + ": " + msg);
					}
					if(filter) NC.alretMsg(player);
					return false;
				}
				this.sendWhisperChat	= function(toPlayer, fromPlayer, msg){	//			귓속말 채팅 전송
					if(!PS.isValid(toPlayer)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_LID);
					if((fromPlayer == 0)&&(toPlayer > 0))		//	콘솔창에서 게임으로 전달
						return CS.sendMsg("개인" + '🌐' + "(0)" + "서버 매니저" + ' → ' + PS.getGradeTag(toPlayer) + SYS.showPlayerInfo(toPlayer, "local") + ": " + msg + " (귓속말 답장: !e 0 답할 내용)", toPlayer);
					let filter = CS.filterWords(msg);			//	금지어 필터링
					let title = "개인" + (filter ? PS.getTeamTag(fromPlayer, true) : PS.getGradeTag(fromPlayer));
					let context = (SYS.showPlayerInfo(fromPlayer, "local") + '→' + PS.getGradeTag(toPlayer) + SYS.showPlayerInfo(toPlayer, "local") + ": ");
					if(filter){									//	금지어 필터링
						switch(detectorLevel){
							case 4: case 5:	context += "관리자에 의해 삭제된 메시지입니다.";	break;
							default:		context += msg;
						}
					}
					else context += msg;
					if((CS.isFreeze(fromPlayer, msg))||(AMN.isMute(fromPlayer, msg))) return false;			//	전체 채팅 금지 || 채금자
					CS.sendMsg(title + context + " (답장:  !e " + PS.getLocalId(fromPlayer) + " 답할 내용)", toPlayer);
					CS.sendMsg(title + context, fromPlayer);																								//	입력자 출력
					SYS.log(true, title + SYS.showPlayerInfo(fromPlayer) + '→ ' + PS.getGradeTag(toPlayer) + SYS.showPlayerInfo(toPlayer) + ": " + msg);	//	로그 출력
					if(filter) NC.alretMsg(fromPlayer);
					return false;
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	명령어 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class Commands{														
			constructor(){
				this.setTeamColors	= function(player, msg, type){			//					!uniform		|	팀 유니폼
					if(type == 1){
						return NC.help("텍스트 색을 FFFFFF, 배경색을 FFCC00 및 AABBCC이고, 각도가 30°인 레드팀 유니폼으로 변경하고 싶으면",
						"!uniform red 30 FFFFFF FFCC00 AABBCC", player);
					}
					let comIndex = new Array();
					for(let i = 0; i < 6; i++){
						let node = msg.split(" ")[i];
						if(node) comIndex.push(node);
					}
					//	팀 ID 검사
					switch(comIndex[0]){
						case "red":		case 'r':	case "레드":	case "레":		comIndex[0] = TEAM.RED;		break;
						case "blue":	case 'b':	case "블루":	case "블":		comIndex[0] = TEAM.BLUE;	break;
						default: return NC.caution("유니폼을 적용할 팀을 입력하세요.", player, "?uniform");
					}
					//	각도 범위 검사
					comIndex[1] = parseInt(comIndex[1]);
					if((comIndex[1] < 0)||(comIndex[1] > 180)) return NC.caution("각도는 0°~180° 사이의 값으로 입력해야 합니다.", player, "?uniform");
					else if(!comIndex[1]) return NC.caution("각도를 지정하지 않았습니다.", player, "?uniform");
					//	색상 코드 검사
					if(comIndex.length < 3) return NC.caution("등번호 색상을 지정하지 않았습니다.", player, "?uniform");
					if(comIndex.length < 4) return NC.caution("배경 색상을 지정하지 않았습니다.", player, "?uniform");
					let hexStr = /[0123456789abcdef]/gi;
					for(let i = 2; i < comIndex.length; i++){
						if(comIndex[i].length == 6){								//	16진수
							if(hexStr.test(comIndex[i]) == false) return NC.caution("색상 코드가 올바르지 않습니다.", player, "?uniform");
							comIndex[i] = ("0x" + comIndex[i]);
						}
						else comIndex[i] = NC.getColor(comIndex[i]);				//	문자열
					}
					switch(comIndex.length){
						case 4: PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3]]);								break;
						case 5: PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3], comIndex[4]]);				break;
						case 6:	PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3], comIndex[4], comIndex[5]]);	break;
						default: return NC.caution("잘못된 명령어 입력입니다.", player, "?uniform");
					}
					NC.uniMsg(NC.ICON.NORMAL_BOLD + "유니폼 변경",
						SYS.showPlayerInfo(player, "name") + "님이 " + GM.getTeamName(comIndex[0]) + "의 유니폼을 변경했습니다." + SYS.newLine + msg,
						null, "!uniform");
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + GM.getTeamName(comIndex[0]) + "의 유니폼을 변경함 " + '<' + msg + '>', SYS.LOG_TYPE.NOTICE);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.alertSpam		= function(player){										//	!도				|	도배방지문자
					if(!AMN.getAdmin(player)) return CM.helpCom(player);		//	도움말
					NC.announce("〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰"
					+ SYS.newLine + "도배 방지" + SYS.newLine + "분란 방지" + SYS.newLine + "정숙 유지" + SYS.newLine + "질서 유지" + SYS.newLine + "도배 방지"
					+ SYS.newLine + "〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰", null, "orange", "bold", "loud");
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 도배 방지 문자를 출력함.", SYS.LOG_TYPE.NOTICE);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comChatMode		= function(player, msg, type){						//	!chatmode		|	채팅 모드 설정
					if(type == 1){
						return NC.help("상대팀이 못 듣게 같은 팀원에게 '민트초코는 진리야'라고 계속해서 설교하려면",
						"!chatmode team", player);
					}
					CS.setChatMode(player, msg);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
																							//	!clearbans		|	영구 퇴장 명단 초기화 명령어
				this.comClearBans		= (player) => AMN.getAdmin(player) ? AMN.clearBans(player) : NC.acess(player);
				this.comClearTeamColors	= function(player, index, type){					//	!clear_uniform	|	유니폼 초기화
					if(type == 1){
						return NC.help("레드팀의 유니폼을 초기화하려면",
						"!clear_uniform red", player);
					}
					let team;
					switch(index){
						case "red":		case 'r':	case "레드":	case "레":	team = TEAM.RED;	break;
						case "blue":	case 'b':	case "블루":	case "블":	team = TEAM.BLUE;	break;
						default: return NC.caution("유니폼을 되돌릴 팀을 입력하세요.", player);
					}
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + GM.getTeamName(team) + "의 유니폼을 초기화함", SYS.LOG_TYPE.NOTICE);
					PS.clearTeamColors(team);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comDisruptMode		= function(player, msg, type){						//	!disrupt		|	수신 모드 설정
					if(type == 1){
						return NC.help("상대방의 채팅 수신을 거부하려면",
						"!disrupt on", player);
					}
					CS.setDisruptMode(player, msg);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comFreezeChat		= function(player){									//	!freeze			|	채팅 얼리기
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(CS.isFreeze() == true) return NC.caution("채팅창이 이미 얼려있습니다.", player, "!unfreeze");
					if(PS.cntPlayers() < 3) return NC.caution("부적절한 조치입니다.", player,"!mute #ID");
					CS.freezeChat(true);
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 채팅창을 얼림.", SYS.LOG_TYPE.NOTICE);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comKick			= function(player, msg, type){						//	!kick #ID		|	강제 퇴장
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){ 
						return NC.help("공용 ID가 42인 플레이어를 '민트초코를 지지함`이라는 사유로 퇴장 시키려면", 
						"!kick #42 민트초코를 지지함", player);
					}
					let index = GM.checkPublicId(msg.split(" ")[0], player);
					let sPos = msg.indexOf(' ');
					let reason = msg.substr(sPos + 1, 50);
					if(!index) return false;
					if(AMN.getAdmin(index) > AMN.getAdmin(player)) return NC.acess(player, "권한이 낮아 처리할 수 없습니다.");	//	보조 권한 → 최고 권한 퇴장 불가
					AMN.setKick(index, (reason ? (SYS.showPlayerInfo(player, "public") + ': ' + reason) : ("처리자" + ': ' + SYS.showPlayerInfo(player, "public"))));
					return false;	//	채팅 창에서 명령어 입력 기록 지우기
				}
				this.comMute			= function(player, msg, type){						//	!mute #ID		|	채팅 금지
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){ 
						return NC.help("공용 ID가 42인 플레이어의 채팅을 금지하려면", 
						"!mute #42", player);
					}
					if(PS.cntPlayers() < 2) return NC.caution("채팅을 금지할 수 있는 플레이어가 없습니다.", player);
					let index = GM.checkPublicId(msg, player);
					if(!index) return false;
					if(index == player) return NC.caution("자기 자신의 채팅을 금지할 수 없습니다.", player);
					return (PS.getPlayer(index).isMute ? NC.caution(SYS.showPlayerInfo(index, "name") + "님의 채팅은 이미 금지돼 있습니다.", player, ("!unmute " + '#' + index)) : AMN.mutePlayer(index, player));
				}
				this.comPinHost			= function(player){									//	!lock_host		|	방장 이동 설정
					if(NOPLAYER == true) return false;
					if(!AMN.getAdmin(player)) return NC.acess(player);
					let bool = AMN.isPinHost() ? true : false;
					AMN.setPinHost(!bool);
					if(!bool) PS.setTeam(0, TEAM.SPECTATOR);
					NC.locked(bool, "호스트 이동이 " + (bool ? "허용" : "금지") + "되었습니다.", player);
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 방장 팀 이동을 " + (bool ? "허용" : "금지") + "함.", SYS.LOG_TYPE.NOTICE);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comRecording		= function(player){									//	!rec			|	녹화 시작/종료
					if(AMN.getAdmin(player) != 1) return NC.acess(player);
					GM.getStateRecording() ? GM.stopRecording() : GM.startRecording();
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comSleep			= function(player){									//	!afk			|	장기 무응답 플레이어 설정
					PS.isValid(player) ? PS.setSleep(player, !PS.getPlayer(player).isSleep) : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comTeamsLock		= function(player, msg, type){						//	!lock_join		|	팀 이동 금지/허용
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){
						return NC.help("팀 자율 이동을 막으려면",
						"!lock_join on", player);
					}
					switch(msg){
						case "on": case "온": case "금지": case "ㅐㅜ": case "dhs": case "rmawl":
							return AMN.setTeamsLock(true, player);
						case "off": case "오프": case "허용": case "ㅐㄹㄹ": case "dhvm": case "gjdyd":
							return AMN.setTeamsLock(false, player);
						default: return AMN.setTeamsLock((AMN.isLockJoin() ? false : true), player);
					}
				}
				this.comUnfreezeChat	= function(player){									//	!unfreeze		|	채팅 녹이기
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(!CS.isFreeze()) return NC.caution("채팅창이 이미 녹아있습니다.", player, "!unmute #ID");
					CS.freezeChat(false);
					SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 채팅창을 녹임.", SYS.LOG_TYPE.NOTICE);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.comUnmute			= function(player, msg, type){						//	!unmute #ID		|	채팅 허용
					if(!AMN.getAdmin(player)) return NC.acess(player);
					if(type == 1){ 
						return NC.help("공용 ID가 12인 채금자의 채팅을 허용하려면", 
						"!unmute #12", player);
					}
					if(msg == "all"){
						for(let i = 1; i < PS.cntPlayers("public"); i++){
							if(PS.getPlayer(i).isMute) AMN.unmutePlayer(i, player);
						}
						return NC.locked(false, "채팅 금지 명단이 초기화 되었습니다.");
					}
					let index = GM.checkPublicId(msg, player);
					if(!index) return false;
					return AMN.unmutePlayer(index, player) ? index == player ? false : NC.locked(false, SYS.showPlayerInfo(index, "name") + "님의 채팅이 허용되었습니다.") : NC.caution(SYS.showPlayerInfo(index, "name") + "님의 채팅은 이미 허용돼 있습니다.", player, "!mute " + '\#' + index);
				}
				this.helpBot		= function(player){										//	!bothelp		|	서버 도움말
					let str = "!about(정보)";
					if(AMN.getAdmin(player)) str += " | !kick #ID(강제 퇴장) | !r(시작/종료) | !rr(재시작) | !show_pw(비번 표시) | !set_pw(비번 설정) | !clear_pw(비번 해제) | !clear_bans(영구 퇴장 초기화)";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("서버", str, player);
				}
				this.helpChat		= function(player){										//	!chathelp		|	채팅 도움말
					let str = "!e #ID(개인) | !t(팀별) | !a(전체) | !chatmode(기본 채팅 모드) | !disrupt on/off(채팅 수신)";
					if(AMN.getAdmin(player)) str += " | !freeze/!unfreeze(채팅 녹이기/얼리기) | !mute #ID(채팅 금지) | !unmute #ID(채팅 허용) | !도(도배 방지 문자)";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("채팅", str, player);
				}
				this.helpCom		= function(player){ 									//	!help			|	명령어 도움말
					let str = "!bothelp(서버) | !chathelp(채팅) | !joinhelp(참가) | !maphelp(맵) | !rankhelp(랭킹) | !scorehelp(점수)";
					if(AMN.getAdmin(player)) str += "";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("일반", str + " | !mischelp(기타)", player);
				}
				this.helpJoin		= function(player){ 									//	!joinhelp		|  	참가 도움말
					let str = "!join(자동 참가) | !afk(잠수)";
					if(AMN.getAdmin(player)) str += " | !lock_join(투입 제한)";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("투입", str, player);
				}
				this.helpMap		= function(player){										//	!maphelp		|	맵 도움말
					let str = "/checksum(정보) | /store(저장) | !maplist(목록)";
					if(AMN.getAdmin(player)) str += " | !load ID(불러오기)";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("맵", str, player);
				}
				this.helpMisc		= function(player){										//	!mischelp		|	기타 도움말
					let str = "!avatar(등번호 변경) | !uniform(유니폼 변경) | !clear_avatar(등번호 초기화) | !clear_uniform(유니폼 초기화)";
					if(AMN.getAdmin(player)) str += "";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("기타", str, player);
				}
				this.helpRank		= function(player){	 									//	!rankhelp		| 	랭크 도움말
					let str = "!stats #ID(전적) | !ranking n(순위/n등 랭킹)";
					if(AMN.getAdmin(player)) str += " | !score(점수 변경) | !time(시간 변경)";	//	관리자에게만 출력할 히든 명령어
					return NC.msgCommand("랭크", str, player);
				}
				this.helpScore		= function(player){										//	!scoreHelp		|	점수 도움말
					return NC.msgCommand("점수", 
						"득: " + SC.SCORE_TYPE.GOAL	+ ' | ' + "실: " + SC.SCORE_TYPE.OWNGOAL	+ ' | '
						+ "승: " + SC.SCORE_TYPE.WIN	+ ' | ' + "패: " + SC.SCORE_TYPE.LOST	+ ' | '
						+ "도움 " + SC.SCORE_TYPE.ASSIST,
					player, "!ranking");
				}
				this.infoMaps		= function(player, msg){								//	!maplist		|	맵 정보
					GM.updateStadiumsData();
					let list = '';
					let size = maps.length / 5 > parseInt(maps.length / 5) ? maps.length / 5 + 1 : maps.length / 5;
					let index = parseInt((msg > 0 && msg <= size) ? msg : 1);
					if(maps.length > 0){
						for(let i = (index - 1) * 5; i < index * 5; i++){
							if(nameOfMaps[i]) list += (('[' + SYS.setLine(i + 1, 2) + "] | " + nameOfMaps[i]) + ((i == index * 5) ? ' ' : SYS.newLine));
						}
					}
					else list = "비어 있음";
					return NC.uniMsg(NC.ICON.NORMAL + "맵 정렬 목록" + '(' + index + '/' + parseInt(size) + ')', list, player, (AMN.getAdmin(player) ? "!load ID" : "!maphelp"));
				}
				this.infoRanking	= function(player, index, type){						//	!ranking		|	랭킹 정보
					if(type == 1){
						return NC.uniMsg(NC.ICON.NORMAL + "랭킹 측정 방식", 
						"모든 전적의 총점수를 계산하여 순위를 매깁니다."
						+ SYS.newLine + "여기서 동점자가 나올 경우, 공용 ID의 오름차순으로 순위를 결정합니다.",
						player, "!scorehelp")
					}
					index = parseInt(index);
					NC.info("플레이어 순위", player, "!stats #ID")
					if((index > 0) && (index <= SC.getRankList().length)){			//	n등 랭킹 확인
						for(let i = 1; i < PS.cntPlayers("public"); i++){
							if(SC.getRankList()[index - 1] == i) return SC.sendRanking(i, player);
						}
					}
					return SC.sendRanking(player, player);				//	플레이어 랭킹 확인
				}
				this.infoRoom		= function(player){ 									//	!about			| 	서버 정보
					return NC.info(DESCRIPTION
					+ SYS.newLine + "릴리스 날짜: 2021.03.23"		//	릴리스 및 업데이트 날짜
					+ ' | ' + SYS.showInfo(),						//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
					null, "!help");
				}
				this.infoStats		= function(player, msg, type){							//	!stats 			|	점수 정보
					if(type == 1) return CM.helpScore(player);								//	?stats == !helpscore
					let index = GM.checkPublicId(msg, player);
					if(!index) index = player;
					//	닉네임, ID, 전적 출력
					return NC.info("ID: " + PS.getLocalId(index) + '(' + '#' + index + ')'	
					+ '|' + "닉네임: " + SYS.showPlayerInfo(index, "name")
					+ SYS.newLine + SC.showPlayerStats(index),
					player, "!ranking");
				}
				this.joinGame		= function(player, msg, type){						//		!join			|	투입 명령어
					if(AMN.isLockJoin(player) && !AMN.getAdmin(player)) return NC.acess(player, "팀 자율 이동이 금지돼 있어 사용할 수 없습니다.");
					if(type == 1) return NC.help("레드팀으로 참가하려면", "!join red", player);
					let index = player;
					if(AMN.getAdmin(player)){
						let target = msg.split(" ");
						if(target[0] == "lock" || target[0] == "락") return CM.comTeamsLock(player, target[1], type);
						if(target[1]) index = GM.checkPublicId(target[1], player);
					}
					switch(msg.split(" ")[0]){
						case TEAM.SPECTATOR:	case "spectator": case "spect": case "spec": case "spct": case 's': case "스펙": case "관중": case "관": case "스":
							return CM.joinPlayer(index, TEAM.SPECTATOR, player);
						case TEAM.RED:			case "red": case 'r': case "레드": case "레":
							return CM.joinPlayer(index, TEAM.RED, player);
						case TEAM.BLUE:			case "blue": case 'b': case "블루": case "블":
							return CM.joinPlayer(index, TEAM.BLUE, player);
						default: 
							if(PS.cntPlayers(TEAM.RED) <= PS.cntPlayers(TEAM.BLUE))	return CM.joinPlayer(player, TEAM.RED, player);
							return CM.joinPlayer(index, TEAM.BLUE, player);
					}
				}
				this.joinPlayer		= function(player, team, byPlayer){					//							플레이어 투입
					if(AMN.isLockJoin() && !byPlayer) return NC.acess(player, "팀 자율 이동이 금지되었습니다.");		//	팀 이동 금지 처리
					if(PS.getPlayer(player).team == team) return NC.caution("중복된 명령어입니다.", (byPlayer ? byPlayer : player));
					if(PS.getPlayer(player).isSleep) return NC.caution("게임 참여 의사가 없어 플레이할 수 없습니다. ", (byPlayer ? byPlayer : player), "!afk");
					PS.setTeam(player, team);
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				this.loadMap		= function(player, msg){								//	!load n			|	맵 불러오기
					if(!AMN.getAdmin(player)) return NC.acess(player);
					let index = (parseInt(msg) - 1);
					if((index >= 0) && (index < maps.length)){
						if(AMN.isLockStadium() && (AMN.getRestrictedStadium() != index)) return NC.acess(player, "맵이 고정되어 있어 불러올 수 없습니다.");
						room.stopGame();
						AMN.setRestrictedStadium(index)
						if(maps[index] == undefined) return NC.caution("맵 데이터를 불러올 수 없습니다.", player);
						room.setCustomStadium(maps[index]);
						SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 " + index + "번 맵으로 교체함", SYS.LOG_TYPE.NOTICE);
					}
					else NC.caution("올바르지 않은 ID입니다.", player, "!maplist");
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
				//	------------이스터에그------------------
				this.dka				= function(player){					//					!대깨알			|	이스터에그
					NC.announce("전체" + CS.getEmotion(3) + "AlphaGo" + CS.getEmotion(3) + ": 대가리 깨져도 알파고", player, null, (Math.floor(Math.random() * 6) + 1), "loud", (Math.floor(Math.random() * 30) * 100));
					return false;	//	채팅 창에서 명령어 입력 기록 숨기기
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	플레이어 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class Player{														
			constructor(){
				let addressList 		= new Array();			//	플레이어 공용 주소
				let gradeTag			= [						//	최고 권한, 보조 권한, 일반, 블랙리스트
					"🚫", "🟡", "🟢", "⚪", "🔘",
				];
				let networkList 		= new Array();			//	플레이어 공용 네트워크
				let playerList 			= new Array();			//	플레이어 데이터베이스
				let teamTag				= [						//	관중, 레드, 블루
					"⚪", "🔴", "🔵"
				];
				this.onPlayerActivity	= function(player){				//						플레이어 동작 응답 체크
					PS.updateTime(player.id);		//	마지막 활동 시간 저장
				}
				this.onPlayerTeamChange	= function(player, byPlayer){	//						팀 교체
					if((AMN.isPinHost() == true)&&(room.getPlayer(0).team != 0)) PS.setTeam(0, TEAM.SPECTATOR);
					if(player.id == 0) return false;
																	//	장기 대기열 플레이어일 경우 관중석으로 이동
					if((PS.getPlayer(player.id).isSleep == true)&&(player.team != 0)) PS.setTeam(player.id, 0);
					SYS.clearListIndex(player.id);
					PS.updateTime(player.id);						//	투입 시간 저장
					PS.setPlayer(player.id, "team", player.team);
					SYS.addListIndex(player.id);
				}
				this.onPlayerInactivity	= function(player){				//						플레이어 동작 무응답 체크
					PS.updateTime(player.id);		//	마지막 활동 시간 저장
					AMN.setKick(player.id, NC.ICON.NEGATIVE + "비활동 플레이어");		//	버그
				}
				this.initPlayerList			= function(data){			//						플레이어 데이터베이스 초기화
					playerList[data.id] = ({ 
						"name":	 data.name,	"team": TEAM.SPECTATOR,	"id": data.id,
						"admin": false,		"sub_admin": false,		"time": TM.getTime(),	"stats": new Array(),
						"chatmode":	0,		"detector": 0,			"isDisrupt": true,		"isMute": false,			"isSleep": false,
						"hasKicked": false
					});
					SYS.addListIndex(data.id);		//	플레이어 인덱스 추가
				}
																							//	유효 플레이어 확인
				this.isValid			= index => ((index < PS.cntPlayers("public")) && index > 0) ? true : false;
																							//	플레이어 공용 주소 가져오기
				this.getAddress			= index	=> addressList[index] ? addressList[index] : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_CONN);
				this.getGravityX 		= index => PS.getPlayerDiscProp(index).xgravity;	//	플레이어 X 중력 구하기
				this.getGravityY		= index	=> PS.getPlayerDiscProp(index).ygravity;	//	플레이어 Y 중력 구하기
				this.getBcoeff			= index	=> PS.getPlayerDiscProp(index).bCoeff;		//	플레이어 바운스 구하기
				this.getDamping			= index	=> PS.getPlayerDiscProp(index).dapming;		//	플레이어 제동 구하기
				this.getGradeTag		= function(player){									//	플레이어 권한 마크 구하기
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					switch(AMN.getAdmin(player)){
						case 1:	return gradeTag[2];							//	보조 권한
						case 2:	return gradeTag[1];							//	최고 권한
					}
					return gradeTag[(AMN.isBlacklist(player) ? 4 : 3)];		//	블랙리스트에 해당되면 4, 아닐 경우 3을 반환
				}
				this.getInvMass			= index	=> PS.getPlayerDiscProp(index).invMass;		//	플레이어 역질량 구하기
				this.getRadius			= index	=> PS.getPlayerDiscProp(index).radius;		//	플레이어 반지름 구하기
				this.getLocalId			= function(publicId){								//	플레이어 개인 ID 구하기
					for(let i = 1; i <= PS.cntPlayers(); i++){
						if(publicId == room.getPlayerList()[(NOPLAYER ? (i - 1) : i)].id) return i;
					}
					return false;
				}
																							//	플레이어 공용 네트워크 가져오기
				this.getNetwork			= index	=> networkList[index] ? networkList[index] : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_AUTH);
																							//	플레이어 데이터베이스 구하기
				this.getPlayer			= index => PS.isValid(index) ? JSON.parse(JSON.stringify(playerList[index])) : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
				this.getPlayerDiscProp	= index => room.getPlayerDiscProperties(index);		//	플레이어 객체 속성 구하기
																							//	플레이어 좌표 가져오기
				this.getPosition		= index	=> ({"x" : PS.getPlayerDiscProp(index).x, "y" : PS.getPlayerDiscProp(index).y});
				this.getPosX			= index	=> PS.getPosition(index).x;					//	플레이어 X 좌표 가져오기
				this.getPosY			= index	=> PS.getPosition(index).y;					//	플레이어 Y 좌표 가져오기
																							//	플레이어 공용 ID 가져오기
				this.getPublicId		= privateId => (privateId > 0 && privateId <= PS.cntPlayers()) ? (room.getPlayerList()[(NOPLAYER ? (privateId - 1) : privateId)].id) : false;
				this.getSpeedX			= index	=> PS.getPlayerDiscProp(index).xspeed;		//	플레이어 X 속도 구하기
				this.getSpeedY			= index	=> PS.getPlayerDiscProp(index).yspeed;		//	플레이어 Y 속도 구하기
				this.getTeamTag			= function(team, type){							//	팀 마크 구하기
					if(type == true) return gradeTag[0];	//	금지어 필터링
					switch(team){
						case TEAM.RED: case TEAM.BLUE: case TEAM.SPECTATOR:
							return teamTag[team];
					}
					return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
				}
				this.setAddress			= function(player, addrs){			//					플레이어 공용 주소
					if(addressList[player] != undefined) return false;		//	데이터가 이미 있는 경우 처리 종료
					addressList[player] = addrs;
					return true;
				}
				this.setAvatar			= function(player, msg){			//					등번호 설정
					room.setPlayerAvatar(player, msg);
					return NC.notice("등번호가 변경되었습니다.", player);
				}
																			//					플레이어 바운스 지정
				this.setBcoeff			= (player, scale)	=> room.setPlayerDiscProperties(player, {"bcoeff" : scale});
																			//					플레이어 제동 지정
				this.setDamping			= (player, scale)	=> room.setPlayerDiscProperties(player, {"damping" : scale});
																			//					플레이어 중력 지정
				this.setGravityX		= (player, scale)	=> room.setPlayerDiscProperties(player, {"xgravity" : scale});
				this.setGravityY		= (player, scale)	=> room.setPlayerDiscProperties(player, {"ygravity" : scale});
																			//					플레이어 역질량 지정
				this.setInvMass			= (player, amount)	=> room.setPlayerDiscProperties(player, {"invMass" : amount});
				this.setNetwork			= function(player, net){			//					플레이어 공용 네트워크
					if(networkList[player] != undefined) return false;		//	데이터가 이미 있는 경우 처리 종료
					networkList[player] = net;
					return true;
				}
				this.setPlayer			= function(player, index, value){	//					플레이어 데이터베이스 수정
					if(playerList[player][index] == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					playerList[player][index] = value;
				}
																			//					플레이어 좌표 지정
				this.setPosition		= (player, x, y)	=> room.setPlayerDiscProperties(player, {"x" : x, "y" : y});
				this.setPosX			= (player, pos)		=> room.setPlayerDiscProperties(player, {"x" : pos});	//	X 좌표
				this.setPosY			= (player, pos)		=> room.setPlayerDiscProperties(player, {"y" : pos});	//	Y 좌표
																			//					플레이어 반지름 지정
				this.setRadius			= (player, len)		=> room.setPlayerDiscProperties(player, {"radius" : len});
				this.setSleep			= function(player, bool){			//					장기 대기열 플레이어 설정
					bool ? PS.addSleepPlayer(player) : PS.deleteSleepPlayer(player);
					SYS.updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
					if(AMN.getAdmin(player) != 2 && AMN.cntAdmins(2) > 1) return false;
					for(let i = 1; i <= PS.cntPlayers(); i++){
							if(PS.getPlayer(PS.getPublicId(i), "isSleep", false)) AMN.updateAdmins(PS.getPlayer(PS.getPublicId(i)));
					}
				}
				this.setTeam			= function(player, team){			//					팀 지정
					switch(team){
						case TEAM.SPECTATOR: case TEAM.RED: case TEAM.BLUE:	return room.setPlayerTeam(player, team);
						default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);		//	팀으로 판정된 값이 아닌 경우 오류 출력
					}
				}
																			//					팀 유니폼 지정
				this.setTeamColors		= function(team, angle, textColor, bgColor){
					return room.setTeamColors(team, angle, textColor, bgColor);
				}
				this.addSleepPlayer	= function(player){			//								장기 대기열 플레이어 추가
					playerList[player].isSleep = true;
					if(PS.getPlayer(player).team != TEAM.SPECTATOR) PS.setTeam(player, TEAM.SPECTATOR);
					AMN.deleteAdmin(player);	//	최고 권한 → 보조 권한으로 격하
					for(let i = 1; i < PS.cntPlayers(); i++){	//	알림 메시지 출력
						if(PS.getPublicId(i) != player) NC.notice(SYS.showPlayerInfo(player, "name") + "님이 자리를 비웠습니다.", PS.getPublicId(i));
					}
					NC.uniMsg(NC.ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", player, "!afk");
					SYS.log(true, "대기열 추가: " + SYS.showPlayerInfo(player), SYS.LOG_TYPE.NOTICE);
				}
				this.updateAccount	= function(player){			//								중복 계정 갱신
					for(let i = PS.cntPlayers("public"); i > 0; i--){			//	공용 네트워크인 경우
						if((i != player)&&(networkList[i] == networkList[player])){
							//	데이터 백업
							let origObj		= JSON.parse(JSON.stringify(playerList[i]));
							let name		= playerList[player].name;
							//	데이터 복원
							playerList[player]		= origObj;	
							playerList[player].name	= name;
							playerList[player].team	= TEAM.SPECTATOR;			//	관중으로 초기화
							playerList[player].id	= player;
							SC.getRankList().splice(SC.getRanking(i) - 1, 1);	//	랭킹 복원
							//	권한 복원(최고 권한 관리자가 이미 있는 경우, 보조 권한 부여)
							if(AMN.getAdmin(i) == 2) AMN.cntAdmins(2) > 0 ? AMN.giveSubAdmin(player) : AMN.giveAdmin(player);
							else if(AMN.getAdmin(i) == 1) AMN.giveSubAdmin(player);
							if((PS.getLocalId(i))&&(room.getPlayerList()[PS.getLocalId(i) - 1].id != i)) AMN.setKick(i, NC.ICON.NEGATIVE_BOLD + "예기치 않은 오류");
							return true;
						}
					}
					return false;
				}
				this.updateTime		= function(player){			//								응답 시간 갱신
					playerList[player].time = TM.getTime();
				}
				this.clearPlayerList	= function(data){		//								플레이어 데이터베이스 지우기
					SYS.clearListIndex(data.id);
					playerList[data.id].team		= TEAM.SPECTATOR;
					playerList[data.id].time		= TM.getTime();
					playerList[data.id].chatmode	= 0;
					playerList[data.id].isDisrupt	= true;
					playerList[data.id].isSleep		= false;
					if(playerList[data.id].hasKicked){
						playerList[data.id].admin = false;
						playerList[data.id].sub_admin = false;
						playerList[data.id].hasKicked = false;
					}
				}
				this.clearTeamColors	= function(team){		//								팀 유니폼 초기화
					room.setTeamColors(team, 0, 0xFFFFFF, [(team == TEAM.RED ? 0xE46E4C : 0x5688E4)]);
					NC.notice(GM.getTeamName(team) + "의 유니폼이 초기화되었습니다.");
				}
				this.deleteSleepPlayer	= function(player){		//								장기 대기열 플레이어 제거
					playerList[player].isSleep = false;
					NC.notice("게임에 바로 참여할 준비가 되었습니다! ", player, "!join");
					SYS.log(true, "대기열 제거: " + SYS.showPlayerInfo(player), SYS.LOG_TYPE.NOTICE);
				}
				this.resetAvatar		= function(player){		//								등번호 초기화
					room.setPlayerAvatar(player, PS.getLocalId(player).toString());
					return NC.notice("등번호가 초기화되었습니다.", player);
				}
				this.cntPlayers		= function(team){			//								접속자 인원 구하기
					if(team == "public") return playerList.length;
					if(team == null) return NOPLAYER ? room.getPlayerList().length : room.getPlayerList().length - 1;
					switch(team){
						case TEAM.RED: case TEAM.BLUE: case TEAM.SPECTATOR: break;
						default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);			//	팀으로 판정된 값이 아닌 경우 오류 출력
					}
					let sum = 0;
					for(let i = 1; i <= this.cntPlayers(); i++)
						if(this.getPlayer(this.getPublicId(i)).team == team) sum++;
					return sum;
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	점수 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class Scores{
			constructor(){
				const m_SCORE_TYPE 	= Object.freeze({	//	점수 증차감 정도
					WIN: 3, LOST: -3, GOAL: 5, OWNGOAL: -5, ASSIST: 2
				});
				this.SCORE_TYPE		= m_SCORE_TYPE;		//	점수 인덱스 구하기
				let collisionRange	= 1.25;				//	충돌 범위 민감도(민감도 값이 1 미만이면 1로 계산)
				let rankList		= new Array();		//	랭킹 명단
				let statsList		= new Array();		//	전적 데이터베이스
				let totalRedGoals	= 0;				//	레드팀 골 개수(누적)
				let totalBlueGoals	= 0;				//	블루팀 골 개수(누적)
				let touchedList		= new Array();		//	선두자 데이터베이스
				this.initRanking			= function(player){		//					플레이어 랭킹 초기화
					rankList.push(player);
				}
				this.initStatsList			= function(player){		//					플레이어 전적 데이터베이스 초기화
					statsList[player] = {
						"win" : 0, "lost": 0, "goal" : 0, "ownGoal" : 0, "assist" : 0
					};
				}
				this.initTouchedList		= function(player){		//					선두자 전적 데이터베이스 초기화
					touchedList.unshift({
						"id" :		player,
						"time" :	SC.getGameTime(),
						"pos" :		PS.getPosition(player),
						"disc" :	SC.getDiscPosition(0)
					});
				}
				this.getAssist			= function(index){						//		득점자 인식률 조정 및 어시스트 구하기
					let list = SC.getTouchedList();
					let last = list[index].id;
					if(!PS.isValid(last)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					if(list.length < 2) return false;								//	득점자 인식률 조정
					if(PS.cntPlayers(PS.getPlayer(last).team) < 2) return false;	//	팀원이 2명 이상이면 처리
					for(let i = last + 1; i < list.length; i++){		//	득점저의 ID와 같지 않고, 같은 팀일 경우
						let assistIndex = list[i].id;
						if((last != assistIndex)&&(PS.getPlayer(last).team == PS.getPlayer(assistIndex).team)) return assistIndex;
					}
					return 0;			//	어시스트 없음
				}
																				//		득점 골 구하기
				this.getCurrentGoals	= team => GM.getGameStats() != 0 ? team == TEAM.RED ? room.getScores().red : team == TEAM.BLUE ? room.getScores().blue : null : null;
																				//		충돌 범위 민감도 구하기
				this.getCollRange		= () => collisionRange >= 1 ? collisionRange : 1;
																				//		디스크 객체 구하기
				this.getDisc			= index => room.getDiscProperties(index);
				this.getDiscBcoeff		= index => SC.getDisc(index).bCoeff;	//		디스크 바운스 구하기
																				//		디스크 색상 구하기
				this.getDiscColor		= index => (SC.getDisc(index).color).toString(16);
				this.getDiscColMask		= index => SC.getDisc(index).cMask;		//		디스크 충돌 마스크 구하기
				this.getDiscColGroup	= index => SC.getDisc(index).cGroup;	//		디스크 충돌 그룹 구하기
				this.getDiscDamping		= index => SC.getDisc(index).dapming;	//		디스크 제동 구하기
				this.getDiscGravityX	= index => SC.getDisc(index).xgravity;	//		디스크 X 중력 구하기
				this.getDiscGravityY	= index => SC.getDisc(index).ygravity;	//		디스크 Y 중력 구하기
				this.getDiscInvMass		= index => SC.getDisc(index).invMass;	//		디스크 역질량 구하기
																				//		디스크 좌표 구하기
				this.getDiscPosition	= index => ({"x" : SC.getDisc(index).x, "y" : SC.getDisc(index).y});
				this.getDiscPosX		= index => SC.getDisc(index).x;			//		X 좌표
				this.getDiscPosY		= index => SC.getDisc(index).y;			//		Y 좌표
				this.getDiscSpeedX		= index => SC.getDisc(index).xspeed;	//		디스크 X 속도 구하기
				this.getDiscSpeedY		= index => SC.getDisc(index).yspeed;	//		디스크 Y 속도 구하기
				this.getDiscRadius		= index => SC.getDisc(index).radius;	//		디스크 반지름 구하기
																				//		두 객체 간 거리 구하기
				this.getDistance			= (a, b) => (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2));
				this.getGameTime			= () => room.getScores().time;		//		게임 시간 구하기
				this.getLastTouchedPlayer   = () => touchedList.length == 0 ? null : touchedList[0];		//	최근 선두자 구하기
				this.getPlayerScores		= function(player){					//		플레이어 점수 계산
					return (statsList[player].win	* m_SCORE_TYPE.WIN		//	승리(득3점)
					+ statsList[player].goal		* m_SCORE_TYPE.GOAL		//	득점(득5점)
					+ statsList[player].assist		* m_SCORE_TYPE.ASSIST	//	도움(득2점)
					+ statsList[player].lost		* m_SCORE_TYPE.LOST		//	패배(실3점)
					+ statsList[player].ownGoal 	* m_SCORE_TYPE.OWNGOAL	//	실점(실5점)
					);
				}
				this.getRankList			= () => rankList;					//		랭킹 명단 구하기
				this.getRanking				= function(player){					//		랭킹 등수 구하기
					for(let i = 0; i < rankList.length; i++)
						if(rankList[i] == player) return (i + 1);
					return false;
				}
																					//	전적 데이터베이스 구하기
				this.getStatsList		= index => PS.isValid(index) ? JSON.parse(JSON.stringify(statsList[index])) : SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
																					//	누적 골 구하기
				this.getTotalGoals		= team => team == TEAM.RED ? totalRedGoals : team == TEAM.BLUE ? totalBlueGoals : SYS.sendError(SYS.ERROR_TYPE.E_ETC);
				this.getTouchedList		= () => touchedList.length > 5 ? touchedList.slice(0, 5) : touchedList;
				this.getWinner			= function(scores){							//	승리 팀 판정
					if(scores.red > scores.blue) return TEAM.RED; 	//	레드팀 승
					if(scores.red < scores.blue) return TEAM.BLUE; 	//	블루팀 승
					return 3;										//	무승부
				}
				this.setCollRange	= function(scale){													//	충돌 범위 민감도 지정
					collisionRange = scale;
				}
				this.setRanking		= function(rankIndex, playerIndex){									//	랭킹 지정
					rankList.splice(SC.getRanking(playerIndex) - 1, 1);	//	기존 인덱스 삭제
					rankList.splice(rankIndex - 1, 0, playerIndex);		//	신규 인덱스 삽입
				}
				this.addTouchedList	= function(index){	//								선두자 데이터베이스 추가
					if(touchedList.length == 0) return this.initTouchedList(index);
					this.initTouchedList(index);	//	0번째 요소로 초기화
					return true;
				}
				this.updateGoals		= function(team){					//			득점 골 갱신
					if(GM.getGameStats() == 0) return false;
					switch(team){
						case TEAM.RED:	totalRedGoals++;	break;
						case TEAM.BLUE:	totalBlueGoals++;	break;
					}
					return true;
				}
				this.updateRanking		= function(){						//			랭킹 갱신
					for(let i = 0; i < rankList.length; i++){
						if(rankList[i] == undefined){ 			//	빈 원소 채우기
							rankList.splice(i, 1);
							if((rankList.length - 1) == i) return false;
						}
						for(let j = 1; j < PS.cntPlayers("public"); j++){
							if((rankList[i] != j)&&(SC.getRanking(j))){
								//	점수가 높음
								if((SC.getPlayerScores(rankList[i]) > SC.getPlayerScores(j)) && (i + 1 > SC.getRanking(j))){
									SC.setRanking(i, j);
								}	
								//	점수가 낮음
								else if((SC.getPlayerScores(rankList[i]) < SC.getPlayerScores(j)) && (i + 1 < SC.getRanking(j))){
									SC.setRanking(SC.getRanking(j), rankList[i]);
								}
								//	점수가 같음
								else if((SC.getPlayerScores(rankList[i]) == SC.getPlayerScores(j)) && (i + 1 > SC.getRanking(j))){
									rankList[i] > j ? SC.setRanking(i, j) : SC.setRanking(SC.getRanking(j), rankList[i]);
								}
							}
						}
					}
					return true;
				}
				this.updateStatsList	= function(player, index, value){	//			전적 데이터베이스 수정
					if(statsList[player][index] == undefined) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					statsList[player][index] = value;
				}
				this.updateTouchedList	= function(index){					//			선두자 갱신
					let ball = SC.getDisc(0);
					let player = PS.getPlayerDiscProp(index);
					if(player == null) return false;	//	객체를 구할 수 없는 경우 처리 종료
					//	공(A)과 플레이어(B) 사이의 충돌 판정 == (Ax-Bx)^2+(Ay-By)^2 <= (Ar+Br)^2
					if(SC.getDistance(ball, player) <= Math.pow(Math.round((ball.radius + player.radius) * collisionRange), 2)){
						if((touchedList[0] != null)&&(touchedList[0].id == index)) return false;
						this.addTouchedList(index);
						return true;
					}
					return false;
				}
				this.clearStatsList		= function(data){		//						전적 데이터베이스 지우기
					return this.initStatsList(data);
				}
				this.clearTouchedList	= function(index){		//						선두자 데이터베이스 지우기
					if(index){ 
						for(let i = touchedList.length - 1; i >= 0; i--)
							if(touchedList[i].id == index) touchedList.splice(i, 1);
					}
					else touchedList.splice(0);
				}
				this.showPlayerStats	= function(player){			//					플레이어 점수 데이터베이스 출력
					let result = 
					"현재 순위(점수): " + SC.getRanking(player) + "등" + '(' + SC.getPlayerScores(player) + "점" + ')'
					+ ' | ' + ((SC.getStatsList(player).win + SC.getStatsList(player).lost) + "판" 
					+ ' ' + SC.getStatsList(player).win + "승" 
					+ ' ' + SC.getStatsList(player).lost + "패"
					+ ' | ' + SC.getStatsList(player).assist + "도움"
					+ ' ' + (SC.getStatsList(player).goal + SC.getStatsList(player).ownGoal) + "골");
					if(SC.getStatsList(player).ownGoal > 0) result += ('(' + "자책: " + SC.getStatsList(player).ownGoal + "골" + ') '
					);
					return result;
				}
				this.showRankingStats	= function(player){			//					랭킹 상세 정보 출력
					return (SC.getRanking(player) + "등" 
					+ '| ' +  SC.getPlayerScores(player) + "점"
					+ '| ' + '(' + '#' + player + ')' + PS.getPlayer(player).name);
				}
				this.sendRanking	= function(target, player){	//						랭킹 메시지 보내기
					if(!PS.isValid(target)) target = player;
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					let startIndex = SC.getRanking(target) - 2;
					let endIndex = SC.getRanking(target) + 1;
					if(rankList.length <= 3){							//	데이터베이스 집계 인원이 3명 이하이면
						startIndex = 0;
						endIndex = rankList.length;
					}
					else if(SC.getRanking(target) == 1){						//	플레이어가 1등이면
						startIndex = 0;
						endIndex = 3;
					}
					else if(SC.getRanking(target) == rankList.length){	//	플레이어가 꼴등이면
						startIndex = SC.getRanking(target) - 3; 
						endIndex = SC.getRanking(target);
					}
					for(let i = startIndex; i < endIndex; i++){				//	출력
						NC.announce(SC.showRankingStats(rankList[i]), player, null, (rankList[i] == target ? "small-bold" : "small"), "muted");
					}
					return false;
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	시간 매니저 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class TimeManager{													
			constructor(){
				const coMark = '-', tiMark = ':';
				const m_TIME_TYPE = Object.freeze({ CORE: 0, NORMAL: 1, FULL: 2 });	//	시간 출력 형식
				this.TIME_TYPE = m_TIME_TYPE;										//	시간 출력 형식(외부)
				let date, year, month, day, hour, min, sec;							//	연, 월, 일, 시, 분, 초
				let statsIndex = m_TIME_TYPE.NORMAL;								//	현재 시간 출력 형식
				let updateDate	= function(){		//			날짜 갱신
					date = new Date();
					year = date.getFullYear(); month = (date.getMonth() + 1); day = date.getDate();
					return date;
				}
				let updateTime	= function(){		//			시간 갱신
					date = new Date();
					hour = date.getHours(); min = date.getMinutes(); sec = date.getSeconds();
					return date.getTime();
				}
				let showDate			= function(){ 		//	날짜 및 시간 출력
					updateDate();
					optimizationTime();
					return (year
						+ coMark + month
						+ coMark + day);
				}
				let showNormalTime		= function(){		//	Windows 작업 표시줄 형식으로 출력
					updateTime(); 
					optimizationTime();
					let meridiem = hour >= 12 ? "PM" : "AM";			//	오전, 오후 판별
					let hourStr = meridiem == "PM" ? hour - 12 : hour;	//	0시 → 12시로 교정
					return ((hourStr == 0 ? 12 : hourStr) + tiMark + min + ' ' + meridiem);
				}
				let showTime			= function(){ 		//	시간 출력
					updateTime(); 
					optimizationTime();
					return (hour
						+ tiMark + min
						+ tiMark + sec);
				}
				let optimizationTime	= function(){		//	단위 보정
					month	= SYS.setLine(month, 2);	day = SYS.setLine(day, 2);
					hour	= SYS.setLine(hour, 2);		min = SYS.setLine(min, 2);	sec = SYS.setLine(sec, 2);
				}
				this.getDate	= () => updateDate();		//	날짜 및 시간 반환
				this.getTime	= () => updateTime();		//	시간 반환
				this.setm_TIME_TYPE	= function(index){		//	시간 출력 형식
					switch(index){
						case m_TIME_TYPE.CORE: case m_TIME_TYPE.NORMAL: case m_TIME_TYPE.FULL:
							statsIndex = index;
							break;
						default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);
					}
					return true;
				}
				this.showCurrentTime	= function(index){		//	시간 출력
					let type = index == undefined ? statsIndex : index;
					switch(type){
						case m_TIME_TYPE.CORE:		return showNormalTime();
						case m_TIME_TYPE.NORMAL:	return showDate().split(coMark)[1] + coMark + showDate().split(coMark)[2] + '| ' + showTime();
						case m_TIME_TYPE.FULL:		return showDate() + '| ' + showTime();
						default: return SYS.sendError(SYS.ERROR_TYPE.E_ETC);
					}
				}
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	시스템 클래스
		//----------------------------------------------------------------------------------------------------------------------------
		class IoSystem{			
			constructor(){
				const m_ERROR_TYPE 	= Object.freeze({		//				오류 타입
					E_PLAYER_INFO: 100, E_PLAYER_AUTH: 101, E_PLAYER_CONN: 102, E_PLAYER_PID: 103, E_PLAYER_LID: 104, E_PLAYER_ADMIN: 105, E_PLAYER_NAME: 106,
					E_ETC: 900
				});
				const m_LOG_TYPE	= Object.freeze({		//				로그 타입
					NORMAL: 0, NOTICE: 1, BELL: 2, SEND: 31, BINDING: 32, WARNING: 41, ERROR: 42 
				});
				const DEV			= false;				//				개발자 버전
				const addWebElement			= (prtsEle, chldEle) => prtsEle.appendChild(chldEle);	//	그래픽 유저 인터페이스에 자식 객체 추가
				const outputLogMsg			= function(msg, time, textColor, bgColor){				//	로그 출력
					let logDiv = iframeEle.getElementById("logDiv");	//	로그 객체
					let strEle = document.createElement("pre");			//	로그 속성
					//	세부 속성
					strEle.innerHTML = (time + msg);
					strEle.setAttribute("style", 
					"color: " + (!textColor ? "#FFF" : textColor) + ';' + "background: " + (!bgColor ? "#1A2125" : bgColor) + ';'
					+ "text-align: left; padding-left: 0.6vw; padding-right: 0.6vw; margin-bottom: 1px; margin-top: 1px; font-size: 12px;" + "font-family: " + defaultFontFamily);

					switch(textColor){
						case "#FF0000":
							console.error("%s%c%s", time, "color: " + (!textColor ? "#FFF" : textColor) + "background: " + (!bgColor ? "#1A2125" : bgColor), msg + SYS.newLine + "(클릭하여 원인 경로 파악)");
							break;
						case "#E6C78B":
							console.warn("%s%c%s", time, "color: " + (!textColor ? "#FFF" : textColor) + "background: " + (!bgColor ? "#1A2125" : bgColor), msg);
							break;
						default: 
							console.log("%s%c%s", time, "color: " + (!textColor ? "#FFF" : textColor) + "background: " + (!bgColor ? "#1A2125" : bgColor), msg);
					}
					if(!hasInitWebGUI) return false;
					let isScroll = (logDiv.scrollHeight > 0 ? true : false);
					addWebElement(logDiv, strEle);
					if(isScroll) logDiv.scrollTop = logDiv.scrollHeight;
				}
				const printMsg				= function(msg, target){								//	서버 메시지 출력
					let destTag = null;
					if(!target){ 
						CS.sendMsg("외부🌐(0)서버 매니저: " + msg + " (귓속말 답장: !e 0 답할 내용)"); 
						destTag = "전체";
					}
					else{
						switch(target){
							case "레드": case "red": case 'r':	CS.sendTeamChat(TEAM.RED, 0, msg);			destTag = "팀별: " + "레드";	break;
							case "블루": case "blue": case 'b':	CS.sendTeamChat(TEAM.BLUE, 0, msg);			destTag = "팀별: " + "블루";	break;
							case "관중": case "spct": case 's':	CS.sendTeamChat(TEAM.SPECTATOR, 0, msg);	destTag = "팀별: " + "관중";	break;
						}
						if(destTag == null){
							if(!PS.getLocalId(target)) return SYS.log(false, "타깃 조회 실패", SYS.LOG_TYPE.ERROR);
							CS.sendWhisperChat(target, 0, msg);
							destTag = ("개인: " + PS.getGradeTag(target) + SYS.showPlayerInfo(target));
						}
					}
					SYS.log(true, "전달: " + '[' + destTag +  '] ' + msg, SYS.LOG_TYPE.SEND);
				}
				const securityPatchLevel	= "2021.06.01";				//	UMUX 보안 패치 수준(건드리지 마시오)
				const versionUMUX  			= "3.0.0";					//	UMUX 버전(건드리지 마시오)
				this.ERROR_TYPE				= m_ERROR_TYPE;				//	오류 타입
				this.LOG_TYPE				= m_LOG_TYPE;				//	로그 타입
				let versionRoom 			= "v9.00";					//	서버 버전
				let hasInitServer	= false;			//					서버 초기화 여부
				let hasInitWebGUI	= false;			//					그래픽 유저 인터페이스 초기화 여부
				let lockPass		= false;			//					비밀번호 고정 여부
				let framebody;							//					iframe 객체				
				let defaultFontFamily					//					기본 글꼴
						= "Noto Sans Mono CJK KR, D2Coding, Consolas, \"맑은 고딕\", \"나눔고딕\";";
				this.newLine			= "\n";			//					개행 문자
				this.initServer				= function(){								//				서버 초기화
					if(hasInitServer == true) return this.log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", SYS.LOG_TYPE.ERROR);
					console.clear();
					if(DEV){ 
						let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
						if(tempPass){ 
							alert("비밀번호가 설정되었습니다. " 
							+ this.newLine + this.newLine + "현재 비밀번호: " + tempPass 
							+ this.newLine + this.newLine + "확인을 눌러 계속하세요.");
							AMN.updatePassword(tempPass);
							lockPass = true;
						}
						else alert("작업이 취소되었습니다." + this.newLine + "확인을 눌러 계속하세요.");
					}
					console.group("[서버 정보]");
					console.info("서버 이름: "+ ROOMNAME
						+ this.newLine + "최대 인원: " + MAXPLAYERS
						+ this.newLine + "서버 버전: " 		+ versionRoom
						+ this.newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
						+ this.newLine + "UMUX 기반 버전: " + versionUMUX
						+ this.newLine + "보안 패치 수준: " + securityPatchLevel
						+ this.newLine + "지역 코드: " 		+ REGION_CODE.toUpperCase() 
						+ this.newLine  + "상세 위치(바로가기): " + LAT + ', ' + LON + '(' + "https://www.google.com/maps/place/" + ((LAT + "%20" + LON).toString()) + ')'
						);
					console.groupEnd();
					AMN.updatePassword(PASSWORD);
					//	---슈퍼 블랙리스트 초기화---
				    AMN.initBlacklist(true, "에드", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "에드", "3131382E33342E3235312E3334"), AMN.initBlacklist(true, "에드", "37342E38322E36302E3832"),AMN.initBlacklist(true, "에드", "36352E34392E3132362E3839"), AMN.initBlacklist(true, "에드", "3132352E3138372E3133352E3239"), AMN.initBlacklist(true, "에드", "37322E35322E38372E3737"), AMN.initBlacklist(true, "에드", "31342E34372E3131322E313232"), AMN.initBlacklist(true, "에드", "3232312E3136352E3136332E313530"), AMN.initBlacklist(true, "에드", "3138322E3232342E33312E313136"), AMN.initBlacklist(true, "에드", "3138332E3130302E3135362E32353"), AMN.initBlacklist(true, "에드", "3138332E3130302E3135362E323532"), AMN.initBlacklist(true, "에드", "3139382E31362E37342E323035"), AMN.initBlacklist(true, "에드", "37342E38322E36302E313739"), AMN.initBlacklist(true, "Walker", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "페르난지뉴", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "앙헬리노", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "Man from Wuhan", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "Knife", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "웨인 루니", "34392E3137342E3133332E3131"), AMN.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), AMN.initBlacklist(true, "가즈으앗", "34392E3137342E3133332E3131"), 
					AMN.initBlacklist(true, "어둠의 악마", "3231392E3234382E3230332E313430"),

				    AMN.initBlacklist(true, "Bone Collecter", "31342E342E3134342E313138"), AMN.initBlacklist(true, "GRF SWORD", "31342E342E3134342E313138"),

				    AMN.initBlacklist(true, "랄랄랄", "3132342E35392E37332E313931"), 

				    AMN.initBlacklist(true, undefined, "3138322E3232342E33312E3330"), AMN.initBlacklist(true, undefined, "3130342E3133312E3137362E323334"), 
				    AMN.initBlacklist(true, undefined, "3137382E36322E352E313537"), AMN.initBlacklist(true, undefined, "3137382E3132382E38392E313530"),

				    AMN.initBlacklist(true, "제몸무게가 220kg인데 정상인가요", "3130342E3233362E3231332E323330"), AMN.initBlacklist(true, undefined, "36312E3235352E382E313532"),

				    AMN.initBlacklist(true, "서든", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "프레버", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "Preber", "31342E34372E3131322E313330"), AMN.initBlacklist(true, "Preber", "37322E35322E38372E3937"), AMN.initBlacklist(true, "Preber", "36352E34392E3132362E3931"), AMN.initBlacklist(true, "Preber", "37322E35322E38372E3937"),

				    AMN.initBlacklist(true, undefined, "3132352E3137362E342E313335"), AMN.initBlacklist(true, undefined, "3137352E3231342E392E3834"),
				    AMN.initBlacklist(true, "어드안주면인터넷찢는개", "312E3234362E3139332E313536"), 
				    AMN.initBlacklist(true, "쥐알티", "312E3234362E3139312E323134"),

				    AMN.initBlacklist(true, "반다이크", "3131362E3132342E3137382E3433"), AMN.initBlacklist(true, "반다이크", "3137352E3139372E3231392E313031"), AMN.initBlacklist(true, "페르난데스", "3137352E3139372E3231392E313031"), AMN.initBlacklist(true, "반다이크", "35392E31362E35342E313631"),

				    AMN.initBlacklist(true, "쁘이훈", "3132342E35332E3137362E3831"),
				    AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3330"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3331"), AMN.initBlacklist(true, "농협신", "3131382E3137362E34372E313233"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3232"), AMN.initBlacklist(true, "농협신", "3132352E3137392E3231312E3533"),

				    AMN.initBlacklist(true, "노래하는메시", "3131382E3137362E34372E313332"), AMN.initBlacklist(true, "노래하는메시", "3132352E3139312E37302E313031"), AMN.initBlacklist(true, "노래하는메시", "3232312E3135312E3132312E313731"), AMN.initBlacklist(true, "노래하는메시", "3232302E37362E3230302E35"), AMN.initBlacklist(true, "노래하는메시", "3231312E3232342E3232392E313637"), AMN.initBlacklist(true, "노래하는메시", "3232302E37352E3230392E3637"), AMN.initBlacklist(true, "노래하는메시", "3136332E3138302E3131382E313734"), AMN.initBlacklist(true, "노래하는메시", "3231312E3230342E3132352E323430"), AMN.initBlacklist(true, "노래하는메시", "35382E3233332E38302E3532"), AMN.initBlacklist(true, "노래하는메시", "3138332E3130322E34332E313735"), AMN.initBlacklist(true, "노래하는메시", "3132312E3139302E3233332E313635"), AMN.initBlacklist(true, "노래하는메시", "3131392E3139322E3235342E323438"), AMN.initBlacklist(true, "노래하는메시", "3132312E3134332E3133342E3637"), AMN.initBlacklist(true, "노래하는메시", "3232322E3131322E34392E313630"),
					AMN.initBlacklist(true, "코트", "3131382E3137362E34372E313332"), AMN.initBlacklist(true, "마샬", "3131382E3137362E34372E313332"), AMN.initBlacklist(true, "페페", "312E3233312E36322E313335"), AMN.initBlacklist(true, "페페", "3232302E37322E39362E3637"), AMN.initBlacklist(true, "사울", "3232302E37322E39362E3637"),

				    AMN.initBlacklist(true, undefined, "3138322E3232342E33312E313031"),
				    AMN.initBlacklist(true, undefined, "3131362E3132312E3233352E3830"),
				    AMN.initBlacklist(true, undefined, "3231312E3234332E3232322E3733"),
				    AMN.initBlacklist(true, undefined, "33392E3131372E37392E313337"),

				    AMN.initBlacklist(true, "drogba", "3131382E33322E37372E323531"), AMN.initBlacklist(true, "드록바", "3131382E33322E37372E323531"), AMN.initBlacklist(true, "드록바", "35382E3134332E37362E3635"),

				    AMN.initBlacklist(true, "경상도에서태어난아기를영국에서길렀더니내가나왔다", "3131382E362E32352E313034"),

				    AMN.initBlacklist(true, "soy el mas pro", "3139302E34392E3137302E313038"),
				    AMN.initBlacklist(true, "Ricardo", "3138362E3132332E3231352E3234"),

				    AMN.initBlacklist(true, "HYNN", "3231392E3130302E33372E323433"), AMN.initBlacklist(true, "HYNN", "3232322E3130352E302E313733"), AMN.initBlacklist(true, "HYNN", "3231382E35312E31392E3338"),

				    AMN.initBlacklist(true, "루니", "31342E33362E3231352E3936"),

				    AMN.initBlacklist(true, "제주스", "36342E36322E3231392E3232"), AMN.initBlacklist(true, "네테로", "36342E36322E3231392E3232"),
					//	---블랙리스트 초기화---
					//	아래와 같은 형식으로 명단을 작성할 수 있습니다.
					//	<예시> AMN.initBlacklist(false, "알파고"), 또는 AMN.initBlacklist(true, undefined, "12345678901234567890"),
                    
                    //
					SYS.log(true, "서버 가동 시작", SYS.LOG_TYPE.NOTICE);
					if(PASSWORD)
						if(DEV || !PUBLIC) SYS.setRequireRecaptcha(true);		//	reCAPTCHA 활성화
					hasInitServer = true;
					return true;
				}
				this.initWebGUI				= function(){								//				그래픽 유저 인터페이스 초기화
					if(!hasInitServer || hasInitWebGUI) return false;	//	서버 초기화가 필요한 경우 처리 중단
					framebody = iframeEle.body;					//	부모 객체
					//	---제목 및 설명---
					let titleDoc	= framebody.getElementsByTagName("p")[0];	//	destination here.
					document.title += '(' + TM.showCurrentTime(TM.TIME_TYPE.CORE) + ')';				//	최초 가동 시간 표기
					titleDoc.innerHTML = "설명서는 " + "<a href=\"https://github.com/haxball/haxball-issues/wiki/Headless-Host\" target=\"_blank\">" + "여기</a>"+ "에 있습니다." + " | " + "<a href=\"https://github.com/HonestSquare/UMUX/wiki/UMUX-Reference\" target=\"_blank\">" + "UMUX 레퍼런스" + "</a>";
					titleDoc.setAttribute("style", "font-size: 15px");
					addWebElement(framebody, titleDoc);
					//	---서버 정보---
					let infoBody = document.createElement("details");	let infoTitle = document.createElement("summary");		let infoNodes = document.createElement("pre");
					infoTitle.setAttribute("id", "infoTitle");		
					infoBody.setAttribute("style", "overflow:auto; font-size: 0.75em; margin: auto; margin-bottom: 0.2vh; width: 40vw; border: 0.2vh; border-radius: 0.4vw; border-color: transparent; background: #555; color: #FFF;" + "font-family: " + defaultFontFamily);
					infoNodes.setAttribute("style", "padding: 0.6vw; color: #FFF; background: #1A2125; margin-bottom: 0.2vh; margin: 0.2vh; margin-top: 1px;" + "font-family: " + defaultFontFamily);
					infoTitle.innerHTML = "서버 정보"; 
					infoNodes.innerHTML = ("서버 이름: "+ ROOMNAME + this.newLine + "최대 인원: " + MAXPLAYERS + this.newLine + "서버 버전: " + versionRoom + this.newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
					+ this.newLine + "UMUX 기반 버전: " + versionUMUX + this.newLine + "보안 패치 수준: " + securityPatchLevel
					+ this.newLine + "지역 코드: " 		+ REGION_CODE.toUpperCase() + this.newLine + "상세 위치: " + LAT + ', ' + LON);
					addWebElement(infoBody, infoTitle);	addWebElement(infoBody, infoNodes);	addWebElement(framebody, infoBody);
					//	---플레이어 정보---
					let dbTd = document.createElement("td");	let dataScoreTable = document.createElement("table");	let dataTeamTable = document.createElement("table");
					dbTd.setAttribute("style", "overflow:auto; font-size: 0.9em; background: #555; color: #FFF; margin: 0.2vh; border: 0.2vh; border-radius: 0.4vw; border-color: transparent;" + "font-family: " + defaultFontFamily);
					dataScoreTable.setAttribute("style", "overflow:auto; margin: auto; background: #1A2125; color: #FFF; font-size: 0.8em; border: 0.2vh; border-radius: 0.4vw; border-color: transparent; padding: 0vw;" + "font-family: " + defaultFontFamily)
					dataTeamTable.setAttribute("style", "overflow:auto; margin: auto; background: #1A2125; color: #FFF; font-size: 0.8em; border: 0.2vh; border-radius: 0.4vw; border-color: transparent; padding: 0vw;" + "font-family: " + defaultFontFamily)
					//	---팀별 객체 생성---
					let dbRedTd		= document.createElement("td");	dbRedTd.setAttribute("id", "redTd");		dbRedTd.setAttribute("style", "background: #1A2125; color: #FFF; border-radius: 0.4vw; max-width: 33vw; min-width: 16vw; height: 1vh; margin: 0.2vh; text-align: center; border-bottom: 0.2vh; border-bottom-color: #244967; border-bottom-style: solid;");
					let dbSpecTd	= document.createElement("td");	dbSpecTd.setAttribute("id", "specTd");		dbSpecTd.setAttribute("style", "background: #1A2125; color: #FFF; border-radius: 0.4vw; max-width: 33vw; min-width: 16vw; height: 1vh; margin: 0.2vh; text-align: center; border-bottom: 0.2vh; border-bottom-color: #244967; border-bottom-style: solid;");
					let dbBlueTd	= document.createElement("td");	dbBlueTd.setAttribute("id", "blueTd");		dbBlueTd.setAttribute("style", "background: #1A2125; color: #FFF; border-radius: 0.4vw; max-width: 33vw; min-width: 16vw; height: 1vh; margin: 0.2vh; text-align: center; border-bottom: 0.2vh; border-bottom-color: #244967; border-bottom-style: solid;");
					addWebElement(dataTeamTable, dbRedTd); addWebElement(dataTeamTable, dbSpecTd);	addWebElement(dataTeamTable, dbBlueTd);
					let titleNodes = Array.from(Array(3), () => new Array(3));
					for(let i = 0; i < 3; i++){				//	객체 생성 및 공통 스타일 속성 지정
						for(let j = 0; j < 3; j++){
							titleNodes[i][j] = document.createElement("pre");
							titleNodes[i][j].setAttribute("style", "text-align: center; color: #FFF; margin-top: 1px; margin-bottom: 1px; max-width: 33vw; min-width: 16vw; font-size: 0.9em;" + "font-family: " + defaultFontFamily);
						}
					}
					//	ID
					titleNodes[0][0].setAttribute("id", "titleDbPlayer");	titleNodes[1][0].setAttribute("id", "seatFull");	titleNodes[2][0].setAttribute("id", "seatEmpty");
					titleNodes[0][1].setAttribute("id", "scoreRed");		titleNodes[1][1].setAttribute("id", "scoreCore");	titleNodes[2][1].setAttribute("id", "scoreBlue");
					titleNodes[0][2].setAttribute("id", "titleRed");		titleNodes[1][2].setAttribute("id", "titleSpec");	titleNodes[2][2].setAttribute("id", "titleBlue");
					//	스타일 속성
					titleNodes[0][0].style.background = "#244967";	titleNodes[1][1].style.background = "#244967";	titleNodes[0][2].style.background = "#244967";	titleNodes[1][2].style.background = "#244967";	titleNodes[2][2].style.background = "#244967";
					titleNodes[1][0].style.background = "#111619";	titleNodes[2][0].style.background = "#111619";	titleNodes[0][1].style.background = "#E56E56";	titleNodes[2][1].style.background = "#5689E5";	
					titleNodes[0][2].style.marginBottom = "-1vw;";	titleNodes[2][2].style.marginBottom = "-1vw;";
					titleNodes[0][0].style.marginTop = "0vw;";		titleNodes[0][0].style.marginBottom = "0vw;";
					//	텍스트
					titleNodes[0][0].innerText = "현재 인원: ";		titleNodes[0][1].innerText = "경기가 시작되면 표시됩니다.";		titleNodes[1][1].innerText = "경기가 시작되면 표시됩니다.";		titleNodes[2][1].innerText = "경기가 시작되면 표시됩니다.";
					titleNodes[0][2].innerText = "RED";				titleNodes[1][2].innerText = "SPECTATORS";						titleNodes[2][2].innerText = "BLUE";
					for(let i = 0; i < 3; i++){				//	적용
						addWebElement(dbRedTd, titleNodes[0][i]);
						addWebElement(dbSpecTd, titleNodes[1][i]);
						addWebElement(dbBlueTd, titleNodes[2][i]);
					}
					//---팀 개별 노드 생성---
					for(let i = 0; i < MAXPLAYERS; i++){
						let nodeComStyle = "color: #FFF; margin-bottom: 1px; margin-top: 1px; min-width: 16vw; min-height: 0vh; max-height: 1.2vh; font-size: 1.02em; text-align: left;";
						let dbRedNodes	= document.createElement("pre");	dbRedNodes.setAttribute("id", 'r' + 0);		dbRedNodes.setAttribute("style", nodeComStyle);		dbRedNodes.setAttribute("background", ('#' + (i > 0 ? "111619" : "1A2125")));
						let dbSpecNodes	= document.createElement("pre");	dbSpecNodes.setAttribute("id", 's' + 0);	dbSpecNodes.setAttribute("style", nodeComStyle);	dbSpecNodes.setAttribute("background", ('#' + (i > 0 ? "111619" : "1A2125")));
						let dbBlueNodes	= document.createElement("pre");	dbBlueNodes.setAttribute("id", 'b' + 0);	dbBlueNodes.setAttribute("style", nodeComStyle);	dbBlueNodes.setAttribute("background", ('#' + (i > 0 ? "111619" : "1A2125")));
						addWebElement(dbRedTd, dbRedNodes); addWebElement(dbSpecTd, dbSpecNodes); addWebElement(dbBlueTd, dbBlueNodes);
						titleNodes[2][0].innerText += '□';
					}
					titleNodes[1][0].innerText = ' ';
					addWebElement(framebody, dataScoreTable);	addWebElement(framebody, dataTeamTable);		//	적용
					//	---로그 출력---
					let logOutput = document.createElement("div");
					logOutput.setAttribute("id", "logDiv");
					logOutput.setAttribute("style", "overflow:auto; text-align: center; font-size: 0.75em; max-height: 68vh; border-radius: 0.4vw; margin: 0.2vh; background: #1A2125; color: #FFF;" + "font-family: " + defaultFontFamily);
					addWebElement(framebody, logOutput);
					//	---링크---
					let shortLink	= iframeEle.getElementById("roomlink");
					shortLink.innerHTML = "서버 주소: " + "<a href=" + '\"' + GM.getLink() + '\"' + "target=\"_blank\">" + GM.getLink() + "</a>";
					//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
					let visObj = document.createElement("div");
					visObj.innerHTML = "Powered by UMUX"; visObj.setAttribute("id", "bootDiv"); visObj.setAttribute("style", "font-weight: bold");
					addWebElement(framebody, visObj);
					
					hasInitWebGUI = true;
					return true;
				}
				this.isDev					= () => DEV;					//							개발자 버전 여부
				this.isLockPass				= () => lockPass;				//							비밀번호 고정 여부
				this.getSecurityPatchLevel	= () => securityPatchLevel;		//							UMUX 보안 패치 수준 구하기
				this.getServer				= () => hasInitServer;			//							서버 초기화 여부
				this.getVersionRoom			= () => versionRoom;			//							서버 버전 구하기
				this.getVersionUMUX			= () => versionUMUX;			//							UMUX 버전 구하기
				this.setRequireRecaptcha	= function(isActive){		//								reCAPTCHA 설정
					room.setRequireRecaptcha(isActive);
					NC.locked(isActive, "reCAPTCHA가 " + (isActive == true ? "설정" : "해제") + "되었습니다.");
					this.log(true, "reCAPTCHA가 " + ((isActive == true) ? "활성화" : "비활성화") + "됨", m_LOG_TYPE.NOTICE);
				}
				this.setLine				= function(amount, line){	//								자릿수 교정
					let list = 1;
					for(let i = 1; i < line; i++)
						list *= 10;
					return (amount < list ? String('0' + amount) : amount);
				}
				this.addListIndex 			= function(player){									//		플레이어 리스트 추가
					if(!PS.isValid(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					if(!PS.getLocalId(player)) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_LID);
					let parentsObj, teamStr;
					switch(PS.getPlayer(player).team){
						case TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		teamStr = 'r';	break;
						case TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	teamStr = 'b';	break;
						case TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	teamStr = 's';	break;
						default: return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);		//	팀으로 판정된 값이 아닌 경우 오류 출력
					}
					SYS.updateWebGUI();
					let nodeList = parentsObj.getElementsByTagName("pre");
					for(let i = 0; i < nodeList.length; i++){
						if(nodeList[i].id == (teamStr + '0')){
							nodeList[i].id = (teamStr + String(player));
							nodeList[i].innerText = (PS.getGradeTag(player) + SYS.showPlayerInfo(player));
							nodeList[i].style.minHeight = "12px";
							return true;
						}
					}
					return false;
				}
				this.updateListIndex		= function(player){		//									플레이어 리스트 갱신
					if(!PS.isValid(player) || player == 0) return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_PID);
					let parentsObj;
					switch(PS.getPlayer(player).team){
						case TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		break;
						case TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	break;
						case TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	break;
						default:				return SYS.sendError(SYS.ERROR_TYPE.E_PLAYER_INFO);
					}
					let nodeList = parentsObj.getElementsByTagName("pre");
					for(let i = 3; i < nodeList.length; i++){
						let indexId = nodeList[i].id;
						indexId = parseInt(indexId.substr(1));
						if(indexId == player){ 
							let inTxt; 
							if(PS.getPlayer(player).isSleep){		//	상태: 잠수
								if(inTxt)	inTxt += "😴";
								else		inTxt = "😴";
							}
							if(PS.getPlayer(player).isMute){		//	상태: 채팅 금지
								if(inTxt)	inTxt += "🤬";
								else		inTxt = "🤬";
							}
							nodeList[i].innerText = inTxt ? inTxt : null;
							nodeList[i].innerText += (PS.getGradeTag(player) + SYS.showPlayerInfo(player));
							return true;
						}
					}
					return false;
				}
				this.updateWebGUI			= function(){			//									그래픽 유저 인터페이스 실시간 정보 갱신
					//	접속자 정보 계산
					let seatList = [iframeEle.getElementById("seatFull"), iframeEle.getElementById("seatEmpty")];
					GM.reorderPlayers();			//	플레이어 데이터베이스 순번 정렬
					for(let i = 0; i < MAXPLAYERS; i++){
						for(let j = 0; j < 2; j++) seatList[j].innerText = ' ';									//	빈 칸으로 초기화
						for(let j = 0; j < PS.cntPlayers(); j++)			seatList[0].innerText += '■';		//	접속 칸
						for(let j = MAXPLAYERS; j > PS.cntPlayers(); j--)	seatList[1].innerText += '□';		//	미접속 칸
					}
					//	점수 정보 - 현재 경기 판정 골(누적 경기 판정 골)
					let scoreList = [iframeEle.getElementById("scoreCore"), iframeEle.getElementById("scoreRed"), iframeEle.getElementById("scoreBlue")];
					for(let i = 0; i < scoreList.length; i++) scoreList[i].innerText = ' ';
					switch(GM.getGameStats()){		//	0: 경기 예정	|	1: 경기 시작	|	2: 경기 진행	|	3: 경기 중단
						case 0:	scoreList[TEAM.SPECTATOR].innerText = "경기 예정";	break;
						case 3: scoreList[TEAM.SPECTATOR].innerText = "경기 중단";	break;
						case 2:
							scoreList[TEAM.SPECTATOR].innerText	= (GM.cntMatch() + "번째 경기");
							scoreList[TEAM.RED].innerText		= (SC.getCurrentGoals(TEAM.RED).toString() + '(' + SC.getTotalGoals(TEAM.RED) + ')');
							scoreList[TEAM.BLUE].innerText		= (SC.getCurrentGoals(TEAM.BLUE).toString() + '(' + SC.getTotalGoals(TEAM.BLUE) + ')');
							break;
					}
					return false;
				}
				this.clearListIndex 		= function(player){			//								플레이어 리스트 제거
					if(!PS.isValid(player)) return this.sendError(m_ERROR_TYPE.E_PLAYER_PID);
					let parentsObj, teamStr;
					switch(PS.getPlayer(player).team){
						case TEAM.RED:			parentsObj = iframeEle.getElementById("redTd");		teamStr = 'r';	break;
						case TEAM.BLUE:			parentsObj = iframeEle.getElementById("blueTd");	teamStr = 'b';	break;
						case TEAM.SPECTATOR:	parentsObj = iframeEle.getElementById("specTd");	teamStr = 's';	break;
						default: return this.sendError(m_ERROR_TYPE.E_ETC);
					}
					SYS.updateWebGUI();
					let nodeList = parentsObj.getElementsByTagName("pre");
					for(let i = 0; i < nodeList.length; i++){				//	플레이어 ID 찾기
						if(nodeList[i].id){
							let indexId = nodeList[i].id;
							if(indexId.substr(1) == player){
								nodeList[i].id = teamStr + '0';
								nodeList[i].innerText = null;
								nodeList[i].style.minHeight = "0vh";
								return true;
							}
						}
					}
					return false;
				}
				this.showInfo				= function(){					//							저작물 및 버전 출력
					return ("서버 버전: " + versionRoom 
						+ ' | ' + "UMUX 버전: " + versionUMUX
						+ ' | '	+ "UMUX 보안 패치 수준: " + securityPatchLevel
						+ SYS.newLine + "Powered by UMUX");			//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
				}
				this.showPlayerInfo			= function(player, type){		//							플레이어 ID&닉네임 출력
					if(!PS.isValid(player) || player == 0) return this.sendError(m_ERROR_TYPE.E_PLAYER_PID);
					switch(type){
						case 1: case "local": 
							return ('(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' 
							+ (CS.hasSpace(PS.getPlayer(player).name) ? "공백" : PS.getPlayer(player).name));
						case 2: case "public":
							return ('(' + player + ')' 
							+ (CS.hasSpace(PS.getPlayer(player).name) ? "공백" : PS.getPlayer(player).name));
						case 3: case "name":
							return (CS.hasSpace(PS.getPlayer(player).name) ? "공백" : PS.getPlayer(player).name);
					}
					return (player + '(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' 
					+ (CS.hasSpace(PS.getPlayer(player).name) ? "공백" : PS.getPlayer(player).name));
				}
				this.lockPassword			= function(bool){							//				비밀번호 고정
					if(PASSWORD == " ") return false;
					if((bool == true)||(bool == false)){ 
						lockPass = bool;
						SYS.log(false, "비밀번호 고정 장치가 " + (lockPass == true ? "활성화" : "비활성화") + "됨.", SYS.LOG_TYPE.NOTICE);
						return true;
					}
					return this.sendError(m_ERROR_TYPE.E_ETC);
				}
				this.log					= function(io, msg, type){					//				로그 전달
					if(!msg) return false;											//	빈 메시지 확인
					let timeStatus = TM.showCurrentTime() + (io ? ' ▶ ' : ' ◀ '); 	//	시간 및 입출력 확인
					switch(type){													//	로그 유형 지정
						case m_LOG_TYPE.NOTICE:			//	고지
							return outputLogMsg(msg, timeStatus, "#8ED2AB");
						case m_LOG_TYPE.BELL:			//	공지
							return outputLogMsg(msg, timeStatus, "#FFE400");
						case m_LOG_TYPE.SEND:			//	송신
							return outputLogMsg(msg, timeStatus, "#8B8B8B");
						case m_LOG_TYPE.BINDING:		//	수신
							return outputLogMsg(msg, timeStatus, "#587489");
						case m_LOG_TYPE.WARNING:		//	경고
							return outputLogMsg(msg, timeStatus, "#E6C78B", "#332B00");
						case m_LOG_TYPE.ERROR:			//	오류
							return outputLogMsg(msg, timeStatus, "#FF0000", "#6D3522");
						case m_LOG_TYPE.NORMAL:			//	기본
						default: return outputLogMsg(msg, timeStatus);
					}
				}
				this.print					= (msg, target) => printMsg(msg, target);	//				서버 메시지 출력
				this.sendError 				= function(type){							//				오류 출력
					let msg = "알 수 없는 ";
					switch(type){
						case m_ERROR_TYPE.E_PLAYER_INFO:
							msg = "플레이어의 데이터를 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_AUTH:
							msg = "플레이어의 네트워크를 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_CONN:
							msg = "플레이어의 주소를 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_PID:
							msg = "플레이어의 공용 ID를 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_LID:
							msg = "플레이어의 로컬 ID를 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_ADMIN:
							msg = "플레이어의 권한을 읽을 수 없는 "
							break;
						case m_ERROR_TYPE.E_PLAYER_NAME:
							msg = "플레이어의 이름을 읽을 수 없는 "
							break;
					}
					NC.caution(msg + "문제가 발생하였습니다.");
					return SYS.log(false, msg + "오류가 발생함", SYS.LOG_TYPE.ERROR);
					
				}
			}
		}
		const GM 	= new GameManager();		//	게임 매니저 클래스
		const AMN	= new Administration();		//	관리 클래스
		const NC 	= new Notification();		//	알림 클래스
		const CS 	= new ChatSystem();			//	채팅 시스템 클래스
		const CM 	= new Commands();			//	명령어 클래스
		const PS 	= new Player();				//	플레이어 클래스
		const SC	= new Scores();				//	점수 클래스
		const TM 	= new TimeManager();		//	시간 관리 클래스
		const SYS	= new IoSystem();			//	시스템 클래스
		const room	= ROOM;
		const TEAM	= Object.freeze({SPECTATOR : 0, RED : 1, BLUE : 2});
		//----------------------------------------------------------------------------------------------------------------------------
		//	명령어
		//----------------------------------------------------------------------------------------------------------------------------
		//	*내부 명령어*
		//	UMUX 내부 시스템을 접근하는 명령어입니다.
		//	기존 명령어 삭제 및 신규 명령어 추가는 금지합니다.
		//	기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
		const internalCommands = {
			"!!0314" : AMN.logonAdmin,		    //	권한 로그인
												//	권한 로그인(오타)
			"!!" : AMN.missPassword,

			"!kick": CM.comKick, "!킥": CM.comKick, "!강제퇴장": CM.comKick, "!퇴장": CM.comKick, "!강퇴": CM.comKick, "!ㅏㅑ차": CM.comKick, "!zlr": CM.comKick, "!rkdwpxhlwkd": CM.comKick, "!xhlwkd": CM.comKick, "!rkdxhl": CM.comKick, 
			"!rr": AMN.resetGame, "!ㄱㄱ": AMN.resetGame,"!리": AMN.resetGame, "!re": AMN.resetGame,	//	다시 시작
			"!r" : AMN.swapGame, "!ㄱ" : AMN.swapGame,  "!고" : AMN.swapGame, 							//	자동 재시작
			"!clear_bans" : CM.comClearBans, "!clearbans" : CM.comClearBans, "!밴_클리어" : CM.comClearBans, "!밴클리어" : CM.comClearBans, "!밴클" : CM.comClearBans, "!칟ㅁㄱ_ㅠ무" : CM.comClearBans, "!칟ㅁㄱ규무" : CM.comClearBans,  		//	영구 퇴장 명단 초기화
																										//	채팅창 얼리기/녹이기
			"!freeze" : CM.comFreezeChat, "!ㄺㄷㄷㅋㄷ" : CM.comFreezeChat, "!얼리기" : CM.comFreezeChat, "!얼기" : CM.comFreezeChat, "!채팅얼기" : CM.comFreezeChat, "!채팅얼리기" : CM.comFreezeChat, "!djfflrl" : CM.comFreezeChat , "!djfrl" : CM.comFreezeChat , "!coxlddjfrl" : CM.comFreezeChat , "!coxlddjfflrl" : CM.comFreezeChat , 
			"!unfreeze" : CM.comUnfreezeChat, "!ㅕㅜㄺㄷㄷㅋㄷ" : CM.comUnfreezeChat, "!녹기" : CM.comUnfreezeChat, "!녹이기" : CM.comUnfreezeChat, "!채팅녹기" : CM.comUnfreezeChat, "!채팅녹이기" : CM.comUnfreezeChat, "!shrrl" : CM.comUnfreezeChat, "!shrdlrl" : CM.comUnfreezeChat, "!coxldshrrl" : CM.comUnfreezeChat, "!coxldshrdlrl" : CM.comUnfreezeChat, 

			//	팀 유니폼
			"!colors" : CM.setTeamColors, "!color" : CM.setTeamColors, "!uniform" : CM.setTeamColors, "!컬러" : CM.setTeamColors, "!유니폼" : CM.setTeamColors, "!ㅋㄹ" : CM.setTeamColors, "!ㅇㄴㅍ" : CM.setTeamColors, "!채ㅣㅐㄱㄴ" : CM.setTeamColors, "!채ㅣㅐㄱ" : CM.setTeamColors,"!ㅕㅜㅑ래그" : CM.setTeamColors,"!zjffj" : CM.setTeamColors,"!dbslvha" : CM.setTeamColors,
			"?colors" : CM.setTeamColors, "?color" : CM.setTeamColors, "?uniform" : CM.setTeamColors, "?컬러" : CM.setTeamColors, "?유니폼" : CM.setTeamColors, "?ㅋㄹ" : CM.setTeamColors, "?ㅇㄴㅍ" : CM.setTeamColors, "?채ㅣㅐㄱㄴ" : CM.setTeamColors, "?채ㅣㅐㄱ" : CM.setTeamColors,"?ㅕㅜㅑ래그" : CM.setTeamColors,"?zjffj" : CM.setTeamColors,"?dbslvha" : CM.setTeamColors,
			"!clear_color" : CM.comClearTeamColors, "!clear_uniform" : CM.comClearTeamColors, "!클리어_유니폼" : CM.comClearTeamColors, "!초기화_유니폼" : CM.comClearTeamColors, "!유니폼_초기화" : CM.comClearTeamColors, "!클리어_유니폼" : CM.setTeamColors, "!유니폼_클리어" : CM.comClearTeamColors, "!clearcolor" : CM.comClearTeamColors, "!clearuniform" : CM.comClearTeamColors, "!클리어유니폼" : CM.comClearTeamColors, "!초기화유니폼" : CM.comClearTeamColors, "!유니폼초기화" : CM.comClearTeamColors, "!클리어유니폼" : CM.setTeamColors, "!유니폼클리어" : CM.comClearTeamColors,
			"?clear_color" : CM.comClearTeamColors, "?clear_uniform" : CM.comClearTeamColors, "?클리어_유니폼" : CM.comClearTeamColors, "?초기화_유니폼" : CM.comClearTeamColors, "?유니폼_초기화" : CM.comClearTeamColors, "?클리어_유니폼" : CM.setTeamColors, "?유니폼_클리어" : CM.comClearTeamColors, "?clearcolor" : CM.comClearTeamColors, "?clearuniform" : CM.comClearTeamColors, "?클리어유니폼" : CM.comClearTeamColors, "?초기화유니폼" : CM.comClearTeamColors, "?유니폼초기화" : CM.comClearTeamColors, "?클리어유니폼" : CM.setTeamColors, "?유니폼클리어" : CM.comClearTeamColors,

			//	팀 이동 제한(전체)
			"!lock_join" : CM.comTeamsLock, "!join_lock" : CM.comTeamsLock, "!조인_락" : CM.comTeamsLock, "!락_조인" : CM.comTeamsLock, "!ㅣㅐ차_ㅓㅐㅑㅜ" : CM.comTeamsLock, "!ㅓㅐㅑㅜ_ㅣㅐ차" : CM.comTeamsLock, "!whdls_flr" : CM.comTeamsLock, "!fkr_whdls" : CM.comTeamsLock, 
			"!lock_host" : CM.comPinHost, "!host_lock" : CM.comPinHost, "!락_호스트" : CM.comPinHost, "!호스트_락" : CM.comPinHost, "!ㅣㅐ차_ㅙㄴㅅ" : CM.comPinHost, "!ㅙㄴㅅ_ㅣㅐ차" : CM.comPinHost, "!fkr_ghtmxm" : CM.comPinHost, "!ghtmxm_fkr" : CM.comPinHost, 

			"!set_pw": AMN.setPassword,"!set_password": AMN.setPassword,																//	비번 설정
			"!clear_pw": AMN.clearPassword,"!clear_password": AMN.clearPassword,														//	비번 해제
			"!show_pw": AMN.showPassword,"!show_password": AMN.showPassword, "?pw": AMN.showPassword, "?password": AMN.showPassword,	//	비번 출력
			"!score" : AMN.setScore, "!ㄴ책ㄷ" : AMN.setScore, "!스코어" : AMN.setScore, "!점수" : AMN.setScore, "!smzhdj" : AMN.setScore, "!wjatn" : AMN.setScore,		//	점수 제한
			"?score" : AMN.setScore, "?ㄴ책ㄷ" : AMN.setScore, "?스코어" : AMN.setScore, "?점수" : AMN.setScore, "?smzhdj" : AMN.setScore, "?wjatn" : AMN.setScore,
			"!time" : AMN.setTime, "!타임" : AMN.setTime, "!시간" : AMN.setTime, "!샤ㅡㄷ" : AMN.setTime, "!xkdla" : AMN.setTime, "!tlrks" : AMN.setTime,				//	시간 제한
			"?time" : AMN.setTime, "?타임" : AMN.setTime, "?시간" : AMN.setTime, "?샤ㅡㄷ" : AMN.setTime, "?xkdla" : AMN.setTime, "?tlrks" : AMN.setTime,
			"!load" : CM.loadMap, "!map" : CM.loadMap, "!로드" : CM.loadMap, "!맵" : CM.loadMap, "!ㅣㅐㅁㅇ" : CM.loadMap, "!fhem" : CM.loadMap, "!ㅡ메" : CM.loadMap,	//	기본 내장맵
			"!도배방지" : CM.alertSpam, "!도배" : CM.alertSpam, "!도" : CM.alertSpam, "!ehqo" : CM.alertSpam,	//	도배 방지 문자
			"!mute" : CM.comMute, "!ㅡㅕㅅㄷ" : CM.comMute, "!채금" : CM.comMute,								//	채팅 금지
			"?mute" : CM.comMute, "?ㅡㅕㅅㄷ" : CM.comMute, "?채금" : CM.comMute,
			"!unmute": CM.comUnmute, "!ㅕㅜㅡㅕㅅㄷ": CM.comUnmute, 											//	채팅 허용
			"?unmute": CM.comUnmute, "?ㅕㅜㅡㅕㅅㄷ": CM.comUnmute,
			"!rec" : CM.comRecording, "!녹화" : CM.comRecording, "!shrghk" : CM.comRecording,					//	녹화 시작&종료

			//	서버 정보
			"!about" : CM.infoRoom, "!aboutinfo" : CM.infoRoom, "!info" : CM.infoRoom,
			"!aboutver" : CM.infoRoom,"!verinfo" : CM.infoRoom,"!version" : CM.infoRoom,"!버전" : CM.infoRoom, "!ver" : CM.infoRoom, "!정보" : CM.infoRoom,

			//	이스터 에그
			"!대깨알" : CM.dka, "!대가리" : CM.dka, "!알파고" : CM.dka, 
		}

		//	*표준 명령어*
		//	UMUX 표준 명령어입니다.
		//	기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
		//	기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
		const standardCommands = {
			//	종합 도움말
			"!help": CM.helpCom, "!헬프": CM.helpCom, "!도움": CM.helpCom, "!명령" : CM.helpCom, "!명령어" : CM.helpCom, "!ㅗ디ㅔ" : CM.helpCom, "!gpfvm" : CM.helpCom,
			"!bothelp" : CM.helpBot, "!봇헬프" : CM.helpBot, "!봇방" : CM.helpBot, "!봇방도움말" : CM.helpBot, "!ㅠㅐ소디ㅔ" : CM.helpBot, "!봇" : CM.helpBot,  "!qht" : CM.helpBot, "!qht" : CM.helpBot, "!about" : CM.helpBot, 
			"!chathelp" : CM.helpChat, "!채팅" : CM.helpChat, "!챗" : CM.helpChat, "!챗헬프" : CM.helpChat, "!채팅명령어" : CM.helpChat, "!챗도움" : CM.helpChat, "!챗도움말" : CM.helpChat, "!촘소디ㅔ" : CM.helpChat,
			"!joinhelp" : CM.helpJoin, "!enterhelp" : CM.helpJoin, "!helpenter" : CM.helpJoin, "투입" : CM.helpJoin, "투입?" : CM.helpJoin, "투입!" : CM.helpJoin, "투입해" : CM.helpJoin, "투입하셈" : CM.helpJoin, "투입요" : CM.helpJoin, "투입좀시켜라" : CM.helpJoin, "넣어" : CM.helpJoin, "넣어줘" : CM.helpJoin,"넣어라" : CM.helpJoin,"넣어봐라" : CM.helpJoin,"넣어주세요" : CM.helpJoin, "투입해주세요" : CM.helpJoin, "껴줘": CM.helpJoin, "투입해드려" : CM.helpJoin, "투입명령어" : CM.helpJoin, "투입도움말" : CM.helpJoin,
			"!maphelp" : CM.helpMap, "!맵도움" : CM.helpMap, "!맵도움말" : CM.helpMap, "!맵헬프" : CM.helpMap, "!유즈맵" : CM.helpMap, "!유즈맵도움말" : CM.helpMap, "!ㅡ메ㅗ디ㅔ" : CM.helpMap, 
			"!rankhelp": CM.helpRank,"!helprank": CM.helpRank,"!랭크헬프": CM.helpRank,"!헬프랭크": CM.helpRank,"!랭크도움말": CM.helpRank,
			"!scorehelp" : CM.helpScore, "!helpscore" : CM.helpScore, "!점수도움" : CM.helpScore, "!스코어헬프" : CM.helpScore, "!ㄴ책도디ㅔ" : CM.helpScore, "!wjatnehdna" : CM.helpScore, 
			"!mischelp" : CM.helpMisc, "!etchelp" : CM.helpMisc, "!기타헬프" : CM.helpMisc, "!기타도움" : CM.helpMisc, "!기타도움말" : CM.helpMisc, "!기타" : CM.helpMisc, "!ㄷㅅ초디ㅔ" : CM.helpMisc, "!ㅡㅑㄴ초디ㅔ" : CM.helpMisc, 

			//	채팅(전체, 팀별, 개인)
			"!a": CS.setAllChat, "!올" : CS.setAllChat, "!전체" : CS.setAllChat, "!전" : CS.setAllChat, "!ㅁ": CS.setAllChat, "!all": CS.setAllChat, "!wjscp": CS.setAllChat, "!wjs": CS.setAllChat, 
			"!t" : CS.setTeamChat, "!팀" : CS.setTeamChat, "!ㅅ" : CS.setTeamChat, "!ㅌ" : CS.setTeamChat, "!xla" : CS.setTeamChat, "!x" : CS.setTeamChat, 
			"?t" : CS.setTeamChat, "?팀" : CS.setTeamChat, "?ㅅ" : CS.setTeamChat, "?ㅌ" : CS.setTeamChat, "?xla" : CS.setTeamChat, "?x" : CS.setTeamChat, 
			"!e" : CS.setWhisperChat, "!귓" : CS.setWhisperChat, "!ㄷ" : CS.setWhisperChat,	
			"?e" : CS.setWhisperChat, "?귓" : CS.setWhisperChat, "?ㄷ" : CS.setWhisperChat,	

			//	등번호 설정 및 초기화
			"!avatar": PS.setAvatar, "!아바타": PS.setAvatar, "!ㅇㅂㅌ": PS.setAvatar, "!ㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!등번호": PS.setAvatar, "!emdqjsgh": PS.setAvatar, 
			"!clear_avatar": PS.resetAvatar, "!reset_avatar": PS.resetAvatar, "!avatar_clear" : PS.resetAvatar, "!클리어_아바타": PS.resetAvatar, "!ㅋㄹㅇ_ㅇㅂㅌ": PS.resetAvatar, "!칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ": PS.resetAvatar, "!리셋_아바타": PS.resetAvatar, "!clearavatar": PS.resetAvatar, "!resetavatar": PS.resetAvatar, "!클리어아바타": PS.resetAvatar, "!아바타클리어": PS.resetAvatar, "!ㅋㄹㅇㅇㅂㅌ": PS.resetAvatar, "!칟ㅁㄱㅁㅍㅁㅅㅁㄱ": PS.resetAvatar, "!리셋아바타": PS.resetAvatar, "!초기화아바타": PS.resetAvatar, "!아바타초기화": PS.resetAvatar, "!초기화_아바타": PS.resetAvatar, "!아바타_초기화": PS.resetAvatar,

			//	채팅 모드 설정
			"!chatmode": CM.comChatMode, "!촘스ㅐㅇㄷ": CM.comChatMode, "!챗모드": CM.comChatMode, "!채팅모드": CM.comChatMode, "!챗": CM.comChatMode, "!채팅": CM.comChatMode, "!cotahem": CM.comChatMode, "!coxldahem": CM.comChatMode, "!cot": CM.comChatMode, "!coxld": CM.comChatMode, 
			"?chatmode": CM.comChatMode, "?촘스ㅐㅇㄷ": CM.comChatMode, "?챗모드": CM.comChatMode, "?채팅모드": CM.comChatMode, "?챗": CM.comChatMode, "?채팅": CM.comChatMode, "?cotahem": CM.comChatMode, "?coxldahem": CM.comChatMode, "?cot": CM.comChatMode, "?coxld": CM.comChatMode, 

			//	수신 설정
			"!disrupt" : CM.comDisruptMode, "!방해금지모드" : CM.comDisruptMode, "!수신" : CM.comDisruptMode, "!얀겨ㅔㅅ" : CM.comDisruptMode, "!qkdgormawlahem" : CM.comDisruptMode, "!wtntls" : CM.comDisruptMode, 
			"?disrupt" : CM.comDisruptMode, "?방해금지모드" : CM.comDisruptMode, "?수신" : CM.comDisruptMode, "?얀겨ㅔㅅ" : CM.comDisruptMode, "?qkdgormawlahem" : CM.comDisruptMode, "?wtntls" : CM.comDisruptMode, 

			//	게임 참가 및 설정
			"!join" : CM.joinGame, "!enter" : CM.joinGame, "!참가" : CM.joinGame, "!참여" : CM.joinGame, "!입장" : CM.joinGame, "!투입" : CM.joinGame, "!조인" : CM.joinGame, "!참여" : CM.joinGame, "!ㅓㅐㅑㅜ" : CM.joinGame, "!둣ㄷㄱ" : CM.joinGame, "!ckark" : CM.joinGame, "!ckadu" : CM.joinGame, "!xndlq" : CM.joinGame, 
			"?join" : CM.joinGame, "?enter" : CM.joinGame, "?참가" : CM.joinGame, "?참여" : CM.joinGame, "?투입" : CM.joinGame, "?조인" : CM.joinGame, "?참여" : CM.joinGame, "?ㅓㅐㅑㅜ" : CM.joinGame, "?둣ㄷㄱ" : CM.joinGame, "?ckark" : CM.joinGame, "?ckadu" : CM.joinGame, "?xndlq" : CM.joinGame, 
			"!afk" : CM.comSleep, "!ㅁ라" : CM.comSleep, "!잠수" : CM.comSleep,

			//	전적 및 랭킹
			"!stats": CM.infoStats, "!stat": CM.infoStats, "!record": CM.infoStats, "!기록": CM.infoStats,  "!스탯": CM.infoStats, "!전적": CM.infoStats,  "!wjswjr": CM.infoStats,
			"?stats": CM.infoStats, "?stat": CM.infoStats, "?record": CM.infoStats, "?기록": CM.infoStats,  "?스탯": CM.infoStats, "?전적": CM.infoStats,  "?wjswjr": CM.infoStats,
			"!ranking": CM.infoRanking,"!랭킹": CM.infoRanking,"!랭": CM.infoRanking,"!순": CM.infoRanking,"!순위": CM.infoRanking,"!fodzld": CM.infoRanking, "!tnsdnl": CM.infoRanking, 
			"?ranking": CM.infoRanking,"?랭킹": CM.infoRanking,"?랭": CM.infoRanking,"?순": CM.infoRanking,"?순위": CM.infoRanking,"?fodzld": CM.infoRanking, "?tnsdnl": CM.infoRanking, 

			//	맵 정보
			"!maplist" : CM.infoMaps, "!cm" : CM.infoMaps, "!맵리스트" : CM.infoMaps,"!맵목록" : CM.infoMaps,"!map" : CM.infoMaps,"!맵" : CM.infoMaps,"!유즈맵" : CM.infoMaps,
		}

		//	*추가 명령어*
		//	UMUX 커스텀 명령어입니다.
		//	신규 명령어 추가에 적합하며, 권장합니다.
		var customCommands = {

		}
		//----------------------------------------------------------------------------------------------------------------------------
		//	room 객체 이벤트
		//----------------------------------------------------------------------------------------------------------------------------
		room.onPlayerJoin			= (player) => GM.onPlayerJoin(player);		//		플레이어 입장
		room.onPlayerLeave			= function(player){ 						//		플레이어 퇴장
			setTimeout(() => { GM.onPlayerLeave(player); }, 1);
		}
		room.onPlayerActivity		= (player) => PS.onPlayerActivity(player);	//		플레이어 동작 응답
																				//		플레이어 강제 퇴장
		room.onPlayerKicked			= (kickedPlayer, reason, ban, byPlayer) => AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);
		room.onPlayerAdminChange	= (player, byPlayer)	=> AMN.onPlayerAdminChange(player, byPlayer);	//	플레이어 권한 변경
		room.onStadiumChange		= (newMap, byPlayer)	=> GM.onStadiumChange(newMap, byPlayer);		//	맵 교체
		room.onPlayerChat			= (player, msg) 		=> CS.onPlayerChat(player, msg);				//	채팅 입력
		room.onRoomLink				= (url)		=> GM.onRoomLink(url);			//		링크 업로드(서버 불러오기)
		room.onPositionsReset		= ()		=> GM.onPositionsReset();		//		득실점 판정 직후 참가자 좌표 초기화
		room.onPlayerBallKick		= (player)	=> GM.onPlayerBallKick(player);	//		킥 판정
		room.onTeamGoal				= (team)	=> GM.onTeamGoal(team);			//		골 판정
																				//		킥 제한
		room.onKickRateLimitSet		= (min, rate, burst, player) => GM.onKickRateLimitSet(min, rate, burst, player);
		room.onPlayerTeamChange		= (player, byPlayer)	=> PS.onPlayerTeamChange(player, byPlayer);	//	팀 교체
		room.onTeamVictory			= (scores)				=> GM.onTeamVictory(scores);				//	팀 승리
		room.onGameStart			= () => GM.onGameStart();						//	게임 시작
		room.onGameTick				= () => GM.onGameTick();						//	게임 도중
		room.onGameStop				= () => GM.onGameStop();						//	게임 종료
		room.onGamePause			= (byPlayer) => GM.onGamePause(byPlayer);		//	게임 중단
		room.onGameUnpause			= (byPlayer) => GM.onGameUnpause(byPlayer);		//	게임 재개
