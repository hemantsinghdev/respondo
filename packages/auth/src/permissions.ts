import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  ticket: ["create", "share", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const owner = ac.newRole({
  ...ownerAc.statements,
  ticket: ["create", "share", "update", "delete"],
});

const admin = ac.newRole({
  ...adminAc.statements,
  ticket: ["create", "share", "update", "delete"],
});

const member = ac.newRole({
  ...memberAc.statements,
  ticket: ["create", "share", "update", "delete"],
});

export { ac, owner, admin, member };
