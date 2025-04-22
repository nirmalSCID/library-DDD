import { Member, MemberId } from '../../domain/member';
import { MemberRepository } from '../../application/ports/member.repository.port';
import { Database } from '../database.interface';
import { Logger } from '../logger.interface';
import { injectable, inject } from 'tsyringe';

@injectable()
export class InMemoryMemberRepository implements MemberRepository {
  constructor(
    @inject('Database') private readonly database: Database,
    @inject('Logger') private readonly logger: Logger
  ) {}

  async findById(memberId: MemberId): Promise<Member | null> {
    this.logger.info(`Fetching member with ID ${memberId.value}.`);
    return this.database.getMemberById(memberId.value);
  }

  async save(member: Member): Promise<void> {
    await this.database.saveMember(member);
    this.logger.info(`Member with ID ${member.memberId.value} saved.`);
  }
}
