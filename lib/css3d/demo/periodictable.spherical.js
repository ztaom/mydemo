// https://github.com/mrdoob/three.js/blob/dev/src/math/Spherical.js
export default class Spherical{
	constructor( radius, phi, theta ) {

		this.radius = ( radius !== undefined ) ? radius : 1.0;
		this.phi = ( phi !== undefined ) ? phi : 0; // up / down towards top and bottom pole
		this.theta = ( theta !== undefined ) ? theta : 0; // around the equator of the sphere

		return this;

	}

	set ( radius, phi, theta ) {

		this.radius = radius;
		this.phi = phi;
		this.theta = theta;

		return this;

	}

	clone () {

		return new this.constructor().copy( this );

	}

	copy ( other ) {

		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;

		return this;

	}

	// restrict phi to be betwee EPS and PI-EPS
	makeSafe() {

		var EPS = 0.000001;
		this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

		return this;

	}
}
