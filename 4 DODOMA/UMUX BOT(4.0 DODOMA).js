/***
	<ABOUT>
	Version 4.0 r6
	Level 10(Build 1000.6)
	<README>
	유즈맵 대표카페(이하 UM)에서 진행하고 있는
	Haxball Headless Host API 기반의 유즈맵 봇방 프로젝트로,

	아래 문서상의 조건을 위배하지 않는다면 누구나 자유롭게 수정이 가능합니다.
	- 사용자 가이드라인:	github.com/HonestSquare/UMUX/wiki/UMUX-User-Guidelines
	- 라이센스:				github.com/HonestSquare/UMUX/blob/master/LICENCE
***/
/***
	서버 초기 설정
	-서버 이름
	-서버 설명
	-최대 접속 인원
	-호스트 이름
	-서버 공개 여부
***/		
const	ROOMNAME 	= "제목 없음";
const	DESCRIPTION	= "봇방입니다.";
const	MAXLIMIT	= 12;
const	HOSTNAME 	= "서버 매니저";
const	PUBLIC		= true;
const	TOKEN		= "thr1.AAAAAGOK_ARoS4CIzaQmog.kHXdHf4DRIU";
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
const c_TEAM			= Object.freeze({		/* 팀 유형 */
	SPECTATOR : 0, RED : 1, BLUE : 2
});
const c_GAME_STATS		= Object.freeze({		/* 게임 진행 상태 */
	STOP:	0, START:	1,
	TICK: 	2, PAUSE:	3
});
const c_PLAYERINFO_TYPE	= Object.freeze({		/* 플레이어 정보 유형 */
	LOCAL: 1, PUBLIC: 2, NAME: 3
});
const c_LIST_ICON		= Object.freeze({		/* 제목 아이콘 목록 */
	POSTIVE :	'○',	POSTIVE_BOLD :	'●', 
	NORMAL:		'□',	NORMAL_BOLD:	'■',
	NEGATIVE:	'△',	NEGATIVE_BOLD:	'▲',
});
const c_LIST_COLOR 		= Object.freeze({		/* 색상 목록 */
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
	TEXT_CHATBOX: 	"FFFFFF",
	BORDER_ITEM:	"485662"
});
const c_LIST_STYLE 		= Object.freeze({		/* 서식 목록 */
	NORMAL:	"normal",	BOLD:	"bold",				ITALIC:	"italic",
	SMALL:	"small",	SMALL_BOLD:	"small-bold",	SMALL_ITALIC:	"small-italic"
});
const c_LIST_SOUND		= Object.freeze({		/* 소리 목록 */
	MUTED: 0, NORMAL: 1, LOUD: 2
});
const c_SCORE_TYPE 		= Object.freeze({		/* 점수 증차감 정도 */
	WIN: 3, LOST: -3, GOAL: 5, OWNGOAL: -5, ASSIST: 2
});
const c_LIST_EMOTION	= Object.freeze([		/* 이모티콘 */
	'🤔', 
	'😍', '🤣', '😎', '😐', '😰', 
	'🙄', '😴', '🥶', '😱'
]);
const c_TIME_TYPE	= Object.freeze({			/* 시간 출력 형식 */
	CORE: 0, NORMAL: 1, FULL: 2
});
const c_TAG_TEAM	= Object.freeze({			/* 관전, 레드, 블루 */
	[c_TEAM.SPECTATOR]:	'ⓢ',
	[c_TEAM.RED]:		'ⓡ',
	[c_TEAM.BLUE]:		'ⓑ'
});
const c_TAG_GRADE	= Object.freeze([			/* 최고 권한, 보조 권한, 일반, 블랙리스트 */
	"ⓧ", "●", "ⓞ", "◯", "㉤",
]);
const c_LOG_TYPE	= Object.freeze({			/* 로그 타입 */
	NORMAL: 0, NOTICE: 1, BELL: 2, SEND: 31, BINDING: 32, WARNING: 41, ERROR: 42 
});
const c_ERROR_TYPE 	= Object.freeze({			/* 오류 타입 */
	E_PLAYER_INFO: 100, E_PLAYER_AUTH: 101, E_PLAYER_CONN: 102, E_PLAYER_PID: 103, E_PLAYER_LID: 104, E_PLAYER_ADMIN: 105, E_PLAYER_NAME: 106,
	E_ETC: 900
});

const iframeEle		= $("iframe").contentWindow.document;
const cFlags		= ROOM.CollisionFlags;		/* 충돌 플래그 */
const newLine		= "\n";						/* 개행 문자 */
const SEC_TO_MS		= 1000;						/* 1000ms == 1s */

let forbiddenWords		= [						/* 금지어 */
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

/*** 맵 초기화 ***/
let defaultStadiumList	= new Array();
let customStadiumList	= new Array();
let initStadiums = function(links){
	defaultStadiumList = [
		"Classic", "Easy", "Small", "Big", "Rounded", "Hockey",
		"Big Hockey", "Big Easy", "Big Rounded",
		"Huge"
	];
	links.forEach(st => {
		let isValidHttpUrl = function(str){
			let url;
			try{
				url = new URL(str);
			} catch(_){
				return false;
			}
			return ["https", "http"].includes(url.protocol.replace(':', ''));
		}
		if(isValidHttpUrl(st)) requestStadium(st)
		else customStadiumList.push(st);
	});
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
		this._gameEventStats		= c_GAME_STATS.STOP;	/* 경기 진행 상태 */
		this._isRecording			= false;				/* 녹화 여부 */
		this._firstTimeNotified		= 0;					/* 최초 도달 시간 */
		this._lastTimeNotified		= 0;					/* 최근 도달 시간 */
		this._timeLimit				= timeLimit;			/* 도달 기준 시간(초 단위) */
		this._timeLimitReached		= false;				/* 시간 도달 여부 */
	}
	onGamePause(player){ 				/* 게임 중단 이벤트 */
		this.gameStats = c_GAME_STATS.PAUSE;
		if(PM.isValid(player)){
			PM.updateTime(player.id);	//	마지막 활동 시간 저장
			SYS.log(true, "%d(이)가 경기를 중단함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
		}
		else SYS.log(true, "[경기 중지]", c_LOG_TYPE.NOTICE);
		TM.clearTimerByName("goal");	//	타이머 제거
		SYS.updateWebGUI();
	}
	onGameStart(player){				/* 게임 시작 이벤트 */
		this.handleGameStart();			//	경기 제어 준비
		if(PM.isValid(player)) SYS.log(true, "%d(이)가 경기를 시작함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
		else SYS.log(true, "[경기 시작]", c_LOG_TYPE.NOTICE);
		console.log("누적 경기 횟수: " + this._countMatch);
	}
	onGameStop(player){					/* 게임 종료 이벤트 */
		this.gameStats = c_GAME_STATS.STOP;
		SC.clearTouchedList();						//	선두자 명단 모두 지우기
		TM.clearTimerByName("goal");				//	타이머 제거
		if(PM.isValid(player)){
			PM.updateTime(player.id);				//	마지막 활동 시간 저장
			SYS.log(true, "%d(이)가 경기를 종료함", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player.id));
		}
		else SYS.log(true, "[경기 종료]", c_LOG_TYPE.NOTICE);
		SYS.updateWebGUI();
	}
	onGameTick(){						/* 게임 진행 이벤트 */
		if(TM.time >= this._firstTimeNotified + SEC_TO_MS / 10){	//	100ms 마다 처리
			this._firstTimeNotified = TM.time;						//	최근 기록 시간을 현재 시간으로 변경
			this.handleGameTick(this._firstTimeNotified);			//	경기 제어 처리
		}
	}
	onGameUnpause(player){				/* 게임 재개 이벤트 */
		this.gameStats = c_GAME_STATS.TICK;
		if(PM.isValid(player)){
			PM.updateTime(player.id);	//	마지막 활동 시간 저장
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
		PM.initPlayerList(player);							//	플레이어 데이터베이스 초기화
		SYS.addListIndex(player.id);						//	플레이어 인덱스 추가
		if(SYS._isDev) NC.caution("이 서버는 개발 중이므로, 게임 플레이가 원활하지 않을 수 있습니다.", player.id);
		let hasVisitRecord = PM.updateAccount(player.id);	//	계정 데이터베이스 갱신
		console.log(NC.fmtStr("접속 인원: %d", PM.cntPlayers()));
		let indexBlacklist = (AMN.isBlacklist(player.id, true) ? 2 : AMN.isBlacklist(player.id, false) ? 1 : 0);
		SYS.log(true, "%d: %d%d", c_LOG_TYPE.BELL, [
			(hasVisitRecord ? "재입장": "입장"),
			SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.PUBLIC),
			(indexBlacklist > 0 ? "(블랙리스트)" : '')
		]);
		if(indexBlacklist > 1) return AMN.kickPlayer(player.id, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
		let hasSamePlayer = AMN.hasMatchedConnection(player.id);
		if(indexBlacklist > 0 && hasSamePlayer == true)		//	(슈퍼)블랙리스트, 중복 접속, 사칭, 다중 접속 탐지
			NC.warning("%d님은 관심 대상입니다.", player.id);
		else{												//	입장 문구 출력
			NC.uniMsg('#' + player.id, "%d, %d님!",
			player.id, "!help, !join", 0,
			[(hasVisitRecord ? "다시 환영합니다" : "안녕하세요"), SYS.showPlayerInfo(player.id, c_PLAYERINFO_TYPE.NAME)]);
		}
		if(PM.cntPlayers() < 2){							//	접속자가 2인 미만이면
			PM.moveTeam(player.id, c_TEAM.RED);				//	투입하고
			room.startGame();								//	게임 시작
		}
		AMN.updateAdmins();									//	권한 갱신
		if(this.recStats)								//	녹화 중이면 별도 알림
			NC.extMsg(null, c_LIST_ICON.POSTIVE_BOLD + "녹화 중", player.id, null, c_LIST_COLOR.RED, null, 250);
		return hasVisitRecord;
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
		console.log(NC.fmtStr("접속 인원: %d", PM.cntPlayers()));
	}
	onPositionsReset(){		 			/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */
	
	}
	onRoomLink(address){				/* 주소 갱신 이벤트 */
		let shortLink	= iframeEle.getElementById("roomlink");
		shortLink.innerHTML = NC.fmtStr("서버 주소: <a href=\"%d\" target=\"_blank\"> %d</a>", address);
		if(!SYS._hasInitServer){		//	객체 초기화가 필요한 경우
			SYS.initServer(address);	//	서버 초기화
			SYS.initWebGUI();			//	그래픽 유저 인터페이스 초기화
			SYS.log(false, "서버 가동 시작", c_LOG_TYPE.BINDING);
			return;
		}
		NC.uniMsg(c_LIST_ICON.POSTIVE_BOLD + "서버방어 시스템 가동중", address);
		SYS.log(true, "서버 복구 완료", c_LOG_TYPE.WARNING);
		SYS.enableRecaptcha(true);		//	reCAPTCHA 활성화
		SYS.log(true, ["서버 안정을 위해 reCAPTCHA가 활성화되었습니다.",
			"콘솔 입력창에 아래와 같은 코드를 작성하여 수동으로 해제할 수 있습니다.",
			"SYS.enableRecaptcha(false);"
		].join(newLine), c_LOG_TYPE.WARNING);
	}
	onStadiumChange(newMap, byPlayer){	/* 맵 교체 이벤트 */
		let target = this.findStadiumNameList().indexOf(newMap);
		if(target != AMN._defaultStadium
		&& SYS.hasInRange(target, 0, customStadiumList.length - 1) == true){		//	맵 고정 설정
			if(AMN.lockStadium == false || AMN._defaultStadium == null)
				AMN._defaultStadium = target;
		}
		if(!PM.isValid(byPlayer)) return SYS.log(true, "맵 교체: %d", c_LOG_TYPE.NOTICE, newMap);
		PM.updateTime(byPlayer.id);				//	마지막 활동 시간 저장
		if(AMN.lockStadium){					//	맵 고정 확인
			this.loadMap(AMN._defaultStadium);
			return NC.acess(byPlayer, "맵이 고정돼 있어 교체할 수 없습니다.");
		}
		SYS.log(true, "%d(이)가 맵을 %d(으)로 교체함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(byPlayer.id), newMap]);
		let hasMatchedName	= function(a, b){	//	이름 일치 확인
			if(a == undefined || b == undefined) return false;
			let numStr = /[0123456789]/gi;
			return a == (numStr.test(a) ? b : b.replace(numStr, ''));
		}
		if([		//	경기장 블랙리스트
			"rip host",
			"maymun cetesi tarafindan ziyaret edildin",
			"İŞİD BOMBACISI EBU BEKUR TARAFINDAN PATLAMAYA MARUZ KALDIN",
			"Arabadan Atladı Amı Patladı"
		].findIndex(m => hasMatchedName(m.toLowerCase(), newMap.toLowerCase())) == -1) return;
		GM.loadMap(0);
		AMN.addBlacklistByPlayer(byPlayer.id, true);
	}
	onTeamGoal(team){ 					/* 골 판정 이벤트 */
		let lastTouchedPlayer = SC.lastTouchedPlayer;		//	선두자
		let getAssistant = function(p){
			if(p == undefined) return 0;
			if(p._team == team) return SC.findAssist(p);
			let al = SC._touchedList.filter(tp => tp._team == team);
			return al == undefined ? 0 : SC.findAssist(al[0]);
		}
		let assist = getAssistant(lastTouchedPlayer);						//	어시스트
		let attacker = !lastTouchedPlayer ? 0 : lastTouchedPlayer._id;		//	공격자
		let attackTeam = PM.isValid(attacker) == true && PM.findLocalId(attacker) > 0 ? lastTouchedPlayer._team : team;	//	공격 팀
		let defendTeam = team == c_TEAM.RED ? c_TEAM.BLUE : c_TEAM.RED;													//	방어 팀
		let showGoalRecord = function(attack, defend, player, assist){
			let getGoalType = (a, d) => (a == d ? "실점" : "득점");			//	득실점 구하기
			let getTime = function(time){									//	골 판정 시간 구하기
				let fl = t => SYS.fillLine(Math.floor(t), 2);
				return NC.fmtStr("%d:%d", [fl(time / 60), fl(time % 60)]);
			}
			//	공격 선수 또는 팀 구하기
			let getAttacker	= (t, p) => ((!PM.isValid(p) || !PM.findLocalId(p)) ? GM.findTeamName(t) : SYS.showPlayerInfo(p, c_PLAYERINFO_TYPE.NAME) + "님");
			let sendMsg = function(...rd){
				if(rd.length < 2) return SYS.sendError(c_ERROR_TYPE.E_ETC);
				let title = NC.fmtStr("%d➡%d: %d %d(%d)", [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), GM.findTeamName(rd[0]), getGoalType(rd[0], rd[1]), getTime(SC.gameTime)]);
				let color = rd[1] == c_TEAM.BLUE ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE;
				switch(rd.length){
					case 2:		//	공격 팀→방어 팀
						NC.extMsg(title, "%d이 %d했습니다", null, null, color, null, 0, [getAttacker(rd[0]), getGoalType(rd[0], rd[1])]);
						return SYS.log(true, "%d➡%d 득점: %d", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), getAttacker(rd[0])]);
					case 3:		//	공격 팀→방어 팀: 득점자
						NC.extMsg(title, "%d이 %d했습니다", null, null, color, null, 0, [getAttacker(rd[0], rd[2]), getGoalType(rd[0], rd[1])]);
						return SYS.log(true, "%d➡%d 공격: %d", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2])]);
					case 4:		//	공격 팀→방어 팀: 득점자(어시스트 포함)
						NC.extMsg(title, "%d이 %d했습니다" + newLine + "(도움: %d)", null, null, color, null, 0,
						[getAttacker(rd[0], rd[2]), getGoalType(rd[0], rd[1]), SYS.showPlayerInfo(rd[3]._id, c_PLAYERINFO_TYPE.NAME)]);
						return SYS.log(true, "%d➡%d 공격: %d(도움: %d)", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2]), SYS.showPlayerInfo(rd[3]._id)]);
				}
			}
			if(!PM.isValid(player)) return sendMsg(attack, defend);			//	공격 팀→방어 팀
			if(!PM.isValid(assist)) sendMsg(attack, defend, player);		//	공격 팀→방어 팀: 득점자
			else sendMsg(attack, defend, player, assist);					//	공격 팀→방어 팀: 득점자(어시스트 포함)
			//	등번호로 득점자 알림
			let goalTimer = TM.addTimer("goal", {
				EXECUTE : () => {
					let showAvatar = function(s, t, c){
						if(PM.findPlayerById(t) == undefined		//	도중 퇴장이나
						|| PM.findPlayerById(t)._team != attack){	//	팀을 옮긴 경우
							PM.resetAvatar(t);
							return;
						}
						if(s % 2 == 0) PM.giveAvatar(t, c);
						else PM.resetAvatar(t);
					}
					let target = goalTimer.findTimerByName().at(-1);
					if(target == undefined) return false;
					let currentOrder = goalTimer.calcCurrentSequence(target._sequence, 2);
					let totalSequence = goalTimer.calcTotalSequence(target._sequence);
					showAvatar(currentOrder, goalTimer._player, '⚽');
					if(PM.isValid(assist)) showAvatar(currentOrder, assist, '👍');
					if(totalSequence > 5) return goalTimer.clearTimerByName();
				},
				TERMINATE : () => {
					PM.resetAvatar(goalTimer._player);
					if(PM.isValid(assist)) PM.resetAvatar(assist);
				}
			}, player, SEC_TO_MS / 2, true, true);
		}
		//	전적 갱신
		if(PM.isValid(attacker)){
			let getStats = function(p){
				let target = SC.findRankListByPlayer(p);
				return PM.isValid(target) ? target : SC.findRankListByPlayer(SC.initRankList(p));
			}
			if(attackTeam == defendTeam) getStats(attacker).owgl += 1;
			else getStats(attacker).goal += 1;
			if(PM.isValid(assist)) SC.findRankListByPlayer(assist._id).asst += 1;
		}
		if(attackTeam != defendTeam) SC.updateGoals(team);					//	득점 데이터 갱신
		SYS.updateWebGUI();													//	그래픽 유저 인터페이스 갱신
		showGoalRecord(attackTeam, defendTeam, attacker, assist);			//	결과 출력
	}
	onTeamVictory(scores){ 				/* 팀 승리 이벤트 */
		let winner = SC.findWinner(scores);
		switch(winner){
			case c_TEAM.RED:		//	레드팀 승
				break;
			case c_TEAM.BLUE:		//	블루팀 승
				break;
			case 3:					//	무승부
				return;
		}
		for(let p of PM.findPlayerList()){
			let rp = SC.findRankListByPlayer(p._id);
			if(rp != undefined){	//	랭킹 갱신
				if(p._team == winner) rp.win += 1;
				else if(p._team != c_TEAM.SPECTATOR) rp.lost += 1;
			}
		}
		NC.extMsg(c_LIST_ICON.NORMAL_BOLD + "경기 종료", "%d이 승리하였습니다.",		//	경기 종료 및 승패 결과 출력
		null, "!ranking", (winner == c_TEAM.RED ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE), null, 0, this.findTeamName(winner));
		SYS.log(true, "%d 승리", c_LOG_TYPE.NOTICE, this.findTeamName(winner));
	}

	handleGameStart(){				/* 경기 제어 준비 */
		this.gameStats = c_GAME_STATS.START;	//	게임 상태 갱신
		this._countMatch++;						//	누적 경기 횟수 반영
		this._firstTimeNotified = TM.time;		//	최초 기록 시간 초기화
		this._lastTimeNotified = TM.time;		//	최근 기록 시간 초기화
		this._timeLimitReached = false;			//	기준 시간에 미도달한 상태로 초기화
		SC.clearTouchedList();					//	선두자 명단 모두 지우기
		for(let p of PM.findPlayerList().filter(p => p._team != c_TEAM.SPECTATOR)){
			PM.updateTime(p._id);				//	마지막 활동 시간 저장
		}
	}
	handleGameTick(currentTime){	/* 경기 제어 처리 */
		if(this.gameStats != c_GAME_STATS.TICK){ 
			this.gameStats = c_GAME_STATS.TICK;
			SYS.updateWebGUI();
		}
		for(let p of PM.findPlayerList().filter(p => p._team != c_TEAM.SPECTATOR)){	//	선두자 명단 갱신
			SC.updateTouchedList(p._id);
		}
		if(this._timeLimit < 1) return false;										//	범위 내 도달 기준 시간이면 처리 종료
		if(currentTime - this._lastTimeNotified > this._timeLimit * SEC_TO_MS){		//	최근 기록 시간에서 도달 기준 시간 이후로 경과된 경우(정기 실행)
			this._lastTimeNotified = currentTime;									//	최근 기록 시간을 현재 시간으로 변경
			return true;
		}
		if(this._timeLimitReached == false		//	0초에서 도달 기준 시간 이후로 경과된 경우(한 번만 실행)
			&& (currentTime - this._lastTimeNotified >= this._timeLimit * SEC_TO_MS)){
			this._timeLimitReached = true;		//	시간 도달하였으므로 값을 참으로 변경
			return true;
		}
		return false;
	}
			
	get afkTime(){											/* 장기 무응답 판정 최소 시간 구하기 */
		let lt = this._afkLimitTime;
		return (SYS.hasInRange(lt, 10, 60 * 60 * 3) ? lt : 0);
	}
	get gameLink(){		return this._gameLink; }			/* 서버 링크 */
	get gameStats(){	return this._gameEventStats; }		/* 경기 진행 상태 */
	get recStats(){		return this._isRecording; }			/* 녹화 상태 */
	get rptTime(){		return this._repeatedLimitTime; }	/* 반복 채팅 판정 최대 시간 */
	get totalMatch(){	return this._countMatch; }			/* 누적 경기 횟수 */

	set afkTime(v){ 		/* 장기 무응답 판정 최소 시간 지정 */
		if(typeof v != "number"){
			this._afkLimitTime = 0;
			NC.uniMsg(null, "비활동 상한 시간이 비활성화되었습니다.");
			return SYS.log(true, "비활동 상한 시간이 비활성화됨.", c_LOG_TYPE.NOTICE);
		}
		if(!SYS.hasInRange(v, 10, 60 * 60 * 3)) return SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		if(this.afkTime == v) return SYS.log(false, "중복된 값으로 접근됨", c_LOG_TYPE.WARNING);
		this._afkLimitTime = v;
		//	마지막 활동 시간 저장
		PM.findPlayerList().forEach(p => PM.updateTime(p._id));
		NC.uniMsg(null, "비활동 상한 시간이 %d초로 변경되었습니다.", null, null, 0, this.afkTime);
		SYS.log(true, "비활동 상한 시간이 %d초로 변경됨.", c_LOG_TYPE.NOTICE, this.afkTime);
	}
	set gameLink(v){		/* 서버 링크 */
		if(Object.isFrozen(this.gameLink)) return SYS.log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", c_LOG_TYPE.ERROR);
		this._gameLink = v;
	}
	set gameStats(v){		/* 경기 진행 상태 */
		this._gameEventStats = v;
	}
	set recStats(v){		/* 녹화 상태 */
		this._isRecording = v;
	}

	findStadiumNameList(target){	/* 맵 정보 갱신 */
		let size = customStadiumList.length;
		if(size < 1) return defaultStadiumList;
		let getName = function(st){
			let m = Function('"use strict";return (' + st + ')')();
			if(!m.hasOwnProperty("name")) return "비어 있음";
			if(CS.isWhiteSpace(m.name)) return "제목 없음";
			return m.name;
		}
		if(SYS.hasInRange(target, 0, size - 1)) return getName(customStadiumList[target]);
		return customStadiumList.map(mp => {
			return getName(mp);
		});
	}
	findTeamName(value){			/* 팀 상태(숫자>문자열) */
		let nameList = {
			[c_TEAM.SPECTATOR] : "관전석", [c_TEAM.RED] : "레드팀", [c_TEAM.BLUE] : "블루팀"
		}
		return nameList.hasOwnProperty(value) ? nameList[value] : SYS.sendError(c_ERROR_TYPE.E_ETC);
	}

	checkPublicId(msg, player, hasAllRange){	/* #ID 판별 */
		if(!msg) return NC.caution("%d를 포함하십시오.", player, null, '\#');
		if(!msg.includes('\#')) return NC.caution("%d를 포함하십시오.", player, null, '\#');
		let num = parseInt(msg.toString().split('\#').at(1));
		if(!PM.isValid(num)) return num == 0 ? num : NC.caution("범위를 벗어난 ID입니다.", player);
		if(PM.findLocalId(num) == false && hasAllRange == false) return NC.caution("해당 ID를 가진 플레이어는 미접속자입니다.", player);
		return num;
	}
	loadMap(target, player){					/* 맵 불러오기 */
		let isValidByPlayer = PM.isValid(player);
		let hasCustomStadiums = (customStadiumList.length > 0);
		let size = (hasCustomStadiums ? customStadiumList : defaultStadiumList).length;
		if(!SYS.hasInRange(target + 1, 1, size)){
			if(isValidByPlayer) return NC.caution("맵 ID가 올바르지 않습니다.", player, "?load");
			return SYS.log(true, "맵 데이터를 불러올 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		}
		if(AMN.lockStadium == true && AMN._defaultStadium != target)	//	맵이 고정된 경우
			return (isValidByPlayer ? NC.acess(player, "맵이 고정되어 있어 불러올 수 없습니다.") : SYS.log(false, "맵 고정을 해제해야 합니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING));				
		if(hasCustomStadiums == true && customStadiumList[target] == undefined)											//	맵 파일을 찾을 수 없는 경우
			return (isValidByPlayer ? NC.caution("맵 데이터를 불러올 수 없습니다.", player) : SYS.sendError(c_ERROR_TYPE.E_ETC));
		room.stopGame();
		AMN._defaultStadium = target;									//	맵 데이터 등록
		if(hasCustomStadiums) room.setCustomStadium(customStadiumList[target]);
		else room.setDefaultStadium(defaultStadiumList[target]);
		if(isValidByPlayer) SYS.log(true, "%d(이)가 %d번 맵으로 교체함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), target]);
	}
	reorderPlayers(playerIdList, moveToTop){	/* 플레이어 데이터베이스 순번 재정렬 */
		let mvtp = typeof moveToTop === "boolean" ? moveToTop : true;
		let pl = playerIdList == undefined ? PM.findPlayerList().map(p => p._id) : playerIdList;
		room.reorderPlayers(pl, mvtp);
		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
		PM.findPlayerList().forEach(p => SYS.updateListIndex(p._id));
	}
	runCommand(src, type, player){				/* 명령어 실행 처리 */
		//	범위 외 및 미접속자인 경우
		if(PM.isValid(player.id) == false || PM.findLocalId(player.id) == false) return false;
		let fn = Function('"use strict";return (' + src + ')')();	//	실행 구문
		let arg = type[2];											//	입력된 추가 문자열
		let header = type[0];										//	명령어 유형
		//	플레이어 공용 ID, 입력된 추가 문자열, 명령어 유형
		fn(player.id, (arg.length < 1 ? -1 : arg), header);
		return true;
	}
	startRecording(hideAnchor){ 				/* 녹화 시작 */
		if(this.recStats) this.stopRecording();
		this.recStats = true;
		NC.extMsg(c_LIST_ICON.POSTIVE_BOLD + "녹화 시작", TM.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED, null, (hideAnchor == true ? 0 : 1));
		SYS.log(true, "녹화 시작", c_LOG_TYPE.NOTICE);
		room.startRecording();
	}
	stopRecording(){ 							/* 녹화 종료 */
		let file = room.stopRecording();
		this.recStats = false;
		if(!file) return SYS.log(true, "예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.", c_LOG_TYPE.ERROR);
		NC.extMsg(c_LIST_ICON.POSTIVE + "녹화 종료", TM.showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED);
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
		this._pinHost				= pinHost;			/* 호스트 팀 이동 허용 여부 */
	}
	onPlayerAdminChange(givenPlayer, byPlayer){				/* 권한 변경 이벤트 */
		let isValidByPlayer = PM.isValid(byPlayer);
		let newAdmin = SYS.showPlayerInfo(givenPlayer.id, c_PLAYERINFO_TYPE.NAME);
		let byAdmin = (isValidByPlayer ? SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.NAME) : false);
		let target = PM.findPlayerById(givenPlayer.id);
		PM.updateTime(givenPlayer.id);			//	마지막 활동 시간 저장
		if(byAdmin != false) PM.updateTime(byPlayer.id);
		if(givenPlayer.admin == true){			//	권한 획득(최고 권한 부여)
			switch(target._admin){
				case 0:		//	무권한 → 최고 권한
					break;
				case 1:		//	보조 권한 → 무권한
					return room.setPlayerAdmin(givenPlayer.id, false);
			}
			if(this.isBlacklist(givenPlayer.id)) return target.deleteAdmin();			//	블랙리스트이면 보조 권한으로 부여
			if(this.cntAdmins(2) >= this.maxAdmin) return target.deleteAdmin();		//	최고 관리자 최대 인원을 초과하면 보조 권한으로 부여
		}
		else{				//	권한 해제(보조 권한 부여)
			switch(target._admin){
				case 2:		//	최고 권한 → 보조 권한
					return target.giveAdmin(true);
				case 1:		//	보조 권한 → 무권한
					return target.deleteAdmin(true);
				default:	//	최고 권한 → 무권한
					return;
			}
		}
		target._admin = 2;
		NC.notice(isValidByPlayer ? "%d님이 %d님에게 최고 권한을 부여했습니다." : "%d님에게 최고 권한이 부여되었습니다", null, null, isValidByPlayer ? [byAdmin, newAdmin] : newAdmin);
		SYS.log(true, (isValidByPlayer ? "%d(이)가 %d에게 최고 권한을 부여함." : "%d에게 최고 권한이 부여됨."),
			c_LOG_TYPE.BELL, (isValidByPlayer ? [SYS.showPlayerInfo(byPlayer.id), target.showPlayerInfo()] : [target.showPlayerInfo()]));
		SYS.updateListIndex(givenPlayer.id);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
	}
	onPlayerKicked(kickedPlayer, reason, ban, byPlayer){	/* 플레이어 강제 퇴장 이벤트 */
		let banType = ban == true ? "영구" : "강제";
		let target = PM.findPlayerById(kickedPlayer.id);
		target._hasKicked = true;
		if(reason == "Bad actor"){ 
			SYS.sendError(c_ERROR_TYPE.E_ETC);
			NC.notice("%d님이 오류 감지 시스템으로 인해 퇴장되었습니다.", null, null, target.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
			return SYS.log(true, "%d(이)가 오류로 인해 %d 퇴장됨.", c_LOG_TYPE.ERROR, [target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC), banType]);
		}
		if(!PM.isValid(byPlayer)) return SYS.log(true, "%d(을)를 %d 퇴장함." + (reason ? NC.fmtStr("(%d)", reason) : ''), c_LOG_TYPE.WARNING, [target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC), banType]);
		PM.updateTime(byPlayer.id);							//	마지막 활동 시간 저장
		SYS.log(true, "%d(이)가 %d(을)를 %d 퇴장함. %d", c_LOG_TYPE.WARNING, [
			SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.PUBLIC), target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC),
			banType, (reason ? ('(' + reason + ')') : '')
		]);
	}

	get allowJoin(){			return this._isAllowTeamSwitch; }	/* 플레이어 팀 자율 이동 */
	get dynmcAdmin(){			return this._enableDynamicAdmin; }	/* 플레이어 권한 동적 부여 */
	get lockStadium(){			return this._isLockStadium; }		/* 맵 고정 여부 */
	get maxAdmin(){													/* 관리자 제한 인원 */
		return SYS.hasInRange(this._maxAdminLimit, 1, MAXPLAYERS) ? this._maxAdminLimit : MAXPLAYERS;
	}
	get password(){				return PASSWORD; }					/* 비밀번호 */
	get rstrStadium(){			return this._defaultStadium; }		/* 고정 맵 데이터 */

	set allowJoin(bool){		/* 팀 이동 금지 및 허용 */
		if(this.allowJoin == bool) return;
		this._isAllowTeamSwitch = bool;
		NC.locked(!bool, "팀 자율 이동이 %d되었습니다.", null, null, (bool ? "허용" : "금지"));
		room.setTeamsLock(bool);
	}
	set dynmcAdmin(bool){		/* 권한 동적 할당 */
		if(this.dynmcAdmin == bool) return;
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
		if(this.lockStadium == true) GM.loadMap(this._defaultStadium);
	}
	set password(value){		/* 비밀번호 지정 */
		if(SYS._lockPass) return SYS.log(false, "비밀번호롤 변경하려면 시스템의 비밀번호 고정 장치를 해제하여야 합니다.", c_LOG_TYPE.WARNING);
		this.updatePassword(value);
	}

	isBlacklist(player, isSuper){		/* 블랙리스트 감지 */
		if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
		let pName = PM.findPlayerById(player)._name;
		let pAddress = this.findAddress(player);
		let target = this._blacklist.find(b => b.hasMatchedDatabase(pName, pAddress, isSuper));
		if(target == undefined) return false;
		if(target._name == undefined) target._name = pName;					//	이름 데이터가 비어 있으면 갱신
		else if(target._address == undefined) target._address = pAddress;	//	주소 데이터가 비어 있으면 갱신
		else this.addBlacklist(isSuper, pName, pAddress);					//	데이터베이스 추가
		return true;
	}
	isMute(target){						/* 채금 여부 */
		return PM.findPlayerById(target)._isMute;
	}
	hasAdmin(player, level){			/* 권한 여부 확인 */
		let v = PM.findPlayerById(player)._admin;
		return SYS.hasInRange(level, 1, 2) ? v == level : v > 0;
	}
	hasMatchedConnection(player){		/* 사칭 및 중복 여부 확인 */
		if(PM.cntPlayers() < 2) return false;						//	접속자 수가 2인 미만이면 처리 중단
		let pp = PM.findPlayerById(player);
		if(PM.isValid(pp) == false || pp.localId < 1) return false;	//	접속 상태가 아니면 처리 중단
		for(let tp of PM.findPlayerList().filter(tp => tp._id != pp._id)){
			if(!PM.isValid(tp._id)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
			if(tp._name == pp._name){ 			//	중복 접속 처리
				if(tp._network == pp._network){
					if(SYS._isDemo)	//	데모 모드 기능 제한
						SYS.log(false, ["데모 모드에서는 중복 접속 퇴장 기능이 작동되지 않습니다", "대상: %d"
						].join(newLine), c_LOG_TYPE.BINDING, pp.showPlayerInfo());
					else this.kickPlayer(tp._id, c_LIST_ICON.NORMAL + "중복 접속");
					SYS.log(true, "%d(이)가 %d(으)로 중복 접속함", c_LOG_TYPE.NOTICE, [tp.showPlayerInfo(), pp.showPlayerInfo()]);
				}
				else this.kickPlayer(pp._id, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
				return true;
			}
			if(tp._address == pp._address){		//	다중 접속 처리
				if(SYS._isDemo)		//	데모 모드 기능 제한
					SYS.log(false, ["데모 모드에서는 사칭 및 다중 접속 퇴장 기능이 작동되지 않습니다", "대상: %d"
					].join(newLine), c_LOG_TYPE.BINDING, pp.showPlayerInfo());
				else{
					this.addBlacklistByPlayer(pp._id);
					this.kickPlayer(pp._id, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
				}
				SYS.log(true, "%d(와)과 %d(이)의 다중 접속이 감지됨.", c_LOG_TYPE.WARNING, [tp.showPlayerInfo(), pp.showPlayerInfo()]);
				return true;
			}
		}
		return false;
	}

	findAddress(target){						/* 플레이어 주소 구하기 */
		return PM.findPlayerById(target)._address;
	}
	findAdminList(level){						/* 관리자 명단 찾기 */
		return PM.findPlayerList().filter(p => AMN.hasAdmin(p._id, level));
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
		return this._blacklist.push(new BlacklistSystem(isSuper, name, conn));
	}
	addBlacklistByPlayer(target, isSuper){		/* 플레이어를 블랙리스트 명단으로 추가 */
		let p = PM.findPlayerById(target);
		if(!PM.isValid(p)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
		if(p.localId > 0 && isSuper == true) this.kickPlayer(target, c_LIST_ICON.NEGATIVE_BOLD + "차단된 계정", false);
		return this.addBlacklist((isSuper ? true : false), p._name, p._address);
	}

	updateAdmins(){			/* 권한 갱신 */
		if(this.dynmcAdmin == false) return;			//	권한 할당 방식이 정적인 경우 처리 중단
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
		if(this.isBlacklist(target.id, false))			//	블랙리스트이면 보조 권한 부여
			return this.giveAdmin(target.id, true);
		this.giveAdmin(target.id);
	}
	updatePassword(pass){	/* 비번 갱신 */
		if(!SYS._lockPass)
			PASSWORD = (pass == undefined || CS.isWhiteSpace(pass) == true ? null : pass);
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

	deleteAdmin(player, isSub){	PM.findPlayerById(player).deleteAdmin(isSub); }		/* 권한 해제 */

	resetGame(player){			/* 게임 재시작 */
		room.stopGame();
		room.startGame();
	}

	showAdminList(target){		/* 관리자 명단 출력 */
		let getMsg = function(ca){
			let getList = n => ca.at(n).map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ");
			if(ca.at(1).length > 0 && ca.at(0).length > 0)
				return NC.fmtStr("최고 권한%d: %d" + newLine + "보조 권한%d: %d",
				[c_TAG_GRADE[1], getList(1), c_TAG_GRADE[2], getList(0)]);
			if(ca.at(1).length < 1 && ca.at(0).length < 1) return "비어 있음";
			return getList(ca.at(1).length > 0 ? 1 : 0);
		}
		NC.info("관리자 명단", getMsg([...Array(2)].map((v, i) => AMN.findAdminList(i + 1))), target, null);
	}
	showPassword(player){		/* 비밀번호 조회 */
		if(PASSWORD == null) return NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", player);
		NC.info("비밀번호", PASSWORD, null, null);
	}

	cntAdmins(level){		return this.findAdminList(level).length; }		/* 접속자 인원(권한) */
	enablePinHost(bool){						/* 호스트 팀 이동 설정 */
		if(NOPLAYER == true) return SYS.log(false, "호스트가 비활성화 되었기 때문에 호출할 수 없습니다", c_LOG_TYPE.WARNING);
		if(typeof bool != "boolean") return;
		if(bool) room.setPlayerTeam(0, c_TEAM.SPECTATOR);
		this._pinHost = bool;
	}
	giveAdmin(player, isSub){	PM.findPlayerById(player).giveAdmin(isSub) }	/* 권한 부여 */
	kickPlayer(target, msg, ban, ...replace){	/* 강제 퇴장 처리 */
		if(!PM.isValid(target)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		if(!PM.findLocalId(target)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_LID);
		room.kickPlayer(target, (msg ? NC.fmtStr(msg, replace, target) : null), ban);
	}
	limitScore(value, byPlayer){				/* 점수 변경 */
		let isValidByPlayer = PM.isValid(byPlayer);
		if(!SYS.hasInRange(value, 0, 14)){
			if(isValidByPlayer) return NC.caution(["올바르지 않은 값입니다.", "0~14 사이의 값을 입력하세요."].join(newLine), byPlayer, "?score");
			return SYS.log(false, ["올바르지 않은 값입니다.", "0~14 사이의 값을 입력하십시오."].join(newLine), c_LOG_TYPE.WARNING);
		}
		if(GM.gameStats == c_GAME_STATS.TICK){
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
			if(isValidByPlayer) return NC.caution(["올바르지 않은 값입니다.", "0~14 사이의 값을 입력하세요."].join(newLine), byPlayer, "?score");
			return SYS.log(false, ["올바르지 않은 값입니다.", "0~14 사이의 값을 입력하십시오."].join(newLine), c_LOG_TYPE.WARNING);
		}
		if(GM.gameStats == c_GAME_STATS.TICK){
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
		if(type != 2) return AMN.missPassword(player, msg, type);					//	첫 두 글자가 '!!'로 시작하지 않으면 무효 처리
		if(AMN.hasAdmin(player, 2)) return;											//	이미 권한이 있는 경우
		if(PM.findPlayerById(player)._isSleep) PM.enableSleepMode(player, false);	//	장기 대기열에 있었으면 제거
		SYS.log(true, "%d(이)가 최고 권한 로그인을 시도함", c_LOG_TYPE.BELL, SYS.showPlayerInfo(player));
		AMN.giveAdmin(player);
	}
	missPassword(player, msg, type){			/* 최고 권한 로그인 오입력 */
		if(type != 2) return;
		if(AMN.hasAdmin(player, 2)) return;								//	이미 권한이 있는 경우
		SYS.log(true, "%d(이)가 최고 권한 로그인을 시도함(실패)", c_LOG_TYPE.WARNING, SYS.showPlayerInfo(player));
	}
	mutePlayer(target, time, byPlayer){			/* 채팅 금지 */
		if(PM.isValid(target) == false) return;
		let mp = PM.findPlayerById(target);
		if(mp._isMute == true) return;			// 이미 채팅이 금지돼 있는 경우
		let isValidByPlayer = PM.isValid(byPlayer);
		mp._isMute = true;
		if(isValidByPlayer){
			NC.locked(true, "%d님이 %d님의 채팅을 %d 금지합니다.", null, null, [
				SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME), mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME),
				(SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안")
			]);
			SYS.log(true, "%d(이)가 %d(이)의 채팅을 금지함.", c_LOG_TYPE.NOTICE, [
				SYS.showPlayerInfo(byPlayer), mp.showPlayerInfo(),
				(time > 0 ? `${time}초 간` : "무제한")
			]);
		}
		else{
			NC.locked(true, "%d님의 채팅이 %d 금지됩니다.", null, null, [
				mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME),
				(SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안")
			]);
			SYS.log(true, "%d(이)의 채팅이 %d 금지됨.", c_LOG_TYPE.NOTICE, [
				mp.showPlayerInfo(), (time > 0 ? `${time}초 간` : "무제한")
			]);
		}
		SYS.updateListIndex(target);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
		if(typeof time != "number" || time < 5) return;
		TM.addTimer("mute", () => {
			if(mp._isMute) AMN.unmutePlayer(target);
		}, target, time * SEC_TO_MS);
	}
	swapGame(player){							/* 게임 자동 시작 및 종료 */
		if(GM.gameStats == c_GAME_STATS.TICK) return room.stopGame();
		return room.startGame();
	}
	unmutePlayer(target, byPlayer){				/* 채팅 허용 */
		let isValidByPlayer = PM.isValid(byPlayer);
		let mp = PM.findPlayerById(target);
		mp._isMute = false;
		mp.resetAvatar();						//	등번호 초기화
		SYS.updateListIndex(target);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
		if(!mp.localId) return;					//	미접속자는 별도로 출력하지 않음
		TM.clearTimerByName("mute", target);
		if(isValidByPlayer){
			NC.locked(false, "%d님이 %d님의 채팅을 허용하였습니다.", null, null, [SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME), mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME)]);
			SYS.log(true, "%d(이)가 %d(이)의 금지된 채팅을 허용함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(byPlayer), mp.showPlayerInfo()]);
		}
		else{
			NC.locked(false, "%d님의 채팅이 허용되었습니다.", null, null, mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
			SYS.log(true, "%d(이)의 금지된 채팅이 허용됨", c_LOG_TYPE.NOTICE, mp.showPlayerInfo());
		}
	}
}
/*** 블랙리스트 클래스 ***/
class BlacklistSystem{
	constructor(isSuper, name, conn){
		this._super		= isSuper ? true : false;		/* 접속 불가 처리 */
		this._name		= !name ? undefined : name;		/* 이름 */
		this._address	= !conn ? undefined : conn;		/* 공용 주소 */
	}
	hasMatchedName(str){							/* 이름 데이터 일치 확인 */
		let a = this._name;
		let b = str;								//	검사할 데이터
		if(a == undefined || b == undefined) return false;							//	데이터가 없는 경우
		if(CS.isWhiteSpace(a) == true || CS.isWhiteSpace(b) == true) return false;	//	공백 닉네임 처리
		//	우회 문자 처리
		let regc = /[`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
		let regn = /[0-9]/gi;
		a = a.replace(regc, '');
		b = b.replace(regc, '');
		if(!regn.test(a)) b = b.replace(regn, '');
		//	문자열 및 길이가 완전히 일치하여야 함
		return (a.search(b) != -1 && a.length == b.length);
	}
	hasMatchedAddress(conn){						/* 주소 데이터 일치 확인 */
		let a = this._address;
		let b = conn;									//	검사할 데이터
		if(a == undefined || a == null) return false;	//	블랙리스트 DB 값이 없는 경우
		return (a == b);
	}
	hasMatchedDatabase(name, address, isSuper){		/* 데이터베이스 확인 */
		let hasValidName = this.hasMatchedName(name);							//	이름 데이터 일치 확인
		let hasValidAddress = this.hasMatchedAddress(address);					//	주소 데이터 일치 확인
		if(hasValidName == false && hasValidAddress == false) return false;		//	완전 불일치
		return (this._super == isSuper);										//	(슈퍼)블랙리스트 기준으로 따로 처리
	}
}
/*** 공지 및 알림 클래스 ***/
class Notification{
	constructor(common, acess, caution, info, locked, notice, warning){
		this.c_LIST_MSG_COLOR = ({
			COMMON:		common,
			ACESS:		acess,
			CAUTION:	caution,
			INFO:		info,
			LOCKED:		locked,
			NOTICE:		notice,
			WARNING:	warning
		});
		Object.freeze(Object.entries(this.c_LIST_MSG_COLOR).map(k => [k[0]] = this.findColor(k[1]).slice(2)));
	}
	get msgColor(){	return this.c_LIST_MSG_COLOR; }

	findColor(color, hasRaw){						/* 색상 지정 */
		return /^[a-fA-F0-9]+/.test(color) ? `0x${color}` : (hasRaw ? color : `0x${c_LIST_COLOR.DEFAULT}`);
	}
	findSound(sound){								/* 소리 지정 */
		if(!Object.values(c_LIST_SOUND).includes(sound)) return c_LIST_SOUND.NORMAL;
		return sound;
	}
	findStyle(style){								/* 서식 지정 */
		if(!Object.values(c_LIST_STYLE).includes(style)) return c_LIST_STYLE.NORMAL;
		return style;
	}
			
	announce(msg, target, color, style, sound, delay, ...replace){
		let sendMsgByPlayer = (ms, tr, cl, st, sn) => room.sendAnnouncement(NC.fmtStr(ms, replace[0], tr), tr, NC.findColor(cl), NC.findStyle(st), NC.findSound(sn));
		let sendMsg = function(){			//	ID가 음수이면 해당 ID를 제외한 모든 플레이어에게 전송
			if(PM.isValid(Math.abs(target)) == false || target > 0) sendMsgByPlayer(msg, target, color, style, sound);
			else PM.findPlayerList().filter(p => p._id != Math.abs(target)).forEach(p => sendMsgByPlayer(msg, p._id, color, style, sound));
		}
		return delay > 0 ? TM.addTimer("announcement", () => sendMsg(), target, delay) : sendMsg();
	}
	extMsg(title, content, target, advCom, titleColor, contentColor, delay, ...replace){	/* (확장) */
		let hasTitle = (title != null);
		let hasDelay = (delay > 0);
		let titleText = (hasTitle ? (CS.isWhiteSpace(title) ? c_LIST_ICON.POSTIVE + "알림" : title) : content);
		this.announce(titleText + (advCom ? this.fmtStr("(이것을 찾으셨나요: %d)", advCom) : ''),
			target, titleColor, (hasTitle ? c_LIST_STYLE.SMALL : c_LIST_STYLE.SMALL_BOLD), null, (hasDelay ? delay : 0), replace[0]);
		if(hasTitle) this.announce(content, target, contentColor, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, (hasDelay ? (delay + 1) : 0), replace[0]);
	}
	uniMsg(title, content, target, advCom, delay, ...replace){								/* 유니버셜 메시지 */
		return this.extMsg(title, content, target, advCom, this.msgColor.NOTICE, null, delay * SEC_TO_MS, replace[0]);
	}

	acess(target, reason, ...replace){							/* 메시지: 권한 없음 */
		return this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + (reason ? "권한 없음" : "주의"), (reason ? reason : "권한 없음"), target, null, this.msgColor.ACESS, c_LIST_COLOR.GRAY, 0, replace);
	}
	alretMsg(player){											/* 메시지: 금지어 감지 */
		if(!PM.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_INFO);
		let target = PM.findPlayerById(player);
		target._detector += 1;
		if(CS.maxFwdCount > 0 && target._detector >= CS.maxFwdCount){ 
			target._detector = 0;
			return AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE_BOLD + "금지어 누적 감지");
		}
		switch(CS.detectorLev + (AMN.isBlacklist(player, false) ? 1 : 0)){
			case 0:		//	비활성화
			case 1:		//	1단계: 처리 없음
				return;
			case 6:
			case 5:		//	5단계: 강제 퇴장+채팅 금지
				AMN.mutePlayer(player, 30);
			case 3:		//	3단계: 강제 퇴장
				return AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE + "금지어 감지");
			case 4:		//	4단계: 경고 문구+채팅 금지
				AMN.mutePlayer(player, 15);
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
	caution(msg, target, advCom, ...replace){					/* 메시지: 주의 */
		return this.extMsg(c_LIST_ICON.NEGATIVE + "주의", msg, target, advCom, this.msgColor.CAUTION, c_LIST_COLOR.GRAY, 0, replace[0]);
	}			
	fmtStr(str, rep, target){									/* 문자열 치환 */
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
	help(msg, exCom, target, advCom, ...replace){				/* 메시지: 도움말 */
		return this.uniMsg(c_LIST_ICON.NORMAL + "도움말", [
			msg, exCom, "위와 같은 형식으로 보내면 됩니다."
		].join(newLine), target, advCom, 0, replace[0]);
	}
	info(){														/* 메시지: 상세정보 */
		switch(arguments.length){
			case 5:		//	info(title, context, target, advCom, ...replace);
				return this.extMsg(NC.fmtStr("%d상세정보: %d", [c_LIST_ICON.NORMAL, arguments[0]]), arguments[1], arguments[2], arguments[3], this.msgColor.INFO, null, 0, arguments[4]);
			case 4:		//	info(title, context, target, advCom);
				return this.extMsg(NC.fmtStr("%d상세정보: %d", [c_LIST_ICON.NORMAL, arguments[0]]), arguments[1], arguments[2], arguments[3], this.msgColor.INFO);
			case 3:		//	info(msg, target, advCom);
			default:
				return this.extMsg(c_LIST_ICON.NORMAL + "상세정보", arguments[0], arguments[1], arguments[2], this.msgColor.INFO);
		}
	}
	locked(isLock, msg, target, advCom, ...replace){			/* 메시지: 잠금 및 해제 */
		return this.extMsg((isLock ? c_LIST_ICON.NEGATIVE_BOLD + "잠금" : c_LIST_ICON.NEGATIVE + "해제"), msg, target, advCom, this.msgColor.LOCKED, c_LIST_COLOR.GRAY, 0, replace[0]);
	}
	msgCommand(title, content, target, advCom, ...replace){		/* 메시지: 명령어 목록 */
		return this.uniMsg((c_LIST_ICON.NORMAL + title + " 명령어"), content, target, advCom, 0, replace[0]);
	}
	notice(msg, target, advCom, ...replace){					/* 메시지: 알림 */
		return this.uniMsg(null, msg, target, advCom, 0, replace[0]);
	}
	warning(msg, target, advCom, ...replace){					/* 메시지: 경고 */
		return this.extMsg(c_LIST_ICON.NEGATIVE_BOLD + "경고", msg, target, advCom, this.msgColor.WARNING, c_LIST_COLOR.GRAY, 0, replace);
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
		this._maxRepeatedCount		= maxRepeatedCount;			/* 반복 채팅 최대 감지량 */
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
		PM.updateTime(player.id);							//	마지막 활동 시간 저장
		if(comType != null){
			let commandsList = [							//	명령어 목록
				internalCommands, standardCommands, customCommands
			];
			let hasComProp = function(cl){					//	명령어 판독
				for(const [fn, prop] of Object.entries(cl).filter(([f, p]) => p.includes(comType[1]))){
					GM.runCommand(fn, comType, player);		//	명령어 처리
					return true;
				}
				return false;
			}
			for(let cm of commandsList){					//	명령어 입력 확인
				if(hasComProp(cm)) return;
			}
		}
		if(this.hasMutedChat(player.id)) return this.sendEmojiChat(player.id, msg);		//	채팅 금지
		this.updateChatLog(player.id, msg, TM.time);	    //	채팅 로그 갱신
		if(this.hasRepeatedChat(player.id)) return;			//	반복 채팅 확인
		if(strList[0].includes('\#')) return CM.comPrivateChat(player.id, strList, 0);	//	개인 채팅 처리
		switch(PM.findPlayerById(player.id)._chatmode){		//	채팅 모드 처리
			case 0:		//	전체 채팅
				return this.sendAllChat(player.id, msg);
			case 1:		//	팀별 채팅
				return this.sendTeamChat(player.team, player.id, msg);
		}
	}
			
	get isFreezeChat(){		return this._isFreezeChat; }		/* 채팅 얼림 여부 */
	get isLockPrvChat(){	return this._isLockPrivateChat; }	/* 귓속말 차단 여부 */
	get detectorLev(){		return this._detectorLevel; }		/* 채팅 필터링 엄격도 */
	get maxFwdCount(){											/* 금지어 최대 감지량 */
		let count = this._maxForbiddenWordCount;
		return count >= 3 ? count : null;
	}
	get maxRptCount(){											/* 반복 채팅 최대 감지량 */
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
	set maxRptCount(limit){			/* 반복 채팅 최대 감지량 지정 */
		if(limit == false){
			this._maxRepeatedCount = false;
			SYS.log(true, "반복 채팅 최대 감지량 변경: %d", c_LOG_TYPE.NOTICE, "비활성화");
		}
		else if(limit >= 3 && this.maxRptCount != limit){ 
			this._maxRepeatedCount = limit;
			SYS.log(true, "반복 채팅 최대 감지량 변경: %d회", c_LOG_TYPE.NOTICE, limit);
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
		return str.toString().trim().length == 0;
	}
	hasForbiddenWord(msg){		/* 금지어 필터링 */
		if(this.detectorLev == 0) return false;		//	0단계는 판정하지 않음
		for(let fw of forbiddenWords){
			let isEquals = function(s, t){			//	단어 일치 확인
				//	공백 처리
				if([s, t].some(v => CS.isWhiteSpace(v))) return false;
				//	우회 문자 처리
				let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
				if(!reg.test(t)) s = s.replace(reg, '');
				return s.includes(t);
			}
			if(isEquals(msg, fw)) return true;
		}
		return false;
	}
	hasMutedChat(player){		/* 채팅 금지 확인 */
		return this.findPlayerById(player).hasMutedChat();
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
		return sendList(getList(0) + (AMN.hasAdmin(player) ? (newLine + getList(1)) : ''));
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
			SYS.log(true, "%d(이)가 채팅창을 %d 얼림", c_LOG_TYPE.NOTICE, [
				SYS.showPlayerInfo(player),
				SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안"
			]);
		}
		else{
			NC.locked(true, "채팅창이 %d 얼었습니다", null, null, SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안");
			SYS.log(true, "채팅창이 %d 얼려짐", c_LOG_TYPE.NOTICE, (time > 0 ? `${time}초 간` : "무제한"));
		}
		if(typeof time != "number" || time < 5) return;
		TM.addTimer("freeze", () => {
			if(CS.isFreezeChat) CS.unfreezeChat();
		}, player, time * SEC_TO_MS);
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
			SYS.log(true, "귓속말 채팅이 %d됨", c_LOG_TYPE.NOTICE, (bool ? "금지" : "허용"));
		}
	}
	sendAlert(msg, target, ...replace){				/* 관리자 채팅 전송 */
		if(NOPLAYER) return NC.announce(HOSTNAME + ": " + msg, target, null, null, null, 0, replace);
		room.sendChat(NC.fmtStr(msg, replace, target), target);
	}
	sendAllChat(player, msg){						/* 전체 채팅 전송 */
		if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
		let filter = this.hasForbiddenWord(msg);								//	금지어 필터링
		let title = NC.fmtStr("전체%d", filter ? c_TAG_GRADE[0] : PM.findTagGrade(player));
		let getContext = function(lev, str){
			let msgCore = str.slice(0, CM.maxMsgLen);
			let sendContext = arg => ((PM.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
			switch(lev){
				case 4: case 5:
					if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
				default:				return sendContext(msgCore);
			}
		}
		this.sendMsg(title + getContext(this.detectorLev, msg));
		PM.findPlayerList().filter(p => p.chatmode != 0 && p._id != player).forEach(p => NC.announce("(전체 채팅: !a)", p._id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1));
		SYS.log(true, "%d%d: %d", c_LOG_TYPE.NORMAL, [title, SYS.showPlayerInfo(player), msg]);
		if(filter) NC.alretMsg(player);
	}
	sendEmojiChat(player, msg){						/* 감정 채팅 전송 */
		let num = parseInt(msg);
		if(SYS.hasInRange(num, 0, c_LIST_EMOTION.length)){
			PM.giveAvatar(player, c_LIST_EMOTION[num]);
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
		let context = msgList[AMN.hasAdmin(player) ? "mute" : "freeze"];
		NC.locked(true, "아래에 나열된 숫자로 감정만 전달할 수 있습니다" 
		+ newLine + msgList.emoji.join(" | "), player);
		NC.acess(player, context[Math.floor(Math.random() * context.length)]);
	}
	sendMsg(msg, target, ...replace){				/* 일반 메시지 출력 */
		return NC.announce(msg, target, null, null, null, null, replace[0]);
	}
	sendPrivateChat(toPlayer, fromPlayer, msg){		/* 귓속말 채팅 전송 */
		if(!PM.isValid(toPlayer, true)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_LID);
		if(fromPlayer == 0 && toPlayer > 0)			//	콘솔창에서 게임으로 전달
			return this.sendAlert(msg + " (귓속말 답장: !e #0)", toPlayer);
		if(this.isLockPrvChat) return NC.acess(fromPlayer, "(#0)%d 외에 귓속말 채팅이 금지돼 있어 이용할 수 없습니다.", HOSTNAME);
		if(this.hasMutedChat(fromPlayer)) return this.sendEmojiChat(fromPlayer, msg);
		let filter = this.hasForbiddenWord(msg);	//	금지어 필터링
		let title = "개인" + (filter ? c_TAG_GRADE[0] : PM.findTagGrade(fromPlayer));
		let getContext = function(lev, str){
			let msgCore = str.slice(0, CM.maxMsgLen);
			let sendContext = (arg) => (SYS.showPlayerInfo(fromPlayer, c_PLAYERINFO_TYPE.LOCAL) + '→' + PM.findTagGrade(toPlayer) + SYS.showPlayerInfo(toPlayer, c_PLAYERINFO_TYPE.LOCAL) + ": ") + arg;
			switch(lev){
				case 4: case 5:
					if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
				default:				return sendContext(msgCore);
			}
		}
		let context = getContext(this.detectorLev, msg);
		this.sendMsg("%d%d (답장: !e #%d)", toPlayer, [title, context, fromPlayer]);
		this.sendMsg(title + context, fromPlayer);																								//	입력자 출력
		SYS.log(true, "%d%d→ %d%d: %d", c_LOG_TYPE.NORMAL, [			//	로그 출력
			title, SYS.showPlayerInfo(fromPlayer), PM.findTagGrade(toPlayer), SYS.showPlayerInfo(toPlayer), msg
		]);
		if(filter) NC.alretMsg(fromPlayer);
	}
	sendTeamChat(teamId, player, msg){				/* 팀 채팅 전송 */
		if(player == 0)								//	콘솔창에서 게임으로 전달
			return PM.findPlayerListByTeam(teamId).forEach(p => this.sendAlert("%d (귓속말 답장: !e #0)", p._id, msg));
		if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	//	채팅 금지
		let getTeamToString = function(t){
			let strList = Object.entries({
				[c_TEAM.RED] : "레드", [c_TEAM.BLUE] : "블루", [c_TEAM.SPECTATOR] : "관전"
			}).find(([k, v]) => k == t);
			if(strList == undefined) return SYS.sendError(c_ERROR_TYPE.E_ETC);
			return strList[1];
		}
		let filter = (PM.isValid(player) ? this.hasForbiddenWord(msg) : false);
		let title = getTeamToString(teamId) + (PM.isValid(player) ? filter ? c_TAG_GRADE[0] : PM.findTagGrade(player) : PM.findTagTeam(teamId));
		let showMsg = function(player, context){
			for(let p of PM.findPlayerListByTeam(teamId)){
				if(!PM.isValid(player)) CS.sendAlert(context, p._id);
				else CS.sendMsg(context, p._id);
			}
		}
		if(!PM.isValid(player)) return showMsg(0, msg);
		let getContext = function(lev, str){
			let msgCore = str.slice(0, CM.maxMsgLen);
			let sendContext = (arg) => ((PM.isValid(player) ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL) : ("(#0)" + HOSTNAME)) + ": ") + arg;
			switch(lev){
				case 4: case 5:
					if(filter == true)	return sendContext("관리자에 의해 삭제된 메시지입니다.");
				default:				return sendContext(msgCore);
			}
		}
		showMsg(player, title + getContext(this.detectorLev, msg));
		PM.findPlayerListByTeam(teamId).filter(p => p.chatmode != 1 && p._id != player).forEach(p => NC.announce("(팀 채팅: !t)", p._id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 1));
		SYS.log(true, "%d%d: %d", c_LOG_TYPE.NORMAL, [title, SYS.showPlayerInfo(player), msg]);
		if(filter) NC.alretMsg(player);
	}
	unfreezeChat(player){							/* 채팅 녹이기 */
		if(this.isFreezeChat == false) return;
		TM.clearTimerByName("freeze", player);
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
		this._time					= TM.time;			/* 감지 시간 */
		this._repeatedCount			= 0;				/* 반복 채팅 누적 감지량 */
		this._forbiddenWordCount	= 0;				/* 금지어 누적 감지량 */
	}
	get cntFwd(){	return this._forbiddenWordCount; }		/* 금지어 누적 감지량 */
	get cntRpt(){	return this._repeatedCount; }			/* 반복 채팅 누적 감지량 */

	set cntFwd(v){		/* 금지어 누적 감지량 */
		this._forbiddenWordCount = v;
	}
	set cntRpt(v){		/* 반복 채팅 누적 감지량 */
		this._repeatedCount = v;
	}

	hasMutedChat(){		/* 채팅 금지 확인 */
		return AMN.isMute(this._id) ? true : CS.isFreezeChat ? (AMN.hasAdmin(this._id) == false) : false;
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
			switch(l + (AMN.isBlacklist(p, false) ? 1 : 0)){
				case 0:		//	비활성화
				case 1:		//	1단계: 처리 없음
					break;
				case 6:
				case 5:		//	5단계: 강제 퇴장+채팅 금지
					AMN.mutePlayer(p, 30);
				case 3:		//	3단계: 강제 퇴장
					return AMN.kickPlayer(p, c_LIST_ICON.NEGATIVE + "반복 채팅 감지");
				case 4:		//	4단계: 경고 문구+채팅 금지
					AMN.mutePlayer(p, 15);
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
			deleteFirstLog();
		}
		logStr.unshift(msg);
		logTime.unshift(time);
	}
}
/*** 명령어 클래스 ***/
class Commands{
	constructor(maxMsgLength){
		this._maxStringLength	= maxMsgLength;			/* 채팅 글자 제한 수 */
	}
	get maxMsgLen(){	return this._maxStringLength; }	/* 채팅 글자 제한 수 */

	set maxMsgLen(n){									/* 채팅 글자 제한 수 */
		if(n == false) SYS.log(true, "채팅 메시지의 글자 수 제한이 해제됨", c_LOG_TYPE.NOTICE);
		else if(!SYS.hasInRange(n, 15, 256)) return SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		else SYS.log(true, "채팅 메시지가 %d자 내외로 제한됨", c_LOG_TYPE.NOTICE, n);
		this._maxStringLength = n;
	}

	alertSpam(player, msg, type){				/* 도배방지문자 */
		switch(type){
			case 0:		//	!도배방지
				if(!AMN.hasAdmin(player)) return CM.helpCom(player, msg, 0);		//	도움말
				NC.announce(["%d", "도배 방지", "분란 방지", "정숙 유지", "질서 유지", "도배 방지", "%d"].join(newLine),
				null, c_LIST_COLOR.ORANGE, c_LIST_STYLE.BOLD, c_LIST_SOUND.LOUD, 0, "〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰");
				SYS.log(true, "%d(이)가 반복 채팅 방지 문자를 출력함.", c_LOG_TYPE.NOTICE, SYS.showPlayerInfo(player));
				break;
			case 1:		//	?도배방지
				return AMN.hasAdmin(player) ? NC.help("반복 채팅 방지 문자를 출력하려면", "!도배방지", player) : CM.helpCom(player);
		}
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

	comUpdateUniform(player, msg, type){		/* 팀 유니폼 */
		switch(type){
			case 0:			//	!uniform
				//	팀 ID 확인
				let team = Object.entries({
					[c_TEAM.RED]	: ["red", 'r', "레드", "레"],
					[c_TEAM.BLUE]	: ["blue", 'b', "블루", "블"]
				}).find(([k, v]) => v.includes(msg[0]));
				if(team == undefined) return NC.caution("유니폼을 적용할 팀을 올바르게 입력하세요.", player, "?uniform");
				//	각도 범위 확인
				let angle = parseInt(msg[1]);
				if(!SYS.hasInRange(angle, 0, 180)) return NC.caution("각도는 0°~180° 사이의 값으로 입력해야 합니다.", player, "?uniform");
				//	인자값 길이에 따라 도움말 출력
				let len = msg.length;
				if(!SYS.hasInRange(len, 4, 6)){
					let getMsg = function(l){
						switch(l){
							case undefined:	return "유니폼을 적용할 팀을 입력하세요.";
							case 1:			return "각도를 지정하지 않았습니다.";
							case 2:			return "등번호 색상을 지정하지 않았습니다.";
							case 3:			return "배경 색상을 지정하지 않았습니다.";
							default:		return "배경은 최대 3가지 색상을 조합할 수 있습니다.";
						}
					}
					return NC.caution(getMsg(len), player, "?uniform");
				}
				//	색상 코드 확인
				let bgList = msg.slice(2).map(c => NC.findColor(c, true));
				if(bgList.includes(null)) return NC.caution("색상 코드가 올바르지 않습니다.", player, "?uniform");
				//	알림
				NC.uniMsg(c_LIST_ICON.NORMAL_BOLD + "유니폼 변경",
				"%d님이 %d의 유니폼을 변경했습니다." + newLine + "%d",
				null, "!uniform", 0, [SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME), GM.findTeamName(team[0]), msg.join(' ')]);
				SYS.log(true, "%d(이)가 %d의 유니폼을 변경함 <%d>", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), GM.findTeamName(team[0]), msg.join(' ')]);
				return PM.updateUniform(team[0], angle, bgList[0], bgList.slice(1));
			case 1:			//	?uniform
				return NC.help("텍스트 색이 FFFFFF이고 배경이 FFCC00 및 AABBCC이며, 각도가 30°인 레드팀 유니폼으로 변경하려면",
				"!uniform red 30 FFFFFF FFCC00 AABBCC", player);
		}
	}
	comAdminList(player, msg, type){			/* 관리자 명단 조회 명령어 */
		switch(type){
			case 0:		//	!admin
				return AMN.showAdminList(player);
			case 1:		//	?admin
				return NC.help("관리자 명단을 조회하려면", "!admin_list", player);
		}
	}

	comAllChat(player, msg, type){				/* 전체 채팅 명령어 */
		switch(type){
			case 0:			//	!a
				return CS.sendAllChat(player, msg.length > 0 ? msg.join(' ') : '');
			case 1:			//	?a
				return NC.help("모든 플레이어에게 \'%d\'라는 말을 공공연히 밝히고 싶으면",
				"!a %d", player, "!chathelp", "나는 경기도 안양에 살고 있다");
		}
	}
	comPrivateChat(player, msg, type){			/* 귓속말 명령어 */
		switch(type){
			case 0:			//	!e
				let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : -1;
				let chatMsg = msg.length > 1 ? msg.slice(1).join(' ') : '';
				if(target == 0){
					let mark = (CS.hasForbiddenWord(chatMsg) ? c_TAG_GRADE[0] : PM.findTagGrade(player));
					CS.sendMsg("외부%d%d→%d: %d", player, [mark, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL), HOSTNAME, chatMsg]);
					SYS.log(false, "%d%d: %d", c_LOG_TYPE.BINDING, [mark, SYS.showPlayerInfo(player), chatMsg]);
					return;
				}
				if(target == -1) return NC.caution("귓속말을 보낼 대상을 지정하세요", player, "?e");
				if(!PM.isValid(target)) return false;
				if(target == player) return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player);
				return CS.sendPrivateChat(target, player, chatMsg);
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

	comAfk(player, msg, type){					/* 장기 무응답 플레이어 설정 */
		switch(type){
			case 0:		//	!afk
				return PM.enableSleepMode(player, !PM.findPlayerById(player)._isSleep);
			case 1:		//	?afk
				if(PM.findPlayerById(player)._isSleep) return NC.help("자리에 돌아와서 게임에 다시 참여하려면", "!afk", player, "!join");
				return NC.help("게임 도중 자리를 비우려면", "!afk", player, "!join spec");
		}
	}
	comAllowJoin(player, msg, type){			/* 팀 이동 금지 및 허용 */
		switch(type){
			case 0:			//	!lock_join
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				let getLockType = function(str){
					let ct = Object.entries({
						[true]	: ["on", "온", "금지", "ㅐㅜ", "dhs", "rmawl"],
						[false]	: ["off", "오프", "허용", "ㅐㄹㄹ", "dhvm", "gjdyd"]
					}).find(([k, v]) => v.includes(str));
					return !(ct == undefined ? AMN.allowJoin : JSON.parse(ct.at(0).toLowerCase()));
				}
				let lockType = getLockType(msg.length > 0 ? msg[0] : null);
				if(lockType == AMN.allowJoin) return NC.caution("팀 자율 이동이 이미 %d되어 있습니다.", player, null, (lockType ? "허용" : "금지"));
				SYS.log(true, "%d(이)가 팀 자율 이동을 %d함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (lockType ? "허용" : "금지")]);
				AMN.allowJoin = lockType;
				break;
			case 1:			//	?lock_join
				return NC.help("팀 자율 이동을 막으려면", "!lock_join on", player);
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
				let ct = Object.entries({
					0 : ["all", 'a', "전체", "wjscp", "미ㅣ"],
					1 : ["team", 't', "팀", "xla", "ㅅㄷ므"]
				}).find(([k, v]) => v.includes(msg.length > 0 ? msg[0] : null));
				if(ct == undefined) return NC.caution("부적절한 값입니다.", player, "?chatmode");
				PM.findPlayerById(player).chatmode = parseInt(ct.at(0));
				break;
			case 1:			//	?chatmode
				return NC.help("상대팀이 못 듣게 같은 팀원에게 '민트초코는 진리야'라고 계속해서 설교하려면",
				"!chatmode team", player);
		}
	}
	comClearBans(player, msg, type){			/* 영구 퇴장 명단 초기화 명령어 */
		switch(type){
			case 0:		//	!clearbans
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				return AMN.clearBans(player);
			case 1:		//	?clearbans
				return NC.help("영구 퇴장 명단을 지우려면", "!clearbans", player, "!unmute #ID");
		}
	}
	comClearPassword(player, msg, type){		/* 비밀번호 해제 */
		switch(type){
			case 0:			//	!clear_pw
				return AMN.hasAdmin(player) ? AMN.clearPassword(player) : NC.acess(player);
			case 1:			//	?clear_pw
				return NC.help("비밀번호를 해제하려면", "!clear_pw", player);
		}
	}
	comClearUniform(player, msg, type){			/* 유니폼 초기화 명령어 */
		switch(type){
			case 0:			//	!clear_uniform
				let getTeam = function(str){
					let team = Object.entries({
						[c_TEAM.RED]	: ["red", 'r', "레드", "레"],
						[c_TEAM.BLUE]	: ["blue", 'b', "블루", "블"]
					}).find(([k, v]) => v.includes(str));
					return team == undefined ? false : team.at(0);
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
	comFreezeChat(player, msg, type){			/* 채팅 얼리기 */
		switch(type){
			case 0:		//	!freeze
				if(!AMN.hasAdmin(player)) return NC.acess(player);
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
				if(!AMN.hasAdmin(player)) return NC.acess(player);							//	권한이 없는 경우
				let target = msg.length > 0 ? GM.checkPublicId(msg[0], player) : null;
				if(!PM.isValid(target)) return CM.comKick(player, msg, 1);					//	대상을 잘못 지목한 경우
				if(!PM.findLocalId(target)) return NC.caution("%d님은 이미 방에서 퇴장했습니다.", player, SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC));
				let reason = msg.length > 1 ? msg.slice(1).join(' ') : null;
				if(PM.findPlayerById(target)._admin > PM.findPlayerById(player)._admin)		//	보조 권한 → 최고 권한 퇴장 불가
					return NC.acess(player, "권한이 낮아 처리할 수 없습니다.");
				let byPlayer = SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC);
				let detail = NC.fmtStr("%d: %d", reason == null || CS.isWhiteSpace(reason) ? ["처리자", byPlayer] : [byPlayer, reason]);
				return AMN.kickPlayer(target, detail);
			case 1:		//	?kick
				return NC.help("공용 ID가 42인 플레이어를 \'%d\'이라는 사유로 퇴장 시키려면", 
				"!kick #42 %d", player, null, "민트초코를 지지함");
		}
	}
	comLockPrivateChat(player, msg, type){		/* 귓속말 채팅 금지 및 허용 */
		switch(type){
			case 0:			//	!lock_private
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				let getLockType = function(str){
					let lp = Object.entries({
						[true]	: ["on", "온", "금지", "ㅐㅜ", "dhs", "rmawl"],
						[false]	: ["off", "오프", "허용", "ㅐㄹㄹ", "dhvm", "gjdyd"]
					}).find(([k, v]) => v.includes(str));
					return (lp == undefined ? !CS.isLockPrvChat : JSON.parse(lp.at(0).toLowerCase()));
				}
				let lockType = getLockType(msg.length > 0 ? msg[0] : null);
				if(lockType == CS.isLockPrvChat) return NC.caution("귓속말 채팅이 이미 %d되어 있습니다.", player, null, [lockType ? "금지" : "허용"]);
				return CS.lockPrivateChat(lockType, player);
			case 1:			//	?lock_private
				return NC.help("귓속말 채팅을 막으려면",
				"!lock_private on", player);
		}
	}
	comMute(player, msg, type){					/* 채팅 금지 */
		switch(type){
			case 0:			//	!mute
				if(!AMN.hasAdmin(player)) return NC.acess(player);			//	권한이 없는 경우
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
				return NC.help("채팅 금지 명단을 조회하려면", "!mute_list", player);
		}
	}
	comPinHost(player, msg, type){				/* 호스트 이동 설정 */
		if(NOPLAYER == true) return;
		switch(type){
			case 0:			//	!lock_host
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				let lockType = !AMN._pinHost;
				AMN.enablePinHost(lockType);
				NC.locked(lockType, "호스트 이동이 %d되었습니다.", player, null, (lockType ? "금지" : "허용"));
				SYS.log(true, "%d(이)가 호스트 팀 이동을 %d함.", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (lockType ? "금지" : "허용")]);
				break;
			case 1:			//	?lock_host
				return NC.help("호스트 이동을 금지하려면", "!lock_host", player);
		}
	}
	comRecaptcha(player, msg, type){			/* reCAPTCHA 설정 */
		switch(type){
			case 0:		//	!recaptcha
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				let lockType = Object.entries({
					[true]	: ["on", "온", "활성화", "ㅐㅜ", "dhs", "ghkftjdghk"],
					[false]	: ["off", "오프", "비활성화", "ㅐㄹㄹ", "dhvm", "qlghkftjdghk"]
				}).find(([k, v]) => v.includes(msg.length > 0 ? msg[0] : null));
				if(lockType == undefined) return CM.comRecaptcha(player, msg, 1);
				return SYS.enableRecaptcha(JSON.parse(lockType.at(0).toLowerCase()), player);
			case 1:		//	?recaptcha
				return NC.help("reCAPTCHA를 활성화 하려면", "!recaptcha on", player);
		}
	}
	comRecording(player, msg, type){			/* 녹화 시작 및 종료 */
		switch(type){
			case 0:			//	!rec
				if(!AMN.hasAdmin(player, 2)) return NC.acess(player);
				return GM.recStats ? GM.stopRecording() : GM.startRecording();
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
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				return AMN.resetGame(player);
			case 1:			//	?rr
				return NC.help("게임을 재시작 하려면", "!rr", player);
		}
	}
	comSetPassword(player, msg, type){			/* 비밀번호 지정 */
		switch(type){
			case 0:		//	!set_pw
				if(!AMN.hasAdmin(player)) return NC.acess(player);
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
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				return AMN.limitScore(msg.length > 0 ? parseInt(msg[0]) : null, player);
			case 1:			//	?score
				return NC.help("경기를 5점 내기로 진행하려면", "!score 5", player); 
		}
	}
	comSetTime(player, msg, type){				/* 시간 변경 */
		switch(type){
			case 0:			//	!time
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				return AMN.limitTime(msg.length > 0 ? parseInt(msg[0]) : null, player);
			case 1:			//	?time
				return NC.help("경기를 5분 내기로 진행하려면", "!time 5", player);
		}
	}
	comShowPassword(player, msg, type){			/* 비밀번호 조회 */
		switch(type){
			case 0:			//	!show_pw
				return AMN.hasAdmin(player) ? AMN.showPassword(player) : NC.acess(player);
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
				if(!AMN.hasAdmin(player)) return NC.acess(player);
				return AMN.swapGame(player);
			case 1:			//	?r
				return NC.help("게임을 시작하거나 종료하려면 ", "!r", player, "!rr");
		}
	}
	comUnfreezeChat(player, msg, type){			/* 채팅 녹이기 */
		switch(type){
			case 0:			//	!unfreeze
				if(!AMN.hasAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
				if(!CS.isFreezeChat) return NC.caution("채팅창이 이미 녹아있습니다.", player, "!unmute #ID");
				return CS.unfreezeChat(player);
			case 1:			//	?unfreeze
				return NC.help("채팅창을 녹이려면", "!unfreeze", player);
		}
	}
	comUnmute(player, msg, type){				/* 채팅 허용 */
		switch(type){
			case 0:			//	!unmute
				if(!AMN.hasAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
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
			["!e #ID(개인)", "!t(팀별)", "!a(전체)", "!chatmode(기본 채팅 모드)", "!mute_list(채팅 금지 명단)"],
			["!freeze/unfreeze(채팅 녹이기/얼리기)", "!mute/unmute #ID(채팅 금지/허용)", "!lock_private(귓속말 채팅 금지/허용)", "!도(반복 채팅 방지 문자)"]
		], player);
	}
	helpCom(player, msg, type){					/* 명령어 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("일반", [
			["!bothelp(시스템)", "!chathelp(채팅)", "!joinhelp(참가)", "!maphelp(맵)", "!rankhelp(랭킹)", "!scorehelp(점수)", "!mischelp(기타)"]
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
				return NC.info("방 주소", GM._gameLink, player, "!about");
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
					list.push(NC.fmtStr("%d[%d] | %d", [(index == target ? '▶' : '▷'), SYS.fillLine(index, Math.floor(Math.log10(size) + 1)), name]));
				}
				let page = size > 1 ? NC.fmtStr(": %d/%d", [target, size]) : '';
				NC.uniMsg(c_LIST_ICON.NORMAL + "맵 목록" + page, list.join(newLine), player, (AMN.hasAdmin(player) == true && customStadiumList.length > 0 ? ("!load " + target) : "?load"));
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
				return NC.info("시스템", [DESCRIPTION, "릴리스 날짜: %d | %d"			//	릴리스 및 업데이트 날짜
				].join(newLine), null, "!link", [SYS._releaseDate, SYS.findInfo()]);	//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
			case 1:				//	?about
				return CM.infoLink(player, msg, 0);
		}
	}
	infoStats(player, msg, type){				/* 점수 정보 */
		switch(type){
			case 0:		//	!stats
				let getTarget = function(s, p){
					if(s == -1) return p;
					let t = GM.checkPublicId((msg.length > 0 ? msg[0] : ''), p, true);
					return t == false || SC.findRankListByPlayer(t) == undefined ? p : t;
				}
				let target = getTarget(msg, player);
				return NC.info("플레이어 전적", [SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC), SC.findRankListByPlayer(target).about
				].join(newLine), player, "!ranking");
			case 1:		//	?stats == !helpscore
				return CM.helpScore(player);
		}
	}

	joinPlayer(player, msg){					/* 플레이어 투입 */
		if(AMN.allowJoin == false && AMN.hasAdmin(player) == false) return NC.acess(player, "팀 자율 이동이 금지돼 있어 사용할 수 없습니다.");
		let team = msg.length > 0 ? msg[0] : (PM.findPlayerById(player)._team == c_TEAM.SPECTATOR || PM.findPlayerById(player)._team == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
		let target = msg.length > 1 ? msg[1] : null;
		let index = target != null && AMN.hasAdmin(player) ? GM.checkPublicId(target, player) : player;
		if(["lock", "team"].includes(team)){
			if(!AMN.hasAdmin(player)) return NC.acess(player);
			return this.comAllowJoin(player, msg, 0);
		}
		let getTargetTeam = function(target, byPlayer){
			let strList = Object.entries({
				[c_TEAM.RED]		: ["red", 'r', "레드", "레"],
				[c_TEAM.BLUE]		: ["blue", 'b', "블루", "블"],
				[c_TEAM.SPECTATOR]	: ["spectator", "spect", "spec", "spct", 's', "스펙", "관전", "관", "스"]
			}).find(([k, v]) => v.includes(target));
			if(strList != undefined) return strList[0];
			if(byPlayer != c_TEAM.SPECTATOR) return (byPlayer == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
			return (PM.cntPlayers(c_TEAM.RED) <= PM.cntPlayers(c_TEAM.BLUE) ? c_TEAM.RED : c_TEAM.BLUE);
		}
		if(!PM.isValid(index)) return NC.help("공용 ID가 42인 플레이어를 블루팀으로 옮기려면", "!join blue #42", player);
		if(AMN.allowJoin == false && PM.isValid(player) == false) return NC.acess(index, "팀 자율 이동이 금지되었습니다.");		//	팀 이동 금지 처리
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
				if(!AMN.hasAdmin(player)) return NC.acess(player);		//	권한이 없는 경우
				return GM.loadMap((SYS.hasInRange(target, 1, size) ? target - 1: 0), player);
			case 1:			//	?load
				if(size < 2) return NC.help("내장 맵을 불러오려면", "!load 1", player);
				if(SYS.hasInRange(target - 1, 0, size)) return NC.uniMsg(null, "[%d] | %d", player, null, 0, [SYS.fillLine(target, Math.floor(Math.log10(size) + 1)), GM.findStadiumNameList(target - 1)]);
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
		this.updateTime(player.id);			//	마지막 활동 시간 저장
		if(this.hasCommonRange(player.id, 0) == true)
			SC.addTouchedList(player.id);
	}
	onPlayerInactivity(player){				/* 플레이어 무응답 이벤트 */
		if(SYS._isDemo)						// 데모 모드 기능 제한
			return SYS.log(false, ["데모 모드에서는 비활동 플레이어 퇴장 기능이 작동되지 않습니다", "대상: %d"
			].join(newLine), c_LOG_TYPE.BINDING, SYS.showPlayerInfo(player));
		AMN.kickPlayer(player, c_LIST_ICON.NEGATIVE + "비활동 플레이어");
	}
	onPlayerTeamChange(player, byPlayer){	/* 팀 교체 이벤트 */
		if(player.id == 0){
			if(AMN._pinHost == true && player.team != 0) room.setPlayerTeam(0, c_TEAM.SPECTATOR);
			return;
		}
		let target = this.findPlayerById(player.id);
		if(target._isSleep == true && player.team != 0){
			target.moveTeam(c_TEAM.SPECTATOR);			//	장기 대기열 플레이어일 경우 관전석으로 이동
			if(PM.isValid(byPlayer)){ 
				PM.updateTime(byPlayer.id);
				if(byPlayer.id == player.id) return NC.notice("게임에 참가하려면 대기 상태를 해제하세요.", byPlayer.id, "!afk");
				return NC.notice("%d님은 자리를 비운 상태입니다.", byPlayer.id, null, target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			}
		}
		SYS.clearListIndex(player.id);
		TM.clearTimerByName("goal", player.id);			//	타이머 제거
		PM.updateTime(player.id);						//	투입 시간 저장
		target._team = player.team;
		SYS.addListIndex(player.id);
		SYS.updateWebGUI();
	}
	
	initPlayerList(player){					/* 플레이어 데이터베이스 초기화 */
		SC.initRankList(player.id);			//	전적 데이터베이스 초기화
		CS.initPlayerList(player.id);		//	채팅 데이터베이스 초기화
		return this._playerList.push(new PlayerSystem(
			player.id,
			player.name,
			player.team,
			player.admin,
			player.conn,
			player.auth
		));
	}

	isAfkPlayer(player, time){					/* 장기 무응답 플레이어 확인 */
		return this.findPlayerById(player).isAfk(time);
	}
	isValid(target, includeHost){				/* 유효 플레이어 확인 */
		if(includeHost == true && target == 0) return true;
		if(this.cntPlayers("public") < 1) return false;
		if(typeof target == "number") return SYS.hasInRange(target, 1, this.cntPlayers("public"));
		if(target == undefined || target == null) return false;
		return SYS.hasInRange(target[(target.hasOwnProperty("_id") ? '_' : '') + "id"], 1, this.cntPlayers("public"));
	}
	hasCommonRange(player, ball, range){		/* 충돌 여부 판정 */
		return PM.findPlayerById(player).hasCommonRange(ball, range);
	}
	findDiscProp(target){		return this.findPlayerById(target).discProp; }			/* 플레이어 객체 구하기 */
	findLocalId(publicId){																/* 플레이어 개인 ID 구하기 */
		if(!PM.isValid(publicId)) return false;
		return this.findPlayerById(publicId).localId;
	}
	findPlayerList(isPublic){															/* 플레이어 데이터베이스 명단 구하기 */
		if(isPublic == true) return this._playerList;
		return this._playerList.filter(p => p.localId > 0);
	}
	findPlayerListByTeam(team){															/* 플레이어 데이터베이스 개별 팀 명단 구하기 */
		if(!Object.values(c_TEAM).hasOwnProperty(team)) return this._playerList;
		return this._playerList.filter(p => p._team == team);
	}
	findPlayerById(target){		return this._playerList.find(p => p._id == target); }	/* 플레이어 데이터베이스 구하기 */
	findTagGrade(player){																/* 플레이어 권한 마크 구하기 */
		if(!this.isValid(player)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		switch(this.findPlayerById(player)._admin){
			case 1:		return c_TAG_GRADE[2];											//	보조 권한
			case 2:		return c_TAG_GRADE[1];											//	최고 권한
			default:	return c_TAG_GRADE[(AMN.isBlacklist(player, false) ? 4 : 3)];	//	블랙리스트에 해당되면 4, 아닐 경우 3을 반환
		}
	}
	findTagTeam(team){			return c_TAG_TEAM[team]; }								/* 팀 마크 구하기 */
	
	addSleepPlayer(player){		/* 장기 대기열 플레이어 추가 */
		this.findPlayerById(player).addSleepList();
	}
	
	updateAccount(player){								/* 중복 계정 갱신 */
		let newPlayer = this.findPlayerById(player);
		let oldPlayer = this.findPlayerList(true).findLast(p => p._id != newPlayer._id && p._network == newPlayer._network);
		if(!PM.isValid(oldPlayer)) return false;		//	중복 계정 없음(최초 입장)
		for(const [k, v] of Object.entries(oldPlayer)){
			if(!["id", "name", "team", "admin", "time", "network", "address",
				"isSleep", "detector"
			].includes(k.replace('_', ''))) newPlayer[k] = v;
		}
		switch(oldPlayer._admin){
			case 2:
				if(room.getPlayerList().filter(p => p.id > 0 && p.admin == true).length < 1){
					room.setPlayerAdmin(newPlayer._id, true);	//	최고 권한을 가진 접속자가 이미 있는 경우, 보조 권한 부여
					break;
				}
			case 1:
				break;
		}
		SC.updateAccount(oldPlayer._id, newPlayer._id);	//	전적 데이터베이스 갱신
		return true;
	}
	updateTime(player){									/* 응답 시간 갱신 */
		if(this.isValid(player) == false || this.findLocalId(player) == false) return;
		let target = this.findPlayerById(player);
		target._time = TM.time;
		for(let ot of ["afkTimer", "afkAvatar", "afkCheck"]){	//	이전 타이머 지우고 새로 갱신
			TM.clearTimerByName(ot, player);
		}
		if(GM.afkTime == false) return;
		//	장기 무응답 플레이어 판정
		let afkChckTimer = TM.addTimer("afkCheck", () => {
			let target = PM.findPlayerById(afkChckTimer._player);
			if(!target.isAfk()) return;
			for(let p of PM.findPlayerList()){					//	경고 메시지 출력
				if(p._id == target._id)
					return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 알림",
					"반응이 없으면 퇴장될 수 있습니다",
					p._id, (p._team == c_TEAM.SPECTATOR ? "!afk" : "!join spec"), c_LIST_COLOR.SILVER);
				if(p._admin < 2 || p._admin < target._admin) return;
				if(p._team == c_TEAM.SPECTATOR || p._team == target._team)
					return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 안내",
					"%d님의 반응이 없는 경우, 자동으로 퇴장됩니다",
					p._id, NC.fmtStr("!join spec #%d", target._id), c_LIST_COLOR.SILVER, null, 0, target.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			};
			let avatarTimer = TM.addTimer("afkAvatar", {		//	등번호 알림
				EXECUTE : () => {
					let tmList = avatarTimer.findTimerByName();
					if(!tmList.length) return;
					let target = tmList.at(-1);
					if(avatarTimer.calcCurrentSequence(target._sequence, 2) == 0)
						PM.giveAvatar(avatarTimer._player, "잠수");
					else
						PM.resetAvatar(avatarTimer._player);
				},
				TERMINATE : () => {
					PM.resetAvatar(avatarTimer._player);
				}
			}, afkChckTimer._player, SEC_TO_MS, true);
		}, player, GM.afkTime * SEC_TO_MS);
		let afkTimer = TM.addTimer("afkTimer", () => {			//	퇴장 처리
			if(PM.isAfkPlayer(afkTimer._player, afkTimer._delay))
				PM.onPlayerInactivity(afkTimer._player);
		}, afkChckTimer._player, GM.afkTime * 1.5 * SEC_TO_MS);
	}
	updateUniform(team, angle, textColor, bgColor){		/* 팀 유니폼 지정 */
		room.setTeamColors(team, angle, textColor, bgColor);
	}
	
	clearPlayerById(player){			/* 플레이어 데이터베이스 지우기 */
		this.findPlayerById(player).clearPlayer();
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
		NC.info("채팅 금지 명단", getMsg(isPublic), player, null);
	}
	showSleepList(player, isPublic){	/* 장기 대기열 명단 출력 */
		let getAfks = function(pub){
			return PM.findPlayerList().filter(p => {
				return p._isSleep == false ? false : pub == true ? true : (p.localId > 0);
			});
		}
		let afkList = getAfks(isPublic);
		let msg = afkList.length > 0 ? afkList.map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ") : "비어 있음";
		NC.info("장기 대기열 명단", msg, player, null);
	}
	
	cntPlayers(team){						/* 접속자 인원 구하기 */
		let pl = room.getPlayerList().filter(p => p.id != 0);
		if(Object.values(c_TEAM).hasOwnProperty(team))
			return pl.filter(p => p.team == team).length;					//	팀별 접속자
		return (team == "public" ? this._playerList : pl).length;			//	모든 접속자
	}
	enableSleepMode(player, bool){			/* 장기 대기열 플레이어 설정 */
		bool ? this.addSleepPlayer(player) : this.deleteSleepPlayer(player);
		SYS.updateListIndex(player);		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
		if(AMN.hasAdmin(player, 2) == false && AMN.cntAdmins(2) > 1) return;
		AMN.updateAdmins();
	}
	giveAvatar(player, msg){				/* 등번호 설정 */
		this.findPlayerById(player).giveAvatar(msg);
	}
	moveTeam(player, team){		return PM.findPlayerById(player).moveTeam(team); }		/* 팀 지정 */
}
/*** 플레이어 시스템 클래스 ***/
class PlayerSystem{
	constructor(id, name, team, admin, conn, auth){
		Object.freeze(this._id		= id);
		Object.freeze(this._name	= name);
		Object.freeze(this._address	= conn);
		Object.freeze(this._network	= auth);
		this._team			= team;
		this._admin			= admin == true ? 2 : 0;
		this._time			= TM.time;
		this._chatmode		= 0;
		this._detector		= 0;
		this._uniqueAvatar	= null;
		this._isMute		= false;
		this._isSleep		= false;
		this._hasKicked		= false;
	}
	get chatmode(){			return this._chatmode; }													/* 기본 채팅 모드 */
	get discProp(){			return room.getPlayerDiscProperties(this._id); }							/* 플레이어 객체 속성 */
	get dpPosition(){		return ({'x' : this.discProp.x, 'y' : this.discProp.y}); }					/* 좌표 */
	get dpGravityVector(){	return ({'x' : this.discProp.xgravity, 'y' : this.discProp.ygravity}); }	/* 중력 벡터 */
	get dpSpeedVector(){	return ({'x' : this.discProp.xspeed, 'y' : this.discProp.yspeed}); }		/* 속도 벡터 */
	get localId(){																						/* 개인 ID */
		let pl = room.getPlayerList().filter(p => p.id != 0);
		return pl.indexOf(pl.find(p => p.id == this._id)) + 1;
	}
	get unqAvtr(){			return this._uniqueAvatar; }												/* 개인 등번호 */
	
	set chatmode(value){	/* 채팅 모드 설정 */
		let titleList = ["전체", "팀"];
		if(this.chatmode == value) return NC.caution("이미 채팅 기본 모드가 %d 채팅으로 설정돼 있습니다", this._id, "?chatmode", titleList[value]);
		this._chatmode = value;
		NC.notice("채팅 기본 모드가 " + titleList[value] + " 채팅으로 변경되었습니다.", this._id);
	}
	set discProp(value){	/* 플레이어 객체 속성 */
		room.setPlayerDiscProperties(this._id, value);
	}
	set unqAvtr(value){		/* 개인 등번호 설정 */
		this._uniqueAvatar = (value == null || value == undefined ? null : value.toString());
		this.resetAvatar();
	}
	
	isAfk(time){						/* 비활동 플레이어 감지 */
		let limit = SYS.hasInRange(time, 5, 60 * 60 * 3) ? time : GM.afkTime;
		if(!SYS.hasInRange(limit, 5, 60 * 60 * 3)) return false;					//	범위 내 값이면 판정 생략
		if(!this.localId) return false;												//	미접속자인 경우
		return ([
			GM.gameStats == c_GAME_STATS.TICK && this._team == c_TEAM.SPECTATOR,	//	경기 도중 관전이면 처리 중단
			GM.gameStats != c_GAME_STATS.TICK && this._admin < 1,					//	경기 미진행 상태에서 관리자가 아닌 경우 처리 중단
			this._isSleep == true,													//	장기 대기열 명단에 포함되면 처리 중단
			TM.time - this._time < limit * SEC_TO_MS
		].findIndex(stmnt => stmnt == true) == -1);
	}
	hasCommonRange(ball, range){		/* 충돌 여부 판정 */
		let d = SC.findDiscProp(ball);							//	디스크 속성
		let t = this.discProp;									//	플레이어 속성
		if(d == null || t == null) return -1;					//	객체를 구할 수 없는 경우
		let r = range >= 1 ? range : SC.collRange;				//	판정 범위
		//	공(D)과 플레이어(T) 사이의 충돌 판정 == (Dx-Tx)^2+(Dy-Ty)^2 <= (Dr+Tr)^2
		return (SC.calcDistance(d, t) <= Math.pow(Math.round((d.radius + t.radius) * r), 2));
	}
	
	addSleepList(){			/* 장기 대기열 명단 추가 */
		this._isSleep = true;
		if(this._team != c_TEAM.SPECTATOR) this.moveTeam(c_TEAM.SPECTATOR);
		AMN.deleteAdmin(this._id);	//	최고 권한 → 보조 권한으로 격하
		AMN.updateAdmins();
		NC.notice("%d님이 자리를 비웠습니다.", this._id * -1, null, this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
		NC.uniMsg(c_LIST_ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", this._id, "!afk");
		SYS.log(true, "대기열 추가: %d", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
	}

	clearPlayer(){			/* 플레이어 데이터베이스 지우기 */
		SYS.clearListIndex(this._id);				//	리스트 지우기
		SC.clearTouchedListByPlayer(this._id);		//	선두자 데이터베이스 지우기
		TM.clearTimerByPlayer(this._id);			//	타이머 지우기
		this._team			= c_TEAM.SPECTATOR;
		this._time			= TM.time;
		this._chatmode		= 0;
		this._isSleep		= false;
		if(this._hasKicked){
			this._admin		= 0;
			this._hasKicked	= false;
		}
		PM.findPlayerList().forEach(p => SYS.updateListIndex(p._id));
	}
	deleteAdmin(isSub){		/* 권한 해제 */
		let pa = this._admin;
		room.setPlayerAdmin(this._id, false);
		if(isSub == true || pa == 1){
			this._admin = 0;
			SYS.updateListIndex(this._id);
			NC.notice("%d님에게 %d이 해제되었습니다.", null, null, [this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME), pa == 1 ? "보조 권한" : "최고 권한"]);
			SYS.log(true, "%d에게 %d이 삭제됨.", c_LOG_TYPE.NOTICE, [this.showPlayerInfo(), pa == 1 ? "보조 권한" : "최고 권한"]);
		}
	}
	deleteSleepPlayer(){	/* 장기 대기열 명단 제거 */
		this._isSleep = false;
		SYS.log(true, "대기열 제거: %d", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
		AMN.updateAdmins();
		NC.notice("게임에 바로 참여할 준비가 되었습니다! ", this._id, "!join");
	}
	resetAvatar(){			/* 등번호 초기화 */
		this.giveAvatar(this.unqAvtr);
	}
	
	showPlayerInfo(type){	/* 플레이어 정보 출력 */
		let name = (CS.isWhiteSpace(this._name) ? "공백" : this._name);
		let ml = {
			[c_PLAYERINFO_TYPE.LOCAL]	: NC.fmtStr("(%d)%d", [(PM.cntPlayers() >= 10 ? SYS.fillLine(this.localId, 2) : this.localId), name]),
			[c_PLAYERINFO_TYPE.PUBLIC]	: NC.fmtStr("(#%d)%d", [this._id, name]),
			[c_PLAYERINFO_TYPE.NAME]	: name
		}
		if(ml.hasOwnProperty(type)) return ml[type];
		return NC.fmtStr("%d(#%d)%d", [(PM.cntPlayers() >= 10 ? SYS.fillLine(this.localId, 2) : this.localId), this._id, name]);
	}
	
	adjustGravityVector(x, y){	/* 플레이어 중력 벡터 변경 */
		this.discProp = {"xgravity" : x, "ygravity" : y };
	}
	adjustSpeedVector(x, y){	/* 플레이어 속도 벡터 변경 */
		this.discProp = {"xspeed" : x, "yspeed" : y };
	}
	giveAdmin(isSub){			/* 권한 부여 */
		let grade = AMN.isBlacklist(this._id, false) == true || isSub == true ? 1 : 2;
		if(grade == this._admin) return;									//	이미 권한이 있는 경우(중복 부여)
		if(AMN.cntAdmins(grade) >= AMN.maxAdmin * (grade == 2 ? 1 : 2))		//	최대 인원을 초과한 경우(부여 제한)
			return;
		this._admin = grade;												//	블랙리스트에 포함되는 경우, 항상 보조 권한으로 부여
		room.setPlayerAdmin(this._id, grade == 2);
		if(grade == 1){
			NC.notice("%d님에게 보조 권한이 부여되었습니다.", null, null, this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
			SYS.log(true, "%d에게 보조 권한이 부여됨.", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
		}
		SYS.updateListIndex(this._id);			//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
	}
	giveAvatar(str){			/* 등번호 지정 */
		room.setPlayerAvatar(this._id, str == null || str == undefined ? null : str.toString());
	}
	movePosition(dx, dy){		/* 플레이어 좌표 이동(상대 좌표) */
		this.discProp = {'x' : this.dpPosition.x + dx, 'y' : this.dpPosition.y + dy};
	}
	moveTeam(t){				/* 플레이어 팀 이동 */
	if(!Object.values(c_TEAM).hasOwnProperty(t)) return SYS.sendError(c_ERROR_TYPE.E_ETC);
		room.setPlayerTeam(this._id, t);
	}
	teleportPosition(tx, ty){	/* 플레이어 좌표 변경(절대 좌표) */
		this.discProp = {'x' : tx, 'y' : ty};
	}
}
/*** 점수 클래스 ***/
class ScoreManager{
	constructor(collisionSensitivity){
		this._collisionRange	= collisionSensitivity;		/* 충돌 범위 민감도 */
		this._totalGoals		= {							/* 팀 누적 골 */
			[c_TEAM.RED] : 0,
			[c_TEAM.BLUE] : 0
		};
		this._touchedList		= new Array();				/* 선두자 데이터베이스 */
		this._rankList			= new Array();				/* 전적 데이터베이스 */
	}
	onPlayerTeamChange(player, byPlayer){	/* 팀 교체 이벤트 */
		let target = this._touchedList.filter(t => t._id == player.id);
		if(target.length > 0) this.clearTouchedListByPlayer(player.id);
	}
	onPositionsReset(){						/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */
		this.clearTouchedList();			//	선두자 명단 모두 지우기
	}

	initRankList(player){			/* 전적 명단 초기화 */
		return this._rankList.push(new StatusSystem(player));
	}
	initTouchedList(player){		/* 선두자 전적 데이터베이스 초기화 */
		return this._touchedList.unshift(new TouchedPlayer(player));
	}

	get collRange(){		return this._collisionRange; }						/* 충돌 범위 민감도 */
	get gameTime(){			return this.scores.time; }							/* 경기 시간 */
	get lastTouchedPlayer(){													/* 최근 선두자 */
		return this._touchedList.length == 0 ? null : this._touchedList[0];
	}
	get limitScore(){		return !this.scores ? 0 : this.scores.scoreLimit; }	/* 경기 제한 점수 */
	get limitTime(){		return !this.scores ? 0 : this.scores.timeLimit; }	/* 경기 제한 시간 */
	get scores(){			return room.getScores(); }							/* 점수 데이터베이스 */
	get totalRedGoals(){	return this._totalGoals[c_TEAM.RED]; }				/* 레드팀 누적 골 */
	get totalBlueGoals(){	return this._totalGoals[c_TEAM.BLUE]; }				/* 블루팀 누적 골 */

	set collRange(v){			/* 충돌 범위 민감도 */
		if(v == this.collRange) return SYS.log(false, "중복된 값으로 접근됨", c_LOG_TYPE.WARNING);
		if(!SYS.hasInRange(v, 1, 16)) return SYS.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		SYS.log(true, "충돌 범위 민감도가 %d에서 %d(으)로 변경됨", c_LOG_TYPE.NOTICE, [this.collRange, v]);
		this._collisionRange = v;
	}
	set totalRedGoals(v){		/* 레드팀 누적 골 */
		this._totalGoals[c_TEAM.RED] = v;
	}
	set totalBlueGoals(v){		/* 블루팀 누적 골 */
		this._totalGoals[c_TEAM.BLUE] = v;
	}

	hasCommonRange(da, db, range){		/* 충돌 여부 판정 */
		if(da == null || db == null) return -1;					//	객체를 구할 수 없는 경우
		let r = range >= 1 ? range : this.collRange;			//	판정 범위
		return (this.calcDistance(da, db) <= Math.pow(Math.round((da.radius + db.radius) * r), 2));
	}

	findAssist(target){																							/* 득점자 인식률 조정 및 어시스트 구하기 */
		let tl = this._touchedList.slice(0, this._touchedList.length > 5 ? 5 : this._touchedList.length);
		if(tl.length < 2) return false;							//	선두자 명단이 한 명이면 어시스트를 계산하지 않음
		if(!PM.isValid(target._id)) return SYS.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		if(PM.cntPlayers(target._team) < 2) return false;		//	팀원이 2명 이상이면 처리
		return tl.find(tp => target._team == tp._team && tp._id != target._id);
	}
	findDiscProp(target){				return room.getDiscProperties(target); }								/* 디스크 객체 구하기 */
	findDiscColor(target){				/* 디스크 색상 16진수로 변환 */
		let dp = this.findDiscProp(target);
		if(dp == null) return -1;
		return dp.color.toString(16);
	}
	findRankListByPlayer(target){		return this._rankList.find(r => r._id == target); }						/* 전적 명단 플레이어로 찾기 */
	findRankListByGrade(grade){			return this._rankList.sort((a, b) => b.scores - a.scores).at(grade); }	/* 전적 명단 순위로 찾기 */
	findTouchedListByPlayer(target){	return this._touchedList.find(p => p._id == target); }					/* 선두자 명단 플레이어로 찾기 */
	findWinner(scores){																							/* 승리 팀 판정 */
		if(scores.red > scores.blue) return c_TEAM.RED; 	//	레드팀 승
		if(scores.red < scores.blue) return c_TEAM.BLUE; 	//	블루팀 승
		return 3;											//	무승부
	}

	addTouchedList(player){					/* 선두자 명단 추가 */
		let hasNull = (this._touchedList.length == 0);
		let oldLtPlayer = this.lastTouchedPlayer;
		if(oldLtPlayer != null)
			this.clearTouchedListByPlayer(oldLtPlayer._id);
		this.initTouchedList(player);		//	0번째 요소로 초기화
		SYS.updateListIndex(player);
		if(hasNull){
			let ltTimer = TM.addTimer("lastTouchedPlayer", () => {
				let nowLtPlayer = this.lastTouchedPlayer;
				if(nowLtPlayer == null) return;
				switch(nowLtPlayer._id){
					case player:
						if(nowLtPlayer.hasCommonRange(0)){	//	계속 선두하고 있으면
							ltTimer.clearTimer();			//	타이머 종료
							break;
						}
					default:
						this.clearTouchedListByPlayer(player);
				}
			}, player, 5 * SEC_TO_MS);
			if(this._touchedList.length > 1)	//	데이터베이스 갱신
				SYS.updateListIndex(this._touchedList[1]._id);
		}
		return !hasNull;
	}

	updateAccount(op, np){			/* 계정 전적 동기화 */
		let oldPlayer = this.findRankListByPlayer(op);
		let newPlayer = this.findRankListByPlayer(np);
		for(const [k, v] of Object.entries(oldPlayer)){
			if(k.replace('_', '') != "id") newPlayer[k] = v;
		}
		this._rankList.splice(this._rankList.indexOf(oldPlayer), 1);
	}
	updateGoals(team){				/* 득점 골 갱신 */
		if(GM.gameStats == c_GAME_STATS.STOP) return;
		switch(team){
			case c_TEAM.RED:	this.totalRedGoals++;	break;
			case c_TEAM.BLUE:	this.totalBlueGoals++;	break;
		}
	}
	updateTouchedList(target){		/* 선두자 갱신 */
		if(this.hasCommonRange(this.findDiscProp(0), PM.findDiscProp(target))){
			if(this._touchedList[0] != null && this._touchedList[0]._id == target) return;
			this.addTouchedList(target);
		}
	}
			
	clearRankListByPlayer(player){		return this.findRankListByPlayer(player).clearPlayer(); }		/* 전적 명단 지우기 */
	clearTouchedList(){																					/* 선두자 명단 지우기 */
		this._touchedList.forEach(t => this.clearTouchedListByPlayer(t._id));
	}
	clearTouchedListByPlayer(player){																	/* 선두자 명단 지우기 */
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
		NC.info("플레이어 순위", tp.records.join(newLine), player, NC.fmtStr("!stats #%d", tp._id));
	}

	calcDistance(a, b){			return (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2)); }					/* 두 객체 간 거리 구하기 */
	calcGoalsByTeam(team){		return !this.scores ? null : team == c_TEAM.RED ? this.scores.red : this.scores.blue; }				/* 경기 득점 골 구하기 */
	calcGravityVector(target){	return ({'x' : this.findDiscProp(target).xgravity, 'y' : this.findDiscProp(target).ygravity}); }	/* 중력 벡터 구하기 */
	calcPosition(target){		return ({'x' : this.findDiscProp(target).x, 'y' : this.findDiscProp(target).y}); }					/* 좌표 구하기 */
	calcSpeedVector(target){	return ({'x' : this.findDiscProp(target).xspeed, 'y' : this.findDiscProp(target).yspeed }); }		/* 속도 벡터 구하기 */
	calcTotalGoalsByTeam(team){	return this._totalGoals[team]; }																	/* 득점 누적 골 구하기 */
}
/*** 전적 매니저 클래스 ***/
class StatusSystem{
	constructor(id){
		Object.freeze(this._id	= id);
		this._win		= 0;			/* 승리한 경기 수 */
		this._lost		= 0;			/* 패배한 경기 수 */
		this._goal		= 0;			/* 득점한 골 수 */
		this._ownGoal	= 0;			/* 실점한 골 수 */
		this._assist	= 0;			/* 도움 횟수 */
	}
	get asst(){		return this._assist; }		/* 도움 횟수 */
	get goal(){		return this._goal; }		/* 득점한 골 수 */
	get grade(){								/* 플레이어 순위 */
		return SC._rankList.indexOf(SC._rankList.find(rl => rl._id == this._id));
	}
	get lost(){		return this._lost; }		/* 패배한 경기 수 */
	get owgl(){		return this._ownGoal; }		/* 실점한 골 수 */
	get scores(){								/* 플레이어 점수 계산 */
		return (this.win	* c_SCORE_TYPE.WIN		//	승리(득3점)
		+ this.goal			* c_SCORE_TYPE.GOAL		//	득점(득5점)
		+ this.asst			* c_SCORE_TYPE.ASSIST	//	도움(득2점)
		+ this.lost			* c_SCORE_TYPE.LOST		//	패배(실3점)
		+ this.owgl 		* c_SCORE_TYPE.OWNGOAL	//	실점(실5점)
		);
	}
	get status(){								/* 기록 정보 */
		return NC.fmtStr("%d등(%d점): %d", [this.grade + 1, this.scores, SYS.showPlayerInfo(this._id, c_PLAYERINFO_TYPE.PUBLIC)]);
	}
	get about(){								/* 상세 기록 정보 */
		let result = [
			[NC.fmtStr("점수: %d점(%d등)", [this.scores, this.grade + 1])],
			[NC.fmtStr("경기: %d판 %d승 %d패(%d%)", [this.win + this.lost, this.win, this.lost, this.winPct])],
			[NC.fmtStr("기록: %d도움 %d골", [this.asst, this.goal + this.owgl])]
		];
		if(this.owgl > 0) result.push([NC.fmtStr("(자책: %d골)", this.owgl)]);
		return result.join(newLine);
	}
	get records(){								/* 순위 정보 */
		SC._rankList.sort((a, b) => b.scores - a.scores);		//	점수 내림차순으로 정렬
		let len = SC._rankList.length;
		let searchIndex = this.grade;
		let startIndex = SYS.hasInRange(searchIndex, 2, len - 1) ? (len - searchIndex > 2 ? (searchIndex - 2) : (len - 4)) : 0;
		let endIndex = SYS.hasInRange(searchIndex, 0, len - 3) ? startIndex + 4 : len - 1;
		return SC._rankList.slice(startIndex, endIndex + 1).map(r => NC.fmtStr("%d%d", [(r._id == this._id ? '▶' : '▷'), r.status]));
	}
	get win(){		return this._win; }			/* 승리한 경기 수 */
	get winPct(){								/* 승률 */
		let cntWin = this.win;			//	승전
		let cntLost = this.lost;		//	패전
		let sum = cntWin + cntLost;		//	누적 경기
		return (sum > 0 ? cntWin / sum * 100 : 0).toFixed(2);	//	소수점 둘째 자리까지 반올림
	}
	
	set asst(v){		/* 도움 횟수 */
		this._assist = v;
	}
	set goal(v){		/* 득점한 골 수 */
		this._goal = v;
	}
	set lost(v){		/* 패배한 경기 수 */
		this._lost = v;
	}
	set owgl(v){		/* 실점한 골 수 */
		this._ownGoal = v;
	}
	set win(v){			/* 승리한 경기 수 */
		this._win = v;
	}
	
	clearPlayer(){		/* 플레이어 데이터베이스 지우기 */
		this.win		= 0;
		this.lost		= 0;
		this.goal		= 0;
		this.owgl		= 0;
		this.asst		= 0;
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
	hasCommonRange(ball, range){		/* 충돌 여부 판정 */
		return PM.findPlayerById(this._id).hasCommonRange(ball, range);
	}
}
/*** 시간 매니저 클래스 ***/
class TimeManager{
	constructor(timeFormats){
		this._timeFormats	= timeFormats;			/* 시간 출력 형식 */
		this._timerList		= new Array();			/* 타이머 목록 */
	}
	get fullDate(){	return new Date(); }					/* 날짜 */
	get time(){		return this.fullDate.getTime(); }		/* 시간 */
	get year(){		return this.fullDate.getFullYear(); }	/* 연도 */
	get month(){	return this.fullDate.getMonth() + 1; }	/* 월 */
	get day(){		return this.fullDate.getDate(); }		/* 일 */
	get hours(){	return this.fullDate.getHours(); }		/* 시 */
	get minutes(){	return this.fullDate.getMinutes(); }	/* 분 */
	get secs(){		return this.fullDate.getSeconds(); }	/* 초 */
	get meridiem(){	return this.hours >= 12 ? 2 : 1; }		/* 오후 및 오전 */
	get fmtTime(){	return this._timeFormats; }				/* 시간 출력 형식 */

	set fmtTime(index){		/* 시간 출력 형식 */
		if(!Object.values(c_TIME_TYPE).hasOwnProperty(index)) return SYS.sendError(c_ERROR_TYPE.E_ETC);
		this._timeFormats = index;
	}

	findTimer(findId){				return this._timerList.find(tm => tm._id == findId); }			/* 타이머 ID로 찾기 */
	findTimerByName(name, player){																	/* 타이머 이름으로 찾기 */
		return (PM.isValid(player) ? this.findTimerByPlayer(player) : this._timerList).filter(tm => tm._name == name);
	}
	findTimerByPlayer(target){		return this._timerList.filter(tm => tm._player == target); }	/* 타이머 플레이어로 찾기 */
	findTimers(target, hasTarget){																	/* 타이머 목록 구하기 */
		let isEquals = (a, b) => a.toString() === b.toString();
		let getEqualTimers = function(tt){
			return this._timerList.filter(tm => {
				if(tm.length > 0 && isEquals(tt._exctFn, tm._exctFn) == false)
					return false;
				return hasTarget == true ? true : tm._id != tt._id;
			});
		}				
		let timers = getEqualTimers(target);
		if(target._isRepeat){			//	반복 타이머 포함
			let rpTm = this.findTimer(NC.fmtStr("%dr", target._id));
			if(rpTm) timers.concat(getEqualTimers(rpTm));
		}
		return timers;
	}

	addTimer(name, func, player, delay, isRepeat, runDirectly, seq){		/* 타이머 추가 */
		if(name == undefined || name == null) return SYS.log("타이머는 고유의 이름을 가져야 합니다.", c_LOG_TYPE.ERROR);
		let getStartOrder = function(str){
			if(seq > 0) return seq;
			let targets = TM.findTimerByName(str, player);
			return SYS.hasInRange(targets.length, 0, 2) ? 0 : targets.at(-1)._sequence + 1;
		}
		let startId = NC.fmtStr("%d-%d", [this.time, this._timerList.filter(t => t._id.split('-')[0] == this.time).length]);
		let repeatId = NC.fmtStr("%dr", startId);
		let getFnByName = str => Object.entries(func).find(([key]) => key.toUpperCase() == str);
		let fl = ["EXECUTE", "TERMINATE"].map(str => getFnByName(str));
		let executeFn = fl[0] ? fl[0][1] : func;
		let terminateFn = (fl[1] ? fl[1][1] : null);
		let initTimer = (name, id, exct, trmn, delay, preId, target, seq) => this._timerList.push(new TimerSystem(name, id, exct, trmn, delay, preId, target, seq));
		initTimer(name, startId, executeFn, terminateFn, (runDirectly == true && isRepeat == true ? 0 : delay), (isRepeat ? startId : null), player, getStartOrder(name));
		if(isRepeat == true){
			if(!delay || delay < 100)
				return SYS.log(false, "너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다", c_LOG_TYPE.WARNING);
			if(SYS.hasInRange(delay, SEC_TO_MS / 10, SEC_TO_MS - 1) == true && ((getStartOrder(name) - 1) / 2) * delay > 60 * SEC_TO_MS)
				SYS.log(false, ["너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다",
				"타이머 ID: %d", "타이머 이름: %d", "타이머 간격: %dms"].join(newLine), c_LOG_TYPE.WARNING, [startId, name, delay.toFixed(4)]);
			initTimer(name, repeatId, (() => {
				this.addTimer(name, func, player, delay, true, false, getStartOrder(name) + 2);
				if(this.findTimer(startId) == undefined) return;
				if(this.findTimer(repeatId) == undefined) return;
			}), terminateFn, (runDirectly == true ? 0 : delay), startId, player, getStartOrder(name) + 1);
		}
		this._timerList.filter(t => {							//	이미 처리한 타이머 지우기
			let marginTime = t._delay / 10 + SEC_TO_MS;			//	오차범위
			if(SYS.hasInRange(this.time - t._time, 0, (t._isRepeat ? 2 : 1) * t._delay + marginTime)) return false;
			if(t._id == startId) return false;
			return true;
		}).forEach(t => t.clearTimer(true));
		if(delay >= 100) return this.findTimer(startId);		//	타이머 ID로 반환
		return false;
	}

	clearTimer(findId, skipTrmnFn){                                                             /* 타이머 지우기(ID) */
		let tm = this.findTimer(findId);
		if(tm == undefined) return;
        tm.clearTimer(skipTrmnFn);
    }
	clearTimerByName(name, player){																/* 타이머 지우기(이름) */
		this.findTimerByName(name, player).forEach(tm => tm.clearTimer());
	}
	clearTimerByPlayer(player){																	/* 타이머 지우기(플레이어) */
		this.findTimerByPlayer(player).forEach(tm => tm.clearTimer());
	}
	resetTimers(){																				/* 타이머 초기화 */
		this._timerList.forEach(tm => tm.clearTimer());
	}

	showCurrentTime(type){		/* 시간 출력 */
		let timeList = {
			[c_TIME_TYPE.CORE]		: this.showNormalTime(),
			[c_TIME_TYPE.NORMAL]	: this.showTime(),
			[c_TIME_TYPE.FULL]		: NC.fmtStr("%d| %d", [this.showDate().split('-').slice(1).join('-'), this.showTime()])
		};
		return timeList.hasOwnProperty(type) ? timeList[type] : this.showCurrentTime(this.fmtTime);
	}
	showDate(){ 				/* 날짜 및 시간 출력 */
		return [this.year, SYS.fillLine(this.month, 2), SYS.fillLine(this.day, 2)].join('-');
	}
	showNormalTime(){			/* 시간 간단 출력 */
		let hourStr = this.hours - (this.meridiem == 2 ? 12 : 0);	//	0시 → 12시로 교정
		return NC.fmtStr("%d:%d %d", [(hourStr == 0 ? 12 : hourStr), SYS.fillLine(this.minutes, 2), (this.meridiem == 2 ? "PM" : this.meridiem == 1 ? "AM" : '')]);
	}
	showTime(){ 				/* 시간 상세 출력 */
		return [this.hours, this.minutes, this.secs].map(t => SYS.fillLine(t, 2)).join(':');
	}
}
/*** 타이머 시스템 클래스 ***/
class TimerSystem{
	constructor(name, id, exct, trmn, delay, preId, target, seq){		/* 타이머 지정 */
		let isRepeat = (preId ? true : false);
		let dt = isNaN(Number(delay)) ? 0 : Number(delay);
		let proc = setTimeout(() => {
			exct();
			if(isRepeat == false) TM.clearTimer(id);
		}, dt);
		
		this._id		= Object.freeze(id);					/* 타이머 ID */
		this._name		= Object.freeze(name);					/* 타이머 이름 */
		this._player	= Object.freeze(target);				/* 플레이어 ID */
		this._time		= Object.freeze(TM.time);				/* 등록 시간 */
		this._delay		= Object.freeze(dt);					/* 지연 시간 */
		this._exctFn	= Object.freeze(exct);					/* 실행 함수 */
		this._trmnFn	= Object.freeze(trmn);					/* 종료 함수 */
		this._proc		= Object.freeze(proc);					/* 타이머 함수 */
		this._sequence	= Object.freeze(seq);					/* 진행 순서 */
		this._isRepeat	= Object.freeze(isRepeat);				/* 반복 여부 */
		
		let overloaded = TM.findTimerByName(name, target).filter(t => t._isRepeat == false);
		if(overloaded.length > 0) overloaded.forEach(t => !t._id.includes('r'));
	}
	findTimerByName(){		return TM.findTimerByName(this._name, this._player); }	/* 타이머 이름으로 찾기 */
	findTimerByPlayer(){	return TM.findTimerByPlayer(this._player); }			/* 타이머 플레이어로 찾기 */

	clearTimer(skipTrmnFn){															/* 타이머 ID로 지우기 */
		if(this._delay > 0) clearTimeout(this._proc);
		if(this._trmnFn != null && skipTrmnFn != true) this._trmnFn();	//	종료 함수 실행
		let tml = TM._timerList;
		tml.splice(tml.findIndex(tm => tm._id == this._id), 1);			//	타이머 목록에서 제거
	}
	clearTimerByName(){		return TM.clearTimerByName(this._name, this._player); }	/* 타이머 이름으로 지우기 */
	clearTimerByPlayer(){	return TM.clearTimerByPlayer(this._player); }			/* 타이머 플레이어로 지우기 */

	calcCurrentSequence(mx, mn){						/* 반복 타이머의 현재 진행 순서 구하기 */
		let min = mn > 2 ? mn : 2
		let max = (mx - 1) / 2;
		return max - Math.floor(max / min) * min;
	}
	calcTotalSequence(seq){	return (seq - 1) / 2; }		/* 반복 타이머의 누적 진행 순서 구하기 */
}
/*** 게임 시스템 클래스 ***/
class GameSystem{
	constructor(versionRoom, releaseDate, isDev, isDemo, lockPass){
		this._defaultFontFamily		= Object.freeze("Noto Sans Mono CJK KR, D2Coding, Consolas, \"맑은 고딕\", \"나눔고딕\";");
		this._isDev					= Object.freeze(isDev == true);		/* 개발자 버전 유무 */
		this._isDemo				= (isDemo == true);					/* 데모 모드 유무 */
		this._securityPatchLevel	= Object.freeze("2022.12.01");		/* UMUX 보안 패치 수준(건드리지 마시오) */
		this._versionUMUX  			= Object.freeze("4.0");				/* UMUX 버전(건드리지 마시오) */
		this._versionRoom 			= Object.freeze(versionRoom);		/* 서버 버전 */
		this._releaseDate			= Object.freeze(releaseDate);		/* 릴리스 일자 */
		this._cssStyleList			= Object.freeze({					/* CSS 스타일 목록 */
			"bootDiv"				: ["font-weight: bold"],
			"infoTitle"				: ["margin: 0 4px", "padding: 0 4px"],
			"infoBody"				: [
				"width: 40vw", "min-width: 360px",
				"overflow: auto",
				"font-size: 0.8rem",
				"margin: 8px auto",
				"border-radius: 10px", "border-color: transparent",
				"background: #555", "color: #FFF"
			],
			"infoNodes"				: [
				"background: #1A2125", "color: #FFF",
				"padding: 4px 16px 8px", "margin: 2px",
				"border-radius: 8px;"
			],
			"titleListViewDiv"		: [
				"display: table", "overflow: hidden",
				"height: 16px",
				"margin: auto", "padding: 0",
				`background: #${c_LIST_COLOR.BG_STATUS}`, "color: #FFF",
				`border: 1px solid #${c_LIST_COLOR.BG_STATUS}`, "border-radius: 8px 8px 0 0"
			],
			"scoreListViewDiv"		: [
				"display: table", "overflow: hidden",
				"height: 16px",
				"margin: 2px auto", "padding: 1px 0",
				"color: #FFF",
				`background: #${c_LIST_COLOR.BG_STATUS}`,
				`border: 1px solid #${c_LIST_COLOR.BG_STATUS}`
			],
			"generalContainerDiv"	: [
				"display: table", "overflow: auto",
				`background: #${c_LIST_COLOR.BG_ITEM}`, "color: #FFF",
				"margin: auto auto 8px", "padding: 2px",
				`border: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, "border-radius: 10px",
				"font-size: 0.75rem",
			],
			"teamListContainerDiv"	: [
				"display: table",
				`background: #${c_LIST_COLOR.BG_CONTAINER}`, "color: #FFF",
				"margin: auto", "padding: 4px 0",
				`border: 2px solid #${c_LIST_COLOR.BORDER_ITEM}`, "border-radius: 0 0 8px 8px"
			],
			"teamListViewDiv-r"		: [
				"width: 16vw", "min-width: 192px", "height: 18px",
				"display: table-cell", "text-align: center", "flex: 1", "margin: 2px",
				`border-right: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"teamListViewDiv-b"		: [
				"width: 16vw", "min-width: 192px", "height: 18px",
				"display: table-cell", "text-align: center", "flex: 1", "margin: 2px",
				`border-left: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"teamListViewDiv-s"		: [
				"width: 16vw", "min-width: 192px", "height: 18px",
				"display: table-cell", "text-align: center", "flex: 1", "margin: 2px",
				`border-left: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, `border-right: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"teamListViewNode"		: [
				"display: none", "position: relative",
				"width: 100%",
				"margin: 1px 0", "padding: 1px 0",
				"border-radius: 8px"
			],
			"headListViewDiv"		: [
				"display: table",
				"height: 18px",
				`background: #${c_LIST_COLOR.BG_CHATBOX}`, "color: #FFF",
				"margin: 2px auto", "padding: 0",
				"text-align: center",
				"font-size: 0.8rem", "font-weight: 800",
				"border-radius: 8px"
			],
			"titleNodes-r"			: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"margin: 1px 0", `border-right: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"titleNodes-s"			: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"margin: 1px 0", `border-left: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, `border-right: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"titleNodes-b"			: [
				"width: 16vw", "min-width: 192px",
				"display: table-cell",
				"margin: 1px 0", `border-left: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`
			],
			"nodeTitle"				: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"text-align: center",
				"border: 1px solid transparent"
			],
			"scoreRed"				: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"text-align: center",
				"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
			],
			"scoreCore"				: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"text-align: center",
				"border-radius: 4px",
				"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
			],
			"scoreBlue"				: [
				"display: table-cell",
				"width: 16vw", "min-width: 192px",
				"text-align: center",
				"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
			],
			"nodeComId"				: [
				"display: table-cell",
				"width: 16px", "height: 100%",
				"color: #FFF",
				`border-right: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`,
				"margin: 0 1px", "padding: 0 8px",
				"text-align: center", "font-size: 1.02em", "text-shadow: none",
				"float: left",
			],
			"nodeComName"			: [
				"display: table-cell", "position: absolute", "overflow: hidden",
				"width: 50%",
				"color: #FFF",
				"white-space: nowrap",
				"text-align: left", "text-overflow: ellipsis", "font-size: 1.02em", "text-shadow: none",
				"border-radius: 4px",
				"padding: 0 8px", "margin: 0 36px",
				"vertical-align: middle", "z-index: 0"
			],
			"nodeComStatus"			: [
				"display: table-cell", "position: absolute",
				"max-width: 96px",
				"background: transparent", "color: #FFF",
				"border-radius: 8px",
				"font-size: 1.02em", "text-align: right",
				"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px",
				"margin: 0 2px", "padding: 0 8px",
				"float: right", "right: 0", "z-index: 1"
			],
			"logContainerDiv"		: [
				"display: table",
				"margin: auto", "padding: 0 2px",
				"border-radius: 4px",
			],
			"logDetailsOutput"		: [
				"margin: 2px 4px", "padding: 1px 2px",
				"font-size: 0.8rem",
				"border-radius: 10px",
				"background: #555", "color: #FFF"
			],
			"logSummaryOutput"		: [
				"color: #FFF",
				"padding: 0 4px", "margin: 0 4px"
			],
			"logDivOutput"			: [
				"overflow:auto",
				"min-height: 24px",
				"max-height: 70vh",
				"text-align: center", "font-size: 0.8rem",
				"border: 1px solid #1A2125", "border-radius: 8px",
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
				"width: 40vw", "min-width: 400px",
				"float: left",
				`border: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, "border-radius: 4px",
				"margin: 4px 2px 4px 4px", "padding: 0 8px",
				"font-size: 0.9rem", "text-overflow: ellipsis",
				"white-space: nowrap"
			],
			"logInputBtn"			: [
				"height: 24px",
				"float: right",
				"font-weight: bold", "text-align: center",
				"margin-radius: 8px",
				"margin: 4px 4px 4px 2px", "padding: 0 16px",
				"border: none", "border-radius: 4px"
			],
			"logDivOutputMsg"		: [
				"display: flex",
				"margin: 1px 0", "padding: 0 10px",
				"border-radius: 8px",
				"text-shadow: #000000 1px 0px, #000000 0px 1px, #000000 1px 0px, #000000 0px 1px"
			],
			"logDivOutputClock"		: [
				"text-align: center",
				"float: left",
				"margin: 4px"
			],
			"logDivOutputContent"	: [
				"width: 40vw", "min-width: 256px",
				"float: right",
				"text-align: left",
				"margin: 4px",
				"white-space: break-spaces"
			]
		});
		this._hasInitServer			= false;							/* 서버 초기화 여부 */
		this._hasInitWebGUI			= false;							/* 그래픽 유저 인터페이스 초기화 여부 */
		this._lockPass				= lockPass;							/* 비밀번호 고정 여부 */
		this._framebody;												/* iframe 객체 */
			
	}
	onClickBtnSendLog(){	/* 로그 전송 버튼 클릭 이벤트 */
		let inpt = iframeEle.getElementById("logInputPre");
		let msg = inpt.value;
		if(!CS.isWhiteSpace(msg)) SYS.printMsg(msg);		//	값이 있으면 출력
		inpt.value = null;									//	입력란 비우기
	}
	onKeyDownLogInput(e){	/* 로그 입력 이벤트 */
		switch(e.key.toLowerCase()){
			case "enter":
				return SYS.onClickBtnSendLog();	
			default:
				return;
		}
	}
	initAttributeColors(obj, colBg, colText, str, isGradient, brd){		/* 속성 색상 초기화 */
		let getColor = c => '#' + NC.findColor(c).substring(2).replace('#', '');
		let txc = getColor(c_LIST_COLOR.BG_CHATBOX), bgc = getColor(colBg);
		obj.style.background = isGradient ? (`linear-gradient(180deg, ${txc} 5%, ${bgc} 100%)`) : bgc;
		if(isGradient || brd) obj.style.border = brd ? brd : `1px solid ${bgc}`;
		obj.style.color = getColor(colText);
		if(str) obj.innerText = str;
	}
	initAttributeId(obj, cssName, id){									/* 객체 ID 초기화 */
		let eid = id ? id : Object.keys({obj})[0];
		if(id) obj.setAttribute("id", eid);
		this.initCssClass(obj, cssName ? cssName : eid);
	}
	initCssClass(elm, str){												/* CSS 클래스 초기화 */
		let name = str ? str : Object.keys({elm})[0];
		if(!this._cssStyleList.hasOwnProperty(name)) return this.log(false, "유효하지 않는 대상입니다. 클래스 이름: %d", c_LOG_TYPE.ERROR, name);
		elm.setAttribute("class", name);
		let cmnRes = [`font-family: ${this._defaultFontFamily}`];
		elm.setAttribute("style", this._cssStyleList[name].concat(cmnRes).join(';'));
	}
	initElement(tag, id, cssName){										/* 요소 초기화 */
		let obj = document.createElement(tag);
		this.initAttributeId(obj, cssName ? cssName : id, id);
		return obj;
	}
	initServer(url){													/* 서버 초기화 */
		if(this._hasInitServer == true) return this.log(false, "이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.", c_LOG_TYPE.ERROR);
		ROOM.setScoreLimit(0);
		ROOM.setTimeLimit(0);
		GM.loadMap(0);
		console.clear();
		if(this._isDev){
			let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
			if(!CS.isWhiteSpace(tempPass)){ 
				alert(["비밀번호가 설정되었습니다.",
				"현재 비밀번호: " + tempPass,
				"확인을 눌러 계속하세요."].join(newLine));
				AMN.updatePassword(tempPass);
				this._lockPass = true;
				SYS.log(false, "서버 비밀번호: %d", c_LOG_TYPE.BINDING, tempPass);
			}
			else alert("작업이 취소되었습니다." + newLine + "확인을 눌러 계속하세요.");
		}
		if(!internalCommands.hasOwnProperty("AMN.logonAdmin")){
			let unlockCode = (Math.floor(Math.random() * 9000) + 1000);	
            customCommands["AMN.logonAdmin"] = [unlockCode.toString()];	
            SYS.log(false, "최고 관리자 로그인 비밀번호: %d", c_LOG_TYPE.BINDING, unlockCode);
		}
		Object.freeze(GM._gameLink = url);
		console.group("[서버 정보]");
		console.info(NC.fmtStr(["서버 이름: %d",
			"최대 인원: %d", "서버 버전: %d",
			"서버 공개 여부: %d",
			"UMUX 버전: %d", "보안 패치 수준: %d",
			"지역 코드: %d", "상세 위치(바로가기): %d, %d(https://www.google.com/maps/place/%d)"
		].join(newLine), [ROOMNAME, MAXPLAYERS, this._versionRoom, PUBLIC ? "허용" : "차단",
			this._versionUMUX, this._securityPatchLevel, REGION_CODE.toUpperCase(),
			LAT, LON, (LAT + "%20" + LON).toString()
		]));
		console.groupEnd();
		AMN.updatePassword(PASSWORD);
		let bl = [
            /***
                슈퍼 블랙리스트 초기화
                -아래와 같은 형식으로 명단을 작성할 수 있습니다.
                -<예시> [true, "알파고"], 또는 [true, undefined, "12345678901234567890"],
            ***/
			[true, "에드", "34392E3137342E3133332E3131"],
			[true, "에드", "3131382E33342E3235312E3334"],
			[true, "에드", "37342E38322E36302E3832"],
			[true, "에드", "36352E34392E3132362E3839"],
			[true, "에드", "3132352E3138372E3133352E3239"],
			[true, "에드", "37322E35322E38372E3737"],
			[true, "에드", "31342E34372E3131322E313232"],
			[true, "에드", "3232312E3136352E3136332E313530"],
			[true, "에드", "3138322E3232342E33312E313136"],
			[true, "에드", "3138332E3130302E3135362E32353"],
			[true, "에드", "3138332E3130302E3135362E323532"],
			[true, "에드", "3139382E31362E37342E323035"],
			[true, "에드", "37342E38322E36302E313739"],
			[true, "Knife", "34392E3137342E3133332E3131"],
			[true, "어둠의 악마", "3231392E3234382E3230332E313430"],
			[true, "랄랄랄", "3132342E35392E37332E313931"],
			[true, "제몸무게가 220kg인데 정상인가요", "3130342E3233362E3231332E323330"],
			[true, "프레버", "31342E34372E3131322E313330"],
			[true, "Preber", "31342E34372E3131322E313330"],
			[true, "Preber", "37322E35322E38372E3937"],
			[true, "Preber", "36352E34392E3132362E3931"],
			[true, "Preber", "37322E35322E38372E3937"],
			[true, "어드안주면인터넷찢는개", "312E3234362E3139332E313536"],
			[true, "쥐알티", "312E3234362E3139312E323134"],
			[true, "농협3021003643681", "3132352E3137392E3231312E3330"],
			[true, "농협신", "3132352E3137392E3231312E3330"],
			[true, "농협신", "3132352E3137392E3231312E3331"],
			[true, "농협신", "3131382E3137362E34372E313233"],
			[true, "농협신", "3132352E3137392E3231312E3232"],
			[true, "농협신", "3132352E3137392E3231312E3533"],
			[true, "농협신", "3132352E3137392E3231312E3236"],
			[true, "농협신", "3132352E3137392E3231312E3435"],
			[true, "농협신", "3132352E3137392E3231312E3534"],
			[true, "농협신", "3132352E3137392E3231312E3131"],
			[true, "농협신", "3132352E3137392E3231312E3330"],
			[true, "농협신", "3132352E3137392E3231312E3231"],
			[true, "농협신", "3132352E3137392E3231312E33"],
			[true, "농협신", "3132352E3137392E3231312E38"],
			[true, "농협신", "3138332E3130362E37392E3631"],
			[true, "농협신", "3132352E3137392E3231312E3537"],
			[true, "농협신", "3132352E3137392E3231312E35"],
			[true, "농협신", "3130362E3130322E3132382E3838"],
			[true, "농협신", "3231312E35312E3131302E313437"],
			[true, "농협신", "34392E3134322E3131312E313030"],
			[true, "농협신", "3137352E3139372E34382E3532"],
			[true, "노래하는메시", "3131382E3137362E34372E313332"],
			[true, "노래하는메시", "3132352E3139312E37302E313031"],
			[true, "노래하는메시", "3232312E3135312E3132312E313731"],
			[true, "노래하는메시", "3232302E37362E3230302E35"],
			[true, "노래하는메시", "3231312E3232342E3232392E313637"],
			[true, "노래하는메시", "3232302E37352E3230392E3637"],
			[true, "노래하는메시", "3136332E3138302E3131382E313734"],
			[true, "노래하는메시", "3231312E3230342E3132352E323430"],
			[true, "노래하는메시", "35382E3233332E38302E3532"],
			[true, "노래하는메시", "3138332E3130322E34332E313735"],
			[true, "노래하는메시", "3132312E3139302E3233332E313635"],
			[true, "노래하는메시", "3131392E3139322E3235342E323438"],
			[true, "노래하는메시", "3132312E3134332E3133342E3637"],
			[true, "노래하는메시", "3232322E3131322E34392E313630"],
			[true, "노래하는메시", "3132352E3133322E39392E3338"],
			[true, "노래하는메시", "3231302E3132312E3136352E3337"],
			[true, "노래하는메시", "3232312E3136352E37392E323338"],
			[true, "노래하는메시", "3232302E37392E3137382E323230"],
			[true, "노래하는메시", "3232322E3131372E3132322E3433"],
			[true, "노래하는메시", "312E3233312E36322E313335"],
			[true, "노래하는메시", "3232302E37322E39362E3637"],
			[true, "노래하는메시", "3132312E3136322E3231332E323130"],
			[true, "노래하는메시", "3232312E3135352E3234342E313532"],
			[true, "노래하는메시", "3132312E3133302E31332E3938"],
			[true, "노래하는메시", "3231312E3235302E3138382E3437"],
			[true, "노래하는메시", "3231312E3230392E37362E323038"],
			[true, "노래하는메시", "3138332E3130382E3138312E313538"],
			[true, "노래하는메시", "3131322E3136362E3133362E3331"],
			[true, "노래하는메시", "3131332E35322E3139362E313733"],
			[true, "노래하는메시", "35382E3134302E3231312E323237"],
			[true, "노래하는메시", "3132312E3134392E322E313539"],
			[true, "노래하는메시", "3231312E3230352E3231372E3130"],
			[true, "노래하는메시", "35382E3134302E3231302E3730"],
			[true, "노래하는메시", "3231312E3235302E3138382E313035"],
			[true, "노래하는메시", "3132342E352E31332E323237"],
			[true, "노래하는메시", "33392E3131382E3132302E3534"],
			[true, "노래하는메시", "3138302E38332E39312E323139"],
			[true, "노래하는메시", "35382E3134332E3138312E313035"],
			[true, "노래하는메시", "3132342E352E392E313331"],
			[true, "노래하는메시", "3131382E3234312E3131382E3236"],
			[true, "노래하는메시", "3231312E3230332E3235352E3634"],
			[true, "노래하는메시", "3136382E3132362E38392E313335"],
			[true, "노래하는메시", "3132342E35342E3137352E38"],
			[true, "노래하는메시대작전", "3131382E3137362E34372E313332"],
			[true, "노래하는메시대작전", "34392E3136312E3130322E313834"],
			[true, "drogba", "3131382E33322E37372E323531"],
			[true, "드록바", "3131382E33322E37372E323531"],
			[true, "드록바", "35382E3134332E37362E3635"],
			[true, "경상도에서태어난아기를영국에서길렀더니내가나왔다", "3131382E362E32352E313034"],
			[true, "soy el mas pro", "3139302E34392E3137302E313038"],
			[true, "Roseanne", "3231392E3130302E33372E323433"],
			[true, "HYNN", "3231392E3130302E33372E323433"],
			[true, "HYNN", "3232322E3130352E302E313733"],
			[true, "HYNN", "3231382E35312E31392E3338"],
			[true, "HYNN", "3231392E3234392E3231342E3437"],
			[true, "HYNN", "3232302E3131362E3233352E39"],
			[true, "HYNN", "3132352E3133392E3133312E313734"],
			[true, "HYNN", "3232302E39332E3134362E313535"]
            /***
                 블랙리스트 초기화
                -아래와 같은 형식으로 명단을 작성할 수 있습니다.
                -<예시> [false, "알파고"], 또는 [false, undefined, "12345678901234567890"],
            ***/
        ];
		//---
		for(let e of bl.filter(e => this.hasInRange(e.length, 2, 3) == true)){
			let isSuper = (e[0] == true);
			let name = CS.isWhiteSpace(e[1]) ? undefined : e[1];
			let conn = e.length > 2 ? e[2] : null;
			if(name != undefined || conn != null) AMN.addBlacklist(isSuper, name, conn);
		}
		if(PASSWORD)	//	reCAPTCHA 활성화
			if(this._isDev == true|| PUBLIC == false) this.enableRecaptcha(true);
		if(this._isDemo == true){
			this.log(false, ["일부 기능이 제한됩니다",
				['', "중복/다중 접속 퇴장", "비활동 플레이어 퇴장", ''].join(newLine),
				"해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요.", "SYS.enableDemo(false);"
			].join(newLine), c_LOG_TYPE.WARNING);
		}
		this._hasInitServer = true;
	}
	initWebGUI(){														/* 그래픽 유저 인터페이스 초기화 */
		if(!this._hasInitServer || this._hasInitWebGUI) return;			//	서버 초기화가 필요한 경우 처리 중단
		this._framebody = iframeEle.body;								//	부모 객체
		/*** 제목 및 설명 ***/
		let titleDoc	= this._framebody.getElementsByTagName("p")[0];				//	destination here.
		document.title += NC.fmtStr("(%d)", TM.showCurrentTime(c_TIME_TYPE.CORE));	//	최초 가동 시간 표기
		titleDoc.innerHTML = "설명서는 " + "<a href=\"https://github.com/haxball/haxball-issues/wiki/Headless-Host\" target=\"_blank\">" + "여기</a>"+ "에 있습니다." + " | " + "<a href=\"https://github.com/HonestSquare/UMUX/wiki/UMUX-Reference\" target=\"_blank\">" + "UMUX 레퍼런스" + "</a>";
		titleDoc.setAttribute("style", "font-size: 1em");
		this.addWebElement(this._framebody, titleDoc);
		/*** 서버 정보 ***/
		let infoBody = this.initElement("details", "infoBody");
		let infoTitle = this.initElement("summary", "infoTitle");
		let infoNodes = this.initElement("pre", "infoNodes");
		infoTitle.innerHTML = "서버 정보";
		infoNodes.innerHTML = NC.fmtStr(["서버 이름: %d", "최대 인원: %d",
			"서버 버전: %d", "서버 공개 여부: %d",
			"UMUX 버전: %d", "보안 패치 수준: %d",
			"지역 코드: %d", "상세 위치: %d, %d"
			].join(newLine), [ROOMNAME, MAXPLAYERS, this._versionRoom, PUBLIC ? "허용" : "차단",
				this._versionUMUX, this._securityPatchLevel,
				REGION_CODE.toUpperCase(), LAT, LON
		]);
		this.addWebElement(infoBody, [infoTitle, infoNodes]);
		this.addWebElement(this._framebody, infoBody);
		/*** 플레이어 정보 ***/
		let titleListViewDiv		= this.initElement("div", "titleListViewDiv");
		let scoreListViewDiv		= this.initElement("div", "scoreListViewDiv");
		let generalContainerDiv		= this.initElement("div", "generalContainerDiv");
		let teamListContainerDiv	= this.initElement("div", "teamListContainerDiv");
		let headListViewDiv			= this.initElement("div", "headListViewDiv");
		/*** 팀별 객체 생성 ***/
		let listViewRedDiv		= this.initElement("div", "listViewRedDiv", "teamListViewDiv-r");
		let listViewBlueDiv		= this.initElement("div", "listViewBlueDiv", "teamListViewDiv-b");
		let listViewSpecDiv		= this.initElement("div", "listViewSpecDiv", "teamListViewDiv-s");
		this.addWebElement(teamListContainerDiv, [listViewRedDiv, listViewSpecDiv, listViewBlueDiv]);
		this.addWebElement(generalContainerDiv, [titleListViewDiv, scoreListViewDiv, headListViewDiv, teamListContainerDiv]);
		
		let titleNodeList = [
			{
				"class" : "nodeTitle", "id" : "titleDbPlayer",
				"prnts" : titleListViewDiv, "txtStr" : "현재 인원:",
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "nodeTitle", "id" : "seatFull",
				"prnts" : titleListViewDiv,
				"bgc" : c_LIST_COLOR.BG_CONTAINER, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "nodeTitle", "id" : "seatEmpty",
				"prnts" : titleListViewDiv,
				"bgc" : c_LIST_COLOR.BG_CONTAINER, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreRed", "id" : "scoreRed",
				"prnts" : scoreListViewDiv,
				"border" : `1px solid #${c_LIST_COLOR.BG_STATUS}`,
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreCore", "id" : "scoreCore",
				"prnts" : scoreListViewDiv,
				"isGradient" : false, "border" : `1px solid #${c_LIST_COLOR.GRAY}`,
				"bgc" : c_LIST_COLOR.BG_CHATBOX, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreBlue", "id" : "scoreBlue",
				"prnts" : scoreListViewDiv,
				"border" : `1px solid #${c_LIST_COLOR.BG_STATUS}`,
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "titleNodes-r", "id" : "titleRed",
				"prnts" : headListViewDiv,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.TEAM_RED
			},
			{
				"class" : "titleNodes-s", "id" : "titleSpec",
				"prnts" : headListViewDiv,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.WHITE
			},
			{
				"class" : "titleNodes-b", "id" : "titleBlue",
				"prnts" : headListViewDiv,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.TEAM_BLUE
			}
		].map(tn => {
			let em = SYS.initElement("pre", tn.id, tn.class);
			let getOwnProperty = (name, def) => tn.hasOwnProperty(name) ? tn[name] : (!def ? '' : def);
			SYS.initAttributeColors(em,
				getOwnProperty("bgc", c_LIST_COLOR.TEXT_STATUS),
				getOwnProperty("txtCol", c_LIST_COLOR.DEFAULT), getOwnProperty("txtStr"),
				getOwnProperty("isGradient"), getOwnProperty("border")
			);
			SYS.addWebElement(tn.prnts, em);
			return em;
		});
		/*** 팀 개별 노드 생성 ***/
		let teamIdList = {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}
		for(let i = 0; i < MAXPLAYERS; i++){
			for(let t of [c_TEAM.RED, c_TEAM.BLUE, c_TEAM.SPECTATOR]){
				let teamDiv = this.initElement("div", NC.fmtStr("list-%d", teamIdList[t] + i), "teamListViewNode");
				SYS.addWebElement({
					[c_TEAM.RED]		: listViewRedDiv,
					[c_TEAM.BLUE]		: listViewBlueDiv,
					[c_TEAM.SPECTATOR]	: listViewSpecDiv
				}[t], teamDiv);
				for(let e of [["span", "id"], ["p", "name"], ["span", "status"]]){
					SYS.addWebElement(teamDiv, SYS.initElement(e[0],
						NC.fmtStr("%d_%d", [teamIdList[t] + i, e[1]]),
						NC.fmtStr("nodeCom%d%d", [e[1].charAt(0).toUpperCase(), e[1].slice(1)])
					));
				}
			};
		}
		this.addWebElement(this._framebody, generalContainerDiv);
		let logContainerDiv = this.initElement("div", "logContainerDiv");
		/*** 로그 출력 ***/
		let logDetailsOutput	= this.initElement("details", "logDetailsOutput");
		let logSummaryOutput	= this.initElement("summary", "logSummaryOutput");
		let logDivOutput		= this.initElement("div", "logDivOutput");
		logSummaryOutput.innerText = "로그 출력";
		this.initAttributeColors(logDivOutput, c_LIST_COLOR.BG_CHATBOX, c_LIST_COLOR.TEXT_CHATBOX);
		logDetailsOutput.setAttribute("open", "true");
		/*** 로그 입력 ***/
		let logDivInput = this.initElement("div", "logDivInput");
		this.initAttributeColors(logDivInput, c_LIST_COLOR.BG_CHATBOX, c_LIST_COLOR.TEXT_CHATBOX);
		let logInputPre	= this.initElement("input", "logInputPre");			//	입력 공간
		logInputPre.setAttribute("type", "text");
		logInputPre.setAttribute("autocomplete", "off");					//	자동 완성 비활성화
		logInputPre.setAttribute("placeholder", "Enter 또는 보내기 버튼을 클릭하면 입력한 내용이 전달됩니다.");
		logInputPre.addEventListener("keydown", this.onKeyDownLogInput);	//	키 입력 처리
		this.initAttributeColors(logInputPre, c_LIST_COLOR.BLACK, null);
		let logInputBtn	= this.initElement("button", "logInputBtn");		//	전송 버튼
		logInputBtn.setAttribute("type", "button");
		this.addEventInput(logInputBtn, this.onClickBtnSendLog);
		this.initAttributeColors(logInputBtn, c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS, "보내기");
		this.addWebElement(logDivInput, [logInputPre, logInputBtn]);
		this.addWebElement(logDetailsOutput, [logSummaryOutput, logDivOutput]);
		this.addWebElement(logContainerDiv, [logDetailsOutput, logDivInput]);
		this.addWebElement(this._framebody, logContainerDiv);
		/*** UMUX 저작물 표기(이 구문은 지우지 마시오) ***/
		let bootDiv = this.initElement("div", "bootDiv");
		bootDiv.innerHTML = "Powered by UMUX";
		this.addWebElement(this._framebody, bootDiv);
		this._hasInitWebGUI = true;
	}

	hasInRange(num, min, max){		/* 범위 포함 여부 구하기 */
		return (num == null ? false : (num - min) * (num - max) <= 0);
	}
	findInfo(){						/* 저작물 및 버전 출력(이 구문은 지우지 마시오) */
		return NC.fmtStr([["서버 버전: %d", "UMUX 버전: %d", "UMUX 보안 패치 수준: %d"
		].join(" | "), "Powered by UMUX"].join(newLine), [this._versionRoom, this._versionUMUX, this._securityPatchLevel]);
	}
	
	addEventInput(obj, ev){				/* 클릭 이벤트 지정 */
		obj.onclick = ev;
	}
	addListIndex(player){				/* 플레이어 리스트 추가 */
		if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		if(!PM.findLocalId(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_LID);
		let addNode = function(e, p){
			if(e == false) return;
			let target = e[0];
			let chld = target.childNodes;
			chld[0].name			= p._id;
			chld[0].title			= NC.fmtStr("플레이어 정보: %d", p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			chld[0].innerText		= p.localId;
			chld[1].innerText		= p.showPlayerInfo(c_PLAYERINFO_TYPE.NAME);
			chld[1].title			= chld[0].title;
			chld[2].innerText		= PM.findTagGrade(p._id);
			target.style.display = "table";
		}
		addNode(Object.values(iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}[PM.findPlayerById(player)._team]))[0].childNodes).filter(n => n.style.display == "none"), PM.findPlayerById(player));
		//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
		PM.findPlayerList().forEach(p => this.updateListIndex(p._id));
	}
	addWebElement(pe, ce){				/* 그래픽 유저 인터페이스에 자식 객체 추가 */
		if(!Array.isArray(ce)) pe.appendChild(ce);
		else ce.forEach(chldElm => pe.appendChild(chldElm));
	}

	updateListIndex(player){	/* 플레이어 리스트 갱신 */
		if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		if(!PM.findLocalId(player)) return this.clearListIndex(player);
		let teamIdList = {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}
		let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", teamIdList[PM.findPlayerById(player)._team]))[0].childNodes;
		let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
		if(target == undefined) return;
		TM.clearTimerByName("updateNotification", player);
		let pn = target.childNodes[2];
		let getMsgList = p => [
			['😴', p._isSleep, "자리를 비운 상태입니다."],
			['🥶', p._isMute, "채팅이 금지된 상태입니다."],
			['⚽', SC._touchedList.length > 0 && SC.lastTouchedPlayer._id == p._id ? p.hasCommonRange(0) : false, "선두를 잡았습니다."],
			[PM.findTagGrade(p._id), true]
		].filter(s => s[1] == true);
		let maxIcons = 5;
		let ml = getMsgList(PM.findPlayerById(player));
		let iconList = ml.map(v => v[0]);
		if(iconList.length > maxIcons){
			iconList.splice(0, iconList.length - maxIcons);
			iconList.unshift('…');
		}
		pn.innerText = iconList.join('');
		let titleList = ml.filter(v => v[2] != undefined).map(v => v[2]);
		titleList.unshift(NC.fmtStr("%d님은 현재...", this.showPlayerInfo(player, c_PLAYERINFO_TYPE.PUBLIC)));
		let pi = target.childNodes[0];
		if(pi.innerText != PM.findLocalId(player)) pi.innerText = PM.findLocalId(player);
		pn.title = titleList.length > 1 ? titleList.join(newLine) : '';
		TM.addTimer("updateNotification", () => {
			let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", teamIdList[PM.findPlayerById(player)._team]))[0].childNodes;
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
					return NC.fmtStr("⚽×%d(%d)", [cg, tg]);
				default: return "경기가 시작되면 표시됩니다.";
			}
		}
		switch(GM.gameStats){
			case c_GAME_STATS.STOP:			//	경기 종료
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.GRAY, c_LIST_COLOR.TEXT_STATUS, "경기 예정", true);
				scoreList[c_TEAM.RED].innerText		= NC.fmtStr("⚽×%d", SC.calcTotalGoalsByTeam(c_TEAM.RED));
				scoreList[c_TEAM.BLUE].innerText	= NC.fmtStr("⚽×%d", SC.calcTotalGoalsByTeam(c_TEAM.BLUE));
				break;
			case c_GAME_STATS.PAUSE:		//	경기 중지
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.RED, c_LIST_COLOR.TEXT_STATUS, "경기 중지", true);
				break;
			case c_GAME_STATS.TICK:			//	경기 진행
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.GREEN, c_LIST_COLOR.TEXT_STATUS, (GM.totalMatch + "번째 경기"), true);
				scoreList[c_TEAM.RED].innerText		= getGoalText(c_TEAM.RED);
				scoreList[c_TEAM.BLUE].innerText	= getGoalText(c_TEAM.BLUE);
				break;
		}
		titleList[c_TEAM.RED].innerText			= NC.fmtStr("RED(%d)", PM.cntPlayers(c_TEAM.RED));
		titleList[c_TEAM.BLUE].innerText		= NC.fmtStr("BLUE(%d)", PM.cntPlayers(c_TEAM.BLUE));
		titleList[c_TEAM.SPECTATOR].innerText	= NC.fmtStr("SPECTATORS(%d)", PM.cntPlayers(c_TEAM.SPECTATOR));
	}

	clearListIndex(player){		/* 플레이어 리스트 제거 */
		if(!PM.isValid(player)) return this.sendError(c_ERROR_TYPE.E_PLAYER_PID);
		let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}[PM.findPlayerById(player)._team]))[0].childNodes;
		let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
		if(target == undefined) return;
		let chld = target.childNodes;
		for(let n of chld){
			n.innerText		= null;
			n.name			= null;
			n.title			= '';
		}
		target.style.display = "none";
		this.updateListIndex(player);	//	플레이어 데이터베이스에 따라 그래픽 유저 인터페이스 갱신
	}

	showPlayerInfo(player, type){		return PM.findPlayerById(player).showPlayerInfo(type); }		/* 플레이어 정보 */
	
	enableDemo(bool){								/* 데모 모드 활성화 */
		if(this._isDemo === bool) return this.log(false, "이미 해당 값이 적용돼 있습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		PM.findPlayerList().forEach(p => NC.locked((bool == true), "데모 모드가 %d 되었습니다.", p._id, null, [bool == true ? "활성화" : "비활성화"]));
		this.log(false, "데모 모드가 %d 되었습니다.", c_LOG_TYPE.BINDING, [bool == true ? "활성화" : "비활성화"]);
		if(bool == true){
			this.log(false, ["일부 기능이 제한됩니다",
				['', "중복/다중 접속 퇴장", "비활동 플레이어 퇴장", ''].join(newLine),
				"해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요.", "SYS.enableDemo(false);"
			].join(newLine), c_LOG_TYPE.WARNING);
		}
		this._isDemo = (bool == true);
	}
	enableRecaptcha(isActive, player){				/* reCAPTCHA 지정 */
		room.setRequireRecaptcha(isActive);
		if(PM.isValid(player)){
			NC.locked(isActive, "%d님이 reCAPTCHA를 %d했습니다.", null, null, [SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME), (isActive == true ? "활성화" : "비활성화")]);
			this.log(true, "%d(이)가 reCAPTCHA를 %d함", c_LOG_TYPE.NOTICE, [SYS.showPlayerInfo(player), (isActive == true ? "활성화" : "비활성화")]);
		}
		else{
			NC.locked(isActive, "reCAPTCHA가 %d되었습니다.", null, null, (isActive == true ? "설정" : "해제"));
			this.log(true, "reCAPTCHA가 %d됨", c_LOG_TYPE.NOTICE, (isActive == true ? "활성화" : "비활성화"));
		}
	}
	fillLine(amount, line){							/* 자릿수 교정 */
		return (amount < Math.pow(10, line - 1) ? NC.fmtStr("0%d", amount) : amount);
	}
	lockPassword(bool){								/* 비밀번호 고정 */
		if(typeof bool != "boolean") return this.sendError(c_ERROR_TYPE.E_ETC);
		this._lockPass = bool;
		this.log(false, "비밀번호 고정 장치가 " + (this._lockPass == true ? "활성화" : "비활성화") + "됨.", c_LOG_TYPE.NOTICE);
	}
	log(io, msg, type, ...replace){					/* 로그 전달 */
		if(!msg) return false;											//	빈 메시지 확인
		let timeStatus = TM.showCurrentTime() + (io ? ' ▶ ' : ' ◀ '); 	//	시간 및 입출력 확인
		let text = NC.fmtStr(msg, replace[0]);
		let gl = {					/* 로그 유형 */
			[c_LOG_TYPE.NOTICE]		: [NC.msgColor.NOTICE],				//	고지
			[c_LOG_TYPE.BELL]		: [c_LIST_COLOR.YELLOW],			//	공지
			[c_LOG_TYPE.SEND]		: ["8B8B8B"],						//	송신
			[c_LOG_TYPE.BINDING]	: ["587489"],						//	수신
			[c_LOG_TYPE.WARNING]	: ["E6C78B", "524728"],				//	경고
			[c_LOG_TYPE.ERROR]		: ["EB4E4E", "6D3522"]				//	오류
		};
		let cl = gl.hasOwnProperty(type) ? gl[type] : false;
		if(!cl) return this.outputLogMsg(text, timeStatus);
		if(cl.length < 2) return this.outputLogMsg(text, timeStatus, cl[0]);
		return this.outputLogMsg(text, timeStatus, cl[0], cl[1]);
	}
	outputLogMsg(msg, time, textColor, bgColor){	/* 로그 출력 */
		let logContainerDiv = iframeEle.getElementById("logDivOutput");		//	로그 객체
		let layoutElm	= this.initElement("div", null, "logDivOutputMsg");
		let clockElm	= this.initElement("span", null, "logDivOutputClock");
		let contentElm	= this.initElement("pre", null, "logDivOutputContent");
		//	세부 속성
		clockElm.innerHTML = time;
		contentElm.innerHTML = msg;
		clockElm.title = TM.showCurrentTime(c_TIME_TYPE.FULL);
		this.initAttributeColors(layoutElm, (!bgColor ? c_LIST_COLOR.BG_CHATBOX : bgColor), (!textColor ? c_LIST_COLOR.TEXT_CHATBOX : textColor), null, true);
		switch(textColor){
			case "EB4E4E":
				console.error([time + msg, "(클릭하여 원인 경로 파악)"].join(newLine));
				break;
			case "E6C78B":
				console.warn(time + msg);
				break;
			default: 
				console.log(time + msg);
		}
		if(!this._hasInitWebGUI) return false;
		this.addWebElement(layoutElm, [clockElm, contentElm]);
		this.addWebElement(logContainerDiv, layoutElm);
		this.updateWebGUI();
		if(logContainerDiv.scrollHeight > 0){				//	자동 스크롤
			logContainerDiv.scrollTop = logContainerDiv.scrollHeight;
		}
	}
	printMsg(msg, target){							/* 서버 메시지 출력 */
		let getDestType = function(target){
			if(PM.isValid(target)) return 3;		//	개인
			let team = Object.entries({
				[c_TEAM.RED]		: ["red", 'r', "레드", "레"],
				[c_TEAM.BLUE]		: ["blue", 'b', "블루", "블"],
				[c_TEAM.SPECTATOR]	: ["spct", 's', "관전", "관"]
			}).find(([k, v]) => v.includes(target));
			return team == undefined ? 4 : team.at(0);
		}
		let getDestTypeToString = function(type){
			let tl = {
				[c_TEAM.RED] : "레드", [c_TEAM.BLUE] : "블루", [c_TEAM.SPECTATOR] : "관전"
			};
			return tl.hasOwnProperty(type) ? tl[type] : type == 3 ? "개인" : "전체";
		}
		let destType = getDestType(target);
		let destStr = getDestTypeToString(destType);
		let context = NC.fmtStr(" →[%d%d]%d", [destStr, (destType == 3 ? (": " + SYS.showPlayerInfo(target)) : ''), msg]);
		this.log(true, "전달: [%d]%d", c_LOG_TYPE.SEND, [destStr, msg]);
		if(Object.values(c_TEAM).hasOwnProperty(destType)) return CS.sendTeamChat(destType, 0, context);
		if(destType == 3) return CS.sendPrivateChat(target, 0, NC.fmtStr(" →[%d: %d]%d", [destStr, SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC), msg]));
		CS.sendAlert(context);
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
const TM	= new TimeManager(c_TIME_TYPE.NORMAL);	/* 시간 매니저 클래스 */
const SYS	= new GameSystem(						/* 게임 시스템 클래스 */
	/* 버전, 릴리스 일자, 개발자 버전 유무, 데모 모드 유무, 비밀번호 고정 유무 */
	"v1.00", "2022.12.04", false, false, false
);
const GM 	= new GameManager(						/* 게임 매니저 클래스 */
	/* 장기 무응답 플레이어 판정 시간, 반복 채팅 판정 시간(밀리초 단위), 도달 기준 시간 */
	200, 500, 0
);
const AMN	= new Administration(					/* 관리 클래스 */
	/* 동적 권한 할당 여부, 팀 자율 이동 여부, 맵 고정 여부, 고정 맵 데이터, 최고 관리자 상한 인원, 호스트 팀 이동 여부 */
	true, true, false, null, 3, true
);
const NC 	= new Notification(						/* 알림 클래스 */
	/* [메시지 기본 색상] 공통, 권한 없음, 주의, 상세정보, 잠금 및 해제, 알림, 경고 */
	c_LIST_COLOR.DEFAULT, c_LIST_COLOR.GRAY, c_LIST_COLOR.ORANGE, c_LIST_COLOR.GREEN, c_LIST_COLOR.YELLOW, c_LIST_COLOR.GREEN, c_LIST_COLOR.RED
);
const CS 	= new ChatManager(						/* 채팅 매니저 클래스 */
	/* 채팅 얼림 여부, 귓속말 차단 여부, 채팅 필터링 단계, 금지어 최대 감지량, 반복 채팅 최대 감지량 */
	false, false, 2, 50, 3
);
const CM 	= new Commands(							/* 명령어 클래스 */
	/* 채팅 글자 제한 수 */
	75
);
const PM 	= new PlayerManager();					/* 플레이어 매니저 클래스 */
const SC	= new ScoreManager(						/* 점수 매니저 클래스 */
	/* 충돌 범위 민감도 */
	1.25
);
const room	= ROOM;
const internalCommands	= {							/*** 내부 명령어 ***/
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
	["CM.comUpdateUniform"] :	["colors", "color", "uniform", "컬러", "유니폼", "ㅋㄹ", "ㅇㄴㅍ", "채ㅣㅐㄱㄴ", "채ㅣㅐㄱ", "ㅕㅜㅑ래그", "zjffj", "dbslvha"],
	["CM.comClearUniform"] :	["clear_color", "clear_uniform", "클리어_유니폼", "초기화_유니폼", "유니폼_초기화", "클리어_유니폼", "유니폼_클리어", "clearcolor", "clearuniform", "클리어유니폼", "초기화유니폼", "유니폼초기화", "클리어유니폼", "유니폼클리어"],
	/* 팀 이동 제한(전체) */
	["CM.comAllowJoin"] :		["lock_join", "isLockJoin", "join_lock", "joinlock", "조인_락", "조인락", "락_조인", "락조인", "ㅣㅐ차_ㅓㅐㅑㅜ", "ㅓㅐㅑㅜ_ㅣㅐ차", "whdls_flr", "fkr_whdls"],
	["CM.comPinHost"] :			["lock_host", "lockhost","host_lock", "hostlock", "락_호스트", "락호스트", "호스트_락", "호스트락", "ㅣㅐ차_ㅙㄴㅅ", "ㅙㄴㅅ_ㅣㅐ차", "fkr_ghtmxm", "ghtmxm_fkr"],
	/* 비밀번호 */
	["CM.comSetPassword"] :		["set_pw", "set_password"],
	["CM.comClearPassword"] : 	["clear_pw", "clear_password"],
	["CM.comShowPassword"] :	["show_pw", "show_password"],
	["CM.comSetScore"] :		["score", "ㄴ책ㄷ", "스코어", "점수", "smzhdj", "wjatn"],	/* 점수 지정 */
	["CM.comSetTime"] :			["time", "타임", "시간", "샤ㅡㄷ", "xkdla", "tlrks"],		/* 시간 지정 */
	["CM.loadMap"] :			["load", "map", "로드", "맵", "ㅣㅐㅁㅇ", "fhem", "ㅡ메"],
	["CM.alertSpam"] :			["도배방지", "도배", "도", "ehqo"],							/* 반복 채팅 방지 문자 출력 */
	["CM.comMute"] :			["mute", "ㅡㅕㅅㄷ", "채팅금지", "채금", "뮤트", "abxm"],
	["CM.comUnmute"] :			["unmute", "ㅕㅜㅡㅕㅅㄷ", "채팅허용", "채금풀기"],
	["CM.comRecording"] :		["rec", "녹화", "shrghk"],									/* 녹화 시작 및 종료 */
	["CM.infoLink"] :			["link", "url", "링크", "주소", "ㅣㅑㅜㅏ", "ㅕ기", "fldzm", "wnth"],
	["CM.infoRoom"] :			[									/* 서버 정보 */
		"about", "aboutinfo", "info", "system", "aboutver", "verinfo", "version", "버전", "ver", "정보", "wjdqh", "tltmxpa"
	],
	["CM.btg"]		: ["알파고", "파고", "배타고", "베타고", "타고", "alphaGo", "AlphaGo", "alphago", "betaGo", "BetaGo", "betago"]			//	이스터 에그
}
const standardCommands	= {							/*** 표준 명령어 ***/
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
	["CM.comPrivateChat"] :		["e", "귓속말", "귓말", "귓", "개인", "ㄷ",	"rnltthrakf", "rnltakf", "rnlt"],
	/* 등번호 설정 및 초기화 */
	["CM.comAvatar"] :			["avatar", "아바타", "ㅇㅂㅌ", "ㅁㅍㅁㅅㅁㄱ", "등번호", "emdqjsgh"],
	["CM.comResetAvatar"] :		["clear_avatar", "reset_avatar", "avatar_clear", "클리어_아바타", "ㅋㄹㅇ_ㅇㅂㅌ", "칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ", "리셋_아바타", "clearavatar", "resetavatar", "클리어아바타", "아바타클리어", "ㅋㄹㅇㅇㅂㅌ", "칟ㅁㄱㅁㅍㅁㅅㅁㄱ", "리셋아바타", "초기화아바타", "아바타초기화", "초기화_아바타", "아바타_초기화"],
	/* 채팅 모드 설정 */
	["CM.comChatMode"] :		["chatmode", "촘스ㅐㅇㄷ", "챗모드", "채팅모드", "챗", "채팅", "cotahem", "coxldahem", "cot", "coxld"],
	/* 수신 설정 */
	["CM.comLockPrivateChat"] :	["lock_private", "lock_private_chat", "락_귓속말", "락_귓말", "ㅣㅐ차_ㅔ걒ㅁㅅㄷ"],
	/* 게임 참가 및 설정 */
	["CM.comJoin"] :			["join", "enter", "참가", "참여", "입장", "투입", "조인", "참여", "ㅓㅐㅑㅜ", "둣ㄷㄱ", "ckark", "ckadu", "xndlq"],
	["CM.comAfk"] :				["afk", "ㅁ라", "잠수", "wkatn"],
	/* 전적 및 랭킹 */
	["CM.infoStats"] :			["stats", "stat", "record", "기록", "스탯", "전적", "wjswjr", "tmxot"],
	["CM.infoRanking"] :		["ranking", "rank", "랭킹", "랭", "순", "순위", "fodzld", "fod", "tnsdnl", "gof"],
	/* 맵 정보 */
	["CM.infoMaps"] :			["maplist", "map_list", "maps", "cm", "맵리스트", "맵목록", "map", "맵", "유즈맵", "page", "페이지", "ㅔㅁㅎㄷ", "vpdlwl", "츠"],
}
let customCommands		= {							/*** 추가 명령어 ***/
	/***
		-UMUX 커스텀 명령어입니다.
		-신규 명령어 추가에 적합하며, 권장합니다.
	***/
}
/*** room 객체 이벤트 ***/
room.onGameStart			= (byPlayer)	=> GM.onGameStart(byPlayer);		/* 게임 시작 이벤트 */
room.onGameTick				= ()			=> GM.onGameTick();					/* 게임 진행 이벤트 */
room.onGameStop				= (byPlayer)	=> GM.onGameStop(byPlayer);			/* 게임 종료 이벤트 */
room.onGamePause			= (byPlayer)	=> GM.onGamePause(byPlayer);		/* 게임 중지 이벤트 */
room.onGameUnpause			= (byPlayer)	=> GM.onGameUnpause(byPlayer);		/* 게임 재개 이벤트 */
room.onKickRateLimitSet		= function(min, rate, burst, player){		/* 킥 제한 이벤트 */
	GM.onKickRateLimitSet(min, rate, burst, player);
}
room.onPlayerActivity		= (player) => PM.onPlayerActivity(player);	/* 플레이어 동작 응답 이벤트 */
room.onPlayerAdminChange	= function(givenPlayer, byPlayer){			/* 권한 변경 이벤트 */
	AMN.onPlayerAdminChange(givenPlayer, byPlayer);
}
room.onPlayerBallKick		= (player)	=> GM.onPlayerBallKick(player);	/* 킥 판정 이벤트 */
room.onPlayerChat			= function(player, msg){ 					/* 채팅 입력 이벤트 */
	CS.onPlayerChat(player, msg);
	return false;					//	채팅 창에서 명령어 입력 기록 지우기
}
room.onPlayerJoin			= function(player){										/* 플레이어 입장 이벤트 */
	GM.onPlayerJoin(player);
}
room.onPlayerLeave			= function(player){ 									/* 플레이어 퇴장 이벤트 */
	let target = PM.findPlayerById(player.id);
	TM.addTimer("gm_onPlayerLeave", () => GM.onPlayerLeave(target));
}
room.onPlayerKicked			= function(kickedPlayer, reason, ban, byPlayer){		/* 플레이어 강제 퇴장 이벤트 */
	AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);
}
room.onPlayerTeamChange		= function(player, byPlayer){ 							/* 팀 교체 이벤트 */
	PM.onPlayerTeamChange(player, byPlayer);
	SC.onPlayerTeamChange(player, byPlayer);
}
room.onPositionsReset		= function(){								/* 득실점 판정 직후 참가자 좌표 초기화 */
	GM.onPositionsReset();
	SC.onPositionsReset();
}
room.onStadiumChange		= function(newMap, byPlayer){				/* 맵 교체 이벤트 */
	GM.onStadiumChange(newMap, byPlayer);
}
room.onRoomLink				= (url)		=> GM.onRoomLink(url);			/* 링크 업로드(서버 불러오기) */
room.onTeamGoal				= (team)	=> GM.onTeamGoal(team);			/* 골 판정 이벤트 */
room.onTeamVictory			= (scores)	=> GM.onTeamVictory(scores);	/* 팀 승리 이벤트 */
