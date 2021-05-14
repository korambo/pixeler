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
export const outerSquire = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const objectSize = object.getSizes();
  const movingCoordinates = moving.getCoordinates();
  const movingSize = moving.getSizes();

  const movingPivot: TCoordinates = {
    x: movingCoordinates.x,
    y: movingCoordinates.y + movingSize.height,
  };

  const hasIntersect = polygonIntersectsPolygon(object.getPolygon(), moving.getPolygon());

  if (!hasIntersect) return false;

  // const paddings = getIntersectPaddings(object, moving);

  const topPadding = movingPivot.y - objectCoordinates.y;
  const rightPadding = objectCoordinates.x + objectSize.width - movingPivot.x;
  const bottomPadding = objectCoordinates.y + objectSize.height - movingPivot.y;
  const leftPadding = movingPivot.x - objectCoordinates.x;

  // const currentPadding = Math.min(...Object.values(paddings));
  const currentPadding = Math.min(topPadding, rightPadding, bottomPadding, leftPadding);

  if (currentPadding === topPadding && movingPivot.y >= objectCoordinates.y) {
    moving.setIsOnGround(true);
    moving.setCoordinates({ y: objectCoordinates.y - movingSize.height });
  }

  // if (currentPadding === paddings.top && movingPivot.y >= objectCoordinates.y) {
  //   moving.setIsOnGround(true)
  //   moving.setCoordinates({ y: objectCoordinates.y - movingSize.height });
  // }

  // if (currentPadding === paddings.right && movingPivot.x <= objectCoordinates.x + objectSize.width) {
  //   moving.setCoordinates({ x: objectCoordinates.x + objectSize.width + movingSize.width / 2 });
  // }
  // todo
  return false;
};

/**
 *
 * @param object
 * @param moving
 */
export const atRectangle = (object: GameObject, moving: MovingGameObject) => {
  const objectCoordinates = object.getCoordinates();
  const movingSize = moving.getSizes();

  const hasIntersect = polygonIntersectsPolygon(object.getEdgePolygon(Edge.top), moving.getEdgePolygon(Edge.bottom));

  // new Polygon({ dots: object.getEdgePolygon(Edge.bottom) }).draw();
  // new Polygon({ dots: moving.getEdgePolygon(Edge.right) }).draw();

  if (!hasIntersect) return;

  moving.setIsOnGround(true);
  moving.setCoordinates({ y: objectCoordinates.y - movingSize.height });
};

// 0: (2) [360, 500]
// 1: (2) [432, 500]
// 2: (2) [432, 504]
// 3: (2) [360, 504]
//
// 0: (2) [384, 500]
// 1: (2) [424, 500]
// 2: (2) [424, 496]
// 3: (2) [384, 496]
