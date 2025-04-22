import { Member, MemberId } from "../../domain/member";

export interface MemberRepository {
    findById(memberId: MemberId): Promise<Member | null>;
    save(member: Member): Promise<void>;
}
