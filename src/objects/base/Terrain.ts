import { GameObject, GameObjectProps } from '@objects/base/GameObject';

export interface TerrainProps extends GameObjectProps {}

export abstract class Terrain extends GameObject {}
