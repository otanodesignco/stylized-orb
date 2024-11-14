vec2 tileOffset( vec2 uv , vec2 tiling, vec2 offset )
{

    vec2 rtn = uv; // rtn return value
    rtn *= tiling; // tile uv
    rtn += offset; // offset to animate

    return fract( rtn ); // repeat texture infinitely

}