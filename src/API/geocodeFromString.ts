export interface ServerResponse {
    response: Response
}

export interface Response {
    GeoObjectCollection: GeoObjectCollection
}

export interface GeoObjectCollection {
    metaDataProperty: MetaDataProperty
    featureMember: FeatureMember[]
}

export interface MetaDataProperty {
    GeocoderResponseMetaData: GeocoderResponseMetaData
}

export interface GeocoderResponseMetaData {
    boundedBy: BoundedBy
    request: string
    results: string
    found: string
}

export interface BoundedBy {
    Envelope: Envelope
}

export interface Envelope {
    lowerCorner: string
    upperCorner: string
}

export interface FeatureMember {
    GeoObject: GeoObject
}

export interface GeoObject {
    metaDataProperty: MetaDataProperty2
    name: string
    description: string
    boundedBy: BoundedBy2
    uri: string
    Point: Point
}

export interface MetaDataProperty2 {
    GeocoderMetaData: GeocoderMetaData
}

export interface GeocoderMetaData {
    precision: string
    text: string
    kind: string
    Address: Address
    AddressDetails: AddressDetails
}

export interface Address {
    country_code: string
    formatted: string
    Components: Component[]
}

export interface Component {
    kind: string
    name: string
}

export interface AddressDetails {
    Country: Country
}

export interface Country {
    AddressLine: string
    CountryNameCode: string
    CountryName: string
    AdministrativeArea: AdministrativeArea
}

export interface AdministrativeArea {
    AdministrativeAreaName: string
}

export interface BoundedBy2 {
    Envelope: Envelope2
}

export interface Envelope2 {
    lowerCorner: string
    upperCorner: string
}

export interface Point {
    pos: string
}


export interface PointItem {
    name: string,
    coords: string
}

export async function geocodeFromString(query: string) {
    const url = process.env.REACT_APP_GEOCODER_URL as string;
    const token = process.env.REACT_APP_GEOCODER_KEY as string;

    const params = new URLSearchParams({
        "apikey": token,
        "geocode": query,
        "format": "json"
    })
    let res: ServerResponse = await fetch(url + "/?" + params)
        .then(response => response.json())

    console.log(res);

    const arr = res.response.GeoObjectCollection.featureMember;

    const arrayWithCoords = arr.map((el) => {
        return {
            name: el.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.CountryName
                +
                ", "
                +
                el.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName,
            coords: el.GeoObject.Point.pos
        }
    })
        .filter((obj) =>
            query.split(" ")
                .some(substr =>
                    obj.name.toLowerCase().includes(substr.toLowerCase())))

    console.log(arrayWithCoords)


    const uniqueData = Array.from(new Set(arrayWithCoords.map(item => item.name)))
        .map(name => arrayWithCoords.find(item => item.name === name));

    console.log(uniqueData);

    return uniqueData;
}
