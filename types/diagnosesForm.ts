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
    other_parts_condition: string,
    //　1~7みたいな数
    watering_frequency: string,
    // 液体肥料、固形肥料、無し
    fertilizer_type: fartilizer_type,
    // 1~7みたいな数
    fertilizing_frequency: string,
    pesticide_history: pesticide_history,
    recent_weather: string
}


enum location {
    indoor = "室内",
    outdoor = "外"
}
enum sunlight {
    shade = "日陰",
    semi_shade = "半日陰",
    sunny = "日当たり"
}

enum ventilation {
    poor = "悪い",
    moderate = "普通",
    good = "良い"
}

enum soil_type {
    akadama = "赤玉",
    kanuma = "鹿沼",
    hyuga = "日向",
    kurotsuchi = "黒土",
    karuishi = "軽石",
    mizugoke = "水苔",
}

enum temperature {
    low = "低い",
    medium = "普通",
    high = "高い"
}

enum fartilizer_type {
    liquid = "液体肥料",
    solid = "固形肥料",
    none = "無し"
}

enum pesticide_history {
    yes = "有",
    no = "無"
}
