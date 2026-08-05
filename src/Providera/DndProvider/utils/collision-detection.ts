import {closestCorners, type CollisionDetection} from "@dnd-kit/core";
import {arraySwap} from "@dnd-kit/sortable";

export const detectionCollision: CollisionDetection = (args) => {

    return args.active.data.current!.isList ? detectListCollision(args) : detectionItemCollision(args);
};

const detectListCollision: CollisionDetection = (args) => {
    const pointerX = args.pointerCoordinates!.x;

    const containers = args.droppableContainers.filter(
        container => container.data.current!.isList,
    );

    let minDistance = Number.POSITIVE_INFINITY;
    let closestContainer = containers[0];

    containers.forEach((container) => {
        const distance = Math.abs(pointerX - container.rect.current!.left);

        if (distance < minDistance) {
            minDistance = distance;
            closestContainer = container;
        }
    })

    return [{id: closestContainer.id}];
};

/**
 * When user holds draggable between two lists,
 * it sticks in an infinite loop and moves the item back and forth between two lists.
 *
 * This happens because item has the same distance to both lists.
 * So at first the item moves to list B,
 * in next render it moves to list A,
 * and so on and so forth.
 *
 * To prevent this from happening, we will sort the lists by two factors:
 * 1. First by distance (which will be done by `closestCorners` algorithm)
 * 2. Then by id (which always returns the same result if two lists have the same distance)
 *
 * Note that based on our app structure, we only care about the first two collisions,
 * so we don't need to sort the entire array on second step.
 */
const detectionItemCollision: CollisionDetection = (args) => {
    //step 1
    // Sort collisions based on distance.
    const collisions = closestCorners(args);

    // There are less than 2 collisions in total, so the order doesn't matter.
    if (collisions.length < 2) return collisions;

    // First two collisions have different values, so the order is correct.
    if (collisions[0].data?.value !== collisions[1].data?.value) return collisions;

    //collisions have some values, but the order is already correct.
    if (collisions[0].id < collisions[1].id) return collisions;

//step 2
    // Collisions have some values, but the order is incorrect
    return arraySwap(collisions, 0, 1);
}