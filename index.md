---
layout: layout.liquid
title: "Lobi's Page"
---

<div id='root'>

<div id='catalog'>

[toc]

</div>

<div id='content'>

## Jiangman(Lobi) Zhao

## Project
### Tools Development

- C++ image processing tool with multithreading.

- Python-based Qt tool for exporting cache files to Unreal Engine.

- Python-based Qt hair plugin interface implementation.
<div class='media-group'>
{% render "image", src: 'tools/qtLayout', caption: 'Qt Python Layout', title: 'python Ui' %}
{% render "image", src: 'tools/qtPyside', caption: 'Qt Python Layout', title: 'maya tool' %}
</div>
### Unity Shading

#### Car painting

- Shading in Unity engine.
{% render "image", src: 'car/MainScene', caption: 'Car Scene', title: 'car painting' %}

- Using Substance create a distance map, shading to mimic the shape of a flame.
<div class='media-group'>
{% render "image", src: 'car/bakeDistanceMap', caption: 'bakeDistance', title: 'substance bake' %}
{% render "video_image", src: 'showCase', caption: 'Red Flame' %}
</div>

``` hlsl
//////////////////// fragment shader snippet ////////////////////
...

float speed = frac(_Time.x * + _lavaSpeed);
float4 wave = tex2D(_lavawaveTex, (i.texcoord.zw + float2(0, speed)) * 2) * 2 - 1;
wave = wave.r * _lavaWave;
float4 gas = tex2D(_lavawaveTex, float2(i.texcoord.z * _gasOffset.x, i.texcoord.w * _gasOffset.y + frac(_Time.y * + _gasOffset.z)));
float4 lava = tex2D(_lavaTex, float2(i.texcoord.zw + wave.xy));
float4 mask = tex2D(_lavaTex, i.texcoord.zw);
lava = (lava.r + gas.g * _gasOffset.w) * _lavaCol * mask.g;

...
```

- Other types of car paint.
<div class='media-group'>
{% render "video_image", src: 'showcase3', caption: 'Lava Storm' %}
{% render "video_image", src: 'showcase4', caption: 'Edge Loop' %}
{% render "video_image", src: 'showcase5', caption: 'Dragon Scale' %}
{% render "video_image", src: 'showcase7', caption: 'Stripe' %}
</div>

- Stylized cloud material.
<div class='media-group'>
{% render "video_image", src: 'stylizedCloud01', caption: 'stylized Multiple Pass' %}
{% render "video_image", src: 'stylizedCloud02', caption: 'vertex Noise' %}
</div>

``` hlsl
//////////////////// vertex shader snippet ////////////////////
...

// make noise in worldSpace
float speed = frac(_Time.y * _speed);
float3 blend = v.vertex.xyz * _scale;
float4 noiseXY = tex2Dlod(_Noise, float4(blend.xy + speed, 0, 0));
float4 noiseYZ = tex2Dlod(_Noise, float4(blend.yz + speed, 0, 0));
float4 noiseXZ = tex2Dlod(_Noise, float4(blend.xz + speed, 0, 0));
float4 noise = noiseXY;

// lerp
noise = lerp(noise, noiseXZ, o.normal.y);
noise = lerp(noise, noiseYZ, o.normal.x);
o.color = v.color;
noise *= o.color;

//noise plus v.vertex
v.vertex += v.normal * (noise * _range);
o.pos = UnityObjectToClipPos(v.vertex);

...
```

- Liquid wave material.
<div class='media-group'>
{% render "video_image", src: 'WaveWater1' %}
{% render "video_image", src: 'WaveWater2' %}
</div>

``` hlsl
fixed4 frag(v2f i) : SV_Target
{
    // WAVE cubemap
    float speed = frac(_Time.y * _speed);
    float3 flowDir = tex2D(_fmap, float2(i.texcoord.x * _offset.x + speed, i.texcoord.y * _offset.y)) * 2 - 1;
    flowDir *= _strength;
    float offset0 = frac(_Time.w * 0.5 + 0.5);
    float offset1 = frac(_Time.w * 0.5 + 1.0);
    float offsetlerp = abs((0.5 - offset0) / 0.5);
    fixed4 msk = tex2D(_MaskTex, i.texcoord);
    fixed4 refl0 = tex2Dproj(_ReflectionTex, UNITY_PROJ_COORD(i.refl) + float4(flowDir.xy * offset0, 0, 0));
    fixed4 refl1 = tex2Dproj(_ReflectionTex, UNITY_PROJ_COORD(i.refl) + float4(flowDir.xy * offset1, 0, 0));
    fixed4 refl = lerp(refl0, refl1, offsetlerp);
    refl.a *= msk.r * _Alpha * i.color.a;
    return refl;
}
```

#### Card battle

- In game low cost dynamic shadow
<div class='media-group'>
{% render "image", src: 'card/ingame', caption: 'In game battle', title: 'Battle screenshot' %}
{% render "image", src: 'card/FakeShadow', caption: 'low cost shadow', title: 'FakeShadow' %}
</div>

### rigging

#### Facial rigging

- Base on Unreal MetaHuman, rigging facial mesh in maya, modifying and generating new DNA source.
{% render "video", src: 'FFriggingTest', caption: 'FacialRiggingTest' %}
{% render "image", src: 'grooming/FFriggingTest', caption: 'Facial Rigging', title: 'facialRigging' %}

#### Dynamic bone

- Set in game hair Dynamic Bone.
<div class='media-group'>
{% render "image", src: 'grooming/basehair', title: 'base Hair' %}
{% render "image", src: 'grooming/HairRigging', title: 'rigging' %}
{% render "image", src: 'grooming/DynamicBone', title: 'set Unity dynamic bone' %}
</div>

### Grooming

- Create by maya tool that made by our TA team. Creating hair card maps base on XGen and modeling FurCard by self developed tool.
{% render "image", src: 'grooming/longHairinMaya', caption: 'Create In Maya', title: 'hair crate in maya' %}

- Hair Rendering in Unreal Engine.
{% render "image", src: 'grooming/longhair_unreal', caption: 'Rendering In Unreal', title: 'rendering in Unreal Engine' %}

- Animal fur test. Baking vertex color on FurCard mesh blend base color fo body model in unreal engine
{% render "image", src: 'grooming/shortFurFox', caption: 'Short Fur', title: 'short fur for animal case' %}

### Modeling

#### chess Game Online

- Modeling and drawing texture rendered in unity engine
{% render "image", src: 'modeling/MainScene', caption: 'Avatar Store', title: 'avatar store' %}

<div class='media-group'>
{% render "image", src: 'modeling/GirlHair01', caption: 'Character HairStyle', title: 'girl style' %}
{% render "image", src: 'modeling/Boyhair01', caption: 'Character HairStyle', title: 'boy hair style' %}
</div>

<div class='media-group'>
{% render "image", src: 'modeling/MainScene01', caption: 'Teahouse', title: 'Teahouse' %}
{% render "image", src: 'modeling/MainScene02', caption: 'Chinese garden', title: 'Chinese garden' %}
</div>

#### substance workflow

- Substance Designer work flow. Quickly create textures using only SmartMaterial.
<div class='media-group'>
{% render "image", src: 'substance/Hardsurface', caption: 'Hard surface texture', title: 'Hard surface texture' %}
{% render "image", src: 'substance/surfaceTexture', caption: 'Surface Textures', title: 'surface Textures' %}
{% render "image", src: 'substance/vehicle', caption: 'Vehicle', title: 'vehicle' %}
{% render "image", src: 'substance/vehicleTexture', caption: 'Vehicle Texture', title: 'vehicleTexture' %}
</div>

#### PhotoScan workflow

- Create textures using PhotoScan workflow.
<div class='media-group'>
{% render "image", src: 'substance/fiberTexture', caption: 'PBR Fiber Photo-Scan', title: 'fiberTexture' %}
{% render "image", src: 'substance/FireHydrant', caption: 'Fire Hydrant', title: 'PhotoScan' %}
<!-- {% render "image", src: 'substance/OnePiece', caption: 'OnePiece Garage kit', title: 'OnePiece' %} -->
{% render "image", src: 'substance/Trunk01', caption: 'Tree Trunk', title: 'Trunk01' %}
</div>

### Patent

- As main Inventor-shadow in SNS game : [CN110517346B](https://patents.google.com/patent/CN110517346B/zh?oq=CN110517346B)
{% render "image", src: 'house/cabinScene', caption: 'cabin Screen-shoot', title: 'cabin building mode screen shoot' %}

#### terrain shadow case

1. Set a camera as the light position, get a renderTexture

<div class='media-group'>
{% render "image", src: 'house/element', caption: 'building shadow case', title: 'building Render Texture' class: 'w400' %}
{% render "image", src: 'house/buildingRT', caption: 'Cabin Render Texture', title: '' class: 'w400' %}
</div>

2. Shading and sampling RT
   <!-- {% render "image", src: 'house/UnityMaterial', caption: 'cabin material', title: 'Unity Material' class: 'w400' %} -->

``` hlsl
// project RenderTexture in world position
v2f vert(appdata v)
{
    fixed4 tex = tex2D(_MainTex, i.texcoord);
    fixed spec = tex.a;

    float2 shadow_uv = mul(_ShadowVPMatrix, i.worldPos).xy * 0.5 + 0.5;
    fixed atten = tex2D(_CurrentShadowmap, shadow_uv).r;
    fixed4 shadow_color = lerp(_ShadowCol, fixed4(1, 1, 1, 1), atten);
    //blend shadow and texture
    tex = _MainColor * _DirectionalLightColor * shadow_color * tex;

    half4 normalMap = tex2D(_BumpMap, i.texcoord);
    half3 normalDir = normalize(UnpackNormal(normalMap));
    half3 viewDir = normalize(i.viewDir);
    half3 lightDir = normalize(i.lightDir);
    half3 h = normalize(viewDir + lightDir);
    float r = max(0, dot(h, normalDir));
    tex += _SpecularCol * spec * pow(r, 48);
    return tex;
}
```

<!-- 3. mapping of sampling on the terrain
{% render "image", src: 'house/图片47', caption: 'cabin building mode', title: '' %} -->

#### element shadow case

{% render "image", src: 'house/docorateBuild', caption: 'Cabin Building', title: 'showcase' %}

1. Bake 4 directional shadow in solo channel
{% render "image", src: 'house/shadowDir', caption: 'Directional Shadow', title: 'shadow Direction' %}

2. Shading and sampling RGBA channel shadow, and then dye color to them
   <!-- {% render "image", src: 'house/decorateMaterial', caption: 'building material', title: 'material' %} -->

``` hlsl
fixed4 frag(v2f i) : COLOR
{
    fixed4 tex = tex2D(_MainTex, i.texcoord.xy);
    //added shadow information
    fixed4 lm = tex2D(_ShasowTex, i.texcoord.zw);

    fixed shadowvalue = dot(lm, _ShadowDir);

    tex = lerp(tex * shadowvalue * _ShadowCol, tex, shadowvalue);
    tex = lerp(tex, tex * _LightPower, shadowvalue * 1.8);

    #ifdef _GRADIENT_ON
        tex *= i.gradient;
    #endif

    return tex;
}
```

#### elements batch

- Generating UV3 to show shadow channel, and then to deal static batch.
<div class='media-group'>
{% render "image", src: 'house/batchCase', caption: 'Player Building', title: 'batchCase' %}
{% render "image", src: 'house/staticBatch', caption: 'Running Batched', title: 'static batch' %}
</div>

## about me
### Education 

#### University of Pennsylvania. USA, PA

- Computer Graphics and Game Technology Sep 2024 - Oct 2026

- Computer and Information Technology   Sep 2023 - Jul 2024

### Skills

#### Programming Skills 

-  C++, C, Assembly, Python, Java, OpenGL, GLSL

#### Core Skills 

- Developed and optimized mobile application, 

#### DevTools 

- Snapdragon Profiler, Unity, Unreal Engine5, Qt creator, Maya, Substance Designer


## Contact

- <lobizhao@gmail.com>

</div>
</div>