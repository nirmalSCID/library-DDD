export class MemberId {
    constructor(readonly value: string) {}
}

export class Member {
    constructor(readonly memberId: MemberId, readonly name: string) {}
}