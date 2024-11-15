vec2 polarCoords( vec2 uv )
{

    float pi = 3.1416;
    vec2 mappedUV = uv * 2.0 - 1.0;
    vec2 polarUV = vec2( atan( mappedUV.y, mappedUV.x ) / pi / 2.0 + 0.5, length( mappedUV ) );

    return polarUV;

}

vec2 polarCoords(vec2 uv, vec2 center, float zoom, float repeat)
{

    float pi = 3.1416;
	vec2 dir = uv - center;
	float radius = length(dir) * 2.0;
	float angle = atan( dir.y, dir.x ) * 1.0 / ( pi * 2.0 );
	return mod(vec2( radius * zoom,  angle * repeat ), 1.0 );

}