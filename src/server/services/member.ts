import Member, { IMember } from '../db/models/member';

class MemberService {
  async findMember(uid: string) {
    return Member.findById(uid).exec();
  }

  async findMemberBySocialId(socialId: string, social: string) {
    return Member.findOne({ socialId, social }).exec();
  }

  async addMember(member: IMember) {
    return new Member(member).save();
  }
}

export default new MemberService();
