/***
<ABOUT>
	Version 5.0 r6
	Level 11(Build 1075.16570)
<README>
	유즈맵 대표카페(이하 UM)에서 진행하고 있는
	Haxball Headless Host API 기반의 유즈맵 봇방 프레임워크로,
	
	아래 문서상의 조건을 위배하지 않는다면 누구나 자유롭게 수정이 가능합니다.
	- 사용자 가이드라인:	github.com/HonestSquare/UMUX/wiki/UMUX-User-Guidelines
	- 라이센스:				github.com/HonestSquare/UMUX/blob/master/LICENCE
	개발자를 위해 소스를 분석하고 해석한 참고서도 제공하고 있습니다.
	- UMUX 레퍼런스:		github.com/HonestSquare/UMUX/wiki/UMUX-Reference
***/
/***
	서버 초기 설정
	-서버 이름
	-서버 설명
	-최대 접속 인원
	-호스트 이름
	-서버 공개 여부
***/		
"use strict";
const	ROOMNAME 	= "제목 없음";
const	DESCRIPTION	= "봇방입니다.";
const	MAXLIMIT	= 12;
const	HOSTNAME 	= "서버 매니저";
const	PUBLIC		= true;
const	TOKEN		= "thr1.AAAAAGdvqUFlFv-2Qahimg.Uz2kVFJ-XN8";
const	NOPLAYER	= true;
/*** 언어 지역 코드, 위도, 경도 ***/
const	LANG_CODE	= "ko-KR";
const	REGION_CODE	= "kr";
const	LAT			= 37.566667 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
const	LON			= 126.978406 + (Math.floor(Math.random() * 4000) - 2000) / 10000;
let		PASSWORD	= " ";

const MAXPLAYERS 	= (MAXLIMIT < 2 ? 2 : (MAXLIMIT > 30 ? 30 : MAXLIMIT));
const INITSERVER	= str => ({         /* 시스템 초기화 */
    roomName: ROOMNAME, maxPlayers: MAXPLAYERS, playerName : HOSTNAME, public : PUBLIC, token : TOKEN, noPlayer : NOPLAYER,
	password: str == undefined || str.trim().length == 0 ? null : str,
	geo: { code: REGION_CODE, lat: LAT, lon: LON }
});
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
const ROOM			=  await HBInit(INITSERVER(PASSWORD));
const requestExternalFile = ln => fetch(ln).then((response) => response.text()).then(res => {
	return Promise.all(res);
});
const convertScript = async(ln) => {
	let removeComments = str => str.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,'');
	let jn = (await requestExternalFile(ln)).join('');
	let vb = JSON.parse(removeComments(jn));
	return vb;
}
const c_ADMIN_TYPE     = Object.freeze({        /* 권한 유형 */
    NON_ADMIN: 0, CORE_ADMIN: 1, SUPER_ADMIN: 2
});
const c_TEAM			= Object.freeze({		/* 팀 유형 */
	SPECTATOR:  0, RED: 1, BLUE:    2
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
    BG_PROG_INGAME: "7CA78B",
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
const c_LIST_EMOTION	= Object.freeze([		/* 이모티콘 */
	'🤔', 
	'😍', '🤣', '😎', '😐', '😰', 
	'🙄', '😴', '🥶', '😱'
]);
const c_TIME_TYPE	= Object.freeze({			/* 시간 출력 형식 */
	CORE: 0, NORMAL: 1, FULL: 2
});
const c_TAG_NOTFCN	= Object.freeze({			/* 알림 태그 */
	CAUTION : 100, WARNING : 101, PERMISSION_REQUIRED : 102, LOCKED : 103,
	NOTITLE : 200, BRIEF : 201,
	DETAILED : 300, EXTENDED : 301
});
const c_TAG_GRADE	= Object.freeze([			/* 최고 권한, 보조 권한, 일반, 블랙리스트 */
	"ⓧ", "●", "ⓞ", "◯", "㉤",
]);
const c_TAG_TEAM	= Object.freeze({			/* 관전, 레드, 블루 */
	[c_TEAM.SPECTATOR]:	'ⓢ',
	[c_TEAM.RED]:		'ⓡ',
	[c_TEAM.BLUE]:		'ⓑ'
});
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

/*** 맵 초기화 ***/
let defaultStadiumList	= new Array();
let customStadiumList	= new Array();
const initStadiums = async function(links){
	defaultStadiumList = [
		"Classic", "Easy", "Small", "Big", "Rounded", "Hockey",
		"Big Hockey", "Big Easy", "Big Rounded",
		"Huge"
	];
    let isValidHttpUrl = function(str){
        let url;
        try{
            url = new URL(str);
        } catch(_){
            return false;
        }
        return ["https", "http"].includes(url.protocol.replace(':', ''));
    }
	let request = async function(ln){
		let rl = await Promise.all(ln);
		for(let r of rl){
			let st = isValidHttpUrl(r) ? (await requestExternalFile(r)).join('') : r;
			customStadiumList.push(st);
		}
	}
	request(links);
}
initStadiums([
	"https://raw.githubusercontent.com/HonestSquare/UMUX/master/CROP-900M.hbs"
]);
class GameManager{              /*** 게임 매니저 클래스 ***/
	#afkLimitTime;									/* 장기 무응답 플레이어 판정 최소 시간(초 단위) */
	#gameEventStats			= c_GAME_STATS.STOP;	/* 경기 진행 상태 */
	#gameLink				= null;					/* 서버 링크 */
	#firstTimeNotified		= 0;					/* 최초 도달 시간 */
	#isRecording			= false;				/* 녹화 여부 */
	#lastTimeNotified		= 0;					/* 최근 도달 시간 */
	#repeatedLimitTime;								/* 반복 채팅 판정 최대 시간(밀리초 단위) */
	#timeLimit;										/* 도달 기준 시간(초 단위) */
	#timeLimitReached		= false;				/* 시간 도달 여부 */
	#totalMatch				= 0;					/* 누적 경기 횟수 */

	constructor(afkLimitTime, rptLimitTime, timeLimit){
		(async function(t){
			t.#afkLimitTime				= afkLimitTime;			/* 장기 무응답 플레이어 판정 최소 시간(초 단위) */
			t.#repeatedLimitTime		= rptLimitTime;			/* 반복 채팅 판정 최대 시간(밀리초 단위) */
			t.#timeLimit				= timeLimit;			/* 도달 기준 시간(초 단위) */	
		})(this);
	}
				
	get afkTime(){											/* 장기 무응답 판정 최소 시간 구하기 */
		let lt = this.#afkLimitTime;
		return (SYS.hasInRange(lt, 10, 60 * 60 * 3) ? lt : 0);
	}
	get gameLink(){		return this.#gameLink; }			/* 서버 링크 */
	get gameStats(){	return this.#gameEventStats; }		/* 경기 진행 상태 */
	get recStats(){		return this.#isRecording; }			/* 녹화 상태 */
	get rptTime(){		return this.#repeatedLimitTime; }	/* 반복 채팅 판정 최대 시간 */
	get sumMatch(){		return this.#totalMatch; }			/* 누적 경기 횟수 */

	set afkTime(v){ 		/* 장기 무응답 판정 최소 시간 지정 */
		if(typeof v != "number"){
			this.#afkLimitTime = 0;
			NC.notice("비활동 상한 시간이 비활성화되었습니다.");
			return LM.log(true, "비활동 상한 시간이 비활성화됨.", c_LOG_TYPE.NOTICE);
		}
		if(!SYS.hasInRange(v, 10, 60 * 60 * 3)) return LM.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		if(this.afkTime == v) return LM.log(false, "중복된 값으로 접근됨", c_LOG_TYPE.WARNING);
		this.#afkLimitTime = v;
		//	마지막 활동 시간 저장
		PM.findPlayerList().forEach(p => p.updateTime(TM.date.time));
		NC.notice("비활동 상한 시간이 %d초로 변경되었습니다.", null, null, this.afkTime);
		LM.log(true, "비활동 상한 시간이 %d초로 변경됨.", c_LOG_TYPE.NOTICE, this.afkTime);
	}
	set gameLink(v){		/* 서버 링크 */
		if(this.gameLink != null) throw LM.error("이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.");
		Object.freeze(this.#gameLink = v);
	}
	set gameStats(v){		/* 경기 진행 상태 */
		this.#gameEventStats = v;
	}
	set recStats(v){		/* 녹화 상태 */
		this.#isRecording = v;
	}

	onGamePause(player){ 				/* 경기 중단 이벤트 */
		let isValidByPlayer = PM.isValid(player);
		this.gameStats = c_GAME_STATS.PAUSE;
		if(isValidByPlayer) PM.updateTime(player.id, TM.date.time);			//	마지막 활동 시간 저장
		LM.log(true, isValidByPlayer ? "%0(이)가 경기를 중단함" : "[%0]", c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player.id) : "경기 중지");
		TM.clearTimerByName("goal");	//	타이머 제거
		SYS.updateDashboard();
	}
	onGameStart(player){				/* 경기 시작 이벤트 */
		let isValidByPlayer = PM.isValid(player);
		this.handleGameStart();			//	경기 제어 준비
		LM.log(true, isValidByPlayer ? "%0(이)가 경기를 시작함" : "[%0]", c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player.id) : "경기 시작");
	}
	onGameStop(player){					/* 경기 종료 이벤트 */
		let isValidByPlayer = PM.isValid(player);
		this.gameStats = c_GAME_STATS.STOP;
		SC.clearTouchedList();						//	선두자 명단 모두 지우기
		TM.clearTimerByName("goal");				//	타이머 제거
		if(PM.isValid(player)) PM.updateTime(player.id, TM.date.time);		//	마지막 활동 시간 저장
		LM.log(true, isValidByPlayer ? "%0(이)가 경기를 종료함" : "[%0]", c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player.id) : "경기 종료");
		SYS.updateDashboard();
	}
	onGameTick(){						/* 경기 진행 이벤트 */
		if(TM.date.time >= this.#firstTimeNotified + SEC_TO_MS / 10){	//	100ms 마다 처리
			this.#firstTimeNotified = TM.date.time;						//	최근 기록 시간을 현재 시간으로 변경
			this.handleGameTick(this.#firstTimeNotified);			//	경기 제어 처리
		}
	}
	onGameUnpause(player){				/* 경기 재개 이벤트 */
		let isValidByPlayer = PM.isValid(player);
		this.gameStats = c_GAME_STATS.TICK;
		if(PM.isValid(player)) PM.updateTime(player.id, TM.date.time);	    //	마지막 활동 시간 저장
		LM.log(true, isValidByPlayer ? "%0(이)가 중단된 경기를 재개함" : "[%0]", c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player.id) : "경기 재개");
		SYS.updateDashboard();
	}
	onKickRateLimitSet(					/* 킥 제한 이벤트 */
		min, rate, burst, player){
	
	}
	onPlayerBallKick(player){ 			/* 플레이어 킥 판정 이벤트 */
		SC.addTouchedList(player.id);
	}
	onPlayerJoin(player){				/* 플레이어 입장 이벤트 */
		let pp = PM.addPlayerList(player);				//  플레이어 데이터베이스 추가
		if(SYS.isDevMode) NC.caution("이 서버는 개발 중이므로, 게임 플레이가 원활하지 않을 수 있습니다.", pp.id);
		let hasVisitRecord = PM.updateAccount(pp.id);	//	계정 데이터베이스 갱신
		let indexBlacklist = (AMN.isBlacklist(pp.id, true) ? 2 : AMN.isBlacklist(pp.id, false) ? 1 : 0);
		SYS.addPlayerById(pp.id);						//	플레이어 인덱스 추가
		LM.log(true, "%0: %1%2", c_LOG_TYPE.BELL, [
			(hasVisitRecord ? "재입장": "입장"),
			pp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC),
			(indexBlacklist > 0 ? "(블랙리스트)" : '')
		]);
		if(indexBlacklist > 1){
            let bp = AMN.findBlacklistByPlayer(pp.id, true);
            let detail = NC.fmtStr(bp.rsn == null || CS.isWhiteSpace(bp.rsn) ? "%0" : "%0: %1", ["차단된 계정", Array.isArray(bp.rsn) ? bp.rsn.join('/') : bp.rsn]);
			return AMN.kickPlayer(pp.id, "%0%1", false, [c_LIST_ICON.NEGATIVE_BOLD, detail]);
        }
		let hasSamePlayer = AMN.hasMatchedConnection(pp.id);
        if(indexBlacklist < 1){                             //	입장 문구 출력
            let title = NC.fmtStr("#%d", pp.id);
			NC.uniMsg(title, "%d, %d님!", pp.id, "!help, !join", 0,
			[(hasVisitRecord ? "다시 환영합니다" : "안녕하세요"), pp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME)]);
        }
        else if(hasSamePlayer)                              //	(슈퍼)블랙리스트, 중복 접속, 사칭, 다중 접속 탐지
			NC.warning("%d님은 관심 대상입니다.", pp.id, null, pp.showPlayerInfo(c_PLAYERINFO_TYPE.LOCAL));
		if(PM.cntPlayers() < 2){							//	접속자가 2인 미만이면
			PM.moveTeam(pp.id, c_TEAM.RED);				//	투입하고
			room.startGame();								//	게임 시작
		}
		AMN.updateAdmins();									//	권한 갱신
		if(this.recStats)								//	녹화 중이면 별도 알림
			NC.extMsg(null, c_LIST_ICON.POSTIVE_BOLD + "녹화 중", pp.id, null, c_LIST_COLOR.RED, null, SEC_TO_MS / 4);
        let agTimer = TM.addTimer("alertGameTime", () => {
            let target = agTimer.findTimerByName().at(-1);
            if(target == undefined) return false;
			let title = NC.fmtStr("%d시간 동안 플레이 했습니다", agTimer.calcTotalSequence(target.seq) + 1);
			NC.caution(title, "과도한 게임 이용은 정상적인 일상생활에 지장을 줄 수 있습니다", agTimer.player, null, null);
        }, pp.id, SEC_TO_MS * 60 * 60, true);
		return hasVisitRecord;
	}
	onPlayerLeave(player){				/* 플레이어 퇴장 이벤트 */
		if(!player.hasKicked)
			LM.log(true, AMN.isBlacklist(player.id) ? "퇴장: %0(%1)" : "퇴장: %0", c_LOG_TYPE.BELL, [
				player.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC), "블랙리스트"
			]);
		player.clearPlayer();									//	플레이어 데이터베이스 지우기
		if(PM.cntPlayers() > 0) return AMN.updateAdmins();		//	접속자가 있으면 권한 갱신
		room.stopGame();
		AMN.updatePassword();									//	접속자가 없으면 비밀번호 초기화
	}
	onPositionsReset(){		 			/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */
	
	}
	onRoomLink(address){				/* 주소 갱신 이벤트 */
		let shortLink	= iframeEle.getElementById("roomlink");
		shortLink.innerHTML = NC.fmtStr("서버 주소: <%0 href=\"%1\" target=\"_blank\"> %1</%0>", ['a', address]);
		if(!SYS.hasInitSrv){		    //	객체 초기화가 필요한 경우
			SYS.initSystem(address);	//	서버 초기화
			SYS.initDashboard();		//	대시보드 초기화
			LM.log(false, "서버 가동 시작", c_LOG_TYPE.BINDING);
			return;
		}
		NC.notice("서버가 복구되었습니다");
		LM.log(true, "서버 복구 완료", c_LOG_TYPE.WARNING);
	}
	onStadiumChange(newMap, byPlayer){	/* 맵 교체 이벤트 */
		let target = this.findStadiumNameList().indexOf(newMap);
		if(target != AMN.defStdm
		&& SYS.hasInRange(target, 0, customStadiumList.length - 1) == true){		//	맵 고정 설정
			if(AMN.lockStadium == false || AMN.defStdm == null)
                AMN.updateDefaultStadium(target);
		}
		if(!PM.isValid(byPlayer)) return LM.log(true, "맵 교체: %d", c_LOG_TYPE.NOTICE, newMap);
        let tp = PM.findPlayerById(byPlayer.id);
		tp.updateTime(TM.date.time);                 //	마지막 활동 시간 저장
		if(AMN.lockStadium){					//	맵 고정 확인
			this.loadMap(AMN.defStdm);
			return NC.access(tp.id, "맵이 고정돼 있어 교체할 수 없습니다.");
		}
		LM.log(true, "%1(이)가 맵을 %0(으)로 교체함", c_LOG_TYPE.NOTICE, [newMap, tp.showPlayerInfo()]);
		let hasMatchedName	= function(a, b){	//	이름 일치 확인
			if(a == undefined || b == undefined) return false;
			let numStr = /[0123456789]/gi;
			return a == (numStr.test(a) ? b : b.replace(numStr, ''));
		}
		if(![		//	경기장 블랙리스트
			"rip host",
			"maymun cetesi tarafindan ziyaret edildin",
			"İŞİD BOMBACISI EBU BEKUR TARAFINDAN PATLAMAYA MARUZ KALDIN",
			"Arabadan Atladı Amı Patladı",
			"hadi siktirin gidin"
		].some(m => hasMatchedName(m.toLowerCase(), newMap.toLowerCase().replace(" from haxmaps", '')))) return;
		GM.loadMap(0);
		AMN.addBlacklistByPlayer(tp.id, true, "맵 테러");
	}
	onTeamGoal(team){ 					/* 골 판정 이벤트 */
		let lastTouchedPlayer = SC.lastTouchedPlayer;		//	선두자
		let getAssistant = function(p){
			if(p == undefined) return 0;
			if(p.team == team) return SC.findAssist(p);
			let al = SC.tchdLst.filter(tp => tp.team == team);
			return al == undefined ? 0 : SC.findAssist(al[0]);
		}
		let assist = getAssistant(lastTouchedPlayer);						//	어시스트
		let attacker = !lastTouchedPlayer ? 0 : lastTouchedPlayer.id;		//	공격자
		let attackTeam = PM.isValid(attacker) == true && PM.hasJoined(attacker) == true ? lastTouchedPlayer.team : team;	//	공격 팀
		let defendTeam = team == c_TEAM.RED ? c_TEAM.BLUE : c_TEAM.RED;														//	방어 팀
		let showGoalRecord = function(attack, defend, player, assist){
			let getGoalType = (a, d) => (a == d ? "실점" : "득점");			//	득실점 구하기
			let getTime = function(time){									//	골 판정 시간 구하기
				let fl = t => SYS.fillLine(Math.floor(t), 2);
				return NC.fmtStr("%d:%d", [fl(time / 60), fl(time % 60)]);
			}
			//	공격 선수 또는 팀 구하기
			let getAttacker	= (t, p) => (PM.isValid(p) == false || PM.hasJoined(p) == false) ? GM.findTeamName(t) : NC.fmtStr("%d님", SYS.showPlayerInfo(p, c_PLAYERINFO_TYPE.NAME));
			let sendMsg = function(...rd){
				if(rd.length < 2) throw LM.error(c_ERROR_TYPE.E_ETC);
				let title = NC.fmtStr("%0➡%1: %2 %3(%4)", [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), GM.findTeamName(rd[0]), getGoalType(rd[0], rd[1]), getTime(SC.gameTime)]);
				let color = rd[1] == c_TEAM.BLUE ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE;
				switch(rd.length){
					case 2:		//	공격 팀→방어 팀
						NC.extMsg(title, "%1이 %0했습니다", null, null, color, null, 0, [getGoalType(rd[0], rd[1]), getAttacker(rd[0])]);
						return LM.log(true, "%0➡%1 득점: %2", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), getAttacker(rd[0])]);
					case 3:		//	공격 팀→방어 팀: 득점자
						NC.extMsg(title, "%1이 %0했습니다", null, null, color, null, 0, [getGoalType(rd[0], rd[1]), getAttacker(rd[0], rd[2])]);
						return LM.log(true, "%0➡%1 공격: %2", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2])]);
					case 4:		//	공격 팀→방어 팀: 득점자(어시스트 포함)
						NC.extMsg(title, ["%1이 %0했습니다", "(도움: %2)"].join(newLine), null, null, color, null, 0,
						[getGoalType(rd[0], rd[1]), getAttacker(rd[0], rd[2]), SYS.showPlayerInfo(rd[3].id, c_PLAYERINFO_TYPE.NAME)]);
						return LM.log(true, "%0➡%1 공격: %2(도움: %3)", c_LOG_TYPE.NOTICE, [PM.findTagTeam(rd[0]), PM.findTagTeam(rd[1]), SYS.showPlayerInfo(rd[2]), SYS.showPlayerInfo(rd[3].id)]);
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
						|| PM.findPlayerById(t).team != attack){	//	팀을 옮긴 경우
							PM.resetAvatar(t);
							return;
						}
						if(s % 2 == 0) PM.giveAvatar(t, c);
						else PM.resetAvatar(t);
					}
					let target = goalTimer.findTimerByName().at(-1);
					if(target == undefined) return false;
					let currentOrder = goalTimer.calcCurrentSequence(target.seq, 2);
					let totalSequence = goalTimer.calcTotalSequence(target.seq);
					showAvatar(currentOrder, goalTimer.player, '⚽');
					if(PM.isValid(assist)) showAvatar(currentOrder, assist, '👍');
					if(totalSequence > 5) return goalTimer.clearTimerByName();
				},
				TERMINATE : () => {
					PM.resetAvatar(goalTimer.player);
					if(PM.isValid(assist)) PM.resetAvatar(assist);
				}
			}, player, SEC_TO_MS / 2, true, true);
		}
		//	전적 갱신
		if(PM.isValid(attacker)){
			let getRankPlayer = p => SC.findRankListByPlayer(p);
			let tr = getRankPlayer(attacker);
			let sr = getRankPlayer(assist);
			if(attackTeam == defendTeam) tr.owgl += 1;
			else tr.goal += 1;
			if(PM.isValid(sr)) sr.asst += 1;
		}
		if(attackTeam != defendTeam) SC.updateGoals(team);					//	득점 데이터 갱신
		SYS.updateDashboard();													//	대시보드 갱신
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
			let rp = SC.findRankListByPlayer(p.id);
			if(rp != undefined){	//	랭킹 갱신
				if(p.team == winner) rp.win += 1;
				else if(p.team != c_TEAM.SPECTATOR) rp.lost += 1;
			}
		}
		NC.extMsg(c_LIST_ICON.NORMAL_BOLD + "경기 종료", "%d이 승리하였습니다.",		//	경기 종료 및 승패 결과 출력
		null, "!ranking", (winner == c_TEAM.RED ? c_LIST_COLOR.TEAM_RED : c_LIST_COLOR.TEAM_BLUE), null, 0, this.findTeamName(winner));
		LM.log(true, "%d 승리", c_LOG_TYPE.NOTICE, this.findTeamName(winner));
	}

	handleGameStart(){				/* 경기 제어 준비 */
		this.gameStats = c_GAME_STATS.START;	//	게임 상태 갱신
		this.#totalMatch++;						//	누적 경기 횟수 반영
		this.#firstTimeNotified = TM.date.time;		//	최초 기록 시간 초기화
		this.#lastTimeNotified = TM.date.time;		//	최근 기록 시간 초기화
		this.#timeLimitReached = false;			//	기준 시간에 미도달한 상태로 초기화
		SC.clearTouchedList();					//	선두자 명단 모두 지우기
		for(let p of PM.findPlayerList().filter(p => p.team != c_TEAM.SPECTATOR)){
			p.updateTime(TM.date.time);				//	마지막 활동 시간 저장
		}
	}
	handleGameTick(currentTime){	/* 경기 제어 처리 */
		if(this.gameStats != c_GAME_STATS.TICK){ 
			this.gameStats = c_GAME_STATS.TICK;
			SYS.updateDashboard();
		}
		for(let p of PM.findPlayerList().filter(p => p.team != c_TEAM.SPECTATOR)){	//	선두자 명단 갱신
			SC.updateTouchedList(p.id);
		}
		if(this.#timeLimit < 1) return false;										//	범위 내 도달 기준 시간이면 처리 종료
		if(currentTime - this.#lastTimeNotified > this.#timeLimit * SEC_TO_MS){		//	최근 기록 시간에서 도달 기준 시간 이후로 경과된 경우(정기 실행)
			this.#lastTimeNotified = currentTime;									//	최근 기록 시간을 현재 시간으로 변경
			return true;
		}
		if(this.#timeLimitReached == false		//	0초에서 도달 기준 시간 이후로 경과된 경우(한 번만 실행)
			&& (currentTime - this.#lastTimeNotified >= this.#timeLimit * SEC_TO_MS)){
			this.#timeLimitReached = true;		//	시간 도달하였으므로 값을 참으로 변경
			return true;
		}
		return false;
	}

	findStadiumNameList(target){	/* 맵 정보 갱신 */
		let size = customStadiumList.length;
		if(size < 1) return defaultStadiumList;
		let getName = function(st){
            let m = Function(NC.fmtStr('"use strict";return (%d)', st))();
			if(!Object.hasOwn(m, "name")) return "비어 있음";
			if(CS.isWhiteSpace(m.name)) return "제목 없음";
			return m.name;
		}
        if(!SYS.hasInRange(target, 0, size - 1)) return customStadiumList.map(mp => getName(mp));
		return getName(customStadiumList.at(target));
	}
	findTeamName(value, abr){		/* 팀 상태(숫자>문자열) */
		let nameList = {
			[c_TEAM.SPECTATOR] :	["관전석", "관전"],
			[c_TEAM.RED] :			["레드팀", "레드"],
			[c_TEAM.BLUE] :			["블루팀", "블루"]
		}
		if(!Object.hasOwn(nameList, value)) throw LM.error(c_ERROR_TYPE.E_ETC);
        return nameList[value].at(abr ? 1 : 0);
	}

	checkPublicId(msg, player, hasAllRange){	/* #ID 판별 */
		if(!msg) return NC.caution("%d를 포함하십시오.", player, null, '\#');
		if(!msg.includes('\#')) return NC.caution("%d를 포함하십시오.", player, null, '\#');
		let num = parseInt(msg.toString().replace('#', ''));
		if(!PM.isValid(num, true)) return NC.caution("범위를 벗어난 ID입니다.", player);
		if(PM.hasJoined(num) == false && hasAllRange == false) return NC.caution("입력한 ID는 미접속자입니다.", player);
		return num;
	}

	loadMap(target, player){					/* 맵 불러오기 */
		let isValidByPlayer = PM.isValid(player);
		let hasCustomStadiums = (customStadiumList.length > 0);
		let size = (hasCustomStadiums ? customStadiumList : defaultStadiumList).length;
		if(!SYS.hasInRange(target, 0, size - 1)){
			if(isValidByPlayer) return NC.caution("맵 ID가 올바르지 않습니다.", player, "?load");
			return LM.log(true, "맵 데이터를 불러올 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		}
		if(AMN.lockStadium == true && AMN.defStdm != target)	//	맵이 고정된 경우
			return (isValidByPlayer ? NC.access(player, "맵이 고정되어 있어 불러올 수 없습니다.") : LM.log(false, "맵 고정을 해제해야 합니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING));
		if(hasCustomStadiums == true && customStadiumList.at(target) == undefined){			//	맵 파일을 찾을 수 없는 경우
            if(isValidByPlayer) return NC.caution("맵 데이터를 불러올 수 없습니다.", player);
			throw LM.error(c_ERROR_TYPE.E_ETC); 
        }
		room.stopGame();
        AMN.updateDefaultStadium(target);						//	맵 데이터 등록
		if(hasCustomStadiums) room.setCustomStadium(customStadiumList.at(target));
		else room.setDefaultStadium(defaultStadiumList.at(target));
        if(!isValidByPlayer) return;
		LM.log(true, "%1(이)가 %0번 맵으로 교체함", c_LOG_TYPE.NOTICE, [target, SYS.showPlayerInfo(player)]);
        TM.clearTimerByName("loadSystemStadiumByPlayer")
        TM.addTimer("loadSystemStadiumByPlayer", () => {}, player, SEC_TO_MS * 5);
	}
	reorderPlayers(playerIdList, moveToTop){	/* 플레이어 데이터베이스 순번 재정렬 */
		let mvtp = typeof moveToTop === "boolean" ? moveToTop : true;
		let pl = playerIdList == undefined ? PM.findPlayerList().map(p => p.id) : playerIdList;
		room.reorderPlayers(pl, mvtp);
		//	플레이어 데이터베이스에 따라 대시보드 갱신
		PM.findPlayerList().forEach(p => SYS.updatePlayerById(p.id));
	}
	startRecording(hideAnchor){ 				/* 녹화 시작 */
		if(this.recStats) this.stopRecording();
		this.recStats = true;
		NC.extMsg(c_LIST_ICON.POSTIVE_BOLD + "녹화 시작", TM.initDate().showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED, null, (hideAnchor == true ? 0 : 1));
		LM.log(true, "녹화 시작", c_LOG_TYPE.NOTICE);
		room.startRecording();
	}
	stopRecording(){ 							/* 녹화 종료 */
		let file = room.stopRecording();
		this.recStats = false;
		if(!file) throw LM.error("예기치 않는 문제로 인해 녹화 파일을 찾을 수 없음.");
		NC.extMsg(c_LIST_ICON.POSTIVE + "녹화 종료", TM.initDate().showCurrentTime(c_TIME_TYPE.CORE), null, "!rec", c_LIST_COLOR.RED);
		LM.log(true, "녹화 종료", c_LOG_TYPE.NOTICE);
		return file;
	}
}
class Administration{           /*** 관리 클래스 ***/
    #blacklist				= new Array();		/* 블랙리스트 명단 */
	#defaultStadium;	                        /* 고정 맵 데이터 */
	#enableDynamicAdmin;	 	                /* 권한 할당 방식 */
	#isAllowTeamSwitch;		                    /* 플레이어 팀 자율 이동 제한 여부 */
	#isLockStadium;                             /* 맵 고정 여부 */
	#maxAdminLimit;			                    /* 최고 관리자 상한 인원 */
	#pinHost;			                        /* 호스트 팀 이동 허용 여부 */

	constructor(dynamicAdmin,
		isAllowJoin, isLockStadium,
		defaultStadium, maxAdmin, pinHost,
		...blacklist){
		(async function(t){
			t.#defaultStadium		= defaultStadium;	/* 고정 맵 데이터 */
			t.#enableDynamicAdmin	= dynamicAdmin;	 	/* 권한 할당 방식 */
			t.#isAllowTeamSwitch	= isAllowJoin;		/* 플레이어 팀 자율 이동 제한 여부 */
			t.#isLockStadium		= isLockStadium;	/* 맵 고정 여부 */
			t.#maxAdminLimit		= maxAdmin;			/* 최고 관리자 상한 인원 */
			t.#pinHost				= pinHost;			/* 호스트 팀 이동 허용 여부 */
			if(Array.isArray(blacklist)){				/* 블랙리스트 명단 */
				let isWhiteSpace = s => s == undefined || s == 'ㅤ' ? true : s.trim().length == 0;	/* 공백 문자 확인 */
				let initBlacklist = function(s, n, c, r){
					if(n == undefined && c == null) return;
					if(!Array.isArray(c)) return t.addBlacklist(s, n, c, r);
					for(let k of SYS.generateNumberArray(c.length)){
						t.addBlacklist(s, n, c.at(k), r);
					}
				}
				async function loadDefaultBlacklist(l){
					const dsl = await convertScript(l);
                    if(!dsl.support_version.includes(SYS.verUMUX)) return -1;
					for await(const e of dsl.users){
						initBlacklist(e.super, e.nickname, e.address, e.reason);
					}
				}
				loadDefaultBlacklist("https://raw.githubusercontent.com/HonestSquare/UMUX/master/5%20Evry/userBlacklist.json");
				for(let e of blacklist.at(0).filter(e => SYS.hasInRange(e.length, 2, 4) == true)){
					let isSuper = (e.at(0) == true);
					let name = isWhiteSpace(e.at(1)) ? undefined : e.at(1);
					let conn = e.length > 2 ? e.at(2) : null;
					let reason = e.length > 3 ? e.at(3) : null;
					initBlacklist(isSuper, name, conn, reason);
				}
			}
		})(this);
	}

	onPlayerAdminChange(givenPlayer, byPlayer){				/* 권한 변경 이벤트 */
		let isValidByPlayer = PM.isValid(byPlayer);
		let newAdmin = SYS.showPlayerInfo(givenPlayer.id, c_PLAYERINFO_TYPE.NAME);
		let byAdmin = (isValidByPlayer ? SYS.showPlayerInfo(byPlayer.id, c_PLAYERINFO_TYPE.NAME) : false);
		let target = PM.findPlayerById(givenPlayer.id);
        let time = TM.date.time;
		PM.updateTime(givenPlayer.id, time);			//	마지막 활동 시간 저장
		if(byAdmin != false) PM.updateTime(byPlayer.id, time);
		if(givenPlayer.admin == true){			    //	권한 획득(최고 권한 부여)
			switch(target.admin){
				case c_ADMIN_TYPE.NON_ADMIN:		//	무권한 → 최고 권한
					break;
				case c_ADMIN_TYPE.CORE_ADMIN:		//	보조 권한 → 무권한
					return room.setPlayerAdmin(givenPlayer.id, false);
			}
			if(this.isBlacklist(givenPlayer.id)) return target.deleteAdmin();			//	블랙리스트이면 보조 권한으로 부여
			if(this.cntAdmins(c_ADMIN_TYPE.SUPER_ADMIN) >= this.maxAdmin) return target.deleteAdmin();		    //	최고 관리자 최대 인원을 초과하면 보조 권한으로 부여
		}
		else{				//	권한 해제(보조 권한 부여)
			switch(target.admin){
				case c_ADMIN_TYPE.SUPER_ADMIN:		//	최고 권한 → 보조 권한
					return target.giveAdmin(true);
				case c_ADMIN_TYPE.CORE_ADMIN:		//	보조 권한 → 무권한
					return target.deleteAdmin(true);
				default:	//	최고 권한 → 무권한
					return;
			}
		}
		target.admin = c_ADMIN_TYPE.SUPER_ADMIN;
		NC.notice(isValidByPlayer ? "%1님이 %0님에게 최고 권한을 부여했습니다." : "%0님에게 최고 권한이 부여되었습니다", null, null, [newAdmin, byAdmin]);
		LM.log(true, isValidByPlayer ? "%1(이)가 %0에게 최고 권한을 부여함." : "%0에게 최고 권한이 부여됨.",
			c_LOG_TYPE.BELL, [target.showPlayerInfo(), isValidByPlayer ? SYS.showPlayerInfo(byPlayer.id) : ''
		]);
		SYS.updatePlayerById(givenPlayer.id);		//	플레이어 데이터베이스에 따라 대시보드 갱신
	}
	onPlayerKicked(kickedPlayer, reason, ban, byPlayer){	/* 플레이어 강제 퇴장 이벤트 */
		let banType = ban == true ? "영구" : "강제";
		let kp = PM.findPlayerById(kickedPlayer.id);
		let bp = PM.isValid(byPlayer) ? PM.findPlayerById(byPlayer.id) : null;
		kp.hasKicked = true;
		if(reason == "Bad actor"){
			NC.notice("%0님이 오류 감지 시스템으로 인해 %1 퇴장되었습니다.", null, null, [kp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME), banType]);
			throw LM.error("%0(이)가 오류로 인해 %1 퇴장됨.", [kp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC), banType]);
		}
		let rsn = NC.fmtStr(reason ? "%1%0%2" : "%0", [reason, '(', ')']);
		LM.log(true, bp == null ? "%0(을)를 %1 퇴장함%2" : "%3(이)가 %0(을)를 %1 퇴장함%2",
			c_LOG_TYPE.WARNING, [kp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC),
				banType, rsn, bp == null ? '' : bp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)
		]);
		if(bp == null) return;
		bp.updateTime(TM.date.time);				//	마지막 활동 시간 저장
	}

	get allowJoin(){			return this.#isAllowTeamSwitch; }	/* 플레이어 팀 자율 이동 */
	get bl(){					return this.#blacklist; }			/* 블랙리스트 명단 */
    get defStdm(){              return this.#defaultStadium; }      /* 고정 맵 데이터 */
	get dynmcAdmin(){			return this.#enableDynamicAdmin; }	/* 플레이어 권한 동적 부여 */
	get lockStadium(){			return this.#isLockStadium; }		/* 맵 고정 여부 */
	get maxAdmin(){													/* 관리자 제한 인원 */
		return SYS.hasInRange(this.#maxAdminLimit, 0, MAXPLAYERS, true) ? this.#maxAdminLimit : MAXPLAYERS;
	}
	get password(){				return PASSWORD; }					/* 비밀번호 */
    get pinHost(){              return this.#pinHost; }             /* 호스트 팀 이동 허용 여부 */
	get rstrStadium(){			return this.defStdm; }		        /* 고정 맵 데이터 */

	set allowJoin(bool){		/* 팀 이동 금지 및 허용 */
		if(this.allowJoin == bool) return;
		this.#isAllowTeamSwitch = bool;
		NC.locked(!bool, "팀 자율 이동이 %d되었습니다.", null, null, bool ? "허용" : "금지");
		room.setTeamsLock(!bool);
	}
	set dynmcAdmin(bool){		/* 권한 동적 할당 */
		if(this.dynmcAdmin == bool) return;
		this.#enableDynamicAdmin = bool;
		NC.locked(bool, "권한 할당 작동 방식이 %d(으)로 변경되었습니다.", null, null, bool ? "동적" : "정적");
		LM.log(true, "권한 할당 작동 방식이 %d(으)로 변경됨.", c_LOG_TYPE.BELL, bool ? "동적" : "정적");
	}
	set lockStadium(bool){		/* 맵 고정 */
		if(customStadiumList.length < 1) return LM.log(false, "저장된 맵 데이터가 존재하지 않음.", c_LOG_TYPE.WARNING);
		if(this.defStdm == null) return LM.log(false, "고정 맵 데이터가 존재하지 않음.", c_LOG_TYPE.WARNING);
		if(this.lockStadium == bool) return LM.log(false, "중복된 값으로 접근됨.", c_LOG_TYPE.WARNING);
		this.#isLockStadium = bool;
		NC.locked(bool, "맵 변경이 %d되었습니다.", null, null, bool ? "제한" : "허용");
		LM.log(true, "맵 변경이 %d됨.", c_LOG_TYPE.NOTICE, bool ? "제한" : "허용");
		if(this.lockStadium == true) GM.loadMap(this.defStdm);
	}
	set password(value){		/* 비밀번호 지정 */
		if(SYS.lockedPswd) return LM.log(false, "비밀번호롤 변경하려면 시스템의 비밀번호 고정 장치를 해제하여야 합니다.", c_LOG_TYPE.WARNING);
		this.updatePassword(value);
	}

	initBlacklist(isSuper, name, conn, reason){			/* 블랙리스트 데이터베이스 초기화 */
		let ob = this.bl.find(b => ![b.hasMatchedName(name), b.hasMatchedAddress(conn)].some(v => v == false));
		if(ob == undefined) return new BlacklistSystem(isSuper, name, conn, reason);
		let getReasonType = (o, n) => [
			typeof o == "string", Array.isArray(o)
		].findIndex(f => f == true);
		switch(getReasonType(ob, reason)){
			case 0:
				new Array(ob.rsn, reason);
				break;
			case 1:
				ob.rsn.push(reason);
				break;
			default:
		}
		return ob;
	}

	isBlacklist(player, isSuper){		/* 블랙리스트 감지 */
		if(!PM.isValid(player)) throw LM.error(c_ERROR_TYPE.E_PLAYER_INFO);
		let pName = PM.findPlayerById(player).name;
		let pAddress = this.findAddress(player);
		let target = this.bl.find(b => b.hasMatchedDatabase(pName, pAddress, isSuper));
		if(target == undefined) return false;
		if(target.name == undefined) target.name = pName;					            //	이름 데이터가 비어 있으면 갱신
		else if(target.addr == undefined) target.addr = pAddress;	                    //	주소 데이터가 비어 있으면 갱신
		else this.addBlacklist(isSuper, pName, pAddress, "블랙리스트 우회");			//	데이터베이스 추가
		return true;
	}
	isMute(target){						/* 채금 여부 */
		return PM.findPlayerById(target).isMute;
	}
	hasAdmin(player, level){			/* 권한 여부 확인 */
		let v = PM.findPlayerById(player).admin;
		return SYS.hasInRange(level, 0, 2, true) ? v == level : v > 0;
	}
	hasMatchedConnection(player){		/* 사칭 및 중복 여부 확인 */
		if(PM.cntPlayers() < 2) return false;						        //	접속자 수가 2인 미만이면 처리 중단
		let pp = PM.findPlayerById(player);
		if(PM.isValid(pp) == false || pp.localId == false) return false;	//	접속 상태가 아니면 처리 중단
		for(let tp of PM.findPlayerList().filter(tp => tp.id != pp.id)){
			if(!PM.isValid(tp.id)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
			if(tp.name == pp.name){ 			//	중복 접속 처리
				if(tp.ntwk == pp.ntwk){
					if(SYS.isDevMode)	        //	개발자 모드 기능 제한
						LM.log(false, ["개발자 모드에서는 중복 접속 퇴장 기능이 작동되지 않습니다", "대상: %d"
						].join(newLine), c_LOG_TYPE.BINDING, pp.showPlayerInfo());
					else this.kickPlayer(tp.id, c_LIST_ICON.NORMAL + "중복 접속");
					LM.log(true, "%0(이)가 %1(으)로 중복 접속함", c_LOG_TYPE.NOTICE, [tp.showPlayerInfo(), pp.showPlayerInfo()]);
				}
				else this.kickPlayer(pp.id, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
				return true;
			}
			if(tp.addr == pp.addr){		        //	다중 접속 처리
				if(SYS.isDevMode)		        //	개발자 모드 기능 제한
					LM.log(false, ["개발자 모드에서는 사칭 및 다중 접속 퇴장 기능이 작동되지 않습니다", "대상: %d"
					].join(newLine), c_LOG_TYPE.BINDING, pp.showPlayerInfo());
				else{
					this.addBlacklistByPlayer(pp.id, false, "다중 접속");
					this.kickPlayer(pp.id, c_LIST_ICON.NEGATIVE + "사칭 및 다중 접속");
				}
				LM.log(true, "%0(와)과 %1(이)의 다중 접속이 감지됨.", c_LOG_TYPE.WARNING, [tp.showPlayerInfo(), pp.showPlayerInfo()]);
				return true;
			}
		}
		return false;
	}

	findAddress(target){						/* 플레이어 주소 구하기 */
		return PM.findPlayerById(target).addr;
	}
	findAdminList(level){						/* 관리자 명단 찾기 */
		return PM.findPlayerList().filter(p => AMN.hasAdmin(p.id, level));
	}
	findBlacklistByAddress(conn){				/* IP로 블랙리스트 찾기 */
		return this.bl.filter(bl => bl.addr == conn);
	}
	findBlacklistByName(str){					/* 닉네임으로 블랙리스트 찾기 */
		return this.bl.filter(bl => bl.name == str);
	}
    findBlacklistByPlayer(player, isSuper){     /* 플레이어 ID로 블랙리스트 찾기 */
        let pName = PM.findPlayerById(player).name;
		let pAddress = this.findAddress(player);
        return this.bl.find(b => b.hasMatchedDatabase(pName, pAddress, isSuper));
    }
	findMutedList(isPublic){					/* 채금 명단 구하기 */
		return PM.findPlayerList(isPublic).filter(p => p.isMute == true);
	}
	findNetwork(target){						/* 플레이어 네트워크 구하기 */
		return PM.findPlayerById(target).ntwk;
	}

	addBlacklist(isSuper, name, conn, reason){		    /* 블랙리스트 명단 추가 */
		let nb = this.initBlacklist(isSuper, name, conn, reason);
		if(!this.bl.includes(nb)) this.bl.push(nb);
		return nb;
	}
	addBlacklistByPlayer(target, isSuper, reason){      /* 플레이어를 블랙리스트 명단으로 추가 */
		let pp = PM.findPlayerById(target);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_INFO);
		if(pp.localId > 0 && isSuper == true) this.kickPlayer(target, "%0차단된 계정", false, c_LIST_ICON.NEGATIVE_BOLD);
		return this.addBlacklist(isSuper, pp.name, pp.addr, reason);
	}

	updateAdmins(){			    /* 권한 갱신 */
		if(this.dynmcAdmin == false) return;			//	권한 할당 방식이 정적인 경우 처리 중단
		let players = room.getPlayerList().filter(p => p.id > 0 && p.admin == false);
		if(players.length == 0) return;
		let admins = room.getPlayerList().filter(p => {
			if(p.id < 1) return false;
			if(PM.findPlayerById(p.id).isSleep == true) return false;
			return p.admin;
		});
		if(admins.length > 0) return;					//	최고 권한을 가진 플레이어가 이미 있으면 처리 중단
		players.sort((a, b) => a.id - b.id);			//	공용 ID를 오름차순으로 정렬
		let target = players.filter(p => PM.findPlayerById(p.id).isSleep == false)[0];
		if(!PM.isValid(target)) return;
		if(this.isBlacklist(target.id, false))			//	블랙리스트이면 보조 권한 부여
			return this.giveAdmin(target.id, true);
		this.giveAdmin(target.id);
	}
    updateDefaultStadium(st){   /* 고정 맵 갱신 */
        this.#defaultStadium = st;
    }
	updatePassword(pass){	    /* 비번 갱신 */
		if(!SYS.lockedPswd)
			PASSWORD = (pass == undefined || CS.isWhiteSpace(pass) == true ? null : pass);
		room.setPassword(PASSWORD);
		return PASSWORD;
	}

	clearBans(player){			/* 영구 퇴장 명단 초기화 */
		room.clearBans();
		let isValidByPlayer = PM.isValid(player);
		NC.locked(false, isValidByPlayer ? "%d님이 영구 퇴장 명단을 모두 지웠습니다." : "영구 퇴장 명단이 초기화되었습니다.",
			null, null, isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		);
		LM.log(true, isValidByPlayer ? "%d(이)가 영구 퇴장 명단을 모두 지움" : "영구 퇴장 명단을 초기화 함",
			c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		);
	}
	clearMutedList(player){		/* 채팅 금지 명단 초기화 */
		let isValidByPlayer = PM.isValid(player);
		let ml = this.findMutedList(true);
		if(ml.length < 1)
			return isValidByPlayer ? NC.caution("채팅 금지 명단에 새겨진 기록이 아직 없습니다.", player) : LM.log(false, "이미 데이터가 초기화 되었으므로 접근할 수 없음.", c_LOG_TYPE.WARNING);
		for(let p of ml){
            p.mute(false);
			SYS.updatePlayerById(p.id);
		}
		NC.locked(false, isValidByPlayer ? "%d님이 채팅 금지 명단을 모두 지웠습니다." : "채팅 금지 명단이 초기화되었습니다.",
			null, null, isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		);
		LM.log(true, isValidByPlayer ? "%d(이)가 채팅 금지 명단을 모두 지움" : "채팅 금지 명단을 초기화 함",
			c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		);
	}
	clearPassword(byPlayer){	/* 비번 해제 */
		let isValidByPlayer = PM.isValid(byPlayer);
		if(SYS.lockedPswd){
			if(isValidByPlayer) return NC.access(byPlayer, "시스템에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
			return LM.log(false, "시스팀에서 비밀번호 고정 장치가 활성화 되어 있습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		}
		if(PASSWORD == null){
			if(isValidByPlayer) return NC.caution("비밀번호가 이미 해제되어 있습니다.", byPlayer);
			return LM.log(false, "비밀번호가 이미 해제된 상태입니다.", c_LOG_TYPE.WARNING);
		}
		this.updatePassword();
		NC.locked(false, isValidByPlayer ? "%d님이 비밀번호를 해제하였습니다." : "비밀번호가 해제되었습니다.",
			null, null, isValidByPlayer ? SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) : ''
		);
		LM.log(true, isValidByPlayer ? "%d(이)가 비밀번호를 해제함" : "비밀번호가 해제됨",
			c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(byPlayer) : ''
		);
	}
	deleteAdmin(player, isSub){	PM.findPlayerById(player).deleteAdmin(isSub); }		/* 권한 해제 */
	resetGame(player){			/* 경기 재시작 */
		room.stopGame();
		room.startGame();
	}

	showAdminList(target){		/* 관리자 명단 출력 */
		let getMsg = function(c){
			let getList = n => c.at(n).map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ");
			if(c.at(1).length > 0 && c.at(0).length > 0)
				return NC.fmtStr(["최고 권한%d: %d", "보조 권한%d: %d"].join(newLine),
				[c_TAG_GRADE.at(1), getList(1), c_TAG_GRADE.at(2), getList(0)]);
			if(c.at(1).length < 1 && c.at(0).length < 1) return "비어 있음";
			return getList(c.at(1).length > 0 ? 1 : 0);
		}
		NC.info("관리자 명단", getMsg([...Array(2)].map((v, i) => AMN.findAdminList(i + 1))), target, null);
	}
	showPassword(player){		/* 비밀번호 조회 */
		if(PASSWORD == null) return NC.caution("현재 비밀번호는 설정돼 있지 않습니다.", player);
		NC.info("비밀번호", PASSWORD, null, null);
	}

	cntAdmins(level){		return this.findAdminList(level).length; }		    /* 접속자 인원(권한) */
	enablePinHost(bool){						                                /* 호스트 팀 이동 설정 */
		if(NOPLAYER == true) return LM.log(false, "호스트가 비활성화 되었기 때문에 호출할 수 없습니다", c_LOG_TYPE.WARNING);
		if(typeof bool != "boolean") return;
		if(bool) room.setPlayerTeam(0, c_TEAM.SPECTATOR);
		this.#pinHost = bool;
	}
	giveAdmin(player, isSub){	PM.findPlayerById(player).giveAdmin(isSub) }	/* 권한 부여 */
	kickPlayer(target, msg, ban, ...replace){	/* 강제 퇴장 처리 */
		if(!PM.isValid(target)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		if(!PM.hasJoined(target)) throw LM.error(c_ERROR_TYPE.E_PLAYER_LID);
		room.kickPlayer(target, (msg ? NC.fmtStr(msg, replace[0], target) : null), ban);
	}
	limitScore(value, byPlayer){				/* 점수 변경 */
		let isValidByPlayer = PM.isValid(byPlayer);
		if(!SYS.hasInRange(value, 0, 14)){
			if(isValidByPlayer) return NC.caution(["올바르지 않은 값입니다.", "%d~%d 사이의 값을 입력하세요."].join(newLine), byPlayer, "?score", [0, 14]);
			return LM.log(false, ["올바르지 않은 값입니다.", "%d~%d 사이의 값을 입력하십시오."].join(newLine), c_LOG_TYPE.WARNING, [0, 14]);
		}
		if(GM.gameStats == c_GAME_STATS.TICK){
			if(isValidByPlayer) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", byPlayer);
			return LM.log(false, "경기 도중에 값을 수정할 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		}
		room.setScoreLimit(value);
		NC.notice(isValidByPlayer ? "%1님이 제한 점수를 %0점으로 변경했습니다." : "제한 점수가 %0점으로 변경되었습니다.",
			null, null, [value, isValidByPlayer ? SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%1(이)가 제한 점수를 %0점으로 변경함." : "제한 점수가 %0점으로 변경됨",
			c_LOG_TYPE.NOTICE, [value, isValidByPlayer ? SYS.showPlayerInfo(byPlayer) : ''
		]);
	}
	limitTime(value, byPlayer){					/* 시간 변경 */
		let isValidByPlayer = PM.isValid(byPlayer);
		if(!SYS.hasInRange(value, 0, 14)){
			if(isValidByPlayer) return NC.caution(["올바르지 않은 값입니다.", "%d~%d 사이의 값을 입력하세요."].join(newLine), byPlayer, "?score", [0, 14]);
			return LM.log(false, ["올바르지 않은 값입니다.", "%d~%d 사이의 값을 입력하십시오."].join(newLine), c_LOG_TYPE.WARNING, [0, 14]);
		}
		if(GM.gameStats == c_GAME_STATS.TICK){
			if(isValidByPlayer) return NC.caution("판이 완전히 끝난 이후에 다시 시도해 보세요.", byPlayer);
			return LM.log(false, "경기 도중에 값을 수정할 수 없습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		}
		room.setTimeLimit(value);
		NC.notice(isValidByPlayer ? "%1님이 제한 시간을 %0분으로 변경했습니다." : "제한 시간이 %0분으로 변경되었습니다.",
		null, null, [value, isValidByPlayer ? SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) : '']);
		LM.log(true, isValidByPlayer ? "%1(이)가 제한 시간을 %0분으로 변경함." : "제한 시간이 %0분으로 변경됨",
		c_LOG_TYPE.NOTICE, [value, isValidByPlayer ? SYS.showPlayerInfo(byPlayer) : '']);
	}
	logonAdmin(player, msg, type){				/* 최고 권한 로그인 */
		if(type != 2) return AMN.missPassword(player.id, msg, type);		//	첫 두 글자가 '!!'로 시작하지 않으면 무효 처리
        if(player.admin == c_ADMIN_TYPE.SUPER_ADMIN) return;                //	이미 권한이 있는 경우
		if(player.isSleep) player.addSleepList();	                        //	장기 대기열에 있었으면 제거
		LM.log(true, "%d(이)가 최고 권한 로그인을 시도함", c_LOG_TYPE.BELL, player.showPlayerInfo());
		player.giveAdmin();
	}
	missPassword(player, msg, type){			/* 최고 권한 로그인 오입력 */
		if(type != 2) return;
		if(player.admin == c_ADMIN_TYPE.SUPER_ADMIN) return;								//	이미 권한이 있는 경우
		LM.log(true, "%d(이)가 최고 권한 로그인을 시도함(실패)", c_LOG_TYPE.WARNING, player.showPlayerInfo());
	}
	mutePlayer(target, time, byPlayer){			/* 채팅 금지 */
		if(PM.isValid(target) == false) return;
		let mp = PM.findPlayerById(target);
		if(mp.isMute == true) return;			// 이미 채팅이 금지돼 있는 경우
		let isValidByPlayer = PM.isValid(byPlayer);
        mp.mute(true);
		NC.locked(true, isValidByPlayer ? "%2님이 %0의 채팅을 %1 금지합니다." : "%0님의 채팅이 %1 금지됩니다.", null, null, [
			mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME),
			SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안",
			isValidByPlayer ? SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%2(이)가 %0(이)의 채팅을 %1 금지함." : "%0(이)의 채팅이 %1 금지됨.", c_LOG_TYPE.NOTICE, [
			mp.showPlayerInfo(),
			time > 0 ? `${time}초 간` : "무제한",
			isValidByPlayer ? SYS.showPlayerInfo(byPlayer) : ''
		]);
		SYS.updatePlayerById(target);			//	플레이어 데이터베이스에 따라 대시보드 갱신
		if(typeof time != "number" || time < 5) return;
		TM.addTimer("mute", () => {
			if(mp.isMute) AMN.unmutePlayer(target);
		}, target, time * SEC_TO_MS);
	}
	swapGame(player){							/* 경기 시작 및 종료 */
		if(GM.gameStats == c_GAME_STATS.TICK) return room.stopGame();
		return room.startGame();
	}
	unmutePlayer(target, byPlayer){				/* 채팅 허용 */
		let isValidByPlayer = PM.isValid(byPlayer);
		let mp = PM.findPlayerById(target);
        mp.mute(false);
		mp.resetAvatar();						//	등번호 초기화
		SYS.updatePlayerById(target);			//	플레이어 데이터베이스에 따라 대시보드 갱신
		if(!mp.localId) return;					//	미접속자는 별도로 출력하지 않음
		TM.clearTimerByName("mute", target);
		NC.locked(false, isValidByPlayer ? "%1님이 %0님의 채팅을 허용하였습니다." : "%0님의 채팅이 허용되었습니다.",
			null, null, [mp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME), isValidByPlayer ? SYS.showPlayerInfo(byPlayer, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%1(이)가 %0(이)의 금지된 채팅을 허용함." : "%0(이)의 금지된 채팅이 허용됨",
			c_LOG_TYPE.NOTICE, [mp.showPlayerInfo(), isValidByPlayer ? SYS.showPlayerInfo(byPlayer) : ''
		]);
	}
}
class BlacklistSystem{          /*** 블랙리스트 클래스 ***/
	#address;       /* 공용 주소 */
    #nickname;      /* 이름 */
    #super;	        /* 접속 불가 처리 */
    #reason;        /* 등록 사유 */

	constructor(isSuper, name, conn, reason){
		(async function(t){
			t.#address		= typeof conn != "string" ? undefined : conn;									/* 공용 주소 */
			t.#nickname		= typeof name != "string" ? undefined : name;									/* 이름 */
			t.#super		= typeof isSuper != "boolean" ? false : isSuper;								/* 접속 불가 처리 */
        	t.#reason		= Array.isArray(reason) == true || typeof reason == "string" ? reason : null;	/* 등록 사유 */	
		})(this);
	}

    get addr(){             return this.#address; }         /* 공용 주소 */
    get name(){             return this.#nickname; }        /* 이름 */
    get sup(){              return this.#super; }           /* 접속 불가 처리 */
    get rsn(){              return this.#reason; }          /* 등록 사유 */

    set addr(v){                                        /* 공용 주소 */
        this.#address = v;
    }
	set name(v){										/* 이름 */
		this.#nickname = v;
	}
    set rsn(v){                                         /* 등록 사유 */
        this.#reason = v;
    }

	hasMatchedAddress(conn){						/* 주소 데이터 일치 확인 */
		let a = this.addr;
		let b = conn;									//	검사할 데이터
		if(a == undefined || a == null) return false;	//	블랙리스트 DB 값이 없는 경우
		return (a == b);
	}
	hasMatchedDatabase(name, address, isSuper){		/* 데이터베이스 확인 */
		let hasValidName = this.hasMatchedName(name);							//	이름 데이터 일치 확인
		let hasValidAddress = this.hasMatchedAddress(address);					//	주소 데이터 일치 확인
		if(hasValidName == false && hasValidAddress == false) return false;		//	완전 불일치
		return (this.sup == isSuper);											//	(슈퍼)블랙리스트 기준으로 따로 처리
	}
	hasMatchedName(str){							/* 이름 데이터 일치 확인 */
		let a = this.name;
		let b = str;								//	검사할 데이터
		if([a, b].some(s => CS.isWhiteSpace(s))) return false;					//	데이터가 없거나 공백인 경우
		//	우회 문자 처리
		let regc = /[`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
		let regn = /[0-9]/gi;
		a = a.replace(regc, '');
		b = b.replace(regc, '');
		if(!regn.test(a)) b = b.replace(regn, '');
		//	문자열 및 길이가 완전히 일치하여야 함
		return (a.search(b) != -1 && a.length == b.length);
	}
}
class NotificationManager{      /*** 알림 매니저 클래스 ***/
    #c_LIST_MSG_COLOR;
    #notiList              = new Array();
	#send(){				    /* 전송 */
		let arg = Object.values(arguments);
		let name = arg.at(0);
		let getNoti = function(a, n){
			let getRep = c => NC.fmtStr(c, a.at(-1) ? a.at(-1) : null);
			switch(a.length){
				case 4:		//	#send(name, content, targets, ...replace)
					return NC.addNotiList(n, c_TAG_NOTFCN.NOTITLE, [null, getRep(a.at(1))], [null, c_LIST_STYLE.NORMAL], [null, NC.MSC.COMMON], a.at(2));
				case 6:		//	#send(name, content, advCom, targets, contentColor, ...replace)
					return NC.addNotiList(n, c_TAG_NOTFCN.BRIEF, [null, 
						getRep(a.at(1)) + (a.at(2) ? NC.fmtStr("(이것을 찾으셨나요: %d)", a.at(2)) : '')
					], [null, c_LIST_STYLE.SMALL], [null, NC.isColor(a.at(4)) ? a.at(4) : NC.MSC.NOTICE], a.at(3));
				case 10:	//	#send(name, tag, title, content, targets, advCom, titleColor, contentColor, delay, ...replace)
					let hasTitle = (a.at(2) != null);
					let titleText = (hasTitle ? (CS.isWhiteSpace(a.at(2)) ? c_LIST_ICON.POSTIVE + "알림" : a.at(2)) + (a.at(5) ? NC.fmtStr("(이것을 찾으셨나요: %d)", a.at(5)) : '') : null);
					let contentText = getRep(a.at(3)) + (hasTitle == false && typeof a.at(5) == "string" ? NC.fmtStr("(이것을 찾으셨나요: %d)", a.at(5)) : '');
					return NC.addNotiList(n, a.at(1), [titleText, contentText], [c_LIST_STYLE.SMALL, c_LIST_STYLE.SMALL], [a.at(6), hasTitle ? a.at(7) : a.at(6)], a.at(4));
				default:
					throw LM.error([
						"%d(이)의 인자 값의 개수는 다음 중 하나여야 합니다",
						[4, 6, 10].join(", ")
					].join(newLine), "#send");
			}
		}
		let nt = getNoti(arg, name);
		nt.out(arg.length > 9 ? arg.at(8) : 0);
	}

	constructor(common, access, caution, info, locked, notice, warning){
		(async function(t){
			t.#c_LIST_MSG_COLOR = ({
				COMMON:		common,
				ACCESS:		access,
				CAUTION:	caution,
				INFO:		info,
				LOCKED:		locked,
				NOTICE:		notice,
				WARNING:	warning
			});
		})(this);
	}

	get MSC(){	return this.#c_LIST_MSG_COLOR; }
    get ntl(){  return this.#notiList; }

	initNoti(name, tag, string, style, color, time, targets){
		return new NotificationSystem(name, tag, string, style, color, time, targets);
	}

    isColor(color){                                 /* 색상 여부 */
        return typeof color == "string" && this.findColor(color, true).includes("0x");
    }

	findChatHistoryByPlayer(player){				/* 채팅 기록 구하기 */
		let pp = PM.findPlayerById(player);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		return pp.findChatHistory();
	}
	findColor(color, hasRaw){						/* 색상 지정 */
		return /^[a-fA-F0-9]+/.test(color) ? `0x${color}` : (hasRaw ? color : `0x${c_LIST_COLOR.DEFAULT}`);
	}
	findNotiHistoryByPlayer(player){				/* 알림 기록 구하기 */
		let pp = PM.findPlayerById(player);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		return pp.findNotiHistory();
	}
	findSound(sound){								/* 소리 지정 */
		if(!Object.values(c_LIST_SOUND).includes(sound)) return c_LIST_SOUND.NORMAL;
		return sound;
	}
	findStyle(style){								/* 서식 지정 */
		if(!Object.values(c_LIST_STYLE).includes(style)) return c_LIST_STYLE.NORMAL;
		return style;
	}

    addNotiList(name, tag, string, style, color, targets){  /* 알림 기록 추가 */
		let nt = this.initNoti(name, tag, string, style, color, TM.date.time, targets);
        this.ntl.push(nt);
		return nt;
    }

	showNotiHistory(title, notiList, targets, maxLines){	/* 플레이어 알림 기록 출력 */
		let maxTime = SEC_TO_MS * 60 * 60 * 24;
		let nowTime = TM.date.time;
        let getHistory = (rl, mt, nt) => rl.filter(v => nt - v.time < mt);
		let getRecord = function(n, d, l){
			if(!SYS.hasInRange(n.length, 0, l, true)) return "비어 있음";
			let getTimeToString = function(t){
				let getTimeUnit = function(m, stm, mts, htm){
					if(m < stm * 5) return "방금 전";
					if(m < stm * mts / 3) return "아까";
					if(m < stm * mts) return ['초', m / stm];
					if(m < stm * mts * htm) return ['분', m / (stm * mts)];
					return ["시간", m / (stm * mts * htm)];
				}
				let u = getTimeUnit(t, SEC_TO_MS, 60, 60);
				if(!Array.isArray(u)) return u;
				return NC.fmtStr("%0%1 전", [Math.trunc(u.at(1)), u.at(0)]);
			}
			return n.map(v => {
                let cr = v.tag == c_TAG_NOTFCN.NOTITLE && v.strCtn.includes(newLine) == true ? v.strCtn.split(newLine).at(0) : v.strCtn;
                return NC.fmtStr("%0 | %1%2", [getTimeToString(d - v.time), cr.slice(0, CM.maxMsgLen),
                    cr.length > CM.maxMsgLen || v.strCtn.includes(newLine) == true ? "..." : ''
                ]);
            });
		}
        let history = getHistory(notiList, maxTime, nowTime);
		let record = getRecord(history.reverse().slice(0, 5), nowTime, typeof maxLines != "number" ? 5 : maxLines);
        NC.info(title, record == -1 ? "비어 있음" : record.join(newLine), targets, null);
	}
			
	announce(name, msg, targets, color, style, sound, delay, ...replace){
		let sendMsg = function(name){			//	ID가 음수이면 해당 ID를 제외한 모든 플레이어에게 전송
			let str = NC.fmtStr(msg, replace.at(0));
			let nt = NC.addNotiList(name, c_TAG_NOTFCN.NOTITLE, [null, str], [null, style], [null, color], targets);
			if(PM.isValid(Math.abs(targets)) == false || targets > 0) return nt.out(delay, sound);
			for(let pp of PM.findPlayerList().filter(p => p.id != Math.abs(targets))){
				let np = NC.addNotiList(name, c_TAG_NOTFCN.NOTITLE, [null, str], [null, style], [null, color], pp.id);
				np.out(delay, sound);
			}
		}
        sendMsg(name ? name : "announcement");
	}
	extMsg(title, content, targets, advCom, titleColor, contentColor, delay, ...replace){	/* 유니버셜 메시지(확장) */
		return this.#send("extendedMessage",
			CS.isWhiteSpace(title) ? c_TAG_NOTFCN.EXTENDED : c_TAG_NOTFCN.NOTITLE,
			title, content, targets, advCom,
			titleColor, contentColor, delay,
			replace[0]
		);
	}
	uniMsg(title, content, targets, advCom, delay, ...replace){								/* 유니버셜 메시지(일반) */
		return this.#send("uniMessage",
			CS.isWhiteSpace(title) ? c_TAG_NOTFCN.NOTITLE : c_TAG_NOTFCN.EXTENDED,
			title, content, targets, advCom, this.MSC.NOTICE, null, delay * SEC_TO_MS,
			replace[0]
		);
	}
	access(targets, reason, advCom, ...replace){                /* 메시지: 권한 없음 */
		return this.#send("permissionRequired", c_TAG_NOTFCN.PERMISSION_REQUIRED,
			c_LIST_ICON.NEGATIVE_BOLD + (reason ? "권한 없음" : "주의"),
			(reason ? reason : "권한 없음"),
			targets, advCom, this.MSC.ACCESS, c_LIST_COLOR.GRAY, 0,
			replace[0]
		);
	}
	alert(player){											    /* 메시지: 금지어 감지 */
		let pp = PM.findPlayerById(player);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_INFO);
        TM.clearTimerByName("ForbiddenChatDetected", pp.id);
        if(SYS.hasInRange(CS.maxFwdCount, 0, ++pp.totalWarn)){
			pp.totalWarn = 0;
			return AMN.kickPlayer(pp.id, "%d금지어 누적 감지", false, c_LIST_ICON.NEGATIVE_BOLD);
		}
		switch(CS.strctLev + (AMN.isBlacklist(pp.id, false) ? 1 : 0)){
			case 0:		//	비활성화
			case 1:		//	1단계: 처리 없음
				return;
			case 6:
			case 5:		//	5단계: 강제 퇴장+채팅 금지
				AMN.mutePlayer(pp.id, 30);
			case 3:		//	3단계: 강제 퇴장
				return AMN.kickPlayer(pp.id, "%d금지어 감지", false, c_LIST_ICON.NEGATIVE);
			case 4:		//	4단계: 경고 문구+채팅 금지
				AMN.mutePlayer(pp.id, 15);
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
                return this.#send("alert", "%d", null, pp.id, c_LIST_COLOR.GRAY, msg.at(SYS.pickRandomNumber(msg)));
		}
	}
	/**
	 * 주의 메시지를 출력합니다.
	 *
	 * @param {string} title b0. 제목
	 * @param {string} msg a0/b1. 내용
	 * @param {Array<number>} targets a1/b2. 출력 대상
	 * @param {string} advCom a2/b3. 추천 명령어
	 * @param {Array<string | number>} replace a3/b4. 치환 변수(배열)
	*/
	caution(){													/* 메시지: 주의 */
		//	caution(msg, targets, advCom, ...replace)
		//	caution(title, msg, targets, advCom, ...replace)
		let arg = Object.values(arguments);
		let index = arg.length > 4 ? 1 : 0;
		let title = this.fmtStr("%0%1", [c_LIST_ICON.NEGATIVE, arg.length > 4 ? arg.at(0) : "주의"]);
		let rep = arg.at(3 + index);
		this.#send("caution", c_TAG_NOTFCN.CAUTION, title,
			arg.at(0 + index), arg.at(1 + index), arg.at(2 + index),
			this.MSC.CAUTION, c_LIST_COLOR.GRAY, 0, rep
		);
	}
	cmndList(title, content, targets, advCom, ...replace){		/* 메시지: 명령어 목록 */
		return this.uniMsg((c_LIST_ICON.NORMAL + title + " 명령어"), content, targets, advCom, 0, replace[0]);
	}
	/**
	 * 특정 기호를 변수의 값으로 치환한 후 문자열로 반환합니다
	 * @param {string} str 기호 문자열
	 * @param {Array<string | number>} rep 치환 변수(배열)
	 * @param {number} target 플레이어 공용 ID
	*/
	fmtStr(str, rep, target){									/* 문자열 치환 */
		let getReplaceList = function(r, p){
			if(Array.isArray(r)) return r;
			let getNode = function(e, t){
				if(e == undefined && PM.isValid(t) == true) return SYS.showPlayerInfo(t, c_PLAYERINFO_TYPE.NAME);
				if(typeof e == "number") return String(e);
				return e;
			}
			return new Array(getNode(r, p));
		}
		let convertSymbolFromString = function(s, y, r){
            if(typeof s != "string") s = s.toString();
			let t = s.split(y);
			if(t.length < 2) return s;
			return (SYS.generateNumberArray(t.length - 1).map(n => NC.fmtStr("%0%1", [t.at(n), Array.isArray(r) ? r.at(n >= r.length ? -1 : n) : r]))
            ).concat(t.slice(-1)).join('');
		}
		let convertSymbolFromStringByNumber = function(s, r){
            if(typeof s != "string") s = s.toString();
			let l = r.length;
			if(l < 1) return s;
			for(let n of SYS.generateNumberArray(l)){
				s = s.replaceAll(`%${n}`, r.at(n));
			}
			return s;
		}
		let rl = getReplaceList(rep, target);
		str = convertSymbolFromString(str, "%d", rl);
		str = convertSymbolFromStringByNumber(str, rl);
		return str;
	}
	help(msg, exCom, targets, advCom, ...replace){				/* 메시지: 도움말 */
		return this.uniMsg(c_LIST_ICON.NORMAL + "도움말", [
			msg, exCom, "위와 같은 형식으로 보내면 됩니다."
		].join(newLine), targets, advCom, 0, replace[0]);
	}
	/**
	 * 상세정보 메시지를 출력합니다.
	 *
	 * @param {string} title b0/c0. 제목
	 * @param {string} context a0/b1/c1. 내용
	 * @param {Array<number>} targets a1/b2/c2. 출력 대상
	 * @param {string} advCom a2/b3/c3. 추천 명령어
	 * @param {Array<string | number>} replace c4. 치환 변수(배열)
	*/
	info(){														/* 메시지: 상세정보 */
		let arg = Object.values(arguments);
		switch(arg.length){
			case 5:		//	info(title, context, targets, advCom, ...replace);
				return this.#send("detailWithTitle", c_TAG_NOTFCN.DETAILED, this.fmtStr("%0상세정보: %1", [c_LIST_ICON.NORMAL, arg.at(0)]), arg.at(1), arg.at(2), arg.at(3), this.MSC.INFO, null, 0, arg.at(4));
			case 4:		//	info(title, context, targets, advCom);
				return this.#send("detailWithTitle", c_TAG_NOTFCN.DETAILED, this.fmtStr("%0상세정보: %1", [c_LIST_ICON.NORMAL, arg.at(0)]), arg.at(1), arg.at(2), arg.at(3), this.MSC.INFO, null, 0, null);
			case 3:		//	info(context, targets, advCom);
			default:
				return this.#send("detail", c_TAG_NOTFCN.DETAILED, this.fmtStr("%0상세정보", c_LIST_ICON.NORMAL), arg.at(0), arg.at(1), arg.at(2), this.MSC.INFO, null, 0, null);
		}
	}
	locked(isLock, msg, targets, advCom, ...replace){			/* 메시지: 잠금 및 해제 */
		return this.#send("locked", c_TAG_NOTFCN.LOCKED,
			(isLock ? c_LIST_ICON.NEGATIVE_BOLD + "잠금" : c_LIST_ICON.NEGATIVE + "해제"),
			msg, targets, advCom,
			this.MSC.LOCKED, c_LIST_COLOR.GRAY, 0,
			replace[0]
		);
	}
	message(string, targets, ...replace){						/* 제목 없는 메시지 */
		return this.#send("chatMessage", string, targets, replace[0]);
	}
	notice(msg, targets, advCom, ...replace){					/* 메시지: 알림 */
		return this.uniMsg(null, msg, targets, advCom, 0, replace[0]);
	}
	warning(msg, targets, advCom, ...replace){					/* 메시지: 경고 */
		return this.#send("warning", c_TAG_NOTFCN.WARNING,
			c_LIST_ICON.NEGATIVE_BOLD + "경고",
			msg, targets, advCom,
			this.MSC.WARNING, c_LIST_COLOR.GRAY, 0,
			replace[0]
		);
	}
}
class NotificationSystem{       /*** 알림 시스템 클래스 ***/
	#id;                /* 알림 ID */
    #name;              /* 알림 이름 */
    #targets;           /* 알림 대상 */
    #tag;               /* 알림 분류 */
	#stringTitle;       /* 제목 문자열 */
	#stringContent;     /* 내용 문자열 */
	#styleTitle;        /* 제목 서식 */
	#styleContent;      /* 내용 서식 */
	#colorTitle;        /* 제목 색상 */
	#colorContent;      /* 내용 색상 */
	#time;              /* 생성 시간 */
	#findColors(t, n){                                              /* 색상 구하기 */
		return [[t, NC.MSC.NOTICE], [n, NC.MSC.COMMON]].map(c => c.at(NC.isColor(c.at(0)) ? 0 : 1));
	}

	#sendAnnouncement(string, color, style, sound){                 /* 메시지 생성 */
        let send = tp => room.sendAnnouncement(string, tp, color, style, sound);
        if(!Array.isArray(this.targets)) return send(this.targets);
        for(let tp of this.targets){
            send(tp);
        }
	}

    constructor(name, tag, string, style, color, time, targets){
		(async function(t){
        	t.#id				= NC.fmtStr("Noti-%d", TM.date.time - SYS.stpTime.time);
        	t.#name				= name;
        	t.#tag				= tag;
        	t.#targets			= targets;
			t.#stringTitle		= Array.isArray(string) == true && string.length > 1 ? string.at(0) : null;
			t.#stringContent	= Array.isArray(string) ? string.at(string.length > 1 ? 1 : 0) : null;
			t.#styleTitle		= Array.isArray(style) == true && style.length > 1 ? style.at(0) : c_LIST_STYLE.SMALL;
			t.#styleContent		= Array.isArray(style) ? style.at(style.length > 1 ? 1 : 0) : c_LIST_STYLE.SMALL;
			t.#colorTitle		= Array.isArray(color) == true && color.length > 1 ? color.at(0) : NC.MSC.NOTICE;
			t.#colorContent		= Array.isArray(color) == true && color.length > 1 ? color.at(1) : NC.MSC.COMMON;
			t.#time				= time;
		})(this);
    }

	get id(){			return this.#id; }                  /* 알림 ID */
    get name(){			return this.#name; }                /* 알림 이름 */
    get targets(){		return this.#targets; }             /* 알림 대상 */
    get tag(){			return this.#tag; }                 /* 알림 분류 */
	get strTit(){		return this.#stringTitle; }         /* 제목 문자열 */
	get strCtn(){		return this.#stringContent; }       /* 내용 문자열 */
	get styTit(){		return this.#styleTitle; }          /* 제목 서식 */
	get styCtn(){		return this.#styleContent; }        /* 내용 서식 */
	get colTit(){		return this.#colorTitle; }          /* 제목 색상 */
	get colCtn(){		return this.#colorContent; }        /* 내용 색상*/
	get time(){			return this.#time; }                /* 생성 시간 */

	hasTitle(){			return this.strTit ? true : false; }    /* 제목 포함 여부 */

	out(delay, sound){                                          /* 알림 출력 */
		let cl = this.#findColors(this.colTit, this.colCtn);
		TM.addTimer("recordNotification", () => {
			if(this.hasTitle()) this.#sendAnnouncement(this.strTit, NC.fmtStr("0x%d", cl.at(0)), this.styTit, c_LIST_SOUND.MUTED);
			this.#sendAnnouncement(this.strCtn, NC.fmtStr("0x%d", cl.at(1)), this.styCtn, Object.values(c_LIST_SOUND).includes(sound) ? sound : c_LIST_SOUND.NORMAL);
		}, this.targets, delay);
	}
}
class ChatManager{              /*** 채팅 매니저 클래스 ***/
	#forbiddenWordList	= new Array();		/* 금지어 목록 */
	#isFreezeChat;					        /* 채팅 얼림 여부 */
	#isLockPrivateChat;		                /* 귓속말 차단 */
	#maxForbiddenWordCount;	                /* 금지어 최대 감지량 */
	#maxRepeatedCount;			            /* 반복 채팅 최대 감지량 */
    #playerList			= new Array();      /* 플레이어 데이터베이스 */
	#strictLevel;			                /* 채팅 필터링 엄격도 */

	constructor(
		    isFreeze, isLockPrivateChat,
		    strictLevel,
		    maxForbiddenWordCount, maxRepeatedCount,
			...bannedWords
		){
		(async function(t){
			t.#forbiddenWordList		= await convertScript("https://raw.githubusercontent.com/HonestSquare/UMUX/master/5%20Evry/bannedWordList.json");
			t.#isFreezeChat				= isFreeze;					/* 채팅 얼림 여부 */
			t.#isLockPrivateChat		= isLockPrivateChat;		/* 귓속말 차단 */
			t.#maxForbiddenWordCount	= maxForbiddenWordCount;	/* 금지어 최대 감지량 */
			t.#maxRepeatedCount			= maxRepeatedCount;			/* 반복 채팅 최대 감지량 */
			t.#strictLevel				= strictLevel;				/* 채팅 필터링 엄격도 */
			if(Array.isArray(bannedWords)){
				t.forbiddenWordList		= bannedWords[0];			/* 금지어 목록 */
			}
		})(this);
	}
	
	get fwl(){				return this.#forbiddenWordList; }	/* 금지어 목록 */
	get isFreezeChat(){		return this.#isFreezeChat; }		/* 채팅 얼림 여부 */
	get isLockPrvChat(){	return this.#isLockPrivateChat; }	/* 귓속말 차단 여부 */
	get maxFwdCount(){											/* 금지어 최대 감지량 */
		let count = this.#maxForbiddenWordCount;
		return count >= 3 ? count : null;
	}
	get maxRptCount(){											/* 반복 채팅 최대 감지량 */
		let count = this.#maxRepeatedCount;
		return count >= 3 ? count : null;
	}
	get pyl(){				return this.#playerList; }			/* 플레이어 데이터베이스 */
	get strctLev(){			return this.#strictLevel; }			/* 채팅 필터링 엄격도 */

	set isFreezeChat(bool){			/* 채팅 얼리기 */
		this.#isFreezeChat = bool;
	}
	set isLockPrvChat(bool){		/* 귓속말 차단 */
		this.#isLockPrivateChat = bool;
	}
	set maxFwdCount(limit){			/* 금지어 최대 감지량 지정 */
		let count = this.#maxForbiddenWordCount;
		if(limit >= 3 && count != limit){
			this.#maxForbiddenWordCount = limit;
			LM.log(true, "금지어 최대 감지량 변경: %d회", c_LOG_TYPE.NOTICE, limit);
		}
		else LM.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
	}
	set maxRptCount(limit){			/* 반복 채팅 최대 감지량 지정 */
		if(limit == false){
			this.#maxRepeatedCount = false;
			LM.log(true, "반복 채팅 최대 감지량 변경: %d", c_LOG_TYPE.NOTICE, "비활성화");
		}
		else if(limit >= 3 && this.maxRptCount != limit){ 
			this.#maxRepeatedCount = limit;
			LM.log(true, "반복 채팅 최대 감지량 변경: %d회", c_LOG_TYPE.NOTICE, limit);
		}
		else LM.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
	}
	set strctLev(targetLev){		/* 채팅 필터링 엄격도 지정 */
        if(this.strctLev == targetLev) return;		//	동일한 단계일 경우
        if(!SYS.hasInRange(targetLev, 0, 5)) return;	//	범위를 벗어난 경우
        NC.notice("채팅 필터링 엄격도가 %d단계로 변경되었습니다.", null, null, targetLev);
        LM.log(true, "채팅 필터링 엄격도 변경: %d→%d", c_LOG_TYPE.NOTICE, [this.strctLev, targetLev]);
        this.#strictLevel = targetLev;
    }
	
	onPlayerChat(player, msg){      /* 채팅 입력 이벤트 */
        let pp = PM.findPlayerById(player.id);
        let cp = CS.findPlayerById(player.id);
		cp.updateChatLog(msg, TM.date.time);	                //	채팅 로그 갱신
        TM.clearTimerByName("ForbiddenChatDetected", pp.id);
        let filter = this.hasForbiddenWord(cp.lgs.at(0));		//	금지어 필터링
        if(filter) TM.addTimer("ForbiddenChatDetected", () => {}, pp.id, SEC_TO_MS);
        if(TM.findTimerByName("commandActivated", pp.id).length > 0) return;
        let strList = msg.split(' ');
        pp.updateTime(TM.date.time);					        //	마지막 활동 시간 저장
		if(pp.isMute) return this.sendEmojiChat(pp.id, msg);	//	채팅 금지
		if(cp.hasRepeatedChat()) return;			            //	반복 채팅 확인
        let getContext = function(l, f, m){
			switch(l){
				case 4: case 5:
					if(f == true)   return "관리자가 삭제한 메시지입니다.";
				default:            return m.slice(0, CM.maxMsgLen);
			}
		}
        let context = getContext(this.strctLev, filter, msg);
		if(strList.at(0).includes('\#')) return CM.comPrivateChat(pp.id, strList.slice(0, 1).push(context), 0);	//	개인 채팅
		switch(pp.chmd){
			case 0: return this.sendAllChat(pp.id, context);                            //	전체 채팅
			case 1: return this.sendTeamChat(pp.team, context, pp.id);                  //	팀별 채팅
		}
	}
	
	initPlayer(player, time){     return new ChatSystem(player, time); }        /* 플레이어 데이터베이스 초기화 */
	
	isWhiteSpace(str){			/* 공백 확인 */
		if(str == undefined) return true;
		if(str == 'ㅤ') return true;
		return str.toString().trim().length == 0;
	}
	hasForbiddenWord(msg){		/* 금지어 필터링 */
		if(this.strctLev == 0) return false;		//	0단계는 판정하지 않음
		let isEquals = function(s, t){			//	단어 일치 확인
			//	공백 처리
			if([s, t].some(v => CS.isWhiteSpace(v))) return false;
			//	우회 문자 처리
			let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
			if(!reg.test(t)) s = s.replaceAll(reg, '');
			return s.includes(t);
		}
		for(let fw of this.fwl){
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

	findChatLogsByPlayer(target){       /* 플레이어 채팅 로그 구하기 */
		return this.findPlayerById(target).findChatLogs();
	}   
	findPlayerById(target){			    /* 플레이어 데이터베이스 구하기 */
		return this.pyl.find(p => p.id == target);
	}

    addPlayerList(player, time){        /* 플레이어 데이터베이스 추가 */
        let cp = this.initPlayer(player, time);
        this.pyl.push(cp);
        return cp;
    }

	updateChatLog(player, msg, time){			/* 플레이어 채팅 로그 갱신 */
		return this.findPlayerById(player).updateChatLog(msg, time);
	}
			
	showHelpCommandList(title, cml, player){    /* 명령어 목록 출력 */
		if(!SYS.hasInRange(cml.length, 0, 2, true)) return;
		let sendList = str => NC.cmndList(title, str, player);
		let getList = index => cml[index].join(" | ");
		if(cml.length == 1) return sendList(getList(0));
		return sendList(getList(0) + (AMN.hasAdmin(player) ? (newLine + getList(1)) : ''));
	}

	freezeChat(time, player){							/* 채팅 얼리기 */
		if(this.isFreezeChat == true) return;
		this.isFreezeChat = true;
		let isValidByPlayer = PM.isValid(player);
		NC.locked(true, isValidByPlayer ? "%1님이 채팅창을 %0 얼렸습니다" : "채팅창이 %0 얼었습니다",
			null, null, [SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안",
			isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%1(이)가 채팅창을 %0 얼림" : "채팅창이 %0 얼려짐",
			c_LOG_TYPE.NOTICE, [SYS.hasInRange(time, 5, 59) ? "잠시 동안" : time >= 60 ? `${time}초 간` : "한동안",
			isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		]);
		if(typeof time != "number" || time < 5) return;
		TM.addTimer("freeze", () => {
			if(CS.isFreezeChat) CS.unfreezeChat();
		}, player, time * SEC_TO_MS);
	}
	lockPrivateChat(bool, player){						/* 귓속말 채팅 금지 및 허용 */
		let isValidByPlayer = PM.isValid(player);
		this.isLockPrvChat = bool;
		NC.locked(bool, isValidByPlayer ? "%1님이 귓속말 채팅을 %0했습니다." : "귓속말 채팅이 %0되었습니다.",
			null, null, [bool ? "금지" : "허용", isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%1(이)가 귓속말 채팅을 %0함" : "귓속말 채팅이 %0됨",
			c_LOG_TYPE.NOTICE, [bool ? "금지" : "허용", isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		]);
	}
	sendAlert(msg, targets, ...replace){				/* 관리자 채팅 전송 */
        let str = NC.fmtStr(msg, replace.at(0));
		if(NOPLAYER) return NC.message("%1: %0", targets, [str, HOSTNAME]);
        for(let p of isArray(targets) ? targets : new Array(targets)){
            room.sendChat(str, p);
        }
	}
	sendAllChat(player, msg){							/* 전체 채팅 전송 */
		if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);	        //	채팅 금지
		let filter = TM.findTimerByName("ForbiddenChatDetected", player).length > 0;	//	금지어 필터링
		let title = NC.fmtStr("전체%d", filter ? c_TAG_GRADE.at(0) : PM.findTagGrade(player));
		this.sendMsg("%0%1: %2", null, [title, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL), msg]);
        let strCom = CM.findCommand(standardCommands, CM.comAllChat).val.at(0);
        NC.announce("tip", "전체 채팅 답장: !%d", PM.findPlayerList().filter(tp => tp.chmd != 0 && tp.id != player), c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 0, strCom.at(0));
		LM.log(true, "%0%1: %2", c_LOG_TYPE.NORMAL, [title, SYS.showPlayerInfo(player), msg]);
		if(filter) NC.alert(player);
	}
	sendEmojiChat(player, msg){							/* 감정 채팅 전송 */
		let num = parseInt(msg);
		if(SYS.hasInRange(num, 0, c_LIST_EMOTION.length - 1))
			return PM.giveAvatar(player, c_LIST_EMOTION[num]);
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
			"emoji" : Object.entries(c_LIST_EMOTION).map(([k, v]) => v + k)
		};
		let context = msgList[CS.isFreezeChat ? "mute" : "freeze"];
		NC.locked(true, ["아래에 나열된 숫자로 감정만 전달할 수 있습니다", msgList.emoji.join(" | ")].join(newLine), player);
		NC.access(player, context.at(SYS.pickRandomNumber(context)));
	}
	sendMsg(msg, targets, ...replace){					/* 일반 메시지 출력 */
		NC.message(msg, targets, replace[0]);
	}
	sendPrivateChat(toPlayer, fromPlayer, msg){			/* 귓속말 채팅 전송 */
        if(!PM.isValid(toPlayer, true)) throw LM.error(c_ERROR_TYPE.E_PLAYER_LID);
        let strCom = CM.findCommand(standardCommands, CM.comPrivateChat).val.at(0);
		if(fromPlayer == 0 && toPlayer > 0){			    //	콘솔창에서 게임으로 전달
			this.sendAlert("→%0: %1", toPlayer, [SYS.showPlayerInfo(toPlayer, c_PLAYERINFO_TYPE.LOCAL), msg]);
			return NC.announce("tip", "%2에게 답장: !%0 #%1", toPlayer, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 0, [strCom.at(0), 0, HOSTNAME]);
		}
        let tp = PM.findPlayerById(toPlayer);
        let fp = PM.findPlayerById(fromPlayer);
		if(this.isLockPrvChat) return NC.access(fp.id, "(#0)%d 외에 귓속말 채팅이 금지돼 있어 이용할 수 없습니다.", HOSTNAME);
		if(this.hasMutedChat(fp.id)) return this.sendEmojiChat(fp.id, msg);
		let filter = TM.findTimerByName("ForbiddenChatDetected", fp.id).length > 0;             //	금지어 필터링
		let title = NC.fmtStr("개인%d", filter ? c_TAG_GRADE.at(0) : fp.tagGrade);
        this.sendMsg("%0%1→ %2%3: %4", [tp.id, fp.id], [title, fp.showPlayerInfo(c_PLAYERINFO_TYPE.LOCAL), tp.tagGrade, tp.showPlayerInfo(c_PLAYERINFO_TYPE.LOCAL), msg]);
		NC.announce("tip", "%2님에게 답장: !%0 #%1", tp.id, c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 0, [strCom.at(0), fp.id, fp.showPlayerInfo(c_PLAYERINFO_TYPE.LOCAL)]);
		LM.log(true, "%0%1→ %2%3: %4", c_LOG_TYPE.NORMAL, [title, fp.showPlayerInfo(), tp.tagGrade, tp.showPlayerInfo(), msg]);
		if(filter) NC.alert(fp.id);
	}
	sendTeamChat(teamId, msg, player){		/* 팀 채팅 전송 */
		if(!Object.hasOwn(Object.values(c_TEAM), teamId)) throw LM.error(c_ERROR_TYPE.E_ETC);
        let tl = PM.findPlayerListByTeam(teamId);
		if(player == 0){							    //	콘솔창에서 게임으로 전달
            let prvCom = CM.findCommand(standardCommands, CM.comPrivateChat).val.at(0);
            this.sendAlert("→[%0]%1 (귓속말 답장: !%2 #0)", tl.map(p => p.id), [GM.findTeamName(teamId, true), msg, prvCom.at(0)]);
			return LM.log(true, "전달: [%0]%1", c_LOG_TYPE.SEND, [GM.findTeamName(teamId, true), msg]);
		}
		if(this.hasMutedChat(player)) return this.sendEmojiChat(player, msg);                   //	채팅 금지
		let filter = TM.findTimerByName("ForbiddenChatDetected", player).length > 0;            //  금지어 필터링
		let title = NC.fmtStr("%0%1", [GM.findTeamName(teamId, true), filter ? c_TAG_GRADE.at(0) : PM.findTagGrade(player)]);
		let strCom = CM.findCommand(standardCommands, CM.comTeamChat).val.at(0);
        this.sendMsg("%0%1: %2", tl.map(p => p.id), [title, SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.LOCAL), msg]);
        NC.announce("tip", "팀 채팅 답장: !%d", tl.filter(t => t.chmd != 1 && t.id != player).map(p => p.id), c_LIST_COLOR.GRAY, c_LIST_STYLE.SMALL, c_LIST_SOUND.MUTED, 0, strCom.at(0));
		LM.log(true, "%0%1: %2", c_LOG_TYPE.NORMAL, [title, SYS.showPlayerInfo(player), msg]);
		if(filter) NC.alert(player);
	}
	unfreezeChat(player){								/* 채팅 녹이기 */
		if(this.isFreezeChat == false) return;
		let isValidByPlayer = PM.isValid(player);
		TM.clearTimerByName("freeze", player);
		this.isFreezeChat = false;
		NC.locked(false, isValidByPlayer ? "%d님이 채팅창을 녹였습니다" : "채팅창이 녹았습니다",
			null, null, isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		);
		LM.log(true, isValidByPlayer ? "%d(이)가 채팅창을 녹임" : "채팅창이 녹아짐",
			c_LOG_TYPE.NOTICE, isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		);
	}
}
class ChatSystem{               /*** 채팅 시스템 클래스 ***/
	#id;										/* 플레이어 공용 ID */
	#forbiddenWordCount		= 0;				/* 금지어 누적 감지량 */
	#logList				= new Array();		/* 채팅 기록 */
	#repeatedCount			= 0;				/* 반복 채팅 누적 감지량 */
	#time;										/* 감지 시간 */
	#timeList				= new Array();		/* 시간 기록 */

	constructor(id, time){
		(async function(t){
			t.#id				= id;			/* 플레이어 공용 ID */
			t.#time				= time;			/* 감지 시간 */	
		})(this);
	}
    get id(){       return this.#id; }                      /* 플레이어 공용 ID */
	get cntFwd(){	return this.#forbiddenWordCount; }		/* 금지어 누적 감지량 */
	get cntRpt(){	return this.#repeatedCount; }			/* 반복 채팅 누적 감지량 */
	get lgs(){		return this.#logList; }					/* 채팅 기록 */
	get lgt(){		return this.#timeList; }				/* 시간 기록 */
    get time(){     return this.#time; }                    /* 감지 시간 */

	set cntFwd(v){		                                    /* 금지어 누적 감지량 */
		this.#forbiddenWordCount = v;
	}
	set cntRpt(v){		                                    /* 반복 채팅 누적 감지량 */
		this.#repeatedCount = v;
	}

	hasMutedChat(){		        /* 채팅 금지 확인 */
		return AMN.isMute(this.id) ? true : CS.isFreezeChat ? (AMN.hasAdmin(this.id) == false) : false;
	}
	hasRepeatedChat(){	        /* 반복 채팅 확인 */
		if(CS.maxRptCount == false) return false;				                //	반복 채팅 감지 비활성
		if(CS.strctLev < 1) return false;					                    //	채팅 필터링이 비활성화 돼 있는 경우
		if(this.lgs == undefined) return false;
        let dl = this.lgs.filter(g => !CS.hasForbiddenWord(g)).reverse();       //  금지어 분산 입력 감지
        if(dl.length > 1 && CS.hasForbiddenWord(dl.join('')) == true){
            TM.addTimer("ForbiddenChatDetected", () => {}, this.id, SEC_TO_MS);
            this.deleteChatLog(0, dl.length);
            this.addChatLog(dl.join(''));
            return false;                                                       //  금지어 감지 우선도 > 반복 채팅 감지 우선도
        }
		if(this.lgs.length < CS.maxRptCount) return false;				        //	채팅 로그 데이터가 적거나 없는 경우
		let isEquals = (a, b) => Object.entries(a).toString() === Object.entries(b).toString();
		let replaceStr = function(s){						//	우회 문자 처리
			let reg = /[0-9`~!@#$%^&*()_|=?;:'"▣◈﻿⊙◎,.<>​\{\}\[\]\+\\\/]/gi;
			s = s.replace(reg, '');		                    //	우회 문자 감지되면 제외
			return s.replace(' ', '');	                    //	공백 처리
		}
		for(let i of SYS.generateNumberArray(this.lgs.length)){		            //	우회 문자 확인
			if(!isEquals(replaceStr(this.lgs[0]), replaceStr(this.lgs[i]))){    //	내용과 무관하게 짧은 시간내 채팅 입력이 감지되면 반복 채팅으로 간주
				if(this.#timeList[0] - this.#timeList[i] > GM.rptTime * i) return false;
			}
		}
		if(++this.cntRpt <= CS.maxRptCount) return false;
		let showalertMsg = function(c, l, p){				//	경고 메시지 출력
			switch(l + (AMN.isBlacklist(p, false) ? 1 : 0)){
				case 0:		//	비활성화
				case 1:		//	1단계: 처리 없음
					break;
				case 6:
				case 5:		//	5단계: 강제 퇴장+채팅 금지
					AMN.mutePlayer(p, 30);
				case 3:		//	3단계: 강제 퇴장
					return AMN.kickPlayer(p, "%0반복 채팅 감지", false, c_LIST_ICON.NEGATIVE);
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
			NC.caution(blockMsg.at(SYS.pickRandomNumber(blockMsg)), p);
		}
		showalertMsg(this.cntRpt, (CS.strctLev + (AMN.isBlacklist(this.id, false) ? 1 : 0)), this.id);
		return true;
	}
	
	findChatLogs(max){	        /* 채팅 로그 구하기 */
		if(this.lgs.length < 1) return "비어 있음";
		let getChatLog = function(index, time, str){
			let t = time.at(index);
			let s = str.at(index);
			if(t == undefined || s == undefined) return '-';
			return NC.fmtStr("%d: %d", [TM.initDate(t).showCurrentTime(), s]);
		}
		return SYS.generateNumberArray(max > 0 ? max : 3).map(n => getChatLog(n, this.lgt, this.lgs)).join(newLine);
	}

	addChatLog(msg, time){		/* 플레이어 채팅 로그 추가 */
		this.lgs.unshift(msg);
		this.lgt.unshift(time);
	}

	updateChatLog(msg, time){	/* 플레이어 채팅 로그 갱신 */
		let logStr = this.lgs, logTime = this.#timeList;
		if(logStr.length != logTime.length){
			if(logStr.length > 0) logStr.splice(0);
			if(logTime.length > 0) logTime.splice(0);
		}
		if(this.lgs.length >= CS.maxRptCount)		//	maxRptCount 값 이상의 로그가 기록되면 가장 오래된 기록 삭제
			this.deleteChatLog();
		let oldRecords = this.lgt.filter(e => time - e >= 5 * SEC_TO_MS).length;
		if(oldRecords > 0)							//	오래된 로그 기록은 삭제
			this.deleteChatLog(this.lgs.length - oldRecords);
		this.addChatLog(msg, time);
	}

	deleteChatLog(){			/* 플레이어 채팅 로그 삭제 */
		let arg = Object.values(arguments);
		let index = arg.at(0) >= 0 ? arg.at(0) : -1;
		let range = arg.length > 1 ? arg.at(1) : 1;
		this.lgs.splice(index, range);
		this.lgt.splice(index, range);
	}
}
class CommandManager{           /*** 명령어 매니저 클래스 ***/
    #c_headerList         = [			/* 명령어 유형 문자(열) 목록 */
        '!', '?', "!!"
    ];
    #maxStringLength;			    	/* 채팅 글자 제한 수 */

	constructor(maxMsgLength){
		(async function(t){
			t.#maxStringLength	= maxMsgLength;			/* 채팅 글자 제한 수 */
		})(this);
	}
	
    get HDL(){        	return this.#c_headerList; }		/* 명령어 유형 문자(열) 목록 */
	get maxMsgLen(){	return this.#maxStringLength; }		/* 채팅 글자 제한 수 */

	set maxMsgLen(n){									    /* 채팅 글자 제한 수 */
		if(n == false) LM.log(true, "채팅 메시지의 글자 수 제한이 해제됨", c_LOG_TYPE.NOTICE);
		else if(!SYS.hasInRange(n, 15, 256)) return LM.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		else LM.log(true, "채팅 메시지가 %d자 내외로 제한됨", c_LOG_TYPE.NOTICE, n);
		this.#maxStringLength = n;
	}

    onPlayerChat(player, msg){                              /* 채팅 입력 이벤트 */
        let strList = msg.split(' ');
        let comType = this.findCommandTypeByNumber(strList.at(0), strList.slice(1));
        PM.updateTime(player.id, TM.date.time);				//	마지막 활동 시간 저장
		if(!comType.name) return;							//	명령어 입력이 감지되지 않으면 중단
		let detectedCommandList = [internalCommands, standardCommands, customCommands].find(cl => CM.hasMatchedCommand(cl, comType.name));
		if(!detectedCommandList) return;
		let cmnd = this.findMatchedCommand(detectedCommandList, comType.name);
		this.runCommand(cmnd.lkfn, comType, player);
		TM.addTimer("commandActivated", () => {}, player.id, SEC_TO_MS);
    }

    initCommand(readOnly, name, func, ...val){              /* 명령어 초기화 */
        return new CommandSystem(readOnly, name, func, val);
    }
    initCommands(readOnly, cml){                            /* 명령어 목록 초기화 */
        return cml.map(c => this.initCommand(readOnly, c.at(0).name, c.at(0), c.at(1)))
    }

    hasCommand(cl, fn){             return this.findCommand(cl, fn) != undefined; }         /* 명령어 존재 확인 */
    hasMatchedCommand(cl, ct){      return this.findMatchedCommand(cl, ct) != undefined; }  /* 일치 명령어 판별 */

    findCommand(cl, fn){            return cl.find(p => p.lkfn === fn); }                   /* 명령어 구하기 */
    findCommandTypeByNumber(str, cmtx){                                                     /* 명령어 유형 숫자로 구하기 */
		let getCommandType = (i, s, c) => ({
			"index" : i,
			"name" : s,
			"str" : c
		});
        for(let i of SYS.generateNumberArray(this.HDL.length)){
            let strType = str.split(this.HDL[i]);
			if(strType.length == 2) return getCommandType(i, strType[1], cmtx);
        }
		return getCommandType();
    }
    findMatchedCommand(cl, ct){     return cl.find(p => p.val[0].includes(ct)); }           /* 일치 명령어 구하기 */

	alertSpam(player, msg, type){				/* 도배방지문자 */
		switch(type){
			case 0:		//	!도배방지
				if(!player.admin) return CM.helpCom(player, msg, 0);		//	도움말
				NC.announce("warnSpamMessage", ["도배 방지", "분란 방지", "정숙 유지", "질서 유지", "도배 방지"].join(newLine),
				null, c_LIST_COLOR.ORANGE, c_LIST_STYLE.BOLD, c_LIST_SOUND.LOUD, 0, "〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰");
				LM.log(true, "%d(이)가 반복 채팅 방지 문자를 출력함.", c_LOG_TYPE.NOTICE, player.showPlayerInfo());
				break;
			case 1:		//	?도배방지
                if(!player.admin) return CM.helpCom(player);
                NC.help("반복 채팅 방지 문자를 출력하려면", "!도배방지", player.id);
                break;
		}
	}

	comAdminList(player, msg, type){			/* 관리자 명단 조회 명령어 */
		switch(type){
			case 0:		//	!admin
				return AMN.showAdminList(player.id);
			case 1:		//	?admin
				return NC.help("관리자 명단을 조회하려면", "!admin_list", player.id);
		}
	}
	comMutedList(player, msg, type){			/* 채팅 금지 명단 조회 명령어 */
		switch(type){
			case 0:		//	!muted_list
				return PM.showMutedList(player.id);
			case 1:		//	?muted_list
				return NC.help("채팅 금지 명단을 조회하려면", "!mute_list", player.id);
		}
	}
	comFreezeChat(player, msg, type){			/* 채팅 얼리기 */
		switch(type){
			case 0:		//	!freeze
				if(!player.admin) return NC.access(player.id);
				if(CS.isFreezeChat) return NC.caution("채팅창이 이미 얼려있습니다.", player.id, "!unfreeze");
				if(PM.cntPlayers() < 3) return NC.caution("부적절한 조치입니다.", player.id, "!mute #ID");
				return CS.freezeChat(0, player.id);
			case 1:		//	?freeze
				return NC.help("채팅창을 얼리려면", "!freeze", player.id, "!unfreeze");
		}
	}
	comUnfreezeChat(player, msg, type){			/* 채팅 녹이기 */
		switch(type){
			case 0:			//	!unfreeze
				if(!player.admin) return NC.access(player.id);		//	권한이 없는 경우
				if(!CS.isFreezeChat) return NC.caution("채팅창이 이미 녹아있습니다.", player.id, "!unmute #ID");
				return CS.unfreezeChat(player.id);
			case 1:			//	?unfreeze
				return NC.help("채팅창을 녹이려면", "!unfreeze", player.id);
		}
	}
	comMute(player, msg, type){					/* 채팅 금지 */
		switch(type){
			case 0:			//	!mute
				if(!player.admin) return NC.access(player.id);			    //	권한이 없는 경우
				if(PM.cntPlayers() < 2) return NC.caution("채팅을 금지할 수 있는 플레이어가 없습니다.", player.id);
				let target = msg.length > 0 ? GM.checkPublicId(msg.at(0), player.id) : null;
				if(!PM.isValid(target)) return CM.comMute(player, msg, 1);	//	대상을 잘못 지목한 경우
                let tp = PM.findPlayerById(target);
				if(tp.id == player.id) return NC.caution("자기 자신의 채팅을 금지할 수 없습니다.", player.id);
				if(tp.isMute) return NC.caution("%d님의 채팅은 이미 금지돼 있습니다.", player.id, ("!unmute " + '\#' + tp.id), tp.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
				return AMN.mutePlayer(tp.id, 0, player.id);
			case 1:			//	?mute
				return NC.help("공용 ID가 42인 플레이어의 채팅을 금지하려면", "!mute #42", player.id);
		}
	}
	comUnmute(player, msg, type){				/* 채팅 허용 */
		switch(type){
			case 0:			//	!unmute
				if(!player.admin) return NC.access(player.id);		        //	권한이 없는 경우
				if(msg == "all") return AMN.clearMutedList(player.id);		//	영구 퇴장 목록 초기화
				let target = msg.length > 0 ? GM.checkPublicId(msg.at(0), player.id) : null;
				if(PM.isValid(target)){
					if(!PM.findPlayerById(target).isMute)				    //	채금자가 아닐 경우
						return NC.caution(SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME) + "님의 채팅은 이미 허용돼 있습니다.", player);
					return AMN.unmutePlayer(target, player.id);
				}
			case 1:			//	?unmute
				return NC.help("공용 ID가 12인 채금자의 채팅을 허용하려면", "!unmute #12", player.id);
		}
	}
	comKick(player, msg, type){					/* 강제 퇴장 */
		switch(type){
			case 0:		//	!kick
				if(!player.admin) return NC.access(player.id);					//	권한이 없는 경우
				let target = msg.length > 0 ? GM.checkPublicId(msg.at(0), player.id) : null;
				let tp = PM.findPlayerById(target);
				if(!PM.isValid(tp)) return CM.comKick(player.id, msg, 1);		//	대상을 잘못 지목한 경우
				if(!tp.hasJoined()) return NC.caution("%d님은 이미 방에서 퇴장했습니다.", player.id, tp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
				let reason = msg.length > 1 ? msg.slice(1).join(' ') : null;
				if(tp.admin > player.admin)		                                //	보조 권한 → 최고 권한 퇴장 불가
					return NC.access(player.id, "권한이 낮아 처리할 수 없습니다.");
				let byPlayer = player.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC);
				let detail = NC.fmtStr("%d: %d", reason == null || CS.isWhiteSpace(reason) ? ["처리자", byPlayer] : [byPlayer, reason]);
				return AMN.kickPlayer(tp.id, detail);
			case 1:		//	?kick
				return NC.help("공용 ID가 42인 플레이어를 \'%d\'이라는 사유로 퇴장 시키려면", 
				"!kick #42 %d", player.id, null, "민트초코를 지지함");
		}
	}
	comClearBans(player, msg, type){			/* 영구 퇴장 명단 초기화 명령어 */
		switch(type){
			case 0:		//	!clearbans
				if(!player.admin) return NC.access(player.id);
				return AMN.clearBans(player.id);
			case 1:		//	?clearbans
				return NC.help("영구 퇴장 명단을 지우려면", "!clearbans", player.id, "!unmute #ID");
		}
	}
	comLockPrivateChat(player, msg, type){		/* 귓속말 채팅 금지 및 허용 */
		switch(type){
			case 0:			//	!lock_private
				if(!player.admin) return NC.access(player.id);
				let getLockType = function(str){
					let lp = Object.entries({
						[true]	: ["on", "온", "금지", "ㅐㅜ", "dhs", "rmawl"],
						[false]	: ["off", "오프", "허용", "ㅐㄹㄹ", "dhvm", "gjdyd"]
					}).find(([k, v]) => v.includes(str));
					return (lp == undefined ? !CS.isLockPrvChat : JSON.parse(lp.at(0).toLowerCase()));
				}
				let lockType = getLockType(msg.length > 0 ? msg.at(0) : null);
				if(lockType == CS.isLockPrvChat) return NC.caution("귓속말 채팅이 이미 %d되어 있습니다.", player.id, null, [lockType ? "금지" : "허용"]);
				return CS.lockPrivateChat(lockType, player.id);
			case 1:			//	?lock_private
				return NC.help("귓속말 채팅을 막으려면",
				"!lock_private on", player.id);
		}
	}

	comSetPassword(player, msg, type){			/* 비밀번호 지정 */
		switch(type){
			case 0:		//	!set_pw
				if(!player.admin) return NC.access(player.id);
				let pw = msg.length > 0 ? msg.join(' ') : null;
				if(SYS.lockedPswd) return NC.access(player.id, "서버에서 비밀번호 고정 장치가 활성화 되어 있습니다.");
				if(pw == null) return CM.comSetPassword(player, pw, 1);
				if(pw.length < 4) return NC.caution("비밀번호가 너무 짧습니다.", player.id, "!clear_pw");
				if(pw.length > 30) return NC.caution("비밀번호가 너무 길어서 설정할 수 없습니다.", player.id);
				AMN.password = pw;
				NC.locked(true, "%d님이 비밀번호를 설정하였습니다.", null, null, player.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
				LM.log(false, "%1(이)가 비밀번호를 설정함. (%0)", c_LOG_TYPE.BELL, [PASSWORD, player.showPlayerInfo()]);
				break;
			case 1:		//	?set_pw
				return NC.help("펩시콜라에 찬양일색인 내용으로 비밀번호를 짓고자 하면", "!set_pw 펩시콜라마시쩡", player.id, "!clear_pw");
		}
	}
	comShowPassword(player, msg, type){			/* 비밀번호 조회 */
		switch(type){
			case 0:			//	!show_pw
                if(!player.admin) return NC.access(player);
				return AMN.showPassword(player);
			case 1:			//	?show_pw
				return NC.help("현재 설정된 비밀번호를 조회하려면", "!show_pw", player.id, "?clear_pw");
		}
	}
	comClearPassword(player, msg, type){		/* 비밀번호 해제 */
		switch(type){
			case 0:			//	!clear_pw
				if(!player.admin) return NC.access(player.id);
				return AMN.clearPassword(player.id);
			case 1:			//	?clear_pw
				return NC.help("비밀번호를 해제하려면", "!clear_pw", player.id);
		}
	}
	comPinHost(player, msg, type){				/* 호스트 이동 설정 */
		if(NOPLAYER == true) return;
		switch(type){
			case 0:			//	!lock_host
				if(!player.admin) return NC.access(player.id);
				let lockType = !AMN.pinHost;
				AMN.enablePinHost(lockType);
				NC.locked(lockType, "호스트 이동이 %d되었습니다.", player.id, null, lockType ? "금지" : "허용");
				LM.log(true, "%1(이)가 호스트 팀 이동을 %0함.", c_LOG_TYPE.NOTICE, [lockType ? "허용" : "금지", player.showPlayerInfo()]);
				break;
			case 1:			//	?lock_host
				return NC.help("호스트 이동을 금지하려면", "!lock_host", player.id);
		}
	}
	comRecaptcha(player, msg, type){			/* reCAPTCHA 설정 */
		switch(type){
			case 0:		//	!recaptcha
				if(!player.admin) return NC.access(player.id);
				let lockType = Object.entries({
					[true]	: ["on", "온", "활성화", "ㅐㅜ", "dhs", "ghkftjdghk"],
					[false]	: ["off", "오프", "비활성화", "ㅐㄹㄹ", "dhvm", "qlghkftjdghk"]
				}).find(([k, v]) => v.includes(msg.length > 0 ? msg.at(0) : null));
				if(lockType == undefined) return CM.comRecaptcha(player, msg, 1);
				return SYS.enableRecaptcha(JSON.parse(lockType.at(0).toLowerCase()), player.id);
			case 1:		//	?recaptcha
				return NC.help("reCAPTCHA를 활성화 하려면", "!recaptcha on", player.id);
		}
	}
	
	comAvatar(player, msg, type){				/* 등번호 명령어 */
		switch(type){
			case 0:		//	!avatar
				player.giveAvatar(msg.length > 0? msg.at(0) : '');
				NC.notice("등번호가 변경되었습니다.", player.id, "!clear_avatar");
				break;
			case 1:		//	?avatar
				return NC.help("등번호를 12로 변경하려면", "!avatar 12", player.id, "!clear_avatar");
		}
	}
	comResetAvatar(player, msg, type){			/* 등번호 초기화 명령어 */
		switch(type){
			case 0:		// !clear_avatar
				player.resetAvatar();
				NC.notice("등번호가 초기화되었습니다.", player.id);
				break;
			case 1:		//	?clear_avatar
				return NC.help("기본 등번호로 되돌리려면", "!clear_avatar", player.id);
		}
	}
	comUpdateUniform(player, msg, type){		/* 유니폼 지정 명령어 */
		switch(type){
			case 0:			//	!uniform
				//	팀 ID 확인
				let team = Object.entries({
					[c_TEAM.RED]	: ["red", 'r', "레드", "레"],
					[c_TEAM.BLUE]	: ["blue", 'b', "블루", "블"]
				}).find(([k, v]) => v.includes(msg.at(0)));
				if(team == undefined) return NC.caution("유니폼을 적용할 팀을 올바르게 입력하세요.", player, "?uniform");
				//	각도 범위 확인
				let angle = parseInt(msg.at(1));
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
					return NC.caution(getMsg(len), player.id, "?uniform");
				}
				//	색상 코드 확인
				let bgList = msg.slice(2).map(c => NC.findColor(c, true));
				if(bgList.includes(null)) return NC.caution("색상 코드가 올바르지 않습니다.", player.id, "?uniform");
				//	알림
				NC.uniMsg(c_LIST_ICON.NORMAL_BOLD + "유니폼 변경",
					["%2님이 %0의 유니폼을 변경했습니다.", "%1"].join(newLine),
					null, "!uniform", 0, [GM.findTeamName(team[0]), msg.join(' '), player.showPlayerInfo(c_PLAYERINFO_TYPE.NAME)
				]);
				LM.log(true, "%2(이)가 %0의 유니폼을 변경함 <%1>",
					c_LOG_TYPE.NOTICE, [GM.findTeamName(team[0]), msg.join(' '), player.showPlayerInfo()
				]);
				return PM.updateUniform(team[0], angle, bgList[0], bgList.slice(1));
			case 1:			//	?uniform
				return NC.help("텍스트 색이 FFFFFF이고 배경이 FFCC00 및 AABBCC이며, 각도가 30°인 레드팀 유니폼으로 변경하려면",
				"!uniform red 30 FFFFFF FFCC00 AABBCC", player.id);
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
				let team = getTeam(msg.length > 0 ? msg.at(0) : null);
				if(!team) return NC.caution("유니폼을 되돌릴 팀을 입력하세요.", player.id);
				PM.clearUniform(team);
				NC.notice("%1님이 %0의 유니폼을 초기화 했습니다.", null, null, [GM.findTeamName(team), player.showPlayerInfo(c_PLAYERINFO_TYPE.NAME)]);
				LM.log(true, "%1(이)가 %0의 유니폼을 초기화함", c_LOG_TYPE.NOTICE, [GM.findTeamName(team), player.showPlayerInfo()]);
				break;
			case 1:			//	?clear_uniform
				return NC.help("레드팀의 유니폼을 초기화하려면",
				"!clear_uniform red", player.id);
		}
	}

	comAllChat(player, msg, type){				/* 전체 채팅 명령어 */
		switch(type){
			case 0:			//	!a
				return CS.sendAllChat(player.id, msg.length > 0 ? msg.join(' ') : '');
			case 1:			//	?a
				return NC.help("모든 플레이어에게 \'%d\'라는 말을 공공연히 밝히고 싶으면",
				"!a %d", player.id, "!chathelp", "나는 경기도 안양에 살고 있다");
		}
	}
	comPrivateChat(player, msg, type){			/* 귓속말 명령어 */
		switch(type){
			case 0:			//	!e
				let target = msg.length > 0 ? GM.checkPublicId(msg.at(0), player.id) : -1;
				let chatMsg = msg.length > 1 ? msg.slice(1).join(' ') : '';
				if(target == -1) return NC.caution("귓속말을 보낼 대상을 지정하세요", player.id, "?e");
				if(target == 0){
					let mark = (CS.hasForbiddenWord(chatMsg) ? c_TAG_GRADE.at(0) : player.tagGrade);
					CS.sendMsg("개인%0%1→%2: %3", player.id, [mark, player.showPlayerInfo(c_PLAYERINFO_TYPE.LOCAL), HOSTNAME, chatMsg]);
					LM.log(false, "%0%1: %2", c_LOG_TYPE.BINDING, [mark, player.showPlayerInfo(), chatMsg]);
					return;
				}
				if(!PM.isValid(target)) return;
				if(target == player.id) return NC.caution("자기 자신에게 귓속말을 보낼 수 없습니다.", player.id);
				return CS.sendPrivateChat(target, player.id, chatMsg);
			case 1:			//	?e
				return NC.help("공용 ID가 3인 플레이어에게 \'%d\'이라는 말을 조용히 전달하려면",
				"!e #3 %d", player.id, "!chathelp", "안녕?");
		}
	}
	comTeamChat(player, msg, type){				/* 팀 채팅 명령어 */
		switch(type){
			case 0:			//	!t
                return CS.sendTeamChat(player.team, msg.length > 0 ? msg.join(' ') : '', player.id);
			case 1:			//	?t
				return NC.help("상대팀이 못 엿듣게 살포시 팀원에게 \'%d\'라고 전하려면",
				"!t %d", player.id, "!chathelp", "민트초코 최고야");
		}
	}
	comChatHistory(player, msg, type){			/* 채팅 기록 조회 명령어 */
		switch(type){
			case 0:			//	!chat_list
                return NC.showNotiHistory("최근 메시지 내역", player.findChatHistory(), player.id);
			case 1:			//	?chat_list
				return NC.help("채팅 기록을 조회하려면", "!chat_list", player.id);
		}
	}
	comChatMode(player, msg, type){				/* 채팅 모드 설정 */
		switch(type){
			case 0:			//	!chatmode
				let ct = Object.entries({
					0 : ["all", 'a', "전체", "wjscp", "미ㅣ"],
					1 : ["team", 't', "팀", "xla", "ㅅㄷ므"]
				}).find(([k, v]) => v.includes(msg.length > 0 ? msg.at(0) : null));
				if(ct == undefined) return NC.caution("부적절한 값입니다.", player.id, "?chatmode");
				player.chmd = parseInt(ct.at(0));
				break;
			case 1:			//	?chatmode
				return NC.help("상대팀이 못 듣게 같은 팀원에게 \'%d\'라고 계속해서 설교하려면",
				"!chatmode team", player.id, null, "민트초코는 진리야");
		}
	}

	comAfk(player, msg, type){					/* 장기 대기열 플레이어 설정 */
		switch(type){
			case 0:		//	!afk
				if(player.isSleep) return player.deleteSleepList();
				return player.addSleepList();
			case 1:		//	?afk
				if(player.isSleep) return NC.help("자리에 돌아와서 게임에 다시 참여하려면", "!afk", player.id, "!join");
				return NC.help("게임 도중 자리를 비우려면", "!afk", player.id, "!join spec");
		}
	}
	comSleepList(player, msg, type){			/* 장기 대기열 명단 조회 명령어 */
		switch(type){
			case 0:		//	!afk_list
				return PM.showSleepList(player.id);
			case 1:		//	?afk_list
				break;
		}
	}
	comAllowJoin(player, msg, type){			/* 팀 이동 금지 및 허용 */
		switch(type){
			case 0:			//	!lock_join
				if(!player.admin) return NC.access(player.id);
				let getLockType = function(str){
					let ct = Object.entries({
						[true]	: ["on", "온", "금지", "ㅐㅜ", "dhs", "rmawl"],
						[false]	: ["off", "오프", "허용", "ㅐㄹㄹ", "dhvm", "gjdyd"]
					}).find(([k, v]) => v.includes(str));
					return !(ct == undefined ? AMN.allowJoin : JSON.parse(ct.at(0).toLowerCase()));
				}
				let lockType = getLockType(msg.length > 0 ? msg.at(0) : null);
				if(lockType == AMN.allowJoin) return NC.caution("팀 자율 이동이 이미 %d되어 있습니다.", player.id, null, lockType ? "허용" : "금지");
				LM.log(true, "%1(이)가 팀 자율 이동을 %0함.", c_LOG_TYPE.NOTICE, [lockType ? "허용" : "금지", player.showPlayerInfo()]);
				AMN.allowJoin = lockType;
				break;
			case 1:			//	?lock_join
				return NC.help("팀 자율 이동을 막으려면", "!lock_join on", player.id);
		}
	}
	comJoin(player, msg, type){					/* 팀 자율 이동 */
		switch(type){
			case 0:
				return CM.joinPlayer(player.id, msg);
			case 1:
				return NC.help("레드팀으로 참가하려면", "!join red", player.id);
			default:
		}
	}

	comNotiHistory(player, msg, type){			/* 알림 기록 조회 명령어 */
		switch(type){
			case 0:			//	!bell_list
                return NC.showNotiHistory("최근 알림 기록", player.findNotiHistory(), player.id);
			case 1:			//	?bell_list
				return NC.help("알림 기록을 조회하려면", "!bell_list", player.id);
		}
	}
	comRecording(player, msg, type){			/* 녹화 시작 및 종료 */
		switch(type){
			case 0:			//	!rec
				if(!player.admin == c_ADMIN_TYPE.SUPER_ADMIN) return NC.access(player.id);
				return GM.recStats ? GM.stopRecording() : GM.startRecording();
			case 1:			//	?rec
				return NC.help("게임을 녹화하려면", "!rec", player.id);
		}
	}
	comResetGame(player, msg, type){			/* 경기 재시작 명령어 */
		switch(type){
			case 0:			//	!rr
				if(!player.admin) return NC.access(player.id);
				return AMN.resetGame(player.id);
			case 1:			//	?rr
				return NC.help("게임을 재시작 하려면", "!rr", player.id);
		}
	}
	comSwapGame(player, msg, type){				/* 경기 시작 및 종료 명령어 */
		switch(type){
			case 0:			//	!r
				if(!player.admin) return NC.access(player.id);
				return AMN.swapGame(player.id);
			case 1:			//	?r
				return NC.help("게임을 시작하거나 종료하려면 ", "!r", player.id, "!rr");
		}
	}
	comUpdateScore(player, msg, type){			/* 점수 변경 명령어 */
		switch(type){
			case 0:			//	!score
				if(!player.admin) return NC.access(player.id);
				return AMN.limitScore(msg.length > 0 ? parseInt(msg.at(0)) : null, player.id);
			case 1:			//	?score
				return NC.help("경기를 5점 내기로 진행하려면", "!score 5", player.id); 
		}
	}
	comUpdateTime(player, msg, type){			/* 시간 변경 명령어 */
		switch(type){
			case 0:			//	!time
				if(!player.admin) return NC.access(player.id);
				return AMN.limitTime(msg.length > 0 ? parseInt(msg.at(0)) : null, player.id);
			case 1:			//	?time
				return NC.help("경기를 5분 내기로 진행하려면", "!time 5", player.id);
		}
	}

	helpBot(player, msg, type){					/* 시스템 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("시스템", [
			["!about(정보)", "!admin_list(관리자 명단)", "!bell_list(알림 기록)"],
			["!kick #ID(강제 퇴장)", "!r(시작/종료)", "!rr(재시작)", "!show_pw(비번 표시)", "!set_pw(비번 설정)", "!clear_pw(비번 해제)", "!clear_bans(영구 퇴장 초기화)", "!recaptcha(reCAPTCHA 설정)"]
		], player.id);
	}
	helpChat(player, msg, type){				/* 채팅 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("채팅", [
			["!e #ID(개인)", "!t(팀별)", "!a(전체)", "!chatmode(기본 채팅 모드)", "!chat_list(채팅 기록)", "!mute_list(채팅 금지 명단)"],
			["!freeze/unfreeze(채팅 녹이기/얼리기)", "!mute/unmute #ID(채팅 금지/허용)", "!lock_private(귓속말 채팅 금지/허용)", "!도(반복 채팅 방지 문자)"]
		], player.id);
	}
	helpCom(player, msg, type){					/* 명령어 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("일반", [
			["!bothelp(시스템)", "!chathelp(채팅)", "!joinhelp(참가)", "!maphelp(맵)", "!rankhelp(랭킹)", "!scorehelp(점수)", "!mischelp(기타)"]
		], player.id);
	}
	helpJoin(player, msg, type){ 				/* 참가 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("투입", [
			["!join(자동 참가)", "!afk(잠수)", "!afk_list(대기열 명단)"],
			["!lock_join(투입 제한)"]
		], player.id);
	}
	helpMap(player, msg, type){					/* 맵 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("맵", [
			["/checksum(정보) | /store(저장)", "!map_list(맵 목록)"],
			["!load ID(불러오기)"]
		], player.id);
	}
	helpRank(player, msg, type){	 			/* 랭크 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("랭크", [
			["!stats #ID(전적)", "!ranking n(순위/n등 랭킹)"],
			["!score(점수 변경)", "!time(시간 변경)"]
		], player.id);
	}
	helpScore(player, msg, type){				/* 점수 도움말 */
		if(type != 0) return;
		return NC.uniMsg(c_LIST_ICON.NORMAL + "점수 부여 항목",
		["득: %d", "실: %d", "승: %d", "패: %d", "도움 %d"].join(" | "),
		player.id, "!ranking", 0, [SC.gl, SC.og, SC.wn, SC.lst, SC.ast]);
	}
	helpMisc(player, msg, type){				/* 기타 도움말 */
		if(type != 0) return;
		return CS.showHelpCommandList("기타", [
			["!avatar(등번호 변경)", "!uniform(유니폼 변경)", "!clear_avatar(등번호 초기화)", "!clear_uniform(유니폼 초기화)"]
		], player.id);
	}

	infoLink(player, msg, type){				/* 방 주소 조회 명령어 */
		switch(type){
			case 0:		//	!link
				return NC.info("방 주소", GM.gameLink, player.id, "!about");
			case 1:		//	?link
				return CM.infoRoom(player.id, msg, 0);
		}
	}
	infoMaps(player, msg, type){				/* 맵 정보 */
		switch(type){
			case 0:			//	!maplist
				let size = (customStadiumList.length > 0 ? customStadiumList : defaultStadiumList).length;
				let target = msg.length > 0 ? parseInt(msg.at(0)) : -1;
				if(!SYS.hasInRange(target, 0, size, true)) return CM.infoMaps(player, msg, 1);
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
				NC.uniMsg(c_LIST_ICON.NORMAL + "맵 목록" + page, list.join(newLine), player.id,
					(player.admin >= c_ADMIN_TYPE.CORE_ADMIN == true && customStadiumList.length > 0 ? ("!load " + target) : "?load")
				);
				break;
			case 1:			//	?maplist
				return NC.help("42번 내장 맵이 포함된 맵 목록을 보려면", "!cm 42", player.id, "!load ID");
		}
	}
	infoRanking(player, msg, type){				/* 랭킹 정보 */
		switch(type){
			case 0:		//	!ranking
				let getTarget = function(s, p){
					if(s == -1) return p;
					let n = s.length > 0 ? s.at(0) : '';
					if(n.includes('\#')) return GM.checkPublicId(n, p);						//	#ID로 검색
					if(!SYS.hasInRange(parseInt(n), 0, SC.rnkLst.length, true)) return -1;	//	등수로 검색
					return SC.findRankListByGrade(n - 1).id;
				}
				let target = getTarget(msg, player.id);
				if(!PM.isValid(target)) return NC.caution("검색할 등수는 범위를 벗어났습니다. 현재 총 %d명의 데이터베이스가 등록돼 있으며, 여기서 중복 계정은 제외되었습니다.", player.id, null, SC.rnkLst.length);
				return SC.sendRanking(target, player.id);				//	플레이어 랭킹 확인
			case 1:		//	?ranking
				return NC.uniMsg(c_LIST_ICON.NORMAL + "랭킹 측정 방식", [
                    	"모든 전적의 총점수를 계산하여 순위를 매깁니다.",
                    	"여기서 동점자가 나올 경우, 공용 ID의 오름차순으로 순위를 결정합니다."
                	].join(newLine), player.id, "!scorehelp"
				);
		}
	}
	infoRoom(player, msg, type){				/* 서버 정보 */
		switch(type){
			case 0:				//	!about
				return NC.info("시스템", [DESCRIPTION, "릴리스 날짜: %d | %d"			//	릴리스 및 업데이트 날짜
				].join(newLine), null, "!link", [SYS.rsDate, SYS.findInfo()]);			//	***UMUX 저작물 표기(이 구문은 지우지 마시오)***
			case 1:				//	?about
				return CM.infoLink(player.id, msg, 0);
		}
	}
	infoStats(player, msg, type){				/* 점수 정보 */
		switch(type){
			case 0:		//	!stats
				let getTarget = function(s, p){
					if(s == -1) return p;
					let n = s.length > 0 ? s.at(0) : '';
					let t = GM.checkPublicId(n, p, true);
					if(!PM.isValid(SC.findRankListByPlayer(t))) return -1;
					return t;
				}
				let target = getTarget(msg, player.id);
                if(!PM.isValid(target)) return;
				let rp = SC.findRankListByPlayer(target);
				if(!PM.isValid(rp)) return NC.caution("현재 %0님의 랭킹 데이터베이스에 접근할 수 없습니다", player.id, null, SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.NAME));
				return NC.info("플레이어 전적", [SYS.showPlayerInfo(target, c_PLAYERINFO_TYPE.PUBLIC), rp.about
				].join(newLine), player.id, "!ranking");
			case 1:		//	?stats == !helpscore
				return CM.helpScore(player);
		}
	}

	joinPlayer(player, msg){					/* 플레이어 투입 */
		let pp = PM.findPlayerById(player);
		if(AMN.allowJoin == false && pp.admin == c_ADMIN_TYPE.NON_ADMIN) return NC.access(pp.id, "팀 자율 이동이 금지돼 있어 사용할 수 없습니다.");
		let team = msg.length > 0 ? msg.at(0) : (pp.team == c_TEAM.SPECTATOR || pp.team == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
		let target = msg.length > 1 ? msg.at(1) : null;
		let tp = PM.findPlayerById(target != null && pp.admin > c_ADMIN_TYPE.NON_ADMIN ? GM.checkPublicId(target, pp.id) : pp.id);
		if(["lock", "team"].includes(team)){
			if(!pp.admin) return NC.access(pp.id);
			return this.comAllowJoin(pp, msg, 0);
		}
		let getTargetTeam = function(target, byPlayer){
			let strList = Object.entries({
				[c_TEAM.RED]		: ["red", 'r', "레드", "레"],
				[c_TEAM.BLUE]		: ["blue", 'b', "블루", "블"],
				[c_TEAM.SPECTATOR]	: ["spectator", "spect", "spec", "spct", 's', "스펙", "관전", "관", "스"]
			}).find(([k, v]) => v.includes(target));
			if(strList != undefined) return strList[0];
			if(byPlayer != c_TEAM.SPECTATOR) return (byPlayer == c_TEAM.BLUE ? c_TEAM.RED : c_TEAM.BLUE);
			return ((PM.cntPlayers(c_TEAM.RED) > PM.cntPlayers(c_TEAM.BLUE)) ? c_TEAM.BLUE : c_TEAM.RED);
		}
		if(!PM.isValid(tp)) return NC.help("공용 ID가 42인 플레이어를 블루팀으로 옮기려면", "!join blue #42", pp.id);
		if(AMN.allowJoin == false && PM.isValid(pp) == false) return NC.access(tp.id, "팀 자율 이동이 금지되었습니다.");		//	팀 이동 금지 처리
		let targetTeam = getTargetTeam(team, pp.team);
		if(tp.team == targetTeam) return NC.caution("중복된 명령어입니다.", (pp.hasJoined() ? pp.id : tp.id));
		if(tp.isSleep) return NC.caution("게임 참여 의사가 없어 플레이할 수 없습니다.", (pp.hasJoined() ? pp.id : tp.id), "!afk");
		tp.moveTeam(targetTeam);
	}
	loadMap(player, msg, type){					/* 맵 불러오기 */
		let size = (customStadiumList.length > 0 ? customStadiumList : defaultStadiumList).length;
		let target = msg.length > 0 ? parseInt(msg.at(0)) : -1;
		switch(type){
			case 0:			//	!load
				if(!player.admin) return NC.access(player.id);		//	권한이 없는 경우
				return GM.loadMap((SYS.hasInRange(target, 0, size, true) ? target - 1 : 0), player.id);
			case 1:			//	?load
				if(size < 2) return NC.help("내장 맵을 불러오려면", "!load 1", player.id);
				if(SYS.hasInRange(target, 0, size, true))
					return NC.uniMsg(null, "[%d] | %d", player.id, null, 0, [
						SYS.fillLine(target, Math.floor(Math.log10(size) + 1)), GM.findStadiumNameList(target - 1)
					]);
				let index = SYS.pickRandomNumber(size, 1);
				return NC.help("예를 들어 %d번째 내장 맵을 불러오려면", "!load " + index, player.id, "!maplist n", index);
		}
	}
    runCommand(src, type, player){				/* 명령어 실행 처리 */
		//	범위 외 및 미접속자인 경우
		if(PM.isValid(player.id) == false || PM.hasJoined(player.id) == false) return;
		let arg = type.str;											//	입력된 추가 문자열
		let header = type.index;									//	명령어 유형
		let pp = PM.findPlayerById(player.id);
		//	플레이어 공용 ID, 입력된 추가 문자열, 명령어 유형
		src(pp, (arg.length < 1 ? -1 : arg), header);
	}
}
class CommandSystem{            /*** 명령어 시스템 클래스 ***/
    #linkedFunction;		    /* 연결 함수 */
	#name;					    /* 이름 */
	#readOnly;				    /* 명령어 수정 여부 */
    #values;				    /* 입력 문자열 */

    constructor(readOnly, name, func, ...val){
		(async function(t){
        	t.#linkedFunction	= func;				/* 연결 함수 */
			t.#name      		= name;				/* 이름 */
        	t.#readOnly    		= readOnly;			/* 명령어 수정 여부 */
        	t.#values    		= val.at(0);		/* 입력 문자열 */
		})(this);
    }

    get name(){         return this.#name; }				/* 이름 */
    get lkfn(){         return this.#linkedFunction; }		/* 연결 함수 */
    get strct(){        return this.#readOnly; }			/* 명령어 수정 여부 */
    get val(){          return this.#values; }				/* 입력 문자열 */

    set val(v){										/* 입력 문자열 */
		if(this.strct) return LM.error("%d 명령어 데이터베이스는 쓰기만 가능합니다", this.name);
        this.#values = v;
    }
}
class PlayerManager{            /*** 플레이어 매니저 클래스 ***/
	#playerList		= new Array();			/* 플레이어 데이터베이스 */

	constructor(){
		(async function(t){

		})(this);
	}

	get pyl(){			return this.#playerList; }		/* 플레이어 데이터베이스 */

	onPlayerActivity(player){				    /* 플레이어 응답 이벤트 */
        let pp = this.findPlayerById(player.id);
        pp.updateTime(TM.date.time);            //	마지막 활동 시간 저장
        if(pp.team == c_TEAM.SPECTATOR) return;
        if(GM.gameStats != c_GAME_STATS.TICK) return;
        if(pp.hasCommonRange(0) == true)
            SC.addTouchedList(pp.id);
	}
	onPlayerInactivity(player){				    /* 플레이어 무응답 이벤트 */
		if(SYS.isDevMode)					    // 개발자 모드 기능 제한
			return LM.log(false, ["개발자 모드에서는 비활동 플레이어 퇴장 기능이 작동되지 않습니다", "대상: %d"
			].join(newLine), c_LOG_TYPE.BINDING, SYS.showPlayerInfo(player));
		AMN.kickPlayer(player, "%0비활동 플레이어", false, c_LIST_ICON.NEGATIVE);
	}
	onPlayerTeamChange(player, byPlayer){       /* 팀 교체 이벤트 */
		if(player.id == 0){
			if(AMN.pinHost == true && player.team != 0) room.setPlayerTeam(0, c_TEAM.SPECTATOR);
			return;
		}
        let time = TM.date.time;
		let tp = this.findPlayerById(player.id);
		if(tp.isSleep == true && player.team != 0){
			tp.moveTeam(c_TEAM.SPECTATOR);			    //	장기 대기열 플레이어일 경우 관전석으로 이동
			if(PM.isValid(byPlayer)){
                let bp = this.findPlayerById(byPlayer.id);
				bp.updateTime(time);
				if(bp.id == tp.id) return NC.notice("게임에 참가하려면 대기 상태를 해제하세요.", bp.id, "!afk");
				return NC.notice("%d님은 자리를 비운 상태입니다.", bp.id, null, tp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			}
		}
		SYS.clearPlayerById(tp.id);
		TM.clearTimerByName("goal", tp.id);			    //	타이머 제거
		tp.updateTime(time);    						//	투입 시간 저장
        tp.updateTeam(player.team);
		SYS.addPlayerById(tp.id);
		SYS.updateDashboard();
	}
	
	initPlayer(player, region, language){		/* 플레이어 데이터베이스 초기화 */
		SC.initRankList(player.id);			        	//	전적 데이터베이스 초기화
        CS.addPlayerList(player.id, TM.date.time);		//  채팅 데이터베이스 추가
		return new PlayerSystem(
			player.id, player.name,
			player.team,
			player.admin,
			player.conn, player.auth,
			region, language
		);
	}

	isAfkPlayer(player, time){					/* 장기 무응답 플레이어 확인 */
		return this.findPlayerById(player).isAfk(time);
	}
	isValid(target, includeHost){				/* 유효 플레이어 확인 */
		if(target == 0 && includeHost == true) return true;
		let getNumber = function(t){
			switch(typeof t){
				case "number":
                    if(isNaN(t)) return -1;
                    return t;
				case "object":
					if(t != null && [t, Object.getPrototypeOf(t)].some(p => Object.hasOwn(p, "id")) == true) return t.id;
				default:		return -1;
			}
		}
		return SYS.hasInRange(getNumber(target), 0, this.cntPlayers("public"), true);
	}
	hasCommonRange(player, ball, range){		/* 충돌 여부 판정 */
		return this.findPlayerById(player).hasCommonRange(ball, range);
	}
	hasJoined(player){                          /* 접속 여부 확인 */
		if(!this.isValid(player)) return false;
		return this.findPlayerById(player).hasJoined();
	}

	findDiscProp(target){		return this.findPlayerById(target).discProp; }			/* 플레이어 객체 구하기 */
	findLocalId(publicId){																/* 플레이어 개인 ID 구하기 */
		if(!PM.isValid(publicId)) return false;
		return this.findPlayerById(publicId).localId;
	}
	findPlayerById(target){		return this.pyl.find(p => p.id == target); }	        /* 플레이어 데이터베이스 구하기 */
	findPlayerList(isPublic){															/* 플레이어 데이터베이스 명단 구하기 */
		if(isPublic == true) return this.pyl;
		return this.pyl.filter(p => p.localId > 0);
	}
	findPlayerListByTeam(team){															/* 플레이어 데이터베이스 개별 팀 명단 구하기 */
		if(!Object.hasOwn(Object.values(c_TEAM), team)) return this.findPlayerList();
		return this.findPlayerList().filter(p => p.team == team);
	}
	findTagGrade(player){																/* 플레이어 권한 마크 구하기 */
		let pp = this.findPlayerById(player);
		if(this.isValid(pp) == false || pp.localId == false) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		return pp.tagGrade;
	}
	findTagTeam(team){			return c_TAG_TEAM[team]; }								/* 팀 마크 구하기 */
	
    addPlayerList(player, region, language){            /* 플레이어 데이터베이스 추가 */
        let pp = this.initPlayer(player, region, language);
        this.pyl.push(pp);
        return pp;
    }
	addSleepPlayer(player){		                        /* 장기 대기열 플레이어 추가 */
		this.findPlayerById(player).addSleepList();
	}
	
	updateAccount(player){								/* 중복 계정 갱신 */
		let newPlayer = this.findPlayerById(player);
		let oldPlayer = this.findPlayerList(true).findLast(p => p.id != newPlayer.id && p.ntwk == newPlayer.ntwk);
		if(!PM.isValid(oldPlayer)) return false;		//	중복 계정 없음(최초 입장)
		for(const [k, v] of Object.entries(oldPlayer)){
			if(!["id", "name", "team", "admin", "time", "network", "address",
				"isSleep", "totalWarn"
			].includes(k)) newPlayer[k] = v;
		}
		switch(oldPlayer.admin){
			case c_ADMIN_TYPE.SUPER_ADMIN:
				if(room.getPlayerList().filter(p => p.id > 0 && p.admin == true).length < 1){
					room.setPlayerAdmin(newPlayer.id, true);	//	최고 권한을 가진 접속자가 이미 있는 경우, 보조 권한 부여
					break;
				}
			case c_ADMIN_TYPE.CORE_ADMIN:
				break;
		}
		SC.updateAccount(oldPlayer.id, newPlayer.id);	//	전적 데이터베이스 갱신
		return true;
	}
	updateTime(player, time){							/* 응답 시간 갱신 */
        let target = this.findPlayerById(player);
		if(!this.isValid(target)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		return target.updateTime(time);
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
		this.findPlayerById(player).deleteSleepList();
	}
	resetAvatar(player){				/* 등번호 초기화 */
		this.findPlayerById(player).resetAvatar();
	}
	
	showMutedList(player, isPublic){	/* 채팅 금지 명단 출력 */
		let getMsg = function(pub){
			if(CS.isFreezeChat) return "현재 채팅창이 얼려져 있습니다";
			let mutedPlayers = AMN.findMutedList(pub);
			return mutedPlayers.length > 0 ? mutedPlayers.map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ") : "비어 있음";
		}
		NC.info("채팅 금지 명단", getMsg(isPublic), player, null);
	}
	showSleepList(player, isPublic){	/* 장기 대기열 명단 출력 */
		let getAfks = function(pub){
			return PM.findPlayerList().filter(p => {
				return p.isSleep == false ? false : pub == true ? true : (p.localId > 0);
			});
		}
		let afkList = getAfks(isPublic);
		let msg = afkList.length > 0 ? afkList.map(p => p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)).join(" | ") : "비어 있음";
		NC.info("장기 대기열 명단", msg, player, null);
	}
	
	cntPlayers(team){					/* 접속자 인원 구하기 */
		let pl = room.getPlayerList().filter(p => p.id != 0);
		if(Object.hasOwn(Object.values(c_TEAM), team))
			return pl.filter(p => p.team == team).length;		//	팀별 접속자
		return (team == "public" ? this.pyl : pl).length;		//	모든 접속자
	}
	enableSleepMode(player, bool){		/* 장기 대기열 플레이어 설정 */
        if(bool) this.addSleepPlayer(player);
        else this.deleteSleepPlayer(player);
		SYS.updatePlayerById(player);	//	플레이어 데이터베이스에 따라 대시보드 갱신
		if(AMN.hasAdmin(player, c_ADMIN_TYPE.SUPER_ADMIN) == false && AMN.cntAdmins(c_ADMIN_TYPE.SUPER_ADMIN) > 1) return;
		AMN.updateAdmins();
	}
	giveAvatar(player, msg){			/* 등번호 설정 */
		this.findPlayerById(player).giveAvatar(msg);
	}
	moveTeam(player, team){		return PM.findPlayerById(player).moveTeam(team); }		/* 팀 지정 */
}
class PlayerSystem{             /*** 플레이어 시스템 클래스 ***/
    #id;                                /* 플레이어 ID */
	#nickname;                          /* 플레이어 닉네임 */
	#team;                              /* 플레이어 팀 */
	#address;                           /* 공용 주소 */
	#admin;                             /* 권한 */
	#region;                            /* 지역 */
	#language;                          /* 언어 */
	#chatmode		= 0;                /* 기본 채팅 모드 */
	#totalWarn		= 0;                /* 금지어 누적 감지량 */
	#hasKicked		= false;            /* 강제 퇴장 여부 */
	#isMute		    = false;            /* 채팅 금지 여부 */
	#isSleep		= false;            /* 장기 대기열 플레이어 여부 */
	#network;                           /* 공용 네트워크 */
	#time			= TM.date.time;     /* 최근 활동 시간 */
	#joinedTime		= this.time;        /* 입장 시간 */
	#leftTime		= null;             /* 퇴장 시간 */
	#uniqueAvatar	= null;             /* 개인 등번호 */

	constructor(id, name, team, admin, conn, auth, region, language){
		(async function(t){
			t.#id		    = id;
			t.#nickname     = name;
			t.#address	    = conn;
			t.#network	    = auth;
			t.#region		= region;
			t.#language		= language;
			t.#team			= team;
			t.#admin		= admin == true ? 2 : 0;
		})(this);
	}
    get id(){               return this.#id; }                                                          /* 공용 ID */
    get name(){             return this.#nickname; }													/* 플레이어 닉네임 */
    get team(){             return this.#team; }	                                                    /* 플레이어 팀 */
    get addr(){             return this.#address; }                                                     /* 공용 주소 */
    get admin(){            return this.#admin; }                                                       /* 권한 */
	get rgn(){				return this.#region; }														/* 지역 */
	get lng(){				return this.#language; }													/* 언어 */
    get totalWarn(){		return this.#totalWarn; }                                                   /* 금지어 감지량 */
	get chmd(){				return this.#chatmode; }													/* 기본 채팅 모드 */
	get discProp(){			return room.getPlayerDiscProperties(this.id); }								/* 플레이어 객체 속성 */
	get dpPosition(){		return ({'x' : this.discProp.x, 'y' : this.discProp.y}); }					/* 좌표 */
	get dpGraVect(){	    return ({'x' : this.discProp.xgravity, 'y' : this.discProp.ygravity}); }	/* 중력 벡터 */
	get dpSpdVect(){	    return ({'x' : this.discProp.xspeed, 'y' : this.discProp.yspeed}); }		/* 속도 벡터 */
    get hasKicked(){        return this.#hasKicked; }                                                   /* 강제 퇴장 여부 */
    get isMute(){           return this.#isMute; }                                                      /* 채팅 금지 여부 */
    get isSleep(){          return this.#isSleep; }                                                     /* 장기 대기열 플레이어 여부 */
    get ntwk(){             return this.#network; }                                                     /* 공용 네트워크 */
	get time(){				return this.#time; }														/* 최근 활동 시간 */
	get jndTime(){			return this.#joinedTime; }													/* 입장 시간 */
	get lftTime(){																						/* 퇴장 시간 */
		if(this.hasJoined()) return -1;
		return this.#leftTime;
	}
	get localId(){																						/* 개인 ID */
		let pl = room.getPlayerList().sort((a, b) => a - b);
		return pl.findIndex(p => p.id == this.id) + (NOPLAYER ? 1 : 0);
	}
	get tagGrade(){													                                    /* 플레이어 권한 마크 */
        let getIndex = function(a, n){
            switch(a){
                case c_ADMIN_TYPE.SUPER_ADMIN:  return 1;
                case c_ADMIN_TYPE.CORE_ADMIN:   return 2;
                default:                        return (AMN.isBlacklist(n, false) ? 1 : 0) + 3;
            }
        }
        return c_TAG_GRADE.at(getIndex(this.admin, this.id));
	}
	get unqAvtr(){			return this.#uniqueAvatar; }												/* 개인 등번호 */
	
    set admin(value){           /* 권한 */
        if(!Object.values(c_ADMIN_TYPE).includes(value)) throw LM.error(c_ERROR_TYPE.E_PLAYER_ADMIN);
        this.#admin = value;
    }   
	set rgn(value){			    /* 지역 */
        this.#region = value;
    }
	set lng(value){			    /* 언어 */
		this.#language = value;
	}
	set chmd(value){	        /* 기본 채팅 모드 */
		let titleList = ["전체", "팀"];
		if(this.chmd == value) return NC.caution("이미 채팅 기본 모드가 %d 채팅으로 설정돼 있습니다", this.id, "?chatmode", titleList[value]);
		this.#chatmode = value;
		NC.notice("채팅 기본 모드가 %d 채팅으로 변경되었습니다.", this.id, null, titleList[value]);
	}
    set totalWarn(value){       /* 금지어 누적 감지량 */
        this.#totalWarn = value;
    }
	set discProp(value){	    /* 플레이어 객체 속성 */
		room.setPlayerDiscProperties(this.id, value);
	}
    set hasKicked(value){       /* 강제 퇴장 여부 */
        if(typeof value != "boolean") throw LM.error(c_ERROR_TYPE.E_PLAYER_INFO);
        this.#hasKicked = value;
    }
	set unqAvtr(value){		    /* 개인 등번호 */
		this.#uniqueAvatar = (value == null || value == undefined ? null : value.toString());
		this.resetAvatar();
	}
	
	isAfk(time){						                                                                /* 비활동 플레이어 감지 */
		let limit = SYS.hasInRange(time, 5, 60 * 60 * 3) ? time : GM.afkTime;
		if(!SYS.hasInRange(limit, 5, 60 * 60 * 3)) return false;					//	범위 내 값이면 판정 생략
		if(!this.hasJoined()) return false;											//	미접속자인 경우
		return !([
			GM.gameStats == c_GAME_STATS.TICK && this.team == c_TEAM.SPECTATOR,		//	경기 도중 관전이면 처리 중단
			GM.gameStats != c_GAME_STATS.TICK && this.admin < 1,					//	경기 미진행 상태에서 관리자가 아닌 경우 처리 중단
			this.#isSleep == true,													//	장기 대기열 명단에 포함되면 처리 중단
			TM.date.time - this.time < limit * SEC_TO_MS
		].some(st => st == true));
	}
	hasCommonRange(ball, range){		                                                                /* 충돌 여부 판정 */
		let d = SC.findDiscProp(ball);					//	디스크 속성
		let t = this.discProp;							//	플레이어 속성
		if(d == null || t == null) return -1;			//	객체를 구할 수 없는 경우
		let detectedCollision = (dp, tp, dr, tr, cr) => SC.calcDistance(dp, tp) <= Math.pow(Math.round((dr + tr) * cr), 2);
		return detectedCollision(d, t, d.radius, t.radius, range >= 1 ? range : SC.collRange);
	}
	hasJoined(){			return SYS.hasInRange(this.localId, 0, PM.cntPlayers(), NOPLAYER); }        /* 접속 여부 */

    findChatHistory(){		/* 채팅 기록 구하기 */
		let hasMatchedPlayer = function(t, s, m, j, f, g, p){
			if(j - m > 0) return false;
			if(f - j > 0 && SYS.hasInRange(m, j, f) == false) return false;
			if(t != c_TAG_NOTFCN.NOTITLE) return false;
			if(s != "chatMessage") return false;
			if(Array.isArray(g)) return g.includes(p);
			if(!PM.isValid(g)) return true;
			return (g == p);
		}
		return NC.ntl.filter(v => hasMatchedPlayer(v.tag, v.name, v.time, this.jndTime, this.lftTime, v.targets, this.id));
	}
	findNotiHistory(){		/* 알림 기록 구하기 */
		let hasMatchedPlayer = function(t, s, m, j, f, g, p){
			if(j - m > 0) return false;
			if(f - j > 0 && SYS.hasInRange(m, j, f) == false) return false;
			if(!SYS.hasInRange(t, c_TAG_NOTFCN.CAUTION, c_TAG_NOTFCN.BRIEF)) return false;
			if(s == "chatMessage") return false;
			if(Array.isArray(g)) return g.includes(p);
			if(!PM.isValid(g)) return true;
			return (g == p);
		}
		return NC.ntl.filter(v => hasMatchedPlayer(v.tag, v.name, v.time, this.jndTime, this.lftTime, v.targets, this.id));
	}
	
	addSleepList(){			/* 장기 대기열 명단 추가 */
		this.#isSleep = true;
		if(this.team != c_TEAM.SPECTATOR) this.moveTeam(c_TEAM.SPECTATOR);
		AMN.deleteAdmin(this.id);	//	최고 권한 → 보조 권한으로 격하
		AMN.updateAdmins();
		SYS.updatePlayerById(this.id);
		NC.notice("%d님이 자리를 비웠습니다.", this.id * -1, null, this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
		NC.uniMsg(c_LIST_ICON.NORMAL + "자리 비움", "게임에 다시 참여하려면 명령어를 한 번 더 입력하세요.", this.id, "!afk");
		LM.log(true, "대기열 추가: %d", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
	}

    updateTeam(v){          /* 플레이어 팀 갱신 */
        if(!Object.hasOwn(Object.values(c_TEAM), v)) throw LM.error(c_ERROR_TYPE.E_PLAYER_INFO);
        this.#team = v;
    }
    updateTime(t){			/* 응답 시간 갱신 */
		this.#time = t;
		for(let ot of ["afkTimer", "afkAvatar", "afkCheck"]){	//	이전 타이머 지우고 새로 갱신
			TM.clearTimerByName(ot, this.id);
		}
		if(GM.afkTime == false) return;
		let afkChckTimer = TM.addTimer("afkCheck", () => {		//	장기 무응답 플레이어 판정
			let tp = PM.findPlayerById(afkChckTimer.player);
			if(!tp.isAfk()) return;
			for(let pp of PM.findPlayerList()){					//	경고 메시지 출력
				if(pp.id == tp.id)
					return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 알림",
					"반응이 없으면 퇴장될 수 있습니다",
					pp.id, (pp.team == c_TEAM.SPECTATOR ? "!afk" : "!join spec"), c_LIST_COLOR.SILVER);
				if(pp.admin < c_ADMIN_TYPE.SUPER_ADMIN || pp.admin < tp.admin) return;
				if(pp.team == c_TEAM.SPECTATOR || pp.team == tp.team)
					return NC.extMsg(c_LIST_ICON.NEGATIVE + "비활동 플레이어 안내",
					"%d님의 반응이 없는 경우, 자동으로 퇴장됩니다",
					pp.id, NC.fmtStr("!join spec #%d", tp.id), c_LIST_COLOR.SILVER, null, 0, tp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			};
			let avatarTimer = TM.addTimer("afkAvatar", {		//	등번호 알림
				EXECUTE : () => {
					let tmList = avatarTimer.findTimerByName();
					if(!tmList.length) return;
					let target = tmList.at(-1);
					if(avatarTimer.calcCurrentSequence(target.seq, 2) == 0)
						PM.giveAvatar(avatarTimer.player, "잠수");
					else
						PM.resetAvatar(avatarTimer.player);
				},
				TERMINATE : () => {
					PM.resetAvatar(avatarTimer.player);
				}
			}, afkChckTimer.player, SEC_TO_MS, true);
		}, this.id, GM.afkTime * SEC_TO_MS);
		let afkTimer = TM.addTimer("afkTimer", () => {			//	퇴장 처리
			if(PM.isAfkPlayer(afkTimer.player, afkTimer.delay))
				PM.onPlayerInactivity(afkTimer.player);
		}, afkChckTimer.player, afkChckTimer.delay * 1.5);
	}

	clearPlayer(){			/* 플레이어 데이터베이스 지우기 */
		SYS.clearPlayerById(this.id);				//	리스트 지우기
		SC.clearTouchedListByPlayer(this.id);		//	선두자 데이터베이스 지우기
		TM.clearTimerByPlayer(this.id);				//	타이머 지우기
		this.#team			= c_TEAM.SPECTATOR;
		this.#time			= TM.date.time;
		this.#leftTime		= this.time;
		this.#chatmode		= 0;
		this.#isSleep		= false;
		if(this.#hasKicked){
			this.admin		= c_ADMIN_TYPE.NON_ADMIN;
			this.hasKicked	= false;
		}
		PM.findPlayerList().forEach(p => SYS.updatePlayerById(p.id));
	}
	deleteAdmin(isSub){		/* 권한 해제 */
		let pa = this.admin;
		room.setPlayerAdmin(this.id, false);
		if(isSub == true || pa == c_ADMIN_TYPE.CORE_ADMIN){
			this.admin = c_ADMIN_TYPE.NON_ADMIN;
			SYS.updatePlayerById(this.id);
			NC.notice("%d님에게 %d이 해제되었습니다.", null, null, [this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME), pa == 1 ? "보조 권한" : "최고 권한"]);
			LM.log(true, "%d에게 %d이 삭제됨.", c_LOG_TYPE.NOTICE, [this.showPlayerInfo(), pa == 1 ? "보조 권한" : "최고 권한"]);
		}
	}
	deleteSleepList(){      /* 장기 대기열 명단 제거 */
		this.#isSleep = false;
		LM.log(true, "대기열 제거: %d", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
		AMN.updateAdmins();
		SYS.updatePlayerById(this.id);
		NC.notice("게임에 바로 참여할 준비가 되었습니다! ", this.id, "!join");
	}
	resetAvatar(){			/* 등번호 초기화 */
		this.giveAvatar(this.unqAvtr);
	}
	
	showPlayerInfo(type){	/* 플레이어 정보 출력 */
		let name = CS.isWhiteSpace(this.name) ? "공백" : this.name;
		let ml = {
			[c_PLAYERINFO_TYPE.LOCAL]	: NC.fmtStr("(%d)%d", [(PM.cntPlayers() >= 10 ? SYS.fillLine(this.localId, 2) : this.localId), name]),
			[c_PLAYERINFO_TYPE.PUBLIC]	: NC.fmtStr("(#%d)%d", [this.id, name]),
			[c_PLAYERINFO_TYPE.NAME]	: name
		}
		if(Object.hasOwn(ml, type)) return ml[type];
		return NC.fmtStr("%d(#%d)%d", [(PM.cntPlayers() >= 10 ? SYS.fillLine(this.localId, 2) : this.localId), this.id, name]);
	}
	
	adjustGraVect(x, y){	/* 플레이어 중력 벡터 변경 */
		this.discProp = {"xgravity" : x, "ygravity" : y };
	}
	adjustSpdVect(x, y){	/* 플레이어 속도 벡터 변경 */
		this.discProp = {"xspeed" : x, "yspeed" : y };
	}
	giveAdmin(isSub){			/* 권한 부여 */
		let grade = AMN.isBlacklist(this.id, false) == true || isSub == true ? 1 : 2;
		if(grade == this.admin) return;									    //	이미 권한이 있는 경우(중복 부여)
		if(AMN.cntAdmins(grade) >= AMN.maxAdmin * (grade == 2 ? 1 : 2))		//	최대 인원을 초과한 경우(부여 제한)
			return;
		this.admin = grade;												    //	블랙리스트에 포함되는 경우, 항상 보조 권한으로 부여
		room.setPlayerAdmin(this.id, grade == 2);
		if(grade == 1){
			NC.notice("%d님에게 보조 권한이 부여되었습니다.", null, null, this.showPlayerInfo(c_PLAYERINFO_TYPE.NAME));
			LM.log(true, "%d에게 보조 권한이 부여됨.", c_LOG_TYPE.NOTICE, this.showPlayerInfo());
		}
		SYS.updatePlayerById(this.id);			//	플레이어 데이터베이스에 따라 대시보드 갱신
	}
	giveAvatar(str){			/* 등번호 지정 */
		room.setPlayerAvatar(this.id, str == null || str == undefined ? null : str.toString());
	}
	movePosition(dx, dy){		/* 플레이어 좌표 이동(상대 좌표) */
		this.discProp = {'x' : this.dpPosition.x + dx, 'y' : this.dpPosition.y + dy};
	}
	moveTeam(t){				/* 플레이어 팀 이동 */
		if(!Object.hasOwn(Object.values(c_TEAM), t)) throw LM.error(c_ERROR_TYPE.E_ETC);
		room.setPlayerTeam(this.id, t);
	}
    mute(bool){                 /* 플레이어 채팅 금지 */
        if(typeof bool != "boolean") return -1;
        this.#isMute = bool;
    }
	teleportPosition(tx, ty){	/* 플레이어 좌표 변경(절대 좌표) */
		this.discProp = {'x' : tx, 'y' : ty};
	}
}
class ScoreManager{             /*** 점수 클래스 ***/
	#totalGoals		= {				    /* 팀 누적 골 */
		[c_TEAM.RED] : 0,
		[c_TEAM.BLUE] : 0
	};
	#rankList		= new Array();		/* 전적 데이터베이스 */
	#touchedList	= new Array();		/* 선두자 데이터베이스 */
    #collisionRange;		            /* 충돌 범위 민감도 */
    #win;                               /* 승리 */
    #goal;                              /* 득점 */
    #lost;                              /* 패배 */
    #ownGoal;                           /* 실점 */
    #assist;                            /* 도움 */
        
	constructor(collisionSensitivity, win, lost, goal, ownGoal, assist){
		(async function(t){
			t.#collisionRange		= collisionSensitivity;		/* 충돌 범위 민감도 */
        	t.#win               	= win;                      /* 승리 */
        	t.#lost              	= lost;                     /* 패배 */
        	t.#goal              	= goal;                     /* 득점 */
        	t.#ownGoal           	= ownGoal;                  /* 실점 */
        	t.#assist            	= assist;                   /* 도움 */
		})(this);
	}

	get collRange(){		return this.#collisionRange; }						/* 충돌 범위 민감도 */
	get gameTime(){			return this.scores.time; }							/* 경기 시간 */
	get lastTouchedPlayer(){													/* 최근 선두자 */
		return this.tchdLst.length == 0 ? null : this.tchdLst[0];
	}
	get limitScore(){		return !this.scores ? 0 : this.scores.scoreLimit; }	/* 경기 제한 점수 */
	get limitTime(){		return !this.scores ? 0 : this.scores.timeLimit; }	/* 경기 제한 시간 */
	get scores(){			return room.getScores(); }							/* 점수 데이터베이스 */
	get totalRedGoals(){	return this.#totalGoals[c_TEAM.RED]; }				/* 레드팀 누적 골 */
	get totalBlueGoals(){	return this.#totalGoals[c_TEAM.BLUE]; }				/* 블루팀 누적 골 */
    get wn(){               return this.#win; }                                 /* 승리 */
    get lst(){              return this.#lost; }                                /* 패배 */
    get gl(){               return this.#goal; }                                /* 득점 */
    get og(){               return this.#ownGoal; }                             /* 실점 */
    get ast(){              return this.#assist; }                              /* 도움 */
    get tchdLst(){          return this.#touchedList; }                         /* 선두자 데이터베이스 */
    get rnkLst(){           return this.#rankList; }                            /* 전적 데이터베이스 */

	set collRange(v){			/* 충돌 범위 민감도 */
		if(v == this.collRange) return LM.log(false, "중복된 값으로 접근됨", c_LOG_TYPE.WARNING);
		if(!SYS.hasInRange(v, 0, 16, true)) return LM.log(false, "올바르지 않는 값으로 접근됨", c_LOG_TYPE.WARNING);
		LM.log(true, "충돌 범위 민감도가 %d에서 %d(으)로 변경됨", c_LOG_TYPE.NOTICE, [this.collRange, v]);
		this.#collisionRange = v;
	}
	set totalRedGoals(v){		/* 레드팀 누적 골 */
		this.#totalGoals[c_TEAM.RED] = v;
	}
	set totalBlueGoals(v){		/* 블루팀 누적 골 */
		this.#totalGoals[c_TEAM.BLUE] = v;
	}

	onPlayerTeamChange(player, byPlayer){	/* 팀 교체 이벤트 */
		let target = this.tchdLst.filter(t => t.id == player.id);
		if(target.length > 0) this.clearTouchedListByPlayer(player.id);
	}
	onPositionsReset(){						/* 득실점 판정 직후 참가자 좌표 초기화 이벤트 */
		this.clearTouchedList();			//	선두자 명단 모두 지우기
	}

	initRankList(player){			    /* 전적 명단 초기화 */
		return this.rnkLst.push(new StatusSystem(player));
	}
	initTouchedList(player){		    /* 선두자 전적 데이터베이스 초기화 */
		return this.tchdLst.unshift(new TouchedPlayer(player));
	}

	hasCommonRange(da, db, range){		/* 충돌 여부 판정 */
		if(da == null || db == null) return -1;		//	객체를 구할 수 없는 경우
		let detectedCollision = (dp, tp, dr, tr, cr) => SC.calcDistance(dp, tp) <= Math.pow(Math.round((dr + tr) * cr), 2);
		return detectedCollision(da, db, da.radius, db.radius, range >= 1 ? range : this.collRange);
	}

	findAssist(target){					/* 어시스트 구하기 */
		let tl = this.tchdLst.slice(0, this.tchdLst.length > 5 ? 5 : this.tchdLst.length);
		if(tl.length < 2) return false;							//	선두자 명단이 한 명이면 어시스트를 계산하지 않음
		if(!PM.isValid(target.id)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		if(PM.cntPlayers(target.team) < 2) return false;		//	팀원이 2명 이상이면 처리
		return tl.find(tp => target.team == tp.team && tp.id != target.id);
	}
	findDiscColor(target){				/* 디스크 색상 16진수로 변환 */
		let dp = this.findDiscProp(target);
		if(dp == null) return -1;
		return dp.color.toString(16);
	}
	findDiscProp(target){				return room.getDiscProperties(target); }								/* 디스크 객체 구하기 */
	findRankListByGrade(grade){			return this.rnkLst.sort((a, b) => b.scores - a.scores).at(grade); }	    /* 전적 명단 순위로 찾기 */
	findRankListByPlayer(target){		return this.rnkLst.find(r => r.id == target); }						    /* 전적 명단 플레이어로 찾기 */
	findTouchedListByPlayer(target){	return this.tchdLst.find(p => p.id == target); }					    /* 선두자 명단 플레이어로 찾기 */
	findWinner(scores){																							/* 승리 팀 판정 */
		if(scores.red > scores.blue) return c_TEAM.RED; 	//	레드팀 승
		if(scores.red < scores.blue) return c_TEAM.BLUE; 	//	블루팀 승
		return 3;											//	무승부
	}

	addTouchedList(player){			/* 선두자 명단 추가 */
		let hasNull = (this.tchdLst.length == 0);
		let oldLtPlayer = this.lastTouchedPlayer;
		if(oldLtPlayer != null)
			this.clearTouchedListByPlayer(oldLtPlayer.id);
		this.initTouchedList(player);		//	0번째 요소로 초기화
		SYS.updatePlayerById(player);
		if(hasNull){
			let ltTimer = TM.addTimer("lastTouchedPlayer", () => {
				let nowLtPlayer = this.lastTouchedPlayer;
				if(nowLtPlayer == null) return;
				switch(nowLtPlayer.id){
					case player:
						if(nowLtPlayer.hasCommonRange(0)){	//	계속 선두하고 있으면
							ltTimer.clearTimer();			//	타이머 종료
							break;
						}
					default:
						this.clearTouchedListByPlayer(player);
				}
			}, player, 5 * SEC_TO_MS);
			if(this.tchdLst.length > 1)	//	데이터베이스 갱신
				SYS.updatePlayerById(this.tchdLst[1].id);
		}
		return !hasNull;
	}

	updateAccount(op, np){			/* 계정 전적 동기화 */
		let oldPlayer = this.findRankListByPlayer(op);
		let newPlayer = this.findRankListByPlayer(np);
		for(const [k, v] of Object.entries(oldPlayer)){
			if(k != "id") newPlayer[k] = v;
		}
		this.rnkLst.splice(this.rnkLst.indexOf(oldPlayer), 1);
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
			if(this.tchdLst[0] != null && this.tchdLst[0].id == target) return;
			this.addTouchedList(target);
		}
	}
			
	clearRankListByPlayer(player){		return this.findRankListByPlayer(player).clearPlayer(); }		/* 전적 명단 지우기 */
	clearTouchedList(){																					/* 선두자 명단 지우기 */
		this.tchdLst.forEach(t => this.clearTouchedListByPlayer(t.id));
	}
	clearTouchedListByPlayer(player){																	/* 선두자 명단 지우기 */
		let tl = this.tchdLst;
		let target = tl.find(t => t.id == player);
		if(target == undefined) return;
		tl.splice(tl.indexOf(target), 1);
		SYS.updatePlayerById(target.id);
	}

	sendRanking(target, player){	    /* 전적 메시지 보내기 */
		if(!PM.isValid(player)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		let findTarget = function(p){
			let rp = SC.findRankListByPlayer(p.id);
			if(PM.isValid(rp)) return rp;
			return PM.findPlayerList(true).filter(r => r.ntwk == p.ntwk).map(r => SC.findRankListByPlayer(r.id)).at(-1);
		}
		let tp = findTarget(PM.findPlayerById(PM.isValid(target) ? target : player));
		NC.info("플레이어 순위", tp.records.join(newLine), player, NC.fmtStr("!stats #%d", tp.id));
	}

	calcDistance(a, b){			return (Math.pow(Math.round(a.x - b.x), 2) + Math.pow(Math.round(a.y - b.y), 2)); }					/* 두 객체 간 거리 구하기 */
	calcGoalsByTeam(team){		return !this.scores ? null : team == c_TEAM.RED ? this.scores.red : this.scores.blue; }				/* 경기 득점 골 구하기 */
	calcGravityVector(target){	return ({'x' : this.findDiscProp(target).xgravity, 'y' : this.findDiscProp(target).ygravity}); }	/* 중력 벡터 구하기 */
	calcPosition(target){		return ({'x' : this.findDiscProp(target).x, 'y' : this.findDiscProp(target).y}); }					/* 좌표 구하기 */
	calcSpeedVector(target){	return ({'x' : this.findDiscProp(target).xspeed, 'y' : this.findDiscProp(target).yspeed }); }		/* 속도 벡터 구하기 */
	calcTotalGoalsByTeam(team){	return this.#totalGoals[team]; }																	/* 득점 누적 골 구하기 */
}
class StatusSystem{             /*** 전적 매니저 클래스 ***/
    #id;                        /* 플레이어 공용 ID */
	#win		= 0;	        /* 승리한 경기 수 */
	#lost		= 0;	        /* 패배한 경기 수 */
	#goal		= 0;	        /* 득점한 골 수 */
	#ownGoal	= 0;	        /* 실점한 골 수 */
	#assist     = 0;	        /* 도움 횟수 */
        
	constructor(id){
		(async function(t){
			t.#id	= id;  /* 플레이어 공용 ID */
		})(this);
	}
	get asst(){		return this.#assist; }                                      /* 도움 횟수 */
	get goal(){		return this.#goal; }                                        /* 득점한 골 수 */
	get grade(){	return SC.rnkLst.findIndex(rl => rl.id == this.id); }       /* 플레이어 순위 */
    get id(){       return this.#id; }                                          /* 플레이어 공용 ID */
	get lost(){		return this.#lost; }		                                /* 패배한 경기 수 */
	get owgl(){		return this.#ownGoal; }		                                /* 실점한 골 수 */
	get scores(){								                                /* 플레이어 점수 계산 */
		return (this.win	* SC.wn		//	승리
		+ this.goal			* SC.gl		//	득점
		+ this.asst			* SC.ast	//	도움
		+ this.lost			* SC.lst	//	패배
		+ this.owgl 		* SC.og		//	실점
		);
	}
	get status(){								                                /* 기록 정보 */
		return NC.fmtStr("%0등(%1점): %2", [this.grade + 1, this.scores, SYS.showPlayerInfo(this.id, c_PLAYERINFO_TYPE.PUBLIC)]);
	}
	get about(){								                                /* 상세 기록 정보 */
		let result = [
			[NC.fmtStr("점수: %0점(%1등)", [this.scores, this.grade + 1])],
			[NC.fmtStr("경기: %0판 %1승 %2패(%3%)", [this.win + this.lost, this.win, this.lost, this.winPct])],
			[NC.fmtStr("기록: %0도움 %1골", [this.asst, this.goal + this.owgl])]
		];
		if(this.owgl > 0) result.push([NC.fmtStr("(자책: %d골)", this.owgl)]);
		return result.join(newLine);
	}
	get records(){								                                /* 순위 정보 */
		SC.rnkLst.sort((a, b) => b.scores - a.scores);		//	점수 내림차순으로 정렬
		let len = SC.rnkLst.length;
		let searchIndex = this.grade;
		let startIndex = SYS.hasInRange(searchIndex, 2, len - 1) ? (len - searchIndex > 2 ? (searchIndex - 2) : (len - 4)) : 0;
		let endIndex = SYS.hasInRange(searchIndex, 0, len - 3) ? startIndex + 4 : len - 1;
		return SC.rnkLst.slice(startIndex, endIndex + 1).map(r => NC.fmtStr("%0%1", [(r.id == this.id ? '▶' : '▷'), r.status]));
	}
	get win(){		return this.#win; }			                                /* 승리한 경기 수 */
	get winPct(){								                                /* 승률 */
		let cntWin = this.win;			//	승전
		let cntLost = this.lost;		//	패전
		let sum = cntWin + cntLost;		//	누적 경기
		return (sum > 0 ? cntWin / sum * 100 : 0).toFixed(2);	//	소수점 둘째 자리까지 반올림
	}
	
	set asst(v){		/* 도움 횟수 */
		this.#assist = v;
	}
	set goal(v){		/* 득점한 골 수 */
		this.#goal = v;
	}
	set lost(v){		/* 패배한 경기 수 */
		this.#lost = v;
	}
	set owgl(v){		/* 실점한 골 수 */
		this.#ownGoal = v;
	}
	set win(v){			/* 승리한 경기 수 */
		this.#win = v;
	}
	
	clearPlayer(){		/* 플레이어 데이터베이스 지우기 */
		this.win		= 0;
		this.lost		= 0;
		this.goal		= 0;
		this.owgl		= 0;
		this.asst		= 0;
	}
}
class TouchedPlayer{            /*** 선두자 매니저 클래스 ***/
	#id;								    /* 플레이어 공용 ID */
	#disc		= SC.findDiscProp(0);	    /* 0번째 디스크 속성 */
	#pos;								    /* 플레이어 좌표 */
	#team;								    /* 플레이어 팀 */
	#time		= SC.gameTime;			    /* 감지 시간 */

	constructor(id){
		(async function(t){
			t.#id		= id;                          			/* 플레이어 공용 ID */
			t.#team		= PM.findPlayerById(id).team;			/* 플레이어 팀 */
			t.#pos		= PM.findPlayerById(id).dpPosition;		/* 플레이어 좌표 */
		})(this);
	}
    get id(){       return this.#id; }      /* 플레이어 공용 ID */
	get disc(){     return this.#disc; }	/* 0번째 디스크 속성 */
	get pos(){      return this.#pos; }     /* 플레이어 좌표 */
    get team(){     return this.#team; }	/* 플레이어 팀 */
	get time(){     return this.#time; }	/* 감지 시간 */
    
	hasCommonRange(ball, range){		    /* 충돌 여부 판정 */
		return PM.findPlayerById(this.id).hasCommonRange(ball, range);
	}
}
class TimeManager{              /*** 시간 매니저 클래스 ***/
    #timeFormats;               			/* 시간 출력 형식 */
	#timerList		= new Array();			/* 타이머 목록 */

	constructor(timeFormats){
		(async function(t){
			t.#timeFormats	= timeFormats;			/* 시간 출력 형식 */
		})(this);
	}

	get date(){		return this.initDate(); }               /* 날짜 및 시간 */
	get fmtTime(){	return this.#timeFormats; }				/* 시간 출력 형식 */
	get meridiem(){	return this.hours >= 12 ? 2 : 1; }		/* 오후 및 오전 */
    get tml(){      return this.#timerList; }               /* 타이머 목록 */

	set fmtTime(index){		                                /* 시간 출력 형식 */
		if(!Object.hasOwn(Object.values(c_TIME_TYPE), index)) throw LM.error(c_ERROR_TYPE.E_ETC);
		this.#timeFormats = index;
	}

	initDate(milliseconds){                                                             /* 시간 초기화 */
		return new DateSystem(milliseconds);
	}
	initTimer(name, id, func, player, delay, isRepeat, preId, seq){						/* 타이머 초기화 */
		if(name == undefined || name == null) throw LM.error("타이머는 고유의 이름을 가져야 합니다.");
		let getStartOrder = function(str){
			if(seq > 0) return seq;
			let targets = TM.findTimerByName(str, player);
			return SYS.hasInRange(targets.length, 0, 2) ? 0 : targets.at(-1).seq + 1;
		}
		let getFnByName = str => Object.entries(func).find(([key]) => key.toUpperCase() == str);
		let fl = ["EXECUTE", "TERMINATE"].map(str => getFnByName(str));
		let executeFn = fl[0] ? fl[0][1] : func;
		let terminateFn = (fl[1] ? fl[1][1] : null);
		let tm = new TimerSystem(name, id, executeFn, terminateFn, delay, preId, player, seq);
		if(isRepeat == true){
			if(typeof delay != "number" || delay < 100){
                console.log("delay==" + delay);
				throw LM.error("너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다");
            }
			if(SYS.hasInRange(delay, SEC_TO_MS / 10, SEC_TO_MS - 1) == true && ((getStartOrder(name) - 1) / 2) * delay > 60 * SEC_TO_MS)
				LM.log(false, ["너무 짧은 간격 시간은 성능에 영향을 끼칠 수 있습니다",
				"타이머 ID: %d", "타이머 이름: %d", "타이머 간격: %dms"].join(newLine), c_LOG_TYPE.WARNING, [id, name, delay.toFixed(4)]);
		}
		return tm;
	}

	findTimer(findId){				return this.tml.find(tm => tm.id == findId); }			/* 타이머 ID로 찾기 */
	findTimerByName(name, player){															/* 타이머 이름으로 찾기 */
		return (PM.isValid(player) ? this.findTimerByPlayer(player) : this.tml).filter(tm => tm.name == name);
	}
	findTimerByPlayer(target){		return this.tml.filter(tm => tm.player == target); }	/* 타이머 플레이어로 찾기 */
	findTimers(target, hasTarget){															/* 타이머 목록 구하기 */
		let isEquals = (a, b) => a.toString() === b.toString();
		let getEqualTimers = function(tt){
			return TM.tml.filter(tm => {
				if(tm.length > 0 && isEquals(tt.exctFn, tm.exctFn) == false)
					return false;
				return hasTarget == true ? true : tm.id != tt.id;
			});
		}				
		let timers = getEqualTimers(target);
		if(target.isRepeat){			//	반복 타이머 포함
			let rpTm = this.findTimer(NC.fmtStr("%dr", target.id));
			if(rpTm) timers.concat(getEqualTimers(rpTm));
		}
		return timers;
	}

	addTimer(name, func, player, delay, isRepeat, runDirectly, seq){		                /* 타이머 추가 */
        let queue = this.date.time - SYS.stpTime.time;
		let startId = NC.fmtStr("Timer-%0-%1", [queue, this.tml.filter(t => t.id.split('-').at(1) == queue).length]);
		let st = this.initTimer(name, startId, func, player, delay, isRepeat, null, seq);
		this.tml.push(st);
		let getStartOrder = function(str){
			if(seq > 0) return seq;
			let targets = TM.findTimerByName(str, player);
			if(SYS.hasInRange(targets.length, 0, 2)) return 0;
			return targets.at(-1).seq + 1;
		}
		if(isRepeat == true){
			let repeatId = NC.fmtStr("%dr", startId);
            let fn = () => {
				this.addTimer(name, func, player, delay, true, false, getStartOrder(name) + 2);
				if(this.findTimer(startId) == undefined) return;
				if(this.findTimer(repeatId) == undefined) return;
			};
            if(runDirectly == true && isRepeat == true) fn();
			let rt = this.initTimer(name, repeatId, fn, player, delay, true, startId, getStartOrder(name) + 1);
			this.tml.push(rt);
		}
		for(let t of this.tml.filter(t => {					//	이미 처리한 타이머 지우기
			let marginTime = t.delay / 10 + SEC_TO_MS;		//	오차범위
			if(SYS.hasInRange(this.date.time - t.time, 0, (t.isRepeat ? 2 : 1) * t.delay + marginTime)) return false;
			return t.id != startId;
		})){
			t.clearTimer(true);
		}
		return st;
	}

	clearTimer(findId, skipTrmnFn){                                                         /* 타이머 지우기(ID) */
		let tm = this.findTimer(findId);
		if(tm == undefined) return;
        tm.clearTimer(skipTrmnFn);
    }
	clearTimerByName(name, player){															/* 타이머 지우기(이름) */
		this.findTimerByName(name, player).forEach(tm => tm.clearTimer());
	}
	clearTimerByPlayer(player){																/* 타이머 지우기(플레이어) */
		this.findTimerByPlayer(player).forEach(tm => tm.clearTimer());
	}
	resetTimers(){																			/* 타이머 초기화 */
		this.tml.forEach(tm => tm.clearTimer());
	}
}
class DateSystem{               /*** 시간 시스템 클래스 ***/
	#milliseconds;              /* 밀리초 */

	constructor(milliseconds){
		(async function(t){
			t.#milliseconds	= milliseconds;
		})(this);
	}

	get date(){												/* 날짜 */
		if(typeof this.#milliseconds != "number")
			this.#milliseconds = new Date().getTime();
		return new Date(this.#milliseconds);
	}
	get time(){		return this.date.getTime(); }			/* 시간 */
	get year(){		return this.date.getFullYear(); }		/* 연도 */
	get month(){	return this.date.getMonth() + 1; }		/* 월 */
	get day(){		return this.date.getDate(); }			/* 일 */
	get hours(){	return this.date.getHours(); }			/* 시 */
	get minutes(){	return this.date.getMinutes(); }		/* 분 */
	get secs(){		return this.date.getSeconds(); }		/* 초 */
	get meridiem(){	return this.hours >= 12 ? 2 : 1; }		/* 오후 및 오전 */

	showCurrentTime(type){		/* 시간 출력 */
		let timeList = {
			[c_TIME_TYPE.CORE]		: this.showNormalTime(),
			[c_TIME_TYPE.NORMAL]	: this.showTime(),
			[c_TIME_TYPE.FULL]		: NC.fmtStr("%d| %d", [this.showDate().split('-').slice(1).join('-'), this.showTime()])
		};
		return Object.hasOwn(timeList, type) ? timeList[type] : this.showCurrentTime(TM.fmtTime);
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
class TimerSystem{              /*** 타이머 시스템 클래스 ***/
    #id;            /* 타이머 ID */
	#name;		    /* 타이머 이름 */
	#player;		/* 플레이어 ID */
	#time;			/* 등록 시간 */
	#delay;         /* 지연 시간 */
	#exctFn;		/* 실행 함수 */
	#trmnFn;		/* 종료 함수 */
	#proc;		    /* 타이머 함수 */
	#sequence;	    /* 진행 순서 */
	#isRepeat;		/* 반복 여부 */

	constructor(name, id, exct, trmn, delay, preId, target, seq){		/* 타이머 지정 */
		(async function(t){
			let isRepeat = (preId ? true : false);
			let dt = isNaN(Number(delay)) ? 0 : Number(delay);
			let proc = setTimeout(() => {
				exct();
				TM.clearTimer(id, true);
			}, dt);

			t.#id			= id;					/* 타이머 ID */
			t.#name			= name;					/* 타이머 이름 */
			t.#player		= target;				/* 플레이어 ID */
			t.#time			= TM.date.time;			/* 등록 시간 */
			t.#delay		= dt;					/* 지연 시간 */
			t.#exctFn		= exct;					/* 실행 함수 */
			t.#trmnFn		= trmn;					/* 종료 함수 */
			t.#proc			= proc;					/* 타이머 함수 */
			t.#sequence		= seq ? seq : 0;		/* 진행 순서 */
			t.#isRepeat		= isRepeat;				/* 반복 여부 */

			let overloaded = TM.findTimerByName(name, target).filter(tm => tm.isRepeat == false);
			if(overloaded.length > 0) overloaded.forEach(tm => !tm.id.includes('r'));
		})(this);
	}

    get id(){           return this.#id; };				/* 타이머 ID */
	get name(){         return this.#name; };			/* 타이머 이름 */
	get player(){       return this.#player; };			/* 플레이어 ID */
	get time(){         return this.#time; };			/* 등록 시간 */
	get delay(){        return this.#delay; };			/* 지연 시간 */
	get exctFn(){       return this.#exctFn; };			/* 실행 함수 */
	get trmnFn(){       return this.#trmnFn; };			/* 종료 함수 */
	get proc(){         return this.#proc; };			/* 타이머 함수 */
	get seq(){          return this.#sequence; };		/* 진행 순서 */
	get isRepeat(){     return this.#isRepeat; };		/* 반복 여부 */

	findTimerByName(){		return TM.findTimerByName(this.name, this.player); }	/* 타이머 이름으로 찾기 */
	findTimerByPlayer(){	return TM.findTimerByPlayer(this.player); }			    /* 타이머 플레이어로 찾기 */

	clearTimer(bypass){															    /* 타이머 ID로 지우기 */
		if(this.delay > 0) clearTimeout(this.proc);
		let skipTrmnFn = function(f, b, r){
			if(f == null) return true;			//	종료 함수가 없으면
			if(b == true) return true;			//	우회하는 경우
			if(r == true) return true;			//	반복하는 경우
			return false;
		}
		if(!skipTrmnFn(this.trmnFn, bypass, this.isRepeat)) this.trmnFn();		    //	종료 함수 실행
		let m = TM.tml;
		m.splice(m.findIndex(t => t.id == this.id), 1);					            //	타이머 목록에서 제거
	}
	clearTimerByName(){		return TM.clearTimerByName(this.name, this.player); }	/* 타이머 이름으로 지우기 */
	clearTimerByPlayer(){	return TM.clearTimerByPlayer(this.player); }			/* 타이머 플레이어로 지우기 */

	calcCurrentSequence(mx, mn){						/* 반복 타이머의 현재 진행 순서 구하기 */
		let min = mn > 2 ? mn : 2
		let max = (mx - 1) / 2;
		return max - Math.floor(max / min) * min;
	}
	calcTotalSequence(seq){	return (seq - 1) / 2; }		/* 반복 타이머의 누적 진행 순서 구하기 */
}
class GameSystem{               /*** 게임 시스템 클래스 ***/
    #defaultFontFamily		= `Noto Sans Mono CJK KR, D2Coding, Consolas, "맑은 고딕", "나눔고딕";`;
    #securityPatchLevel;                		    			/* UMUX 보안 패치 수준(건드리지 마시오) */
	#versionUMUX  			= "5.0";			        		/* UMUX 버전(건드리지 마시오) */
    #maxNotiIcons           = 5;                       			/* 간단 알림 최대 개수 */
    #cssStyleList;												/* CSS 스타일 목록 */
    #isDeveloperMode;				                            /* 개발자 모드 유무 */
    #hasInitServer			= false;							/* 서버 초기화 여부 */
    #hasInitDashboard		= false;							/* 대시보드 초기화 여부 */
    #lockedPassword;							                /* 비밀번호 고정 여부 */
    #releaseDate;		                                        /* 릴리스 일자 */
    #startupTime            = null;                             /* 최초 가동 시각 */
    #versionRoom;		                                        /* 서버 버전 */

	constructor(versionRoom, releaseDate, isDev, lockedPassword){
		(async function(t){
			t.#isDeveloperMode		= typeof isDev == "boolean" ? isDev : false;    /* 개발자 모드 유무 */
			t.#versionRoom 			= Object.freeze(versionRoom);		            /* 서버 버전 */
			t.#releaseDate			= Object.freeze(releaseDate);		            /* 릴리스 일자 */
			t.#lockedPassword		= lockedPassword;					            /* 비밀번호 고정 여부 */
			t.#cssStyleList			= {					        					/* CSS 스타일 목록 */
        		"bootContainer"				: [
            		"position: fixed", "bottom: 0",
            		"font-weight: bold"
        		],
        		"infoTitle"				: [
        		    "background: #555",
        		    "margin: 1px", "padding: 2px 8px",
        		    "border-radius: 8px"
        		],
        		"infoContainer"				: [
        		    "width: 40vw", "min-width: 360px",
        		    "overflow: auto",
        		    "font-size: 0.8rem",
        		    `background: #${c_LIST_COLOR.BG_CHATBOX}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    `border: 1px solid #${c_LIST_COLOR.BG_CHATBOX}`, "border-radius: 10px",
        		    "margin: 8px auto"
        		],
        		"infoBox"				: [
        		    `background: #${c_LIST_COLOR.BG_CHATBOX}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    "padding: 4px 16px 8px", "margin: 2px",
        		    "border-radius: 8px;"
        		],
        		"capacityBox"		: [
        		    "display: table", "overflow: hidden",
        		    "height: 16px",
        		    "margin: auto", "padding: 0",
        		    `background: #${c_LIST_COLOR.BG_STATUS}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    `border: 1px solid #${c_LIST_COLOR.BG_STATUS}`, "border-radius: 8px 8px 0 0"
        		],
        		"scoreboard"		: [
        		    "display: table", "overflow: hidden",
        		    "height: 16px",
        		    "margin: 2px auto", "padding: 1px 0",
        		    `color: #${c_LIST_COLOR.WHITE}`,
        		    `background: #${c_LIST_COLOR.BG_STATUS}`,
        		    `border: 1px solid #${c_LIST_COLOR.BG_STATUS}`
        		],
        		"seatLayout"	: [
        		    "display: table", "overflow: auto",
        		    `background: #${c_LIST_COLOR.BG_ITEM}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    "margin: auto auto 8px", "padding: 2px",
        		    `border: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, "border-radius: 10px",
        		    "font-size: 0.75rem",
        		],
        		"teamListBox"	: [
        		    "display: table",
        		    "position: relative",
        		    "top: 20px",
        		    `background: #${c_LIST_COLOR.BG_CONTAINER}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    "margin: auto", "padding: 4px 0",
        		    `border: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`, "border-radius: 8px"
        		],
        		"teamListContainer"		: [
        		    "font-size: 0.8rem",
        		    "position: relative",
        		    "z-index: 2",
        		    "bottom: 22px",
        		    "border-radius: 10px"
        		],
        		"teamListTitle"		: [
        		    "position: absolute",
        		    `color: #${c_LIST_COLOR.WHITE}`,
        		    "padding: 0 4px", "margin: 0 4px"
        		],
        		"teamListViewDiv-r"		: [
        		    "width: 16vw", "min-width: 192px", "height: 18px",
        		    "display: table-cell", "text-align: center", "flex: 1", "margin: 2px",
        		    `border-right: 1px solid transparent`
        		],
        		"teamListViewDiv-b"		: [
        		    "width: 16vw", "min-width: 192px", "height: 18px",
        		    "display: table-cell", "text-align: center", "flex: 1", "margin: 2px",
        		    `border-left: 1px solid transparent`
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
        		"teamTitleContainer"		: [
        		    "display: table",
        		    "height: 18px",
        		    "position: relative",
        		    "z-index: 1",
        		    `background: #${c_LIST_COLOR.BG_CHATBOX}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    "margin: 2px auto", "padding: 2px 0",
        		    "text-align: center",
        		    "font-size: 0.8rem", "font-weight: 800",
        		    "border-radius: 8px"
        		],
        		"titleNodes-r"			: [
        		    "display: table-cell",
        		    "width: 16vw", "min-width: 192px",
        		    "margin: 1px 0", `border-right: 1px solid transparent`
        		],
        		"titleNodes-s"			: [
        		    "display: table-cell",
        		    "width: 16vw", "min-width: 192px",
        		    "margin: 1px 0", `border-left: 1px solid transparent`, `border-right: 1px solid transparent`
        		],
        		"titleNodes-b"			: [
        		    "width: 16vw", "min-width: 192px",
        		    "display: table-cell",
        		    "margin: 1px 0", `border-left: 1px solid transparent`
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
        		    "text-align: center"
        		],
        		"scoreCore"				: [
        		    "display: table-cell",
        		    "width: 16vw", "min-width: 192px",
        		    "text-align: center",
        		    "border-radius: 2px"
        		],
        		"scoreBlue"				: [
        		    "display: table-cell",
        		    "width: 16vw", "min-width: 192px",
        		    "text-align: center"
        		],
        		"nodeComId"				: [
        		    "display: table-cell",
        		    "width: 16px", "height: 100%",
        		    `color: #${c_LIST_COLOR.WHITE}`,
        		    `background: #${c_LIST_COLOR.BORDER_ITEM}`,
        		    "border-radius: 8px",
        		    "margin: 0 1px", "padding: 0 8px",
        		    "text-align: center", "font-size: 1.02em", "text-shadow: none",
        		    "float: left",
        		],
        		"nodeComName"			: [
        		    "display: table-cell", "position: absolute", "overflow: hidden",
        		    "width: 50%",
        		    `color: #${c_LIST_COLOR.WHITE}`,
        		    "white-space: nowrap",
        		    "text-align: left", "text-overflow: ellipsis", "font-size: 1.02em", "text-shadow: none",
        		    "border-radius: 4px",
        		    "padding: 0 8px", "margin: 0 36px",
        		    "vertical-align: middle", "z-index: 0"
        		],
        		"nodeComStatus"			: [
        		    "display: table-cell", "position: absolute",
        		    "max-width: 96px",
        		    "background: transparent", `color: #${c_LIST_COLOR.WHITE}`,
        		    "border-radius: 8px",
        		    "font-size: 1.02em", "text-align: right",
        		    "margin: 0 2px", "padding: 0 8px",
        		    "float: right", "right: 0", "z-index: 1"
        		],
				"nodeComRegion"			: [
					"display: table-cell",
        		    "width: 0", "height: 0",
        		    "float: right", "right: 0",
        		    "margin: 4px 0", "padding: 0 8px",
        		    "visibility: hidden"
				],
        		"logLayout"		: [
        		    "display: table",
        		    "width: 100%",
        		    "margin: auto", "padding: 0 2px",
        		    "border-radius: 4px",
        		],
        		"logOutputContainer"		: [
        		    "width: 50%", "min-width: 360px",
        		    `background: #${c_LIST_COLOR.BG_CHATBOX}`, `color: #${c_LIST_COLOR.WHITE}`,
        		    `border: 1px solid #${c_LIST_COLOR.BG_CHATBOX}`, "border-radius: 10px",
        		    "margin: auto",
        		    "font-size: 0.8rem"
        		],
        		"logOutputTitle"		: [
        		    "background: #555", `color: #${c_LIST_COLOR.WHITE}`,
        		    "margin: 1px", "padding: 2px 8px",
        		    "border-radius: 8px"
        		],
        		"logOutputBox"			: [
        		    "overflow:auto",
        		    "max-height: 70vh",
        		    "text-align: center", "font-size: 0.8rem",
					"border-radius: 8px",
        		    "margin: 2px 0",
        		    "padding: 0 2px"
        		],
        		"logInputContainer"			: [
        		    "width: 50%", "min-width: 360px",
        		    "display: flex",
        		    `border: 1px solid #${c_LIST_COLOR.BORDER_ITEM}`,
        		    "border-radius: 10px",
        		    "margin: 2px auto",
					"padding: 0"
        		],
        		"logInputPre"			: [
        		    "width: 100%",
        		    "border: none", "border-radius: 8px", "outline: none",
        		    "margin: 0 4px", "padding: 0 8px",
        		    "font-size: 0.9rem", "text-overflow: ellipsis",
        		    "white-space: nowrap"
        		],
        		"logInputBtn"			: [
        		    "width: 96px",
        		    "font-weight: bold", "text-align: center",
        		    "margin-radius: 8px",
        		    "margin: 2px", "padding 0 16px",
        		    "border-radius: 8px"
        		],
        		"logOutputMessage"		: [
        		    "display: flex",
        		    "margin: 2px 0", "padding: 0 10px",
        		    "border-radius: 8px"
        		],
        		"logDivOutputClock"		: [
        		    "display: flex", "align-items: center", "text-align: center",
        		    "float: left",
        		    "margin: 4px"
        		],
        		"logDivOutputArrow"		: [
        		    "display: flex", "align-items: center", "text-align: center",
        		    "font-size: 0.5rem", "padding: 0 4px"
        		],
        		"logDivOutputContent"	: [
        		    "float: right",
        		    "text-align: left",
        		    "margin: 4px",
        		    "white-space: break-spaces"
        		]
    		}
            let dsl = await convertScript("https://raw.githubusercontent.com/HonestSquare/UMUX/master/5%20Evry/userBlacklist.json");
            t.#securityPatchLevel = dsl.support_version.includes(t.#versionUMUX) ? dsl.date : "2023.08.01";
		})(this);
	}

    get csl(){              return this.#cssStyleList; }                /* CSS 스타일 목록 */
    get verRoom(){          return this.#versionRoom; }                 /* 서버 버전 */
    get verUMUX(){          return this.#versionUMUX; }                 /* UMUX 버전 */
    get maxNtcn(){          return this.#maxNotiIcons; }         		/* 간단 알림 최대 개수 */
	get frmbd(){			return iframeEle.body; }					/* iframe 객체 */
	get scrPtcLvl(){	    return this.#securityPatchLevel; }			/* UMUX 보안 패치 수준 */
    get isDevMode(){        return this.#isDeveloperMode; }             /* 개발자 모드 */
    get hasInitSrv(){       return this.#hasInitServer; }               /* 서버 초기화 여부 */
	get hasInitDsb(){	    return this.#hasInitDashboard; }			/* 대시보드 초기화 여부 */
    get lockedPswd(){       return this.#lockedPassword; }              /* 비밀번호 고정 여부 */
    get rsDate(){           return this.#releaseDate; }                 /* 릴리스 일자 */
    get stpTime(){          return this.#startupTime; }                 /* 최초 가동 시각 */

    set stpTime(v){         /* 최초 가동 시각 */
		if(typeof this.stpTime == "number") return -1;
        Object.freeze(this.#startupTime = v);
    }
    set isDevMode(v){       /* 개발자 모드 */
        if(typeof v != "boolean") return;
        this.#isDeveloperMode = v;
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

	initAttributeColors(obj, colBg, colText, colShd, str, isGradient, brd){		/* 속성 색상 초기화 */
		let getColor = c => '#' + NC.findColor(c).substring(2).replace('#', '');
		let txc = getColor(c_LIST_COLOR.BG_CHATBOX), bgc = getColor(colBg);
        if(NC.isColor(colBg)) obj.style.background = isGradient ? NC.fmtStr("linear-gradient(180deg, %d 5%, %d 100%)", [txc, bgc]) : bgc;
		if(isGradient || brd) obj.style.border = brd ? brd : NC.fmtStr("1px solid %d", bgc);
		obj.style.color = getColor(colText);
        if(NC.isColor(colShd)) obj.style.textShadow = NC.fmtStr("#%d 1px 0, #%d 0 1px, #%d 1px 0, #%d 0 1px", colShd);
		if(str) obj.innerText = str;
	}
	initAttributeId(obj, cssName, id){											/* 객체 ID 초기화 */
		let eid = id ? id : Object.keys({obj})[0];
		if(id) obj.setAttribute("id", eid);
		this.initCssClass(obj, cssName ? cssName : eid);
	}
	initCssClass(elm, str){														/* CSS 클래스 초기화 */
		let name = str ? str : Object.keys({elm})[0];
		if(!Object.hasOwn(this.csl, name)) throw LM.error("유효하지 않는 대상입니다. 클래스 이름: %d", name);
		elm.setAttribute("class", name);
		let cmnRes = NC.fmtStr("font-family: %d", this.#defaultFontFamily);
		elm.setAttribute("style", this.csl[name].concat(cmnRes).join(';'));
	}
	initElement(tag, id, cssName){												/* 요소 초기화 */
		let obj = document.createElement(tag);
		this.initAttributeId(obj, cssName ? cssName : id, id);
		return obj;
	}
	initDashboard(){															/* 대시보드 초기화 */
		if(!this.hasInitSrv || this.hasInitDsb) return;			                //	서버 초기화가 필요한 경우 처리 중단
		/*** 제목 및 설명 ***/
		let titleDoc	= this.frmbd.getElementsByTagName("p")[0];				//	destination here.
		document.title += NC.fmtStr("(%d)", this.stpTime.showCurrentTime(c_TIME_TYPE.CORE));	//	최초 가동 시각 표기
		titleDoc.innerHTML = NC.fmtStr([
			"설명서는 <%0 %1=\"%4\" %2=\"%3\">여기</%0>에 있습니다.",
			"<%0 %1=\"%5\" %2=\"_%3\">토큰 발급</%0>",
			"<%0 %1=\"%6\" %2=\"_%3\">UMUX 레퍼런스</%0>"
		].join(" | "), ['a', "href", "target", "_blank",
			"https://github.com/haxball/haxball-issues/wiki/Headless-Host", "https://www.haxball.com/headlesstoken", "https://github.com/HonestSquare/UMUX/wiki/UMUX-Reference"
		]);
		titleDoc.setAttribute("style", "font-size: 1em");
		this.addDashboardEle(this.frmbd, titleDoc);
		/*** 서버 정보 ***/
		let infoContainer = this.initElement("details", "infoContainer");
		let infoTitle = this.initElement("summary", "infoTitle");
		let infoBox = this.initElement("pre", "infoBox");
		infoTitle.innerHTML = "서버 정보";
		infoBox.innerHTML = NC.fmtStr(["서버 이름: %0", "최대 인원: %1",
			"서버 버전: %2", "서버 공개 여부: %3",
			"UMUX 버전: %4", "보안 패치 수준: %5",
			"지역 코드: %6", "상세 위치: %7, %8",
            "시작 일자: %9"
			].join(newLine), [ROOMNAME, MAXPLAYERS, this.verRoom, PUBLIC ? "허용" : "차단",
				this.verUMUX, this.scrPtcLvl,
				NC.fmtStr("%1(<%0 src=https://flagpedia.net/data/flags/w580/%2.webp width=%3px height=%4%></%0>)", ["img",
					REGION_CODE.toUpperCase(), REGION_CODE.toLowerCase(), 16, 100
				]), LAT, LON, [[this.stpTime.year, this.stpTime.month, this.stpTime.day
				].map(t => SYS.fillLine(t, 2)).join('/'), this.stpTime.showTime()].join(' ')
		]);
		this.addDashboardEle(infoContainer, [infoTitle, infoBox]);
		this.addDashboardEle(this.frmbd, infoContainer);
		/*** 플레이어 정보 ***/
		let capacityBox				= this.initElement("div", "capacityBox");
		let scoreboard				= this.initElement("div", "scoreboard");
		let seatLayout				= this.initElement("div", "seatLayout");
        let teamListContainer		= this.initElement("details", "teamListContainer");
        let teamListTitle			= this.initElement("summary", "teamListTitle");
		let teamListBox				= this.initElement("div", "teamListBox");
		let teamTitleContainer		= this.initElement("div", "teamTitleContainer");
		/*** 팀별 객체 생성 ***/
		let listViewRedDiv			= this.initElement("div", "listViewRedDiv", "teamListViewDiv-r");
		let listViewBlueDiv			= this.initElement("div", "listViewBlueDiv", "teamListViewDiv-b");
		let listViewSpecDiv			= this.initElement("div", "listViewSpecDiv", "teamListViewDiv-s");
		teamListContainer.setAttribute("open", "true");
		this.addDashboardEle(teamListBox, [listViewRedDiv, listViewSpecDiv, listViewBlueDiv]);
		this.addDashboardEle(seatLayout, [capacityBox, scoreboard]);
        this.addDashboardEle(teamListContainer, [teamListTitle, teamListBox]);
		this.addDashboardEle(seatLayout, [teamTitleContainer, teamListContainer]);
		let titleNodeList = [
			{
				"class" : "nodeTitle", "id" : "capacityTitle",
				"prnts" : capacityBox, "txtStr" : "현재 인원:",
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "nodeTitle", "id" : "capacityFull",
				"prnts" : capacityBox,
				"bgc" : c_LIST_COLOR.BG_CONTAINER, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "nodeTitle", "id" : "capacityEmpty",
				"prnts" : capacityBox,
				"bgc" : c_LIST_COLOR.BG_CONTAINER, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreRed", "id" : "scoreRed",
				"prnts" : scoreboard,
				"border" : `1px solid #${c_LIST_COLOR.BG_STATUS}`,
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreCore", "id" : "scoreCore",
				"prnts" : scoreboard,
				"isGradient" : false, "border" : `1px solid #${c_LIST_COLOR.GRAY}`,
				"bgc" : c_LIST_COLOR.BG_CHATBOX, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "scoreBlue", "id" : "scoreBlue",
				"prnts" : scoreboard,
				"border" : `1px solid #${c_LIST_COLOR.BG_STATUS}`,
				"bgc" : c_LIST_COLOR.BG_STATUS, "txtCol" : c_LIST_COLOR.TEXT_STATUS
			},
			{
				"class" : "titleNodes-r", "id" : "titleRed",
				"prnts" : teamTitleContainer,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.TEAM_RED
			},
			{
				"class" : "titleNodes-s", "id" : "titleSpec",
				"prnts" : teamTitleContainer,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.WHITE
			},
			{
				"class" : "titleNodes-b", "id" : "titleBlue",
				"prnts" : teamTitleContainer,
				"bgc" : c_LIST_COLOR.BG_ITEM, "txtCol" : c_LIST_COLOR.TEAM_BLUE
			}
		].map(tn => {
			let em = SYS.initElement("pre", tn.id, tn.class);
			let getOwnProperty = (name, def) => Object.hasOwn(tn, name) ? tn[name] : (!def ? '' : def);
			SYS.initAttributeColors(em,
				getOwnProperty("bgc", c_LIST_COLOR.TEXT_STATUS),
				getOwnProperty("txtCol", c_LIST_COLOR.DEFAULT), getOwnProperty("txtShd", c_LIST_COLOR.BLACK), getOwnProperty("txtStr"),
				getOwnProperty("isGradient"), getOwnProperty("border")
			);
			SYS.addDashboardEle(tn.prnts, em);
			return em;
		});
		/*** 팀 개별 노드 생성 ***/
		let teamIdList = {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}
		let nodeComList = [
			["span", "id"],
			["p", "name"],
			["span", "status"],
			["img", "region"]
		];
		for(let i = 0; i < MAXPLAYERS; i++){
			for(let t of [c_TEAM.RED, c_TEAM.BLUE, c_TEAM.SPECTATOR]){
				let teamDiv = this.initElement("div", NC.fmtStr("list-%d", teamIdList[t] + i), "teamListViewNode");
				SYS.addDashboardEle({
					[c_TEAM.RED]		: listViewRedDiv,
					[c_TEAM.BLUE]		: listViewBlueDiv,
					[c_TEAM.SPECTATOR]	: listViewSpecDiv
				}[t], teamDiv);
				for(let e of nodeComList){
					SYS.addDashboardEle(teamDiv, SYS.initElement(e[0],
						NC.fmtStr("%0_%1", [teamIdList[t] + i, e[1]]),
						NC.fmtStr("nodeCom%0%1", [e[1].charAt(0).toUpperCase(), e[1].slice(1)])
					));
				}
			};
		}
		this.addDashboardEle(this.frmbd, seatLayout);
		let logLayout = this.initElement("div", "logLayout");
		/*** 로그 출력 ***/
		let logOutputContainer	= this.initElement("details", "logOutputContainer");
		let logOutputTitle	= this.initElement("summary", "logOutputTitle");
		let logOutputBox		= this.initElement("div", "logOutputBox");
		logOutputTitle.innerText = "로그 출력";
		this.initAttributeColors(logOutputBox, null, c_LIST_COLOR.TEXT_CHATBOX);
		logOutputContainer.setAttribute("open", "true");
		/*** 로그 입력 ***/
		let logInputContainer = this.initElement("div", "logInputContainer");
		this.initAttributeColors(logInputContainer, c_LIST_COLOR.BLACK, c_LIST_COLOR.TEXT_CHATBOX);
		let logInputPre	= this.initElement("input", "logInputPre");			//	입력 공간
		logInputPre.setAttribute("type", "text");
		logInputPre.setAttribute("autocomplete", "off");					//	자동 완성 비활성화
		logInputPre.setAttribute("placeholder", "Enter 또는 보내기 버튼을 클릭하면 입력한 내용이 전달됩니다.");
		logInputPre.addEventListener("keydown", this.onKeyDownLogInput);	//	키 입력 처리
		this.initAttributeColors(logInputPre, c_LIST_COLOR.BLACK, c_LIST_COLOR.DEFAULT);
		let logInputBtn	= this.initElement("button", "logInputBtn");		//	전송 버튼
		logInputBtn.setAttribute("type", "button");
		this.addEventInput(logInputBtn, this.onClickBtnSendLog);
		this.initAttributeColors(logInputBtn, c_LIST_COLOR.BG_STATUS, c_LIST_COLOR.TEXT_STATUS, null, "보내기");
		this.addDashboardEle(logInputContainer, [logInputPre, logInputBtn]);
		this.addDashboardEle(logOutputContainer, [logOutputTitle, logOutputBox]);
		this.addDashboardEle(logLayout, [logOutputContainer, logInputContainer]);
		this.addDashboardEle(this.frmbd, logLayout);
		/*** UMUX 저작물 표기(이 구문은 지우지 마시오) ***/
		let bootContainer = this.initElement("div", "bootContainer");
        bootContainer.innerHTML = "Powered by UMUX";
		this.addDashboardEle(this.frmbd, bootContainer);
		this.#hasInitDashboard = true;
	}
	initSystem(url){															/* 시스템 초기화 */
		if(this.hasInitSrv == true) throw LM.error("이미 서버를 초기화했습니다. 올바르지 않은 접근입니다.");
		console.clear();
		this.stpTime = TM.initDate();                                   //  최초 가동 시각
		ROOM.setScoreLimit(0);
		ROOM.setTimeLimit(0);
        for(let g of [					                            /* 로그 목록 */
                [c_LOG_TYPE.NORMAL, NC.MSC.COMMON],                     //  일반
			    [c_LOG_TYPE.NOTICE, NC.MSC.NOTICE],			            //	고지
			    [c_LOG_TYPE.BELL, c_LIST_COLOR.YELLOW],			            //	공지
			    [c_LOG_TYPE.SEND, "8B8B8B"],						    //	송신
			    [c_LOG_TYPE.BINDING, "587489"],						    //	수신
			    [c_LOG_TYPE.WARNING, "E6C78B", "524728", "A3854B"],		//	경고
			    [c_LOG_TYPE.ERROR, "EB4E4E", "6D3522", "A95959"]	    //	오류
            ].filter(e => SYS.hasInRange(e.length, 2, 4))){
            LM.addLogTagList(g.at(0), g.at(1), g.at(2), g.at(3));
        }
		GM.loadMap(0);
		if(this.isDevMode){
			let tempPass = prompt("보안을 위해 비밀번호를 입력해야 합니다. 아래에 기입하십시오.");
			if(!CS.isWhiteSpace(tempPass)){
				alert(NC.fmtStr(["비밀번호가 설정되었습니다.",
                    "현재 비밀번호: %d", "확인을 눌러 계속하세요."
                ].join(newLine), tempPass));
				AMN.updatePassword(tempPass);
				this.#lockedPassword = true;
				LM.log(false, "서버 비밀번호: %d", c_LOG_TYPE.BINDING, tempPass);
			}
			else alert(["작업이 취소되었습니다.", "확인을 눌러 계속하세요."].join(newLine));
            this.isDevMode = false;
		}
        if(!CM.hasCommand(internalCommands, AMN.logonAdmin)){
			let unlockCode = this.pickRandomNumber(9000, 1000);
            customCommands.push(CM.initCommand(false, (AMN.logonAdmin).name, AMN.logonAdmin, unlockCode.toString()));
            LM.log(false, "최고 관리자 로그인 비밀번호: %d", c_LOG_TYPE.BINDING, unlockCode);
		}
		GM.gameLink = url;
		console.group("[서버 정보]");
		console.info(NC.fmtStr(["서버 이름: %0",
			"최대 인원: %1", "서버 버전: %2",
			"서버 공개 여부: %3",
			"UMUX 버전: %4", "보안 패치 수준: %5",
			"지역 코드: %6", "상세 위치(바로가기): %7, %8(https://www.google.com/maps/place/%7,%8)"
		].join(newLine), [ROOMNAME, MAXPLAYERS, this.verRoom, PUBLIC ? "허용" : "차단",
			this.verUMUX, this.scrPtcLvl, REGION_CODE.toUpperCase(), LAT, LON
		]));
		console.groupEnd();
		AMN.updatePassword(PASSWORD);
		if(PASSWORD){	//	reCAPTCHA 활성화
			if(PUBLIC == false) this.enableRecaptcha(true);
        }
		if(this.isDevMode == true){
			LM.log(false, ["일부 기능이 제한됩니다",
				['', "중복/다중 접속 퇴장", "비활동 플레이어 퇴장", ''].join(newLine),
				"해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요.", "SYS.enableDevMode(false);"
			].join(newLine), c_LOG_TYPE.WARNING);
		}
		this.#hasInitServer = true;
	}

	hasInRange(num, min, max, excludeMin){		/* 범위 포함 여부 구하기 */
		if([num, min, max].some(v => typeof v != "number" || isNaN(v) == true)) return false;
		if(max < min) return false;
		if(num > max) return false;
		if(num < min + (excludeMin ? 1 : 0)) return false;
		return true;
	}
	findInfo(){									/* 저작물 및 버전 출력(이 구문은 지우지 마시오) */
        return NC.fmtStr([["서버 버전: %1", "%0 버전: %2", "%0 보안 패치 수준: %3"
        ].join(" | "), "Powered by %0"].join(newLine), ["UMUX", this.verRoom, this.verUMUX, this.scrPtcLvl]);
	}
	
	addEventInput(obj, ev){						/* 클릭 이벤트 지정 */
		obj.onclick = ev;
	}
	addDashboardEle(pe, ce){					/* 대시보드에 자식 객체 추가 */
		if(!Array.isArray(ce)) return pe.appendChild(ce);
		for(let cn of ce){
			pe.appendChild(cn);
		}
	}
	addPlayerById(player){						/* 플레이어 명단에 데이터베이스 추가 */
        let pp = PM.findPlayerById(player);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		if(!pp.hasJoined()) throw LM.error(c_ERROR_TYPE.E_PLAYER_LID);
		let addNode = function(e, p){
			if(e == false) return;
			let target = e[0];
			let chld = target.childNodes;
			let getNodeByType = str => Object.values(chld).find(e => e.id.split('_').slice(1)[0] == str);
			let region = getNodeByType("region");
			let num = getNodeByType("id");
			let name = getNodeByType("name");
			let status = getNodeByType("status");
			if(p.rgn){
				region.name				= p.rgn;
				region.src				= NC.fmtStr("https://flagpedia.net/data/flags/w580/%d.webp", p.rgn.toLowerCase());
				region.style.width		= "16px";
                region.style.height     = "100%";
                status.style.right      = region.style.width;
				region.style.visibility	= "visible";
			}
			num.title			= NC.fmtStr("플레이어 정보: %d", p.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC));
			num.name			= p.id;
			num.innerText		= p.localId;
			name.innerText		= p.showPlayerInfo(c_PLAYERINFO_TYPE.NAME);
			status.innerText	= p.tagGrade;
			target.style.display = "table";
		}
		addNode(Object.values(iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}[pp.team]))[0].childNodes).filter(n => n.style.display == "none"), pp);
		//	플레이어 데이터베이스에 따라 대시보드 갱신
		PM.findPlayerList().forEach(p => this.updatePlayerById(p.id));
	}

	updateDashboard(){				/* 대시보드 갱신 */
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
			s[0].innerText = NC.fmtStr(f > 10 ? "%0×%1" : "%0", [f > 10 ? c.SEAT_FULL : f > 0 ? Array(f + 1).join(c.SEAT_FULL) : '', f]);
			s[1].innerText = NC.fmtStr(e > 10 ? "%0×%1" : "%0", [e > 10 ? c.SEAT_EMPTY : e > 0 ? Array(e + 1).join(c.SEAT_EMPTY) : "MAX", e]);
            s[0].title = NC.fmtStr("접속자: %0명", f);
            s[1].title = NC.fmtStr("빈 자리: %0석", e);
		}
		updateSeatList(findElementById("capacityFull", "capacityEmpty"), PM.cntPlayers(), MAXPLAYERS - PM.cntPlayers(), LIST_STATUS);
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
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.GRAY, c_LIST_COLOR.TEXT_STATUS, c_LIST_COLOR.BLACK, "경기 예정", false, NC.fmtStr("1px solid #%d", c_LIST_COLOR.GRAY));
				scoreList[c_TEAM.RED].innerText		= NC.fmtStr("⚽×%d", SC.calcTotalGoalsByTeam(c_TEAM.RED));
				scoreList[c_TEAM.BLUE].innerText	= NC.fmtStr("⚽×%d", SC.calcTotalGoalsByTeam(c_TEAM.BLUE));
				break;
			case c_GAME_STATS.PAUSE:		//	경기 중지
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.RED, c_LIST_COLOR.TEXT_STATUS, c_LIST_COLOR.BLACK, "경기 중지", false, NC.fmtStr("1px solid #%d",  "DD6F6F"));
				break;
			case c_GAME_STATS.TICK:			//	경기 진행
				this.initAttributeColors(scoreList[c_TEAM.SPECTATOR], c_LIST_COLOR.BG_PROG_INGAME, c_LIST_COLOR.TEXT_STATUS, c_LIST_COLOR.BLACK, (GM.sumMatch + "번째 경기"), false, NC.fmtStr("1px solid #%d", "BBFDC6"));
				scoreList[c_TEAM.RED].innerText		= getGoalText(c_TEAM.RED);
				scoreList[c_TEAM.BLUE].innerText	= getGoalText(c_TEAM.BLUE);
				break;
		}
		titleList[c_TEAM.RED].innerText			= NC.fmtStr("RED(%d)", PM.cntPlayers(c_TEAM.RED));
		titleList[c_TEAM.BLUE].innerText		= NC.fmtStr("BLUE(%d)", PM.cntPlayers(c_TEAM.BLUE));
		titleList[c_TEAM.SPECTATOR].innerText	= NC.fmtStr("SPECTATORS(%d)", PM.cntPlayers(c_TEAM.SPECTATOR));
	}
	updatePlayerById(player){		/* 플레이어 명단 데이터베이스 갱신 */
		let pp = PM.findPlayerById(player);
		if(!PM.isValid(pp)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		if(!pp.hasJoined()) return this.clearPlayerById(pp.id);
		let teamIdList = {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}
		let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", teamIdList[pp.team]))[0].childNodes;
		let target = Object.values(itemList).find(n => n.childNodes[0].name == pp.id);
		if(target == undefined) return;
		TM.clearTimerByName("updateNotification", pp.id);
		let chld = target.childNodes;
		let getNodeByType = (prn, str) => Object.values(prn).find(e => e.id.split('_').slice(1)[0] == str);
		let region = getNodeByType(chld, "region");
		let num = getNodeByType(chld, "id");
		let name = getNodeByType(chld, "name");
		let status = getNodeByType(chld, "status");
        name.style.color            = NC.fmtStr("#%d", pp.admin == c_ADMIN_TYPE.SUPER_ADMIN ? c_LIST_COLOR.YELLOW : c_LIST_COLOR.WHITE);
		name.title			        = [num.title, NC.fmtStr([
                "권한: %0",
                "<최근 대화 기록>",
				"%1"
            ].join(newLine), [
                pp.admin == c_ADMIN_TYPE.SUPER_ADMIN ? "최고 권한" : pp.admin == c_ADMIN_TYPE.CORE_ADMIN ? "보조 권한" : "없음",
				CS.findChatLogsByPlayer(pp.id)
            ])].join(newLine);
        if(pp.rgn && region.style.visibility == "hidden"){
            region.name				= pp.rgn;
            region.src				= NC.fmtStr("https://flagpedia.net/data/flags/w580/%d.webp", pp.rgn.toLowerCase());
            region.style.width		= "16px";
            region.style.height     = "100%";
            status.style.right      = region.style.width;
            region.style.visibility	= "visible";
        }
		let getMsgList = p => [
			['😴', p.isSleep, "자리를 비운 상태입니다."],
			['🥶', p.isMute, "채팅이 금지된 상태입니다."],
			['⚽', SC.tchdLst.length > 0 && SC.lastTouchedPlayer.id == p.id ? p.hasCommonRange(0) : false, "선두를 잡았습니다."],
			[p.tagGrade, true]
		].filter(s => s[1] == true);
		let ml = getMsgList(pp);
		let iconList = ml.map(v => v[0]);
		if(iconList.length > this.maxNtcn){
			iconList.splice(0, iconList.length - this.maxNtcn);
			iconList.unshift('…');
		}
		status.innerText = iconList.join('');
		let titleList = ml.filter(v => v[2] != undefined).map(v => v[2]);
		titleList.unshift(NC.fmtStr("%d님은 현재...", pp.showPlayerInfo(c_PLAYERINFO_TYPE.PUBLIC)));
		let pi = target.childNodes[0];
		if(pi.innerText != pp.localId) pi.innerText = pp.localId;
		status.title = titleList.length > 1 ? titleList.join(newLine) : '';
		TM.addTimer("updateNotification", () => {
			let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", teamIdList[pp.team]))[0].childNodes;
			let target = Object.values(itemList).find(n => n.childNodes[0].name == pp.id);
			if(target == undefined) return;
			let cn = getNodeByType(target.childNodes, "status");
			if(cn.innerText != status.innerText) return;
			cn.style.background = "transparent";
		}, pp.id, 3 * SEC_TO_MS);
	}

	clearPlayerById(player){		/* 플레이어 명단에 데이터베이스 제거 */
		if(!PM.isValid(player)) throw LM.error(c_ERROR_TYPE.E_PLAYER_PID);
		let itemList = iframeEle.getElementsByClassName(NC.fmtStr("teamListViewDiv-%d", {
			[c_TEAM.RED] : 'r', [c_TEAM.BLUE] : 'b', [c_TEAM.SPECTATOR] : 's'
		}[PM.findPlayerById(player).team]))[0].childNodes;
		let target = Object.values(itemList).find(n => n.childNodes[0].name == player);
		if(target == undefined) return;
		let chld = target.childNodes;
		let getNodeByType = str => Object.values(chld).find(e => e.id.split('_').slice(1)[0] == str);
		let region = getNodeByType("region");
		let num = getNodeByType("id");
		let name = getNodeByType("name");
		let status = getNodeByType("status");

		for(let n of chld){
			n.innerText		= null;
			n.name			= null;
			n.title			= '';
		}
		region.style.visibility		= "hidden";
		region.style.width			= 0;
        status.style.right          = 0;
        region.style.removeProperty("name")
		region.style.removeProperty("src");

		target.style.display = "none";
		this.updatePlayerById(player);	//	플레이어 데이터베이스에 따라 대시보드 갱신
	}

	showPlayerInfo(player, type){		return PM.findPlayerById(player).showPlayerInfo(type); }		/* 플레이어 정보 */
	
	enableDevMode(bool){							/* 개발자 모드 활성화 */
		if(this.isDevMode === bool) return LM.log(false, "이미 해당 값이 적용돼 있습니다. 잘못된 접근입니다.", c_LOG_TYPE.WARNING);
		PM.findPlayerList().forEach(p => NC.locked((bool == true), "개발자 모드가 %d 되었습니다.", p.id, null, [bool == true ? "활성화" : "비활성화"]));
		LM.log(false, "개발자 모드가 %d 되었습니다.", c_LOG_TYPE.BINDING, [bool == true ? "활성화" : "비활성화"]);
		if(bool == true){
			LM.log(false, ["일부 기능이 제한됩니다",
				['', "중복/다중 접속 퇴장", "비활동 플레이어 퇴장", ''].join(newLine),
				"해제하려면 콘솔 입력창에 아래와 같은 코드를 작성하세요.", "SYS.enableDevMode(false);"
			].join(newLine), c_LOG_TYPE.WARNING);
		}
		this.isDevMode = (bool == true);
	}
	enableRecaptcha(isActive, player){				/* reCAPTCHA 지정 */
		let isValidByPlayer = PM.isValid(player);
		room.setRequireRecaptcha(isActive);
		NC.locked(isActive, isValidByPlayer ? "%1님이 reCAPTCHA를 %0 했습니다." : "reCAPTCHA가 %0 되었습니다.",
			null, null, [isActive == true ? "활성화" : "비활성화", isValidByPlayer ? SYS.showPlayerInfo(player, c_PLAYERINFO_TYPE.NAME) : ''
		]);
		LM.log(true, isValidByPlayer ? "%1(이)가 reCAPTCHA를 %0함" : "reCAPTCHA를 %0됨",
			c_LOG_TYPE.NOTICE, [isActive == true ? "활성화" : "비활성화", isValidByPlayer ? SYS.showPlayerInfo(player) : ''
		]);
	}
	fillLine(num, line){	return String(0).repeat(num < Math.pow(10, --line) ? line : 0) + num; }		/* 자릿수 교정 */
	/**
	 * 지정된 크기 만큼의 연속적인 정수 배열을 반환합니다
	 * @param {number} max 최댓값
	 * @param {number} min 최솟값
	 * @param {number} multiple 요소 간의 배수
	*/
	generateNumberArray(max, min, multiple){		/* 정수 배열 생성 */
		let i = typeof min == "number" && min > 1 ? min : 0;
		let a = typeof max == "number" && max >= i + 1 ? max : -1;
		let m = typeof multiple == "number" && multiple > 1 ? multiple : 1;
		if(a == -1) return -1;
		let nr = Array.from(Array(a).keys());
		if(m == 1) return nr;
		return nr.map(n => this.hasInRange(n, i, x) == true && (n - i) % m == 0);
	}
	lockPassword(bool){							    /* 비밀번호 고정 */
		if(typeof bool != "boolean") throw LM.error("비밀번호를 고정하려면 참 또는 거짓의 값을 입력하십시오");
		this.#lockedPassword = bool;
		LM.log(false, "비밀번호 고정 장치가 %d됨.", c_LOG_TYPE.NOTICE, this.lockedPswd == true ? "활성화" : "비활성화");
	}
	/**
	 * 지정된 범위 사이에서 임의의 수를 반환합니다
	 * @param {number | Array<>} num 범위
	 * @param {number} min 최솟값
	 * @param {number} multiple 적용할 배수
	*/
	pickRandomNumber(num, min, multiple){			/* 임의 실수 생성 */
		let i = typeof min == "number" ? min : 0;
		let u = typeof num == "number" ? num : Array.isArray(num) ? num.length : -1;
		let t = typeof multiple == "number" && multiple > 1 ? multiple : 1;
		if(u == -1) return -1;
		return (Math.floor(Math.random() * u) + i) * t;
	}
	printMsg(msg, targets, ...replace){				/* 시스템 메시지 출력 */
		let str = NC.fmtStr(msg, replace.at(0));
		let sendLog = (s, ...r) => LM.log(true, s, c_LOG_TYPE.SEND, r.at(0));
		switch(typeof targets){
			case "number":			//	개인 채팅
				let tp = PM.findPlayerById(targets);
				CS.sendPrivateChat(tp.id, 0, str);
				return sendLog("전달: [개인]%0: %1", [tp.showPlayerInfo(), str]);
			case "string":			//	팀 채팅
				let getStrToTeam = function(s){
					let t = Object.entries({
						[c_TEAM.RED]		: ["red", 'r', "레드", "레"],
						[c_TEAM.BLUE]		: ["blue", 'b', "블루", "블"],
						[c_TEAM.SPECTATOR]	: ["spct", 's', "관전", "관"]
					}).find(([k, v]) => v.includes(s));
					return t == undefined ? -1 : t.at(0);
				}
				let team = getStrToTeam(targets);
				if(team != -1) return CS.sendTeamChat(team, str, 0);
			case "object":			//	단체 전송
                if(Array.isArray(targets)){
                    let tl = targets.filter(t => PM.hasJoined(t));
                    for(let tp of tl){
						CS.sendPrivateChat(tp, 0, str);
					}
                    return sendLog(tl.length > 1 ? "전달: [개인]%0외 %2인: %1" : "전달: [개인]%0: %1", [
                        SYS.showPlayerInfo(tl.at(0)), str, tl.length
                    ]);
                }
			case "undefined":		//	전체 채팅
				CS.sendAlert("→[전체]%d", targets, str);
				return sendLog("전달: [전체]%d", str);
			default: return LM.log(false, "전송할 대상의 값이 올바르지 않습니다.", c_LOG_TYPE.WARNING);
		}
	}
}
class LogManager{               /*** 로그 매니저 클래스 ***/
    #logTagList		= new Array();			/* 로그 태그 목록 */
    #errorTagList   = new Array();			/* 오류 태그 목록 */
    #logList		= new Array();			/* 로그 기록 목록 */

    constructor(){
		(async function(t){
			t.#errorTagList = await convertScript("https://raw.githubusercontent.com/HonestSquare/UMUX/master/5%20Evry/errorTagList.json");
		})(this);
    }

    get lts(){          return this.#logTagList; }                      /* 로그 목록 */
    get ets(){          return this.#errorTagList; }                    /* 오류 목록 */
    get lgs(){          return this.#logList; }                         /* 로그 기록 목록 */
    
    initLog(id, time, io, tag, content){                        return new LogSystem(id, time, io, tag, content); }                                 /* 로그 데이터베이스 초기화 */
    initLogTag(id, textColor, backgroundColor, borderColor){    return new LogTagSystem(id, textColor, backgroundColor, borderColor); }             /* 로그 태그 초기화 */

    findErrorTagById(target){   return this.ets.find(e => e.id == (Object.values(c_ERROR_TYPE).includes(target) ? target : -1)); }					/* 오류 태그 찾기 */
    findLogById(target){        return this.lgs.find(e => e.id == target); }																		/* 로그 기록 찾기 */
    findLogTagById(target){     return this.lts.find(e => e.id == (Object.values(c_LOG_TYPE).includes(target) ? target : c_LOG_TYPE.NORMAL)); }		/* 로그 태그 찾기 */

    addLogList(id, time, io, tag, content){                         /* 로그 데이터베이스 추가 */
        let g = this.initLog(id, time, io, tag, content);
        this.lgs.push(g);
        return g;
    }
    addLogTagList(id, textColor, backgroundColor, borderColor){     /* 로그 목록 추가 */
        let t = this.initLogTag(id, textColor, backgroundColor, borderColor);
        this.lts.push(t);
        return t;
    }

    sendConsole(c, a, t, m){					/* 콘솔 전송 */
        let msg = NC.fmtStr("%d %d %d", [t, a, m, c == "EB4E4E" ? newLine + "(클릭하여 원인 경로 파악)" : '']);
        switch(c){
            case "EB4E4E":  return;
            case "E6C78B":  return console.warn(msg);
            default:        return console.log(msg);
        }
    }

    error(type, ...replace){                    /* 오류 전달 */
        let tg = this.findErrorTagById(type);
		let str = tg == undefined && typeof type == "string" ? NC.fmtStr(type, replace[0]) : tg.detail;
        this.log(false, str, c_LOG_TYPE.ERROR);
        return new Error(str);
    }
    log(io, msg, type, ...replace){				/* 로그 전달 */
        let tm = TM.date.time - SYS.stpTime.time;
        let id = NC.fmtStr("Log-%0-%1", [tm, this.lgs.filter(g => g.id.split('-').at(1) == tm).length]);
        let str = NC.fmtStr(msg, replace[0])
		let tg = this.addLogList(id, TM.date.time, io, type, str);
        tg.send();
	}
}
class LogSystem{                /*** 로그 시스템 클래스 ***/
    #id;					/* 로그 ID */
    #time;					/* 기록 시간 */
    #io;					/* 입출력 유형 */
    #tag;					/* 태그 유형 */
    #content;				/* 내용 */
    #hasFinished;			/* 전송 여부 */
    #hasExpired;			/* 만료 여부 */
    #expire(){                                      /* 로그 만료 처리 */
        this.#hasExpired = true;
    }
    #record(str, time, arrow, txc, bgc, brd){       /* 로그 기록 처리 */
        let logLayout = iframeEle.getElementById("logOutputBox");		    //	로그 객체
        let layoutElm	= SYS.initElement("div", NC.fmtStr("log-%d_%d", [this.io ? 'i' : 'o', this.id]), "logOutputMessage");
        let clockElm	= SYS.initElement("span", null, "logDivOutputClock");
        let arrowElm	= SYS.initElement("span", null, "logDivOutputArrow");
        let contentElm	= SYS.initElement("pre", null, "logDivOutputContent");
        //	세부 속성
        clockElm.innerHTML = time;
        arrowElm.innerHTML = arrow;
        contentElm.innerHTML = str;
        clockElm.title = TM.initDate().showCurrentTime(c_TIME_TYPE.FULL);
        SYS.initAttributeColors(layoutElm, bgc, (NC.isColor(txc) ? txc : c_LIST_COLOR.TEXT_CHATBOX), c_LIST_COLOR.BLACK, null, false, brd);
        LM.sendConsole(txc, arrow, time, str);
        if(!SYS.hasInitDsb) return false;
        SYS.addDashboardEle(layoutElm, [clockElm, arrowElm, contentElm]);
        SYS.addDashboardEle(logLayout, layoutElm);
        SYS.updateDashboard();
        if(logLayout.scrollHeight > 0){				//	자동 스크롤
            logLayout.scrollTop = logLayout.scrollHeight;
        }
        return true;
    }

    constructor(id, time, io, tag, content){
		(async function(t){
    	    t.#id            	= id;			/* 로그 ID */
    	    t.#time          	= time;			/* 기록 시간 */
    	    t.#io            	= io;			/* 입출력 유형 */
    	    t.#tag           	= tag;			/* 태그 유형 */
    	    t.#content       	= content;		/* 내용 */
    	    t.#hasFinished		= null;			/* 전송 여부 */
    	    t.#hasExpired		= false;		/* 만료 여부 */
		})(this);
    }

    get id(){           return this.#id; }				/* 로그 ID */
    get time(){         return this.#time; }			/* 기록 시간 */
    get io(){           return this.#io; }				/* 입출력 유형 */
    get tag(){          return this.#tag; }				/* 태그 유형 */
    get ctn(){          return this.#content; }			/* 내용 */
    get hasFinished(){ return this.#hasFinished; }		/* 전송 여부 */
    get hasExpired(){   return this.#hasExpired; }		/* 만료 여부 */

    set hasFinished(v){									/* 만료 여부 */
        if(Object.isFrozen(this.hasFinished)) return -1;
        Object.freeze(this.#hasFinished = v);
    }

    send(){                     					    /* 로그 전달 */
        if(this.hasExpired) return;                     //  만료된 로그는 다시 전송하지 않음
        if(!this.ctn) return;					        //	빈 메시지는 전송하지 않음
        let tmf = TM.initDate().showCurrentTime(); 	    //	시간 형식
        let arw = this.io ? '▶' : '◀';          		//  입출력 유형
        let tg = LM.findLogTagById(this.tag);
        this.#hasFinished = this.#record(this.ctn, tmf, arw, tg.txc, tg.bgc, NC.fmtStr("1px solid #%d", tg.brc));
        this.#expire();
    }
}
class LogTagSystem{             /*** 로그 태그 시스템 클래스 ***/
    #id;					/* 태그 ID */
    #textColor;				/* 텍스트 색상 */
    #backgroundColor;		/* 배경 색상 */
    #borderColor;			/* 모서리 색상 */

    constructor(id, textColor, backgroundColor, borderColor){
		(async function(t){
        	t.#id                = id;											/* 태그 ID */
        	t.#textColor         = textColor ? textColor : null;				/* 텍스트 색상 */
        	t.#backgroundColor   = backgroundColor ? backgroundColor : null;	/* 배경 색상 */
        	t.#borderColor       = borderColor ? borderColor : null;			/* 모서리 색상 */
		})(this);
    }

    get id(){   return this.#id; }						/* 태그 ID */
    get txc(){  return this.#textColor; }				/* 텍스트 색상 */
    get bgc(){  return this.#backgroundColor; }			/* 배경 색상 */
    get brc(){  return this.#borderColor; }				/* 모서리 색상 */
}
const TM	= new TimeManager(c_TIME_TYPE.NORMAL);	/* 시간 매니저 클래스 */
const SYS	= new GameSystem(						/* 게임 시스템 클래스 */
	/* 버전, 릴리스 일자, 개발자 모드 유무, 비밀번호 고정 유무 */
    "v1.00", "2023.08.27", false, false
);
const NC 	= new NotificationManager(				/* 알림 매니저 클래스 */
	/* [메시지 기본 색상] 공통, 권한 없음, 주의, 상세정보, 잠금 및 해제, 알림, 경고 */
	c_LIST_COLOR.DEFAULT, c_LIST_COLOR.GRAY, c_LIST_COLOR.ORANGE, c_LIST_COLOR.GREEN, c_LIST_COLOR.YELLOW, c_LIST_COLOR.GREEN, c_LIST_COLOR.RED
);
const GM 	= new GameManager(						/* 게임 매니저 클래스 */
	/* 장기 무응답 플레이어 판정 시간, 반복 채팅 판정 시간(밀리초 단위), 도달 기준 시간 */
	200, 500, 0
);

const CS 	= new ChatManager(						/* 채팅 매니저 클래스 */
	/* 채팅 얼림 여부, 귓속말 차단 여부, 채팅 필터링 단계, 금지어 최대 감지량, 반복 채팅 최대 감지량 */
	false, false, 2, 50, 3, [
		/* 추가 금지어 목록 */
	]
);
const CM 	= new CommandManager(					/* 명령어 클래스 */
	/* 채팅 글자 제한 수 */
	75
);
const AMN	= new Administration(					/* 관리 클래스 */
	/* 동적 권한 할당 여부, 팀 자율 이동 여부, 맵 고정 여부, 고정 맵 데이터, 최고 관리자 상한 인원, 호스트 팀 이동 여부 */
	true, true, false, null, 3, true, [
		/***
			슈퍼 블랙리스트 초기화
			-출입제한 여부, 이름, 주소, 사유 순으로 아래와 같은 양식에 맞추어 명단을 작성할 수 있습니다.
			-<예시> [true, "알파고", null, "기분상해죄"], 또는 [true, undefined, "12345678901234567890", "기분북경죄"],
		***/
		/***
			 블랙리스트 초기화
			-출입제한 여부, 이름, 주소, 사유 순으로 아래와 같은 양식에 맞추어 명단을 작성할 수 있습니다.
			-<예시> [false, "알파고", null, "기분상해죄"], 또는 [false, undefined, "12345678901234567890", "기분북경죄"],
		***/
	]
);
const PM 	= new PlayerManager();					/* 플레이어 매니저 클래스 */
const SC	= new ScoreManager(						/* 점수 매니저 클래스 */
	/* 충돌 범위 민감도, 승리, 패배, 득점, 실점, 도움 */
	1.25, 3, -3, 5, -5, 2
);
const LM    = new LogManager(                       /* 로그 매니저 클래스 */

);
const room	= ROOM;

const internalCommands	= CM.initCommands(true, [	        /*** 내부 명령어 ***/
	/***
		-UMUX 내부 시스템을 접근하는 명령어입니다.
		-기존 명령어 삭제 및 신규 명령어 추가는 금지합니다.
		-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
	***/
	[CM.comAdminList, [
        "admin", "show_admin", "adminlist", "adminList", "admin_list", "admins", "show_admins", "어드민", "어드", "어드명단", "어드목록", "관리자", "관리명단", "관리목록", "권한명단", "권한목록"
    ]],
    [CM.comChatHistory, [					/* 채팅 기록 조회 */
		"chat_list", "chatlist", "chats", "chat", "message_list", "messagelist", "messages", "message", "촘ㅅ_ㅣㅑㄴㅅ", "촘시ㅑㄴㅅ", "촘ㅅㄴ", "촘ㅅ", "채팅리스트", "채팅기록", "채팅", "대화", "메시지리스트", "메시지기록", "메시지", "메세지리스트", "메세지기록", "메세지", "aptlwlfltmxm", "aptlwlrlfhr", "aptlwl", "aptpwlfltmxm", "aptpwlrlfhr", "aptpwl"
	]],
	[CM.comMutedList, [
        "mutes", "mutedlist", "muted_list", "mutedList", "mutelist", "mute_list", "muteList", "채팅금지명단", "채금명단", "채금자", "채금목록"
    ]],
	[CM.comNotiHistory, [					/* 알림 기록 조회 */
		"bell_list", "belllist", "notifications", "notification", "noti", "ㅠ디ㅣ_ㅣㅑㄴㅅ", "ㅠ디ㅣㅣㅑㄴㅅ", "ㅜㅐ샤럋ㅁ샤ㅐㅜㄴ", "ㅜㅐ샤럋ㅁ샤ㅐㅜ", "ㅜㅐ샤", "벨리스트", "알림"
	]],
	[CM.comSleepList, [
        "afks", "afklist", "afk_list", "show_afks", "잠수명단", "잠수자", "잠수목록"
    ]],
	[CM.comRecaptcha, [
        "recaptcha", "리캡챠", "리캡차", "ㄱㄷㅊㅁㅐㅅㅊㅗㅁ", "flzoqci", "flzoqck", "로봇"
    ]],
	[CM.comKick, [
        "kick", "킥", "강제퇴장", "퇴장", "강퇴", "ㅏㅑ차", "zlr", "rkdwpxhlwkd", "xhlwkd", "rkdxhl"
    ]],
	[CM.comResetGame, [                         /* 다시 시작 */
        "rr", "ㄱㄱ", "리", "re"
    ]],
	[CM.comSwapGame, [                       	/* 자동 재시작 */
        "r", "ㄱ", "고"
    ]],
	[CM.comClearBans, [							/* 영구 퇴장 명단 초기화 */
		"clear_bans", "clearbans", "밴_클리어", "밴클리어", "밴클", "칟ㅁㄱ_ㅠ무", "칟ㅁㄱ규무"
	]],
	[CM.comFreezeChat, [							/* 채팅창 얼리기 */
		"freeze", "ㄺㄷㄷㅋㄷ", "얼리기", "얼기", "채팅얼기", "채팅얼리기", "djfflrl", "djfrl", "coxlddjfrl", "coxlddjfflrl"
	]],
	[CM.comUnfreezeChat, [						/* 채팅창 녹이기 */
		"unfreeze", "ㅕㅜㄺㄷㄷㅋㄷ", "녹기", "녹이기", "채팅녹기", "채팅녹이기", "shrrl", "shrdlrl", "coxldshrrl", "coxldshrdlrl"
	]],
	[CM.comUpdateUniform, [                           /* 팀 유니폼 */
        "colors", "color", "uniform", "컬러", "유니폼", "ㅋㄹ", "ㅇㄴㅍ", "채ㅣㅐㄱㄴ", "채ㅣㅐㄱ", "ㅕㅜㅑ래그", "zjffj", "dbslvha"
    ]],
	[CM.comClearUniform, [
        "clear_color", "reset_color", "clear_uniform", "reset_uniform", "클리어_유니폼", "초기화_유니폼", "유니폼_초기화", "클리어_유니폼", "유니폼_클리어", "clearcolor", "clearuniform", "클리어유니폼", "초기화유니폼", "유니폼초기화", "클리어유니폼", "유니폼클리어"
    ]],
	[CM.comAllowJoin, [                                             /* 팀 이동 제한(전체) */
        "lock_join", "isLockJoin", "join_lock", "joinlock", "조인_락", "조인락", "락_조인", "락조인", "ㅣㅐ차_ㅓㅐㅑㅜ", "ㅓㅐㅑㅜ_ㅣㅐ차", "whdls_flr", "fkr_whdls"
    ]],
	[CM.comPinHost, [
        "lock_host", "lockhost","host_lock", "hostlock", "락_호스트", "락호스트", "호스트_락", "호스트락", "ㅣㅐ차_ㅙㄴㅅ", "ㅙㄴㅅ_ㅣㅐ차", "fkr_ghtmxm", "ghtmxm_fkr"
    ]],
	[CM.comSetPassword, [                                          /* 비밀번호 */
        "set_pw", "set_password"
    ]],
	[CM.comClearPassword, ["clear_pw", "clear_password"]],
	[CM.comShowPassword, ["show_pw", "show_password"]],
	[CM.comUpdateScore, [                                            /* 점수 지정 */
        "score", "ㄴ책ㄷ", "스코어", "점수", "smzhdj", "wjatn"
    ]],
	[CM.comUpdateTime, [                                             /* 시간 지정 */
        "time", "타임", "시간", "샤ㅡㄷ", "xkdla", "tlrks"
    ]],
	[CM.loadMap, [
        "load", "map", "로드", "맵", "ㅣㅐㅁㅇ", "fhem", "ㅡ메"
    ]],
	[CM.alertSpam, [                                              /* 반복 채팅 방지 문자 출력 */
        "도배방지", "도배", "도", "ehqo"
    ]],
	[CM.comMute, ["mute", "ㅡㅕㅅㄷ", "채팅금지", "채금", "뮤트", "abxm"]],
	[CM.comUnmute, ["unmute", "ㅕㅜㅡㅕㅅㄷ", "채팅허용", "채금풀기"]],
	[CM.comRecording, [                                /* 녹화 시작 및 종료 */
        "rec", "녹화", "shrghk"
    ]],
	[CM.infoLink, [
        "link", "url", "링크", "주소", "ㅣㅑㅜㅏ", "ㅕ기", "fldzm", "wnth"
    ]],
	[CM.infoRoom, [									/* 서버 정보 */
		"about", "aboutinfo", "info", "system", "aboutver", "verinfo", "version", "버전", "ver", "정보", "wjdqh", "tltmxpa"
	]]
]);
const standardCommands	= CM.initCommands(false, [	        /*** 표준 명령어 ***/
	/***
		-UMUX 표준 명령어입니다.
		-기존 명령어 삭제 및 신규 명령어 추가는 권장하지 않습니다.
		-기존 명령어 접근을 막거나 주석 처리는 권장하지 않습니다.
	***/
	[CM.helpCom, [                    /* 종합 도움말 */
        "help", "헬프", "도움", "명령", "명령어", "ㅗ디ㅔ", "gpfvm"
    ]],
	[CM.helpBot, [
        "bothelp", "봇헬프", "봇방", "봇방도움말", "ㅠㅐ소디ㅔ", "봇", "qht"
    ]],
	[CM.helpChat, [
        "chathelp", "채팅", "챗", "챗헬프", "채팅명령어", "챗도움", "챗도움말", "촘소디ㅔ"
    ]],
	[CM.helpJoin, [
        "joinhelp", "enterhelp", "helpenter", "투입", "투입?", "투입!", "투입해", "투입하셈", "투입요", "투입좀시켜라", "넣어", "넣어줘","넣어라","넣어봐라","넣어주세요", "투입해주세요", "껴줘", "투입해드려", "투입명령어", "투입도움말"
    ]],
	[CM.helpMap, [
        "maphelp", "맵도움", "맵도움말", "맵헬프", "유즈맵", "유즈맵도움말", "ㅡ메ㅗ디ㅔ"
    ]],
	[CM.helpRank, ["rankhelp", "helprank", "랭크헬프", "헬프랭크", "랭크도움말"]],
	[CM.helpScore, [
        "scorehelp", "helpscore", "점수도움", "스코어헬프", "ㄴ책도디ㅔ", "wjatnehdna"
    ]],
	[CM.helpMisc, [
        "mischelp", "etchelp", "기타헬프", "기타도움", "기타도움말", "기타", "ㄷㅅ초디ㅔ", "ㅡㅑㄴ초디ㅔ"
    ]],
	[CM.comAllChat, [                             /* 채팅(전체, 팀별, 개인) */
        "a", "올", "전체", "ㅁ", "all", "wjscp", "wjs"
    ]],
	[CM.comTeamChat, ["t", "팀", "ㅅ", "ㅌ", "xla", "x"]],
	[CM.comPrivateChat, [
        "e", "귓속말", "귓말", "귓", "개인", "ㄷ",	"rnltthrakf", "rnltakf", "rnlt"
    ]],
	[CM.comAvatar, [                              /* 등번호 설정 및 초기화 */
        "avatar", "아바타", "ㅇㅂㅌ", "ㅁㅍㅁㅅㅁㄱ", "등번호", "emdqjsgh"
    ]],
	[CM.comResetAvatar, [
        "clear_avatar", "reset_avatar", "avatar_clear", "클리어_아바타", "ㅋㄹㅇ_ㅇㅂㅌ", "칟ㅁㄱ_ㅁㅍㅁㅅㅁㄱ", "리셋_아바타", "clearavatar", "resetavatar", "클리어아바타", "아바타클리어", "ㅋㄹㅇㅇㅂㅌ", "칟ㅁㄱㅁㅍㅁㅅㅁㄱ", "리셋아바타", "초기화아바타", "아바타초기화", "초기화_아바타", "아바타_초기화"
    ]],
	[CM.comChatMode, [                            /* 채팅 모드 설정 */
        "chatmode", "촘스ㅐㅇㄷ", "챗모드", "채팅모드", "챗", "채팅", "cotahem", "coxldahem", "cot", "coxld"
    ]],
	[CM.comLockPrivateChat, [                     /* 수신 설정 */
        "lock_private", "lock_private_chat", "락_귓속말", "락_귓말", "ㅣㅐ차_ㅔ걒ㅁㅅㄷ"
    ]],
	[CM.comJoin, [                                /* 게임 참가 및 설정 */
        "join", "enter", "참가", "참여", "입장", "투입", "조인", "참여", "ㅓㅐㅑㅜ", "ㅓㅒㅑㅜ", "둣ㄷㄱ", "ckark", "ckadu", "xndlq"
    ]],
	[CM.comAfk, ["afk", "ㅁ라", "잠수", "wkatn"]],
	[CM.infoStats, [                             /* 전적 및 랭킹 */
        "stats", "stat", "record", "기록", "스탯", "전적", "wjswjr", "tmxot"
    ]],
	[CM.infoRanking, [
        "ranking", "rank", "랭킹", "랭", "순", "순위", "fodzld", "fod", "tnsdnl", "gof"
    ]],
	[CM.infoMaps, [                             /* 맵 정보 */
        "maplist", "map_list", "maps", "cm", "맵리스트", "맵목록", "map", "맵", "유즈맵", "page", "페이지", "ㅔㅁㅎㄷ", "vpdlwl", "츠"
    ]],
]);
let customCommands		= CM.initCommands(false, [			/*** 추가 명령어 ***/
	/***
		-UMUX 커스텀 명령어입니다.
		-신규 명령어 추가에 적합하며, 권장합니다.
	***/
]);
/*** room 객체 이벤트 ***/
room.onGameStart			= function(byPlayer){                              /* 경기 시작 이벤트 */
    console.log(NC.fmtStr("누적 경기 횟수: %d", GM.sumMatch));
    GM.onGameStart(byPlayer);
}
room.onGameTick				= ()			=> GM.onGameTick();					/* 경기 진행 이벤트 */
room.onGameStop				= (byPlayer)	=> GM.onGameStop(byPlayer);			/* 경기 종료 이벤트 */
room.onGamePause			= (byPlayer)	=> GM.onGamePause(byPlayer);		/* 경기 중지 이벤트 */
room.onGameUnpause			= (byPlayer)	=> GM.onGameUnpause(byPlayer);		/* 경기 재개 이벤트 */
room.onKickRateLimitSet		= async function(min, rate, burst, player){		/* 킥 제한 이벤트 */
	await Promise.all([GM.onKickRateLimitSet(min, rate, burst, player)]);
}
room.onPlayerActivity		= (player) => PM.onPlayerActivity(player);	/* 플레이어 동작 응답 이벤트 */
room.onPlayerAdminChange	= async function(givenPlayer, byPlayer){			/* 권한 변경 이벤트 */
	await Promise.all([AMN.onPlayerAdminChange(givenPlayer, byPlayer)]);
}
room.onPlayerBallKick		= (player)	=> GM.onPlayerBallKick(player);	/* 킥 판정 이벤트 */
room.onPlayerChat			= function(player, msg){ 					/* 채팅 입력 이벤트 */
    const opc = async function(player, msg){
        await Promise.all([
            TM.clearTimerByName("commandActivated", player.id),
            CM.onPlayerChat(player, msg),
            CS.onPlayerChat(player, msg)
        ]);
    }
    opc(player, msg);
	return false;					//	명령어 입력 기록 숨기기
}
room.onPlayerJoin			= async function(player){										/* 플레이어 입장 이벤트 */
    console.log(NC.fmtStr("접속 인원: %d", PM.cntPlayers()));
    GM.onPlayerJoin(player);
}
room.onPlayerLeave			= async function(player){ 									/* 플레이어 퇴장 이벤트 */
	let target = PM.findPlayerById(player.id);
    await Promise.all([
	    TM.addTimer("gm_onPlayerLeave", () => {
            GM.onPlayerLeave(target);
            console.log(NC.fmtStr("접속 인원: %d", PM.cntPlayers()));
    })]);
}
room.onPlayerKicked			= async function(kickedPlayer, reason, ban, byPlayer){		/* 플레이어 강제 퇴장 이벤트 */
	await Promise.all([AMN.onPlayerKicked(kickedPlayer, reason, ban, byPlayer)]);
}
room.onPlayerTeamChange		= async function(player, byPlayer){ 							/* 팀 교체 이벤트 */
    await Promise.all([
    	PM.onPlayerTeamChange(player, byPlayer),
    	SC.onPlayerTeamChange(player, byPlayer)
    ]);
}
room.onPositionsReset		= async function(){								/* 득실점 판정 직후 참가자 좌표 초기화 */
    await Promise.all([
    	GM.onPositionsReset(),
    	SC.onPositionsReset()
    ]);
}
room.onStadiumChange		= async function(newMap, byPlayer){				/* 맵 교체 이벤트 */
	await Promise.all([GM.onStadiumChange(newMap, byPlayer)]);
}
room.onRoomLink				= (url)		=> GM.onRoomLink(url);			/* 링크 업로드(서버 불러오기) */
room.onTeamGoal				= (team)	=> GM.onTeamGoal(team);			/* 골 판정 이벤트 */
room.onTeamVictory			= (scores)	=> GM.onTeamVictory(scores);	/* 팀 승리 이벤트 */
