import { Point } from "@/types/canvas";
import { PRESCRIPTION_ZONES } from "@/lib/constants/zone";

export function getBoundingBox(points: Point[]): [number, number, number, number] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }

  return [minX, minY, maxX, maxY];
}

export function identifyZone(points: Point[], canvasWidth: number, canvasHeight: number) {
  if (points.length === 0 || canvasWidth === 0 || canvasHeight === 0) return undefined;

  // Calculate centroid
  let sumX = 0;
  let sumY = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }
  const centerX = sumX / points.length;
  const centerY = sumY / points.length;

  // Normalize coordinates
  const normX = centerX / canvasWidth;
  const normY = centerY / canvasHeight;

  // Find matching zone
  for (const zone of PRESCRIPTION_ZONES) {
    if (
      normX >= zone.x &&
      normX <= zone.x + zone.width &&
      normY >= zone.y &&
      normY <= zone.y + zone.height
    ) {
      return zone.label;
    }
  }

  return undefined;
}

/**
 * Simplifies a stroke using the Ramer-Douglas-Peucker algorithm.
 */
/* export function simplifyStroke(points: Point[], epsilon: number = 1.0)  {
  if (points.length <= 2) return points;

  const findMaximumDistance = (pts: Point[], start: number, end: number): [number, number] => {
    let maxDist = 0;
    let index = 0;

    const pStart = pts[start];
    const pEnd = pts[end];

    for (let i = start + 1; i < end; i++) {
      const p = pts[i];
      const dist = perpendicularDistance(p, pStart, pEnd);
      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }

    return [maxDist, index];
  };

  const perpendicularDistance = (p: Point, p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    if (dx === 0 && dy === 0) {
      return Math.sqrt((p.x - p1.x) ** 2 + (p.y - p1.y) ** 2);
    }

    const t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy);
    
    if (t < 0) {
      return Math.sqrt((p.x - p1.x) ** 2 + (p.y - p1.y) ** 2);
    } else if (t > 1) {
      return Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
    }

    const closestX = p1.x + t * dx;
    const closestY = p1.y + t * dy;

    return Math.sqrt((p.x - closestX) ** 2 + (p.y - closestY) ** 2);
  };

  const simplify = (pts: Point[], start: number, end: number): Point[] => {
    const [maxDist, index] = findMaximumDistance(pts, start, end);

    if (maxDist > epsilon) {
      const left = simplify(pts, start, index);
      const right = simplify(pts, index, end);

      return [...left.slice(0, -1), ...right];
    } else {
      return [pts[start], pts[end]];
    }
  };

  return simplify(points, 0, points.length - 1);
} */
