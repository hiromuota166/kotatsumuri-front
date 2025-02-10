export type DiagnosesForm = {
    plant_id: string,
    name: string,
    location: location,
    sunlight: sunlight,
    ventilation: ventilation,
    soil_type: soil_type,
    temperature: temperature,
    humidity: string,
    leaf_color: string,
    stem_root_condition: string,
    //　1~7みたいな数
    watering_frequency: string,
    // 液体肥料、固形肥料、無し
    fertilizer_type: fartilizer_type,
    // 1~7みたいな数
    fertilizing_frequency: string,
    pesticide_history: pesticide_history,
    recent_weather: string,
}


export enum location {
    indoor = "室内",
    outdoor = "外"
}
export enum sunlight {
    shade = "日陰",
    semi_shade = "半日陰",
    sunny = "日当たり"
}

export enum ventilation {
    poor = "悪い",
    moderate = "普通",
    good = "良い"
}

export enum soil_type {
    akadama = "赤玉",
    kanuma = "鹿沼",
    hyuga = "日向",
    kurotsuchi = "黒土",
    karuishi = "軽石",
    mizugoke = "水苔",
}

export enum temperature {
    low = "低い",
    medium = "普通",
    high = "高い"
}

export enum fartilizer_type {
    liquid = "液体肥料",
    solid = "固形肥料",
    none = "無し"
}

export enum pesticide_history {
    yes = "有",
    no = "無"
}
