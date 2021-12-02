import { TSizes } from '@core/types';

export enum SubjectSize {
  s = 's',
  m = 'm',
}

export const SubjectSizes: Record<SubjectSize, TSizes> = {
  [SubjectSize.s]: { width: 18, height: 24 },
  [SubjectSize.m]: { width: 18, height: 28 },
};

export enum WeaponSize {
  m = 'm',
}

export const WeaponSizes: Record<WeaponSize, TSizes> = {
  m: { width: 32, height: 32 },
};
