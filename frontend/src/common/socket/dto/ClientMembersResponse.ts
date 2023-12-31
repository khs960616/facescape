import { RoomMember } from './roomMember';

export class ClientMembersResponse {
  members :any;

  constructor(data:any) {
    this.members = data;
  }

  convertToMembers() {
    const convertedMembers = this.members.map(
      (member:any):RoomMember => ({
        id      : member.id,
        nickname: member.nickname
      })
    );

   return convertedMembers;
  }
}
