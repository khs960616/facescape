import { Member } from "../../member/utils/member";

const MAX_PLAYER_NUMBER = 6;

export type RoomState = "PLAY" | "WAITING";

export class Room {
    private _roomId: string;
    private _stage: string;
    private _state: RoomState;
    private _hostId: number|undefined;
    private _members: Map<number, Member>; // 방에 입장한 유저, member pk가 키다.
    private _inGameMember: Map<number, Member>; // 게임 시작 시점에 있던 유저, 시작 이후 해당 유저들만 재입장이 가능하다.
    private _stageStartTime: number|undefined;
    private _gameObject: any[];

    constructor(roomId: string) {
        this._roomId = roomId;
        this._stage = "-1";
        this._state = "WAITING";
        this._members = new Map();
        this._inGameMember = new Map();
        this._gameObject = [];
    }

    get roomId(): string {
        return this._roomId;
    }

    get state(): RoomState {
        return this._state;
    }

    get hostId(): number|undefined{
        return this._hostId;
    }

    get members(): Map<number, Member>{
        return this._members;
    }

    get inGameMember(): Map<number, Member>{
        return this._inGameMember;
    }

    get stageStartTime(): number|undefined{
        return this._stageStartTime;
    }

    get stage(): string {
        return this._stage;
    }

    get gameObject(): any[] {
        return this._gameObject;
    }

    set state(state: RoomState) {
        this._state = state;
    }

    set stage(stage: string) {
        this._stage = stage;
    }

    set hostId(id: number) {
        this._hostId = id;
    }

    setInGameMember(map: Map<number,Member>){
        for (const [key, value] of map) {
            this._inGameMember.set(key, new Member(value));
        }
    }

    checkInGameMember(id: number) {
        return this._inGameMember.has(id);
    }

    joinMember(member: Member) {
        this._members.set(member.id, member);
    }

    removeMember(member: Member) {
        this._members.delete(member.id);
    }

    getMemberSize() {
        return this._members.size;
    }

    isFull() {
        return this._members.size === MAX_PLAYER_NUMBER;
    }

    isEmpty() {
        return this._members.size === 0;
    }

    setStartStageTime() {
        this._stageStartTime = new Date().getTime();
    }

    addGameObject(obj: any) {
        this._gameObject.push(obj);
    }

    getGameObjectSize() {
        return this._gameObject.length;
    }

    clearGameObject() {
        this._gameObject.forEach(gameObj=>{
          gameObj.stopShoot();
        })
        this._gameObject = [];
    }
}
