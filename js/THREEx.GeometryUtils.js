// This THREEx helper provide various basic functions for ```THREE.Geometry```.
// It is able to scale, translate, center a geometry. Other functions may be
// added soon.
// The API is chained for convenience.
//
// ## Scale 
// To make the geometry twice larger in ```y```

// ```
//   var scale = new THREE.Vector3(1,2,1);
//   THREEx.GeometryUtils.scale(geometry, scale);
// ```

// ## Translate
// To make the geometry move 100 further in ```x```

// ```
//   var translation = new THREE.Vector3(100,0,0);
//   THREEx.GeometryUtils.translate(geometry, translation);
// ```

// ## Center
// To center the geometry on its middle point

// ```
//   THREEx.GeometryUtils.center(geometry);
// ```

// ## middlePoint
// To compute the middle point of a geometry

// ```
//   THREEx.GeometryUtils.middlePoint(geometry);
// ```

// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};
THREEx.GeometryUtils	= THREEx.GeometryUtils	|| {};

// TODO
// - chained API
// - possibility a matrix to reduce computation ?

/**
 * Change the scale of a geometry
 * 
 * @params {THREE.Geometry} geometry the geometry to compute on
 * @params {THREE.Vector3} scale the middlepoint of the geometry
*/
THREEx.GeometryUtils.scale	= function(geometry, scale)
{
	// change all geometry.vertices
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.multiplySelf(scale); 
	}
	
	// mark the vertices as dirty
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
}

THREEx.GeometryUtils.translate	= function(geometry, delta)
{
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(delta.x, delta.y, delta.z) );
	return this;
}

/**
 * Compute the "middlePoint" aka the point at the middle of the boundingBox
 * 
 * @params {THREE.Geometry} the geometry to compute on
 * @returns {THREE.Vector3} the middlepoint of the geometry
*/
THREEx.GeometryUtils.middlePoint	= function(geometry)
{
	// compute bounding box
	geometry.computeBoundingBox();

	// compute middle
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.min.x + geometry.boundingBox.max.x ) / 2;
	middle.y	= ( geometry.boundingBox.min.y + geometry.boundingBox.max.y ) / 2;
	middle.z	= ( geometry.boundingBox.min.z + geometry.boundingBox.max.z ) / 2;

	// return the just computed middle
	return middle;
}

/**
 * Center the geometry on its middlepoint
*/
THREEx.GeometryUtils.center	= function(geometry, noX, noY, noZ)
{
	// compute delta
	var delta	= this.middlePoint(geometry).negate();
	if( noX )	delta.x	= 0;
	if( noY )	delta.y	= 0;
	if( noZ )	delta.z	= 0;

	return this.translate(geometry, delta)
}
