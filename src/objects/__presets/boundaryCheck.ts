import { polygonIntersectsPolygon } from 'geometric';

import { MovingGameObject } from '@objects/base/MovingGameObject';
import { GameObject } from '@objects/base/GameObject';
import { Edge, TCoordinates, TPaddings } from '@core/types';

/**
 *
 * @param objectA
 * @param objectB
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getIntersectPaddings = (objectA: GameObject, objectB: GameObject): TPaddings => {
  const objectACoordinates = objectA.getCoordinates();
  const objectASize = objectA.getSizes();

  const objectBCoordinates = objectB.getCoordinates();
  const objectBSize = objectB.getSizes();

  const objectACenter: TCoordinates = {
    x: objectACoordinates.x + objectASize.width / 2,
    y: objectACoordinates.y + objectASize.height / 2,
  };

  return {
    top: objectACenter.y - objectBCoordinates.y,
    right: objectBCoordinates.x + objectBSize.width - objectACenter.x,
    bottom: objectBCoordinates.y + objectBSize.height - objectACenter.y,
    left: objectACenter.x - objectBCoordinates.x,
  };
};

/**
 *
 * @param object
 * @param moving
 * @param paddings
 */
export const canInteraction = (object: GameObject, moving: MovingGameObject, paddings?: Partial<TPaddings>) => (
  polygonIntersectsPolygon(object.getPolygon(paddings), moving.getPolygon())
);

/**
 *
 * @param object
 * @param moving
 */
export const topIntersect = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const movingSize = moving.getSizes();

  const hasIntersect = polygonIntersectsPolygon(object.getEdgePolygon(Edge.top), moving.getEdgePolygon(Edge.bottom));

  if (!hasIntersect) return;

  moving.setIsOnGround(true);
  moving.setCoordinates({ y: objectCoordinates.y - movingSize.height });
};

/**
 *
 * @param object
 * @param moving
 */
export const rightIntersect = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const objectSizes = object.getSizes();

  const hasIntersect = polygonIntersectsPolygon(object.getEdgePolygon(Edge.right), moving.getEdgePolygon(Edge.left));

  if (!hasIntersect) return;

  moving.setCoordinates({ x: objectCoordinates.x + objectSizes.width });
};

/**
 *
 * @param object
 * @param moving
 */
export const bottomIntersect = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const objectSizes = object.getSizes();

  const hasIntersect = polygonIntersectsPolygon(object.getEdgePolygon(Edge.bottom), moving.getEdgePolygon(Edge.top));

  if (!hasIntersect) return;

  if (moving.isJump) {
    moving.setJump(false);
  }

  moving.setCoordinates({ y: objectCoordinates.y + objectSizes.height });
};

/**
 *
 * @param object
 * @param moving
 */
export const leftIntersect = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const movingSize = moving.getSizes();

  const hasIntersect = polygonIntersectsPolygon(object.getEdgePolygon(Edge.left), moving.getEdgePolygon(Edge.right));

  if (!hasIntersect) return;

  moving.setCoordinates({ x: objectCoordinates.x - movingSize.width });
};

/**
 *
 * @param object
 * @param moving
 */
export const outerRectangle = (object: GameObject, moving: MovingGameObject) => {
  const hasIntersect = polygonIntersectsPolygon(object.getPolygon(), moving.getPolygon());

  if (!hasIntersect) return false;

  const paddings = getIntersectPaddings(moving, object);

  const min = Math.min(...Object.values(paddings));

  switch (min) {
    case paddings.top: return topIntersect(object, moving);
    case paddings.right: return rightIntersect(object, moving);
    case paddings.bottom: return bottomIntersect(object, moving);
    case paddings.left: return leftIntersect(object, moving);
  }
};
