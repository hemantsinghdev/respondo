import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

export const statement = {
  ...defaultStatements,
  ticket: ["create", "share", "update", "delete"],
  document: ["upload", "view", "delete"],
} as const;

type Statement = typeof statement;

export type RolePermissions = Partial<{
  [K in keyof Statement]: Statement[K][number][];
}>;

const ac = createAccessControl(statement);

const owner = ac.newRole({
  ...ownerAc.statements,
  document: ["upload", "view", "delete"],
  ticket: ["create", "share", "update", "delete"],
});
const o = owner.statements;

const admin = ac.newRole({
  ...adminAc.statements,
  document: ["upload", "view", "delete"],
  ticket: ["create", "share", "update", "delete"],
});

const member = ac.newRole({
  ...memberAc.statements,
  document: ["view"],
  ticket: ["create", "share", "update", "delete"],
});

export { ac, owner, admin, member };
