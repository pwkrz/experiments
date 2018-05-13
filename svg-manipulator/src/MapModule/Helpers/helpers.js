const getHypot = (x1, x2, y1, y2) => ( Math.hypot( (Math.max(x1, x2) - Math.min(x1, x2)), (Math.max(y1, y2) - Math.min(y1, y2)) ) );

const getDelta = (realDelta) => {
    return realDelta / Math.abs( 4 * realDelta ); // delta needs to be reduced to < 0.5, otherwise the zoom/pan is too fast
};

const getZoomPanParams = (pinchZero, ...touchCoords) => {
        let hyp = getHypot( ...touchCoords ),
            realDelta = pinchZero - hyp,
            normalizedDelta = realDelta / Math.abs( 50 * realDelta ); // as above

            return { normalizedDelta, hyp };
    };

const getPinchCenter = (x1, x2, y1, y2) => { return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 } };

const getZeroCoords = () => { return {x: 0, y: 0} };

const getDimensions = (ref) => {
        let refDimensions = ref.getBoundingClientRect(),
            refComputed = window.getComputedStyle(ref);

        refDimensions.inner = {
            top: refDimensions.top + parseInt(refComputed.borderTopWidth, 10) + parseInt(refComputed.paddingTop, 10),
            left: refDimensions.left + parseInt(refComputed.borderLeftWidth, 10) + parseInt(refComputed.paddingLeft, 10),
            bottom: refDimensions.bottom - parseInt(refComputed.borderBottomWidth, 10) - parseInt(refComputed.paddingBottom, 10),
            right: refDimensions.right - parseInt(refComputed.borderRightWidth, 10) - parseInt(refComputed.paddingRight, 10)
        }
        refDimensions.inner.width = refDimensions.inner.right - refDimensions.inner.left;
        refDimensions.inner.height = refDimensions.inner.bottom - refDimensions.inner.top;

        refDimensions.center = {
            x: refDimensions.left + ( refDimensions.width / 2 ),
            y: refDimensions.top + ( refDimensions.height / 2 )
        };

        return refDimensions;
    };

export { getHypot, getDelta, getZoomPanParams, getPinchCenter, getZeroCoords, getDimensions };