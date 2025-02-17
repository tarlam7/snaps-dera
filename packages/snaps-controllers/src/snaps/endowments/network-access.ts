import {
  EndowmentGetterParams,
  PermissionSpecificationBuilder,
  PermissionType,
  ValidPermissionSpecification,
  SubjectType,
} from '@metamask/permission-controller';

import { SnapEndowments } from './enum';

const permissionName = SnapEndowments.NetworkAccess;

type NetworkAccessEndowmentSpecification = ValidPermissionSpecification<{
  permissionType: PermissionType.Endowment;
  targetKey: typeof permissionName;
  endowmentGetter: (
    _options?: any,
  ) => ['fetch', 'Request', 'Headers', 'Response'];
  allowedCaveats: null;
}>;

/**
 * `endowment:network-access` returns the name of global browser API(s) that
 * enable network access. This is intended to populate the endowments of the
 * SES Compartment in which a Snap executes.
 *
 * @param _builderOptions - Optional specification builder options.
 * @returns The specification for the network endowment.
 */
const specificationBuilder: PermissionSpecificationBuilder<
  PermissionType.Endowment,
  any,
  NetworkAccessEndowmentSpecification
> = (_builderOptions?: any) => {
  return {
    permissionType: PermissionType.Endowment,
    targetKey: permissionName,
    allowedCaveats: null,
    endowmentGetter: (_getterOptions?: EndowmentGetterParams) => {
      return ['fetch', 'Request', 'Headers', 'Response'];
    },
    subjectTypes: [SubjectType.Snap],
  };
};

export const networkAccessEndowmentBuilder = Object.freeze({
  targetKey: permissionName,
  specificationBuilder,
} as const);
