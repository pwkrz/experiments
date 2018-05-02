const getHypot = (x1, x2, y1, y2) => Math.hypot( (Math.max(x1, x2) - Math.min(x1, x2)), (Math.max(y1, y2) - Math.min(y1, y2)) ),
    getDelta = (...args) => {
        switch (args.length) {
            case 1:
                return args[0] / Math.abs( 4*args[0] );
            case 5:
                let [pinchZero, ...touchCoords] = [...args],
                    hyp = getHypot( ...touchCoords ),
                    delta = pinchZero - hyp;
                
                pinchZero = hyp;

                return delta / Math.abs( 20*delta );
            default:
                return 0;
        }
    },
    getPinchCenter = (x1, x2, y1, y2) => { return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 } },
    getZeroCoords = () => { return {x: 0, y: 0} },
    getDimensions = (ref) => {
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

export { getHypot, getDelta, getPinchCenter, getZeroCoords, getDimensions };