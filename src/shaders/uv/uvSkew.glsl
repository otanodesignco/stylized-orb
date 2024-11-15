vec2 uvSkew( vec2 uv, vec2 skewFactor )
{

    mat2 skewMat = mat2( 
        1.0, skewFactor.x,
        skewFactor.y, 1.0 );
    
    vec2 uvCentered = uv - 0.5;

    vec2 uvSkewed = skewMat * uvCentered;

    return uvSkewed + 0.5;
    
}