// API LEVEL(VERSION): 7(2.1.0 r17)
//==========================================<README>==========================================
// 유즈맵 대표카페(이하 UM)에서 진행하고 있는 한국어화 유즈맵 봇방 프로젝트로, 
// 사용자 인터페이스(UI)뿐만 아니라 플레이의 매사 모든 순간까지 아우르는 사용자 경험(UX)입니다.
//
//	아래와 같은 항목들을 준수한다면 누구나 자유롭게 수정이 가능합니다.
//	* 원저작자 표기
//	* UMUX 버전 표기
//	* 그 외 기타 사항 및 라이센스는 여기서 확인하십시오. 
//		github.com/HonestSquare/UMUX/blob/master/LICENCE
//============================================================================================
function c(msg){ 
	CS.sendMsg(" 외부 (0)🌐서버 매니저: " + msg + " (귓속말 답장: !e 0 답할 내용)"); 
	SYS.log(true, "전달: " + msg);
};
// ---------------------내장 맵--------------------------------------
const maps = new Array();
const mapsName = new Array();
{
mapsName[0] = "Classic R";
maps[0] = 
`{
	//	RELEASE_DATE:	2019/07/31
	//	MADE BY			정직한네모형™
	//	CODE_NAME:		CROP-MK
	//	MODEL_NAME:		Classic R
	//	VERSION:		Update 1(v1.10)
	//	SUPPORT_LEVEL:	
	//					1(1.0.0)/2(1.1.0)/3(1.1.1)/4(1.1.2)/5(2.0.0)/6(2.0.1)/7(2.1.0)
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
}
`
}
//-----------------------------------------------------------------------
// 방 초기 설정 
//-----------------------------------------------------------------------
// 방 이름
const ROOMNAME 		= "새 방";
const MAXPLAYERS 	= 12;				// 플레이어 최대 인원
const PLAYERNAME 	= " ";				// 방장 이름(그대로 두는 걸 권장)
const PUBLIC 		= true;				// 공개방 여부
// token; You can obtain it here: https://www.haxball.com/rs/api/getheadlesstoken
const TOKEN = "thr1.AAAAAF7bETA_vSwzNX-vbg.GZOfCIws-Is";
const NOPLAYER = false;				// 방장 여부(그대로 두는 걸 권장)
//=============================================================================
// 여기서부터 복사
//=============================================================================
const ROOM = HBInit({ 
	roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : PLAYERNAME, public : PUBLIC, token : TOKEN,		
	geo: { code: "kr", lat: 37.566667 + (Math.floor(Math.random() * 4000) - 2000) * 0.001, lon: 126.978406 + (Math.floor(Math.random() * 4000) - 2000) * 0.001},	// 지역, 위도, 경도(대한민국 서울을 기준으로 기본값을 설정해 두었음)
	noPlayer : NOPLAYER										
});
ROOM.setCustomStadium(maps[0]);
ROOM.setScoreLimit(0);
ROOM.setTimeLimit(0);

const DEV = false;					// 개발 버전 설정
var date = new Date();
//-----------------------------------------------------------------------
// 게임 매니저 클래스
//-----------------------------------------------------------------------
class GameManager{													
	constructor(){
		this.gameStats;											// 0: 정지, 1: 시작, 2: 게임 중
		this.error 			= false;							// 에러 여부(Bad actor)
		this.stateRecording = false;
		this.onGameStart = function(){							// 게임 시작
			GM.gameStats = 1;
			SC.setHolder(null);
			SYS.log(true, "게임 시작.");
			return false;
		}
		this.onGameTick = function(){							// 게임 도중
			let now = TM.getDate();
			if(GM.gameStats != 2) GM.gameStats = 2;
			for(let i = 1; i <= PS.cntPlayers; i++)
				SC.updateHolder(PS.getPublicId(i));
			return false;
		}
		this.onGameStop = function(){							// 게임 종료
			GM.gameStats = 0;
			SC.updateTotalGoals();
			SC.updateRanking();			// 랭킹 갱신
			SYS.log(true, "게임 종료");
		}
		this.onGamePause = function(byPlayer){ 					// 게임 중단
			if(byPlayer.id) SYS.log(true, byPlayer.id + '(' + PS.members[byPlayer.id].Pid + ')' + byPlayer.name + "(이)가 게임을 일시 중단함.");
			else SYS.log(true, "게임 일시 중단.");		// 외부 입력으로 실행되면 실행자 정보 가림
			return false;
		}	
		this.onGameUnpause 	= function(byPlayer){				// 게임 재개
			if(byPlayer.id) SYS.log(true, byPlayer.id + '(' + PS.members[byPlayer.id].Pid + ')' + byPlayer.name + "(이)가 게임을 재개함.");
			else SYS.log(true, "게임 재개.");			// 외부 입력으로 실행되면 실행자 정보 가림
			return false;
		}
		this.onPlayerJoin = function(player) {					// 플레이어 입장
			let name = CS.getSpace(player.name) == true ? "공백" : player.name;
			PS.cntPlayers++;
			PS.initMember(player);
			SC.initStatus(player.id);				// 전적 초기화
			SC.initRanking(player.id);				// 랭킹 초기화
			SC.updateRanking();						// 랭킹 갱신
			CS.sendMsg("This Room Only Supports Korean Language. :", player.id);		
			NC.devCheck(player);								// 개발자 버전 체크		
			PS.setAddress(player.id, player.conn);				// 공용 주소 부여
			PS.setNetwork(player.id, player.auth);				// 공용 네트워크 부여
			// 사칭, 다중 접속, 블랙리스트 탐지
			if(AMN.filterPlayer(player) == true || AMN.checkBlacklists(player.name)){ 
				NC.announce(NC.notice() + name + "님은 관심 대상입니다.", player.id, "red", 5, 3);
				SYS.log(true, "입장: " + name + "(블랙리스트)");
			}
			else{ 
				NC.announce('#' + player.id + " 안녕하세요, " + name + "님! " + CM.recommendCom("유용할", "!help, !join"), player.id, null, 1, 1);
				(PS.cntPlayers >= 10) ? SYS.log(true, "입장: " + '(' + SYS.setLine(player.id, 2) + ')' + name) : SYS.log(true, "입장: " + '(' + player.id + ')' + name);
			}
			if(PS.cntPlayers <= 1){
				room.startGame();
				room.setPlayerTeam(player.id, 1);	
			}
			else CS.sendHideChat(player, NC.notice() + name + "님이 입장했습니다.", true);	// 안내 메시지
			AMN.updateAdmins(player);
			SYS.log(true, "[자동진행시스템] 현재 방 접속 인원: " + PS.cntPlayers);
			return false;
		}
		this.onPlayerLeave = function(player){					// 플레이어 퇴장
			let name;
			CS.getSpace(player.name) == true ? name = "공백" : name = player.name;
			if(AMN.kicked)											// 강제 퇴장 확인
				AMN.kicked = false;
			else{
				NC.announce(NC.notice() + name + "님이 떠났습니다.", null, "green", 5, 1);
				if(AMN.checkBlacklists(player.name)) name = player.name + "(블랙리스트)";
				PS.cntPlayers >= 10 ? SYS.log(true, "퇴장: " + '(' + SYS.setLine(player.id, 2) + ')' + name) : SYS.log(true, "퇴장: " + '(' + player.id + ')' + name);
			}
			// 유저 목록 정리
			PS.updatePlayers(player);
			PS.clearMember(player);
			PS.cntPlayers--;
			// 사람이 없으면 자동 종료
			PS.cntPlayers > 0 ? AMN.updateAdmins(room.getPlayerList()[1]) : room.stopGame();
			SYS.log(true, "[자동진행시스템] 현재 방 접속 인원: " + PS.cntPlayers);
			return false;
		}
		this.onStadiumChange = function(newMap, byPlayer){		// 맵 교체
			if(PS.cntPlayers){
				SYS.log(true, "맵 교체: " + newMap);
				if(Math.floor(Math.random()*5) == 0){ 
					NC.announce(NC.msgCommand("시작 ") + "!r", byPlayer.id, "green", 4, 3);
                    //NC.announce(NC.msgCommand("맵 저장 ") + "/store", null, "green", 4, 3);
                    NC.announce(NC.msgCommand("전적 ") + "!stats ID", null, "green", 4, 3);
				}
			}
		}
		this.onPositionsReset = function(){		 				// 좌표 초기화
			return false; 
		}
		this.onPlayerBallKick = function(player){ 				// 공 찼을 때
			return false; 
		}
		this.onTeamGoal = function(team){ 						// 골 먹힐 때
			var time = SC.getGameTime();
			let teamMark = GM.getTeamMark(team);
			let resultMark = "득점";				// 자살골 판정 출력 메시지
			time = Math.floor(time);
			time = TM.updateNums(Math.floor(time / 60), 2) + ':' + TM.updateNums(time % 60, 2);
			if(SC.getHolder()){				// 득점자 인식률 조정
				for(let i = 1; i <= PS.cntPlayers; i++){
					if((PS.members[PS.getPublicId(i)].team != 0) && (PS.getPublicId(i) != SC.getHolder())){
						let dist = SC.getDistance(SC.getDisc(0), PS.getPlayer(PS.getPublicId(i)));
						if(dist < SC.getDistance(SC.getDisc(0), PS.getPlayer(SC.getHolder()))){ 
							if(SC.getDistance(PS.getPlayer(PS.getPublicId(i)), PS.getPlayer(SC.getHolder())) < Math.pow(Math.round(PS.getPlayer(SC.getHolder()).radius + 10), 2))
								if(PS.members[PS.getPublicId(i)].team == team) SC.setHolder(PS.getPublicId(i));
						}
					}
				}
			}
			let showPId = PS.cntPlayers >= 10 ? SYS.setLine(SC.getHolder(), 2) : SC.getHolder();
			let showLId = PS.cntPlayers >= 10 ? SYS.setLine(PS.getLocalId(SC.getHolder()), 2) : PS.getLocalId(SC.getHolder());
            if(PS.members[SC.getHolder()] && PS.members[SC.getHolder()].team != team){ 			// 자살골 판정
                resultMark = "실점";
                switch(team){
                    case 1: 
                        teamMark = GM.getTeamMark(team + 1);
                        break;
                    case 2: 
                        teamMark = GM.getTeamMark(team - 1);
                        break;
                }
            }
            // 득점 메시지 출력(득점자 제외)
            if(!PS.members[SC.getHolder()] || SC.getHolder() == null){
                NC.announce(PS.mark[team + 4] + '|' + time + '| ' + teamMark + "이 " + resultMark + "했습니다. ", null, null, 5, 0);
                return SYS.log(true, PS.mark[team + 4] + '|' + time + '| ' + teamMark + ' ' + resultMark);
            }
			// 점수 갱신
			if(resultMark == "득점") SC.setStatsGoal(SC.getHolder(), SC.getStatsGoal(SC.getHolder()) + 1);
			else SC.setStatsOG(SC.getHolder(), SC.getStatsOG(SC.getHolder()) + 1);
			SC.updateRanking();						// 랭킹 갱신
			// 득점 메시지 출력(득점자 포함)
			let name = CS.getSpace(PS.members[SC.getHolder()].name) == true ? "공백" : PS.members[SC.getHolder()].name;
			NC.announce(PS.mark[team + 4] + '|' + time + "| " + name + "님이 " + resultMark + "했습니다. ", null, null, 5, 0);
			SYS.log(true, PS.mark[team + 4] + '|' + time + '| ' + teamMark + ' ' + resultMark + ': ' + showPId + '(' + showLId + ')' + name);
			return false; 
		}
		this.onTeamVictory = function(scores){ 					// 팀 승리
			NC.announce("[경기 종료]", null, "yellow", 5, 0);
			SYS.log(true, "경기 종료");
			switch(SC.getWinner()){
				case 1:			// 레드팀 승
					for(let i = 1; i <= PS.cntPlayers; i++){
						switch(PS.members[PS.getPublicId(i)].team){
							case 1: SC.setStatsWin(PS.getPublicId(i), SC.getStatsWin(PS.getPublicId(i)) + 1); 	break;
							case 2: SC.setStatsLost(PS.getPublicId(i), SC.getStatsLost(PS.getPublicId(i)) + 1); break;
						}
					}
					break;
				case 2:			// 블루팀 승
					for(let i = 1; i <= PS.cntPlayers; i++){
						switch(PS.members[PS.getPublicId(i)].team){
							case 1: SC.setStatsLost(PS.getPublicId(i), SC.getStatsLost(PS.getPublicId(i)) + 1); break;
							case 2: SC.setStatsWin(PS.getPublicId(i), SC.getStatsWin(PS.getPublicId(i)) + 1); 	break;
						}
					}
					break;
				case 3:			// 무승부
					return false;
			}
			SC.updateRanking();			// 랭킹 갱신
			NC.announce(GM.getTeamMark(SC.getWinner()) + "이 승리하였습니다.", null, "yellow", 5, 0);
			SYS.log(true, GM.getTeamMark(SC.getWinner()) + " 승리");
			return false;
		}
		this.onRoomLink = function(address){					// 링크 획득(서버 가동)
			if(!SYS.getInit()) return SYS.setInit();
			NC.announce(NC.info() + address, null, null, 4, 3);
		}
		this.onKickRateLimitSet = function(						// 킥 제한 설정
			min, rate, burst, player){

		}
		this.getTeamMark = function(num){						// 팀 상태(숫자>문자열)
			switch(num){
				case 0: return "관중석";
				case 1: return "레드팀";
				case 2: return "블루팀";
			}
			return false;
		}
		this.startRecording = function(){ 						// 녹화 시작
			GM.stateRecording = true;
			room.startRecording();
			NC.announce(TM.showTime() + " ▶ 녹화 시작", null, "yellow", 5, 3);
			SYS.log(true, "녹화 시작");
			return false;
		}
		this.stopRecording = function(){ 						// 녹화 종료
			GM.stateRecording = false;
			room.stopRecording();
			NC.announce(TM.showTime() + " ⏸ 녹화 종료", null, "yellow", 5, 3);
			SYS.log(true, "녹화 종료");
			return false;
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
		this.hostLock 			= true;					// 방장 팀 이동 허용 여부
		this.mutedList 			= [];					// 채금자 목록
		this.password 			= null;					// 비밀번호
		this.onPlayerAdminChange = function(player, byPlayer){							//	플레이어 권한 획득&해제
			if(player.admin == true){			// 권한 획득
				if(AMN.checkBlacklists(player.name)) return AMN.setSubAdmin(player.id);				// 블랙리스트이면 보조 권한만 부여
				PS.members[player.id].admin = true;
				PS.members[player.id].sub_admin == false;
				if(CS.getSpace(player.name)){ 
					NC.announce(NC.notice() + "공백님이 권한을 획득했습니다. " + CM.recommendCom("관련", "!adminhelp"), null, "pink", 5, 2);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + "공백(이)가 권한을 얻음.");
				}
				else{
					NC.announce(NC.notice() + player.name + "님이 권한을 획득했습니다. " + CM.recommendCom("관련", "!adminhelp"), null, "pink", 5, 2);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 권한을 얻음.");
				}
			}
			else{								// 권한 해제
				PS.members[player.id].admin = false;
				if(CS.getSpace(player.name))
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + "공백(이)가 권한을 잃음.");
				else
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 권한을 잃음.");
				return AMN.setSubAdmin(player.id)						// 보조 권한 부여
			}
			return false;
		}
		this.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer){			//	플레이어 강제 퇴장
			let banMsg = ban == true ? "영구" : "강제";
			AMN.kicked = true;
			if(reason){ 
				if(reason == "Bad actor"){ 
					GM.error = false;
					AMN.kicked = false;
					if(CS.getSpace(kickedPlayer.name)) NC.announce(NC.notice() + "공백님이 오류 감지 시스템으로 인해 퇴장되었습니다.", null, "green", 5, 1);
					else NC.announce(NC.notice() + kickedPlayer.name + "님이 오류 감지 시스템으로 인해 퇴장되었습니다.", null, "green", 5, 1);
					SYS.log(true, kickedPlayer.name + "(이)가 오류로 인해 "+ banMsg + "퇴장됨.");
				}
				else if(byPlayer.id > 0) SYS.log(true, '(' + byPlayer.id + ')' + byPlayer.name + "(이)가 " + '(' + kickedPlayer.id + ')' + kickedPlayer.name + "(을)를 " + banMsg + " 퇴장함. (사유: " + reason + ')');
				else SYS.log(true, '(' + kickedPlayer.id + ')' + kickedPlayer.name + "(을)를 " + banMsg + " 퇴장함. (사유: " + reason + ')');
			}
			else if(byPlayer.id > 0) SYS.log(true, '(' + byPlayer.id + ')' + byPlayer.name + "(이)가 " + '(' + kickedPlayer.id + ')' + kickedPlayer.name + "(을)를 " + banMsg + " 퇴장함.");
			else SYS.log(true, '(' + kickedPlayer.id + ')' + kickedPlayer.name + "(을)를 " + banMsg + " 퇴장함.");
			return false;
		}
		this.adminHelp = function(player){					// !adminhelp				|	관리 명령어
			if(AMN.getAdminstats(player.id))
				NC.announce(NC.msgCommand("관리 ") 
				+ "p | !p | !clearbans | !host | !time 숫자 | !set_pw | !score 숫자 | !r | !rr | !load 숫자 | !lock  | !set_pw | !clear_pw | !show_pw | !도 " + CM.recommendCom("관련", "!ahc"), player.id, null, 4, 3);
			else NC.acess(player);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.adminComHelp = function(player){				// !ahc						|	관리 명령어 도움말
			if(AMN.getAdminstats(player.id)){
				NC.announce(NC.msgCommand("관리 ") + "p/!p(게임 일시정지/시작) | !clearbans(영구 퇴장 명단 초기화) | !host(호스트 이동)", player.id, null, 4, 3);
				NC.announce(NC.msgCommand("관리 ") + "!time(시간 설정) | !score(점수 설정) | !r (게임 자동 진행) | !rr(게임 재시작)", player.id, null, 4, 3);
				NC.announce(NC.msgCommand("관리 ") + "!load ID(맵 로드) | !lock(팀 이동 금지/허용)", player.id, null, 4, 3);
				NC.announce(NC.msgCommand("관리 ") + "!set_pw(비번 설정) | !clear_pw(비번 해제) | !show_pw(비번 표시) | !도(도배방지문자 출력)", player.id, null, 4, 3);
			}
			else NC.acess(player);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.addBlacklist = function(name){					//								블랙리스트 추가
			PS.blacklist.push(name);
			return false;
		}
		this.addSuperBlacklist = function(PublicId){		//								슈퍼 블랙리스트 추가
			AMN.addBlacklist(PS.members[PublicId].name);
			PS.superBlacklist.push(PS.getAddress(PublicId));
			AMN.checkSuperBlacklists(PS.members[PublicId].name, PublicId);
			return false;
		}
		this.getAdminstats = function(player){				// 								어드민 권한 확인
			if(!PS.members[player]) return false;
			if(PS.members[player].admin) return 2;
			if(PS.members[player].sub_admin) return 1;
			return false;
		}
		this.getAdmin = function(player){					//								권한 획득
			return AMN.setAdmin(player.id);
		}
		this.getMute = function(player){					//								채금자 감지 및 메시지 전달
			if(AMN.mutedList.includes(player)){
				let blockMsg;
				let i = Math.floor(Math.random() * 5);
				switch(i){
					case 0: blockMsg = "잠시동안 채팅이 불가합니다."; 	break;
					case 1: blockMsg = "채팅이 불가능합니다."; 		 	break;
					case 2: blockMsg = "당분간 채팅이 불가합니다.";		break;
					case 3: blockMsg = "채팅을 이용할 수 없습니다."; 	break;
					case 4: blockMsg = "채팅이 금지되었습니다."; 		break;
				}
				NC.announce(NC.locked() + blockMsg, player, "green", 5, 3);
				return true;
			}
			return false;
		}
		this.setAdmin = function(player){					//								권한 설정
			room.setPlayerAdmin(player, true);
			return false;
		}
		this.setSubAdmin = function(player){				//								보조 권한 설정
			PS.members[player].sub_admin = true;
			if(AMN.getAdminstats(player.id) == 2) AMN.deleteAdmin(player);
			if(CS.getSpace(PS.members[player].name)){ 
				NC.announce(NC.notice() + "공백님이 보조 권한을 획득했습니다. " + CM.recommendCom("관련", "!adminhelp"), null, "pink", 5, 2);
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + "공백(이)가 보조 권한을 얻음.");
			}
			else{
				NC.announce(NC.notice() + PS.members[player].name + "님이 보조 권한을 획득했습니다. " + CM.recommendCom("관련", "!adminhelp"), null, "pink", 5, 2);
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + PS.members[player].name + "(이)가 보조 권한을 얻음.");
			}
			return false;
		}
		this.setDynamicAdmin = function(player){			// 								권한 동적 할당 옵션
			if(AMN.getAdminstats(player.id) == 2){
				if(!AMN.dynamicAdmin){
					AMN.dynamicAdmin = true;
					NC.announce(NC.unlocked() + "동적 할당이 활성화되었습니다.", player.id, "red", 5, 1);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 동적 할당을 활상화함.");
				}
				else{
					AMN.dynamicAdmin = false;
					NC.announce(NC.locked() + "동적 할당이 비활성화되었습니다.", player.id, "red", 5, 1);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + '(이)가 동적 할당을 비활상화함.');
				}
			}
			else return NC.acess(player);
			return false;
		}
		this.setScore = function(player, msg){				// !score n 				|	점수 변경 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let num = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				if(GM.gameStats != 2){
					if((num >= 0)&&(num < 15)){ 									// 범위 내에서 벗어나면 종료 처리
						room.setScoreLimit(num);
						NC.announce(NC.notice() + "제한 점수가 " + num + "점으로 변경되었습니다.", null, "yellow", 4, 1);
						SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 제한 점수를 " + num + "점으로 변경함.");
					}
					else return NC.announce(NC.cnot() + "올바르지 않은 값입니다. 0~14 사이의 값을 입력하세요.", player.id, "orange", 5, 3);
				}
				else NC.announce(NC.cnot() + "판이 완전히 끝난 이후에 다시 시도해 보세요.", player.id, "orange", 5, 3);
			}
			else NC.acess(player);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setTime = function(player, msg){				// !time n					|	시간 변경 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let time = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				if(GM.gameStats != 2){
					if((time >= 0)&&(time < 15)){ 									// 범위 내에서 벗어나면 종료 처리
						room.setTimeLimit(time);
						NC.announce(NC.notice() + "제한 시간이 " + time + "분으로 변경되었습니다.", null, "yellow", 4, 1);
						SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 제한 시간을 " + time + "점으로 변경함.");
					}
					else return NC.announce(NC.cnot() + "올바르지 않은 값입니다. 0~14 사이의 값을 입력하세요.", player.id, "orange", 5, 3);
				}
				else NC.announce(NC.cnot() + "판이 완전히 끝난 이후에 다시 시도해 보세요.", player.id, "orange", 5, 3);
			}
			else NC.acess(player);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setTeamsLock = function(player){				// !lock					|	 팀 이동 금지/허용 명령어
			if(AMN.getAdminstats(player.id)){
				if(AMN.teamsLock == false){		// 참이면 금지, 거짓이면 허용
					AMN.teamsLock = true;
					room.setTeamsLock(AMN.teamsLock);
					NC.announce(NC.locked() + "팀 자율 이동이 금지되었습니다.", null, "pink", 5, 2);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + '(이)가 팀 이동을 금지함.');
				}
				else{
					AMN.teamsLock = false;
					room.setTeamsLock(AMN.teamsLock);
					NC.announce(NC.unlocked() + "팀 자율 이동이 허용되었습니다.", null, "pink", 5, 2);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 팀 이동을 허용함.");
				}
			}
			else NC.acess(player);
			return false;
		}
		this.setHostLock = function(player){				// !host					|	 방장 팀 이동 금지/허용 명령어
			if(NOPLAYER == true) return NC.acess(player);
			if(AMN.getAdminstats(player.id)){
				if(AMN.hostLock == false){
					AMN.hostLock = true;
					NC.announce(NC.unlocked() + "호스트 이동이 금지되었습니다.", player.id, "green", 5, 3);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 방장 팀 이동을 금지함.");
					room.setPlayerTeam(0, 0);
				}
				else{
					AMN.hostLock = false;
					NC.announce(NC.locked() + "호스트 이동이 허용되었습니다.", player.id, "green", 5, 3);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 방장 팀 이동을 허용함.");
				}
			}
			else return NC.acess(player);
			return false;
		}
		this.setAutoReset = function(player){				// !r						|	게임 자동 시작/종료
			if(AMN.getAdminstats(player.id)){
				if(!GM.gameStats) room.startGame();
				else if(GM.gameStats == 2) room.stopGame();
			}
			else return NC.acess(player);
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setReset = function(player){					// !rr						|	게임 재시작
			if(AMN.getAdminstats(player.id)){
				room.stopGame();
				room.startGame();
				SYS.log(true, "다시 시작.");
			}
			return false;  // 명령어 흔적을 남기지 않음
		}
		this.setPassword = function(player, pass){			// !set_pw string			|	비번 설정
			if(AMN.getAdminstats(player.id)){
				if(pass.length <= 10) NC.announce(NC.locked() + "비밀번호가 너무 짧습니다. " + CM.recommendCom("연관", "!clear_pw"), player.id, "orange", 5, 0);
				else if(pass.length >= 28) NC.announce(NC.locked() + "비밀번호가 너무 길어서 설정할 수 없습니다.", player.id, "orange", 5, 0);
				else{ 
					AMN.updatePassword(pass.substr(8, 20));
					NC.announce(NC.locked() + "비밀번호가 설정되었습니다.", null, "pink", 4, 1);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 비밀번호를 설정함. (" + AMN.password + ')');
				}
			}
			else NC.acess(player);
			return false;
		}
		this.setMute = function(mutedPlayer, byPlayer){		//							|	채팅 금지
			if(!mutedPlayer) return false;
			AMN.mutedList.push(mutedPlayer);
			NC.announce(NC.locked() + "특정 플레이어의 채팅이 금지되었습니다.", null, "green", 5, 3)
			NC.announce(NC.locked() + "채팅 금지되었습니다.", mutedPlayer, "green", 5, 3);
			if(byPlayer){ 
				SYS.log(true, 
				byPlayer + '(' + PS.members[byPlayer].Pid + ')' + PS.members[byPlayer].name + "(이)가 "
				+ mutedPlayer + '(' + PS.members[mutedPlayer].Pid + ')' + PS.members[mutedPlayer].name + "(이)의 " 
				+ "채팅을 금지함.");}
			else{ 
				SYS.log(true, 
				mutedPlayer + '(' + PS.members[mutedPlayer].Pid + ')' + PS.members[mutedPlayer].name + "(이)의 " 
				+"채팅이 금지됨.");}
			return false;
		}
		this.setKick = function(kickedPlayer, msg, ban){	//								강제 퇴장 처리
			AMN.kicked = true;
			if(msg) room.kickPlayer(kickedPlayer, NC.cnot() + msg, ban);
			else room.kickPlayer(kickedPlayer, null, ban);
			return false;
		}
		this.setClearBans = function(player){				// 								영구 퇴장 명단 초기화
			room.clearBans();
			NC.announce(NC.notice() + "영구 퇴장 명단이 초기화되었습니다.", null, "pink", 4, 2);
			if(player) SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 영구 퇴장 명단을 모두 지움.");
			else SYS.log(true, " 영구 퇴장 명단 초기화");
			return false;
		}
		this.showPassword = function(player){				// !show_pw					| 	비번 공개
			if(AMN.getAdminstats(player.id)){
				if(AMN.password) NC.announce(NC.notice() + "현재 비밀번호는 " + AMN.password + "입니다.", player.id, "green", 4, 3);
				else NC.announce(NC.notice() + "현재 비밀번호는 설정돼 있지 않습니다.", player.id, "orange", 5, 0);
			}
			else NC.acess(player);
			return false;
		}
		this.missPassword = function(player){ 				// 								어드민 전용 명령어 오타 방지
			SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 관리자 로그인을 시도함. (실패)");
			return false; 
		}
		this.filterPlayer = function(player){				//								사칭 및 중복 필터(onlyadmin)
			let id;
			// (슈퍼)블랙리스트
			AMN.checkSuperBlacklists(player.name, player.id);
			if(PS.cntPlayers <= 1) return false;
			for(let i = 1; i <= PS.cntPlayers; i++){
				id = PS.getPublicId(i);
				if(id != player.id){
					// 사칭
					if(PS.members[id].name == player.name) return AMN.setKick(player.id, "사칭 및 다중 접속이 감지되어 퇴장되었습니다.");
					// 다중 접속
					if(PS.getAddress(id) == PS.getAddress(player.id)){
						SYS.log(true, 
							'(' + id  + ')' + PS.members[id].name + "(와)과 " 
							+ '(' + player.id + ')' + player.name + "(이)의 다중 접속이 감지됨.");
						if(AMN.checkBlacklists(player.name)) return AMN.setKick(player.id, "사칭 및 다중 접속이 감지되어 퇴장되었습니다.", false);
						NC.announce(NC.cnot() + "다중 접속이 의심됩니다.", player.id, "orange", 5, 2);
						AMN.addBlacklist(player.name);
					}
				}
			}
			return false;
		}
		this.checkBlacklists = function(name){				//								블랙리스트 감지
			let i = 0;
			var sChar = /[~!@#$%^&*()_+|<>?:{}]/; 		// 특수문자
			for(let i = 0; i < name.length; i++){
			    if(sChar.test(name.substr(i, 1)))
			        name = name.length > i ? name.substr(i + 1) : "특문";
			}
			while(i < PS.blacklist.length){
				// 포함되면 필터 반환 | 포함되지 않으면 i 증가
				if(PS.blacklist[i].search(name) != -1) return true;
				i++;
			}
			return false;
		}
		this.checkSuperBlacklists = function(name, id){		//								슈퍼 블랙리스트 감지
			let i = 0;
			while(i < PS.superBlacklist.length){
				// 포함되면 필터 반환 | 포함되지 않으면 i 증가
				if(PS.superBlacklist[i] == PS.getAddress(id)){
					SYS.log(true, "[슈퍼 블랙리스트]" + name + ': ' + PS.superBlacklist[i]);
					return AMN.setKick(id, "차단된 IP입니다.", false);
				}
				i++;
			}
			return false;
		}
		this.updateAdmins = function(player) {				// 								어드민 없으면 권한 부여
			var players = room.getPlayerList().filter((player) => player.id != 0 );
			// 아무도 안 나가면 동작 없음
			if (players.length == 0 ) return; 
			  // 어드민 나가면 아무 동작 없음
			  if (players.find((player) => player.admin) != null ) return; 
			  // 어드민 없으면 부여
			  if(AMN.dynamicAdmin)
				return (AMN.filterPlayer(player) == false) ? AMN.setAdmin(player.id) : AMN.setSubAdmin(player.id);
		}
		this.updatePassword = function(pass){				// 								비번 갱신
			AMN.password = pass == " " ? null : pass;
			return room.setPassword(AMN.password);
		}
		this.releaseMute = function(player){				// !unmute					|	채팅 허용(onlyadmin)
			if(AMN.getAdminstats(player.id)){
				AMN.mutedList.splice(0, AMN.mutedList.length);
				NC.announce(NC.unlocked() + "특정 플레이어의 채팅이 허용되었습니다.", null, "green", 5, 3);
				SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 모든 채금을 해제함.");
				return false;
			}
			else return NC.acess(player);
		}
		this.releasePassword = function(player){			// !clear_pw				|	비번 해제
			if(AMN.getAdminstats(player.id)){
				if(!AMN.password){
					NC.announce(NC.notice() + "비밀번호가 이미 해제되어 있습니다.", player.id, "orange", 5, 0);
					SYS.log(true, player.id + '(' + PS.getLocalId(player.id) + ')' + player.name + "(이)가 비밀번호 해제를 시도함.");
				}
				else{
					AMN.updatePassword();
					NC.announce(NC.unlocked() + "비밀번호가 해제되었습니다.", null, "pink", 4, 1);
					SYS.log(true, player.id + '(' + PS.getLocalId(player.id) + ')' + player.name + "(이)가 비밀번호를 해제함.");
				}
			}
			else NC.acess(player);
			return false;
		}
		this.deleteAdmin = function(player){				//								권한 해제
			room.setPlayerAdmin(player, false);
			return false;
		}
		this.deleteSubAdmin = function(player){				//								보조 권한 해제
			PS.members[player].sub_admin = false;
			if(CS.getSpace(PS.members[player].name)){ 
				NC.announce(NC.notice() + "공백님의 보조 권한이 해제되었습니다. ", null, "pink", 5, 2);
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + "공백(이)가 보조 권한을 잃음.");
			}
			else{
				NC.announce(NC.notice() + player.name + "님의 보조 권한이 해제되었습니다. ", null, "pink", 5, 2);
				SYS.log(true, player + '(' + PS.getLocalId(player) + ')' + PS.members[player].name + "(이)가 보조 권한을 잃음.");
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
			else NC.acess(player);
			return false;
		}
	}
}
//-----------------------------------------------------------------------
// 공지 및 알림 클래스
//-----------------------------------------------------------------------
class Notice {														
	constructor() {
		this.devCheck = function(player){										// 개발 버전 안내 메세지
			if(DEV) return NC.announce(NC.cnot() + "개발 전용 테스트방이므로 원활한 플레이가 어렵습니다.", player.id, "orange", 5, 2);
		}	
		this.info = function () {												// 상세 정보
			return "📡상세정보📡 : ";
		};
		this.help = function () {												// 도움말
			return "💬도움말🗨 : ";
		};
		this.infoPlayer = function () {											// 플레이어 정보
			return "🔎플레이어 정보🔍 : ";
		};
		this.notice = function () {												// 알림
			return "🛎알림🛎 : ";
		};
		this.cnot = function () {												// 주의
			return "⛔주의⛔ : ";
		};
		this.locked = function () {												// 비활성화
			return "🔒잠금🔒 : ";
		};
		this.unlocked = function () {											// 활성화
			return "🔓해제🔓 : ";
		};
		this.acess = function(player){											// 권한 없음
			return NC.announce(NC.locked() + "권한이 없습니다.", player.id, "yellow", 5, 3);
		}
		this.msgCommand = function(msg){ 										// 알림 메세지
			msg = "🔎" + msg + "명령어🔍 : ";
			return msg;
		}
		this.alretMsg = function(player){										// 욕설 감지 메시지
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
				case 12: msg = "말은 그사람의 행동과 인격을 나타냅니다."; break;
			}
			return NC.announce(NC.cnot() + msg, player.id, "orange", 5, 2);
		}
		this.ruleCommand = function(msg){ 										// 규칙
			msg = "🕹" + msg + "규칙🎮 : ";
			return msg;
		}
		this.announce = function(msg, target, color, style, sound){ 			// 알림 메시지
			room.sendAnnouncement(msg, target, NC.setColor(color), NC.setStyle(style), sound);
			return false;
		}
		this.setColor = function(color){										// 색상 지정
			switch(color){
				case 0:			color = "E81224"; break;
				case 1:			color = "0078D7"; break;
				case "um":		color = "6CB858"; break;				// UM
				case "red":		color = "FF0000"; break;			// 빨강
				case "orange":	color = "FF5E00"; break;			// 주황
				case "yellow":	color = "FFE400"; break;			// 노랑
				case "green":	color = "8ED2AB"; break;			// 초록
				case "sky":		color = "00D8FF"; break;			// 하늘
				case "blue":	color = "0000FF"; break;			// 파랑
				case "purple":	color = "5F00FF"; break;			// 보라
				case "pink":	color = "ff86cf"; break;			// 핑크
				case "black":	color = "000000"; break;			// 검정
			}
			if(color) color = ("0x" + color);
			else color = "0xFFFFFF";
			return color;
		}
		this.setStyle = function(style){										// 굵기 지정
			switch(style){
				case 1: case "nomarl":			style = "nomarl"; break;		// 기본
				case 2: case "bold":			style = "bold"; break;			// 볼드체
				case 3: case "italic":			style = "italic"; break;		// 이탈릭
				case 4: case "small":			style = "small"; break;			// 작게
				case 5: case "small-bold":		style = "small-bold"; break;	// 작은 볼드체
				case 6: case "small-italic":	style = "small-italic"; break;	// 작은 이탈릭
			}
			return style;
		}
	}
}
//-----------------------------------------------------------------------
// 채팅 시스템 클래스
//-----------------------------------------------------------------------
class ChatSystem {													
	constructor(){
		this.MAXCHATMODE = 2;
		this.freezeChat = false;										//							채팅 얼리기/녹이기
		this.face = [													//	 						이모티콘
			'🤔', 
			'😛', '😍', '😅', '😂', '🤣', 
			'😎', '😐', '😥', '😰', '🙄', 
			'😴', '🥶', '😱', '🥵'
		]
		this.ffWords = [												// 							욕설 필터링 단어
			"ㄴㅇㅁ","ㄴㄱㅁ", "ㄴ.ㄱㅁ","ㄴ.ㅇㅁ","ㄴㄱ.ㅁ","ㄴㅇ.ㅁ",
			"니엄마","느금","니애미","니애1미","니애2미", "니미", "니앰", "니애비", "애미없는", "애미없지", "애미없냐", "sldjaak", "smrma", "sldlao",
			"니@ㅐ미", "니@ㅐ비", "보지벌려",
			"애1미","애2미","애미뒤짐","애1미뒤짐","애2미뒤짐", "창녀", "창년", "업소녀", "doalenlwla", "ckdsu",
			"애미 뒤짐", "애미 디짐", "애미 뒤졌냐", "애미뒤졌네","애1미뒤졌네","애2미뒤졌네","애미뒤졌다","애1미뒤졌다","애2미뒤졌다",
			"애미 뒤졌네","애1미 뒤졌네","애2미 뒤졌네","애미 뒤졌다","애1미 뒤졌다","애2미 뒤졌다", "보지년",
			"애미있냐", "애미없냐", "애미있냐없냐"
		]
		this.fWords = [													// 							욕설 필터링 단어
			"ㅅㅂ", "ㅆㅂ", "ㅆㅃ", "tq", "Tq",
			"ㅂㅅ", "ㅄ", "qt", "ㅂ ㅅ",
			"장애인아", "wkddodlsdk",
			"ㄲㅈ", "Rw", "꺼져",
			"ㅈㄹ", "ㄷㅊ", "ㅈㄴ", "ㅈㄲ", "ㅗ", "🖕🏻", "🖕", "🖕🏽", "🖕🏾", "🖕🏿",
			"새끼", "새꺄", "새낀", "toRl","시발", "^^ㅣ발", "시1발", "시2발", "tlqkf",
			"씨발", "씨바", "씨-발","씨ㅡ발","씨이발","씨이이발","씨이이이발","씨1발","씨2발", "Tlqkf", "Tlqk",
			"ㅆ!발", "ㅆ!발련", 
			"병신","병1신","병2신", "qudtls","븅신","븅1신","븅2신", "qbdtls", "뷰웅신련",
			"지랄","지1랄","지2랄", "wlfkf", "wf", "wlfkd",
			"좆", "whw","존나","존1나","존2나", "whssk", "젖밥쉑", "ㅈ밥", "wjwqkqtnpr", "wqkq",
			"씹", "tlq",
			"개새1끼", "개새2끼", "개새1꺄", "개새2꺄","개새1끼야", "개새2끼야", "개새1끼가", "개새2끼가",
			"닥쳐", "닥치"
		]
		this.getChatMode = function(player){							//							채팅 모드
			return PS.members[player].chatmode;
		}
		this.getFace = function(emoji, name){ return (emoji + name + emoji) }
		this.getSpace = function(string){								//							공백 확인
			for(let i = 0; i < string.length; i++)
				if((string.substr(i, 1)).search(" ") == -1) return false;	// 공백 외 다른 문자가 들어있으면 거짓으로 반환
			return true;
		}
		this.onPlayerChat = function(player, msg){						//							채팅 시스템
			let spacePos = msg.search(" ");
			let command = msg.substr(0, spacePos !== -1 ? spacePos : msg.length);
			// 한 시간 간격으로 모든 퇴장 목록 초기화
			if(TM.temp == 0) TM.temp = 1;
			if(date.getMinutes() < TM.temp){ 
				AMN.setClearBans();
				TM.temp = date.getMinutes();
			}
			// 명령어 처리
			if(commands.hasOwnProperty(command)) return commands[command](player, msg);
			// 다중 접속자 경고창 출력
			for (let i = 1; i <= PS.cntPlayers; i++){
				if((PS.getPublicId(i) != player.id)&&(PS.getAddress(PS.getPublicId(i)) == PS.getAddress(player.id)))
					NC.announce(NC.cnot() + "다중 접속이 의심됩니다.", player.id, "orange", 5, 2);
			}
			// 기본 채팅 모드(글자 수 70자 제한)
			if((CS.freezeChat == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player);		// 채팅창 얼림 기능
			switch(CS.getChatMode(player.id)){
				// 일반 채팅
				case 0: return CS.sendAllChat(player, msg.substr(0, 70));
				// 팀별 채팅
				case 1: 
					let team;
					switch(player.team){
						case 0: team = "관중 "; break;
						case 1: team = "레드 "; break;
						case 2: team = "블루 "; break;
					}
					return CS.sendTeamChat(team, player, msg.substr(0, 70));
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
					NC.alretMsg(player);
					return false;
				}
				else i++; 
			}
			return true;
		}
		this.sendAllChat = function(player, msg){						//							전체 채팅
			let fmsg = (PS.cntPlayers >= 10) ? "전체 (" + SYS.setLine(PS.members[player.id].Pid, 2) + ')' : "전체 (" + PS.members[player.id].Pid + ')';
			let lmsg = (player.name + ": " + msg);
			// 욕설 필터링
			let mark = CS.filterWords(player, msg) ? PS.checkMarks(player) : PS.checkMarks(player, 3);
			// 채금자 채팅 무효화
			if(AMN.getMute(player.id)) return false;
			// 플레이어를 제외한 나머지 인원 찾기
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(PS.members[player.id].Pid != i){
					// 채팅 모드에 따라 도움말 추가
					if(CS.getChatMode(PS.getPublicId(i)) == 0) CS.sendMsg(fmsg + mark + lmsg, PS.getPublicId(i));
					else CS.sendMsg(fmsg + mark + lmsg + " (전체 채팅: !a 답할 내용)", PS.getPublicId(i));
				}
			}
			CS.sendMsg(fmsg + mark + lmsg, player.id);
			SYS.log(true, "전체 " + ((PS.cntPlayers >= 10) ? SYS.setLine(player.id, 2) + '(' + SYS.setLine(PS.members[player.id].Pid, 2) + ')' : player.id + '(' + PS.members[player.id].Pid + ')') + mark + lmsg);
			return false;
		}
		this.sendHideChat = function(player, msg, type){				//							나 빼고 다 보내기
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(PS.members[player.id].Pid != i){
					if(type) NC.announce(msg, PS.getPublicId(i), "yellow", 5, 1);	// 공지로 출력
					else CS.sendMsg(msg, PS.getPublicId(i));						// 일반 채팅으로 출력
				}
			}
			return false;
		}
		this.sendWhisperChat = function(toPlayer, fromPlayer, msg){		//							귓속말 채팅
			let slid = PS.cntPlayers >= 10 ? SYS.setLine(PS.getLocalId(fromPlayer), 2) : PS.getLocalId(fromPlayer);
			let spid = PS.cntPlayers >= 10 ? SYS.setLine(fromPlayer, 2) : fromPlayer;
			let dlid = PS.cntPlayers >= 10 ? SYS.setLine(PS.getLocalId(toPlayer), 2) : PS.getLocalId(toPlayer);
			let dpid = PS.cntPlayers >= 10 ? SYS.setLine(toPlayer, 2) : toPlayer;
			// 욕설 필터링
			if(!PS.getLocalId(toPlayer)) return false;
			if((fromPlayer == 0)&&(toPlayer != 0)){						// 콘솔창에서 게임으로 전달
				SYS.log(true, "전달: (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg);
				return CS.sendMsg(" 외부 (0)🌐서버 매니저: " + msg + " (귓속말 답장: !e 0 답할 내용)", toPlayer);
			}
			let mark = CS.filterWords(PS.members[fromPlayer], msg) ? PS.checkMarks(PS.members[fromPlayer]) : PS.checkMarks(PS.members[fromPlayer], 3);
			if((toPlayer == 0) &&(fromPlayer != 0)){					// ID가 0이면 콘솔창으로 전달
				CS.sendMsg("외부 " + '(' + slid + ')' + mark + PS.members[fromPlayer].name + "→ (0)🌐서버 매니저: " + msg, fromPlayer);
				SYS.log(false, spid + '(' + slid + ')' + PS.members[fromPlayer].name + ": " +  msg);
			}
			else{
				CS.sendMsg("개인 (" + slid + ')' + mark + PS.members[fromPlayer].name + "→ (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg, fromPlayer);
				CS.sendMsg("개인 (" + slid + ')' + mark + PS.members[fromPlayer].name + "→ (" + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " +  msg + " (답장:  !e " + PS.getLocalId(fromPlayer) + " 답할 내용)", toPlayer);
				SYS.log(true, "개인 " + spid + '(' + slid + ')' + mark + PS.members[fromPlayer].name + '→ ' + dpid + '(' + dlid + ')' + PS.checkMarks(PS.members[toPlayer]) + PS.members[toPlayer].name + ": " + msg);
			}
			return false;
		}
		this.sendTeamChat = function(team, player, msg){				// 							팀 채팅
			let fmsg = (PS.cntPlayers >= 10) ? team + '(' + SYS.setLine(PS.members[player.id].Pid, 2) + ')' : team + '(' + PS.members[player.id].Pid + ')';
			let lmsg = (player.name + ": " + msg);
			// 욕설 필터링
			let mark = CS.filterWords(player, msg) ? PS.checkMarks(player, player.team) : PS.checkMarks(player, 3);
			// 채금자 채팅 무효화
			if(AMN.getMute(player.id)) return false;
			// 플레이어를 제외한 나머지 팀원 찾기
			for(let i = 1; i <= PS.cntPlayers; i++){
				if((PS.members[player.id].Pid != i)&&(PS.members[PS.getPublicId(i)].team == player.team)){
					// 채팅 모드에 따라 도움말 추가
					if(CS.getChatMode(PS.getPublicId(i)) == 1) CS.sendMsg(fmsg + mark + lmsg, PS.getPublicId(i));
					else CS.sendMsg(fmsg + mark + lmsg + " (팀 채팅: !t 답할 내용)", PS.getPublicId(i));
				}
			}
			CS.sendMsg(fmsg + mark + lmsg, player.id);
			SYS.log(true, team + player.id + '(' + ((PS.cntPlayers >= 10) ? SYS.setLine(PS.members[player.id].Pid, 2) : PS.members[player.id].Pid) + ')' + mark + player.name + ": " + msg);
			return false;
		}
		this.sendMsg = function(msg, target){ 							// 							일반 메시지 출력
			NOPLAYER == false ? room.sendChat(msg, target) : NC.announce(msg, target, null, 1, 1);
			return false;
		}
		this.setAllChat = function(player, msg){						// !a 					|	전체 채팅 명령어
			if((CS.freezeChat == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player);		// 채팅창 얼림 기능
			let sPos = msg.indexOf(' ');
			CS.sendAllChat(player, msg.substr(sPos + 1, 50));
			return false;
		}
		this.setWhisperChat = function(player, msg){					// !e ID				|	귓속말 명령어
			let sPos = msg.indexOf(' ');
			let chatMsg = msg.substr(sPos + 1, 50);
      		let dId = chatMsg.indexOf(' ');
			dId = parseInt(chatMsg.substr(0, dId));
			// 채금자 채팅 무효화
			if(AMN.getMute(player.id)) return false;
			for(let i = 0; i <= PS.cntPlayers; i++){
				if(i == dId){
					if(PS.getPublicId(i) == player.id) 			// 동일 인물인 경우
						return NC.announce(NC.cnot() + "자기 자신에게 귓속말을 보낼 수 없습니다.", player.id, "orange", 5, 3);
					return CS.sendWhisperChat(PS.getPublicId(dId), player.id, chatMsg.substr(chatMsg.indexOf(' ') + 1, 70));
				}
			}
			// 귓속말 처리
			return false;
		}
		this.setTeamChat = function(player, msg){						// !t 					|	팀 채팅 명령어
			if((CS.freezeChat == true) && (!AMN.getAdminstats(player.id))) return NC.acess(player);		// 채팅창 얼림 기능
			let sPos = msg.indexOf(' ');
			let toTeam;
			switch(player.team){
				case 0: toTeam = "관중 "; break;
				case 1: toTeam = "레드 "; break;
				case 2: toTeam = "블루 "; break;
			}
			return CS.sendTeamChat(toTeam, player, msg.substr(sPos + 1, 50));
		}
		this.setChatMode = function(player, type){						//							채팅 모드 설정
			let indexType;
			PS.members[player].chatmode = type;
			switch(type){
				case 0: indexType = "전체"; break;
				case 1: indexType = "팀";	break;
			}
			NC.announce(NC.notice() + "채팅 모드의 기본값이 " + indexType +"(으)로 변경되었습니다.", player, "green", 4, 3);
			return false;
		}
		this.setFreezeChat = function(type){							//							채팅 얼리기/녹이기
			if(type == true){				// 얼리기
				CS.freezeChat = true;
				for(let i = 1; i <= PS.cntPlayers; i++){
					if(AMN.getAdminstats(PS.getPublicId(i))) NC.announce(NC.locked() + "채팅창을 얼렸습니다. " + CM.recommendCom("녹이기 ", "!unfreeze"), PS.getPublicId(i), "sky", 5, 2);
					else NC.announce(NC.locked() + "채팅창이 얼었습니다. ", PS.getPublicId(i), "sky", 5, 2);
				}
			}
			else{							// 녹이기
				CS.freezeChat = false;
				for(let i = 1; i <= PS.cntPlayers; i++){
					if(AMN.getAdminstats(PS.getPublicId(i))) NC.announce(NC.locked() + "채팅창을 녹였습니다. " + CM.recommendCom("얼리기 ", "!freeze"), PS.getPublicId(i), "sky", 5, 2);
					else NC.announce(NC.locked() + "채팅창이 녹았습니다. ", PS.getPublicId(i), "sky", 5, 2);
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
		this.recommendCom = function(kind, commands){							// 					추천 도움말
			return ('(' + kind + " 도움말: " + commands + ')'); 
		}
		this.plaster = function(player){										// !도			|	도움말, 도배방지문자(onlyadmin)
    		if(AMN.getAdminstats(player.id)){ 
				SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 도배 방지 문자를 출력함.");
				NC.announce("────────────────", null, "orange", 2, 2);
				NC.announce(NC.cnot() + "도배 방지", null, "orange", 2, 2);
				NC.announce(NC.cnot() + "분란 방지", null, "orange", 2, 2);
				NC.announce(NC.cnot() + "정숙 유지", null, "orange", 2, 2);
				NC.announce(NC.cnot() + "질서 유지", null, "orange", 2, 2);
				NC.announce("────────────────", null, "orange", 2, 2);	
			}
			else CM.comHelp(player, "!도");		// 도움말
			return false; 						// 명령어 흔적을 남기지 않음
		}
		this.comHelp = function(player, msg){ 									// !help		|	명령어 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("일반 ") 
					+ "!adminhelp(방 관리) | !bothelp(봇방) | !maphelp(맵) | !joinhelp(투입) | !chathelp(채팅) | !rankhelp(점수) | !etchelp(기타)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand("일반 ") 
					+ "!bothelp(봇방) | !maphelp(맵) | !joinhelp(투입) | !chathelp(채팅) | !rankhelp(점수) | !etchelp(기타)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.botHelp = function(player, msg){									// !bothelp		|	봇방 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("봇방 ") 
					+ "!about(봇방 정보) | !host(호스트 이동) | !set_pw(비번 설정) | !clear_pw(비번 해제) | !show_pw(비번 표시) | !도(도배 방지 문자)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand("봇방 ") 
					+ "!about(봇방 정보)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.chatHelp = function(player, msg){									// !chathelp	|	채팅 도움말
			CS.sendAllChat(player, msg);
			let modeCom;
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("채팅 ")  
					+ "!e ID(귓속말) | !t(팀별 채팅) | !a(전체 채팅) | !chatmode n(채팅 모드) | !freeze/!unfreeze(채팅 녹이기/얼리기) | ?mark(채팅창 마크) | !도(도배 방지 문자)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand("채팅 ") 
					+ "!e ID(귓속말) | !t(팀별 채팅) | !a(전체 채팅) | !chatmode n(채팅 모드) | ?mark(채팅창 마크)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.mapHelp = function(player, msg){									// !maphelp		|	맵 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("맵 ") 
					+ "/checksum(맵 정보 확인) | /store(맵 저장) | !maplist(내장 맵 목록) | !load ID(내장 맵 불러오기)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand('맵 ') 
					+ "/checksum(맵 정보 확인) | /store(맵 저장) | !maplist(내장 맵 목록)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.helpJoinP = function(player){ 										// !join		|  	참가 도움말
			NC.announce(NC.msgCommand("투입 ") + 
			"레드팀: !red | 관전석: !spec | 블루팀: !blue | 잠수: !afk", player.id, null, 4, 3);
			return false;
		}
		this.helpJoinA = function(){ 											// !join		| 	참가 도움말(공용)
			NC.announce(NC.msgCommand("투입 ") + 
			"레드팀: !red | 관전석: !spec | 블루팀: !blue | 잠수: !afk", null, null, 4, 3);
			return false;
		}
		this.scoreHelp = function(player, msg){ 								// !rankhelp	| 	랭크 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("랭크 ") 
					+ "!playlist(플레이어 목록) | !stats(전적) | ?score(점수 도움말) | !ranking(랭킹)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand("랭크 ") 
					+ "!playlist(플레이어 목록) | !stats(전적) | ?score(점수 도움말) | !ranking(랭킹)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.etcHelp = function(player, msg){									// !etchelp		|	기타 도움말
			CS.sendAllChat(player, msg);
			for(let i = 1; i <= PS.cntPlayers; i++){
				if(AMN.getAdminstats(PS.getPublicId(i))){
					NC.announce(NC.msgCommand("기타 ") 
					+ "!avatar(등번호 변경) | !adminhelp(관리 도움말)", PS.getPublicId(i), null, 4, 3);
				}
				else{
					NC.announce(NC.msgCommand("기타 ") 
					+ "!avatar(등번호 변경)", PS.getPublicId(i), null, 4, 3);
				}
			}
			return false;
		}
		this.qE_Chat = function(player){										// ?e			| 	질문_채팅 귓속말
			NC.announce(NC.help()+ "3번 플레이어에게 '안녕?'이라는 말을 조용히 전달하고 싶으면", player.id, "green", 4, 3);
			NC.announce(NC.help() + "!e 3 안녕", player.id, "yellow", 4, 3);
			NC.announce(NC.help() + "위와 같은 형식으로 보내면 됩니다."+ CM.recommendCom("관련 ", "!playlist") , player.id, "green", 4, 3);
			return false;
		}
		this.qT_Chat = function(player){										// ?t			| 	질문_채팅 팀채팅
			NC.announce(NC.help() + "상대팀이 못 엿듣게 살포시 같은 팀원에게 '민트초코 최고야'라고 전하려면", player.id, "green", 4, 3);
			NC.announce(NC.help() + "!t 민트초코 최고야", player.id, "yellow", 4, 3);
			NC.announce(NC.help() + "위와 같은 형식으로 보내면 됩니다.", player.id, "green", 4, 3);
			return false;
		}
		this.qMark = function(player){											// ?mark		| 	질문_채팅 마크
			NC.announce(NC.help()
				+ "🌐" 		+ ": 서버 매니저 | "
				+ PS.mark[0] + ": 관리자 |"
				+ PS.mark[1] + ": 보조 관리자 |"
				+ PS.mark[2] + ": 일반 |"
				+ PS.mark[3] + ": 블랙리스트 "
				+ CM.recommendCom("관련 ", "!chathelp"),
				player.id, "green", 4, 3);
			return false;
		}
		this.qChatmode = function(player){										// ?chatmode | 	질문_채팅모드
			NC.announce(NC.help() 
				+ "0: " + "전체 채팅"
				+ ' | '
				+ "1: " + "팀 채팅"
				+ CM.recommendCom("관련", "!chatmode n")
				, player.id, "green", 5, 3);
				NC.announce(NC.help()+ "상대팀이 못 듣게 같은 팀원에게 '민트초코는 진리야'라고 계속해서 설교하려면", player.id, "green", 4, 3);
				NC.announce(NC.help() + "!chatmode 1", player.id, "yellow", 4, 3);
				NC.announce(NC.help() + "위와 같은 형식을 적은 다음에, 마저 설교하면 됩니다.", player.id, "green", 4, 3);
			return false;
		}
		this.qScore = function(player){ 										// ?score		| 	점수 도움말
			NC.announce("🔎점수🔍 : " 
			+ "득: " + SC.scoreList.goal 	+ ' | '
			+ "실: " + SC.scoreList.ownGoal + ' | '
			+ "승: " + SC.scoreList.win 	+ ' | '
			+ "패: " + SC.scoreList.lost 	+ ' | '
			+ CM.recommendCom("관련", "!ranking"), player.id, "green", 4, 3);
			return false;	
		}
		this.infoRoom = function(player, msg){ 									// !info		| 	방 정보
			CS.sendAllChat(player, msg);
			NC.announce(NC.info() 
			+ "봇방입니다."	
			+ "(Based on UMUX)" 					// 이 문장은 지우지 마시오
			+ ' | ' + "릴리스 날짜: 2020.01.20" 	// 릴리스 및 업데이트 날짜
			, null, "green", 5, 3);
			// 지우지 마시오
			NC.announce(SYS.showInfo() + CM.recommendCom("관련", "!help"), null, "green", 5, 3);
			return false;
		}
		this.infoPlayers = function(player){ 									// !playlist	|	플레이어 정보
			NC.announce(NC.infoPlayer(), player.id, "yellow", 5, 3);
			for(let i = 1; i <= PS.cntPlayers; i++){
				NC.announce("등급: " + PS.checkMarks(PS.members[PS.getPublicId(i)])
					+ ' | '
					+ "ID: " + SYS.setLine(i, 2)
					+ ' | '
					+ "ID(공용): " + SYS.setLine(PS.getPublicId(i), 2)
					+ ' | '
					+ "이름: " + PS.members[PS.getPublicId(i)].name
					, player.id, null, 5, 3);
			}
			NC.announce(CM.recommendCom("유용할", "!chathelp"), player.id, "green", 5, 3);
			return false;
		}
		this.infoMaps = function(player, msg){ 									// !maplist		|	맵 정보
			CS.sendAllChat(player, msg);
			for(let i = 0; i < maps.length; i++)
				if(mapsName[i]) NC.announce('[' + SYS.setLine(i + 1, 2) + "] | " + mapsName[i], player.id, null, 4, 0);
			NC.announce("🔎맵 정렬 목록🔍 " + CM.recommendCom("관련", "!maphelp"), player.id, "yellow", 5, 3);
			return false;
		}
		this.infoScore = function(player, msg){									// !stats 		|	점수 정보
			let sPos = msg.indexOf(' ');
			let index = msg.substr(sPos + 1);
			let name = player.name;
			let pId = player.id;
			let lId = PS.getLocalId(player.id);
			index = parseInt(index.substr(0));
			if((index > 0) && (index <= PS.cntPlayers)){			// !stats ID
				name = PS.members[PS.getPublicId(index)].name;
				pId = PS.getPublicId(index);
				lId = index;
			}
			NC.announce(NC.infoPlayer() 
			+ "이름: " + name
			+ ' | ' + "개인 ID(공용 ID): " + SYS.setLine(lId, 2) + '(' + SYS.setLine(pId, 2) + ')'
			+ ' | ' + SC.showPlayerStats(pId)
			+ CM.recommendCom("관련", "!ranking"), player.id, null, 4, 3);
			return false;
		}
		this.infoRanking = function(player, msg){								// !ranking		|	랭킹 정보
			let sPos = msg.indexOf(' ');
			let index = msg.substr(sPos + 1);
			index = parseInt(index.substr(0));
			SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 랭킹을 확인함.");
			if((index > 0) && (index <= SC.rankList.length)){			// n등 랭킹 확인
				for(let i = 1; i < PS.members.length; i++){
					if(SC.rankList[index - 1] == i) return SC.sendRanking(i, player.id);
				}
			}
			return SC.sendRanking(player.id, player.id);				// 플레이어 랭킹 확인
		}
		this.setChatMode = function(player, msg){								// !chatmode	|	채팅 모드 설정
			let sPos = msg.indexOf(' ');
			let type = parseInt(msg.substr(sPos + 1, 1));
			if(msg.search(' ') == -1) return false;
			if((type >= 0)&&(type < 2)) 										// 범위 내에서 벗어나면 종료 처리
				return CS.setChatMode(player.id, type);
			return NC.announce(NC.cnot() + "올바르지 않은 값입니다. 0~1 사이의 값을 입력하세요.", player.id, "orange", 5, 3);
		}
		this.setFreezeChat = function(player){									// !freeze		|	채팅 얼리기
			if(AMN.getAdminstats(player.id)){
				if(PS.cntPlayers < 3 || CS.freezeChat == true) return NC.announce(NC.cnot() + "부적절한 조치입니다. " + CM.recommendCom("추천 ", "!mute ID"), player.id, "orange", 5, 3);
				CS.setFreezeChat(true);
				SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 채팅창을 얼림.");
				return false;
			}
			return NC.acess(player);
		}
		this.setUnfreezeChat = function(player){								// !unfreeze	|	채팅 녹이기
			if(AMN.getAdminstats(player.id)){
				if(CS.freezeChat == false) return NC.announce(NC.cnot() + "부적절한 조치입니다.", player.id, "orange", 5, 3);
				CS.setFreezeChat(false);
				SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 채팅창을 녹임.");
				return false;
			}
			return NC.acess(player);
		}
		this.setClearBans = function(player){									// !clearbans	|	영구 퇴장 명단 초기화 명령어
			if(AMN.getAdminstats(player.id)) return AMN.setClearBans(player);
			else return NC.acess(player);
		}
		this.setJoinPlayer = function(player, toTeam, msg){						// 					플레이어 투입
			let team = player.team;
			let id = player.id;
			let name = player.name;
			if(AMN.getAdminstats(player.id)){
				if(msg.substr(3, 2) && PS.members[msg.substr(3, 2)]){
					if(PS.getPublicId(msg.substr(3, 2)).id != player.id){
						team = PS.members[PS.getPublicId(msg.substr(3, 2))].team;
						id = PS.getPublicId(msg.substr(3, 2));
						name = PS.members[PS.getPublicId(msg.substr(3, 2))].name;
					}
				}
			}
			else if(AMN.teamsLock == true) return NC.acess(player);		// 팀 이동 금지 처리
			if(team == toTeam) return NC.announce(NC.cnot() + "중복된 명령어입니다.", id, "orange", 5, 1);
			else if(PS.members[id].asleep){ 
				if(player.id != id) id = player.id;
				return NC.announce(NC.cnot() + "게임 참여 의사가 없어 플레이할 수 없습니다. " + CM.recommendCom("관련 ", "!afk"), id, "orange", 5, 1);
			}
			else{
				switch(toTeam){  // 0: 관중, 1: 레드, 2: 블루
					case 0:	NC.announce(NC.notice() + GM.getTeamMark(toTeam) + "으로 이동했습니다.", id, "green", 4, 3); break;
					case 1: case 2: NC.announce(NC.notice() + name + "님이 " + GM.getTeamMark(toTeam) + "으로 참가했습니다.", null, "green", 4, 3); break;
				}
				room.setPlayerTeam(id, toTeam);
			}
			return false;
		}
		this.setJoinSpec = function(player, msg){ return CM.setJoinPlayer(player, 0, msg);}	//	 0: 관중
		this.setJoinRed = function(player, msg){ return CM.setJoinPlayer(player, 1, msg);}	// 	 1: 레드
		this.setJoinBlue = function(player, msg){ return CM.setJoinPlayer(player, 2, msg);}	//	 2: 블루		
		this.setMute = function(player, msg){									// !mute ID		|	채팅 금지
			if(AMN.getAdminstats(player.id)){
				if(PS.cntPlayers > 1){
					let sPos = msg.indexOf(' ');
					let dId = parseInt(msg.substr(sPos + 1));
					if(dId == PS.getLocalId(player.id)) 
						return NC.announce(NC.cnot() + "자기 자신의 채팅을 금지할 수 없습니다.", player.id, "orange", 5, 3);
					if((dId > 0)&&(dId <= PS.cntPlayers)) return AMN.setMute(PS.getPublicId(dId), player.id);
					else{
						NC.announce(NC.cnot() 
						+ "올바르지 않은 값입니다. " 
						+ "1부터 " + PS.cntPlayers + "까지 값을 입력하세요."
						, player.id, "orange", 5, 3);
					}
				}
				return false;
			}
			return NC.acess(player);
		}
		this.setSleep = function(player){										// !afk			|	장기 대기 플레이어 설정
			if(!PS.members[player.id].asleep) return PS.setSleep(player, true);
			return PS.setSleep(player, false);
		}
		this.setRecording = function(player){									// !rec			|	녹화 시작/종료
			if(player.admin){
				if(GM.stateRecording) return GM.stopRecording();
				else return GM.startRecording();
			}
			else NC.acess(player);
			return false;
		}
		this.loadMap = function(player, msg){									// !load n		|	맵 로드 명령어(onlyadmin)
			let sPos = msg.indexOf(' ');
			let mapId = parseInt(msg.substr(sPos + 1));
			if(msg.search(' ') == -1) return false;
			if(AMN.getAdminstats(player.id)){
				let mapData = maps[mapId - 1];
				if((mapId >= 1) && mapData){
					if((AMN.mapLock[1] == true) && (AMN.mapLock[0] != mapData)){
						NC.announce(NC.cnot() + "권한이 없어 불러올 수 없습니다.", null, "green", 5, 3);
						SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 맵 교체를 시도함 (실패).");
					}	
					else{
						room.stopGame();
						room.setCustomStadium(mapData);
						AMN.mapLock[0] = mapData;
						SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 " + mapId + "번 맵으로 교체함.");
					}
				}
				else{ 
					NC.announce(NC.cnot() + "올바르지 않은 ID입니다." + CM.recommendCom("관련 ", "!maplist"), player.id, "orange", 5, 1);
					SYS.log(true, player.id + '(' + PS.members[player.id].Pid + ')' + player.name + "(이)가 맵 교체를 시도함 (실패).");
				}
			}
			else NC.acess(player);
			return false;
		}
		// ------------이스터에그------------------
		this.joke = function(player, msg){										//	!넝담			|	joke 명령어
			CS.sendAllChat(player, msg);
			return CS.freezeChat ? false : CS.sendMsg("전체 " + CS.getFace(CS.face[1], "AlphaGo") + ": 헤헤헷, 들켜버렸군, eigu.");
		}
		this.hawawa = function(player, msg){									//	그치만			|	킹치만 명령어
			CS.sendAllChat(player, msg);
			return CS.freezeChat ? false : CS.sendMsg("전체 " + CS.getFace(CS.face[10], "AlphaGo") + ": ...이렇게라도 하지 않으면...지켜봐주지 않는 걸...");
		}
		this.taebo = function(player, msg){										//	태보해 			|	태보 응답
			CS.sendAllChat(player, msg);
			return CS.freezeChat ? false : CS.sendMsg("전체 " + CS.getFace(CS.face[2], "AlphaGo") + ": @(^0^)==@ 절대 태보해! @==(^0^)@");
		}
		this.jongikannemohyung = function(player, msg){
			CS.sendAllChat(player, msg);
			return CS.freezeChat ? false : CS.sendMsg("전체 (2)" + PS.mark[0] + player.name + ": 본인 방금 네모형 되는 상상함. 하지만 어림도 없지!");
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
		this.superBlacklist = [							// 슈퍼 블랙리스트 명단
			// 에드, 핑폭테러단, Walker, 페르난지뉴, 앙헬리노, dd, Man from Wuhan
			"34392E3137342E3133332E3131", "3131382E33342E3235312E3334", "37342E38322E36302E3832", 
			"36352E34392E3132362E3839", "3132352E3138372E3133352E3239", "37322E35322E38372E3737", "3139382E31362E37342E323035",
			"31342E34372E3131322E313232", "3232312E3136352E3136332E313530", "3138322E3232342E33312E313136",
			"3138332E3130302E3135362E32353", "3138332E3130302E3135362E323532",	// Knife(웨인 루니)
			"37342E38322E36302E313739", 										// 가즈으앗

			// 유재석, 어둠의 악마
			"3231392E3234382E3230332E313430",

			// Bone Collecter, GRF SWORD
			"31342E342E3134342E313138", "31342E342E3134342E313138",
			// 플레이보이카티, Aaron Wan-Bissaka
			"34392E3137322E32362E323130", "3138302E3138322E3137392E313733",
			// 강퇴하면핑폭, 랄랄랄
			"3132342E35392E37332E313931",
			// 어드안주면핑터짐(노진구), 씨발, 어드 안주면 핑폭함 ㅅㄱ, 핑폭테러단 인원 모집
			"3138322E3232342E33312E3330", "3130342E3133312E3137362E323334", "3137382E36322E352E313537", "3137382E3132382E38392E313530",
			// 제몸무게가 220kg인데 정상인가요
			"3130342E3233362E3231332E323330",
			// 와이어샤크
			"33392E3132302E3139362E3732",
			// 핑폭각?(Ready)
			"3138332E39372E3138302E313534", "3138332E39372E3138302E313334", "3132312E3137352E3134372E313236",

			"3132352E3137362E342E313335", "3137352E3231342E392E3834", "312E3234362E3139312E323134",

			// 서든, Preber, 프레버
			"31342E34372E3131322E313330", "31342E34372E3131322E313330", "37322E35322E38372E3937", "36352E34392E3132362E3931", "37322E35322E38372E3937",

			// 쥐알티
			"312E3234362E3139312E323134",

			// 반다이크
			"3131362E3132342E3137382E3433",
			"3137352E3139372E3231392E313031",

			// 농협신, 쁘이훈
			"3132342E35332E3137362E3831",
			"3132352E3137392E3231312E3330",
			"3132352E3137392E3231312E3331",
			"3131382E3137362E34372E313233",
			"3132352E3137392E3231312E3232",
			"3132352E3137392E3231312E3533",

			// Kubo Takefusa
			"3131362E34322E32362E323235",

			// 노래하는메시
			"3131382E3137362E34372E313332",
			"3132352E3139312E37302E313031",
			
			"3138322E3232342E33312E313031",
			"3131362E3132312E3233352E3830",
			"3231312E3234332E3232322E3733",
			"33392E3131372E37392E313337",

			// 드록바 drogba
			"3131382E33322E37372E323531",

			// 경상도에서태어난아기를영국에서길렀더니내가나왔다
			"3131382E362E32352E313034",
			// soy el mas pro
			"3139302E34392E3137302E313038",
			// Ricardo
			"3138362E3132332E3231352E3234",

			// HYNN
			"3231392E3130302E33372E323433",

			// 루니
			"31342E33362E3231352E3936",
			// 제주스
			"6342E36322E3231392E3232",
			// 네테로
			"36342E36322E3231392E3232",
		]
		this.blacklist = [ 								// 블랙리스트 명단
			"에드", "핑폭테러단", "Walker", "페르난지뉴", "앙헬리노", "Knife", "웨인루니", "가즈으앗", "플레이보이카티", "Aaron Wan-Bissaka", "호박", "카푸",
			"강퇴하면핑폭", "랄랄랄", "james", "어드안주면핑터짐", "노진구", "어드 안주면 핑폭함 ㅅㄱ", "핑폭테러단 인원 모집", "제몸무게가 220kg인데 정상인가요", 
			"와이어샤크", "핑폭각?", "Ready", "Bone Collecter", "GRF SWORD", "서든", "Preber", "프레버", "명인만두 서울대점", "좁밥수비수", "쥐알티", "겐류사이 육두봉", "반다이크", "농협신", "쁘이훈",
			"Kubo Takefusa", "노래하는메시", "경상도에서태어난아기를영국에서길렀더니내가나왔다", "soy el mas pro", "Ricardo", "drogba", "드록바", "HYNN", "루니", "제주스", "네테로"
		];
		this.cntPlayers		 	= 0;					// 플레이어 인원 체크
		this.members 			= new Array();			// 플레이어 정보 데이터
		this.network 			= new Array();			// 플레이어 공용 네트워크
		this.address 			= new Array();			// 플레이어 공용 주소
		this.afkList 			= new Array();			// 장기 대기 플레이어 목록(자동)
		this.onPlayerTeamChange = function(player, byPlayer){	// 팀 교체
			// 대기열 플레이어 파악
			if((AMN.hostLock == true)&&(room.getPlayer(0).team != 0)) room.setPlayerTeam(0, 0);
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
			PS.members[data.id] = { 
				"name": data.name, "team": 0, "id": data.id, "Pid": PS.cntPlayers, 
				"admin": false, "sub_admin": false, "asleep": false, 
				"chatmode": 0, "stats": new Array()
			};
		}
		this.getPlayer = function(index){						// 플레이어 객체 구하기
			return room.getPlayerDiscProperties(index) ? room.getPlayerDiscProperties(index) : false;
		}
		this.getGravityX = function(index){						// 플레이어 X 중력 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).xgravity : false;
		}
		this.getGravityY = function(index){						// 플레이어 Y 중력 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).ygravity : false;
		}
		this.getRadius = function(index){						// 플레이어 반지름 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).radius : false;
		}
		this.getBcoeff = function(index){						// 플레이어 바운스 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).bCoeff : false;
		}
		this.getInvMass = function(index){						// 플레이어 역질량 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).invMass : false;
		}
		this.getDamping = function(index){						// 플레이어 제동 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).dapming : false;
		}
		this.getLocalId = function(Publicid){					// 플레이어 개인 id 확인(공용 id)
			if(PS.cntPlayers == 1) return 1;
			for(let i = 1; i <= PS.cntPlayers; i++)
				if(Publicid == PS.getPublicId(i)) return i;
			return false;
		}
		this.getPublicId = function(Privateid){					// 플레이어 공용 id 확인(개인 id)
			let i = 1;
			while(1){
				if(PS.members[i] == undefined) break;
				if(PS.members[i].Pid == Privateid) return PS.members[i].id;
				i++;
			}
			return false;
		}
		this.getPosX = function(player){						// 플레이어 X좌표 가져오기
			return PS.getPlayer(player) ? PS.getPlayer(player).x : false;
		}
		this.getPosY = function(player){						// 플레이어 Y좌표 가져오기
			return PS.getPlayer(player) ? PS.getPlayer(player).y : false;
		}
		this.getSpeedX = function(index){						// 플레이어 X 속도 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).xspeed : false;
		}
		this.getSpeedY = function(index){						// 플레이어 Y 속도 구하기
			return PS.getPlayer(index) ? PS.getPlayer(index).yspeed : false;
		}
		this.getPosition = function(player){					// 플레이어 좌표 가져오기
			return PS.getPlayer(player) ? {"x" : PS.getPlayer(player).x, "y" : PS.getPlayer(player).y} : false;
		}
		this.getAddress = function(searchId){					// 플레이어 공용 주소 가져오기
			return PS.address[searchId];
		}
		this.getNetwork = function(searchId){					// 플레이어 공용 네트워크 가져오기
			return PS.network[searchId];
		}
		this.setPosition = function(player, x, y){ 				// 플레이어 좌표 지정
			room.setPlayerDiscProperties(player, {"x" : x, "y" : y});
		}
		this.setPosX = function(player, x){ 					// 플레이어 X 좌표 지정
			room.setPlayerDiscProperties(player, {"x" : x});
		}
		this.setPosY = function(player, y){ 					// 플레이어 Y 좌표 지정
			room.setPlayerDiscProperties(player, {"y" : x});
		}
		this.setGravityX = function(player, gravityX){ 			// 플레이어 X 중력 지정
			room.setPlayerDiscProperties(player, {"xgravity" : gravityX});
		}
		this.setGravityY = function(player, gravityY){ 			// 플레이어 X 중력 지정
			room.setPlayerDiscProperties(player, {"ygravity" : gravityY});
		}
		this.setRadius = function(player, r){ 					// 플레이어 반지름 지정
			room.setPlayerDiscProperties(player, {"radius" : r});
		}
		this.setBcoeff = function(player, b){ 					// 플레이어 바운스 지정
			room.setPlayerDiscProperties(player, {"bcoeff" : b});
		}
		this.setInvMass = function(player, m){					// 플레이어 역질량 지정
			room.setPlayerDiscProperties(player, {"invMass" : m});
		}
		this.setDamping = function(player, d){					// 플레이어 제동 지정
			room.setPlayerDiscProperties(player, {"damping" : d});
		}
		this.setAvatar = function(player, msg){					// 등번호 설정
			if(msg.substr(1, 6) == "avatar") 
				room.setPlayerAvatar(player.id, msg.substr(8, 10));
			else room.setPlayerAvatar(player.id, msg.substr(5, 10));
			NC.announce(NC.notice() + "등번호가 변경되었습니다.", player.id, "green", 4, 3);
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
		this.setAddress = function(player, address){			// 플레이어 공용 주소
			if(PS.address[player] == undefined) PS.address[player] = address;
			return false;
		}
		this.setNetwork = function(player, net){				// 플레이어 공용 네트워크
			if(!PS.network[player] == undefined) PS.network[player] = net;
			return false;
		}
		this.setSleepPlayer = function(player){					// 장기 대기 플레이어 추가
			PS.members[player.id].asleep = true;
			if(player.team != 0) room.setPlayerTeam(player.id, 0);
			CS.sendHideChat(player, NC.notice() + player.name + "님이 자리를 비웠습니다.", true);
			NC.announce(NC.notice() + "자리를 비웠습니다. 게임에 다시 참여하려면 명령어를 한 번 더 입력하세요. " + CM.recommendCom("관련", "!afk"), player.id, "green", 5, 1);
			SYS.log(true, "대기열 추가: " + player.id + '(' + PS.getLocalId(player.id) + ')' + player.name);
			return false;
		}
		this.updateMarks = function(){							// 플레이어 마크 갱신
			for(let i = 0; i < PS.cntPlayers; i++)
				PS.checkMarks(PS.members[PS.getPublicId(i)]);
			return true;
		}
		this.updatePlayers = function(player){					// 플레이어 정보 갱신
			// 한 칸씩 채우기
			if(PS.cntPlayers == 1) return false;
			for(let i = PS.getLocalId(player.id) + 1; i <= PS.cntPlayers; i++)
				PS.members[PS.getPublicId(i)].Pid--;
			return false;
		};
		this.checkMarks = function(player, type){				// 플레이어 마크 정보
			switch(type){
				case 1: case 2:	return PS.mark[player.team + 4];	// 팀별 채팅 감지
				case 3:			return PS.mark[4];					// 욕설 필터 감지
			}
			if(AMN.checkBlacklists(player.name)) return PS.mark[3];		// 블랙리스트
			switch(AMN.getAdminstats(player.id)){
				case 1:	return PS.mark[1];			// 보조 권한
				case 2:	return PS.mark[0];			// 주권한
				default: return PS.mark[2];			// 일반
			}
		}
		this.clearMember = function(data){						// 플레이어 정보 데이터 지우기
			PS.members[data.id].team = 0;
			PS.members[data.id].Pid = null;
			PS.members[data.id].asleep = false;
			PS.members[data.id].chatmode = 0;
		}
		this.deleteSleepPlayer = function(player){				// 장기 대기 플레이어 제거
			PS.members[player.id].asleep = false;
			CS.sendHideChat(player, NC.notice() + player.name + "님은 지금부터 게임 참여가 가능합니다.", true);
			NC.announce(NC.notice() + "게임에 바로 참여할 준비가 되었습니다! " + CM.recommendCom("관련", "!join"), player.id, "green", 5, 1);
			SYS.log(true, "대기열 제거: " + player.id + '(' + PS.getLocalId(player.id) + ')' + player.name);
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
		this.totalRedGoals	= 0;			// 레드팀 골 개수(누적)
		this.totalBlueGoals	= 0;			// 블루팀 골 개수(누적)
		this.holder			= null;			// 선두 선수
		this.rankList		= new Array();	// 랭킹 정보
		// 점수 증차감 정도
		this.scoreList		= {"win" : 3, "lost" : -3, "goal" : 5, "ownGoal" : -5};
		this.initStatus = function(player){						// 플레이어 점수 정보 초기화
			PS.members[player].stats = {
				"win" : 0, "lost": 0, "goal" : 0, "ownGoal" : 0
			};
		}
		this.initRanking = function(player){					// 랭킹 초기화
			SC.rankList.push(player);
		}
		this.initHolder = function(){ SC.setHolder(null); }		// 선두 선수 초기화
																// 득점 골 구하기
		this.getRedGoals = function(){ return room.getScores() != null ? room.getScores().red : 0; }
		this.getBlueGoals = function(){ return room.getScores() != null ? room.getScores().blue : 0; }
																// 누적 골 구하기
		this.getTotalRedGoals = function(){ return SC.totalRedGoals; }
		this.getTotalBlueGoals = function(){ return SC.totalBlueGoals; }
		this.getWinner = function(){							// 승리 팀 판정
			if(SC.getRedGoals() > SC.getBlueGoals()) return 1; 		// 레드팀 승
			if(SC.getRedGoals() < SC.getBlueGoals()) return 2; 		// 블루팀 승
			return 3;	// 무승부
		}												// 게임 시간 구하기
		this.getGameTime = function(){ return room.getScores().time; }
																// 플레이어 점수 정보 얻기
		this.getStatsWin = function(index){		return PS.members[index].stats.win; }		// 승리
		this.getStatsLost = function(index){	return PS.members[index].stats.lost; }		// 패배
		this.getStatsGoal = function(index){	return PS.members[index].stats.goal; }		// 득점 골
		this.getStatsOG = function(index){		return PS.members[index].stats.ownGoal; }	// 실점 골
		this.getPlayerScores = function(player){				// 플레이어 점수 계산
			return(
			SC.getStatsWin(player) * SC.scoreList.win		// 승리 	득3점
			+ SC.getStatsGoal(player) * SC.scoreList.goal	// 득점 골	득5점
			+ SC.getStatsLost(player) * SC.scoreList.lost	// 패배 	실3점
			+ SC.getStatsOG(player) * SC.scoreList.ownGoal	// 실점 골 	실5점
			);
		}
		this.getRanking = function(player){						// 랭킹 등수 구하기
			for(let i = 0; i < SC.rankList.length; i++)
				if(SC.rankList[i] == player) return (i + 1);
			return false;
		}
		this.getDisc = function(index){							// 디스크 객체 구하기
			return room.getDiscProperties(index) ? room.getDiscProperties(index) : false;
		}
		this.getDiscPosition = function(index){					// 디스크 좌표 구하기
			return SC.getDisc(index) ? [SC.getDisc(index).x, SC.getDisc(index).y]: false;
		}
		this.getDiscPosX = function(index){						// 디스크 X 좌표 구하기
			return SC.getDisc(index) ? SC.getDisc(index).x : false;
		}
		this.getDiscPosY = function(index){						// 디스크 Y 좌표 구하기
			return SC.getDisc(index) ? SC.getDisc(index).y : false;
		}
		this.getDiscSpeedX = function(index){					// 디스크 X 속도 구하기
			return SC.getDisc(index) ? SC.getDisc(index).xspeed : false;
		}
		this.getDiscSpeedY = function(index){					// 디스크 Y 속도 구하기
			return SC.getDisc(index) ? SC.getDisc(index).yspeed : false;
		}
		this.getDiscGravityX = function(index){					// 디스크 X 중력 구하기
			return SC.getDisc(index) ? SC.getDisc(index).xgravity : false;
		}
		this.getDiscGravityY = function(index){					// 디스크 Y 중력 구하기
			return SC.getDisc(index) ? SC.getDisc(index).ygravity : false;
		}
		this.getDiscRadius = function(index){					// 디스크 반지름 구하기
			return SC.getDisc(index) ? SC.getDisc(index).radius : false;
		}
		this.getDiscBcoeff = function(index){					// 디스크 바운스 구하기
			return SC.getDisc(index) ? SC.getDisc(index).bCoeff : false;
		}
		this.getDiscInvMass = function(index){					// 디스크 역질량 구하기
			return SC.getDisc(index) ? SC.getDisc(index).invMass : false;
		}
		this.getDiscDamping = function(index){					// 디스크 제동 구하기
			return SC.getDisc(index) ? SC.getDisc(index).dapming : false;
		}
		this.getDiscColor = function(index){					// 디스크 색상 구하기
			return SC.getDisc(index) ? SC.getDisc(index).color : false;
		}
		this.getDiscColMask = function(index){					// 디스크 충돌 마스크 구하기
			return SC.getDisc(index) ? SC.getDisc(index).cMask : false;
		}
		this.getDiscColGroup = function(index){					// 디스크 충돌 그룹 구하기
			return SC.getDisc(index) ? SC.getDisc(index).cGroup : false;
		}
		this.getDistance = function(a, b){						// 두 객체 간 거리 구하기
			return (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2));
		}
		this.getHolder = function(){ return SC.holder; }		// 선두 선수 ID 구하기
		this.sendRanking = function(index, player){				// 랭킹 메시지 보내기
			let startIndex = SC.getRanking(index) - 2;
			let endIndex = SC.getRanking(index) + 1;
			NC.announce(NC.info(), player, "yellow", 5, 3);
			if(SC.rankList.length <= 3){									// 랭킹이 3명 이하면
				startIndex = 0;
				endIndex = SC.rankList.length;
			}
			else if(SC.getRanking(index) == 1){						// 플레이어가 1등이면
				startIndex = 0;
				endIndex = 3;
			}
			else if(SC.getRanking(index) == SC.rankList.length){		// 플레이어가 꼴등이면
				startIndex = SC.getRanking(index) - 3; 
				endIndex = SC.getRanking(index);
			}
			for(let i = startIndex; i < endIndex; i++){
				if(SC.rankList[i] == index) NC.announce(SC.showRankingStats(SC.rankList[i]), player, null, 5, 3);
				else NC.announce(SC.showRankingStats(SC.rankList[i]), player, null, 4, 3);
			}
			return false;
		}
		this.setHolder = function(player){ 						// 선두 선수 ID 지정
			SC.holder = player;
			return false;
		}
																// 플레이어 점수 정보 지정
		this.setStatsWin = function(index, value){ 	PS.members[index].stats.win 	= value; }		// 승리
		this.setStatsLost = function(index, value){ PS.members[index].stats.lost	= value; }		// 패배
		this.setStatsGoal = function(index, value){ PS.members[index].stats.goal 	= value; }		// 득점 골
		this.setStatsOG = function(index, value){ 	PS.members[index].stats.ownGoal = value; }		// 실점 골
		this.setRanking = function(newIndex, oldIndex){				// 랭킹 지정
			let temp = SC.rankList[oldIndex];
			SC.rankList[oldIndex] = SC.rankList[newIndex];
			SC.rankList[newIndex] = temp;
		}
		this.updateHolder = function(id){						// 선두 선수 갱신
			let ball = SC.getDisc(0);
			let player = PS.getPlayer(id);
			// 공(A), 플레이어(B) 충돌 판정		| (Ax-Bx)^2+(Ay-By)^2 <= (Ar+Br)^2
			if(SC.getDistance(ball, player) <= Math.pow(Math.round(ball.radius + player.radius), 2)){
				SC.setHolder(id);
				return true;
			}
			return false;
		}
		this.updateTotalGoals = function(){						// 누적 골 판정 갱신
			SC.totalRedGoals += SC.getRedGoals();
			SC.totalBlueGoals += SC.getBlueGoals();
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
		this.showPlayerStats = function(player){				// 플레이어 점수 정보 출력
			let result = 
			"현재 점수(순위): " + SC.getPlayerScores(player) + "점" + '(' + SC.getRanking(player) + "등" + ')'
			+ ' | ' + ((SC.getStatsWin(player) + SC.getStatsLost(player)) + "판" 
			+ ' ' + SC.getStatsWin(player) + "승" 
			+ ' ' + SC.getStatsLost(player) + "패"
			+ ' | ' + (SC.getStatsGoal(player) + SC.getStatsOG(player)) + "골");
			if(SC.getStatsOG(player) > 0) result += ('(' + "자책: " + SC.getStatsOG(player) + "골" + ') ');
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
		this.y; this.m; this.d;			// 연, 월, 일
		this.h; this.min; this.sec		// 시, 분, 초
		this.co = '-'; this.ti = ':';
		this.temp = Date.getMinutes;
		//-----------------------날짜 및 시간----------------------------------------------
		this.getDate = function(){ 								// 날짜 및 시간 반환
			return TM.updateDate();
		}
		this.updateTimsg = function(){							// 날짜 및 시간 갱신
			date = new Date();
			TM.y = date.getFullYear(); TM.m = (date.getMonth() + 1); TM.d = date.getDate();
			TM.h = date.getHours(); TM.min = date.getMinutes(); TM.sec = date.getSeconds();
			return date;
		}
		this.showDate = function(){ 							// 날짜 및 시간 출력
			TM.getDate();
			return (TM.showTimsg() + '| ' + TM.showTime());
		}
		this.updateNums = function(kind, width){				// xx 형식으로 맞추기
			kind = kind + '';
			return kind.length >= width ? kind : new Array(width - kind.length + 1).join('0') + kind;
		}
		this.optimizationTime = function(){						// 단위 보정
			TM.updateNums(TM.m, 2);
			TM.updateNums(TM.d, 2);
			TM.updateNums(TM.h, 2);
			TM.updateNums(TM.min, 2);
			TM.updateNums(TM.sec, 2);
		}
		//-----------------------날짜----------------------------------------------------
		this.getTimsg = function(){ 							// 날짜 반환
			return TM.updateTimsg();
		}
		this.getMonth = function(){								// 월 변환
			return TM.updateMonth();
		}
		this.updateDate = function(){							// 날짜 갱신
			date = new Date();
			TM.y = date.getFullYear(); TM.m = (date.getMonth() + 1); TM.d = date.getDate();
			return date;
		}
		this.updateMonth = function(){							// 월 갱신
			TM.m = date.getMonth() + 1;
			return TM.m;
		}		
		this.showTimsg = function(){ 							// 날짜 출력
			TM.getTimsg(); 
			TM.optimizationTime();
			return (
				TM.y
				+ TM.co + TM.updateNums(TM.m, 2)
				+ TM.co + TM.updateNums(TM.d, 2)
			);
		}	
		this.showMonth = function(){							// 월 출력
			return TM.updateNums(TM.getMonth(), 2);
		}
		//-----------------------시간----------------------------------------------------
		this.getTime = function(){ 								// 시간 반환
			return TM.updateTime();
		}
		this.updateTime = function(){							// 시간 갱신
			date = new Date();
			TM.h = date.getHours(); TM.min = date.getMinutes(); TM.sec = date.getSeconds();
			// 초 단위로 반환
			return ((TM.h * 3600) + (TM.min * 60) + TM.sec);
		}	
		this.showTime = function(){ 							// 시간 출력
			TM.getTime(); 
			TM.optimizationTime();

			return (
				TM.updateNums(TM.h, 2)
				+ TM.ti + TM.updateNums(TM.min, 2)
				+ TM.ti + TM.updateNums(TM.sec, 2)
			);
		}
		this.showNormalTime = function(){						// Windows 작업 표시줄 형식으로 출력
			TM.getTime(); 
			TM.optimizationTime();

			// 오후
			if(TM.h >= 12)
				return ('|' + (TM.updateNums(TM.h, 2) - 12) + TM.ti + TM.updateNums(TM.min, 2) + " PM" + '|');
			// 오전
			return ('|' + TM.updateNums(TM.h, 2) + TM.ti + TM.updateNums(TM.min, 2) + " AM" + '|');
		}
		
	}
}
//-----------------------------------------------------------------------
// 시스템 클래스
//-----------------------------------------------------------------------
class IoSystem{			
	constructor(){
		// 콘솔창 입출력
		this.initialized = false;
		this.VersionRoom 			= "v1.00";			// 방 버전
		this.VersionUMUX  			= "2.1.0";			// UMUX 버전(건드리지 마시오)
		this.SecurityPatchLevel		= "2020.12.01c";	// UMUX 보안 패치 수준(건드리지 마시오)
		this.log = function(io, msg){
			if(msg){
				if(!io) return console.log(TM.showDate() + ' ◀ ' + msg);		// 입력
				else return console.log(TM.showDate() + ' ▶ ' + msg);			// 출력
			}
		}
		this.getInit = function(){ return SYS.initialized; }
		this.getVersionRoom = function(){ return SYS.VersionRoom; }
		this.getVersionUMUX = function(){ return SYS.VersionUMUX; }
		this.getSecurityPatchLevel = function(){ return SYS.SecurityPatchLevel; }
		this.setInit = function(){ 
			SYS.log(true, "서버 가동 시작");
			SYS.initialized = true;
		}
		this.setLine = function(amount, line){									// 	자릿수 교정
			let list = 1;
			for(let i = 1; i < line; i++)
				list *= 10;
			return (amount < list ? String('0' + amount) : amount);
		}
		this.showInfo = function(){												//	정보 출력
			return (
				"버전: " + SYS.VersionRoom 
				+ ' | '
				+ "UMUX 버전: " + SYS.VersionUMUX
				+ ' | '
				+ "UMUX 보안 패치 수준: " + SYS.SecurityPatchLevel
			)
		}
	}
}
const GM 	= new GameManager();		// 게임 매니저 클래스
const AMN	= new Administration();		// 관리 클래스
const NC 	= new Notice();				// 알림 클래스
const CS 	= new ChatSystem();			// 채팅 시스템 클래스
const CM 	= new Commands();			// 명령어 클래스
const PS 	= new Player();				// 플레이어 클래스
const SC	= new Scores();				// 점수 클래스
const TM 	= new TimeManager();		// 시간 관리 클래스
const SYS	= new IoSystem();			// 시스템 클래스
const room = ROOM;
//-----------------------------------------------------------------------
// 명령어
//-----------------------------------------------------------------------
var commands = {					
	"!help": CM.comHelp, "!헬프": CM.comHelp, "!도움": CM.comHelp, "!명령" : CM.comHelp, "!명령어" : CM.comHelp, "!ㅗ디ㅔ" : CM.comHelp, "!gpfvm" : CM.comHelp,
	"!bothelp" : CM.botHelp, "!봇헬프" : CM.botHelp, "!봇방" : CM.botHelp, "봇방도움말" : CM.botHelp, "ㅠㅐ소디ㅔ" : CM.botHelp, "봇" : CM.botHelp,  "qht" : CM.botHelp, "qht" : CM.botHelp,  "about" : CM.botHelp, 
	"!maphelp" : CM.mapHelp, "!맵도움" : CM.mapHelp, "!맵도움말" : CM.mapHelp, "!맵헬프" : CM.mapHelp, "!유즈맵" : CM.mapHelp, "!유즈맵도움말" : CM.mapHelp, "!ㅡ메ㅗ디ㅔ" : CM.mapHelp, 
	"!chathelp" : CM.chatHelp, "!채팅" : CM.chatHelp, "!챗" : CM.chatHelp, "!챗헬프" : CM.chatHelp, "!채팅명령어" : CM.chatHelp, "!챗도움" : CM.chatHelp, "!챗도움말" : CM.chatHelp, "!촘소디ㅔ" : CM.chatHelp,
	"!etchelp" : CM.etcHelp, "!기타헬프" : CM.etcHelp, "!기타도움" : CM.etcHelp, "!기타도움말" : CM.etcHelp, "!기타" : CM.etcHelp, "!ㄷㅅ초디ㅔ" : CM.etcHelp, 
	"?mark" : CM.qMark, "?채팅" : CM.qMark, "?촘ㅅ" : CM.qMark, "?마크" : CM.qMark,
	"?e" : CM.qE_Chat, "?ㄷ" : CM.qE_Chat, "?whisper" : CM.qE_Chat, "?귓속말" : CM.qE_Chat, "?귓말" : CM.qE_Chat, 
	"?t" : CM.qT_Chat, "?ㅅ" : CM.qT_Chat, "?team" : CM.qT_Chat, "?팀채팅" : CM.qT_Chat, "?팀챗" : CM.qT_Chat, 
	"?chatmode": CM.qChatmode, "?chat": CM.qChatmode, "?채팅모드": CM.qChatmode, "?채팅": CM.qChatmode, "?촘스ㅐㅇㄷ": CM.qChatmode, "?촘ㅅ": CM.qChatmode, "?coxldahem": CM.qChatmode, "?coxld": CM.qChatmode, 
	"?score" : CM.qScore, "?ㄴ책ㄷ" : CM.qScore, "?점수" : CM.qScore, "?wjatn" : CM.qScore, "?스코어" : CM.qScore, 
	"!playlist" : CM.infoPlayers, "!player" : CM.infoPlayers, "!players" : CM.infoPlayers, "!피묘ㅣㅑㄴㅅ" : CM.infoPlayers, "!ㅔㅣ묟ㄱ" : CM.infoPlayers, "!플레이리스트" : CM.infoPlayers, 
	"!플레이어리스트" : CM.infoPlayers, "!플레이어목록" : CM.infoPlayers, "!유저리스트" : CM.infoPlayers, "!유저목록" : CM.infoPlayers, "!플레이어" : CM.infoPlayers, 
	"!avatar": PS.setAvatar, "!아바타": PS.setAvatar, "!ㅇㅂㅌ": PS.setAvatar, "!ㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!등번호": PS.setAvatar, "!emdqjsgh": PS.setAvatar, 
	"!clear_avatar": PS.setAvatar, "!reset_avatar": PS.setAvatar, "!클리어_아바타": PS.setAvatar, "!ㅋㄹㅇ_ㅇㅂㅌ": PS.setAvatar, "!칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!리셋_아바타": PS.setAvatar, 
	"!clearavatar": PS.setAvatar, "!resetavatar": PS.setAvatar, "!클리어아바타": PS.setAvatar, "!ㅋㄹㅇㅇㅂㅌ": PS.setAvatar, "!칟ㅁㄱㅁㅍㅁㅅㅁㄱ": PS.setAvatar, "!리셋아바타": PS.setAvatar, 
	"!chatmode": CM.setChatMode, "!촘스ㅐㅇㄷ": CM.setChatMode, "!챗모드": CM.setChatMode, "!채팅모드": CM.setChatMode, "!챗": CM.setChatMode, "!채팅": CM.setChatMode, "!cotahem": CM.setChatMode, 
	"!coxldahem": CM.setChatMode, "!cot": CM.setChatMode, "!coxld": CM.setChatMode, 
    "!rankhelp": CM.scoreHelp,"!helprank": CM.scoreHelp,"!랭크헬프": CM.scoreHelp,"!헬프랭크": CM.scoreHelp,"!랭크도움말": CM.scoreHelp,
    "!ranking": CM.infoRanking,"!랭킹": CM.infoRanking,"!랭": CM.infoRanking,"!순": CM.infoRanking,"!순위": CM.infoRanking,
	"!adminhelp": AMN.adminHelp,"!어드민헬프": AMN.adminHelp,"!어드민도움말": AMN.adminHelp,"!어드민도움": AMN.adminHelp,"!어드헬프": AMN.adminHelp,"!어드도움말": AMN.adminHelp, "!어드민": AMN.adminHelp,
	"!adminhelpcom": AMN.adminComHelp, "!ahc": AMN.adminComHelp, "!몿": AMN.adminComHelp, 
	"p": AMN.putPause,
	"!p": AMN.unPause,

	"!maplist" : CM.infoMaps, "!cm" : CM.infoMaps, "!맵리스트" : CM.infoMaps,"!맵목록" : CM.infoMaps,"!map" : CM.infoMaps,"!맵" : CM.infoMaps,"!유즈맵" : CM.infoMaps,

	"!red" : CM.setJoinRed, "!Red" : CM.setJoinRed, "!RED" : CM.setJoinRed, "!레드" : CM.setJoinRed,"!레" : CM.setJoinRed,"!ㄹㄷ" : CM.setJoinRed, "!ㄱㄷㅇ": CM.setJoinRed,
	"!blue" : CM.setJoinBlue,"!Blue" : CM.setJoinBlue, "!BULE" : CM.setJoinBlue, "!블루" : CM.setJoinBlue,"!블" : CM.setJoinBlue,"!ㅂㄹ" : CM.setJoinBlue,"!ㅠㅣㅕㄷ" : CM.setJoinBlue,"!쁠루" : CM.setJoinBlue,"!쁠" : CM.setJoinBlue,
	"!spec" : CM.setJoinSpec, "!스펙" : CM.setJoinSpec, "!스팩" : CM.setJoinSpec, "!스" : CM.setJoinSpec, "!관중석" : CM.setJoinSpec, "!관중" : CM.setJoinSpec,"!관전석" : CM.setJoinSpec, "!관전" : CM.setJoinSpec, "!관" : CM.setJoinSpec,
	"!afk" : CM.setSleep, "!ㅁ라" : CM.setSleep, "!잠수" : CM.setSleep, 
	"!join" : CM.helpJoinP, "!joinhelp" : CM.helpJoinP, "!joinHelp" : CM.helpJoinP, "!enter" : CM.helpJoinP, "!enterhelp" : CM.helpJoinP, "!helpenter" : CM.helpJoinP, "!조인" : CM.helpJoinP, "!입장" : CM.helpJoinP, 
	"!투입" : CM.helpJoinP, "투입" : CM.helpJoinP, "투입?" : CM.helpJoinP, "투입!" : CM.helpJoinP, "투입해" : CM.helpJoinP, "투입하셈" : CM.helpJoinP, "투입요" : CM.helpJoinP, "투입좀시켜라" : CM.helpJoinP, "넣어" : CM.helpJoinP, 
	"넣어줘" : CM.helpJoinP,"넣어라" : CM.helpJoinP,"넣어봐라" : CM.helpJoinP,"넣어주세요" : CM.helpJoinP,"투입해주세요" : CM.helpJoinP, "껴줘": CM.helpJoinP,
	"투입해드려" : CM.helpJoinA, "투입명령어" : CM.helpJoinA, "투입도움말" : CM.helpJoinA, 
 
	"!!2115" : AMN.getAdmin,			// 권한 얻기
	"!admin": AMN.setDynamicAdmin,		// 권한 동적 할당
	// 권한 얻기(오타)
	"!!" : AMN.missPassword,

	"!rr": AMN.setReset, "!ㄱㄱ": AMN.setReset,"!리": AMN.setReset, "!re": AMN.setReset,		// 다시 시작
	"!r" : AMN.setAutoReset, "!ㄱ" : AMN.setAutoReset,  "!고" : AMN.setAutoReset, 				// 자동 재시작
	"!clearbans" : CM.setClearBans, "!cb" : CM.setClearBans, 									// 밴 초기화
	"!freeze" : CM.setFreezeChat, "!ㄺㄷㄷㅋㄷ" : CM.setFreezeChat, 
	// 채팅창 얼리기/녹이기
	"!얼리기" : CM.setFreezeChat, "!얼기" : CM.setFreezeChat, "!채팅얼기" : CM.setFreezeChat, "!채팅얼리기" : CM.setFreezeChat, 
	"!djfflrl" : CM.setFreezeChat, "!djfrl" : CM.setFreezeChat, "!coxlddjfrl" : CM.setFreezeChat, "!coxlddjfflrl" : CM.setFreezeChat, 
	"!unfreeze" : CM.setUnfreezeChat, "!ㅕㅜㄺㄷㄷㅋㄷ" : CM.setUnfreezeChat, 
	"!녹기" : CM.setUnfreezeChat, "!녹이기" : CM.setUnfreezeChat, "!채팅녹기" : CM.setUnfreezeChat, "!채팅녹이기" : CM.setUnfreezeChat, 
	"!shrrl" : CM.setUnfreezeChat, "!shrdlrl" : CM.setUnfreezeChat, "!coxldshrrl" : CM.setUnfreezeChat, "!coxldshrdlrl" : CM.setUnfreezeChat, 
	// 팀 이동 제한(전체)
	"!lock" : AMN.setTeamsLock, "!l" : AMN.setTeamsLock, "!L" : AMN.setTeamsLock, "!락" : AMN.setTeamsLock, "!fkr" : AMN.setTeamsLock,
	"!host" : AMN.setHostLock,

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
	// 전체 채팅
	"!a": CS.setAllChat, "!올" : CS.setAllChat, "!전체" : CS.setAllChat, "!전" : CS.setAllChat, "!ㅁ": CS.setAllChat, "!all": CS.setAllChat, "!wjscp": CS.setAllChat, "!wjs": CS.setAllChat, 
	// 팀 채팅
	"!t" : CS.setTeamChat, "!팀" : CS.setTeamChat, "!ㅅ" : CS.setTeamChat, "!ㅌ" : CS.setTeamChat, "!xla" : CS.setTeamChat, "!x" : CS.setTeamChat, 
	// 개인 채팅(귓속말)
	"!e" : CS.setWhisperChat, "!귓" : CS.setWhisperChat, "!ㄷ" : CS.setWhisperChat,					
	
	// 전적 명령어
	"!stats": CM.infoScore, "!stat": CM.infoScore, "!스탯": CM.infoScore, "!전적": CM.infoScore,  "!wjswjr": CM.infoScore,
	
	// 봇방 정보
	"!aboutinfo" : CM.infoRoom,"!info" : CM.infoRoom,"!about" : CM.infoRoom,
	"!aboutver" : CM.infoRoom,"!verinfo" : CM.infoRoom,"!version" : CM.infoRoom,"!버전" : CM.infoRoom, "!ver" : CM.infoRoom, "!정보" : CM.infoRoom,
	// 이스터 에그
	"!joke": CM.joke, "!농담": CM.joke, "!조크": CM.joke, "!넝담": CM.joke, "!알파고": CM.joke, "!네모형": CM.jongikannemohyung, "!정네": CM.jongikannemohyung,
	"킹치만": CM.hawawa, "그치만": CM.hawawa,"손나": CM.hawawa,"바카나": CM.hawawa, "!정직한네모형": CM.jongikannemohyung,
	"련님" : CM.taebo, "조혜련" : CM.taebo, "혜련" : CM.taebo, "태보" : CM.taebo, "절대태보해" : CM.taebo, "태보해" : CM.taebo, 
}
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
