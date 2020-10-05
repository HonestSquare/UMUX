// API LEVEL: 9
//==========================================<UMUX C>==========================================
//	UMUX Beta Program(이하 UMBP)은 유즈맵 대표카페(이하 UM)에서 진행하고 있는 한국어화 유즈맵 봇방 프로젝트의 일환으로, 
//	사용자 인터페이스(UI)뿐만 아니라 플레이의 매사 모든 순간까지 아우르는 사용자 경험(UX)을 보다 빠르게 신버전을 체험해 볼 수 있는 프로그램입니다.
//	본 베타 프로그램에 참가 및 이용하라면 다음과 같은 조건에 따라야 합니다.
//
//	* 원저작자 표기
//	* 재배포 및 코드 수정 금지
//	* UMUX 버전 및 기반임을 표기
//	* UMUX Beta Program임을 확인할 수 있게 방제에도 표기
//	* 그 외 사항여기서 확인하십시오. 
//		github.com/HonestSquare/UMUX/wiki/UMUX-Beta-Program
//============================================================================================
const c = function(msg, target){
	if(!target){ 
		CS.sendMsg(" 외부 (0)🌐서버 매니저: " + msg + " (귓속말 답장: !e 0 답할 내용)", null); 
		return SYS.log(true, "전달: " + msg, SYS.logType.SEND);
	}
	switch(target){
		case "레드": case "red": case 'r':	return CS.sendTeamChat(TEAM.RED, 0, msg);
		case "블루": case "blue": case 'b':	return CS.sendTeamChat(TEAM.BLUE, 0, msg);
		case "관중": case "spct": case 's':	return CS.sendTeamChat(TEAM.SPECTATOR, 0, msg);
	}
	if(PS.getLocalId(target)) return CS.sendWhisperChat(target, 0, msg);
	return SYS.log(false, "타깃 조회 실패", SYS.logType.ERROR);
}
const stopbot = () => alert("서버 가동이 중단되었습니다." + SYS.newLine + "재가동하려면 확인 버튼을 누르십시오.");
//--------------------------------내장 맵--------------------------------
var maps		= new Array();
var mapsName	= new Array();
{
maps[0] = 
`{
	//	RELEASE_DATE:	2019/07/31
	//	MADE BY			정직한네모형™
	//	CODE_NAME:		CROP-MK
	//	MODEL_NAME:		Classic R
	//	VERSION:		Update 1(v1.10)
	//	SUPPORT_LEVEL:	
	//					1(1.0.0)/2(1.1.0)/3(1.1.1)/4(1.1.2)/5(2.0.0)/6(2.0.1)/7(2.1.0)/8(2.2.0)
	//	본 맵은 UMUX에 탑재된 기본 맵입니다. 
	//	UMUX 이외에 어떠한 용도의 수정 및 재배포 또는 사용이 가능하며 이에 따른 책임은 모두 이용자 본인에게 있습니다.
	"name" : "Classic Rop",

	"width" : 420,

	"height" : 200,

	"redSpawnPoints" : [ 
		[-90, 30], [-90,-30],[-200, 70], [-200, -70], [-200, 0], [-300, -30], [-300, 30], [-370, 0], [-480, 100],
	],

	"blueSpawnPoints" : [
		[90, 30], [90,-30],[200, 70], [200, -70], [200, 0], [300, -30], [300, 30], [370, 0], [480, -100],
	],

	"bg" : { "type" : "grass", "width" : 370, "height" : 170, "kickOffRadius" : 75, "cornerRadius" : 10 },

	"vertexes" : [
		/* 0 */ { "x" : -370, "y" : 160, "trait" : "ballArea" },
		/* 1 */ { "x" : -370, "y" : 64, "trait" : "ballArea" },
		/* 2 */ { "x" : -370, "y" : -64, "trait" : "ballArea" },
		/* 3 */ { "x" : -370, "y" : -160, "trait" : "ballArea", "vis" : false, "curve" : 90, "color" : "C7E6BD" },
		/* 4 */ { "x" : 370, "y" : 160, "trait" : "ballArea", "vis" : true, "curve" : 90, "color" : "C7E6BD" },
		/* 5 */ { "x" : 370, "y" : 64, "trait" : "ballArea" },
		/* 6 */ { "x" : 370, "y" : -64, "trait" : "ballArea" },
		/* 7 */ { "x" : 370, "y" : -160, "trait" : "ballArea", "vis" : false, "curve" : -90, "color" : "C7E6BD" },
		
		/* 8 */ { "x" : 0, "y" : 200, "trait" : "kickOffBarrier" },
		/* 9 */ { "x" : 0, "y" : 75, "trait" : "kickOffBarrier" },
		/* 10 */ { "x" : 0, "y" : -75, "trait" : "kickOffBarrier" },
		/* 11 */ { "x" : 0, "y" : -200, "trait" : "kickOffBarrier" },
		
		/* 12 */ { "x" : -380, "y" : -64, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 13 */ { "x" : -400, "y" : -44, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 14 */ { "x" : -400, "y" : 44, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 15 */ { "x" : -380, "y" : 64, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 16 */ { "x" : 380, "y" : -64, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 17 */ { "x" : 400, "y" : -44, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 18 */ { "x" : 400, "y" : 44, "trait" : "goalNet", "color" : "2E2E2E" },
		/* 19 */ { "x" : 380, "y" : 64, "trait" : "goalNet", "color" : "2E2E2E" },
		
		/* 20 */ { "x" : -370, "y" : 160, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : -90, "color" : "C7E6BD" },
		/* 21 */ { "x" : -360, "y" : 170, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : -90, "color" : "C7E6BD" },
		/* 22 */ { "x" : -360, "y" : -170, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 90, "color" : "C7E6BD" },
		/* 23 */ { "x" : 360, "y" : 170, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 90, "color" : "C7E6BD" },
		/* 24 */ { "x" : 360, "y" : -170, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : -90, "color" : "C7E6BD" },
		
		/* 25 */ { "x" : -350, "y" : 1830, "cMask" : ["wall" ], "cGroup" : ["wall" ] },
		/* 26 */ { "x" : 350, "y" : 1830, "cMask" : ["wall" ], "cGroup" : ["wall" ] }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "trait" : "ballArea" },
		{ "v0" : 2, "v1" : 3, "trait" : "ballArea" },
		{ "v0" : 4, "v1" : 5, "trait" : "ballArea" },
		{ "v0" : 6, "v1" : 7, "trait" : "ballArea" },
		
		{ "v0" : 12, "v1" : 13, "curve" : -90, "color" : "2E2E2E", "trait" : "goalNet" },
		{ "v0" : 13, "v1" : 14, "color" : "2E2E2E", "trait" : "goalNet" },
		{ "v0" : 14, "v1" : 15, "curve" : -90, "color" : "2E2E2E", "trait" : "goalNet" },
		{ "v0" : 16, "v1" : 17, "curve" : 90, "color" : "2E2E2E", "trait" : "goalNet" },
		{ "v0" : 17, "v1" : 18, "color" : "2E2E2E", "trait" : "goalNet" },
		{ "v0" : 18, "v1" : 19, "curve" : 90, "color" : "2E2E2E", "trait" : "goalNet" },
		
		{ "v0" : 8, "v1" : 9, "trait" : "kickOffBarrier" },
		{ "v0" : 9, "v1" : 10, "curve" : 180, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 9, "v1" : 10, "curve" : -180, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 10, "v1" : 11, "trait" : "kickOffBarrier" },
		
		{ "v0" : 20, "v1" : 21, "curve" : -90, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		{ "v0" : 3, "v1" : 22, "curve" : 90, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		{ "v0" : 4, "v1" : 23, "curve" : 90, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		{ "v0" : 7, "v1" : 24, "curve" : -90, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" }

	],

	"goals" : [
		{ "p0" : [-370,-64 ], "p1" : [-370,64 ], "team" : "red" },
		{ "p0" : [370,64 ], "p1" : [370,-64 ], "team" : "blue" }

	],

	"discs" : [
		{ "pos" : [-370,64 ], "color" : "F6CECE", "trait" : "goalPost" },
		{ "pos" : [-370,-64 ], "color" : "F6CECE", "trait" : "goalPost" },
		{ "pos" : [370,64 ], "color" : "CECEF6", "trait" : "goalPost" },
		{ "pos" : [370,-64 ], "color" : "CECEF6", "trait" : "goalPost" }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -170, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -170, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -200, "bCoef" : 0.1 },
		{ "normal" : [0,-1 ], "dist" : -200, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -420, "bCoef" : 0.1 },
		{ "normal" : [-1,0 ], "dist" : -420, "bCoef" : 0.1 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
		"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ] },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }

	}
}`
}
//-----------------------------------------------------------------------
// 방 초기 설정 
//-----------------------------------------------------------------------
// 방 이름
const	ROOMNAME 	= "[UMBP]새 방";
const	MAXPLAYERS 	= 12;				// 플레이어 최대 인원
const	PLAYERNAME 	= " ";				// 방장 이름(그대로 두는 걸 권장)
const	PUBLIC 		= true;				// 공개방 여부
// token; You can obtain it here: https://www.haxball.com/rs/api/getheadlesstoken
const	TOKEN		= "thr1.AAAAAF93FyR8voZCuzbmEQ.HRni1CR9p5I";
const	NOPLAYER	= true;			// 방장 여부(그대로 두는 걸 권장)
var		PASSWORD	= " ";				// 비밀번호
// 지역 코드, 위도, 경도(동적 좌표)
const CODE	= "kr";	
const LAT	= 37.566667 + (Math.floor(Math.random() * 4000) - 2000) * 0.0001;
const LON	= 126.978406 + (Math.floor(Math.random() * 4000) - 2000) * 0.0001;
// 비번방 설정
const INITROOM = str => {for(let i = 0; i < str.length; i++) return ((str.substr(i, 1)).search(" ") == -1) ? {roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : PLAYERNAME, password: str, public : PUBLIC, token : TOKEN, geo: { code: CODE, lat: LAT, lon: LON}, noPlayer : NOPLAYER} : {roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : PLAYERNAME, public : PUBLIC, token : TOKEN, geo: { code: CODE, lat: LAT, lon: LON}, noPlayer : NOPLAYER}}
const ROOM = HBInit(INITROOM(PASSWORD));
ROOM.setCustomStadium(maps[0]);
//ROOM.setDefaultStadium("Classic");
ROOM.setScoreLimit(0);
ROOM.setTimeLimit(0);
//=======================================================================
// 
//=======================================================================
const DEV = true;					// 개발 버전 설정
var date = new Date();
//-----------------------------------------------------------------------
// 게임 매니저 클래스
//-----------------------------------------------------------------------
class GameManager{													
	constructor(){
		let gameStats;											// 0: 정지, 1: 시작, 2: 게임 중
		let gameCount		= 0;								// 경기 횟수
		let error 			= false;							// 에러 여부(Bad actor)
		let stateRecording	= false;
		this.limitTime 		= 5;
		let	afkLimitTime	= 0;								// 장기 대기 플레이어 판정 최소 시간
		let link			= null;								// 링크
		this.onGameStart = function(){							// 게임 시작
			gameStats = 1;
			gameCount++;
			SC.addTouchedList(null);
			console.group("[자동진행시스템] 누적 경기 횟수: " + gameCount + "회");
			SYS.log(true, "게임 시작", SYS.logType.NOTICE);
			return false;
		}
		this.onGameTick = function(){							// 게임 도중
			let now = TM.getTime();
			if(gameStats != 2) gameStats = 2;
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(!PS.members[PS.getPublicId(i)]) break;
				if((PS.members[PS.getPublicId(i)].asleep == false)&&(PS.members[PS.getPublicId(i)].team != TEAM.SPECTATOR)){
					SC.updateTouchedList(PS.getPublicId(i));
					// 장기 대기 플레이어 판정(자동)
					if(GM.getAfkLimitTime()){
						if((now - PS.afkList[PS.getPublicId(i)]) > GM.getAfkLimitTime())
							AMN.setKick(PS.getPublicId(i), "비활동 플레이어");
					}
				}
			}
			if(AMN.getMagnetList(0)&&AMN.getMagnetList(1)){
				if(PS.getPosition(AMN.getMagnetList(0))){
					PS.setPosition(AMN.getMagnetList(1), 
						PS.getPosX(AMN.getMagnetList(0)), PS.getPosY(AMN.getMagnetList(0)));
				}
			}
			return false;
		}
		this.onGameStop = function(){							// 게임 종료
			gameStats = 0;
			SC.updateTotalGoals();
			SC.updateRanking();			// 랭킹 갱신
			SYS.log(true, "게임 종료", SYS.logType.NOTICE);
			console.groupEnd();
		}
		this.onGamePause = function(byPlayer){ 					// 게임 중단
			if(byPlayer.id) SYS.log(true, SYS.showPlayerInfo(byPlayer.id) + "(이)가 게임을 일시 중단함.", SYS.logType.NOTICE);
			else SYS.log(true, "게임 일시 중단.", SYS.logType.NOTICE);		// 외부 입력으로 실행되면 실행자 정보 가림
			return false;
		}	
		this.onGameUnpause 	= function(byPlayer){				// 게임 재개
			if(byPlayer.id) SYS.log(true, SYS.showPlayerInfo(byPlayer.id) + "(이)가 게임을 재개함.", SYS.logType.NOTICE);
			else SYS.log(true, "게임 재개.", SYS.logType.NOTICE);			// 외부 입력으로 실행되면 실행자 정보 가림
			return false;
		}
		this.onPlayerJoin = function(player) {					// 플레이어 입장
			//PS.cntPlayers++;
			PS.initMember(player);
			SC.initStatus(player.id);				// 전적 초기화
			SC.initRanking(player.id);				// 랭킹 초기화
			SC.updateRanking();						// 랭킹 갱신
			CS.sendMsg("This Room is Supported in Korean Language Only. :", player.id);		
			NC.devCheck(player);								// 개발자 버전 체크		
			PS.setAddress(player.id, player.conn);				// 공용 주소 부여
			PS.setNetwork(player.id, player.auth);				// 공용 네트워크 부여
			
			let name = SYS.showPlayerInfo(player.id, "name");
			let isUpdate = PS.updateAccount(player.id);
			// 사칭, 다중 접속, 블랙리스트 탐지
			if(AMN.filterPlayer(player.id) == true || AMN.checkBlacklists(player.id)){ 
				NC.manualUniMsg("경고", (name + "님은 관심 대상입니다."), player.id, null, "red", "gray");
				SYS.log(true, "입장: " + SYS.showPlayerInfo(player.id, "public") + "(블랙리스트)", SYS.logType.WARNING);
			}
			else{
				NC.announce("#" + player.id 
				+ (isUpdate == true ? " 다시 환영합니다, ": " 안녕하세요, ")
				+ name + "님! " + CM.recommendCom("유용할", "!help, !join"), player.id, null, "normal");;
				SYS.log(true, (isUpdate == true ? "재입장: ": "입장: ") + SYS.showPlayerInfo(player.id, "public"), SYS.logType.BELL);
			}
			if(PS.cntPlayers() <= 1){
				room.startGame();
				room.setPlayerTeam(player.id, 1);	
			}
			//else if(PS.getLocalId(player.id)) CS.sendHideChat(player.id, name + "님이 입장했습니다.", true);	// 안내 메시지
			PS.afkList[player.id] = TM.getTime();
			AMN.updateAdmins(player);
			SYS.log(true, "[자동진행시스템] 현재 방 접속 인원: " + PS.cntPlayers());
			return false;
		}
		this.onPlayerLeave = function(player){					// 플레이어 퇴장
			let name = SYS.showPlayerInfo(player.id, "name");
			if(AMN.kicked){										// 강제 퇴장 확인
				AMN.kicked = false;
				return false;
			}
			//NC.notice(name + "님이 떠났습니다.");
			if(AMN.checkBlacklists(player.id)) name = player.name + "(블랙리스트)";
			SYS.log(true, "퇴장: " + SYS.showPlayerInfo(player.id, "public"), SYS.logType.BELL);
			// 유저 목록 정리
			PS.updatePlayers(player.id);
			PS.clearMember(player);
			//PS.cntPlayers--;
			// 사람이 없으면 자동 종료
			PS.cntPlayers() > 0 ? AMN.updateAdmins(room.getPlayerList()[0]) : room.stopGame();
			SYS.log(true, "[자동진행시스템] 현재 방 접속 인원: " + PS.cntPlayers());
			return true;
		}
		this.onStadiumChange = function(newMap, byPlayer){		// 맵 교체
			if(PS.cntPlayers()){
				SYS.log(true, "맵 교체: " + newMap, SYS.logType.NOTICE);
				if(Math.floor(Math.random()*5) == 0){ 
					NC.msgCommand("시작", 
					"!r", byPlayer.id);
					NC.msgCommand("맵 저장",
					"/store", null);
				}
			}
		}
		this.onPositionsReset = function(){		 				// 좌표 초기화
			return false; 
		}
		this.onPlayerBallKick = function(player){ 				// 공 찼을 때
			SC.addTouchedList(player.id);
			SYS.log(true, "the ball kicked by " + SYS.showPlayerInfo(player.id));
			return false; 
		}
		this.onTeamGoal = function(team){ 						// 골 먹힐 때
			var time = SC.getGameTime();
			let teamMark = GM.getTeamMark(team);
			let procType;				// 자살골 판정 출력 메시지
			let procSymbol;
			time = Math.floor(time);
			time = TM.updateNums(Math.floor(time / 60), 2) + ':' + TM.updateNums(time % 60, 2);

			// 득점자 인식률 조정 및 어시스트 구하기
			let assistIndex = SC.getAssist();

			// 실점 판정
			if(PS.members[SC.getLastTouchedPlayer()] && PS.members[SC.getLastTouchedPlayer()].team != team){
				procType = "실점";
				if(team == TEAM.RED){			// 블루팀 > 블루팀
					teamMark = GM.getTeamMark(team + 1);
					procSymbol = (PS.mark[team + 5] + "➡" + PS.mark[team + 5]);
				}
				else if(team == TEAM.BLUE){		// 레드팀 > 레드팀
					teamMark = GM.getTeamMark(team - 1);
					procSymbol = (PS.mark[team + 3] + "➡" + PS.mark[team + 3]);
				}
			}
			else{
				procType = "득점";
				// 레드팀 > 블루팀
				if(team == TEAM.RED) procSymbol = (PS.mark[team + 4] + "➡" + PS.mark[team + 5]);
				// 블루팀 > 레드팀
				else if(team == TEAM.BLUE) procSymbol = (PS.mark[team + 4] + "➡" + PS.mark[team + 3]);

				if(assistIndex > 0){ 
					SC.setStatsAssist(assistIndex, SC.getStatsAssist(assistIndex) + 1);
				}
			}
			// 득점 판정(득점자 제외)
			if(!PS.members[SC.getLastTouchedPlayer()] || SC.getLastTouchedPlayer() == null){
				NC.announce(procSymbol + '|' + time + '| ' 
				+ teamMark + "이 " + procType + "했습니다.", 
				null, null, "small", "muted");
				return SYS.log(true, procSymbol + '|' + time + '| ' + teamMark + ' ' + procType);
			}

			// 점수 갱신
			if(procType == "득점") SC.setStatsGoal(SC.getLastTouchedPlayer(), SC.getStatsGoal(SC.getLastTouchedPlayer()) + 1);
			else SC.setStatsOG(SC.getLastTouchedPlayer(), SC.getStatsOG(SC.getLastTouchedPlayer()) + 1);
			// 랭킹 갱신
			SC.updateRanking();

			// 득점 판정(득점자 포함)
			NC.announce(procSymbol + '|' + time + "| " 
			+ SYS.showPlayerInfo(SC.getLastTouchedPlayer(), "name") + "님이 " 
			+ procType + "했습니다." 
			+ (((assistIndex > 0)&&(procType == "득점")) ? (SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assistIndex, "name") + ')') : ''), 
			null, null, "small", "muted");
			SYS.log(true, procSymbol + '|' + time + '| ' 
			+ teamMark + ' ' + procType + ': ' + SYS.showPlayerInfo(SC.getLastTouchedPlayer())
			+ (((assistIndex > 0)&&(procType == "득점")) ? (SYS.newLine + '(' + "도움: " + SYS.showPlayerInfo(assistIndex) + ')') : ''));
			// 선두자 목록 모두 지우기
			SC.clearTouchedList();
			return false; 
		}
		this.onTeamVictory = function(scores){ 					// 팀 승리
			SYS.log(true, "[경기 종료]", SYS.logType.NOTICE);
			switch(SC.getWinner()){
				case TEAM.RED:			// 레드팀 승
					for(let i = 1; i <= PS.cntPlayers(); i++){
						if(PS.members[PS.getPublicId(i)].team == TEAM.RED) 
							SC.setStatsWin(PS.getPublicId(i), SC.getStatsWin(PS.getPublicId(i)) + 1);
						else 
							SC.setStatsLost(PS.getPublicId(i), SC.getStatsLost(PS.getPublicId(i)) + 1);
					}
					break;
				case TEAM.BLUE:			// 블루팀 승
					for(let i = 1; i <= PS.cntPlayers(); i++){
						if(PS.members[PS.getPublicId(i)].team == TEAM.BLUE) 
							SC.setStatsLost(PS.getPublicId(i), SC.getStatsLost(PS.getPublicId(i)) + 1);
						else 
							SC.setStatsWin(PS.getPublicId(i), SC.getStatsWin(PS.getPublicId(i)) + 1);
					}
					break;
				case 3:			// 무승부
					return false;
			}
			SC.updateRanking();			// 랭킹 갱신
			NC.announce(
			"[경기 종료]"
			+ SYS.newLine + GM.getTeamMark(SC.getWinner()) + "이 승리하였습니다.", 
			null, "yellow", "small-bold", "muted");
			SYS.log(true, GM.getTeamMark(SC.getWinner()) + " 승리", SYS.logType.NOTICE);
			return false;
		}
		this.onRoomLink = function(address){					// 링크 획득(서버 가동)
			GM.setLink(address);
			if(!SYS.getServer()) return SYS.initServer();
			NC.info(address);
			NC.notice("서버자동방어 시스템 가동중");
			SYS.log(true, "서버 복구 완료", SYS.logType.NOTICE);
			SYS.setRequireRecaptcha(true);
			SYS.log(true,
			SYS.newLine + "DDoS 공격 방지를 위해 reCAPTCHA가 자동으로 활성화되었습니다." 
			+ SYS.newLine + "콘솔 입력창에 아래와 같은 코드를 작성하여 수동으로 해제할 수 있지만, 권장하지 않습니다."
			+ SYS.newLine + "SYS.setRequireRecaptcha(false);",
			SYS.logType.WARNING);
		}
		this.onKickRateLimitSet = function(						// 킥 제한 설정
			min, rate, burst, player){
				room.setKickRateLimit(min, rate, burst);
				NC.notice("최소: " + min + ' '
				+ "비율: " + rate + ' '
				+ "burst: " + burst + ' ');
				return false;
		}
		this.initMapsInfo = function(){							// 맵 정보 초기화
			for(let i = 0; i < maps.length; i++){
				if(maps[i]){
					let sPos = (maps[i].indexOf("\"name\" : ") + 10);
					let ePos = (maps[i].indexOf('\"', sPos + 1));
					mapsName[i] = maps[i].substr(sPos, ePos - sPos);
				}
				else mapsName[i] = "비어 있음";
			}
			return false;
		}
		this.getTeamMark = function(num){						// 팀 상태(숫자>문자열)
			switch(num){
				case TEAM.SPECTATOR:	return "관중석";
				case TEAM.RED:			return "레드팀";
				case TEAM.BLUE:			return "블루팀";
			}
			return false;
		}
		this.getGameStats		= () => gameStats;
		this.getStateRecording	= () => stateRecording;
		this.getAfkLimitTime	= () => afkLimitTime;			// 장기 대기 판정 최소 시간 구하기
		this.getLink			= () => link;					// 링크 얻기
		this.setAfkLimitTime = function(time){ 					// 장기 대기 판정 최소 시간 지정
			if((afkLimitTime == 0)&&(time < 10)) return SYS.log(false, "올바르지 않는 값으로 접근됨", SYS.logType.WARNING);
			if(afkLimitTime == time) return SYS.log(false, "중복된 값으로 접근됨", SYS.logType.WARNING);
			if(afkLimitTime < 0) return SYS.log(false, "음수의 값으로 접근할 수 없음", SYS.logType.WARNING);
			if(time >= 10){
				afkLimitTime = time;
				NC.uniMsg(null, "비활동 상한 시간이 " + afkLimitTime + "초로 변경되었습니다.");
				SYS.log(true, "비활동 상한 시간이 " + afkLimitTime + "초로 변경됨.", SYS.logType.NOTICE);
			}
			else{
				afkLimitTime = 0;
				NC.uniMsg(null, "비활동 상한 시간이 비활성화되었습니다.");
				SYS.log(true, "비활동 상한 시간이 비활성화됨.", SYS.logType.NOTICE);
			}
			return time;
		}
		this.setLink = function(address){ link = address; }		// 링크 설정
		this.reorderPlayers = function(indexList, moveToTop){	// 플레이어 재정렬
			room.reorderPlayers(indexList, moveToTop);
		}
		this.checkPublicId = function(index, player){			// #ID 판별
			let startPos = index.indexOf('\#');
			let num = parseInt(index.substr(startPos + 1));		// 번호 저장

			if(startPos == -1) return NC.caution("\#을 포함하십시오.", player);
			if((num <= 0) || (num > PS.members.length)) return NC.caution("범위를 벗어난 ID입니다.", player);
			if(!PS.getLocalId(num)) return NC.caution("해당 ID를 가진 플레이어가 없습니다.", player);
			return num;
		}
		this.checkError = () => error;							// 에러 여부
		this.sendError = function(value){ error = value; }		// 에러 전송
		this.startRecording = function(){ 						// 녹화 시작
			if(stateRecording) stopRecording();
			stateRecording = true;
			room.startRecording();
			NC.announce('🎦' + TM.showNormalTime() + "녹화 시작", null, "yellow", "small-bold", "muted");
			SYS.log(true, "녹화 시작", SYS.logType.NOTICE);
			return false;
		}
		this.stopRecording = function(){ 						// 녹화 종료
			let file = room.stopRecording();
			stateRecording = false;
			if(file){
				NC.announce('⏸'+ TM.showNormalTime() + "녹화 종료", null, "yellow", "small-bold", "muted");
				SYS.log(true, "녹화 종료", SYS.logType.NOTICE);
			}
			else{
				SYS.log(true, "예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.", SYS.logType.ERROR);
			}
			return file;
		}
	}
}
//-----------------------------------------------------------------------
// 관리 클래스
//-----------------------------------------------------------------------
class Administration{												
	constructor() {
		this.kicked 			= false;				// 강제 퇴장 여부
		this.dynamicAdmin 		= true;	 				// 권한 동적 할당
		this.teamsLock 			= false;				// 팀 자율 이동 금지
		let hostLock 			= true;					// 방장 팀 이동 허용 여부
		let magnetList			= [null, null];
		this.onPlayerAdminChange = function(player, byPlayer){							//	플레이어 권한 획득&해제
			let newAdmin = SYS.showPlayerInfo(player.id, "name");
			let procType = player.admin == true ? "부여" : "박탈";

			if(player.admin == true){			// 권한 획득
				if(AMN.checkBlacklists(player.id)) return AMN.setSubAdmin(player.id);				// 블랙리스트이면 보조 권한만 부여
				PS.members[player.id].sub_admin == false;
			}
			else{								// 권한 해제
				return AMN.setSubAdmin(player.id)						// 보조 권한 부여
			}
			if(byPlayer == undefined){
				NC.notice(newAdmin + "님은 권한이 " + procType + "되었습니다. ", null, "!adminhelp");
				SYS.log(true, SYS.showPlayerInfo(player.id) + "(은)는 권한이 " + procType + "됨.", SYS.logType.BELL);
			}
			else{
				let byAdmin = SYS.showPlayerInfo(byPlayer.id, "name");
				NC.notice(byAdmin + "님이 " + newAdmin + "님의 권한을 " + procType + "했습니다. ", null, "!adminhelp");
				SYS.log(true, SYS.showPlayerInfo(byPlayer.id) + "(이)가 " + SYS.showPlayerInfo(player.id) + "(이)의 권한을 " + procType + "함.", SYS.logType.BELL);
			}
			PS.members[player.id].admin = player.admin;
			return false;
		}
		this.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer){			//	플레이어 강제 퇴장
			let banType = ban == true ? "영구" : "강제";
			AMN.kicked = false;
			if(reason == "Bad actor"){ 
				SYS.sendError(SYS.errorType.E_ETC);
				NC.notice(SYS.showPlayerInfo(kickedPlayer.id, "name") + "님이 오류 감지 시스템으로 인해 퇴장되었습니다.");
				return SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, "public") + "(이)가 오류로 인해 "+ banType + "퇴장됨.", SYS.logType.ERROR);
			}
			PS.members[kickedPlayer.id].admin = false;
			PS.members[kickedPlayer.id].sub_admin = false;
			if(byPlayer) return SYS.log(true, SYS.showPlayerInfo(byPlayer.id, "public") + "(이)가 " + SYS.showPlayerInfo(kickedPlayer.id, "public") + "(을)를 " + banType + " 퇴장함." + (reason ? (" (사유: " + reason + ')') : ''), SYS.logType.WARNING);
			else SYS.log(true, SYS.showPlayerInfo(kickedPlayer.id, "public") + "(을)를 " + banType + " 퇴장함." + (reason ? (" (사유: " + reason + ')') : ''), SYS.logType.WARNING);

			// 유저 목록 정리
			PS.updatePlayers(kickedPlayer.id);
			PS.clearMember(kickedPlayer);
			//PS.cntPlayers--;
			// 사람이 없으면 자동 종료
			PS.cntPlayers() > 0 ? AMN.updateAdmins(room.getPlayerList()[0]) : room.stopGame();
			SYS.log(true, "[자동진행시스템] 현재 방 접속 인원: " + PS.cntPlayers());
			return true;
		}
		this.adminHelp = function(player){					// !adminhelp				|	관리 명령어
			if(AMN.getAdminstats(player.id))
				NC.msgCommand("관리", 
				"p | !p | !clearbans | !host | !time 숫자 | !set_pw | !score 숫자 | !r | !rr | !load 숫자 | !lock  | !set_pw | !clear_pw | !show_pw | !도 ", 
				player.id, "!ahc");
			else NC.acess(player.id);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.adminComHelp = function(player){				// !ahc						|	관리 명령어 도움말
			if(AMN.getAdminstats(player.id)){
				NC.msgCommand("관리 ", 
				"p/!p(게임 일시정지/시작) | !clearbans(영구 퇴장 명단 초기화) | !host(호스트 이동)"
				+ SYS.newLine + "!time(시간 설정) | !score(점수 설정) | !r (게임 자동 진행) | !rr(게임 재시작)"
				+ SYS.newLine + "!load ID(맵 로드) | !lock(팀 이동 금지/허용)"
				+ SYS.newLine + "!set_pw(비번 설정) | !clear_pw(비번 해제) | !show_pw(비번 표시) | !도(도배방지문자 출력)",
				 player.id);
			}
			else NC.acess(player.id);
			return false;  // 명령어 흔적을 남기지 않음
		}	
		this.comCreateMagnet = function(player, msg){		// !magnet #ID				|	강제 이동
			if((PS.cntPlayers < 2)||(AMN.getAdminstats(player.id) != 2)) return NC.caution("현재 사용할 수 없는 명령어입니다.", player.id);
			let spacePos = msg.indexOf(' ');
			let numIndex = msg.substr(spacePos + 1);
			let index = GM.checkPublicId(numIndex, player.id);
			if(index == false) return false;
			if(index == player.id) return NC.caution("본인을 제외한 ID를 입력하십시오.", player.id);
			NC.uniMsg("You got a magnet now.", 
			SYS.showPlayerInfo(index) + "님의 위치를 이동합니다.", 
			player.id, "!release");
			NC.uniMsg("You are a magnet now.", 
			SYS.showPlayerInfo(index) + "님의 위치가 이동됩니다.", index);
			magnetList = [player.id, index];
			return false;
		}
		this.comClearMagnet = function(player){				// !clear_magnet
			if((PS.cntPlayers < 2)||(AMN.getAdminstats(player.id) != 2)) return NC.caution("현재 사용할 수 없는 명령어입니다.", player.id);
			NC.uniMsg("a magnet is destroyed successfully.", 
			"위치가 지정되었습니다.", 
			player.id, "!magent #ID");
			magnetList = [null, null];
			return false;
		}
															//								(슈퍼)블랙리스트 추가
		this.addBlacklist		= index => PS.initBlacklist(false, PS.members[index].name, PS.getAddress(index));
		this.addSuperBlacklist = function(index){
			PS.initBlacklist(true, PS.members[index].name, PS.getAddress(index));
			return AMN.checkSuperBlacklists(index);
		}
		this.getAdminstats = function(player){				// 								어드민 권한 확인
			if(!PS.members[player]) return false;
			if(PS.members[player].admin) return 2;
			if(PS.members[player].sub_admin) return 1;
			return false;
		}
		this.getAdmin = (player) => AMN.setAdmin(player.id);//								권한 획득
		this.getHostLock	= () => hostLock;
		this.getMute = function(player, msg){				//								채금자 감지 및 메시지 전달
			if(PS.members[player].isMute == false) return false;
			let num = parseInt(msg);
			if(num >= 0 && num < 10){ 
				room.setPlayerAvatar(player, CS.getFace(num));
				return true;
			}
			let blockMsg;
			let i = Math.floor(Math.random() * 5);
			switch(i){
				case 0: blockMsg = "잠시동안 채팅이 불가합니다."; 	break;
				case 1: blockMsg = "채팅이 불가능합니다."; 		 	break;
				case 2: blockMsg = "당분간 채팅이 불가합니다.";		break;
				case 3: blockMsg = "채팅을 이용할 수 없습니다."; 	break;
				case 4: blockMsg = "채팅이 금지되었습니다."; 		break;
			}
			let listMsg = '';
			for(let i = 0; i < 10; i++){
				listMsg += (CS.getFace(i) + i);
				if(i < 9) listMsg += " | ";
			}
			NC.locked(true, blockMsg + "(아래에 나열된 숫자로 감정만 전달할 수 있습니다)" 
			+ SYS.newLine + listMsg, player);
			return true;
		}
		this.getMagnetList = (index) => magnetList[index];
		this.setAdmin = function(player){					//								권한 설정
			room.setPlayerAdmin(player, true);
			return false;
		}
		this.setSubAdmin = function(player){				//								보조 권한 설정
			if(AMN.getAdminstats(player) == 1) return false;
			PS.members[player].sub_admin = true;
			if(AMN.getAdminstats(player) == 2) PS.members[player].admin = false;
			NC.notice(SYS.showPlayerInfo(player, "name") + "님이 보조 권한을 획득했습니다. ", null, "!adminhelp");
			SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 보조 권한을 얻음.", SYS.logType.NOTICE);
			return true;
		}
		this.setDynamicAdmin = function(player){			// 								권한 동적 할당 옵션
			if(AMN.getAdminstats(player.id) == 2){
				if(!AMN.dynamicAdmin){
					AMN.dynamicAdmin = true;
					NC.locked(false, "동적 할당이 활성화되었습니다.", player.id);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 동적 할당을 활상화함.", SYS.logType.BELL);
				}
				else{
					AMN.dynamicAdmin = false;
					NC.locked(true, "동적 할당이 비활성화되었습니다.", player.id);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 동적 할당을 비활상화함.", SYS.logType.BELL);
				}
			}
			else return NC.acess(player.id);
			return false;
		}
		this.setScore = function(player, msg){				// !score n 				|	점수 변경 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let num = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				if(GM.getGameStats() != 2){
					if((num >= 0)&&(num < 15)){ 									// 범위 내에서 벗어나면 종료 처리
						room.setScoreLimit(num);
						NC.notice("제한 점수가 " + num + "점으로 변경되었습니다.");
						SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 제한 점수를 " + num + "점으로 변경함.", SYS.logType.NOTICE);
					}
					else return NC.caution("올바르지 않은 값입니다. 0~14 사이의 값을 입력하세요.", player.id);
				}
				else NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player.id);
			}
			else NC.acess(player.id);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setTime = function(player, msg){				// !time n					|	시간 변경 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let time = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				if(GM.getGameStats() != 2){
					if((time >= 0)&&(time < 15)){ 									// 범위 내에서 벗어나면 종료 처리
						room.setTimeLimit(time);
						NC.notice("제한 시간이 " + time + "분으로 변경되었습니다.");
						SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 제한 시간을 " + time + "점으로 변경함.", SYS.logType.NOTICE);
					}
					else return NC.caution("올바르지 않은 값입니다. 0~14 사이의 값을 입력하세요.", player.id);
				}
				else NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", player.id);
			}
			else NC.acess(player.id);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setTeamsLock = function(player){				// !lock					|	팀 이동 금지/허용 명령어
			if(AMN.getAdminstats(player.id)){
				if(AMN.teamsLock == false){		// 참이면 금지, 거짓이면 허용
					AMN.teamsLock = true;
					NC.locked(true, "팀 자율 이동이 금지되었습니다.");
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 팀 이동을 금지함.", SYS.logType.NOTICE);
				}
				else{
					AMN.teamsLock = false;
					NC.locked(false, "팀 자율 이동이 허용되었습니다.");
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 팀 이동을 허용함.", SYS.logType.NOTICE);
				}
				room.setTeamsLock(AMN.teamsLock);
			}
			else NC.acess(player.id);
			return false;
		}
		this.setHostLock = function(bool){					// 								방장 팀 이동 설정
			if(NOPLAYER == true){ 
				if(hostLock) hostLock = false;
				return false;
			}
			hostLock = bool;
			return true;
		}
		this.setAutoReset = function(player){				// !r						|	게임 자동 시작/종료
			if(AMN.getAdminstats(player.id)){
				if(!GM.getGameStats()) room.startGame();
				else if(GM.getGameStats() == 2) room.stopGame();
			}
			else return NC.acess(player.id);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setReset = function(player){					// !rr						|	게임 재시작
			if(AMN.getAdminstats(player.id)){
				room.stopGame();
				room.startGame();
				SYS.log(true, "다시 시작.", SYS.logType.NOTICE);
			}
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setPassword = function(player, pass){			// !set_pw string			|	비번 설정
			if(AMN.getAdminstats(player.id)){
				if(pass.length <= 10) NC.locked(true, "비밀번호가 너무 짧습니다. " + CM.recommendCom("연관", "!clear_pw"), player.id);
				else if(pass.length >= 28) NC.locked(true, "비밀번호가 너무 길어서 설정할 수 없습니다.", player.id);
				else{ 
					AMN.updatePassword(pass.substr(8, 20));
					NC.locked(true, "비밀번호가 설정되었습니다.");
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 비밀번호를 설정함. (" + PASSWORD + ')', SYS.logType.BELL);
				}
			}
			else NC.acess(player.id);
			return false;
		}
		this.setMute = function(mutedPlayer, byPlayer){		//							|	채팅 금지
			if(!mutedPlayer) return false;
			PS.members[mutedPlayer].isMute = true;
			for(let i = 1; i <= PS.cntPlayers(); i++){
				PS.getPublicId(i) == mutedPlayer ? NC.locked(true, "채팅 금지되었습니다.", mutedPlayer) : NC.locked(true, "특정 플레이어의 채팅이 금지되었습니다.");
			}
			if(byPlayer)	SYS.log(true, SYS.showPlayerInfo(byPlayer) + "(이)가 " + SYS.showPlayerInfo(mutedPlayer) + "(이)의 " + "채팅을 금지함.", SYS.logType.NOTICE);
			else			SYS.log(true, SYS.showPlayerInfo(mutedPlayer) + "(이)의 채팅이 금지됨.", SYS.logType.NOTICE);
			return false;
		}
		this.setKick = function(kickedPlayer, msg, ban){	//								강제 퇴장 처리
			AMN.kicked = true;
			if(msg) room.kickPlayer(kickedPlayer, msg, ban);
			else room.kickPlayer(kickedPlayer, null, ban);
			return false;
		}
		this.clearBans = function(player){					// 								영구 퇴장 명단 초기화
			room.clearBans();
			NC.notice("영구 퇴장 명단이 초기화되었습니다.");
			if(player) SYS.log(true, SYS.showPlayerInfo(player) + "(이)가 영구 퇴장 명단을 모두 지움.", SYS.logType.NOTICE);
			else SYS.log(true, " 영구 퇴장 명단 초기화");
			return false;
		}
		this.showPassword = function(player){				// !show_pw					| 	비번 공개
			if(AMN.getAdminstats(player.id)){
				if(PASSWORD) NC.notice("현재 비밀번호는 " + PASSWORD + "입니다.", player.id);
				else NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", player.id);
			}
			else NC.acess(player.id);
			return false;
		}
		this.missPassword = function(player){ 				// 								어드민 전용 명령어 오타 방지
			SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 관리자 로그인을 시도함. (실패)", SYS.logType.WARNING);
			return false; 
		}
		this.filterPlayer = function(player){				//								사칭 및 중복 필터(onlyadmin)
			if(!PS.getLocalId(player)) return false;
			let id;
			// (슈퍼)블랙리스트
			AMN.checkSuperBlacklists(player);
			if(PS.cntPlayers() <= 1) return false;
			for(let i = 1; i <= PS.cntPlayers(); i++){
				id = PS.getPublicId(i);
				if(id == false) return SYS.sendError(SYS.errorType.E_PLAYER_PID);
				if(id != player){
					// 사칭
					if(PS.members[id].name == PS.members[player].name){ 
						AMN.setKick(player, "사칭 및 다중 접속이 감지되어 퇴장되었습니다.");
						return true;
					}
					// 다중 접속
					if(PS.getAddress(id) == PS.getAddress(player)){
						AMN.addBlacklist(player);
						AMN.setKick(player, "사칭 및 다중 접속이 감지되어 퇴장되었습니다.", false);
						SYS.log(true, 
							SYS.showPlayerInfo(id) + "(와)과 " + SYS.showPlayerInfo(player) + "(이)의 다중 접속이 감지됨.", SYS.logType.WARNING);
						return true;
					}
				}
			}
			return false;
		}
		this.checkBlacklists = function(index){				//								블랙리스트 감지
			let indexName = PS.members[index].name;
			if(CS.getSpace(indexName)) return false;								// 공백 닉네임 처리
			var sChar = /[\{\}\[\]\/?.,;:⊙▣◈◎|\)*~`!^\-+<>@\#\$\%\&\\\=\(\'\"]/gi;			// 특수문자 처리
			let i = 0;
			if(sChar.test(indexName)) indexName = indexName.replace(sChar, "특문");
			while(i < PS.blacklist.length){
				// 주소 데이터가 없으면 등록 처리
				if(PS.blacklist[i].super == false){
					let searchName = PS.blacklist[i].name;
					if(searchName == undefined) return false;		// 이름을 찾을 수 없으면 반복문 종료
					if((searchName.search(indexName) != -1)&&(searchName.length == indexName.length)){ 
						if(PS.blacklist[i].ip == undefined) PS.blacklist[i].ip = PS.getAddress(index);
						return true;
					}
				}
				i++;
			}
			return false;
		}
		this.checkSuperBlacklists = function(id){			//								슈퍼 블랙리스트 감지
			let i = 0;
			let detected = false;
			while(i < PS.blacklist.length){
				// 포함되면 필터 반환 | 포함되지 않으면 i 증가
				if(PS.blacklist[i].super == true){
					if((PS.blacklist[i].name != undefined)&&(PS.blacklist[i].name == PS.members[id].name)){ 			// 닉네임 동일
						if(PS.blacklist[i].ip == undefined) PS.blacklist[i].ip = PS.getAddress(id);			// 주소 데이터가 없으면 등록 처리
						else if(PS.blacklist[i].ip != PS.getAddress(id)) PS.initBlacklist(true, PS.members[id].name, PS.getAddress(id));
						detected = true; break;
					}
					else if(PS.blacklist[i].ip == PS.getAddress(id)){				// 네트워크 동일
						if(PS.blacklist[i].name == undefined) PS.blacklist[i].name = PS.members[id].name;	// 이름 데이터가 없으면 등록 처리
						else if(PS.blacklist[i].name != PS.members[id].name) PS.initBlacklist(true, PS.members[id].name, PS.getAddress(id));
						detected = true; break;
					}
				}
				i++;
			}
			for(let i = 0; i < PS.blacklist.length; i++){
				for(let j = 0; j < PS.blacklist.length; j++){
					if((PS.blacklist[i].super == true)&&(i != j))
						if((PS.blacklist[i].name == PS.blacklist[j].name)&&(PS.blacklist[i].ip == PS.blacklist[j].ip)) PS.blacklist.splice(j, 1);
				}
			}
			if(detected == false) return false;
			SYS.log(true, "[슈퍼 블랙리스트]" + PS.members[id].name + ': ' + PS.getAddress(id), SYS.logType.WARNING);
			return AMN.setKick(id, "차단된 IP입니다.", false);
		}
		this.updateAdmins = function(player) {				// 								어드민 없으면 권한 부여
			var players = room.getPlayerList().filter((player) => player.id != 0 );
			// 아무도 안 나가면 동작 없음
			if (players.length == 0 ) return; 
			  // 어드민 나가면 아무 동작 없음
			  if (players.find((player) => player.admin) != null ) return; 
			  // 어드민 없으면 부여
			  if(AMN.dynamicAdmin)
				return (AMN.filterPlayer(player.id) == false) ? AMN.setAdmin(player.id) : AMN.setSubAdmin(player.id);
		}
		this.updatePassword = function(pass){				// 								비번 갱신
			PASSWORD = pass == " " ? null : pass;
			room.setPassword(PASSWORD);
			return PASSWORD;
		}
		this.releaseMute = function(player){				// !unmute					|	채팅 허용(onlyadmin)
			if(AMN.getAdminstats(player.id)){
				for(let i = 1; i < PS.members.length; i++){
					if(PS.members[i].isMute == true) PS.members[i].isMute = false;
				}
				NC.locked(false, "특정 플레이어의 채팅이 허용되었습니다.");
				SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 모든 채금을 해제함.", SYS.logType.NOTICE);
				return false;
			}
			else return NC.acess(player.id);
		}
		this.releasePassword = function(player){			// !clear_pw				|	비번 해제
			if(AMN.getAdminstats(player.id)){
				if(!PASSWORD){
					NC.caution("비밀번호가 이미 해제되어 있습니다.", player.id);
					SYS.log(true, player.id + '(' + PS.getLocalId(player.id) + ')' + player.name + "(이)가 비밀번호 해제를 시도함.", SYS.logType.NOTICE);
				}
				else{
					AMN.updatePassword();
					NC.locked(false, "비밀번호가 해제되었습니다.");
					SYS.log(true, player.id + '(' + PS.getLocalId(player.id) + ')' + player.name + "(이)가 비밀번호를 해제함.", SYS.logType.NOTICE);
				}
			}
			else NC.acess(player.id);
			return false;
		}
		this.deleteAdmin = function(player){				//								권한 해제
			room.setPlayerAdmin(player, false);
			return false;
		}
		this.deleteSubAdmin = function(player){				//								보조 권한 해제
			PS.members[player].sub_admin = false;
			if(CS.getSpace(PS.members[player].name)){ 
				NC.notice("공백님의 보조 권한이 해제되었습니다.");
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + "공백(이)가 보조 권한을 잃음.", SYS.logType.NOTICE);
			}
			else{
				NC.notice(PS.members[player].name + "님의 보조 권한이 해제되었습니다. ");
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + PS.members[player].name + "(이)가 보조 권한을 잃음.", SYS.logType.NOTICE);
			}
			return false;
		}
		this.putPause = function(player){					// p						|	일시 정지(onlyadmin)
			if(AMN.getAdminstats(player.id)){
				room.pauseGame(true);
				return false;  
			}
		}
		this.unPause = function(player){ 					// !p						|	계속(onlyadmin)
			if(AMN.getAdminstats(player.id)) room.pauseGame(false);
			else NC.acess(player.id);
			return false;
		}
	}
}
//-----------------------------------------------------------------------
// 공지 및 알림 클래스
//-----------------------------------------------------------------------
class Notification {														
	constructor() {
		this.announce = function(msg, target, color, style, sound){ 			// 알림 메시지
			return room.sendAnnouncement(msg, target, 
				this.setColor(color), this.setStyle(style), this.setSound(sound));
		}
		this.uniMsg = function(titleText, contentText, target, advCom){				// 유니버설 메시지(기본)
			return this.manualUniMsg(titleText, contentText, target, advCom, "green");
		}
		this.manualUniMsg = function(												// 유니버셜 메시지(확장)
			titleText, contentText, target, advCom, titleColor, contentColor){
			if(titleText == "none"){ 
				return this.announce(contentText
				+ (advCom ? CM.recommendCom("관련", advCom) : ''), 
				target, titleColor, "small-bold", "muted");
			}
			this.announce((titleText ? titleText : "알림") 
				+ (advCom ? CM.recommendCom("관련", advCom) : ''), 
				target, titleColor, "small-bold");
			this.announce(contentText, target, contentColor, "small", "muted");
			return false;
		}
		this.info			= (msg, target, advCom) => this.manualUniMsg("🔎상세정보🔍", msg, target, advCom, "green");
		this.help			= function(msg, exCom, target, advCom){
			this.announce("💡도움말💡" + (advCom ? CM.recommendCom("관련", advCom) : ''), 
				target, "green", "small-bold", "muted");
			this.announce(msg, 
				target, null, "small", "muted");
			this.announce(exCom, 
				target, "yellow", "small", "muted");
			this.announce("위와 같은 형식으로 보내면 됩니다.", 
				target, null, "small", "muted");
		}
		this.notice			= (msg, target, advCom) => this.uniMsg("none", msg, target, advCom);
		this.caution		= (msg, target, advCom) => this.manualUniMsg("⚠️주의⚠️", msg, target, advCom, "orange", "gray");
		this.locked			= (isLock, msg, target)	=> this.manualUniMsg((isLock ? "🔒잠금🔒" : "🔓해제🔓"), msg, target, null, "yellow", "gray");
		this.acess			= (player) 				=> this.locked(true, "권한이 없습니다.", player);	// 권한 없음
		this.devCheck = function(player){										// 개발 버전 안내 메세지
			if(DEV) return this.caution("개발 전용 테스트방이므로 원활한 플레이가 어렵습니다.", player.id);
		}
		this.msgCommand		= (title, content, target, advCom) => this.uniMsg(("🔎" + title + " 명령어🔍"), content, target, advCom);
		this.alretMsg = function(player){										// 욕설 감지 메시지
			if(player == undefined) return false;
			let id = Math.floor(Math.random() * 13);
			let msg;
			switch(id){
				case 0: msg = "욕하지 맙시다."; break;
				case 1: msg = "건전한 인터넷 문화를 만들어 갑시다."; break;
				case 2: msg = "한 번쯤은 거울에 비친 자신의 모습을 보세요."; break;
				case 3: msg = "가는 말이 고와야 오는 말도 곱다."; break;
				case 4: msg = "역지사지의 태도로 남을 생각합시다."; break;
				case 5: msg = "바깥 사람들, 지인, 친구, 가족들까지도 그렇게 하실 건가요?"; break;
				case 6: msg = "지금 본인의 모습을 보세요. 키보드 두드리면서 무얼 하고 있는지."; break;
				case 7: msg = "적어도 가정교육은 독학하지 않은 걸로 알아두는 게 좋겠죠."; break;
				case 8: msg = "우리 한 번 올바르고 건전한 언어 사용 자세를 가집시다."; break;
				case 9: msg = "도저히 쓸 멘트가 없네요. 굳이 말 안 해도 알겠죠?"; break;
				case 10: msg = "한 번 내뱉은 말은 도로 주워담을 수 없습니다."; break;
				case 11: msg = "적어도 부모님은 홀수가 아닌 걸로 알아두는 게 좋겠죠."; break;
				case 12: msg = "말은 그 사람의 행동과 인격을 나타냅니다."; break;
			}
			this.caution(msg, player.id);
			return false;
		}
		this.ruleCommand = function(msg){ 										// 규칙
			msg = "🕹" + msg + "규칙🎮 : ";
			return msg;
		}
		this.setColor = function(color){										// 색상 지정
			switch(color){
				case 0:						color = "E81224"; break;
				case 1:						color = "0078D7"; break;
				case "um":					color = "6CB858"; break;			// UM
				case "빨강": case "red":	color = "FF0000"; break;			// 빨강
				case "주황": case "orange":	color = "FF5E00"; break;			// 주황
				case "살구": case "wheat":	color = "FFE7CC"; break;			// 살구
				case "노랑": case "yellow":	color = "FFE400"; break;			// 노랑
				case "초록": case "green":	color = "8ED2AB"; break;			// 초록
				case "하늘": case "sky":	color = "00D8FF"; break;			// 하늘
				case "파랑": case "blue":	color = "0000FF"; break;			// 파랑
				case "보라": case "purple":	color = "5F00FF"; break;			// 보라
				case "핑크": case "pink":	color = "FF86CF"; break;			// 핑크
				case "회색": case "gray":	color = "BDBDBD"; break;			// 회색
				case "검정": case "black":	color = "000000"; break;			// 검정
			}
			if(color) color = ("0x" + color);
			else color = "0xFFFFFF";
			return color;
		}
		this.setStyle = function(style){										// 굵기 지정
			switch(style){
				case 1: case "nomarl":								return "nomarl";		// 기본
				case 2: case "bold":								return "bold";			// 볼드체
				case 3: case "italic":								return "italic"; 		// 이탈릭
				case 4: case "small":								return "small";			// 작게
				case 5: case "small-bold": case "smallBold":		return "small-bold"; 	// 작은 볼드체
				case 6: case "small-italic": case "smallItalic":	return "small-italic";	// 작은 이탈릭
				default:											return "normal";
			}
		}
		this.setSound = function(sound){										//
			switch(sound){
				case 0: case "muted":	return 0;
				case 1: case "normal":	return 1;
				case 2: case "loud":	return 2;
				default: return 1;
			}
		}
	}
}
//-----------------------------------------------------------------------
// 채팅 시스템 클래스
//-----------------------------------------------------------------------
class ChatSystem {													
	constructor(){
		const MAXCHATMODE = 2;
		let freezeChat = false;											//							채팅 얼리기/녹이기
		let face = [													//	 						이모티콘
			'🤔', 
			'😍', '🤣', '😎', '😐', '😰', 
			'🙄', '😴', '🥶', '😱'
		]
		this.ffWords = [												// 							욕설 필터링 단어
			"ㄴㅇㅁ","ㄴㄱㅁ", "ㄴ.ㄱㅁ","ㄴ.ㅇㅁ","ㄴㄱ.ㅁ","ㄴㅇ.ㅁ",
			"니엄마","느금", "늑그앰","니애미","니애1미","니애2미", "니미", "니앰", "니애비", "애미없는", "애미없지", "애미없냐", "sldjaak", "smrma", "sldlao",
			"니@ㅐ미", "니@ㅐ비", "보지벌려",
			"애1미","애2미","애미뒤짐","애미디짐","애1미뒤짐","애1미디짐","애2미뒤짐","애2미디짐", "창녀", "창년", "업소녀", "doalenlwla", "ckdsu",
			"애미 뒤짐", "애미 디짐", "애미 뒤졌냐", "애미뒤졌네","애1미뒤졌네","애2미뒤졌네","애미뒤졌다","애1미뒤졌다","애2미뒤졌다",
			"애미 뒤졌네","애1미 뒤졌네","애2미 뒤졌네","애미 뒤졌다","애1미 뒤졌다","애2미 뒤졌다", "보지년",
			"애미있냐", "애미없냐", "애미있냐없냐"
		]
		this.fWords = [													// 							욕설 필터링 단어
			"ㅅㅂ", "ㅆㅂ", "ㅆㅃ", "tq", "Tq",
			"ㅂㅅ", "ㅄ", "qt", "ㅂ ㅅ", "ㅂ.ㅅ",
			"장애인아", "wkddodlsdk",
			"ㄲㅈ", "Rw", "꺼져",
			"ㅈㄹ", "ㄷㅊ", "ㅈㄴ", "ㅈㄲ", "ㅗ", "🖕🏻", "🖕", "🖕🏽", "🖕🏾", "🖕🏿",
			"새끼", "새꺄", "새낀", "toRl","시발", "^^ㅣ발", "시1발", "시2발", "시ㅡ발", "tlqkf",
			"씨발", "씨바", "씨-발","씨ㅡ발","씨이발","씨이이발","씨이이이발","씨1발","씨2발", "Tlqkf", "Tlqk",
			"ㅆ!발", "ㅆ!발련", 
			"병신","병1신","병2신", "qudtls","븅신","븅1신","븅2신", "qbdtls", "뷰웅신련", "뷍신",
			"지랄","지1랄","지2랄", "wlfkf", "wf", "wlfkd",
			"좆", "whw","존나","존1나","존2나", "whssk", "젖밥쉑", "ㅈ밥", "wjwqkqtnpr", "wqkq",
			"씹", "tlq",
			"개새1끼", "개새2끼", "개새1꺄", "개새2꺄","개새1끼야", "개새2끼야", "개새1끼가", "개새2끼가",
			"닥쳐", "닥치"
		]
		this.isFreeze = () => freezeChat;								//							채팅 얼림 여부
		this.getChatMode = player => PS.members[player].chatmode;		//							채팅 모드
		this.getFace = (index) => (index <= face.length - 1)&&(index >= 0) ? face[index] : face[0];
		this.getSpace = function(string){								//							공백 확인
			for(let i = 0; i < string.length; i++)
				if((string.substr(i, 1)).search(" ") == -1) return false;	// 공백 외 다른 문자가 들어있으면 거짓으로 반환
			return true;
		}
		this.onPlayerChat = function(player, msg){						//							채팅 시스템
			let spacePos = msg.search(" ");
			let command = msg.substr(0, spacePos !== -1 ? spacePos : msg.length);
			// 마지막 활동 시간 저장
			PS.afkList[player.id] = TM.getTime();
			// 한 시간 간격으로 모든 퇴장 목록 초기화
			if(TM.oldTime == 0) TM.oldTime = 1;
			if(date.getMinutes() < TM.oldTime){ 
				AMN.clearBans();
				TM.oldTime = date.getMinutes();
			}
			// 명령어 처리
			if(internalCommands.hasOwnProperty(command)) return internalCommands[command](player, msg);
			if(standardCommands.hasOwnProperty(command)) return standardCommands[command](player, msg);
			if(customCommands.hasOwnProperty(command)) return customCommands[command](player, msg);
			// 다중 접속자 경고창 출력
			for (let i = 1; i <= PS.cntPlayers(); i++){
				if((PS.getPublicId(i) != player.id)&&(PS.getAddress(PS.getPublicId(i)) == PS.getAddress(player.id)))
					NC.caution("다중 접속이 의심됩니다.", player.id);
			}
			// 기본 채팅 모드(글자 수 70자 제한)
			if((CS.isFreeze() == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player.id);		// 채팅창 얼림 기능
			switch(CS.getChatMode(player.id)){
				// 일반 채팅
				case 0: return CS.sendAllChat(player, msg.substr(0, 70));
				// 팀별 채팅
				case 1: return CS.sendTeamChat(player.team, player.id, msg.substr(0, 70));
			}
			return false;
		}
		this.filterWords = function(player, msg){						//							욕설 필터링
			let i = 0;
			while(i < CS.ffWords.length){			// 강제 퇴장
				// 포함되면 필터 반환 | 포함되지 않으면 i 증가
				if(msg.search(CS.ffWords[i]) !== -1) 
					return AMN.setKick(player.id, "욕설(" + CS.ffWords[i] + ')');
				else i++; 
			}
			i = 0;
			while(i < CS.fWords.length){			// 경고 및 주의
				if(msg.search(CS.fWords[i]) !== -1){ 
					//NC.alretMsg(player);
					return false;
				}
				else i++; 
			}
			return true;
		}
		this.sendAllChat = function(player, msg){						//							전체 채팅
			let fmsg = (PS.cntPlayers() >= 10) ? "전체 (" + SYS.setLine(PS.getLocalId(player.id), 2) + ')' : "전체 (" + PS.getLocalId(player.id) + ')';
			let lmsg = (player.name + ": " + msg);
			// 욕설 필터링
			let filter = CS.filterWords(player, msg) ? true : false;
			let mark = filter ? PS.checkMarks(player) : PS.checkMarks(player, 3);
			// 채금자 채팅 무효화
			if(AMN.getMute(player.id, msg)) return false;
			// 플레이어를 제외한 나머지 인원 찾기
			for(let i = 1; i <= PS.cntPlayers(); i++){	
				if(PS.getLocalId(player.id) != i){
					// 채팅 모드에 따라 도움말 추가
					if(CS.getChatMode(PS.getPublicId(i)) == 0) CS.sendMsg(fmsg + mark + lmsg, PS.getPublicId(i));
					else CS.sendMsg(fmsg + mark + lmsg + " (전체 채팅: !a 답할 내용)", PS.getPublicId(i));
				}
			}
			CS.sendMsg(fmsg + mark + lmsg, player.id);
			SYS.log(true, "전체 " + ((PS.cntPlayers() >= 10) ? SYS.setLine(player.id, 2) + '(' + SYS.setLine(PS.getLocalId(player.id), 2) + ')' : player.id + '(' + PS.getLocalId(player.id) + ')') + mark + lmsg);
			if(!CS.filterWords(player, msg)) NC.alretMsg(player);
			return false;
		}
		this.sendHideChat = function(player, msg, type){				//							나 빼고 다 보내기
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(PS.getLocalId(player) != i){
					if(type) NC.announce(msg, PS.getPublicId(i), "yellow", "small-bold");	// 공지로 출력
					else CS.sendMsg(msg, PS.getPublicId(i));						// 일반 채팅으로 출력
				}
			}
			return false;
		}
		this.sendWhisperChat = function(toPlayer, fromPlayer, msg){		//							귓속말 채팅
			if(AMN.getMute(fromPlayer)) return false;		// 채금자 채팅 무효화
			let slid = PS.cntPlayers() >= 10 ? SYS.setLine(PS.getLocalId(fromPlayer), 2) : PS.getLocalId(fromPlayer);
			let spId = PS.cntPlayers() >= 10 ? SYS.setLine(fromPlayer, 2) : fromPlayer;
			let dlid = PS.cntPlayers() >= 10 ? SYS.setLine(PS.getLocalId(toPlayer), 2) : PS.getLocalId(toPlayer);
			let dpId = PS.cntPlayers() >= 10 ? SYS.setLine(toPlayer, 2) : toPlayer;

			if(!PS.getLocalId(toPlayer)) return false;
			if((fromPlayer == 0)&&(toPlayer != 0)){						// 콘솔창에서 게임으로 전달
				SYS.log(true, "전달: (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg, SYS.logType.SEND);
				return CS.sendMsg("개인 (0)🌐서버 매니저" + ' → ' + dpId + '(' + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg + " (귓속말 답장: !e 0 답할 내용)", toPlayer);
			}
			// 욕설 필터링
			let filter = CS.filterWords(PS.members[fromPlayer], msg) ? true : false;
			let mark = filter ? PS.checkMarks(PS.members[fromPlayer]) : PS.checkMarks(PS.members[fromPlayer], 3);
			if((toPlayer != 0)&&(fromPlayer != 0)){
				CS.sendMsg("개인 (" + slid + ')' + mark + PS.members[fromPlayer].name + "→ (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg, fromPlayer);
				CS.sendMsg("개인 (" + slid + ')' + mark + PS.members[fromPlayer].name + "→ (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " +  msg + " (답장:  !e " + PS.getLocalId(fromPlayer) + " 답할 내용)", toPlayer);
				SYS.log(true, "개인 " + spId + '(' + slid + ')' + mark + PS.members[fromPlayer].name + '→ ' + dpId + '(' + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg);
			}
			return false;
		}
		this.sendTeamChat = function(teamId, player, msg){				// 							팀 채팅
			let teamInfo;
			switch(teamId){
				case TEAM.SPECTATOR:	teamInfo = "관중"; break;
				case TEAM.RED:	 		teamInfo = "레드"; break;
				case TEAM.BLUE:			teamInfo = "블루"; break;
			}
			let fmsg = teamInfo + ((PS.cntPlayers() >= 10) ? (player == 0) ? " (00)" : ' (' + SYS.setLine(PS.getLocalId(player), 2) + ')' : (player == 0) ? " (0)" : ' (' + PS.getLocalId(player) + ')');
			let lmsg = ((player == 0) ? ("서버 매니저" + ': ' + msg) : (PS.members[player].name + ": " + msg));

			// 욕설 필터링
			let filter = player ? (CS.filterWords(PS.members[player], msg) ? true : false) : null;
			let mark = player ? (filter ? PS.checkMarks(PS.members[player], teamId) : PS.checkMarks(PS.members[player], 3)) : null;
			if(PS.members[player]){
				// 채금자 채팅 무효화
				if(AMN.getMute(player)) return false;
				CS.sendMsg(fmsg + mark + lmsg, player);
			}
			// 플레이어를 제외한 나머지 팀원 찾기
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if((PS.getLocalId(player) != i)&&(PS.members[PS.getPublicId(i)].team == teamId)){
					// 채팅 모드에 따라 도움말 추가
					if(player == 0) CS.sendMsg(fmsg + "🌐" + lmsg + " (귓속말 답장: !e 0 답할 내용)", PS.getPublicId(i));
					else (CS.getChatMode(PS.getPublicId(i)) == 1) ? CS.sendMsg(fmsg + mark + lmsg, PS.getPublicId(i)) : CS.sendMsg(fmsg + mark + lmsg + " (팀 채팅: !t 답할 내용)", PS.getPublicId(i));
				}
			}
			if(player == 0) SYS.log(true, "전달: " + '[' + teamInfo +  '] ' + msg, SYS.logType.SEND);
			else SYS.log(true, teamInfo + ' ' + player + '(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' + mark + PS.members[player].name + ": " + msg);
			if(!CS.filterWords(player, msg)) NC.alretMsg(player);
			return false;
		}
		this.sendMsg = function(msg, target){ 							// 							일반 메시지 출력
			return NOPLAYER == false ? room.sendChat(msg, target) : NC.announce(msg, target, null, "normal");;
		}
		this.setAllChat = function(player, msg){						// !a 					|	전체 채팅 명령어
			if((CS.isFreeze() == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player.id);		// 채팅창 얼림 기능
			let sPos = msg.indexOf(' ');
			CS.sendAllChat(player, msg.substr(sPos + 1, 50));
			return false;
		}
		this.setWhisperChat = function(player, msg){					// !e ID				|	귓속말 명령어
			let sPos = msg.indexOf(' ');
			let chatMsg = msg.substr(sPos + 1, 50);
			let dId = chatMsg.indexOf(' ');
			dId = parseInt(chatMsg.substr(0, dId));
			if(dId == 0){ 										// ID가 0이면 콘솔창으로 전달
				let slid = PS.cntPlayers() >= 10 ? SYS.setLine(player.id, 2) : PS.getLocalId(player.id);
				let spId = PS.cntPlayers() >= 10 ? SYS.setLine(player.id, 2) : player.id;
				let mark = CS.filterWords(PS.members[player.id], msg) ? PS.checkMarks(PS.members[player.id]) : PS.checkMarks(PS.members[player.id], 3);
				SYS.log(false, spId + '(' + slid + ')' + mark + PS.members[player.id].name + ": " +  chatMsg.substr(chatMsg.indexOf(' ') + 1, 70), SYS.logType.BINDING);
				CS.sendMsg("외부 " + '(' + slid + ')' + mark + PS.members[player.id].name + "→ (0)🌐서버 매니저: " + chatMsg.substr(chatMsg.indexOf(' ') + 1, 70), player.id);
			}
			else if((dId != 0)&&(PS.members[player.id].disrupt == false)) return NC.caution("귓속말을 사용할 수 없습니다.", player.id);
			else{
				for(let i = 0; i <= PS.cntPlayers(); i++){
					if(i == dId){
						if(PS.getPublicId(i) == player.id) 			// 동일 인물인 경우
							return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player.id);
						if((i != 0)&&(PS.members[PS.getPublicId(i)].disrupt == false))
							return NC.caution("해당 플레이어의 수신이 거부된 상태입니다.", player.id);
						CS.sendWhisperChat(PS.getPublicId(dId), player.id, chatMsg.substr(chatMsg.indexOf(' ') + 1, 70));
						return !CS.filterWords(player, msg) ? NC.alretMsg(player) : false;
					}
				}
			}
			// 귓속말 처리
			return false;
		}
		this.setTeamChat = function(player, msg){						// !t 					|	팀 채팅 명령어
			if((CS.isFreeze() == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player.id);		// 채팅창 얼림 기능
			let sPos = msg.indexOf(' ');
			return CS.sendTeamChat(player.team, player.id, msg.substr(sPos + 1, 50));
		}
		this.setChatMode = function(player, type){						//							채팅 모드 설정
			let indexType;
			PS.members[player].chatmode = type;
			switch(type){
				case 0: indexType = "전체"; break;
				case 1: indexType = "팀";	break;
			}
			NC.notice("채팅 모드의 기본값이 " + indexType +"(으)로 변경되었습니다.", player);
			return false;
		}
		this.setDisruptMode = function(player, type){					//							채팅 수신 설정
			let mode;
			if(type == true)		NC.notice("채팅 수신이 허용되었습니다.", player);
			else if(type == false)	NC.notice("채팅 수신이 금지되었습니다. 따라서 귓속말 기능을 사용할 수 없습니다.", player);
			else return false;
			PS.members[player].disrupt = type;
			return true;
		}
		this.setFreezeChat = function(type){							//							채팅 얼리기/녹이기
			if(type == true){				// 얼리기
				CS.isFreeze() = true;
				for(let i = 1; i <= PS.cntPlayers(); i++){
					if(AMN.getAdminstats(PS.getPublicId(i))) NC.locked(true, "채팅창을 얼렸습니다. " + CM.recommendCom("녹이기 ", "!unfreeze"), PS.getPublicId(i));
					else NC.locked(true, "채팅창이 얼었습니다. ", PS.getPublicId(i));
				}
			}
			else{							// 녹이기
				CS.isFreeze() = false;
				for(let i = 1; i <= PS.cntPlayers(); i++){
					if(AMN.getAdminstats(PS.getPublicId(i))) NC.locked(true, "채팅창을 녹였습니다. " + CM.recommendCom("얼리기 ", "!freeze"), PS.getPublicId(i));
					else NC.locked(true, "채팅창이 녹았습니다. ", PS.getPublicId(i));
				}
			}
			return false;
		}
	}
}
//-----------------------------------------------------------------------
// 명령어 클래스
//-----------------------------------------------------------------------
class Commands{														
	constructor(){
		this.recommendCom = function(kind, com){							// 						추천 도움말
			return ('(' + kind + " 도움말: " + com + ')'); 
		}
		this.plaster = function(player){										// !도				|	도움말, 도배방지문자(onlyadmin)
    		if(AMN.getAdminstats(player.id)){ 
				SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 도배 방지 문자를 출력함.", SYS.logType.NOTICE);
				return NC.announce("────────────────" 
				+ SYS.newLine + "주의>"
				+ SYS.newLine + "도배 방지 도배 방지 도배 방지 도배 방지"
				+ SYS.newLine + "분란 방지 분란 방지 분란 방지 분란 방지"
				+ SYS.newLine + "정숙 유지 정숙 유지 정숙 유지 정숙 유지"
				+ SYS.newLine + "질서 유지 질서 유지 질서 유지 질서 유지"
				+ SYS.newLine + "상기에 한정하지 않는 예외가 있을 수 있음"
				+ SYS.newLine + "────────────────", 
				null, "orange", "small-bold", "loud");
			}
			return CM.comHelp(player, "!도");		// 도움말
		}
		this.comHelp = function(player, msg){ 									// !help			|	명령어 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("일반",
					"!adminhelp(방 관리) | !bothelp(봇방) | !maphelp(맵) | !joinhelp(투입) | !chathelp(채팅) | !rankhelp(점수) | !etchelp(기타)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("일반",
					"!bothelp(봇방) | !maphelp(맵) | !joinhelp(투입) | !chathelp(채팅) | !rankhelp(점수) | !etchelp(기타)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.botHelp = function(player, msg){									// !bothelp			|	봇방 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("봇방",
					"!about(봇방 정보) | !host(호스트 이동) | !set_pw(비번 설정) | !clear_pw(비번 해제) | !show_pw(비번 표시) | !도(도배 방지 문자)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("봇방",
					"!about(봇방 정보)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.chatHelp = function(player, msg){									// !chathelp		|	채팅 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("채팅",  
					"!e ID(귓속말) | !t(팀별 채팅) | !a(전체 채팅) | !chatmode n(채팅 모드) | !disrupt(수신 설정) | !freeze/!unfreeze(채팅 녹이기/얼리기) | ?mark(채팅창 마크) | !도(도배 방지 문자)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("채팅",
					"!e ID(귓속말) | !t(팀별 채팅) | !a(전체 채팅) | !chatmode n(채팅 모드) | !disrupt(수신 설정) | ?mark(채팅창 마크)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.mapHelp = function(player, msg){									// !maphelp			|	맵 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("맵",
					"/checksum(맵 정보 확인) | /store(맵 저장) | !maplist(내장 맵 목록) | !load ID(내장 맵 불러오기)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("맵",
					"/checksum(맵 정보 확인) | /store(맵 저장) | !maplist(내장 맵 목록)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.joinHelpPers = function(player){ 									// !join			|  	참가 도움말
			NC.msgCommand("투입",
			"레드팀: !red | 관전석: !spec | 블루팀: !blue | 잠수: !afk", 
			player.id);
			return false;
		}
		this.joinHelpPub = function(){ 											// !join			| 	참가 도움말(공용)
			NC.msgCommand("투입",
			"레드팀: !red | 관전석: !spec | 블루팀: !blue | 잠수: !afk", 
			null);
			return false;
		}
		this.rankHelp = function(player, msg){ 									// !rankhelp		| 	랭크 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("랭크",
					"!list(플레이어 목록) | !stats(전적) | ?score(점수 도움말) | !ranking(랭킹)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("랭크",
					"!list(플레이어 목록) | !stats(전적) | ?score(점수 도움말) | !ranking(랭킹)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.etcHelp = function(player, msg){									// !etchelp			|	기타 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers(); i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.msgCommand("기타",
					"!avatar(등번호 변경) | !uniform(유니폼 변경) | ?uniform(유니폼 도움말) | !adminhelp(관리 도움말)", 
					PS.getPublicId(i));
				}
				else{
					NC.msgCommand("기타",
					"!avatar(등번호 변경) | !uniform(유니폼 변경) | ?uniform(유니폼 도움말)", 
					PS.getPublicId(i));
				}
			}
			return false;
		}
		this.qE_Chat = function(player){										// ?e				| 	질문_채팅 귓속말
			NC.help("3번 플레이어에게 '안녕?'이라는 말을 조용히 전달하고 싶으면",
			"!e 3 안녕", player.id, "!list");
			return false;
		}
		this.qT_Chat = function(player){										// ?t				| 	질문_채팅 팀채팅
			NC.help("상대팀이 못 엿듣게 살포시 같은 팀원에게 '민트초코 최고야'라고 전하려면",
			"!t 민트초코 최고야", player.id);
			return false;
		}
		this.qMark = function(player){											// ?mark			| 	질문_채팅 마크
			NC.info("🌐" + ": 서버 매니저"
				+ " | " + PS.mark[0] + ": 관리자"
				+ " | " + PS.mark[1] + ": 보조 관리자"
				+ SYS.newLine + PS.mark[2] + ": 일반"
				+ " | " + PS.mark[3] + ": 블랙리스트",
				player.id, "!chathelp");
			return false;
		}
		this.qChatmode = function(player){										// ?chatmode 		| 	질문_채팅모드
			NC.info("0: 전체 채팅 | 1: 팀 채팅",
				player.id, "!chatmode n");
				NC.help("상대팀이 못 듣게 같은 팀원에게 '민트초코는 진리야'라고 계속해서 설교하려면",
				"!chatmode 1", player.id);
			return false;
		}
		this.qDisruptMode = function(player){									// ?disrupt			|	질문_수신 설정
			NC.help("상대방의 채팅 수신을 거부하려면",
			"!disrupt", player.id);
			return false;
		}
		this.qScore = function(player){ 										// ?score			| 	질문_점수
			NC.info("점수", player.id, "!ranking");
			NC.announce(
			"득: " + SC.scoreList.goal 	+ ' | '
			+ "실: " + SC.scoreList.ownGoal + ' | '
			+ "승: " + SC.scoreList.win 	+ ' | '
			+ "패: " + SC.scoreList.lost 	+ ' | '
			+ "도움 " + SC.scoreList.assist, 
			player.id, "green", "small", "muted");
			return false;	
		}
		this.qUniform = function(player){										// ?uniform			|	질문_유니폼
			NC.help("텍스트 색을 FFFFFF, 배경색을 FFCC00 및 AABBCC이고, 각도가 30°인 레드팀 유니폼으로 변경하고 싶으면",
			"!uniform 1 30 FFFFFF FFCC00 AABBCC", player.id);
			return false;
		}
		this.infoRoom = function(player, msg){ 									// !info			| 	방 정보
			NC.info("봇방입니다."	
			+ SYS.newLine + "릴리스 날짜: 2020.10.02 | "			// 릴리스 및 업데이트 날짜
			+ SYS.showInfo() + SYS.newLine + "Powered by UMUX",		// ***이 구문은 지우지 마시오***
			null, "!help");
			return false;
		}
		this.infoPlayers = function(player){ 									// !list			|	플레이어 정보
			NC.info("플레이어 목록", player.id, "!chathelp");
			for(let i = 1; i <= PS.cntPlayers(); i++){
				NC.announce("등급: " + PS.checkMarks(PS.members[PS.getPublicId(i)])
					+ ' | '
					+ "ID: " + SYS.setLine(i, 2)
					+ ' | '
					+ "ID(공용): " + SYS.setLine(PS.getPublicId(i), 2)
					+ ' | '
					+ "이름: " + PS.members[PS.getPublicId(i)].name
					, player.id, null, "small-bold", "muted");
			}
			return false;
		}
		this.infoMaps = function(player, msg){ 									// !maplist			|	맵 정보
			CS.sendAllChat(player, msg);
			GM.initMapsInfo();
			for(let i = 0; i < maps.length; i++)
				if(mapsName[i]) NC.announce('[' + SYS.setLine(i + 1, 2) + "] | " + mapsName[i], player.id, null, "small", "muted");
			NC.announce("🔎맵 정렬 목록🔍 " + CM.recommendCom("관련", "!maphelp"), player.id, "yellow", "small-bold", "muted");
			return false;
		}
		this.infoScore = function(player, msg){									// !stats 			|	점수 정보
			let sPos = msg.indexOf(' ');
			let index = msg.substr(sPos + 1);
			let name = player.name;
			let pId = player.id;
			let lId = PS.getLocalId(player.id);
			index = parseInt(index.substr(0));
			if((index > 0) && (index <= PS.cntPlayers())){			// !stats ID
				name = PS.members[PS.getPublicId(index)].name;
				pId = PS.getPublicId(index);
				lId = index;
			}
			NC.info((CS.getSpace(name) ? "공백" : name), player.id, "!ranking");
			NC.announce("개인 ID(공용 ID): " + SYS.setLine(lId, 2) + '(#' + SYS.setLine(pId, 2) + ')'
			+ SYS.newLine + SC.showPlayerStats(pId), 
			player.id, null, "small", "muted");
			return false;
		}
		this.infoRanking = function(player, msg){								// !ranking			|	랭킹 정보
			let sPos = msg.indexOf(' ');
			let index = msg.substr(sPos + 1);
			index = parseInt(index.substr(0));
			SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 랭킹을 확인함.", SYS.logType.NOTICE);
			
			NC.info("플레이어 순위", player.id, "!stats n")
			if((index > 0) && (index <= SC.rankList.length)){			// n등 랭킹 확인
				for(let i = 1; i < PS.members.length; i++){
					if(SC.rankList[index - 1] == i) return SC.sendRanking(i, player.id);
				}
			}
			return SC.sendRanking(player.id, player.id);				// 플레이어 랭킹 확인
		}
		this.setHostLock = function(player, msg){								// !host			|	방장 이동 설정
			if(NOPLAYER == true) return NC.acess(player.id);
			if(AMN.getAdminstats(player.id)){
				if(AMN.getHostLock() == false){
					AMN.setHostLock(true);
					NC.locked(false, "호스트 이동이 금지되었습니다.", player.id);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 방장 팀 이동을 금지함.", SYS.logType.NOTICE);
					room.setPlayerTeam(0, 0);
				}
				else{
					AMN.setHostLock(false);
					NC.locked(true, "호스트 이동이 허용되었습니다.", player.id);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 방장 팀 이동을 허용함.", SYS.logType.NOTICE);
				}
			}
			else return NC.acess(player.id);
			return false;
		}
		this.setChatMode = function(player, msg){								// !chatmode		|	채팅 모드 설정
			let sPos = msg.indexOf(' ');
			let type = parseInt(msg.substr(sPos + 1, 1));
			if(msg.search(' ') == -1) return false;
			if((type >= 0)&&(type < 2)) 										// 범위 내에서 벗어나면 종료 처리
				return CS.setChatMode(player.id, type);
			return NC.caution("올바르지 않은 값입니다. 0~1 사이의 값을 입력하세요.", player.id);
		}
		this.setDisruptMode = function(player){									// !disrupt			|	수신 모드 설정
			CS.setDisruptMode(player.id, !PS.members[player.id].disrupt);
			return false;
		}
		this.setFreezeChat = function(player){									// !freeze			|	채팅 얼리기
			if(AMN.getAdminstats(player.id)){
				if(PS.cntPlayers() < 3 || CS.isFreeze() == true) return NC.caution("부적절한 조치입니다. " + CM.recommendCom("추천 ", "!mute ID"), player.id);
				CS.setFreezeChat(true);
				SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 채팅창을 얼림.", SYS.logType.NOTICE);
				return false;
			}
			return NC.acess(player.id);
		}
		this.setUnfreezeChat = function(player){								// !unfreeze		|	채팅 녹이기
			if(AMN.getAdminstats(player.id)){
				if(CS.isFreeze() == false) return NC.caution("부적절한 조치입니다.", player.id);
				CS.setFreezeChat(false);
				SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 채팅창을 녹임.", SYS.logType.NOTICE);
				return false;
			}
			return NC.acess(player.id);
		}
		this.setTeamColors = function(player, msg){								// !uniform			|	팀 유니폼
			let sPos = msg.indexOf(' ');
			let comMsg = msg.substr(sPos + 1);
			let comPos = 0;
			let comIndex = new Array();
			for(let i = 0; i < 6; i++){
				let tempMsg = comMsg.substr(comPos);
				let tempPos = tempMsg.indexOf(' ');
				if(tempPos != -1){
                    comIndex[i] = tempMsg.substr(0, tempPos);
                    comPos += (tempPos + 1);
                }
                else{
                    comIndex[i] = tempMsg;
                    break;
                }
			}
			// 팀 ID 검사
			switch(comIndex[0]){
				case "1": case 'r': case "레드": case "레": case "red": 
					comIndex[0] = 1; break;
				case "2": case 'b': case "블루": case "블": case "blue":
					comIndex[0] = 2; break;
				default: return NC.caution("유니폼 적용 팀을 숫자(1~2) 또는 문자(red, blue)로 입력하세요. " + CM.recommendCom("관련 ", "?uniform"), player.id);
			}
			// 각도 범위 검사
			comIndex[1] = parseInt(comIndex[1]);
			if((comIndex[1] < 0)||(comIndex[1] > 180)) return NC.caution("각도는 0°~180° 사이의 값을 지정할 수 있습니다. " + CM.recommendCom("관련 ", "?uniform"), player.id);
			// 색상 코드 검사
			var hexStr = /[0123456789abcdef]/gi;
			for(let i = 2; i < comIndex.length; i++){
				if(comIndex[i].length == 6)										// ffffff	꼴
					comIndex[i] = ("0x" + comIndex[i]);
				if(comIndex[i].length == 8){									// 0xffffff 꼴
					if(comIndex[i].substr(0, 2) != "0x") return NC.caution("올바르지 않은 색상 코드입니다. " + CM.recommendCom("관련 ", "?uniform"), player.id);
					if(hexStr.test(comIndex[i].substr(2)) == false) return NC.caution("올바르지 않은 색상 코드입니다. " + CM.recommendCom("관련 ", "?uniform"), player.id);
					comIndex[i] = comIndex[i].toUpperCase();
				}
				else{ 
					if(NC.setColor(comIndex[i]) != "0xFFFFFF") comIndex[i] = NC.setColor(comIndex[i]);
					else return NC.caution("올바르지 않은 색상 코드입니다. " + CM.recommendCom("관련 ", "?uniform"), player.id);
				}
			}
			switch(comIndex.length){
				case 4: PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3]]);
					break;
				case 5: PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3], comIndex[4]]);
					break;
				case 6:	PS.setTeamColors(comIndex[0], comIndex[1], comIndex[2], [comIndex[3], comIndex[4], comIndex[5]]);
					break;
				default: return NC.caution("올바르지 않은 명령어 입력입니다. " + CM.recommendCom("관련 ", "?uniform"), player.id);
			}
			SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 유니폼을 변경함 " + '<' + comMsg + '>', SYS.logType.NOTICE);
			return false;
		}
		this.setJoinPlayer = function(player, team){							//						플레이어 투입
			if(AMN.teamsLock == true) return NC.acess(player);		// 팀 이동 금지 처리
			if(PS.members[player].team == team) return NC.caution("중복된 명령어입니다.", player);
			else if(PS.members[player].asleep){ 
				return NC.caution("게임 참여 의사가 없어 플레이할 수 없습니다. " + CM.recommendCom("관련 ", "!afk"), player);
			}
			else{
				switch(team){  // 0: 관중, 1: 레드, 2: 블루
					case TEAM.SPECTATOR:
						NC.notice(GM.getTeamMark(team) + "으로 이동했습니다.", player); break;
					case TEAM.RED: case TEAM.BLUE: 
						NC.notice(SYS.showPlayerInfo(player, "name") + "님이 " + GM.getTeamMark(team) + "으로 참가했습니다."); break;
				}
				room.setPlayerTeam(player, team);
			}
			return false;
		}
		this.setJoinSpec	= (player) => CM.setJoinPlayer(player.id, TEAM.SPECTATOR);		//	 0: 관중
		this.setJoinRed		= (player) => CM.setJoinPlayer(player.id, TEAM.RED);			// 	 1: 레드
		this.setJoinBlue	= (player) => CM.setJoinPlayer(player.id, TEAM.BLUE);			//	 2: 블루
		this.setMute = function(player, msg){									// !mute ID			|	채팅 금지
			if(AMN.getAdminstats(player.id)){
				if(PS.cntPlayers() > 1){
					let sPos = msg.indexOf(' ');
					let dId = parseInt(msg.substr(sPos + 1));
					if(dId == PS.getLocalId(player.id)) 
						return NC.caution("자기 자신의 채팅을 금지할 수 없습니다.", player.id);
					if((dId > 0)&&(dId <= PS.cntPlayers())) return AMN.setMute(PS.getPublicId(dId), player.id);
					else{
						NC.caution(
						+ "올바르지 않은 값입니다. " 
						+ "1부터 " + PS.cntPlayers() + "까지 값을 입력하세요."
						, player.id);
					}
				}
				return false;
			}
			return NC.acess(player.id);
		}
		this.setSleep = function(player){										// !afk				|	장기 대기 플레이어 설정
			if(!PS.members[player.id].asleep) return PS.setSleep(player.id, true);
			return PS.setSleep(player.id, false);
		}
		this.setRecording = function(player){									// !rec				|	녹화 시작/종료
			if(player.admin){
				if(GM.stateRecording) return GM.stopRecording();
				else return GM.startRecording();
			}
			else NC.acess(player.id);
			return false;
		}
		this.loadMap = function(player, msg){									// !load n			|	맵 로드 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let mapId = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				let mapData = maps[mapId - 1];
				if((mapId >= 1) && mapData){
					room.stopGame();
					room.setCustomStadium(mapData);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 " + mapId + "번 맵으로 교체함.", SYS.logType.NOTICE);
				}
				else{ 
					NC.caution("올바르지 않은 ID입니다." + CM.recommendCom("관련 ", "!maplist"), player.id);
					SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 맵 교체를 시도함 (실패).", SYS.logType.NOTICE);
				}
			}
			else NC.acess(player.id);
			return false;
		}
		this.clearTeamColors = function(player, msg){							// !clear_uniform	|	유니폼 초기화 명령어
			let sPos = msg.indexOf(' ');
			let team = msg.substr(sPos + 1, 1);
			if(msg.search(' ') == -1) return false;
			switch(team){
				case "1": case 'r': case "레드": case "레": case "red":	
					team = 1; break;
				case "2": case 'b': case "블루": case "블": case "blue":
					team = 2; break;
				default: return NC.caution("숫자(1~2) 또는 문자(red, blue)로 입력하세요.", player.id);
			}
			SYS.log(true, SYS.showPlayerInfo(player.id) + "(이)가 " + GM.getTeamMark(team) + "의 유니폼을 초기화함", SYS.logType.NOTICE);
			PS.clearTeamColors(team);
			return false;
		}
		this.clearBans = function(player){										// !clearbans		|	영구 퇴장 명단 초기화 명령어
			if(AMN.getAdminstats(player.id)) return AMN.clearBans(player.id);
			else return NC.acess(player.id);
		}
		// ------------이스터에그------------------
		this.joke = function(player, msg){										//	!넝담			|	joke 명령어
			CS.sendMsg("전체 " + CS.getFace(1) + "AlphaGo" + CS.getFace(1) + ": 헤헤헷, 들켜버렸군, eigu.", player.id);
			return false;
		}
		this.hawawa = function(player, msg){									//	그치만			|	킹치만 명령어
			CS.sendMsg("전체 " + CS.getFace(10) + "AlphaGo" + CS.getFace(10) + ": ...이렇게라도 하지 않으면...지켜봐주지 않는 걸...", player.id);
			return false;
		}
		this.taebo = function(player, msg){										//	태보해 			|	태보 응답
			CS.sendMsg("전체 " + CS.getFace(2) + "AlphaGo" + CS.getFace(2) + ": @(^0^)==@ 절대 태보해! @==(^0^)@", player.id);
			return false;
		}
		this.jongikannemohyung = function(player, msg){
			CS.sendMsg("전체 (2)" + PS.mark[0] + player.name + ": 본인 방금 네모형 되는 상상함. 하지만 어림도 없지!", player.id);
			return false;
		}
	}
}
//-----------------------------------------------------------------------
// 플레이어 클래스
//-----------------------------------------------------------------------
class Player{														
	constructor() {
		this.mark = [									// 주권한, 보조권한, 일반, 블랙리스트
			"🟡", "🟢", "⚪", "🔘",
			"🚫", "🔴", "🔵",
		];
		//this.cntPlayers		 	= 0;					// 플레이어 인원 체크
		this.members 			= new Array();			// 플레이어 정보 데이터
		let network 			= new Array();			// 플레이어 공용 네트워크
		let address 			= new Array();			// 플레이어 공용 주소
		this.afkList 			= new Array();			// 장기 대기 플레이어 목록(자동)
		this.blacklist			= new Array();			// 블랙리스트 명단
		this.onPlayerTeamChange = function(player, byPlayer){	// 팀 교체
			// 대기열 플레이어 파악
			if(NOPLAYER && AMN.getHostLock()) AMN.setHostLock(false);
			if((AMN.getHostLock() == true)&&(room.getPlayer(0).team != 0)) room.setPlayerTeam(0, 0);
			if(player.id > 0){ 
				if((PS.members[player.id].asleep == true)&&(player.team != 0)) 
					PS.setTeam(player.id, 0);
				PS.members[player.id].team = player.team;
			}
			return false;
		}
		this.onPlayerActivity = function(player){				// 플레이어 동작 체크
			PS.afkList[player.id] = TM.getTime();
			return false;
		}
		this.initMember = function(data){						// 플레이어 정보 데이터 초기화		
			this.members[data.id] = { 
				"name": data.name, "team": 0, "id": data.id, "pId": PS.cntPlayers(), 
				"admin": false, "sub_admin": false, "isMute" : false, "asleep": false, 
				"chatmode": 0, "disrupt": true, "stats": new Array(),
				"radius" : null, "xGravity" : null, "yGravity" : null
			};
		}
		this.initBlacklist = function(sp, name, adrs){			// 블랙리스트 초기화
			PS.blacklist[PS.blacklist.length] = {
				"super" : (!sp ? false : sp), "name" : (!name ? undefined : name), "ip" : (!adrs ? undefined : adrs)
			};
			return false;
		}		
																// 플레이어 객체 구하기
		this.getPlayer = index => room.getPlayerDiscProperties(index) ? room.getPlayerDiscProperties(index) : false;
																// 플레이어 X 중력 구하기
		this.getGravityX = index	=> PS.getPlayer(index) ? PS.getPlayer(index).xgravity : false;
																// 플레이어 Y 중력 구하기
		this.getGravityY = index	=> PS.getPlayer(index) ? PS.getPlayer(index).ygravity : false;
																// 플레이어 반지름 구하기
		this.getRadius = index		=> PS.getPlayer(index) ? PS.getPlayer(index).radius : false;
																// 플레이어 바운스 구하기
		this.getBcoeff = index		=> PS.getPlayer(index) ? PS.getPlayer(index).bCoeff : false;
																// 플레이어 역질량 구하기
		this.getInvMass = index 	=> PS.getPlayer(index) ? PS.getPlayer(index).invMass : false;
																// 플레이어 제동 구하기
		this.getDamping = index		=> PS.getPlayer(index) ? PS.getPlayer(index).dapming : false;
		this.getLocalId = function(PublicId){					// 플레이어 개인 id 확인(공용 id)
			for(let i = 1; i <= PS.cntPlayers(); i++)
				if(PublicId == PS.getPublicId(i)) return i;
			return false;
		}
		this.getPublicId = function(PrivateId){					// 플레이어 공용 id 확인(개인 id)
			if(PrivateId == 0) return 0;
			let i = 1;
			while(1){
				if(PS.members[i] == undefined) break;
				if(PS.members[i].pId == PrivateId) return PS.members[i].id;
				i++;
			}
			return false;
		}
																// 플레이어 X좌표 가져오기
		this.getPosX = player 		=> PS.getPlayer(player) ? PS.getPlayer(player).x : false;
																// 플레이어 Y좌표 가져오기
		this.getPosY = player 		=> PS.getPlayer(player) ? PS.getPlayer(player).y : false;
																// 플레이어 X 속도 구하기
		this.getSpeedX = index		=> PS.getPlayer(index) ? PS.getPlayer(index).xspeed : false;
																// 플레이어 Y 속도 구하기
		this.getSpeedY = index		=> PS.getPlayer(index) ? PS.getPlayer(index).yspeed : false;
																// 플레이어 좌표 가져오기
		this.getPosition = player 	=> PS.getPlayer(player) ? {"x" : PS.getPlayer(player).x, "y" : PS.getPlayer(player).y} : false;
																// 플레이어 공용 주소 가져오기
		this.getAddress = searchId	=> address[searchId] ? address[searchId] : SYS.sendError(SYS.errorType.E_PLAYER_CONN);
																// 플레이어 공용 네트워크 가져오기
		this.getNetwork = searchId	=> network[searchId] ? network[searchId] : SYS.sendError(SYS.errorType.E_PLAYER_AUTH);
																// 접속자 인원
		this.cntPlayers = ()		=> NOPLAYER ? room.getPlayerList().length : room.getPlayerList().length - 1;
																// 플레이어 좌표 지정
		this.setPosition = (player, x, y)	=> room.setPlayerDiscProperties(player, {"x" : x, "y" : y});
																// 플레이어 X 좌표 지정
		this.setPosX = (player, x)			=> room.setPlayerDiscProperties(player, {"x" : x});
																// 플레이어 Y 좌표 지정
		this.setPosY = (player, y)			=> room.setPlayerDiscProperties(player, {"y" : y});
																// 플레이어 X 중력 지정
		this.setGravityX = (player, gravityX)	=> room.setPlayerDiscProperties(player, {"xgravity" : gravityX});
																// 플레이어 Y 중력 지정
		this.setGravityY = (player, gravityY)	=> room.setPlayerDiscProperties(player, {"ygravity" : gravityY});
																// 플레이어 반지름 지정
		this.setRadius = (player, r)	=> room.setPlayerDiscProperties(player, {"radius" : r});
																// 플레이어 바운스 지정
		this.setBcoeff = (player, b)	=> room.setPlayerDiscProperties(player, {"bcoeff" : b});
																// 플레이어 역질량 지정
		this.setInvMass = (player, m)	=> room.setPlayerDiscProperties(player, {"invMass" : m});
																// 플레이어 제동 지정
		this.setDamping = (player, d)	=> room.setPlayerDiscProperties(player, {"damping" : d});
		this.setAvatar = function(player, msg){					// 등번호 설정
			let sPos = msg.indexOf(' ');
			let avaStr = msg.substr(sPos + 1);
			room.setPlayerAvatar(player.id, avaStr);
			NC.notice("등번호가 변경되었습니다.", player.id);
			return false;
		}
		this.setSleep = function(player, sleep){				// 장기 대기 플레이어 설정
			if(sleep) return PS.setSleepPlayer(player);
			return PS.deleteSleepPlayer(player);
		}
		this.setTeam = function(id, team){						// 팀 지정
			if(team >= 0 && team <= 2){
				room.setPlayerTeam(id, team);
			}
			return false;
		}
																// 팀 유니폼 지정
		this.setTeamColors = function(team, angle, txtColor, bgColor){
			NC.notice(GM.getTeamMark(team) + "의 유니폼이 변경되었습니다.");
			return room.setTeamColors(team, angle, txtColor, bgColor);
		}
		this.setAddress = function(player, addrs){				// 플레이어 공용 주소
			if(address[player] == undefined){ 
				address[player] = addrs;
				return true;
			}
			return false;
		}
		this.setNetwork = function(player, net){				// 플레이어 공용 네트워크
			if(network[player] == undefined){ 
				network[player] = net;
				return true;
			}
			return false;
		}
		this.setSleepPlayer = function(player){					// 장기 대기 플레이어 추가
			PS.members[player].asleep = true;
			if(PS.members[player].team != 0) room.setPlayerTeam(player, 0);
			CS.sendHideChat(player, SYS.showPlayerInfo(player, "name") + "님이 자리를 비웠습니다.", true);
			NC.notice("자리를 비웠습니다. 게임에 다시 참여하려면 명령어를 한 번 더 입력하세요. ", player, "!afk");
			SYS.log(true, "대기열 추가: " + SYS.showPlayerInfo(player));
			return false;
		}
		this.updateMarks = function(){							// 플레이어 마크 갱신
			for(let i = 0; i < PS.cntPlayers(); i++)
				this.checkMarks(PS.members[PS.getPublicId(i)]);
			return true;
		}
		this.updatePlayers = function(player){					// 플레이어 정보 갱신
			// 한 칸씩 채우기
			if(PS.cntPlayers() == 1) return false;
			for(let i = PS.getLocalId(player) + 1; i <= PS.cntPlayers; i++)
				PS.members[PS.getPublicId(i)].pId--;
			return false;
		}
		this.updateAccount = function(player){					// 중복 계정 갱신
			for(let i = PS.members.length; i > 0; i--){	// 공용 네트워크인 경우
				if((i != player)&&(network[i] == network[player])){
					let orObj		= JSON.parse(JSON.stringify(PS.members[i]));
					let name		= orObj.name;
					let privateId	= PS.getLocalId(player);

					PS.members[player]		= orObj;
					PS.members[player].name	= name;
					PS.members[player].id	= player;
					PS.members[player].pId	= privateId;

					if((PS.members[i].name == name)&&(PS.getLocalId(i))) AMN.setKick(i);	// 다중 접속
					if(AMN.getAdminstats(player) == 2) AMN.setAdmin(player);			// 권한 기록 복원
					else if(AMN.getAdminstats(player) == 1) AMN.setSubAdmin(player);	// 보조 권한 기록 복원
					if((PS.getLocalId(i)) && (room.getPlayerList()[PS.getLocalId(i) - 1].id != i)) AMN.setKick(i, "예기치 않은 오류");
					return true;
				}
				//if(PS.members[i].pId)
				//if(AMN.filterPlayer(player) == true) 
			}
			return false;
		}
		this.checkMarks = function(player, type){				// 플레이어 마크 정보
			switch(type){
				case 1: case 2:	return this.mark[player.team + 4];	// 팀별 채팅 감지
				case 3:			return this.mark[4];					// 욕설 필터 감지
			}
			if(AMN.checkBlacklists(player.id)) return PS.mark[3];		// 블랙리스트
			switch(AMN.getAdminstats(player.id)){
				case 1:	return this.mark[1];			// 보조 권한
				case 2:	return this.mark[0];			// 주권한
				default: return this.mark[2];			// 일반
			}
		}
		this.clearMember = function(data){						// 플레이어 정보 데이터 지우기
			this.members[data.id].team = 0;
			this.members[data.id].pId = null;
			this.members[data.id].asleep = false;
			this.members[data.id].chatmode = 0;
			this.members[data.id].disrupt = true;
		}
		this.clearTeamColors = function(team){					// 팀 유니폼 초기화
			if(team == TEAM.RED) room.setTeamColors(team, 0, 0xFFFFFF, [0xE46E4C]);
			else if(team == TEAM.BLUE) room.setTeamColors(team, 0, 0xFFFFFF, [0x5688E4]);
			NC.notice(GM.getTeamMark(team) + "의 유니폼이 초기화되었습니다.");
		}
		this.deleteSleepPlayer = function(player){				// 장기 대기 플레이어 제거
			PS.members[player].asleep = false;
			NC.notice("게임에 바로 참여할 준비가 되었습니다! ", player, "!join");
			SYS.log(true, "대기열 제거: " + player + '(' + PS.getLocalId(player) + ')' + PS.members[player].name);
			return false;
		}
		this.resetAvatar = function(player){					// 등번호 초기화
			room.setPlayerAvatar(player.id, PS.getLocalId(player.id));
			return false;
		}
	}
}
//-----------------------------------------------------------------------
// 점수 클래스
//-----------------------------------------------------------------------
class Scores{
	constructor(){
		let totalRedGoals	= 0;			// 레드팀 골 개수(누적)
		let totalBlueGoals	= 0;			// 블루팀 골 개수(누적)
		let touchedList = new Array();		// 선두 선수 목록
		let collisionRange	= 1.25;			// 충돌 범위 민감도
		this.rankList		= new Array();	// 랭킹 정보
		// 점수 증차감 정도
		this.scoreList		= {"win" : 3, "lost" : -3, "goal" : 5, "ownGoal" : -5, "assist" : 2};
		this.initStatus = function(player){						// 플레이어 점수 정보 초기화
			PS.members[player].stats = {
				"win" : 0, "lost": 0, "goal" : 0, "ownGoal" : 0, "assist" : 0
			};
		}
		this.initRanking = function(player){					// 랭킹 초기화
			SC.rankList.push(player);
		}
		this.initTouchedList = function(index, player){		// 선두 선수 ID 지정
			touchedList[index] = {
				"id" : player,
				"time" : SC.getGameTime(),
				"pos" : PS.getPosition(player),
				"disc" : SC.getDiscPosition(0)
			};
		}
																// 득점 골 구하기
		this.getRedGoals = ()			=> room.getScores() != null ? room.getScores().red : 0;
		this.getBlueGoals = ()			=> room.getScores() != null ? room.getScores().blue : 0;
																// 누적 골 구하기
		this.getTotalRedGoals = ()		=> totalRedGoals;
		this.getTotalBlueGoals = ()		=> totalBlueGoals;
		this.getWinner = function(){							// 승리 팀 판정
			if(SC.getRedGoals() > SC.getBlueGoals()) return 1; 		// 레드팀 승
			if(SC.getRedGoals() < SC.getBlueGoals()) return 2; 		// 블루팀 승
			return 3;	// 무승부
		}												// 게임 시간 구하기
		this.getGameTime = ()	=> room.getScores().time;
																// 플레이어 점수 정보 얻기
		this.getStatsWin	= index => PS.members[index].stats.win;			// 승리
		this.getStatsLost	= index => PS.members[index].stats.lost;		// 패배
		this.getStatsGoal	= index => PS.members[index].stats.goal;		// 득점 골
		this.getStatsOG		= index => PS.members[index].stats.ownGoal;		// 실점 골
		this.getStatsAssist	= index => PS.members[index].stats.assist;		// 도움
		this.getPlayerScores = function(player){				// 플레이어 점수 계산
			return(
			this.getStatsWin(player) * this.scoreList.win		// 승리 	득3점
			+ this.getStatsGoal(player) * this.scoreList.goal	// 득점 골	득5점
			+ this.getStatsAssist(player) * this.scoreList.assist	// 도움		득2점
			+ this.getStatsLost(player) * this.scoreList.lost	// 패배 	실3점
			+ this.getStatsOG(player) * this.scoreList.ownGoal	// 실점 골 	실5점
			);
		}
		this.getRanking = function(player){						// 랭킹 등수 구하기
			for(let i = 0; i < SC.rankList.length; i++)
				if(SC.rankList[i] == player) return (i + 1);
			return false;
		}
																// 디스크 객체 구하기
		this.getDisc =			index => room.getDiscProperties(index) ? room.getDiscProperties(index) : false;
																// 디스크 좌표 구하기
		this.getDiscPosition =	index => SC.getDisc(index) ? {"x" : SC.getDisc(index).x, "y" : SC.getDisc(index).y} : false;
																// 디스크 X 좌표 구하기
		this.getDiscPosX =		index => SC.getDisc(index) ? SC.getDisc(index).x : false;
																// 디스크 Y 좌표 구하기
		this.getDiscPosY =		index => SC.getDisc(index) ? SC.getDisc(index).y : false;
																// 디스크 X 속도 구하기
		this.getDiscSpeedX =	index => SC.getDisc(index) ? SC.getDisc(index).xspeed : false;
																// 디스크 Y 속도 구하기
		this.getDiscSpeedY =	index => SC.getDisc(index) ? SC.getDisc(index).yspeed : false;
																// 디스크 X 중력 구하기
		this.getDiscGravityX =	index => SC.getDisc(index) ? SC.getDisc(index).xgravity : false;
																// 디스크 Y 중력 구하기
		this.getDiscGravityY =	index => SC.getDisc(index) ? SC.getDisc(index).ygravity : false;
																// 디스크 반지름 구하기
		this.getDiscRadius =	index => SC.getDisc(index) ? SC.getDisc(index).radius : false;
																// 디스크 바운스 구하기
		this.getDiscBcoeff =	index => SC.getDisc(index) ? SC.getDisc(index).bCoeff : false;
																// 디스크 역질량 구하기
		this.getDiscInvMass =	index => SC.getDisc(index) ? SC.getDisc(index).invMass : false;
																// 디스크 제동 구하기
		this.getDiscDamping =	index => SC.getDisc(index) ? SC.getDisc(index).dapming : false;
																// 디스크 색상 구하기
		this.getDiscColor =		index => SC.getDisc(index) ? (SC.getDisc(index).color).toString(16) : false;
																// 디스크 충돌 마스크 구하기
		this.getDiscColMask =	index => SC.getDisc(index) ? SC.getDisc(index).cMask : false;
																// 디스크 충돌 그룹 구하기
		this.getDiscColGroup =	index => SC.getDisc(index) ? SC.getDisc(index).cGroup : false;
																// 두 객체 간 거리 구하기
		this.getDistance =	(a, b) => (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2));
		this.getTouchedList = () => touchedList;
		this.getLastTouchedPlayer   = () => touchedList[0].id;					// 선두 선수 구하기
		this.getLastTouchedPosition = () => touchedList[0].pos;					// 선두 디스크 좌표 구하기
		this.getLastTouchedTime     = () => touchedList[0].time;				// 선두 시간 구하기
		this.getLastTouchedDisc     = () => touchedList[0].disc;				// 선두 디스크 좌표 구하기
		this.getAssist = function(){							// 득점자 인식률 조정 및 어시스트 구하기
			if((SC.getLastTouchedPlayer())&&(touchedList.length > 1)){				// 득점자 인식률 조정
				let list = SC.getTouchedList();
				let last = SC.getLastTouchedPlayer();
				for(let i = 1; i <= list.length; i++){		// 득점저의 ID가 같지 않고, 같은 팀일 경우
					if((last != list[i].id)&&(PS.members[last].team == PS.members[list[i].id])) 
						return list[i].id;
				}
			}
			return 0;			// 어시스트 없음
		}
		this.getCollRange			= () => collisionRange;		// 충돌 범위 민감도 구하기
		this.sendRanking = function(index, player){				// 랭킹 메시지 보내기
			let startIndex = SC.getRanking(index) - 2;
			let endIndex = SC.getRanking(index) + 1;
			if(SC.rankList.length <= 3){								// 랭킹이 3명 이하면
				startIndex = 0;
				endIndex = SC.rankList.length;
			}
			else if(SC.getRanking(index) == 1){							// 플레이어가 1등이면
				startIndex = 0;
				endIndex = 3;
			}
			else if(SC.getRanking(index) == SC.rankList.length){		// 플레이어가 꼴등이면
				startIndex = SC.getRanking(index) - 3; 
				endIndex = SC.getRanking(index);
			}
			for(let i = startIndex; i < endIndex; i++){
				if(SC.rankList[i] == index) NC.announce(SC.showRankingStats(SC.rankList[i]), player, null, "small-bold", "muted");
				else NC.announce(SC.showRankingStats(SC.rankList[i]), player, null, "small", "muted");
			}
			return false;
		}
        this.addTouchedList = function(index){
            if(touchedList.length == 0) return this.initTouchedList(0, index);
			for(let i = touchedList.length - 1; i > 0; i--){
				touchedList[i] = touchedList[i - 1];
			}
			this.initTouchedList(0, index);
			return true;
        }
		this.setCollRange = function(scale){					// 충돌 범위 민감도 지정
			collisionRange = scale;
		}
																// 플레이어 점수 정보 지정
		this.setStatsWin	= (index, value) => PS.members[index].stats.win 	= value;	// 승리
		this.setStatsLost	= (index, value) => PS.members[index].stats.lost	= value;	// 패배
		this.setStatsGoal	= (index, value) => PS.members[index].stats.goal 	= value;	// 득점 골
		this.setStatsOG		= (index, value) => PS.members[index].stats.ownGoal	= value;	// 실점 골
		this.setStatsAssist = (index, value) => PS.members[index].stats.assist	= value;	// 어시스트
		this.setRanking = function(newIndex, oldIndex){				// 랭킹 지정
			let temp = SC.rankList[oldIndex];
			SC.rankList[oldIndex] = SC.rankList[newIndex];
			SC.rankList[newIndex] = temp;
		}
		this.updateTouchedList = function(id){				// 선두 선수 갱신
			let ball = SC.getDisc(0);
			let player = PS.getPlayer(id);
			// 공(A), 플레이어(B) 충돌 판정		| (Ax-Bx)^2+(Ay-By)^2 <= (Ar+Br)^2
			if(SC.getDistance(ball, player) <= Math.pow(Math.round((ball.radius + player.radius) * collisionRange), 2)){
				if(this.getLastTouchedPlayer() == id) return false;
				this.addTouchedList(id);
				this.rectifyTouchedList();	// 유효한 기록인지 검사
				return true;
			}
			return false;
		}
		this.updateTotalGoals = function(){						// 누적 골 판정 갱신
			totalRedGoals += SC.getRedGoals();
			totalBlueGoals += SC.getBlueGoals();
			return false;
		}
		this.updateRanking = function(){						// 랭킹 갱신
			for(let i = 0; i < SC.rankList.length; i++){
				if(SC.rankList[i] == undefined){ 			// 빈 부분 채우기
					SC.rankList.splice(i, 1);
					if((SC.rankList.length - 1) == i) return false;
				}
				for(let j = 1; j < PS.members.length; j++){
					if(SC.rankList[i] != j){
						// 점수가 높음
						if((SC.getPlayerScores(SC.rankList[i]) > SC.getPlayerScores(j)) && (i + 1 > SC.getRanking(j))){
							SC.setRanking(i, SC.getRanking(j) - 1);
						}	
						// 점수가 낮음
						else if((SC.getPlayerScores(SC.rankList[i]) < SC.getPlayerScores(j)) && (i + 1 < SC.getRanking(j))){
							SC.setRanking(SC.getRanking(j) - 1, i);
						}
						// 점수가 같음
						else if((SC.getPlayerScores(SC.rankList[i]) == SC.getPlayerScores(j)) && (i + 1 > SC.getRanking(j))){
							SC.setRanking(i, SC.getRanking(j) - 1);
						}
					}
				}
			}
			return true;
		}
		this.rectifyTouchedList = function(){					// 선두 선수 유효성 검사
			for(let i = touchedList.length - 1; i >= 0; i--){
				if((touchedList[i].id <= 0)||(touchedList[i].id > PS.members.length))
					touchedList.splice(i, 1);
				else if(PS.getLocalId(touchedList[i].id) == false)
					touchedList.splice(i, 1);
			}
		}
		this.clearTouchedList = function(){						// 선두 목록 지우기
			touchedList.splice(0);
			touchedList[0] = {
				"id" : null,
				"time" : null,
				"pos" : null,
				"disc" : null
			};
		}
		this.showPlayerStats = function(player){				// 플레이어 점수 정보 출력
			let result = 
			"현재 점수(순위): " + SC.getPlayerScores(player) + "점" + '(' + SC.getRanking(player) + "등" + ')'
			+ ' | ' + ((SC.getStatsWin(player) + SC.getStatsLost(player)) + "판" 
			+ ' ' + SC.getStatsWin(player) + "승" 
			+ ' ' + SC.getStatsLost(player) + "패"
			+ ' | ' + SC.getStatsAssist(player) + "도움"
			+ ' ' + (SC.getStatsGoal(player) + SC.getStatsOG(player)) + "골");
			if(SC.getStatsOG(player) > 0) result += ('(' + "자책: " + SC.getStatsOG(player) + "골" + ') '
			);
			return result;
		}
		this.showRankingStats = function(player){				// 랭킹 상세 정보 출력
			return (SC.getRanking(player) + "등" 
			+ '| ' +  SC.getPlayerScores(player) + "점"
			+ '| ' + '(' + player + ')' + PS.members[player].name);
		}
	}
}
//-----------------------------------------------------------------------
// 시간 매니저 클래스
//-----------------------------------------------------------------------
class TimeManager{													
	constructor(){
		let year, month, day;			// 연, 월, 일
		let hour, min, sec		// 시, 분, 초
		let coMark = '-', tiMark = ':';
		this.temp = Date.getMinutes;
		//-----------------------날짜 및 시간----------------------------------------------
		this.getDate = function(){ 								// 날짜 및 시간 반환
			return TM.updateDate();
		}
		this.updateTimsg = function(){							// 날짜 및 시간 갱신
			date = new Date();
			year = date.getFullYear(); month = (date.getMonth() + 1); day = date.getDate();
			hour = date.getHours(); min = date.getMinutes(); sec = date.getSeconds();
			return date;
		}
		this.showDate = function(){ 							// 날짜 및 시간 출력
			TM.getDate();
			return (this.showTimsg() + '| ' + this.showTime());
		}
		this.updateNums = function(kind, width){				// xx 형식으로 맞추기
			kind = kind + '';
			return kind.length >= width ? kind : new Array(width - kind.length + 1).join('0') + kind;
		}
		this.optimizationTime = function(){						// 단위 보정
			this.updateNums(month, 2);
			this.updateNums(day, 2);
			this.updateNums(hour, 2);
			this.updateNums(min, 2);
			this.updateNums(sec, 2);
		}
		//-----------------------날짜----------------------------------------------------
		this.getTimsg = function(){ 							// 날짜 반환
			return this.updateTimsg();
		}
		this.getMonth = function(){								// 월 변환
			return this.updateMonth();
		}
		this.updateDate = function(){							// 날짜 갱신
			date = new Date();
			year = date.getFullYear(); month = (date.getMonth() + 1); day = date.getDate();
			return date;
		}
		this.updateMonth = function(){							// 월 갱신
			month = date.getMonth() + 1;
			return month;
		}		
		this.showTimsg = function(){ 							// 날짜 출력
			this.getTimsg(); 
			this.optimizationTime();
			return (year
				+ coMark + this.updateNums(month, 2)
				+ coMark + this.updateNums(day, 2));
		}	
		this.showMonth = function(){							// 월 출력
			return this.updateNums(this.getMonth(), 2);
		}
		//-----------------------시간----------------------------------------------------
		this.getTime = function(){ 								// 시간 반환
			return this.updateTime();
		}
		this.updateTime = function(){							// 시간 갱신
			date = new Date();
			hour = date.getHours(); min = date.getMinutes(); sec = date.getSeconds();
			// 초 단위로 변환
			return ((hour * 3600) + (min * 60) + sec);
		}	
		this.showTime = function(){ 							// 시간 출력
			this.getTime(); 
			this.optimizationTime();
			return (
				this.updateNums(hour, 2)
				+ tiMark + this.updateNums(min, 2)
				+ tiMark + this.updateNums(sec, 2)
			);
		}
		this.showNormalTime = function(){						// Windows 작업 표시줄 형식으로 출력
			this.getTime(); 
			this.optimizationTime();
			// 오후
			if(hour >= 12) return ('|' + (this.updateNums(hour, 2) - 12) + tiMark + this.updateNums(min, 2) + " PM" + '|');
			// 오전
			return ('|' + this.updateNums(hour, 2) + tiMark + this.updateNums(min, 2) + " AM" + '|');
		}
	}
}
//-----------------------------------------------------------------------
// 시스템 클래스
//-----------------------------------------------------------------------
class IoSystem{			
	constructor(){
		// 콘솔창 입출력
		let initialized				= false;
		let VersionRoom 			= "v8.79";			// 방 버전
		let VersionUMUX  			= "C";			// UMUX 버전(건드리지 마시오)
		let SecurityPatchLevel		= "2020.10.01";		// UMUX 보안 패치 수준(건드리지 마시오)
		this.logType				= { NORMAL: 0, NOTICE: 1, BELL: 2, SEND: 31, BINDING: 32, WARNING: 41, ERROR: 42 };
		this.errorType				= { 
			E_PLAYER_INFO: 100, E_PLAYER_AUTH: 101, E_PLAYER_CONN: 102, E_PLAYER_PID: 103, E_PLAYER_LID: 104, E_PLAYER_ADMIN: 105, E_PLAYER_NAME: 106,
			E_ETC: 900
		};
		this.newLine				= "\n";				// 개행 문자
		this.initServer = function(){
			if(initialized == true) return this.log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", SYS.logType.ERROR);
			console.clear();
			alert(
				 "유즈맵 대표카페(이하 UM)에서 진행하고 있는 한국어화 유즈맵 봇방 프로젝트로, "
				 + this.newLine + "사용자 인터페이스(UI)뿐만 아니라 플레이의 매사 모든 순간까지 아우르는 사용자 경험(UX)입니다."
				+ this.newLine + "아래와 같은 항목들을 준수한다면 누구나 자유롭게 수정이 가능합니다."
				+ this.newLine
				+ this.newLine + "* 원저작자 표기"
				+ this.newLine + "* UMUX 버전 표기"
				+ this.newLine + "* 그 외 기타 사항 및 라이센스는 여기서 확인하십시오. "
				+ this.newLine + "	github.com/HonestSquare/UMUX/blob/master/LICENCE"
			);
			while(1){
				let unlockCode = (Math.floor(Math.random() * 9000) + 1000);
				let permission = prompt(
					"*UMUX 버전 및 기반임을 표기*"
					+ this.newLine + "인게임에서 누구나, 제약 없이, 명령어 등의 보편적인 수단으로 접근하여 UMUX 이름표기를 직접 확인할 수 있어야 합니다."
					+ this.newLine + "기본적으로는 Commands 클래스의 infoRoom() 메서드에서 접근할 수 있으며, 확인할 수 있습니다."

					
					+ this.newLine + this.newLine + "*재배포 및 코드 수정 금지*"
					
					+ this.newLine + this.newLine + "*UMUX Beta Program임을 확인할 수 있게 방제에도 표기*"
					+ this.newLine + "예시: "
					+ this.newLine + "const ROOMNAME: \"[UMBP] 핫휴 3ㄷ3\""
					+ this.newLine + "const ROOMNAME: \"[UMUX BETA] 핫휴 3ㄷ3\""

					+ this.newLine + this.newLine + "*DEV 변수의 값은 항상 true로 설정해두기*"
					+ this.newLine + "설정: "
					+ this.newLine + "const DEV = true;"

					+ this.newLine + this.newLine + "*외국어 번역*"
					+ this.newLine + "소스 코드를 한국어 이외의 다른 언어로 번역해서 방을 열거나 배포하는 행위는 일절 금지합니다."

					+ this.newLine + this.newLine + "*UMUX 버전*"
					+ this.newLine + "UMUX의 시스템 영역이므로 절대 임의로 버전명을 변경하거나 변형하여서는 안 됩니다."

					+ this.newLine + this.newLine + this.newLine + "계속하려면 '동의" + unlockCode + "'를 입력하십시오."
				);
				if(permission == ("동의" + unlockCode)) break;
			}
			if(DEV == true){ 
				let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
				if(tempPass){ 
					alert("비밀번호가 설정되었습니다. " 
					+ this.newLine + this.newLine + "현재 비밀번호: " + tempPass 
					+ this.newLine + this.newLine + "확인을 눌러 계속하세요.");
					AMN.updatePassword(tempPass);
				}
				else alert("작업이 취소되었습니다." + this.newLine + "확인을 눌러 계속하세요.");
			}
			console.group("[서버 정보]");
			console.info("서버 이름: "+ ROOMNAME
				+ this.newLine + "최대 수용 인원: " + MAXPLAYERS
				+ this.newLine + "서버 버전: " 		+ VersionRoom
				+ this.newLine + "UMUX 기반 버전: " + VersionUMUX
				+ this.newLine + "서버 공개 여부: " + (PUBLIC ? "허용" : "차단")
				+ this.newLine + "보안 패치 수준: " + SecurityPatchLevel
				+ this.newLine + "지역 코드: " 		+ CODE.toUpperCase() 
				+ this.newLine  + "상세 위치(바로가기): " + LAT + ', ' + LON + '(' + "https://www.google.com/maps/place/" + ((LAT + "%20" + LON).toString()) + ')'
				);
			console.groupEnd();
			AMN.updatePassword(PASSWORD);
			//------------------------------------------------------------슈퍼 블랙리스트 초기화
			PS.initBlacklist(true, "에드", "34392E3137342E3133332E3131"), PS.initBlacklist(true, "에드", "3131382E33342E3235312E3334"), PS.initBlacklist(true, "에드", "37342E38322E36302E3832"),
			PS.initBlacklist(true, "에드", "36352E34392E3132362E3839"), PS.initBlacklist(true, "에드", "3132352E3138372E3133352E3239"), PS.initBlacklist(true, "에드", "37322E35322E38372E3737"), 
			PS.initBlacklist(true, "에드", "31342E34372E3131322E313232"), PS.initBlacklist(true, "에드", "3232312E3136352E3136332E313530"), PS.initBlacklist(true, "에드", "3138322E3232342E33312E313136"), 
			PS.initBlacklist(true, "에드", "3138332E3130302E3135362E32353"), PS.initBlacklist(true, "에드", "3138332E3130302E3135362E323532"), PS.initBlacklist(true, "에드", "3139382E31362E37342E323035"), 
			PS.initBlacklist(true, "에드", "37342E38322E36302E313739"), 
			PS.initBlacklist(true, "Walker", "34392E3137342E3133332E3131"), PS.initBlacklist(true, "페르난지뉴", "34392E3137342E3133332E3131"), PS.initBlacklist(true, "앙헬리노", "34392E3137342E3133332E3131"), 
			PS.initBlacklist(true, "Man from Wuhan", "34392E3137342E3133332E3131"), PS.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), PS.initBlacklist(true, "Knife", "34392E3137342E3133332E3131"), 
			PS.initBlacklist(true, "웨인 루니", "34392E3137342E3133332E3131"), PS.initBlacklist(true, undefined, "34392E3137342E3133332E3131"), PS.initBlacklist(true, "가즈으앗", "34392E3137342E3133332E3131"), 
			PS.initBlacklist(true, "어둠의 악마", "3231392E3234382E3230332E313430"),

			PS.initBlacklist(true, "Bone Collecter", "31342E342E3134342E313138"), PS.initBlacklist(true, "GRF SWORD", "31342E342E3134342E313138"),
			
			PS.initBlacklist(true, "카푸", "312E3233352E3136332E3730"), PS.initBlacklist(true, "카푸", "3130342E3133312E36362E38"), PS.initBlacklist(true, "카푸", "3231312E3235302E32332E323233"),
			PS.initBlacklist(true, "호박", "312E3233352E3136332E3730"), PS.initBlacklist(true, "호박", "3130342E3133312E36362E38"),

			PS.initBlacklist(true, "랄랄랄", "3132342E35392E37332E313931"), 
			
			PS.initBlacklist(true, undefined, "3138322E3232342E33312E3330"), PS.initBlacklist(true, undefined, "3130342E3133312E3137362E323334"), 
			PS.initBlacklist(true, undefined, "3137382E36322E352E313537"), PS.initBlacklist(true, undefined, "3137382E3132382E38392E313530"),

			PS.initBlacklist(true, "제몸무게가 220kg인데 정상인가요", "3130342E3233362E3231332E323330"),
			PS.initBlacklist(true, "아이유", "36312E3235352E382E313532"),

			PS.initBlacklist(true, "와이어샤크", "33392E3132302E3139362E3732"),
			PS.initBlacklist(true, "Ready", "3138332E39372E3138302E313534"), PS.initBlacklist(true, "Ready", "3138332E39372E3138302E313334"), PS.initBlacklist(true, "Ready", "3132312E3137352E3134372E313236"),

			PS.initBlacklist(true, "서든", "31342E34372E3131322E313330"), PS.initBlacklist(true, "프레버", "31342E34372E3131322E313330"), 
			PS.initBlacklist(true, "Preber", "31342E34372E3131322E313330"), PS.initBlacklist(true, "Preber", "37322E35322E38372E3937"), PS.initBlacklist(true, "Preber", "36352E34392E3132362E3931"), PS.initBlacklist(true, "Preber", "37322E35322E38372E3937"),

			PS.initBlacklist(true, "명인만두 서울대점", "36312E37352E38332E3732"), PS.initBlacklist(true, "좁밥수비수", "36312E37352E38332E3732"),
			PS.initBlacklist(true, undefined, "3132352E3137362E342E313335"), PS.initBlacklist(true, undefined, "3137352E3231342E392E3834"),
			PS.initBlacklist(true, "어드안주면인터넷찢는개", "312E3234362E3139332E313536"), 
			PS.initBlacklist(true, "쥐알티", "312E3234362E3139312E323134"),
			PS.initBlacklist(true, "겐류사이 육두봉", "3132312E3135332E3137302E323131"),

			PS.initBlacklist(true, "반다이크", "3131362E3132342E3137382E3433"),
			PS.initBlacklist(true, "반다이크", "3137352E3139372E3231392E313031"),

			
			PS.initBlacklist(true, "쁘이훈", "3132342E35332E3137362E3831"),
			PS.initBlacklist(true, "농협신", "3132352E3137392E3231312E3330"),
			PS.initBlacklist(true, "농협신", "3132352E3137392E3231312E3331"),
			PS.initBlacklist(true, "농협신", "3131382E3137362E34372E313233"),

			PS.initBlacklist(true, "Kubo Takefusa", "3131362E34322E32362E323235"),

			PS.initBlacklist(true, "노래하는메시", "3131382E3137362E34372E313332"),
			PS.initBlacklist(true, "노래하는메시", "3132352E3139312E37302E313031"),

			PS.initBlacklist(true, "지코", "3138352E3231322E3136392E313130"),	
			PS.initBlacklist(true, "지코", "3132312E38382E3137332E313735"),		

			PS.initBlacklist(true, undefined, "3138322E3232342E33312E313031"),
			PS.initBlacklist(true, undefined, "3131362E3132312E3233352E3830"),
			PS.initBlacklist(true, undefined, "3231312E3234332E3232322E3733"),
			PS.initBlacklist(true, undefined, "33392E3131372E37392E313337"),
			
			PS.initBlacklist(true, "drogba", "3131382E33322E37372E323531"),
			PS.initBlacklist(true, "드록바", "3131382E33322E37372E323531"),

			PS.initBlacklist(true, "경상도에서태어난아기를영국에서길렀더니내가나왔다", "3131382E362E32352E313034"),

			PS.initBlacklist(true, "soy el mas pro", "3139302E34392E3137302E313038"),
			PS.initBlacklist(true, "Ricardo", "3138362E3132332E3231352E3234"),

			PS.initBlacklist(true, "HYNN", "3231392E3130302E33372E323433"),

			PS.initBlacklist(true, "루니", "31342E33362E3231352E3936"),

			PS.initBlacklist(true, "제주스", "36342E36322E3231392E3232"),
			PS.initBlacklist(true, "네테로", "36342E36322E3231392E3232"),
			//------------------------------------------------------------블랙리스트 초기화
			// ***여기에 추가적으로 명단을 작성하십시오***  
            //  <예시> PS.initBlacklist(false, "알파고"), 또는 PS.initBlacklist(true, undefined, "12345678901234567890"),
			//------------------------------------------------------------
			this.log(true, "서버 가동 시작", this.logType.NOTICE);
			if(PASSWORD){
				if((DEV == true)||(PUBLIC == false)) SYS.setRequireRecaptcha(true);		// reCAPTCHA 활성화
			}
			initialized = true;
		}
		this.getServer				= () => initialized;
		this.getVersionRoom			= () => VersionRoom;
		this.getVersionUMUX			= () => VersionUMUX;
		this.getSecurityPatchLevel	= () => SecurityPatchLevel;
		this.setRequireRecaptcha = function(isActive){							// reCAPTCHA 자동 설정
			ROOM.setRequireRecaptcha(isActive);
			this.log(true, "reCAPTCHA가 " + ((isActive == true) ? "활성화" : "비활성화") + "됨", this.logType.NOTICE);
			(isActive == true) ? NC.locked(true, "reCAPTCHA가 설정되었습니다.") : NC.locked(false, "reCAPTCHA가 해제되었습니다.");
		}
		this.setLine = function(amount, line){									// 	자릿수 교정
			let list = 1;
			for(let i = 1; i < line; i++)
				list *= 10;
			return (amount < list ? String('0' + amount) : amount);
		}
		this.sendError = function(type){
			let msg = "알 수 없는 ";
			switch(type){
				case this.errorType.E_PLAYER_INFO:
					msg = "플레이어의 데이터를 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_AUTH:
					msg = "플레이어의 네트워크를 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_CONN:
					msg = "플레이어의 주소를 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_PID:
					msg = "플레이어의 공용 ID를 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_LID:
					msg = "플레이어의 로컬 ID를 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_ADMIN:
					msg = "플레이어의 권한을 읽을 수 없는 "
					break;
				case this.errorType.E_PLAYER_NAME:
					msg = "플레이어의 이름을 읽을 수 없는 "
					break;
				case this.errorType.E_ETC: default: break;
			}
			NC.caution(msg + "문제가 발생하였습니다.");
			return SYS.log(false, msg + "오류가 발생함", SYS.logType.ERROR);
			
		}
		this.log = function(io, msg, type){
			if(!msg) return false;
			// 출력, 입력
			let timeStatus = TM.showDate() + (io ? ' ▶ ' : ' ◀ '); 
			// 로그 유형 지정
			switch(type){
				case this.logType.NOTICE:
					return console.log("%s%c%s", 
					timeStatus, "color: #8ED2AB",
					msg);
				case this.logType.BELL:
					return console.log("%s%c%s",  
					timeStatus, "color: #FFE400",
					msg);
				case this.logType.SEND:
					return console.log("%s%c%s", 
					timeStatus, "color: #8B8B8B",
					msg);
				case this.logType.BINDING:
					return console.log("%s%c%s", 
					timeStatus, "color: #587489", 
					msg);
				case this.logType.WARNING:
					return console.warn("%s%c%s", 
					timeStatus, "color: #635000; background: #F8F6D3", 
					msg);
				case this.logType.ERROR:
					return console.error("%s%c%s",  
					timeStatus, "color: red; background: #F8D3D3",
					msg);
				case this.logType.NORMAL: default:
					return console.log(timeStatus + msg);
			}
		}
		this.showInfo = function(){												//	정보 출력
			return (
				"버전: " + VersionRoom 
				+ ' | '
				+ "UMUX 버전: " + VersionUMUX
				+ ' | '
				+ "UMUX 보안 패치 수준: " + SecurityPatchLevel
			)
		}
		this.showPlayerInfo = function(player, type){ 							//	플레이어 ID&닉네임 출력
			switch(type){
				case 1: case "local": 
					return ('(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' 
					+ (CS.getSpace(PS.members[player].name) ? "공백" : PS.members[player].name));
				case 2: case "public":
					return ('(' + player + ')' 
					+ (CS.getSpace(PS.members[player].name) ? "공백" : PS.members[player].name));
				case 3: case "name":
					return (CS.getSpace(PS.members[player].name) ? "공백" : PS.members[player].name);
			}
			return (player + '(' + ((PS.cntPlayers() >= 10) ? SYS.setLine(PS.getLocalId(player), 2) : PS.getLocalId(player)) + ')' 
			+ (CS.getSpace(PS.members[player].name) ? "공백" : PS.members[player].name));
		}
	}
}
const GM 	= new GameManager();		// 게임 매니저 클래스
const AMN	= new Administration();		// 관리 클래스
const NC 	= new Notification();		// 알림 클래스
const CS 	= new ChatSystem();			// 채팅 시스템 클래스
const CM 	= new Commands();			// 명령어 클래스
const PS 	= new Player();				// 플레이어 클래스
const SC	= new Scores();				// 점수 클래스
const TM 	= new TimeManager();		// 시간 관리 클래스
const SYS	= new IoSystem();			// 시스템 클래스
const room	= ROOM;
const TEAM	= {SPECTATOR : 0, RED : 1, BLUE : 2};
//-----------------------------------------------------------------------
// 명령어
//-----------------------------------------------------------------------
// *내부 명령어*
// UMUX 내부 시스템을 접근하는 명령어입니다.
// 기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
const internalCommands = {
	"!!2101" : AMN.getAdmin,		// 권한 얻기
	"!admin": AMN.setDynamicAdmin,		// 권한 동적 할당
	// 권한 얻기(오타)
	"!!" : AMN.missPassword,

	// 명령어 도움말
	"!adminhelp": AMN.adminHelp,"!어드민헬프": AMN.adminHelp,"!어드민도움말": AMN.adminHelp,"!어드민도움": AMN.adminHelp,"!어드헬프": AMN.adminHelp,"!어드도움말": AMN.adminHelp, "!어드민": AMN.adminHelp,
	"!adminhelpcom": AMN.adminComHelp, "!ahc": AMN.adminComHelp, "!몿": AMN.adminComHelp, 

	"!rr": AMN.setReset, "!ㄱㄱ": AMN.setReset,"!리": AMN.setReset, "!re": AMN.setReset,		// 다시 시작
	"!r" : AMN.setAutoReset, "!ㄱ" : AMN.setAutoReset,  "!고" : AMN.setAutoReset, 				// 자동 재시작
	"!clearbans" : CM.clearBans, "!cb" : CM.clearBans, 											// 밴 초기화
																								// 채팅창 얼리기/녹이기
	"!freeze" : CM.setFreezeChat, "!ㄺㄷㄷㅋㄷ" : CM.setFreezeChat, 
	"!얼리기" : CM.setFreezeChat, "!얼기" : CM.setFreezeChat, "!채팅얼기" : CM.setFreezeChat, "!채팅얼리기" : CM.setFreezeChat, 
	"!djfflrl" : CM.setFreezeChat, "!djfrl" : CM.setFreezeChat, "!coxlddjfrl" : CM.setFreezeChat, "!coxlddjfflrl" : CM.setFreezeChat, 
	"!unfreeze" : CM.setUnfreezeChat, "!ㅕㅜㄺㄷㄷㅋㄷ" : CM.setUnfreezeChat, 
	"!녹기" : CM.setUnfreezeChat, "!녹이기" : CM.setUnfreezeChat, "!채팅녹기" : CM.setUnfreezeChat, "!채팅녹이기" : CM.setUnfreezeChat, 
	"!shrrl" : CM.setUnfreezeChat, "!shrdlrl" : CM.setUnfreezeChat, "!coxldshrrl" : CM.setUnfreezeChat, "!coxldshrdlrl" : CM.setUnfreezeChat, 

	// 팀 유니폼
	"!colors" : CM.setTeamColors, "!color" : CM.setTeamColors, "!uniform" : CM.setTeamColors, "!컬러" : CM.setTeamColors, "!유니폼" : CM.setTeamColors, "!ㅋㄹ" : CM.setTeamColors, "!ㅇㄴㅍ" : CM.setTeamColors,
	"!채ㅣㅐㄱㄴ" : CM.setTeamColors, "!채ㅣㅐㄱ" : CM.setTeamColors,"!ㅕㅜㅑ래그" : CM.setTeamColors,"!zjffj" : CM.setTeamColors,"!dbslvha" : CM.setTeamColors,
	"!clear_colors" : CM.clearTeamColors, "!clear_color" : CM.clearTeamColors, "!clear_uniform" : CM.clearTeamColors, "!클리어_유니폼" : CM.clearTeamColors, "!초기화_유니폼" : CM.clearTeamColors, "!유니폼_초기화" : CM.clearTeamColors, "!클리어유니폼" : CM.setTeamColors, "!초기화유니폼" : CM.clearTeamColors, "!유니폼초기화" : CM.clearTeamColors, 

	// 팀 이동 제한(전체)
	"!lock" : AMN.setTeamsLock, "!l" : AMN.setTeamsLock, "!L" : AMN.setTeamsLock, "!락" : AMN.setTeamsLock, "!fkr" : AMN.setTeamsLock,
	"!host" : CM.setHostLock,

	// 게임 정지
	"p": AMN.putPause,
	"!p": AMN.unPause,

	"!set_pw": AMN.setPassword,										// 비번 설정
	"!clear_pw": AMN.releasePassword,								// 비번 해제
	"!show_pw": AMN.showPassword,									// 비번 출력
	"!score" : AMN.setScore, "!ㄴ책ㄷ" : AMN.setScore, "!스코어" : AMN.setScore, "!점수" : AMN.setScore, "!smzhdj" : AMN.setScore, "!wjatn" : AMN.setScore,		// 점수 제한
	"!time" : AMN.setTime, "!타임" : AMN.setTime, "!시간" : AMN.setTime, "!샤ㅡㄷ" : AMN.setTime, "!xkdla" : AMN.setTime, "!tlrks" : AMN.setTime,				// 시간 제한
	"!load" : CM.loadMap, "!map" : CM.loadMap, "!로드" : CM.loadMap, "!맵" : CM.loadMap, "!ㅣㅐㅁㅇ" : CM.loadMap, "!fhem" : CM.loadMap, "!ㅡ메" : CM.loadMap,	// 기본 내장맵
	"!도" : CM.plaster,																		// 도배 방지 문자
	"!mute": CM.setMute, "!ㅡㅕㅅㄷ": CM.setMute, "!채금": CM.setMute, "!m": CM.setMute,	// 채금 설정
	"!unmute": AMN.releaseMute, "!ㅕㅜㅡㅕㅅㄷ": AMN.releaseMute, 							// 채금 풀기
	"!rec" : CM.setRecording,"!녹화" : CM.setRecording, "!shrghk" : CM.setRecording,		// 녹화 시작&종료

	"!magnet" : AMN.comCreateMagnet, 
	"!clear_magnet" : AMN.comClearMagnet, 

	// 봇방 정보
	"!about" : CM.infoRoom, "!aboutinfo" : CM.infoRoom, "!info" : CM.infoRoom,
	"!aboutver" : CM.infoRoom,"!verinfo" : CM.infoRoom,"!version" : CM.infoRoom,"!버전" : CM.infoRoom, "!ver" : CM.infoRoom, "!정보" : CM.infoRoom,

	// 이스터 에그
	"!joke": CM.joke, "!농담": CM.joke, "!조크": CM.joke, "!넝담": CM.joke, "!알파고": CM.joke, "!네모형": CM.jongikannemohyung, "!정네": CM.jongikannemohyung,
	"킹치만": CM.hawawa, "그치만": CM.hawawa,"손나": CM.hawawa,"바카나": CM.hawawa, "!정직한네모형": CM.jongikannemohyung,
	"련님" : CM.taebo, "조혜련" : CM.taebo, "혜련" : CM.taebo, "태보" : CM.taebo, "절대태보해" : CM.taebo, "태보해" : CM.taebo, 
}

// *표준 명령어*
// UMUX 표준 명령어입니다.
// 기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
const standardCommands = {
	// 종합 도움말
	"!help": CM.comHelp, "!헬프": CM.comHelp, "!도움": CM.comHelp, "!명령" : CM.comHelp, "!명령어" : CM.comHelp, "!ㅗ디ㅔ" : CM.comHelp, "!gpfvm" : CM.comHelp,
	"!bothelp" : CM.botHelp, "!봇헬프" : CM.botHelp, "!봇방" : CM.botHelp, "!봇방도움말" : CM.botHelp, "!ㅠㅐ소디ㅔ" : CM.botHelp, "!봇" : CM.botHelp,  "!qht" : CM.botHelp, "!qht" : CM.botHelp, "!about" : CM.botHelp, 
	"!maphelp" : CM.mapHelp, "!맵도움" : CM.mapHelp, "!맵도움말" : CM.mapHelp, "!맵헬프" : CM.mapHelp, "!유즈맵" : CM.mapHelp, "!유즈맵도움말" : CM.mapHelp, "!ㅡ메ㅗ디ㅔ" : CM.mapHelp, 
	"!chathelp" : CM.chatHelp, "!채팅" : CM.chatHelp, "!챗" : CM.chatHelp, "!챗헬프" : CM.chatHelp, "!채팅명령어" : CM.chatHelp, "!챗도움" : CM.chatHelp, "!챗도움말" : CM.chatHelp, "!촘소디ㅔ" : CM.chatHelp,
	"!etchelp" : CM.etcHelp, "!기타헬프" : CM.etcHelp, "!기타도움" : CM.etcHelp, "!기타도움말" : CM.etcHelp, "!기타" : CM.etcHelp, "!ㄷㅅ초디ㅔ" : CM.etcHelp, 

	// 채팅(전체, 팀별, 개인)
	"!a": CS.setAllChat, "!올" : CS.setAllChat, "!전체" : CS.setAllChat, "!전" : CS.setAllChat, "!ㅁ": CS.setAllChat, "!all": CS.setAllChat, "!wjscp": CS.setAllChat, "!wjs": CS.setAllChat, 
	"!t" : CS.setTeamChat, "!팀" : CS.setTeamChat, "!ㅅ" : CS.setTeamChat, "!ㅌ" : CS.setTeamChat, "!xla" : CS.setTeamChat, "!x" : CS.setTeamChat, 
	"!e" : CS.setWhisperChat, "!귓" : CS.setWhisperChat, "!ㄷ" : CS.setWhisperChat,	

	// 등번호 설정 및 초기화
	"!avatar": PS.setAvatar, "!아바타": PS.setAvatar, "!ㅇㅂㅌ": PS.setAvatar, "!ㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!등번호": PS.setAvatar, "!emdqjsgh": PS.setAvatar, 
	"!clear_avatar": PS.setAvatar, "!reset_avatar": PS.setAvatar, "!클리어_아바타": PS.setAvatar, "!ㅋㄹㅇ_ㅇㅂㅌ": PS.setAvatar, "!칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!리셋_아바타": PS.setAvatar, 
	"!clearavatar": PS.setAvatar, "!resetavatar": PS.setAvatar, "!클리어아바타": PS.setAvatar, "!ㅋㄹㅇㅇㅂㅌ": PS.setAvatar, "!칟ㅁㄱㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!리셋아바타": PS.setAvatar, 

	// 채팅 모드 설정
	"!chatmode": CM.setChatMode, "!촘스ㅐㅇㄷ": CM.setChatMode, "!챗모드": CM.setChatMode, "!채팅모드": CM.setChatMode, "!챗": CM.setChatMode, "!채팅": CM.setChatMode, "!cotahem": CM.setChatMode, 
	"!coxldahem": CM.setChatMode, "!cot": CM.setChatMode, "!coxld": CM.setChatMode, 

	// 수신 설정
	"!disrupt" : CM.setDisruptMode, "!방해금지모드" : CM.setDisruptMode, "!수신" : CM.setDisruptMode, "!얀겨ㅔㅅ" : CM.setDisruptMode, "!qkdgormawlahem" : CM.setDisruptMode, "!wtntls" : CM.setDisruptMode, 

	// 게임 참가 및 설정
	"!red" : CM.setJoinRed, "!Red" : CM.setJoinRed, "!RED" : CM.setJoinRed, "!레드" : CM.setJoinRed,"!레" : CM.setJoinRed,"!ㄹㄷ" : CM.setJoinRed, "!ㄱㄷㅇ": CM.setJoinRed,
	"!blue" : CM.setJoinBlue,"!Blue" : CM.setJoinBlue, "!BULE" : CM.setJoinBlue, "!블루" : CM.setJoinBlue,"!블" : CM.setJoinBlue,"!ㅂㄹ" : CM.setJoinBlue,"!ㅠㅣㅕㄷ" : CM.setJoinBlue,"!쁠루" : CM.setJoinBlue,"!쁠" : CM.setJoinBlue,
	"!spec" : CM.setJoinSpec, "!스펙" : CM.setJoinSpec, "!스팩" : CM.setJoinSpec, "!스" : CM.setJoinSpec, "!관중석" : CM.setJoinSpec, "!관중" : CM.setJoinSpec,"!관전석" : CM.setJoinSpec, "!관전" : CM.setJoinSpec, "!관" : CM.setJoinSpec,
	"!afk" : CM.setSleep, "!AFK" : CM.setSleep, "!ㅁ라" : CM.setSleep, "!잠수" : CM.setSleep,
	"!join" : CM.joinHelpPers, "!joinhelp" : CM.joinHelpPers, "!joinHelp" : CM.joinHelpPers, "!enter" : CM.joinHelpPers, "!enterhelp" : CM.joinHelpPers, "!helpenter" : CM.joinHelpPers, "!조인" : CM.joinHelpPers, "!입장" : CM.joinHelpPers, 
	"!투입" : CM.joinHelpPers, "투입" : CM.joinHelpPers, "투입?" : CM.joinHelpPers, "투입!" : CM.joinHelpPers, "투입해" : CM.joinHelpPers, "투입하셈" : CM.joinHelpPers, "투입요" : CM.joinHelpPers, "투입좀시켜라" : CM.joinHelpPers, "넣어" : CM.joinHelpPers, 
	"넣어줘" : CM.joinHelpPers,"넣어라" : CM.joinHelpPers,"넣어봐라" : CM.joinHelpPers,"넣어주세요" : CM.joinHelpPers,"투입해주세요" : CM.joinHelpPers, "껴줘": CM.joinHelpPers,
	"투입해드려" : CM.joinHelpPub, "투입명령어" : CM.joinHelpPub, "투입도움말" : CM.joinHelpPub, 

	// 전적 및 랭킹
	"!stats": CM.infoScore, "!stat": CM.infoScore, "!스탯": CM.infoScore, "!전적": CM.infoScore,  "!wjswjr": CM.infoScore,
    "!rankhelp": CM.rankHelp,"!helprank": CM.rankHelp,"!랭크헬프": CM.rankHelp,"!헬프랭크": CM.rankHelp,"!랭크도움말": CM.rankHelp,
    "!ranking": CM.infoRanking,"!랭킹": CM.infoRanking,"!랭": CM.infoRanking,"!순": CM.infoRanking,"!순위": CM.infoRanking,

	// 플레이어 정보
	"!list" : CM.infoPlayers, "!list" : CM.infoPlayers, "!player" : CM.infoPlayers, "!players" : CM.infoPlayers, "!ㅣㅑㄴㅅ" : CM.infoPlayers, "!피묘ㅣㅑㄴㅅ" : CM.infoPlayers, "!ㅔㅣ묟ㄱ" : CM.infoPlayers, "!리스트" : CM.infoPlayers, "!플레이리스트" : CM.infoPlayers, 
	"!플레이어리스트" : CM.infoPlayers, "!플레이어목록" : CM.infoPlayers, "!유저리스트" : CM.infoPlayers, "!유저목록" : CM.infoPlayers, "!플레이어" : CM.infoPlayers, 

	"?mark" : CM.qMark, "?채팅" : CM.qMark, "?촘ㅅ" : CM.qMark, "?마크" : CM.qMark,
	"?e" : CM.qE_Chat, "?ㄷ" : CM.qE_Chat, "?whisper" : CM.qE_Chat, "?귓속말" : CM.qE_Chat, "?귓말" : CM.qE_Chat, 
	"?t" : CM.qT_Chat, "?ㅅ" : CM.qT_Chat, "?team" : CM.qT_Chat, "?팀채팅" : CM.qT_Chat, "?팀챗" : CM.qT_Chat, 
	"?chatmode": CM.qChatmode, "?chat": CM.qChatmode, "?채팅모드": CM.qChatmode, "?채팅": CM.qChatmode, "?촘스ㅐㅇㄷ": CM.qChatmode, "?촘ㅅ": CM.qChatmode, "?coxldahem": CM.qChatmode, "?coxld": CM.qChatmode, 
	"?disrupt" : CM.qDisruptMode, "?방해금지모드" : CM.qDisruptMode, "?수신" : CM.qDisruptMode, "?얀겨ㅔㅅ" : CM.qDisruptMode, "?qkdgormawlahem" : CM.qDisruptMode, "?wtntls" : CM.qDisruptMode, 
	"?score" : CM.qScore, "?ㄴ책ㄷ" : CM.qScore, "?점수" : CM.qScore, "?wjatn" : CM.qScore, "?스코어" : CM.qScore, 
	"?colors" : CM.qUniform, "?color" : CM.qUniform, "?채ㅣㅐㄱㄴ" : CM.qUniform, "?채ㅣㅐㄱ" : CM.qUniform, "?uniform" : CM.qUniform, "?ㅕㅜㅑ래그" : CM.qUniform, "?유니폼" : CM.qUniform, "?dbslvha" : CM.qUniform, 

	// 맵 정보
	"!maplist" : CM.infoMaps, "!cm" : CM.infoMaps, "!맵리스트" : CM.infoMaps,"!맵목록" : CM.infoMaps,"!map" : CM.infoMaps,"!맵" : CM.infoMaps,"!유즈맵" : CM.infoMaps,
}

// *추가 명령어*
// 커스텀 명령어입니다.
// 신규 명령어 추가에 적합하며 권장합니다.
var customCommands = {

}
//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

// 플레이어 입퇴장
room.onPlayerJoin = function(player) { return GM.onPlayerJoin(player); }					
room.onPlayerLeave = function(player) { return GM.onPlayerLeave(player); }		
room.onPlayerActivity = function(player){ return PS.onPlayerActivity(player); }
// 플레이어 강제 퇴장
room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer){ return AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer) }
// 플레이어 권한 획득&박탈
room.onPlayerAdminChange = function(player){ return AMN.onPlayerAdminChange(player) }		
// 맵 교체
room.onStadiumChange = function(newMap, byPlayer){ return GM.onStadiumChange(newMap, byPlayer); }
// 채팅 시스템
room.onPlayerChat = function(player, msg){ return CS.onPlayerChat(player, msg); }			
// 링크 업로드(서버 불러오기)
room.onRoomLink = function(url){ return GM.onRoomLink(url); }

// 좌표 초기화
room.onPositionsReset = function(){ return GM.onPositionsReset(); }				
// 공 찼을 때
room.onPlayerBallKick = function(player){ return GM.onPlayerBallKick(player); }			
// 골 먹힐 때
room.onTeamGoal = function(team){ return GM.onTeamGoal(team); }					
// 킥 제한 설정
room.onKickRateLimitSet = function(min, rate, burst, player){ return GM.onKickRateLimitSet(min, rate, burst, player); }
// 팀 교체
room.onPlayerTeamChange = function(player, byPlayer){ return PS.onPlayerTeamChange(player, byPlayer) }	
// 팀 승리
room.onTeamVictory = function(scores){ return GM.onTeamVictory(scores); }			

// 게임 시작/도중/종료/중단/재개
room.onGameStart = function(){ return GM.onGameStart(); }							
room.onGameTick = function(){ return GM.onGameTick(); }							
room.onGameStop = function(){ return GM.onGameStop(); }							
room.onGamePause = function(byPlayer){ return GM.onGamePause(byPlayer);}			
room.onGameUnpause = function(byPlayer){ return GM.onGameUnpause(byPlayer); }	
